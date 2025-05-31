import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Margin from '../../components/margin/magin';
import GenderButton from '../../components/buttons/GenderButton';
import { width } from '../../styles/globalStyles';
import { useTheme } from '../../hooks/useTheme';
import {useRegisterForm} from "../register/registerForm";
import ModalCongratulation from "../../modals/modal_congratulation";

const RegisterScreen = () => {
    const { theme } = useTheme();
    const {
        information,
        handleChange,
        handleSignUp,
        passwordError,
    } = useRegisterForm();

    return (
        <View style={[styles.screen, { backgroundColor: theme.background }]}>
            <TextInput
                placeholder="Full Name"
                placeholderTextColor={theme.text2}
                style={[styles.textInput, { backgroundColor: theme.inputBar, color: theme.text2 }]}
                value={information.fullName}
                onChangeText={text => handleChange('fullName', text)}
            />
            <Margin top={2} />

            <View style={styles.genderContainer}>
                {['Male', 'Female', 'Other'].map(gender => (
                    <GenderButton
                        key={gender}
                        label={gender}
                        selected={information.gender === gender}
                        onPress={() => handleChange('gender', gender)}
                        theme={theme}
                    />
                ))}
            </View>
            <Margin top={2} />

            <TextInput
                placeholder="User name"
                placeholderTextColor={theme.text2}
                style={[styles.textInput, { backgroundColor: theme.inputBar, color: theme.text2 }]}
                value={information.userName}
                onChangeText={text => handleChange('userName', text)}
            />
            <Margin top={2} />

            <TextInput
                placeholder="Password"
                placeholderTextColor={theme.text2}
                style={[styles.textInput, { backgroundColor: theme.inputBar, color: theme.text2 }]}
                secureTextEntry
                value={information.password}
                onChangeText={text => handleChange('password', text)}
            />
            <Margin top={2} />

            <TextInput
                placeholder="Confirm Password"
                placeholderTextColor={theme.text2}
                style={[styles.textInput, { backgroundColor: theme.inputBar, color: theme.text2 }]}
                secureTextEntry
                value={information.confirmPassword}
                onChangeText={text => handleChange('confirmPassword', text)}
            />
            {passwordError ? (
                <Text style={{ color: 'red', marginTop: 5 }}>{passwordError}</Text>
            ) : null}
            <Margin top={3} />

            <TouchableOpacity
                onPress={handleSignUp}
                style={{
                    backgroundColor: theme.primary,
                    width: width * 0.4,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 8,
                }}
            >
                <Text style={{ color: theme.text2, fontSize: 16 }}>Sign Up</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        width: width,
        padding: 15,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textInput: {
        borderRadius: 8,
        width: '100%',
        height: 50,
        padding: 15,
        fontSize: 16,
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
});

export default RegisterScreen;
