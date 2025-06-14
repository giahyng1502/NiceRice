import React, {useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import {globalStyles} from '../styles/globalStyles';
import {useTheme} from '../hooks/useTheme';
import Margin from '../components/margin/magin';
import {ScrollView} from "react-native-gesture-handler";
interface IProps {
  onClose: () => void;
}

const PoliceSheet: React.FC<IProps> = ({onClose}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  return (
      <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
              paddingBottom: 32,

          }}
          showsVerticalScrollIndicator={true}
          bounces={true}
      >
      <Text
        style={[
          globalStyles.title,
          {
            color: theme.text2,
            fontWeight: '700',
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
    </ScrollView>
  );
};

export default PoliceSheet;
