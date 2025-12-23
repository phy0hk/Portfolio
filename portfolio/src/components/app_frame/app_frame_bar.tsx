import { Minus, Square, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import type { PositionType } from "@/models/storage/utils_type";
import type { AppInfo } from "@/models/storage/slice/desktop_slice_types";
import {
    closeApp,
    updateAppState,
} from "@/storage/redux/desktop_states/desktop_slice";

const AppFrameBar = ({ processInfo }: AppFrameBarProps) => {
    const iconStyles = "p-1 bg-zinc-900/30 rounded-full";
    const barInfoStyle = "flex flex-row items-center gap-1 z-10";
    const startPos = useRef<PositionType>({ x: 0, y: 0 });
    const dispatch = useDispatch();
    const handleMouseDown = (e: React.MouseEvent) => {
        startPos.current = { x: e.clientX, y: e.clientY };
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    };
    const handleMouseMove = (e: MouseEvent) => {
        const changedX = e.clientX - startPos.current.x;
        const changedY = e.clientY - startPos.current.y;
        const newXPos = processInfo.position.x + changedX;
        const newYPos = processInfo.position.y + changedY;
        const newPos: PositionType = { x: 0, y: 0 };
        if (newXPos >= 0) newPos.x = newXPos;
        if (newYPos >= 0) newPos.y = newYPos;
        const updatedState: AppInfo = { ...processInfo, position: newPos };
        dispatch(updateAppState(updatedState));
    };
    const handleMaximize = () => {
        if (processInfo.state === "default") {
            const newState: AppInfo = { ...processInfo, state: "maximized" };
            dispatch(updateAppState(newState));
        } else {
            const newState: AppInfo = { ...processInfo, state: "default" };
            dispatch(updateAppState(newState));
        }
    };
    const handleMinimize = () => {
        const newState: AppInfo = { ...processInfo, state: "minimized" };
        dispatch(updateAppState(newState));
    };
    return (
        <div
            className="flex w-full h-10 justify-between items-center p-3 bg-zinc-900 rounded-t-xl relative"
            id={`pid${processInfo.processId}`}
        >
            <div
                className="w-full h-full absolute  top-0 left-0 z-0"
                onMouseDown={handleMouseDown}
            ></div>
            <div className={barInfoStyle}>
                <img
                    src={processInfo?.icon}
                    className="bg-zinc-400 p-1 rounded-full w-5 h-5 select-none"
                />
                <h4 className="select-none">{processInfo?.name}</h4>
            </div>
            <div className={barInfoStyle}>
                <button onClick={handleMinimize}>
                    <Minus className={`${iconStyles} hover:bg-green-600`} />
                </button>
                <button onClick={handleMaximize}>
                    <Square className={`${iconStyles} hover:bg-blue-600`} />
                </button>
                <button onClick={() => dispatch(closeApp(processInfo))}>
                    <X className={`${iconStyles} hover:bg-red-600`} />
                </button>
            </div>
        </div>
    );
};
interface AppFrameBarProps {
    processInfo: AppInfo;
}
export default AppFrameBar;
