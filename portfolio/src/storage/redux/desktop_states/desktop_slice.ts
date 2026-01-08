import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
    DesktopState,
    DisplayModeType,
    PopUpMenuType,
} from "@/models/storage/slice/desktop_slice_types";
import type { AppInfo } from "@/models/storage/slice/applications/application_info";

const initialState: DesktopState = {
    DisplayMode: "default",
    PopUpMenu: "none",
    lastZindex: 0,
    CurrentRunningApp: [],
};

const DesktopSlice = createSlice({
    name: "desktop",
    initialState,
    reducers: {
        setDisplayMode(state, action: PayloadAction<DisplayModeType>) {
            state.DisplayMode = action.payload;
        },
        setPopUpMenu(state, action: PayloadAction<PopUpMenuType>) {
            state.PopUpMenu = action.payload;
        },
        openNewApp(state, action: PayloadAction<AppInfo>) {
            state.CurrentRunningApp = [
                ...state.CurrentRunningApp,
                action.payload,
            ];
        },
        closeApp(state, action: PayloadAction<AppInfo>) {
            //And then remove the process
            state.CurrentRunningApp = state.CurrentRunningApp.filter(
                (item) => item.processId != action.payload.processId,
            );
        },
        updateAppState(state, action: PayloadAction<AppInfo>) {
            const currentItemIndex = state.CurrentRunningApp.findIndex(
                (item) => item.processId == action.payload.processId,
            );
            state.CurrentRunningApp[currentItemIndex] = action.payload;
        },
        updateCurrentRunningApp(state, action: PayloadAction<AppInfo[]>) {
            state.CurrentRunningApp = action.payload.map((item, index) => ({
                ...item,
                zindex: 999 - index,
            }));
        },
        focusApp(state, action: PayloadAction<AppInfo>) {
            const prevFocusedIndex = state.CurrentRunningApp.findIndex(
                (item) => item.zindex == 9999,
            );

            const currentFocusIndex = state.CurrentRunningApp.findIndex(
                (item) => item.processId == action.payload.processId,
            );
            if (prevFocusedIndex !== -1) {
                state.CurrentRunningApp[prevFocusedIndex].zindex =
                    state.lastZindex + 1;
                state.lastZindex += 1;
            }
            state.CurrentRunningApp[currentFocusIndex].zindex = 9999;
        },
    },
});

export const {
    setDisplayMode,
    setPopUpMenu,
    openNewApp,
    closeApp,
    updateAppState,
    updateCurrentRunningApp,
    focusApp,
} = DesktopSlice.actions;
export default DesktopSlice;
