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
  conversationId: number;
  senderId: number;
  content: string;
  createdAt: string;
  type?: MessageType;
  link?: string;
  status?: MessageStatus;
};

// Initial state
interface MessageState {
  messages: Messages[];
  loading: boolean;
  error: string | null;
  currentConversationId: number | null;
}

const initialState: MessageState = {
  messages: [],
  loading: false,
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

    addMessageRedux: (state, action: PayloadAction<any>) => {
      state.messages.unshift(action.payload);
    },
    onMessageFromSocket: (state, action: PayloadAction<Messages>) => {
      console.log('onMessageFromSocket', action.payload);
      const index = state.messages.findIndex(
        msg => msg.messageId === action.payload.messageId,
      );

      if (index !== -1) {
        // Nếu tồn tại -> cập nhật
        state.messages[index] = action.payload;
      } else {
        // Nếu chưa có -> thêm mới vào đầu mảng
        state.messages.unshift(action.payload);
      }

      console.log('redux', action.payload);
    },

    setMessages: (state, action: PayloadAction<Messages[]>) => {
      state.messages = action.payload;
    },
    updateMessageStatus: (
      state,
      action: PayloadAction<{messageId: string; status: MessageStatus}>,
    ) => {
      const message = state.messages.find(
        m => m.messageId === action.payload.messageId,
      );
      if (message) {
        message.status = action.payload.status;
      }
    },
    clearMessages: state => {
      state.messages = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMessageByConv.pending, state => {
        // Khi bắt đầu gọi API, ví dụ set trạng thái loading
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessageByConv.fulfilled, (state, action) => {
        // Khi gọi API thành công, action.payload là mảng messages
        state.loading = false;
        state.messages = [...action.payload, ...state.messages];
      })
      .addCase(getMessageByConv.rejected, (state, action) => {
        // Khi gọi API thất bại
        state.loading = false;
        state.error = action.payload || 'Lỗi không xác định';
      });
  },
});

export const {
  addMessageRedux,
  onMessageFromSocket,
  setMessages,
  updateMessageStatus,
  clearMessages,
  setCurrentConversationId,
} = messageSlice.actions;

export default messageSlice.reducer;
