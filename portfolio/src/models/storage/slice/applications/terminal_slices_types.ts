export interface AllTerminalStates {
    TerminalsState: TerminalStates[];
}
export interface TerminalStates {
    processId: number;
    history: string[];
    display: string[];
}
