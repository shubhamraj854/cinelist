import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard.jsx";
import { clear } from "../store/watchlistSlice.js";

export default function Watchlist() {
  const items = useSelector((s) => s.watchlist.items);
  const dispatch = useDispatch();
  const [sort, setSort] = useState("added");

  // useMemo: only re-sort when the list or the sort choice changes, not on every render
  const sorted = useMemo(() => {
    const a = [...items];
    if (sort === "rating") a.sort((x, y) => y.vote_average - x.vote_average);
    else if (sort === "title") a.sort((x, y) => x.title.localeCompare(y.title));
    else a.reverse(); // newest first
    return a;
  }, [items, sort]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Your watchlist <span className="text-base font-normal text-zinc-400">({items.length})</span></h1>
        {items.length > 0 && (
          <div className="flex gap-2 text-sm">
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort watchlist" className="rounded-full border border-white/15 bg-zinc-900 px-3 py-1.5">
              <option value="added">Recently added</option><option value="rating">Rating</option><option value="title">Title A-Z</option>
            </select>
            <button onClick={() => dispatch(clear())} className="rounded-full border border-red-400/50 px-3 py-1.5 text-red-300 hover:bg-red-400/10">Clear all</button>
          </div>
        )}
      </div>
      {items.length === 0 ? (
        <p className="mt-10 text-center text-zinc-400">Nothing saved yet. Tap + on any poster, or <Link to="/search" className="text-amber-400 underline">search for a movie</Link>.</p>
      ) : (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {sorted.map((m) => <MovieCard key={m.id} movie={m} fluid />)}
        </div>
      )}
    </main>
  );
}
