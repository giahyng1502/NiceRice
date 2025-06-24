import {useState} from 'react';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {registerUser} from '../../store/action/userAction';
import {useSnackbar} from '../../provider/SnackbarProvider';

export interface RegisterForm {
  fullName: string;
  userName: string;
  gender: string;
  password: string;
  confirmPassword: string;
}

export const useRegisterForm = (isAgree: boolean) => {
  const [information, setInformation] = useState<RegisterForm>({
    fullName: '',
    userName: '',
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
    const {fullName, userName, gender, password, confirmPassword} = information;

    // Kiểm tra các trường bắt buộc
    if (!fullName || !userName || !gender || !password || !confirmPassword) {
      showSnackbar('Vui lòng điền đầy đủ thông tin!', 'error');
      return false;
    }

    // Kiểm tra userName không chứa ký tự đặc biệt
    const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
    if (!usernameRegex.test(userName)) {
      showSnackbar(
        'Tên đăng nhập chỉ được chứa chữ cái, số, dấu gạch dưới và dài từ 4–20 ký tự.',
        'error',
      );
      return false;
    }

    // Kiểm tra password đủ mạnh
    if (password.length < 6) {
      showSnackbar('Mật khẩu phải có ít nhất 6 ký tự.', 'error');
      return false;
    }

    // Kiểm tra đồng ý điều khoản
    if (!isAgree) {
      showSnackbar(
        'Bạn cần phải đồng ý với chính sách của chúng tôi!',
        'error',
      );
      return false;
    }

    // Kiểm tra khớp mật khẩu
    if (password !== confirmPassword) {
      showSnackbar('Mật khẩu nhập lại không trùng khớp!', 'error');
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
