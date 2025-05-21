import {Theme} from "../store/types/theme";

export const themes: Record<Theme, {
    background: string;
    text: string;
    primary: string;
    dot: string;
    activeDot: string;
    backgroundIntroduce1: string;
    backgroundIntroduce2: string;
    btnTextColor: string;
    text2: string;
    text3: string;
    textReceipt: string;
    textSend: string;
    backgroundModal: string;
    bottomSheetColor: string;
    backgroundMessageReceipt: string;
    backgroundMessageSend: string;
    backgroundMessage: string;
    borderRadiusColorIcon: string;
    backgroundItem: string;
    iconColor: string;
    inputBar: string;
}> = {
    dark: {
        background: '#292929',
        backgroundItem: '#1b1b1b',
        text: '#40C4FF',
        text2: '#F0F0F3',
        text3: '#9A9BB1',
        textReceipt: '#2C2D3A',
        textSend: '#FFFFFF',
        dot: '#7FD7FF',
        activeDot: '#40C4FF',
        primary: '#40C4FF',
        borderRadiusColorIcon: '#40C4FF',
        bottomSheetColor: '#4A4B62',
        btnTextColor: '#292929',
        backgroundModal: '#4A4B62',
        backgroundMessageReceipt: '#1565C0',
        backgroundMessageSend: '#FFFFFF',
        backgroundMessage: '#2F2E41',
        backgroundIntroduce1: '#092A51',
        backgroundIntroduce2: '#686A8A',
        inputBar : '#686A8A',
        iconColor: '#ffffff'
    },
    light: {
        background: '#FFFFFF',
        backgroundItem: '#F4F4F4',
        text: '#0D47A1',
        text2: '#212121',
        text3: '#757575',
        textReceipt: '#2C2D3A',
        textSend: '#FFFFFF',
        dot: '#B0BEC5',
        activeDot: '#0D47A1',
        primary: '#40C4FF',
        borderRadiusColorIcon: '#40C4FF',
        inputBar: '#eaeaea',
        bottomSheetColor: '#ECEFF1',
        btnTextColor: '#FFFFFF',
        backgroundModal: '#ECEFF1',
        backgroundMessageReceipt: '#1565C0',
        backgroundMessageSend: '#FFFFFF',
        backgroundMessage: '#E9EAEB',
        backgroundIntroduce1: '#E0F7FA',
        backgroundIntroduce2: '#B2EBF2',
        iconColor: '#000000'
    }
};
