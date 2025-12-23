import type { ElementSizeType, PositionType } from "../utils_type";

export interface DesktopState {
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
