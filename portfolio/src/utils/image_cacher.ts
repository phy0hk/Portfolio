import type { CacheImageType } from "@/models/storage/db_types";
import {
    cacheTheImage,
    getCachedImage,
} from "@/storage/indexed-db/cache_image_query";

export const cacheImage = async (url: string): Promise<CacheImageType> => {
    const cachedImage = await getCachedImage(url);
    if (!cachedImage) {
        const res = await fetch(url);
        const blob = await res.blob();
        const id = await cacheTheImage(url, blob);
        console.log(res);
        return { id, image_url: url, image_data: blob };
    }
    return cachedImage;
};
