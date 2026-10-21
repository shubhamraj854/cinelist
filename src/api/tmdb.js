export const hasKey = true;

export const img = (path, size = "w500") => (path ? `https://image.tmdb.org/t/p/${size}${path}` : "");

const cache = new Map();

export async function tmdb(path, signal) {
  if (cache.has(path)) return cache.get(path);

  let res;
  try {
    res = await fetch(`/api/tmdb?path=${encodeURIComponent(path)}`, { signal });
  } catch (e) {
    if (e.name === "AbortError") throw e;
    throw new Error("Cannot reach the server. Check your internet.");
  }
  if (!res.ok) throw new Error(res.status === 401 ? "Your TMDB API key is not valid (401)." : "TMDB error " + res.status);

  const data = await res.json();
  cache.set(path, data);
  return data;
}