import { useLiveQuery } from "dexie-react-hooks";
import { getDisplay } from "../utils/localstorage/read_opertaions";
import CommandInput from "../components/input";
import DisplayItem from "../components/display_item";
import { useEffect, useState } from "react";

const Tty = () => {
    const displayData = useLiveQuery(getDisplay);
    useEffect(() => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
        });
    }, [displayData]);
    return (
        <div className="w-full min-h-screen p-2 bg-black">
            {displayData &&
                displayData.map((item, index) => (
                    <DisplayItem key={index} element={item.display_content} />
                ))}
            <CommandInput />
            <div className="w-full h-[80vh]"></div>
        </div>
    );
};
export default Tty;
