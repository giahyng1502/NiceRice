import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {fetchConversation} from "../action/conversationAction";

export interface Conversation {
    conversationId: number;
    createdAt: string;
    unreadCount: number;
    groupName?: string;
    groupAvatar?: string;
    isGroup: boolean;
    lastMessagePreview : 'string';
    lastUpdatedAt: string;
    participants?: [
        {
            fullName?: string;
            avatarUrl?: string;
            seenDateTime? : string;
            isAdmin? : boolean;
            conversationId? : number;
            joinedAt? : string;
        },
    ];
}
interface ConversationState {
    conversations: Conversation[] | [];
    loading: boolean;
    error: string | null;
}

const initialState: ConversationState = {
    conversations: [],
    loading: false,
    error: null,
};

const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        setConv: (state, action: PayloadAction<Conversation[]>) => {
            console.log("setConv", action.payload);
            state.conversations = action.payload;
        },
        updateConversation: (state, action) => {
            console.log("updateConversation received", action.payload);
            console.log("Current convs:", state.conversations);

            const index = state.conversations.findIndex(c => c.conversationId === action.payload.conversationId);

            if (index !== -1) {
                state.conversations[index].lastMessagePreview = action.payload.lastMessagePreview;
                state.conversations[index].lastUpdatedAt = action.payload.lastUpdatedAt;
            } else {
                state.conversations.unshift(action.payload);
            }

            state.conversations.sort((a, b) => new Date(b.lastUpdatedAt).getTime() - new Date(a.lastUpdatedAt).getTime());

            console.log("After update:", state.conversations);
        },
        increaseUnreadCount: (state, action) => {
            console.log("increaseUnreadCount", action.payload);
            const index = state.conversations.findIndex(c => c.conversationId === action.payload);
            if (index !== -1) {
                console.log("increaseUnreadCount index:", index);
                state.conversations[index].unreadCount += 1;
            }
        },
        resetUnreadCount: (state, action) => {
            const index = state.conversations.findIndex(c => c.conversationId === action.payload);
            if (index !== -1) {
                state.conversations[index].unreadCount = 0;
            }
        },


    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchConversation.fulfilled, (state, action: PayloadAction<Conversation[]>) => {
                state.loading = false;
                state.conversations = action.payload;
            })
            .addCase(fetchConversation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setConv ,updateConversation,increaseUnreadCount,resetUnreadCount} = conversationSlice.actions;
export default conversationSlice.reducer;
