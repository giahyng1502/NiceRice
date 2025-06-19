import {configureStore} from '@reduxjs/toolkit';
import themeReducer from './reducers/themeSlice';
import userSlice from './reducers/userSlice';
import conversationSlice from './reducers/conversationSlice';
import socketMessageMiddleware from "./middleware/socketMessageMiddleware";
import messageSlice from "./reducers/messageSlice";
import socketConversationMiddleware from "./middleware/socketConversationMiddleware";
import memberSlice from "./reducers/memberSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userSlice,
    conv: conversationSlice,
    message: messageSlice,
    memberGroup : memberSlice
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['socket/SEND_SOCKET_EVENT'],
        },
      }).concat(socketMessageMiddleware,socketConversationMiddleware),

});
// Tạo type toàn cục state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
