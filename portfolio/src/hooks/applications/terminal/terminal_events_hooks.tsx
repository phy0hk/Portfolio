import type { TerminalStates } from "@/models/storage/slice/applications/terminal_slices_types";
import {
    AppendDisplay,
    AppendHistory,
    ClearDisplay,
    ClearInputValue,
    UpdateTerminalInput,
} from "@/storage/redux/desktop_states/applicaions/terminal_states";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import useCommandHandler from "./command_handler";
import type { AppInfo } from "@/models/storage/slice/applications/application_info";

const useTerminalEvent = (
    container: React.RefObject<HTMLDivElement | null>,
    processInfo: AppInfo,
    shellPrompt: string,
    terminalState?: TerminalStates,
) => {
    const dispatch = useDispatch();
    const commandHandler = useCommandHandler(
        shellPrompt,
        terminalState,
        processInfo,
    );
    const currentHistoryIndex = useRef<number>(-1);
    const HandleKeyDownEvent = (e: KeyboardEvent) => {
        const { key } = e;
        console.log(key);
        switch (key.toLowerCase()) {
            case "enter":
                EnterSubmitHandler();
                break;
            case "arrowup":
                HandleArrowUp();
                break;
            case "arrowdown":
                HandleArrowDown();
                break;
            default:
                currentHistoryIndex.current = -1;
                break;
        }
    };

    //This will handle the enter event
    const EnterSubmitHandler = () => {
        if (!terminalState) return;
        // This will handle the clear command
        if (terminalState.inputState.inputValue.split(" ")[0] === "clear") {
            dispatch(AppendHistory(terminalState.processId));
            dispatch(ClearDisplay(terminalState.processId));
            dispatch(ClearInputValue({ processId: terminalState.processId }));
            return;
        }
        if (!terminalState.inputState.inputValue) return;
        dispatch(
            AppendDisplay({
                processId: terminalState.processId,
                display: commandHandler.Exec(),
            }),
        );
        dispatch(AppendHistory(terminalState.processId));
        dispatch(ClearInputValue({ processId: terminalState.processId }));
    };

    const HandleArrowUp = () => {
        if (!terminalState) return;
        const history = terminalState.history;
        if (!history.length) return;
        const prevCommandIndex: number =
            currentHistoryIndex.current === -1
                ? history.length - 1
                : currentHistoryIndex.current === 0
                  ? 0
                  : (currentHistoryIndex.current -= 1);
        currentHistoryIndex.current = prevCommandIndex;
        console.log(currentHistoryIndex.current);
        dispatch(
            UpdateTerminalInput({
                processId: terminalState.processId,
                inputValue: history[prevCommandIndex],
            }),
        );
    };

    const HandleArrowDown = () => {
        if (!terminalState) return;
        const history = terminalState.history;
        if (!history.length) return;
        const nextCommandIndex =
            currentHistoryIndex.current === history.length - 1
                ? -1
                : currentHistoryIndex.current === -1
                  ? -1
                  : (currentHistoryIndex.current += 1);
        currentHistoryIndex.current = nextCommandIndex;
        dispatch(
            UpdateTerminalInput({
                processId: terminalState.processId,
                inputValue: history[currentHistoryIndex.current] || "",
            }),
        );
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
