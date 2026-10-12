# Components

Every page is assembled from these. Don't invent a new component without adding it here (PDF §06).
- **Shared** components live in `_sass/_components.scss`, `_charts.scss` and `_tiles.scss`.
- **Page-specific** ones live in `_sass/pages/_*.scss` and use a page prefix.
- Per-instance data goes in custom properties only: `style="--w:47%"` (width), `--l` (left), `--h` (height).

## Section skeleton
```html
<section class="section" id="broken-metric" data-toc="The broken metric">  <!-- data-toc on long-form only -->
  <p class="label">05 / The broken metric</p>
  <h2 class="h2">A number <em>nobody trusted.</em></h2>
  <p class="lead">One or two sentences, max 46ch, with <b>one bold phrase</b>.</p>
  <!-- one visual -->
</section>
```
- Label variants: `.label--muted`, `.label--ink`, `.label--green`.
- The result section label is `✓ / The result`.

## Shared
| Component | Markup | Notes |
|---|---|---|
| Big stat | `.stat > .stat__value[.stat__value--red/--green/--sm] + .stat__label (+ .stat__body)` | 2px ink rule on top. Use in `.grid3/.grid4 .grid--stats` rows of 2–4. Colour only when it means something. |
| Result stat | `.stat.stat--result` in `.grid2.grid--result` | Green number, plain label |
| Hindsight | `.hindsight > .label.label--muted + .hindsight__text` | After the result stats |
| Pull statement | `<section class="section"><p class="pull">… <em>key phrase.</em></p><p class="pull__sub">…</p></section>` | `.pull--wide`, `.pull__label`, `.pull__cite` (for "PARAPHRASED…"). Max one per section group, never two in a row. |
| Card | `.card.card--red/--ink/--green/--stone > .card__tag + .card__title + .card__body (+ .card__why)` | 4px top border in a meaning colour. `.card--chosen` = red tint + "· CHOSEN" in the tag. `.card--thick`, `.card--plain`. |
| Numbered list | `ol.numlist[.numlist--red] > li.numlist__item > .numlist__num + div > .numlist__title + .numlist__body` | Red for problems/pitfalls, ink for lessons |
| Rows | `.rows > .rows__row > .rows__key + .rows__val (.rows__dot)` | Status lists, stacks |
| Panel | `.panel(.panel--ink/--red/--green)` | Generic surface block |
| Before / after | `.grid2.ba > .ba__panel + .ba__panel.ba__panel--after` | |
| Dashed callout | `.callout-dashed > .label.label--muted + span` | Parallel / optional work |
| Chips | `a.chip` | "Skills shown"; rendered by the longform layout from `skills:` |
| Tag | `.tag(.tag--light)` | Small mono box |
| Buttons | `.btn` (ink pill, 52px), `.tlink` (Sans 600 + →) | |
| Code | `<pre class="code"><code>…</code></pre>` | Escape HTML |
| Prose | `.prose` | Long passages (62ch) |
| Note | `p.note` | Honesty labels, 11px mono uppercase |

## Shared charts (`_charts.scss`)
| Chart | Use | Markup |
|---|---|---|
| `.hbar` | Rates with their own base (47% OTP, 23% dead-ends) | `.hbar__row > .hbar__label + .hbar__value + .hbar__track > .hbar__fill[--red/--green/--mid](--w)`, plus note "EACH RATE MEASURED ON ITS OWN BASE" |
| `.cbar` | Counts by category; largest red | `.cbar__row > .cbar__label + .cbar__track > .cbar__fill(--w) + .cbar__count` |
| `.funnel` | Stages of one journey | `.funnel__row > .funnel__barwrap > .funnel__bar[--2/--3/--4/--green/--red](--w)` + `.funnel__text` (serif question). Canonical illustrative widths are 100/86/72/58/46/34, labelled ILLUSTRATIVE. |
| `.columns` | One metric before → after | `.columns__col > .columns__value + .columns__bar(--h)[--after]`, then `.columns__labels` |
| `.stackbar` | Composition of a whole | `.stackbar__seg(--w)[--mid/--red]` + a numbers grid below |
| `.flow` | Systems and handoffs | `.flow__node[--green/--light]` + `.flow__arrow` |

Every chart gets `role="img"` and an `aria-label` summarising its data. Judgement charts carry the note "CHART POSITIONS ARE A JUDGEMENT, NOT MEASUREMENTS".

## Home (`_tiles.scss`)
- **`skill-tile`**: rendered from skill front matter by `_includes/skill-tile.html`.
- **`case-tile`** (`--ink` for the lead case): rendered by `_includes/case-tile.html`.
- **`writing-row`**: rendered by `_includes/writing-list.html`.
- **Mini-graphics** come from `_includes/mini-graphic.html`, with `name` set to one of:

  | Name | Shape |
  |---|---|
  | `sequence` | blocks in a row |
  | `doc` | PRD page + lines |
  | `dots` | option map |
  | `bars` | rate bars |
  | `funnel` | funnel |
  | `org` | lead + squads |
  | `gap` | promised vs actual |
  | `columns` | before/after |
  | `steps` | billing step-up |
  | `fanout` | one → many agents |
  | `gantt` | waves |
  | `hub` | stakeholders converging |
  | `checks` | controls with one flagged |

## Page-specific (by partial)
| Partial | Prefix | Components |
|---|---|---|
| `_skills.scss` | `.sk-` | option map (`.sk-optmap`), option cards (`.sk-options`, `.sk-option--chosen`), spec hub + readers (`.sk-spec`, `.sk-readers`), 27-step ticks (`.sk-ticks`), squads before/after (`.sk-squads`), A → B swap (`.sk-swap`), assumption quote (`.sk-quote`), side-by-side split (`.sk-split`) |
| `_skills-new.scss` | `.skn-` | A → B swap (`.skn-swap`), Gantt with axis (`.skn-gantt`), gate chips (`.skn-gates`), billing bands (`.skn-bands`), P50/P75/P90 histogram (`.skn-hist`), confidence-interval plot (`.skn-ci`) |
| `_banking.scss` | `.bk-` | waves Gantt (`.bk-gantt`), seven gates (`.bk-gates`), squad role pills (`.bk-roles`), utterance → intent tags (`.bk-utterance`, `.bk-intents`) |
| `_agentic.scss` | `.ag-` | agent flow (`.ag-flow`), stack rows (`.ag-stack`), histogram (`.ag-hist`), test split (`.ag-tests`) |
| `_portfolio.scss` | `.pf-` | paired before/after (`.pf-pair`), language grid (`.pf-langs`), billing bands (`.pf-bands`), target outline (`.pf-target`) |
| `_framework.scss` | `.fw-` | layer funnel (`.fw-layers`), formula box (`.fw-formula`), 2×2 matrix (`.fw-matrix`), the interactive explorer (`.fw-explorer`, tabs, nodes, glossary, ownership) |
| `_playbook.scss` | `.pb-` | pyramid (`.pb-pyramid`), inline code in H2 (`.pb-inline`) |
| `_posts.scss` | `.po-` | ladder, comparison table, cost pipeline, 2×2 matrix, cycle, spectrum, two clocks, ground, quote |
| `_about.scss` | `.ab-` | experience timeline, weekly contributions bars |

**Known duplication to consolidate:** the Gantt (`.bk-gantt`, `.skn-gantt`), the A → B swap (`.sk-swap`, `.skn-swap`) and the histogram (`.ag-hist`, `.skn-hist`) are near-duplicates. Promote each to `_charts.scss` the next time one of them changes.
