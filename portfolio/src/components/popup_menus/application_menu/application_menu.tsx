import useApplicationMenu from "@/hooks/popup_menus/application_menu/application_menu_hooks";
import SearchBar from "./searchbar";
import AppListView from "./app_list_view";
import type { PopUpMenuType } from "@/models/storage/slice/desktop_slice_types";

const ApplicationMenu = ({ currentMenu }: { currentMenu: PopUpMenuType }) => {
    const applicationMenuHook = useApplicationMenu();
    return (
        <div
            className={`w-120 h-110 rounded-xl bg-zinc-900 border-zinc-800 border z-10 p-5 py-6 flex flex-col gap-2 ${currentMenu === "application" ? "visible" : "hidden"}`}
        >
            <SearchBar applicationMenuHook={applicationMenuHook} />
            <AppListView searchValue={applicationMenuHook.searchValue} />
        </div>
    );
};
export default ApplicationMenu;
