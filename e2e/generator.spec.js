import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/app.html");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForLoadState("networkidle");
});

test("initial state shows empty results and disabled buttons", async ({ page }) => {
  const generateBtn = page.locator("#generateBtn");
  await expect(generateBtn).toBeDisabled();

  const demoBtn = page.locator("#demoBtn");
  await expect(demoBtn).toBeEnabled();

  // All export/save buttons start disabled
  for (const id of [
    "exportJson",
    "exportCsv",
    "exportExcel",
    "exportWord",
    "saveProjectBtn",
  ]) {
    await expect(page.locator("#" + id)).toBeDisabled();
  }
});

test("demo button generates 16 test cases", async ({ page }) => {
  await page.locator("#demoBtn").click();

  await expect(page.locator("#results .test-card")).toHaveCount(16);
  await expect(page.locator("#resultsMeta")).toContainText("16");

  await expect(page.locator("#exportJson")).toBeEnabled();
  await expect(page.locator("#saveProjectBtn")).toBeEnabled();
});

test("search filters test cards", async ({ page }) => {
  await page.locator("#demoBtn").click();
  await expect(page.locator("#results .test-card")).toHaveCount(16);

  const searchInput = page.locator("#generatorSearch");
  await searchInput.fill("login");

  const visible = page.locator("#results .test-card");

  // Wait for the search results to change
  await expect(visible).not.toHaveCount(16);

  const count = await visible.count();
  expect(count).toBeGreaterThan(0);
});

test("bulk select and delete test cases", async ({ page }) => {
  await page.locator("#demoBtn").click();
  await expect(page.locator("#results .test-card")).toHaveCount(16);

  // Select the first test case
  await page.locator("#results .test-checkbox").first().click();

  // Select all test cases
  await page.locator("#selectAllBtn").click();
  await expect(page.locator("#selectedCount")).toHaveText("16");

  // Open delete confirmation
  await page.locator("#deleteSelectedBtn").click();
  await expect(page.locator("#bulkDeleteOverlay")).toHaveClass(/visible/);

  // Confirm deletion
  await page.locator("#confirmBulkDelete").click();
  await expect(page.locator("#results .test-card")).toHaveCount(0);
});

test("save to project and verify in projects view", async ({ page }) => {
  await page.locator("#demoBtn").click();
  await expect(page.locator("#results .test-card")).toHaveCount(16);

  // Open save modal
  await page.locator("#saveProjectBtn").click();
  await expect(page.locator("#saveModalOverlay")).toHaveClass(/visible/);

  // Enter project details
  await page.locator("#projectNameInput").fill("Login Tests");
  await page.locator("#projectDescInput").fill("User login feature tests");

  // Save project
  await page.locator("#confirmSaveBtn").click();

  // Verify the input and results are cleared
  await expect(page.locator("#testInput")).toHaveValue("");
  await expect(page.locator("#results .test-card")).toHaveCount(0);

  // Navigate to projects view
  await page.locator('[data-view="projects"]').click();

  await expect(page.locator("#projectsContent")).toContainText("Login Tests");
  await expect(page.locator("#projectsContent")).toContainText(
    "User login feature tests"
  );
  await expect(page.locator("#projectsContent")).toContainText("16");
});

test("generate with mocked API produces test cards", async ({ page }) => {
  // Read the existing mock response from the local fixture server
  const response = await fetch(
    "http://localhost:3333/e2e/mocks/api-response.json"
  );

  if (!response.ok) {
    th

