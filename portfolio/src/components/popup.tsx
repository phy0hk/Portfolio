import usePopup from "@/hooks/popup_hooks";
import type { PopUpMenuType } from "@/storage/redux/desktop_slice";

const PopUp = () => {
    const popupHook = usePopup();
    return (
        <div
            className={`w-full h-full absolute flex inset-0 items-center justify-center p-3 ${PopUpMenu === "none" ? "hidden" : ""} z-1100 `}
        >
            <button
                className="w-full h-full absolute"
                onClick={popupHook.HandlePopupClose}
            />
            <AutoSwitchMenu currentMenu={popupHook.popupMenu} />
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
