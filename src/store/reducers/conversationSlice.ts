import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  fetchConversation,
  fetchConversationById,
} from '../action/conversationAction';
import {
  addMemberIntoConversation,
  ReturnAddMember,
} from '../action/participantAction';
import {Participant} from '../../hooks/useParticipant';

export interface Conversation {
  conversationId: string;
  createdAt: string;
  unreadCount: number;
  groupName?: string;
  groupAvatar?: string;
  isGroup: boolean;
  lastMessagePreview: 'string';
  lastUpdatedAt: string;
  participants?: [
    {
      fullName?: string;
      avatarUrl?: string;
      seenDateTime?: string;
      isAdmin?: boolean;
      userId?: number;
      conversationId?: string;
      joinedAt?: string;
    },
  ];
}
export interface TypingState {
  conversationId: string;
  userId: number;
}
interface ConversationState {
  conversations: Conversation[] | [];
  loading: boolean;
  error: string | null;
  conversationIsTyping: TypingState[];
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
  error: null,
  conversationIsTyping: [],
};

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConv: (state, action: PayloadAction<Conversation[]>) => {
      console.log('setConv', action.payload);
      state.conversations = action.payload;
    },
    addConv: (state, action: PayloadAction<Conversation>) => {
      console.log('addConversation', action.payload);
      state.conversations.unshift(action.payload);
    },
    updateConversation: (state, action) => {
      console.log('updateConversation received', action.payload);
      console.log('Current convs:', state.conversations);

      const index = state.conversations.findIndex(
        c => c.conversationId === action.payload.conversationId,
      );

      if (index !== -1) {
        state.conversations[index].lastMessagePreview =
          action.payload.lastMessagePreview;
        state.conversations[index].lastUpdatedAt = action.payload.lastUpdatedAt;
      } else {
        state.conversations.unshift(action.payload);
      }

      state.conversations.sort(
        (a, b) =>
          new Date(b.lastUpdatedAt).getTime() -
          new Date(a.lastUpdatedAt).getTime(),
      );

      console.log('After update:', state.conversations);
    },
    increaseUnreadCount: (state, action) => {
      console.log('increaseUnreadCount', action.payload);
      const index = state.conversations.findIndex(
        c => c.conversationId === action.payload,
      );
      if (index !== -1) {
        console.log('increaseUnreadCount index:', index);
        state.conversations[index].unreadCount += 1;
      }
    },
    resetUnreadCount: (state, action) => {
      const index = state.conversations.findIndex(
        c => c.conversationId === action.payload,
      );
      if (index !== -1) {
        state.conversations[index].unreadCount = 0;
      }
    },
    setConvIsTyping: (state, action) => {
      console.log('setConvIdsIsTyping', action.payload);
      const {userId, conversationId} = action.payload;
      const index = state.conversationIsTyping.findIndex(
        c => c.conversationId === conversationId && c.userId === userId,
      );

      if (index !== -1) {
        // Nếu đã tồn tại, xóa vị trí cũ
        state.conversationIsTyping.splice(index, 1);
      }
      // Luôn đưa lên đầu mảng (ưu tiên mới nhất)
      state.conversationIsTyping.unshift(action.payload);
    },
    removeConvIsTyping: (state, action) => {
      const {userId, conversationId} = action.payload;

      state.conversationIsTyping = state.conversationIsTyping.filter(
        typing =>
          !(
            typing.userId === userId && typing.conversationId === conversationId
          ),
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchConversation.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchConversation.fulfilled,
        (state, action: PayloadAction<Conversation[]>) => {
          state.loading = false;
          state.conversations = action.payload;
          console.log('dispatch conv', action.payload);
        },
      )
      .addCase(fetchConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchConversationById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchConversationById.fulfilled,
        (state, action: PayloadAction<Conversation[]>) => {
          state.loading = false;
          state.conversations = [...action.payload, ...state.conversations];
        },
      )
      .addCase(fetchConversationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addMemberIntoConversation.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addMemberIntoConversation.fulfilled,
        (state, action: PayloadAction<ReturnAddMember>) => {
          state.loading = false;
          const {conversationId, participants} = action.payload;

          const index = state.conversations.findIndex(
            conv => conv.conversationId === conversationId,
          );

          if (index !== -1) {
            state.conversations[index].participants =
              state.conversations[index].participants.concat(participants);
          }
        },
      )

      .addCase(addMemberIntoConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setConv,
  updateConversation,
  increaseUnreadCount,
  resetUnreadCount,
  setConvIsTyping,
  removeConvIsTyping,
  addConv,
} = conversationSlice.actions;
export default conversationSlice.reducer;
