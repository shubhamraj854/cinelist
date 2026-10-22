// Vercel serverless function: the live site loads posters from /api/img?size=w342&file=/abc.jpg
const { getImage } = require("../server/core.js");

module.exports = async (req, res) => {
  const out = await getImage(req.query.size, req.query.file);
  res.status(out.status);
  res.setHeader("Content-Type", out.type);
  // Posters never change, so they can be cached for a long time.
  if (out.status === 200) res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=31536000, immutable");
  res.send(out.body);
};