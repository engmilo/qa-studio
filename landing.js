// ── I18N ──
const i18n = {
    en: {
        navFeatures: "Features", navHow: "How it Works", navFaq: "FAQ", navCta: "Open App",
        heroDesc: "AI-powered test case generator — describe a feature and get comprehensive test cases in seconds. Multi-language, exportable, trackable.",
        heroCta: "Get Started",
        benefitAi: "AI-Generated", benefitLang: "EN \u2022 FI", benefitDash: "Dashboard & Stats", benefitExport: "Export (JSON / CSV / Excel / Word)",
        featuresTitle: "Features", featuresSub: "Everything you need to generate and manage test cases efficiently.",
        featAiTitle: "AI-Powered Generation", featAiDesc: "Describe a feature in plain language and get comprehensive, structured test cases instantly. Powered by Anthropic's Claude.",
        featDashTitle: "Dashboard & Tracking", featDashDesc: "Visual charts for status distribution, priority breakdown, and generation trends. Track pass/fail/blocked per test case.",
        featExportTitle: "Multi-Format Export", featExportDesc: "Export your test cases as JSON, CSV, Excel, or Word. Share with your team or import into your test management tool.",
        featLangTitle: "Multi-Language", featLangDesc: "Full support for English and Finnish. The AI generates test case content in your selected language automatically.",
        howTitle: "How it Works", howSub: "Four simple steps to go from feature to test cases.",
        step1Title: "Describe a Feature", step1Desc: "Type or paste a feature description — for example, \"User login with email and password\" — then generate comprehensive test cases in seconds.",
        step2Title: "Generate Test Cases", step2Desc: "Click \"Generate\" and the AI creates 14–18 structured test cases covering positive, negative, edge, validation, UI/UX, functional, API, integration, regression, and security scenarios.",
        step3Title: "Review & Export", step3Desc: "Mark each test case as pass/fail/blocked, sort by priority, save to projects, and export in your preferred format.",
        step4Title: "Configure API (Optional)", step4Desc: "Use the built-in proxy by default, or open API Configuration in the sidebar to enter your own Anthropic API key, switch between models (Sonnet, Haiku, Opus), or point to a custom endpoint.",
        faqTitle: "FAQ", faqSub: "Common questions about QA Studio.",
        faq1q: "Do I need an API key?", faq1a: "You need an Anthropic API key to generate test cases. Open API Configuration in the app's sidebar, enter your key, and choose a model. The API Endpoint URL defaults to the built-in proxy — you can leave it as-is or point to any Anthropic-compatible endpoint.",
        faq2q: "Is my data stored on a server?", faq2a: "No. All your projects, test cases, and settings are stored locally in your browser's localStorage. Nothing is sent to any server except the AI generation request.",
        faq3q: "Can I export my test cases?", faq3a: "Yes. Export as JSON, CSV, Excel, or Word. You can also import previously exported JSON backups to restore your data.",
        faq4q: "What languages are supported?", faq4a: "The interface is available in English and Finnish. The AI generates test case content in your selected language automatically.",
        faq5q: "Can I use this offline?", faq5a: "The app is a fully client-side PWA. Previously generated test cases and projects are accessible offline. AI generation requires an internet connection.",
        footerText: "QA Studio by Milo Haireche — 20+ years of QA expertise",
    },
    fi: {
        navFeatures: "Ominaisuudet", navHow: "Toiminta", navFaq: "UKK", navCta: "Avaa sovellus",
        heroDesc: "AI-pohjainen testitapausten generaattori — kuvaile ominaisuus ja saat kattavat testitapaukset sekunneissa. Monikielinen, vietävissä, seurattavissa.",
        heroCta: "Aloita",
        benefitAi: "AI-luotu", benefitLang: "EN \u2022 FI", benefitDash: "Hallintapaneeli ja tilastot", benefitExport: "Vienti (JSON / CSV / Excel / Word)",
        featuresTitle: "Ominaisuudet", featuresSub: "Kaikki mitä tarvitset testitapausten luomiseen ja hallintaan.",
        featAiTitle: "AI-pohjainen luonti", featAiDesc: "Kuvaile ominaisuus luonnollisella kielellä ja saat kattavia, jäsenneltyjä testitapauksia hetkessä. Pohjautuu Anthropic's Clauden tekoälyyn.",
        featDashTitle: "Hallintapaneeli", featDashDesc: "Visuaaliset kaaviot tilajakaumasta, prioriteeteista ja luontitrendeistä. Merkitse testitapaukset hyväksytyksi/hylätyksi/estetyksi.",
        featExportTitle: "Monimuotoinen vienti", featExportDesc: "Vie testitapauksesi JSON-, CSV-, Excel- tai Word-muodossa. Jaa tiimillesi tai tuo testinhallintatyökaluusi.",
        featLangTitle: "Monikielisyys", featLangDesc: "Täysi tuki englanniksi ja suomeksi. Tekoäly luo testitapaukset automaattisesti valitsemallasi kielellä.",
        howTitle: "Toiminta", howSub: "Neljä yksinkertaista vaihetta ominaisuudesta testitapauksiin.",
        step1Title: "Kuvaile ominaisuus", step1Desc: "Kirjoita tai liitä ominaisuuskuvaus — esimerkiksi \"Käyttäjän kirjautuminen sähköpostilla ja salasanalla\" — ja luo kattavat testitapaukset sekunneissa.",
        step2Title: "Luo testitapaukset", step2Desc: "Paina \"Luo\" ja tekoäly luo 14–18 jäsenneltyä testitapausta kattaen positiiviset, negatiiviset, raja-arvo-, validointi-, käyttöliittymä-, toiminnallisuus-, API-, integraatio-, regressio- ja tietoturvatapaukset.",
        step3Title: "Tarkista ja vie", step3Desc: "Merkitse jokainen testitapaus hyväksytyksi/hylätyksi/estetyksi, lajittele prioriteetin mukaan, tallenna projekteihin ja vie haluamassasi muodossa.",
        step4Title: "Määritä API (valinnainen)", step4Desc: "Käytä oletuksena sisäänrakennettua välityspalvelinta tai avaa API-asetukset sivupalkissa lisätäksesi oman Anthropic API -avaimesi, vaihtaaksesi mallia (Sonnet, Haiku, Opus) tai osoittaaksesi omaan päätepisteeseen.",
        faqTitle: "UKK", faqSub: "Usein kysytyt kysymykset QA Studiosta.",
        faq1q: "Tarvitsenko API-avaimen?", faq1a: "Tarvitset Anthropic API -avaimen testitapausten luomiseen. Avaa API-asetukset sovelluksen sivupalkissa, syötä avaimesi ja valitse malli. API-päätepisteen URL osoittaa oletuksena sisäänrakennettuun välityspalvelimeen — voit jättää sen ennalleen tai osoittaa mihin tahansa Anthropic-yhteensopivaan päätepisteeseen.",
        faq2q: "Tallennetaanko tietoni palvelimelle?", faq2a: "Ei. Kaikki projektisi, testitapauksesi ja asetukset tallennetaan paikallisesti selaimesi localStorageen. Mitään ei lähetetä palvelimelle paitsi tekoälypyyntö.",
        faq3q: "Voinko viedä testitapaukseni?", faq3a: "Kyllä. Vie JSON-, CSV-, Excel- tai Word-muodossa. Voit myös tuoda aiemmin vietyjä JSON-varmuuskopioita palauttaaksesi tietosi.",
        faq4q: "Mitä kieliä tuetaan?", faq4a: "Käyttöliittymä on saatavilla englanniksi ja suomeksi. Tekoäly luo testitapausten sisällön automaattisesti valitsemallasi kielellä.",
        faq5q: "Voinko käyttää tätä offline-tilassa?", faq5a: "Sovellus on täysin asiakaspuolen PWA. Aiemmin luodut testitapaukset ja projektit ovat käytettävissä offline-tilassa. Tekoälyn käyttö vaatii internetyhteyden.",
        footerText: "QA Studio, tekijä Milo Haireche — yli 20 vuoden QA-kokemus",
    }
};

