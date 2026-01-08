import useRelatedProcesses from "@/hooks/applications/related_process";
import {
    focusApp,
    openNewApp,
    setPopUpMenu,
} from "@/storage/redux/desktop_states/desktop_slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cacheFile } from "@/utils/file_cacher";
import type { AppInfo } from "@/models/storage/slice/applications/application_info";

const useAppHooks = (App: AppInfo) => {
    const dispatch = useDispatch();
    const [appIcon, setAppIcon] = useState<string | undefined>(undefined);
    const generateProcessId = () =>
        crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
    const RelatedProcess = useRelatedProcesses(App);
    const HandleOnClick = () => {
        const newProcessId = generateProcessId();
        const openApp: AppInfo = {
            ...App,
            zindex: 999,
            processId: newProcessId,
        };
        dispatch(setPopUpMenu("none"));
        dispatch(openNewApp(openApp));
        dispatch(focusApp(openApp));
        RelatedProcess.Initialize(newProcessId);
    };

    useEffect(() => {
        if (!App.icon) return;
        cacheFile(App.icon).then((image) => {
            const object_url = URL.createObjectURL(image.file_data);
            setAppIcon(object_url);
            return () => URL.revokeObjectURL(object_url);
        });
    }, [App]);

    return { HandleOnClick, appIcon };
};
export default useAppHooks;
