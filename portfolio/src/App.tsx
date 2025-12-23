import wallpaper from "@/assets/flying_out.png";
import Taskbar from "@/components/taskbar";
function App() {
    return (
        <div className="w-full h-screen relative p-2 overflow-hidden flex flex-col text-tprimary">
            {/*Background wallpaper */}
            <Taskbar />
            {/*<PopUp />*/}
            <img
                src={wallpaper}
                className="h-full w-full object-cover object-center fixed inset-0 brightness-100 -z-10 select-none"
            />
            {/*<OpenedAppsContainer />*/}
        </div>
    );
}

export default App;
