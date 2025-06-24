import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Margin from '../../components/margin/magin';
import GenderButton from '../../components/buttons/GenderButton';
import {FONT_SIZE, width} from '../../styles/globalStyles';
import {useTheme} from '../../hooks/useTheme';
import {useRegisterForm} from '../register/registerForm';
import ModalCongratulation from '../../modals/modal_congratulation';
import TextButton from '../../components/buttons/TextButton';
import IconCheck from '../../assets/svgs/icon_check';
import IconChecked from '../../assets/svgs/ic_checked';
import {useTranslation} from 'react-i18next';
import {useBottomSheet} from '../../modals/bottom_sheet_modal';
import PoliceSheet from '../../modals/PoliceSheet';

const RegisterScreen = () => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const [isAgree, setIsAgree] = useState<boolean>(false);

  const {information, handleChange, handleSignUp, passwordError} =
    useRegisterForm(isAgree);

  const {openBottomSheet} = useBottomSheet();
  const openPoliceSheet = () => {
    openBottomSheet(
      <PoliceSheet />,
      ['95%'], // snap points
      0, // index mặc định
    );
  };

  return (
    <View style={[styles.screen, {backgroundColor: theme.background}]}>
      <TextInput
        placeholder={t('LoginScreen.fullname')}
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
        placeholder={t('LoginScreen.username')}
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
        placeholder={t('LoginScreen.password')}
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
        secureTextEntry
        value={information.password}
        onChangeText={text => handleChange('password', text)}
      />
      <Margin top={2} />

      <TextInput
        placeholder={t('LoginScreen.confirm_Password')}
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
        secureTextEntry
        value={information.confirmPassword}
        onChangeText={text => handleChange('confirmPassword', text)}
      />
      {passwordError ? (
        <Text style={{color: 'red'}}>{passwordError}</Text>
      ) : null}
      <Margin top={3} />

      <Pressable
        onPress={() => setIsAgree(!isAgree)}
        style={{
          flexDirection: 'row',
          height: 50,
          flexWrap: 'wrap',
        }}>
        {isAgree ? <IconChecked /> : <IconCheck />}
        <Text
          style={{
            color: theme.text2,
            fontSize: FONT_SIZE.bodyLarge,
            marginLeft: 10,
          }}>
          {t('LoginScreen.agree')}
        </Text>
        <TouchableOpacity onPress={openPoliceSheet}>
          <Text style={{color: theme.primary, fontSize: FONT_SIZE.bodyLarge}}>
            {t('moreScreen.aboutApp')}
          </Text>
        </TouchableOpacity>
        <Text style={{color: theme.text2, fontSize: FONT_SIZE.bodyLarge}}>
          {t('LoginScreen.application')}
        </Text>
      </Pressable>

      <Margin top={3} />
      <TextButton
        title={t('LoginScreen.signup')}
        onPress={handleSignUp}
        customButton={{
          width: '100%',
        }}
      />
      <Margin top={4} />
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
