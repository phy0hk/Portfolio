import { Minus, Square, X } from "lucide-react";
import type { AppInfo } from "@/models/storage/slice/desktop_slice_types";
import { useAppFrameMove } from "@/hooks/app_frame_hooks";

interface AppFrameBarProps {
    processInfo: AppInfo;
    appIcon?: string;
    appFrameRef: React.RefObject<HTMLDivElement | null>;
}
const AppFrameBar = ({
    processInfo,
    appIcon = "",
    appFrameRef,
}: AppFrameBarProps) => {
    const { HandleFullscreen, HandleMinimize, HandleMouseDown, CloseApp } =
        useAppFrameMove(processInfo, appFrameRef);
    const iconStyles = "p-1 bg-zinc-900/30 rounded-full";
    const barInfoStyle = "flex flex-row items-center gap-1 z-10";

    return (
        <div
            className="flex w-full h-10 justify-between items-center p-3 bg-zinc-900 rounded-t-xl relative"
            id={`pid${processInfo.processId}`}
        >
            <div
                className="w-full h-full absolute  top-0 left-0 z-0"
                onMouseDown={HandleMouseDown}
            ></div>
            <div className={barInfoStyle}>
                <img
                    src={appIcon}
                    className="bg-zinc-400 p-1 rounded-full w-5 h-5 select-none"
                />
                <h4 className="select-none">{processInfo?.name}</h4>
            </div>
            <div className={barInfoStyle}>
                <button onClick={HandleMinimize}>
                    <Minus className={`${iconStyles} hover:bg-green-600`} />
                </button>
                <button onClick={HandleFullscreen}>
                    <Square className={`${iconStyles} hover:bg-blue-600`} />
                </button>
                <button onClick={CloseApp}>
                    <X className={`${iconStyles} hover:bg-red-600`} />
                </button>
            </div>
        </div>
    );
};
export default AppFrameBar;
