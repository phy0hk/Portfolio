import { useDispatch } from "react-redux";
import { setInputValue } from "../utils/states/slice";

export const KeyDownEventHandler = (e: KeyboardEvent) => {
    const dispatch = useDispatch();
    if (e.key.length === 1) {
        const input = e.key;
        dispatch(setInputValue(input));
    }
};
