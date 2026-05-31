import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/app.html");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForLoadState("networkidle");
});

test("dashboard shows empty state when no data", async ({ page }) => {
  await page.locator('[data-view="dashboard"]').click();
  await expect(page.locator("#dashContent")).toContainText("No test cases yet");
});

test("demo populates dashboard with correct data", async ({ page }) => {
  // Generate demo data
  await page.locator("#demoBtn").click();
  await expect(page.locator("#results .test-card")).toHaveCount(16);

  // Save to project so dashboard includes project tests
  await page.locator("#saveProjectBtn").click();
  await page.locator("#projectNameInput").fill("E2E Dashboard");
  await page.locator("#confirmSaveBtn").click();
  await page.waitForTimeout(200);

  // Navigate to dashboard
  await page.locator('[data-view="dashboard"]').click();

  // Dashboard should show data
  await expect(page.locator("#dashContent")).toContainText("16");
  await expect(page.locator("#dashContent")).toContainText("This Week");
});

test("projects view shows saved project with test details", async ({ page }) => {
  // Generate demo and save
  await page.locator("#demoBtn").click();
  await expect(page.locator("#results .test-card")).toHaveCount(16);

  await page.locator("#saveProjectBtn").click();
  await page.locator("#projectNameInput").fill("Regression Suite");
  await page.locator("#confirmSaveBtn").click();
  await page.waitForTimeout(200);

  // Go to projects view
  await page.locator('[data-view="projects"]').click();
  await expect(page.locator("#projectsContent")).toContainText("Regression Suite");

  // Click the project row to see detail modal
  await page.locator("#projectsContent tr.clickable").first().click();
  await expect(page.locator("#modalOverlay")).toHaveClass(/visible/);
  await expect(page.locator("#modalTitle")).toContainText("Regression Suite");

  // Close modal
  await page.locator("#modalClose").click();
  await expect(page.locator("#modalOverlay")).not.toHaveClass(/visible/);
});

test("suites view groups test cases by project", async ({ page }) => {
  // Generate and save two projects
  await page.locator("#demoBtn").click();
  await expect(page.locator("#results .test-card")).toHaveCount(16);
  await page.locator("#saveProjectBtn").click();
  await page.locator("#projectNameInput").fill("Suite A");
  await page.locator("#confirmSaveBtn").click();
  await page.waitForTimeout(200);

  // Generate another demo and save as second project
  await page.locator("#demoBtn").click();
  await expect(page.locator("#results .test-card")).toHaveCount(16);
  await page.locator("#saveProjectBtn").click();
  await page.locator("#projectNameInput").fill("Suite B");
  await page.locator("#confirmSaveBtn").click();
  await page.waitForTimeout(200);

  // Navigate to suites
  await page.locator('[data-view="suites"]').click();
  await expect(page.locator("#suitesContent")).toContainText("Suite A");
  await expect(page.locator("#suitesContent")).toContainText("Suite B");
});

test("history records demo generation", async ({ page }) => {
  await page.locator("#demoBtn").click();
  await expect(page.locator("#results .test-card")).toHaveCount(16);

  // Navigate to history
  await page.locator('[data-view="history"]').click();
  await expect(page.locator("#historyContent")).toContainText("Demo");

  // Clear history
  await page.locator("#clearHistoryBtn").click();
  await page.waitForTimeout(200);
  await expect(page.locator("#historyContent")).toContainText("No history yet");
});

test("language toggle changes app UI language", async ({ page }) => {
  // Switch to Finnish
  await page.locator('#langFlags .lang-btn[data-lang="fi"]').click();
  await expect(page.locator("#pageTitle")).toContainText("Generaattori");

  // Switch back to English
  await page.locator('#langFlags .lang-btn[data-lang="en"]').click();
  await expect(page.locator("#pageTitle")).toContainText("Generator");
});

test("theme toggle switches mode", async ({ page }) => {
  await page.locator("#themeToggleBtn").click();
  let isDark = await page.evaluate(() => document.body.classList.contains("dark"));
  expect(isDark).toBe(true);

  await page.locator("#themeToggleBtn").click();
  isDark = await page.evaluate(() => document.body.classList.contains("dark"));
  expect(isDark).toBe(false);
});
