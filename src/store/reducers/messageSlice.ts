import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getMessageByConv} from '../action/messageAction';

// Định nghĩa type
export type MessageType =
  | 'text'
  | 'image'
  | 'video'
  | 'audio'
  | 'file'
  | 'system';

export type MessageStatus = 'pending' | 'received' | 'sent' | 'seen';

export type Messages = {
  messageId: string;
  conversationId: string;
  senderId: number;
  content: string;
  createdAt: string;
  type?: MessageType;
  link?: string;
  status?: MessageStatus;
};

// Initial state
interface MessageState {
  messages: {
    [conversationId: string]: Messages[];
  };
  loading: {
    [conversationId: string]: boolean;
  };
  error: string | null;
  currentConversationId: number | null;
}
const initialState: MessageState = {
  messages: {},
  loading: {},
  error: null,
  currentConversationId: null,
};

// Slice
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setCurrentConversationId: (state, action: PayloadAction<any>) => {
      state.currentConversationId = action.payload;
    },

    addMessageRedux: (state, action: PayloadAction<Messages>) => {
      const message = action.payload;
      const convId = message.conversationId;

      if (!state.messages[convId]) {
        state.messages[convId] = [];
      }

      state.messages[convId].unshift(message);
    },

    onMessageFromSocket: (state, action: PayloadAction<Messages>) => {
      const message = action.payload;
      const convId = message.conversationId;
      console.log(state.messages)
      if (!state.messages[convId]) {
        state.messages[convId] = [];
      }

      const index = state.messages[convId].findIndex(
        msg => msg.messageId === message.messageId,
      );

      if (index !== -1) {
        state.messages[convId][index] = message;
      } else {
        state.messages[convId].unshift(message);
      }
    },

    setMessages: (
      state,
      action: PayloadAction<{conversationId: string; messages: Messages[]}>,
    ) => {
      console.log(action.payload)
      state.messages[action.payload.conversationId] = action.payload.messages;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMessageByConv.pending, (state, action) => {
        const {conversationId} = action.meta.arg;
        state.loading[conversationId] = true;
      })
      .addCase(getMessageByConv.fulfilled, (state, action) => {
        const {conversationId} = action.meta.arg;
        state.loading[conversationId] = false;

        state.messages[conversationId] = [
          ...action.payload,
          ...(state.messages[conversationId] || []),
        ];
      })
      .addCase(getMessageByConv.rejected, (state, action) => {
        const {conversationId} = action.meta.arg;
        state.loading[conversationId] = false;
        state.error = action.payload || 'Lỗi không xác định';
      });
  },
});

export const {
  addMessageRedux,
  onMessageFromSocket,
  setMessages,
  setCurrentConversationId,
} = messageSlice.actions;

export default messageSlice.reducer;
