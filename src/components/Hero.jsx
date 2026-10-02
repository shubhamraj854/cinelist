import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch.js";
import { img } from "../api/tmdb.js";
import { HeroSkeleton } from "./Skeleton.jsx";
import ErrorBox from "./ErrorBox.jsx";

export default function Hero() {
  const { data, loading, error, retry } = useFetch("/trending/movie/week");
  if (loading) return <HeroSkeleton />;
  if (error) return <ErrorBox message={error} onRetry={retry} />;
  const movie = data.results[0];
  return (
    <section className="relative h-[48vh] min-h-72 overflow-hidden sm:h-[55vh]">
      <img src={img(movie.backdrop_path, "w1280")} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 to-transparent" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-6 sm:pb-10">
        <p className="mb-1 text-xs font-semibold text-amber-400 sm:text-sm">#1 trending this week</p>
        <h1 className="max-w-2xl text-2xl font-extrabold sm:text-4xl lg:text-5xl">{movie.title}</h1>
        <p className="mt-2 line-clamp-2 max-w-xl text-sm text-zinc-300 sm:line-clamp-3 sm:text-base">{movie.overview}</p>
        <Link to={`/movie/${movie.id}`} className="mt-4 w-fit rounded-full bg-amber-400 px-5 py-2 font-bold text-zinc-950 transition hover:bg-amber-300 sm:px-6 sm:py-2.5">
          View details
        </Link>
      </div>
    </section>
  );
}
