import {createAsyncThunk} from '@reduxjs/toolkit';
import {Messages} from '../reducers/messageSlice';
import axiosClient from '../../apis/axios';
// Define type cho tham số truyền vào
type GetMessageParams = {
  conversationId: string;
  since?: string; // optional — để lấy tin nhắn mới hơn/từ thời điểm này
};

// 1. Tạo asyncThunk lấy message theo conversationId
export const getMessageByConv = createAsyncThunk<
    Messages[],            // Kiểu dữ liệu trả về khi thành công
    GetMessageParams,       // Kiểu tham số truyền vào (object chứa conversationId và since)
    { rejectValue: string } // Kiểu reject lỗi trả về
>(
    'message/getByConversation',
    async ({ conversationId, since }, thunkAPI) => {
      try {
        const response = await axiosClient<Messages[]>('messages/getMessage', {
          params: {
            conversationId,
            since,
          },
        });

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue('Lỗi mạng');
      }
    }
);
