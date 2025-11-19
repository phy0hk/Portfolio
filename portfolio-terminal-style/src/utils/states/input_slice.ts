import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface InputState {
  inputValue: string;
  pointerPos: number;
  fetchInputEvent: boolean;
  isInSpecialCommand: boolean;
  sysInfo: SystemInfo;
}
export interface SystemInfo {
  hostname: string;
  os: "linux";
  architecture: "x86_64" | "arm64";
  kernal: string;
}
const initialState: InputState = {
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
};
const InputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setInputValue(state, action: PayloadAction<string>) {
      state.inputValue = action.payload;
    },
    appendInputValue(state, action: PayloadAction<string>) {
      state.inputValue += action.payload;
    },
    clearInputValue(state) {
      state.inputValue = "";
    },
    setFetchInputEvent(state, action: PayloadAction<boolean>) {
      state.fetchInputEvent = action.payload;
    },
    setIsInSpecialCommand(state, action: PayloadAction<boolean>) {
      state.isInSpecialCommand = action.payload;
    },
  },
});
export const {
  setInputValue,
  appendInputValue,
  clearInputValue,
  setIsInSpecialCommand,
} = InputSlice.actions;
export default InputSlice;
