import type { TerminalStates } from "@/models/storage/slice/applications/terminal_slices_types";
import { renderToString } from "react-dom/server";

const Echo = (shellPrompt: string, terminalState?: TerminalStates) => {
    // const { environmentVariables } = terminalState?.inputState;

    return renderToString(
        <p>{shellPrompt + terminalState?.inputState.inputValue}</p>,
    );
};
export default Echo;
