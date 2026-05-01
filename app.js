/* ====================================================================
   RevUP Intake v2 — Refined App Engine
   Improvements over v1:
     - Welcome: single confident invitation (was 3 paragraphs)
     - Page-nav scoped to subsection + review only (not welcome/intros)
     - Dynamic "why we ask" with smooth transitions
     - Section completion celebration
     - Leaf-shimmer animation when save fires
     - Keyboard shortcuts (Cmd+Enter / Cmd+/ / Cmd+B)
     - Refined PDF output with cover page + section title pages
     - Calmer review accordion
   ==================================================================== */

const STORAGE_KEY = 'revup_intake_v2';

const state = {
  screen: 'welcome',
  currentSectionIdx: 0,
  currentSubsectionIdx: 0,
  answers: {},
  expandedReviewSections: {},
  expandedReviewQuestions: {},
  meta: { name: '', email: '', startedAt: null, lastSavedAt: null },
  // Track section completion to fire celebration once per section
  celebratedSections: {},
};

// === Subsection groupings (computed) ===
const SUBSECTIONS = (function () {
  const subs = [];
  let last = '';
  QUESTIONS.forEach(q => {
    if (q.subsection !== last) {
      subs.push({ section: q.section, title: q.subsection, questions: [q] });
      last = q.subsection;
    } else {
      subs[subs.length - 1].questions.push(q);
    }
  });
  return subs;
})();

function getSubsectionsForSection(sectionId) { return SUBSECTIONS.filter(s => s.section === sectionId); }
function getFirstSubsectionIdxOfSection(sectionId) { return SUBSECTIONS.findIndex(s => s.section === sectionId); }

// === Persistence ===
function saveState() {
  state.meta.lastSavedAt = new Date().toISOString();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      answers: state.answers,
      meta: state.meta,
      currentSectionIdx: state.currentSectionIdx,
      currentSubsectionIdx: state.currentSubsectionIdx,
      expandedReviewSections: state.expandedReviewSections,
      celebratedSections: state.celebratedSections,
    }));
    showSavedFlash();
    triggerLeafShimmer();
    checkSectionCompletion();
  } catch (e) {
    console.warn('Save failed', e);
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    Object.assign(state.answers, data.answers || {});
    Object.assign(state.meta, data.meta || {});
    Object.assign(state.expandedReviewSections, data.expandedReviewSections || {});
    Object.assign(state.celebratedSections, data.celebratedSections || {});
    if (typeof data.currentSectionIdx === 'number') state.currentSectionIdx = data.currentSectionIdx;
    if (typeof data.currentSubsectionIdx === 'number') state.currentSubsectionIdx = data.currentSubsectionIdx;
    // Always start at welcome — no screen restoration
    return true;
  } catch (e) {
    console.warn('Load failed', e);
    return false;
  }
}

let saveTimer = null;
function debouncedSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveState, 600);
}

let flashTimer = null;
function showSavedFlash() {
  const el = document.getElementById('saveFlash');
  if (!el) return;
  el.textContent = 'auto-saved';
  el.style.opacity = '1';
  clearTimeout(flashTimer);
  flashTimer = setTimeout(() => { el.style.opacity = '0.5'; }, 1600);
}

function triggerLeafShimmer() {
  const plant = document.querySelector('.floaty-metaphor');
  if (!plant) return;
  plant.classList.remove('shimmer');
  void plant.offsetWidth; // reflow
  plant.classList.add('shimmer');
  setTimeout(() => plant.classList.remove('shimmer'), 1300);
}

// === Section celebration ===
function checkSectionCompletion() {
  SECTIONS.forEach(s => {
    if (state.celebratedSections[s.id]) return;
    const { answered, total } = answeredInSection(s.id);
    if (answered === total && total > 0) {
      state.celebratedSections[s.id] = true;
      celebrateSection(s);
    }
  });
}

function celebrateSection(section) {
  const messages = [
    `${section.title} — done.`,
    `You finished ${section.title}.`,
    `${section.title} complete.`,
  ];
  const msg = messages[Math.floor(Math.random() * messages.length)];
  const el = document.createElement('div');
  el.className = 'section-celebration';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2500);
}

// === Computed ===
function totalQuestions() { return QUESTIONS.length; }
function answeredCount() { return QUESTIONS.filter(q => isAnswered(q.id)).length; }
function isAnswered(qid) {
  const v = state.answers[qid];
  if (v == null) return false;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === 'object') return Object.values(v).some(x => x && String(x).trim());
  return String(v).trim().length > 0;
}
function progressFraction() {
  const t = totalQuestions();
  return t === 0 ? 0 : answeredCount() / t;
}
function answeredInSection(sectionId) {
  const qs = QUESTIONS.filter(q => q.section === sectionId);
  return { answered: qs.filter(q => isAnswered(q.id)).length, total: qs.length };
}

// === Render shell ===
function render() {
  const root = document.getElementById('app');
  if (!root) return;

  let content = '';
  switch (state.screen) {
    case 'welcome':       content = renderWelcome(); break;
    case 'sectionIntro':  content = renderSectionIntro(); break;
    case 'subsection':    content = renderSubsection(); break;
    case 'review':        content = renderReview(); break;
    case 'complete':      content = renderComplete(); break;
  }

  const showPlant = state.screen !== 'welcome' || answeredCount() > 0;

  root.innerHTML = `
    <div class="app">
      <div class="wf-artboard">
        ${content}
      </div>
      ${showPlant ? renderFloatyMetaphor() : ''}
    </div>
    <div id="printContainer" aria-hidden="true"></div>
  `;

  attachHandlers();

  if (state.screen === 'subsection') {
    setTimeout(() => {
      const firstInput = document.querySelector('.subsection-page .w-field');
      if (firstInput) firstInput.focus();
    }, 80);
  }
}

// === Header ===
function renderHeader(showRight = true) {
  return `
    <div class="wf-header">
      <button class="brand-home" onclick="goHome()" aria-label="Return to start">
        <span class="brand-mark">R</span>
        <span class="brand-text">RevUP</span>
      </button>
      ${showRight ? `
        <div class="header-right">
          <span class="header-keyhint" title="Keyboard: Cmd+Enter next · Cmd+/ review">⌘ + ↵ next · ⌘ + / review</span>
          <span id="saveFlash" class="save-status" style="opacity: 0.5;">auto-saved</span>
          <button class="w-btn w-btn--icon" onclick="goReview()">Review</button>
        </div>
      ` : ''}
    </div>
  `;
}

