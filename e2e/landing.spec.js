import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/index.html");
  // Clear persisted state from previous tests
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForLoadState("networkidle");
});

test("landing page loads and shows correct title", async ({ page }) => {
  await expect(page.locator("h1")).toContainText("QA Studio");
});

test("CTA button links to app.html", async ({ page }) => {
  const heroCta = page.locator(".hero-btn");
  await expect(heroCta).toHaveAttribute("href", "app.html");
  const navCta = page.locator(".nav-cta");
  await expect(navCta).toHaveAttribute("href", "app.html");
});

test("language toggle switches to Finnish and back", async ({ page }) => {
  const fiBtn = page.locator('.nav-lang button[data-lang="fi"]');
  const enBtn = page.locator('.nav-lang button[data-lang="en"]');

  // Switch to FI
  await fiBtn.click();
  await expect(page.locator("h1")).toContainText("QA Studio");
  await expect(page.locator('[data-i18n="heroCta"]')).toContainText("Aloita");

  // Switch back to EN
  await enBtn.click();
  await expect(page.locator('[data-i18n="heroCta"]')).toContainText("Get Started");
});

test("theme toggle switches to dark mode", async ({ page }) => {
  const themeBtn = page.locator("#themeToggle");
  await themeBtn.click();
  const isDark = await page.evaluate(() => document.body.classList.contains("dark"));
  expect(isDark).toBe(true);
});

test("navigate to app.html from hero CTA", async ({ page }) => {
  await page.locator(".hero-btn").click();
  await page.waitForURL("**/app.html");
  await expect(page.locator("#pageTitle")).toContainText("Generator");
});
