// Runs automatically before "npm run build" (see "prebuild" in package.json).
// On your computer: key.js already exists, so nothing happens.
// On Vercel: key.js does not exist, so this creates it from the TMDB_API_KEY setting.
import fs from "fs";

const file = "src/api/key.js";

if (fs.existsSync(file)) {
  console.log("key.js found. Using it.");
  process.exit(0);
}

const key = process.env.TMDB_API_KEY;
if (!key) {
  console.error("No src/api/key.js and no TMDB_API_KEY setting. Add one of them, then build again.");
  process.exit(1);
}

fs.writeFileSync(file, `export const TMDB_KEY = ${JSON.stringify(key)};\n`);
console.log("Created key.js from the TMDB_API_KEY setting.");
