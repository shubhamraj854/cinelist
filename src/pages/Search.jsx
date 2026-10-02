import { useEffect, useId, useMemo, useReducer, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce.js";
import { tmdb } from "../api/tmdb.js";
import { fetchGenres } from "../store/genresSlice.js";
import MovieCard from "../components/MovieCard.jsx";
import { CardSkeleton } from "../components/Skeleton.jsx";
import ErrorBox from "../components/ErrorBox.jsx";

// useReducer: good when several values change together. One function decides how the filters change.
const initial = { genre: "", sort: "popularity.desc", minRating: 0 };
function filterReducer(state, action) {
  if (action.type === "reset") return initial;
  return { ...state, [action.type]: action.value };
}

export default function Search() {
  const uid = useId();
  const dispatch = useDispatch();
  const genres = useSelector((s) => s.genres);
  const [q, setQ] = useState("");
  const dq = useDebounce(q); // waits 400ms after typing stops
  const [f, setF] = useReducer(filterReducer, initial);
  const [page, setPage] = useState(1);
  const [res, setRes] = useState({ items: [], total: 1, loading: true, error: "" });
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current.focus(); }, []); // useRef: focus the box when the page opens
  useEffect(() => { if (genres.status === "idle") dispatch(fetchGenres()); }, [genres.status, dispatch]); // Redux thunk

  // Typing a title = search endpoint. Otherwise = discover endpoint with the filters.
  const path = useMemo(
    () => dq.trim()
      ? `/search/movie?query=${encodeURIComponent(dq.trim())}`
      : `/discover/movie?sort_by=${f.sort}&vote_average.gte=${f.minRating}&vote_count.gte=100${f.genre ? "&with_genres=" + f.genre : ""}`,
    [dq, f]
  );

  useEffect(() => { setPage(1); }, [path]);
  useEffect(() => {
    const ctl = new AbortController();
    setRes((r) => ({ ...r, loading: true, error: "" }));
    tmdb(`${path}&page=${page}`, ctl.signal)
      .then((d) => setRes((r) => ({ items: page === 1 ? d.results : [...r.items, ...d.results], total: d.total_pages, loading: false, error: "" })))
      .catch((e) => { if (e.name !== "AbortError") setRes((r) => ({ ...r, loading: false, error: e.message })); });
    return () => ctl.abort();
  }, [path, page]);

  const box = "mt-1 w-full rounded-xl border border-white/15 bg-zinc-900 px-3 py-2.5 text-base";
  return (
    <main className="mx-auto max-w-7xl px-4 py-5">
      <input ref={inputRef} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search movies"
        aria-label="Search movies" className="w-full rounded-2xl border-2 border-white/15 bg-zinc-900 px-4 py-3 text-base outline-none focus:border-amber-400" />

      <div className={"mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 " + (dq.trim() ? "opacity-40" : "")}>
        <div><label htmlFor={uid + "g"} className="text-xs text-zinc-400">Genre</label>
          <select id={uid + "g"} className={box} value={f.genre} onChange={(e) => setF({ type: "genre", value: e.target.value })}>
            <option value="">All</option>{genres.list.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}</select></div>
        <div><label htmlFor={uid + "s"} className="text-xs text-zinc-400">Sort by</label>
          <select id={uid + "s"} className={box} value={f.sort} onChange={(e) => setF({ type: "sort", value: e.target.value })}>
            <option value="popularity.desc">Popular</option><option value="vote_average.desc">Top rated</option><option value="primary_release_date.desc">Newest</option></select></div>
        <div><label htmlFor={uid + "r"} className="text-xs text-zinc-400">Min rating</label>
          <select id={uid + "r"} className={box} value={f.minRating} onChange={(e) => setF({ type: "minRating", value: e.target.value })}>
            <option value={0}>Any</option><option value={6}>6+</option><option value={7}>7+</option><option value={8}>8+</option></select></div>
        <button onClick={() => setF({ type: "reset" })} className="self-end rounded-xl border border-white/15 px-3 py-2.5 text-sm hover:bg-white/10">Reset filters</button>
      </div>
      {dq.trim() && <p className="mt-2 text-xs text-zinc-400">Filters apply when the search box is empty.</p>}

      {res.error ? <ErrorBox message={res.error} onRetry={() => setPage((p) => p)} /> : null}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {res.items.map((m) => <MovieCard key={m.id} movie={m} fluid />)}
        {res.loading && Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={"s" + i} fluid />)}
      </div>
      {!res.loading && !res.error && res.items.length === 0 && <p className="mt-10 text-center text-zinc-400">No movies found. Try other words or filters.</p>}
      {!res.loading && page < res.total && (
        <div className="mt-6 text-center"><button onClick={() => setPage((p) => p + 1)} className="rounded-full bg-amber-400 px-6 py-2.5 font-bold text-zinc-950 hover:bg-amber-300">Load more</button></div>
      )}
    </main>
  );
}
