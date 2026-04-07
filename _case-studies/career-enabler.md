---
layout: case-study
title: "Building a Resume Intelligence Platform in One Day with AI Pair Programming"
description: "A product case study on designing and shipping a full-stack AI career platform — 16 features, 44 PRs, and a freemium business model — in a single day using Claude Code."
theme_color: "#166534"
category: "AI Product — 0 to 1"
key_metric: "16 features shipped in 1 day"
read_time: "10 min read"
date: 2026-03-22
hidden: true
toc:
  - title: "The Problem"
    anchor: "the-problem"
  - title: "Product Vision"
    anchor: "product-vision"
  - title: "Architecture & Technical Decisions"
    anchor: "architecture--technical-decisions"
  - title: "Building at Speed"
    anchor: "building-at-speed"
  - title: "Honest Assessment"
    anchor: "honest-assessment"
  - title: "Things I'd Do Differently"
    anchor: "things-id-do-differently"
---

<div class="callout callout--tldr">
Designed and shipped a full-stack AI career platform in one day — 16 features, 44 PRs, freemium billing via Stripe. Two-tier architecture: rule-based NLP for zero-cost scoring, LLMs reserved for reasoning-heavy tasks. Token usage cut by 40-60% through delta-only prompting.
</div>

## The Problem
{: #the-problem}

Career transitions are one of the most time-intensive workflows professionals face. Every resume tailoring session means 30-40 minutes of manual work: reading the JD, identifying keywords, rewriting bullets, checking ATS compatibility, then doing it again for the next application. Multiply that by 5-8 applications per week, and the career transition itself becomes a part-time job.
{: .cs2-lead}

The problem goes beyond resume mechanics. Professionals switching roles lack structured guidance on how to reposition their experience, identify transferable skills, and prepare for interviews in a new domain. Existing tools fall into two camps: generic resume builders that slap keywords onto templates with no intelligence, or expensive SaaS platforms charging $30-50/month that still require significant manual editing.

I saw an opportunity for something different: a tool that understood the *delta* between a resume and a target JD, made surgical edits instead of rewriting everything, scored ATS compatibility without burning LLM tokens, and let users bring their own API keys to control costs.

So I built it.

<div class="metric-box">
  <span class="metric-box__label">Total Features Shipped</span>
  <span class="metric-box__number">16</span>
</div>

<div class="metric-box">
  <span class="metric-box__label">PRs Merged</span>
  <span class="metric-box__number">44</span>
</div>

<div class="metric-box">
  <span class="metric-box__label">Build Time</span>
  <span class="metric-box__number">1 Day</span>
</div>

## Product Vision
{: #product-vision}

Career Enabler is an AI-powered resume intelligence platform that helps professionals navigating career transitions tailor resumes, prepare for interviews, and discover best-fit roles — all from a single workspace.
{: .cs2-lead}

<p class="statement">Most resume work is mechanical, not creative.</p>

The core product thesis: keyword matching, formatting checks, readability scoring — these should be automated with rule-based systems. LLMs should only activate for the genuinely creative work: rewriting bullets, generating interview answers, and analyzing career fit.

This led to a two-tier intelligence architecture:

- **Tier 1 (Zero LLM cost):** ATS scoring across 4 dimensions (parsability, keyword match, formatting, structure), readability analysis (Flesch-Kincaid, passive voice detection, weak verb flagging), and skill gap extraction using spaCy NER + TF-IDF.
- **Tier 2 (LLM-powered):** Resume tailoring with delta-only prompts, conversational editing, interview prep, STAR answer coaching, and career discovery.

<figure class="viz" role="img" aria-label="Two-tier intelligence architecture: Tier 1 zero-cost NLP vs Tier 2 LLM-powered">
<svg viewBox="0 0 700 160" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="10" width="310" height="140" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="175" y="36" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ff2d00">TIER 1 — Zero LLM Cost</text>
  <line x1="36" y1="46" x2="314" y2="46" stroke="#222" stroke-width="1"/>
  <text x="175" y="70" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#FFFFFF">ATS Scoring (4 dimensions)</text>
  <text x="175" y="92" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#FFFFFF">Readability Analysis</text>
  <text x="175" y="114" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#FFFFFF">Skill Gap Extraction</text>
  <text x="175" y="138" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888">spaCy + TF-IDF + textstat</text>
  <line x1="350" y1="20" x2="350" y2="140" stroke="#333" stroke-width="1" stroke-dasharray="4,3"/>
  <rect x="370" y="10" width="310" height="140" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="525" y="36" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">TIER 2 — LLM-Powered</text>
  <line x1="386" y1="46" x2="664" y2="46" stroke="#222" stroke-width="1"/>
  <text x="525" y="70" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#FFFFFF">Resume Tailoring</text>
  <text x="525" y="92" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#FFFFFF">Interview Prep & STAR Coaching</text>
  <text x="525" y="114" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#FFFFFF">Career Discovery</text>
  <text x="525" y="138" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888">Claude / GPT-4o / Gemini (BYOK)</text>
</svg>
<figcaption>Two-tier architecture: deterministic NLP at zero cost for scoring/extraction; LLMs reserved for reasoning-heavy tasks.</figcaption>
</figure>

<p class="statement">The constraint shaped the product: reserve intelligence for what genuinely requires it. Everything deterministic runs at zero cost.</p>

The business model is freemium: 3 free generations to prove value, then $9/month for unlimited access via Stripe.

<div class="metric-box">
  <span class="metric-box__label">Free Tier</span>
  <span class="metric-box__number">3 generations</span>
</div>
<div class="metric-box">
  <span class="metric-box__label">Pro Plan</span>
  <span class="metric-box__number">$9/month</span>
</div>

**[View on GitHub](https://github.com/Arcanag/career-enabler)**

## Architecture & Technical Decisions
{: #architecture--technical-decisions}

Every architecture decision was driven by a single principle: **lean stack, maximum intelligence.**
{: .cs2-lead}

### Stack

- **Frontend:** Next.js 15 (App Router, TypeScript)
- **Backend:** FastAPI (Python, async)
- **Database:** SQLite + Prisma (not Postgres — a deliberate choice)
- **AI:** Multi-provider BYOK — Claude, GPT-4o, Gemini
- **NLP Preprocessing:** spaCy, textstat, TF-IDF
- **Payments:** Stripe (checkout, subscriptions, customer portal, webhooks)
- **Testing:** 20+ unit tests + Playwright E2E

### Why SQLite Over Postgres

For a single-user-first application with no concurrent write pressure, SQLite eliminates an entire infrastructure dependency. No connection pooling, no managed database service, no cold start latency. The Prisma ORM means I can migrate to Postgres in a single schema change if usage demands it. This is the kind of decision that separates shipping from planning-to-ship.

### Token Cost Optimization

This was the architectural decision I'm most proud of. Before any text hits an LLM, the backend runs a preprocessing pipeline:

1. **spaCy NER** extracts entities (skills, companies, technologies) from both resume and JD
2. **TF-IDF keyword extraction** identifies the highest-signal terms the resume is missing
3. **textstat** computes readability metrics (Flesch-Kincaid grade level, reading ease)
4. **Passive voice and weak verb detectors** flag specific sentences

Only then does the LLM receive a focused prompt: "Here are the 7 missing keywords, here are 3 bullets with passive voice, here is the readability score. Rewrite only the sections that need improvement."

This delta-only approach cuts token usage by an estimated 40-60% compared to sending the full resume for rewrite every time.

<div class="metric-box">
  <span class="metric-box__label">Token Reduction</span>
  <span class="metric-box__number">40-60%</span>
</div>

<figure class="viz" role="img" aria-label="Token preprocessing pipeline reducing 2000 tokens to 300 through NER, TF-IDF, and textstat">
<svg viewBox="0 0 700 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="8" y="22" width="108" height="40" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="62" y="38" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#FFFFFF">Resume + JD</text>
  <text x="62" y="52" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#888">(2000 tokens)</text>
  <line x1="116" y1="42" x2="136" y2="42" stroke="#444" stroke-width="1.5"/><polygon points="136,38 144,42 136,46" fill="#444"/>
  <rect x="144" y="27" width="72" height="30" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="180" y="46" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#FFFFFF">spaCy NER</text>
  <line x1="216" y1="42" x2="236" y2="42" stroke="#444" stroke-width="1.5"/><polygon points="236,38 244,42 236,46" fill="#444"/>
  <rect x="244" y="27" width="72" height="30" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="280" y="46" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#FFFFFF">TF-IDF</text>
  <line x1="316" y1="42" x2="336" y2="42" stroke="#444" stroke-width="1.5"/><polygon points="336,38 344,42 336,46" fill="#444"/>
  <rect x="344" y="27" width="72" height="30" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="380" y="46" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#FFFFFF">textstat</text>
  <line x1="416" y1="42" x2="436" y2="42" stroke="#444" stroke-width="1.5"/><polygon points="436,38 444,42 436,46" fill="#444"/>
  <rect x="444" y="22" width="108" height="40" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="498" y="38" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#FFFFFF">Delta Prompt</text>
  <text x="498" y="52" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#888">(300 tokens)</text>
  <line x1="552" y1="42" x2="572" y2="42" stroke="#444" stroke-width="1.5"/><polygon points="572,38 580,42 572,46" fill="#444"/>
  <rect x="580" y="27" width="70" height="30" rx="4" fill="#141414" stroke="#ff2d00" stroke-width="1.5"/>
  <text x="615" y="46" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#FFFFFF">LLM</text>
  <text x="350" y="85" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#ff2d00">40-60% token reduction</text>
</svg>
<figcaption>Preprocessing pipeline: raw input compressed through NER, TF-IDF, and readability analysis before reaching the LLM.</figcaption>
</figure>

<div class="callout">
<strong>Design Principle:</strong> Use rule-based systems for everything deterministic. Reserve LLM calls for tasks that genuinely require reasoning. This is not just a cost optimization — it makes the product faster and more predictable.
</div>

### Multi-Provider BYOK

Users bring their own API keys for Claude, GPT-4o, or Gemini. This was a deliberate product decision with three benefits: users control their costs, the platform has zero variable AI infrastructure cost, and power users can choose the model they trust most. LLM clients are cached per API key to avoid re-initialization overhead.

## Building at Speed
{: #building-at-speed}

All 16 features were built in a single day, using Claude Code as an AI pair programmer. The speed was one day. The product judgment that made it possible was years of shipping AI products in production. The workflow was disciplined:
{: .cs2-lead}

1. Write a Jira ticket with acceptance criteria
2. Create a feature branch
3. Implement with Claude Code (me directing architecture, Claude writing code)
4. Run tests
5. Create PR via `gh pr create`
6. Review, merge, move to next ticket

### The 16 Features

| # | Feature | Key Detail |
|---|---------|------------|
| 1 | User auth | Email + Google + Microsoft OAuth |
| 2 | Multi-provider BYOK LLM | Claude, GPT-4o, Gemini |
| 3 | Resume tailoring | Delta-only prompts for cost efficiency |
| 4 | ATS scoring | 4 rule-based dimensions, zero LLM cost |
| 5 | Readability scoring | Flesch-Kincaid + passive voice + weak verbs |
| 6 | One-click fixes | Auto-fix formatting + LLM content improvements |
| 7 | Resume from scratch | Generate from work history + target role |
| 8 | Conversational editor | Side-by-side chat + diff view + version history |
| 9 | Skill gap analysis | Local keyword analysis + LLM ranking |
| 10 | Interview prep | 5 behavioral + 5 technical questions per JD |
| 11 | STAR answer coaching | AI-generated answers + feedback loops |
| 12 | Career discovery | Best-fit role analyzer with match % per dimension |
| 13 | Job matching | Multi-board search (Adzuna, Remotive, The Muse) + AI scoring |
| 14 | Freemium gate | 3 free generations, $9/month Pro |
| 15 | Stripe billing | Checkout, subscription, customer portal, webhooks |
| 16 | Generation history | Full history + .docx export |

<div class="metric-box">
  <span class="metric-box__label">Test Coverage</span>
  <span class="metric-box__number">20+ tests</span>
</div>

## Honest Assessment
{: #honest-assessment}

This product has real gaps. I built it in a day and some things show.
{: .cs2-lead}

**What is weak:**

- **Thin test coverage** — 20+ tests and Playwright E2E cover happy paths, but edge cases (malformed PDFs, API key rotation, Stripe webhook retries) are untested. Production would need 3-4x this coverage.
- **No user research** — Built for my own pain point. Haven't validated whether other job seekers share this workflow or would pay $9/month.
- **Single-day UX** — Interface works but hasn't been through usability testing. The conversational editor has interaction patterns that might confuse first-time users.
- **SQLite scaling ceiling** — Fine for early users, but concurrent writes would hit SQLite's write lock. Migration path to Postgres is clean but still a migration.
- **No analytics** — No event tracking, no funnel metrics, no way to measure feature adoption.

**What I would do differently with more time:**

- **Over-engineered auth** — Auth0 would have saved hours I spent on the authentication system. Those hours should have gone to the resume comparison UX.
- **Skipped user interviews** — Should have run 5-10 interviews before building job matching. It may not be the highest-value feature for the target user.
- **No analytics from day one** — PostHog or a lightweight event tracker would tell me whether the ATS scorer or the tailoring engine drives more engagement.
- **Missing abuse prevention** — Rate limiting and validation for the BYOK key system is essential before real users.

<div class="callout">
<strong>Why include this section?</strong> Because product judgment means knowing what you shipped, what you cut, and what you would do differently. Honest assessment of gaps is what separates a demo from a product.
</div>

## Things I'd Do Differently
{: #things-id-do-differently}

### 1. AI Pair Programming Changes the Shipping Equation

With Claude Code as a pair programmer, I was not 2x faster — I was operating at a fundamentally different level. I could focus entirely on product decisions (what to build, why, in what order) while delegating implementation to AI. The bottleneck shifted from "can I code this" to "should I build this next." That is a more valuable bottleneck.

### 2. Rule-Based Systems Are Underrated in AI Products

The instinct in 2026 is to throw an LLM at every problem. But ATS scoring does not need reasoning — it needs pattern matching. Readability does not need a language model — it needs syllable counting. By using rule-based systems for deterministic tasks, I made the product faster, cheaper, and more predictable.

### 3. BYOK Is a Product Strategy, Not Just a Feature

Bring-your-own-key is not just cost optimization. It is a trust signal, a flexibility feature, and a business model enabler. Zero variable AI cost means the $9/month subscription is almost pure margin. More AI products should consider this pattern.

### 4. Shipping Beats Planning

<p class="statement">I could have spent a week writing a PRD. Instead, I shipped 16 features in a day.</p>

Some are rough. Some will need rework. But the product works, the code is real, and the architecture decisions are documented.

### 5. The Jira Discipline Matters Even When You Are Solo

Every one of the 44 PRs had a ticket. This was not bureaucracy — it was thinking clearly about scope before writing code. Multiple times, writing the acceptance criteria made me realize I was over-scoping a feature and should split it.

---

*Career Enabler is open source. [View the code on GitHub.](https://github.com/Arcanag/career-enabler)*
