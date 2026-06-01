// ============================================================
// CONFIG
// ============================================================
const WORKER_URL = "https://qa-proxy.eng-milo.workers.dev";

// ============================================================
// I18N
// ============================================================
const i18n = {
    en: {
        documentTitle: "QA Studio",
        generatorPageTitle: "Generator",
        pageSubtitle: "Generate, save, and track test cases by project.",
        appName: "QA Studio", generator: "Generator", dashboard: "Dashboard",
        projects: "Projects", suites: "Suites", history: "History", theme: "Theme",
        tipGenerator: "Generate test cases from a feature description",
        tipDashboard: "View stats and status of your test cases",
        tipProjects: "Browse and manage saved projects",
        tipSuites: "View test suites grouped by project",
        tipHistory: "See your past generation history",
        apiConfig: "API Configuration",
        tipApiConfig: "Configure API endpoint and model",
        generate: "Generate Test Cases", generating: "Generating…",
        exportJson: "Export JSON", exportCsv: "Export CSV", exportExcel: "Export Excel",
        exportWord: "Export Word", saveProject: "Save to Project", save: "Save",
        projectNamePlaceholder: "Project name…",
        projectDescPlaceholder: "Description (optional)…",
        cancel: "Cancel", clearHistory: "Clear History", viewDetails: "View Details",
        noResults: "Describe a feature above and hit Generate.",
        colFeature: "Feature", colGenerated: "Date", colTime: "Time", colCount: "Tests",
        colName: "Name", colDesc: "Description", colCreated: "Created",
        emptyHistory: "No history yet.", emptyProjects: "No saved projects yet.",
        dashTotalAll: "All-time generated", dashSession: "Current Session",
        dashPass: "Passed", dashFail: "Failed", dashBlocked: "Blocked",
        dashUntested: "Untested", dashTotal: "Total",
        priorityBreakdown: "Priority Breakdown",
        dashEmpty: "No test cases yet. Generate some to see stats here.",
        pass: "Pass", fail: "Fail", blocked: "Blocked", untested: "Untested",
        colId: "ID", colPriority: "Priority", colStatus: "Status", colTitle: "Title",
        delete: "Delete", testsLabel: "tests",
        pCritical: "Critical", pHigh: "High", pMedium: "Medium", pLow: "Low", pTrivial: "Trivial",
        clearAllData: "Clear All Data", confirmClearAll: "Clear ALL data (projects, history, test cases)? This cannot be undone.",
        confirmDelete: "Delete this project? This cannot be undone.",
        demo: "Demo",
        statusDistribution: "Status Distribution",
        priorityDistribution: "Test Case Priority",
        projectBars: "Project Breakdown",
        statusColChart: "Test Case Status",
        dailyTrend: "Test Cases Created - Last 7 Days",
        entTitle: "QA Test Case Tracker",
        entTotal: "Total Test Cases",
        entRecent: "Recent Test Cases",
        entAllProjects: "All Projects",
        sideDefectDensity: "Defect Density",
        sideAutoCoverage: "Automation Coverage",
        sideOfTotal: "of total executed",
        thisWeek: "This Week",
        lastWeek: "Last Week",
        importExportBtn: "Import / Export",
        importExportTitle: "Import / Export Data",
        exportLabel: "Export All Data",
        downloadBackup: "Download JSON Backup",
        importLabel: "Import Data",
        selectJsonFile: "Select JSON File",
        importWarning: "Warning: Importing will replace all existing data.",
        importConfirmTitle: "Import",

        searchHistory: "Search history…",
        searchProjects: "Search projects…",
        generatorSearchPlaceholder: "Search by title, tags, priority…",
        showingResults: "Showing {n} of {total}",
        testCasesLabel: n => `test case${n !== 1 ? "s" : ""}`,
        selectAll: "Select All",
        deselectAll: "Deselect All",
        selected: "selected",
        confirmBulkDelete: n => `Are you sure you want to delete <strong>${n}</strong> test case${n !== 1 ? "s" : ""}?`,
        deletedTests: "Deleted selected test cases",
        back: "Back",
        footerText: "QA Studio by Milo Haireche — 20+ years of QA expertise",
        importPrompt: "Paste or type your user stories below — copy them directly from Jira, Notion, spreadsheets, or any requirements document.",
        usageFn: n => `${n} test case${n !== 1 ? "s" : ""} generated`,
        charCounterLabel: "characters",
        livePreviewLabel: "// live preview",
        apiEndpointUrl: "API Endpoint URL",
        apiEndpointPlaceholder: "https://your-api.com/endpoint",
        apiModelName: "Model Name",
        apiModelPlaceholder: "claude-sonnet-4-20250514",
        apiMaxTokens: "Max Tokens",
        apiTokensPlaceholder: "4096",
        saveConfig: "Save Configuration",
        apiKeyLabel: "Anthropic API Key",
        apiKeyPlaceholder: "sk-ant-...",
        apiKeyHint: "Your key is sent to the proxy and forwarded to Anthropic. Never shared.",
        detailTitle: "Title", detailDescription: "Description", detailSteps: "Steps", detailExpected: "Expected Result", detailTags: "Tags", detailRisk: "Risk",
        editTitle: "Edit Test Case", addStep: "Add step", editLabelPriority: "Priority", editLabelTags: "Tags (comma separated)",
        testInputPlaceholder: "Describe the feature you want test cases for…",
        clearBtn: "Clear",
        deleteSelected: "Delete Selected",
        confirmImportData: "This will replace ALL your current data. Are you sure?",
        demoFeature: "Demo — e-commerce platform",
        toastProjectExists: name => `Project "${name}" already exists`,
        toastTestDuplicated: "Test case duplicated",
        toastApiConfigSaved: "API configuration saved!",
        toastDataExported: "Data exported successfully!",
        toastDataImported: "Data imported successfully!",
        toastImportFailed: "Failed to parse import file",
        toastTestUpdated: "Test case updated",
        toastTestReordered: "Test case reordered",
        toastDemoLoaded: n => `Loaded ${n} demo test cases`,
        toastCharsExceeded: n => `Text exceeds ${n} character limit`,
        toastGenerated: n => `Generated ${n} test cases!`,
        toastCopied: "Copied to clipboard!",
        toastCopyFailed: "Failed to copy",
        toastCleared: "Cleared",
        quotaWarning: "Storage is nearly full",
        quotaHint: "Export your data and clear old test cases to free up space.",
        quotaDismiss: "Dismiss",
        apiErrServer: status => `Server error (HTTP ${status})`,
        apiErrRateLimit: "Rate limit reached — please wait a moment and try again.",
        apiErrUnavailable: "The AI service is temporarily unavailable. Please try again in a few seconds.",
        apiErrAuth: "API authentication failed. Check your API configuration in Settings.",
        apiErrServerError: "The AI server encountered an error. Try again or use a different model.",
        errNetwork: "Could not reach the AI service. Check your API URL in Settings (gear icon in sidebar) or your internet connection.",
        errGenerationFailed: "Generation Failed",
        errRetry: "Retry",
        errImportInvalid: "Invalid format",
        errImportVersion: "Unsupported file version. Expected version 2.",
        swUpdateAvailable: "New version available — please hard refresh (Ctrl+F5)",
        swUpdateApplied: "Update applied! Reloading…",
        noSearchResults: "No results matching your search.",
        dir: "ltr",
    },
    fi: {
        documentTitle: "QA Studio",
        generatorPageTitle: "Generaattori",
        pageSubtitle: "Luo, tallenna ja seuraa testitapauksia projekteittain.",
        appName: "QA Studio", generator: "Generaattori", dashboard: "Kojelauta",
        projects: "Projektit", suites: "Testipaketit", history: "Historia", theme: "Teema",
        tipGenerator: "Luo testitapaukset ominaisuuskuvauksen perusteella",
        tipDashboard: "Näytä testitapausten tilastot ja tila",
        tipProjects: "Selaa ja hallitse tallennettuja projekteja",
        tipSuites: "Näytä testipaketit projekteittain",
        tipHistory: "Katso aikaisempi luontihistoria",
        apiConfig: "API-asetukset",
        tipApiConfig: "Määritä API-päätepiste ja malli",
        generate: "Luo testitapaukset", generating: "Luodaan…",
        exportJson: "Vie JSON", exportCsv: "Vie CSV", exportExcel: "Vie Excel",
        exportWord: "Vie Word", saveProject: "Tallenna projektiin", save: "Tallenna",
        projectNamePlaceholder: "Projektin nimi…",
        projectDescPlaceholder: "Kuvaus (valinnainen)…",
        cancel: "Peruuta", clearHistory: "Tyhjennä historia", viewDetails: "Näytä tiedot",
        noResults: "Kuvaile ominaisuus yllä ja paina Luo.",
        colFeature: "Ominaisuus", colGenerated: "Päivämäärä", colTime: "Aika", colCount: "Tapauksia",
        colName: "Nimi", colDesc: "Kuvaus", colCreated: "Luotu",
        emptyHistory: "Ei historiaa vielä.", emptyProjects: "Ei tallennettuja projekteja.",
        dashTotalAll: "Luotu yhteensä", dashSession: "Nykyinen sessio",
        dashPass: "Hyväksytty", dashFail: "Hylätty", dashBlocked: "Estetty",
        dashUntested: "Testaamaton", dashTotal: "Yhteensä",
        priorityBreakdown: "Prioriteettijakauma",
        dashEmpty: "Ei testitapauksia vielä. Luo niitä nähdäksesi tilastot.",
        pass: "Hyväksytty", fail: "Hylätty", blocked: "Estetty", untested: "Testaamaton",
        colId: "ID", colPriority: "Prioriteetti", colStatus: "Tila", colTitle: "Otsikko",
        delete: "Poista", testsLabel: "testiä",
        pCritical: "Kriittinen", pHigh: "Korkea", pMedium: "Keskitaso", pLow: "Matala", pTrivial: "Triviaali",
        clearAllData: "Tyhjennä kaikki", confirmClearAll: "Tyhjennä KAIKKI tiedot (projektit, historia, testitapaukset)? Toimintoa ei voi peruuttaa.",
        confirmDelete: "Poistetaanko tämä projekti? Toimintoa ei voi peruuttaa.",
        demo: "Demo",
        statusDistribution: "Tilajakauma",
        priorityDistribution: "Testitapausten prioriteetti",
        projectBars: "Projektijakauma",
        statusColChart: "Testitapausten tila",
        dailyTrend: "Luodut testit - viimeiset 7 päivää",
        entTitle: "QA Testitapausten seuranta",
        entTotal: "Testitapauksia yhteensä",
        entRecent: "Viimeisimmät testitapaukset",
        entAllProjects: "Kaikki projektit",
        sideDefectDensity: "Vikatiheys",
        sideAutoCoverage: "Automaatiokattavuus",
        sideOfTotal: "suoritetuista",
        colExecDate: "Suorituspäivä",
        importExportBtn: "Tuo / Vie",
        importExportTitle: "Tuo / Vie tiedot",
        exportLabel: "Vie kaikki tiedot",
        downloadBackup: "Lataa JSON-varmuuskopio",
        importLabel: "Tuo tietoja",
        selectJsonFile: "Valitse JSON-tiedosto",
        importWarning: "Varoitus: Tuonti korvaa kaikki olemassa olevat tiedot.",
        importConfirmTitle: "Tuonti",
        thisWeek: "Tämä viikko",
        lastWeek: "Viime viikko",

        searchHistory: "Hae historiasta…",
        searchProjects: "Hae projekteista…",
        generatorSearchPlaceholder: "Hae otsikolla, tagilla, prioriteetilla…",
        showingResults: "Näytetään {n}/{total}",
        testCasesLabel: () => "testitapausta",
        selectAll: "Valitse kaikki",
        deselectAll: "Poista valinnat",
        selected: "valittu",
        confirmBulkDelete: n => `Haluatko varmasti poistaa <strong>${n}</strong> valittua testitapausta?`,
        deletedTests: "Valitut testitapaukset poistettu",
        back: "Takaisin",
        footerText: "QA Studio, tekijä Milo Haireche — yli 20 vuoden QA-kokemus",
        importPrompt: "Liitä tai kirjoita user story -kuvauksesi alle — kopioi ne suoraan Jirasta, Notionista, taulukoista tai mistä tahansa vaatimusdokumentista.",
        usageFn: n => `${n} testitapausta luotu`,
        charCounterLabel: "merkkiä",
        livePreviewLabel: "// suora esikatselu",
        apiEndpointUrl: "API-päätepisteen URL",
        apiEndpointPlaceholder: "https://your-api.com/endpoint",
        apiModelName: "Mallin nimi",
        apiModelPlaceholder: "claude-sonnet-4-20250514",
        apiMaxTokens: "Enimmäistokens",
        apiTokensPlaceholder: "4096",
        saveConfig: "Tallenna asetukset",
        apiKeyLabel: "Anthropic API-avain",
        apiKeyPlaceholder: "sk-ant-...",
        apiKeyHint: "Avain lähetetään välityspalvelimelle ja edelleen Anthropicille. Ei jaeta.",
        detailTitle: "Otsikko", detailDescription: "Kuvaus", detailSteps: "Vaiheet", detailExpected: "Odotettu tulos", detailTags: "Tagit", detailRisk: "Riskit",
        editTitle: "Muokkaa testitapausta", addStep: "Lisää vaihe", editLabelPriority: "Prioriteetti", editLabelTags: "Tagit (pilkuilla eroteltuna)",
        testInputPlaceholder: "Kuvaile ominaisuus, jolle haluat testitapauksia…",
        clearBtn: "Tyhjennä",
        deleteSelected: "Poista valitut",
        confirmImportData: "Tämä korvaa KAIKKI nykyiset tietosi. Oletko varma?",
        demoFeature: "Demo — verkkokauppa-alusta",
        toastProjectExists: name => `Projekti "${name}" on jo olemassa`,
        toastTestDuplicated: "Testitapaus kopioitu",
        toastApiConfigSaved: "API-asetukset tallennettu!",
        toastDataExported: "Tiedot viety onnistuneesti!",
        toastDataImported: "Tiedot tuotu onnistuneesti!",
        toastImportFailed: "Tuontitiedoston lukeminen epäonnistui",
        toastTestUpdated: "Testitapaus päivitetty",
        toastTestReordered: "Testitapaus järjestetty uudelleen",
        toastDemoLoaded: n => `Ladattiin ${n} demotestitapausta`,
        toastCharsExceeded: n => `Teksti ylittää ${n} merkin rajan`,
        toastGenerated: n => `Luotu ${n} testitapausta!`,
        toastCopied: "Kopioitu leikepöydälle!",
        toastCopyFailed: "Kopiointi epäonnistui",
        toastCleared: "Tyhjennetty",
        quotaWarning: "Tila on lähes täynnä",
        quotaHint: "Vie tietosi ja tyhjennä vanhat testitapaukset vapauttaaksesi tilaa.",
        quotaDismiss: "Hylkää",
        apiErrServer: status => `Palvelinvirhe (HTTP ${status})`,
        apiErrRateLimit: "Nopeusrajoitus saavutettu — odota hetki ja yritä uudelleen.",
        apiErrUnavailable: "AI-palvelu ei ole väliaikaisesti käytettävissä. Yritä uudelleen hetken kuluttua.",
        apiErrAuth: "API-todennus epäonnistui. Tarkista API-asetukset.",
        apiErrServerError: "AI-palvelin kohtasi virheen. Yritä uudelleen tai käytä toista mallia.",
        errNetwork: "AI-palveluun ei saatu yhteyttä. Tarkista API-osoite Asetuksista (rataskuvake sivupalkissa) tai internetyhteytesi.",
        errGenerationFailed: "Luonti epäonnistui",
        errRetry: "Yritä uudelleen",
        errImportInvalid: "Virheellinen muoto",
        errImportVersion: "Tiedoston versiota ei tueta. Odotettiin versiota 2.",
        swUpdateAvailable: "Uusi versio saatavilla — päivitä sivu (Ctrl+F5)",
        swUpdateApplied: "Päivitys asennettu! Ladataan uudelleen…",
        noSearchResults: "Ei hakutuloksia.",
        dir: "ltr",
    },
};

