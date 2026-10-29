import { test, expect } from "@playwright/test";
import { openApp } from "./helpers.js";

const stylesheet = async (request) => {
  const html = await (await request.get("/app.html")).text();
  return { html, css: html.match(/<style>([\s\S]*?)<\/style>/)[1] };
};

test("the stylesheet has no duplicates or leftovers", async ({ request }) => {
  const { html, css } = await stylesheet(request);
  expect((css.match(/@keyframes shimmer/g) || []).length).toBe(1);
  expect((css.match(/\.priority-badge\s*\{/g) || []).length).toBe(1);
  expect(css).not.toContain('[dir="rtl"]');
  expect(css).not.toMatch(/body\.light \*, body\.dark \*/);
  for (const dead of ["wdg-", "widget-card", "side-widget", "h-bar-", "day-chart", "comp-card", "dash-card", "drag-handle"]) {
    expect(css, `leftover style "${dead}"`).not.toContain(dead);
  }
  expect(html).not.toContain("sideWidgets");
});

test("the top bar styles apply (a stray rule used to swallow them)", async ({ page }) => {
  await openApp(page);
  expect(await page.locator(".top-bar-row").evaluate((el) => getComputedStyle(el).display)).toBe("flex");
});

test("closed dialogs are invisible to Tab and screen readers", async ({ page }) => {
  await openApp(page);
  for (const id of ["apiConfigOverlay", "modalOverlay", "saveModalOverlay", "confirmOverlay", "bulkDeleteOverlay", "importExportOverlay"]) {
    expect(await page.locator("#" + id).evaluate((el) => getComputedStyle(el).visibility), id).toBe("hidden");
  }
});
