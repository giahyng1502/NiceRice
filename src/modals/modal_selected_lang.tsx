import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {globalStyles} from '../styles/globalStyles';
import {useTheme} from '../hooks/useTheme';
import {changeLanguage} from '../i18n';
interface IProps {
  onClose: () => void;
}

const LanguageSheet: React.FC<IProps> = ({onClose}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const handleLanguage = (lang: string) => {
    changeLanguage(lang);
    onClose();
  };
  return (
      <View
        style={{
          padding: 15,
        }}>
        <TouchableOpacity
          style={[
            globalStyles.buttonHeight,
            {
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
          onPress={() => {
            handleLanguage('en');
          }}>
          <Text
            style={[
              globalStyles.title,
              {
                color: theme.text2,
              },
            ]}>
            {t('lang.en')}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderColor: theme.text3,
            borderBottomWidth: 1,
          }}></View>
        <TouchableOpacity
          style={[
            globalStyles.buttonHeight,
            {
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
          onPress={() => {
            handleLanguage('vi');
          }}>
          <Text
            style={[
              globalStyles.title,
              {
                color: theme.text2,
              },
            ]}>
            {t('lang.vi')}
          </Text>
        </TouchableOpacity>
      </View>
  );
};

export default LanguageSheet;
