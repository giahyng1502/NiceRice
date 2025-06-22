import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import {useTranslation} from 'react-i18next';
import {FONT_SIZE, width} from '../styles/globalStyles';
import TextButton from '../components/buttons/TextButton';
import Margin from '../components/margin/magin';
import IconBack from '../assets/svgs/icon_back';

const BottomSheetConfirmDelete = ({onClose, handleSwitch}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const [password, setPassword] = useState<string>();
  return (
    <View
      style={{
        width: width,
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          gap: 5,
          alignItems: 'center',
        }}
        onPress={() => {
          handleSwitch(0);
        }}>
        <IconBack color={theme.iconColor} />
        <Text
          style={{
            fontSize: FONT_SIZE.bodyLarge,
            color: theme.text2,
            fontWeight: 'bold',
          }}>
            {t('report.cancel')}
        </Text>
      </TouchableOpacity>
      <Margin top={2} />
      <Text
        style={{
          fontSize: FONT_SIZE.titleMedium,
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
          width: '90%',
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
          width: '90%',
        }}
      />
    </View>
  );
};

export default BottomSheetConfirmDelete;
