import type { AppInfo } from "@/models/storage/slice/applications/application_info";
import { focusApp } from "@/storage/redux/desktop_states/desktop_slice";
import { cacheFile } from "@/utils/file_cacher";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const AppIcon = ({ app }: { app: AppInfo }) => {
    const [iconUrl, setIconUrl] = useState<string>("/app_icon/image.png");
    const dispatch = useDispatch();
    useEffect(() => {
        if (!app.icon) return;
        cacheFile(app.icon).then((file) => {
            const url = URL.createObjectURL(file.file_data);
            setIconUrl(url);
            return () => URL.revokeObjectURL(url);
        });
    }, []);

    const handleClick = () => {
        if (app.zindex !== 9999) {
            dispatch(focusApp(app));
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`p-1 rounded-full w-6 h-6 ${app.zindex === 9999 ? "bg-zinc-50" : "bg-zinc-600"}`}
        >
            <img src={iconUrl} alt={app.name} />
        </button>
    );
};

export default AppIcon;
