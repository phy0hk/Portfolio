import useDatetimeDisplay from "@/hooks/datetime_display_hooks";
const Datetime = () => {
    const datetimeDisplay = useDatetimeDisplay();
    return (
        <div className="flex flex-col items-center justify-center text-xs">
            <p>{datetimeDisplay.timeString}</p>
            <p>{datetimeDisplay.dateString}</p>
        </div>
    );
};

export default Datetime;