let lang = localStorage.getItem("qa_lang") || "en";
const t = key => (i18n[lang] && i18n[lang][key] !== undefined) ? i18n[lang][key] : (i18n.en[key] || key);

// ============================================================
// applyLang
// ============================================================
function applyLang() {
    document.title = t("documentTitle");
    document.documentElement.lang = lang;
    const activeView = document.querySelector(".sidebar-nav .nav-item.active")?.dataset.view;
    if (activeView === "generator") {
        document.getElementById("pageTitle").textContent = t("generatorPageTitle");
    } else if (activeView) {
        document.getElementById("pageTitle").textContent = t(activeView);
    }
    const subtitleEl = document.getElementById("pageSubtitle");
    subtitleEl.textContent = t("pageSubtitle");
    subtitleEl.style.display = (activeView === "generator") ? "block" : "none";
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const val = t(el.dataset.i18n);
        if (typeof val === "string") el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        const val = t(el.dataset.i18nPlaceholder);
        if (typeof val === "string") el.placeholder = val;
    });
    document.querySelectorAll("[data-tip]").forEach(el => {
        el.title = t(el.dataset.tip);
    });
    document.body.dir = t("dir");
    const testInput_ = document.getElementById("testInput");
    if (testInput_) testInput_.setAttribute("placeholder", t("testInputPlaceholder"));

    testInput.dir = "ltr";
    testInput.value = "";
    updateCharCounter();
    updateUsageCounter();
    renderSavedTestCards();
    lucide.createIcons();
}

// ============================================================
// STATE
// ============================================================
const state = {
    usageTotal: parseInt(localStorage.getItem("qa_usage_total") || "0"),
    history:    JSON.parse(localStorage.getItem("qa_history")   || "[]"),
    projects:   JSON.parse(localStorage.getItem("qa_projects")  || "[]"),
};

function saveState() {
    localStorage.setItem("qa_usage_total", String(state.usageTotal));
    localStorage.setItem("qa_history",     JSON.stringify(state.history));
    localStorage.setItem("qa_projects",    JSON.stringify(state.projects));
}

function saveLatestTestCases() {
    try { localStorage.setItem("qa_latest_tests", JSON.stringify(latestTestCases)); } catch(e) {}
}
function loadLatestTestCases() {
    try {
        const saved = localStorage.getItem("qa_latest_tests");
        if (saved) latestTestCases = JSON.parse(saved);
    } catch(e) {}
}

// ============================================================
// HELPERS
// ============================================================
function esc(str) {
    const d = document.createElement("div");
    d.textContent = String(str);
    return d.innerHTML;
}
function statusLabel(s) {
    if(s === "pass") return t("pass");
    if(s === "fail") return t("fail");
    if(s === "blocked") return t("blocked");
    return t("untested");
}
function priorityLabel(p) {
    const map = { Critical:"pCritical", High:"pHigh", Medium:"pMedium", Low:"pLow", Trivial:"pTrivial" };
    return map[p] ? t(map[p]) : p;
}
function dlBlob(blob, filename) {
    const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: filename });
    a.click();
    URL.revokeObjectURL(a.href);
}
function now24h() {
    const d = new Date();
    return d.getHours().toString().padStart(2,"0") + ":" + d.getMinutes().toString().padStart(2,"0");
}

// ============================================================
// JSON REPAIR
// ============================================================
function repairJSON(raw) {
    let clean = raw.replace(/^```json\s*/i,"").replace(/```\s*$/g,"").trim();
    try { const p = JSON.parse(clean); if(Array.isArray(p)&&p.length>0) return p; } catch(e){}
    const as = clean.indexOf("[");
    if(as !== -1) clean = clean.substring(as);
    try { const p = JSON.parse(clean); if(Array.isArray(p)&&p.length>0) return p; } catch(e){}
    let r = clean;
    const lc = r.lastIndexOf("}");
    if(lc !== -1){
        r = r.substring(0,lc+1);
        const lo = r.lastIndexOf("{"), lcb = r.lastIndexOf("}");
        if(lo > lcb){ r = r.substring(0,lo); r = r.replace(/,\s*$/,""); }
        r = r.replace(/,\s*$/,"");
        if(!r.endsWith("]")) r += "\n]";
        if(!r.startsWith("[")) r = "[\n"+r;
        try { const p = JSON.parse(r); if(Array.isArray(p)&&p.length>0) return p; } catch(e){}
    }
    const m = clean.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g);
    if(m){
        const objs = [];
        for(const x of m){ try{ const o=JSON.parse(x); if(o.id&&o.title) objs.push(o); }catch(e){} }
        if(objs.length>0) return objs;
    }
    throw new Error("Could not parse AI response. Please try again.");
}

// ============================================================
// THEME
// ============================================================
const savedTheme = localStorage.getItem("qa_theme") || "light";
document.body.classList.remove("light", "dark");
document.body.classList.add(savedTheme);

const oldCfg = JSON.parse(localStorage.getItem("qa_api_config") || "{}");
if (oldCfg.apiKey) {
    delete oldCfg.apiKey;
    localStorage.setItem("qa_api_config", JSON.stringify(oldCfg));
}
function closeSidebar() {
    document.querySelector(".sidebar")?.classList.remove("open");
    document.getElementById("sidebarOverlay")?.classList.remove("visible");
}

document.getElementById("themeToggleBtn")?.addEventListener("click", toggleTheme);

function toggleTheme() {
    const next = document.body.classList.contains("dark") ? "light" : "dark";
    document.body.classList.remove("light", "dark");
    document.body.classList.add(next);
    void document.body.offsetHeight;
    localStorage.setItem("qa_theme", next);
    const isDark = next === "dark";
    const headerBtn = document.getElementById("themeToggleBtn");
    if (headerBtn) headerBtn.innerHTML = `<i data-lucide="${isDark ? "moon" : "sun"}" id="themeToggleBtnIcon"></i>`;
    try { lucide.createIcons(); } catch (e) { console.warn("QA Studio:", e); }
}
if(savedTheme === "dark") {
    const headerBtn = document.getElementById("themeToggleBtn");
    if (headerBtn) headerBtn.innerHTML = '<i data-lucide="moon" id="themeToggleBtnIcon"></i>';
    try { lucide.createIcons(); } catch (e) { console.warn("QA Studio:", e); }
}

// ============================================================
// LANGUAGE (flag buttons)
// ============================================================
function updateFlagButtons() {
    document.querySelectorAll("#langFlags .lang-btn").forEach(btn => {
        btn.classList.toggle("active-lang", btn.dataset.lang === lang);
    });
}
updateFlagButtons();
document.querySelectorAll("#langFlags .lang-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        lang = btn.dataset.lang;
        localStorage.setItem("qa_lang", lang);
        localStorage.setItem("qa_landing_lang", lang);
        updateFlagButtons();
        applyLang();
        const v = document.querySelector(".sidebar-nav .nav-item.active")?.dataset.view;
        if(v === "history")   renderHistory();
        if(v === "projects")  renderProjects();
        if(v === "suites")    renderSuites();
        if(v === "dashboard") renderDashboard();
    });
});

// ============================================================
// LIVE CLOCK
// ============================================================
(function initClock() {
    const el = document.getElementById("liveClock");
    function tick() {
        const now = new Date();
        el.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    }
    tick();
    setInterval(tick, 1000);
})();

// ============================================================
// ROUTING
// ============================================================
const views = {
    generator: document.getElementById("view-generator"),
    dashboard: document.getElementById("view-dashboard"),
    projects:  document.getElementById("view-projects"),
    suites:    document.getElementById("view-suites"),
    history:   document.getElementById("view-history"),
};
document.querySelectorAll(".sidebar-nav .nav-item").forEach(btn => {
    btn.addEventListener("click", () => {
        const view = btn.dataset.view;
        if(!view) return;
        Object.values(views).forEach(v => (v.style.display = "none"));
        views[view].style.display = "block";
        document.querySelectorAll(".sidebar-nav .nav-item").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById("pageTitle").textContent =
            view === "generator" ? t("generatorPageTitle") : t(view);
        document.getElementById("pageSubtitle").style.display =
            (view === "generator") ? "block" : "none";
        if(view === "dashboard") renderDashboard();
        if(view === "projects")  renderProjects();
        if(view === "suites")    renderSuites();
        if(view === "history")   renderHistory();
        closeSidebar();
    });
});

// ── Mobile sidebar toggle ──
const hamburgerBtn = document.getElementById("hamburgerBtn");
const sidebar = document.querySelector(".sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
hamburgerBtn.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("open");
    sidebarOverlay.classList.toggle("visible");
    hamburgerBtn.innerHTML = isOpen ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    lucide.createIcons();
});
sidebarOverlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    sidebarOverlay.classList.remove("visible");
    hamburgerBtn.innerHTML = '<i data-lucide="menu"></i>';
    lucide.createIcons();
});

// ============================================================
// MODALS
// ============================================================
const modalOverlay = document.getElementById("modalOverlay");
let trapCleanup = null;
function trapFocus(container) {
    const prev = document.activeElement;
    const focusable = container.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return () => {};
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    const handler = (e) => {
        if (e.key !== "Tab") return;
        if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
            if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
    };
    container.addEventListener("keydown", handler);
    setTimeout(() => first.focus(), 50);
    return () => {
        container.removeEventListener("keydown", handler);
        if (prev && prev.focus) prev.focus();
    };
}
function openModal(title, contentHTML) {
    if (trapCleanup) trapCleanup();
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalContent").innerHTML = contentHTML;
    modalOverlay.classList.add("visible");
    lucide.createIcons();
    trapCleanup = trapFocus(modalOverlay);
}
function closeModal() {
    modalOverlay.classList.remove("visible");
    if (trapCleanup) { trapCleanup(); trapCleanup = null; }
}

function showConfirm(message, dangerLabel) {
    return new Promise(resolve => {
        const overlay = document.getElementById("confirmOverlay");
        document.getElementById("confirmMessage").textContent = message;
        const okBtn = document.getElementById("confirmOk");
        okBtn.textContent = dangerLabel || "Delete";
        okBtn.style.background = dangerLabel ? "linear-gradient(135deg,var(--danger),#b91c1c)" : "linear-gradient(135deg,var(--primary),var(--primary-dark))";
        overlay.classList.add("visible");
        lucide.createIcons();
        const cleanup = () => { overlay.classList.remove("visible"); };
        document.getElementById("confirmOk").onclick = () => { cleanup(); resolve(true); };
        document.getElementById("confirmCancel").onclick = () => { cleanup(); resolve(false); };
        document.getElementById("confirmClose").onclick = () => { cleanup(); resolve(false); };
        overlay.addEventListener("click", e => { if (e.target === overlay) { cleanup(); resolve(false); } });
    });
}
document.getElementById("modalClose").addEventListener("click", closeModal);
modalOverlay.addEventListener("click", e => { if(e.target === modalOverlay) closeModal(); });

