/* ==========================================================================
   Civil Surgeon Guide — shared engine
   Used by index.html (hub), syphilis.html, gonorrhea.html, tuberculosis.html.
   Classic script: these globals are shared with each page's inline module script.
   ========================================================================== */

var currentLanguage = 'en';
var currentStep = 1;
var stepHistory = [1];
var deferredPrompt;

// Restore language preference (per-device convenience only)
(function restoreLanguage() {
    try {
        if (localStorage.getItem('csg-lang') === 'es') {
            currentLanguage = 'es';
        }
    } catch (e) { /* storage unavailable: default to English */ }
    function apply() {
        if (currentLanguage === 'es') {
            document.body.classList.add('spanish');
        }
    }
    if (document.body) { apply(); } else { document.addEventListener('DOMContentLoaded', apply); }
})();

window.App = {
    totalSteps: 6,
    firstStep: 1,
    onStep: null,     // function(stepId, extra) called after a step is shown
    onReset: null,    // function() called by resetEvaluation before returning to firstStep
    configure: function (opts) {
        opts = opts || {};
        if (opts.totalSteps) { App.totalSteps = opts.totalSteps; }
        if (opts.firstStep !== undefined) { App.firstStep = opts.firstStep; }
        App.onStep = typeof opts.onStep === 'function' ? opts.onStep : null;
        App.onReset = typeof opts.onReset === 'function' ? opts.onReset : null;
        currentStep = App.firstStep;
        stepHistory = [App.firstStep];
        updateBackButton();
        updateProgress(typeof App.firstStep === 'number' ? App.firstStep : 1);
    }
};

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
    document.body.classList.toggle('spanish', currentLanguage === 'es');
    try { localStorage.setItem('csg-lang', currentLanguage); } catch (e) { /* ignore */ }
}

function getText(enText, esText) {
    return currentLanguage === 'en' ? enText : esText;
}

function getLangSpan(enText, esText) {
    return '<span class="lang-en">' + enText + '</span><span class="lang-es">' + esText + '</span>';
}

function updateProgress(step) {
    var bar = document.getElementById('progressBar');
    if (!bar) { return; }
    var progress = (step / App.totalSteps) * 100;
    bar.style.width = progress + '%';
}

function goToStep(stepId, extra) {
    document.querySelectorAll('.step').forEach(function (step) {
        step.classList.remove('active');
    });

    var stepElement = document.getElementById('step' + stepId) || document.getElementById(stepId);
    if (stepElement) {
        stepElement.classList.add('active');
    }

    // Add to history if moving to a different step
    if (stepId !== stepHistory[stepHistory.length - 1]) {
        stepHistory.push(stepId);
    }

    currentStep = stepId;

    // Only update progress bar for numeric steps
    if (typeof stepId === 'number') {
        updateProgress(Math.floor(stepId));
    }

    updateBackButton();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (typeof App.onStep === 'function') {
        App.onStep(stepId, extra);
    }
}

function goBack() {
    if (stepHistory.length > 1) {
        stepHistory.pop(); // Remove current step
        var previousStep = stepHistory[stepHistory.length - 1];

        // Special case (syphilis): return to the generated "past treated" page
        if (previousStep === 'pastTreatedPage' && typeof window.showPastTreatedOrLatent === 'function') {
            showPastTreatedOrLatent();
        } else {
            goToStep(previousStep);
        }
    }
}

