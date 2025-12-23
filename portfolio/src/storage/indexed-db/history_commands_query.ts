import db from "./db";

export const push_history = (input: string) => {
    db.historyCommands.add({ command: input, timestamp: new Date() });
};
