import { test, expect } from "@playwright/test";
import fs from "fs";

test.beforeEach(async ({ page }) => {
  await page.goto("/app.html");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("initial state shows empty results and disabled buttons", async ({ page }) => {
  await expect(page.locator("#generateBtn")).toBeDisabled();
  await expect(page.locator("#demoBtn")).toBeEnabled();

  for (const id of ["exportJson", "exportCsv", "exportExcel", "exportWord", "saveProjectBtn"]) {
    await expect(page.locator(`#${id}`)).toBeDisabled();
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

  await page.locator("#generatorSearch").fill("login");
  // wait for debounce to filter
  await expect(page.locator("#results .test-card:visible")).not.toHaveCount(16);
  const visibleCount = await page.locator("#results .test-card:visible").count();
  expect(visibleCount).toBeGreaterThan(0);
  expect(visibleCount).toBeLessThan(16);
});

test("bulk select and delete test cases", async ({ page }) => {
  await page.locator("#demoBtn").click();
  await expect(page.locator("#results .test-card")).toHaveCount(16);

  await page.locator("#results .test-checkbox").first().click();
  await page.locator("#selectAllBtn").click();
  await expect(page.locator("#selectedCount")).toHaveText("16");

  await page.locator("#deleteSelectedBtn").click();
  await expect(page.locator("#bulkDeleteOverlay")).toHaveClass(/visible/);

  await page.locator("#confirmBulkDelete").click();
  await expect(page.locator("#results .test-card")).toHaveCount(0);
});

test("save to project and verify in projects view", async ({ page }) => {
  await page.locator("#demoBtn").click();
  await expect(page.locator("#results .test-card")).toHaveCount(16);

  await page.locator("#saveProjectBtn").click();
  await expect(page.locator("#saveModalOverlay")).toHaveClass(/visible/);

  await page.locator("#projectNameInput").fill("Login Tests");
  await page.locator("#projectDescInput").fill("User login feature tests");
  await page.locator("#confirmSaveBtn").click();

  await expect(page.locator("#testInput")).toHaveValue("");
  await expect(page.locator("#results .test-card")).toHaveCount(0);

  await page.locator('[data-view="projects"]').click();
  await expect(page.locator("#projectsContent")).toContainText("Login Tests");
  await expect(page.locator("#projectsContent")).toContainText("User login feature tests");
  await expect(page.locator("#projectsContent")).toContainText("16");
});

test("generate with mocked API produces test cards", async ({ page }) => {
  const mockResponse = JSON.parse(fs.readFileSync("e2e/mocks/api-response.json", "utf8"));

  await page.route("**/qa-proxy.eng-milo.workers.dev/**", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockResponse),
    });
  });

  await page.locator("#openApiConfigBtn").click();
  await expect(page.locator("#apiKeyInput")).toBeVisible();
  await page.locator("#apiKeyInput").fill("sk-test-dummy-key");
  await page.locator("#saveApiConfig").click();

  await page.locator("#testInput").fill("User login with email and password");
  await page.locator("#generateBtn").click();

  await expect(page.locator("#results .test-card")).toHaveCount(10);
  await expect(page.locator("#resultsMeta")).toContainText("10");
});
