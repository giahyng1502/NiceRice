import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Theme} from "../types/theme";

interface ThemeState {
    theme: Theme;
}
const initialState : ThemeState = {
    theme: 'light',
};
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<Theme>) {
            state.theme = action.payload;
        },
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
