# Component Library

All components use `cs-` prefix. They render inside `.case-study-content` which sets the base font at 15.5px.

## Data Display

### cs-impact-strip (Hero Metrics)
2-4 key metrics in a horizontal strip. Use at top of page or section.

```html
<div class="cs-impact-strip">
  <div class="cs-impact-cell">
    <div class="cs-impact-label">Input</div>
    <div class="cs-impact-value">91%</div>
    <div class="cs-impact-desc">Optional description text</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-label">Label</div>
    <div class="cs-impact-value">Value</div>
  </div>
</div>
```

**Rules:** Value is the large colored text (24-36px, accent color). Label is the small muted text above. Desc is optional muted text below.
**Replaces:** `metric-box`, `callout--tldr` with metrics.

### cs-callout-stat (Single Stat + Text)
One large number alongside explanatory paragraph.

```html
<div class="cs-callout-stat">
  <div class="cs-callout-stat__value">47%</div>
  <div class="cs-callout-stat__text">Description paragraph alongside the stat.</div>
</div>
```

**Rules:** Red top border. Value is large (32-48px). Stacks to single column on mobile.

### cs-data-grid (Inline Data Blocks)
Multiple metrics within body text flow.

```html
<div class="cs-data-grid">
  <div class="cs-data-cell">
    <div class="cs-data-value">2,188</div>
    <div class="cs-data-label">States</div>
  </div>
</div>
```

**Modifiers:** `.cs-data-value.accent` (theme color), `.negative` (red), `.positive` (green).

## Quotes & Statements

### cs-statement (Pull Quote)
Key insight. Limit 2-3 per page MAX.

```html
<div class="cs-statement reveal">The constraint was clear: automate the mechanical, preserve the judgment.</div>
```

**Rules:** Italic, accent color text, left accent border, max-width 26ch. Use `<div>` not `<blockquote>` (these are internal insights, not external quotes).

### cs-pullquote (Attributed Quote)
Quote from a person with attribution.

```html
<div class="cs-pullquote">
  "Quote text here."
  <span class="cs-pullquote__attr">-- Attribution</span>
</div>
```

### testimonial / testimonial--featured
Boxed quote with sentiment label.

```html
<blockquote class="testimonial testimonial--featured">
  <p class="testimonial__quote">"Quote text."</p>
</blockquote>
```

`--featured`: centered, top accent border instead of left.

## Comparison

### cs-swap (Before -> After)
Simple value transformation.

```html
<div class="cs-swap">
  <span class="cs-swap__before">20K</span>
  <span class="cs-swap__arrow">&rarr;</span>
  <span class="cs-swap__after">800K</span>
  <span class="cs-swap__context">Contained calls: actual vs target</span>
</div>
```

**Rules:** Before is strikethrough + muted. After is green. Context is label-tier below.

### cs-before-after (Detailed Comparison)
Side-by-side narrative comparison.

```html
<div class="cs-before-after">
  <div class="cs-before-after__col cs-before-after__col--before">
    <span class="cs-before-after__label">Before</span>
    <p>Description of broken state.</p>
  </div>
  <span class="cs-before-after__arrow">&rarr;</span>
  <div class="cs-before-after__col cs-before-after__col--after">
    <span class="cs-before-after__label">After</span>
    <p>Description of fixed state.</p>
  </div>
</div>
```

**Rules:** Red border on before, green on after.

## Process & Pipeline

### cs-pipeline-row (Horizontal Process)
Multi-phase workflow with steps.

```html
<div class="cs-pipeline-row" role="img" aria-label="27-step lifecycle">
  <div class="cs-pipeline-row__phase cs-pipeline-row__phase--accent">
    <span class="cs-pipeline-row__title">Requirements</span>
    <span class="cs-pipeline-row__step">Intake</span>
    <span class="cs-pipeline-row__step">BRD Review</span>
  </div>
  <span class="cs-pipeline-row__arrow">&rarr;</span>
  <div class="cs-pipeline-row__phase">
    <span class="cs-pipeline-row__title">Design</span>
    <span class="cs-pipeline-row__step">Flow Design</span>
  </div>
</div>
```