// Focus trap for all modal overlays
document.querySelectorAll(".modal-overlay").forEach(overlay => {
    new MutationObserver((mutations) => {
        const visible = mutations.some(m => m.target.classList.contains("visible"));
        if (visible) {
            if (trapCleanup) trapCleanup();
            trapCleanup = trapFocus(overlay);
        } else if (trapCleanup && !document.querySelector(".modal-overlay.visible")) {
            trapCleanup();
            trapCleanup = null;
        }
    }).observe(overlay, { attributes: true, attributeFilter: ["class"] });
});

const saveModalOverlay = document.getElementById("saveModalOverlay");
document.getElementById("saveModalClose").addEventListener("click",
    () => saveModalOverlay.classList.remove("visible"));
saveModalOverlay.addEventListener("click",
    e => { if(e.target === saveModalOverlay) saveModalOverlay.classList.remove("visible"); });

document.getElementById("saveProjectBtn").addEventListener("click", () => {
    if(!latestTestCases.length) return;
    document.getElementById("projectNameInput").value = "";
    document.getElementById("projectDescInput").value = "";
    saveModalOverlay.classList.add("visible");
    lucide.createIcons();
    setTimeout(() => document.getElementById("projectNameInput").focus(), 80);
});

document.getElementById("confirmSaveBtn").addEventListener("click", () => {
    const name = document.getElementById("projectNameInput").value.trim();
    if(!name) return;
    if(state.projects.some(p => p.name.toLowerCase() === name.toLowerCase())) {
        showToast(t("toastProjectExists")(name), "error");
        return;
    }
    state.projects.unshift({
        id: Date.now(),
        name,
        description: document.getElementById("projectDescInput").value.trim().slice(0, 120) || testInput.value.trim().slice(0, 90),
        created: new Date().toISOString().slice(0, 10),
        testCases: JSON.parse(JSON.stringify(latestTestCases)),
    });
    saveState();
    saveModalOverlay.classList.remove("visible");

    testInput.value = "";
    charCounter.textContent = "0 " + t("charCounterLabel");
    updateGenerateBtn();
    latestTestCases = [];
    saveLatestTestCases();
    renderSavedTestCards();
    toggleActionBtns();
    updateUsageCounter();
    renderDashboard();
    renderProjects();
    closeSidebar();
});

document.getElementById("projectNameInput").addEventListener("keydown", e => {
    if(e.key === "Enter") document.getElementById("confirmSaveBtn").click();
});

// ============================================================
// USAGE COUNTER
// ============================================================
function updateUsageCounter() {
    const el = document.getElementById("usageCounter");
    if (!el) return;
    const fn = i18n[lang]?.usageFn;
    const total = state.usageTotal || 0;
    el.innerHTML =
        `<span style="display:block;font-size:18px;font-weight:800;">${total}</span>` +
        (typeof fn === "function" ? fn(total) : t("charCounterLabel"));
}

// ============================================================
// LIVE PREVIEW TYPING ANIMATION
// ============================================================
(function initLivePreview() {
    const phrases = {
        en: [
            "As a user, I want to log in with email and password…",
            "As a manager, I want to track team progress by sprint…",
            "User can upload PDF, DOCX, PNG files up to 10 MB…",
            "Shopping cart should persist across browser sessions…",
            "Password reset link expires after 30 minutes…",
            "Search results filter by category, price and rating…",
        ],
        fi: [
            "Käyttäjänä haluan kirjautua sisään sähköpostilla ja salasanalla…",
            "Esimiehenä haluan seurata tiimin edistymistä sprintin mukaan…",
            "Käyttäjä voi ladata PDF-, DOCX- ja PNG-tiedostoja enintään 10 Mt…",
            "Ostoskorin tulee säilyä eri selainistuntojen välillä…",
            "Salasanan palautuslinkki vanhenee 30 minuutissa…",
            "Hakutulokset suodatetaan luokan, hinnan ja arvostelun mukaan…",
        ],
    };
    const el = document.getElementById("livePreviewText");
    let phraseIdx = 0, charIdx = 0, deleting = false;
    function tick() {
        const phrase = (phrases[lang] || phrases.en)[phraseIdx];
        if(!deleting) {
            charIdx++;
            el.innerHTML = esc(phrase.slice(0, charIdx)) + '<span class="live-preview-cursor"></span>';
            if(charIdx >= phrase.length) {
                deleting = true;
                setTimeout(tick, 1800);
                return;
            }
            setTimeout(tick, 40);
        } else {
            charIdx--;
            el.innerHTML = esc(phrase.slice(0, charIdx)) + '<span class="live-preview-cursor"></span>';
            if(charIdx === 0) {
                deleting = false;
                phraseIdx = (phraseIdx + 1) % (phrases[lang] || phrases.en).length;
                setTimeout(tick, 350);
                return;
            }
            setTimeout(tick, 18);
        }
    }
    setTimeout(tick, 800);
})();

// ============================================================
// PROGRESS BAR
// ============================================================
let progressInterval;
function startProgress() {
    const wrap = document.getElementById("progressWrap");
    const bar  = document.getElementById("progressBar");
    wrap.style.display = "block";
    bar.style.width = "0%";
    let pct = 0;
    progressInterval = setInterval(() => {
        pct += Math.random() * 9 + 2;
        if(pct > 85) pct = 85;
        bar.style.width = pct + "%";
    }, 320);
}
function finishProgress(success = true) {
    clearInterval(progressInterval);
    const bar  = document.getElementById("progressBar");
    const wrap = document.getElementById("progressWrap");
    if(!success) bar.style.background = "#dc2626";
    bar.style.width = "100%";
    setTimeout(() => {
        wrap.style.display = "none";
        bar.style.width = "0%";
        bar.style.background = "";
    }, 650);
}

// ============================================================
// GENERATOR
// ============================================================
const resultsEl   = document.getElementById("results");
const actionBtns  = ["exportJson","exportCsv","exportExcel","exportWord","saveProjectBtn"].map(id => document.getElementById(id));
function toggleActionBtns() {
    const has = latestTestCases.length > 0;
    actionBtns.forEach(btn => btn.disabled = !has);
}
const generateBtn = document.getElementById("generateBtn");
const testInput   = document.getElementById("testInput");
const charCounter = document.getElementById("charCounter");
let latestTestCases = [];
let comparisonPeriod = "thisWeek";
let projectFilter = "";

function updateGenerateBtn() {
    generateBtn.disabled = !testInput.value.trim();
}
testInput.addEventListener("input", () => {
    updateCharCounter();
    updateGenerateBtn();
    const hasContent = testInput.value.length > 0;
    clearTextareaBtn.classList.toggle("visible", hasContent);
    clearTimeout(draftTimeout);
    draftTimeout = setTimeout(saveDraft, 1000);
});
updateGenerateBtn();

const priorityOrder  = { Critical:1, High:2, Medium:3, Low:4, Trivial:5 };
const priorityColors = { Critical:"#dc2626", High:"#f97316", Medium:"#3b82f6", Low:"#10b981", Trivial:"#6b7280" };

function getFeedback() {
    try { return JSON.parse(localStorage.getItem("qa_feedback") || "{}"); } catch(e) { return {}; }
}
function saveFeedback(fb) {
    localStorage.setItem("qa_feedback", JSON.stringify(fb));
}

