import type { CacheFileType } from "@/models/storage/db_types";
import db from "./db";

export const getCachedFile = async (
    file_url: string,
): Promise<CacheFileType | undefined> => {
    const cacheFile = await db.cacheFiles.where({ file_url }).first();
    return cacheFile;
};
export const cacheTheFile = async (
    file_url: string,
    file_data: Blob,
): Promise<number> => {
    return await db.cacheFiles.add({ file_url, file_data });
};
