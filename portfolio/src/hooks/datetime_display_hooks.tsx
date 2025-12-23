import { useEffect, useState } from "react";

const useDatetimeDisplay = () => {
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

    return { timeString, dateString };
};
export default useDatetimeDisplay;
