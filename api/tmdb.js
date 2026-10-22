// Vercel serverless function: the live site calls /api/tmdb?path=/movie/popular
const { getTmdb } = require("../server/core.js");

module.exports = async (req, res) => {
  const out = await getTmdb(req.query.path, process.env.TMDB_API_KEY);
  res.status(out.status);
  res.setHeader("Content-Type", "application/json");
  // Let Vercel's CDN keep good answers for 5 minutes: faster for visitors, fewer calls to TMDB.
  if (out.status === 200) res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
  res.send(out.body);
};