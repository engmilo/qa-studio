```javascript
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
    await expect(page.locator(`#${id}`)).toBeDisabled();
  }
});

test("demo button generates 16 test cases", async ({ page }) => {
  await page.locator("#demoBtn").click();

  // Wait for results to appear
  await expect(page.locator("#results .test-card")).toHaveCount(16);

  // Results meta should show count
  await expect(page.locator("#resultsMeta")).toContainText("16");

  // Export buttons should now be enabled
  await expect(page.locator("#exportJson")).toBeEnabled();
  await expect(page.locator("#saveProjectBtn")).toBeEnabled();
});

test("search filters test cards", async ({ page }) => {
  await page.locator("#demoBtn").click();

  await expect(page.locator("#results .test-card")).toHaveCount(16);

  // Type in search box
  const searchInput = page.locator("#generatorSearch");
  await searchInput.fill("login");

  // Wait until filtering has taken effect
  const visible = page.locator("#results .test-card");
  await expect(visible).not.toHaveCount(16);

  // Some matching cards should remain
  const count = await visible.count();
  expect(count).toBeGreaterThan(0);
});

test("bulk select and delete test cases", async ({ page }) => {
  await page.locator("#demoBtn").click();

  await expect(page.locator("#results .test-card")).toHaveCount(16);

  // Click first card's checkbox
  await page.locator("#results .test-checkbox").first().click();

  // Select All
  await page.locator("#selectAllBtn").click();

  await expect(page.locator("#selectedCount")).toHaveText("16");

  // Open delete confirmation
  await page.locator("#deleteSelectedBtn").click();

  await expect(page.locator("#bulkDeleteOverlay")).toHaveClass(/visible/);

  // Confirm delete
  await page.locator("#confirmBulkDelete").click();

  // All cards should be gone
  await expect(page.locator("#results .test-card")).toHaveCount(0);
});

test("save to project and verify in projects view", async ({ page }) => {
  await page.locator("#demoBtn").click();

  await expect(page.locator("#results .test-card")).toHaveCount(16);

  // Open save modal
  await page.locator("#saveProjectBtn").click();

  await expect(page.locator("#saveModalOverlay")).toHaveClass(/visible/);

  // Type project name and description, then save
  await page.locator("#projectNameInput").fill("Login Tests");
  await page
    .locator("#projectDescInput")
    .fill("User login feature tests");

  await page.locator("#confirmSaveBtn").click();

  // After save, the textarea and results should be cleared
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
  // Read the existing mock response fixture
  const mockResponse = await (
    await fetch("http://localhost:3333/e2e/mocks/api-response.json")
  ).json();

  // Intercept calls to the AI proxy
  await page.route("**/qa-proxy.eng-milo.workers.dev**", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockResponse),
    });
  });

  // Open API config and provide a dummy key
  await page.locator("#openApiConfigBtn").click();

  await page.locator("#apiKeyInput").fill("sk-test-dummy-key");
  await page.locator("#saveApiConfig").click();

  // Type a feature
  const input = page.locator("#testInput");
  await input.fill("User login with email and password");

  // Click Generate
  await page.locator("#generateBtn").click();

  // Wait for test cards to render
  await expect(page.locator("#results .test-card")).toHaveCount(10);
  await expect(page.locator("#resultsMeta")).toContainText("10");
});
```
