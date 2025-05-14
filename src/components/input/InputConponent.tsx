import React from 'react';
import { View, TextInput, StyleSheet, Text, TextInputProps, ViewStyle, TextStyle } from 'react-native';
import {height} from "../../styles/globalStyles";

type InputComponentProps = {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: TextInputProps['keyboardType'];
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle;
    inputStyle?: TextStyle;
};

const InputComponent = ({
                            label,
                            value,
                            onChangeText,
                            placeholder,
                            secureTextEntry = false,
                            keyboardType = 'default',
                            containerStyle,
                            labelStyle,
                            inputStyle,
                        }: InputComponentProps) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={[labelStyle,styles.label]}>{label}</Text>}
            <TextInput
                style={[styles.input, inputStyle]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                placeholderTextColor="#888"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 4,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
    },
    input: {
        height: height*0.06,
        borderWidth: 1,
        borderColor: '#8688A1',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#fff',
    },
});

export default InputComponent;
