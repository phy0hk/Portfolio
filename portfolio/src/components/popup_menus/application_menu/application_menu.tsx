import useApplicationMenu from "@/hooks/popup_menus/application_menu_hooks";
import SearchBar from "./searchbar";

const ApplicationMenu = () => {
    const applicationMenuHook = useApplicationMenu();
    return (
        <div className="w-120 h-110 backdrop-blur-md rounded-xl bg-zinc-900/30 z-10 p-5 py-6 flex flex-col gap-2">
            <SearchBar applicationMenuHook={applicationMenuHook} />
            <AppListView searchValue={searchValue} />
        </div>
    );
};
export default ApplicationMenu;
