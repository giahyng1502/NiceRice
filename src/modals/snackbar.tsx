import React, {useEffect, useRef} from 'react';
import {Animated, Text, StyleSheet} from 'react-native';
import {useSnackbar} from '../provider/SnackbarProvider';

const CustomSnackbar: React.FC = () => {
    const translateX = useRef(new Animated.Value(100)).current;
    const {visible, message, type, hideSnackbar} = useSnackbar();

    const backgroundColors = {
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FFC107',
        info: '#2196F3',
    };

    useEffect(() => {
        if (visible) {
            Animated.timing(translateX, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setTimeout(() => {
                    Animated.timing(translateX, {
                        toValue: 100,
                        duration: 300,
                        useNativeDriver: true,
                    }).start(hideSnackbar);
                }, 2500);
            });
        }

    }, [visible]);

    if (!visible) {return null;}

    return (
        <Animated.View
            style={[
                styles.container,
                {backgroundColor: backgroundColors[type], transform: [{translateX}]},
            ]}>
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 120,
        right: 10,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        zIndex: 999,
        elevation: 5,
    },
    text: {
        color: '#fff',
        fontSize: 15,
    },
});

export default CustomSnackbar;
