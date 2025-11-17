import { current } from "@reduxjs/toolkit";
import type { DisplayDataType, UserInputType } from "../types/db_types";
import db from "./local_db";

export const getDisplay = (): Promise<DisplayDataType[]> | undefined => {
    return db.displayData.toArray();
};
export const getUserInput = async (): Promise<UserInputType | undefined> => {
    const currentInput = await db.userInput.get({ id: 1 });
    return currentInput;
};
