import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  getAllMember,
  getInformation,
  loginUser,
  loginWithGoogle,
  registerUser,
  updateInformation,
} from '../action/userAction';

// Định nghĩa interface cho user
export interface User {
  userId?: number;
  userName: string;
  fullName: string;
  avatarUrl?: string;
  phoneNumber?: string;
  birthday?: string;
  gender: string;
  createdAt?: Date;
}

// Khởi tạo initial state
interface UserState {
  data: User | null;
  loading: boolean;
  allUser: User[] | [];
  memberOnline: number[];
  isLoggedIn: boolean;
  error: string | null;
  hasMore: boolean;
}

const initialState: UserState = {
  data: null,
  loading: false,
  allUser: [],
  hasMore: true,
  memberOnline: [],
  error: null,
  isLoggedIn: false,
};

// Tạo slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: state => {
      state.data = null;
      state.allUser = [];
      state.isLoggedIn = false;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
    setUserIdsOnline: (state, action: PayloadAction<number[]>) => {
      state.memberOnline = action.payload;
    },
    updateAvatar: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      if (state.data) {
        state.data.avatarUrl = action.payload;
      }
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
          state.isLoggedIn = true;
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
      })
      .addCase(loginWithGoogle.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateInformation.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateInformation.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(
        updateInformation.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload as string;
        },
      )
      .addCase(getAllMember.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllMember.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false;

          const DEFAULT_LIMIT = 50;

          // Tạo Set chứa các userId đã tồn tại
          const existingUserIds = new Set(
            state.allUser.map(user => user.userId),
          );

          // Lọc ra những user mới có id chưa tồn tại
          const newUsers = action.payload.filter(
            user => !existingUserIds.has(user.userId),
          );

          // Gộp lại danh sách không trùng
          state.allUser = [...state.allUser, ...newUsers];

          // Kiểm tra còn trang tiếp theo hay không
          if (action.payload.length < DEFAULT_LIMIT) {
            console.log('data get :', action.payload.length);
            state.hasMore = false;
          }
        },
      )
      .addCase(getAllMember.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export action & reducer
export const {clearUser, setUser, setUserIdsOnline, updateAvatar} =
  userSlice.actions;
export default userSlice.reducer;
