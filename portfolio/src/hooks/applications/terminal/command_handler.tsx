import type { TerminalStates } from "@/models/storage/slice/applications/terminal_slices_types";
import { renderToString } from "react-dom/server";
import Echo from "./commands/echo";
// import { useDispatch } from "react-redux";

const useCommandHandler = (
    shellPrompt: string,
    terminalState?: TerminalStates,
) => {
    // const dispatch = useDispatch();
    const Exec = () => {
        switch (terminalState?.inputState.inputValue) {
            case "help": {
                return renderToString(
                    <p>
                        {shellPrompt + "Available commands: help, clear, exit"}
                    </p>,
                );
            }
            case "history": {
                return renderToString(
                    <>
                        <p>{shellPrompt + "history"}</p>
                        {terminalState?.history.map((item) => (
                            <p>{item}</p>
                        ))}
                    </>,
                );
            }
            case "echo": {
                return Echo(shellPrompt, terminalState);
            }
            default: {
                return renderToString(
                    <>
                        <p>
                            {shellPrompt + terminalState?.inputState.inputValue}
                        </p>
                        <p>{"Invalid Command"}</p>
                    </>,
                );
            }
        }
    };
    return { Exec };
};
export default useCommandHandler;
