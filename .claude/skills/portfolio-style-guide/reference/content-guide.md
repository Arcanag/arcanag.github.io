# Content guide

The site exists to let a hiring manager, recruiter or founder understand what Anurag does in seconds, and go deeper only if they choose.
Positioning: product management for conversational and agentic AI. Every homepage skill must be **proved** by a case study, framework or playbook.

## Page templates (PDF §08)
**Home** (`index.html`): header → hero (kicker, one-sentence H1, one scale line) → How I work (6 skill tiles, 3×2) → Case studies (Ink lead tile + Surface tiles) → Writing rows → footer. Tiles, cases and writing rows render from front matter.

**Skill page** (`_skills/<slug>.html`, layout `skill`): hero (bg word, "How I work · NN · Product|Delivery", H1, tagline, "What hiring teams call this") → 01 / The situation (two-tone H2, lead, 3 stats) → optional pull → 02 core visual → optional 03 → ✓ / The result (2 green stats + hindsight) → layout adds "Read the full case study" + "Next: skill →".

**Long-form** (case studies, posts, framework; layout `longform`): hero (bg word, kicker, H1 ≤18ch, tagline, meta line, Skills shown chips, 4 hero stats incl. the honest target comparison) → numbered sections (each `id` + `data-toc`) → pulls between groups, never consecutive → What went wrong (red numbered list + chart) → What we built (green stats) → In hindsight (ink numbered list) → closing pull → back/next.

## Front matter
Skill: `title, order, tag (Product|Delivery), rubric, bg_word, tagline, description, tile_stat, tile_label, tile_line (unused on the tile), graphic, proved_by: [{url, kind, read_time}]`.
`graphic` is one of the mini-graphics in `_includes/mini-graphic.html`.

Case study: `title, short_title, description, tagline, kicker, meta, read_time, bg_word, order, tile_tone (ink|surface), tile_kicker, tile_title, tile_stat, skills: [slugs], hero_stats: [{value, label, tone}], next: {url, label}`.

Post / framework: as case study minus tile fields, plus `writing_type (Framework|Playbook|Essay|Article), list_title, summary`.
**Never change a post's `category` or filename date** — they form the live URL (e.g. `/technical%20deep-dive/2026/02/18/...`).
Content files are `.html` (raw HTML after front matter) so Kramdown can't mangle markup.

## Voice (PDF §09)
- Headline formula: **[Fact in 2–4 words.] *[Point in 2–4 words.]*** Reading only the headlines down a page should tell the story.
- Outcome-focused, team-aware claims; plain statements of scale; concrete nouns and numbers.
- Plain words for jargon on first use: "intent accuracy (SLU)". No unexplained acronyms in headlines.
- Avoid: "highly impactful", "world-class", "currently looking for…", instructional filler.
- Label paraphrases ("PARAPHRASED STAKEHOLDER REACTION"); never put quote marks around words nobody said.
- UK spelling: prioritisation, organised, colour.

## Numbers and honesty (PDF §07)
- Numerals for all data; "→" for change (70→91%); unit/meaning in the mono label, not the number.
- Keep the source's units and ranges (118–146K, "~4M calls a day at peak", lakh where the source uses lakh).
- Show missed targets next to results (118–146K vs an 800K target).
- Label judgement charts ("CHART POSITIONS ARE A JUDGEMENT, NOT MEASUREMENTS"), illustrative shapes ("ILLUSTRATIVE"), and rates on different bases ("EACH RATE MEASURED ON ITS OWN BASE"). Never combine bases in one chart; no pie charts for numbers that don't sum to 100%.
- A before/after cutover is not an A/B test — say so.
- Every number traces to a case study or the PM Job fact sheet (`~/Projects/Personal/PM Job/FACT-SHEET.md`).

## Confidentiality (hard rule)
Never name clients (banks, brands) or client individuals. Use "a Tier-1 private bank", "a leading private-sector bank", "a second major private bank", "a global smartphone brand". No rupee book values, ticket IDs, or detail combinations that identify an account. Never imply direct reports ("organised squads", not "managed a team"). Title is Project Manager — never "Product Manager, Skit.ai".

## Accessibility (PDF §10)
One H1 per page (layouts provide it); each section starts with a `.label` then `h2.h2`; charts get `role="img"` + an `aria-label` summarising the data; ghost words and mini-graphics `aria-hidden="true"`; chosen options also say "CHOSEN"; problem bars carry values; touch targets ≥44px; escape `<` as `&lt;`; code as `<pre class="code"><code>`.

## Checklist before publishing
- [ ] Template order followed; every section has label + two-tone H2
- [ ] No inline styles except data custom properties (`--w`, `--l`, `--h`)
- [ ] Every number traced; honesty labels on judgement/illustrative charts
- [ ] Confidentiality grep clean: `grep -riE 'icici|idfc|indusind|\boppo\b|axis bank|vodafone|pnb' _site --include='*.html' -l | grep -v rahul-mahima`
- [ ] `make proof` passes (build + internal link check)
- [ ] Checked at 1440, 1024, 768 and 375px; no horizontal scroll
