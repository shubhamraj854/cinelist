// Shared proxy code. Used by the Vercel functions in /api (live site)
// and by .proxyrc.js (your local "npm start"), so both behave the same.
// The browser asks OUR server. Our server asks TMDB. The key never reaches the browser.

const TMDB = "https://api.themoviedb.org/3";
const IMAGES = "https://image.tmdb.org/t/p";

// Only allow plain TMDB paths like /movie/550?append_to_response=videos,credits
// This stops anyone from using our server as an open proxy.
function validPath(p) {
  return (
    typeof p === "string" &&
    p.length < 300 &&
    /^\/[A-Za-z0-9_\-\/]+(\?[A-Za-z0-9_\-=&.%,|+:]*)?$/.test(p) &&
    !p.includes("..") &&
    !p.includes("//") &&
    !/api_key/i.test(p)
  );
}

// Only allow TMDB image sizes and plain file names like /abc123.jpg
function validImage(size, file) {
  return /^(w\d{2,4}|original)$/.test(size || "") && /^\/[A-Za-z0-9_\-]+\.(jpg|jpeg|png)$/.test(file || "");
}

const hasRealKey = (key) => Boolean(key) && key !== "paste_your_key_here";

async function getTmdb(path, key) {
  if (!validPath(path)) return { status: 400, body: JSON.stringify({ error: "Bad request" }) };
  if (!hasRealKey(key)) return { status: 500, body: JSON.stringify({ error: "TMDB_API_KEY is not set on the server." }) };
  const joiner = path.includes("?") ? "&" : "?";
  try {
    const res = await fetch(`${TMDB}${path}${joiner}api_key=${key}&language=en-US`, { signal: AbortSignal.timeout(8000) });
    return { status: res.status, body: await res.text() };
  } catch {
    // Never print the error itself: it could contain the URL, and the URL contains the key.
    return { status: 502, body: JSON.stringify({ error: "The server could not reach TMDB." }) };
  }
}

async function getImage(size, file) {
  if (!validImage(size, file)) return { status: 400, body: Buffer.from("Bad request"), type: "text/plain" };
  try {
    const res = await fetch(`${IMAGES}/${size}${file}`, { signal: AbortSignal.timeout(8000) });
    return {
      status: res.status,
      body: Buffer.from(await res.arrayBuffer()),
      type: res.headers.get("content-type") || "image/jpeg",
    };
  } catch {
    return { status: 502, body: Buffer.from("Bad gateway"), type: "text/plain" };
  }
}

module.exports = { validPath, validImage, getTmdb, getImage };