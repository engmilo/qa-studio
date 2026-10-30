# QA Studio

AI-assisted test case generator for QA engineers. Describe a feature or paste user stories, get 14-18 structured test cases, then edit, track, organise and export them. Runs entirely in the browser; there is no backend database.

**Live app:** https://engmilo.github.io/qa-studio/ (landing page) and https://engmilo.github.io/qa-studio/app.html (the app)

Built by [Milo Haireche](https://www.linkedin.com/in/milohaireche) - QA Engineer, 20+ years in testing.

## What it does

- **Generate** test cases from a feature description with Claude. Output covers positive, negative, boundary, validation, UI/UX, API, integration, regression and security cases, each with title, description, steps, expected result, priority, tags and risk.
- **Demo mode** creates 16 sample test cases locally, with no API call.
- **Work with the results:** edit every field, set Pass / Fail / Blocked status, reorder (drag and drop, or the Move up / Move down buttons), search, select several and delete in bulk.
- **Organise:** save results to named projects, browse them as suites, see a history of generation runs.
- **Dashboard:** weekly KPIs (total, passed, failed, blocked, untested), status and priority charts, 7-day trend, recent test cases, project filter.
- **Export:** JSON, CSV, Excel (.xlsx) and Word. The Word file is an HTML-based `.doc` that Word opens, not a native `.docx`.
- **Backup:** export and import all data as one JSON file.
- **Languages:** English and Finnish.
- **Themes:** light and dark.
- **Accessible:** fully usable with the keyboard, labelled for screen readers, WCAG AA colour contrast in both themes, respects the reduced-motion setting. See [Accessibility](#accessibility).
- **Installable PWA** with a service worker.

## How it works

| Part | Details |
|---|---|
| Front end | Plain HTML, CSS and JavaScript. No framework, no build step. |
| Libraries | Lucide icons, Chart.js, SheetJS and the Inter font are bundled in `public/vendor/` (versions and licenses in `public/vendor/THIRD_PARTY_NOTICES.md`). The app contacts no third-party server except the AI proxy. |
| AI | Requests go to a Cloudflare Worker proxy, which forwards them to the Anthropic API. The Worker source is in `worker/index.mjs`. Every user must supply their own Anthropic API key. |
| Storage | Everything is kept in your browser's `localStorage`. Nothing is sent anywhere except the text you generate from. |
| Tests | Playwright end-to-end tests (desktop and a mobile viewport), including accessibility checks. The AI proxy is mocked, so no real API calls are made. |

### Privacy and API key

- The text you type is sent to the proxy and on to Anthropic to generate test cases. Do not paste confidential material.
- In **API Configuration** you choose a Claude model, set max tokens and enter your Anthropic API key. The key is required. It is sent with each request, is not written to browser storage, and has to be re-entered after a reload.
- Test cases, projects and history stay in `localStorage` on your device. "Clear All Data" removes them.

## Accessibility

QA Studio is built to meet WCAG 2.1 level AA. What that means in practice:

**Keyboard**
- Every control can be reached and used without a mouse. A "Skip to main content" link appears on the first Tab.
- Moving to another page moves the focus to its heading, and the sidebar marks the current page.
- Test case titles open with Enter or Space, the select checkbox toggles with Space, and each card has **Move up** and **Move down** buttons as an alternative to drag and drop. Focus follows the card you move.
- Dialogs trap the focus, close with Escape and give the focus back to the button that opened them. Closed dialogs and the closed phone menu cannot be tabbed into.

**Screen readers**
- All dialogs are named dialogs. Icon-only buttons, form fields and the language buttons have labels, in English and Finnish.
- Status buttons announce whether they are on or off. Notifications, the progress bar and the result count are announced politely. Charts have a text summary.

**Visual**
- Text meets the 4.5:1 contrast ratio in both the light and the dark theme. Focus is always visible. Small text was enlarged.
- Pages work in English and Finnish with the correct page language set.

**Motion**
- With "reduce motion" turned on in your system, animations and transitions are switched off, the typing demo shows one still sentence and the charts do not animate.

**How it is tested**
- axe-core checks (WCAG 2.0 and 2.1, levels A and AA) on the landing page, every app view and every dialog, including colour contrast in both themes.
- Keyboard-only tests for the skip link, focus handling, checkboxes, reordering, dialogs and the confirm dialog.
- Reduced-motion tests and a stylesheet check.

**Limits**
- Automated tools find only part of all accessibility problems. The app has not had a manual audit with a screen reader yet.
- Drag and drop is still available for mouse users; the Move buttons are the keyboard alternative.
- If you find a barrier, please open an issue.

## Repository layout

```
public/          the website (this is the only folder that gets published)
  index.html     landing page
  landing.js     landing page script
  app.html       the app shell, styles and markup
  app.js         application logic
  sw.js          service worker
  manifest.json  PWA manifest
  vendor/        bundled libraries and the Inter font
  icons/         PNG app icons (made by scripts/make-icons.js)
worker/          the Cloudflare Worker (AI proxy) and its tests
scripts/         helper scripts (icon generator)
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

Open http://127.0.0.1:3333/app.html. The AI features need the proxy to be reachable; Demo mode works without it. The service worker also works locally, so you can test offline use at http://127.0.0.1:3333.

## Tests

```bash
npx playwright install chromium
npm test                              # runs everything
npm run report                        # opens the last HTML report
node --test worker/worker.test.mjs    # tests for the Cloudflare Worker
```

The suite covers the generator, projects, suites, history, dashboard numbers, language and theme switching, API error handling (429, 401, 500, network failure, truncated responses), import/export, CSV export safety, hostile content in AI output and imported files, keyboard use, automated accessibility checks (axe-core) and reduced motion.

To see colour-contrast problems without failing the run while you work on a design change, start the tests with `A11Y_STRICT_CONTRAST=0`.

## CI and deploy

`.github/workflows/ci-deploy.yml` runs the tests on every pull request and every push to `main`. On `main`, the site is deployed to GitHub Pages **only if the tests pass**, and only the `public/` folder is published.

The workflow runs on `ubuntu-24.04` because Playwright does not support Ubuntu 26.04 (`ubuntu-latest`) yet. Switch back once it does.

## Security notes

- All user, AI and imported text is HTML-escaped before display, and AI output and imported files are validated and normalised before use.
- A Content Security Policy limits scripts, fonts and connections to this site (plus the AI proxy for requests); inline scripts are not allowed.
- CSV exports prefix cells that start with `=`, `+`, `-` or `@` so spreadsheets do not run them as formulas.
- The Worker holds no API key of its own. It only accepts requests from the app's own origin, caps the request size and token count, accepts only Claude models, and passes the real error status back to the app.

## Known limitations

- The first visit needs a network connection. After that the app is cached for offline use; AI generation always needs a connection.
- Only Anthropic Claude models are supported.
- The Worker has no rate limit of its own. Add a Cloudflare rate-limiting rule if you expect public traffic.

## License

MIT - see [LICENSE](LICENSE).
