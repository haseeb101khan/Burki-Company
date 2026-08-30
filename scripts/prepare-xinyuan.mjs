/**
 * Xinyuan source artwork -> web-ready cutouts.
 *
 *   node scripts/prepare-xinyuan.mjs
 *
 * The supplied files are 1-13 MB camera-resolution PNGs, some with alpha and
 * some already flattened onto white. Two things get normalised:
 *
 *  - THE WHITE GROUND IS REMOVED. Half the set arrived with transparency and
 *    half without, and a machine on a baked-in white rectangle only works on a
 *    white page. The homepage brand showcase stands them on a lit platform, and
 *    there they showed as obvious white boxes. See lib/cutout.mjs for why this
 *    is a flood fill rather than a brightness threshold.
 *  - Trimmed and capped at a sane width. Sanity keeps the original and Next
 *    re-optimises it, so an uncapped 4032px phone photo buys nothing but a
 *    slower first render.
 *
 * The attachment names are translated here too. They arrived from the factory
 * as e.g. 7吨全回旋五爪夹木器张开, which is not a URL, a slug, or anything a
 * Karachi sales office can search for.
 */
import { mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import ffmpeg from "ffmpeg-static";
import sharp from "sharp";
import { makeTransparentCutout } from "./lib/cutout.mjs";

const EQ_SRC = "source-media/xinyuan/xinyuan-equipments";
const AT_SRC = "source-media/xinyuan/xinyuan-attachments";
const EQ_OUT = "public/images/xinyuan";
const LX_OUT = "public/images/load-x";
const AT_OUT = "public/images/xinyuan-attachments";

/**
 * Chinese filename -> English name and slug.
 *
 * Every one of these was checked against the photograph, not translated from
 * the characters alone. 快换接头 ("quick coupler") is pictured carrying a
 * bucket, and 货叉组件 is a pallet-fork carriage on that same coupler — from
 * the filenames alone both would have been filed as buckets.
 *
 * `extra` holds the open/closed pair shots of one attachment. The factory ships
 * 张开 (open) and 收合 (closed) as separate files; they are one product with two
 * photographs, not two products.
 */
export const ATTACHMENTS = [
  { file: "15吨C150型螺旋钻机.png", slug: "auger-drill-15t", name: "Auger Drill, 15 t", carrier: "15 t", note: "C150 carrier" },
  { file: "9吨C100型螺旋钻机.png", slug: "auger-drill-9t", name: "Auger Drill, 9 t", carrier: "9 t", note: "C100 carrier" },
  { file: "7吨C80型螺旋钻机.png", slug: "auger-drill-7t", name: "Auger Drill, 7 t", carrier: "7 t", note: "C80 carrier" },
  { file: "15吨全回旋电控五爪夹木器.png", slug: "log-grapple-5-claw-15t", name: "Five-Claw Log Grapple, Electric Full-Rotation, 15 t", carrier: "15 t" },
  {
    file: "7吨全回旋五爪夹木器张开.png",
    slug: "log-grapple-5-claw-7t",
    name: "Five-Claw Log Grapple, Full-Rotation, 7 t",
    carrier: "7 t",
    extra: ["7吨全回旋五爪夹木器收合.png", "7吨全回旋五爪夹木器短款.png"],
  },
  { file: "9吨全回旋五爪夹木器.png", slug: "log-grapple-5-claw-9t", name: "Five-Claw Log Grapple, Full-Rotation, 9 t", carrier: "9 t" },
  { file: "7吨定制全回旋三爪夹木器.png", slug: "log-grapple-3-claw-7t", name: "Three-Claw Log Grapple, Full-Rotation, 7 t", carrier: "7 t" },
  {
    file: "7吨全回旋抱木夹张开.png",
    slug: "log-grab-7t",
    name: "Log Grab, Full-Rotation, 7 t",
    carrier: "7 t",
    extra: ["7吨全回旋抱木夹收合.png"],
  },
  {
    file: "9吨四爪全回旋抱木夹张开.png",
    slug: "log-grab-4-claw-9t",
    name: "Four-Claw Log Grab, Full-Rotation, 9 t",
    carrier: "9 t",
    extra: ["9吨四爪全回旋抱木夹收合.png"],
  },
  {
    file: "7吨全回旋抓手锯张开.png",
    slug: "grapple-saw-7t",
    name: "Grapple Saw, Full-Rotation, 7 t",
    carrier: "7 t",
    extra: ["7吨全回旋抓手锯收合.png"],
  },
  { file: "单片圆盘锯.png", slug: "disc-saw", name: "Single-Disc Circular Saw", carrier: null },
  { file: "7吨全回旋五爪甘蔗夹.png", slug: "sugarcane-grab-7t", name: "Five-Claw Sugarcane Grab, Full-Rotation, 7 t", carrier: "7 t" },
  {
    file: "7吨全回旋棕榈果夹张开.png",
    slug: "palm-fruit-grab-7t",
    name: "Palm Fruit Grab, Full-Rotation, 7 t",
    carrier: "7 t",
    extra: ["7吨全回旋棕榈果夹收合.png"],
  },
  { file: "7吨全回旋夹石器.png", slug: "stone-grab-7t", name: "Stone Grab, Full-Rotation, 7 t", carrier: "7 t" },
  {
    file: "7吨全回旋球铁爪夹张开.png",
    slug: "scrap-claw-grab-7t",
    name: "Ductile-Iron Claw Grab, Full-Rotation, 7 t",
    carrier: "7 t",
    extra: ["7吨全回旋球铁爪夹收合.png"],
  },
  { file: "7吨全回旋快换接头.png", slug: "quick-coupler-7t", name: "Quick Coupler, Full-Rotation, 7 t", carrier: "7 t" },
  { file: "9吨全回旋快换接头.png", slug: "quick-coupler-9t", name: "Quick Coupler, Full-Rotation, 9 t", carrier: "9 t" },
  { file: "9吨全回旋快换接头货叉组件.png", slug: "pallet-forks-9t", name: "Pallet Fork Carriage on Quick Coupler, 9 t", carrier: "9 t" },
  {
    file: "7吨拇指夹张开.png",
    slug: "hydraulic-thumb-7t",
    name: "Hydraulic Thumb, 7 t",
    carrier: "7 t",
    extra: ["7吨拇指夹夹紧.png"],
  },
  { file: "7吨破碎锤.png", slug: "hydraulic-breaker-7t", name: "Hydraulic Breaker, 7 t", carrier: "7 t" },
  { file: "9吨电磁铁吸盘.png", slug: "lifting-magnet-9t", name: "Electromagnetic Lifting Plate, 9 t", carrier: "9 t" },
  { file: "7吨T150型全回旋树篱剪枝机.png", slug: "hedge-trimmer-rotating-7t", name: "T150 Hedge Trimmer, Full-Rotation, 7 t", carrier: "7 t" },
  { file: "7吨T150型树篱剪枝机.png", slug: "hedge-trimmer-7t", name: "T150 Hedge Trimmer, 7 t", carrier: "7 t" },
  { file: "L-07液压手腕.png", slug: "tiltrotator-l07", name: "L-07 Hydraulic Wrist (Tiltrotator)", carrier: null },
  { file: "L-15液压手腕.png", slug: "tiltrotator-l15", name: "L-15 Hydraulic Wrist (Tiltrotator)", carrier: null },
];

/**
 * The LOAD-X cutouts get the same treatment.
 *
 * They stand on the same platform in the same homepage section, so leaving them
 * on white would have made LOAD-X the one brand whose machines sat in boxes.
 */
const LOADX = {
  "lx-650": "public/brands/Load-x/lx650/lx-650-1.PNG",
  "lx-926": "public/brands/Load-x/lx926/lx-926-cutout.jpeg",
  "lx-930": "public/brands/Load-x/lx930/lx-930-cutout.jpeg",
  "lx-936": "public/brands/Load-x/lx936/lx-936-white-1.jpg",
  "lx-950": "public/brands/Load-x/lx950/lx-950-cutout.jpeg",
};

async function normalise(input, output, maxWidth) {
  await makeTransparentCutout(input, output, { maxWidth });
  return statSync(output).size;
}

/**
 * The brand's own photography, cropped to one consistent banner shape.
 *
 * The three supplied files are 5464x2288 (wide), 4429x5906 (tall portrait) and
 * 6720x3780. Dropped into a fixed frame with `object-cover` the portrait loses
 * everything but its middle — including the XINYUAN sign that is the point of
 * the picture. sharp's attention strategy picks the most salient region
 * instead, so all three arrive already the right shape and already showing the
 * thing worth showing.
 */
const BRAND_BANNERS = {
  "xinyuan-banner-1": "source-media/xinyuan/Brand's about and logo/xinyuan-homepage2.jpg",
  "xinyuan-banner-2": "source-media/xinyuan/Brand's about and logo/xinyuan-homepage1.jpg",
  "xinyuan-banner-3": "source-media/xinyuan/Brand's about and logo/xinyuan-company.jpg",
};

async function banner(input, output) {
  await sharp(input)
    .resize(1800, 1125, { fit: "cover", position: sharp.strategy.attention })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(output);
  return statSync(output).size;
}

/**
 * The homepage hero film.
 *
 * Plays muted and autoplaying as the first banner, so the AUDIO TRACK IS
 * DROPPED — it can never be heard, and carrying it would be pure weight on the
 * first thing a visitor downloads. Capped at 1920 wide (the source is a 2520px
 * ultra-wide) and given a poster frame so the banner shows something the
 * instant the page paints rather than a black rectangle.
 */
const HERO_FILM = {
  src: "source-media/xinyuan/Brand's about and logo/xinyuan homepage banner display.mp4",
  out: "public/videos/xinyuan-hero.mp4",
  poster: "public/images/xinyuan/xinyuan-hero-poster.jpg",
};

async function buildHeroFilm() {
  execFileSync(
    ffmpeg,
    [
      "-y", "-i", HERO_FILM.src,
      "-vf", "scale='min(1920,iw)':-2",
      "-c:v", "libx264", "-preset", "slow", "-crf", "26",
      "-profile:v", "high", "-pix_fmt", "yuv420p",
      "-an",
      "-movflags", "+faststart",
      HERO_FILM.out,
    ],
    { stdio: ["ignore", "ignore", "ignore"] },
  );
  execFileSync(
    ffmpeg,
    ["-y", "-ss", "00:00:01", "-i", HERO_FILM.src, "-frames:v", "1", "-vf", "scale=1920:-2", "-q:v", "3", HERO_FILM.poster],
    { stdio: ["ignore", "ignore", "ignore"] },
  );
  console.log(`  hero film -> videos/xinyuan-hero.mp4 (${(statSync(HERO_FILM.out).size / 1048576).toFixed(1)} MB)`);
}

async function main() {
  mkdirSync(EQ_OUT, { recursive: true });
  mkdirSync(AT_OUT, { recursive: true });
  mkdirSync(LX_OUT, { recursive: true });

  let before = 0;
  let after = 0;

  console.log("Homepage hero film");
  await buildHeroFilm();

  console.log("\nMachine cutouts");
  for (const model of readdirSync(EQ_SRC).sort()) {
    const dir = join(EQ_SRC, model);
    if (!statSync(dir).isDirectory()) continue;
    const png = readdirSync(dir).find((f) => /\.png$/i.test(f));
    if (!png) {
      console.log(`  ${model}: no image found`);
      continue;
    }
    const src = join(dir, png);
    before += statSync(src).size;
    after += await normalise(src, join(EQ_OUT, `${model.toLowerCase()}-cutout.webp`), 1800);
    console.log(`  ${model.padEnd(6)} -> images/xinyuan/${model.toLowerCase()}-cutout.webp`);
  }

  console.log("\nAttachments");
  for (const a of ATTACHMENTS) {
    const files = [a.file, ...(a.extra ?? [])];
    for (const [i, f] of files.entries()) {
      const src = join(AT_SRC, f);
      before += statSync(src).size;
      const name = i === 0 ? `${a.slug}.webp` : `${a.slug}-${i + 1}.webp`;
      after += await normalise(src, join(AT_OUT, name), 1400);
    }
    console.log(`  ${a.slug.padEnd(28)} ${files.length} img  ${a.name}`);
  }

  console.log("\nBrand banners");
  for (const [name, src] of Object.entries(BRAND_BANNERS)) {
    before += statSync(src).size;
    after += await banner(src, join(EQ_OUT, `${name}.jpg`));
    console.log(`  ${name} -> images/xinyuan/${name}.jpg`);
  }

  console.log("\nLOAD-X cutouts");
  for (const [slug, src] of Object.entries(LOADX)) {
    before += statSync(src).size;
    after += await normalise(src, join(LX_OUT, `${slug}-cutout.webp`), 1800);
    console.log(`  ${slug.padEnd(8)} -> images/load-x/${slug}-cutout.webp`);
  }

  console.log(`\n${(before / 1048576).toFixed(0)} MB in -> ${(after / 1048576).toFixed(1)} MB out`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
