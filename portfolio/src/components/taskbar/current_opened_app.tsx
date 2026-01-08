import type { RootState } from "@/storage/redux/store";
import { useSelector } from "react-redux";
import AppIcon from "./app_icon";

const CurrentOpenedApp = () => {
    const currentRunningApp = useSelector(
        (state: RootState) => state.display.CurrentRunningApp,
    );

    return (
        <div className="flex flex-row items-center justify-center gap-1 bg-zinc-900/60 p-1 rounded-full">
            {currentRunningApp &&
                currentRunningApp.map((app, index) => {
                    return <AppIcon app={app} key={index} />;
                })}
        </div>
    );
};
export default CurrentOpenedApp;
