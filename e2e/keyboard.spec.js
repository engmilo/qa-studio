import { test, expect } from "@playwright/test";
import { openApp } from "./helpers.js";

async function demo(page) {
  await openApp(page);
  await page.locator("#demoBtn").click();
  await expect(page.locator("#results .test-card")).toHaveCount(16);
}

test("skip link appears on the first Tab and jumps to the main area", async ({ page }) => {
  await openApp(page);
  await page.keyboard.press("Tab");
  const skip = page.locator(".skip-link");
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
});

test("navigating moves focus to the page heading and marks the current page", async ({ page }) => {
  await openApp(page);
  await expect(page.locator('[data-view="generator"]')).toHaveAttribute("aria-current", "page");
  await page.locator('[data-view="history"]').click();
  await expect(page.locator("#pageTitle")).toBeFocused();
  await expect(page.locator('[data-view="history"]')).toHaveAttribute("aria-current", "page");
  await expect(page.locator('[data-view="generator"]')).not.toHaveAttribute("aria-current", "page");
});

test("a test case title opens with Enter, Escape closes it and focus returns", async ({ page }) => {
  await demo(page);
  const title = page.locator(".clickable-title").first();
  await title.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#modalOverlay")).toHaveClass(/visible/);
  await page.keyboard.press("Escape");
  await expect(page.locator("#modalOverlay")).not.toHaveClass(/visible/);
  await expect(title).toBeFocused();
});

test("checkbox: Space toggles it and keeps the focus", async ({ page }) => {
  await demo(page);
  const first = page.locator(".test-checkbox").first();
  const id = await first.getAttribute("data-id");
  await first.focus();
  await page.keyboard.press("Space");
  const same = page.locator(`.test-checkbox[data-id="${id}"]`);
  await expect(same).toHaveAttribute("aria-checked", "true");
  await expect(same).toBeFocused();
  await expect(page.locator("#selectedCount")).toHaveText("1");
});

test("move down and up work without a mouse, and the focus follows the card", async ({ page }) => {
  await demo(page);
  const headings = page.locator(".test-card h3");
  const firstId = (await headings.first().innerText()).split(" — ")[0].trim();
  const firstCard = page.locator(".test-card").first();
  await expect(firstCard.locator('[data-action="up"]')).toBeDisabled();

  await firstCard.locator('[data-action="down"]').focus();
  await page.keyboard.press("Enter");
  await expect(headings.nth(1)).toContainText(firstId);
  await expect(page.locator(`[data-focus-key="${firstId}:down"]`)).toBeFocused();

  await page.keyboard.press("Tab"); // Edit button of the same card ...
  await page.keyboard.press("Shift+Tab"); // ... and back
  await page.keyboard.press("Shift+Tab"); // Up button
  await page.keyboard.press("Enter");
  await expect(headings.first()).toContainText(firstId);
});

test("status buttons report on/off to assistive technology", async ({ page }) => {
  await demo(page);
  const pass = page.locator(".test-card").first().locator(".pass-btn");
  const before = await pass.getAttribute("aria-pressed");
  await pass.click();
  await expect(pass).toHaveAttribute("aria-pressed", before === "true" ? "false" : "true");
});

test("the generator search box has the right name", async ({ page }) => {
  await demo(page);
  await expect(page.getByLabel("Search test cases")).toBeVisible();
});

test("API dialog: named dialog, Escape closes it, focus returns, closed dialog is unreachable", async ({ page }) => {
  await openApp(page);
  await expect(page.locator("#apiConfigClose")).toBeHidden();
  const opener = page.locator("#openApiConfigBtn");
  await opener.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "API Configuration" });
  await expect(dialog).toBeVisible();
  await expect(page.getByLabel("Max Tokens")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

test("confirm dialog is translated and Escape answers it", async ({ page }) => {
  await openApp(page);
  await page.locator('#langFlags .lang-btn[data-lang="fi"]').click();
  await expect(page.locator('#langFlags .lang-btn[data-lang="fi"]')).toHaveAttribute("aria-pressed", "true");
  await page.locator("#clearAllBtn").click();
  const dialog = page.getByRole("dialog", { name: "Vahvista" });
  await expect(dialog).toBeVisible();
  await expect(page.locator("#confirmCancel")).toHaveText("Peruuta");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await page.locator("#clearAllBtn").click(); // a second dialog must open normally
  await expect(dialog).toBeVisible();
  await page.locator("#confirmCancel").click();
  await expect(dialog).toBeHidden();
});

test("edit dialog: fields have labels and focus returns to the Edit button", async ({ page }) => {
  await demo(page);
  const firstId = (await page.locator(".test-card h3").first().innerText()).split(" — ")[0].trim();
  await page.locator(`[data-focus-key="${firstId}:edit"]`).focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Edit Test Case" });
  await expect(dialog).toBeVisible();
  await page.getByLabel("Title", { exact: true }).fill("Renamed by keyboard");
  await expect(page.getByLabel("Tags (comma separated)")).toBeVisible();
  await page.locator("#edit-save").click();
  await expect(page.locator(".test-card h3").first()).toContainText("Renamed by keyboard");
  await expect(page.locator(`[data-focus-key="${firstId}:edit"]`)).toBeFocused();
});
