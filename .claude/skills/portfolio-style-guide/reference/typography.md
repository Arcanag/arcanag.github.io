# Typography

Three families, three jobs (Google Fonts, `display=swap`, loaded in `_includes/head.html`):
- **Instrument Sans** 400–700 — voice: headlines, body, numbers, buttons (`--sans`)
- **Instrument Serif** italic 400 — emphasis: second half of headlines, pulls, hindsight, "why" notes (`--serif`)
- **JetBrains Mono** 400–600 — metadata: section labels, kickers, stat labels, chart axes and notes (`--mono`)

## Signature: the two-tone headline
`<h2 class="h2">Three options. <em>One call.</em></h2>` — bold sans fact, then serif-italic point in stone, same size.
Whole headline under ~8 words. `<em class="is-red">` when the serif half names the problem.

## Scale (tokens → roles)
| Token | Value | Role |
|---|---|---|
| `--t-home-h1` | clamp(38px, 5vw, 96px) | Home hero H1 (lh 1.02, -0.035em) |
| `--t-skill-h1` | clamp(52px, 7vw, 140px) | Skill H1 (lh 0.95, -0.045em) |
| `--t-case-h1` | clamp(44px, 6vw, 120px) | Case/long-form H1, max 18ch |
| `--t-tagline` | clamp(19px, 1.7vw, 30px) | Hero tagline, max 40ch |
| `--t-section` | clamp(28px, 2.8vw, 52px) | Home section headings |
| `--t-h2` | clamp(34px, 4.2vw, 80px) | Two-tone H2 |
| `--t-lead` | clamp(18px, 1.5vw, 26px) | Lead, max 46ch, one bold phrase |
| `--t-stat` | clamp(48px, 5.6vw, 112px) | Big stat number |
| `--t-pull` | clamp(32px, 4.2vw, 84px) | Pull statement, serif, max 22ch |
| `--t-hind` | clamp(28px, 3.2vw, 64px) | Hindsight line |
| `--t-card-h` / `--t-card-b` | clamp(20px,1.6vw,30px) / clamp(15px,1.05vw,19px) | Card title / body |
| `--t-num` | clamp(36px, 4vw, 72px) | Numbered-list number |
| `--t-label` | 12px | Mono labels, uppercase, 0.08em (stat labels 0.04em) |
| `--t-note` | 11px | Chart notes, uppercase, `--note` |

Ghost background word: clamp(110px, 21vw, 420px), `--backdrop`, one per page, aria-hidden.

## Measure
Body and leads max 46ch; taglines 40ch; pulls 22ch; `.prose` 62ch for long passages. Headlines are not width-limited except case H1 (18ch).
