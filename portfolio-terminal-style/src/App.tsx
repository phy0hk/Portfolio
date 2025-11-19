import { useSelector } from "react-redux";
import Tty from "./pages/tty";
import DesktopMode from "./pages/desktop_mode";
import type { RootState } from "./utils/states/store";
function App() {
    return (
        <>
            <div className="w-full h-auto text-white font-noto-sans">
                <Display />
            </div>
        </>
    );
}
const Display = () => {
    const CurrDisplayMode = useSelector(
        (state: RootState) => state.display.DisplayMode,
    );
    switch (CurrDisplayMode) {
        case "desktop_mode":
            return <DesktopMode />;
        case "default":
        default:
            return <Tty />;
    }
};
export default App;
