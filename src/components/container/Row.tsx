import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

type Props = {
    children: React.ReactNode,
    styleCustom?: ViewStyle,
}
const Row : React.FC<Props> = ({ children,styleCustom }) => (
  <View style={[styles.row,styleCustom]}>
      {children}
  </View>
);

const styles = StyleSheet.create({
  row: {
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
  },
});

export default Row;
