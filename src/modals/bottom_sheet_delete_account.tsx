import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../hooks/useTheme';
import {FONT_SIZE} from '../styles/globalStyles';
import TextButton from '../components/buttons/TextButton';
import Margin from '../components/margin/magin';
import TextInputMultiline from '../components/input/TextInputMultiline';
import {ScrollView} from "react-native-gesture-handler";

const BottomSheetDeleteAccount = ({onClose,onDelete}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const [reason, setReason] = useState<string>();
  return (
    <ScrollView
      style={{
        backgroundColor: theme.bottomSheetColor,
      }}>
      <Text
        style={{
          fontSize: FONT_SIZE.titleMedium,
          color: theme.text2,
          fontWeight: 'bold',
          marginVertical: 10,
        }}>
          {t('delete_account_modal.title')}
      </Text>
      <Text
        style={{
          fontSize: FONT_SIZE.bodyLarge,
          color: theme.text3,
        }}>
          {t('delete_account_modal.description1')}

      </Text>
      <Text
        style={{
          fontSize: FONT_SIZE.bodyLarge,
          color: theme.text3,
        }}>
          {t('delete_account_modal.description2')}

      </Text>
      <Text
        style={{
          fontSize: FONT_SIZE.bodyLarge,
          color: theme.text3,
        }}>
          {t('delete_account_modal.description3')}
      </Text>
      <Margin top={2} />
      <TextInputMultiline
        setValue={setReason}
        value={reason}
        placeHolder={t('report.provider')}
      />
      <Margin top={2} />
      <TextButton title={t('delete_account_modal.confirm')} onPress={onDelete} />
    </ScrollView>
  );
};
export default BottomSheetDeleteAccount;
