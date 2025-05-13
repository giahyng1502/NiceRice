import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import AppNavigation from "./navigation/AppNavigation";
import { useTheme } from "./hooks/useTheme"; // Import hook useTheme
import store from "./store/store"; // Import store của bạn
import { globalStyles } from "./styles/globalStyles";

// AppWrapper component không cần sử dụng Provider
const AppWrapper: React.FC = () => {

    return (
        <SafeAreaView style={[globalStyles.container]}>
            <AppNavigation />
        </SafeAreaView>
    );
};

// App chính với Provider bọc bên ngoài
const App: React.FC = () => {
    return (
        <Provider store={store}>
            <AppWrapper />
        </Provider>
    );
};

const styles = StyleSheet.create({});

export default App;
