import type {
  DisplayDataType,
  HistoryDataType,
  UserInputType,
} from "../types/db_types";
import db from "./local_db";

export const getDisplay = (): Promise<DisplayDataType[]> | undefined => {
  const data = db.displayData.toArray();
  return data;
};
export const getUserInput = async (): Promise<UserInputType | undefined> => {
  const currentInput = await db.userInput.get({ id: 1 });
  return currentInput;
};
export const getHistory = (): Promise<HistoryDataType[]> | undefined => {
  const data = db.historyCommands.toArray();
  return data;
};
