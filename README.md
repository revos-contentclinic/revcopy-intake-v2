# RevCOPY Intake — v2

Refined client intake for marketing-campaign work. A calm, dark-themed diagnostic — 74 questions across 7 sections — designed to gather the depth a long-form sales letter and broader campaign work depend on.

> **Predecessor:** `revcopy-intake` (v1) lives separately. This v2 is a refined parallel build informed by a UX critique pass.

---

## What's different from v1

This rebuild incorporates findings from a structured design critique. v1 stays preserved for comparison — both can be deployed at the same time.

**Welcome page:**
- One confident invitation instead of three paragraphs
- Drop the redundant "RevCOPY · Client Intake" eyebrow (header brand already says it)
- Bigger, more poetic serif headline
- Quiet handwritten promise — *"we read every word"* — beside the Begin button (when starting fresh)
- Detail list using mono dot-bullets rather than paragraph density

**Section intros:**
- Per-section sketch diagrams (offer / founder / audience / belief-shift / proof / market / constraints) instead of generic stacked rectangles
- More breath, larger serif title, tighter copy
- Page-nav strip is **scoped out** of intros — orientation moments don't need it

**Subsection (multi-question) pages:**
- Q-IDs become quiet lowercase mono numbers (`q5`) instead of bordered green pills
- Active question gets a **sage left-border + glow** (not opacity dimming)
- Dynamic "why we ask" with **smooth fade transitions** when cursor moves between questions
- Margin TOC question labels also lowercase, calmer rhythm

**Page-nav strip:**
- Tick marks (2px wide × 14px tall) instead of block notches — quieter visual rhythm
- Border instead of filled background
- Hover lifts to 18px with sage color
- Current = 22px tall + sage glow

**Review accordion:**
- Section header redesigned: removed the heavy serif "A" letter; uses small mono "Section A" eyebrow + serif title instead
- Question rows: ID + label + chevron only (preview removed — reveal on expand)
- Question chevron rotates 180° on expand
- Section card hover lifts border subtly
- Side panel becomes a **"Send your intake"** moment — title with the user's name + meta data + three download options as buttons stacked

**Three download formats:**
- **PDF** — designed cover page (brand mark + title + framing line + meta), section title pages, page-break per section, page-break-inside-avoid per question, sage left-border on answers
- **Markdown** — `.md` with full structure
- **Plain text** — `.txt` for paste-into-email use

**Living plant metaphor:**
- Gentle 8s ease-in-out **sway animation** (not static)
- **Leaf shimmer** when autosave fires (1.2s brightness pulse)
- Anchored to bottom-right with proper drop shadow

**Section completion celebration:**
- Tiny handwritten note appears mid-screen when a section hits 100% answered
- Fades in / holds 1.6s / fades out
- Fires once per section via celebrated-sections tracker

**Keyboard shortcuts** (power users):
- `⌘ + Enter` — next page (or begin/start section depending on screen)
- `⌘ + B` — previous page
- `⌘ + /` — jump to review
- Hint shown in header on desktop

**Auto-save indicator:**
- Pulse-dot animation (subtle 2s opacity loop)
- Flashes brighter when save fires

**Microcopy refinements:**
- "Not a form. A diagnostic." (welcome)
- "Be honest, not polished." (welcome detail)
- "Send when you're ready." (review)
- Section celebration variants randomized

---

## Stack

Vanilla HTML / CSS / JavaScript. No framework, no build step.

```
index.html      ← entry
styles.css      ← design system + components + print CSS
questions.js    ← all 74 question definitions (shared with v1)
app.js          ← state, rendering, navigation, autosave, download
```

Total weight: ~115 KB uncompressed, well under 35 KB gzipped.

---

## Local preview

```
open index.html
```

Or run a local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

---

## Deploy

**Vercel** (recommended): import the GitHub repo at vercel.com/new — auto-detects as static site.

**GitHub Pages**: Settings → Pages → Source: main branch / `/` (root).

**Any static host**: drop the four files into the web root.

---

## Submission flow

Client fills the intake → clicks one of the three download buttons → file downloads to their machine → they email it back.

No backend. No data uploaded. All answers live only in the client's browser localStorage until they download. Calmer for the client (no "we're storing your data somewhere") and zero infrastructure for us.

---

## Customising

- **Edit a question** — open `questions.js`, modify the object in place
- **Edit the design system** — open `styles.css`, all tokens live in `:root`
- **Edit microcopy** — search for strings in `app.js`, change in place
- **Add a question** — append to `QUESTIONS` array in `questions.js`; update its section's `questionCount` in `SECTIONS` to match

---

## Design credits

Visual language adapted from internal RevUP intake wireframes:
- Charcoal `#141614` base, warm cream `#e6e2d6` ink, sage green primary (oklch space), gold `oklch(0.78 0.08 85)` reserved for brand mark
- Five fonts (Cormorant Garamond serif, Caveat handwritten, Kalam sketch, Inter sans, JetBrains Mono)

v2 refinements informed by:
- Nielsen heuristics scoring (v1 baseline: 34/40)
- Persona-based critique (Sarah / Marcus)
- Anti-pattern detection
- Direct user feedback after first deployment

---

## Meta

- 74 questions
- 7 sections
- ~90 minutes to complete (estimated)
- Auto-saves to browser localStorage
- Mobile-responsive
- Print-friendly via designed PDF output
- Keyboard shortcuts for power users
- No tracking, no cookies, no analytics, no backend

Built calm.
