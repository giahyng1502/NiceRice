import { User } from "../reducers/userSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../../apis/axios";
// This should return a promise that resolves to the user data
export const getInformation = createAsyncThunk<User>(
    "user/getInformation",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get("/users/getProfile");
            return response.data as User;
        } catch (error: any) {
            console.error(error);
            return rejectWithValue(error.response?.data || "Có lỗi xảy ra");
        }
    }
);


export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (loginData: { email: string; password: string }, { rejectWithValue }) => {
        try {
            console.log(loginData);
            const response  = await axiosClient.post('/users/login', loginData);
            const { accessToken, profile } = response;

            // Lưu token vào AsyncStorage
            await AsyncStorage.setItem('accessToken', accessToken);

            return profile as User;
        } catch (error: any) {
            return rejectWithValue(error?.message || 'Đăng nhập thất bại');
        }
    }
);
