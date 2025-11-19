import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ElementSizeType, PositionType } from "../types/utils_type";

interface DesktopState {
  DisplayMode: DisplayModeType;
  PopUpMenu: PopUpMenuType;
  AppList: AppInfo[];
  CurrentRunningApp: AppInfo[];
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
}
const initialState: DesktopState = {
  DisplayMode: "default",
  PopUpMenu: "none",
  AppList: [
    {
      id: 0,
      name: "Terminal",
      icon: "/app_icons/terminal.png",
      position: { x: 100, y: 100, z: 999 },
      size: { width: 500, height: 500 },
    },
    {
      id: 1,
      name: "Browser",
      icon: "/app_icons/globe.png",
      position: { x: 100, y: 100, z: 999 },
      size: { width: 500, height: 500 },
    },
    {
      id: 2,
      name: "Settings",
      icon: "/app_icons/settings.png",
      position: { x: 100, y: 100, z: 999 },
      size: { width: 500, height: 500 },
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
      state.CurrentRunningApp = [...state.CurrentRunningApp, action.payload];
    },
    closeApp(state, action: PayloadAction<AppInfo>) {
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
  },
});

export const {
  setDisplayMode,
  setPopUpMenu,
  openNewApp,
  closeApp,
  updateAppState,
} = DesktopSlice.actions;
export default DesktopSlice;
