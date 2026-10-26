# QA Studio

AI-assisted test case generator for QA engineers. Describe a feature or paste user stories, get 14-18 structured test cases, then edit, track, organise and export them. Runs entirely in the browser; there is no backend database.

**Live app:** https://engmilo.github.io/qa-studio/ (landing page) and https://engmilo.github.io/qa-studio/app.html (the app)

Built by [Milo Haireche](https://www.linkedin.com/in/milohaireche) - QA Engineer, 20+ years in testing.

## What it does

- **Generate** test cases from a feature description with Claude. Output covers positive, negative, boundary, validation, UI/UX, API, integration, regression and security cases, each with title, description, steps, expected result, priority, tags and risk.
- **Demo mode** creates 16 sample test cases locally, with no API call.
- **Work with the results:** edit every field, set Pass / Fail / Blocked status, drag to reorder, search, select several and delete in bulk.
- **Organise:** save results to named projects, browse them as suites, see a history of generation runs.
- **Dashboard:** weekly KPIs (total, passed, failed, blocked, untested), status and priority charts, 7-day trend, recent test cases, project filter.
- **Export:** JSON, CSV, Excel (.xlsx) and Word. The Word file is an HTML-based `.doc` that Word opens, not a native `.docx`.
- **Backup:** export and import all data as one JSON file.
- **Languages:** English and Finnish. 
- **Themes:** light and dark.
- **Installable PWA** with a service worker.

## How it works

| Part | Details |
|---|---|
| Front end | Plain HTML, CSS and JavaScript. No framework, no build step. |
| Libraries | Lucide icons, Chart.js and SheetJS, loaded from public CDNs with integrity hashes; Inter font from Google Fonts. |
| AI | Requests go to a Cloudflare Worker proxy, which forwards them to the Anthropic API.The Worker source is in worker/index.mjs.    Every user must supply their own Anthropic API key
| Storage | Everything is kept in your browser's `localStorage`. Nothing is sent anywhere except the text you generate from. |
| Tests | Playwright end-to-end tests (desktop and a mobile viewport). The AI proxy is mocked, so no real API calls are made. |

### Privacy and API key

- The text you type is sent to the proxy and on to Anthropic to generate test cases. Do not paste confidential material.
- In **API Configuration** The key is required. The key is sent with the request, is not written to browser storage, and has to be re-entered after a reload.
- Test cases, projects and history stay in `localStorage` on your device. "Clear All Data" removes them.

## Repository layout

```
public/          the website (this is the only folder that gets published)
  index.html     landing page
  landing.js     landing page script
  app.html       the app shell, styles and markup
  app.js         application logic
  sw.js          service worker
  manifest.json  PWA manifest
e2e/             Playwright tests, test helpers, static test server
docs/design/     early design mock-ups (not part of the site)
.github/         CI and deploy workflow, Dependabot config
```

## Run it locally

You need Node.js 20 or newer.

```bash
npm ci
node e2e/server.js        # serves public/ at http://127.0.0.1:3333
```

Open http://127.0.0.1:3333/app.html. The AI features need the proxy to be reachable; Demo mode works without it. The service worker's cache list uses `/qa-studio/...` paths, so offline caching only works on the deployed site, not locally.

## Tests

```bash
npx playwright install chromium
npm test                  # runs everything
npm run report            # opens the last HTML report
```

The suite covers the generator, projects, suites, history, dashboard numbers, language and theme switching, API error handling (429, 401, 500, network failure, truncated responses), import/export, CSV export safety, and hostile content in AI output and imported files.

## CI and deploy

`.github/workflows/ci-deploy.yml` runs the tests on every pull request and every push to `main`. On `main`, the site is deployed to GitHub Pages **only if the tests pass**, and only the `public/` folder is published.

## Security notes

- All user, AI and imported text is HTML-escaped before display, and AI output and imported files are validated and normalised before use.
- A Content Security Policy restricts scripts to this site and the three CDN hosts above; inline scripts are not allowed.
- CSV exports prefix cells that start with `=`, `+`, `-` or `@` so spreadsheets do not run them as formulas.

## Known limitations

- Libraries and the Inter font load from CDNs, so the app needs a network connection on first load.
- Only Anthropic Claude models are supported.
- The proxy's own safeguards (origin checks, rate limits, spend caps) are configured outside this repository.

## License

MIT - see [LICENSE](LICENSE).
