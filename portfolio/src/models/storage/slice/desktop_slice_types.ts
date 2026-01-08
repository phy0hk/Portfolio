import type { AppInfo } from "@/models/storage/slice/applications/application_info";

export interface DesktopState {
    DisplayMode: DisplayModeType;
    PopUpMenu: PopUpMenuType;
    lastZindex: number;
    CurrentRunningApp: AppInfo[];
}
export type DisplayModeType = "default" | "desktop_mode";
export type PopUpMenuType = "none" | "application";
