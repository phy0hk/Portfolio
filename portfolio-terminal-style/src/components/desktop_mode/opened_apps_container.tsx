import { useSelector } from "react-redux";
import type { RootState } from "../../utils/states/store";
import AppFrame from "./app_frame/app_frame";
import Terminal from "../../applications/terminal";

const OpenedAppsContainer = () => {
    const CurrentRunningApp = useSelector(
        (state: RootState) => state.display.CurrentRunningApp,
    );
    return (
        <div className="w-full h-full relative">
            {CurrentRunningApp.map((item) => (
                <AppFrame key={item.processId} processInfo={item}>
                    <Apps name={item.name} />
                </AppFrame>
            ))}
        </div>
    );
};
const Apps = ({ name }: { name: string }) => {
    switch (name) {
        case "Terminal":
            return <Terminal />;
    }
};
export default OpenedAppsContainer;
