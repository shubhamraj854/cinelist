import { memo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { img } from "../api/tmdb.js";
import { toggle } from "../store/watchlistSlice.js";
import { useToast } from "../context/Toast.jsx";

// "fluid" = fill the grid cell. Otherwise a fixed width that grows with the screen (w-32, sm:w-40, lg:w-44).
function MovieCard({ movie, fluid = false }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const saved = useSelector((s) => s.watchlist.items.some((m) => m.id === movie.id));

  // useCallback keeps the same function between renders, so memo() below can skip re-drawing this card.
  const onSave = useCallback(() => {
    dispatch(toggle(movie));
    toast(saved ? "Removed from watchlist" : "Added to watchlist");
  }, [dispatch, movie, toast, saved]);

  return (
    <div className={"group relative shrink-0 snap-start " + (fluid ? "w-full" : "w-32 sm:w-40 lg:w-44")}>
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-zinc-800 shadow-lg shadow-black/30">
          {movie.poster_path ? (
            <img src={img(movie.poster_path, "w342")} alt={movie.title} loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
          ) : (
            <div className="grid h-full place-items-center p-2 text-center text-sm text-zinc-400">{movie.title}</div>
          )}
          <span className="absolute left-2 top-2 rounded-md bg-black/70 px-1.5 py-0.5 text-xs font-bold text-amber-400">
            ★ {movie.vote_average?.toFixed(1)}
          </span>
        </div>
        <p className="mt-2 truncate text-sm font-medium">{movie.title}</p>
        <p className="text-xs text-zinc-400">{movie.release_date?.slice(0, 4)}</p>
      </Link>
      <button onClick={onSave} aria-pressed={saved} aria-label={saved ? "Remove from watchlist" : "Add to watchlist"}
        className={"absolute right-2 top-2 grid size-9 place-items-center rounded-full text-lg backdrop-blur transition " +
          (saved ? "bg-amber-400 text-zinc-950" : "bg-black/60 text-white hover:bg-black/80")}>
        {saved ? "✓" : "+"}
      </button>
    </div>
  );
}
export default memo(MovieCard); // memo: skip re-drawing when the props did not change
