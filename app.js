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
        priorityDistribution: "Priority Distribution",
        generationTrend: "Generation Trend (Last 7)",
        searchHistory: "Search history…",
        searchProjects: "Search projects…",
        generatorSearchPlaceholder: "Search by title, tags, priority…",
        showingResults: "Showing {n} of {total}",
        testCasesLabel: "test case(s)",
        selectAll: "Select All",
        deselectAll: "Deselect All",
        selected: "selected",
        confirmBulkDelete: "Are you sure you want to delete {n} selected test case(s)?",
        deletedTests: "Deleted selected test cases",
        back: "Back",
        footerText: "QA Studio by Milo Haireche — 20+ years of QA expertise",
        chips: ["Login flow","Password reset","File upload","Search & filter","User registration","Checkout"],
        chipStories: [
            "As a registered user, I want to log in with my email and password so that I can access my account dashboard. The system should support 'Remember me', show/hide password toggle, account lockout after 5 failed attempts, and display clear error messages for invalid credentials.",
            "As a user who forgot my password, I want to reset it via a link sent to my email so that I can regain access to my account. The reset link should expire after 30 minutes, enforce strong password rules, and confirm the change with a success notification.",
            "As a user, I want to upload documents (PDF, DOCX, JPG, PNG) up to 10MB so that I can attach them to my profile or project. The system should show an upload progress bar, validate file type and size before upload, and display a preview of the uploaded file.",
            "As a user, I want to search products by keyword and filter results by category, price range, rating, and availability so that I can quickly find what I need. The search should support auto-suggestions, highlight matching terms, and remember recent searches.",
            "As a new visitor, I want to create an account using my name, email, and password so that I can access the platform. The system should validate email format, enforce password strength (min 8 chars, uppercase, number, symbol), check for duplicate accounts, and send a verification email.",
            "As a customer, I want to review my cart, enter shipping details, select a delivery method, and complete payment so that I can place my order. The system should support credit card, PayPal, and Apple Pay, apply discount codes, calculate tax and shipping, and send an order confirmation email."
        ],
        usageFn: n => `${n} test case${n !== 1 ? "s" : ""} generated`,
        charCounterLabel: "characters",
        suggestFeatures: "Random Stories",
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
        priorityDistribution: "Prioriteettijakauma",
        generationTrend: "Generointitrendi (7 viimeistä)",
        searchHistory: "Hae historiasta…",
        searchProjects: "Hae projekteista…",
        generatorSearchPlaceholder: "Hae otsikolla, tagilla, prioriteetilla…",
        showingResults: "Näytetään {n}/{total}",
        testCasesLabel: "testitapausta",
        selectAll: "Valitse kaikki",
        deselectAll: "Poista valinnat",
        selected: "valittu",
        confirmBulkDelete: "Haluatko varmasti poistaa {n} valittua testitapausta?",
        deletedTests: "Valitut testitapaukset poistettu",
        back: "Takaisin",
        footerText: "QA Studio, tekijä Milo Haireche — yli 20 vuoden QA-kokemus",
        chips: ["Kirjautuminen","Salasanan palautus","Tiedoston lataus","Haku ja suodatus","Rekisteröinti","Kassaprosessi"],
        chipStories: [
            "Rekisteröityneenä käyttäjänä haluan kirjautua sisään sähköpostilla ja salasanalla päästäkseni tilini hallintapaneeliin. Järjestelmän tulee tukea 'Muista minut' -toimintoa, salasanan näyttämistä/piilottamista, tilin lukitsemista 5 epäonnistuneen yrityksen jälkeen ja selkeiden virheilmoitusten näyttämistä.",
            "Salasanansa unohtaneena käyttäjänä haluan palauttaa sen sähköpostiini lähetetyn linkin kautta päästäkseni takaisin tililleni. Palautuslinkin tulee vanhentua 30 minuutin jälkeen, vaatia vahva uusi salasana ja vahvistaa muutos onnistumisilmoituksella.",
            "Käyttäjänä haluan ladata asiakirjoja (PDF, DOCX, JPG, PNG) enintään 10 Mt koossa liittääkseni ne profiiliini tai projektiini. Järjestelmän tulee näyttää latauksen edistymispalkki, vahvistaa tiedostotyyppi ja koko ennen latausta sekä näyttää esikatselu ladatusta tiedostosta.",
            "Käyttäjänä haluan hakea tuotteita avainsanalla ja suodattaa tuloksia kategorian, hintaluokan, arvosanan ja saatavuuden mukaan löytääkseni tarvitsemani nopeasti. Haun tulee tukea automaattisia ehdotuksia, korostaa vastaavia termejä ja muistaa viimeisimmät haut.",
            "Uutena vierailijana haluan luoda tilin nimellä, sähköpostilla ja salasanalla päästäkseni alustalle. Järjestelmän tulee vahvistaa sähköpostin muoto, vaatia vahva salasana (vähintään 8 merkkiä, iso kirjain, numero, erikoismerkki), tarkistaa päällekkäiset tilit ja lähettää vahvistussähköposti.",
            "Asiakkaana haluan tarkistaa ostoskorini, syöttää toimitustiedot, valita toimitustavan ja suorittaa maksun tilatakseni. Järjestelmän tulee tukea luottokorttia, PayPalia ja Apple Payta, hyväksyä alennuskoodit, laskea vero ja toimituskulut sekä lähettää tilausvahvistus sähköpostitse."
        ],
        usageFn: n => `${n} testitapausta luotu`,
        charCounterLabel: "merkkiä",
        suggestFeatures: "Satunnaistarinoita",
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
        testInput.setAttribute("placeholder", "Kuvaile ominaisuus, jolle haluat testitapaukset…");
    } else {
        testInput.setAttribute("placeholder", "Describe the feature you want test cases for…");
    }
    testInput.dir = "ltr";
    testInput.value = "";
    document.querySelectorAll("#chipsRow .chip").forEach(c => c.classList.remove("active-chip"));
    updateCharCounter();
    buildChips();
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
    try { lucide.createIcons(); } catch (_) {}
}
if(savedTheme === "dark") {
    const headerBtn = document.getElementById("themeToggleBtn");
    if (headerBtn) headerBtn.innerHTML = '<i data-lucide="moon" id="themeToggleBtnIcon"></i>';
    try { lucide.createIcons(); } catch (_) {}
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
        description: testInput.value.trim().slice(0, 90),
        created: new Date().toISOString().slice(0, 10),
        testCases: JSON.parse(JSON.stringify(latestTestCases)),
    });
    saveState();
    saveModalOverlay.classList.remove("visible");

    testInput.value = "";
    charCounter.textContent = "0 characters";
    updateGenerateBtn();
    latestTestCases = [];
    saveLatestTestCases();
    document.getElementById("results").innerHTML = "";
    document.getElementById("chipsRow").querySelectorAll(".chip")
        .forEach(c => c.classList.remove("active-chip"));
    toggleActionBtns();
});

