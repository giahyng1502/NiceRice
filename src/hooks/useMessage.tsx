import {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import Realm from 'realm';
import {getRealm} from '../realm/realm';
import {useAppDispatch} from './useAppDispatch';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {
  Messages,
  setCurrentConversationId,
  setMessages,
} from '../store/reducers/messageSlice';
import {getMessageByConv} from '../store/action/messageAction';
import {addMessage, saveMessages} from '../realm/service/message_service';
import {SEND_SOCKET_EVENT} from '../store/middleware/socketMessageMiddleware';
import {createMessageId} from '../utils/createMessageId';
import {resetUnreadCount} from '../store/reducers/conversationSlice';
import axiosClient from '../apis/axios';
import {useAppState} from './useAppState';
import {useTranslation} from 'react-i18next';
import {groupMessagesByDate} from '../utils/groupedMessage';

export function useConversationMessages(conversationId: string) {
  const [realmInstance, setRealmInstance] = useState<Realm>();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.data);
  const messages = useSelector((state: RootState) =>
      conversationId ? state.message.messages[conversationId] : []
  );
  const isLoading = useSelector(
      (state: RootState) => state.message.loading[conversationId]
  );
  const state = useAppState();
  const isActive = state === 'active';
  const {i18n} = useTranslation();
  useEffect(() => {
    const realm = getRealm();
    setRealmInstance(realm);
  }, []);

  const readMessages = (conversationId: string) => {
    try {
      return axiosClient.put(`/messages/seenMessage/${conversationId}`);
    } catch (err) {
      console.log('co loi xay ra khi doc tin nhan', err);
    }
  };

  useLayoutEffect(() => {
    if (!isActive) return;

    dispatch(setCurrentConversationId(conversationId));
    dispatch(resetUnreadCount(conversationId));

    return () => {
      dispatch(setCurrentConversationId(null));
      readMessages(conversationId);
    };
  }, [conversationId, dispatch, isActive]);


  const getMessageFromServer = async (lastMessageTime: string) => {
    const resultAction = await dispatch(
      getMessageByConv({conversationId, since: lastMessageTime}),
    );

    if (getMessageByConv.fulfilled.match(resultAction)) {
      // Thành công
      console.log('Data:', resultAction.payload); // dữ liệu api trả về
      if (resultAction.payload.length === 0) {
        console.log('Không có dữ liệu mới');
      } else {
        console.log('Có dữ liệu mới:', resultAction.payload.length);
        realmInstance &&
          (await saveMessages(resultAction.payload, realmInstance));
      }
    } else {
      // Thất bại hoặc reject
      console.error('Lỗi khi fetch:', resultAction.error);
    }
  };

  const getMessageFromLocal = () => {
    if (!realmInstance || realmInstance.isClosed || !conversationId) return;

    realmInstance.write(() => {
      const allMessages = realmInstance.objects<Messages>('Message');

      const conversationMessages = allMessages
        .filtered('conversationId = $0', conversationId)
        .sorted('createdAt', true); // mới -> cũ

      // Lấy tối đa 50 tin nhắn mới nhất
      const recentMessages = conversationMessages.slice(0, 50);

      // Chuyển thành plain object
      const messagesPlain = recentMessages.map(msg => ({
        messageId: msg.messageId,
        senderId: msg.senderId,
        conversationId: msg.conversationId,
        content: msg.content,
        createdAt: new Date(msg.createdAt).toISOString(),
        type: msg.type,
        link: msg.link ? [...msg.link] : [],
      }));

      // Cập nhật vào Redux store
      dispatch(setMessages({ conversationId, messages: messagesPlain }));

      // Lấy timestamp của tin nhắn mới nhất
      const lastMessageTime = messagesPlain[0]?.createdAt || '';

      // Gọi API lấy thêm message từ server nếu cần
      getMessageFromServer(lastMessageTime);

      // Xóa các tin nhắn cũ hơn (ở vị trí thứ 50 trở đi)
      if (conversationMessages.length > 50) {
        const oldMessages = conversationMessages.slice(50);
        realmInstance.delete(oldMessages);
        console.log(
          `Đã xoá ${oldMessages.length} tin nhắn cũ của conversation ${conversationId}`,
        );
      }
    });
  };

  useEffect(() => {
    if (realmInstance && !realmInstance.isClosed) {
      getMessageFromLocal();
    }
  }, [conversationId, realmInstance]);

  const sendMessage = (content: string) => {
    dispatch({
      type: SEND_SOCKET_EVENT,
      payload: {
        data: {
          content,
          conversationId,
          type: 'text',
          senderId: user?.userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          messageId: createMessageId(),
          link: '',
        },
        event: 'sendMessage',
      },
    });
  };

  const groupedMessages = useMemo(() => {
    return messages ? groupMessagesByDate(messages, i18n.language) : [];
  }, [messages, i18n.language]);

  return {groupedMessages, sendMessage,isLoading};
}
