import { Apps } from "@/constant/applications_data";
import type { AppInfo } from "@/models/storage/slice/applications/application_info";
import { useEffect, useState } from "react";

const useAppListView = (searchValue: string) => {
    const [filteredAppList, setFilteredAppList] = useState<AppInfo[]>([]);
    useEffect(() => {
        function Filter() {
            if (searchValue !== "") {
                setFilteredAppList(
                    Apps.filter((item) =>
                        item.name
                            .toLowerCase()
                            .includes(searchValue.toLowerCase()),
                    ),
                );
            } else {
                setFilteredAppList(Apps);
            }
        }
        Filter();
    }, [searchValue]);

    return { filteredAppList };
};
export default useAppListView;