let lang;
const t = key => (i18n[lang] && i18n[lang][key] !== undefined) ? i18n[lang][key] : (i18n.en[key] || key);

function applyLang() {
    lang = localStorage.getItem("qa_landing_lang") || "en";
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const val = t(el.dataset.i18n);
        if (typeof val === "string") el.textContent = val;
    });
    document.querySelectorAll(".nav-lang button:not(.theme-toggle)").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.lang === lang);
    });
}
applyLang();
window.addEventListener("pageshow", applyLang);

// ── Theme ──
const savedTheme = localStorage.getItem("qa_theme") || "light";
if (savedTheme === "dark") {
    document.body.classList.add("dark");
    document.getElementById("themeIcon").outerHTML = `<svg id="themeIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}
document.getElementById("themeToggle").addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    document.body.classList.toggle("dark", !isDark);
    localStorage.setItem("qa_theme", isDark ? "light" : "dark");
    document.getElementById("themeIcon").outerHTML = isDark
        ? `<svg id="themeIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
        : `<svg id="themeIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
});

document.querySelectorAll(".nav-lang button:not(.theme-toggle)").forEach(btn => {
    btn.addEventListener("click", () => {
        lang = btn.dataset.lang;
        localStorage.setItem("qa_landing_lang", lang);
        localStorage.setItem("qa_lang", lang);
        applyLang();
    });
});

// ── Mobile Nav Toggle ──
document.getElementById("mobileToggle").addEventListener("click", () => {
    document.getElementById("navLinks").classList.toggle("open");
});

// ── FAQ Accordion ──
document.querySelectorAll(".faq-q").forEach(btn => {
    btn.addEventListener("click", () => {
        const item = btn.parentElement;
        const open = item.classList.contains("open");
        document.querySelectorAll(".faq-item.open").forEach(el => el.classList.remove("open"));
        if (!open) item.classList.add("open");
    });
});

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
        const id = a.getAttribute("href").slice(1);
        const el = document.getElementById(id);
        if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: "smooth" });
            document.getElementById("navLinks").classList.remove("open");
        }
    });
});

// ── Back to top ──
document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});