# arcanag.github.io — CLAUDE.md

## Project Overview

Personal portfolio site for Anurag Sharma — Project Manager at Skit.ai specializing in enterprise voicebot product management. Built with Jekyll, hosted on GitHub Pages.

**URL:** https://arcanag.github.io
**Stack:** Jekyll, Kramdown, vanilla CSS/JS, GitHub Pages
**Content:** Case studies, blog posts, about page

## Design Principles

### Visual Identity
- **Dark theme**: near-black background (`#060606`), warm text (`#f0ebe0`), red accent (`#ff2d00`)
- **Grain texture overlay**: CSS-animated SVG noise at 0.05 opacity for tactile feel (static for reduced-motion users)
- **Typography system**: System font stack for display/heading/body, IBM Plex Mono for case study mono
  - Display/Heading: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif
  - Mono (case studies): IBM Plex Mono
  - 9-tier typographic scale (Sam's Rules): Display → Section → Statement → Subhead → Pullquote → Lead → Body → Aside → Label
- **BEM naming**: `.block__element--modifier` convention throughout CSS

### Layout & Spacing
- Design tokens in `:root` — all colors, fonts, spacing, breakpoints are tokenized
- Content width: 720px max for body text (optimal reading line length)
- Layout max: 1200px
- Fluid typography via `clamp()` — no hard breakpoints for type sizes
- Three responsive breakpoints: 1024px (tablet), 768px (mobile), and reduced-motion

### Animation Philosophy
- Scroll reveal via IntersectionObserver — elements fade up on entry, unobserved after reveal
- Staggered delays via `data-delay` attribute (0.1s increments)
- All animations require `.js` class on `<html>` — content visible without JS (progressive enhancement)
- `prefers-reduced-motion: reduce` disables all animations and transitions
- Hero bounce on scroll indicator — gentle, infinite, 2.5s cycle

### Accessibility (WCAG 2.1 AA)
- Skip navigation link (first focusable element)
- `aria-current="page"` on active nav links
- `aria-expanded` on hamburger menu, Escape key closes it
- `aria-hidden="true"` on decorative grain overlay
- Focus-visible outlines on all interactive elements
- `.sr-only` class for screen-reader-only text
- External links marked with "(opens in new tab)" for screen readers
- Touch targets minimum 44x44px
- Color contrast passes AA for all text (footer copyright uses `#888`, not `#444`)

### Content Strategy
- Case studies have "What Went Wrong" / "Honest Assessment" sections — this is a deliberate brand differentiator
- Blog post dates are staggered across Jan-Mar 2026 for freshness signals
- Career Enabler case study is framed around the universal career transition problem, not personal interview prep
- About page reflects current role at Skit.ai
- CTA sections appear at bottom of every case study/post and above footer on all pages

### Code Conventions
- No frameworks — vanilla JS only (68 lines)
- CSS in single file (`main.css`), organized with lettered section headers (a-p)
- Liquid templates use `hidden` frontmatter flag to exclude case studies from listings
- `jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-feed` plugins for SEO
- External links use `target="_blank" rel="noopener noreferrer"`

## Content Types

### Case Studies (`_case-studies/`)
- Frontmatter: `layout`, `title`, `description`, `theme_color`, `hero_bg_word`, `category`, `key_metric`, `read_time`, `date`, `toc`, `hidden`
- `theme_color` sets `--color-accent` per page (blue `#4A9EFF`, violet `#7C3AED`, etc.)
- `hero_bg_word` renders as large atmosphere text in hero (felt, not read)
- Hidden items excluded from `/case-studies/` index via `{% if study.hidden %}{% continue %}{% endif %}`
- `banking-voicebot-research.md` is a reference doc (hidden + unpublished) — contains verified metrics

### Blog Posts (`_posts/`)
- Frontmatter: `layout`, `title`, `description`, `category`, `theme_color`, `hero_bg_word`, `read_time`, `date`, `tags`, `toc`, `published`
- Dates in filenames must match `date` in frontmatter
- Categories: "AI Product Thinking", "Technical Deep-Dive", "Building with AI", "Philosophy"

## Commands

```bash
# Local development
bundle exec jekyll serve --livereload

# Build
bundle exec jekyll build

# Check for broken links
bundle exec htmlproofer ./_site
```

## Key Files

| File | Purpose |
|------|---------|
| `_layouts/default.html` | Base layout — skip link, grain, nav, main, CTA, footer |
| `_includes/head.html` | Meta, fonts, CSS, SEO tag |
| `_includes/nav.html` | Navigation with aria-current logic |
| `_includes/cta.html` | Pre-footer call-to-action section |
| `css/main.css` | All styles — design tokens through responsive |
| `js/main.js` | Scroll reveal, nav state, hamburger, TOC tracking |
| `_config.yml` | Jekyll config, collections, plugins, defaults |
| `_mermaid/` | Mermaid source files (.mmd) + config.json for diagram generation |
| `.claude/skills/portfolio-style-guide/` | Design system skill — component library, typography, colors, content guide |

## Design System

The site uses a `cs-*` prefixed component library for case studies and blog posts. Full documentation is in `.claude/skills/portfolio-style-guide/`. Key components:

| Component | Purpose |
|-----------|---------|
| `cs-impact-strip` | Hero metrics (2-4 cells with large values) |
| `cs-callout-stat` | Single stat + paragraph |
| `cs-statement` | Pull quote (2-3 MAX per page) |
| `cs-lead` | Section opener paragraph (always after h2) |
| `cs-body-list` | Styled bullet list |
| `cs-swap` | Before -> After value |
| `cs-before-after` | Side-by-side comparison |
| `cs-pipeline-row` | Multi-phase process flow |
| `cs-funnel` | Conversion/dropout bars |
| `cs-incident-bar` | Red severity chart |
| `cs-two-col` | Two-column layout |
| `cs-fw-link` | Boxed CTA link |

### Theme Colors by Category

| Category | Color |
|----------|-------|
| Enterprise AI / Technical Deep-Dive | `#4A9EFF` (blue) |
| AI Product / Building with AI | `#7C3AED` (violet) |
| Philosophy | `#ff2d00` (red) |
