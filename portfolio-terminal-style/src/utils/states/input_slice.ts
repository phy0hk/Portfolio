import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface InputState {
  inputValue: string;
  pointerPos: number;
  hisPointerPos: number;
}
const initialState: InputState = {
  inputValue: "",
  pointerPos: 0,
};
const InputSlice = createSlice({
  name: "global",
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
  },
});
export const {
  setInputValue,
  appendInputValue,
  clearInputValue,
  setHisPointerDown,
  setHisPointerUp,
  setHistoryPointer,
} = InputSlice.actions;
export default InputSlice;
