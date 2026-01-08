import type { AppInfo } from "@/models/storage/slice/applications/application_info";
import { UpdateTerminalInput } from "@/storage/redux/desktop_states/applicaions/terminal_states";
import type { RootState } from "@/storage/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useTerminal = (
    processInfo: AppInfo,
    textAreaRef: React.RefObject<HTMLTextAreaElement | null>,
) => {
    const dispatch = useDispatch();
    const sysInfo = useSelector(
        (state: RootState) =>
            state.terminalApp.TerminalsState.find(
                (item) => item.processId === processInfo.processId,
            )?.inputState.sysInfo,
    );
    const shellPrompt = `[ ${sysInfo?.hostname}@${sysInfo?.user} ${sysInfo?.path === "/home/guest" ? "~" : sysInfo?.path}] $ `;
    const terminalState = useSelector((state: RootState) =>
        state.terminalApp.TerminalsState.find(
            (item) => processInfo.processId == item.processId,
        ),
    );

    const HandleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const currentValue = e.currentTarget.value;
        if (
            currentValue.startsWith(shellPrompt) &&
            !currentValue.endsWith("\n")
        ) {
            const newInput = currentValue.replace(shellPrompt, "");
            dispatch(
                UpdateTerminalInput({
                    processId: processInfo.processId,
                    inputValue: newInput,
                }),
            );
        }
    };
    useEffect(() => {
        const TempElement = document.getElementById(
            `terminal-${processInfo.processId}`,
        );
        TempElement?.scrollTo({
            top: TempElement.scrollHeight,
            behavior: "smooth",
        });
    });
    useEffect(() => {
        const textArea = textAreaRef.current;
        // const minHeight = 50;
        if (!terminalState) return;
        if (!textArea) return;
        textArea.style.height = `${textArea.scrollHeight}px`;

        // textArea.style.height = `${Math.max(textArea.scrollHeight, minHeight)}px`;
        console.log(
            terminalState.inputState,
            "scroll Height",
            textArea.scrollHeight,
            textArea.style.height,
        );
    }, [terminalState?.inputState.inputValue, textAreaRef]);
    return { terminalState, HandleOnChange, shellPrompt, sysInfo };
};
export default useTerminal;
