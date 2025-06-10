import {Dimensions, StyleSheet} from 'react-native';
export const {width, height} = Dimensions.get('window');

export const FONT_SIZE = {
    displayLarge: 57,
    displayMedium: 45,
    displaySmall: 36,
    headlineLarge: 32,
    headlineMedium: 28,
    customMedium: 26,
    headlineSmall: 24,
    titleLarge: 22,
    titleMedium: 18,
    titleSmall: 14,
    bodyLarge: 16,
    bodyMedium: 14,
    bodySmall: 12,
    labelLarge: 14,
    labelMedium: 12,
    labelSmall: 11,
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentSize: {
        fontSize: 16,
    },
    privewSize: {
        fontSize: 14,
    },
    smailSize: {
        fontSize: 12,
    },
    mediumText: {
        fontSize: 18,
    },
    title : {
        fontSize: 20,
        fontWeight : '800'
    },
    buttonHeight : {
        height : height*0.06,
    }
})
