import React, {useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {AuthStackParamList} from "../../navigation/AppNavigation";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {useTheme} from "../../hooks/useTheme";
import Logo_echat from "../../assets/svgs/logo_echat";
import {useAuth} from "../../hooks/useAuth";

type Props = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'SplashScreen'>;
};

const SplashScreen: React.FC<Props> = ({navigation}) => {
  const { loading } = useAuth();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace("Introduce")
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);
  const {theme} = useTheme();
  return (
      <View style={[styles.container,{
        backgroundColor : theme.background
      }]}>
        <Logo_echat/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});

export default SplashScreen;
