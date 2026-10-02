import { configureStore } from "@reduxjs/toolkit";
import watchlist from "./watchlistSlice.js";
import auth from "./authSlice.js";
import theme from "./themeSlice.js";
import genres from "./genresSlice.js";

const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};

export const store = configureStore({
  reducer: { watchlist, auth, theme, genres },
  // start from what we saved last time, so the watchlist and login survive a refresh
  preloadedState: {
    watchlist: { items: load("cl-watchlist", []) },
    auth: { user: load("cl-user", null) },
    theme: { mode: load("cl-theme", "dark") },
  },
});

// Save to localStorage whenever the store changes.
store.subscribe(() => {
  const s = store.getState();
  try {
    localStorage.setItem("cl-watchlist", JSON.stringify(s.watchlist.items));
    localStorage.setItem("cl-user", JSON.stringify(s.auth.user));
    localStorage.setItem("cl-theme", JSON.stringify(s.theme.mode));
  } catch {}
});
