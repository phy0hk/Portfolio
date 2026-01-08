export interface AppInfo {
    id: number;
    name: string;
    icon?: string;
    state?: "default" | "minimized" | "fullscreen";
    processId: string;
    zindex: number;
}
