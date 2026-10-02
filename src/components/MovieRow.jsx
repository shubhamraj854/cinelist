import useFetch from "../hooks/useFetch.js";
import MovieCard from "./MovieCard.jsx";
import { CardSkeleton } from "./Skeleton.jsx";
import ErrorBox from "./ErrorBox.jsx";

export default function MovieRow({ title, path }) {
  const { data, loading, error, retry } = useFetch(path);
  return (
    <section className="mx-auto max-w-7xl py-3 sm:py-4">
      <h2 className="mb-3 px-4 text-base font-bold sm:text-lg">{title}</h2>
      {error ? (
        <ErrorBox message={error} onRetry={retry} />
      ) : (
        // snap-x: on phones, swiping a row stops neatly on a poster
        <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-4 pb-3 sm:gap-4">
          {loading ? Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />) : data.results.map((m) => <MovieCard key={m.id} movie={m} />)}
        </div>
      )}
    </section>
  );
}
