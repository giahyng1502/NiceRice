import {Dispatch, MiddlewareAPI} from '@reduxjs/toolkit';
import socket from '../../config/socket/socketClient';
import {fetchConversationById} from '../action/conversationAction';
import {addConversation} from '../../realm/service/conversation_service';
import {getRealm} from '../../realm/realm';
import {ADD_MEMBER} from '../action/participantAction';
import {addParticipants} from '../../realm/service/participant_service';

export const CREATE_CONVERSATION = 'CREATE_CONVERSATION';

let isListenerAttached = false;

const handleNewConversation = async (
  conversationId: string,
  store: MiddlewareAPI,
) => {
  console.log('📩 [socket] newConversation:', conversationId);

  // Fetch full conversation details
  const action = await store.dispatch<any>(
    fetchConversationById(conversationId),
  );

  if (fetchConversationById.fulfilled.match(action)) {
    const conversation = action.payload[0];

    // Gửi join room sau khi fetch thành công
    socket.emit('joinConversation', conversationId);

    try {
      const realm = getRealm();
      if (realm?.isClosed) return;

      addConversation(conversation, realm);
    } catch (error) {
      console.error('❌ Realm chưa được mở:', error);
    }
  } else {
    console.error('❌ Fetch conversation thất bại:', action.error);
  }
};

const setupConversationListener = (store: MiddlewareAPI) => {
  if (isListenerAttached) return;
  isListenerAttached = true;

  socket.off('newConversation'); // đề phòng reload hot module
  socket.on('newConversation', (conversationId: string) => {
    handleNewConversation(conversationId, store);
  });
};

const socketConversationMiddleware = (store: MiddlewareAPI) => {
  setupConversationListener(store);

  return (next: Dispatch) => (action: any) => {
    if (action.type === CREATE_CONVERSATION) {
      const {event, data} = action.payload;
      socket.emit(event, data);
    }
    if (action.type === ADD_MEMBER) {
      console.log('✅ Bắt được ADD_MEMBER trong middleware');
      try {
        const realm = getRealm();
        const participants = action.payload;
        addParticipants(participants, realm);
      } catch (error) {
        console.error(error);
      }
    }

    return next(action);
  };
};

export default socketConversationMiddleware;
