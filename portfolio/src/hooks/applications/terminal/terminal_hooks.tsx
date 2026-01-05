import type { AppInfo } from "@/models/storage/slice/desktop_slice_types";
import type { RootState } from "@/storage/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useTerminal = (processInfo: AppInfo) => {
    const user_info = { username: "root" };
    const sysInfo = useSelector((state: RootState) => state.input.sysInfo);
    const shellPrompt = `[ ${sysInfo.hostname}@${user_info.username} /] $ `;
    const [inputValue, setInputValue] = useState<string>("");
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
            setInputValue(newInput);
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
        console.log(TempElement?.scrollHeight);
    }, []);

    return { terminalState, inputValue, HandleOnChange, shellPrompt, sysInfo };
};
export default useTerminal;