function updateBackButton() {
    var backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(function (button) {
        if (stepHistory.length > 1 && currentStep !== 'results' && currentStep !== App.firstStep) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
}

function showResults(content) {
    var container = document.getElementById('resultsContent');
    container.innerHTML = content;

    var backButtonHtml = '<button onclick="goBack()" class="secondary">← <span class="lang-en">Back</span><span class="lang-es">Atrás</span></button>';
    var startOverButtonHtml = '<button onclick="resetEvaluation()"><span class="lang-en">Start Over</span><span class="lang-es">Comenzar de Nuevo</span></button>';

    if (stepHistory.length > 1) {
        container.innerHTML += '<div class="nav-buttons" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">' +
            backButtonHtml + startOverButtonHtml + '</div>';
    } else {
        container.innerHTML += '<div class="nav-buttons" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">' +
            startOverButtonHtml + '</div>';
    }

    goToStep('results');
    announceResult();
}

// Screen-reader announcement of the classification banner (role=alert alone is not
// reliably announced when the element becomes visible after insertion).
function announceResult() {
    var live = document.getElementById('announce');
    if (!live) {
        live = document.createElement('div');
        live.id = 'announce';
        live.setAttribute('aria-live', 'assertive');
        live.setAttribute('aria-atomic', 'true');
        live.className = 'sr-only';
        document.body.appendChild(live);
    }
    var title = document.querySelector('#resultsContent .class-banner-title .lang-' + currentLanguage);
    live.textContent = '';
    if (title) {
        setTimeout(function () { live.textContent = title.textContent; }, 50);
    }
}

function resetEvaluation() {
    currentStep = App.firstStep;
    stepHistory = [App.firstStep];
    if (typeof App.onReset === 'function') {
        App.onReset();
    }
    goToStep(App.firstStep);
    updateProgress(typeof App.firstStep === 'number' ? App.firstStep : 1);
}

/**
 * Classification banner shown as the first element of every final result.
 * kind: 'A' | 'B' | 'NONE' | 'HOLD'
 * opts: { subEn, subEs, labelEn, labelEs }
 */
function classBanner(kind, opts) {
    opts = opts || {};
    var key = String(kind || 'NONE').toUpperCase();
    var defs = {
        A:    { cls: 'a',    icon: '🛑', role: 'alert',  en: 'CLASS A — INADMISSIBLE — DO NOT CLEAR', es: 'CLASE A — INADMISIBLE — NO AUTORICE' },
        B:    { cls: 'b',    icon: '📋', role: 'status', en: 'CLASS B — MAY BE CLEARED — FOLLOW-UP REQUIRED', es: 'CLASE B — PUEDE AUTORIZARSE — REQUIERE SEGUIMIENTO' },
        NONE: { cls: 'none', icon: '✅', role: 'status', en: 'NO CLASS A OR CLASS B', es: 'SIN CLASE A NI CLASE B' },
        HOLD: { cls: 'hold', icon: '⏳', role: 'alert',  en: 'PENDING — DO NOT CLASSIFY OR SIGN YET', es: 'PENDIENTE — NO CLASIFIQUE NI FIRME TODAVÍA' }
    };
    var d = defs[key] || defs.NONE;
    var title = getLangSpan(opts.labelEn || d.en, opts.labelEs || d.es);
    var sub = (opts.subEn || opts.subEs)
        ? '<div class="class-banner-sub">' + getLangSpan(opts.subEn || '', opts.subEs || '') + '</div>'
        : '';
    return '<div class="class-banner ' + d.cls + '" role="' + d.role + '">' +
        '<div class="class-banner-icon" aria-hidden="true">' + d.icon + '</div>' +
        '<div class="class-banner-text"><div class="class-banner-title">' + title + '</div>' + sub + '</div>' +
        '</div>';
}

/**
 * Form I-693 label box. The label is ALWAYS shown in English (the form is completed in
 * English); the caption and the optional plain-language meaning are bilingual.
 * opts: { meaningEn, meaningEs }
 */
function formLabel(label, opts) {
    opts = opts || {};
    var meaning = (opts.meaningEn || opts.meaningEs)
        ? '<div class="form-label-meaning">' + getLangSpan(opts.meaningEn || '', opts.meaningEs || '') + '</div>'
        : '';
    return '<div class="form-label">' +
        '<div class="form-label-caption">' + getLangSpan('Write exactly this on Form I-693:', 'Escriba exactamente este texto en el Formulario I-693:') + '</div>' +
        '<div class="form-label-row"><code class="form-label-text" lang="en">' + label + '</code>' +
        '<button type="button" class="copy-btn" onclick="copyFormLabel(this)">' + getLangSpan('Copy', 'Copiar') + '</button></div>' +
        meaning + '</div>';
}

function copyFormLabel(btn) {
    var code = btn.parentNode.querySelector('.form-label-text');
    var text = code ? code.textContent : '';
    function done(ok) {
        btn.innerHTML = ok ? getLangSpan('Copied ✓', 'Copiado ✓') : getLangSpan('Copy', 'Copiar');
        setTimeout(function () { btn.innerHTML = getLangSpan('Copy', 'Copiar'); }, 1500);
    }
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
        } else {
            done(false);
        }
    } catch (e) { done(false); }
}

/**
 * "Based on your answers" summary shown under the banner.
 * items: array of { en, es } (already-formatted short strings).
 */
function answersSummary(items) {
    if (!items || !items.length) { return ''; }
    var lis = items.map(function (it) { return '<li>' + getLangSpan(it.en, it.es) + '</li>'; }).join('');
    return '<div class="answers"><div class="answers-title">' + getLangSpan('Based on your answers', 'Según sus respuestas') + '</div><ul>' + lis + '</ul></div>';
}

/**
 * Required-actions box coloured by class. kind: 'A' | 'B' | 'NONE' | 'HOLD'
 * itemsHtml: inner HTML of the <ul class="checklist"> (li elements).
 */
