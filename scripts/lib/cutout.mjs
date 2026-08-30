import sharp from "sharp";

/**
 * Studio cutout on white -> cutout with a real transparent background.
 *
 * WHY THIS EXISTS. Every cutout supplied — Xinyuan's and the LX Series' alike —
 * is a machine on a white studio ground, and about half have no alpha channel
 * at all. That is fine on a white page: the background is invisible because it
 * matches. It falls apart the moment the machine stands on anything else, which
 * is what the homepage brand showcase does — the cutouts rendered as obvious
 * white rectangles floating over the lit platform.
 *
 * WHY FLOOD FILL, NOT A THRESHOLD. The obvious approach — "make every pixel
 * brighter than N transparent" — destroys the machine. These are white-on-black
 * XINYUAN decals, white cab pillars, glass highlights and light grey panels;
 * a global threshold punches holes straight through all of them.
 *
 * The background is instead identified by CONNECTIVITY: flood outward from the
 * border, crossing only near-white pixels. Background is by definition the
 * region touching the edge of the frame. The white letters of a logo in the
 * middle of a black boom are not connected to the border, so they survive
 * untouched. That distinction is the whole reason this is 60 lines rather than
 * one call.
 */

/** How far from pure white still counts as background. */
const TOLERANCE = 26;
/** Pixels within this of the decided edge get partial alpha, to avoid a hard cut. */
const FEATHER = 14;

export async function makeTransparentCutout(input, output, { maxWidth = 1800, format = "webp" } = {}) {
  /* Trim first so the flood has less to cover and the machine fills the frame. */
  const prepared = await sharp(input)
    .flatten({ background: "#ffffff" })
    .trim({ threshold: 8 })
    .resize({ width: maxWidth, withoutEnlargement: true, fit: "inside" })
    .toBuffer();

  const { data, info } = await sharp(prepared)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const isBackground = new Uint8Array(width * height);

  /* How far this pixel is from white, as the max channel deviation. Using the
     max rather than the mean keeps faintly tinted greys — a shadow under a
     wheel — out of the background. */
  const distanceFromWhite = (i) => {
    const o = i * channels;
    return Math.max(255 - data[o], 255 - data[o + 1], 255 - data[o + 2]);
  };

  /* Breadth-first flood from every border pixel. An explicit stack rather than
     recursion: a 1800x1800 frame is 3.2M pixels and would blow the call stack. */
  const stack = [];
  for (let x = 0; x < width; x += 1) {
    stack.push(x, (height - 1) * width + x);
  }
  for (let y = 0; y < height; y += 1) {
    stack.push(y * width, y * width + width - 1);
  }

  while (stack.length > 0) {
    const i = stack.pop();
    if (isBackground[i]) continue;
    if (distanceFromWhite(i) > TOLERANCE) continue;

    isBackground[i] = 1;

    const x = i % width;
    const y = (i / width) | 0;
    if (x > 0) stack.push(i - 1);
    if (x < width - 1) stack.push(i + 1);
    if (y > 0) stack.push(i - width);
    if (y < height - 1) stack.push(i + width);
  }

  /*
   * Alpha from the flood, softened at the boundary.
   *
   * A binary mask leaves a hard, aliased edge that reads as a cheap cut-out.
   * Background pixels closest to the machine — the ones the tolerance only just
   * caught — get partial alpha instead, so the silhouette meets the stage with
   * the same softness the original photograph had.
   */
  for (let i = 0; i < width * height; i += 1) {
    const o = i * channels + 3;
    if (!isBackground[i]) {
      data[o] = 255;
      continue;
    }
    const d = distanceFromWhite(i);
    data[o] = d <= TOLERANCE - FEATHER ? 0 : Math.round(((d - (TOLERANCE - FEATHER)) / FEATHER) * 255);
  }

  /* WebP rather than PNG: alpha is required, and PNG stores photographic
     content badly — the same set is roughly a quarter the size as WebP with no
     visible difference. Sanity and Next both handle it natively. */
  const out = sharp(data, { raw: { width, height, channels } });
  await (format === "png"
    ? out.png({ compressionLevel: 9 })
    : out.webp({ quality: 92, alphaQuality: 100, effort: 5 })
  ).toFile(output);
}
