import { useEffect, useRef, useState } from "react";
import { HandleKeydown } from "./functions/keyboard_events/keydown_event";
import {
    CommandHandler,
    SpecialCommandHandler,
} from "./functions/commands/handler";
import { os_name, username } from "./config/system_info";
import type { displayProps } from "./config/global_types";
import DisplayOutput from "./components/display_output";
import BootAnimation from "./components/bootanimation";
function App() {
    const [display, setDisplay] = useState<displayProps[]>([]);
    const [history, setHistory] = useState<string[]>([]);
    const [input, setInput] = useState<string>("");

    const [isBooted, setIsBooted] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [currentPath, setCurrentPath] = useState<string>("/");

    //references
    const inputRef = useRef<string>("");
    const historyRef = useRef<string[]>([]);

    //fetch keyboard events
    useEffect(() => {
        document.body.addEventListener("keydown", handleTheKeydownHandler);
        return () => {
            document.body.removeEventListener(
                "keydown",
                handleTheKeydownHandler,
            );
        };
    }, []);

    //these things will put the data to callable
    useEffect(() => {
        inputRef.current = input;
    }, [input]);
    useEffect(() => {
        historyRef.current = history;
    }, [history]);
    //All Event handler
    const handleTheKeydownHandler = (e: KeyboardEvent) => {
        HandleKeydown(
            e,
            (value) => setInput((prevText) => prevText + value),
            handleEnterEvent,
            handleBackspaceEvent,
            handleDeleteEvent,
        );
    };

    //Event Handler
    const handleEnterEvent = () => {
        console.log(display);
        setDisplay((prev) => [
            ...prev,
            { type: "history", value: inputRef.current },
        ]);
        setHistory((prev) => [...prev, inputRef.current]);
        CommandHandler(
            inputRef.current,
            historyRef.current,
            (res) =>
                setDisplay((prev) => [...prev, { type: "output", value: res }]),
            (newDisplay) => {
                setDisplay(newDisplay);
            },
        );
        SpecialCommandHandler(
            inputRef.current,
            historyRef.current,
            (res) =>
                setDisplay((prev) => [
                    ...prev,
                    { type: "element", element: res },
                ]),
            (newDisplay) => {
                setDisplay(newDisplay);
            },
        );
        setInput("");
    };
    const handleBackspaceEvent = () => {
        setInput((prevText) => prevText.slice(0, -1));
    };
    const handleDeleteEvent = () => {
        setInput((prevText) => prevText.slice(1));
    };

    return (
        <>
            {!isBooted ? (
                <BootAnimation
                    onBooted={(res: boolean) => setIsBooted(res)}
                    isBooted={isBooted}
                />
            ) : (
                <div className="bg-black w-full h-screen text-white p-1 flex flex-col gap-1">
                    {display.map((item, index) => (
                        <DisplayOutput
                            username={username}
                            os_name={os_name}
                            currentPath={currentPath}
                            type={item.type}
                            value={item.value}
                            element={item.element}
                        />
                    ))}
                    <div className="flex flex-row gap-1">
                        <p>{`[${username}@${os_name} ${currentPath} ]`}</p>
                        <div className="h-full relative">
                            <span className="whitespace-pre-wrap">{input}</span>
                            <span className="absolute bottom-0 h-0.5 bg-white w-2 animate-blink"></span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
