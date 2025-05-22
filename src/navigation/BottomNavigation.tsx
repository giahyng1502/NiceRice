import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import ConverstationScreen from '../screens/messages/convesation/ConverstationScreen';
import GroupScreen from '../screens/groups/GroupScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import MoreScreen from '../screens/more/MoreScreen';

// Import icon SVG
import IconMessage from '../assets/svgs/ic_message';
import IconGroup from '../assets/svgs/ic_groups';
import IconProfile from '../assets/svgs/ic_profile';
import IconMore from '../assets/svgs/icon_more';
import {height, width} from '../styles/globalStyles';
import {useTheme} from '../hooks/useTheme';
import {useTranslation} from "react-i18next";

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const {theme} = useTheme();
  const {t} = useTranslation();
  const bottomNavHeight = height * 0.12;
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({focused}) => {
          let IconComponent;
          switch (route.name) {
            case 'Messages':
              IconComponent = IconMessage;
              break;
            case 'Group':
              IconComponent = IconGroup;
              break;
            case 'Profile':
              IconComponent = IconProfile;
              break;
            case 'More':
              IconComponent = IconMore;
              break;
            default:
              return null;
          }

          return (
            <View
              style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
              <IconComponent color={theme.iconColor} />
              <Text
                style={{
                  fontSize: 10,
                  color: focused ? 'white' : theme.text3,
                  marginTop: 8,
                  fontWeight: '700',
                }}>
                  {t(`bottomNavigation.${route.name}`)}
              </Text>
            </View>
          );
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: bottomNavHeight,
          paddingBottom: height * 0.03,
          paddingTop: height * 0.03,
          backgroundColor: theme.background,
        },
      })}>
      <Tab.Screen name="Messages" component={ConverstationScreen} />
      <Tab.Screen name="Group" component={GroupScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    padding: 6,
    width: width * 0.2,
    height: height * 0.08,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    backgroundColor: '#40C4FF',
  },
});

export default BottomNavigation;
