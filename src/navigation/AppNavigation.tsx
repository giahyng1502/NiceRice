import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroduceScreen from "../screens/introduct/introduce_screen";
import BottomNavigation from "./BottomNavigation";
import MessageDetail from "../screens/messages/message/MessageDetail";
import ChatOption from "../screens/option/ChatOption";

// 1. Định nghĩa kiểu param cho toàn bộ stack
export type RootStackParamList = {
    Introduce: undefined;
    Main: undefined;
    Group: undefined;
    Messages : undefined;
    MessageDetail: { id: string };
    ChatOption: { name: string ,image: string};
};

// 2. Khởi tạo stack navigator với kiểu param list
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Main"
                screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Introduce" component={IntroduceScreen} />
                <Stack.Screen name="Main" component={BottomNavigation} />
                <Stack.Screen name="MessageDetail" component={MessageDetail} />
                <Stack.Screen name="ChatOption" component={ChatOption} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
