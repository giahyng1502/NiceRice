import { configureStore } from "@reduxjs/toolkit";
import themeReducer  from "./reducers/themeSlice";

const store = configureStore({
    reducer: {
        theme: themeReducer,
    }
})
// Tạo type toàn cục state
export type RootState = ReturnType<typeof store.getState>;
export default store;
