import useTaskbar from "../../hooks/taskbar_hooks";

import { Circle, Volume2, Wifi } from "lucide-react";
import Datetime from "../datatime_display";
import CurrentOpenedApp from "./current_opened_app";

const TaskBar = () => {
    const taskbarHooks = useTaskbar();
    return (
        <div className="relative w-full h-auto pb-2 flex items-center justify-center z-1000">
            <div className="w-full h-10 bg-black/50 rounded-full backdrop-blur-md flex items-center px-4 justify-between">
                <button
                    onClick={taskbarHooks.HandleOnAppMenuClick}
                    className="flex flex-row gap-2 items-center"
                >
                    <Circle
                        size={20}
                        className="text-zinc-300 hover:text-white"
                    />
                </button>
                <CurrentOpenedApp />
                <div className="flex-row flex items-center gap-5">
                    <div className="flex flex-row gap-3 items-center">
                        <div className="flex flex-col text-xs justify-center items-center">
                            <p>
                                {navigator.language
                                    .split("-")[0]
                                    .toUpperCase() || "EN"}
                            </p>
                            <p>
                                {navigator.language
                                    .split("-")[1]
                                    .toUpperCase() || "US"}
                            </p>
                        </div>
                        <Volume2 size={18} />
                        <Wifi size={18} />
                    </div>
                    <Datetime />
                </div>
            </div>
        </div>
    );
};

export default TaskBar;
