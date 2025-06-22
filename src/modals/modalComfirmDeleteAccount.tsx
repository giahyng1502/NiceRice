import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';
import {FONT_SIZE, width} from '../styles/globalStyles';
import TextButton from '../components/buttons/TextButton';
import Margin from '../components/margin/magin';

const ModalComfirmDeleteAccount = ({isVisible, onClose}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const [password, setPassword] = useState<string>();
  return (
    <Modal
      isVisible={isVisible}
      animationIn={'bounceInLeft'}
      animationOut={'bounceOutRight'}
      animationInTiming={500}
      animationOutTiming={500}
      useNativeDriver={true}
        onBackdropPress={onClose}
      backdropOpacity={0.4}>
      <View
        style={{
          backgroundColor: theme.background,
          height: 270,
          width: width * 0.9,
          borderRadius: 16,
          elevation: 8,
          padding: 15,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: FONT_SIZE.titleLarge,
            color: theme.text2,
            fontWeight: 'bold',
            marginBottom: 10,
          }}>
            {t('delete_account_modal.confirmDelete')}
        </Text>
          <Text
              style={{
                  fontSize: FONT_SIZE.bodyLarge,
                  color: theme.text3,
                  marginBottom: 10,
              }}>
              {t('delete_account_modal.description1')}
          </Text>
        <TextInput
          style={{
            fontSize: FONT_SIZE.bodyLarge,
            color: theme.text2,
            borderColor: theme.borderColor,
            borderWidth: 2,
            height: 50,
            backgroundColor: theme.background,
            padding: 10,
            borderRadius: 5,
          }}
          secureTextEntry={true}
          placeholderTextColor={theme.text3}
          value={password}
          onChangeText={setPassword}
          placeholder={t('delete_account_modal.password_placeholder')}
        />
        <Margin top={2} />
        <TextButton
          onPress={onClose}
          title={t('delete_account_modal.confirm')}
          customButton={{
              width : 200,
              alignSelf : 'center'
          }}
        />
      </View>
    </Modal>
  );
};

export default ModalComfirmDeleteAccount;