// === Progress bar ===
function renderProgress(label) {
  const pct = Math.round(progressFraction() * 100);
  const total = totalQuestions();
  const done = answeredCount();
  return `
    <div>
      <div class="progress-meta">
        <span class="eyebrow">${label || (pct + '% complete')}</span>
        <span class="eyebrow">${done} of ${total}</span>
      </div>
      <div class="w-progress"><div class="w-progress__fill" style="width: ${pct}%"></div></div>
    </div>
  `;
}

// === Welcome — single confident invitation ===
function renderWelcome() {
  const hasProgress = answeredCount() > 0;
  const name = state.meta.name || '';
  const email = state.meta.email || '';
  return `
    ${renderHeader(false)}
    <div class="welcome">
      <h1 class="welcome__title">
        Before we start your marketing campaign,<br/>
        <em>we want to understand your world.</em>
      </h1>
      <p class="welcome__sub">
        Not a form. A diagnostic. The depth you bring here shapes everything we make for you afterwards — the sales letter, the campaign, the positioning, the voice.
      </p>
      <div class="welcome__details">
        <div class="welcome__detail-row">74 questions across 7 sections</div>
        <div class="welcome__detail-row">About 90 minutes — fillable in pieces</div>
        <div class="welcome__detail-row">Auto-saves to your browser as you type</div>
        <div class="welcome__detail-row">Be honest, not polished</div>
      </div>
      <div class="welcome__form">
        <div class="welcome__field-group">
          <label class="eyebrow" for="welcomeName">Your name</label>
          <input class="w-field" id="welcomeName" type="text" placeholder="What should we call you?" value="${escapeHtml(name)}" />
        </div>
        <div class="welcome__field-group">
          <label class="eyebrow" for="welcomeEmail">Email</label>
          <input class="w-field" id="welcomeEmail" type="email" placeholder="So we know who is sending us this" value="${escapeHtml(email)}" />
        </div>
      </div>
      <div class="welcome__actions">
        <button class="w-btn w-btn--primary" onclick="beginIntake()">${hasProgress ? 'Continue →' : 'Begin →'}</button>
        ${hasProgress ? `<button class="w-btn w-btn--ghost" onclick="resetIntake()">Start over</button>` : ''}
        ${!hasProgress ? `<span class="welcome__quiet-promise">— we read every word.</span>` : ''}
      </div>
    </div>
  `;
}

// === Section Intro — more breath, no page-nav noise ===
function renderSectionIntro() {
  const section = SECTIONS[state.currentSectionIdx];
  const sectionNum = state.currentSectionIdx + 1;
  return `
    ${renderHeader()}
    ${renderProgress(`Section ${sectionNum} of ${SECTIONS.length}`)}
    <div class="section-intro">
      <div class="section-intro__copy">
        <span class="eyebrow">Section ${sectionNum} · ${section.id}</span>
        <h2>${section.title}.</h2>
        <p class="section-intro__lede">${section.subtitle}</p>
        <p>${section.why}</p>
        <button class="w-btn w-btn--primary" onclick="startSection()">
          Start · ${section.questionCount} questions · ${section.timeEst}  →
        </button>
      </div>
      <div class="section-intro__diagram">
        ${renderSectionDiagram(state.currentSectionIdx)}
      </div>
    </div>
  `;
}

// === Section diagrams — meaningful per section, not generic ===
function renderSectionDiagram(activeIdx) {
  // Per-section conceptual sketches — small, hand-drawn-feeling SVG metaphors
  const section = SECTIONS[activeIdx];
  const diagrams = {
    A: renderDiagramOffer(),
    B: renderDiagramFounder(),
    C: renderDiagramAudience(),
    D: renderDiagramShift(),
    E: renderDiagramProof(),
    F: renderDiagramMarket(),
    G: renderDiagramConstraints(),
  };
  return diagrams[section.id] || '';
}

// Section A — offer: stacked rectangles + price tag
function renderDiagramOffer() {
  return `<svg viewBox="0 0 280 240" width="100%" height="100%">
    <g stroke="#94c9a5" stroke-width="1.4" fill="none">
      <rect x="60" y="40" width="160" height="50" rx="2" fill="rgba(148,201,165,0.08)"/>
      <text x="140" y="70" font-family="JetBrains Mono" font-size="11" fill="#e6e2d6" text-anchor="middle" letter-spacing="0.1em">YOUR OFFER</text>
      <rect x="80" y="100" width="120" height="28" rx="2" stroke-dasharray="3 3"/>
      <text x="140" y="118" font-family="JetBrains Mono" font-size="9" fill="#7a7a70" text-anchor="middle">+ bonuses</text>
      <rect x="80" y="138" width="120" height="28" rx="2" stroke-dasharray="3 3"/>
      <text x="140" y="156" font-family="JetBrains Mono" font-size="9" fill="#7a7a70" text-anchor="middle">+ guarantee</text>
    </g>
    <g transform="translate(170 180)" stroke="#c9a961" stroke-width="1" fill="none">
      <path d="M 0 0 L 50 0 L 60 12 L 50 24 L 0 24 Z" fill="rgba(201,169,97,0.1)"/>
      <text x="25" y="17" font-family="JetBrains Mono" font-size="10" fill="#c9a961" text-anchor="middle">$</text>
    </g>
  </svg>`;
}

// Section B — founder: a single figure with halo of credentials
function renderDiagramFounder() {
  return `<svg viewBox="0 0 280 240" width="100%" height="100%">
    <g stroke="#94c9a5" stroke-width="1.4" fill="none">
      <circle cx="140" cy="100" r="32"/>
      <path d="M 110 145 Q 140 130 170 145 L 168 175 L 112 175 Z" fill="rgba(148,201,165,0.1)"/>
    </g>
    <g stroke="#c9a961" stroke-width="0.8" fill="none" opacity="0.7">
      <circle cx="140" cy="100" r="58" stroke-dasharray="2 4"/>
      <circle cx="140" cy="100" r="74" stroke-dasharray="2 4"/>
    </g>
    <text x="140" y="220" font-family="Caveat" font-size="20" fill="#94c9a5" text-anchor="middle">who you really are</text>
  </svg>`;
}

