import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../hooks/useFetch.js";
import { img } from "../api/tmdb.js";
import { toggle } from "../store/watchlistSlice.js";
import { useToast } from "../context/Toast.jsx";
import Trailer from "../components/Trailer.jsx";
import MovieRow from "../components/MovieRow.jsx";
import ErrorBox from "../components/ErrorBox.jsx";

export default function Movie() {
  const { id } = useParams(); // from the URL /movie/:id
  // append_to_response = get trailer videos and cast in the SAME request
  const { data: m, loading, error, retry } = useFetch(`/movie/${id}?append_to_response=videos,credits`);
  const trailerRef = useRef(null);
  const dispatch = useDispatch();
  const toast = useToast();
  const saved = useSelector((s) => s.watchlist.items.some((x) => String(x.id) === id));

  if (error) return <div className="pt-6"><ErrorBox message={error} onRetry={retry} /></div>;
  if (loading) return <div className="h-96 animate-pulse bg-zinc-900" />;

  const video = m.videos.results.find((v) => v.site === "YouTube" && v.type === "Trailer");
  const cast = m.credits.cast.slice(0, 12);
  const save = () => { dispatch(toggle(m)); toast(saved ? "Removed from watchlist" : "Added to watchlist"); };

  return (
    <main>
      <section className="relative">
        {m.backdrop_path && <img src={img(m.backdrop_path, "w1280")} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />}
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 to-transparent" />
        {/* Phones: stacked and centred (flex-col). From 768px: poster beside the text (md:flex-row) */}
        <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:py-12">
          {m.poster_path && <img src={img(m.poster_path, "w500")} alt={m.title} className="mx-auto w-44 rounded-2xl shadow-2xl sm:w-56 md:mx-0 md:w-64 md:self-start" />}
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold sm:text-4xl">{m.title}</h1>
            {m.tagline && <p className="mt-1 italic text-zinc-400">{m.tagline}</p>}
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-300">
              <span className="font-bold text-amber-400">★ {m.vote_average.toFixed(1)}</span>
              <span>{m.release_date?.slice(0, 4)}</span>
              {m.runtime > 0 && <span>{Math.floor(m.runtime / 60)}h {m.runtime % 60}m</span>}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">{m.genres.map((g) => <span key={g.id} className="rounded-full border border-white/20 px-3 py-1 text-xs">{g.name}</span>)}</div>
            <p className="mt-4 max-w-2xl leading-relaxed text-zinc-200">{m.overview}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {video && <button onClick={() => trailerRef.current.open()} className="rounded-full bg-amber-400 px-6 py-2.5 font-bold text-zinc-950 hover:bg-amber-300">Watch trailer</button>}
              <button onClick={save} aria-pressed={saved} className="rounded-full border border-white/25 px-6 py-2.5 font-semibold hover:bg-white/10">
                {saved ? "✓ In watchlist" : "+ Add to watchlist"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {cast.length > 0 && (
        <section className="mx-auto max-w-6xl py-3">
          <h2 className="mb-3 px-4 text-base font-bold sm:text-lg">Top cast</h2>
          <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 pb-3">
            {cast.map((c) => (
              <div key={c.id} className="w-24 shrink-0 text-center">
                {c.profile_path
                  ? <img src={img(c.profile_path, "w185")} alt={c.name} loading="lazy" className="mx-auto size-20 rounded-full object-cover" />
                  : <div className="mx-auto grid size-20 place-items-center rounded-full bg-zinc-800 text-xl text-zinc-400">{c.name[0]}</div>}
                <p className="mt-2 truncate text-xs font-medium">{c.name}</p>
                <p className="truncate text-xs text-zinc-400">{c.character}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <MovieRow key={id} title="More like this" path={`/movie/${id}/similar`} />
      <Trailer ref={trailerRef} videoKey={video?.key} />
    </main>
  );
}
