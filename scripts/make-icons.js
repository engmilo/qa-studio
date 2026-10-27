// Creates the PNG icons from public/icon.svg.
// Run once (and again whenever icon.svg changes):
//   npm i --no-save sharp
//   node scripts/make-icons.js
const fs = require("fs");
const path = require("path");
let sharp;
try { sharp = require("sharp"); } catch {
  console.error("Missing 'sharp'. Run:  npm i --no-save sharp   and then try again.");
  process.exit(1);
}

const SRC = path.join("public", "icon.svg");
const OUT = path.join("public", "icons");
if (!fs.existsSync(SRC)) { console.error(`Cannot find ${SRC}. Run this from the qa-studio folder.`); process.exit(1); }
fs.mkdirSync(OUT, { recursive: true });
const svg = fs.readFileSync(SRC);

// the app's brand gradient, used behind the icon for the full-bleed versions
const gradient = size => Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">` +
  `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
  `<stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient></defs>` +
  `<rect width="100%" height="100%" fill="url(#g)"/></svg>`);

const iconPng = size =>
  sharp(svg, { density: 512 }).resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();

async function onGradient(size, scale) {
  const inner = await iconPng(Math.round(size * scale));
  return sharp(gradient(size)).composite([{ input: inner, gravity: "center" }]).png().toBuffer();
}

(async () => {
  const jobs = [
    ["icon-192.png",            () => iconPng(192)],              // normal, transparent corners
    ["icon-512.png",            () => iconPng(512)],
    ["icon-maskable-512.png",   () => onGradient(512, 0.8)],      // keeps the artwork inside the 80% safe zone
    ["apple-touch-icon.png",    () => onGradient(180, 1.0)],      // iOS wants an opaque square
  ];
  for (const [name, make] of jobs) {
    fs.writeFileSync(path.join(OUT, name), await make());
    console.log("  wrote", path.join(OUT, name));
  }
  console.log("Done. Commit the files in public/icons/.");
})().catch(e => { console.error(e); process.exit(1); });
