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
import {useBottomSheet} from '../../modals/bottom_sheet_modal';
import {AvatarDefault, formatSmartDate} from '../../utils/formatDate';
import {guessLangFromLocale} from '../../utils/timeZoneFromLocal';
import {updateAvatar} from '../../store/reducers/userSlice';
import useCamera from './useProfileScreen';
import LoadingModal from '../../modals/modal_loading';
const ProfileScreen = () => {
  const {theme, themeType} = useTheme();
  const {logout, loadUser, user, dispatch, loading} = useAuth();
  const {showSnackbar} = useSnackbar();
  const {t, i18n} = useTranslation();
  const locale = i18n.language || 'en';
  const lang = guessLangFromLocale(locale);
  const {openBottomSheet, closeBottomSheet} = useBottomSheet();
  const {onPicker} = useCamera(lang, themeType, theme, t);

  const handleAvatar = async () => {
    const res = await onPicker();
    // @ts-ignore
    const avatar: string = res[0].path || '';
    dispatch(updateAvatar(avatar));
  };
  const formattedBirthday = formatSmartDate(
    user?.birthday,
    locale,
    t('except.Not specified'),
  );
  const formattedcreatedAt = formatSmartDate(
    user?.createdAt,
    locale,
    t('except.Not specified'),
  );

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
  // Hàm mở bottom sheet với nội dung sửa thông tin
  const openEditProfileSheet = () => {
    openBottomSheet(
      <EditInfoDialog onClose={() => closeBottomSheet()} />,
      ['90%', '95%'], // snap points
      0, // index mặc định
    );
  };
  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.circle}>
        <Image
          source={{uri: user?.avatarUrl || AvatarDefault}}
          style={styles.avatar}
        />
        <TouchableOpacity
          onPress={handleAvatar}
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
        </TouchableOpacity>
      </View>

      <Margin top={5} />

      <Text
        style={[globalStyles.title, {color: theme.text2, fontWeight: '700'}]}>
        {user?.fullName}
      </Text>

      <Margin top={5} />

      <Row styleCustom={{width: width * 0.8, justifyContent: 'space-between'}}>
        <Text style={[globalStyles.mediumText, {color: theme.text2}]}>
          {t('modal.phone')}:{' '}
          {user?.phoneNumber
            ? user.phoneNumber
            : `${t('except.Not specified')}`}
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
          {t('modal.gender')}:{' '}
          {t(`birthday.${user?.gender}`) || `${t('except.Not specified')}`}
        </Text>
      </Row>

      <Margin top={2} />
      <Row styleCustom={{width: width * 0.8, justifyContent: 'space-between'}}>
        <Text style={[globalStyles.mediumText, {color: theme.text2}]}>
          {t('modal.birthday')}: {formattedBirthday}
        </Text>

        <TouchableOpacity onPress={() => handleCopy(formattedBirthday)}>
          <IconCoppy color={theme.iconColor} />
        </TouchableOpacity>
      </Row>
      <Margin top={2} />
      <Row styleCustom={{width: width * 0.8, justifyContent: 'space-between'}}>
        <Text style={[globalStyles.mediumText, {color: theme.text2}]}>
          {t('modal.joinedDate')}: {formattedcreatedAt}
        </Text>

        <TouchableOpacity onPress={() => handleCopy(formattedcreatedAt)}>
          <IconCoppy color={theme.iconColor} />
        </TouchableOpacity>
      </Row>

      <Margin top={4} />

      <TouchableOpacity
        style={[
          globalStyles.buttonHeight,
          {
            backgroundColor: theme.background,
            elevation: 6,
            flexDirection: 'row',
            justifyContent: 'center',
            width: width * 0.8,
            borderRadius: 8,
            alignItems: 'center',
          },
        ]}
        onPress={() => {
          openEditProfileSheet();
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
            backgroundColor: theme.background,
            flexDirection: 'row',
            elevation: 6,
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
              color: theme.text2,
              marginLeft: 8,
            },
          ]}>
          {t('modal.logout')}
        </Text>
      </TouchableOpacity>
      <LoadingModal visible={loading} />
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
    width: 150,
    height: 150,
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    resizeMode: 'cover',
  },
});

export default ProfileScreen;
