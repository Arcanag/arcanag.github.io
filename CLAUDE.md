# arcanag.github.io — CLAUDE.md

## Project overview

Personal portfolio for Anurag Sharma, Project Manager at Skit.ai (conversational and voice AI), positioned for **Product Manager** roles. Every skill on the homepage is proved by a case study, framework or playbook.

- **URL:** https://arcanag.github.io
- **Stack:** Jekyll 3.10 via the `github-pages` gem, Ruby Sass, vanilla JS, GitHub Pages (legacy builder from `main` `/`)
- **Design system:** "White first", from Visual Design Guidelines v1.0. The PDF is at `docs/design-guidelines-v1.pdf`, and the condensed version is the `.claude/skills/portfolio-style-guide/` skill.

## Commands (Docker; matches the Pages builder)

```bash
make serve   # http://localhost:4000 with livereload
make build   # writes _site/
make proof   # build + htmlproofer internal-link check
```

System Ruby is 2.6, so all Ruby runs in `ruby:3.3` containers, with gems cached in the `arcanag-bundle` volume.

**Pages runs the legacy builder:**
- Whitelisted plugins only: `jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-feed`, `jekyll-redirect-from`.
- No `_plugins/` folder.
- No Jekyll 4 features.

## Information architecture

| Section | Source | URL |
|---|---|---|
| Home | `index.html` | `/` (hero → 12 skill tiles → case studies → writing) |
| Skills ("How I work") | `_skills/<slug>.html`, layout `skill` | `/how-i-work/<slug>/` |
| Case studies | `_case-studies/*.html`, layout `longform` | `/case-studies/<slug>/` |
| Posts | `_posts/*.html`, layout `longform` | `/<category>/YYYY/MM/DD/<slug>/` |
| Framework | `_frameworks/voicebot-metrics-funnel.html` | `/frameworks/voicebot-metrics-funnel/` (narrative + interactive explorer, `js/framework.js`) |
| Writing index | `writing/index.html` | `/writing/` (`/blog/` and `/frameworks/` redirect here) |
| Case-study index, About, 404 | `case-studies/index.html`, `about/index.html`, `404.html` | layout `page` |

- **Post URLs contain spaces** (`/technical%20deep-dive/…`). Never change a post's `category` or filename date, because both are part of the live URL.
- **Unpublished:** the Career Enabler case study and two draft posts (`published: false`).
- **`rahul-mahima-wedding/`** is an unrelated Astro subsite. Don't touch it.

## Code layout

- `_sass/_tokens.scss`: every colour, font, size, space and radius from the PDF §11. **Never use raw hex outside this file.**
- Shared partials:
  - `_sass/_base.scss`, `_layout.scss`, `_type.scss`
  - `_components.scss` (stat, pull, hindsight, card, numlist, rows, chips, buttons, code)
  - `_charts.scss` (hbar, cbar, funnel, columns, stackbar, flow)
  - `_tiles.scss` (home tiles and mini-graphics)
  - `_longform.scss` (reading bar)
  - `_motion.scss`
- `_sass/pages/_*.scss`: page-specific visuals, using page-prefixed classes (`.bk-` banking, `.ag-` agentic, `.pf-` portfolio, `.fw-` framework, `.pb-` playbook, `.po-` posts, `.sk-`/`.skn-` skills, `.ab-` about).
- `css/main.scss` imports everything into `/css/main.css`.
  - **Ruby Sass evaluates `min()`/`max()`**, so wrap the CSS versions as `#{'min(…)'}`.
- `_layouts/`:
  - `default` (skip link, header, main, footer)
  - `skill` (hero + next chain by `order`)
  - `longform` (hero, chips, hero stats, reading bar, back/next)
  - `page`
- `_includes/`: `head`, `header`, `footer` (Résumé link renders only if `assets/Anurag-Sharma-Resume.pdf` exists), `skill-tile`, `case-tile`, `writing-list`, `mini-graphic`.
- `js/main.js` is progressive enhancement only. It handles the scroll reveal (off under reduced motion) and the long-page reading bar (progress, current section, contents built from `section[data-toc][id]`).

## Rules

- **Markup:**
  - Content files are `.html` with raw HTML bodies.
  - No inline styles, except data custom properties (`style="--w:47%"`).
  - Sections follow label → two-tone H2 (`<h2 class="h2">Fact. <em>Point.</em></h2>`) → lead → one visual.
- **Colour carries meaning:** red is problem, risk or the chosen option; green is improvement; ink and greys are structure. No shadows (except the chosen-point halo), no gradients, no tile borders.
- **Honesty:**
  - Every number traces to a case study or `~/Projects/Personal/PM Job/FACT-SHEET.md`.
  - Show missed targets.
  - Label judgement and illustrative charts.
  - Never combine rates measured on different bases.
- **Confidentiality:**
  - Never name clients or client individuals. Use "a Tier-1 private bank", etc.
  - No rupee book values.
  - Never imply direct reports.
  - The title is Project Manager, never "Product Manager, Skit.ai".
- **Accessibility (WCAG 2.1 AA):**
  - Skip link, landmarks, one H1, visible focus.
  - `role="img"` and an `aria-label` on charts; `aria-hidden` on decorative visuals.
  - 44px touch targets.
  - Reduced motion respected.
- **Spelling:** UK (prioritisation, organised).
- **External links:** `target="_blank" rel="noopener noreferrer"`, plus an sr-only "(opens in new tab)".
- **Before publishing:** run the checklist in `.claude/skills/portfolio-style-guide/reference/content-guide.md`.
