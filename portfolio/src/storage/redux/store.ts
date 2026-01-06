import { configureStore } from "@reduxjs/toolkit";
import DesktopSlice from "@/storage/redux/desktop_states/desktop_slice";
import TerminalSlice from "./desktop_states/applicaions/terminal_states";
export const store = configureStore({
    reducer: {
        display: DesktopSlice.reducer,
        terminalApp: TerminalSlice.reducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
