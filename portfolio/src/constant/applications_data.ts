import type { AppInfo } from "@/models/storage/slice/applications/application_info";

export const Apps: AppInfo[] = [
    {
        id: 0,
        processId: "0",
        name: "Terminal",
        icon: "/app_icons/terminal.png",
        state: "default",
        zindex: 9999,
    },
    {
        id: 1,
        processId: "1",
        name: "Browser",
        icon: "/app_icons/globe.png",
        state: "default",
        zindex: 9999,
    },
    {
        id: 2,
        processId: "2",
        name: "Settings",
        state: "default",
        icon: "/app_icons/settings.png",
        zindex: 9999,
    },
    {
        id: 3,
        processId: "3",
        name: "CV",
        state: "default",
        icon: "/app_icons/file-text.png",
        zindex: 9999,
    },
];
