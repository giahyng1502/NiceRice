import axiosClient from '../axios';
import {User} from "../../store/reducers/userSlice";

export const searchUserFromServer = async (searchString: string) :  Promise<User[]> => {
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
