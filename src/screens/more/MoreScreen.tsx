import React from 'react';
import {View, Text, StyleSheet, ScrollView, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import ItemOption from '../option/OtionItem';
import IconGroup from '../../assets/svgs/ic_groups';
import IconColor from '../../assets/svgs/icon_custom_color';
import IconMute from '../../assets/svgs/ic_mute';
import IconAbout from '../../assets/svgs/ic_about';
import IconHelpCenter from '../../assets/svgs/ic_help';
import IconLogout from '../../assets/svgs/ic_logout';
import {globalStyles} from '../../styles/globalStyles';
import CustomHeader from "../../navigation/CustomHeader";
import {useSharedValue} from "react-native-reanimated";
import Margin from "../../components/margin/magin";
import IconLanguage from "../../assets/svgs/icon_lang";
import IconMode from "../../assets/svgs/ic_mode";

const MoreScreen = () => {
  const {theme} = useTheme();

  const scrollY = useSharedValue(0)

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}>
      <CustomHeader scrollY={scrollY} theme={theme}/>
      <ScrollView onScroll={handleScroll} style={{
        padding : 15,
        flex : 1,
      }}>
        <Text
            style={[
              globalStyles.mediumText,
              {
                color: 'gray',
              },
            ]}>
          Language
        </Text>
        <ItemOption Icon={<IconLanguage color={theme.iconColor}/>} title={'Language'} />

        <Text
            style={[
              globalStyles.mediumText,
              {
                color: 'gray',
              },
            ]}>
          Mode
        </Text>
        <ItemOption Icon={<IconMode color={theme.iconColor}/>} title={'Dark Mode'} type={'switch'}/>

        <Text
            style={[
              globalStyles.mediumText,
              {
                color: 'gray',
              },
            ]}>
          Notification
        </Text>
        <ItemOption Icon={<IconMute color={theme.iconColor}/>} title={'Mute Notification'} />

        <Text
            style={[
              globalStyles.mediumText,
              {
                color: 'gray',
              },
            ]}>
          Friends
        </Text>
        <ItemOption Icon={<IconGroup color={theme.iconColor}/>} title={'Invite Friends'} />
        <Text
            style={[
              globalStyles.mediumText,

              {
                color: 'gray',
              },
            ]}>
          Police
        </Text>
        <ItemOption Icon={<IconAbout color={theme.iconColor}/>} title={'About App'} />
        <ItemOption Icon={<IconHelpCenter color={theme.iconColor}/>} title={'Help Center'} />
        <Text
            style={[
              globalStyles.mediumText,

              {
                color: 'gray',
              },
            ]}>
          Logout
        </Text>
        <ItemOption Icon={<IconLogout color={theme.iconColor}/>} title={'Logout'} />
      </ScrollView>
      <Margin bottom={2}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MoreScreen;
