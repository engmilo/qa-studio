const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = Number(process.env.PORT) || 3333;
const HOST = "127.0.0.1";
const ROOT = path.resolve(__dirname, "..");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webmanifest": "application/manifest+json",
  ".ico": "image/x-icon",
};

const send = (res, code, body) => {
  res.writeHead(code, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(body);
};

http
  .createServer((req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    } catch {
      return send(res, 400, "Bad Request");
    }
    if (pathname.includes("\0")) return send(res, 400, "Bad Request");
    if (pathname === "/") pathname = "/app.html";

    const file = path.join(ROOT, pathname);
    if (!file.startsWith(ROOT + path.sep)) return send(res, 403, "Forbidden");
    // never serve dotfiles/folders (.git, .github, .env ...)
    if (path.relative(ROOT, file).split(path.sep).some((seg) => seg.startsWith("."))) {
      return send(res, 404, "Not Found");
    }

    fs.readFile(file, (err, data) => {
      if (err) return send(res, 404, "Not Found");
      res.writeHead(200, {
        "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream",
        "Cache-Control": "no-cache",
      });
      res.end(data);
    });
  })
  .listen(PORT, HOST, () => process.stdout.write(`static server on http://${HOST}:${PORT}\n`));
