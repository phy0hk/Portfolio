import Dexie, { type EntityTable } from "dexie";
import type {
    CacheFileType,
    DisplayDataType,
    HistoryDataType,
    UserInputType,
} from "@/models/storage/db_types";

const db = new Dexie("terminal-data") as Dexie & {
    displayData: EntityTable<DisplayDataType, "id">;
    historyCommands: EntityTable<HistoryDataType, "id">;
    userInput: EntityTable<UserInputType, "id">;
    cacheFiles: EntityTable<CacheFileType, "id">;
};
db.version(1).stores({
    displayData: "++id,display_type,display_content",
    historyCommands: "++id,command,timestamp",
    userInput: "++id,input",
    cacheFiles: "++id,file_url,file_data",
});
export default db;
