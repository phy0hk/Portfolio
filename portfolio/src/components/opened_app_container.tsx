import type { RootState } from "@/storage/redux/store";
import { useSelector } from "react-redux";
import AppFrame from "./app_frame/app_frame";
import type { AppInfo } from "@/models/storage/slice/desktop_slice_types";

const OpenedAppsContainer = () => {
    const CurrentRunningApp = useSelector(
        (state: RootState) => state.display.CurrentRunningApp,
    );
    return (
        <div className="w-full h-full relative">
            {CurrentRunningApp.map((item) => (
                <AppFrame
                    key={item.processId}
                    processInfo={item}
                    currentOpenedAppList={CurrentRunningApp}
                >
                    <Apps app={item} />
                </AppFrame>
            ))}
        </div>
    );
};
const Apps = ({ app }: { app: AppInfo }) => {
    switch (app.name) {
        case "Terminal":
            return <Terminal processInfo={app} />;
        case "Browser":
            return <Browser processInfo={app} />;
    }
};
export default OpenedAppsContainer;
