import { useEffect } from "react";
import TopBar from "../components/desktop_mode/top_bar";
import PopUp from "../components/desktop_mode/popup";
import OpenedAppsContainer from "../components/desktop_mode/opened_apps_container";

const DesktopMode = () => {
    useEffect(() => {
        document.body.classList.add("overflow-hidden");
    }, []);

    return (
        <div className="w-full h-screen relative p-2 overflow-hidden flex flex-col">
            {/*Background wallpaper */}
            <TopBar />
            <PopUp />
            <img
                src="/dreamy-purple-clouds-aesthetic-desktop-wallpaper-4k.jpg"
                className="h-full w-full object-cover object-center fixed inset-0 brightness-80 -z-10 select-none"
            />
            <OpenedAppsContainer />
        </div>
    );
};
export default DesktopMode;
