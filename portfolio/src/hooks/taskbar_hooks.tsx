import { useDispatch } from "react-redux";
import { setPopUpMenu } from "../storage/redux/desktop_slice";

const useTaskbar = () => {
    const dispatch = useDispatch();
    const HandleOnAppMenuClick = () => {
        dispatch(setPopUpMenu("application"));
    };
    return { HandleOnAppMenuClick };
};
export default useTaskbar;
