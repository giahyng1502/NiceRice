import {User} from '../reducers/userSlice';
import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosClient from '../../apis/axios';
import {RegisterForm} from '../../screens/register/registerForm';
import {logCriticalError, logInfo} from '../../utils/errorHandler';
import userProfile from "../../screens/member/information/UserProfile";
// This should return a promise that resolves to the user data
export const getInformation = createAsyncThunk<User>(
  'user/getInformation',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosClient.get('/users/getProfile');
      return response.user as User;
    } catch (error: any) {
      logCriticalError('Error at getInformation', error);

      return rejectWithValue(error.response?.data || 'Có lỗi xảy ra');
    }
  },
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (
    loginData: {userName: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      // console.log(loginData);
      const response: any = await axiosClient.post('/users/login', loginData);
      const {accessToken, profile} = response;

      // Lưu token vào AsyncStorage
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('loginType', 'normal');
      return profile as User;
    } catch (error: any) {
      logCriticalError('Error at loginUser', error, {
        email: loginData.userName,
      });

      return rejectWithValue(error?.message || 'Đăng nhập thất bại');
    }
  },
);

export const loginWithGoogle = createAsyncThunk(
  'user/loginWithGoogle',
  async (idToken, {rejectWithValue}) => {
    try {
      console.log('loginWithGoogle');
      console.log(idToken);
      const response: any = await axiosClient.post('/users/loginWithGoogle', {
        idToken,
      });
      const {accessToken, profile} = response;

      // Lưu token vào AsyncStorage
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('loginType', 'google');

      return profile as User;
    } catch (error: any) {
      logCriticalError('Error at loginWithGoogle', error);
      return rejectWithValue(error?.message || 'Đăng nhập thất bại');
    }
  },
);

export const registerUser = createAsyncThunk(
  'user/sign-Up',
  async (registerData: RegisterForm, {rejectWithValue}) => {
    try {
      console.log(registerData);
      const response: any = await axiosClient.post(
        '/users/sign-Up',
        registerData,
      );
      if (!response?.profile) {
        rejectWithValue('Tạo tài khoản thất bại');
      }
      const {accessToken, profile} = response;
      await AsyncStorage.setItem('accessToken', accessToken);
      return profile as User;
    } catch (error: any) {
      logCriticalError('Error at registerUser', error, {
        userName: registerData.userName,
      });
      return rejectWithValue(error?.message || 'Tạo tài khoản thất bại');
    }
  },
);

export const updateInformation = createAsyncThunk<User>(
  'user/updateInformation',
  async (information, {rejectWithValue}) => {
    try {
      const response = await axiosClient.put(
        '/users/update/information',
        information,
      );
      return response.user as User;
    } catch (error: any) {
      logCriticalError('Error at updateInformation', error);
      return rejectWithValue(error.response?.data || 'Có lỗi xảy ra');
    }
  },
);

export const getAllMember = createAsyncThunk<User[], number>(
  'user/getAllMember',
  async (skip, {rejectWithValue}) => {
    try {
      const response = await axiosClient.get('/users/getMember', {
        params: {skip},
      });
      return response.members as User[];
    } catch (error: any) {
      console.error(error);
      logInfo('getAllMember', error);

      return rejectWithValue(error.response?.data || 'Có lỗi xảy ra');
    }
  },
);

export const logOut = createAsyncThunk(
  'user/logout',
  async (_, {rejectWithValue}) => {
    try {
      return await axiosClient.get('/users/logout');
    } catch (error: any) {
      console.error(error);
      logCriticalError('Error at logOut', error);
      return rejectWithValue(error.response?.data || 'Có lỗi xảy ra');
    }
  },
);

export const getOneProfileOfUser = async (userId: number) => {
  try {
    return  axiosClient.get(`/users/getUserById/${userId}`);
  } catch (error) {
    logCriticalError('Error at getOneProfileOfUser', error, {userId : userId.toString()});
    return null;
  }
};
