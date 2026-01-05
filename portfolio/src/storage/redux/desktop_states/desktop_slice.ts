import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
    AppInfo,
    DesktopState,
    DisplayModeType,
    PopUpMenuType,
} from "@/models/storage/slice/desktop_slice_types";
// import { Zindex_Rearranger } from "../func/zindex_rearranger";

const initialState: DesktopState = {
    DisplayMode: "default",
    PopUpMenu: "none",
    AppList: [
        {
            id: 0,
            processId: 0,
            name: "Terminal",
            icon: "/app_icons/terminal.png",
            position: { x: 100, y: 100 },
            size: { width: 500, height: 500 },
            zindex: 999,
        },
        {
            id: 1,
            processId: 1,
            name: "Browser",
            icon: "/app_icons/globe.png",
            position: { x: 100, y: 100 },
            size: { width: 500, height: 500 },
            zindex: 999,
        },
        {
            id: 2,
            processId: 2,
            name: "Settings",
            icon: "/app_icons/settings.png",
            position: { x: 100, y: 100 },
            size: { width: 500, height: 500 },
            zindex: 999,
        },
    ],
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
    },
});

export const {
    setDisplayMode,
    setPopUpMenu,
    openNewApp,
    closeApp,
    updateAppState,
    updateCurrentRunningApp,
} = DesktopSlice.actions;
export default DesktopSlice;
