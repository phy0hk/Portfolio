import type { ResizePosition } from "@/models/components/app_frame";
import type { AppInfo } from "@/models/storage/slice/desktop_slice_types";
import {
    type ElementSizeType,
    type PositionType,
} from "@/models/storage/utils_type";
import {
    closeApp,
    updateAppState,
    updateCurrentRunningApp,
} from "@/storage/redux/desktop_states/desktop_slice";
import { cacheImage } from "@/utils/image_cacher";
import { Zindex_Rearranger } from "@/utils/zindex_rearranger";
import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export const useAppFrame = (
    processInfo: AppInfo,
    currentOpenedAppList: AppInfo[],
) => {
    const [appIcon, setAppIcon] = useState<string>("");
    const dispatch = useDispatch();

    useEffect(() => {
        //Load app icon from processInfo
        if (!processInfo.icon) return;
        cacheImage(processInfo.icon).then((icon) => {
            const url = URL.createObjectURL(icon.image_data);
            setAppIcon(url);
            return () => URL.revokeObjectURL(url);
        });
    }, [processInfo]);

    //This will the rearrange the visible order
    const HandleRearranger = () => {
        const tempAppList = Zindex_Rearranger(
            processInfo,
            currentOpenedAppList,
        );
        dispatch(updateCurrentRunningApp(tempAppList));
    };

    return { appIcon, HandleRearranger };
};

//This is for the app frame movement
export const useAppFrameMove = (
    processInfo: AppInfo,
    appFrameRef: React.RefObject<HTMLDivElement | null>,
) => {
    const framePosition = useRef<PositionType>({ x: 0, y: 0 });
    const appFrame = appFrameRef.current;
    const initialElementPos = useRef<PositionType>({ x: 0, y: 0 });
    const startPos = useRef<PositionType>({ x: 0, y: 0 });
    const dispatch = useDispatch();

    useEffect(() => {
        if (!appFrame) return;
        const rect = appFrame.getBoundingClientRect();
        const { x, y } = rect;
        framePosition.current = { x: x - 8, y: y - 56 };
    });

    const HandleMouseDown = (e: React.MouseEvent) => {
        initialElementPos.current = {
            x: framePosition.current.x,
            y: framePosition.current.y,
        };
        startPos.current = { x: e.clientX, y: e.clientY };

        window.addEventListener("mousemove", HandleMouseMove);
        window.addEventListener("mouseup", HandleMouseUp);
    };

    const HandleMouseUp = () => {
        window.removeEventListener("mousemove", HandleMouseMove);
        window.removeEventListener("mouseup", HandleMouseUp);
    };
    const HandleMouseMove = (e: MouseEvent) => {
        if (!appFrame) return;
        const deltaX = e.clientX - startPos.current.x;
        const deltaY = e.clientY - startPos.current.y;
        const newX = Math.max(0, initialElementPos.current.x + deltaX);
        const newY = Math.max(0, initialElementPos.current.y + deltaY);
        const newPos: PositionType = { x: 0, y: 0 };
        if (newX >= 0) newPos.x = newX;
        if (newY >= 0) newPos.y = newY;
        animate(appFrame, {
            ...newPos,
            duration: 50,
        });
        framePosition.current = { x: newPos.x, y: newPos.y };
        // const updatedState: AppInfo = { ...processInfo, position: newPos };
        // dispatch(updateAppState(updatedState));
    };
    const HandleFullscreen = () => {
        if (processInfo.state === "default") {
            const newState: AppInfo = { ...processInfo, state: "fullscreen" };
            dispatch(updateAppState(newState));
        } else {
            const newState: AppInfo = { ...processInfo, state: "default" };
            dispatch(updateAppState(newState));
        }
    };
    const HandleMinimize = () => {
        if (!appFrame) return;
        animate(appFrame, {
            easing: "easeOutQuad",
            opacity: [1, 0],
            translateX: [framePosition.current.x, 0],
            translateY: [framePosition.current.y, 0],
            duration: 200,
            onComplete: () =>
                dispatch(
                    updateAppState({ ...processInfo, state: "minimized" }),
                ),
        });
    };
    const CloseApp = () => {
        if (!appFrame) return;
        animate(appFrame, {
            easing: "easeInOut",
            opacity: [1, 0],
            duration: 100,
            onComplete: () => dispatch(closeApp(processInfo)),
        });
    };
    return {
        HandleFullscreen,
        HandleMinimize,
        HandleMouseDown,
        HandleMouseMove,
        HandleMouseUp,
        CloseApp,
    };
};

export const useAppFrameResize = (
    appFrameRef: React.RefObject<HTMLDivElement | null>,
) => {
    const resizePosition = useRef<ResizePosition | null>(null);
    const initialPos = useRef<PositionType>({ x: 0, y: 0 });
    const framePosition = useRef<PositionType>({ x: 0, y: 0 });
    const startPos = useRef<PositionType>({ x: 0, y: 0 });
    const currentSize = useRef<ElementSizeType>({ width: 0, height: 0 });
    const appFrame = appFrameRef.current;

    useEffect(() => {
        if (!appFrame) return;
        const rect = appFrame.getBoundingClientRect();
        const { x, y } = rect;
        const { width, height } = rect;
        framePosition.current = { x, y };
        currentSize.current = { width, height };
    });

    const HandleResize = (position: ResizePosition, e: React.MouseEvent) => {
        resizePosition.current = position;
        startPos.current = {
            x: e.clientX,
            y: e.clientY,
        };
        initialPos.current = framePosition.current;
        window.addEventListener("mouseup", HandleMouseUp);
        window.addEventListener("mousemove", HandleMouseMove);
    };
    const HandleMouseUp = () => {
        window.removeEventListener("mousemove", HandleMouseMove);
        window.removeEventListener("mouseup", HandleMouseUp);
    };
    const HandleMouseMove = (e: MouseEvent) => {
        const deltaX = startPos.current.x - e.clientX;
        const deltaY = startPos.current.y - e.clientY;
        const newPos = { ...framePosition.current };
        const newSize = { ...currentSize.current };
        const animationDuration = 10;
        switch (resizePosition.current) {
            case "top":
                newSize.height += deltaY;
                if (newSize.height > 480) {
                    newPos.y -= deltaY + 56;
                    if (!appFrame) return;
                    animate(appFrame, {
                        y: newPos.y,
                        ...newSize,
                        duration: animationDuration,
                    });
                }
                break;
            case "bottom":
                e.stopPropagation();
                newSize.height -= deltaY;
                if (!appFrame) return;
                animate(appFrame, {
                    ...newSize,
                    duration: animationDuration,
                });
                break;
            case "left":
                newSize.width += deltaX;
                if (newSize.width > 480) {
                    newPos.x -= deltaX + 8;
                    if (!appFrame) return;
                    animate(appFrame, {
                        x: newPos.x,
                        ...newSize,
                        duration: animationDuration,
                    });
                }
                break;
            case "right":
                e.stopPropagation();
                newSize.width -= deltaX;
                if (!appFrame) return;
                animate(appFrame, {
                    ...newSize,
                    duration: animationDuration,
                });
                break;
            default:
                console.log("Not a position to be resize");
        }
    };

    return { HandleResize };
};
