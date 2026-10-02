import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "theme",
  initialState: { mode: "dark" },
  reducers: { toggleTheme(state) { state.mode = state.mode === "dark" ? "light" : "dark"; } },
});
export const { toggleTheme } = slice.actions;
export default slice.reducer;
