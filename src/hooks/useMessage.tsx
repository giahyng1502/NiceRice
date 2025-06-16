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
import {saveMessages} from '../realm/service/message_service';
import {SEND_SOCKET_EVENT} from '../store/middleware/socketMessageMiddleware';
import {createMessageId} from '../utils/createMessageId';
import {resetUnreadCount} from '../store/reducers/conversationSlice';
import axiosClient from '../apis/axios';
import {useAppState} from './useAppState';
import {useTranslation} from 'react-i18next';
import {groupMessagesByDate} from '../utils/groupedMessage';
import {makeSelectMessagesByConversation} from './makeSelectMessagesByConversation';

export function useConversationMessages(conversationId: string) {
  const [realmInstance, setRealmInstance] = useState<Realm>();
  const [localMessages, setLocalMessages] = useState<Messages[]>([]);
  const dispatch = useAppDispatch();

  const user = useSelector((state: RootState) => state.user.data);
  const selectMessages = useMemo(
    () => makeSelectMessagesByConversation(conversationId),
    [conversationId],
  );

  const reduxMessages = useSelector(selectMessages);
  const isLoading = useSelector(
    (state: RootState) => state.message.loading[conversationId],
  );

  const state = useAppState();
  const isActive = state === 'active';
  const {i18n} = useTranslation();

  // Khởi tạo realm
  useEffect(() => {
    const realm = getRealm();
    setRealmInstance(realm);
  }, []);

  // Đánh dấu đã đọc + đặt currentConversation
  useLayoutEffect(() => {
    if (!isActive) return;

    dispatch(setCurrentConversationId(conversationId));
    dispatch(resetUnreadCount(conversationId));

    return () => {
      dispatch(setCurrentConversationId(null));
      readMessages(conversationId);
    };
  }, [conversationId, dispatch, isActive]);

  const readMessages = (conversationId: string) => {
    try {
      return axiosClient.put(`/messages/seenMessage/${conversationId}`);
    } catch (err) {
      console.log('Lỗi khi đánh dấu đã đọc:', err);
    }
  };

  const getMessageFromServer = async (lastMessageTime: string) => {
    const resultAction = await dispatch(
      getMessageByConv({conversationId, since: lastMessageTime}),
    );

    if (getMessageByConv.fulfilled.match(resultAction)) {
      const fetchedMessages = resultAction.payload;
      if (fetchedMessages.length > 0) {
        realmInstance && (await saveMessages(fetchedMessages, realmInstance));
      }
    } else {
      console.error('Lỗi khi fetch tin nhắn:', resultAction.error);
    }
  };

  const getMessageFromLocal = () => {
    if (!realmInstance || realmInstance.isClosed || !conversationId) return;

    realmInstance.write(() => {
      const allMessages = realmInstance.objects<Messages>('Message');
      const conversationMessages = allMessages
        .filtered('conversationId = $0', conversationId)
        .sorted('createdAt', true); // mới -> cũ

      const recentMessages = conversationMessages.slice(0, 50);

      const messagesPlain = recentMessages.map(msg => ({
        messageId: msg.messageId,
        senderId: msg.senderId,
        conversationId: msg.conversationId,
        content: msg.content,
        createdAt: new Date(msg.createdAt).toISOString(),
        type: msg.type,
        link: msg?.link ?? '',
      }));

      // Lưu Redux để đồng bộ toàn cục
      dispatch(setMessages({conversationId, messages: messagesPlain}));

      // Cập nhật local để hiển thị ngay
      setLocalMessages(messagesPlain);

      const lastMessageTime = messagesPlain[0]?.createdAt || '';
      getMessageFromServer(lastMessageTime);

      if (conversationMessages.length > 50) {
        const oldMessages = conversationMessages.slice(50);
        realmInstance.delete(oldMessages);
        console.log(
          `Đã xoá ${oldMessages.length} tin nhắn cũ của ${conversationId}`,
        );
      }
    });
  };

  // Load local message khi conversation hoặc realm thay đổi
  useEffect(() => {
    if (realmInstance && !realmInstance.isClosed) {
      getMessageFromLocal();
    }
  }, [conversationId, realmInstance]);

  // Khi Redux có cập nhật message mới → sync về local
  useEffect(() => {
    if (reduxMessages.length > 0) {
      setLocalMessages(reduxMessages);
    }
  }, [reduxMessages]);

  // Gửi tin nhắn với update UI tức thì
  const sendMessage = (content: string, title?: string) => {
    const newMessage: Messages = {
      messageId: createMessageId(),
      senderId: user?.userId,
      conversationId,
      content,
      createdAt: new Date().toISOString(),
      type: 'text',
      link: '',
    };

    // UI cập nhật ngay
    setLocalMessages(prev => [newMessage, ...prev]);

    // Gửi socket & cập nhật Redux + Realm ở middleware
    dispatch({
      type: SEND_SOCKET_EVENT,
      payload: {
        message: newMessage,
        event: 'sendMessage',
        title: title || user?.fullName
      },

    });
  };

  const groupedMessages = useMemo(() => {
    return localMessages
      ? groupMessagesByDate(localMessages, i18n.language)
      : [];
  }, [localMessages, i18n.language]);

  return {groupedMessages, sendMessage, isLoading};
}
