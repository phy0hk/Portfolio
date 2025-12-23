const AppListView = ({ searchValue }: { searchValue: string }) => {
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
    return (
        <div className="h-full flex flex-col gap-2 pt-5 overflow-auto">
            {filteredAppList.map((item, index) => (
                <App App={item} key={index} />
            ))}
        </div>
    );
};
