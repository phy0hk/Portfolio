import usePopup from "@/hooks/popup_hooks";
import AutoSwitchMenu from "./popup_menus/application_menu/auto_switch_menu";

const PopUp = () => {
    const { popupMenu, HandlePopupClose } = usePopup();
    return (
        <div
            className={`w-full h-full absolute flex inset-0 items-center justify-center p-3 ${popupMenu === "none" ? "hidden" : ""} z-1100 `}
        >
            <button
                className="w-full h-full absolute"
                onClick={HandlePopupClose}
            />
            <AutoSwitchMenu currentMenu={popupMenu} />
        </div>
    );
};

export default PopUp;
