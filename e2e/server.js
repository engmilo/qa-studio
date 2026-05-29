const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3333;
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

http.createServer((req, res) => {
  let file = path.join(ROOT, req.url === "/" ? "app.html" : req.url);
  const ext = path.extname(file);
  const ct = MIME[ext] || "application/octet-stream";

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
      return;
    }
    // Allow all origins for testing
    res.writeHead(200, {
      "Content-Type": ct,
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "no-cache",
    });
    res.end(data);
  });
}).listen(PORT, () => {
  process.stdout.write(`static server on http://localhost:${PORT}\n`);
});