// ============================================================
// EXPORTS
// ============================================================
document.getElementById("exportJson").addEventListener("click", () => {
    if(!latestTestCases.length) return;
    dlBlob(new Blob([JSON.stringify(latestTestCases,null,2)],{type:"application/json"}),"test-cases.json");
});
document.getElementById("exportCsv").addEventListener("click", () => {
    if(!latestTestCases.length) return;
    const header = ["ID","Title","Description","Steps","Expected","Priority","Tags","Risk","Status"];
    const rows = latestTestCases.map(tc => [
        tc.id,tc.title,tc.description||"",
        (tc.steps||[]).join(" | "),tc.expected||"",
        tc.priority,(tc.tags||[]).join(" | "),tc.risk||"",tc.status||"Untested",
    ]);
    const csv = [header,...rows].map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
    dlBlob(new Blob([csv],{type:"text/csv"}),"test-cases.csv");
});
document.getElementById("exportExcel").addEventListener("click", () => {
    if(!latestTestCases.length) return;
    const wsData = [
        ["ID","Title","Description","Steps","Expected","Priority","Tags","Risk","Status"],
        ...latestTestCases.map(tc => [
            tc.id,tc.title,tc.description||"",
            (tc.steps||[]).join(" | "),tc.expected||"",
            tc.priority,(tc.tags||[]).join(", "),tc.risk||"",tc.status||"Untested",
        ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    ws["!cols"] = [8,30,40,48,40,12,22,40,12].map(w=>({wch:w}));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"Test Cases");
    XLSX.writeFile(wb,"test-cases.xlsx");
});
document.getElementById("exportWord").addEventListener("click", () => {
    if(!latestTestCases.length) return;
    const tableRows = latestTestCases.map(tc => `
        <tr>
            <td>${esc(tc.id)}</td><td>${esc(tc.title)}</td><td>${esc(tc.description||"")}</td>
            <td>${(tc.steps||[]).map(s=>`• ${esc(s)}`).join("<br>")}</td>
            <td>${esc(tc.expected||"")}</td><td>${esc(tc.priority)}</td>
            <td>${(tc.tags||[]).join(", ")}</td><td>${esc(tc.risk||"")}</td>
            <td>${tc.status||"Untested"}</td>
        </tr>`).join("");
    const html = `<html xmlns:o='urn:schemas-microsoft-com:office:office'
        xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='UTF-8'><style>
            body{font-family:Calibri,sans-serif;font-size:11pt;}h1{font-size:16pt;color:#1f2937;}
            table{border-collapse:collapse;width:100%;}
            th{background:#3b82f6;color:white;padding:8px;font-size:10pt;border:1px solid #2563eb;}
            td{padding:7px 8px;border:1px solid #e5e7eb;font-size:10pt;vertical-align:top;}
            tr:nth-child(even) td{background:#f9fafb;}
        </style></head><body>
        <h1>Test Cases — ${new Date().toLocaleDateString()}</h1>
        <table><thead><tr>
            <th>ID</th><th>Title</th><th>Description</th><th>Steps</th>
            <th>Expected</th><th>Priority</th><th>Tags</th><th>Risk</th><th>Status</th>
        </tr></thead><tbody>${tableRows}</tbody></table>
        </body></html>`;
    dlBlob(new Blob(["\uFEFF"+html],{type:"application/msword"}),"test-cases.doc");
});

// ============================================================
// DASHBOARD
// ============================================================
function renderDashboard() {
    const allProjectTests = state.projects.reduce((arr, p) => arr.concat(p.testCases), []);
    const filteredProjects = state.projects.filter(p => !projectFilter || p.name === projectFilter);
    const filteredTests = filteredProjects.reduce((arr, p) => arr.concat(p.testCases), []);
    const allTests = projectFilter ? filteredTests : filteredTests.concat(latestTestCases);
    const total = allTests.length;
    const pass = allTests.filter(tc => tc.status === "pass").length;
    const fail = allTests.filter(tc => tc.status === "fail").length;
    const blocked = allTests.filter(tc => tc.status === "blocked").length;
    const untested = allTests.filter(tc => !tc.status).length;

    if (total === 0 && state.usageTotal === 0) {
        document.getElementById("dashContent").innerHTML = `<div class="empty-state">${t("dashEmpty")}</div>`;
        return;
    }

    // ── Weekly comparison data ──
    function getWeekHistory(offset) {
        const today = new Date();
        const data = [];
        let maxVal = 0;
        for (let i = 6 + offset; i >= offset; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().slice(0, 10);
            const label = d.toLocaleDateString(lang === "fi" ? "fi" : "en", { weekday: "short" });
            const count = state.history.filter(h => h.date === dateStr).reduce((s, h) => s + h.count, 0);
            if (count > maxVal) maxVal = count;
            data.push({ label, count });
        }
        return { data, maxVal };
    }
    const thisWeekHist = getWeekHistory(0);
    const lastWeekHist = getWeekHistory(7);
    const thisWeekGen = thisWeekHist.data.reduce((s, d) => s + d.count, 0);
    const lastWeekGen = lastWeekHist.data.reduce((s, d) => s + d.count, 0);

    // ── Priority counts (filtered by comparisonPeriod) ──
    const fmt = d => d.toISOString().slice(0, 10);
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMon = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const mon = new Date(today);
    mon.setDate(today.getDate() - diffToMon);
    const weekStartStr = fmt(mon);
    const weekStart = comparisonPeriod === "lastWeek"
        ? fmt(new Date(mon.getTime() - 7 * 864e5))
        : weekStartStr;
    const weekEndDate = new Date(weekStart);
    weekEndDate.setDate(weekEndDate.getDate() + 7);
    const weekEndStr = fmt(weekEndDate);
    const weekTests = allTests.filter(tc =>
        tc.createdAt && tc.createdAt >= weekStart && tc.createdAt < weekEndStr
    );
    const priorityCounts = {};
    weekTests.forEach(tc => {
        if (!tc.priority) return;
        const p = tc.priority === "Trivial" ? "Low" : tc.priority;
        priorityCounts[p] = (priorityCounts[p]||0) + 1;
    });
    const pCounts = ["High","Medium","Low"].map(p => priorityCounts[p] || 0);
    const pTotal = pCounts.reduce((s,c) => s+c, 0);

    // ── Day-over-day trend ──
    const yesterdayStr = fmt(new Date(Date.now() - 864e5));
    const todayStr = fmt(new Date());
    const yesterdayCount = state.history.filter(h => h.date === yesterdayStr).reduce((s, h) => s + h.count, 0);
    const todayCount = state.history.filter(h => h.date === todayStr).reduce((s, h) => s + h.count, 0);
    function trendBadge(curr, prev) {
        if (prev <= 0) return '';
        const p = Math.round(((curr - prev) / prev) * 100);
        if (p === 0) return '';
        return `<span class="ent-badge ${p > 0 ? 'up' : 'down'}">${p > 0 ? '↑' : '↓'}${Math.abs(p)}%</span>`;
    }
    const dayTrend = trendBadge(todayCount, yesterdayCount);

    // ── Active period for trend ──
    const activeHist = comparisonPeriod === "thisWeek" ? thisWeekHist : lastWeekHist;
    const dayData = activeHist.data;
    const activeToggle = comparisonPeriod === "thisWeek" ? "thisWeek" : "lastWeek";

    // ── Assemble HTML ──
    const container = document.getElementById("dashContent");
    container.innerHTML = `
    <div class="ent-header">
        <div class="ent-title">${t('entTitle')}</div>
        <div class="ent-filters">
            <div class="toggle-row">
                <button class="toggle-btn${activeToggle === 'thisWeek' ? ' active' : ''}" data-period="thisWeek">${t('thisWeek')}</button>
                <button class="toggle-btn${activeToggle === 'lastWeek' ? ' active' : ''}" data-period="lastWeek">${t('lastWeek')}</button>
            </div>
            <select id="entProjFilter" class="ent-select">
                <option value="">${t('entAllProjects')}</option>
                ${state.projects.map(p => '<option value="' + p.name + '">' + p.name + '</option>').join('')}
            </select>
        </div>
    </div>

    <!-- KPI cards -->
    <div class="ent-cards">
        <div class="ent-card">
            <div class="ent-card-i"><i data-lucide="file-text" style="width:16px;height:16px;color:#3b82f6"></i></div>
            <div class="ent-card-b"><div class="ent-card-v" style="color:#3b82f6">${total}</div><div class="ent-card-l">${t('entTotal')}</div>${dayTrend}</div>
        </div>
        <div class="ent-card">
            <div class="ent-card-i"><i data-lucide="check-circle" style="width:16px;height:16px;color:#10b981"></i></div>
            <div class="ent-card-b"><div class="ent-card-v" style="color:#10b981">${pass}</div><div class="ent-card-l">${t('dashPass')}</div></div>
        </div>
        <div class="ent-card">
            <div class="ent-card-i"><i data-lucide="x-circle" style="width:16px;height:16px;color:#dc2626"></i></div>
            <div class="ent-card-b"><div class="ent-card-v" style="color:#dc2626">${fail}</div><div class="ent-card-l">${t('dashFail')}</div></div>
        </div>
        <div class="ent-card">
            <div class="ent-card-i"><i data-lucide="alert-triangle" style="width:16px;height:16px;color:#f97316"></i></div>
            <div class="ent-card-b"><div class="ent-card-v" style="color:#f97316">${blocked}</div><div class="ent-card-l">${t('dashBlocked')}</div></div>
        </div>
        <div class="ent-card">
            <div class="ent-card-i"><i data-lucide="clock" style="width:16px;height:16px;color:#94a3b8"></i></div>
            <div class="ent-card-b"><div class="ent-card-v" style="color:#94a3b8">${untested}</div><div class="ent-card-l">${t('dashUntested')}</div></div>
        </div>
    </div>

    <!-- Charts: bar + pie -->
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:12px;margin-bottom:14px;">
        <div class="ent-col">
            <div class="ent-chart-h">${t('statusColChart')}</div>
            <div class="chart-container" style="height:220px;"><canvas id="statusChart"></canvas></div>
        </div>
        <div class="ent-col">
            <div class="ent-chart-h">${t('priorityDistribution')}</div>
            <div style="height:200px;display:flex;align-items:center;justify-content:center;"><canvas id="priorityChart"></canvas></div>
        </div>
    </div>

    <!-- Bottom: trend + table -->
    <div style="display:flex;flex-direction:column;gap:14px;">
        <div class="ent-col">
            <div class="ent-chart-h">${t('dailyTrend')}</div>
            <div style="height:160px;"><canvas id="trendChart"></canvas></div>
        </div>
        <div class="ent-col">
            <div class="ent-chart-h">${t('entRecent')}</div>
            <div class="ent-table-wrap">
                <table class="ent-table">
                    <thead><tr>
                        <th>${t('colId')}</th><th>${t('colTitle')}</th><th>${t('colStatus')}</th><th>${t('colPriority')}</th><th>${t('colExecDate')}</th>
                    </tr></thead>
                        <tbody>${(() => {
                            return allTests.slice().sort((a,b) => (b.createdAt||'').localeCompare(a.createdAt||'')).slice(0,16).map((tc, i) => {
                            const s = tc.status || "untested";
                            const sc = 'status-' + s;
                            const sl = t(s);
                            const p = tc.priority === "Trivial" ? "Low" : (tc.priority || "Low");
                            const pc = 'priority-' + p.toLowerCase();
                            const pl = t('p' + p);
                            return '<tr><td class="ent-id">TC-' + (tc.id || (i + 1)) + '</td><td>' + esc(tc.title || tc.feature || '') + '</td><td><span class="status-badge ' + sc + '">' + sl + '</span></td><td><span class="priority-badge ' + pc + '">' + pl + '</span></td><td style="color:var(--text-muted);font-size:10px;">' + (tc.createdAt || todayStr) + '</td></tr>';
                        }).join('');
                    })()}</tbody>
                </table>
            </div>
        </div>
    </div>`;

    // ── Init charts ──
    if (typeof Chart !== 'undefined') {
        const txtCol = getComputedStyle(document.documentElement).getPropertyValue('--text-muted').trim() || '#64748b';
        const bdrCol = getComputedStyle(document.documentElement).getPropertyValue('--border').trim() || '#e2e8f0';
        new Chart(document.getElementById('statusChart'), {
            type:'bar',
            data:{
                labels:[t('dashPass'),t('dashFail'),t('dashBlocked'),t('dashUntested')],
                datasets:[{ data:[pass,fail,blocked,untested], backgroundColor:['#10b981cc','#dc2626cc','#f97316cc','#94a3b8cc'], borderColor:['#10b981','#dc2626','#f97316','#94a3b8'], borderWidth:1, borderRadius:4, borderSkipped:false, barPercentage:0.55, minBarLength:2 }]
            },
            options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false}, tooltip:{backgroundColor:'#0f172a',titleFont:{size:11},bodyFont:{size:12},padding:10,cornerRadius:8} }, scales:{ y:{ beginAtZero:true, grid:{color:bdrCol}, ticks:{font:{size:10},color:txtCol} }, x:{ grid:{display:false}, ticks:{font:{size:10},color:txtCol} } } }
        });

        new Chart(document.getElementById('priorityChart'), {
            type:'doughnut',
            data:{ labels:[t('pCritical'),t('pHigh'),t('pMedium'),t('pLow')], datasets:[{ data:[priorityCounts["Critical"]||0, priorityCounts["High"]||0, priorityCounts["Medium"]||0, priorityCounts["Low"]||0], backgroundColor:['#dc2626cc','#f97316cc','#3b82f6cc','#10b981cc'], borderColor:['#dc2626','#f97316','#3b82f6','#10b981'], borderWidth:2 }] },
            options:{ responsive:true, maintainAspectRatio:false, cutout:'65%', plugins:{ legend:{display:true, position:'bottom', labels:{boxWidth:10,boxHeight:10,borderRadius:2,font:{size:10},color:txtCol,padding:12,usePointStyle:true,pointStyle:'rectRounded'}}, tooltip:{backgroundColor:'#0f172a',titleFont:{size:11},bodyFont:{size:12},padding:10,cornerRadius:8} } }
        });

        new Chart(document.getElementById('trendChart'), {
            type:'line',
            data:{ labels:dayData.map(d=>d.label), datasets:[{ data:dayData.map(d=>d.count), borderColor:'#3b82f6', backgroundColor:'rgba(59,130,246,0.08)', fill:true, tension:0.35, pointBackgroundColor:'#3b82f6', pointBorderColor:'#fff', pointBorderWidth:2, pointRadius:4, pointHoverRadius:6 }] },
            options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false}, tooltip:{backgroundColor:'#0f172a',titleFont:{size:11},bodyFont:{size:12},padding:10,cornerRadius:8} }, scales:{ y:{ beginAtZero:true, grid:{color:bdrCol}, ticks:{font:{size:10},color:txtCol} }, x:{ grid:{display:false}, ticks:{font:{size:10},color:txtCol} } } }
        });
    }

    lucide.createIcons();

    // ── Toggle click ──
    document.querySelectorAll(".toggle-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const period = this.dataset.period;
            if (period !== comparisonPeriod) {
                comparisonPeriod = period;
                renderDashboard();
            }
        });
    });

    // ── Project filter ──
    document.getElementById("entProjFilter").addEventListener("change", function() {
        projectFilter = this.value;
        renderDashboard();
    });
}

function renderSidebarWidgets() {}

// ============================================================
// HISTORY
// ============================================================
function renderHistory() {
    const el = document.getElementById("historyContent");
    if(!state.history.length) {
        el.innerHTML = `<div class="empty-state">${t("emptyHistory")}</div>`;
        return;
    }

    const tableHtml = `
        <table>
            <thead><tr>
                <th>${t("colFeature")}</th>
                <th>${t("colGenerated")}</th>
                <th>${t("colTime")}</th>
                <th>${t("colCount")}</th>
            </tr></thead>
            <tbody id="historyBody">${state.history.map(h => `
                <tr>
                    <td>${esc(h.feature)}</td>
                    <td>${h.date}</td>
                    <td>${h.time ? `<span class="time-badge">${esc(h.time)}</span>` : "—"}</td>
                    <td>${h.count}</td>
                </tr>`).join("")}
            </tbody>
        </table>
        <div id="historyEmpty" class="empty-state" style="display:none;padding:24px;">${t("noSearchResults")}</div>`;

    el.innerHTML = tableHtml;

    if (!document.getElementById("historySearch")) {
        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.className = "search-input";
        searchInput.placeholder = t("searchHistory");
        searchInput.id = "historySearch";

        const searchWrapper = document.createElement("div");
        searchWrapper.className = "search-wrapper";
        searchWrapper.innerHTML = `
            <label class="sr-only" for="historySearch">${esc(t("searchHistory"))}</label>
            <i data-lucide="search" class="search-icon"></i>
            <input type="text" id="historySearch" class="search-input" placeholder="${esc(t("searchHistory"))}" />
            <button class="search-clear" id="clearHistorySearch"><i data-lucide="x"></i></button>`;

        el.parentNode.insertBefore(searchWrapper, el);

        document.getElementById("historySearch").addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            document.getElementById("clearHistorySearch").classList.toggle("visible", query.length > 0);
            let shown = 0;
            document.querySelectorAll("#historyBody tr").forEach(row => {
                const match = row.textContent.toLowerCase().includes(query);
                row.style.display = match ? "" : "none";
                if (match) shown++;
            });
            const empty = document.getElementById("historyEmpty");
            if (empty) empty.style.display = shown === 0 && query ? "" : "none";
        });

        document.getElementById("clearHistorySearch").addEventListener("click", () => {
            const input = document.getElementById("historySearch");
            input.value = "";
            input.dispatchEvent(new Event("input"));
        });

        lucide.createIcons();
    }
}
document.getElementById("clearHistoryBtn").addEventListener("click", () => {
    state.history = [];
    saveState();
    renderHistory();
});

document.getElementById("clearAllBtn").addEventListener("click", async () => {
    const ok = await showConfirm(t("confirmClearAll"), t("clearAllData"));
    if(!ok) return;
    state.usageTotal = 0;
    state.history = [];
    state.projects = [];
    latestTestCases = [];
    saveState();
    saveLatestTestCases();
    renderSavedTestCards();
    toggleActionBtns();
    updateUsageCounter();
    renderDashboard();
    renderHistory();
    renderProjects();
    renderSuites();
    closeSidebar();
});

// ============================================================
// PROJECTS
// ============================================================
async function deleteProject(id, e) {
    if(e) { e.stopPropagation(); e.preventDefault(); }
    const ok = await showConfirm(t("confirmDelete"), t("delete"));
    if(!ok) return;
    state.projects = state.projects.filter(p => String(p.id) !== String(id));
    saveState();
    renderProjects();
    renderSuites();
    renderDashboard();
}

