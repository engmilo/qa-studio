import { test, expect } from "@playwright/test";
import { openApp } from "./helpers.js";

test.use({ serviceWorkers: "allow" });

test("service worker installs, precaches the app and serves it offline", async ({ page, context }) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));

  await openApp(page);
  await page.evaluate(() => navigator.serviceWorker.ready);
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);

  const cached = await page.evaluate(async () => {
    const names = (await caches.keys()).filter((k) => k.startsWith("qa-studio-"));
    const cache = await caches.open(names[0]);
    return { names, urls: (await cache.keys()).map((r) => new URL(r.url).pathname) };
  });
  expect(cached.names).toHaveLength(1);
  for (const p of ["/app.html", "/app.js", "/vendor/lucide-1.16.0.min.js", "/vendor/chart-4.4.7.umd.js", "/vendor/xlsx-0.18.5.full.min.js", "/vendor/inter.css"]) {
    expect(cached.urls, `${p} should be precached`).toContain(p);
  }

  // first install must NOT trigger the "update applied, reloading" message
  await expect(page.locator("#toastContainer")).not.toContainText("Update applied");

  // offline reload is served from the cache
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator("#demoBtn")).toBeVisible();
  await page.locator("#demoBtn").click();
  await expect(page.locator("#results .test-card")).toHaveCount(16);
  await context.setOffline(false);

  expect(errors).toEqual([]);
});

test("the service worker never intercepts POST requests", async ({ page }) => {
  await openApp(page);
  await page.evaluate(() => navigator.serviceWorker.ready);
  const src = await (await page.request.get("/sw.js")).text();
  expect(src).toContain('req.method !== "GET"');
});
