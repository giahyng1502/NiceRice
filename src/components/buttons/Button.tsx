import React from 'react';
import {Text, TouchableOpacity, StyleProp, ViewStyle, TextStyle} from 'react-native';
type Props = {
    onPress: () => void;
    text: string;
    styleCustom?: StyleProp<ViewStyle>;
    styleText? : StyleProp<TextStyle>;
}
const ButtonCustom :React.FC<Props>= ({onPress,text,styleCustom,styleText}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styleCustom]}>
            <Text style={styleText}>{text}</Text>
        </TouchableOpacity>
    )
}
export default ButtonCustom;
