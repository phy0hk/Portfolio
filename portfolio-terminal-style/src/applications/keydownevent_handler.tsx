import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { appendInputValue, setInputValue } from "../utils/states/input_slice";
import { CommandHandler } from "./command_handler";
import { useLiveQuery } from "dexie-react-hooks";
import type { HistoryDataType } from "../utils/types/db_types";
import { getHistory } from "../utils/localstorage/read_opertaions";

const EventHandler = ({ currentInput }: EventHandlerProps) => {
    const currInput = useRef<string>("");
    const dispatch = useDispatch();
    const history: HistoryDataType[] | undefined = useLiveQuery(getHistory);
    const historyPointerPosition = useRef<number>(0);
    const [isInHistory, setIsInHistory] = useState(false);
    const isInSpecialCommand = false;
    //All keydown event are handle here
    const KeyDownEvent = (event: KeyboardEvent) => {
        const inputEvent = event.key;

        if (inputEvent.length === 1 && !isInSpecialCommand) {
            dispatch(appendInputValue(inputEvent));
        }
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

        switch (inputEvent) {
            case "Enter":
                CommandHandler(currInput.current);
                historyPointerPosition.current = 0;
                setIsInHistory(false);
                dispatch(setInputValue(""));
                break;
            case "Backspace":
                dispatch(setInputValue(currInput.current.slice(0, -1)));
                break;
            case "Tab":
                dispatch(appendInputValue("\t"));
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
}
export default EventHandler;
