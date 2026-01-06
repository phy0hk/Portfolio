import type { TerminalStates } from "@/models/storage/slice/applications/terminal_slices_types";
import {
    ClearInputValue,
    UpdateTerminalState,
} from "@/storage/redux/desktop_states/applicaions/terminal_states";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useCommandHandler from "./command_handler";

const useTerminalEvent = (
    container: React.RefObject<HTMLDivElement | null>,
    // processInfo: AppInfo,
    shellPrompt: string,
    terminalState?: TerminalStates,
) => {
    const dispatch = useDispatch();
    const commandHandler = useCommandHandler(shellPrompt, terminalState);
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
        if (!terminalState) return;
        // This will handle the clear command
        if (terminalState.inputState.inputValue.split(" ")[0] === "clear") {
            console.log(terminalState.inputState.inputValue);
            dispatch(
                UpdateTerminalState({
                    ...terminalState,
                    display: [],
                    history: [
                        ...terminalState.history,
                        terminalState.inputState.inputValue,
                    ],
                }),
            );
            dispatch(ClearInputValue({ processId: terminalState.processId }));
            return;
        }
        // this will handler others command
        const tempTerminalState: TerminalStates = {
            ...terminalState,
            display: [...(terminalState?.display || []), commandHandler.Exec()],
            history: [
                ...(terminalState.history || []),
                terminalState.inputState.inputValue,
            ],
        };
        if (!terminalState.inputState.inputValue) return;
        dispatch(UpdateTerminalState(tempTerminalState));
        dispatch(ClearInputValue({ processId: terminalState.processId }));
    };
    useEffect(() => {
        const tempContainer = container.current;
        if (!tempContainer) return;
        tempContainer.addEventListener("keydown", HandleKeyDownEvent);
        return () => {
            tempContainer.removeEventListener("keydown", HandleKeyDownEvent);
        };
    });
};
export default useTerminalEvent;
