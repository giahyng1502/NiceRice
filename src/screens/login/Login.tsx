import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Margin from '../../components/margin/magin';
import {User} from '../../store/reducers/userSlice';
import {useTheme} from '../../hooks/useTheme';
import {width} from '../../styles/globalStyles';
import {loginUser, loginWithGoogle} from '../../store/action/userAction';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useSnackbar} from '../../provider/SnackbarProvider';
import {getDataGoogle} from './loginwithGoogle';
import IconGoogle from '../../assets/svgs/ic_google';
import {logInfo} from '../../utils/errorHandler';
import TextButton from '../../components/buttons/TextButton';

const Login = () => {
  const [information, setInformation] = useState({
    userName: '',
    password: '',
  });
  const dispatch = useAppDispatch();

  const {theme} = useTheme();
  const {showSnackbar} = useSnackbar();
  const handleChange = (key: keyof User, value: string) => {
    setInformation(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleLogin = async () => {
    if (!information.userName || !information.password) {
      Alert.alert('Lỗi', 'Vui lòng nhập userName và mật khẩu');
      return;
    }
    // Gọi login từ useAuth hook
    const res = await dispatch(loginUser(information));
    if (loginUser.rejected.match(res)) {
      showSnackbar(res.payload as string, 'error');
      return;
    }
    showSnackbar('Đăng nhập thành công', 'success');
    logInfo('User logged in', {username: information.userName});
  };
  const handleLoginWithGoogle = async () => {
    try {
      const idToken = await getDataGoogle();
      const res = await dispatch(loginWithGoogle(idToken));
      if (loginWithGoogle.rejected.match(res)) {
        showSnackbar(res.payload as string, 'error');
        return;
      }
      showSnackbar('Đăng nhập thành công', 'success');

      logInfo('Đăng nhập thành công');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={[styles.screen, {backgroundColor: theme.background}]}>
      <TextInput
        placeholder="User name"
        placeholderTextColor={theme.text2}
        style={[
          styles.textInput,
          {
            backgroundColor: theme.background,
            color: theme.text2,
            borderWidth: 1,
            borderColor: theme.borderColor,
          },
        ]}
        value={information.userName}
        onChangeText={text => handleChange('userName', text)}
      />
      <Margin top={2} />

      <TextInput
        placeholder="Password"
        placeholderTextColor={theme.text2}
        secureTextEntry
        style={[
          styles.textInput,
          {
            backgroundColor: theme.background,
            color: theme.text2,
            borderWidth: 1,
            borderColor: theme.borderColor,
          },
        ]}
        value={information.password}
        onChangeText={text => {
          handleChange('password', text);
        }}
      />
      <Margin top={2} />

      <TextButton
        onPress={handleLogin}
        title={'Login'}
        customButton={{width: '70%'}}
      />

      <TouchableOpacity
        style={{
          backgroundColor: theme.background,
          width: '70%',
          flexDirection: 'row',
          height: 50,
          elevation: 6,
          borderWidth: 1,
          borderColor: theme.borderColor,
          gap: 10,
          marginTop: 10,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
        }}
        onPress={handleLoginWithGoogle}>
        <IconGoogle />
        <Text
          style={{
            color: theme.text2,
            fontSize: 16,
          }}>
          Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  header: {
    width: width * 2,
    flexDirection: 'row',
  },
  image: {
    width: width * 0.3,
    height: width * 0.3,
    resizeMode: 'contain',
  },
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
});

export default Login;
