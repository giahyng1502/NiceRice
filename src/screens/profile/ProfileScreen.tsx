import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {globalStyles, width} from '../../styles/globalStyles';
import IconUpdateFull from '../../assets/svgs/ic_pen_edit_full';
import {useTheme} from '../../hooks/useTheme';
import Margin from '../../components/margin/magin';
import Row from '../../components/container/Row';
import IconCoppy from '../../assets/svgs/ic_copy';
import IconUpdateOuline from '../../assets/svgs/ic_pen_edit_outline';
import IconLogout from '../../assets/svgs/ic_logout';
import EditInfoDialog from '../../modals/modal_edit_profile';
import {useTranslation} from 'react-i18next';
import {useAuth} from '../../hooks/useAuth';
import {useSnackbar} from '../../provider/SnackbarProvider';
import {useBottomSheet} from "../../modals/bottom_sheet_modal";

const ProfileScreen = () => {
  const {theme} = useTheme();
  const {logout, loadUser, user} = useAuth();
  const {showSnackbar} = useSnackbar();
  const {openBottomSheet ,closeBottomSheet} = useBottomSheet();
  // hàm copy nội dung
  const handleCopy = (value: any) => {
    if (value) {
      Clipboard.setString(value);
      showSnackbar('Copied to clipboard', 'info');
    }
  };

  useEffect(() => {
    console.log(user);
    loadUser();
  }, []);
  const {t} = useTranslation();

    // Hàm mở bottom sheet với nội dung sửa thông tin
    const openEditProfileSheet = () => {
        openBottomSheet(
            <EditInfoDialog
                onClose={() => closeBottomSheet()}
            />
            ,
            ['90%', '95%'], // snap points
            0 // index mặc định
        );
    };
  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.circle}>
        <Image
          source={require('../../assets/images/Avatar.png')}
          style={styles.avatar}
        />
        <View
          style={{
            borderRadius: 100,
            width: width * 0.1,
            height: width * 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.primary,
            position: 'absolute',
            top: 2,
            right: 2,
          }}>
          <IconUpdateFull color={theme.iconColor} />
        </View>
      </View>

      <Margin top={5} />

      <Text
        style={[globalStyles.title, {color: theme.text2, fontWeight: '700'}]}>
        {user?.fullName}
      </Text>

      <Margin top={5} />

      <Row styleCustom={{width: width * 0.8, justifyContent: 'space-between'}}>
        <Text style={[globalStyles.mediumText, {color: theme.text2}]}>
          {t('modal.phone')} :{` ${user?.phoneNumber}` || 'Chưa xác định'}
        </Text>
        <TouchableOpacity
          onPress={() => handleCopy(user?.phoneNumber)}
          disabled={!user?.phoneNumber}>
          <IconCoppy color={theme.iconColor} />
        </TouchableOpacity>
      </Row>

      <Margin top={2} />

      <Row styleCustom={{width: width * 0.8, justifyContent: 'space-between'}}>
        <Text style={[globalStyles.mediumText, {color: theme.text2}]}>
          {t('modal.gender')}: {t(`birthday.${user?.gender}`) || ''}
        </Text>
      </Row>

      <Margin top={2} />
      <Row styleCustom={{width: width * 0.8, justifyContent: 'space-between'}}>
        <Text style={[globalStyles.mediumText, {color: theme.text2}]}>
          {t('modal.birthday')}:{' '}
          {user?.birthday
            ? new Date(user.birthday).toLocaleDateString('vi-VN')
            : ''}
        </Text>
        <TouchableOpacity
          onPress={() =>
            handleCopy(
              user?.birthday
                ? new Date(user.birthday).toLocaleDateString('vi-VN')
                : '',
            )
          }>
          <IconCoppy color={theme.iconColor} />
        </TouchableOpacity>
      </Row>
      <Margin top={2} />
      <Row styleCustom={{width: width * 0.8, justifyContent: 'space-between'}}>
        <Text style={[globalStyles.mediumText, {color: theme.text2}]}>
          {t('modal.joinedDate')}:{' '}
          {user?.createdAt
            ? new Date(user?.createdAt).toLocaleDateString('vi-VN')
            : ''}
        </Text>
        <TouchableOpacity
          onPress={() =>
            handleCopy(
              user?.createdAt
                ? new Date(user?.createdAt).toLocaleDateString('vi-VN')
                : '',
            )
          }>
          <IconCoppy color={theme.iconColor} />
        </TouchableOpacity>
      </Row>

      <Margin top={4} />

      <TouchableOpacity
        style={[
          globalStyles.buttonHeight,
          {
            backgroundColor: theme.primary,
            flexDirection: 'row',
            justifyContent: 'center',
            width: width * 0.8,
            borderRadius: 8,
            alignItems: 'center',
          },
        ]}
        onPress={() => {
            openEditProfileSheet()
        }}>
        <IconUpdateOuline color={theme.iconColor} />
        <Text
          style={[
            globalStyles.contentSize,
            {
              color: theme.text2,
              marginLeft: 8,
            },
          ]}>
          {t('modal.editProfile')}
        </Text>
      </TouchableOpacity>

      <Margin top={2} />

      <TouchableOpacity
        style={[
          globalStyles.buttonHeight,
          {
            backgroundColor: '#FEECEB',
            flexDirection: 'row',
            justifyContent: 'center',
            width: width * 0.8,
            borderRadius: 8,
            alignItems: 'center',
          },
        ]}
        onPress={() => logout()}>
        <IconLogout color={theme.iconColor} />
        <Text
          style={[
            globalStyles.contentSize,
            {
              color: '#F6695E',
              marginLeft: 8,
            },
          ]}>
          {t('modal.logout')}
        </Text>
      </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: width * 0.4,
    height: 150,
    borderRadius: '100%',
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default ProfileScreen;
