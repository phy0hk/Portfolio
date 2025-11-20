import { useSelector } from "react-redux";
import type { RootState } from "../../utils/states/store";
import AppFrame from "./app_frame/app_frame";
import Terminal from "../../applications/terminal";
import type { AppInfo } from "../../utils/states/desktop_slice";

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
    }
};
export default OpenedAppsContainer;