document.getElementById("projectNameInput").addEventListener("keydown", e => {
    if(e.key === "Enter") document.getElementById("confirmSaveBtn").click();
});

// ============================================================
// CHIPS
// ============================================================
function buildChips(overrides) {
    const row = document.getElementById("chipsRow");
    row.innerHTML = "";
    const labels  = overrides?.labels || t("chips") || [];
    const stories = overrides?.stories || t("chipStories") || [];
    labels.forEach((label, idx) => {
        const btn = document.createElement("button");
        btn.className = "chip";
        btn.textContent = label;
        btn.addEventListener("click", () => {
            row.querySelectorAll(".chip").forEach(c => c.classList.remove("active-chip"));
            btn.classList.add("active-chip");
            const story = stories[idx] || label;
            testInput.value = story;
            updateCharCounter();
            updateGenerateBtn();
            testInput.focus();
        });
        row.appendChild(btn);
    });
}

document.getElementById("suggestBtn").addEventListener("click", async () => {
    const btn = document.getElementById("suggestBtn");
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i data-lucide="loader"></i> Generating…';
    lucide.createIcons();
    try {
        const config = getApiConfig();
        const apiUrl = config.url || WORKER_URL;
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: config.model,
                max_tokens: config.tokens,
                apiKey: config.apiKey || undefined,
                system: `You are a QA engineer. Generate 6 random realistic user stories for software testing.
Return ONLY a JSON object with two arrays: "labels" (short feature name, 2-3 words) and "stories" (a complete user story in the format "As a [role], I want to [goal] so that [reason]", 1 sentence).
Each story must be different and cover various app features (auth, payments, search, notifications, settings, etc.).
Write all text in ${lang === "fi" ? "Finnish" : "English"}.
Return ONLY the raw JSON, no markdown.`,
                messages: [{ role: "user", content: "Generate random user stories for testing" }],
            }),
        });
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        const data = await res.json();
        const raw = data.content.map(b => b.text || "").join("").trim();
        const parsed = JSON.parse(raw);
        if (parsed.labels && parsed.stories) {
            buildChips({ labels: parsed.labels, stories: parsed.stories });
            showToast("Random stories loaded! Click one to try it.", "success");
        } else {
            throw new Error("Unexpected response format");
        }
    } catch (err) {
        showToast("Suggest failed: " + err.message, "error");
    } finally {
        btn.disabled = false;
        btn.innerHTML = orig;
        lucide.createIcons();
    }
});

