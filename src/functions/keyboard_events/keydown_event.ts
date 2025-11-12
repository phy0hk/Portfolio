export const HandleKeydown = (
    e: KeyboardEvent,
    updateText: (value: string) => void,
    submitEvent: () => void,
    backspaceEvent: () => void,
    deleteEvent: () => void,
) => {
    if (e.key === " ") {
        updateText(" ");
    } else if (e.key.length === 1) {
        updateText(e.key);
    } else if (e.key === "Backspace") {
        backspaceEvent();
    } else if (e.key === "Enter") {
        submitEvent();
    }
};