### cs-funnel (Conversion/Dropout)
Progressive bar chart showing narrowing.

```html
<div class="cs-funnel">
  <div class="cs-funnel__step">
    <span class="cs-funnel__label">Total Calls</span>
    <div class="cs-funnel__bar"><div class="cs-funnel__fill" style="width:100%"></div></div>
    <span class="cs-funnel__pct">100%</span>
  </div>
  <div class="cs-funnel__branch">
    <div class="cs-funnel__branch-item cs-funnel__branch-item--yes">Resolved</div>
    <div class="cs-funnel__branch-item cs-funnel__branch-item--no">Not Resolved</div>
  </div>
</div>
```

### cs-incident-bar (Red Severity Chart)
Categorized incidents with 5-level red gradient.

```html
<div class="cs-incident-bar">
  <div class="cs-incident-bar__header">
    <span class="cs-incident-bar__title">15 Incidents</span>
    <span class="cs-incident-bar__subtitle">Sep-Nov 2025</span>
  </div>
  <div class="cs-incident-bar__row">
    <span class="cs-incident-bar__label">Category</span>
    <div class="cs-incident-bar__track"><div class="cs-incident-bar__fill cs-incident-bar__fill--5" style="width:33%"></div></div>
    <span class="cs-incident-bar__count">5</span>
  </div>
</div>
```

Fill levels: `--5` (brightest) through `--1` (darkest).

## Layout

### cs-two-col (Side-by-Side)
```html
<div class="cs-two-col">
  <div class="cs-two-col__left"><p>Narrative</p></div>
  <div class="cs-two-col__right"><!-- Visual --></div>
</div>
```

Add `cs-two-col--divided` for accent border between columns.

### cs-scorecard-grid (2x2 Health Matrix)
```html
<div class="cs-scorecard-grid">
  <div class="cs-scorecard-grid__cell">
    <span class="scorecard__indicator scorecard__indicator--red"></span>
    <span class="cs-scorecard-grid__label">Label</span>
    <span class="cs-scorecard-grid__value">Value</span>
  </div>
</div>
```

Indicators: `--red`, `--amber`, `--green`.

## Typography

### cs-lead (Section Opener)
Always after every `##` heading.

```html
<p class="cs-lead">Opening sentence that anchors the reader.</p>
```

### cs-body-list (Styled Bullet List)
```html
<ul class="cs-body-list">
  <li><strong>Bold label.</strong> Description text.</li>
</ul>
```

**Replaces:** Plain markdown `- **Bold.** text` lists.

### cs-fw-link (Boxed CTA)
```html
<a href="/path/" class="cs-fw-link">&rarr; Explore the framework</a>
```

Red border, angular corners, red text.

## Visualization

### Inline SVG
```html
<figure class="mermaid-diagram" role="img" aria-label="Description">
  <svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">...</svg>
  <figcaption>Caption text.</figcaption>
</figure>
```

Wide variant: `mermaid-diagram--wide`.

### Mermaid Pre-rendered
Source in `_mermaid/*.mmd`, rendered to `assets/images/case-studies/*.svg`.
```html
<figure class="mermaid-diagram mermaid-diagram--wide" role="img" aria-label="...">
  <img src="/assets/images/case-studies/diagram.svg" alt="..." />
  <figcaption>Caption.</figcaption>
</figure>
```

## Learning & Outcomes

### outcome-grid (Achievement Cards)
```html
<div class="outcome-grid">
  <div class="outcome-card">
    <div class="outcome-card__title">Title</div>
    <div class="outcome-card__metric">Value</div>
    <div class="outcome-card__desc">Description</div>
  </div>
</div>
```

Green left border, green title, white metric.

### lesson-grid--rows (Learning Cards)
```html
<div class="lesson-grid lesson-grid--rows">
  <div class="lesson-card lesson-card--row">
    <span class="lesson-card__number">01</span>
    <div class="lesson-card__content">
      <div class="lesson-card__title">Title</div>
      <div class="lesson-card__body">Description</div>
    </div>
  </div>
</div>
```

Blue left border, blue accent number, single-column stacked rows.
