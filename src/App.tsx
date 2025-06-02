import React, {useEffect} from 'react';
import {Provider, useSelector} from 'react-redux';
import AppNavigation from './navigation/AppNavigation';
import store, {RootState} from './store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useThemeManager, useTheme} from './hooks/useTheme';
import {StatusBar} from 'react-native';
import CustomSnackbar from './modals/snackbar';
import {SnackbarProvider} from './provider/SnackbarProvider';
import socket from './config/socket/socketClient';
import {closeRealm, openRealm} from './realm/realm';

const AppRealm: React.FC = () => {
  useEffect(() => {
    const init = async () => {
      await openRealm();
    };
    init();
    return () => {
      closeRealm();
    };
  }, []);

  return <AppWrapper />;
};

const AppSocket: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    const userId = user?.userId;
    if (userId) {
      socket.auth = {userId};
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, [user?.userId]);

  return <AppRealm />;
};
const AppWrapper: React.FC = () => {
  const {loadTheme} = useThemeManager();
  const {themeType} = useTheme();

  useEffect(() => {
    loadTheme();
  }, []);

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
          <AppSocket />
        </SnackbarProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};
export default App;
