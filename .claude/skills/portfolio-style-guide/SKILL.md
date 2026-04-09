---
name: portfolio-style-guide
description: Design system and style language for arcanag.github.io case studies and blog posts. Use when writing, editing, or reviewing case study or blog content to ensure consistent typography, components, colors, and structure.
disable-model-invocation: true
---

## When to Use

- Writing a new case study or blog post
- Editing existing content for style consistency
- Adding diagrams, metrics, or visual components
- Reviewing content before publishing

## Invocation Steps

1. Read the content type (case study vs blog post) and load the correct frontmatter template from [content-guide.md](reference/content-guide.md)
2. Check the category and assign the correct `theme_color` from [colors.md](reference/colors.md)
3. For each `##` section, ensure it opens with a `<p class="cs-lead">` paragraph
4. Replace any data/metrics with the appropriate component from [components.md](reference/components.md)
5. Apply the typography hierarchy from [typography.md](reference/typography.md)
6. Use the quality checklist in [content-guide.md](reference/content-guide.md) before publishing
7. Verify SVG diagrams use the theme color palette from [colors.md](reference/colors.md)

## Reference Files

- **[reference/components.md](reference/components.md)** -- Full cs-* component library with markup patterns, grouped by purpose
- **[reference/typography.md](reference/typography.md)** -- 9-tier typographic scale, font families, placement rules
- **[reference/colors.md](reference/colors.md)** -- Theme color system, per-page overrides, semantic colors, SVG palette
- **[reference/content-guide.md](reference/content-guide.md)** -- Frontmatter templates, content structure, quality checklist, anti-patterns
