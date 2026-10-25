import { test, expect } from "@playwright/test";
import { openApp, seedStorage } from "./helpers.js";

test.use({ timezoneId: "UTC" });

const cards = (page) => page.locator("#results .test-card");
const kpi = (page, label) =>
  page.locator(".ent-card", { hasText: label }).locator(".ent-card-v");

async function saveDemoAs(page, name) {
  await page.locator("#demoBtn").click();
  await expect(cards(page)).toHaveCount(16);
  await page.locator("#saveProjectBtn").click();
  await page.locator("#projectNameInput").fill(name);
  await page.locator("#confirmSaveBtn").click();
  await expect(cards(page)).toHaveCount(0);
}

test.beforeEach(async ({ page }) => {
  await openApp(page);
});

test("dashboard shows the empty state when there is no data", async ({ page }) => {
  await page.locator('[data-view="dashboard"]').click();
  await expect(page.locator("#dashContent")).toContainText("No test cases yet");
});

test("dashboard KPIs add up after saving a demo project", async ({ page }) => {
  await saveDemoAs(page, "E2E Dashboard");
  await page.locator('[data-view="dashboard"]').click();
  await expect(kpi(page, "Total Test Cases")).toHaveText("16");
  const n = async (l) => Number(await kpi(page, l).innerText());
  const sum = (await n("Passed")) + (await n("Failed")) + (await n("Blocked")) + (await n("Untested"));
  expect(sum).toBe(16);
});

test("dashboard KPIs match seeded data exactly", async ({ page }) => {
  const d = new Date().toISOString().slice(0, 10);
  const tc = (id, status, priority) => ({ id, title: `T ${id}`, status, priority, createdAt: d });
  await seedStorage(page, {
    qa_projects: [{
      id: 1, name: "P", description: "", created: d,
      testCases: [
        tc("TC-001", "pass", "Critical"), tc("TC-002", "pass", "High"),
        tc("TC-003", "fail", "Low"), tc("TC-004", "blocked", "Trivial"), tc("TC-005", null, "Medium"),
      ],
    }],
    qa_usage_total: "5",
  });
  await openApp(page);
  await page.locator('[data-view="dashboard"]').click();
  await expect(kpi(page, "Total Test Cases")).toHaveText("5");
  await expect(kpi(page, "Passed")).toHaveText("2");
  await expect(kpi(page, "Failed")).toHaveText("1");
  await expect(kpi(page, "Blocked")).toHaveText("1");
  await expect(kpi(page, "Untested")).toHaveText("1");
});

test("project row opens a detail modal that closes again", async ({ page }) => {
  await saveDemoAs(page, "Regression Suite");
  await page.locator('[data-view="projects"]').click();
  await expect(page.locator("#projectsContent")).toContainText("Regression Suite");
  await page.locator("#projectsContent tr.clickable").first().click();
  await expect(page.locator("#modalOverlay")).toHaveClass(/visible/);
  await expect(page.locator("#modalTitle")).toContainText("Regression Suite");
  await page.locator("#modalClose").click();
  await expect(page.locator("#modalOverlay")).not.toHaveClass(/visible/);
});

test("suites view lists every saved project", async ({ page }) => {
  await saveDemoAs(page, "Suite A");
  await saveDemoAs(page, "Suite B");
  await page.locator('[data-view="suites"]').click();
  await expect(page.locator("#suitesContent")).toContainText("Suite A");
  await expect(page.locator("#suitesContent")).toContainText("Suite B");
});

test("history records the demo run and can be cleared", async ({ page }) => {
  await page.locator("#demoBtn").click();
  await expect(cards(page)).toHaveCount(16);
  await page.locator('[data-view="history"]').click();
  await expect(page.locator("#historyContent")).toContainText("Demo");
  await page.locator("#clearHistoryBtn").click();
  await expect(page.locator("#historyContent")).toContainText("No history yet");
});

test("language toggle switches the UI to Finnish and back", async ({ page }) => {
  await page.locator('#langFlags .lang-btn[data-lang="fi"]').click();
  await expect(page.locator("#pageTitle")).toHaveText("Generaattori");
  await page.locator('#langFlags .lang-btn[data-lang="en"]').click();
  await expect(page.locator("#pageTitle")).toHaveText("Generator");
});

test("theme toggle switches mode and survives a reload", async ({ page }) => {
  await page.locator("#themeToggleBtn").click();
  await expect(page.locator("body")).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator("body")).toHaveClass(/dark/);
  await page.locator("#themeToggleBtn").click();
  await expect(page.locator("body")).toHaveClass(/light/);
});
