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
    NewTerminal(state: AllTerminalStates, action: PayloadAction<string>) {
        state.TerminalsState.push({
            processId: action.payload,
            inputState: {
                inputValue: "",
                pointerPos: 0,
                fetchInputEvent: true,
                isInSpecialCommand: false,
                sysInfo: {
                    hostname: "archlinux",
                    os: "linux",
                    architecture: "x86_64",
                    kernal: "linux_lts 6.12",
                },
                environmentVariables: { os: "Linux x86_64" },
            },
            display: [],
            history: [],
        });
    },
    CloseTerminal(
        state: AllTerminalStates,
        action: PayloadAction<{ processId: string }>,
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
    UpdateTerminalInput(
        state: AllTerminalStates,
        action: PayloadAction<{ processId: string; inputValue: string }>,
    ) {
        const index = state.TerminalsState.findIndex(
            (item) => item.processId == action.payload.processId,
        );
        if (index !== -1) {
            state.TerminalsState[index].inputState.inputValue =
                action.payload.inputValue;
        }
    },
    SetInputValue(
        state: AllTerminalStates,
        action: PayloadAction<{ processId: string; inputValue: string }>,
    ) {
        const index = state.TerminalsState.findIndex(
            (item) => item.processId == action.payload.processId,
        );
        state.TerminalsState[index].inputState.inputValue =
            action.payload.inputValue;
    },
    AppendInputValue(
        state: AllTerminalStates,
        action: PayloadAction<{ processId: string; inputValue: string }>,
    ) {
        const index = state.TerminalsState.findIndex(
            (item) => item.processId == action.payload.processId,
        );
        state.TerminalsState[index].inputState.inputValue +=
            action.payload.inputValue;
    },
    ClearInputValue(
        state: AllTerminalStates,
        action: PayloadAction<{ processId: string }>,
    ) {
        const index = state.TerminalsState.findIndex(
            (item) => item.processId == action.payload.processId,
        );
        state.TerminalsState[index].inputState.inputValue = "";
    },
    SetFetchInputEvent(
        state: AllTerminalStates,
        action: PayloadAction<{ processId: string; fetchInputEvent: boolean }>,
    ) {
        const index = state.TerminalsState.findIndex(
            (item) => item.processId == action.payload.processId,
        );
        state.TerminalsState[index].inputState.fetchInputEvent =
            action.payload.fetchInputEvent;
    },
    SetIsInSpecialCommand(
        state: AllTerminalStates,
        action: PayloadAction<{
            processId: string;
            isInSpecialCommand: boolean;
        }>,
    ) {
        const index = state.TerminalsState.findIndex(
            (item) => item.processId == action.payload.processId,
        );
        state.TerminalsState[index].inputState.isInSpecialCommand =
            action.payload.isInSpecialCommand;
    },
};

const TerminalSlice = createSlice({
    name: "terminal",
    initialState,
    reducers,
});

export const {
    NewTerminal,
    UpdateTerminalState,
    UpdateTerminalInput,
    SetFetchInputEvent,
    SetIsInSpecialCommand,
    ClearInputValue,
    AppendInputValue,
    SetInputValue,
    CloseTerminal,
} = TerminalSlice.actions;
export default TerminalSlice;
