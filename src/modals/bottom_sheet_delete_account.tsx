import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../hooks/useTheme';
import {FONT_SIZE} from '../styles/globalStyles';
import TextButton from '../components/buttons/TextButton';
import Margin from '../components/margin/magin';
import TextInputMultiline from '../components/input/TextInputMultiline';

const BottomSheetDeleteAccount = ({onClose,onDelete}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const [reason, setReason] = useState<string>();
  return (
    <View
      style={{
        backgroundColor: theme.bottomSheetColor,
        flex: 1,
        justifyContent: 'flex-start',
      }}>
      <Text
        style={{
          fontSize: FONT_SIZE.titleLarge,
          color: theme.text2,
          fontWeight: 'bold',
          marginVertical: 10,
        }}>
          {t('delete_account_modal.title')}
      </Text>
      <Text
        style={{
          fontSize: FONT_SIZE.titleMedium,
          color: theme.text3,
        }}>
          {t('delete_account_modal.description1')}

      </Text>
      <Text
        style={{
          fontSize: FONT_SIZE.titleMedium,
          color: theme.text3,
        }}>
          {t('delete_account_modal.description2')}

      </Text>
      <Text
        style={{
          fontSize: FONT_SIZE.titleMedium,
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

export default BottomSheetDeleteAccount;
