import { Dispatch, MiddlewareAPI } from '@reduxjs/toolkit';
import socket from '../../config/socket/socketClient';
import { fetchConversationById } from '../action/conversationAction';
import {addConversation} from "../../realm/service/conversation_service";
import {getRealm} from "../../realm/realm";

export const CREATE_CONVERSATION = 'CREATE_CONVERSATION';

let isListenerAttached = false;

const createConversation = (store: MiddlewareAPI) => {
  console.log('createConversation');
  if (isListenerAttached) return; // tránh đăng ký lặp
  isListenerAttached = true;

  socket.on('newConversation', async (conversationId: string) => {
    console.log('📩 [socket] newConversation:', conversationId);

    const action = await store.dispatch<any>(fetchConversationById(conversationId));

    socket.emit('joinConversation', conversationId);

    if (fetchConversationById.fulfilled.match(action)) {
      const conversation = action.payload[0]
      try {
        const realm = getRealm();
        addConversation(
            conversation,
            realm,
        );
      } catch (error) {
        console.error('Realm chưa được mở:', error);
      }
    } else {
      console.error('❌ Failed:', action.error);
    }

  });
};

const socketConversationMiddleware = (store: MiddlewareAPI) => {
  createConversation(store);

  return (next: Dispatch) => (action: any) => {
    if (action.type === CREATE_CONVERSATION) {
      const { event, data } = action.payload;
      socket.emit(event, data);
    }

    return next(action);
  };
};

export default socketConversationMiddleware;
