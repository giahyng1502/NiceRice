import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Provider} from 'react-redux';
import AppNavigation from './navigation/AppNavigation';
import store from './store/store'; // Import store của bạn
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {globalStyles} from './styles/globalStyles';
import {KeyboardProvider} from 'react-native-keyboard-controller';

// AppWrapper component không cần sử dụng Provider
const AppWrapper: React.FC = () => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <AppNavigation />
    </SafeAreaView>
  );
};

// App chính với Provider bọc bên ngoài
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <AppWrapper />
      </GestureHandlerRootView>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
