# Colour

White first. Proportions on any page stay roughly **80% white, 12% surface grey, 6% ink, 2% red/green**.
Tokens: `_sass/_tokens.scss`. Never use raw hex in page partials.

| Token | Hex | Role |
|---|---|---|
| `--paper` | #FFFFFF | Page background. Always. |
| `--surface` | #F5F5F3 | Tiles, cards, panels, chart tracks |
| `--ink` | #121212 | Headlines, emphasis, rules above stats, dark anchor tiles, baseline bars |
| `--graphite` | #4A4A47 | Body text, leads, descriptions |
| `--red` | #D62B2B | Kickers, labels, problem data, chosen option, key word in pulls (text only at 24px+ or bold) |
| `--red-deep` | #B01E1E | Red text at any size; text on red tint |
| `--green` | #12855F | Improvement fills: bars, top borders, nodes |
| `--green-deep` | #0E6B4C | Green text: result numbers, labels |
| `--stone` | #8A8A86 | Serif half of two-tone headlines (24px+ only), neutral options |
| `--note` | #6B6B68 | Chart notes and honesty labels |
| `--rule` | #E6E6E3 | Section dividers, table lines, bar tracks |
| `--backdrop` | #F3F3F0 | The giant background word only |
| `--mid` | #CFCFCB | Inactive bars, before-values, icon fills |
| `--red-tint` | #FDECEC | Chosen option / key insight background |
| `--green-tint` | #EAF5EF | Result card background (optional) |
| `--red-soft` | #FF8A8A | Red on ink tiles only |
| `--ink-2`, `--track`, `--plot`, `--dot`, `--halo` | | Chart-only neutrals carried over from the reference pages |

## Contrast (WCAG)
Ink on white 18.7:1 · graphite on white 8.9:1, on surface 8.1:1 · red on white 5.0:1 (labels, numbers 24px+) ·
red-deep on white 6.9:1, on red-tint 6.0:1 · green-deep on white 6.5:1, on green-tint 5.8:1 ·
stone on white 3.5:1 (large headline halves only) · note on white 5.3:1 (11px+) · white on ink 18.7:1 · soft red on ink 8.3:1.

## Meaning rules
- Red = problem, risk, failure, or the option chosen. Green = improvement, outcome, "after". Ink/greys = structure, baselines, alternatives.
- Never use red vs green as the only difference between two series — pair with a label or position.
- Never put red text below 16px on red tint. Never introduce a new hue; a fourth series uses ink and greys.
- No shadows (except the halo on a chosen data point), no gradients, no borders around tiles.
