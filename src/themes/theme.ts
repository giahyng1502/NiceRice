import {Theme} from "../store/types/theme";

export const themes: Record<Theme,
    {
        background: string;
        text: string;
        primary: string;
        dot : string;
        activeDot : string;
        backgroundIntroduce1 : string;
        backgroundIntroduce2: string;
        btnTextColor : string;
        text2 : string;
        text3 : string;
        textReceipt : string;
        textSend : string;
        backgroundModal : string;
        bottomSheetColor : string;
        backgroundMessageReceipt : string;
        backgroundMessageSend : string;
        backgroundMessage : string;
        borderRadiusColorIcon : string;
    }> = {
    light: {
        background: '#292929',
        text: '#40C4FF',
        text2 : '#F0F0F3',
        text3 : '#9A9BB1',
        textReceipt : '#2C2D3A',
        textSend : '#FFFFFF',
        dot : '#7FD7FF',
        activeDot : '#40C4FF',
        primary: '#40C4FF',
        borderRadiusColorIcon: '#40C4FF',
        bottomSheetColor : '#4A4B62',
        btnTextColor : '#292929',
        backgroundModal : '#4A4B62',
        backgroundMessageReceipt : '#1565C0',
        backgroundMessageSend : '#FFFFFF',
        backgroundMessage : '#2F2E41',
        backgroundIntroduce1 : '#092A51',
        backgroundIntroduce2 : '#686A8A'

    },
    // blue: {
    //     background: '#E3F2FD',
    //     text: '#0D47A1',
    //     primary: '#2196F3',  // Màu chủ đạo cho blue theme
    // },
    // green: {
    //     background: '#E8F5E9',
    //     text: '#388E3C',
    //     primary: '#66BB6A',  // Màu chủ đạo cho green theme
    // },
    // red: {
    //     background: '#FFEBEE',
    //     text: '#D32F2F',
    //     primary: '#F44336',  // Màu chủ đạo cho red theme
    // },
};
