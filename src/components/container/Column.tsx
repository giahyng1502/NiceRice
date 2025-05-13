import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
type Props = {
    children: React.ReactNode,
    styleCustom?: ViewStyle,
}
const Column : React.FC<Props> = ({ children,styleCustom }) => (
    <View style={[styles.column,styleCustom]}>
        {children}
    </View>
);

const styles = StyleSheet.create({
    column: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

export default Column;
