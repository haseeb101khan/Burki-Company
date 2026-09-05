import sharp from "sharp";

const source = "design/banner-source/excavator-cat-page.jpeg";

await sharp(source)
  .resize(2400, 720, { fit: "cover", position: "centre" })
  .webp({ quality: 90, effort: 5 })
  .toFile("public/images/excavator-cat-page.webp");

await sharp(source)
  .resize(1200, 900, { fit: "cover", position: "right" })
  .webp({ quality: 90, effort: 5 })
  .toFile("public/images/cat-excavators.webp");

console.log("Prepared the 10:3 excavator banner and catalogue-card crop.");
