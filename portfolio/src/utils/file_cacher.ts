import type { CacheFileType } from "@/models/storage/db_types";
import {
    cacheTheFile,
    getCachedFile,
} from "@/storage/indexed-db/cache_file_query";

export const cacheFile = async (url: string): Promise<CacheFileType> => {
    const cachedFile = await getCachedFile(url);
    if (!cachedFile) {
        const res = await fetch(url);
        const blob = await res.blob();
        const id = await cacheTheFile(url, blob);
        return { id, file_url: url, file_data: blob };
    }
    return cachedFile;
};
