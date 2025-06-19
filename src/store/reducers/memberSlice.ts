/// memberslice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Participant} from '../../hooks/useParticipant';
import {featMemberByGroup} from '../action/memberAction';
import {addMemberIntoConversation} from '../action/participantAction';
export type MemberReturnType = {
  conversationId: string;
  participants: Participant[];
};

export interface MemberState {
  members: {
    [conversationId: string]: Participant[];
  };

  loading: boolean;
  error: string | null;
}
const initialState: MemberState = {
  members: {},
  loading: false,
  error: null,
};
const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    setMembers: (state, action: PayloadAction<MemberReturnType>) => {
      const {conversationId, participants} = action.payload;
      state.members[conversationId] = participants;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(featMemberByGroup.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(featMemberByGroup.fulfilled, (state, action) => {
        const {conversationId, participants} =
          action.payload as MemberReturnType;
        state.loading = false;
        state.members[conversationId] = participants;
        state.error = null;
      })
      .addCase(featMemberByGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch members';
      })
      .addCase(addMemberIntoConversation.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMemberIntoConversation.fulfilled, (state, action) => {
        const {conversationId, participants} =
          action.payload as MemberReturnType;
        state.loading = false;
        state.members[conversationId] = [
          ...(state.members[conversationId] || []),
          ...participants,
        ];
        state.error = null;
      })
      .addCase(addMemberIntoConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'add to fetch members';
      });
  },
});
export const {setMembers} = memberSlice.actions;
export default memberSlice.reducer;
