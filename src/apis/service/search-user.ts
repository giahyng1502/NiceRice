import axiosClient from '../axios';
import {FirebaseAuthTypes} from "@react-native-firebase/auth";
import User = FirebaseAuthTypes.User;

export const searchUserFromServer = async (searchString: string) => {
  try {
    const data = await axiosClient.get('users/searchUser', {
      params: {
        query: searchString,
      },
    });
    return data.users as User[];
  } catch (err) {
    console.log('Error in searchUser:', err);
  }
};
