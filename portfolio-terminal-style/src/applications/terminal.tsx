import { useSelector } from "react-redux";
import type { RootState } from "../utils/states/store";
import { user_info } from "../utils/config/portfolio_info";
import { useEffect, useState } from "react";
import type { AppInfo } from "../utils/states/desktop_slice";
import EventHandler from "./terminal/event_handler";
const Terminal = ({ processInfo }: { processInfo: AppInfo }) => {
    const sysInfo = useSelector((state: RootState) => state.input.sysInfo);
    const hostnameAndUsername = `[ ${sysInfo.hostname}@${user_info.username} /] $ `;
    const [inputValue, setInputValue] = useState<string>("");
    const container = useRef<HTMLDivElement>(null);
    const terminalState = useSelector((state: RootState) =>
        state.display.TerminalStates.find(
            (item) => processInfo.processId == item.processId,
        ),
    );
    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const currentValue = e.currentTarget.value;
        if (
            currentValue.startsWith(hostnameAndUsername) &&
            !currentValue.endsWith("\n")
        ) {
            const newInput = currentValue.replace(hostnameAndUsername, "");
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
    return (
        <div
            ref={}
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
                className="w-full min-h-[300px] outline-none resize-none"
                value={hostnameAndUsername + inputValue}
                onChange={handleOnChange}
            />
            {processInfo.zindex === 999 ? (
                <EventHandler
                    sysInfo={hostnameAndUsername}
                    processInfo={processInfo}
                    inputCommand={inputValue}
                    terminalState={terminalState}
                    clearInput={() => setInputValue("")}
                />
            ) : (
                ""
            )}
        </div>
    );
};
// interface TerminalProps {}
export default Terminal;
