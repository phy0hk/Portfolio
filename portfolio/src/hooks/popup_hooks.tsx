import { setPopUpMenu } from "@/storage/redux/desktop_states/desktop_slice";
import type { RootState } from "@/storage/redux/store";
import { useDispatch, useSelector } from "react-redux";

const usePopup = () => {
    const popupMenu = useSelector(
        (state: RootState) => state.display.PopUpMenu,
    );
    const dispatch = useDispatch();
    const HandlePopupClose = () => {
        dispatch(setPopUpMenu("none"));
    };
    return { popupMenu, HandlePopupClose };
};
export default usePopup;
