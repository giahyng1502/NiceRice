import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {globalStyles} from '../../styles/globalStyles';
import Margin from '../../components/margin/magin';
import {User} from '../../store/reducers/userSlice';
import {useTranslation} from 'react-i18next';
import GenderButton from '../../components/buttons/GenderButton';
import {useAuth} from '../../hooks/useAuth';
import LottieView from 'lottie-react-native';
import LoadingAnimation from '../../components/animation/loading_animation';
import LoadingModal from "../../modals/modal_loading";

const {width} = Dimensions.get('window');

const tabs = ['SIGN IN', 'SIGN UP'];

const LoginScreen: React.FC = () => {
  const {theme} = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useSharedValue(0);
  const {login, user, loading, error} = useAuth();
  const [information, setInformation] = useState({
    email: '',
    phoneNumber: '',
    birthDay: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const handleChange = (key: keyof User, value: string) => {
    setInformation(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSwitch = (index: number) => {
    setActiveTab(index);
    translateX.value = withTiming(-index * width, {duration: 300});
  };

  const handleLogin = async () => {
    if (!information.email || !information.password) {
      Alert.alert('Lỗi', 'Vui lòng nhập email và mật khẩu');
      return;
    }
    // Gọi login từ useAuth hook
    await login(information.email, information.password);
  };
  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Margin top={5} />
      <Animated.View style={[styles.header, animatedStyle]}>
        <View style={styles.screen}>
          <Image
            source={require('../../assets/images/icon_group.png')}
            style={styles.image}
          />
          <Text style={[globalStyles.title, {color: theme.text2}]}>
            Welcome Back!
          </Text>
          <Text
            style={[
              globalStyles.contentSize,
              {color: theme.text2, flexWrap: 'wrap', textAlign: 'center'},
            ]}>
            Login to your account to continue
          </Text>
        </View>

        <View style={styles.screen}>
          <Image
            source={require('../../assets/images/icon_group.png')}
            style={styles.image}
          />
          <Text style={[globalStyles.title, {color: theme.text2}]}>
            Let's get you setup
          </Text>
          <Text
            style={[
              globalStyles.contentSize,
              {color: theme.text2, flexWrap: 'wrap', textAlign: 'center'},
            ]}>
            It should take a couple of minutes to create your account
          </Text>
        </View>
      </Animated.View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSwitch(index)}
            style={styles.tabButton}>
            <Text
              style={[
                styles.tabText,
                {color: activeTab === index ? '#0072ff' : '#aaa'},
              ]}>
              {tab}
            </Text>
            {activeTab === index && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Animated Views */}
      <Animated.View style={[styles.sliderContainer, animatedStyle]}>
        {/* SignIn */}
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
            value={information.email}
            onChangeText={text => handleChange('email', text)}
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

        {/* SignUp */}
        <View style={[styles.screen, {backgroundColor: theme.background}]}>
          <TextInput
            placeholder="Name"
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
            placeholder="Email"
            placeholderTextColor={theme.text2}
            style={[
              styles.textInput,
              {
                backgroundColor: theme.inputBar,
                color: theme.text2,
              },
            ]}
            value={information.email}
            onChangeText={text => handleChange('email', text)}
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
            value={information.email}
            onChangeText={text => handleChange('email', text)}
          />
          <Margin top={2} />
          <TextInput
            placeholder="Comfirm Password"
            placeholderTextColor={theme.text2}
            style={[
              styles.textInput,
              {
                backgroundColor: theme.inputBar,
                color: theme.text2,
              },
            ]}
            value={information.email}
            onChangeText={text => handleChange('email', text)}
          />
          <Margin top={2} />
          <TextInput
            placeholder="PhoneNumber"
            placeholderTextColor={theme.text2}
            style={[
              styles.textInput,
              {
                backgroundColor: theme.inputBar,
                color: theme.text2,
              },
            ]}
            value={information.phoneNumber}
            onChangeText={text => handleChange('phoneNumber', text)}
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
            }}>
            <Text
              style={{
                color: theme.text2,
                fontSize: 16,
              }}>
              Sing Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <LoadingModal visible={loading}/>

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
  tabContainer: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
  tabButton: {
    width: '50%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  activeIndicator: {
    height: 2,
    backgroundColor: 'red',
    width: '100%',
    marginTop: 5,
  },
  sliderContainer: {
    flexDirection: 'row',
    width: width * 2,
    flex: 1,
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
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  genderButton: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
