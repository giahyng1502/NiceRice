import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    TouchableOpacity, Text,
} from 'react-native';
import LogoIntroduce1 from '../../assets/svgs/logo_introduce_1';
import LogoIntroduce2 from '../../assets/svgs/logo_introduce_2';
import LogoIntroduce3 from '../../assets/svgs/logo_introduce_3';
import IntroduceSlice from './introduce_slide';
import LogoIntroduce4 from '../../assets/svgs/logo_introduce_4';
import {useTheme} from '../../hooks/useTheme';
import Row from '../../components/container/Row';
import {globalStyles} from '../../styles/globalStyles';
import {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import ButtonCustom from '../../components/buttons/Button';
import Column from '../../components/container/Column';
import {useTranslation} from "react-i18next";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {AuthStackParamList} from "../../navigation/AppNavigation";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
type NavigationProps = NavigationProp<AuthStackParamList,"Introduce">;
const IntroduceScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProps>();
    const [currentIndex, setCurrentIndex] = useState(0);
    const {theme} = useTheme();
    const {t} = useTranslation();
    const translateY = useSharedValue(-300);
    const translateX = useSharedValue(width * 0.8); // Bắt đầu ở ngoài màn hình (bên trái)
    //useRef tham chiếu đến phần từ dom của ScrollView
    const scrollViewRef = useRef<ScrollView>(null);
    // hiệu ứng trượt từ trên xuống
    const introduceData = [
        {
            title: `${t('introduceScreen.groupChating.sub')}`,
            content: `${t('introduceScreen.groupChating.subtitle')}`,
            image: <LogoIntroduce1 width={width} />,
        },
        // {
        //     title: 'Video and Voice Calls',
        //     content: 'Instantly connect via video and voice calls.',
        //     image: <LogoIntroduce2 width={width} />,
        // },
        {
            title: `${t('introduceScreen.messageEncryption.sub')}`,
            content: `${t('introduceScreen.messageEncryption.subtitle')}`,
            image: <LogoIntroduce3 width={width} />,
        },
        {
            title: `${t('introduceScreen.CrossPlatformCompatibility.sub')}`,
            content: `${t('introduceScreen.CrossPlatformCompatibility.subtitle')}`,
            image: <LogoIntroduce4 width={width}/>,
        },
    ];
    // tạo dot cho slide
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        //event.nativeEvent.contentOffset.x = kích thước màn hình scrol được
        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(slideIndex);
    };
    // chức năng của nút next
    const handleNext = () => {
        if (currentIndex < introduceData.length - 1) {
            // x là chiều ngang cần scroll đến
            scrollViewRef.current?.scrollTo({
                x: (currentIndex + 1) * width,
                animated: true,
            });
        } else {
            navigation.navigate('LoginScreen'); // hoặc màn nào bạn muốn
        }
    };
    // chức năng của nút skip
    const handleSkip = () => {
        navigation.navigate('LoginScreen'); // hoặc màn chính
    };

    useEffect(() => {
        // Animate xuống vị trí 0 với duration 500ms
        translateY.value = withTiming(0, {
            duration: 3000,
        });
        translateX.value = withTiming(0, {
            duration: 3000,
        });

    }, []);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value },{ translateX: translateX.value }],
        };
    });

    return (
        <View style={{flex: 1,backgroundColor : theme.backgroundIntroduce1}}>
            <Animated.View
                style={[
                    {
                        width: width * 2,
                        backgroundColor: theme.backgroundIntroduce2,
                        height: height * 0.7,
                        opacity : 1,
                        position: 'absolute',
                        top: 0,
                        borderBottomLeftRadius: width,
                        borderBottomRightRadius: width,
                    },
                    animatedStyle,
                ]}
            />
            <Animated.View
                style={[
                    {
                        width: width * 2,
                        backgroundColor: theme.background,
                        height: height * 0.55,
                        position: 'absolute',
                        top: 0,
                        borderBottomLeftRadius: width,  // càng lớn càng xòe
                        borderBottomRightRadius: width,
                    },
                    animatedStyle,
                ]}
            />
            {/*scroll render slider*/}
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={styles.container}>
                {introduceData.map((item, index) => (
                    <View key={index} style={styles.slide}>
                        <IntroduceSlice
                            title={item.title}
                            content={item.content}
                            image={item.image}
                            color={theme}
                        />
                    </View>
                ))}
            </ScrollView>

            {/*Column*/}

          <Column styleCustom={{width : width,height : height * 0.3,justifyContent : 'space-evenly'}}>
              {/*Button getStarted*/}
              <ButtonCustom onPress={()=>{}} text={t('introduceScreen.started')} styleCustom={[
                  globalStyles.buttonHeight,
                  {
                      backgroundColor : theme.primary,
                      borderRadius : 16,
                      justifyContent : 'center',
                      alignItems : 'center',
                      width : width * 0.9,
                      alignSelf : 'center',
                  },
              ]}
                            styleText={[
                                globalStyles.title,
                                {color : theme.btnTextColor},
                            ]}
              />

              {/*Dot*/}

              <Row styleCustom={{width : width,display : 'flex', justifyContent: 'space-around'}}>
                  <TouchableOpacity style={{width : width * 0.17}} onPress={handleSkip}>
                      <Text style={[
                          {
                              color :theme.text,
                              fontWeight : '600',
                          },globalStyles.contentSize,
                      ]}>{t('introduceScreen.skip')}</Text>
                  </TouchableOpacity>

                  <View style={styles.dotContainer}>
                      {introduceData.map((_, index) => (
                          <View
                              key={index}
                              style={[
                                  styles.dot,
                                  {backgroundColor: theme.dot},
                                  currentIndex === index && {
                                      backgroundColor : theme.activeDot,
                                      width : 14,
                                      height : 14,
                                      borderWidth : 1,
                                      padding : 6,
                                      borderColor : '#7FD7FF',
                                  },
                              ]}
                          />
                      ))}
                  </View>

                  <TouchableOpacity style={[styles.btnNext]} onPress={handleNext}>
                      <Text style={[
                          {
                              color :'#1B526B',
                              fontWeight : '600',
                          },globalStyles.contentSize,
                      ]}>{t('introduceScreen.next')}</Text>
                  </TouchableOpacity>
              </Row>
          </Column>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    btnNext : {
        backgroundColor : '#A7E4FF',
        justifyContent : 'center',
        width : width * 0.17,
        height : width * 0.17,
        borderRadius : 100,
        alignItems: 'center',
    },
    slide: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
});

export default IntroduceScreen;
