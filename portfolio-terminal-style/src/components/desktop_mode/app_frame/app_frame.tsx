import { useRef } from "react";
import {
    updateAppState,
    updateCurrentRunningApp,
    type AppInfo,
} from "../../../utils/states/desktop_slice";
import AppFrameBar from "./app_frame_bar";
import type { PositionType } from "../../../utils/types/utils_type";
import { useDispatch } from "react-redux";
import { Zindex_Rearranger } from "../../../utils/func/zindex_rearranger";

const AppFrame = ({
    children,
    processInfo,
    currentOpenedAppList,
}: AppContainerProps) => {
    const ResizePosition = useRef<ResizePosition | null>(null);
    const InitialPos = useRef<PositionType>({ x: 0, y: 0 });
    const dispatch = useDispatch();
    const handleResize = (position: ResizePosition, e: React.MouseEvent) => {
        ResizePosition.current = position;
        InitialPos.current = {
            x: e.clientX,
            y: e.clientY,
        };
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", handleMouseMove);
    };
    const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    };
    const handleMouseMove = (e: MouseEvent) => {
        const changedXpos = InitialPos.current.x - e.clientX;
        const changedYpos = InitialPos.current.y - e.clientY;
        let newYpos = processInfo.position.y;
        let newXpos = processInfo.position.x;
        let newWidth = processInfo.size.width;
        let newHeight = processInfo.size.height;
        switch (ResizePosition.current) {
            case "top":
                newHeight += changedYpos;
                if (newHeight > 480) {
                    newYpos -= changedYpos;
                }
                break;
            case "bottom":
                newHeight -= changedYpos;
                break;
            case "left":
                newWidth += changedXpos;
                if (newWidth > 480) {
                    newXpos -= changedXpos;
                }
                break;
            case "right":
                newWidth -= changedXpos;
                break;
            default:
                console.log("Not a position to be resize");
        }

        const updatedProcessInfo: AppInfo = {
            ...processInfo,
            position: {
                x: newXpos,
                y: newYpos,
            },
            size: {
                width: newWidth,
                height: newHeight,
            },
        };
        if (updatedProcessInfo !== processInfo) {
            dispatch(updateAppState(updatedProcessInfo));
        }
    };
    //This will the rearrange the visible order
    const HandleRearranger = () => {
        const tempAppList = Zindex_Rearranger(
            processInfo,
            currentOpenedAppList,
        );
        dispatch(updateCurrentRunningApp(tempAppList));
    };
    return (
        <div
            className={`absolute min-w-120 min-h-120 flex flex-col bg-zinc-900/70 backdrop-blur-lg rounded-xl border border-zinc-900 z-0 ${processInfo.state === "minimized" ? "hidden" : ""}`}
            style={{
                left: processInfo.position.x + "px",
                top: processInfo.position.y + "px",
                width: `${processInfo.size.width}px`,
                height: `${processInfo.size.height}px`,
                zIndex: processInfo.zindex,
            }}
            onMouseDown={HandleRearranger}
        >
            <div
                className="top-0 left-0 right-0 w-full h-1 absolute z-10 cursor-row-resize select-none"
                onMouseDown={(e) => handleResize("top", e)}
            ></div>
            <AppFrameBar processInfo={processInfo} />
            <div
                className="top-0 bottom-0 left-0 w-1 h-full absolute z-10 cursor-col-resize select-none"
                onMouseDown={(e) => handleResize("left", e)}
            ></div>
            <div
                className="top-0 bottom-0 right-0 w-1 h-full absolute z-10 cursor-col-resize select-none"
                onMouseDown={(e) => handleResize("right", e)}
            ></div>
            {children}
            <div
                className="bottom-0 left-0 right-0 w-full h-1 absolute z-10 cursor-row-resize select-none"
                onMouseDown={(e) => handleResize("bottom", e)}
            ></div>
        </div>
    );
};
type ResizePosition = "top" | "bottom" | "left" | "right";
interface AppContainerProps {
    children?: React.ReactNode;
    processInfo: AppInfo;
    currentOpenedAppList: AppInfo[];
}
export default AppFrame;
