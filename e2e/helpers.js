import { expect } from "@playwright/test";
import fs from "fs";
import path from "path";

// Finds your existing API fixture wherever it lives
const CANDIDATES = [
  "e2e/mocks/api-response.json",
  "e2e/fixtures/api-response.json",
  "e2e/api-response.json",
  "api-response.json",
];
const fixturePath = CANDIDATES.map((p) => path.join(process.cwd(), p)).find((p) => fs.existsSync(p));
if (!fixturePath) throw new Error("api-response.json not found. Looked in: " + CANDIDATES.join(", "));

export const API_FIXTURE = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
export const PROXY = /qa-proxy\.eng-milo\.workers\.dev/;

/** Pre-fill localStorage once per tab (a reload does not re-seed). Strings are stored raw. */
export async function seedStorage(page, entries) {
  await page.addInitScript((e) => {
    if (sessionStorage.getItem("__seeded")) return;
    for (const [k, v] of Object.entries(e)) {
      localStorage.setItem(k, typeof v === "string" ? v : JSON.stringify(v));
    }
    sessionStorage.setItem("__seeded", "1");
  }, entries);
}

export async function openApp(page) {
  await page.goto("/app.html");
  await expect(page.locator("#demoBtn")).toBeVisible();
}

/** Mock the Worker. Returns the array that collects each POST body. */
export async function mockGenerate(page, { status = 200, body = API_FIXTURE, abort = false } = {}) {
  const requests = [];
  await page.route(PROXY, async (route) => {
    const req = route.request();
    const cors = {
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "content-type",
      "access-control-allow-methods": "POST, OPTIONS",
    };
    if (req.method() === "OPTIONS") return route.fulfill({ status: 204, headers: cors });
    try { requests.push(req.postDataJSON()); } catch { requests.push(null); }
    if (abort) return route.abort("failed");
    await route.fulfill({
      status,
      contentType: "application/json",
      headers: cors,
      body: typeof body === "string" ? body : JSON.stringify(body),
    });
  });
  return requests;
}

export async function generate(page, text) {
  await page.locator("#testInput").fill(text);
  await page.locator("#generateBtn").click();
}
