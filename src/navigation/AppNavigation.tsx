import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroduceScreen from "../screens/introduct/introduce_screen";
const Stack = createNativeStackNavigator();
const AppNavigation : React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Introduce"
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="Introduce" component={IntroduceScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigation;
