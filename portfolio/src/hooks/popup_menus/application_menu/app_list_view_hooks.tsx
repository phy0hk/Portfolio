import type { AppInfo } from "@/models/storage/slice/desktop_slice_types";
import type { RootState } from "@/storage/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useAppListView = (searchValue: string) => {
    const AppList = useSelector((state: RootState) => state.display.AppList);
    const [filteredAppList, setFilteredAppList] = useState<AppInfo[]>([]);
    useEffect(() => {
        function Filter() {
            if (searchValue !== "") {
                setFilteredAppList(
                    AppList.filter((item) =>
                        item.name
                            .toLowerCase()
                            .includes(searchValue.toLowerCase()),
                    ),
                );
            } else {
                setFilteredAppList(AppList);
            }
        }
        Filter();
    }, [searchValue, AppList]);

    return { filteredAppList };
};
export default useAppListView;
