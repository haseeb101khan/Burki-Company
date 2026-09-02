/**
 * Studio cutouts -> one consistent product range.
 *
 * WHAT WAS WRONG. Every cutout was trimmed hard to its own content, so each
 * file's canvas was the machine's own bounding box and nothing else. Dropped
 * into the catalogue's `object-contain` tile, each one then scaled up until it
 * touched an edge — which means the shape of a machine's pose decided how big
 * it appeared. The upright-boom shots (C105 through C150) all landed at the
 * same height and looked like a range; C85 and C95, whose booms are lowered and
 * whose frames are therefore landscape, landed at 207px and 156px against
 * everyone else's 224px and read as smaller machines. They are not.
 *
 * WHAT THIS DOES. Every cutout is re-laid onto ONE canvas at ONE scale rule:
 *
 *  1. Trim to the machine, so the pose's own framing stops mattering.
 *  2. Scale so that every machine covers the same AREA, not the same width or
 *     the same height. Matching height would inflate a lowered-boom machine
 *     until its body dwarfed the others; matching width would shrink it. Area
 *     — compared as sqrt(w*h) — is what balances a tall pose against a wide
 *     one, and it is the closest automatic stand-in for "looks the same size".
 *  3. Clamp to the safe area, so an extreme pose still cannot touch the edges.
 *  4. Compose centred on a common BASELINE, so the range stands on one floor
 *     rather than floating at different heights.
 *
 * Because step 1 trims away whatever padding a previous run added, this is
 * safe to re-run; the only cost of doing so is another generation of WebP
 * encoding.
 *
 * LIMIT WORTH KNOWING. This normalises framing, not photography. C85 and C95
 * are shot in a different pose from the rest of the range — boom down, and C85
 * faces the other way — and no amount of scaling makes a lowered-boom side view
 * sit convincingly beside nine raised-boom ones. Those two want re-supplying to
 * match, the way C65 and C75 just were.
 *
 *   node scripts/normalise-cutouts.mjs           # write the files
 *   node scripts/normalise-cutouts.mjs --preview # contact sheet only
 */
