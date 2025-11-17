import db from "./local_db";

export const push_display = () => {};

export const createInput = (input: string) => {
    return db.userInput.add({ input });
};
