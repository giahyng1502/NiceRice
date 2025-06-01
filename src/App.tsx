import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import AppNavigation from './navigation/AppNavigation';
import store from './store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useThemeManager, useTheme} from './hooks/useTheme';
import {StatusBar} from 'react-native';
import CustomSnackbar from './modals/snackbar';
import {SnackbarProvider} from './provider/SnackbarProvider';
import {useInitRealm} from './hooks/useRealm';
import {RealmProvider} from './provider/RealmProvider';

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
        <RealmProvider>
          <SnackbarProvider>
            <AppWrapper />
          </SnackbarProvider>
        </RealmProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};
export default App;
