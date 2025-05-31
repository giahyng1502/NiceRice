import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import AppNavigation from './navigation/AppNavigation';
import store from './store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useThemeManager, useTheme} from './hooks/useTheme';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getInformation} from './store/action/userAction';
import {useAppDispatch} from './hooks/useAppDispatch';
import CustomSnackbar from "./modals/snackbar";
import {SnackbarProvider} from "./provider/SnackbarProvider";



const AppWrapper: React.FC = () => {
  const {loadTheme} = useThemeManager();
  const {themeType} = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      console.log(token);
      if (token) {
        dispatch(getInformation());
      }
    };
    checkToken();
  }, [dispatch]);

  return (
      <>
        <StatusBar
            backgroundColor="transparent"
            translucent
            barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
        />
        <AppNavigation />
        <CustomSnackbar />
      </>
  );
};



const App: React.FC = () => {
  return (
      <Provider store={store}>
        <GestureHandlerRootView style={{flex: 1}}>
          <SnackbarProvider>
            <AppWrapper />
          </SnackbarProvider>
        </GestureHandlerRootView>
      </Provider>
  );
};
export default App;
