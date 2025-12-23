import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
    ElementSizeType,
    PositionType,
} from "../../models/storage/utils_type";
// import { Zindex_Rearranger } from "../func/zindex_rearranger";

interface DesktopState {
    DisplayMode: DisplayModeType;
    PopUpMenu: PopUpMenuType;
    AppList: AppInfo[];
    CurrentRunningApp: AppInfo[];
    TerminalStates: TerminalStates[];
}
export type DisplayModeType = "default" | "desktop_mode";
export type PopUpMenuType = "none" | "application";
export interface AppInfo {
    id: number;
    name: string;
    icon?: string;
    state?: "default" | "minimized" | "maximized";
    processId?: number;
    position: PositionType;
    size: ElementSizeType;
    zindex: number;
}
export interface TerminalStates {
    processId?: number;
    history: string[];
    display: string[];
}
const initialState: DesktopState = {
    DisplayMode: "default",
    PopUpMenu: "none",
    AppList: [
        {
            id: 0,
            name: "Terminal",
            icon: "/app_icons/terminal.png",
            position: { x: 100, y: 100 },
            size: { width: 500, height: 500 },
            zindex: 999,
        },
        {
            id: 1,
            name: "Browser",
            icon: "/app_icons/globe.png",
            position: { x: 100, y: 100 },
            size: { width: 500, height: 500 },
            zindex: 999,
        },
        {
            id: 2,
            name: "Settings",
            icon: "/app_icons/settings.png",
            position: { x: 100, y: 100 },
            size: { width: 500, height: 500 },
            zindex: 999,
        },
    ],
    CurrentRunningApp: [],
    TerminalStates: [],
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
            //create the related app state
            switch (action.payload.name) {
                case "Terminal":
                    state.TerminalStates.push({
                        processId: action.payload.processId,
                        history: [],
                        display: [],
                    });
                    break;
            }
            //and then start the process
            state.CurrentRunningApp = [
                ...state.CurrentRunningApp,
                action.payload,
            ];
        },
        closeApp(state, action: PayloadAction<AppInfo>) {
            //Remove the Related Application State
            switch (action.payload.name) {
                case "Terminal":
                    state.TerminalStates = state.TerminalStates.filter(
                        (item) => item.processId != action.payload.processId,
                    );
                    break;
            }
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
        updateTerminalStates(state, action: PayloadAction<TerminalStates>) {
            const currentItemIndex = state.TerminalStates.findIndex(
                (item) => item.processId == action.payload.processId,
            );
            state.TerminalStates[currentItemIndex] = action.payload;
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
    updateTerminalStates,
} = DesktopSlice.actions;
export default DesktopSlice;
