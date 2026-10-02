import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl p-8 text-center">
      <h1 className="text-5xl font-extrabold text-amber-400">404</h1>
      <p className="mt-3 text-zinc-400">This page does not exist.</p>
      <Link to="/" className="mt-6 inline-block text-amber-400 underline">Go home</Link>
    </main>
  );
}
