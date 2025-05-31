import { useState } from 'react';
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {registerUser} from "../../store/action/userAction";
import {useSnackbar} from "../../provider/SnackbarProvider";

export interface RegisterForm {
    fullName: string;
    userName: string;
    phoneNumber: string;
    gender: string;
    password: string;
    confirmPassword: string;
}

export const useRegisterForm = () => {
    const [information, setInformation] = useState<RegisterForm>({
        fullName: '',
        userName: '',
        phoneNumber: '',
        gender: '',
        password: '',
        confirmPassword: '',
    });


    const [passwordError, setPasswordError] = useState('');
    const {showSnackbar} = useSnackbar();
    const dispatch = useAppDispatch();
    const handleChange = (key: keyof RegisterForm, value: string) => {
        setInformation(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSignUp = async () => {
        if (information.password !== information.confirmPassword) {
            setPasswordError('Mật khẩu không khớp');
            return false;
        }
        setPasswordError('');

        const res = await dispatch(registerUser(information));

        if (registerUser.rejected.match(res)) {
            if (res.payload === 'Email đã được đăng ký!') {
                showSnackbar('Tài khoản đã tồn tại!', 'error');
            } else {
                showSnackbar('Đăng ký thất bại. Vui lòng thử lại!', 'error');
            }
            return false;
        }

        return true;
    };


    return {
        information,
        handleChange,
        handleSignUp,
        passwordError,
    };
};