import { readdirSync, existsSync, statSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";
import { makeTransparentCutout } from "./lib/cutout.mjs";

const DIRS = [
  "public/images/xinyuan",
  "public/images/load-x",
  "public/images/xcmg",
];

/** 5:4, the shape of the catalogue tile, so a card crops nothing. */
const CANVAS_W = 1500;
const CANVAS_H = 1200;
/**
 * Room the machine may occupy, leaving a margin the card can rely on.
 *
 * HEIGHT WAS RAISED FROM 0.86, AND IT DID MORE THAN MAKE THINGS BIGGER. At 0.86
 * the upright-boom machines were all hitting the height clamp before they
 * reached the area target below, which is why they came out at a matched height
 * rather than a matched size — and left a band of empty canvas that the
 * catalogue card then padded again, so the machine rendered small twice over.
 * At 0.94 every machine reaches the area rule instead, so the range is equal by
 * area as intended and each file wastes less of itself.
 */
const SAFE_W = 0.94;
const SAFE_H = 0.94;
/** Gap under the wheels, as a share of canvas height — the common floor. */
const BASELINE = 0.04;
/**
 * Target size as sqrt(area) in px. Set from the median of the range as it
 * stands, so the machines that already looked right do not move much.
 */
const TARGET_SIDE = 1010;

const preview = process.argv.includes("--preview");

const files = DIRS.filter(existsSync).flatMap((dir) =>
  readdirSync(dir)
    .filter((f) => f.includes("-cutout.") && /\.(webp|png|jpg|jpeg)$/i.test(f))
    .map((f) => ({ dir, file: f, path: join(dir, f) })),
);

/**
 * Trim to the machine and report what came back.
 *
 * NEW ARTWORK USUALLY ARRIVES ON WHITE, NOT ON TRANSPARENCY. Trimming only
 * removes the white BORDER; the white the machine actually stands on stays,
 * opaque, and the cutout renders as a machine in a pale box — which is visible
 * the moment it sits on anything that is not white, and was how the replacement
 * C95 and LX-926 first came through (about a third of each frame still opaque
 * near-white, against 1% for the ones already processed).
 *
 * So anything without a real alpha channel goes through the flood fill first.
 * `stats().isOpaque` rather than `metadata().hasAlpha`, because several of the
 * supplied files carry an alpha channel they never use.
 */
async function content(path) {
  const [meta, stats] = await Promise.all([
    sharp(path).metadata(),
    sharp(path).stats(),
  ]);

  let source = path;
  let scratch = null;
  if (!meta.hasAlpha || stats.isOpaque) {
    scratch = `${path}.cut.png`;
    await makeTransparentCutout(path, scratch, { maxWidth: 1800, format: "png" });
    source = scratch;
  }

  const { data, info } = await sharp(source)
    .trim({ threshold: 8 })
    .toBuffer({ resolveWithObject: true });

  if (scratch) unlinkSync(scratch);
  return { buf: data, w: info.width, h: info.height };
}

const results = [];

for (const item of files) {
  const c = await content(item.path);

  /* Equal area, then clamped so a wide pose cannot run off the sides. */
  const byArea = TARGET_SIDE / Math.sqrt(c.w * c.h);
  const scale = Math.min(
    byArea,
    (CANVAS_W * SAFE_W) / c.w,
    (CANVAS_H * SAFE_H) / c.h,
  );

  const w = Math.max(1, Math.round(c.w * scale));
  const h = Math.max(1, Math.round(c.h * scale));
  const resized = await sharp(c.buf).resize(w, h).toBuffer();

  const canvas = sharp({
    create: {
      width: CANVAS_W,
      height: CANVAS_H,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  }).composite([
    {
      input: resized,
      left: Math.round((CANVAS_W - w) / 2),
      top: Math.round(CANVAS_H * (1 - BASELINE) - h),
    },
  ]);

  const out = item.path.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  const buf = await canvas.webp({ quality: 86, effort: 5 }).toBuffer();

  results.push({ ...item, out, buf, from: `${c.w}x${c.h}`, to: `${w}x${h}` });
}

if (preview) {
  const CELL = 300;
  const COLS = 4;
  const rows = Math.ceil(results.length / COLS);
  const layers = [];

  for (let i = 0; i < results.length; i += 1) {
    const r = results[i];
    const box = CELL - 20;
    const thumb = await sharp(r.buf)
      .resize({ width: box, height: Math.round((box * 4) / 5), fit: "inside" })
      .flatten({ background: "#ffffff" })
      .toBuffer();
    const m = await sharp(thumb).metadata();
    const col = i % COLS;
    const row = Math.floor(i / COLS);
    layers.push({
      input: thumb,
      left: col * CELL + 10 + Math.round((box - m.width) / 2),
      top: row * CELL + 10,
    });
    const name = r.file.replace("-cutout", "").replace(/\.\w+$/, "");
    layers.push({
      input: Buffer.from(
        `<svg width="${CELL}" height="34"><rect width="${CELL}" height="34" fill="#fff"/><text x="8" y="24" font-family="sans-serif" font-size="18" fill="#c00">${name} ${r.to}</text></svg>`,
      ),
      left: col * CELL,
      top: row * CELL + CELL - 36,
    });
    layers.push({
      input: Buffer.from(
        `<svg width="${CELL}" height="${CELL}"><rect x="0.5" y="0.5" width="${CELL - 1}" height="${CELL - 1}" fill="none" stroke="#bbb"/></svg>`,
      ),
      left: col * CELL,
      top: row * CELL,
    });
  }

  await sharp({
    create: { width: COLS * CELL, height: rows * CELL, channels: 3, background: "#ffffff" },
  })
    .composite(layers)
    .png()
    .toFile("cutout-sheet.png");
  console.log(`preview -> cutout-sheet.png (${results.length} cutouts)`);
} else {
  const { writeFileSync, unlinkSync } = await import("node:fs");
  for (const r of results) {
    writeFileSync(r.out, r.buf);
    /* The supplied PNGs are build input, not web assets — once a WebP exists
       at the path the data references, the original does not belong in the
       served directory. */
    if (r.out !== r.path) unlinkSync(r.path);
    const kb = Math.round(statSync(r.out).size / 1024);
    console.log(`  ${r.file.padEnd(22)} ${r.from.padEnd(11)} -> ${r.to.padEnd(11)} ${kb} KB`);
  }
  console.log(`\n${results.length} cutouts normalised to ${CANVAS_W}x${CANVAS_H}.`);
}
