import React, {useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BottomSheetModal from './bottom_sheet_modal';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import {globalStyles} from '../styles/globalStyles';
import {useTheme} from '../hooks/useTheme';
import Margin from "../components/margin/magin";
interface IProps {
  visible: boolean;
  onClose: () => void;
}

const PoliceSheet: React.FC<IProps> = ({visible, onClose}) => {
  const snapPoints = useMemo(() => ['30%', '60%', '90%'], []);
  const {theme} = useTheme();
  const {t} = useTranslation();
  return (
    <BottomSheetModal
      visible={visible}
      onClose={onClose}
      snapPoints={snapPoints}
      initialSnapIndex={3}>
      <BottomSheetScrollView style={{
        padding : 15
      }}>
          <Text
              style={[
                  globalStyles.title,
                  {
                      color: theme.text2,
                      fontWeight: '700'
                  },
              ]}>
              {t('termsPolicies')}
          </Text>
          <Margin bottom={2} />
        <Text
          style={[
            globalStyles.contentSize,
            {
              color: theme.text2,
            },
          ]}>
          {t('privacyPolicy')}
        </Text>
        <Margin bottom={2} />
        <Text
          style={[
            globalStyles.contentSize,
            {
              color: theme.text2,
            },
          ]}>
          {t('termsOfService')}
        </Text>
        <Margin bottom={2} />
        <Text
          style={[
            globalStyles.contentSize,
            {
              color: theme.text2,
            },
          ]}>
          {t('contentPolicy')}
        </Text>
        <Margin bottom={2} />
        <Text
          style={[
            globalStyles.contentSize,
            {
              color: theme.text2,
            },
          ]}>
          {t('childProtectionPolicy')}
        </Text>
        <Margin bottom={2} />
        <Text
          style={[
            globalStyles.contentSize,
            {
              color: theme.text2,
            },
          ]}>
          {t('contactInfo')}
        </Text>
        <Margin bottom={2} />
        <Text
            style={[
              globalStyles.contentSize,
              {
                color: theme.text2,
              },
            ]}>
          {t('PhoneNumber')}
        </Text>
        <Margin bottom={2} />
        <Text
            style={[
              globalStyles.contentSize,
              {
                color: theme.text2,
              },
            ]}>
          {t('Mail')}
        </Text>
        <Margin bottom={3} />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};


export default PoliceSheet;