function renderProjects() {
    const el = document.getElementById("projectsContent");
    if(!state.projects.length) {
        el.innerHTML = `<div class="empty-state">${t("emptyProjects")}</div>`;
        return;
    }
    const tableHtml = `
        <table>
            <thead><tr>
                <th>${t("colName")}</th>
                <th>${t("colDesc")}</th>
                <th>${t("colCreated")}</th>
                <th></th>
                <th></th>
            </tr></thead>
            <tbody id="projectsBody">${state.projects.map(p => `
                <tr class="clickable" data-pid="${p.id}">
                    <td><strong>${esc(p.name)}</strong></td>
                    <td style="color:var(--text-muted);max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(p.description)}</td>
                    <td>${p.created}</td>
                    <td style="color:var(--text-muted);font-size:13px;">${p.testCases.length} ${t("testsLabel")}</td>
                    <td>
                        <button class="danger-btn delete-project-btn" data-pid="${p.id}">
                            ${t("delete")}
                        </button>
                    </td>
                </tr>`).join("")}
            </tbody>
        </table>
        <div id="projectsEmpty" class="empty-state" style="display:none;padding:24px;">${t("noSearchResults")}</div>`;

    el.innerHTML = tableHtml;

    el.querySelectorAll(".delete-project-btn").forEach(btn => {
        btn.addEventListener("click", e => deleteProject(btn.dataset.pid, e));
    });
    el.querySelectorAll("tr.clickable").forEach(row => {
        row.addEventListener("click", e => {
            if(e.target.closest(".delete-project-btn")) return;
            const project = state.projects.find(p => String(p.id) === row.dataset.pid);
            if(!project) return;
            const rows = project.testCases.map(tc => `
                <tr>
                    <td>${esc(tc.id)}</td><td>${esc(tc.title)}</td>
                    <td><span class="priority-badge priority-${esc(tc.priority)}" style="font-size:11px;">${priorityLabel(tc.priority)}</span></td>
                    <td style="color:var(--text-muted)">${statusLabel(tc.status)}</td>
                </tr>`).join("");
            openModal(project.name, `
                <p style="color:var(--text-muted);font-size:13px;margin-top:0;">${esc(project.description)}</p>
                <table style="font-size:14px">
                    <thead><tr><th>${t("colId")}</th><th>${t("colTitle")}</th><th>${t("colPriority")}</th><th>${t("colStatus")}</th></tr></thead>
                    <tbody>${rows}</tbody>
                </table>`);
        });
    });
    lucide.createIcons();

    if (!document.getElementById("projectsSearch")) {
        const searchWrapper = document.createElement("div");
        searchWrapper.className = "search-wrapper";
        searchWrapper.innerHTML = `
            <label class="sr-only" for="projectsSearch">${esc(t("searchProjects"))}</label>
            <i data-lucide="search" class="search-icon"></i>
            <input type="text" id="projectsSearch" class="search-input" placeholder="${esc(t("searchProjects"))}" />
            <button class="search-clear" id="clearProjectsSearch"><i data-lucide="x"></i></button>`;

        el.parentNode.insertBefore(searchWrapper, el);

        document.getElementById("projectsSearch").addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            document.getElementById("clearProjectsSearch").classList.toggle("visible", query.length > 0);
            let shown = 0;
            document.querySelectorAll("#projectsBody tr").forEach(row => {
                const name = row.cells[0]?.textContent.toLowerCase() || "";
                const match = name.includes(query);
                row.style.display = match ? "" : "none";
                if (match) shown++;
            });
            const empty = document.getElementById("projectsEmpty");
            if (empty) empty.style.display = shown === 0 && query ? "" : "none";
        });

        document.getElementById("clearProjectsSearch").addEventListener("click", () => {
            const input = document.getElementById("projectsSearch");
            input.value = "";
            input.dispatchEvent(new Event("input"));
        });

        lucide.createIcons();
    }
}

// ============================================================
// SUITES
// ============================================================
function renderSuites() {
    const el = document.getElementById("suitesContent");
    if(!state.projects.length) {
        el.innerHTML = `<div class="table-card"><div class="empty-state">${t("emptyProjects")}</div></div>`;
        return;
    }
    el.innerHTML = state.projects.map(p => `
        <div class="table-card" style="margin-bottom:24px;">
            <div class="section-header">
                <h2>${esc(p.name)}</h2>
                <div style="display:flex;align-items:center;gap:14px;">
                    <span style="color:var(--text-muted);font-size:13px;">${p.created}</span>
                    <button class="danger-btn delete-suite-btn" data-pid="${p.id}">
                        ${t("delete")}
                    </button>
                </div>
            </div>
            <table>
                <thead><tr><th>${t("colId")}</th><th>${t("colTitle")}</th><th>${t("colPriority")}</th><th>${t("colStatus")}</th></tr></thead>
                <tbody>${p.testCases.map(tc => `
                    <tr>
                        <td>${esc(tc.id)}</td><td>${esc(tc.title)}</td>
                        <td><span class="priority-badge priority-${esc(tc.priority)}" style="font-size:11px;">${priorityLabel(tc.priority)}</span></td>
                        <td style="color:var(--text-muted)">${statusLabel(tc.status)}</td>
                    </tr>`).join("")}
                </tbody>
            </table>
        </div>`).join("");

    el.querySelectorAll(".delete-suite-btn").forEach(btn => {
        btn.addEventListener("click", e => deleteProject(btn.dataset.pid, e));
    });
    lucide.createIcons();
}

// ============================================================
// NEW FEATURES: TOAST NOTIFICATIONS
// ============================================================
function showToast(message, type = "info", duration = 3000) {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const icons = { success: "check-circle", error: "x-circle", info: "info", warning: "alert-triangle" };
    toast.innerHTML = `<i data-lucide="${icons[type]}"></i><span>${esc(message)}</span>`;

    container.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.style.animation = "slideOutToast 0.3s ease forwards";
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ============================================================
// NEW FEATURES: KEYBOARD SHORTCUTS
// ============================================================
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
        const activeView = document.querySelector(".sidebar-nav .nav-item.active")?.dataset.view;
        if (activeView === "generator" && !generateBtn.disabled) {
            generateBtn.click();
        }
    }
    if (e.key === "Escape") {
        const activeModal = document.querySelector(".modal-overlay.visible");
        if (activeModal) {
            activeModal.classList.remove("visible");
        }
    }
    if (e.ctrlKey && e.key === "z" && !e.shiftKey) {
        // Do nothing (Ctrl+Z)
    }
});



const clearTextareaBtn = document.getElementById("clearTextarea");
clearTextareaBtn.addEventListener("click", () => {
    testInput.value = "";
    updateCharCounter();
    updateGenerateBtn();
    clearTextareaBtn.classList.remove("visible");
    showToast(t("toastCleared"), "info", 1500);
});

// ============================================================
// NEW FEATURES: AUTO-SAVE DRAFT
// ============================================================
let draftTimeout;
function saveDraft() {
    localStorage.setItem("qa_draft", testInput.value);
}
function loadDraft() {
    const draft = localStorage.getItem("qa_draft");
    if (draft) {
        testInput.value = draft;
        updateCharCounter();
        clearTextareaBtn.classList.toggle("visible", draft.length > 0);
    }
}

// ============================================================
// NEW FEATURES: CHARACTER LIMIT WARNING
// ============================================================
const CHAR_LIMIT = 5000;
const CHAR_WARNING = 4000;
const CHAR_DANGER = 4500;

function updateCharCounter() {
    const len = testInput.value.length;
    const label = t("charCounterLabel") || "characters";
    charCounter.textContent = `${len} ${label}`;

    charCounter.classList.remove("char-warning", "char-danger");
    if (len >= CHAR_DANGER) {
        charCounter.classList.add("char-danger");
    } else if (len >= CHAR_WARNING) {
        charCounter.classList.add("char-warning");
}
}

// ============================================================
// NEW FEATURES: COPY TO CLIPBOARD
// ============================================================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(t("toastCopied"), "success");
    }).catch(() => {
        showToast(t("toastCopyFailed"), "error");
    });
}

function copyTestCase(tc) {
    const text = `ID: ${tc.id}
Title: ${tc.title}
Description: ${tc.description}
Steps: ${tc.steps.join("\n")}
Expected: ${tc.expected}
Priority: ${tc.priority}
Tags: ${tc.tags.join(", ")}`;
    copyToClipboard(text);
}

function copyAllTestCases() {
    if (!latestTestCases.length) return;
    const text = latestTestCases.map(tc =>
        `TC-${tc.id}: ${tc.title}\n${tc.description}\n\nSteps:\n${tc.steps.map((s,i) => `${i+1}. ${s}`).join("\n")}\n\nExpected: ${tc.expected}\n`
    ).join("\n---\n\n");
    copyToClipboard(text);
}

// ============================================================
// NEW FEATURES: BULK SELECT & DELETE
// ============================================================
let selectedTestCases = new Set();

function updateBulkActions() {
    const bulkActions = document.getElementById("bulkActions");
    const selectedCount = document.getElementById("selectedCount");
    const count = selectedTestCases.size;

    bulkActions.classList.toggle("visible", count > 0);
    selectedCount.textContent = count;
}

function toggleTestCaseSelection(tcId) {
    if (selectedTestCases.has(tcId)) {
        selectedTestCases.delete(tcId);
    } else {
        selectedTestCases.add(tcId);
    }
    updateBulkActions();
    renderSavedTestCards();
}

function selectAllTestCases() {
    latestTestCases.forEach(tc => selectedTestCases.add(tc.id));
    updateBulkActions();
    renderSavedTestCards();
}

function deselectAllTestCases() {
    selectedTestCases.clear();
    updateBulkActions();
    renderSavedTestCards();
}

function deleteSelectedTestCases() {
    if (selectedTestCases.size === 0) return;
    const count = selectedTestCases.size;
    document.getElementById("bulkDeleteText").innerHTML = typeof t("confirmBulkDelete") === "function" ? t("confirmBulkDelete")(count) : t("confirmBulkDelete").replace("{n}", `<strong>${count}</strong>`);
    document.getElementById("bulkDeleteOverlay").classList.add("visible");
}

document.getElementById("selectAllBtn").addEventListener("click", selectAllTestCases);
document.getElementById("deselectAllBtn").addEventListener("click", deselectAllTestCases);
document.getElementById("deleteSelectedBtn").addEventListener("click", deleteSelectedTestCases);
document.getElementById("bulkDeleteClose").addEventListener("click", () => {
    document.getElementById("bulkDeleteOverlay").classList.remove("visible");
});
document.getElementById("cancelBulkDelete").addEventListener("click", () => {
    document.getElementById("bulkDeleteOverlay").classList.remove("visible");
});
document.getElementById("confirmBulkDelete").addEventListener("click", () => {
    latestTestCases = latestTestCases.filter(tc => !selectedTestCases.has(tc.id));
    selectedTestCases.clear();
    saveLatestTestCases();
    renderSavedTestCards();
    updateBulkActions();
    toggleActionBtns();
    document.getElementById("bulkDeleteOverlay").classList.remove("visible");
    showToast(t("deletedTests"), "success");
});

// ============================================================
// NEW FEATURES: DUPLICATE TEST CASE
// ============================================================
function duplicateTestCase(tc, index) {
    const newTc = JSON.parse(JSON.stringify(tc));
    newTc.id = `TC-${String(latestTestCases.length + 1).padStart(3, '0')}`;
    newTc.status = null;
    latestTestCases.splice(index + 1, 0, newTc);
    saveLatestTestCases();
    renderSavedTestCards();
    showToast(t("toastTestDuplicated"), "success");
}

// ============================================================
// NEW FEATURES: SKELETON LOADER
// ============================================================
function showSkeletonLoader() {
    resultsEl.innerHTML = Array(3).fill().map(() => `
        <div class="skeleton-card">
            <div class="skeleton-line short skeleton-badge"></div>
            <div class="skeleton-line medium" style="margin-top:20px;"></div>
            <div class="skeleton-line full"></div>
            <div class="skeleton-line medium"></div>
        </div>
    `).join("");
}

// ============================================================
// ============================================================
// API CONFIG
// ============================================================
function loadApiConfig() {
    const config = JSON.parse(localStorage.getItem("qa_api_config") || "{}");
    document.getElementById("apiUrlInput").value = config.url || "";
    document.getElementById("apiModelInput").value = config.model || "claude-sonnet-4-20250514";
    document.getElementById("apiTokensInput").value = config.tokens || 4096;
    document.getElementById("apiKeyInput").value = "";
    const btn = document.getElementById("saveApiConfig");
    btn.disabled = true;
    btn._initial = JSON.stringify({
        url: document.getElementById("apiUrlInput").value,
        model: document.getElementById("apiModelInput").value,
        tokens: document.getElementById("apiTokensInput").value,
        apiKey: document.getElementById("apiKeyInput").value
    });
}

function getApiConfig() {
    return {
        url: document.getElementById("apiUrlInput").value.trim(),
        model: document.getElementById("apiModelInput").value.trim() || "claude-sonnet-4-20250514",
        tokens: parseInt(document.getElementById("apiTokensInput").value) || 4096,
        apiKey: document.getElementById("apiKeyInput").value.trim()
    };
}

