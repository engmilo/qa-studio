import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/index.html");
  await expect(page.locator("h1")).toBeVisible();
});

test("How it Works shows four steps, API key first, and the real test case count", async ({ page }) => {
  await expect(page.locator(".step")).toHaveCount(4);
  await expect(page.locator('[data-i18n="step1Title"]')).toHaveText("Add Your API Key");
  await expect(page.locator('[data-i18n="step3Desc"]')).toContainText("14–18");
  await expect(page.locator('[data-i18n="howSub"]')).toContainText("Four");
  const body = page.locator("body");
  await expect(body).not.toContainText("random story");
  await expect(body).not.toContainText("Opus");
  await expect(body).not.toContainText("shared API key");
});

test("the Finnish text matches the new steps too", async ({ page }) => {
  await page.locator('.nav-lang button[data-lang="fi"]').click();
  await expect(page.locator('[data-i18n="step1Title"]')).toHaveText("Lisää API-avaimesi");
  await expect(page.locator('[data-i18n="step3Desc"]')).toContainText("14–18");
  await expect(page.locator('[data-i18n="faq1a"]')).toContainText("Kyllä");
});

test("FAQ: the API key answer is consistent (a key is required)", async ({ page }) => {
  await expect(page.locator('[data-i18n="faq1a"]')).toContainText("Yes");
});

test("FAQ buttons expose aria-expanded and keep it in sync", async ({ page }) => {
  const first = page.locator(".faq-q").first();
  await expect(first).toHaveAttribute("aria-expanded", "false");
  await first.click();
  await expect(first).toHaveAttribute("aria-expanded", "true");
  await first.click();
  await expect(first).toHaveAttribute("aria-expanded", "false");
});

test("link previews use absolute image URLs", async ({ page }) => {
  for (const sel of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
    const content = await page.locator(sel).getAttribute("content");
    expect(content, sel).toMatch(/^https:\/\//);
  }
});

test("the page no longer carries the ignored cache meta tags", async ({ page }) => {
  await expect(page.locator('meta[http-equiv="Pragma"], meta[http-equiv="Expires"]')).toHaveCount(0);
});
