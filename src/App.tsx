import React, {useEffect, useRef, useState} from 'react';
import {Provider, useSelector} from 'react-redux';
import AppNavigation from './navigation/AppNavigation';
import store, {RootState} from './store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useThemeManager, useTheme} from './hooks/useTheme';
import {AppState, AppStateStatus, StatusBar} from 'react-native';
import CustomSnackbar from './modals/snackbar';
import {BottomSheetProvider, useBottomSheet} from './modals/bottom_sheet_modal';
import {useAppDispatch} from "./hooks/useAppDispatch";
import {useRealmReady} from "./hooks/useRealm";
import socket from "./config/socket/socketClient";
import {getRealm, openRealm} from "./realm/realm";
import {fetchConversation} from "./store/action/conversationAction";
import {SnackbarProvider} from "./provider/SnackbarProvider";
import {RealmProvider} from "./provider/RealmProvider";


const AppStateChange: React.FC = () => {
  const appState = useRef(AppState.currentState);
  const dispatch = useAppDispatch();
  const { ready } = useRealmReady();

  useEffect(() => {
    if (!ready) return;

    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (
          ['inactive', 'background'].includes(appState.current) &&
          nextAppState === 'active'
      ) {
        console.log('App đã vào lại foreground');

        if (!socket.connected) {
          socket.connect();
        }

        const realm = getRealm();
        if (!realm || realm.isClosed) {
          await openRealm();
          console.log('Realm đã được mở lại.');
        }

        dispatch(fetchConversation());
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [ready]);

  return null;
};





const AppSocket: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.data);
  const { ready } = useRealmReady();

  useEffect(() => {
    if (!ready) return;

    const userId = user?.userId;
    if (userId) {
      socket.auth = { userId };
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, [ready, user?.userId]);

  return <AppWrapper />;
};


const AppWrapper: React.FC = () => {
  const { loadTheme } = useThemeManager();
  const { themeType } = useTheme();

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
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SnackbarProvider>
            <BottomSheetProvider>
              <RealmProvider>
                <AppStateChange />
                <AppSocket />
              </RealmProvider>
            </BottomSheetProvider>
          </SnackbarProvider>
        </GestureHandlerRootView>
      </Provider>
  );
};


export default App;
