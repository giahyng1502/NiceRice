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

const AppWrapper: React.FC = () => {
  const {loadTheme} = useThemeManager();
  const {themeType} = useTheme();

  useEffect(() => {
    loadTheme();
  }, []);

  const dispatch = useAppDispatch();
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
    </>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <AppWrapper />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
