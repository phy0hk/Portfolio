import type { TerminalStates } from "@/models/storage/slice/applications/terminal_slices_types";
import { renderToString } from "react-dom/server";
import Echo from "./commands/echo";
import useCmdAboutMe from "./commands/aboutme";
// import { useDispatch } from "react-redux";

const useCommandHandler = (
    shellPrompt: string,
    terminalState?: TerminalStates,
) => {
    const cmdAboutMe = useCmdAboutMe(shellPrompt, terminalState);
    const Exec = () => {
        switch (terminalState?.inputState.inputValue) {
            case "help": {
                return (
                    generateShellPromptString() +
                    renderToString(
                        <p>"Available commands: help, clear, exit"</p>,
                    )
                );
            }
            case "history": {
                return (
                    generateShellPromptString() +
                    renderToString(
                        <>
                            {terminalState?.history.map((item) => (
                                <p>{item}</p>
                            ))}
                        </>,
                    )
                );
            }
            case "echo": {
                return (
                    generateShellPromptString() +
                    Echo(shellPrompt, terminalState)
                );
            }
            case "about": {
                cmdAboutMe.Trigger();
                return "";
            }
            default: {
                return (
                    generateShellPromptString() +
                    renderToString(
                        <>
                            <p>{"Invalid Command"}</p>
                            <p>
                                The Available Commands are : help, clear,
                                history, about, echo
                            </p>
                        </>,
                    )
                );
            }
        }
    };
    const generateShellPromptString = () => {
        return renderToString(
            <p>{shellPrompt + terminalState?.inputState.inputValue}</p>,
        );
    };
    return { Exec };
};
export default useCommandHandler;
