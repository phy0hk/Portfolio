import { createInput } from "./create_operations";
import db from "./local_db";

export const UpdateInput = async (input: string) => {
    const inputStorage = await db.userInput.get({ id: 1 });
    if (!inputStorage) return await createInput(input);
    return await db.userInput.update(1, { input });
};
