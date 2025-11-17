import type { DisplayDataType } from "../types/db_types";
import db from "./local_db";

export const push_display = (displayType: string, input: string) => {
  const newData: DisplayDataType = {
    display_type: displayType,
    display_content: input,
  };
  db.displayData.add(newData);
};

export const createInput = (input: string) => {
  db.userInput.add({ input });
};
export const push_history = (input: string) => {
  db.historyCommands.add({ command: input, timestamp: new Date() });
};
