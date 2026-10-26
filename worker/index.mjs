// QA Studio proxy (Cloudflare Worker)
// - Forwards a validated request to the Anthropic Messages API using the key the USER supplies.
// - The Worker holds no key of its own, so it can never spend the owner's budget.
// - Optional setting: ALLOWED_ORIGINS (comma-separated). Default: https://engmilo.github.io

const ANTHROPIC_URL = "https://api.anthropic.com/v1/messages";
const MAX_BODY_CHARS = 64 * 1024;
const MAX_TOKENS_CAP = 8192;
const MODEL_RE = /^claude-[a-z0-9][a-z0-9.-]{0,60}$/i;
const KEY_RE = /^sk-ant-[A-Za-z0-9_-]{10,}$/;

const allowedOrigins = env =>
  (env.ALLOWED_ORIGINS || "https://engmilo.github.io").split(",").map(s => s.trim()).filter(Boolean);

function reply(data, status, origin) {
  const headers = { "Content-Type": "application/json", "Cache-Control": "no-store", Vary: "Origin" };
  if (origin) headers["Access-Control-Allow-Origin"] = origin;
  return new Response(JSON.stringify(data), { status, headers });
}
const fail = (status, type, message, origin) => reply({ type: "error", error: { type, message } }, status, origin);

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const allowed = origin && allowedOrigins(env).includes(origin);

    // CORS preflight
    if (request.method === "OPTIONS") {
      if (!allowed) return new Response(null, { status: 403 });
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Max-Age": "86400",
          Vary: "Origin",
        },
      });
    }

    if (!allowed) return fail(403, "permission_error", "Origin not allowed.", null);
    if (request.method !== "POST") return fail(405, "invalid_request_error", "Use POST.", origin);

    // Read and validate the body
    const declared = Number(request.headers.get("Content-Length") || 0);
    if (declared > MAX_BODY_CHARS) return fail(413, "invalid_request_error", "Request too large.", origin);
    const text = await request.text();
    if (text.length > MAX_BODY_CHARS) return fail(413, "invalid_request_error", "Request too large.", origin);

    let body;
    try { body = JSON.parse(text); } catch { return fail(400, "invalid_request_error", "Body must be valid JSON.", origin); }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return fail(400, "invalid_request_error", "Body must be a JSON object.", origin);
    }

    // The user's own key
    const apiKey = typeof body.apiKey === "string" ? body.apiKey.trim() : "";
    if (!apiKey) {
      return fail(401, "authentication_error", "Please add your own Anthropic API key in API Configuration.", origin);
    }
    if (!KEY_RE.test(apiKey)) {
      return fail(401, "authentication_error", "That does not look like an Anthropic API key (it should start with sk-ant-).", origin);
    }

    // Only pass through the fields the app uses
    if (typeof body.model !== "string" || !MODEL_RE.test(body.model)) {
      return fail(400, "invalid_request_error", "Unsupported model.", origin);
    }
    const maxTokens = Number.isInteger(body.max_tokens) ? Math.min(Math.max(body.max_tokens, 1), MAX_TOKENS_CAP) : 4096;
    if (typeof body.system !== "undefined" && typeof body.system !== "string") {
      return fail(400, "invalid_request_error", "system must be a string.", origin);
    }
    const messages = body.messages;
    const messagesOk =
      Array.isArray(messages) && messages.length >= 1 && messages.length <= 10 &&
      messages.every(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string");
    if (!messagesOk) return fail(400, "invalid_request_error", "messages must be 1-10 text messages.", origin);

    const payload = { model: body.model, max_tokens: maxTokens, messages: messages.map(m => ({ role: m.role, content: m.content })) };
    if (body.system) payload.system = body.system;

    // Call Anthropic and pass the real status code through
    let upstream;
    try {
      upstream = await fetch(ANTHROPIC_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
        body: JSON.stringify(payload),
      });
    } catch {
      return fail(502, "api_connection_error", "Could not reach the Anthropic API.", origin);
    }

    const raw = await upstream.text();
    let data;
    try { data = JSON.parse(raw); } catch { return fail(502, "api_error", "Unexpected response from the Anthropic API.", origin); }
    return reply(data, upstream.status, origin);
  },
};
