import type { AppInfo } from "@/models/storage/slice/desktop_slice_types";
import { UpdateTerminalInput } from "@/storage/redux/desktop_states/applicaions/terminal_states";
import type { RootState } from "@/storage/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useTerminal = (processInfo: AppInfo) => {
    const user_info = { username: "root" };
    const dispatch = useDispatch();
    const sysInfo = useSelector(
        (state: RootState) =>
            state.terminalApp.TerminalsState.find(
                (item) => item.processId === processInfo.processId,
            )?.inputState.sysInfo,
    );
    const shellPrompt = `[ ${sysInfo?.hostname}@${user_info.username} /] $ `;
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

    return { terminalState, HandleOnChange, shellPrompt, sysInfo };
};
export default useTerminal;
