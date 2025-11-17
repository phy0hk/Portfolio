import { useDispatch } from "react-redux";
import { setInputValue } from "../utils/states/slice";

export const KeyDownEventHandler = () => {
    const [event, setEvent] = useState<KeyboardEvent | null>(null);
    const dispatch = useDispatch();
    if (e.key.length === 1) {
        const input = e.key;
        dispatch(setInputValue(input));
    }
    return "";
};
