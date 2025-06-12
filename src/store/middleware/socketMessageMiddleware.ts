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

let hasSetupListeners = false;

export function setupSocketListeners(store: MiddlewareAPI) {
  if (hasSetupListeners) return;
  const handleReceiveMessage = (data : any ) =>{
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

      console.log('data', data);
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
  };
  socket.off('receiveMessage', handleReceiveMessage);
  socket.on('receiveMessage', handleReceiveMessage);

  const handleReceiveTyping = (typing: TypingState) => {
    store.dispatch(setConvIsTyping(typing));
  };

  socket.off('receiveTyping', handleReceiveTyping);
  socket.on('receiveTyping', handleReceiveTyping);

  // --- Stop typing ---
  const handleStopTyping = (typing: TypingState) => {
    store.dispatch(removeConvIsTyping(typing));
  };

  socket.off('stop_typing', handleStopTyping);
  socket.on('stop_typing', handleStopTyping);

  const handleMemberOnline = (userIds: number[]) => {
    store.dispatch(setUserIdsOnline(userIds));
  };

  socket.off('memberOnline', handleMemberOnline);
  socket.on('memberOnline', handleMemberOnline);

  hasSetupListeners = true;
}




const socketMessageMiddleware: any = (store: MiddlewareAPI) => {
  // Lắng nghe sự kiện server trả về
  setupSocketListeners(store);
  // Lắng nghe sự kiện gõ bàn phím trả về

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
        console.error('Lỗi khi thêm vào realm:', error);
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
