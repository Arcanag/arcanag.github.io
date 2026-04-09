# Color System

## Theme Color Mechanism

Each page sets `--color-accent` via frontmatter:

```yaml
theme_color: "#4A9EFF"
```

Layout renders: `<article class="case-study" style="--color-accent: #4A9EFF;">`

All `cs-*` components reference `var(--color-accent)` so they automatically match the page theme.

## Category -> Color Mapping

| Category | Color | Hex |
|----------|-------|-----|
| Enterprise AI / Technical Deep-Dive | Blue | `#4A9EFF` |
| AI Product / Building with AI / AI Product Thinking | Violet | `#7C3AED` |
| Philosophy | Red | `#ff2d00` |
| Default (site-wide) | Red | `#ff2d00` |

## Case Study Color Overrides

Inside `.case-study`, these variables override the global palette:

| Variable | Value | Purpose |
|----------|-------|---------|
| `--color-bg` | `#0d1117` | Page background |
| `--color-bg-elevated` | `#161b22` | Card/surface background |
| `--surface-warm` | `#131920` | Warm elevated surface |
| `--color-text` | `#e8eaed` | Primary text |
| `--color-text-muted` | `#b8bcc4` | Secondary text |
| `--ink-3` | `#7d8590` | Tertiary text |
| `--ink-4` | `#545d68` | Quaternary text |
| `--accent-light` | `rgba(74,158,255,0.15)` | Accent background |
| `--accent-deep` | `#79b8ff` | Accent highlight |
| `--negative` | `#f85149` | Error/red |
| `--neg-light` | `rgba(248,81,73,0.12)` | Error background |
| `--positive` | `#3fb950` | Success/green |
| `--pos-light` | `rgba(63,185,80,0.12)` | Success background |
| `--color-border` | `#21262d` | Standard border |
| `--border-sub` | `#1b2028` | Subtle border |

## Semantic Color Usage

| Purpose | Variable | Use for |
|---------|----------|---------|
| Accent | `var(--color-accent)` | Links, borders, values, statement text |
| Positive | `var(--positive)` | Success, after state, green indicators |
| Negative | `var(--negative)` | Error, before state, red indicators, incident bars |
| Muted text | `var(--color-text-muted)` | Body paragraphs, descriptions |
| Ink-3 | `var(--ink-3)` | Captions, percentages, SVG muted text |
| Ink-4 | `var(--ink-4)` | Arrows, connectors, very muted labels |

## SVG Color Palette

When creating inline SVGs, use these colors:

| Element | Color |
|---------|-------|
| Box fill | `#161b22` |
| Box stroke | `#21262d` |
| Primary text | `#e8eaed` |
| Muted text | `#7d8590` |
| Accent (blue pages) | `#4A9EFF` |
| Accent (violet pages) | `#7C3AED` |
| Accent (red pages) | `#ff2d00` |
| Arrows/connectors | `#545d68` |
| Divider lines | `#21262d` |
| Positive | `#3fb950` |
| Negative | `#f85149` |

Never use: `#141414`, `#222`, `#333`, `#444`, `#888`, `#FFFFFF`, `#ff2d00` (in blue/violet themed pages).
