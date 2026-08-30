import { chromium } from "playwright-core";

/**
 * Captures a page as a series of viewport-sized tiles taken at successive
 * scroll positions. More faithful than fullPage: scroll-triggered reveals have
 * actually fired, and nothing depends on Chromium's beyond-viewport capture.
 */
const EXE = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = process.argv[2] || "http://localhost:3000/";
const PREFIX = process.argv[3] || "tile";
const WIDTH = Number(process.argv[4] || 1440);
const HEIGHT = Number(process.argv[5] || 900);
const OUT = "C:/tmp";

const browser = await chromium.launch({ executablePath: EXE });
const ctx = await browser.newContext({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto(URL, { waitUntil: "networkidle", timeout: 120000 });
await page.waitForTimeout(600);

const pageHeight = await page.evaluate(() => document.body.scrollHeight);
const tiles = Math.ceil(pageHeight / HEIGHT);
console.log(`${URL}  page=${pageHeight}px  ${tiles} tiles @ ${WIDTH}x${HEIGHT}`);

for (let i = 0; i < tiles; i++) {
  const y = i * HEIGHT;
  await page.evaluate((top) => window.scrollTo(0, top), y);
  // Let reveals in this band fire and images decode before capturing.
  await page.waitForTimeout(950);
  await page.screenshot({ path: `${OUT}/${PREFIX}${String(i + 1).padStart(2, "0")}.png` });
}

console.log(`errors=${errors.length}`);
errors.slice(0, 5).forEach((e) => console.log("  ! " + e.slice(0, 160)));
await browser.close();
