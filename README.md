# CineList: React learning project (Stages 1 to 5)

Stack: React 19, Parcel, Tailwind 4, React Router 7, Redux Toolkit, TMDB API.

## Run it
```bash
npm install
npm start
```
Put your TMDB key in `.env` as `TMDB_API_KEY=yourkey` (see `.env.example`). After editing `.env`, delete `.parcel-cache` and restart.

## Where each concept lives
| Concept | File |
|---|---|
| Routes, lazy pages, protected route | `src/index.jsx`, `components/ProtectedRoute.jsx` |
| Redux slices, thunk, saving to localStorage | `src/store/*` |
| `createAsyncThunk` | `store/genresSlice.js` (used by `pages/Search.jsx`) |
| `useReducer` (filters) | `pages/Search.jsx` |
| `useRef` (focus box) | `pages/Search.jsx` |
| `useId` (form labels) | `pages/Login.jsx`, `pages/Search.jsx` |
| `useContext` (toast) | `context/Toast.jsx` |
| `useMemo` | `pages/Watchlist.jsx`, `pages/Search.jsx` |
| `useCallback` + `memo` | `components/MovieCard.jsx` |
| `useImperativeHandle` + `forwardRef` | `components/Trailer.jsx` (called from `pages/Movie.jsx`) |
| `useLayoutEffect` (theme before paint) | `App.jsx` |
| `useSyncExternalStore` (offline banner) | `hooks/useOnline.js` |
| Custom hooks | `hooks/useFetch.js`, `useDebounce.js`, `useOnline.js` |
| Error boundary, Suspense | `components/ErrorBoundary.jsx`, `App.jsx` |
| Dark / light theme | `store/themeSlice.js` + the `.light` block in `styles.css` |

## How it is responsive
- Phones: bottom tab bar (thumb reach), 2-column grids, stacked details page, snap-scrolling rows.
- 640px and up (`sm:`): top links, 3 columns. 768px (`md:`): details page puts poster beside text. 1024px+ (`lg:`/`xl:`): 5 to 6 columns.
- Safe-area padding for phones with a notch, `min-h-dvh` so mobile browser bars do not cut the page.
- Test it: open DevTools (F12), press Ctrl+Shift+M, and try different phone sizes.

## Deploy (Vercel)
1. Push the project to GitHub (`.env` is ignored, which is correct).
2. On vercel.com, import the repo. Build command `npm run build`, output folder `dist`.
3. In Settings, Environment Variables, add `TMDB_API_KEY`. Redeploy.
4. `vercel.json` makes direct links like `/movie/550` work after a refresh.
Note: a key used in browser code is visible to visitors. That is acceptable for a free TMDB key.

## Notes
- Login is a demo (no server). The watchlist requires it so you can practise protected routes.
- When the search box has text, genre/sort/rating filters are paused (TMDB search does not support them).