document.getElementById("toggleApiKey").addEventListener("click", () => {
    const inp = document.getElementById("apiKeyInput");
    const btn = document.getElementById("toggleApiKey");
    const isPassword = inp.type === "password";
    inp.type = isPassword ? "text" : "password";
    btn.innerHTML = isPassword ? '<i data-lucide="eye-off"></i>' : '<i data-lucide="eye"></i>';
    lucide.createIcons();
});

document.getElementById("openApiConfigBtn").addEventListener("click", () => {
    loadApiConfig();
    document.getElementById("apiConfigOverlay").classList.add("visible");
    closeSidebar();
});

document.getElementById("apiConfigClose").addEventListener("click", () => {
    document.getElementById("apiConfigOverlay").classList.remove("visible");
});

document.getElementById("apiConfigOverlay").addEventListener("input", (e) => {
    if (!e.target.closest("#apiUrlInput, #apiModelInput, #apiTokensInput, #apiKeyInput")) return;
    const btn = document.getElementById("saveApiConfig");
    const cur = JSON.stringify({
        url: document.getElementById("apiUrlInput").value,
        model: document.getElementById("apiModelInput").value,
        tokens: document.getElementById("apiTokensInput").value,
        apiKey: document.getElementById("apiKeyInput").value
    });
    btn.disabled = cur === btn._initial;
});

document.getElementById("saveApiConfig").addEventListener("click", () => {
    const cfg = getApiConfig();
    localStorage.setItem("qa_api_config", JSON.stringify({
        url: cfg.url,
        model: cfg.model,
        tokens: cfg.tokens
    }));
    document.getElementById("apiConfigOverlay").classList.remove("visible");
    showToast(t("toastApiConfigSaved"), "success");
});

// ============================================================
// NEW FEATURES: IMPORT/EXPORT ALL DATA
// ============================================================
document.getElementById("openImportExportBtn").addEventListener("click", () => {
    document.getElementById("importExportOverlay").classList.add("visible");
});

document.getElementById("importExportClose").addEventListener("click", () => {
    document.getElementById("importExportOverlay").classList.remove("visible");
});

document.getElementById("exportAllData").addEventListener("click", () => {
    const data = {
        version: 2,
        exported: new Date().toISOString(),
        projects: state.projects,
        history: state.history,
        usageTotal: state.usageTotal,
        latestTestCases: latestTestCases,
        settings: {
            lang: localStorage.getItem("qa_lang"),
            theme: localStorage.getItem("qa_theme")
        }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    dlBlob(blob, `qa-studio-backup-${new Date().toISOString().slice(0,10)}.json`);
    showToast(t("toastDataExported"), "success");
});

document.getElementById("selectImportFile").addEventListener("click", () => {
    document.getElementById("importFileInput").click();
});

document.getElementById("importFileInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
        try {
            const data = JSON.parse(event.target.result);

            if (!data || typeof data !== "object") throw new Error(t("errImportInvalid"));
            if (data.version !== 2) throw new Error(t("errImportVersion"));

            const ok = await showConfirm(t("confirmImportData"), t("importConfirmTitle"));
            if (!ok) return;

            if (Array.isArray(data.projects)) state.projects = data.projects;
            if (Array.isArray(data.history)) state.history = data.history;
            if (typeof data.usageTotal === "number") state.usageTotal = data.usageTotal;
            if (Array.isArray(data.latestTestCases)) latestTestCases = data.latestTestCases;
            if (data.settings && typeof data.settings === "object") {
                if (data.settings.lang === "en" || data.settings.lang === "fi") {
                    lang = data.settings.lang;
                    localStorage.setItem("qa_lang", lang);
                    localStorage.setItem("qa_landing_lang", lang);
                }
                if (data.settings.theme === "light" || data.settings.theme === "dark") {
                    document.body.classList.remove("light", "dark");
                    document.body.classList.add(data.settings.theme);
                    void document.body.offsetHeight;
                    localStorage.setItem("qa_theme", data.settings.theme);
                }
            }

            saveState();
            saveLatestTestCases();

            document.getElementById("importExportOverlay").classList.remove("visible");
            applyLang();
            renderSavedTestCards();
            toggleActionBtns();
            renderDashboard();
            renderHistory();
            renderProjects();
            renderSuites();
            updateUsageCounter();

            showToast(t("toastDataImported"), "success");
        } catch (err) {
            showToast(t("toastImportFailed"), "error");
        }
    };
    reader.readAsText(file);
    e.target.value = "";
});

// ============================================================
// NEW FEATURES: INLINE EDIT
// ============================================================
function makeEditable(element, initialValue, onSave) {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "inline-edit";
    input.value = initialValue;

    element.innerHTML = "";
    element.appendChild(input);
    input.focus();
    input.select();

    const save = () => {
        onSave(input.value);
    };

    input.addEventListener("blur", save);
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            input.blur();
        }
        if (e.key === "Escape") {
            input.value = initialValue;
            input.blur();
        }
    });
}

// ============================================================
// openEditModal — edit all test case fields
// ============================================================
function openEditModal(tc, cardDiv) {
    const tagsVal = (tc.tags || []).join(", ");
    const priorities = ["Critical", "High", "Medium", "Low", "Trivial"];

    function stepsHTML(arr) {
        return (arr || [""]).map((s, i) => `
            <div class="edit-step-row">
                <span class="edit-step-num">${i + 1}.</span>
                <input class="api-input edit-step-input" value="${esc(s)}" />
                <button class="edit-step-remove" ${(arr||[]).length <= 1 ? "style='visibility:hidden'" : ""}><i data-lucide="x"></i></button>
            </div>
        `).join("");
    }

    const html = `
        <div class="edit-form">
            <label>${t("detailTitle")}</label>
            <input id="edit-title" class="api-input" value="${esc(tc.title)}" />

            <label style="margin-top:12px;">${t("detailDescription")}</label>
            <textarea id="edit-desc" class="api-input" rows="2">${esc(tc.description || "")}</textarea>

            <label style="margin-top:12px;">${t("detailSteps")}</label>
            <div id="edit-steps-container">${stepsHTML(tc.steps)}</div>
            <button id="edit-step-add" class="secondary-btn" style="margin-top:6px;font-size:12px;padding:4px 12px;"><i data-lucide="plus"></i> ${t("addStep")}</button>

            <label style="margin-top:12px;">${t("detailExpected")}</label>
            <textarea id="edit-expected" class="api-input" rows="2">${esc(tc.expected || "")}</textarea>

            <label style="margin-top:12px;">${t("editLabelPriority")}</label>
            <select id="edit-priority" class="api-input">
                ${priorities.map(p => `<option value="${p}" ${tc.priority === p ? "selected" : ""}>${t('p' + p)}</option>`).join("")}
            </select>

            <label style="margin-top:12px;">${t("editLabelTags")}</label>
            <input id="edit-tags" class="api-input" value="${esc(tagsVal)}" />

            <label style="margin-top:12px;">${t("detailRisk")}</label>
            <textarea id="edit-risk" class="api-input" rows="2">${esc(tc.risk || "")}</textarea>

            <div style="display:flex;gap:8px;margin-top:16px;">
                <button id="edit-save" class="primary-btn" style="flex:1;justify-content:center;"><i data-lucide="save"></i> ${t("save")}</button>
                <button id="edit-cancel" class="secondary-btn" style="flex:1;justify-content:center;">${t("cancel")}</button>
            </div>
        </div>`;

    openModal(t("editTitle"), html);

    const container = document.getElementById("edit-steps-container");

    function renumberSteps() {
        container.querySelectorAll(".edit-step-row").forEach((row, i) => {
            row.querySelector(".edit-step-num").textContent = `${i + 1}.`;
            row.querySelector(".edit-step-remove").style.visibility = container.children.length <= 1 ? "hidden" : "visible";
        });
    }

    container.addEventListener("click", (e) => {
        const removeBtn = e.target.closest(".edit-step-remove");
        if (removeBtn && container.children.length > 1) {
            removeBtn.closest(".edit-step-row").remove();
            renumberSteps();
        }
    });

    document.getElementById("edit-step-add").addEventListener("click", () => {
        const row = document.createElement("div");
        row.className = "edit-step-row";
        row.innerHTML = `<span class="edit-step-num">${container.children.length + 1}.</span><input class="api-input edit-step-input" value="" /><button class="edit-step-remove"><i data-lucide="x"></i></button>`;
        container.appendChild(row);
        renumberSteps();
        lucide.createIcons();
    });

    document.getElementById("edit-save").addEventListener("click", () => {
        tc.title = document.getElementById("edit-title").value.trim() || tc.title;
        tc.description = document.getElementById("edit-desc").value.trim();
        tc.steps = Array.from(container.querySelectorAll(".edit-step-input")).map(inp => inp.value.trim()).filter(Boolean);
        tc.expected = document.getElementById("edit-expected").value.trim();
        tc.priority = document.getElementById("edit-priority").value;
        tc.tags = document.getElementById("edit-tags").value.split(",").map(s => s.trim()).filter(Boolean);
        tc.risk = document.getElementById("edit-risk").value.trim();
        saveLatestTestCases();
        const newCard = createTestCard(tc);
        cardDiv.replaceWith(newCard);
        lucide.createIcons();
        closeModal();
        showToast(t("toastTestUpdated"), "success");
    });

    document.getElementById("edit-cancel").addEventListener("click", closeModal);
}

// ============================================================
// createTestCard — consolidated
// ============================================================
function createTestCard(tc) {
    const div = document.createElement("div");
    div.className = "test-card";
    div.setAttribute("data-id", tc.id);
    div.setAttribute("draggable", "true");
    const isSelected = selectedTestCases.has(tc.id);

    function openDetails() {
        const steps = (tc.steps || []).map(s => `<li>${esc(s)}</li>`).join("");
        openModal(tc.title,
            `<p><strong>${t("detailDescription")}:</strong><br>${esc(tc.description || "")}</p>` +
            `<p><strong>${t("detailSteps")}:</strong><ol>${steps}</ol></p>` +
            `<p><strong>${t("detailExpected")}:</strong><br>${esc(tc.expected || "")}</p>` +
            `<p><strong>${t("detailTags")}:</strong> ${(tc.tags || []).map(esc).join(", ")}</p>` +
            `<p><strong>${t("detailRisk")}:</strong> ${esc(tc.risk || "")}</p>`
        );
    }

    div.innerHTML = `
        <div class="test-card-header">
            <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0;">
                <div class="test-checkbox ${isSelected ? 'checked' : ''}" data-id="${tc.id}">
                    <i data-lucide="check"></i>
                </div>
                <h3 id="title-${tc.id}" class="clickable-title" title="Click for details, double-click to edit">${esc(tc.id)} — ${esc(tc.title)}</h3>
            </div>
            <span class="priority-badge priority-${esc(tc.priority)}">${esc(priorityLabel(tc.priority))}</span>
        </div>
        <div class="test-card-actions" style="flex-wrap:wrap;">
            <button class="status-btn pass-btn ${tc.status === "pass" ? "active-pass" : ""}">${t("pass")}</button>
            <button class="status-btn fail-btn ${tc.status === "fail" ? "active-fail" : ""}">${t("fail")}</button>
            <button class="status-btn blocked-btn ${tc.status === "blocked" ? "active-blocked" : ""}">${t("blocked")}</button>
            <span style="flex:1"></span>
            <button class="icon-btn" data-action="edit" title="Edit"><i data-lucide="pencil"></i></button>
        </div>`;

    const titleEl = div.querySelector(`#title-${tc.id}`);
    titleEl.addEventListener("click", openDetails);

    titleEl.addEventListener("dblclick", (e) => {
        e.stopPropagation();
        makeEditable(titleEl, tc.title, (newTitle) => {
            tc.title = newTitle;
            titleEl.innerHTML = `${esc(tc.id)} — ${esc(newTitle)}`;
            titleEl.className = "clickable-title";
            saveLatestTestCases();
        });
    });

    div.querySelector(".test-checkbox").addEventListener("click", () => toggleTestCaseSelection(tc.id));

    function setStatus(status) {
        tc.status = tc.status === status ? null : status;
        div.querySelector(".pass-btn").classList.toggle("active-pass", tc.status === "pass");
        div.querySelector(".fail-btn").classList.toggle("active-fail", tc.status === "fail");
        div.querySelector(".blocked-btn").classList.toggle("active-blocked", tc.status === "blocked");
        saveLatestTestCases();
        renderDashboard();
    }
    div.querySelector(".pass-btn").addEventListener("click", () => setStatus("pass"));
    div.querySelector(".fail-btn").addEventListener("click", () => setStatus("fail"));
    div.querySelector(".blocked-btn").addEventListener("click", () => setStatus("blocked"));

    div.querySelectorAll(".icon-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (btn.dataset.action === "edit") openEditModal(tc, div);
        });
    });

    div.addEventListener("dragstart", (e) => {
        div.classList.add("dragging");
        e.dataTransfer.setData("text/plain", tc.id);
    });
    div.addEventListener("dragend", () => div.classList.remove("dragging"));
    div.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (document.querySelector(".dragging") && document.querySelector(".dragging") !== div) div.classList.add("drag-over");
    });
    div.addEventListener("dragleave", () => div.classList.remove("drag-over"));
    div.addEventListener("drop", (e) => {
        e.preventDefault();
        div.classList.remove("drag-over");
        const draggedId = e.dataTransfer.getData("text/plain");
        const draggedIdx = latestTestCases.findIndex(x => x.id === draggedId);
        const dropIdx = latestTestCases.findIndex(x => x.id === tc.id);
        if (draggedIdx !== -1 && dropIdx !== -1 && draggedIdx !== dropIdx) {
            const [moved] = latestTestCases.splice(draggedIdx, 1);
            latestTestCases.splice(dropIdx, 0, moved);
            saveLatestTestCases();
            renderSavedTestCards();
            showToast(t("toastTestReordered"), "info", 1500);
        }
    });

    return div;
}

