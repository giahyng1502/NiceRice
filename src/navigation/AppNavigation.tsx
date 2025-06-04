import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroduceScreen from '../screens/introduct/introduce_screen';
import BottomNavigation from './BottomNavigation';
import MessageDetail from '../screens/messages/message/MessageDetail';
import ChatOption from '../screens/option/ChatOption';
import LoginScreen from '../screens/login/LoginScreen';
import {useAuth} from '../hooks/useAuth';
import SplashScreen from '../screens/introduct/splash_screen';

export type AuthStackParamList = {
    Introduce: undefined;
    LoginScreen: undefined;
    SplashScreen: undefined;
};

export type AppStackParamList = {
    Main: undefined;
    MessageDetail: { id: number };
    ChatOption: { name: string; image: string };
    Group: undefined;
    Profile: undefined;
    Messages: undefined;
    More: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppStack = createNativeStackNavigator<AppStackParamList>();

const AuthStackScreen = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
        <AuthStack.Screen name="Introduce" component={IntroduceScreen} />
        <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
    </AuthStack.Navigator>
);

const AppStackScreen = () => (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="Main" component={BottomNavigation} />
        <AppStack.Screen name="MessageDetail" component={MessageDetail} />
        <AppStack.Screen name="ChatOption" component={ChatOption} />
    </AppStack.Navigator>
);

const RootNavigator: React.FC = () => {
    const {isLoggedIn} = useAuth();

    return (
        <NavigationContainer>
            {isLoggedIn ? <AppStackScreen /> : <AuthStackScreen />}
        </NavigationContainer>
    );
};

export default RootNavigator;
