// All TMDB calls go through this one file.
// The browser never talks to TMDB directly. It asks our own server (/api/tmdb and /api/img),
// and the server talks to TMDB. That keeps the API key secret and works on networks that block TMDB.
export const hasKey = true; // the key lives on the server now

// TMDB gives image paths like "/abc.jpg". Our server fetches the picture for us.
// size: w185, w342, w500, w1280...
export const img = (path, size = "w500") =>
  path ? `/api/img?size=${size}&file=${encodeURIComponent(path)}` : "";

// A tiny cache: asking for the same path twice re-uses the first answer.
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

  if (!res.ok) {
    const info = await res.json().catch(() => null);
    throw new Error(
      res.status === 401 ? "The server's TMDB API key is not valid (401)." : info?.error || info?.status_message || "TMDB error " + res.status
    );
  }

  const data = await res.json();
  cache.set(path, data);
  return data;
}