// ============================================================
// RENDER SAVED TEST CARDS (with search/filter)
// ============================================================
function renderSavedTestCards(filter) {
    const wrap = document.getElementById("generatorSearchWrap");
    const meta = document.getElementById("resultsMeta");
    if (!latestTestCases.length) {
        wrap.style.display = "none";
        meta.innerHTML = "";
        resultsEl.innerHTML = "";
        return;
    }
    wrap.style.display = "block";
    const query = (filter || document.getElementById("generatorSearch").value || "").toLowerCase().trim();
    const filtered = query
        ? latestTestCases.filter(tc =>
            (tc.id || "").toLowerCase().includes(query) ||
            (tc.title || "").toLowerCase().includes(query) ||
            (tc.priority || "").toLowerCase().includes(query) ||
            (tc.tags || []).some(t => t.toLowerCase().includes(query)) ||
            (tc.status || "").toLowerCase().includes(query)
          )
        : latestTestCases;
    resultsEl.innerHTML = "";
    filtered.forEach(tc => resultsEl.appendChild(createTestCard(tc)));
    lucide.createIcons();
    const shown = filtered.length;
    const total = latestTestCases.length;
    meta.textContent = shown < total
        ? t("showingResults").replace("{n}", shown).replace("{total}", total)
        : `${total} ${typeof t("testCasesLabel") === "function" ? t("testCasesLabel")(total) : t("testCasesLabel")}`;
    document.getElementById("generatorSearchClear").classList.toggle("visible", !!query);
}

let generatorSearchTimer;
document.getElementById("generatorSearch").addEventListener("input", () => {
    clearTimeout(generatorSearchTimer);
    generatorSearchTimer = setTimeout(() => renderSavedTestCards(), 200);
});
document.getElementById("generatorSearchClear").addEventListener("click", () => {
    document.getElementById("generatorSearch").value = "";
    document.getElementById("generatorSearchClear").classList.remove("visible");
    renderSavedTestCards("");
    document.getElementById("generatorSearch").focus();
});

// ============================================================
// DEMO: generate mock test cases locally (no API call)
// ============================================================
function generateMockTestCases() {
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

    const pick = arr => arr[Math.floor(Math.random() * arr.length)];
    const pickN = (arr, n) => { const s = new Set(); while (s.size < n) s.add(pick(arr)); return [...s]; };

    const isFi = lang === "fi";

    const features = isFi ? [
        "käyttäjän tunnistautuminen", "maksun kassaprosessi", "hakutoiminto", "tiedoston lataus", "ostoskorin hallinta",
        "käyttäjän rekisteröinti", "salasanan palautus", "tuotelistaus", "tilaushistoria", "ilmoitusjärjestelmä",
        "ylläpitonäkymä", "raportointimoduuli", "API-yhdyskäytävä", "käyttäjäprofiili", "toimituslaskuri",
        "toivelistan hallinta", "arvostelujärjestelmä", "chatti-tuki", "monikielisyys", "analytiikan vienti"
    ] : [
        "user authentication", "payment checkout", "search functionality", "file upload", "cart management",
        "user registration", "password reset", "product listing", "order history", "notification system",
        "admin dashboard", "reporting module", "API gateway", "user profile", "shipping calculator",
        "wishlist management", "review system", "chat support", "multi-language", "analytics export"
    ];
    const verbs = isFi ? [
        "Varmista että", "Tarkista että", "Vahvista että", "Testaa että", "Todenna että", "Validoi että"
    ] : [
        "Verify that", "Ensure that", "Confirm that", "Validate that", "Check that", "Test that"
    ];
    const actions = isFi ? {
        "käyttäjän tunnistautuminen": [
            "käyttäjä voi kirjautua sisään kelvollisilla tunnuksilla", "virheellinen salasana näyttää virheilmoituksen",
            "Muista minut-valintaruutu säilyttää istunnon", "lukittu tili näyttää lukitusilmoituksen",
            "OAuth-kirjautuminen toimii Google-tarjoajalla", "kaksivaiheinen tunnistautumiskoodi hyväksytään",
            "istunnon aikakatkaisu ohjaa kirjautumissivulle", "uloskirjautuminen tyhjentää istuntotiedot"
        ],
        "maksun kassaprosessi": [
            "kelvollinen luottokortti suorittaa maksun", "vanhentunut kortti näyttää hylkäysilmoituksen",
            "PayPal-maksu ohjaa oikein", "tarjouskoodi soveltaa alennuksen",
            "veron määrä lasketaan oikein", "virheellinen CVV näyttää validointivirheen",
            "osittainen hyvitys käsitellään oikein", "monivaluuttahinnoittelu näytetään oikein"
        ],
        "hakutoiminto": [
            "haku palauttaa osuvia tuloksia avainsanoilla", "erikoismerkit puhdistetaan haussa",
            "suodattimet rajaavat tulokset oikein", "tyhjä haku näyttää asianmukaisen viestin",
            "automaattinen täydennys vastaa kirjoitettuun tekstiin", "väärin kirjoitetut sanat näyttävät ehdotuksia",
            "sivutus toimii hakukyselyn jälkeen", "hakuhistoria tallennetaan käyttäjäkohtaisesti"
        ],
        "tiedoston lataus": [
            "hyväksytyt tiedostotyypit latautuvat onnistuneesti", "liian suuret tiedostot näyttävät kokorajoitusvirheen",
            "useita tiedostoja ladataan rinnakkain", "kuvan esikatselu luodaan latauksen jälkeen",
            "virustartunnan saaneet tiedostot hylätään", "latauksen edistymispalkki päivittyy reaaliajassa",
            "vedä ja pudota -alue hyväksyy tiedostot", "erikoismerkit tiedostonimessä käsitellään"
        ],
        "ostoskorin hallinta": [
            "tuotteen lisääminen kasvattaa ostoskorin määrää", "tuotteen poistaminen päivittää välisumman",
            "määrän muuttaminen laskee kokonaissumman uudelleen", "tallennettu ostoskori säilyy uloskirjautumisen jälkeen",
            "loppuneet tuotteet näyttävät loppunut-merkinnän", "ostoskorin yhdistäminen toimii uudelleenkirjautumisen jälkeen",
            "vanhentunut istunto säilyttää ostoskorin tiedot", "massalisäys toivelistalta toimii oikein"
        ],
        "käyttäjän rekisteröinti": [
            "uusi käyttäjä voi rekisteröityä sähköpostilla ja salasanalla", "tuplasähköposti näyttää jo rekisteröity -virheen",
            "salasanan vahvuusmittari täyttää käytännön vaatimukset", "sähköpostin vahvistuslinkki toimii 24 tunnin sisällä",
            "sosiaalisen median kirjautuminen ohittaa salasanan", "pakolliset kentät näyttävät validoinnin blur-tapahtumassa",
            "GDPR-suostumusvalintaruutu vaaditaan", "kutsukoodi sovelletaan rekisteröinnissä"
        ],
        "salasanan palautus": [
            "salasanan palautussähköposti lähetetään 30 sekunnissa", "palautuslinkki vanhenee 1 tunnin jälkeen",
            "uuden salasanan täytyy erota viimeisestä 3 salasanasta", "palautuslinkki toimii vain kerran",
            "turvakysymys vaaditaan ennen palautusta", "palautusilmoitus lähetetään varasähköpostiin",
            "heikko uusi salasana hylätään perustelujen kanssa", "salasanan palautus kirjaa ulos kaikista muista istunnoista"
        ],
        "tuotelistaus": [
            "tuotteet näytetään oikealla hinnoittelulla", "lajittelu hinnan mukaan toimii nousevasti ja laskevasti",
            "loppuneet tuotteet on himmennetty", "tuotekaruselli pyyhkäisee mobiililaitteella",
            "ääretön vieritys lataa seuraavan sivun saumattomasti", "vertaa enintään 4 tuotetta rinnakkain",
            "äskettäin katsotut tuotteet näkyvät sivupalkissa", "tuotemerkit näyttävät alennusprosentin"
        ],
        "tilaushistoria": [
            "tilauslista näyttää kaikki menneet tilaukset sivutettuna", "tilauksen tiedot avautuvat rivinäkymässä",
            "peruuta tilaus -painike toimii ennen lähetystä", "palautuspyyntö lähetetään onnistuneesti",
            "tilauksen tila päivittyy reaaliajassa", "laskun PDF-lataus sisältää oikeat tiedot",
            "haku tilaushistoriasta toimii", "suodatus päivämääräalueella palauttaa oikeat tilaukset"
        ],
        "ilmoitusjärjestelmä": [
            "push-ilmoitus toimitetaan uudesta viestistä", "sähköposti-ilmoitusasetukset tallennetaan",
            "sovelluksen sisäinen merkkimäärä vastaa lukemattomia kohteita", "ilmoituksen klikkaus ohjaa oikealle sivulle",
            "massamerkintä luetuksi toimii ilmoituksille", "ilmoitusääni toistuu kun se on käytössä",
            "hiljaiset tunnit vaimentavat ilmoitukset oikein", "ilmoitushistoria on sivutettu"
        ],
        "ylläpitonäkymä": [
            "tulokaavio latautuu oikeilla tiedoilla", "käyttäjämäärämittari vastaa tietokantakyselyä",
            "tilausvolyymikaavio päivittyy reaaliajassa", "ylläpitäjä voi suodattaa näkymää päivämääräalueella",
            "näkymän vienti PDF-muodossa toimii oikein", "roolipohjaiset oikeudet piilottavat rajoitetut widgetit",
            "järjestelmän tilailmaisimet näyttävät vihreän/punaisen tilan", "aktiivisuusloki suoratoistaa tapahtumia"
        ],
        "raportointimoduuli": [
            "CSV-vienti sisältää kaikki valitut sarakkeet", "päivämääräaluesuodatin palauttaa oikeat tiedot",
            "sähköpostilla ajastettu raportti toimitetaan", "mukautettu raporttien rakentaja tallentaa mallipohjat",
            "kaaviotyypin vaihto toimii pylväs/piirakka/viiva -välillä", "porautuminen kaaviossa avaa yksityiskohtanäkymän",
            "yhteenvetosummaukset vastaavat yksittäisten rivien summia", "raporttivälimuisti nopeuttaa toistuvia latauksia"
        ]
    } : {
        "user authentication": [
            "a user can log in with valid credentials", "an invalid password shows an error message",
            "the Remember Me checkbox persists the session", "a locked account shows a lockout message",
            "OAuth login works with Google provider", "two-factor authentication code is accepted",
            "session timeout redirects to login page", "logout clears all session data"
        ],
        "payment checkout": [
            "a valid credit card completes payment", "an expired card shows a decline message",
            "PayPal payment redirects correctly", "a promo code applies the discount",
            "the tax amount is calculated correctly", "an invalid CVV shows validation error",
            "a partial refund processes correctly", "multi-currency pricing displays correctly"
        ],
        "search functionality": [
            "search returns relevant results for keywords", "special characters are sanitized in search",
            "faceted filters narrow results correctly", "empty search shows appropriate message",
            "autocomplete suggestions match typed input", "misspelled words show did-you-mean suggestions",
            "pagination works after search query", "search history is saved per user"
        ],
        "file upload": [
            "accepted file types upload successfully", "oversized files show size limit error",
            "multiple files upload in parallel", "image preview generates after upload",
            "virus-infected files are rejected", "upload progress bar updates in real-time",
            "drag-and-drop zone accepts files", "file name with special characters is handled"
        ],
        "cart management": [
            "adding an item increments the cart count", "removing an item updates the subtotal",
            "changing quantity recalculates the total", "saved cart persists after logout",
            "out-of-stock items show unavailable badge", "cart merge works after re-login",
            "expired session preserves cart items", "bulk add from wishlist works correctly"
        ],
        "user registration": [
            "new user can register with email and password", "duplicate email shows already-registered error",
            "password strength indicator meets policy", "email verification link works within 24h",
            "registration with social login skips password", "required fields show validation on blur",
            "GDPR consent checkbox is required", "referral code is applied at registration"
        ],
        "password reset": [
            "password reset email is sent within 30 seconds", "reset link expires after 1 hour",
            "new password must differ from last 3 passwords", "reset link works only once",
            "security question is required before reset", "reset notification is sent to backup email",
            "weak new password is rejected with reason", "password reset logs out all other sessions"
        ],
        "product listing": [
            "products display with correct pricing", "sort by price works ascending and descending",
            "out-of-stock products are grayed out", "product carousel swipes on mobile",
            "infinite scroll loads next page seamlessly", "compare up to 4 products side by side",
            "recently viewed products appear in sidebar", "product badges show discount percentage"
        ],
        "order history": [
            "order list shows all past orders paginated", "order details expand inline",
            "cancel order button works before shipment", "return request is submitted successfully",
            "order status updates in real-time", "invoice PDF download contains correct data",
            "search within order history works", "filter by date range returns correct orders"
        ],
        "notification system": [
            "push notification is delivered on new message", "email notification preferences are saved",
            "in-app badge count matches unread items", "notification click navigates to correct page",
            "bulk mark-as-read works for notifications", "notification sound plays when enabled",
            "quiet hours suppress notifications correctly", "notification history is paginated"
        ],
        "admin dashboard": [
            "revenue chart loads with correct data", "user count metric matches database query",
            "order volume graph updates in real-time", "admin can filter dashboard by date range",
            "export dashboard as PDF works correctly", "role-based permissions hide restricted widgets",
            "system health indicators show green/red status", "activity log streams live events"
        ],
        "reporting module": [
            "CSV export includes all selected columns", "date range filter returns correct data",
            "report scheduled via email is delivered", "custom report builder saves templates",
            "chart type switching works between bar/pie/line", "drill-down on chart opens detail view",
            "summary totals match individual row sums", "report caching improves repeated load times"
        ]
    };
    const results = isFi ? [
        "Toiminto suoritetaan onnistuneesti vahvistusviestillä",
        "Selkeä virheilmoitus näytetään ja toiminto estetään",
        "Odotetut tiedot näkyvät 2 sekunnin sisällä pyynnöstä",
        "Validointivirhe näytetään asianomaisen kentän vieressä",
        "Järjestelmä kirjaa toiminnon ja palaa edelliseen tilaan",
        "Tiedot säilyvät sivun uudelleenlatausten ja istuntojen yli",
        "Aikakatkaisuviesti näytetään 30 sekunnin jälkeen uudelleenyritys-toiminnolla",
        "Varoitusvahvistusikkuna tulee ennen tuhoavaa toimintoa"
    ] : [
        "Operation completes successfully with confirmation message",
        "Clear error message is displayed and action is prevented",
        "Expected data appears within 2 seconds of request",
        "Validation error is shown next to the relevant field",
        "System logs the action and returns to previous state",
        "Data is persisted across page reloads and sessions",
        "Timeout message is shown after 30 seconds with retry option",
        "Warning confirmation dialog appears before destructive action"
    ];
    const risks = isFi ? [
        "Keskeinen liiketoimintaprosessi estyy jos tämä epäonnistuu",
        "Tietoturva-aukko jos ei käsitellä oikein",
        "Tulovaikutus jos toiminto heikkenee",
        "Käyttäjien luottamus heikkenee huonon kokemuksen takia",
        "Tietojen eheys vaarantuu virhetilanteessa",
        "Säädösten noudattaminen riippuu tästä toiminnosta",
        "Asiakastuen kuormitus kasvaa regressiossa",
        "Integraatioriippuvuus aiheuttaa kaskadiviä"
    ] : [
        "Core business flow is blocked if this fails",
        "Security vulnerability if not properly handled",
        "Revenue impact if functionality degrades",
        "User trust is eroded by poor experience",
        "Data integrity is compromised on failure",
        "Regulatory compliance depends on this feature",
        "Customer support load increases on regression",
        "Integration dependency causes cascading failures"
    ];
    const tagPool = isFi ? [
        "toiminnallinen","turvallisuus","käyttöliittymä","suorituskyky","integraatio","saavutettavuus","regressio","negatiivinen","validointi","positiivinen","rajat","api","työnkulku"
    ] : [
        "functional","security","ui-ux","performance","integration","accessibility","regression","negative","validation","positive","boundary","api","workflow"
    ];
    const statuses = ["pass","pass","pass","pass","pass","pass","fail","blocked",null];
    const priorities = isFi ? ["Kriittinen","Kriittinen","Korkea","Korkea","Keskitaso","Keskitaso","Matala"] : ["Critical","Critical","High","High","Medium","Medium","Low"];
    const prioMap = { "Kriittinen":"Critical", "Korkea":"High", "Keskitaso":"Medium", "Matala":"Low" };

    const mock = [];
    const usedCombos = new Set();
    const selectedFeatures = pickN(features, 8);

    for (let i = 0; i < 16; i++) {
        const feature = selectedFeatures[i % selectedFeatures.length];
        const pool = actions[feature] || actions[isFi ? "käyttäjän tunnistautuminen" : "user authentication"];
        let action;
        let attempt = 0;
        do {
            action = pick(pool);
            attempt++;
        } while (usedCombos.has(feature + action) && attempt < 20);
        usedCombos.add(feature + action);

        const verb = pick(verbs);
        const title = verb + " " + action;
        const desc = isFi ? `Testitapaus ${feature}-toiminnon varmistamiseksi.` : `Test case to validate ${feature} behavior.`;
        const steps = isFi ? [
            `Siirry ${feature}-osioon`,
            `Aseta esiehdot kohteelle: ${action}`,
            `Suorita toimenpide ja tarkkaile tulosta`,
            `Varmista että järjestelmä vastaa odotetusti`
        ] : [
            `Navigate to ${feature} section`,
            `Set up preconditions for ${action}`,
            `Execute the action and observe result`,
            `Verify the system responds as expected`
        ];
        const rawPriority = pick(priorities);
        const priority = isFi ? (prioMap[rawPriority] || "Medium") : rawPriority;
        const tags = pickN(tagPool, Math.floor(Math.random() * 3) + 2);
        const status = pick(statuses);
        const risk = pick(risks);

        mock.push({
            id: "TC-" + String(i + 1).padStart(3, "0"),
            title,
            description: desc,
            steps,
            expected: pick(results),
            priority,
            tags,
            risk,
            status,
            createdAt: date,
        });
    }

    latestTestCases = mock;
    saveLatestTestCases();
    renderSavedTestCards();
    toggleActionBtns();
    updateUsageCounter();

    state.usageTotal += mock.length;
    state.history.unshift({ feature: t("demoFeature"), date, time, count: mock.length });
    if (state.history.length > 50) state.history.pop();
    saveState();

    renderDashboard();
    closeSidebar();
    showToast(t("toastDemoLoaded")(mock.length), "success");
}

