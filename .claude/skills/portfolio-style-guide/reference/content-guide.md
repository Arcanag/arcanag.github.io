# Content Guide

## Case Study Frontmatter

```yaml
---
layout: case-study
title: "Title"
description: "1-2 sentence description"
theme_color: "#HEXCODE"
hero_bg_word: "KEYWORD"
category: "Category Name"
key_metric: "Headline metric"
read_time: "X min read"
date: YYYY-MM-DD
toc:
  - title: "Section"
    anchor: "section-slug"
---
```

Required: layout, title, description, theme_color, hero_bg_word, category, date, toc.

## Blog Post Frontmatter

```yaml
---
layout: post
title: "Title"
description: "Description"
category: "Category"
theme_color: "#HEXCODE"
hero_bg_word: "KEYWORD"
read_time: "X min read"
date: YYYY-MM-DD
tags: ["tag1", "tag2"]
toc:
  - title: "Section"
    anchor: "section-slug"
---
```

Categories: "AI Product Thinking", "Technical Deep-Dive", "Building with AI", "Philosophy".

## Case Study Structure

1. **Impact strip** (3 key metrics) -- replaces TL;DR callout
2. **Context section** with cs-lead opener
3. **Problem section** with data visualizations (funnel, incident bar, etc.)
4. **Solution section** with pipeline, architecture diagrams
5. **Honest Assessment** -- "What Went Wrong" (brand differentiator, always include)
6. **Outcomes** -- outcome-grid with green metrics
7. **Things I'd Do Differently** -- lesson-grid with reflective cards
8. **Closing statement** -- cs-statement or testimonial--featured

## Content Conventions

### Every ## Section
- Opens with `<p class="cs-lead">` (20px anchor paragraph)
- Contains at least one visual element (diagram, impact strip, comparison)

### Data Presentation
- 2-4 related metrics -> `cs-impact-strip`
- Single critical stat -> `cs-callout-stat`
- Before/after value -> `cs-swap`
- Before/after narrative -> `cs-before-after`
- Process/workflow -> `cs-pipeline-row`
- Drop-off/funnel -> `cs-funnel`
- Severity categories -> `cs-incident-bar`

### Lists
- Bold-item lists -> wrap in `<ul class="cs-body-list"><li><strong>Label.</strong> Text</li></ul>`
- Never leave as plain markdown `- **Bold.** text`

### Headers
- Section labels -> use `### Heading` (h3, 22px) not `**Heading:**` (bold body, 15.5px)
- Input/Output patterns -> put the meaningful data in `cs-impact-value`, label in `cs-impact-label`

## Anti-Patterns

- `metric-box` -- use `cs-impact-strip` or `cs-callout-stat`
- `callout--tldr` -- use `cs-impact-strip` for metrics, `cs-lead` for narrative
- `**Bold Header:**` as section label -- use `### Heading`
- `- **Bold item.** text` as bare markdown -- use `cs-body-list`
- Hardcoded colors in HTML -- use CSS variables
- Inline styles except `style="width:X%"` for data bars
- More than 3 `cs-statement` per page
- `<blockquote>` for internal insights -- use `<div class="cs-statement">`
- `<table>` for layout -- use CSS Grid `<div>`

## Accessibility Rules

1. Diagrams: `<figure>` with `<figcaption>` and `role="img"` + `aria-label`
2. Internal statements: `<div class="cs-statement">` (not blockquote)
3. External quotes: `<blockquote class="testimonial">`
4. Indicators: always accompany colored dots with text labels
5. External links: `target="_blank" rel="noopener noreferrer"`
6. Animations: all behind `.reveal` class, disabled with prefers-reduced-motion

## Quality Checklist

- [ ] Frontmatter has `theme_color` and `hero_bg_word`
- [ ] Impact strip with 2-4 key metrics at top
- [ ] Every `##` section starts with `cs-lead`
- [ ] No `metric-box`, `callout--tldr`, or `**Bold:**` headers
- [ ] All lists with bold items wrapped in `cs-body-list`
- [ ] SVG colors match theme palette (see colors.md)
- [ ] Max 2-3 `cs-statement` per page
- [ ] Includes "Honest Assessment" or "What Went Wrong" section
- [ ] All colors via CSS variables (no hardcoded hex in HTML)
- [ ] Responsive: all components tested at 768px
- [ ] Semantic HTML: figure/figcaption, role="img", aria-label
