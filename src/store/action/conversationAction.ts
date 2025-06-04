import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../apis/axios';
import { Conversation } from '../reducers/conversationSlice';

const conversationReturn = (conversations: any[]): Conversation[] => {
    return conversations.map((conv: any) => ({
        conversationId: conv.conversationId,
        createdAt: conv.updatedAt,
        unreadCount: conv.unreadCount,
        lastMessagePreview: conv.messagePreviews?.[0]?.content || '',
        isGroup: conv.isGroup,
        groupName : conv.groupName,
        lastUpdatedAt: conv.messagePreviews?.[0]?.createdAt || '',
        participants: conv.users.map((user: any) => ({
            participantId: user.ParticipantConversation.participantId,
            fullName: user.fullName,
            userId: user.userId,
            avatarUrl: user.avatarUrl,
            seenDateTime: user.ParticipantConversation?.seenDateTime || '',
            isAdmin: user.ParticipantConversation?.isAdmin ?? false,
            conversationId: conv.conversationId,
            joinedAt: user.ParticipantConversation?.joinedAt || '',
        })),
    }));
};


export const fetchConversation = createAsyncThunk<Conversation[], void>(
    'conversation/fetchConversation',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get('/conversation');

            // Lấy data từ response.data
            const conversations: Conversation[] = conversationReturn(response.conversations || []);
            console.log(conversations);
            return conversations;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);
