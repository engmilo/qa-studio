import { test, expect } from "@playwright/test";
import { openApp } from "./helpers.js";

test("reduced motion requested: the typing demo is a still sentence", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openApp(page);
  const banner = page.locator("#livePreviewText");
  await expect(banner).not.toHaveText("");
  const first = await banner.textContent();
  expect(first.length).toBeGreaterThan(15); // the whole sentence, not a half-typed one
  await page.waitForTimeout(1500);
  expect(await banner.textContent()).toBe(first);
});

test("reduced motion requested: animations are switched off", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openApp(page);
  expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
  const ms = await page.locator("#progressBar").evaluate((el) => parseFloat(getComputedStyle(el).animationDuration) * 1000);
  expect(ms).toBeLessThan(1);
});

test("normal motion: the typing demo still types", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await openApp(page);
  const banner = page.locator("#livePreviewText");
  await expect.poll(async () => (await banner.textContent()).length, { timeout: 5000 }).toBeGreaterThan(3);
  const a = (await banner.textContent()).length;
  await expect.poll(async () => (await banner.textContent()).length, { timeout: 5000 }).not.toBe(a);
});