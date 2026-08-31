/**
 * Normalise the business-partner logos.
 *
 *   node scripts/prepare-partners.mjs
 *
 * The supplied files are crops at wildly different sizes and proportions —
 * 278x173 up to 774x542 — and every one is opaque despite carrying an alpha
 * channel, so they are screenshots with a background baked in rather than
 * transparent artwork.
 *
 * TWO KINDS IN ONE SET, which decides the treatment. Most are a mark on a
 * white field, and would cut out cleanly. Shaheen Wood is a full-bleed
 * photograph of a sky, and cannot be cut out at all — there is no border to
 * flood-fill inwards from. Cutting out the ones that can be and leaving the
 * rest would give a wall where some logos float and one sits in a box, which
 * looks like a mistake.
 *
 * So all of them get the SAME treatment: trimmed of their surrounding white,
 * then centred on one white canvas at one size. Every logo then occupies the
 * same optical space however tall or wide the original was, which is what
 * makes a row of mismatched marks read as a set.
 *
 * The trim is what does the real work. Without it a logo with a generous white
 * margin renders visually half the size of one cropped tight, even though both
 * files are the same dimensions.
 */
import { mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const SRC = "source-media/partners";
const OUT = "public/images/partners";

/**
 * The BOX each logo is fitted inside — not a canvas it is pasted onto.
 *
 * An earlier version letterboxed everything onto a fixed 2:1 canvas, and it
 * was wrong: a circular mark became a square in the middle of a wide field of
 * white, so on the page it rendered at half the size of a wordmark beside it.
 * The white was baked into the file, so no amount of CSS could recover it.
 *
 * Each logo now keeps its own proportions and is trimmed tight. Sizing is left
 * to CSS, which caps BOTH height and width — a tall mark then fills the height
 * and a wide wordmark fills the width, which is what makes them look like one
 * set.
 */
const BOX = { width: 440, height: 260 };

/**
 * FILES THAT ARE NOT PUBLISHED.
 *
 * This list once held four. Three of them — zkb, NKB, SKB — were held back
 * because the artwork showed two Swiss cantonal banks and a US flight-case
 * manufacturer, which read as someone searching the initials and taking the
 * first result. The client has since re-supplied all three and confirmed they
 * belong on the wall, so they publish now; the names in seed-data/partners.ts
 * are still read off the artwork, which is where any remaining mismatch would
 * show.
 *
 * The last one stays out, and is a different problem from a wrong logo:
 * it is not a logo at all. Publishing it would put a named individual's
 * personal email address on a public website, and it carries a directory
 * site's watermark diagonally across the company name — so it cannot be
 * cropped down to the wordmark either. It needs Faisalabad Oil Refinery's
 * actual mark, not a crop of this.
 *
 * Delete an entry here once correct artwork replaces the file.
 */
const SKIP = {
  "FAISALABAD OIL REFINEREY.PNG":
    "is a sales rep's business card carrying a personal email address and a third-party watermark, not a logo",
};

/** "GHANI DAIRIES.PNG" -> "ghani-dairies" */
const slugify = (name) =>
  name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function prepare(file) {
  const src = join(SRC, file);
  const slug = slugify(file);
  const dest = join(OUT, `${slug}.webp`);

  /* Flatten first: these carry an alpha channel they do not use, and trim
     reads transparency as content if it is left on. */
  const flattened = await sharp(src)
    .flatten({ background: "#ffffff" })
    .toBuffer();

  /* Trim the surrounding white. A generous threshold catches the off-white
     and JPEG-ish speckle around a screenshot crop; `.trim()` is a no-op on
     the photographic logo, which is the correct outcome for it. */
  let trimmed;
  try {
    trimmed = await sharp(flattened)
      .trim({ background: "#ffffff", threshold: 12 })
      .toBuffer();
  } catch {
    /* Trim throws if the image is entirely one colour. Keep the original. */
    trimmed = flattened;
  }

  await sharp(trimmed)
    .resize({
      width: BOX.width,
      height: BOX.height,
      fit: "inside",
      withoutEnlargement: false,
    })
    .flatten({ background: "#ffffff" })
    .webp({ quality: 92 })
    .toFile(dest);

  const before = statSync(src).size;
  const after = statSync(dest).size;
  return { slug, before, after };
}

mkdirSync(OUT, { recursive: true });

const files = readdirSync(SRC).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
let before = 0;
let after = 0;

const skipped = [];

for (const file of files.sort()) {
  if (SKIP[file]) {
    skipped.push(`  SKIPPED ${file} — ${SKIP[file]}`);
    continue;
  }
  const r = await prepare(file);
  before += r.before;
  after += r.after;
  console.log(
    `  ${r.slug.padEnd(28)} ${(r.before / 1024).toFixed(0).padStart(5)}KB -> ${(r.after / 1024).toFixed(0).padStart(4)}KB`,
  );
}

console.log(
  `\n${files.length - skipped.length} logos, fitted inside ${BOX.width}x${BOX.height} — ` +
    `${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024).toFixed(0)}KB`,
);

if (skipped.length > 0) {
  console.log(`\nNOT PUBLISHED (${skipped.length}):\n${skipped.join("\n")}`);
}
