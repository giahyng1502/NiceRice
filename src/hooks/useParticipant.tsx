import {useEffect, useState} from 'react';
import Realm from 'realm';
import axiosClient from '../apis/axios';
import {addParticipants} from '../realm/service/participant_service';
import {getRealm} from '../realm/realm';

export type Participant = {
  participantId: string;
  userId: bigint;
  fullName: string;
  avatarUrl: string;
  seenDateTime?: Date;
  conversationId: bigint;
  isAdmin: boolean;
};

export const useConversationParticipants = (conversationId: string | null) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [realmInstance, setRealmInstance] = useState<Realm>();

  // Khởi tạo Realm instance
  useEffect(() => {
    const realm = getRealm();
    setRealmInstance(realm);
  }, []);

  useEffect(() => {
    if (!realmInstance || !conversationId) {
      return;
    }

    const filteredParticipants = realmInstance
      .objects<Participant>('ParticipantConversation')
      .filtered('conversationId == $0', conversationId);

    // Load dữ liệu local đầu tiên
    setParticipants([...filteredParticipants]);

    // Listener callback
    const listenerCallback = (
      collection: Realm.Results<Participant>,
      changes: Realm.CollectionChangeSet,
    ) => {
      setParticipants([...collection]);
    };

    // Gắn listener
    filteredParticipants.addListener(listenerCallback);

    // Cleanup khi unmount hoặc conversationId/realmInstance thay đổi
    return () => {
      if (
        !realmInstance.isClosed &&
        filteredParticipants &&
        filteredParticipants.removeListener
      ) {
        filteredParticipants.removeListener(listenerCallback);
      }
    };
  }, [realmInstance, conversationId]);

  // Fetch API participants và lưu vào Realm
  useEffect(() => {
    if (!conversationId || !realmInstance) {
      return;
    }

    const fetchParticipantsFromApi = async () => {
      try {
        const data = await axiosClient.get('/conversation/participant', {
          params: {conversationId},
        });
        console.log(data);
        if (data.users) {
          await addParticipants(data.users, realmInstance);
        }
      } catch (error) {
        console.log('Fetch API participant lỗi:', error);
      }
    };

    fetchParticipantsFromApi();
  }, [conversationId, realmInstance]);

  return {participants};
};
