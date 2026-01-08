export interface AllTerminalStates {
    TerminalsState: TerminalStates[];
}
export interface TerminalStates {
    processId: string;
    inputState: InputState;
    history: string[];
    display: string[];
}
interface InputState {
    inputValue: string;
    pointerPos: number;
    fetchInputEvent: boolean;
    isInSpecialCommand: boolean;
    environmentVariables: Record<string, string>;
    sysInfo: SystemInfo;
}
export interface SystemInfo {
    hostname: string;
    user: string;
    path: string;
    os: "linux";
    architecture: "x86_64" | "arm64";
    kernal: string;
}
