import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface GlobalState {
    inputValue: string;
}
const initialState: GlobalState = {
    inputValue: "",
};
const GlobalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setInputValue(state, action: PayloadAction<string>) {
            state.inputValue = action.payload;
        },
    },
});
export const { setInputValue } = GlobalSlice.actions;
export default GlobalSlice;
