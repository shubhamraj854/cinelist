// Parcel reads this file when you run "npm start".
// It gives your local site the same /api/tmdb and /api/img routes that Vercel gives the live site.
const fs = require("fs");
const { getTmdb, getImage } = require("./server/api/core.js");

// Local key: use the TMDB_API_KEY setting if present, otherwise read it from src/api/key.js
function localKey() {
  if (process.env.TMDB_API_KEY) return process.env.TMDB_API_KEY;
  try {
    const m = fs.readFileSync("src/api/key.js", "utf8").match(/TMDB_KEY\s*=\s*["']([^"']+)["']/);
    return m ? m[1] : "";
  } catch {
    return "";
  }
}

module.exports = function (app) {
  app.use("/api/tmdb", async (req, res) => {
    const q = new URL(req.url, "http://localhost").searchParams;
    const out = await getTmdb(q.get("path"), localKey());
    res.statusCode = out.status;
    res.setHeader("Content-Type", "application/json");
    res.end(out.body);
  });

  app.use("/api/img", async (req, res) => {
    const q = new URL(req.url, "http://localhost").searchParams;
    const out = await getImage(q.get("size"), q.get("file"));
    res.statusCode = out.status;
    res.setHeader("Content-Type", out.type);
    res.end(out.body);
  });
};