import type { DisplayDataType } from "@/models/storage/db_types";
import db from "./db";

export const push_display = (displayType: string, input: string) => {
    const newData: DisplayDataType = {
        display_type: displayType,
        display_content: input,
    };
    db.displayData.add(newData);
};
