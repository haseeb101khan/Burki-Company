/**
 * A country traced in dots, for the catalogue card's background field.
 *
 *   node scripts/make-dot-map.mjs "public/images/pakistan map.PNG"
 *
 * WHY THIS READS A MAP RATHER THAN DRAWING ONE. The reference card carries a
 * dotted world map; the client wants Pakistan. A country outline is not
 * something to approximate by hand — Pakistan's includes Kashmir and
 * Gilgit-Baltistan, and a border sketched from memory on a Pakistani company's
 * own site is a mistake with consequences rather than a rough edge. So this
 * samples a real map: supply the artwork, and the shape is whatever the
 * artwork says it is.
 *
 * HOW IT DECIDES WHAT IS LAND. A grid is laid over the image and a cell is kept
 * if the pixel under it is anything other than the page it sits on — luminance
 * below a threshold, not saturation. The supplied map is a grey country on
 * white, so "not white" is exactly the country, and it takes the province
 * borders with it rather than leaving hairline gaps down the middle of it.
 *
 * THEN ONLY THE LARGEST SHAPE SURVIVES. The supplied map carries a stock-site
 * watermark, and any part of it sitting on white would otherwise come through
 * as a scatter of dots out at sea. A flood fill over the grid keeps the biggest
 * connected mass and drops everything else, so the watermark, the frame and any
 * stray marks go without having to be found by hand.
 *
 * The output is an SVG of circles on a unit grid: it scales to any card size,
 * gzips to a fraction of its size because it is so repetitive, and its fill is
 * `currentColor`, so the card picks the colour with a text class.
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname } from "node:path";
import sharp from "sharp";

const input = process.argv[2];
const output = process.argv[3] ?? "public/images/pakistan-dots.svg";

if (!input || !existsSync(input)) {
  console.error("Usage: node scripts/make-dot-map.mjs <map-image> [out.svg]");
  process.exit(1);
}

/** Grid pitch in source pixels. Smaller = denser map, bigger file. */
const STEP = 8;
/** Below this luminance a pixel is land rather than page. */
const LAND_BELOW = 248;
/** Dot radius, in grid units — 0.5 would have neighbours touching. */
const RADIUS = 0.33;

const { data, info } = await sharp(input)
  .flatten({ background: "#ffffff" })
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const cols = Math.ceil(width / STEP);
const rows = Math.ceil(height / STEP);
const land = new Uint8Array(cols * rows);

for (let gy = 0; gy < rows; gy += 1) {
  for (let gx = 0; gx < cols; gx += 1) {
    const x = Math.min(width - 1, gx * STEP + (STEP >> 1));
    const y = Math.min(height - 1, gy * STEP + (STEP >> 1));
    const o = (y * width + x) * channels;
    const lum = data[o] * 0.299 + data[o + 1] * 0.587 + data[o + 2] * 0.114;
    if (lum < LAND_BELOW) land[gy * cols + gx] = 1;
  }
}

/* Largest connected mass, 8-connected so a diagonal coastline stays one piece.
   An explicit stack rather than recursion: the grid is thousands of cells. */
const seen = new Uint8Array(cols * rows);
let best = [];
for (let i = 0; i < land.length; i += 1) {
  if (!land[i] || seen[i]) continue;
  const group = [];
  const stack = [i];
  seen[i] = 1;
  while (stack.length) {
    const at = stack.pop();
    group.push(at);
    const gx = at % cols;
    const gy = (at - gx) / cols;
    for (let dy = -1; dy <= 1; dy += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        const nx = gx + dx;
        const ny = gy + dy;
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
        const n = ny * cols + nx;
        if (land[n] && !seen[n]) {
          seen[n] = 1;
          stack.push(n);
        }
      }
    }
  }
  if (group.length > best.length) best = group;
}

if (best.length === 0) {
  console.error("No land found — raise LAND_BELOW, or check the input.");
  process.exit(1);
}

const pts = best.map((i) => [i % cols, (i - (i % cols)) / cols]);
const minX = Math.min(...pts.map((p) => p[0]));
const minY = Math.min(...pts.map((p) => p[1]));
const w = Math.max(...pts.map((p) => p[0])) - minX + 1;
const h = Math.max(...pts.map((p) => p[1])) - minY + 1;

const circles = pts
  .map(([x, y]) => `<circle cx="${x - minX}" cy="${y - minY}" r="${RADIUS}"/>`)
  .join("");

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" ` +
  `fill="currentColor" aria-hidden="true">${circles}</svg>`;

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, svg, "utf8");

const dropped = land.reduce((n, v) => n + v, 0) - best.length;
console.log(
  `${best.length} dots on a ${w}x${h} grid -> ${output} ` +
    `(${Math.round(Buffer.byteLength(svg) / 1024)} KB, ${dropped} stray cells dropped)`,
);
