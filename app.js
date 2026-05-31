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
        clearHistory: "Clear History", viewDetails: "View Details",
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
        detailDescription: "Description", detailSteps: "Steps", detailExpected: "Expected", detailTags: "Tags", detailRisk: "Risk Note",
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
        clearHistory: "Tyhjennä historia", viewDetails: "Näytä tiedot",
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
        detailDescription: "Kuvaus", detailSteps: "Vaiheet", detailExpected: "Odotettu tulos", detailTags: "Tagit", detailRisk: "Riskimuistio",
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
    if (lang === "fi") {
        testInput.setAttribute("placeholder", "Liitä user storysi tähän…");
    } else {
        testInput.setAttribute("placeholder", "Paste your user story here…");
    }
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
        showToast(`Project "${name}" already exists`, "error");
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
        (typeof fn === "function" ? fn(total) : "generated");
}

// ============================================================
// LIVE PREVIEW TYPING ANIMATION
// ============================================================
(function initLivePreview() {
    const phrases = [
        "As a user, I want to log in with email and password…",
        "As a manager, I want to track team progress by sprint…",
        "User can upload PDF, DOCX, PNG files up to 10 MB…",
        "Shopping cart should persist across browser sessions…",
        "Password reset link expires after 30 minutes…",
        "Search results filter by category, price and rating…",
    ];
    const el = document.getElementById("livePreviewText");
    let phraseIdx = 0, charIdx = 0, deleting = false;
    function tick() {
        const phrase = phrases[phraseIdx];
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
                phraseIdx = (phraseIdx + 1) % phrases.length;
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

    // ── Weekly comparison data ──
    function getWeekHistory(offset) {
        const today = new Date();
        const data = [];
        let maxVal = 0;
        for (let i = 6 + offset; i >= offset; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().slice(0, 10);
            const label = d.toLocaleDateString("en", { weekday: "short" });
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
    const genDelta = thisWeekGen - lastWeekGen;
    const genPct = lastWeekGen > 0 ? Math.round((genDelta / lastWeekGen) * 100) : 0;
    const genArrow = genPct >= 0 ? '↑' : '↓';
    const genBadge = lastWeekGen > 0 ? `<span class="cmp-delta ${genPct >= 0 ? 'up' : 'down'}">${genArrow}${Math.abs(genPct)}%</span>` : '';

    if (total === 0 && state.usageTotal === 0) {
        document.getElementById("dashContent").innerHTML = `<div class="empty-state">${t("dashEmpty")}</div>`;
        return;
    }

    // ── Priority pie (4 levels: Critical, High, Medium, Low) ──
    const priorityCounts = {};
    allTests.forEach(tc => {
        if (!tc.priority) return;
        const p = tc.priority === "Trivial" ? "Low" : tc.priority;
        priorityCounts[p] = (priorityCounts[p]||0) + 1;
    });
    const priorityData = ["Critical","High","Medium","Low"].map(p => priorityCounts[p] || 0);
    const pColors = ["#dc2626","#f97316","#3b82f6","#10b981"];
    const priorityChart = renderPieChart(priorityData, pColors);

    // ── 7-day data (active period) ──
    const activeHist = comparisonPeriod === "thisWeek" ? thisWeekHist : lastWeekHist;
    const dayData = activeHist.data;
    const maxDay = activeHist.maxVal;

    // ── Trend vs yesterday ──
    const today = new Date();
    const yesterdayStr = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    const todayStr = today.toISOString().slice(0, 10);
    const yesterdayCount = state.history.filter(h => h.date === yesterdayStr).reduce((s, h) => s + h.count, 0);
    const todayCount = state.history.filter(h => h.date === todayStr).reduce((s, h) => s + h.count, 0);
    let dailyTrendHtml = '';
    if (yesterdayCount > 0 && comparisonPeriod === "thisWeek") {
        const pct = Math.round(((todayCount - yesterdayCount) / yesterdayCount) * 100);
        if (pct !== 0) {
            const arrow = pct > 0 ? '↑' : '↓';
            dailyTrendHtml = `<span class="ent-badge ${pct > 0 ? 'up' : 'down'}">${arrow}${Math.abs(pct)}%</span>`;
        }
    }

    // ── Status column chart (div-based with axes) ──
    const statusCols = [
        { label: t('dashPass'), count: pass, color: '#10b981' },
        { label: t('dashFail'), count: fail, color: '#dc2626' },
        { label: t('dashBlocked'), count: blocked, color: '#f97316' },
        { label: t('dashUntested'), count: untested, color: '#6b7280' },
    ];
    const maxStatVal = Math.max(...statusCols.map(c => c.count), 1);
    const yMax = Math.max(Math.ceil(maxStatVal / 10) * 10, 10);
    const yTicks = 5;
    const barMaxH = 160;

    let statusColHtml = '<div class="ent-col"><div class="ent-chart-h">' + t('statusColChart') + '</div>';
    statusColHtml += '<div style="display:flex;gap:4px;">';
    // Y-axis
    statusColHtml += '<div style="display:flex;flex-direction:column;justify-content:space-between;width:28px;height:' + barMaxH + 'px;flex-shrink:0;text-align:right;padding-bottom:1px;">';
    for (let i = yTicks; i >= 0; i--) {
        const val = Math.round((yMax / yTicks) * i);
        statusColHtml += '<span style="font-size:9px;font-weight:600;color:var(--text-muted);line-height:1;">' + val + '</span>';
    }
    statusColHtml += '</div>';
    // Chart area + labels
    statusColHtml += '<div style="flex:1;">';
    // Bars area with axes
    statusColHtml += '<div style="position:relative;height:' + barMaxH + 'px;border-left:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:6px;">';
    // Grid lines
    for (let i = 1; i < yTicks; i++) {
        const px = (i / yTicks) * barMaxH;
        statusColHtml += '<div style="position:absolute;left:2px;right:0;bottom:' + px + 'px;border-top:1px dashed var(--border);opacity:0.4;pointer-events:none;"></div>';
    }
    // Bars
    statusColHtml += '<div style="position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:flex-start;align-items:flex-end;gap:1px;height:' + barMaxH + 'px;padding-left:2px;">';
    statusCols.forEach(c => {
        const h = yMax > 0 ? Math.round((c.count / yMax) * barMaxH) : 0;
        statusColHtml += '<div style="width:56px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;">';
        statusColHtml += '<span style="font-size:9px;font-weight:600;color:var(--text);line-height:1.2;">' + c.count + '</span>';
        statusColHtml += '<div style="width:35%;min-width:4px;height:' + Math.max(h, 2) + 'px;background:' + c.color + ';border-radius:3px 3px 0 0;min-height:2px;"></div>';
        statusColHtml += '</div>';
    });
    statusColHtml += '</div></div>'; // end bars area
    // Labels row
    statusColHtml += '<div style="display:flex;justify-content:flex-start;gap:1px;padding-left:2px;">';
    statusCols.forEach(c => {
        statusColHtml += '<div style="width:56px;display:flex;align-items:center;justify-content:flex-start;gap:3px;">';
        statusColHtml += '<span style="display:inline-block;width:6px;height:6px;background:' + c.color + ';border-radius:1px;flex-shrink:0;"></span>';
        statusColHtml += '<span style="font-size:9px;color:var(--text-muted);white-space:nowrap;">' + c.label + '</span>';
        statusColHtml += '</div>';
    });
    statusColHtml += '</div></div></div></div>';

    // ── SVG line chart ──
    const W = 200, H = 40;
    const pts = dayData.map((d, i) => ({
        x: (i / 6) * W,
        y: H - (maxDay > 0 ? (d.count / maxDay) * (H - 4) : 0) - 2,
        count: d.count, label: d.label
    }));
    const linePts = pts.map(p => `${p.x},${p.y}`).join(' ');
    const fillPts = linePts + ` ${W},${H} 0,${H}`;
    const dayTotal = dayData.reduce((s, d) => s + d.count, 0);

    const periodLabel = comparisonPeriod === "lastWeek" ? "Test Cases Created - Last Week" : t('dailyTrend');
    let lineHtml = '<div class="ent-col" style="flex:1"><div class="ent-chart-h">' + periodLabel + ' <span class="ent-total">' + dayTotal + '</span></div>';
    lineHtml += '<div class="ent-line"><svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3b82f6" stop-opacity="0.2"/><stop offset="100%" stop-color="#3b82f6" stop-opacity="0.02"/></linearGradient></defs><polygon points="' + fillPts + '" fill="url(#lg)"/><polyline points="' + linePts + '" fill="none" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' + pts.map(p => '<circle cx="' + p.x + '" cy="' + p.y + '" r="6" fill="transparent" class="ent-tt"><title>' + p.label + ': ' + p.count + ' tests</title></circle>').join('') + '</svg></div>';
    lineHtml += '<div class="ent-line-l">';
    dayData.forEach(d => { lineHtml += '<span>' + d.label + '</span>'; });
    lineHtml += '</div></div>';

    // ── Project breakdown (horizontal stacked bars) ──
    const barColors = ["#10b981","#dc2626","#f97316","#6b7280"];
    const barKeys = ["pass","fail","blocked","untested"];
    let projStackHtml = '<div class="ent-col"><div class="ent-chart-h">' + t("projectBars") + '</div>';
    projStackHtml += '<div style="display:flex;flex-direction:column;gap:5px;">';
    state.projects.forEach(p => {
        const tc = p.testCases || [];
        if (!tc.length) return;
        const counts = [
            tc.filter(t => t.status === "pass").length,
            tc.filter(t => t.status === "fail").length,
            tc.filter(t => t.status === "blocked").length,
            tc.filter(t => !t.status).length,
        ];
        const totalP = counts.reduce((s, c) => s + c, 0);
        if (!totalP) return;
        projStackHtml += '<div style="display:flex;align-items:center;gap:6px;">';
        projStackHtml += '<span style="font-size:10px;color:var(--text-muted);min-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + esc(p.name) + '</span>';
        projStackHtml += '<div style="flex:1;display:flex;height:14px;border-radius:4px;overflow:hidden;">';
        counts.forEach((c, i) => {
            if (!c) return;
            const pct = Math.round((c / totalP) * 100);
            projStackHtml += '<div style="width:' + pct + '%;min-width:4px;height:100%;background:' + barColors[i] + ';" title="' + barKeys[i] + ': ' + c + '"></div>';
        });
        projStackHtml += '</div>';
        projStackHtml += '</div>';
    });
    projStackHtml += '</div></div>';

    // ── Flakiness Score ──
    const executed = pass + fail + blocked;
    const flakyCount = fail + blocked;
    const flakinessPct = executed > 0 ? Math.round((flakyCount / executed) * 100) : 0;
    const flakinessColor = flakinessPct < 10 ? '#10b981' : flakinessPct < 25 ? '#f97316' : '#dc2626';
    const stablePct = 100 - flakinessPct;
    let flakinessHtml = '<div class="ent-col"><div class="ent-chart-h">Flakiness Score</div>';
    flakinessHtml += '<div style="display:flex;align-items:center;gap:12px;">';
    flakinessHtml += '<div><div style="font-size:22px;font-weight:800;color:' + flakinessColor + ';">' + flakinessPct + '%</div><div style="font-size:10px;color:var(--text-muted);margin-top:1px;">flaky</div></div>';
    flakinessHtml += '<div style="flex:1;">';
    flakinessHtml += '<div style="display:flex;justify-content:space-between;font-size:9px;color:var(--text-muted);"><span>Stable ' + stablePct + '%</span><span>Flaky ' + flakinessPct + '%</span></div>';
    flakinessHtml += '<div style="height:6px;border-radius:3px;background:var(--border);margin-top:4px;overflow:hidden;"><div style="height:100%;border-radius:3px;background:' + flakinessColor + ';width:' + flakinessPct + '%;min-width:2px;"></div></div>';
    flakinessHtml += '</div></div>';
    flakinessHtml += '<div style="font-size:9px;color:var(--text-muted);margin-top:4px;">' + flakyCount + ' of ' + executed + ' executed tests failing or blocked</div>';
    flakinessHtml += '</div>';

    // ── Summary cards ──
    const cards = [
        { label: t('entTotal'), count: total, color: 'var(--primary)', trend: dailyTrendHtml, icon: 'file-text' },
        { label: t('dashPass'), count: pass, color: '#10b981', icon: 'check-circle' },
        { label: t('dashFail'), count: fail, color: '#dc2626', icon: 'x-circle' },
        { label: t('dashBlocked'), count: blocked, color: '#f97316', icon: 'alert-triangle' },
        { label: t('dashUntested'), count: untested, color: '#6b7280', icon: 'clock' },
    ];
    let cardHtml = '<div class="ent-cards">';
    cards.forEach(c => {
        cardHtml += '<div class="ent-card"><div class="ent-card-i"><i data-lucide="' + c.icon + '" style="width:16px;height:16px;color:' + c.color + '"></i></div><div class="ent-card-b"><div class="ent-card-v" style="color:' + c.color + '">' + c.count + '</div><div class="ent-card-l">' + c.label + '</div>' + (c.trend || '') + '</div></div>';
    });
    cardHtml += '</div>';

    // ── Assemble ──
    const activeToggle = comparisonPeriod === "thisWeek" ? "thisWeek" : "lastWeek";
    document.getElementById("dashContent").innerHTML = `
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
        ${cardHtml}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px;align-items:start;">
            <div style="grid-column:1;display:flex;flex-direction:column;gap:6px;">
                ${statusColHtml}
                ${lineHtml}
            </div>
            <div style="grid-column:2;display:flex;flex-direction:column;gap:6px;">
                <div class="ent-col">
                    <div class="ent-chart-h">${t("priorityDistribution")}</div>
                    <div class="ent-pie-wrap">${priorityChart}</div>
                </div>
                ${projStackHtml}
                ${flakinessHtml}
            </div>
        </div>`;

    lucide.createIcons();
    renderSidebarWidgets();

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

function renderSidebarWidgets() {
    const el = document.getElementById("sideWidgets");
    if (el) el.innerHTML = '';
}

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
    showToast("Cleared", "info", 1500);
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
        showToast("Copied to clipboard!", "success");
    }).catch(() => {
        showToast("Failed to copy", "error");
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
    showToast("Test case duplicated", "success");
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
// VISUAL CHARTS
// ============================================================
function renderPieChart(data, colors) {
    const total = data.reduce((a, b) => a + b, 0);
    if (total === 0) return '<div class="empty-state">No data</div>';

    const r = 30, cx = 40, cy = 40, circ = 2 * Math.PI * r;
    let segments = '', cumPct = 0, legendHtml = '';

    data.forEach((value, i) => {
        if (value === 0) return;
        const pct = value / total;
        const offset = circ * (1 - cumPct);
        const dash = circ * pct;
        segments += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${colors[i]}" stroke-width="16" stroke-dasharray="${dash} ${circ - dash}" stroke-dashoffset="${offset}" transform="rotate(-90 ${cx} ${cy})" />`;
        legendHtml += `<span style="display:inline-flex;align-items:center;gap:3px;font-size:9px;color:var(--text-muted);white-space:nowrap;"><span style="display:inline-block;width:7px;height:7px;background:${colors[i]};border-radius:2px;flex-shrink:0;"></span>${value} (${Math.round(pct * 100)}%)</span>`;
        cumPct += pct;
    });

    return `<div style="display:flex;align-items:center;gap:8px;">
        <svg width="50" height="50" viewBox="0 0 80 80" style="flex-shrink:0;">${segments}<circle cx="${cx}" cy="${cy}" r="20" fill="var(--card-bg)" /></svg>
        <div style="display:flex;flex-wrap:wrap;gap-x:8px;gap-y:2px;">${legendHtml}</div>
    </div>`;
}

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
    showToast("API configuration saved!", "success");
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
    showToast("Data exported successfully!", "success");
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

            if (!data || typeof data !== "object") throw new Error("Invalid format");
            if (data.version !== 2) throw new Error("Unsupported file version. Expected version 2.");

            const ok = await showConfirm("This will replace ALL your current data. Are you sure?", "Import");
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

            showToast("Data imported successfully!", "success");
        } catch (err) {
            showToast("Failed to parse import file", "error");
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
            <label>Title</label>
            <input id="edit-title" class="api-input" value="${esc(tc.title)}" />

            <label style="margin-top:12px;">Description</label>
            <textarea id="edit-desc" class="api-input" rows="2">${esc(tc.description || "")}</textarea>

            <label style="margin-top:12px;">Steps</label>
            <div id="edit-steps-container">${stepsHTML(tc.steps)}</div>
            <button id="edit-step-add" class="secondary-btn" style="margin-top:6px;font-size:12px;padding:4px 12px;"><i data-lucide="plus"></i> Add step</button>

            <label style="margin-top:12px;">Expected Result</label>
            <textarea id="edit-expected" class="api-input" rows="2">${esc(tc.expected || "")}</textarea>

            <label style="margin-top:12px;">Priority</label>
            <select id="edit-priority" class="api-input">
                ${priorities.map(p => `<option value="${p}" ${tc.priority === p ? "selected" : ""}>${p}</option>`).join("")}
            </select>

            <label style="margin-top:12px;">Tags (comma separated)</label>
            <input id="edit-tags" class="api-input" value="${esc(tagsVal)}" />

            <label style="margin-top:12px;">Risk</label>
            <textarea id="edit-risk" class="api-input" rows="2">${esc(tc.risk || "")}</textarea>

            <div style="display:flex;gap:8px;margin-top:16px;">
                <button id="edit-save" class="primary-btn" style="flex:1;justify-content:center;"><i data-lucide="save"></i> Save</button>
                <button id="edit-cancel" class="secondary-btn" style="flex:1;justify-content:center;">Cancel</button>
            </div>
        </div>`;

    openModal("Edit Test Case", html);

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
        showToast("Test case updated", "success");
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
            showToast("Test case reordered", "info", 1500);
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
    const mock = [
        { id: "TC-001", title: "Valid user login with correct credentials", description: "Verify that a user can log in successfully with valid email and password.", steps: ["Navigate to login page", "Enter valid email address", "Enter valid password", "Click Sign In button"], expected: "User is redirected to dashboard and sees welcome message", priority: "Critical", tags: ["authentication", "positive"], risk: "Users cannot access the platform if this fails" },
        { id: "TC-002", title: "Login with invalid credentials shows error", description: "Verify that entering wrong password displays a clear error message.", steps: ["Navigate to login page", "Enter valid email", "Enter incorrect password", "Click Sign In"], expected: "Error message 'Invalid email or password' is displayed, no redirect", priority: "High", tags: ["authentication", "negative"], risk: "Users may be confused if error messages are unclear" },
        { id: "TC-003", title: "Password field accepts maximum allowed length", description: "Verify that the password field accepts and processes the maximum character limit.", steps: ["Go to registration page", "Enter a 128-character password", "Complete registration"], expected: "Password is accepted and account is created successfully", priority: "Medium", tags: ["boundary", "validation"], risk: "Boundary issues could cause silent truncation or crashes" },
        { id: "TC-004", title: "Search returns relevant results", description: "Verify that the search bar returns matching items based on keyword input.", steps: ["Type a product name in the search bar", "Press Enter", "Observe search results"], expected: "Relevant results appear within 2 seconds, sorted by relevance", priority: "Medium", tags: ["search", "functional"], risk: "Users cannot find products efficiently" },
        { id: "TC-005", title: "File upload validates file type", description: "Verify that uploading an unsupported file type shows an error message.", steps: ["Click Upload button", "Select a .exe file", "Confirm upload"], expected: "Error message 'Unsupported file type' is shown and file is rejected", priority: "Medium", tags: ["upload", "validation"], risk: "Security risk if invalid files are accepted" },
        { id: "TC-006", title: "Checkout applies discount code", description: "Verify that entering a valid promo code reduces the cart total.", steps: ["Add items to cart", "Go to checkout", "Enter discount code 'SAVE10'", "Apply code"], expected: "Total is reduced by 10% and success message is shown", priority: "High", tags: ["checkout", "functional"], risk: "Revenue loss if discount codes malfunction" },
        { id: "TC-007", title: "Responsive layout on mobile viewport", description: "Verify that the dashboard renders correctly on a 375px wide screen.", steps: ["Open app on mobile device (375px width)", "Navigate to Dashboard", "Verify all sections are visible"], expected: "All dashboard cards stack vertically without horizontal scroll", priority: "Low", tags: ["responsive", "ui-ux"], risk: "Poor mobile experience drives users away" },
        { id: "TC-008", title: "Expired session redirects to login", description: "Verify that an expired session redirects the user to the login page with a timeout message.", steps: ["Log in and wait for session to expire", "Attempt to navigate to dashboard", "Observe redirect"], expected: "User is redirected to login page with 'Session expired' message", priority: "High", tags: ["security", "authentication"], risk: "Unauthorized access if session is not properly invalidated" },
        { id: "TC-009", title: "SQL injection attempt on search field", description: "Verify that special characters and SQL-like input are sanitized in search.", steps: ["Navigate to search bar", "Enter ' OR 1=1; --", "Submit search"], expected: "Search returns no results or shows sanitized input; no data leak", priority: "Critical", tags: ["security", "negative"], risk: "Data breach if query is not sanitized" },
        { id: "TC-010", title: "Complete purchase workflow end-to-end", description: "Verify the full purchase flow from add-to-cart through checkout to confirmation.", steps: ["Browse and add item to cart", "Proceed to checkout", "Enter shipping details", "Enter payment info", "Place order", "View confirmation page"], expected: "Order is confirmed, confirmation ID displayed, email sent", priority: "Critical", tags: ["workflow", "functional", "integration"], risk: "Core revenue flow breaks if any step fails" },
        { id: "TC-011", title: "Pagination displays correct item totals", description: "Verify that pagination controls show accurate record counts and page navigation.", steps: ["Navigate to list view with 100+ items", "Verify page count display", "Click Next", "Click Previous", "Click page number 3"], expected: "Items are correctly split across pages, counts match, navigation is smooth", priority: "Medium", tags: ["ui-ux", "functional"], risk: "Users lose access to data if pagination is broken" },
        { id: "TC-012", title: "Concurrent user data isolation", description: "Verify that two users' data remains isolated when accessing the app simultaneously.", steps: ["Log in as User A and create an item", "Log in as User B in another session", "Check that User B cannot see User A's item"], expected: "User B sees only their own data; no cross-contamination", priority: "High", tags: ["integration", "security"], risk: "Data privacy violation if isolation is broken" },
        { id: "TC-013", title: "API rate limiting returns 429 for excessive requests", description: "Verify that exceeding API rate limits returns a proper 429 status code.", steps: ["Send 101 requests to the /api/login endpoint within 1 minute", "Monitor response status on the 101st request"], expected: "101st request returns HTTP 429 Too Many Requests with retry-after header", priority: "Medium", tags: ["api", "security"], risk: "Brute-force attacks if rate limiting is not enforced" },
        { id: "TC-014", title: "Cart total updates on quantity change", description: "Verify that changing item quantity recalculates the subtotal and total correctly.", steps: ["Add item with price $10.00 to cart", "Change quantity to 3", "Verify subtotal", "Remove one item", "Verify total again"], expected: "Subtotal shows $30.00 then $20.00; no rounding errors", priority: "High", tags: ["functional", "regression"], risk: "Financial discrepancies if calculations are incorrect" },
        { id: "TC-015", title: "Color contrast meets WCAG AA standard", description: "Verify that all text and UI elements have sufficient color contrast ratio.", steps: ["Open the app", "Use axe DevTools or contrast analyzer", "Run full-page contrast audit"], expected: "All text elements pass WCAG AA contrast ratio (4.5:1 for normal text)", priority: "Medium", tags: ["ui-ux", "accessibility"], risk: "Accessibility non-compliance can lead to legal issues" },
        { id: "TC-016", title: "Navigation keyboard tab order is logical", description: "Verify that pressing Tab cycles through interactive elements in a logical order.", steps: ["Open login page", "Press Tab repeatedly from the top", "Observe focus order"], expected: "Focus moves: email → password → Sign In → Forgot Password → Register, no traps", priority: "Low", tags: ["ui-ux", "accessibility"], risk: "Keyboard-only users cannot navigate the app" },
    ].map(tc => ({ ...tc, status: null }));

    latestTestCases = mock;
    saveLatestTestCases();
    renderSavedTestCards();
    toggleActionBtns();
    updateUsageCounter();

    state.usageTotal += mock.length;
    state.history.unshift({ feature: "Demo — e-commerce platform", date, time, count: mock.length });
    if (state.history.length > 50) state.history.pop();
    saveState();

    renderDashboard();
    closeSidebar();
    showToast(`Loaded ${mock.length} demo test cases`, "success");
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
        showToast(`Text exceeds ${CHAR_LIMIT} character limit`, "error");
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
            let msg = `Server error (HTTP ${status})`;
            if (status === 429) msg = "Rate limit reached — please wait a moment and try again.";
            else if (status === 502 || status === 503) msg = "The AI service is temporarily unavailable. Please try again in a few seconds.";
            else if (status === 401 || status === 403) msg = "API authentication failed. Check your API configuration in Settings.";
            else if (status >= 500) msg = "The AI server encountered an error. Try again or use a different model.";
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

        showToast(`Generated ${latestTestCases.length} test cases!`, "success");

    } catch(err) {
        finishProgress(false);
        const msg = err.message || "Unknown error";
        const isNetwork = msg.includes("fetch") || msg.includes("network") || msg.includes("Failed to fetch");
        const displayMsg = isNetwork
            ? "Could not reach the AI service. Check your API URL in Settings (gear icon in sidebar) or your internet connection."
            : msg;
        resultsEl.innerHTML = `<div class="table-card" style="text-align:center;padding:40px 24px;">
            <p style="font-size:40px;margin:0 0 12px;">⚠️</p>
            <p style="font-size:16px;font-weight:600;margin:0 0 8px;color:var(--danger);">Generation Failed</p>
            <p style="color:var(--text-muted);font-size:14px;margin:0;line-height:1.6;">${esc(displayMsg)}</p>
            <button class="secondary-btn" style="margin-top:16px;" onclick="document.getElementById('generateBtn').click()">
                <i data-lucide="refresh-cw"></i> Retry
            </button>
        </div>`;
        showToast(msg.slice(0,80), "error", 5000);
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
                bar.innerHTML = `⚠️ Storage is nearly full (${Math.round(usage/quota*100)}%). Export your data and clear old test cases to free up space. <button id="quotaWarnDismiss" style="background:none;border:1px solid rgba(255,255,255,.5);color:#fff;border-radius:6px;padding:4px 12px;cursor:pointer;font-size:13px;">Dismiss</button>`;
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
                    showToast("New version available — please hard refresh (Ctrl+F5)", "info", 8000);
                }
            });
        });
    }).catch(() => {});
    navigator.serviceWorker.addEventListener("controllerchange", () => {
        showToast("Update applied! Reloading…", "info", 3000);
        setTimeout(() => location.reload(), 2000);
    });
}
