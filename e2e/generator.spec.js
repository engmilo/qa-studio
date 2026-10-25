import { test, expect } from "@playwright/test";
import { openApp, mockGenerate, generate } from "./helpers.js";

const cards = (page) => page.locator("#results .test-card");

test.beforeEach(async ({ page }) => {
  await openApp(page);
});

test("initial state: Generate disabled, Demo enabled, exports disabled", async ({ page }) => {
  await expect(page.locator("#generateBtn")).toBeDisabled();
  await expect(page.locator("#demoBtn")).toBeEnabled();
  for (const id of ["exportJson", "exportCsv", "exportExcel", "exportWord", "saveProjectBtn"]) {
    await expect(page.locator(`#${id}`)).toBeDisabled();
  }
});

test("demo generates 16 cards and enables export/save", async ({ page }) => {
  await page.locator("#demoBtn").click();
  await expect(cards(page)).toHaveCount(16);
  await expect(page.locator("#resultsMeta")).toContainText("16");
  await expect(page.locator("#exportJson")).toBeEnabled();
  await expect(page.locator("#saveProjectBtn")).toBeEnabled();
});

test("search by id is deterministic (tc-01 matches TC-010..TC-016)", async ({ page }) => {
  await page.locator("#demoBtn").click();
  await expect(cards(page)).toHaveCount(16);
  await page.locator("#generatorSearch").fill("tc-01");
  await expect(cards(page)).toHaveCount(7);
  await page.locator("#generatorSearchClear").click();
  await expect(cards(page)).toHaveCount(16);
});

test("bulk select and delete", async ({ page }) => {
  await page.locator("#demoBtn").click();
  await expect(cards(page)).toHaveCount(16);
  await page.locator("#results .test-checkbox").first().click();
  await expect(page.locator("#bulkActions")).toHaveClass(/visible/);
  await page.locator("#selectAllBtn").click();
  await expect(page.locator("#selectedCount")).toHaveText("16");
  await page.locator("#deleteSelectedBtn").click();
  await expect(page.locator("#bulkDeleteOverlay")).toHaveClass(/visible/);
  await page.locator("#confirmBulkDelete").click();
  await expect(cards(page)).toHaveCount(0);
  await expect(page.locator("#exportJson")).toBeDisabled();
});

test("save to project shows it in Projects with its test count", async ({ page }) => {
  await page.locator("#demoBtn").click();
  await expect(cards(page)).toHaveCount(16);
  await page.locator("#saveProjectBtn").click();
  await expect(page.locator("#saveModalOverlay")).toHaveClass(/visible/);
  await page.locator("#projectNameInput").fill("Login Tests");
  await page.locator("#projectDescInput").fill("User login feature tests");
  await page.locator("#confirmSaveBtn").click();
  await expect(cards(page)).toHaveCount(0);
  await page.locator('[data-view="projects"]').click();
  await expect(page.locator("#projectsContent")).toContainText("Login Tests");
  await expect(page.locator("#projectsContent")).toContainText("User login feature tests");
  await expect(page.locator("#projectsContent")).toContainText("16 tests");
});

test("mocked API: 10 cards, Critical first, request has model/tokens/feature", async ({ page }) => {
  const requests = await mockGenerate(page);
  await generate(page, "User login with email and password");
  await expect(cards(page)).toHaveCount(10);
  await expect(cards(page).nth(0).locator("h3")).toContainText("TC-001");
  await expect(cards(page).nth(2).locator("h3")).toContainText("TC-010");
  expect(requests).toHaveLength(1);
  expect(requests[0]).toMatchObject({ model: expect.any(String), max_tokens: expect.any(Number) });
  expect(requests[0].messages[0].content).toContain("User login");
});

for (const [status, text] of [
  [429, /Rate limit reached/],
  [401, /authentication failed/],
  [500, /AI server encountered an error/],
]) {
  test(`HTTP ${status}: friendly error, no cards, Generate re-enabled`, async ({ page }) => {
    await mockGenerate(page, { status, body: { error: "x" } });
    await generate(page, "some feature");
    await expect(page.locator("#results")).toContainText(text);
    await expect(cards(page)).toHaveCount(0);
    await expect(page.locator("#generateBtn")).toBeEnabled();
  });
}

test("network failure shows the connectivity message", async ({ page }) => {
  await mockGenerate(page, { abort: true });
  await generate(page, "some feature");
  await expect(page.locator("#results")).toContainText("Could not reach the AI service");
  await expect(page.locator("#generateBtn")).toBeEnabled();
});
