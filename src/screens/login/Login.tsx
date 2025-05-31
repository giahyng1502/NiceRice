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
import {loginUser} from '../../store/action/userAction';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {useSnackbar} from "../../provider/SnackbarProvider";

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
        showSnackbar(res.payload as string,'error')
        return;
    }
      showSnackbar('Đăng nhập thành công','success')

  };
  return (
    <View style={[styles.screen, {backgroundColor: theme.background}]}>
      <TextInput
        placeholder="Email"
        placeholderTextColor={theme.text2}
        style={[
          styles.textInput,
          {
            backgroundColor: theme.inputBar,
            color: theme.text2,
          },
        ]}
        value={information.userName}
        onChangeText={text => handleChange('userName', text)}
      />
      <Margin top={2} />

      <TextInput
        placeholder="Password"
        placeholderTextColor={theme.text2}
        style={[
          styles.textInput,
          {
            backgroundColor: theme.inputBar,
            color: theme.text2,
          },
        ]}
        value={information.password}
        onChangeText={text => handleChange('password', text)}
      />
      <Margin top={2} />

      <TouchableOpacity
        style={{
          backgroundColor: theme.primary,
          width: width * 0.4,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}
        onPress={handleLogin}>
        <Text
          style={{
            color: theme.text2,
            fontSize: 16,
          }}>
          SingIn
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
