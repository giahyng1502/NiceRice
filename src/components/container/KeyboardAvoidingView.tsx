import React, {ReactNode, useState} from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    View,
} from 'react-native';

type Props = {
    children: ReactNode;
}

const KeyboardCustomView : React.FC<Props> = ({children}) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{ flex: 1 ,width : '100%' }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0}>
                {children}
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default KeyboardCustomView;