document.getElementById("demoBtn").addEventListener("click", generateMockTestCases);

// ============================================================
// UPDATED: Generate button with skeleton
// ============================================================
const originalGenerateHandler = generateBtn.onclick;
generateBtn.addEventListener("click", async () => {
    const feature = testInput.value.trim();
    if(!feature) return;

    if(feature.length > CHAR_LIMIT) {
        showToast(t("toastCharsExceeded")(CHAR_LIMIT), "error");
        return;
    }

    generateBtn.disabled = true;
    generateBtn.querySelector("span").textContent = t("generating");
    resultsEl.innerHTML = "";
    latestTestCases = [];
    startProgress();
    showSkeletonLoader();

    try {
        const config = getApiConfig();
        const apiUrl = config.url || "https://qa-proxy.eng-milo.workers.dev";

        const res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: config.model,
                max_tokens: config.tokens,
                apiKey: config.apiKey || undefined,
                system: `You are a QA engineer. Given a feature description, generate 14-18 test cases covering as many of the following categories as applicable as a JSON array:

Case type categories to cover: Positive (happy paths), Negative (error/unhappy paths), Boundary/edge cases, Validation cases, UI/UX cases, Functional workflow cases, API cases, Integration cases, Regression cases, Security cases (if applicable).

Each object must have exactly these fields:
- id: string like "TC-001"
- title: short string
- description: one sentence
- steps: array of 3-5 step strings
- expected: string
- priority: one of "Critical", "High", "Medium", "Low", "Trivial"
- tags: array of 2-4 tag strings — ALWAYS include one tag indicating the case type (e.g. "positive", "negative", "boundary", "validation", "ui-ux", "functional", "api", "integration", "regression", "security")
- risk: one sentence
IMPORTANT: Write all text content (title, description, steps, expected, tags, risk) in ${lang === "fi" ? "Finnish" : "English"}. The priority field must always use the English values (Critical/High/Medium/Low/Trivial). Distribute the case types evenly.
Return ONLY the raw JSON array, no markdown, no explanation.`,
                messages: [{ role: "user", content: `Feature: ${feature}` }],
            }),
        });

        if(!res.ok) {
            const errText = await res.text();
            const status = res.status;
            let msg = t("apiErrServer")(status);
            if (status === 429) msg = t("apiErrRateLimit");
            else if (status === 502 || status === 503) msg = t("apiErrUnavailable");
            else if (status === 401 || status === 403) msg = t("apiErrAuth");
            else if (status >= 500) msg = t("apiErrServerError");
            else if (errText) msg += `: ${errText.slice(0,150)}`;
            throw new Error(msg);
        }

        const data = await res.json();
        const raw = data.content.map(b => b.text || "").join("").trim();
        latestTestCases = repairJSON(raw);
        latestTestCases.sort((a,b) => (priorityOrder[a.priority]||9) - (priorityOrder[b.priority]||9));
        latestTestCases.forEach(tc => { if(!tc.status) tc.status = null; if(!tc.createdAt) tc.createdAt = new Date().toISOString(); });

        saveLatestTestCases();
        renderSavedTestCards();
        finishProgress(true);
        toggleActionBtns();

        state.usageTotal += latestTestCases.length;
        state.history.unshift({
            feature: feature.slice(0,60),
            date: new Date().toISOString().slice(0,10),
            time: now24h(),
            count: latestTestCases.length,
        });
        if(state.history.length > 50) state.history.pop();

        saveState();
        updateUsageCounter();
        renderDashboard();

        localStorage.removeItem("qa_draft");

        showToast(t("toastGenerated")(latestTestCases.length), "success");

    } catch(err) {
        finishProgress(false);
        let msg = err.message || (lang === "fi" ? "Tuntematon virhe" : "Unknown error");
        const isNetwork = msg.includes("fetch") || msg.includes("network") || msg.includes("Failed to fetch");
        const displayMsg = isNetwork ? t("errNetwork") : msg;
        resultsEl.innerHTML = `<div class="table-card" style="text-align:center;padding:40px 24px;">
            <p style="font-size:40px;margin:0 0 12px;">⚠️</p>
            <p style="font-size:16px;font-weight:600;margin:0 0 8px;color:var(--danger);">${t("errGenerationFailed")}</p>
            <p style="color:var(--text-muted);font-size:14px;margin:0;line-height:1.6;">${esc(displayMsg)}</p>
            <button class="secondary-btn" style="margin-top:16px;" onclick="document.getElementById('generateBtn').click()">
                <i data-lucide="refresh-cw"></i> ${t("errRetry")}
            </button>
        </div>`;
        showToast(displayMsg.slice(0,80) || t("apiErrUnavailable"), "error", 5000);
    } finally {
        generateBtn.disabled = false;
        generateBtn.querySelector("span").textContent = t("generate");
    }
});

// ── PWA: Register service worker ──
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
}

// ── LocalStorage quota warning ──
if (navigator.storage && navigator.storage.estimate) {
    navigator.storage.estimate().then(({ usage, quota }) => {
        if (usage / quota > 0.8) {
            const warnKey = "qa_quota_warn";
            if (!localStorage.getItem(warnKey)) {
                const bar = document.createElement("div");
                bar.id = "quotaWarn";
                bar.style.cssText = "position:fixed;bottom:0;left:0;right:0;background:#f97316;color:#fff;font-size:13px;padding:10px 16px;z-index:9999;display:flex;align-items:center;gap:12px;justify-content:center;";
                bar.innerHTML = `⚠️ ${t("quotaWarning")} (${Math.round(usage/quota*100)}%). ${t("quotaHint")} <button id="quotaWarnDismiss" style="background:none;border:1px solid rgba(255,255,255,.5);color:#fff;border-radius:6px;padding:4px 12px;cursor:pointer;font-size:13px;">${t("quotaDismiss")}</button>`;
                document.body.appendChild(bar);
                document.getElementById("quotaWarnDismiss").onclick = () => {
                    bar.remove();
                    localStorage.setItem(warnKey, "1");
                };
            }
        }
    }).catch(() => {});
} else {
    try {
        let total = 0;
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith("qa_")) {
                total += (k.length + (localStorage.getItem(k) || "").length) * 2;
            }
        }
        if (total > 4e6) {
            console.warn("QA Studio: localStorage usage ~" + (total / 1e6).toFixed(1) + "MB — consider cleaning up.");
        }
    } catch (e) { console.warn("QA Studio:", e); }
}

// ============================================================
// INIT
// ============================================================
try {
    loadLatestTestCases();
    applyLang();
    renderSavedTestCards();
    loadDraft();
    updateUsageCounter();
    renderDashboard();
    toggleActionBtns();
} catch (e) { console.warn("QA Studio init error:", e); }
window.addEventListener("pageshow", () => {
    try { lucide.createIcons(); } catch (e) { console.warn("QA Studio:", e); }
});

// ── SW update detection ──
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(reg => {
        reg.addEventListener("updatefound", () => {
            const sw = reg.installing;
            sw.addEventListener("statechange", () => {
                if (sw.state === "installed" && navigator.serviceWorker.controller) {
                    showToast(t("swUpdateAvailable"), "info", 8000);
                }
            });
        });
    }).catch(() => {});
    navigator.serviceWorker.addEventListener("controllerchange", () => {
        showToast(t("swUpdateApplied"), "info", 3000);
        setTimeout(() => location.reload(), 2000);
    });
}
