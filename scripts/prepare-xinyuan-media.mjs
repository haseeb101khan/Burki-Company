/**
 * Xinyuan gallery photography and detailing films -> web-ready media.
 *
 *   node scripts/prepare-xinyuan-media.mjs
 *
 * Separate from prepare-xinyuan.mjs, which handles cutouts and brand artwork.
 * This one deals with the two heavy things:
 *
 *  PHOTOGRAPHS. C75, C85 and C95 came with real working photography — 25, 7 and
 *  21 frames, at 1-6 MB each straight off a camera. Resized and re-encoded, the
 *  set drops by roughly 90% with no visible difference at the size a gallery
 *  actually renders.
 *
 *  FILMS. Eight models have a detailing film, all 1080p and 60-196 MB. Those
 *  numbers are fine for a hard disk and impossible for a product page: a
 *  visitor on a Karachi mobile connection would never see the end of one, and
 *  the free-plan bandwidth would be gone in a few hundred views. They are
 *  transcoded to 720p H.264 at CRF 26, which lands each in the 5-15 MB range —
 *  the same ballpark as the 4.6 MB introduction clip the client produced
 *  themselves, so it is a size they have already judged acceptable.
 *
 *  `-movflags +faststart` puts the index at the front of the file so playback
 *  can begin before the whole thing has arrived. Without it the browser buffers
 *  the entire video before showing a frame, which on a 12 MB file is the
 *  difference between "plays" and "appears broken".
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import ffmpeg from "ffmpeg-static";
import sharp from "sharp";

const SRC = "source-media/xinyuan/xinyuan-equipments";
const IMG_OUT = "public/images/xinyuan/gallery";
const VID_OUT = "public/videos/xinyuan";
const POSTER_OUT = "public/images/xinyuan/posters";

const isImage = (f) => /\.(jpe?g|png)$/i.test(f) && !/cutout|C\d+W\.png$/i.test(f);
const isVideo = (f) => /\.(m4v|mp4|mov)$/i.test(f);

/**
 * Natural sort, so 2.JPG comes before 10.JPG.
 *
 * The frames are numbered with gaps (1, 2, 3, 5, 8, 10, 13...) and a plain
 * lexicographic sort puts 10 immediately after 1, which shuffles a walkaround
 * sequence into nonsense.
 */
const natural = (a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

function transcode(input, output) {
  execFileSync(
    ffmpeg,
    [
      "-y", "-i", input,
      "-vf", "scale='min(1280,iw)':-2",
      "-c:v", "libx264", "-preset", "medium", "-crf", "26",
      "-profile:v", "high", "-pix_fmt", "yuv420p",
      "-c:a", "aac", "-b:a", "96k", "-ac", "2",
      "-movflags", "+faststart",
      output,
    ],
    { stdio: ["ignore", "ignore", "ignore"] },
  );
}

/** A frame from a few seconds in — the opening frame is often a fade from black. */
function poster(input, output) {
  execFileSync(
    ffmpeg,
    ["-y", "-ss", "00:00:04", "-i", input, "-frames:v", "1", "-vf", "scale=1280:-2", "-q:v", "3", output],
    { stdio: ["ignore", "ignore", "ignore"] },
  );
}

async function main() {
  mkdirSync(IMG_OUT, { recursive: true });
  mkdirSync(VID_OUT, { recursive: true });
  mkdirSync(POSTER_OUT, { recursive: true });

  const force = process.argv.includes("--force");
  let imgBefore = 0, imgAfter = 0, vidBefore = 0, vidAfter = 0;

  for (const model of readdirSync(SRC).sort()) {
    const dir = join(SRC, model);
    if (!statSync(dir).isDirectory()) continue;
    const files = readdirSync(dir);
    const slug = model.toLowerCase();

    const photos = files.filter(isImage).sort(natural);
    if (photos.length > 0) {
      for (const [i, f] of photos.entries()) {
        const src = join(dir, f);
        const out = join(IMG_OUT, `${slug}-${i + 1}.jpg`);
        imgBefore += statSync(src).size;
        await sharp(src)
          .rotate() /* honour EXIF orientation, or half the set arrives sideways */
          .resize({ width: 1800, withoutEnlargement: true, fit: "inside" })
          .jpeg({ quality: 82, mozjpeg: true })
          .toFile(out);
        imgAfter += statSync(out).size;
      }
      console.log(`  ${model.padEnd(6)} ${String(photos.length).padStart(2)} photos`);
    }

    const video = files.find(isVideo);
    if (video) {
      const src = join(dir, video);
      const out = join(VID_OUT, `${slug}.mp4`);
      const pos = join(POSTER_OUT, `${slug}.jpg`);
      vidBefore += statSync(src).size;
      if (force || !existsSync(out)) {
        process.stdout.write(`  ${model.padEnd(6)} transcoding film...`);
        transcode(src, out);
        poster(src, pos);
        process.stdout.write(` ${(statSync(out).size / 1048576).toFixed(1)} MB\n`);
      } else {
        console.log(`  ${model.padEnd(6)} film already built (--force to redo)`);
      }
      vidAfter += statSync(out).size;
    }
  }

  console.log(
    `\nphotos ${(imgBefore / 1048576).toFixed(0)} MB -> ${(imgAfter / 1048576).toFixed(0)} MB` +
      `\nfilms  ${(vidBefore / 1048576).toFixed(0)} MB -> ${(vidAfter / 1048576).toFixed(0)} MB`,
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
