import db from "./local_db";

export const clearDisplay = () => {
  return db.displayData.clear();
};
