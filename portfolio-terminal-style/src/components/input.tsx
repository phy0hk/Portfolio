import { user_info } from "../utils/config/portfolio_info";
import { sysInfo } from "../utils/config/sys_info";
import { useSelector } from "react-redux";
import type { RootState } from "../utils/states/store";
import KeyDownEventHandler from "../applications/keydownevent_handler";

const CommandInput = () => {
    const inputValue = useSelector(
        (state: RootState) => state.input.inputValue,
    );
    const fetchInputEvent = useSelector(
        (state: RootState) => state.input.fetchInputEvent,
    );
    const hostnameAndUsername = `[ ${sysInfo.hostname}@${user_info.username} ${user_info.path} ]$`;
    console.log(hostnameAndUsername.length);
    return (
        <div className="relative">
            <span className="flex flex-row items-end h-auto gap-1">
                {hostnameAndUsername}
                <p className="whitespace-pre-wrap relative w-auto h-full">
                    {inputValue}
                    <span
                        className="w-2 border-b-2 border-white  animate-blink absolute bottom-0 right-0"
                        style={{ right: `calc(var(--spacing)*-2)` }}
                    ></span>
                </p>
            </span>
            {fetchInputEvent ? (
                <KeyDownEventHandler currentInput={inputValue} />
            ) : (
                ""
            )}
        </div>
    );
};

export default CommandInput;
