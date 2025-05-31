import React, {useRef, useState, useMemo, useEffect} from 'react';
import {Text, StyleSheet, Alert} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useTheme} from '../hooks/useTheme';
import InputComponent from '../components/input/InputConponent';
import ButtonCustom from '../components/buttons/Button';
import {globalStyles} from '../styles/globalStyles';
import Margin from '../components/margin/magin';
import SelectInput from '../components/input/selectInput';
import DatePickerExample from '../components/input/DialogPickerInput';
import {useAuth} from '../hooks/useAuth';
import {useTranslation} from 'react-i18next';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

const EditInfoDialog: React.FC<Props> = ({isVisible, onClose}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const {theme} = useTheme();
  const {user, updateUser} = useAuth();

  const [fullName, setName] = useState<string>('');
  const [phoneNumber, setPhone] = useState<string>('');
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [gender, setGender] = useState<string>('');
  const {t} = useTranslation();
  const snapPoints = useMemo(() => ['60%', '90%'], []);

  useEffect(() => {
    if (user) {
      setName(user.fullName);
      setPhone(user.phoneNumber || '');
      setGender(user.gender);
      setBirthday(user?.birthday ? new Date(user.birthday) : new Date());
    }
  }, [user]);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.snapToIndex(1);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const saveInfo = async () => {
    if (!fullName.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập họ tên');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.length < 9) {
      Alert.alert('Thông báo', 'Số điện thoại không hợp lệ');
      return;
    }

    await updateUser({
      fullName,
      phoneNumber,
      birthday,
      gender,
    });

    onClose();
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isVisible ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      backgroundStyle={{backgroundColor: theme.bottomSheetColor}}
      enableDynamicSizing={false}>
      <BottomSheetView
        enableFooterMarginAdjustment={true}
        style={[
          styles.contentContainer,
          {backgroundColor: theme.bottomSheetColor},
        ]}>
        <Text style={[styles.title, {color: theme.text2}]}>Edit Profile</Text>

        <InputComponent
          placeholder={t('modal.enterName')}
          label={t('modal.name')}
          value={fullName}
          onChangeText={setName}
          labelStyle={{color: theme.text2}}
          inputStyle={{backgroundColor: 'transparent', color: theme.text2}}
        />

        <InputComponent
          placeholder={t('modal.enterPhone')}
          label={t('modal.phone')}
          value={phoneNumber}
          onChangeText={setPhone}
          labelStyle={{color: theme.text2}}
          inputStyle={{backgroundColor: 'transparent', color: theme.text2}}
          keyboardType="phone-pad"
        />

        <SelectInput item={gender} setItem={setGender} />

        <DatePickerExample date={birthday} setDate={setBirthday} />

        <Margin top={2} />

        <ButtonCustom
          onPress={saveInfo}
          text={t('modal.save')}
          styleCustom={[
            globalStyles.buttonHeight,
            {
              backgroundColor: theme.primary,
              width: '100%',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        />
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default EditInfoDialog;
