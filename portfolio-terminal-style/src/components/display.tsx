import { useLiveQuery } from "dexie-react-hooks";
import { getDisplay } from "../utils/localstorage/read_opertaions";
import CommandInput from "./input";
import DisplayItem from "./display_item";

const Display = () => {
    const displayData = useLiveQuery(getDisplay);

    return (
        <div className="w-full h-auto p-2">
            {displayData &&
                displayData.map((item, index) => (
                    <DisplayItem key={index} element={item.display_content} />
                ))}
            <CommandInput />
        </div>
    );
};
export default Display;
