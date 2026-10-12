---
name: portfolio-style-guide
description: White-first design system for arcanag.github.io (Visual Design Guidelines v1.0). Use when writing, editing or reviewing a skill page, case study, post, framework or any page markup, so tokens, components, page templates and content rules stay consistent.
disable-model-invocation: true
---

## When to use
- Adding or editing a skill page (`_skills/`), case study, post, framework, or About
- Adding a chart, stat, card or any visual
- Reviewing content before publishing

## Source of truth
`docs/design-guidelines-v1.pdf` (18 pages). These reference files condense it and map it to the code.
Tokens live in `_sass/_tokens.scss`; shared components in `_sass/_components.scss`, `_charts.scss`, `_tiles.scss`.

## Steps
1. Pick the template (home / skill / long-form) and front matter from [content-guide.md](reference/content-guide.md).
2. Build every section as: label → two-tone H2 → lead → one visual ([components.md](reference/components.md)).
3. Colour only carries meaning: red = problem/risk/chosen, green = improvement, ink/greys = structure ([colors.md](reference/colors.md)).
4. Type roles and sizes come from tokens, never raw values ([typography.md](reference/typography.md)).
5. Run the checklist in content-guide.md: confidentiality, every number traced to a source, honesty labels, accessibility, `make proof`.

## Reference files
- [reference/components.md](reference/components.md) — markup for every component and chart, shared and page-specific
- [reference/typography.md](reference/typography.md) — families, roles, the clamp() scale, measure
- [reference/colors.md](reference/colors.md) — palette, roles, contrast pairs, meaning rules
- [reference/content-guide.md](reference/content-guide.md) — templates, front matter, voice, numbers, confidentiality, checklist
