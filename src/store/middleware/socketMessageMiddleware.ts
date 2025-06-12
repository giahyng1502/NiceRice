import {MiddlewareAPI, Dispatch} from '@reduxjs/toolkit';
import socket from '../../config/socket/socketClient';
import {getRealm} from '../../realm/realm';
import {addMessageRedux, onMessageFromSocket} from '../reducers/messageSlice';
import {addMessage} from '../../realm/service/message_service';
import {
  increaseUnreadCount,
  removeConvIsTyping,
  setConvIsTyping,
  TypingState,
  updateConversation,
} from '../reducers/conversationSlice';
import {addConversation} from '../../realm/service/conversation_service';
import {setUserIdsOnline} from '../reducers/userSlice';
export const SEND_SOCKET_EVENT = 'socket/SEND_SOCKET_EVENT';
export const SEND_TYPING_EVENT = 'socket/SEND_TYPING_EVENT';

export function setupSocketListeners(store: MiddlewareAPI) {
  socket.off('receiveMessage').on('receiveMessage', data => {
    const state = store.getState();
    const currentConversationId = state.message.currentConversationId;

    console.log(
      `Current: ${currentConversationId} - Received: ${data.conversationId}`,
    );

    // Thêm message vào redux
    store.dispatch(onMessageFromSocket(data));

    // Nếu message không phải ở cuộc trò chuyện đang mở
    if (currentConversationId !== data.conversationId) {
      store.dispatch(increaseUnreadCount(data.conversationId));
    }

    // Cập nhật conversation preview + thời gian
    store.dispatch(
      updateConversation({
        conversationId: data.conversationId,
        lastMessagePreview: data.content,
        lastUpdatedAt: data.createdAt,
      }),
    );

    // Lưu Realm
    try {
      const realm = getRealm();
      addMessage(data, realm);
      addConversation(
        {
          conversationId: data.conversationId,
          lastMessagePreview: data.content,
          lastUpdatedAt: data.createdAt,
        },
        realm,
      );
    } catch (error) {
      console.error('Realm chưa được mở:', error);
    }
  });
}

const setupTypingListeners = (store: MiddlewareAPI) => {
  try {
    socket.off('receiveTyping').on('receiveTyping', (typing: TypingState) => {
      store.dispatch(setConvIsTyping(typing));
    });
  } catch (e) {
    console.log(e);
  }
};

const memberOnline = (store: MiddlewareAPI) => {
  try {
    socket.off('memberOnline').on('memberOnline', userIds => {
      console.log('danh sach thanh vien online ', userIds);
      store.dispatch(setUserIdsOnline(userIds));
    });
  } catch (e) {
    console.log(e);
  }
};

const stopTypingListeners = (store: MiddlewareAPI) => {
  try {
    socket.off('stop_typing').on('stop_typing', (typing: TypingState) => {
      store.dispatch(removeConvIsTyping(typing));
    });
  } catch (e) {
    console.log(e);
  }
};

const socketMessageMiddleware: any = (store: MiddlewareAPI) => {
  // Lắng nghe sự kiện server trả về
  setupSocketListeners(store);
  // Lắng nghe sự kiện gõ bàn phím trả về
  setupTypingListeners(store);
  // Middleware trả về hàm xử lý action

  stopTypingListeners(store);
  //  Nguoi dung online
  memberOnline(store);

  return (next: Dispatch) => (action: any) => {
    if (action.type === SEND_SOCKET_EVENT) {
      const {event, data} = action.payload;

      // dispatch message vào redux
      store.dispatch(addMessageRedux(data));

      // dispatch update conv vào redux
      store.dispatch(
        updateConversation({
          conversationId: data.conversationId,
          lastMessagePreview: data.content,
          lastUpdatedAt: data.createdAt,
        }),
      );

      // gửi socket lên server
      socket.emit(event, data);
      // lưu vào realm
      try {
        const realm = getRealm();
        addMessage(data, realm);
        addConversation(
          {
            conversationId: data.conversationId,
            lastMessagePreview: data.content,
            lastUpdatedAt: data.createdAt,
          },
          realm,
        );
      } catch (error) {
        console.error('Realm chưa được mở:', error);
      }
    }

    if (action.type === SEND_TYPING_EVENT) {
      const {event, data} = action.payload;
      socket.emit(event, data);
      console.log(`${event}`);
      if (event === 'stop_typing') {
        removeConvIsTyping(data);
      }
    }
    return next(action);
  };
};

export default socketMessageMiddleware;