function actionsBox(kind, itemsHtml, titleEn, titleEs) {
    var cls = { A: 'a', B: 'b', NONE: 'none', HOLD: 'hold' }[String(kind || 'NONE').toUpperCase()] || 'none';
    return '<div class="actions actions-' + cls + '"><strong>' +
        getLangSpan(titleEn || 'Required actions', titleEs || 'Acciones requeridas') +
        '</strong><ul class="checklist">' + itemsHtml + '</ul></div>';
}

// ---------------------------------------------------------------------------
// Multi-select ("check all that apply") helpers
//   <div class="choice-group" id="g"> <button class="choice" role="checkbox" aria-checked="false" data-value="x" onclick="choiceToggle(this)">…</button> … </div>
//   A choice with data-none="true" is exclusive ("None of the above").
//   A button with data-continue-for="g" gets a dynamic label.
// ---------------------------------------------------------------------------
function setChoice(btn, on) {
    btn.classList.toggle('selected', !!on);
    btn.setAttribute('aria-checked', on ? 'true' : 'false');
}

function choiceToggle(btn) {
    var group = btn.closest('.choice-group');
    if (!group) { return; }
    var isNone = btn.hasAttribute('data-none');
    var nowSelected = !btn.classList.contains('selected');
    if (isNone) {
        group.querySelectorAll('.choice').forEach(function (b) { setChoice(b, false); });
        setChoice(btn, nowSelected);
    } else {
        setChoice(btn, nowSelected);
        if (nowSelected) {
            group.querySelectorAll('.choice[data-none]').forEach(function (b) { setChoice(b, false); });
        }
    }
    updateChoiceContinue(group);
}

function choiceValues(group) {
    if (typeof group === 'string') { group = document.getElementById(group); }
    if (!group) { return []; }
    return Array.prototype.map.call(group.querySelectorAll('.choice.selected:not([data-none])'), function (b) {
        return b.getAttribute('data-value');
    });
}

function clearChoices(group) {
    if (typeof group === 'string') { group = document.getElementById(group); }
    if (!group) { return; }
    group.querySelectorAll('.choice').forEach(function (b) { setChoice(b, false); });
    updateChoiceContinue(group);
}

function updateChoiceContinue(group) {
    if (!group || !group.id) { return; }
    var btn = document.querySelector('[data-continue-for="' + group.id + '"]');
    if (!btn) { return; }
    var n = choiceValues(group).length;
    var noneChosen = group.querySelector('.choice.selected[data-none]') !== null;
    if (n === 0) {
        btn.innerHTML = noneChosen
            ? getLangSpan('Continue — none apply', 'Continuar — ninguna aplica')
            : getLangSpan('Continue — none apply', 'Continuar — ninguna aplica');
    } else {
        btn.innerHTML = getLangSpan('Continue (' + n + ' selected)', 'Continuar (' + n + ' seleccionadas)');
    }
}

// ---------------------------------------------------------------------------
// PWA Service Worker Registration
// ---------------------------------------------------------------------------
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('./sw.js')
            .then(function (registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(function (err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// ---------------------------------------------------------------------------
// PWA Install Prompt
// ---------------------------------------------------------------------------
window.addEventListener('beforeinstallprompt', function (e) {
    console.log('beforeinstallprompt event fired');
    e.preventDefault();
    deferredPrompt = e;
    showInstallPromotion();
});

function showInstallPromotion() {
    var installButton = document.createElement('button');
    installButton.textContent = getText('Install App', 'Instalar App');
    installButton.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background: #48bb78; color: white; border: none;' +
        ' padding: 12px 20px; border-radius: 25px; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.3); z-index: 1000;' +
        ' font-family: inherit; font-size: 14px; transition: transform 0.2s ease; flex: none; min-width: auto;';

    installButton.addEventListener('mouseenter', function () { installButton.style.transform = 'scale(1.05)'; });
    installButton.addEventListener('mouseleave', function () { installButton.style.transform = 'scale(1)'; });

    installButton.addEventListener('click', async function () {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            var choice = await deferredPrompt.userChoice;
            console.log('User response to the install prompt: ' + choice.outcome);
            deferredPrompt = null;
            installButton.remove();
        }
    });

    document.body.appendChild(installButton);

    // Auto-hide after 30 seconds
    setTimeout(function () {
        if (installButton.parentNode) {
            installButton.style.opacity = '0';
            setTimeout(function () { installButton.remove(); }, 300);
        }
    }, 30000);
}

window.addEventListener('appinstalled', function () {
    console.log('App was installed successfully');
});
