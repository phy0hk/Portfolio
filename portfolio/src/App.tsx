import Taskbar from "@/components/taskbar";
import PopUp from "./components/popup";
import useMainHook from "./hooks/main_hook";
import OpenedApps from "./components/opened_apps";
function App() {
    const { wallpaper } = useMainHook();
    return (
        <div className="w-full h-screen relative p-2 overflow-hidden flex flex-col text-tprimary">
            {/*Background wallpaper */}
            <Taskbar />
            <PopUp />
            <img
                src={wallpaper}
                className="h-full w-full object-cover object-center fixed inset-0 brightness-100 -z-10 select-none"
            />
            <OpenedApps />
        </div>
    );
}

export default App;
