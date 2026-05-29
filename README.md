# QA Studio — AI Test Case Generator

A client-side PWA for QA engineers. Describe a feature and get structured, prioritised test cases instantly — powered by Anthropic Claude.

🔗 **Live site:** https://engmilo.github.io/qa-studio

---

## Features

- 🤖 AI-generated test cases (via Claude API) with local Demo mode (no API key needed)
- 🎯 Priority levels: Critical → Trivial, with pass/fail/blocked status tracking
- 📋 Step-by-step test structure: description, steps, expected results, tags & risk notes
- 📥 Export: JSON, CSV, Excel, Word
- 📁 Projects, Suites, Dashboard & History views with search
- 🌙 Light / Dark mode with persistent preference
- 🌐 English & Finnish (FI) — UI + AI-generated content
- 📊 Dashboard with status distribution, priority breakdown & generation trend charts
- 📱 PWA — installable, works offline for previously saved data

---

## Quick Start

### Use the live app

Go to **https://engmilo.github.io/qa-studio** — no setup required.

### Run locally

```bash
git clone https://github.com/engmilo/qa-studio.git
cd qa-studio
```

Then open `app.html` in your browser, or serve with any static server:

```bash
npx http-server . -p 8080
```

---

## API Configuration

The app uses a shared proxy by default (`qa-proxy.eng-milo.workers.dev`). To use your own Anthropic API key or a custom endpoint, open the **Settings** panel in the sidebar.

Your API key is never persisted to localStorage — it lives only in the current session.

---

## E2E Tests

```bash
npm install
npx playwright install chromium
npx playwright test
```

The test suite covers:

| File | Tests |
|---|---|
| `e2e/landing.spec.js` | Page load, CTAs, language/theme toggle, navigation |
| `e2e/generator.spec.js` | Demo generation, search filter, bulk select/delete, save to project, mocked API generation |
| `e2e/projects.spec.js` | Dashboard, project details, suites, history, i18n/theme in app |

The API generation test uses `page.route()` to mock the Cloudflare Worker — no real API key required.

---

## Project Structure

```
qa-studio/
├── index.html              # Landing page
├── app.html                # App shell (styles inline)
├── app.js                  # All app logic (~1860 lines)
├── sw.js                   # Service worker (precaches app.js + CDN libs)
├── manifest.json           # PWA manifest
├── icon.svg                # App icon
├── preview.png             # Social preview
├── package.json            # Playwright dev dependency
├── playwright.config.js    # Playwright configuration
├── e2e/
│   ├── landing.spec.js     # Landing page E2E tests
│   ├── generator.spec.js   # Generator / demo / save E2E tests
│   ├── projects.spec.js    # Projects / suites / dashboard E2E tests
│   ├── server.js           # Static server for test runner
│   └── mocks/
│       └── api-response.json  # Mock API response fixture
├── libs/                   # Vendored CDN libs (precached by SW)
├── .github/
│   └── workflows/
│       ├── deploy.yml      # Auto-deploy to GitHub Pages on push
│       └── test.yml        # Run E2E tests on push / PR
└── .gitignore
```

---

## Tech Stack

- Vanilla HTML/CSS/JS — no build step, no framework
- [Lucide Icons](https://lucide.dev) — via CDN (precached by SW)
- [SheetJS](https://sheetjs.com) — Excel export (precached by SW)
- [Inter font](https://fonts.google.com/specimen/Inter)
- Anthropic Claude API via Cloudflare Worker proxy
- [Playwright](https://playwright.dev) — E2E tests
- GitHub Pages — hosting

---

## License

MIT