// Section C — audience: cluster of dots (people) with one highlighted
function renderDiagramAudience() {
  let dots = '';
  for (let i = 0; i < 18; i++) {
    const cx = 50 + (i % 6) * 36;
    const cy = 50 + Math.floor(i / 6) * 50;
    const isTarget = i === 7 || i === 13;
    dots += `<g opacity="${isTarget ? 1 : 0.4}">
      <circle cx="${cx}" cy="${cy}" r="6" fill="none" stroke="${isTarget ? '#94c9a5' : '#7a7a70'}" stroke-width="${isTarget ? 1.6 : 1}"/>
      <path d="M ${cx-9} ${cy+22} Q ${cx} ${cy+10} ${cx+9} ${cy+22}" fill="none" stroke="${isTarget ? '#94c9a5' : '#7a7a70'}" stroke-width="${isTarget ? 1.6 : 1}"/>
      ${isTarget ? `<circle cx="${cx}" cy="${cy+5}" r="22" fill="none" stroke="#c9a961" stroke-width="0.8" stroke-dasharray="2 3"/>` : ''}
    </g>`;
  }
  return `<svg viewBox="0 0 280 240" width="100%" height="100%">${dots}</svg>`;
}

// Section D — shift: arrow from one belief-blob to another
function renderDiagramShift() {
  return `<svg viewBox="0 0 280 240" width="100%" height="100%">
    <g stroke="#7a7a70" stroke-width="1" fill="none" stroke-dasharray="3 3">
      <ellipse cx="60" cy="120" rx="42" ry="32" fill="rgba(122,122,112,0.08)"/>
      <text x="60" y="125" font-family="Caveat" font-size="16" fill="#7a7a70" text-anchor="middle">old belief</text>
    </g>
    <g stroke="#94c9a5" stroke-width="1.4" fill="none">
      <ellipse cx="220" cy="120" rx="42" ry="32" fill="rgba(148,201,165,0.12)"/>
      <text x="220" y="125" font-family="Caveat" font-size="16" fill="#94c9a5" text-anchor="middle">new belief</text>
    </g>
    <g stroke="#c9a961" stroke-width="1.2" fill="none">
      <path d="M 110 120 L 170 120" stroke-linecap="round"/>
      <path d="M 165 114 L 172 120 L 165 126" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <text x="140" y="105" font-family="Caveat" font-size="18" fill="#c9a961" text-anchor="middle">the shift</text>
  </svg>`;
}

// Section E — proof: stacked receipts/cards
function renderDiagramProof() {
  return `<svg viewBox="0 0 280 240" width="100%" height="100%">
    <g stroke="#94c9a5" stroke-width="1.3" fill="none">
      <rect x="80" y="60" width="120" height="38" rx="2" fill="rgba(148,201,165,0.1)" transform="rotate(-3 140 79)"/>
      <line x1="92" y1="74" x2="180" y2="74" stroke-width="0.8" transform="rotate(-3 140 74)"/>
      <line x1="92" y1="84" x2="160" y2="84" stroke-width="0.8" transform="rotate(-3 140 84)"/>
    </g>
    <g stroke="#94c9a5" stroke-width="1.3" fill="none">
      <rect x="80" y="105" width="120" height="38" rx="2" fill="rgba(148,201,165,0.1)" transform="rotate(2 140 124)"/>
      <line x1="92" y1="119" x2="180" y2="119" stroke-width="0.8" transform="rotate(2 140 119)"/>
      <line x1="92" y1="129" x2="170" y2="129" stroke-width="0.8" transform="rotate(2 140 129)"/>
    </g>
    <g stroke="#94c9a5" stroke-width="1.3" fill="none">
      <rect x="80" y="150" width="120" height="38" rx="2" fill="rgba(148,201,165,0.12)"/>
      <line x1="92" y1="164" x2="180" y2="164" stroke-width="0.8"/>
      <line x1="92" y1="174" x2="155" y2="174" stroke-width="0.8"/>
    </g>
  </svg>`;
}

// Section F — market: surrounding circles
function renderDiagramMarket() {
  return `<svg viewBox="0 0 280 240" width="100%" height="100%">
    <circle cx="140" cy="120" r="22" fill="rgba(148,201,165,0.15)" stroke="#94c9a5" stroke-width="1.4"/>
    <text x="140" y="125" font-family="JetBrains Mono" font-size="9" fill="#e6e2d6" text-anchor="middle">YOU</text>
    <g stroke="#7a7a70" stroke-width="1" fill="none" stroke-dasharray="3 3" opacity="0.7">
      <circle cx="80" cy="80" r="18"/>
      <circle cx="200" cy="80" r="18"/>
      <circle cx="80" cy="170" r="18"/>
      <circle cx="200" cy="170" r="18"/>
    </g>
    <g stroke="#7a7a70" stroke-width="0.6" fill="none" opacity="0.4">
      <line x1="92" y1="92" x2="125" y2="115"/>
      <line x1="188" y1="92" x2="155" y2="115"/>
      <line x1="92" y1="158" x2="125" y2="135"/>
      <line x1="188" y1="158" x2="155" y2="135"/>
    </g>
    <text x="140" y="220" font-family="Caveat" font-size="18" fill="#94c9a5" text-anchor="middle">in the world</text>
  </svg>`;
}

// Section G — constraints: a frame
function renderDiagramConstraints() {
  return `<svg viewBox="0 0 280 240" width="100%" height="100%">
    <g stroke="#c9a961" stroke-width="1" fill="none" stroke-dasharray="4 4">
      <rect x="50" y="50" width="180" height="140" rx="2"/>
    </g>
    <g stroke="#94c9a5" stroke-width="1.2" fill="none">
      <line x1="80" y1="100" x2="200" y2="100" stroke-width="0.8"/>
      <line x1="80" y1="118" x2="180" y2="118" stroke-width="0.8"/>
      <line x1="80" y1="136" x2="190" y2="136" stroke-width="0.8"/>
    </g>
    <text x="140" y="220" font-family="Caveat" font-size="18" fill="#c9a961" text-anchor="middle">your boundaries</text>
  </svg>`;
}

