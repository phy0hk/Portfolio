import { useEffect } from "react";
import Display from "./components/display";
import { KeyDownEventHandler } from "./applications/event_handler";
function App() {
    useEffect(() => {
        document.addEventListener("keydown", KeyDownEventHandler);
        return () => {
            document.removeEventListener("keydown", KeyDownEventHandler);
        };
    }, []);
    return (
        <>
            <div className="bg-zinc-950 w-full h-screen text-white">
                <Display />
            </div>
        </>
    );
}

export default App;
