import Hero from "../components/Hero.jsx";
import MovieRow from "../components/MovieRow.jsx";

export default function Home() {
  return (
    <main>
      <Hero />
      <MovieRow title="Trending this week" path="/trending/movie/week" />
      <MovieRow title="Popular" path="/movie/popular" />
      <MovieRow title="Top rated" path="/movie/top_rated" />
      <MovieRow title="Now in theatres" path="/movie/now_playing" />
    </main>
  );
}