// ============================================================
// USAGE COUNTER
// ============================================================
function updateUsageCounter() {
    const fn = i18n[lang]?.usageFn;
    const total = state.usageTotal || 0;
    document.getElementById("usageCounter").innerHTML =
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

function updateGenerateBtn() {
    generateBtn.disabled = !testInput.value.trim();
}
testInput.addEventListener("input", () => {
    updateCharCounter();
    updateGenerateBtn();
    saveToHistory();
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
    const allTests = allProjectTests.concat(latestTestCases);
    const total = allTests.length;
    const pass = allTests.filter(tc => tc.status === "pass").length;
    const fail = allTests.filter(tc => tc.status === "fail").length;
    const blocked = allTests.filter(tc => tc.status === "blocked").length;
    const untested = allTests.filter(tc => !tc.status).length;

    if (total === 0 && state.usageTotal === 0) {
        document.getElementById("dashContent").innerHTML = `<div class="empty-state">${t("dashEmpty")}</div>`;
        return;
    }

    const statusChart = renderPieChart([pass, fail, blocked, untested], ['#10b981', '#dc2626', '#f97316', '#6b7280']);
    const priorityCounts = {};
    allTests.forEach(tc => { if(tc.priority) priorityCounts[tc.priority] = (priorityCounts[tc.priority]||0)+1; });
    const priorityData = ["Critical","High","Medium","Low","Trivial"].map(p => priorityCounts[p] || 0);
    const pColors = ["#dc2626","#f97316","#3b82f6","#10b981","#6b7280"];
    const priorityChart = renderPieChart(priorityData, pColors);
    const trendChart = renderTrendChart(state.history);

    document.getElementById("dashContent").innerHTML = `
        <div class="dash-card" style="margin-bottom:10px;display:flex;align-items:center;gap:10px;padding:8px 12px;">
            <div style="font-size:28px;font-weight:700;background:linear-gradient(135deg,var(--primary),var(--purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent;">${state.usageTotal}</div>
            <div style="color:var(--text-muted);font-size:13px;font-weight:500;">${t("dashTotalAll")}</div>
        </div>
        <div class="chart-grid">
            <div class="chart-container">
                <div class="chart-title">${t("statusDistribution")}</div>
                ${statusChart}
            </div>
            <div class="chart-container">
                <div class="chart-title">${t("priorityDistribution")}</div>
                ${priorityChart}
            </div>
        </div>
        <div class="chart-container">
            <div class="chart-title">${t("generationTrend")}</div>
            ${trendChart}
        </div>
        <p class="dash-section-title">${t("dashSession")} ${total>0?`(${total} ${t("dashTotal").toLowerCase()})`:""}</p>
        ${total > 0 ? `
        <div class="dash-grid">
            <div class="dash-card"><div class="dash-value">${total}</div><div class="dash-label">${t("dashTotal")}</div></div>
            <div class="dash-card"><div class="dash-value" style="color:#10b981">${pass}</div><div class="dash-label"><span class="dash-dot" style="background:#10b981"></span>${t("dashPass")}</div></div>
            <div class="dash-card"><div class="dash-value" style="color:#dc2626">${fail}</div><div class="dash-label"><span class="dash-dot" style="background:#dc2626"></span>${t("dashFail")}</div></div>
            <div class="dash-card"><div class="dash-value" style="color:#f97316">${blocked}</div><div class="dash-label"><span class="dash-dot" style="background:#f97316"></span>${t("dashBlocked")}</div></div>
            <div class="dash-card"><div class="dash-value" style="color:var(--text-muted)">${untested}</div><div class="dash-label"><span class="dash-dot" style="background:var(--border)"></span>${t("dashUntested")}</div></div>
        </div>` : `<div class="empty-state" style="padding:24px;">${t("dashEmpty")}</div>`}`;
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
        </table>`;

    el.innerHTML = tableHtml;

    if (!document.getElementById("historySearch")) {
        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.className = "search-input";
        searchInput.placeholder = t("searchHistory");
        searchInput.id = "historySearch";

        const searchWrapper = document.createElement("div");
        searchWrapper.className = "search-wrapper";
        const historyLabel = document.createElement("label");
        historyLabel.className = "sr-only";
        historyLabel.textContent = t("searchHistory");
        historyLabel.htmlFor = "historySearch";
        searchWrapper.appendChild(historyLabel);
        searchWrapper.innerHTML += `<i data-lucide="search" class="search-icon"></i>`;
        searchWrapper.appendChild(searchInput);
        searchWrapper.innerHTML += `<button class="search-clear" id="clearHistorySearch"><i data-lucide="x"></i></button>`;

        el.parentNode.insertBefore(searchWrapper, el);

        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            document.getElementById("clearHistorySearch").classList.toggle("visible", query.length > 0);
            document.querySelectorAll("#historyBody tr").forEach(row => {
                row.style.display = row.textContent.toLowerCase().includes(query) ? "" : "none";
            });
        });

        document.getElementById("clearHistorySearch").addEventListener("click", () => {
            searchInput.value = "";
            searchInput.dispatchEvent(new Event("input"));
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
    document.getElementById("results").innerHTML = "";
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
                            <i data-lucide="trash-2"></i> ${t("delete")}
                        </button>
                    </td>
                </tr>`).join("")}
            </tbody>
        </table>`;

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
        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.className = "search-input";
        searchInput.placeholder = t("searchProjects");
        searchInput.id = "projectsSearch";

        const searchWrapper = document.createElement("div");
        searchWrapper.className = "search-wrapper";
        const projLabel = document.createElement("label");
        projLabel.className = "sr-only";
        projLabel.textContent = t("searchProjects");
        projLabel.htmlFor = "projectsSearch";
        searchWrapper.appendChild(projLabel);
        searchWrapper.innerHTML += `<i data-lucide="search" class="search-icon"></i>`;
        searchWrapper.appendChild(searchInput);
        searchWrapper.innerHTML += `<button class="search-clear" id="clearProjectsSearch"><i data-lucide="x"></i></button>`;

        el.parentNode.insertBefore(searchWrapper, el);

        searchInput.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase();
            document.getElementById("clearProjectsSearch").classList.toggle("visible", query.length > 0);
            document.querySelectorAll("#projectsBody tr").forEach(row => {
                row.style.display = row.textContent.toLowerCase().includes(query) ? "" : "none";
            });
        });

        document.getElementById("clearProjectsSearch").addEventListener("click", () => {
            searchInput.value = "";
            searchInput.dispatchEvent(new Event("input"));
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
                        <i data-lucide="trash-2"></i> ${t("delete")}
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
        const undoBtn = document.getElementById("undoBtn");
        if (undoBtn.classList.contains("visible")) {
            undoBtn.click();
        }
    }
});

// ============================================================
// NEW FEATURES: UNDO FUNCTIONALITY
// ============================================================
let textareaHistory = [];
let historyIndex = -1;
const MAX_HISTORY = 20;

function saveToHistory() {
    const current = testInput.value;
    if (textareaHistory[historyIndex] !== current) {
        textareaHistory = textareaHistory.slice(0, historyIndex + 1);
        textareaHistory.push(current);
        if (textareaHistory.length > MAX_HISTORY) {
            textareaHistory.shift();
        }
        historyIndex = textareaHistory.length - 1;
    }
    updateUndoButton();
}

function undoTextarea() {
    if (historyIndex > 0) {
        historyIndex--;
        testInput.value = textareaHistory[historyIndex] || "";
        updateCharCounter();
        updateUndoButton();
        showToast("Undone", "info", 1500);
    }
}

function updateUndoButton() {
    const undoBtn = document.getElementById("undoBtn");
    undoBtn.classList.toggle("visible", historyIndex > 0 && textareaHistory.length > 1);
}

const undoBtn = document.getElementById("undoBtn");
undoBtn.addEventListener("click", undoTextarea);

const clearTextareaBtn = document.getElementById("clearTextarea");
clearTextareaBtn.addEventListener("click", () => {
    testInput.value = "";
    saveToHistory();
    updateCharCounter();
    updateGenerateBtn();
    clearTextareaBtn.classList.remove("visible");
    document.querySelectorAll("#chipsRow .chip").forEach(c => c.classList.remove("active-chip"));
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
        saveToHistory();
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
    document.getElementById("bulkDeleteText").innerHTML = t("confirmBulkDelete").replace("{n}", `<strong>${count}</strong>`);
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

    const r = 40, cx = 50, cy = 50, circ = 2 * Math.PI * r;
    let segments = '', cumPct = 0, legendHtml = '';

    data.forEach((value, i) => {
        if (value === 0) return;
        const pct = value / total;
        const offset = circ * (1 - cumPct);
        const dash = circ * pct;
        segments += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${colors[i]}" stroke-width="20" stroke-dasharray="${dash} ${circ - dash}" stroke-dashoffset="${offset}" transform="rotate(-90 ${cx} ${cy})" />`;
        legendHtml += `<div class="legend-item"><span class="legend-dot" style="background:${colors[i]}"></span>${value} (${Math.round(pct * 100)}%)</div>`;
        cumPct += pct;
    });

    return `<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
        <svg width="80" height="80" viewBox="0 0 100 100" style="flex-shrink:0;">${segments}<circle cx="${cx}" cy="${cy}" r="26" fill="var(--card-bg)" /></svg>
        <div class="pie-legend">${legendHtml}</div>
    </div>`;
}

