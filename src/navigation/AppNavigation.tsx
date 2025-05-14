import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroduceScreen from "../screens/introduct/introduce_screen";
import BottomNavigation from "./BottomNavigation";
const Stack = createNativeStackNavigator();
const AppNavigation : React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Main"
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="Introduce" component={IntroduceScreen} />
                <Stack.Screen name="Main" component={BottomNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigation;