// === Page Nav (only on subsection + review) ===
function renderPageNav() {
  const groups = SECTIONS.map(section => {
    const subs = SUBSECTIONS.map((sub, globalIdx) => ({ sub, globalIdx }))
                            .filter(o => o.sub.section === section.id);
    const sectionAnswered = answeredInSection(section.id);
    const sectionComplete = sectionAnswered.answered === sectionAnswered.total;

    return `
      <div class="page-nav__group" data-section="${section.id}">
        <button class="page-nav__section-label ${sectionComplete ? 'is-complete' : ''}"
                onclick="jumpToSubsection(${subs[0].globalIdx})"
                title="${escapeHtml(section.title)}">
          ${section.id}
        </button>
        <div class="page-nav__notches">
          ${subs.map(({sub, globalIdx}) => {
            const subQs = sub.questions;
            const subAnswered = subQs.filter(q => isAnswered(q.id)).length;
            const isFull = subAnswered === subQs.length;
            const isPartial = subAnswered > 0 && !isFull;
            const isCurrent = globalIdx === state.currentSubsectionIdx && state.screen === 'subsection';
            const cls = `page-nav__notch ${isCurrent ? 'is-current' : ''} ${isFull ? 'is-full' : isPartial ? 'is-partial' : ''}`;
            return `<button class="${cls}" onclick="jumpToSubsection(${globalIdx})" title="${escapeHtml(sub.title)} — ${subAnswered}/${subQs.length}"></button>`;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');

  return `<nav class="page-nav" aria-label="Jump to any page"><div class="page-nav__inner">${groups}</div></nav>`;
}

// === Subsection screen ===
function renderSubsection() {
  const sub = SUBSECTIONS[state.currentSubsectionIdx];
  if (!sub) return renderReview();
  const section = SECTIONS.find(s => s.id === sub.section);
  const sectionIdx = SECTIONS.findIndex(s => s.id === sub.section);
  const sectionSubs = getSubsectionsForSection(sub.section);
  const subIdxInSection = sectionSubs.findIndex(s => s.title === sub.title);
  const totalSubs = SUBSECTIONS.length;

  const isFirst = state.currentSubsectionIdx === 0;
  const isLast = state.currentSubsectionIdx === totalSubs - 1;
  const defaultActive = sub.questions[0];

  return `
    ${renderHeader()}
    ${renderPageNav()}
    ${renderProgress(`Section ${sectionIdx + 1} of ${SECTIONS.length} · Part ${subIdxInSection + 1} of ${sectionSubs.length}`)}
    <div class="subsection-page">
      <div class="subsection-page__main">
        <span class="eyebrow q-context">${sub.title}</span>
        <h2 class="subsection-page__title">${section.title}.</h2>
        <div class="subsection-page__questions">
          ${sub.questions.map((q, idx) => renderQuestionBlock(q, idx === 0)).join('')}
        </div>
        <div class="q-actions">
          <button class="w-btn w-btn--ghost" onclick="goNext()">Skip this part →</button>
          <div class="q-actions__right">
            <button class="w-btn" onclick="goPrev()" ${isFirst ? 'disabled' : ''}>← Previous</button>
            <button class="w-btn w-btn--primary" onclick="goNext()">${isLast ? 'Review →' : 'Next →'}</button>
          </div>
        </div>
      </div>
      <aside class="subsection-page__margin">
        <div class="margin-why" id="marginWhy">
          <span class="margin-why__on-q" id="marginWhyOnQ">on ${defaultActive.id}</span>
          <span class="margin-why__title">why we ask —</span>
          <div class="margin-why__body" id="marginWhyBody">${defaultActive.why}</div>
        </div>
        ${sub.questions.length > 1 ? `
          <div class="margin-toc">
            <span class="eyebrow margin-toc__heading">${sub.questions.length} questions on this page</span>
            ${sub.questions.map(q => `
              <a href="#${q.id}" class="margin-toc__item ${isAnswered(q.id) ? 'answered' : ''}" data-qid="${q.id}" onclick="event.preventDefault(); focusQuestion('${q.id}');">
                <span class="margin-toc__num">${q.id}</span>
                <span class="margin-toc__label">${truncate(q.label, 50)}</span>
                ${isAnswered(q.id) ? '<span class="margin-toc__check">✓</span>' : ''}
              </a>
            `).join('')}
          </div>
        ` : ''}
      </aside>
    </div>
  `;
}

// === Question block within subsection ===
function renderQuestionBlock(q, isFirst) {
  const value = state.answers[q.id];
  const safeWhy = q.why.replace(/"/g, '&quot;');
  return `
    <div class="q-block ${isFirst ? 'is-active' : ''}" id="${q.id}" data-qid="${q.id}" data-why="${safeWhy}" onclick="setActiveQuestion('${q.id}')" onfocusin="setActiveQuestion('${q.id}')">
      <label class="q-label">
        <span class="q-label__num">${q.id}</span>
        <span class="q-label__text">${q.label}</span>
      </label>
      ${q.hint ? `<p class="q-hint">${q.hint}</p>` : ''}
      ${renderInput(q, value)}
    </div>
  `;
}

window.setActiveQuestion = function (qid) {
  const q = QUESTIONS.find(x => x.id === qid);
  if (!q) return;

  // Smooth fade transition on the why-body
  const whyBody = document.getElementById('marginWhyBody');
  const whyOnQ = document.getElementById('marginWhyOnQ');
  if (whyBody) {
    whyBody.style.opacity = '0';
    setTimeout(() => {
      whyBody.textContent = q.why;
      whyBody.style.opacity = '1';
    }, 150);
  }
  if (whyOnQ) whyOnQ.textContent = 'on ' + qid;

  // Update active highlights
  document.querySelectorAll('.q-block').forEach(b => {
    b.classList.toggle('is-active', b.dataset.qid === qid);
  });
  document.querySelectorAll('.margin-toc__item').forEach(item => {
    item.classList.toggle('is-active', item.dataset.qid === qid);
  });
};

window.focusQuestion = function (qid) {
  const block = document.getElementById(qid);
  if (!block) return;
  const input = block.querySelector('.w-field, input[type="radio"], input[type="checkbox"]');
  if (input) input.focus();
  block.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setActiveQuestion(qid);
};

// === Inputs ===
function renderInput(q, value) {
  const safeVal = (v) => escapeHtml(v == null ? '' : String(v));
  switch (q.type) {
    case 'text':
      return `<input class="w-field" type="text" id="ans_${q.id}" value="${safeVal(value)}" oninput="onAnswerChange('${q.id}', this.value)" placeholder="…" />`;
    case 'url':
      return `<input class="w-field" type="url" id="ans_${q.id}" value="${safeVal(value)}" oninput="onAnswerChange('${q.id}', this.value)" placeholder="https://…" />`;
    case 'textarea':
      return `<textarea class="w-field w-field--multi" id="ans_${q.id}" oninput="onAnswerChange('${q.id}', this.value)" placeholder="Write as fully as you can…">${safeVal(value)}</textarea>`;
    case 'textarea-large':
      return `<textarea class="w-field w-field--multi w-field--large" id="ans_${q.id}" oninput="onAnswerChange('${q.id}', this.value)" placeholder="Write as fully as you can…">${safeVal(value)}</textarea>`;
    case 'textarea-huge':
      return `<textarea class="w-field w-field--multi w-field--huge" id="ans_${q.id}" oninput="onAnswerChange('${q.id}', this.value)" placeholder="Take your time. Paste everything you have…">${safeVal(value)}</textarea>`;
    case 'radio':
      return `<div class="choice-group">${q.options.map(opt => `
        <label class="choice ${value === opt.value ? 'selected' : ''}">
          <input type="radio" name="${q.id}" value="${escapeHtml(opt.value)}" ${value === opt.value ? 'checked' : ''} onchange="onAnswerChange('${q.id}', '${escapeHtml(opt.value)}'); refreshChoiceCards('${q.id}');" />
          <div>
            <div class="choice__title">${opt.title}</div>
            ${opt.desc ? `<div class="choice__desc">${opt.desc}</div>` : ''}
          </div>
        </label>
      `).join('')}</div>`;
    case 'checkbox': {
      const arr = Array.isArray(value) ? value : [];
      return `<div class="choice-group">${q.options.map(opt => `
        <label class="choice ${arr.includes(opt.value) ? 'selected' : ''}">
          <input type="checkbox" value="${escapeHtml(opt.value)}" ${arr.includes(opt.value) ? 'checked' : ''} onchange="onCheckboxChange('${q.id}', '${escapeHtml(opt.value)}', this.checked)" />
          <div>
            <div class="choice__title">${opt.title}</div>
            ${opt.desc ? `<div class="choice__desc">${opt.desc}</div>` : ''}
          </div>
        </label>
      `).join('')}</div>`;
    }
    case 'subfields': {
      const obj = value && typeof value === 'object' ? value : {};
      return `<div class="subfield-group">${q.subfields.map(sf => `
        <div class="subfield">
          <span class="subfield__label">${sf.label}</span>
          <input class="w-field" type="text" value="${safeVal(obj[sf.id] || '')}" placeholder="${escapeHtml(sf.placeholder || '')}" oninput="onSubfieldChange('${q.id}', '${sf.id}', this.value)" />
        </div>
      `).join('')}</div>`;
    }
  }
  return '';
}

window.refreshChoiceCards = function (qid) {
  document.querySelectorAll(`input[name="${qid}"]`).forEach(input => {
    input.closest('.choice').classList.toggle('selected', input.checked);
  });
};

// === Review ===
function renderReview() {
  const total = totalQuestions();
  const done = answeredCount();
  const completionMsg = done === total
    ? "Every question answered. Send when you're ready."
    : `${done} of ${total} answered. Send what you have, or keep filling.`;

  return `
    ${renderHeader()}
    ${renderPageNav()}
    ${renderProgress('Review your answers')}
    <div class="review-v2">
      <div class="review-v2__main">
        <h2>Ready when you are.</h2>
        <p class="review__sub">${completionMsg} Click any section to expand. Click any question to see your full answer or jump back to edit.</p>

        <div class="review-actions">
          <button class="w-btn" onclick="expandAllReview()">Expand all</button>
          <button class="w-btn" onclick="collapseAllReview()">Collapse all</button>
        </div>

        <div class="review-accordion">
          ${SECTIONS.map(section => renderReviewSection(section)).join('')}
        </div>
      </div>

      <aside class="review-v2__side">
        <div class="send-panel">
          <span class="eyebrow send-panel__eyebrow">Send your intake</span>
          <div class="send-panel__title">${escapeHtml(state.meta.name || 'Your intake') + ', ready to send.'}</div>
          <div class="send-panel__sub">Download in whichever format suits you, then email it our way.</div>
          <div class="send-panel__meta">
            <div><strong>Date:</strong> ${formatDate(new Date())}</div>
            <div><strong>Completion:</strong> ${done} of ${total} questions</div>
            ${state.meta.email ? `<div><strong>From:</strong> ${escapeHtml(state.meta.email)}</div>` : ''}
          </div>
          <div class="download-options">
            <span class="eyebrow download-options__label">Download as</span>
            <button class="w-btn w-btn--primary download-btn" onclick="downloadAsPDF()">
              <span class="download-btn__icon">PDF</span>
              <span>Designed document</span>
            </button>
            <button class="w-btn download-btn" onclick="downloadAsMarkdown()">
              <span class="download-btn__icon">MD</span>
              <span>Markdown (.md)</span>
            </button>
            <button class="w-btn download-btn" onclick="downloadAsText()">
              <span class="download-btn__icon">TXT</span>
              <span>Plain text (.txt)</span>
            </button>
          </div>
          <p class="send-panel__pdf-tip">
            <strong>PDF tip:</strong> in the print dialog, choose "Save as PDF" as destination, and make sure "Background graphics" / "More settings → Options → Background graphics" is <em>on</em> — otherwise the dark theme prints as plain white.
          </p>
          <p class="send-panel__note">
            Your answers stay in your browser until you download — nothing is uploaded anywhere.
          </p>
        </div>
      </aside>
    </div>
  `;
}

function renderReviewSection(section) {
  const { answered, total } = answeredInSection(section.id);
  const isExpanded = state.expandedReviewSections[section.id];
  const completionPct = total === 0 ? 0 : Math.round((answered / total) * 100);
  const sectionSubs = getSubsectionsForSection(section.id);

  return `
    <div class="review-section ${isExpanded ? 'expanded' : ''}">
      <button class="review-section__header" onclick="toggleReviewSection('${section.id}')">
        <span class="review-section__id">Section ${section.id}</span>
        <div class="review-section__main">
          <div class="review-section__title">${section.title}</div>
          <div class="review-section__sub">${answered} of ${total} answered · ${completionPct}%</div>
        </div>
        <div class="review-section__bar"><div class="review-section__bar-fill" style="width: ${completionPct}%"></div></div>
        <span class="review-section__chevron">▾</span>
      </button>
      ${isExpanded ? `
        <div class="review-section__body">
          ${sectionSubs.map(sub => `
            <div class="review-subsection">
              <div class="review-subsection__title">${sub.title}</div>
              ${sub.questions.map(q => renderReviewQuestion(q)).join('')}
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

function renderReviewQuestion(q) {
  const v = state.answers[q.id];
  const answered = isAnswered(q.id);
  const isExpanded = state.expandedReviewQuestions[q.id];

  let fullAnswer = '';
  if (!answered) {
    fullAnswer = '<p class="review-q__skipped">— skipped —</p>';
  } else if (Array.isArray(v)) {
    const items = v.map(item => {
      const opt = q.options ? q.options.find(o => o.value === item) : null;
      return opt ? opt.title : item;
    });
    fullAnswer = '<ul>' + items.map(i => `<li>${escapeHtml(i)}</li>`).join('') + '</ul>';
  } else if (typeof v === 'object') {
    const entries = Object.entries(v).filter(([_, val]) => val && String(val).trim());
    fullAnswer = '<dl>' + entries.map(([k, val]) => {
      const sf = q.subfields ? q.subfields.find(s => s.id === k) : null;
      return `<dt>${escapeHtml(sf ? sf.label : k)}</dt><dd>${escapeHtml(val)}</dd>`;
    }).join('') + '</dl>';
  } else if (q.type === 'radio') {
    const opt = q.options.find(o => o.value === v);
    fullAnswer = `<p>${escapeHtml(opt ? opt.title : v)}${opt && opt.desc ? ' — <em>' + escapeHtml(opt.desc) + '</em>' : ''}</p>`;
  } else {
    fullAnswer = `<p>${escapeHtml(String(v)).replace(/\n/g, '<br>')}</p>`;
  }

  return `
    <div class="review-q ${isExpanded ? 'expanded' : ''} ${answered ? 'is-answered' : ''}">
      <button class="review-q__header" onclick="toggleReviewQuestion('${q.id}')">
        <span class="review-q__id">${q.id}</span>
        <span class="review-q__label">${q.label}</span>
        <span class="review-q__chevron">▾</span>
      </button>
      ${isExpanded ? `
        <div class="review-q__body">
          ${fullAnswer}
          <div class="review-q__actions">
            <button class="w-btn w-btn--icon" onclick="jumpToQuestion('${q.id}')">Edit this answer →</button>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

// === Complete ===
function renderComplete() {
  return `
    ${renderHeader()}
    <div class="complete">
      <h2 class="complete__title">Thank you.</h2>
      <p class="complete__sub">
        Your intake is downloaded. Send it our way and we'll start the work.
      </p>
      <button class="w-btn" onclick="state.screen='review'; render();">← Back to review</button>
    </div>
  `;
}

// === Living plant metaphor ===
function renderFloatyMetaphor() {
  const progress = progressFraction();
  const levels = SECTIONS.length;
  const filled = Math.round(progress * levels);
  const baseY = 240, stemTop = 40, stemX = 120;
  const filledY = baseY - (baseY - stemTop) * (filled / levels);
  const leaves = [];
  for (let i = 0; i < levels; i++) {
    const y = baseY - ((i + 1) * (baseY - stemTop)) / (levels + 1);
    const side = i % 2 === 0 ? -1 : 1;
    const on = i < filled;
    const tipX = stemX + side * 48;
    leaves.push(`
      <g class="leaf" opacity="${on ? 1 : 0.4}">
        <path d="M ${stemX} ${y} Q ${stemX + side*20} ${y-8} ${tipX} ${y-14}"
          stroke="${on ? '#94c9a5' : '#7a7a70'}" stroke-width="${on ? 1.3 : 1}"
          stroke-dasharray="${on ? '0' : '2 3'}" fill="none"/>
        <ellipse cx="${tipX}" cy="${y-14}" rx="8" ry="5"
          transform="rotate(${side*30} ${tipX} ${y-14})"
          fill="${on ? 'rgba(148,201,165,0.35)' : 'none'}"
          stroke="${on ? '#94c9a5' : '#7a7a70'}" stroke-width="1"
          stroke-dasharray="${on ? '0' : '2 2'}"/>
      </g>
    `);
  }
  return `
    <div class="floaty-metaphor" aria-hidden="true">
      <svg viewBox="0 0 240 260" width="100%" height="100%">
        <line x1="40" y1="245" x2="200" y2="245" stroke="#7a7a70" stroke-width="1"/>
        <line x1="${stemX}" y1="${baseY}" x2="${stemX}" y2="${filledY}" stroke="#94c9a5" stroke-width="1.5"/>
        <line x1="${stemX}" y1="${filledY}" x2="${stemX}" y2="${stemTop}" stroke="#55574f" stroke-width="1.2" stroke-dasharray="3 3"/>
        ${leaves.join('')}
      </svg>
    </div>
  `;
}

// === Handlers ===
function attachHandlers() {
  const nameInput = document.getElementById('welcomeName');
  if (nameInput) nameInput.oninput = (e) => { state.meta.name = e.target.value; debouncedSave(); };
  const emailInput = document.getElementById('welcomeEmail');
  if (emailInput) emailInput.oninput = (e) => { state.meta.email = e.target.value; debouncedSave(); };
}

window.onAnswerChange = function (qid, value) {
  state.answers[qid] = value;
  debouncedSave();
};

window.onCheckboxChange = function (qid, value, checked) {
  const arr = Array.isArray(state.answers[qid]) ? [...state.answers[qid]] : [];
  if (checked && !arr.includes(value)) arr.push(value);
  if (!checked) {
    const idx = arr.indexOf(value);
    if (idx > -1) arr.splice(idx, 1);
  }
  state.answers[qid] = arr;
  debouncedSave();
  document.querySelectorAll(`.choice input[type="checkbox"][value="${value}"]`).forEach(c => {
    c.closest('.choice').classList.toggle('selected', c.checked);
  });
};

window.onSubfieldChange = function (qid, sfid, value) {
  if (!state.answers[qid] || typeof state.answers[qid] !== 'object' || Array.isArray(state.answers[qid])) {
    state.answers[qid] = {};
  }
  state.answers[qid][sfid] = value;
  debouncedSave();
};

window.beginIntake = function () {
  if (!state.meta.startedAt) state.meta.startedAt = new Date().toISOString();
  if (answeredCount() > 0) {
    state.screen = 'subsection';
  } else {
    state.screen = 'sectionIntro';
    state.currentSectionIdx = 0;
  }
  saveState();
  render();
  window.scrollTo(0, 0);
};

window.startSection = function () {
  const sec = SECTIONS[state.currentSectionIdx];
  state.currentSubsectionIdx = getFirstSubsectionIdxOfSection(sec.id);
  state.screen = 'subsection';
  saveState();
  render();
  window.scrollTo(0, 0);
};

window.goNext = function () {
  const total = SUBSECTIONS.length;
  const currentSub = SUBSECTIONS[state.currentSubsectionIdx];
  const nextIdx = state.currentSubsectionIdx + 1;

  if (nextIdx >= total) {
    state.screen = 'review';
    saveState();
    render();
    window.scrollTo(0, 0);
    return;
  }

  const nextSub = SUBSECTIONS[nextIdx];
  if (nextSub.section !== currentSub.section) {
    state.currentSectionIdx = SECTIONS.findIndex(s => s.id === nextSub.section);
    state.currentSubsectionIdx = nextIdx;
    state.screen = 'sectionIntro';
  } else {
    state.currentSubsectionIdx = nextIdx;
  }
  saveState();
  render();
  window.scrollTo(0, 0);
};

window.goPrev = function () {
  if (state.currentSubsectionIdx === 0) return;
  const prevIdx = state.currentSubsectionIdx - 1;
  const prevSub = SUBSECTIONS[prevIdx];
  state.currentSubsectionIdx = prevIdx;
  state.currentSectionIdx = SECTIONS.findIndex(s => s.id === prevSub.section);
  state.screen = 'subsection';
  saveState();
  render();
  window.scrollTo(0, 0);
};

window.goReview = function () {
  state.screen = 'review';
  saveState();
  render();
  window.scrollTo(0, 0);
};

window.jumpToQuestion = function (qid) {
  const subIdx = SUBSECTIONS.findIndex(s => s.questions.some(q => q.id === qid));
  if (subIdx < 0) return;
  state.currentSubsectionIdx = subIdx;
  const sub = SUBSECTIONS[subIdx];
  state.currentSectionIdx = SECTIONS.findIndex(s => s.id === sub.section);
  state.screen = 'subsection';
  saveState();
  render();
  setTimeout(() => {
    const target = document.getElementById(qid);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const input = target.querySelector('.w-field');
      if (input) input.focus();
      setActiveQuestion(qid);
    }
  }, 120);
};

window.jumpToSubsection = function (subIdx) {
  if (subIdx < 0 || subIdx >= SUBSECTIONS.length) return;
  state.currentSubsectionIdx = subIdx;
  const sub = SUBSECTIONS[subIdx];
  state.currentSectionIdx = SECTIONS.findIndex(s => s.id === sub.section);
  state.screen = 'subsection';
  saveState();
  render();
  window.scrollTo(0, 0);
};

window.toggleReviewSection = function (sectionId) {
  state.expandedReviewSections[sectionId] = !state.expandedReviewSections[sectionId];
  saveState();
  render();
};

window.toggleReviewQuestion = function (qid) {
  state.expandedReviewQuestions[qid] = !state.expandedReviewQuestions[qid];
  render();
};

window.expandAllReview = function () {
  SECTIONS.forEach(s => { state.expandedReviewSections[s.id] = true; });
  saveState();
  render();
};

window.collapseAllReview = function () {
  SECTIONS.forEach(s => { state.expandedReviewSections[s.id] = false; });
  state.expandedReviewQuestions = {};
  saveState();
  render();
};

window.goHome = function () {
  state.screen = 'welcome';
  render();
  window.scrollTo(0, 0);
};

window.resetIntake = function () {
  if (!confirm('Clear all answers and start over? This cannot be undone.')) return;
  state.answers = {};
  state.meta = { name: '', email: '', startedAt: null, lastSavedAt: null };
  state.currentSectionIdx = 0;
  state.currentSubsectionIdx = 0;
  state.expandedReviewSections = {};
  state.expandedReviewQuestions = {};
  state.celebratedSections = {};
  state.screen = 'welcome';
  localStorage.removeItem(STORAGE_KEY);
  render();
};

// === Keyboard shortcuts ===
document.addEventListener('keydown', (e) => {
  const isCmd = e.metaKey || e.ctrlKey;
  if (!isCmd) return;

  if (state.screen === 'subsection') {
    if (e.key === 'Enter') {
      e.preventDefault();
      goNext();
    } else if (e.key === '/' || e.key === '?') {
      e.preventDefault();
      goReview();
    } else if (e.key === 'b') {
      e.preventDefault();
      goPrev();
    }
  } else if (state.screen === 'sectionIntro') {
    if (e.key === 'Enter') {
      e.preventDefault();
      startSection();
    }
  } else if (state.screen === 'welcome') {
    if (e.key === 'Enter') {
      e.preventDefault();
      beginIntake();
    }
  }
});

// === Download formats ===

function buildPlainText() {
  const lines = [];
  const dateStr = formatDate(new Date());
  lines.push('REVUP CLIENT INTAKE');
  lines.push('=====================');
  lines.push('');
  if (state.meta.name) lines.push(`Name: ${state.meta.name}`);
  if (state.meta.email) lines.push(`Email: ${state.meta.email}`);
  lines.push(`Submitted: ${dateStr}`);
  lines.push(`Completion: ${answeredCount()} of ${totalQuestions()} questions`);
  lines.push('');

  SECTIONS.forEach(section => {
    lines.push('');
    lines.push(`SECTION ${section.id} — ${section.title.toUpperCase()}`);
    lines.push('─'.repeat(60));
    lines.push('');
    const sectionSubs = getSubsectionsForSection(section.id);
    sectionSubs.forEach(sub => {
      lines.push(`[ ${sub.title} ]`);
      lines.push('');
      sub.questions.forEach(q => {
        lines.push(`${q.id.toUpperCase()}. ${q.label}`);
        const v = state.answers[q.id];
        if (!isAnswered(q.id)) {
          lines.push('   [skipped]');
        } else if (Array.isArray(v)) {
          v.forEach(item => {
            const opt = q.options ? q.options.find(o => o.value === item) : null;
            lines.push(`   - ${opt ? opt.title : item}`);
          });
        } else if (typeof v === 'object') {
          Object.entries(v).forEach(([k, val]) => {
            const sf = q.subfields ? q.subfields.find(s => s.id === k) : null;
            lines.push(`   ${sf ? sf.label : k}: ${val || '[blank]'}`);
          });
        } else if (q.type === 'radio') {
          const opt = q.options.find(o => o.value === v);
          lines.push(`   ${opt ? opt.title : v}`);
        } else {
          String(v).split('\n').forEach(l => lines.push(`   ${l}`));
        }
        lines.push('');
      });
    });
  });

  return lines.join('\n');
}

function buildMarkdown() {
  const lines = [];
  const dateStr = formatDate(new Date());
  lines.push('# RevUP Client Intake');
  lines.push('');
  if (state.meta.name) lines.push(`**Name:** ${state.meta.name}`);
  if (state.meta.email) lines.push(`**Email:** ${state.meta.email}`);
  lines.push(`**Submitted:** ${dateStr}`);
  lines.push(`**Completion:** ${answeredCount()} of ${totalQuestions()} questions`);
  lines.push('');

  SECTIONS.forEach(section => {
    lines.push('---');
    lines.push('');
    lines.push(`## SECTION ${section.id} — ${section.title}`);
    lines.push('');
    lines.push(`*${section.subtitle}*`);
    lines.push('');
    const sectionSubs = getSubsectionsForSection(section.id);
    sectionSubs.forEach(sub => {
      lines.push(`### ${sub.title}`);
      lines.push('');
      sub.questions.forEach(q => {
        lines.push(`**${q.id.toUpperCase()}. ${q.label}**`);
        if (q.hint) lines.push(`*${q.hint}*`);
        lines.push('');
        const v = state.answers[q.id];
        if (!isAnswered(q.id)) {
          lines.push('_[skipped]_');
        } else if (Array.isArray(v)) {
          v.forEach(item => {
            const opt = q.options ? q.options.find(o => o.value === item) : null;
            lines.push(`- ${opt ? opt.title : item}`);
          });
        } else if (typeof v === 'object') {
          Object.entries(v).forEach(([k, val]) => {
            const sf = q.subfields ? q.subfields.find(s => s.id === k) : null;
            lines.push(`- **${sf ? sf.label : k}:** ${val || '_[blank]_'}`);
          });
        } else if (q.type === 'radio') {
          const opt = q.options.find(o => o.value === v);
          lines.push(`> ${opt ? opt.title : v}${opt && opt.desc ? ' — ' + opt.desc : ''}`);
        } else {
          lines.push('');
          lines.push(String(v).split('\n').map(l => '> ' + l).join('\n'));
        }
        lines.push('');
      });
    });
  });

  return lines.join('\n');
}

window.downloadAsText = function () {
  const txt = buildPlainText();
  const filename = `RevUP-Intake_${(state.meta.name || 'client').replace(/[^a-z0-9]+/gi,'-')}_${formatDate(new Date()).replace(/[^0-9]+/g,'')}.txt`;
  downloadAsFile(txt, filename, 'text/plain');
};

window.downloadAsMarkdown = function () {
  const md = buildMarkdown();
  const filename = `RevUP-Intake_${(state.meta.name || 'client').replace(/[^a-z0-9]+/gi,'-')}_${formatDate(new Date()).replace(/[^0-9]+/g,'')}.md`;
  downloadAsFile(md, filename, 'text/markdown');
};

window.downloadAsPDF = function () {
  const printContainer = document.getElementById('printContainer');
  if (!printContainer) return;
  printContainer.innerHTML = buildPrintHTML();
  document.body.classList.add('printing');
  setTimeout(() => {
    window.print();
    setTimeout(() => {
      document.body.classList.remove('printing');
      printContainer.innerHTML = '';
    }, 500);
  }, 100);
};

function buildPrintHTML() {
  const dateStr = formatDate(new Date());
  let html = `
    <div class="print-doc">
      <div class="print-cover">
        <div class="print-cover__brand">
          <span class="print-cover__brand-mark">R</span>
          <span class="print-cover__brand-text">RevUP</span>
        </div>
        <div class="print-cover__title">Client Intake</div>
        <p class="print-cover__sub">
          A diagnostic conversation between client and craft —<br/>
          gathered to inform the marketing campaign that follows.
        </p>
        <hr class="print-cover__rule"/>
        <div class="print-cover__meta">
          ${state.meta.name ? `<div><strong>Name:</strong> ${escapeHtml(state.meta.name)}</div>` : ''}
          ${state.meta.email ? `<div><strong>Email:</strong> ${escapeHtml(state.meta.email)}</div>` : ''}
          <div><strong>Submitted:</strong> ${dateStr}</div>
          <div><strong>Completion:</strong> ${answeredCount()} of ${totalQuestions()} questions</div>
        </div>
      </div>
  `;

  SECTIONS.forEach(section => {
    html += `
      <section class="print-section">
        <div class="print-section__header">
          <span class="print-section__id">Section ${section.id}</span>
          <h2 class="print-section__title">${escapeHtml(section.title)}</h2>
          <p class="print-section__sub">${escapeHtml(section.subtitle)}</p>
        </div>
    `;
    const sectionSubs = getSubsectionsForSection(section.id);
    sectionSubs.forEach(sub => {
      html += `<h3 class="print-subsection">${escapeHtml(sub.title)}</h3>`;
      sub.questions.forEach(q => {
        const v = state.answers[q.id];
        const answered = isAnswered(q.id);
        html += `
          <div class="print-q">
            <div class="print-q__label">
              <span class="print-q__num">${q.id.toUpperCase()}</span>
              ${escapeHtml(q.label)}
            </div>
            ${q.hint ? `<div class="print-q__hint">${escapeHtml(q.hint)}</div>` : ''}
            <div class="print-q__answer ${!answered ? 'is-skipped' : ''}">
              ${renderPrintAnswer(q, v, answered)}
            </div>
          </div>
        `;
      });
    });
    html += `</section>`;
  });

  html += `
      <footer class="print-footer">
        Generated ${dateStr} · RevUP Intake
      </footer>
    </div>
  `;

  return html;
}

function renderPrintAnswer(q, v, answered) {
  if (!answered) return '<em>[skipped]</em>';
  if (Array.isArray(v)) {
    return '<ul>' + v.map(item => {
      const opt = q.options ? q.options.find(o => o.value === item) : null;
      return `<li>${escapeHtml(opt ? opt.title : item)}</li>`;
    }).join('') + '</ul>';
  }
  if (typeof v === 'object') {
    return '<dl>' + Object.entries(v).filter(([_, val]) => val && String(val).trim()).map(([k, val]) => {
      const sf = q.subfields ? q.subfields.find(s => s.id === k) : null;
      return `<dt>${escapeHtml(sf ? sf.label : k)}</dt><dd>${escapeHtml(val)}</dd>`;
    }).join('') + '</dl>';
  }
  if (q.type === 'radio') {
    const opt = q.options.find(o => o.value === v);
    return `<p>${escapeHtml(opt ? opt.title : v)}${opt && opt.desc ? ' — <em>' + escapeHtml(opt.desc) + '</em>' : ''}</p>`;
  }
  return `<p>${escapeHtml(String(v)).replace(/\n/g, '<br>')}</p>`;
}

// === Utilities ===
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}
function truncate(s, n) { s = String(s); return s.length > n ? s.slice(0, n - 1) + '…' : s; }
function formatDate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
function downloadAsFile(content, filename, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

// === Boot ===
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  render();
});
