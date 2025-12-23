import type { PopUpMenuType } from "@/models/storage/slice/desktop_slice_types";
import ApplicationMenu from "./application_menu";

const AutoSwitchMenu = ({ currentMenu }: { currentMenu: PopUpMenuType }) => {
    switch (currentMenu) {
        case "application":
            return <ApplicationMenu />;
        default:
            return "";
    }
};
export default AutoSwitchMenu;
