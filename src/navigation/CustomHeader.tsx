import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  SharedValue,
} from 'react-native-reanimated';
import IconAdd from '../assets/svgs/ic_add';
import CreateGroupModal from '../modals/modal_create_group';
import React, {useRef, useState} from 'react';

type Props = {
  scrollY: SharedValue<number>;
  theme: any;
};

const CustomHeader: React.FC<Props> = ({scrollY, theme}) => {
  const iconRef = useRef<View>(null);
  const [position, setPosition] = useState({x: 0, y: 0});
  const [visible, setVisible] = useState(false);
  const animatedHeaderStyle = useAnimatedStyle(() => {
    const scrollYValue = scrollY.value as number;
    return {
      height: interpolate(scrollYValue, [0, 100], [80, 0], 'clamp'),
      opacity: interpolate(scrollYValue, [0, 100], [1, 0], 'clamp'),
    };
  });

  // const animatedIconStyle = useAnimatedStyle(() => {
  //   const scrollYValue = scrollY.value as number;
  //   const rotation = interpolate(scrollYValue, [0, 100], [0, 180], 'clamp');
  //   return {
  //     transform: [{rotate: `${rotation}deg`}],
  //   };
  // });
  //
  // const handleAddPress = () => {
  //   if (iconRef.current) {
  //     iconRef.current.measure((fx, fy, width, height, px, py) => {
  //       setPosition({x: px, y: py});
  //     });
  //   }
  //   setVisible(true);
  // };

  return (
    <Animated.View
      style={[
        styles.header,
        animatedHeaderStyle,
        {backgroundColor: theme.background},
      ]}>
      <Text
        style={[
          styles.title,
          {
            color: theme.text2,
          },
        ]}>
        NiceRice
      </Text>
      {/*<Animated.View ref={iconRef} style={[animatedIconStyle]}>*/}
      {/*  <TouchableOpacity onPress={handleAddPress} activeOpacity={0.7}>*/}
      {/*    <IconAdd color={theme.iconColor} />*/}
      {/*  </TouchableOpacity>*/}
      {/*</Animated.View>*/}

      <CreateGroupModal
        visible={visible}
        onClose={() => setVisible(false)}
        position={position}
      />
    </Animated.View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});
