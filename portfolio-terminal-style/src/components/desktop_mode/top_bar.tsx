import { Circle } from "lucide-react";
import CurrentOpenedApp from "./current_opened_apps_navbar";
import { useDispatch } from "react-redux";
import { setPopUpMenu } from "../../utils/states/desktop_slice";
import { useEffect, useState } from "react";

const TopBar = () => {
    const dispatch = useDispatch();
    return (
        <div className="relative w-full h-auto pb-2 flex items-center justify-center">
            <div className="w-full h-12 bg-black/40 rounded-full backdrop-blur-md flex items-center px-4 justify-between">
                <button
                    onClick={() => dispatch(setPopUpMenu("application"))}
                    className="flex flex-row gap-2 items-center"
                >
                    <Circle
                        size={20}
                        className="text-zinc-300 hover:text-white"
                    />{" "}
                    App
                </button>
                <CurrentOpenedApp />
                <Datetime />
            </div>
        </div>
    );
};
const Datetime = () => {
    const [timeString, setTimeString] = useState("");
    const [dateString, setDataString] = useState("");
    useEffect(() => {
        const interval = setInterval(() => {
            const CurrDate = new Date();
            setTimeString(
                CurrDate.toLocaleString(`default`, {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                }),
            );
            setDataString(CurrDate.toLocaleDateString());
        }, 100);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="flex flex-col items-center justify-center text-sm">
            <p>{timeString}</p>
            <p>{dateString}</p>
        </div>
    );
};
export default TopBar;
