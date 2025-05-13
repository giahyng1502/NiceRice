import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';
import SVGComponent from "../../assets/svgs/logo_echat";
import AnimatedSVG from "../../assets/svgs/logo_echat";
const LoadingOverlay: React.FC = () => {
    return (
        <View style={styles.container}>
            <AnimatedSVG/>
        </View>
    );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        position: 'relative',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#00C897',
        opacity: 0.6,
    },
});
