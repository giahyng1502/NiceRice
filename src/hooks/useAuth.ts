import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { RootState } from '../store/store';
import { useAppDispatch } from './useAppDispatch';
import { clearUser } from '../store/reducers/userSlice';
import { getInformation, loginUser } from '../store/action/userAction';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const user = useSelector((state: RootState) => state.user.data);
    const loading = useSelector((state: RootState) => state.user.loading);
    const error = useSelector((state: RootState) => state.user.error);
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    const login = async (email: string, password: string) => {
        await dispatch(loginUser({ email, password }));
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('accessToken');
            dispatch(clearUser());
        } catch (error) {
            console.error('Lỗi khi xoá user:', error);
        }
    };


    return { user, loading, login, logout, error, isLoggedIn };
};
