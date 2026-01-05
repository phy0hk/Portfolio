import type {
    AllTerminalStates,
    TerminalStates,
} from "@/models/storage/slice/applications/terminal_slices_types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AllTerminalStates = {
    TerminalsState: [],
};
const reducers = {
    NewTerminal(state: AllTerminalStates, action: PayloadAction<number>) {
        state.TerminalsState.push({
            processId: action.payload,
            display: [],
            history: [],
        });
    },
    CloseTerminal(
        state: AllTerminalStates,
        action: PayloadAction<TerminalStates>,
    ) {
        state.TerminalsState = state.TerminalsState.filter(
            (item) => item.processId != action.payload.processId,
        );
    },
    UpdateTerminalState(
        state: AllTerminalStates,
        action: PayloadAction<TerminalStates>,
    ) {
        state.TerminalsState[
            state.TerminalsState.findIndex(
                (item) => item.processId == action.payload.processId,
            )
        ] = action.payload;
    },
};

const TerminalSlice = createSlice({
    name: "terminal",
    initialState,
    reducers,
});

export const { NewTerminal, UpdateTerminalState } = TerminalSlice.actions;
export default TerminalSlice;
