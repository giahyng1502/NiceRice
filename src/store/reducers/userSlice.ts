import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getInformation, loginUser} from '../action/userAction';

// Định nghĩa interface cho user
export interface User {
  userId?: string;
  userName: string;
  email: string;
  avatarUrl?: string;
  phoneNumber: string;
  birthDay: string;
  gender: string;
}

// Khởi tạo initial state
interface UserState {
  data: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
  isLoggedIn : false
};

// Tạo slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: state => {
      state.data = null;
      state.isLoggedIn = false
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getInformation.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getInformation.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(getInformation.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export action & reducer
export const {clearUser, setUser} = userSlice.actions;
export default userSlice.reducer;
