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
    borderColor: string;
    backgroundItem: string;
    iconColor: string;
    inputBar: string;
    searchContainer: string;
    deleteSearch: string;
    backgroundLogin1: string;
    backgroundLogin2: string;
    skeletonColor: string;
    highlightColor: string;
    activeColor: string;
}> = {
    dark: {
        background: '#292929',
        backgroundItem: '#1b1b1b',
        text: '#40C4FF',
        text2: '#F0F0F3',
        borderColor: '#444444',
        text3: '#9A9BB1',
        textReceipt: '#2C2D3A',
        textSend: '#FFFFFF',
        dot: '#7FD7FF',
        searchContainer : '#5B5C72',
        deleteSearch : '#8d8d8d',
        activeDot: '#40C4FF',
        primary: '#40C4FF',
        borderRadiusColorIcon: '#40C4FF',
        bottomSheetColor: '#292929',
        btnTextColor: '#292929',
        backgroundModal: '#4A4B62',
        backgroundMessageReceipt: '#1565C0',
        backgroundMessageSend: '#FFFFFF',
        backgroundMessage: '#2F2E41',
        backgroundIntroduce1: '#092A51',
        backgroundIntroduce2: '#686A8A',
        backgroundLogin1 : "#03A9F4",
        backgroundLogin2 : "#E8F0F9",
        inputBar : '#686A8A',
        iconColor: '#ffffff',
        skeletonColor : "#424242",
        highlightColor : "rgba(255,255,255,0.12)",
        activeColor : "#333C4D"

    },
    light: {
        background: '#FFFFFF',
        backgroundItem: '#F4F4F4',
        text: '#0D47A1',
        text2: '#212121',
        deleteSearch : '#c6c6c6',
        text3: '#757575',
        textReceipt: '#2C2D3A',
        textSend: '#FFFFFF',
        dot: '#B0BEC5',
        activeDot: '#0D47A1',
        primary: '#40C4FF',
        borderColor: '#e0e0e0',

        borderRadiusColorIcon: '#40C4FF',
        inputBar: '#eaeaea',
        bottomSheetColor: '#ECEFF1',
        btnTextColor: '#FFFFFF',
        searchContainer : '#F0F0F0',
        backgroundModal: '#ECEFF1',
        backgroundMessageReceipt: '#1565C0',
        backgroundMessageSend: '#FFFFFF',
        backgroundMessage: '#E9EAEB',
        backgroundIntroduce1: '#E0F7FA',
        backgroundIntroduce2: '#B2EBF2',
        backgroundLogin1 : "#1A47B8",
        backgroundLogin2 : "#9A9BB1",
        iconColor: '#4A4A4A',
        skeletonColor : "#E0E0E0",

        highlightColor : "rgba(255,255,255,0.6)",
        activeColor : "#E6ECF5"

    }
};
