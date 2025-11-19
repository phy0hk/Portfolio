import type { AppInfo } from "../../../utils/states/desktop_slice";
import AppFrameBar from "./app_frame_bar";

const AppFrame = ({ children, processInfo }: AppContainerProps) => {
    return (
        <div
            className="absolute min-w-120 min-h-120 flex flex-col bg-zinc-900/70 backdrop-blur-lg rounded-xl border border-zinc-900"
            style={{
                left: processInfo?.position?.x,
                top: processInfo?.position?.y,
                width: `${processInfo?.size?.width}px`,
                height: `${processInfo?.size?.height}px`,
            }}
        >
            <AppFrameBar processInfo={processInfo} />
            {children}
        </div>
    );
};
interface AppContainerProps {
    children?: React.ReactNode;
    processInfo: AppInfo;
}
export default AppFrame;
