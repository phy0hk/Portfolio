import type { PopUpMenuType } from "@/models/storage/slice/desktop_slice_types";
import ApplicationMenu from "./application_menu";

const AutoSwitchMenu = ({ currentMenu }: { currentMenu: PopUpMenuType }) => {
    return (
        <>
            <ApplicationMenu currentMenu={currentMenu} />
        </>
    );
};
export default AutoSwitchMenu;
