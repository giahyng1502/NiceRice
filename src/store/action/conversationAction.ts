import {createAsyncThunk} from '@reduxjs/toolkit';
import {Conversation} from '../../models/types';
import axiosClient from '../../apis/axios';

export const fetchConversation = createAsyncThunk<Conversation[], void>(
  'conversation/fetchConversation',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosClient.get<Conversation[]>(
        '/conversation',
      );
        console.log("Conversation response", response);

      const conversations: Conversation[] = response?.conversations || [];
      return conversations;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
