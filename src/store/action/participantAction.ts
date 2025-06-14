import { createAsyncThunk } from '@reduxjs/toolkit';
import { Participant } from '../../hooks/useParticipant';
import axiosClient from '../../apis/axios';

export const ADD_MEMBER = 'ADD_MEMBER';

type AddMemberParams = {
  conversationId: string;
  memberIds: number[];
};

export type ReturnAddMember = {
  conversationId: string;
  participants: Participant[];
};

export const addMemberIntoConversation = createAsyncThunk<
    ReturnAddMember,
    AddMemberParams,
    { rejectValue: string }
>(
    'conversation/addParticipant',
    async ({ conversationId, memberIds }, thunkAPI) => {
      try {
        console.log('📤 Gửi lên:', memberIds);

        const response = await axiosClient.post(`/conversation/add-participant`, {
          conversationId,
          memberIds: memberIds,
        });


        // ✅ dispatch action để Realm middleware bắt
        thunkAPI.dispatch({
          type: ADD_MEMBER,
          payload: response.addedMembers,
        });

        console.log('✅ Đã dispatch ADD_MEMBER');

        return {
          conversationId,
          participants: response.addedMembers as Participant[],
        };

      } catch (error: any) {
        console.error('❌ Lỗi thêm thành viên:', error?.response?.data);
        return thunkAPI.rejectWithValue(
            error?.response?.data?.message || 'Thêm thành viên thất bại',
        );
      }
    }
);
