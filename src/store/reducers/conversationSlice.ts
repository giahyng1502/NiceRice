import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Conversation } from "../../models/types";
import {fetchConversation} from "../action/conversationAction";

interface ConversationState {
    conversations: Conversation[] | null;
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
            state.conversations = action.payload;
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

export const { setConv } = conversationSlice.actions;
export default conversationSlice.reducer;
