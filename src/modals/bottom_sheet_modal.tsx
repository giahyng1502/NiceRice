import React, {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler';
import {useTheme} from '../hooks/useTheme';

type BottomSheetContextType = {
  openBottomSheet: (
      content: ReactNode,
      snapPoints?: string[],
      initialIndex?: number,
  ) => void;
  closeBottomSheet: () => void;
  isVisible: boolean;
};

const screenHeight = Dimensions.get('window').height;

export const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
    undefined,
);

export const BottomSheetProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const {theme} = useTheme();
  const [content, setContent] = useState<ReactNode>(null);
  const [isVisible, setIsVisible] = useState(false);
  const heightRef = useRef(screenHeight * 0.5); // tăng chiều cao default lên 50%
  const translateY = useSharedValue(screenHeight);

  const openBottomSheet = (
      newContent: ReactNode,
      newSnapPoints: string[] = ['50%'],
      snapIndex: number = 0,
  ) => {
    const percent = parseFloat(newSnapPoints[snapIndex]) / 100;
    heightRef.current = screenHeight * percent;
    setContent(newContent);
    setIsVisible(true);
    translateY.value = withSpring(0, {
      damping: 15,
      stiffness: 120,
    });
  };

  const closeBottomSheet = () => {
    translateY.value = withTiming(heightRef.current, {duration: 200}, finished => {
      if (finished) {
        runOnJS(setIsVisible)(false);
        runOnJS(setContent)(null);
      }
    });
  };

  const gesture = Gesture.Pan()
      .onUpdate(e => {
        if (e.translationY > 0) {
          translateY.value = e.translationY;
        }
      })
      .onEnd(e => {
        if (e.translationY > 100) {
          runOnJS(closeBottomSheet)();
        } else {
          translateY.value = withSpring(0, {
            damping: 15,
            stiffness: 120,
          });
        }
      });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  return (
      <BottomSheetContext.Provider value={{openBottomSheet, closeBottomSheet, isVisible}}>
        {children}

        {isVisible && (
            <View style={StyleSheet.absoluteFillObject}>
              {/* Backdrop */}
              <TouchableWithoutFeedback onPress={closeBottomSheet}>
                <View style={styles.backdrop} />
              </TouchableWithoutFeedback>

              {/* Bottom Sheet */}
              <GestureDetector gesture={gesture}>
                <Animated.View
                    style={[
                      styles.sheet,
                      {
                        height: heightRef.current,
                        backgroundColor: theme.background,
                      },
                      animatedStyle,
                    ]}>
                  <View style={styles.handleContainer}>
                    <View style={styles.handleBar} />
                  </View>

                  <View
                      style={{flex: 1}}
                  >
                    {content}
                  </View>
                </Animated.View>
              </GestureDetector>
            </View>
        )}
      </BottomSheetContext.Provider>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 8,
    zIndex: 1000,
    elevation: 10,
    overflow: 'hidden',
  },
  handleContainer: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 8,
  },
  handleBar: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#ccc',
  },
  scrollContent: {
    paddingBottom: 32,
  },
});

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};
