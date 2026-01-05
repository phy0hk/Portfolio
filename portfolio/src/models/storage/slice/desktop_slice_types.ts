import type { ElementSizeType, PositionType } from "../utils_type";

export interface DesktopState {
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
    state?: "default" | "minimized" | "fullscreen";
    processId: number;
    position: PositionType;
    size: ElementSizeType;
    zindex: number;
}