function renderTrendChart(history) {
    if (history.length === 0) return '<div class="empty-state">No history data</div>';

    const last7 = history.slice(0, 7).reverse();
    const max = Math.max(...last7.map(h => h.count), 1);

    let html = '<div class="trend-chart">';
    last7.forEach(h => {
        const height = Math.max((h.count / max) * 80, 4);
        html += `<div class="trend-bar" style="height:${height}px" data-count="${h.count}"></div>`;
    });
    html += '</div>';

    html += '<div class="trend-labels">';
    last7.forEach(h => {
        html += `<span class="trend-label">${h.date.slice(5)}</span>`;
    });
    html += '</div>';

    return html;
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
// createTestCard — consolidated
// ============================================================
function createTestCard(tc) {
    const div = document.createElement("div");
    div.className = "test-card";
    div.setAttribute("data-id", tc.id);
    div.setAttribute("draggable", "true");
    const isSelected = selectedTestCases.has(tc.id);
    const fb = getFeedback();
    const fbCur = fb[tc.id] || "";

    function openDetails() {
        const steps = (tc.steps || []).map(s => `<li>${esc(s)}</li>`).join("");
        openModal(tc.title,
            `<p><strong>Description:</strong><br>${esc(tc.description || "")}</p>` +
            `<p><strong>Steps:</strong><ol>${steps}</ol></p>` +
            `<p><strong>Expected:</strong><br>${esc(tc.expected || "")}</p>` +
            `<p><strong>Tags:</strong> ${(tc.tags || []).map(esc).join(", ")}</p>` +
            `<p><strong>Risk:</strong> ${esc(tc.risk || "")}</p>`
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
            <button class="icon-btn" data-action="copy" title="Copy to clipboard"><i data-lucide="copy"></i></button>
            <button class="icon-btn" data-action="duplicate" title="Duplicate"><i data-lucide="copy-plus"></i></button>
            <button class="icon-btn fb-up ${fbCur === 'up' ? 'fb-active' : ''}" data-action="fb-up" data-id="${esc(tc.id)}" title="Good"><i data-lucide="thumbs-up"></i></button>
            <button class="icon-btn fb-down ${fbCur === 'down' ? 'fb-active' : ''}" data-action="fb-down" data-id="${esc(tc.id)}" title="Needs improvement"><i data-lucide="thumbs-down"></i></button>
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
            const action = btn.dataset.action;
            if (action === "copy") { copyTestCase(tc); return; }
            if (action === "duplicate") {
                const idx = latestTestCases.findIndex(x => x.id === tc.id);
                duplicateTestCase(tc, idx);
                return;
            }
            if (action === "fb-up" || action === "fb-down") {
                const vote = action === "fb-up" ? "up" : "down";
                const id = btn.dataset.id;
                const fb = getFeedback();
                if (fb[id] === vote) { delete fb[id]; }
                else { fb[id] = vote; }
                saveFeedback(fb);
                div.querySelectorAll(".icon-btn.fb-up, .icon-btn.fb-down").forEach(b =>
                    b.classList.toggle("fb-active", fb[b.dataset.id] === (b.dataset.action === "fb-up" ? "up" : "down"))
                );
                showToast(vote === "up" ? "Marked as good" : "Marked for improvement", "info", 1500);
            }
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
        : `${total} ${t("testCasesLabel")}`;
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
        { id: "TC-001", title: "Valid user login with correct credentials", description: "Verify that a user can log in successfully with valid email and password.", steps: ["Navigate to login page", "Enter valid email address", "Enter valid password", "Click Sign In button"], expected: "User is redirected to dashboard and sees welcome message", priority: "Critical", tags: ["authentication", "smoke"], risk: "Users cannot access the platform if this fails" },
        { id: "TC-002", title: "Password reset email delivery", description: "Verify that clicking 'Forgot Password' sends a reset link to the registered email.", steps: ["Click 'Forgot Password' link on login page", "Enter registered email", "Submit request", "Check email inbox"], expected: "Password reset email is received within 30 seconds", priority: "High", tags: ["authentication", "email"], risk: "Users are locked out if password reset fails" },
        { id: "TC-003", title: "Search returns relevant results", description: "Verify that the search bar returns matching items based on keyword input.", steps: ["Type a product name in the search bar", "Press Enter", "Observe search results"], expected: "Relevant results appear within 2 seconds, sorted by relevance", priority: "Medium", tags: ["search", "usability"], risk: "Users cannot find products efficiently" },
        { id: "TC-004", title: "File upload validates file type", description: "Verify that uploading an unsupported file type shows an error message.", steps: ["Click Upload button", "Select a .exe file", "Confirm upload"], expected: "Error message 'Unsupported file type' is shown and file is rejected", priority: "Medium", tags: ["upload", "validation"], risk: "Security risk if invalid files are accepted" },
        { id: "TC-005", title: "Checkout applies discount code", description: "Verify that entering a valid promo code reduces the cart total.", steps: ["Add items to cart", "Go to checkout", "Enter discount code 'SAVE10'", "Apply code"], expected: "Total is reduced by 10% and success message is shown", priority: "High", tags: ["checkout", "payments"], risk: "Revenue loss if discount codes malfunction" },
        { id: "TC-006", title: "Responsive layout on mobile viewport", description: "Verify that the dashboard renders correctly on a 375px wide screen.", steps: ["Open app on mobile device (375px width)", "Navigate to Dashboard", "Verify all sections are visible"], expected: "All dashboard cards stack vertically without horizontal scroll", priority: "Low", tags: ["responsive", "ui"], risk: "Poor mobile experience drives users away" },
    ].map(tc => ({ ...tc, status: null }));

    latestTestCases = mock;
    saveLatestTestCases();
    renderSavedTestCards();
    toggleActionBtns();
    updateUsageCounter();

    state.usageTotal += mock.length;
    state.history.unshift({ feature: "Demo — user login & checkout flows", date, time, count: mock.length });
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
        latestTestCases.forEach(tc => { if(!tc.status) tc.status = null; });

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
    } catch (_) {}
}

// ============================================================
// INIT
// ============================================================
loadLatestTestCases();
renderSavedTestCards();
applyLang();
loadDraft();
updateUsageCounter();
renderDashboard();
toggleActionBtns();
window.addEventListener("pageshow", () => {
    try { lucide.createIcons(); } catch (_) {}
});
