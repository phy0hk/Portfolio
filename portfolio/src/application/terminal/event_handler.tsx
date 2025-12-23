import { useEffect, useRef } from "react";
const EventHandler = ({
    inputCommand,
    sysInfo,
    terminalState,
    clearInput,
}: EventHandlerProps) => {
    const dispatch = useDispatch();
    const localTerminalState = useRef<TerminalStates>(terminalState);
    const localCommand = useRef<string>("");
    const HandleKeyDownEvent = (e: KeyboardEvent) => {
        const { key } = e;
        switch (key.toLowerCase()) {
            case "enter":
                EnterSubmitHandler();
                break;
            default:
                break;
        }
    };
    const EnterSubmitHandler = () => {
        const commandHistory = `${sysInfo} ${localCommand.current}`;

        //This will handle the clear command
        if (localCommand.current.split(" ")[0] === "clear") {
            dispatch(
                updateTerminalStates({
                    ...localTerminalState.current,
                    display: [],
                    history: [
                        //@ts-expect-error
                        ...localTerminalState.current.history,
                        commandHistory,
                    ],
                }),
            );
            clearInput();
            return;
        }
        //this will handler others command
        const tempTerminalState: TerminalStates = {
            ...terminalState,
            display: [
                //@ts-expect-error
                ...localTerminalState.current.display,
                CommandHandler(localCommand.current, sysInfo),
            ],
            //@ts-expect-error
            history: [...localTerminalState.current.history, commandHistory],
        };
        dispatch(updateTerminalStates(tempTerminalState));
        clearInput();
    };
    useEffect(() => {
        window.addEventListener("keydown", HandleKeyDownEvent);
        return () => {
            window.removeEventListener("keydown", HandleKeyDownEvent);
        };
    }, []);
    //Watch Terminal State
    useEffect(() => {
        localTerminalState.current = terminalState;
    }, [terminalState]);
    //Watch Command Input
    useEffect(() => {
        localCommand.current = inputCommand;
    }, [inputCommand]);

    return "";
};
interface EventHandlerProps {
    processInfo: AppInfo;
    inputCommand: string;
    clearInput: () => void;
    sysInfo: string;
    terminalState: TerminalStates | undefined;
}
export default EventHandler;
