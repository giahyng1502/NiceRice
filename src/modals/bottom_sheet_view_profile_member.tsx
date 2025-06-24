import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../hooks/useTheme';
import {useTranslation} from 'react-i18next';
import {FONT_SIZE, width} from '../styles/globalStyles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import TextButton from '../components/buttons/TextButton';
import Margin from '../components/margin/magin';
import IconBack from '../assets/svgs/icon_back';
import {ScrollView} from "react-native-gesture-handler";

const BottomSheetConfirmViewProfile = ({
  fullName,
  onClose,
  navigation,
  userId,
}) => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));
  const handleSwitch = (index: number) => {
    translateX.value = withTiming(-index * width, {duration: 300});
  };

  const handleViewProfile = () => {
    // Logic to view profile
    onClose();
    navigation.navigate('UserProfile', {
      userId: userId,
    });
  };
  const handleConfirmBlock = () => {
    // Logic to block the user
    console.log(`User with ID ${userId} has been blocked.`);
    onClose();
  };

  return (
    <ScrollView>
        <Animated.View
            style={[
                animatedStyle,
                {
                    backgroundColor: theme.background,
                    flex: 1,
                    width: width * 2,
                    flexDirection: 'row',
                },
            ]}>
            <View style={[styles.screen]}>
                <View style={[styles.container,{
                    justifyContent : 'center'
                }]}>
                    <Text
                        style={{
                            fontSize: FONT_SIZE.bodyLarge,
                            color: theme.text3,
                            fontWeight: 'bold',
                            marginVertical: 10,
                        }}>
                        {fullName}
                    </Text>
                    <View
                        style={{
                            height: 1,
                            width: '100%',
                            backgroundColor: theme.borderColor,
                            marginVertical: 10,
                        }}
                    />
                    <TouchableOpacity onPress={handleViewProfile}>
                        <Text
                            style={{
                                fontSize: FONT_SIZE.bodyLarge,
                                color: theme.text2,
                                fontWeight: 'bold',
                                marginVertical: 10,
                            }}>
                            {t('modal.viewProfile')}
                        </Text>
                    </TouchableOpacity>
                    <View
                        style={{
                            height: 1,
                            width: '100%',
                            marginVertical: 10,
                            backgroundColor: theme.borderColor,
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            handleSwitch(1);
                        }}>
                        <Text
                            style={{
                                fontSize: FONT_SIZE.bodyLarge,
                                color: theme.text2,
                                fontWeight: 'bold',
                                marginVertical: 10,
                            }}>
                            {t('modal.Block')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.screen]}>
                <View style={styles.container}>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            gap: 5,
                            width: '100%',
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            handleSwitch(0);
                        }}>
                        <IconBack color={theme.iconColor} />
                        <Text
                            style={{
                                fontSize: FONT_SIZE.bodyLarge,
                                color: theme.text2,
                                fontWeight: 'bold',
                            }}>
                            {t('report.cancel')}
                        </Text>
                    </TouchableOpacity>
                    <Margin top={2} />
                    <Text
                        style={{
                            fontSize: FONT_SIZE.titleMedium,
                            color: theme.text2,
                            fontWeight: 'bold',
                        }}>
                        {t('modal.Block')} {fullName} ?
                    </Text>
                    <Text
                        style={{
                            fontSize: FONT_SIZE.bodyMedium,
                            color: theme.text3,
                            fontWeight: 'bold',
                            marginVertical: 5,
                        }}>
                        {t('report.description_block')}
                    </Text>
                    <Margin top={2} />
                    <TextButton
                        title={t('modal.Block')}
                        onPress={handleConfirmBlock}
                        customButton={{width: '100%'}}
                    />
                </View>
            </View>
        </Animated.View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    width: width,
    flex: 1,
  },
  container: {
    width: width * 0.9,
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomSheetConfirmViewProfile;
