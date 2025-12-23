import { cacheImage } from "@/utils/image_cacher";
import { useEffect, useState } from "react";

const useMainHook = () => {
    const default_wallpaper_url = "/backgrounds/flying_out.png";
    const [wallpaper, setWallpaper] = useState<string>("");

    useEffect(() => {
        cacheImage(default_wallpaper_url).then((image) => {
            const url = URL.createObjectURL(image.image_data);
            setWallpaper(url);
            return () => URL.revokeObjectURL(url);
        });
    }, []);

    return { wallpaper };
};
export default useMainHook;
