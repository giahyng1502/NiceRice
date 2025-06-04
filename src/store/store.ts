import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './reducers/themeSlice';
import userSlice from './reducers/userSlice';
import conversationSlice from './reducers/conversationSlice';
import socketMiddleware from "./middleware/socketMiddleware";
import messageSlice from "./reducers/messageSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userSlice,
    conv: conversationSlice,
    message: messageSlice,
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['socket/SEND_SOCKET_EVENT'],
        },
      }).concat(socketMiddleware),

});
// Tạo type toàn cục state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
