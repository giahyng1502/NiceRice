import React from 'react';
import {TextInput} from 'react-native';
import {useTheme} from '../../hooks/useTheme';

const TextInputMultiline = ({value, setValue, placeHolder = ''}) => {
  const {theme} = useTheme();
  return (
    <TextInput
      multiline={true}
      textAlignVertical="top"
      style={{
        height: 100,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        borderWidth: 2,
        borderColor: theme.borderColor,
        elevation: 6,
        color: theme.text2,
        backgroundColor: theme.background,
      }}
      placeholder={placeHolder}
      placeholderTextColor={theme.text3}
      value={value}
      onChangeText={setValue}
    />
  );
};

export default TextInputMultiline;
