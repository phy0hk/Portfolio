import { configureStore } from "@reduxjs/toolkit";
import InputSlice from "@/storage/redux/input_slice";
import DesktopSlice from "@/storage/redux/desktop_slice";
export const store = configureStore({
    reducer: {
        input: InputSlice.reducer,
        display: DesktopSlice.reducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
