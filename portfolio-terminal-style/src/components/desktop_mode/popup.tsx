import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../utils/states/store";
import ApplicationMenu from "./popup_menus/application_menu";
import {
    setPopUpMenu,
    type PopUpMenuType,
} from "../../utils/states/desktop_slice";

const PopUp = () => {
    const PopUpMenu = useSelector(
        (state: RootState) => state.display.PopUpMenu,
    );
    const dispatch = useDispatch();
    return (
        <div
            className={`w-full h-full absolute flex inset-0 items-center justify-center p-3 ${PopUpMenu === "none" ? "hidden" : ""} z-20 `}
        >
            <button
                className="w-full h-full absolute"
                onClick={() => dispatch(setPopUpMenu("none"))}
            />
            <AutoSwitchMenu currentMenu={PopUpMenu} />
        </div>
    );
};

const AutoSwitchMenu = ({ currentMenu }: { currentMenu: PopUpMenuType }) => {
    switch (currentMenu) {
        case "application":
            return <ApplicationMenu />;
        default:
            return "";
    }
};
export default PopUp;
