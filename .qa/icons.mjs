import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const p = await (await b.newContext({ viewport: { width: 1150, height: 900 } })).newPage();
await p.goto("http://localhost:3000/icon-check", { waitUntil: "networkidle" });
await p.waitForTimeout(900);
await p.locator("div.grid").screenshot({ path: "C:/tmp/icons.png" });
console.log("captured");
await b.close();
