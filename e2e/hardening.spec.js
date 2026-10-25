import { test, expect } from "@playwright/test";
import fs from "fs";
import { openApp, seedStorage, mockGenerate, generate, API_FIXTURE } from "./helpers.js";

const pageErrors = [];
const cspErrors = [];

test.beforeEach(async ({ page }) => {
  pageErrors.length = 0;
  cspErrors.length = 0;
  page.on("pageerror", (e) => pageErrors.push(e.message));
  page.on("console", (m) => { if (/content security policy/i.test(m.text())) cspErrors.push(m.text()); });
});
test.afterEach(() => {
  expect(pageErrors, "uncaught page errors").toEqual([]);
  expect(cspErrors, "CSP violations").toEqual([]);
});

const asBody = (cases, extra = {}) => ({ content: [{ type: "text", text: JSON.stringify(cases) }], ...extra });

test("AI output with quotes and markup stays inert text", async ({ page }) => {
  await openApp(page);
  const evil = [{
    id: "TC-001",
    title: 'x" onmouseover="window.__pwned=1" data-x="',
    description: "<img src=x onerror=window.__pwned=1>",
    steps: ["<b>s1</b>", 'q"uote'],
    expected: "ok", priority: "High",
    tags: ['"><svg onload=window.__pwned=1>', "t2"], risk: "r",
  }];
  await mockGenerate(page, { body: asBody(evil) });
  await generate(page, "anything");
  await expect(page.locator("#results .test-card")).toHaveCount(1);
  await page.locator('[data-action="edit"]').first().click();
  await expect(page.locator("#edit-title")).toHaveValue(evil[0].title);
  await expect(page.locator("#edit-desc")).toHaveValue(evil[0].description);
  await expect(page.locator("#edit-tags")).toHaveValue(evil[0].tags.join(", "));
  await expect(page.locator(".edit-step-input").nth(1)).toHaveValue('q"uote');
  await expect(page.locator('img[src="x"]')).toHaveCount(0);
  await expect(page.locator("[data-x]")).toHaveCount(0);
  expect(await page.evaluate(() => window.__pwned)).toBeUndefined();
});

test("API key is sent to the proxy but never persisted", async ({ page }) => {
  await openApp(page);
  const requests = await mockGenerate(page);
  const key = "sk-ant-test-1234567890";
  await page.locator("#openApiConfigBtn").click();
  await page.locator("#apiKeyInput").fill(key);
  await page.locator("#saveApiConfig").click();
  await generate(page, "feature");
  await expect(page.locator("#results .test-card")).toHaveCount(10);
  expect(requests[0].apiKey).toBe(key);
  const dump = await page.evaluate(() => JSON.stringify({ ...localStorage, ...sessionStorage }));
  expect(dump).not.toContain("sk-ant-test");
});

test("import escapes project names and normalizes bad shapes", async ({ page }) => {
  await openApp(page);
  const evilName = 'A" selected data-x="<b>';
  const data = {
    version: 2, usageTotal: 3, history: [], latestTestCases: [],
    projects: [{
      id: 1, name: evilName, description: "<i>d</i>", created: "2026-01-01",
      testCases: [{ id: 'TC-1" x="', title: "t", priority: "High", status: "pass", createdAt: "2026-01-01" }],
    }],
  };
  await page.locator("#importFileInput").setInputFiles({
    name: "backup.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify(data)),
  });
  await page.locator("#confirmOk").click();
  await page.locator('[data-view="dashboard"]').click();
  const options = page.locator("#entProjFilter option");
  await expect(options).toHaveText(["All Projects", evilName]);
  expect(await options.nth(1).getAttribute("value")).toBe(evilName);
  await expect(page.locator("[data-x]")).toHaveCount(0);
  await page.locator('[data-view="projects"]').click();
  await expect(page.locator("#projectsContent")).toContainText(evilName);
});

test("import rejects unsupported versions", async ({ page }) => {
  await openApp(page);
  await page.locator("#importFileInput").setInputFiles({
    name: "old.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify({ version: 1 })),
  });
  await expect(page.locator("#toastContainer")).toContainText("Failed to parse import file");
});

test("corrupted localStorage does not break the app", async ({ page }) => {
  await seedStorage(page, { qa_projects: "not json{", qa_history: "[[", qa_latest_tests: "oops" });
  await openApp(page);
  await page.locator("#demoBtn").click();
  await expect(page.locator("#results .test-card")).toHaveCount(16);
});

test("CSV export: BOM present and formulas neutralised", async ({ page }) => {
  await openApp(page);
  const cases = [
    { id: "TC-001", title: '=HYPERLINK("http://example.com","x")', priority: "High", steps: ["a"], expected: "e" },
    { id: "TC-002", title: "normal", priority: "Low", steps: ["a"], expected: "e" },
  ];
  await mockGenerate(page, { body: asBody(cases) });
  await generate(page, "feature");
  await expect(page.locator("#results .test-card")).toHaveCount(2);
  const [download] = await Promise.all([page.waitForEvent("download"), page.locator("#exportCsv").click()]);
  const text = fs.readFileSync(await download.path(), "utf8");
  expect(text.startsWith("\uFEFF")).toBe(true);
  expect(text).toContain(`"'=HYPERLINK(`);
  expect(text).not.toMatch(/"=HYPERLINK/);
});

test("an invalid stored model falls back to a valid default", async ({ page }) => {
  await seedStorage(page, { qa_api_config: { url: "", model: "bogus-model", tokens: 4096 } });
  await openApp(page);
  const requests = await mockGenerate(page);
  await page.locator("#openApiConfigBtn").click();
  await expect(page.locator("#apiModelInput")).toHaveValue("claude-sonnet-4-20250514");
  await page.locator("#apiConfigClose").click();
  await generate(page, "feature");
  await expect(page.locator("#results .test-card")).toHaveCount(10);
  expect(requests[0].model).toBe("claude-sonnet-4-20250514");
});

test("switching language keeps the typed text", async ({ page }) => {
  await openApp(page);
  await page.locator("#testInput").fill("keep me");
  await page.locator('#langFlags .lang-btn[data-lang="fi"]').click();
  await expect(page.locator("#pageTitle")).toHaveText("Generaattori");
  await expect(page.locator("#testInput")).toHaveValue("keep me");
});

test("a response cut off at max_tokens shows a warning", async ({ page }) => {
  await openApp(page);
  const partial = JSON.parse(API_FIXTURE.content[0].text).slice(0, 3);
  await mockGenerate(page, { body: asBody(partial, { stop_reason: "max_tokens" }) });
  await generate(page, "feature");
  await expect(page.locator("#results .test-card")).toHaveCount(3);
  await expect(page.locator("#toastContainer")).toContainText("cut off");
});

test("Retry works without inline handlers (CSP-safe)", async ({ page }) => {
  await openApp(page);
  const requests = await mockGenerate(page, { status: 500, body: { error: "x" } });
  await generate(page, "feature");
  await page.locator("#retryBtn").click();
  await expect.poll(() => requests.length).toBe(2);
});
