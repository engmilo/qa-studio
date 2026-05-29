const { execSync } = require("child_process");
const fs = require("fs");

try {
  execSync(
    'npx lighthouse https://engmilo.github.io/qa-studio/app.html --preset=desktop --output=json --output-path=lh-prod.json --chrome-flags="--headless=new"',
    { timeout: 90000, stdio: "pipe" }
  );
} catch (e) {
  // lighthouse CLI exits non-zero even on success when silent
}
const files = fs.readdirSync(".").filter(f => f.endsWith(".report.json"));
if (files.length) {
  const data = JSON.parse(fs.readFileSync(files[0], "utf8"));
  for (const [k, v] of Object.entries(data.categories)) {
    console.log(k + ": " + Math.round(v.score * 100) + "%");
  }
  files.forEach(f => fs.unlinkSync(f));
} else {
  console.log("No report generated");
}
