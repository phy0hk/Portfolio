import Dexie, { type EntityTable } from "dexie";
import type {
    DisplayDataType,
    HistoryDataType,
    UserInputType,
} from "../types/db_types";

const db = new Dexie("terminal-data") as Dexie & {
    displayData: EntityTable<DisplayDataType, "id">;
    historyCommands: EntityTable<HistoryDataType, "id">;
    userInput: EntityTable<UserInputType, "id">;
};
db.version(1).stores({
    displayData: "++id,display_type,display_content",
    historyCommands: "++id,command,timestamp",
    userInput: "++id,input",
});
export default db;
