import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {globalStyles} from '../../styles/globalStyles';
import Margin from '../../components/margin/magin';
import {useAuth} from '../../hooks/useAuth';
import LoadingModal from '../../modals/modal_loading';
import RegisterScreen from './RegisterScreen';
import Login from './Login';
import {ScrollView} from 'react-native-gesture-handler';
import KeyboardCustomView from '../../components/container/KeyboardAvoidingView';
import {useTranslation} from 'react-i18next';

const {width} = Dimensions.get('window');

const tabs = ['signIn', 'signup'];

const LoginScreen: React.FC = () => {
  const {theme} = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useSharedValue(0);
  const {loading, error} = useAuth();
  const {t} = useTranslation();
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const handleSwitch = (index: number) => {
    setActiveTab(index);
    translateX.value = withTiming(-index * width, {duration: 300});
  };

  return (
    <KeyboardCustomView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={[styles.container, {backgroundColor: theme.background}]}>
        <Margin top={5} />
        <Animated.View style={[styles.header, animatedStyle]}>
          <View style={styles.screen}>
            <Image
              source={require('../../assets/images/icon_group.png')}
              style={styles.image}
            />
            <Text style={[globalStyles.title, {color: theme.text2}]}>
              {t('LoginScreen.welcome')}
            </Text>
            <Text
              style={[
                globalStyles.contentSize,
                {color: theme.text2, flexWrap: 'wrap', textAlign: 'center'},
              ]}>
              {t('LoginScreen.loginContinue')}
            </Text>
          </View>

          <View style={styles.screen}>
            <Image
              source={require('../../assets/images/icon_group.png')}
              style={styles.image}
            />
            <Text style={[globalStyles.title, {color: theme.text2}]}>
              {t('LoginScreen.letgo_setup')}
            </Text>
            <Text
              style={[
                globalStyles.contentSize,
                {color: theme.text2, flexWrap: 'wrap', textAlign: 'center'},
              ]}>
              {t('LoginScreen.setup_minutes')}
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
                  {color: activeTab === index ? '#06B6D4' : '#aaa'},
                ]}>
                {t(`LoginScreen.${tab}`)}
              </Text>
              {activeTab === index && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </View>

        {/* Animated Views */}
        <Animated.View style={[styles.sliderContainer, animatedStyle]}>
          {/* SignIn */}

          <Login />
          {/* SignUp */}
          <RegisterScreen />
        </Animated.View>

        <LoadingModal visible={loading} />
      </ScrollView>
    </KeyboardCustomView>
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
    width: 100,
    height: 100,
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
    backgroundColor: '#3B82F6',
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
