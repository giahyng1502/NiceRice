import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {FONT_SIZE} from '../../styles/globalStyles';
import {useTheme} from '../../hooks/useTheme';

type Props = {
    title: string;
    onPress: () => void;
    customButton?: StyleProp<ViewStyle>;
}

const TextButton: React.FC<Props> = ({title, onPress,customButton}) => {
  const {theme} = useTheme();
  return (
    <TouchableOpacity
      style={[customButton,{
        backgroundColor: theme.bottomSheetColor,
        padding: 10,
        borderRadius: 8,
        elevation: 4,
        height: 50,
        borderWidth: 2,
        borderColor: theme.borderColor,
      }]}
      onPress={onPress}>
      <Text
        style={{
          fontSize: FONT_SIZE.titleMedium,
          color: theme.text2,
            fontWeight : 'bold',
          textAlign: 'center',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
