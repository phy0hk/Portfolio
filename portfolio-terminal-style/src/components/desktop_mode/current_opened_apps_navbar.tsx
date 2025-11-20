import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../utils/states/store";
import {
    updateAppState,
    updateCurrentRunningApp,
    type AppInfo,
} from "../../utils/states/desktop_slice";
import { Zindex_Rearranger } from "../../utils/func/zindex_rearranger";

const CurrentOpenedApp = () => {
    const CurrentOpenedApp = useSelector(
        (state: RootState) => state.display.CurrentRunningApp,
    );
    const dispatch = useDispatch();
    const handleOnClick = (item: AppInfo) => {
        const tempAppList = Zindex_Rearranger(item, CurrentOpenedApp);
        dispatch(updateCurrentRunningApp(tempAppList));
        if (item.state == "minimized") {
            const updatedItem: AppInfo = { ...item, state: "default" };
            dispatch(updateAppState(updatedItem));
        }
    };
    return (
        <div className="min-h-9 min-w-9 rounded-full flex flex-row bg-black/10 items-center p-2 gap-2">
            {CurrentOpenedApp.map((item) => (
                <button
                    key={item.processId}
                    onClick={() => handleOnClick(item)}
                    className={`w-6 h-6 rounded-full bg-black/10 p-1 flex items-center justify-center ${item.zindex === 999 ? "bg-zinc-400" : ""}`}
                >
                    <img src={item.icon} className="w-full h-full" />
                </button>
            ))}
        </div>
    );
};
export default CurrentOpenedApp;
