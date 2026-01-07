import type { AppInfo } from "@/models/storage/slice/desktop_slice_types";
import AppFrameBar from "./app_frame_bar";
import { useAppFrame, useAppFrameResize } from "@/hooks/app_frame_hooks";
import { useRef } from "react";

interface AppContainerProps {
    children?: React.ReactNode;
    processInfo: AppInfo;
    currentOpenedAppList: AppInfo[];
}
const AppFrame = ({
    children,
    processInfo,
    currentOpenedAppList,
}: AppContainerProps) => {
    const appFrameRef = useRef<HTMLDivElement>(null);
    const { appIcon, HandleRearranger } = useAppFrame(
        processInfo,
        currentOpenedAppList,
    );
    const { HandleResize } = useAppFrameResize(appFrameRef);
    return (
        <div
            className={`absolute min-w-80 min-h-80 h-120 w-100 max-sm:w-full flex flex-col
              bg-zinc-900/70 rounded-xl border border-zinc-800 max-sm:text-xs
              z-0 ${processInfo.state === "minimized" ? "hidden" : ""}
             overflow-hidden`}
            ref={appFrameRef}
            style={{
                zIndex: processInfo.zindex,
            }}
            onMouseDown={HandleRearranger}
        >
            <div
                className="top-0 left-0 right-0 w-full h-1 absolute z-10 cursor-row-resize select-none bg-transparent"
                onMouseDown={(e) => HandleResize("top", e)}
            ></div>
            <AppFrameBar
                processInfo={processInfo}
                appIcon={appIcon}
                appFrameRef={appFrameRef}
            />
            <div
                className="top-0 bottom-0 left-0 w-1 h-full absolute z-10 cursor-col-resize select-none bg-transparent"
                onMouseDown={(e) => HandleResize("left", e)}
            ></div>
            <div
                className="top-0 bottom-0 right-0 w-1 h-full absolute z-10 cursor-col-resize select-none bg-transparent"
                onMouseDown={(e) => HandleResize("right", e)}
            ></div>
            {children}
            <div
                className="bottom-0 left-0 right-0 w-full h-1 absolute z-10 cursor-row-resize select-none bg-transparent"
                onMouseDown={(e) => HandleResize("bottom", e)}
            ></div>
        </div>
    );
};

export default AppFrame;
