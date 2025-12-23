import useAppHooks from "@/hooks/popup_menus/application_menu/app";
import { type AppInfo } from "@/models/storage/slice/desktop_slice_types";
import { Image } from "lucide-react";

const App = ({ App }: { App: AppInfo }) => {
    const { appIcon, HandleOnClick } = useAppHooks(App);
    return (
        <button
            onClick={HandleOnClick}
            className="w-full h-13 p-3 flex flex-row gap-3 items-center rounded hover:bg-zinc-900/20 max-md:focus:bg-zinc-900/20"
        >
            <span className="rounded-full bg-zinc-400 p-2">
                {appIcon ? <img src={appIcon} /> : <Image />}
            </span>
            <h5 className="text-sm">{App.name}</h5>
        </button>
    );
};
export default App;
