import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from './userSlice';
import {fetchParticipants} from '../action/participantAction';

// Khởi tạo initial state
interface ParticipantState {
  participants: User[];
  loading: boolean;
  error: string | null;
}

const initialState: ParticipantState = {
  participants: [],
  loading: false,
  error: null,
};

// Tạo slice
const participantSlice = createSlice({
  name: 'participant',
  initialState,
  reducers: {
    setParticipant: (state, action: PayloadAction<User>) => {
      state.participants = [...state.participants, action.payload];
    },
    clearParticipants: state => {
      state.participants = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchParticipants.pending, state => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchParticipants.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.participants = action.payload;
      },
    );
    builder.addCase(fetchParticipants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Có lỗi xảy ra';
    });
  },
});

// Export action & reducer
export const {setParticipant, clearParticipants} = participantSlice.actions;
export default participantSlice.reducer;
