import useTerminalEvent from "@/hooks/applications/terminal/terminal_events_hooks";
import useTerminal from "@/hooks/applications/terminal/terminal_hooks";
import type { AppInfo } from "@/models/storage/slice/desktop_slice_types";
import { useRef } from "react";

const Terminal = ({ processInfo }: { processInfo: AppInfo }) => {
    const container = useRef<HTMLDivElement>(null);
    const { terminalState, inputValue, HandleOnChange, shellPrompt, sysInfo } =
        useTerminal(processInfo);
    useTerminalEvent(container, inputValue, terminalState, sysInfo);
    return (
        <div
            ref={container}
            className={`w-full h-full flex flex-col p-2 overflow-auto ${processInfo.zindex == 999 ? "bg-black" : ""}`}
            id={`terminal-${processInfo.processId}`}
        >
            {terminalState?.display.map((item, index) => (
                <div
                    key={index}
                    dangerouslySetInnerHTML={{ __html: item }}
                ></div>
            ))}
            <textarea
                className="w-full min-h-75 outline-none resize-none text-wrap"
                value={shellPrompt + inputValue}
                onChange={HandleOnChange}
            />
        </div>
    );
};
// interface TerminalProps {}
export default Terminal;
