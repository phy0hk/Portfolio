import type { AppInfo } from "@/models/storage/slice/applications/application_info";
import {
    CloseTerminal,
    NewTerminal,
} from "@/storage/redux/desktop_states/applicaions/terminal_states";
import { useDispatch } from "react-redux";

const useRelatedProcesses = (processInfo?: AppInfo) => {
    const dispatch = useDispatch();
    const Initialize = (processId: string) => {
        if (!processInfo) return;
        switch (processInfo.name) {
            case "Terminal":
                dispatch(NewTerminal(processId));
                break;
        }
    };
    const Close = () => {
        if (!processInfo) return;
        switch (processInfo.name) {
            case "Terminal":
                dispatch(CloseTerminal(processInfo));
                break;
        }
    };
    return {
        Initialize,
        Close,
    };
};
export default useRelatedProcesses;
