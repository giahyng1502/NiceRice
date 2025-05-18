import React, {useRef, useState, useMemo, useEffect} from 'react';
import {Text, StyleSheet} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useTheme} from '../hooks/useTheme';
import InputComponent from '../components/input/InputConponent';
import KeyboardCustomView from '../components/container/KeyboardAvoidingView';
import ButtonCustom from '../components/buttons/Button';
import {globalStyles} from '../styles/globalStyles';
import Margin from '../components/margin/magin';
import SelectInput from '../components/input/selectInput';
import DatePickerExample from "../components/input/DialogPickerInput";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onSave: (data: {name: string; email: string}) => void; // Callback to save the name and email
}

const EditInfoDialog: React.FC<Props> = ({isVisible, onClose, onSave}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [gender, setGender] = useState<string>('');
  const theme = useTheme();
  // Snap points for BottomSheet: 30%, 60%, and 90%
  const snapPoints = useMemo(() => ['60%', '90%'], []);

  // Open the BottomSheet when the `isVisible` prop changes
  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.snapToIndex(1); // Open BottomSheet at 60%
    } else {
      bottomSheetRef.current?.close(); // Close the BottomSheet
    }
  }, [isVisible]);

  const saveInfo = () => {
    // Trigger the onSave callback with the current name and email
    onSave({name, email});
    onClose(); // Close the BottomSheet after saving
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isVisible ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      backgroundStyle={{
        backgroundColor: theme.bottomSheetColor,
      }}
      enableDynamicSizing={false}>
      <BottomSheetView
        enableFooterMarginAdjustment={true}
        style={[
          styles.contentContainer,
          {
            backgroundColor: theme.bottomSheetColor,
          },
        ]}>
        <Text style={[styles.title, {color: theme.text2}]}>Edit Profile</Text>
          {/* TextInput to update name */}
          <InputComponent
            placeholder="Enter your name"
            label={'Name'}
            value={name}
            labelStyle={{color: theme.text2}}
            inputStyle={{backgroundColor: 'transparent', color: theme.text2}}
            onChangeText={setName} // Update state when text changes
          />

          {/* TextInput to update email */}
          <InputComponent
            placeholder="Enter your phone number"
            value={phone}
            labelStyle={{color: theme.text2}}
            label={'Phone Number'}
            inputStyle={{backgroundColor: 'transparent', color: theme.text2}}
            onChangeText={setPhone} // Update state when text changes
          />
          {/*chọn giới tính*/}
          <SelectInput item={gender} setItem={setGender} />

          <DatePickerExample date={birthday} setDate={setBirthday}/>
          <InputComponent
            placeholder="Enter your email"
            value={email}
            labelStyle={{color: theme.text2}}
            label={'Email'}
            inputStyle={{backgroundColor: 'transparent', color: theme.text2}}
            onChangeText={setEmail} // Update state when text changes
          />
          {/* Action buttons for saving or canceling */}
          <Margin top={2} />
          <ButtonCustom
            onPress={() => {}}
            text={'Save'}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EditInfoDialog;
