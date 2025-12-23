import type { CacheImageType } from "@/models/storage/db_types";
import db from "./db";

export const getCachedImage = async (
    image_url: string,
): Promise<CacheImageType | undefined> => {
    const cacheImage = await db.cacheImages.where({ image_url }).first();
    return cacheImage;
};
export const cacheTheImage = async (
    image_url: string,
    image_data: Blob,
): Promise<number> => {
    return await db.cacheImages.add({ image_url, image_data });
};
