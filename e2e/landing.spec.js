import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/index.html");
  await expect(page.locator("h1")).toBeVisible();
});

test("page title and hero heading", async ({ page }) => {
  await expect(page).toHaveTitle("QA Studio");
  await expect(page.locator("h1")).toContainText("QA Studio");
});

test("both CTAs link to app.html", async ({ page }) => {
  await expect(page.locator(".hero-btn")).toHaveAttribute("href", "app.html");
  await expect(page.locator(".nav-cta")).toHaveAttribute("href", "app.html");
});

test("language toggle translates the page and persists across reload", async ({ page }) => {
  await page.locator('.nav-lang button[data-lang="fi"]').click();
  await expect(page.locator('[data-i18n="heroCta"]')).toHaveText("Aloita");
  await expect(page.locator("html")).toHaveAttribute("lang", "fi");
  await page.reload();
  await expect(page.locator('[data-i18n="heroCta"]')).toHaveText("Aloita");
  await page.locator('.nav-lang button[data-lang="en"]').click();
  await expect(page.locator('[data-i18n="heroCta"]')).toHaveText("Get Started");
});

test("theme toggle switches to dark and persists", async ({ page }) => {
  await page.locator("#themeToggle").click();
  await expect(page.locator("body")).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator("body")).toHaveClass(/dark/);
});

test("language chosen on the landing page carries into the app", async ({ page }) => {
  await page.locator('.nav-lang button[data-lang="fi"]').click();
  await page.locator(".hero-btn").click();
  await page.waitForURL("**/app.html");
  await expect(page.locator("#pageTitle")).toHaveText("Generaattori");
});
