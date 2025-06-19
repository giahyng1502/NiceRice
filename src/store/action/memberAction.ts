import {createAsyncThunk} from '@reduxjs/toolkit';
import {Participant} from '../../hooks/useParticipant';
import axiosClient from '../../apis/axios';
import {MemberReturnType} from '../reducers/memberSlice';
import crashlytics from "@react-native-firebase/crashlytics";
import {logInfo} from "../../utils/errorHandler";

export const featMemberByGroup = createAsyncThunk<MemberReturnType, string>(
  'member/featMemberByGroup',
  async (groupId: string, {rejectWithValue}) => {
    try {
      const response = await axiosClient.get('/conversation/participant', {
        params: {conversationId: groupId},
      });
      logInfo('Fetched members successfully',{groupId : groupId})
      return {
        conversationId: groupId,
        participants: response.users,
      };
    } catch (error: any) {
      console.error('Error fetching members:', error);
      crashlytics().log('Error fetching members:');
      crashlytics().recordError(error);
      return rejectWithValue(
        error.response?.data || 'Có lỗi xảy ra khi lấy thành viên',
      );
    }
  },
);

// Add member
export const addMemberToGroup = createAsyncThunk<
  MemberReturnType,
  {groupId: string; members: number}
>('member/addMemberToGroup', async ({groupId, members}, {rejectWithValue}) => {
  try {
    const response = await axiosClient.post('/conversation/add-participant', {
      conversationId: groupId,
      members,
    });
    return {
      conversationId: groupId,
      participants: response.addedMembers,
    };
  } catch (error: any) {
    console.error('Error adding member:', error);
    return rejectWithValue(
      error.response?.data || 'Có lỗi xảy ra khi thêm thành viên',
    );
  }
});
