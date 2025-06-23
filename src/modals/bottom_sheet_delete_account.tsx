import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useTheme} from '../hooks/useTheme';
import {FONT_SIZE, width} from '../styles/globalStyles';
import TextButton from '../components/buttons/TextButton';
import Margin from '../components/margin/magin';
import TextInputMultiline from '../components/input/TextInputMultiline';
import {ScrollView} from 'react-native-gesture-handler';
import BottomSheetConfirmBlock from './bottomsheet_confirm_block';
import {useBottomSheet} from './bottom_sheet_modal';
import BottomSheetConfirmDelete from './modalComfirmDeleteAccount';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {transform} from '@babel/core';
import IconBack from '../assets/svgs/icon_back';
import KeyboardCustomView from '../components/container/KeyboardAvoidingView';

const BottomSheetDeleteAccount = ({onClose}) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const [reason, setReason] = useState<string>();
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));
  const handleSwitch = (index: number) => {
    translateX.value = withTiming(-index * width, {duration: 300});
  };

  return (
    <KeyboardCustomView>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{
          backgroundColor: theme.background,
        }}>
        <Animated.View
          style={[
            animatedStyle,
            {
              width: width * 2,
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
            },
          ]}>
          <View
            style={{
              width: width,
              flex: 1,
            }}>
            <View
              style={{
                width: width * 0.9,
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
              <TextButton
                title={t('delete_account_modal.confirm')}
                onPress={() => {
                  handleSwitch(1);
                }}
              />
            </View>
          </View>
          <BottomSheetConfirmDelete
            onClose={onClose}
            handleSwitch={() => {
              handleSwitch(0);
            }}
          />
        </Animated.View>
      </ScrollView>
    </KeyboardCustomView>
  );
};
export default BottomSheetDeleteAccount;
