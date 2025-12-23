import type { AppInfo } from "@/models/storage/slice/desktop_slice_types";

export const Zindex_Rearranger = (
    selectedApp: AppInfo,
    currentOpenedApps: AppInfo[],
): AppInfo[] => {
    const indexOfSelectedApp = currentOpenedApps.findIndex(
        (app) => app.processId === selectedApp.processId,
    );
    if (indexOfSelectedApp === 0) return currentOpenedApps;
    const firstSplit = currentOpenedApps.slice(0, indexOfSelectedApp);
    const secondSplit = currentOpenedApps.slice(indexOfSelectedApp + 1);
    const rearrangedApps = [selectedApp, ...firstSplit, ...secondSplit];

    return rearrangedApps;
};
