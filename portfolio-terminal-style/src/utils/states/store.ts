import { configureStore } from "@reduxjs/toolkit";
import InputSlice from "./input_slice";
export const store = configureStore({
  reducer: {
    input: InputSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
