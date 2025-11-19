import { Image } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../utils/states/store";
import {
  openNewApp,
  setPopUpMenu,
  type AppInfo,
} from "../../../utils/states/desktop_slice";

const ApplicationMenu = () => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="w-120 h-110 backdrop-blur-md rounded-xl bg-zinc-900/30 z-10 p-5 py-6 flex flex-col gap-2">
      <SearchBar
        searchValue={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <AppList searchValue={searchValue} />
    </div>
  );
};
const SearchBar = ({
  onChange,
  searchValue,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  searchValue: string;
}) => {
  return (
    <div className="w-full h-12">
      <input
        className="w-full h-full outline-none rounded  bg-zinc-900/40 px-4"
        type="text"
        onChange={onChange}
        value={searchValue}
      />
    </div>
  );
};
const AppList = ({ searchValue }: { searchValue: string }) => {
  const AppList = useSelector((state: RootState) => state.display.AppList);
  const [filteredAppList, setFilteredAppList] = useState<AppInfo[]>([]);
  useEffect(() => {
    function Filter() {
      if (searchValue !== "") {
        setFilteredAppList(
          AppList.filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase()),
          ),
        );
      } else {
        setFilteredAppList(AppList);
      }
    }
    Filter();
  }, [searchValue]);
  return (
    <div className="h-full flex flex-col gap-2 pt-5 overflow-auto">
      {filteredAppList.map((item, index) => (
        <App App={item} key={index} />
      ))}
    </div>
  );
};
const App = ({ App }: { App: AppInfo }) => {
  const dispatch = useDispatch();
  const handleOnClick = () => {
    const newProcessId = Math.floor(Math.random() * 100);
    console.log(newProcessId);
    const openApp: AppInfo = {
      ...App,
      position: { x: 0, y: 0, z: 999 },
      processId: newProcessId,
    };
    dispatch(setPopUpMenu("none"));
    dispatch(openNewApp(openApp));
  };
  return (
    <button
      onClick={handleOnClick}
      className="w-full h-13 p-3 flex flex-row gap-3 items-center rounded-full hover:bg-zinc-900/20 max-md:focus:bg-zinc-900/20"
    >
      <span className="rounded-full bg-zinc-400 p-2">
        {App.icon ? <img src={App.icon} /> : <Image />}
      </span>
      <h5 className="text-sm">{App.name}</h5>
    </button>
  );
};
export default ApplicationMenu;
