import { test, expect } from "@playwright/test";
import { openApp } from "./helpers.js";

test("app: hamburger opens the drawer, navigation closes it", async ({ page }) => {
  await openApp(page);
  await page.locator("#hamburgerBtn").click();
  await expect(page.locator(".sidebar")).toHaveClass(/open/);
  await page.locator('[data-view="history"]').click();
  await expect(page.locator("#pageTitle")).toHaveText("History");
  await expect(page.locator(".sidebar")).not.toHaveClass(/open/);
});

test("app: Demo works on a phone viewport", async ({ page }) => {
  await openApp(page);
  await page.locator("#demoBtn").click();
  await expect(page.locator("#results .test-card")).toHaveCount(16);
});

test("landing: mobile menu opens", async ({ page }) => {
  await page.goto("/index.html");
  await page.locator("#mobileToggle").click();
  await expect(page.locator("#navLinks")).toHaveClass(/open/);
});
