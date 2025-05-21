import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import IconSend from '../../../assets/svgs/ic_Send';
import IconAdd from '../../../assets/svgs/ic_add';
import {useTheme} from '../../../hooks/useTheme';
import ModalOption from "../../../modals/modal_option";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
};
export const HEIGHT_INPUT_TOOLBAR = 60;
const CustomInputToolbar: React.FC<Props> = ({value, onChangeText, onSend}) => {
  const [optionModalVisible, setOptionModalVisible] = useState<boolean>(false);

  const {theme} = useTheme();
  return (
    <TouchableWithoutFeedback>
      <View style={[styles.container,{
        backgroundColor : theme.background
      }]}>
        <TouchableOpacity
          style={[styles.addButton,{
            backgroundColor : theme.primary
          }]}
          onPress={() =>{
            setOptionModalVisible(true);
          }}>
          <IconAdd color={'#FFFFFF'} />
        </TouchableOpacity>

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Write a message"
          placeholderTextColor="#ccc"
          style={[styles.input,{
            backgroundColor: theme.inputBar,
          }]}
          onSubmitEditing={() => {
            onSend();
            Keyboard.dismiss();
          }}
        />

        <TouchableOpacity
          style={[styles.sendButton, {backgroundColor: theme.primary}]}
          onPress={onSend}>
          <IconSend color={'#FFFFFF'}/>
        </TouchableOpacity>

        <ModalOption visible={optionModalVisible} onClose={()=>{
          setOptionModalVisible(false);
        }}/>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomInputToolbar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: HEIGHT_INPUT_TOOLBAR,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  addButton: {
    padding: 8,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  input: {
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    marginHorizontal: 10,
    color: 'white',
  },
  sendButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
});
