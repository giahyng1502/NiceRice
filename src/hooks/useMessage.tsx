import {useEffect, useState} from 'react';
import Realm from 'realm';
import {getRealm} from '../realm/realm';
import {useAppDispatch} from './useAppDispatch';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {Messages, setMessages} from '../store/reducers/messageSlice';
import {getMessageByConv} from '../store/action/messageAction';
import {addMessage, saveMessages} from '../realm/service/message_service';

export function useConversationMessages(conversationId: string) {
  const [realmInstance, setRealmInstance] = useState<Realm>();
  const dispatch = useAppDispatch();
  const messages = useSelector((msg: RootState) => msg.message.messages);

  useEffect(() => {
    const realm = getRealm();
    setRealmInstance(realm);
  }, []);
  const getMessageFromSever = async (lastMessageTime: string) => {
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

    const allMessages = realmInstance.objects<Messages>('Message');

    const conversationMessages = allMessages
      .filtered('conversationId = $0', conversationId)
      .sorted('timestamp', true)
      .slice(0, 50);

    const messagesPlain = conversationMessages.map(msg => ({
      messageId: msg.messageId,
      senderId: msg.senderId,
      conversationId: msg.conversationId,
      content: msg.content,
      timestamp: msg.timestamp instanceof Date ? msg.timestamp.toISOString() : '',
      type: msg.type,
      link: msg.link ? [...msg.link] : [],  // chuyển link thành array thuần
    }));

    dispatch(setMessages(messagesPlain));

    const lastMessageTime = messagesPlain[0]?.timestamp || '';

    getMessageFromSever(lastMessageTime);
  };
  useEffect(() => {
    getMessageFromLocal();
  }, [conversationId, dispatch, realmInstance]);

  return messages;
}
