import { test, expect } from "@playwright/test";
import { openApp, mockGenerate, generate } from "./helpers.js";

const OWN_HOSTS = new Set(["127.0.0.1:3333", "qa-proxy.eng-milo.workers.dev"]);
const THIRD_PARTY = /unpkg\.com|cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com/;
const DIRECTIVES = new Set([
  "default-src", "script-src", "style-src", "font-src", "connect-src", "img-src",
  "manifest-src", "worker-src", "object-src", "base-uri", "form-action",
]);

test("app and landing page only talk to our own server and the proxy", async ({ page }) => {
  const hosts = new Set();
  page.on("request", (r) => {
    const u = new URL(r.url());
    if (u.protocol === "http:" || u.protocol === "https:") hosts.add(u.host);
  });
  await mockGenerate(page);
  await openApp(page);
  await page.locator("#demoBtn").click();
  await generate(page, "feature");
  await expect(page.locator("#results .test-card")).toHaveCount(10);
  await page.locator('[data-view="dashboard"]').click();
  await expect(page.locator("#dashContent")).toBeVisible();
  await page.goto("/index.html");
  await expect(page.locator("h1")).toBeVisible();
  const foreign = [...hosts].filter((h) => !OWN_HOSTS.has(h));
  expect(foreign, "unexpected hosts").toEqual([]);
});

for (const file of ["/app.html", "/index.html"]) {
  test(`${file}: no third-party hosts and a well-formed CSP`, async ({ request }) => {
    const html = await (await request.get(file)).text();
    expect(html).not.toMatch(THIRD_PARTY);

    const csp = html.match(/http-equiv=["']Content-Security-Policy["']\s+content="([^"]*)"/i)?.[1];
    expect(csp, "CSP meta tag").toBeTruthy();
    expect(csp).not.toMatch(/script-src[^;]*'unsafe-inline'/);
    expect(csp).toContain("object-src 'none'");
    for (const directive of csp.split(";").map((d) => d.trim()).filter(Boolean)) {
      const [name, ...values] = directive.split(/\s+/);
      expect(DIRECTIVES.has(name), `unknown CSP directive "${name}"`).toBe(true);
      for (const v of values) {
        expect(DIRECTIVES.has(v), `"${v}" looks like a directive inside "${name}" (missing semicolon?)`).toBe(false);
      }
    }
  });
}

test("every script on the app page is loaded from our own vendor folder or app.js", async ({ request }) => {
  const html = await (await request.get("/app.html")).text();
  const srcs = [...html.matchAll(/<script[^>]*\bsrc="([^"]+)"/g)].map((m) => m[1]);
  expect(srcs.length).toBeGreaterThan(0);
  for (const s of srcs) expect(s, s).toMatch(/^(vendor\/|app\.js)/);
  expect(html).not.toMatch(/<script(?![^>]*\bsrc=)[^>]*>/); // no inline scripts
});
