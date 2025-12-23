import type { ApplicationMenuHooksT } from "@/hooks/popup_menus/application_menu/application_menu_hooks";

export interface SearchBarProps {
    applicationMenuHook: ApplicationMenuHooksT;
}
const SearchBar = ({ applicationMenuHook }: SearchBarProps) => {
    return (
        <div className="w-full h-12">
            <input
                className="w-full h-full outline-none rounded  bg-zinc-900/40 px-4"
                type="text"
                placeholder="Search Apps"
                onChange={applicationMenuHook.OnSearchChange}
                value={applicationMenuHook.searchValue}
            />
        </div>
    );
};
export default SearchBar;
