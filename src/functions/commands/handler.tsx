import type React from "react";
import type { displayProps } from "../../config/global_types";
import { username } from "../../config/system_info";

export const CommandHandler = (
    command: string,
    historyArr: string[],
    responseText: (text: string) => void,
    handleDisplay: (newDisplay: displayProps[]) => void,
) => {
    const inputCommand: string[] = command.split(" ");
    switch (inputCommand[0]) {
        case "whoami":
            responseText(whoami());
            break;
        case "clear":
            clear(handleDisplay);
            break;
        case "history":
            responseText(history(historyArr));
            break;
        default:
            console.log("Command not found");
            break;
    }
};
export const SpecialCommandHandler = (
    command: string,
    historyArr: string[],
    responseText: (text: React.ReactNode) => void,
    handleDisplay: (newDisplay: displayProps[]) => void,
) => {
    const inputCommand: string[] = command.split(" ");
    switch (inputCommand[0]) {
        case "help":
            responseText(help());
            break;
        default:
            console.log("Command not found");
            break;
    }
};
//basic command
const whoami = (): string => {
    return username + "\n";
};
const clear = (handleDisplay: (newDisplay: displayProps[]) => void): void => {
    handleDisplay([]);
};
const history = (hisArr: string[]): string => {
    return hisArr.join("\n");
};
const help = (): React.ReactNode => {
    return (
        <div>
            <p>Available commands:</p>
            <ul>
                <li>whoami</li>
                <li>history</li>
                <li>clear</li>
                <li>help</li>
            </ul>
        </div>
    );
};
