const { execSync } = require("child_process");
const fs = require("fs");

const reportFile = "lighthouse-report.json";

try {
  execSync(
    `npx lighthouse http://localhost:3333/app.html --preset=desktop --output=json --output-path=${reportFile} --chrome-flags="--headless=new"`,
    { timeout: 90000, stdio: "pipe" }
  );
  const data = JSON.parse(fs.readFileSync(reportFile, "utf8"));
  for (const [k, v] of Object.entries(data.categories)) {
    console.log(`${k}: ${Math.round(v.score * 100)}%`);
  }
  fs.unlinkSync(reportFile);
} catch (e) {
  // Try finding auto-named report
  const files = fs.readdirSync(".").filter(f => f.startsWith("lighthouse") && f.endsWith(".report.json"));
  if (files.length) {
    const data = JSON.parse(fs.readFileSync(files[0], "utf8"));
    for (const [k, v] of Object.entries(data.categories)) {
      console.log(`${k}: ${Math.round(v.score * 100)}%`);
    }
    files.forEach(f => fs.unlinkSync(f));
  } else {
    console.error("Lighthouse failed:", e.message);
  }
}
