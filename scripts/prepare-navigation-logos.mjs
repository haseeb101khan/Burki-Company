import { mkdirSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const WHITE = { r: 255, g: 255, b: 255 };
const BURKI_NAVY = { r: 17, g: 47, b: 105 };
const AMBER = { r: 247, g: 169, b: 45 };
const BLACK = { r: 8, g: 10, b: 12 };
const LOAD_X_RED = { r: 230, g: 20, b: 30 };
const XCMG_BLUE = { r: 8, g: 82, b: 164 };

async function transparentArtwork(input, output, recolour) {
  const trimmed = await sharp(input)
    .flatten({ background: WHITE })
    .trim({ background: WHITE, threshold: 12 })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = trimmed;
  const { width, height, channels } = info;

  for (let i = 0; i < width * height; i += 1) {
    const offset = i * channels;
    const original = {
      r: data[offset],
      g: data[offset + 1],
      b: data[offset + 2],
    };
    const distance = Math.max(255 - original.r, 255 - original.g, 255 - original.b);
    const alpha = Math.max(0, Math.min(255, Math.round((distance - 12) * 10)));

    if (alpha === 0) {
      data[offset + 3] = 0;
      continue;
    }

    const a = alpha / 255;
    const clean = {
      r: Math.max(0, Math.min(255, Math.round((original.r - 255 * (1 - a)) / a))),
      g: Math.max(0, Math.min(255, Math.round((original.g - 255 * (1 - a)) / a))),
      b: Math.max(0, Math.min(255, Math.round((original.b - 255 * (1 - a)) / a))),
    };
    const colour = recolour ? recolour(clean) : clean;

    data[offset] = colour.r;
    data[offset + 1] = colour.g;
    data[offset + 2] = colour.b;
    data[offset + 3] = alpha;
  }

  await sharp(data, { raw: { width, height, channels } })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 4 })
    .png({ compressionLevel: 9 })
    .toFile(output);
}

async function fitOnTransparentCanvas(input, output) {
  const fitted = await sharp(input)
    .resize(520, 150, { fit: "inside", withoutEnlargement: false })
    .toBuffer();

  await sharp({
    create: {
      width: 560,
      height: 180,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: fitted, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toFile(output);
}

async function xcmgOriginal(input, output) {
  const mask = await sharp(input)
    .flatten({ background: WHITE })
    .greyscale()
    .linear(3, -230)
    .trim({ threshold: 10 })
    .resize(520, 150, { fit: "inside" })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = mask.info;
  const mark = await sharp({ create: { width, height, channels: 3, background: XCMG_BLUE } })
    .joinChannel(mask.data, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: 560,
      height: 180,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: mark, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toFile(output);
}

mkdirSync("public/brand", { recursive: true });
mkdirSync("public/brand-logos", { recursive: true });

const burkiSource = "design/logo-source/burki-company-original.png";
const xinyuanSource = "design/logo-source/xinyuan-original.jpeg";
const loadXSource = "source-media/brand-logos/load-x.PNG";
const xcmgSource = "source-media/brand-logos/xcmg.PNG";

const burkiColour = (colour) => {
  const amber = colour.r > 150 && colour.g > 75 && colour.b < 100;
  return amber ? AMBER : BURKI_NAVY;
};

await transparentArtwork(burkiSource, "public/brand/logo-original-navy.png", burkiColour);
await transparentArtwork(burkiSource, "public/brand/logo-original-white.png", (colour) => {
  const amber = colour.r > 150 && colour.g > 75 && colour.b < 100;
  return amber ? AMBER : WHITE;
});

const prepared = [
  [xinyuanSource, "xinyuan-original", () => BLACK],
  [loadXSource, "load-x-original", (colour) =>
    colour.r > colour.g * 1.35 && colour.r > colour.b * 1.35 ? LOAD_X_RED : BLACK],
];

for (const [source, slug, recolour] of prepared) {
  const temporary = join("public/brand-logos", `${slug}-trimmed.png`);
  await transparentArtwork(source, temporary, recolour);
  await fitOnTransparentCanvas(temporary, join("public/brand-logos", `${slug}.png`));
  unlinkSync(temporary);
}

await xcmgOriginal(xcmgSource, "public/brand-logos/xcmg-original.png");

console.log("Prepared original Burki, Xinyuan, LOAD-X and XCMG logo assets.");
