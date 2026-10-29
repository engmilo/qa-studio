import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { openApp } from "./helpers.js";

// Automated accessibility checks (axe-core, WCAG 2.0/2.1 level A + AA).
// Structure/labels/roles/keyboard rules AND colour contrast must pass.
// (Set A11Y_STRICT_CONTRAST=0 to make contrast report-only while debugging.)
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];
const STRICT_CONTRAST = process.env.A11Y_STRICT_CONTRAST !== "0";

const describeViolations = (violations) =>
  violations.map((v) => `${v.id} [${v.impact}] ${v.help} - ${v.nodes.length} element(s), e.g. ${v.nodes[0].target.join(" ")}`);

async function structure(page) {
  const r = await new AxeBuilder({ page }).withTags(TAGS).disableRules(["color-contrast"]).analyze();
  return describeViolations(r.violations);
}
async function contrast(page, where) {
  const r = await new AxeBuilder({ page }).withRules(["color-contrast"]).analyze();
  return r.violations.flatMap((v) =>
    v.nodes.map((n) => `${where}: ${n.target.join(" ")} - ${(n.any[0] && n.any[0].message) || v.help}`));
}

async function demoAndSave(page, name = "A11y project") {
  await page.locator("#demoBtn").click();
  await expect(page.locator("#results .test-card")).toHaveCount(16);
  await page.locator("#saveProjectBtn").click();
  await page.locator("#projectNameInput").fill(name);
  await page.locator("#confirmSaveBtn").click();
  await expect(page.locator("#results .test-card")).toHaveCount(0);
  await expect(page.locator("#saveModalOverlay")).toBeHidden(); // wait until the fade-out is over
}

test.describe("structure and labels", () => {
  test("landing page", async ({ page }) => {
    await page.goto("/index.html");
    await expect(page.locator("h1")).toBeVisible();
    expect(await structure(page)).toEqual([]);
  });

  test("generator with test cases", async ({ page }) => {
    await openApp(page);
    await page.locator("#demoBtn").click();
    await expect(page.locator("#results .test-card")).toHaveCount(16);
    expect(await structure(page)).toEqual([]);
  });

  test("dashboard, projects, suites and history", async ({ page }) => {
    await openApp(page);
    await demoAndSave(page);
    for (const view of ["dashboard", "projects", "suites", "history"]) {
      await page.locator(`[data-view="${view}"]`).click();
      await expect(page.locator(`#view-${view}`)).toBeVisible();
      expect(await structure(page), `view: ${view}`).toEqual([]);
    }
  });

  test("dialogs: details, edit, API configuration, confirm", async ({ page }) => {
    await openApp(page);
    await page.locator("#demoBtn").click();
    await expect(page.locator("#results .test-card")).toHaveCount(16);

    await page.locator(".clickable-title").first().click();
    await expect(page.locator("#modalOverlay")).toHaveClass(/visible/);
    expect(await structure(page), "details dialog").toEqual([]);
    await page.keyboard.press("Escape");
    await expect(page.locator("#modalOverlay")).toBeHidden();

    await page.locator('[data-action="edit"]').first().click();
    await expect(page.locator("#edit-title")).toBeVisible();
    expect(await structure(page), "edit dialog").toEqual([]);
    await page.keyboard.press("Escape");
    await expect(page.locator("#modalOverlay")).toBeHidden();

    await page.locator("#openApiConfigBtn").click();
    await expect(page.locator("#apiConfigOverlay")).toHaveClass(/visible/);
    expect(await structure(page), "API dialog").toEqual([]);
    await page.keyboard.press("Escape");
    await expect(page.locator("#apiConfigOverlay")).toBeHidden();

    await page.locator("#clearAllBtn").click();
    await expect(page.locator("#confirmOverlay")).toHaveClass(/visible/);
    expect(await structure(page), "confirm dialog").toEqual([]);
  });
});

test.describe("colour contrast", () => {
  for (const theme of ["light", "dark"]) {
    test(`app, ${theme} theme`, async ({ page }) => {
      await openApp(page);
      if (theme === "dark") {
        await page.locator("#themeToggleBtn").click();
        await expect(page.locator("body")).toHaveClass(/dark/);
        await page.waitForTimeout(600); // let the colour transition finish before measuring
      }
      const found = [];
      await page.locator("#demoBtn").click();
      await expect(page.locator("#results .test-card")).toHaveCount(16);
      found.push(...(await contrast(page, `generator/${theme}`)));
      await demoAndSave(page, `Contrast ${theme}`);
      for (const view of ["dashboard", "projects", "history"]) {
        await page.locator(`[data-view="${view}"]`).click();
        await expect(page.locator(`#view-${view}`)).toBeVisible();
        found.push(...(await contrast(page, `${view}/${theme}`)));
      }
      const unique = [...new Set(found)];
      if (unique.length) console.log(`\nCONTRAST (${theme}): ${unique.length} issue(s)\n  ` + unique.join("\n  "));
      if (STRICT_CONTRAST) expect(unique).toEqual([]);
    });
  }

  test("landing page, light and dark", async ({ page }) => {
    await page.goto("/index.html");
    await expect(page.locator("h1")).toBeVisible();
    const found = await contrast(page, "landing/light");
    await page.locator("#themeToggle").click();
    await expect(page.locator("body")).toHaveClass(/dark/);
    await page.waitForTimeout(700); // the cards fade between themes; measure after that
    found.push(...(await contrast(page, "landing/dark")));
    const unique = [...new Set(found)];
    if (unique.length) console.log(`\nCONTRAST (landing): ${unique.length} issue(s)\n  ` + unique.join("\n  "));
    if (STRICT_CONTRAST) expect(unique).toEqual([]);
  });
});
