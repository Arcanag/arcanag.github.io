---
layout: case-study
title: "Building a Resume Intelligence Platform in One Day with AI Pair Programming"
description: "A product case study on designing and shipping a full-stack AI career platform — 16 features, 44 PRs, and a freemium business model — in a single day using Claude Code."
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
  - title: "What I Learned"
    anchor: "what-i-learned"
---

## The Problem
{: #the-problem}

I was preparing for AI PM interviews while working full-time. Every resume tailoring session meant 30-40 minutes of manual work: reading the JD, identifying keywords, rewriting bullets, checking ATS compatibility, then doing it again for the next application. Multiply that by 5-8 applications per week, and the job search itself becomes a part-time job.

Existing tools fell into two camps. Generic resume builders that slapped keywords onto templates with no intelligence. Or expensive SaaS platforms charging $30-50/month that still required significant manual editing.

I wanted something different: a tool that understood the *delta* between my resume and a target JD, made surgical edits instead of rewriting everything, scored ATS compatibility without burning LLM tokens, and let me bring my own API keys so I controlled costs.

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

Career Enabler is an AI-powered resume intelligence platform that helps job seekers tailor resumes, prepare for interviews, and discover best-fit roles — all from a single workspace.

The core product thesis: **most resume work is mechanical, not creative.** Keyword matching, formatting checks, readability scoring — these should be automated with rule-based systems. LLMs should only activate for the genuinely creative work: rewriting bullets, generating interview answers, and analyzing career fit.

This led to a two-tier intelligence architecture:

- **Tier 1 (Zero LLM cost):** ATS scoring across 4 dimensions (parsability, keyword match, formatting, structure), readability analysis (Flesch-Kincaid, passive voice detection, weak verb flagging), and skill gap extraction using spaCy NER + TF-IDF.
- **Tier 2 (LLM-powered):** Resume tailoring with delta-only prompts, conversational editing, interview prep, STAR answer coaching, and career discovery.

The business model is freemium: 3 free generations to prove value, then $9/month for unlimited access via Stripe.

**[View on GitHub](https://github.com/Arcanag/career-enabler)**

## Architecture & Technical Decisions
{: #architecture--technical-decisions}

Every architecture decision was driven by a single principle: **lean stack, maximum intelligence.**

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

<div class="callout">
<strong>Design Principle:</strong> Use rule-based systems for everything deterministic. Reserve LLM calls for tasks that genuinely require reasoning. This is not just a cost optimization — it makes the product faster and more predictable.
</div>

### Multi-Provider BYOK

Users bring their own API keys for Claude, GPT-4o, or Gemini. This was a deliberate product decision with three benefits: users control their costs, the platform has zero variable AI infrastructure cost, and power users can choose the model they trust most. LLM clients are cached per API key to avoid re-initialization overhead.

## Building at Speed
{: #building-at-speed}

All 16 features were built on March 22, 2026, using Claude Code as an AI pair programmer. The day was one day. The product judgment that made it possible was years of shipping AI products in production. The workflow was disciplined:

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

**What is weak:**

- **Test coverage is thin.** 20+ tests and Playwright E2E cover the happy paths, but edge cases — malformed PDFs, API key rotation mid-session, Stripe webhook retries — are not well-tested. For a production product, I would want 3-4x this coverage.
- **No user research.** I built this for my own pain point. I have not validated whether other job seekers share the same workflow or would pay $9/month.
- **Single-day UX.** The interface works, but it has not been through any usability testing. The conversational editor in particular has interaction patterns that might confuse first-time users.
- **SQLite scaling ceiling.** Fine for early users, but concurrent writes from multiple users would hit SQLite's write lock. The migration path to Postgres is clean, but it is still a migration.
- **No analytics.** No event tracking, no funnel metrics, no way to measure feature adoption.

**What I would do differently with more time:**

- I over-engineered the authentication system for a v1. Auth0 would have saved hours I should have spent on the resume comparison UX.
- Run 5-10 user interviews before building the job matching feature — it may not be the highest-value feature for the target user.
- Add PostHog or a lightweight event tracker from day one — without analytics, I cannot measure whether the ATS scorer or the tailoring engine drives more engagement.
- Implement rate limiting and abuse prevention for the BYOK key system.

<div class="callout">
<strong>Why include this section?</strong> Because product judgment means knowing what you shipped, what you cut, and what you would do differently. A PM who only talks about wins is either inexperienced or dishonest.
</div>

## What I Learned
{: #what-i-learned}

### 1. AI Pair Programming Changes the Shipping Equation

With Claude Code as a pair programmer, I was not 2x faster — I was operating at a fundamentally different level. I could focus entirely on product decisions (what to build, why, in what order) while delegating implementation to AI. The bottleneck shifted from "can I code this" to "should I build this next." That is a more valuable bottleneck.

### 2. Rule-Based Systems Are Underrated in AI Products

The instinct in 2026 is to throw an LLM at every problem. But ATS scoring does not need reasoning — it needs pattern matching. Readability does not need a language model — it needs syllable counting. By using rule-based systems for deterministic tasks, I made the product faster, cheaper, and more predictable.

### 3. BYOK Is a Product Strategy, Not Just a Feature

Bring-your-own-key is not just cost optimization. It is a trust signal, a flexibility feature, and a business model enabler. Zero variable AI cost means the $9/month subscription is almost pure margin. More AI products should consider this pattern.

### 4. Shipping Beats Planning

I could have spent a week writing a PRD. Instead, I shipped 16 features in a day. Some are rough. Some will need rework. But I have a working product, real code to reference in interviews, and concrete evidence that I can go from zero to one.

### 5. The Jira Discipline Matters Even When You Are Solo

Every one of the 44 PRs had a ticket. This was not bureaucracy — it was thinking clearly about scope before writing code. Multiple times, writing the acceptance criteria made me realize I was over-scoping a feature and should split it.

---

*Career Enabler is open source. [View the code on GitHub.](https://github.com/Arcanag/career-enabler)*
