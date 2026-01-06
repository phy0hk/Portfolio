export interface AllTerminalStates {
    TerminalsState: TerminalStates[];
}
export interface TerminalStates {
    processId: string;
    history: string[];
    display: string[];
}
