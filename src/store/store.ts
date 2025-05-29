import { configureStore } from "@reduxjs/toolkit";
import themeReducer  from "./reducers/themeSlice";
import userSlice from "./reducers/userSlice";
import conversationSlice from "./reducers/conversationSlice";
import participantSlice from "./reducers/participantSlice";

const store = configureStore({
    reducer: {
        theme: themeReducer,
        user : userSlice,
        conv : conversationSlice,
        participant : participantSlice,
    }
})
// Tạo type toàn cục state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
