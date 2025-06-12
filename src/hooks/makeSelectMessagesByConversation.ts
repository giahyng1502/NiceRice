import { createSelector } from 'reselect';
import { RootState } from '../store/store';

export const selectMessageMap = (state: RootState) => state.message.messages;

export const makeSelectMessagesByConversation = (conversationId: string) =>
    createSelector([selectMessageMap], (messages) => {
        return messages[conversationId] ?? [];
    });
