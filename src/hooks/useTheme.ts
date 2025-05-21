import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { themes } from '../themes/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setColorTheme } from '../store/reducers/themeSlice';
import { Theme } from '../store/types/theme';

// Hook trả theme hiện tại và hàm setTheme
export const useTheme = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.theme.theme);

    const setTheme = async (newTheme: Theme) => {
        dispatch(setColorTheme(newTheme));
        console.log(newTheme);
        await AsyncStorage.setItem('APP_THEME', newTheme);
    };

    return {
        themeType : theme,
        theme: themes[theme] || themes.dark,
        setTheme,
    };
};

// Hook để load theme từ AsyncStorage khi app khởi động
export const useThemeManager = () => {
    const dispatch = useDispatch();

    const loadTheme = async () => {
        const savedTheme = (await AsyncStorage.getItem('APP_THEME')) as Theme;
        console.log(savedTheme);
        if (savedTheme) {
            dispatch(setColorTheme(savedTheme));
        }
    };

    return {
        loadTheme,
    };
};
