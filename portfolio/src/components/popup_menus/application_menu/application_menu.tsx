import useApplicationMenu from "@/hooks/popup_menus/application_menu/application_menu_hooks";
import SearchBar from "./searchbar";
import AppListView from "./app_list_view";

const ApplicationMenu = () => {
    const applicationMenuHook = useApplicationMenu();
    return (
        <div className="w-120 h-110 backdrop-blur-md rounded-xl bg-zinc-900/30 z-10 p-5 py-6 flex flex-col gap-2">
            <SearchBar applicationMenuHook={applicationMenuHook} />
            <AppListView searchValue={applicationMenuHook.searchValue} />
        </div>
    );
};
export default ApplicationMenu;
