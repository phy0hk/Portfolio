import { Minus, Square, X } from "lucide-react";
import {
    closeApp,
    updateAppState,
    type AppInfo,
} from "../../../utils/states/desktop_slice";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

const AppFrameBar = ({ processInfo }: AppFrameBarProps) => {
    const iconStyles = "p-1 bg-zinc-900/30 rounded-full";
    const barInfoStyle = "flex flex-row items-center gap-1 z-10";
    const startPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
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
        const newPos = { x: changedX, y: changedY };
        const updatedState: AppInfo = { ...processInfo, position: newPos };
        dispatch(updateAppState(updatedState));
    };
    return (
        <div
            className="flex w-full h-10 justify-between items-center p-3 bg-zinc-900 rounded-t-xl relative"
            id={`pid${processInfo.processId}`}
        >
            <div
                className="w-full h-full absolute  top-0 left-0 z-0"
                onClick={handleMouseDown}
            ></div>
            <div className={barInfoStyle}>
                <img
                    src={processInfo?.icon}
                    className="bg-zinc-400 p-1 rounded-full w-5 h-5 select-none"
                />
                <h4 className="select-none">{processInfo?.name}</h4>
            </div>
            <div className={barInfoStyle}>
                <button>
                    <Minus className={`${iconStyles} hover:bg-green-600`} />
                </button>
                <button>
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
