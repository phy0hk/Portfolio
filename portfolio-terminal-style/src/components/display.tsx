import { useLiveQuery } from "dexie-react-hooks";
import { getDisplay } from "../utils/localstorage/read_opertaions";
import CommandInput from "./input";

const Display = () => {
    const displayData = useLiveQuery(getDisplay);
    return (
        <div className="w-full h-auto">
            {displayData &&
                displayData.map((item) => (
                    <div key={item.id}>{item.display_content}</div>
                ))}
            <CommandInput />
        </div>
    );
};
export default Display;
