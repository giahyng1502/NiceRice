import {useEffect, useState} from 'react';
import Realm from 'realm';
import {Message} from '../models/types';
import axiosClient from '../apis/axios';
import {saveMessages} from '../realm/service/message_service';
import {useRealm} from "../provider/RealmProvider";

export function useConversationMessages(conversationId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const realmInstance = useRealm();
  // Chuyển đổi Realm object thành plain object
  const toPlainObject = (message: Message): Message => ({
    messageId: message.messageId,
    conversationId: message.conversationId,
    content: message.content,
    timestamp: message.timestamp,
    senderId: message.senderId,
  });

  // Fetch API và lưu dữ liệu vào Realm
  const fetchMessagesFromApi = async (id: string) => {
    try {
      const res = await axiosClient.get(`/messages/getMessage`, {
        params: {conversationId: id},
      });

      if (res.data) {
        await saveMessages(res.data,realmInstance);
      }
    } catch (error) {
      console.log('Fetch API message lỗi:', error);
    }
  };

  // Fetch API mỗi khi realmInstance hoặc conversationId thay đổi
  useEffect(() => {
    if (conversationId) {
      fetchMessagesFromApi(conversationId);
    }
  }, [conversationId]);

  // Lắng nghe thay đổi trong Realm và cập nhật messages
  useEffect(() => {
    if (!realmInstance || realmInstance.isClosed || !conversationId) return;

    const allMessages = realmInstance.objects<Message>('Message');
    const conversationMessages = allMessages
        .filtered('conversationId = $0', conversationId)
        .sorted('timestamp',true);

    setMessages(conversationMessages.map(toPlainObject));

    const listener = (
        collection: Realm.Collection<Message>,
        changes: Realm.CollectionChangeSet,
    ) => {
      setMessages(collection.map(toPlainObject));
    };

    conversationMessages.addListener(listener);

    return () => {
      conversationMessages.removeListener(listener);
    };
  }, [realmInstance, conversationId]);


  return messages;
}
