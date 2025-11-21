import { useRef, useState } from "react";
import type { AppInfo } from "../utils/states/desktop_slice";
import SearchBar from "./browser/searchbar";
const Browser = ({ processInfo }: BrowserProps) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [searchURL, setSearchURL] = useState<string>("");
    const handleOnSearch = () => {
        setSearchURL(inputValue);
    };
    return (
        <div
            className={`w-full h-full flex flex-col p-2 ${processInfo.zindex === 999 ? "bg-zinc-900" : ""}`}
        >
            <SearchBar
                inputValue={inputValue}
                onInputChange={(e) => setInputValue(e.target.value)}
                onSearch={handleOnSearch}
            />
            <iframe className="w-full h-full bg-white" src={searchURL} />
        </div>
    );
};
interface BrowserProps {
    processInfo: AppInfo;
}
export default Browser;
