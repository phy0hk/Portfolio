import db from "./db";

export const createInput = (input: string) => {
    db.userInput.add({ input });
};
