import {useEffect, useState} from 'react';
import Realm from 'realm';
import axiosClient from '../apis/axios';
import {addParticipants} from '../realm/service/participant_service';
import {getRealm} from '../realm/realm';
import {useAppDispatch} from './useAppDispatch';
import {SEND_SOCKET_EVENT} from '../store/middleware/socketMessageMiddleware';
import {createMessageId} from '../utils/createMessageId';
import {CREATE_CONVERSATION} from '../store/middleware/socketConversationMiddleware';
import {parseUserIdsFromString} from '../utils/createConversationId';

export type Participant = {
  _id: string;
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
  const [label, setLabel] = useState<string>('');
  const dispatch = useAppDispatch();

  // Khởi tạo Realm instance
  useEffect(() => {
    const realm = getRealm();
    setRealmInstance(realm);
  }, []);

  const addConversation = () => {
    if (conversationId) {
      const participantIds = parseUserIdsFromString(conversationId);
      dispatch({
        type: CREATE_CONVERSATION,
        payload: {
          data: {
            conversationId,
            participantIds,
          },
          event: 'createConversation',
        },
      });
    }
  };

  useEffect(() => {
    if (!realmInstance || !conversationId) return;

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
    if (!conversationId || !realmInstance) return;

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
        setLabel(error?.label);
        console.log(error?.label);
      }
    };

    fetchParticipantsFromApi();
  }, [conversationId, realmInstance]);

  return {participants, label, addConversation};
};
