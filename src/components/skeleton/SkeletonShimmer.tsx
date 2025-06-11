import React, { useEffect, useRef } from 'react';
import {
    View,
    Animated,
    StyleSheet,
    Dimensions,
    ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../hooks/useTheme';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SkeletonShimmer = ({ style }: { style?: ViewStyle }) => {
    const { theme } = useTheme();
    const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(translateX, {
                toValue: SCREEN_WIDTH,
                duration: 1500,
                useNativeDriver: true,
            }),
        ).start();
    }, []);

    return (
        <View style={[style, { backgroundColor: theme.skeletonColor, overflow: 'hidden' }]}>
            <Animated.View
                style={[
                    StyleSheet.absoluteFill,
                    {
                        transform: [{ translateX }],
                    },
                ]}
            >
                <LinearGradient
                    colors={['transparent', theme.highlightColor, 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFill}
                />
            </Animated.View>
        </View>
    );
};

export default SkeletonShimmer;
