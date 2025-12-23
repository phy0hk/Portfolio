import type { AppInfo } from "@/models/storage/slice/desktop_slice_types";
import {
    openNewApp,
    setPopUpMenu,
} from "@/storage/redux/desktop_states/desktop_slice";
import { cacheImage } from "@/utils/image_cacher";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useAppHooks = (App: AppInfo) => {
    const dispatch = useDispatch();
    const [appIcon, setAppIcon] = useState<string | undefined>(undefined);

    const HandleOnClick = () => {
        const newProcessId = Math.floor(Math.random() * 100);
        console.log(newProcessId);
        const openApp: AppInfo = {
            ...App,
            position: { x: 0, y: 0 },
            zindex: 999,
            processId: newProcessId,
        };
        dispatch(setPopUpMenu("none"));
        dispatch(openNewApp(openApp));
    };

    useEffect(() => {
        if (!App.icon) return;
        cacheImage(App.icon).then((image) => {
            const object_url = URL.createObjectURL(image.image_data);
            setAppIcon(object_url);
            return () => URL.revokeObjectURL(object_url);
        });
    }, [App]);

    return { HandleOnClick, appIcon };
};
export default useAppHooks;
