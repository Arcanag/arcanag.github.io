# Typography System

## 9-Tier Scale (Sam's Rules)

| Tier | Variable | Size | Element | Usage |
|------|----------|------|---------|-------|
| 1. Display | `--cs-display` | 52-82px | `h1` hero title | ONE per page |
| 2. Section | `--cs-section` | 36-56px | `h2` | Chapter headings (auto-numbered 01, 02...) |
| 3. Statement | `--cs-statement` | 26-36px | `.cs-statement` | Pull quotes, 2-3 MAX per page |
| 4. Subhead | `--cs-subhead` | 22px | `h3` | Subsections (left accent border) |
| 5. Pullquote | `--cs-pullquote` | 17-20px | `.cs-pullquote` | Attributed quotes |
| 6. Lead | `.cs-lead` | 20px | `<p>` | Section opener, ALWAYS after h2 |
| 7. Body | `--cs-body` | 15.5px | `<p>` | Default reading text |
| 8. Aside | `--cs-aside` | 14px | `<figcaption>` | Captions, footnotes |
| 9. Label | `--cs-label` | 10.5px | `.cs-impact-label` | Uppercase metadata |

## Data Typography (Rule 4)

Numbers representing findings get special treatment:
- `--data`: clamp(36px, 5vw, 48px) -- standard data
- `--data-hero`: clamp(48px, 7vw, 72px) -- hero stats
- `--data-weight`: 900
- `--data-tracking`: -0.03em

## Font Families

| Context | Variable | Stack |
|---------|----------|-------|
| Global display | `--font-display` | -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif |
| Global heading | `--font-heading` | Same system stack |
| Global mono | `--font-mono` | Same system stack |
| Case study mono | `--font-mono` (override) | 'IBM Plex Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace |

## Placement Rules

1. **cs-lead**: ALWAYS immediately after every `##` heading. 20px, muted color, max-width 55ch.
2. **cs-statement**: Max 2-3 per case study. Italic, accent color, left border, max-width 26ch.
3. **h2**: Auto-generates number prefix (01, 02...) and accent underline. Gets drop cap on first `<p>`.
4. **h3**: Left accent border, 22px, no numbering. Use for subsections only.
5. **Bold headers**: Use `### Heading` not `**Heading:**` for anything that acts as a section label.
6. **Lists**: Wrap bold-item lists in `<ul class="cs-body-list">` not plain markdown `- **item**`.

## Responsive Type

All sizes use `clamp(min, viewport, max)`:
- Mobile: renders at min value
- Scales linearly with viewport
- Desktop: caps at max value

At 900px breakpoint, scale reduces:
- `--cs-display`: 3rem (from 5.125rem)
- `--cs-section`: 2.25rem (from 3.5rem)
- `.cs-lead`: 18px (from 20px)
