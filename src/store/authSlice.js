import { createSlice } from "@reduxjs/toolkit";

// Demo login only: no real server. It stores the name so we can practise protected routes.
const slice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    login(state, { payload }) { state.user = payload; },
    logout(state) { state.user = null; },
  },
});
export const { login, logout } = slice.actions;
export default slice.reducer;
