import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Theme} from '../types/theme';

interface ThemeState {
  theme: Theme;
}
const initialState: ThemeState = {
  theme: 'dark',
};
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setColorTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
  },
});

export const {setColorTheme} = themeSlice.actions;
export default themeSlice.reducer;
