import {Dimensions, StyleSheet} from 'react-native';
export const {width, height} = Dimensions.get('window');


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
