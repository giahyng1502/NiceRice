import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {FONT_SIZE} from '../../styles/globalStyles';

const ButtonChecked = ({label, checked, onPress}) => {
  const {theme} = useTheme();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: theme.background},
        checked && {
          backgroundColor: theme.activeColor,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text
        style={[
          styles.text,
          {color: theme.text2},
          checked && {color: theme.text3},
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 6,
  },
  text: {
    fontSize: FONT_SIZE.bodyLarge,
  },
});

export default ButtonChecked;
