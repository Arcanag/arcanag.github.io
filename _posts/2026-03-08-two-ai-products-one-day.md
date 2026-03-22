---
layout: post
title: "Two AI Products in One Day: 63 PRs, 67 Jira Tickets, and Zero Chaos"
description: "How engineering discipline made AI-assisted development faster, not slower — building Career Enabler and Agentic PM in a single day."
category: "Building with AI"
read_time: "8 min read"
date: 2026-03-08
tags: ["ai-development", "claude-code", "product-building", "engineering-discipline"]
toc:
  - title: "The Headline Numbers"
    anchor: "the-headline-numbers"
  - title: "What Got Built"
    anchor: "what-got-built"
  - title: "The Workflow That Made It Possible"
    anchor: "the-workflow"
  - title: "Why Discipline Scales"
    anchor: "why-discipline-scales"
  - title: "What This Means for PMs Who Want to Build"
    anchor: "what-this-means"
---

## The Headline Numbers
{: #the-headline-numbers}

On March 22, 2026, I shipped two AI-powered products from scratch — products with authentication, payments, tests, and CI-ready codebases. The day was one day. The judgment that made it possible was years of shipping AI products in production.

<div class="metric-box"><span class="metric-box__label">Pull Requests Merged</span><span class="metric-box__number">63</span></div>

<div class="metric-box"><span class="metric-box__label">Jira Tickets Closed</span><span class="metric-box__number">67</span></div>

<div class="metric-box"><span class="metric-box__label">Tests Written</span><span class="metric-box__number">100+</span></div>

The two products: [Career Enabler](https://github.com/Arcanag/career-enabler), an AI resume tailoring and job search platform, and [Agentic PM](https://github.com/Arcanag/agentic-pm), an AI-powered project management OS with 6 autonomous agents. Both built with Claude Code as my development partner.

But the headline isn't really about speed. It's about what made the speed possible.

## What Got Built
{: #what-got-built}

**Career Enabler** is a full-stack application with 16 features across 44 PRs. It takes a resume and a job description, runs ATS scoring with zero LLM tokens (pure Python text analysis), then generates a tailored resume using Claude. It includes interview prep, job matching across 3 boards, skill gap analysis, conversational editing with diff view, a Stripe-integrated freemium system, and BYOK multi-provider LLM support.

**Agentic PM** is a monorepo application with 6 AI agents across 19 PRs. It decomposes requirements into epics/stories/tasks with INVEST validation, routes work based on team skills and capacity with RACI matrices, forecasts timelines using Monte Carlo simulation, and generates client status reports. It ingests requirements from Gmail, Slack, and Jira automatically.

Both products have comprehensive test suites, proper authentication, database migrations, and clean git histories.

<figure class="viz" role="img" aria-label="Two products side by side: Career Enabler with 16 features vs Agentic PM with 6 agents">
<svg viewBox="0 0 700 140" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="10" width="310" height="120" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="175" y="36" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f0ebe0">Career Enabler</text>
  <line x1="36" y1="44" x2="314" y2="44" stroke="#222" stroke-width="1"/>
  <text x="175" y="66" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ff2d00">16 Features</text>
  <text x="175" y="86" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">44 PRs merged</text>
  <text x="175" y="106" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888">Next.js + FastAPI + SQLite</text>
  <rect x="370" y="10" width="310" height="120" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="525" y="36" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f0ebe0">Agentic PM</text>
  <line x1="386" y1="44" x2="664" y2="44" stroke="#222" stroke-width="1"/>
  <text x="525" y="66" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ff2d00">6 Agents</text>
  <text x="525" y="86" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">19 PRs merged</text>
  <text x="525" y="106" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888">Monorepo + Turborepo + Postgres</text>
</svg>
<figcaption>Two products built in one day: a resume intelligence platform and an AI project management OS.</figcaption>
</figure>

## The Workflow That Made It Possible
{: #the-workflow}

Here's what every feature looked like, without exception:

1. **Jira ticket created** with acceptance criteria, technical approach, and scope boundaries
2. **Feature branch** cut from main (`feature/CE-XX-description` or `feat/ap-XX-description`)
3. **Implementation** with Claude Code generating the code while I directed architecture and scope
4. **Tests written** before or alongside the feature
5. **PR created** via `gh pr create` with a description linking back to the Jira ticket
6. **Merge to main** only after tests pass

<figure class="viz" role="img" aria-label="Development workflow cycle: Jira ticket to feature branch to implementation to tests to PR to merge">
<svg viewBox="0 0 700 80" xmlns="http://www.w3.org/2000/svg">
  <rect x="5" y="20" width="90" height="36" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="50" y="43" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#f0ebe0">Jira Ticket</text>
  <line x1="95" y1="38" x2="113" y2="38" stroke="#444" stroke-width="1.5"/><polygon points="113,34 121,38 113,42" fill="#444"/>
  <rect x="121" y="20" width="90" height="36" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="166" y="43" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#f0ebe0">Branch</text>
  <line x1="211" y1="38" x2="229" y2="38" stroke="#444" stroke-width="1.5"/><polygon points="229,34 237,38 229,42" fill="#444"/>
  <rect x="237" y="20" width="100" height="36" rx="4" fill="#141414" stroke="#ff2d00" stroke-width="1.5"/>
  <text x="287" y="43" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#f0ebe0">Implement</text>
  <line x1="337" y1="38" x2="355" y2="38" stroke="#444" stroke-width="1.5"/><polygon points="355,34 363,38 355,42" fill="#444"/>
  <rect x="363" y="20" width="90" height="36" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="408" y="43" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#f0ebe0">Tests</text>
  <line x1="453" y1="38" x2="471" y2="38" stroke="#444" stroke-width="1.5"/><polygon points="471,34 479,38 471,42" fill="#444"/>
  <rect x="479" y="20" width="90" height="36" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="524" y="43" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#f0ebe0">PR</text>
  <line x1="569" y1="38" x2="587" y2="38" stroke="#444" stroke-width="1.5"/><polygon points="587,34 595,38 587,42" fill="#444"/>
  <rect x="595" y="20" width="90" height="36" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="640" y="43" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#f0ebe0">Merge</text>
  <text x="350" y="73" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#888">× 63 PRs — zero exceptions</text>
</svg>
<figcaption>Every feature followed the same 6-step workflow. 63 PRs, no exceptions.</figcaption>
</figure>

Every single one of the 63 PRs followed this pattern. No exceptions. No "I'll clean this up later." No direct commits to main.

<div class="callout"><p>The rule was simple: if it doesn't have a ticket, it doesn't get built. If it doesn't have a branch, it doesn't get committed. If it doesn't have tests, it doesn't get merged.</p></div>

## Why Discipline Scales
{: #why-discipline-scales}

This seems counterintuitive. Adding process should slow you down, right? Especially when you're moving fast with an AI coding assistant that can generate hundreds of lines per minute.

Here's what actually happens without discipline: AI generates code fast, you commit it fast, and by feature number 8, you're debugging interactions between features that were never isolated. You can't roll back feature 12 without breaking feature 9. Your git history is a single thread of "wip" and "fix" commits. You've built a house of cards at 10x speed.

With the Jira-first, branch-per-feature workflow, each PR is:

- **Reviewable**: I could look at any PR in isolation and understand what it changed and why
- **Rollbackable**: When the Stripe webhook integration needed a rethink, I reverted one PR. Nothing else broke.
- **Isolated**: Feature branches meant Claude Code worked in a clean context every time
- **Traceable**: Every line of code maps to a Jira ticket with acceptance criteria

The overhead of creating a Jira ticket and cutting a branch is maybe 2 minutes. The time saved by not debugging tangled feature interactions is measured in hours.

### The Anti-Pattern: Vibe Coding

There's a popular approach right now that I'll call "vibe coding" — you sit down with an AI assistant, describe what you want in broad strokes, and let it generate an entire application in one session. The results look impressive in a demo. The codebase is usually unmaintainable within a week.

The 63-PR approach isn't slower. It's faster at scale because each PR is small enough for meaningful review, tests catch regressions before they compound, the AI assistant gets clean focused context, and you can parallelize across products.

## What This Means for PMs Who Want to Build
{: #what-this-means}

I'm not a 10x engineer. I'm a PM with enough technical depth to make architecture decisions and enough engineering skill to review AI-generated code critically. What I brought to this day wasn't coding speed — Claude Code handled that. What I brought was:

- **Scope discipline**: Knowing what NOT to build. Career Enabler doesn't have a social feed. Agentic PM doesn't have a mobile app. Every feature earned its place.
- **Architecture judgment**: Choosing SQLite for Career Enabler (single-user, zero ops) and Postgres for Agentic PM (multi-tenant, concurrent agents). These aren't decisions an AI makes well without context.
- **Feature sequencing**: Building the ATS scorer before the LLM integration, because the scorer's output informs the prompt. Auth before payments, because payments need user identity.
- **Quality gates**: Refusing to merge a PR with failing tests, even when the feature "worked" in manual testing.

<div class="callout"><p>The leverage comes from combining deep product judgment with AI-native development tools. The system is the multiplier, not the typing speed.</p></div>

If you're a PM thinking about building something with AI coding tools, start with the workflow. Set up your ticket tracker. Enforce branch-per-feature. Write tests. The AI will generate code at whatever speed it generates code — your job is to make sure that speed doesn't turn into chaos.

---

*Both projects are open source: [Career Enabler](https://github.com/Arcanag/career-enabler) and [Agentic PM](https://github.com/Arcanag/agentic-pm).*
