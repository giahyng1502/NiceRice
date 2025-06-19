import { createSelector } from 'reselect';
import { RootState } from '../store/store';

export const selectMessageMap = (state: RootState) => state.message.messages;
export const selectMemberMap = (state: RootState) => state.memberGroup.members;

export const makeSelectMessagesByConversation = (conversationId: string) =>
    createSelector([selectMessageMap], (messages) => {
        return messages[conversationId] ?? [];
    });

export const makeSelectMemberByConversation = (conversationId: string) =>
    createSelector([selectMemberMap], (members) => {
        return members[conversationId] ?? [];
    });
