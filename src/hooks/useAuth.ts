import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootState} from '../store/store';
import {useAppDispatch} from './useAppDispatch';
import {clearUser} from '../store/reducers/userSlice';
import {getInformation, updateInformation} from '../store/action/userAction';
import {deleteAllConversations} from '../realm/realm';
import {onGoogleSignOut} from '../screens/login/loginwithGoogle';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.data);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      const loginType = await AsyncStorage.getItem('loginType');

      if (loginType === 'google') {
        await onGoogleSignOut();
      }
      dispatch(clearUser());
      deleteAllConversations();
    } catch (error) {
      console.error('Lỗi khi xoá user:', error);
    }
  };

  const loadUser = async () => {
    await dispatch(getInformation());
  };

  const updateUser = async (information: any) => {
    dispatch(updateInformation(information));
  };

  return {
    user,
    loading,
    loadUser,
    logout,
    error,
    isLoggedIn,
    updateUser,
    dispatch,
  };
};
