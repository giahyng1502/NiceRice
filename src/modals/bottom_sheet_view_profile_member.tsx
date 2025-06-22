import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import {useTranslation} from 'react-i18next';
import {FONT_SIZE} from '../styles/globalStyles';
import {useBottomSheet} from './bottom_sheet_modal';
import BottomSheetConfirmBlock from './bottomsheet_confirm_block';

const BottomSheetConfirmViewProfile = ({
  fullName,
  onClose,
  navigation,
  userId,
}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const {openBottomSheet, closeBottomSheet} = useBottomSheet();

  const handleViewProfile = () => {
    // Logic to view profile
    onClose();
    navigation.navigate('UserProfile', {
      userId: userId,
    });
  };

  const handleBlockUser = () => {
    // Logic to block the user
    onClose();
    openBottomSheet(
      <BottomSheetConfirmBlock
        fullName={fullName}
        onClose={() => closeBottomSheet()}
        userId={userId}
      />,
      ['35%'], // snap points
      0, // default index
    );
  };
  return (
    <View
      style={{
        backgroundColor: theme.background,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: FONT_SIZE.bodyLarge,
          color: theme.text3,
          fontWeight: 'bold',
          marginVertical: 10,
        }}>
        {fullName}
      </Text>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: theme.borderColor,
          marginVertical: 10,
        }}
      />
      <TouchableOpacity onPress={handleViewProfile}>
        <Text
          style={{
            fontSize: FONT_SIZE.bodyLarge,
            color: theme.text2,
            fontWeight: 'bold',
            marginVertical: 10,
          }}>
          {t('modal.viewProfile')}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: theme.borderColor,
          marginVertical: 10,
        }}
      />
      <TouchableOpacity onPress={handleBlockUser}>
          <Text
              style={{
                  fontSize: FONT_SIZE.bodyLarge,
                  color: theme.text2,
                  fontWeight: 'bold',
                  marginVertical: 10,
              }}>
              {t('modal.Block')}
          </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomSheetConfirmViewProfile;
