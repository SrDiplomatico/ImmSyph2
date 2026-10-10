# Civil Surgeon Guide — Syphilis, Gonorrhea & Tuberculosis

Bilingual (English / Spanish) step-by-step decision support for civil surgeons completing the
USCIS immigration medical examination (Form I-693), based on the CDC Technical Instructions for
Civil Surgeons. Installable, offline-capable progressive web app (PWA); no build step, no backend.

| Module | Source | What it covers |
|---|---|---|
| `syphilis.html` | CDC TI for Civil Surgeons — Syphilis | Age-based testing, traditional and reverse algorithms, titer, staging, treatment, adequacy of prior treatment, Class A / Class B / No Class |
| `gonorrhea.html` | CDC TI for Civil Surgeons — Gonorrhea (effective Sept 1, 2021) + CDC STI Treatment Guidelines 2021 | Testing ages 18–24, NAAT, site-specific treatment (ceftriaxone and alternatives), directly observed onsite treatment, test of cure, Class A (untreated) → Class B (treated) |
| `tuberculosis.html` | CDC TI for Civil Surgeons — Tuberculosis (effective March 11, 2024) | IGRA for ≥ 2 years, chest x-ray triggers, health-department referral, Class A, B0, B1 (pulmonary / extrapulmonary), B2 (LTBI), Class B other chest condition, No Class; reference table of all TB classes |

## Classification key

* **Class A** — inadmissible until treatment is completed and documented. Shown as a red alert banner.
* **Class B** — admissible; must be documented on Form I-693 and reported to the health department (amber banner).
* **No Class A or Class B** — green banner.
* **Hold** — TB only: the civil surgeon must not classify or sign while a health-department referral is pending (yellow banner).

## Project layout

```
index.html          hub (module chooser + class legend)
syphilis.html       syphilis module
gonorrhea.html      gonorrhea module
tuberculosis.html   tuberculosis / IGRA module
styles.css          shared styles
app.js              shared step engine (navigation, language toggle, result rendering, class banners), service worker registration, install prompt
manifest.json       PWA manifest (shortcuts to each module)
sw.js               service worker (cache-first; bump CACHE_NAME when files change)
```

Each module page declares its own steps in HTML (`<div class="step" id="step…">`) and its own
decision logic in an inline script; the shared engine in `app.js` provides `goToStep`, `goBack`,
`showResults`, `resetEvaluation`, `getLangSpan`, `getText` and `classBanner`.

## Decision logic

Every rule the gonorrhea and tuberculosis wizards apply, with its source and the items still to be
verified against the live CDC pages, is written out in [docs/CLINICAL-LOGIC.md](docs/CLINICAL-LOGIC.md).

## Running locally

Any static server works, for example:

```
python3 -m http.server 8080
```

then open <http://localhost:8080/>. GitHub Pages serves the repository root as-is.

## Disclaimer

Clinical decision support only. Always follow the current CDC Technical Instructions for Civil
Surgeons, the CDC STI Treatment Guidelines and the Form I-693 instructions. Verify every
classification against the current instructions before signing Form I-693.
