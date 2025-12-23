import App from "./app";
import useAppListView from "@/hooks/popup_menus/application_menu/app_list_view_hooks";

const AppListView = ({ searchValue }: { searchValue: string }) => {
    const applistViewHook = useAppListView(searchValue);
    return (
        <div className="h-full flex flex-col gap-2 pt-5 overflow-auto">
            {applistViewHook.filteredAppList.map((item, index) => (
                <App App={item} key={index} />
            ))}
        </div>
    );
};

export default AppListView;
