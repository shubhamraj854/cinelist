import { createSlice } from "@reduxjs/toolkit";

// REDUX SLICE: state + the actions that change it. Immer lets us "mutate" safely inside reducers.
const slice = createSlice({
  name: "watchlist",
  initialState: { items: [] },
  reducers: {
    toggle(state, { payload: m }) {
      const i = state.items.findIndex((x) => x.id === m.id);
      if (i >= 0) state.items.splice(i, 1);
      else state.items.push({ id: m.id, title: m.title, poster_path: m.poster_path, vote_average: m.vote_average, release_date: m.release_date });
    },
    clear(state) { state.items = []; },
  },
});
export const { toggle, clear } = slice.actions;
export default slice.reducer;
