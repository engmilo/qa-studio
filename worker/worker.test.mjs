import test from "node:test";
import assert from "node:assert/strict";
import worker from "./index.mjs";

const ORIGIN = "https://engmilo.github.io";
const KEY = "sk-ant-api03-abcdefghijklmnop";
const good = (over = {}) => ({
  apiKey: KEY, model: "claude-sonnet-4-20250514", max_tokens: 4096,
  system: "You are a QA engineer.", messages: [{ role: "user", content: "Feature: login" }], ...over,
});
const post = (body, headers = {}, env = {}) =>
  worker.fetch(new Request("https://qa-proxy.test/", {
    method: "POST", headers: { Origin: ORIGIN, "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  }), env);

let calls;
const mockUpstream = (status, body) => {
  calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init, sent: JSON.parse(init.body) });
    return new Response(typeof body === "string" ? body : JSON.stringify(body), { status });
  };
};

test("preflight from allowed origin", async () => {
  const r = await worker.fetch(new Request("https://x/", { method: "OPTIONS", headers: { Origin: ORIGIN } }), {});
  assert.equal(r.status, 204);
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), ORIGIN);
});
test("preflight from other origin is refused", async () => {
  const r = await worker.fetch(new Request("https://x/", { method: "OPTIONS", headers: { Origin: "https://evil.example" } }), {});
  assert.equal(r.status, 403);
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), null);
});
test("POST from other origin or without Origin is refused", async () => {
  assert.equal((await post(good(), { Origin: "https://evil.example" })).status, 403);
  const noOrigin = await worker.fetch(new Request("https://x/", { method: "POST", body: JSON.stringify(good()) }), {});
  assert.equal(noOrigin.status, 403);
});
test("GET is refused (405 for allowed origin)", async () => {
  const r = await worker.fetch(new Request("https://x/", { method: "GET", headers: { Origin: ORIGIN } }), {});
  assert.equal(r.status, 405);
});
test("ALLOWED_ORIGINS setting works", async () => {
  mockUpstream(200, { content: [] });
  const r = await post(good(), { Origin: "http://localhost:3333" }, { ALLOWED_ORIGINS: "https://engmilo.github.io, http://localhost:3333" });
  assert.equal(r.status, 200);
});
test("bad JSON, non-object, oversize", async () => {
  assert.equal((await post("{nope")).status, 400);
  assert.equal((await post("[1,2]")).status, 400);
  assert.equal((await post(good({ system: "x".repeat(70000) }))).status, 413);
});
test("missing and malformed API key give 401", async () => {
  const a = await post(good({ apiKey: undefined }));
  assert.equal(a.status, 401);
  assert.match((await a.json()).error.message, /add your own Anthropic API key/);
  assert.equal((await post(good({ apiKey: "hello" }))).status, 401);
  assert.equal((await post(good({ apiKey: 12345 }))).status, 401);
});
test("model, messages and system are validated", async () => {
  assert.equal((await post(good({ model: "gpt-4o" }))).status, 400);
  assert.equal((await post(good({ model: "claude-x; drop" }))).status, 400);
  assert.equal((await post(good({ messages: [] }))).status, 400);
  assert.equal((await post(good({ messages: [{ role: "system", content: "x" }] }))).status, 400);
  assert.equal((await post(good({ messages: [{ role: "user", content: { a: 1 } }] }))).status, 400);
  assert.equal((await post(good({ system: { a: 1 } }))).status, 400);
});
test("forwards only known fields, caps max_tokens, uses the user's key", async () => {
  mockUpstream(200, { content: [{ type: "text", text: "[]" }], stop_reason: "end_turn" });
  const r = await post(good({ max_tokens: 99999, stream: true, tools: [{ name: "x" }], extra: 1 }));
  assert.equal(r.status, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.anthropic.com/v1/messages");
  assert.equal(calls[0].init.headers["x-api-key"], KEY);
  assert.deepEqual(Object.keys(calls[0].sent).sort(), ["max_tokens", "messages", "model", "system"]);
  assert.equal(calls[0].sent.max_tokens, 8192);
  assert.equal(r.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  assert.equal(r.headers.get("Cache-Control"), "no-store");
});
test("max_tokens defaults to 4096 when missing or not an integer", async () => {
  mockUpstream(200, { content: [] });
  await post(good({ max_tokens: undefined }));
  await post(good({ max_tokens: "lots" }));
  assert.equal(calls[0].sent.max_tokens, 4096);
  assert.equal(calls[1].sent.max_tokens, 4096);
});
test("upstream errors keep their real status code", async () => {
  for (const status of [401, 429, 500, 529]) {
    mockUpstream(status, { type: "error", error: { type: "x", message: "m" } });
    const r = await post(good());
    assert.equal(r.status, status);
    assert.equal((await r.json()).type, "error");
  }
});
test("non-JSON upstream answer becomes a clean 502", async () => {
  mockUpstream(502, "<html>Bad gateway</html>");
  const r = await post(good());
  assert.equal(r.status, 502);
  assert.equal((await r.json()).error.type, "api_error");
});
test("network failure to Anthropic becomes a clean 502", async () => {
  globalThis.fetch = async () => { throw new Error("boom"); };
  const r = await post(good());
  assert.equal(r.status, 502);
  assert.equal((await r.json()).error.type, "api_connection_error");
});
