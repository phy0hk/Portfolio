import type { AppInfo } from "@/models/storage/slice/desktop_slice_types";
import { closeApp } from "@/storage/redux/desktop_states/desktop_slice";
import { useDispatch } from "react-redux";
import useRelatedProcesses from "../../related_process";

const useCmdExit = (processInfo?: AppInfo) => {
    const dispatch = useDispatch();
    const RelatedProcesses = useRelatedProcesses(processInfo);
    const CloseApp = () => {
        if (!processInfo) return;
        dispatch(closeApp(processInfo));
        RelatedProcesses.Close();
    };
    return { CloseApp };
};
export default useCmdExit;
