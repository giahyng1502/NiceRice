import React, {useEffect, useRef} from 'react';
import {Provider, useSelector} from 'react-redux';
import AppNavigation from './navigation/AppNavigation';
import store, {RootState} from './store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useThemeManager, useTheme} from './hooks/useTheme';
import {StatusBar} from 'react-native';
import CustomSnackbar from './modals/snackbar';
import {SnackbarProvider} from './provider/SnackbarProvider';
import socket from './config/socket/socketClient';
import {getRealm, openRealm} from './realm/realm';
import {AppState} from 'react-native';
import {useAppDispatch} from './hooks/useAppDispatch';
import {fetchConversation} from './store/action/conversationAction';
import {BottomSheetProvider, useBottomSheet} from './modals/bottom_sheet_modal';

const useAppLifecycle = () => {
  const appState = useRef(AppState.currentState);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      if (
        ['inactive', 'background'].includes(appState.current) &&
        nextAppState === 'active'
      ) {
        console.log('App đã vào lại foreground');

        // 👉 reconnect socket nếu chưa kết nối
        if (!socket.connected) {
          socket.connect();
        }
        const realm = getRealm();
        if (!realm || realm.isClosed) {
          openRealm().then(() => {
            console.log('Realm đã được mở lại.');
          });
        }

        dispatch(fetchConversation());
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);
};

const AppRealm: React.FC = () => {
  useEffect(() => {
    const init = async () => {
      await openRealm();
    };
    init();

  }, []);

  return <AppWrapper />;
};

const AppSocket: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.data);
  useAppLifecycle();
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
          <BottomSheetProvider>
            <AppSocket />
          </BottomSheetProvider>
        </SnackbarProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};
export default App;
