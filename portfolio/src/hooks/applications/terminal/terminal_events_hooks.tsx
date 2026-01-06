import type { TerminalStates } from "@/models/storage/slice/applications/terminal_slices_types";
import { UpdateTerminalState } from "@/storage/redux/desktop_states/applicaions/terminal_states";
import { clearInputValue, type SystemInfo } from "@/storage/redux/input_slice";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

const useTerminalEvent = (
    container: React.RefObject<HTMLDivElement | null>,
    // processInfo: AppInfo,
    input: string,
    terminalState?: TerminalStates,
    sysInfo?: SystemInfo,
) => {
    const user_info = { username: "root" };
    const dispatch = useDispatch();
    const localTerminalState = useRef<TerminalStates>(terminalState);
    const HandleKeyDownEvent = (e: KeyboardEvent) => {
        const { key } = e;
        switch (key.toLowerCase()) {
            case "enter":
                EnterSubmitHandler();
                break;
            default:
                break;
        }
    };
    const EnterSubmitHandler = () => {
        const commandHistory = `[ ${sysInfo?.hostname}@${user_info.username} /] $ ${input}`;
        if (!terminalState) return;
        // This will handle the clear command
        if (input.split(" ")[0] === "clear") {
            if (!localTerminalState.current) return;
            dispatch(
                UpdateTerminalState({
                    ...localTerminalState.current,
                    display: [],
                    history: [
                        ...localTerminalState.current.history,
                        commandHistory,
                    ],
                }),
            );
            clearInputValue();
            return;
        }
        // this will handler others command
        const tempTerminalState: TerminalStates = {
            ...terminalState,
            display: [
                ...(localTerminalState?.current?.display || []),
                // CommandHandler(localCommand.current, sysInfo),
            ],
            history: [
                ...(localTerminalState?.current?.history || []),
                commandHistory,
            ],
        };
        if (!input) return;
        dispatch(UpdateTerminalState(tempTerminalState));
        clearInputValue();
    };
    useEffect(() => {
        const tempContainer = container.current;
        if (!tempContainer) return;
        tempContainer.addEventListener("keydown", HandleKeyDownEvent);
        return () => {
            tempContainer.removeEventListener("keydown", HandleKeyDownEvent);
        };
    });
    // Watch Terminal State
    useEffect(() => {
        localTerminalState.current = terminalState;
    }, [terminalState]);
};
export default useTerminalEvent;
