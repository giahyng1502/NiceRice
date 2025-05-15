import {Dimensions, StyleSheet} from 'react-native';
export const {width, height} = Dimensions.get('window');


export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentSize: {
        fontSize: width*0.045,
    },
    mediumText: {
        fontSize: width*0.05,
    },
    title : {
        fontSize: width*0.06,
        fontWeight : '800'
    },
    buttonHeight : {
        height : height*0.06,
    }
})
