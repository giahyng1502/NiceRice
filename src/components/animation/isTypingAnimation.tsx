import React, {useEffect, useRef} from 'react';
import {Animated, View, StyleSheet, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

const TypingAnimation = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;
  const {t} = useTranslation();
  const startWaveAnimation = () => {
    Animated.loop(
      Animated.stagger(150, [
        Animated.sequence([
          Animated.timing(dot1, {
            toValue: -8,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot1, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(dot2, {
            toValue: -8,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot2, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(dot3, {
            toValue: -8,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot3, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  };

  useEffect(() => {
    startWaveAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, {transform: [{translateY: dot1}]}]} />
      <Animated.View style={[styles.dot, {transform: [{translateY: dot2}]}]} />
      <Animated.View style={[styles.dot, {transform: [{translateY: dot3}]}]} />
      <Text
        style={{
          fontSize: 13,
          marginLeft: 5,
          marginBottom: 5,
          color: '#4FC3F7',
        }}>
        {t('isTyping')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 6,
    backgroundColor: '#4FC3F7',
    marginHorizontal: 2,
  },
});

export default TypingAnimation;
