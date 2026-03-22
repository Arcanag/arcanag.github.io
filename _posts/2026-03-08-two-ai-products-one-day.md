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

## The Workflow That Made It Possible
{: #the-workflow}

Here's what every feature looked like, without exception:

1. **Jira ticket created** with acceptance criteria, technical approach, and scope boundaries
2. **Feature branch** cut from main (`feature/CE-XX-description` or `feat/ap-XX-description`)
3. **Implementation** with Claude Code generating the code while I directed architecture and scope
4. **Tests written** before or alongside the feature
5. **PR created** via `gh pr create` with a description linking back to the Jira ticket
6. **Merge to main** only after tests pass

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
