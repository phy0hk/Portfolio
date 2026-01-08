import useTerminalEvent from "@/hooks/applications/terminal/terminal_events_hooks";
import useTerminal from "@/hooks/applications/terminal/terminal_hooks";
import type { AppInfo } from "@/models/storage/slice/applications/application_info";
import { useRef } from "react";

const Terminal = ({ processInfo }: { processInfo: AppInfo }) => {
    const container = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { terminalState, HandleOnChange, shellPrompt } = useTerminal(
        processInfo,
        textAreaRef,
    );
    useTerminalEvent(container, processInfo, shellPrompt, terminalState);
    return (
        <div
            ref={container}
            className={`w-full h-full flex flex-col p-2 overflow-auto ${processInfo.zindex == 9999 ? "bg-black" : ""} `}
            id={`terminal-${processInfo.processId}`}
        >
            {terminalState?.display.map((item, index) => (
                <div
                    key={index}
                    dangerouslySetInnerHTML={{ __html: item }}
                ></div>
            ))}
            <textarea
                className={`w-full min-h-20 overflow-hidden outline-none resize-none text-wrap ${terminalState?.inputState.isInSpecialCommand ? "hidden" : ""}`}
                value={shellPrompt + terminalState?.inputState.inputValue}
                onChange={HandleOnChange}
                ref={textAreaRef}
            />
        </div>
    );
};
// interface TerminalProps {}
export default Terminal;
