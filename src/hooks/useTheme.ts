import { useSelector } from 'react-redux';
import {RootState} from "../store/store";
import {themes} from "../themes/theme";

export const useTheme = ()=>{
    const theme = useSelector((state: RootState) => state.theme.theme);
    return themes[theme] || themes.light;  // Lấy theme mặc định nếu không tìm thấy theme
}
