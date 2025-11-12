import type { displayProps } from "../../config/global_types";
import { username } from "../../config/system_info";

export const CommandHandler = (
    command: string,
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
