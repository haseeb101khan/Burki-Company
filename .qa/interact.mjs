import { chromium } from "playwright-core";
const b = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });

// Desktop: open the Equipment mega panel (scrolled, so the bar is solid)
const d = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await d.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await d.evaluate(() => window.scrollTo(0, 1200));
await d.waitForTimeout(800);
await d.getByRole("button", { name: "Equipment" }).hover();
await d.waitForTimeout(700);
await d.screenshot({ path: "C:/tmp/i-megamenu.png" });
console.log("mega panel visible:", await d.locator("text=View all equipment").first().isVisible());

// Mobile: open the drawer and expand a section
const m = await (await b.newContext({ viewport: { width: 390, height: 844 } })).newPage();
await m.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await m.getByRole("button", { name: "Open menu" }).click();
await m.waitForTimeout(500);
await m.screenshot({ path: "C:/tmp/i-drawer.png" });
await m.getByRole("button", { name: "Equipment" }).click();
await m.waitForTimeout(500);
await m.screenshot({ path: "C:/tmp/i-drawer-open.png" });
console.log("drawer accordion:", await m.locator("text=Backhoe Loaders").first().isVisible());
await b.close();
