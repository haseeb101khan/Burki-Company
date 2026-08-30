/**
 * Brand artwork -> the matched silhouette pair the homepage strip needs.
 *
 *   npx tsx scripts/make-brand-logos.mjs      (or: node scripts/make-brand-logos.mjs)
 *
 * The strip cross-fades a navy mark to a white one as its box inverts on hover,
 * so every brand needs BOTH variants on an IDENTICAL canvas. That is what keeps
 * a 7:1 wordmark and a square icon rendering at the same optical weight instead
 * of one dwarfing the other.
 *
 * Reducing each mark to a single-colour silhouette is not a stylistic choice:
 * the supplied files are a mix of black-on-transparent, navy, red-and-grey and
 * white-on-solid-blue. Dropped in as-is, half of them vanish against one ground
 * or the other. A silhouette is legible on both.
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'source-media/brand-logos';
const OUT = 'public/brand-logos';
const W = 480, H = 192, PAD = 24;
const NAVY = { r: 0, g: 38, b: 101 };      // #002665, sampled from the Burki logo
const WHITE = { r: 255, g: 255, b: 255 };

/**
 * How to find the mark inside the supplied file.
 *
 * NONE of these files has real transparency — every one reports an alpha
 * channel that is 255 everywhere, because they are screenshots with the
 * background baked in. So the silhouette has to come from luminance:
 *
 *   `dark`   dark marks on a white ground  -> invert; the mark is what is NOT white
 *   `light`  light marks on a coloured panel -> the mark is what IS bright
 *
 * Both use a soft mask rather than a hard threshold, so anti-aliased edges stay
 * smooth instead of going jagged at the cut.
 */
const SOURCES = [
  { slug: 'xinyuan',  file: 'Capture.PNG',  mask: 'dark' },
  { slug: 'xcmg',     file: 'xcmg.PNG',     mask: 'light' },
  { slug: 'zoomlion', file: 'zoomlion.PNG', mask: 'dark' },
  { slug: 'sany',     file: 'sany.PNG',     mask: 'dark' },
  { slug: 'liugong',  file: 'liugong.PNG',  mask: 'dark' },
];

/**
 * Greyscale image where white means "this pixel is part of the mark".
 *
 * EACH STAGE IS MATERIALISED, and that is not fussiness. sharp applies the
 * operations in a single pipeline in ITS OWN fixed order, not the order they
 * are called — `greyscale()` lands near the end, after `negate()` and
 * `linear()`. Chained, the curve therefore ran against the colour image and
 * SANY's mask topped out at alpha 106 instead of 255, rendering the logo
 * half-transparent. Forcing a buffer between stages makes the order the one
 * written here.
 */
async function buildMask({ file, mask }) {
  const grey = await sharp(join(SRC, file))
    .flatten({ background: '#ffffff' })
    .removeAlpha()
    .greyscale()
    .toBuffer();

  if (mask === 'light') {
    /* Panel sits near luminance 73, the mark at 255. */
    return sharp(grey).linear(3.0, -230).toBuffer();
  }

  /*
   * Inverted, so the white ground lands at 0.
   *
   * The curve is steep because these are not solid black marks: SANY's darkest
   * pixel is luminance 81 and LiuGong's orange wedge sits higher still. A gentle
   * stretch leaves them part-transparent and the silhouette reads washed out.
   */
  const inverted = await sharp(grey).negate().toBuffer();
  return sharp(inverted).linear(2.6, -60).toBuffer();
}

async function render(maskBuf, colour, outPath) {
  /* Trim to the mark's real bounds before fitting, so a file with generous
     built-in margins does not render smaller than its neighbours. */
  const trimmed = await sharp(maskBuf).trim({ threshold: 10 }).toBuffer();

  const fitted = await sharp(trimmed)
    .resize(W - PAD * 2, H - PAD * 2, { fit: 'inside', background: { r: 0, g: 0, b: 0 } })
    .toColourspace('b-w')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = fitted.info;

  /*
   * The mask becomes the ALPHA CHANNEL, not a composite source.
   *
   * Compositing a greyscale mask with `dest-in` does nothing useful: a
   * greyscale buffer has no alpha, so it is opaque everywhere and the whole
   * rectangle survives — which is exactly the solid blocks this produced
   * before. `joinChannel` appends it as the fourth channel instead, so the
   * mark's own shape carries the transparency.
   */
  const coloured = await sharp({
    create: { width, height, channels: 3, background: colour },
  })
    .joinChannel(fitted.data, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();

  await sharp({
    create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: coloured, gravity: 'centre' }])
    .png({ compressionLevel: 9 })
    .toFile(outPath);
}

mkdirSync(OUT, { recursive: true });
for (const source of SOURCES) {
  const mask = await buildMask(source);
  await render(mask, NAVY, join(OUT, `${source.slug}-navy.png`));
  await render(mask, WHITE, join(OUT, `${source.slug}-white.png`));
  console.log(`  ${source.slug.padEnd(10)} navy + white  (${source.mask} mask)`);
}
console.log('\nLOAD-X has no artwork and is left without a logo on purpose:');
console.log('the UI renders a typographic plate, which needs no permission and');
console.log('stays legible on both the light and the inverted ground.');
