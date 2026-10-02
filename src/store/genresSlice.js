import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tmdb } from "../api/tmdb.js";

// createAsyncThunk: Redux's way to run an API call. It dispatches pending / fulfilled / rejected for us.
export const fetchGenres = createAsyncThunk("genres/fetch", async () => (await tmdb("/genre/movie/list")).genres);

const slice = createSlice({
  name: "genres",
  initialState: { list: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (s) => { s.status = "loading"; })
      .addCase(fetchGenres.fulfilled, (s, a) => { s.list = a.payload; s.status = "done"; })
      .addCase(fetchGenres.rejected, (s) => { s.status = "error"; });
  },
});
export default slice.reducer;
