import { TMDB_KEY } from "./key.js"; // your private key lives in src/api/key.js (not uploaded to GitHub)

// All TMDB calls go through this one file.
const KEY = TMDB_KEY;
export const hasKey = Boolean(KEY) && KEY !== "paste_your_key_here";

// TMDB gives image paths like "/abc.jpg". This builds the full link. size: w342, w500, w1280...
export const img = (path, size = "w500") => (path ? `https://image.tmdb.org/t/p/${size}${path}` : "");

// A tiny cache: asking for the same path twice re-uses the first answer.
const cache = new Map();

export async function tmdb(path, signal) {
  if (cache.has(path)) return cache.get(path);

  const joiner = path.includes("?") ? "&" : "?";
  let res;
  try {
    res = await fetch(`https://api.themoviedb.org/3${path}${joiner}api_key=${KEY}&language=en-US`, { signal });
  } catch (e) {
    if (e.name === "AbortError") throw e;
    throw new Error("Cannot reach TMDB. Check your internet, or try another network.");
  }
  if (!res.ok) throw new Error(res.status === 401 ? "Your TMDB API key is not valid (401)." : "TMDB error " + res.status);

  const data = await res.json();
  cache.set(path, data);
  return data;
}