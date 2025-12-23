import useTaskbar from "../hooks/taskbar_hooks";

import { Circle } from "lucide-react";
import Datetime from "./datatime_display";

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
                {/*<CurrentOpenedApp />*/}
                <Datetime />
            </div>
        </div>
    );
};

export default TaskBar;
