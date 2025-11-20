import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
    appendInputValue,
    setInputValue,
} from "../../utils/states/input_slice";
import { CommandHandler } from "./command_handler";
import { useLiveQuery } from "dexie-react-hooks";
import type { HistoryDataType } from "../../utils/types/db_types";
import { getHistory } from "../../utils/localstorage/read_opertaions";
import { setDisplayMode } from "../../utils/states/desktop_slice";

const EventHandler = ({
    currentInput,
    hostnameAndUsername,
}: EventHandlerProps) => {
    const currInput = useRef<string>("");
    const dispatch = useDispatch();
    const history: HistoryDataType[] | undefined = useLiveQuery(getHistory);
    const historyPointerPosition = useRef<number>(0);
    const [isInHistory, setIsInHistory] = useState(false);
    const isInSpecialCommand = false;
    //All keydown event are handle here
    const KeyDownEvent = (event: KeyboardEvent) => {
        const inputEvent = event.key;

        //this will go to the previous command in history
        const HistoryUp = () => {
            if (history) {
                if (isInHistory) {
                    historyPointerPosition.current = Math.max(
                        0,
                        historyPointerPosition.current - 1,
                    );
                    dispatch(
                        setInputValue(
                            history[historyPointerPosition.current].command,
                        ),
                    );
                } else {
                    historyPointerPosition.current = history.length - 1;
                    dispatch(
                        setInputValue(
                            history[historyPointerPosition.current].command,
                        ),
                    );
                    setIsInHistory(true);
                }
            }
        };
        //This will go to the next command in history
        const HistoryDown = () => {
            if (history) {
                if (isInHistory) {
                    historyPointerPosition.current = Math.min(
                        history.length - 1,
                        historyPointerPosition.current + 1,
                    );
                    dispatch(
                        setInputValue(
                            history[historyPointerPosition.current].command,
                        ),
                    );
                }
            }
        };
        const ChangeDesktopMode = () => {
            const input = currInput.current.toLowerCase();
            const command = input.split(" ");
            const parameter = command[1];
            console.log(input);
            switch (parameter) {
                case "desktop":
                    dispatch(setDisplayMode("desktop_mode"));
                    return "";
                default:
                    CommandHandler("invalid", hostnameAndUsername, input);
                    return "";
            }
        };
        switch (inputEvent) {
            case "Enter":
                if (currInput.current.startsWith("start")) {
                    ChangeDesktopMode();
                } else {
                    CommandHandler(currInput.current, hostnameAndUsername, "");
                }
                historyPointerPosition.current = 0;
                setIsInHistory(false);
                dispatch(setInputValue(""));
                break;
            case "ArrowUp":
                HistoryUp();
                break;
            case "ArrowDown":
                HistoryDown();
                break;
            case "ArrowLeft":
                break;
            case "ArrowRight":
                break;
            default:
                console.log(inputEvent);
                break;
        }
    };
    //this will create events
    useEffect(() => {
        document.addEventListener("keydown", KeyDownEvent);
        return () => {
            document.removeEventListener("keydown", KeyDownEvent);
        };
    }, []);
    //this will save current input to ref
    useEffect(() => {
        currInput.current = currentInput;
    }, [currentInput]);

    return "";
};
interface EventHandlerProps {
    currentInput: string;
    hostnameAndUsername: string;
}
export default EventHandler;
