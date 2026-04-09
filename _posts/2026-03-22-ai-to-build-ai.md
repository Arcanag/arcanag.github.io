---
layout: post
title: "How I Used AI to Build an AI Career Tool (and What Each Layer Taught Me)"
description: "The recursive meta-narrative of using Claude Code to build Career Enabler — three layers of AI, and what each layer taught me about building AI products."
category: "Building with AI"
theme_color: "#7C3AED"
hero_bg_word: "META"
read_time: "10 min read"
date: 2026-03-22
published: false
tags: ["meta-narrative", "ai-product-management", "claude-code", "building"]
toc:
  - title: "Three Layers Deep"
    anchor: "three-layers-deep"
  - title: "Layer 1: Claude Code as Development Tool"
    anchor: "layer-1-claude-code"
  - title: "Layer 2: AI Inside the Product"
    anchor: "layer-2-ai-inside-the-product"
  - title: "Layer 3: The Recursive Lesson"
    anchor: "layer-3-the-recursive-lesson"
  - title: "Honest Self-Critique"
    anchor: "honest-self-critique"
  - title: "What Building Taught That Studying Couldn't"
    anchor: "what-building-taught"
---

<div class="callout callout--tldr">
I used an AI agent (Claude Code) to build an AI career tool (Career Enabler) that helps professionals navigate career transitions. Three layers of AI, each revealing something different about where AI amplifies human judgment and where it falls short.
</div>

## Three Layers Deep: The Meta-Narrative
{: #three-layers-deep}

I built **16 features, closed 44 pull requests, and launched a full AI product in a single day.** But the speed isn't the most interesting part. 

There's a recursive quality to what I built on March 22, 2026.

- **Layer 1: The Tool** — I used an AI agent (Claude Code) to write software.
- **Layer 2: The Product** — The software I built ([Career Enabler](https://github.com/Arcanag/career-enabler)) uses AI to tailor resumes and prep for interviews.
- **Layer 3: The Outcome** — The tailored resumes help professionals navigate career transitions effectively.

<figure class="viz" role="img" aria-label="Three layers of AI: Claude Code as tool, Career Enabler as product, user outcomes">
<svg viewBox="0 0 700 185" xmlns="http://www.w3.org/2000/svg">
  <rect x="100" y="5" width="500" height="48" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="350" y="24" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">Layer 1: Claude Code</text>
  <text x="350" y="42" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888">AI Development Tool</text>
  <line x1="350" y1="53" x2="350" y2="65" stroke="#444" stroke-width="1.5"/><polygon points="346,65 350,73 354,65" fill="#444"/>
  <rect x="100" y="70" width="500" height="48" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="350" y="89" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">Layer 2: Career Enabler</text>
  <text x="350" y="107" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888">AI Inside the Product</text>
  <line x1="350" y1="118" x2="350" y2="130" stroke="#444" stroke-width="1.5"/><polygon points="346,130 350,138 354,130" fill="#444"/>
  <rect x="100" y="135" width="500" height="48" rx="4" fill="#141414" stroke="#ff2d00" stroke-width="1.5"/>
  <text x="350" y="154" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ff2d00">Layer 3: User Outcomes</text>
  <text x="350" y="172" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888">Professionals in Career Transition</text>
</svg>
<figcaption>Three layers of AI: the tool that builds the product, the AI inside the product, and the human outcome.</figcaption>
</figure>

AI building AI to solve a real workflow problem. Each layer reveals something different about how AI actually works in practice — not in theory, not in demos, but in the messy reality of shipping a product.

<div class="metric-box"><span class="metric-box__label">Layers of AI</span><span class="metric-box__number">3</span></div>

## Layer 1: Claude Code as Development Tool
{: #layer-1-claude-code}

I have Claude Code configured with 17 agents and 106 skills. It's not a chatbot I paste code into. It's an integrated development environment that understands my project structure, can read and write files, run tests, create branches, and manage a complex codebase.

**What Claude Code excels at:**

- **Boilerplate generation.** Model definitions, serializers, URL routing, migration files — pattern-heavy code that AI generates accurately and fast.
- **API integration.** Stripe webhook handlers, Claude API calls, PDF parsing pipelines — Claude Code has seen thousands of examples and produces working code on the first try.
- **Test generation.** Given a function signature, Claude Code writes comprehensive test cases including edge cases I wouldn't have thought of.
- **Repetitive refactoring.** "Add error handling to all API endpoints" — tasks that touch 20 files with the same pattern.

**What requires human judgment:**

- **Architecture decisions.** SQLite vs Postgres. Monolith vs monorepo. BYOK vs platform-managed keys. Claude Code implements whatever you ask for, but it won't tell you which choice is right for your specific constraints. I made these calls based on years of shipping AI products in production.
- **Scope cuts.** Career Enabler could have had a Chrome extension, collaborative editing, and a social feed. Claude Code would have happily built all of them. I cut them because shipping 16 solid features beats shipping 30 half-baked ones.
- **Feature sequencing.** The ATS scorer needed to exist before the LLM integration because the scorer's output informs the prompt. Auth before payments. Job matcher before interview prep. This sequencing requires understanding the product as a system.
- **UX tradeoffs.** Should the ATS score appear before or after tailoring? Before — because it motivates the user to tailor.

<div class="callout"><p>My judgment determined what to build and in what order. Claude Code handled the translation from decision to code. The bottleneck shifted from implementation speed to decision quality — and that's exactly why PM skills matter more in the AI-assisted era, not less.</p></div>

## Layer 2: AI Inside the Product
{: #layer-2-ai-inside-the-product}

[Career Enabler](https://github.com/Arcanag/career-enabler) uses AI for some features and deliberately avoids it for others. The decision boundary taught me more about AI product design than any course.

**Where LLMs excel:**

- **Resume generation**: Rewriting bullets to match JD keywords while maintaining the candidate's voice. This requires language understanding, style matching, and creative rephrasing.
- **Interview question generation**: Creating role-specific questions from a JD. The LLM understands nuance ("senior" vs "staff" level expectations).
- **Skill gap narrative**: Taking structured data and turning it into actionable prose.

**Where traditional code wins:**

- **ATS scoring**: Keyword matching, format checking, section detection — deterministic, faster, cheaper.
- **Readability metrics**: Flesch-Kincaid, sentence length, passive voice — established algorithms that don't hallucinate.
- **Keyword extraction**: TF-IDF beats an LLM for extracting important terms. Mathematically grounded and doesn't hallucinate keywords.
- **Job matching**: Cosine similarity between skill vectors is fast, explainable, and deterministic.

<figure class="viz" role="img" aria-label="LLM vs traditional code decision boundary: what needs reasoning vs what needs algorithms">
<svg viewBox="0 0 700 170" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="10" width="310" height="150" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="175" y="36" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">LLMs Excel</text>
  <line x1="36" y1="46" x2="314" y2="46" stroke="#222" stroke-width="1"/>
  <text x="175" y="70" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">Resume generation</text>
  <text x="175" y="92" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">Interview question creation</text>
  <text x="175" y="114" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">Skill gap narrative</text>
  <text x="175" y="142" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#FFFFFF">Generation + Interpretation</text>
  <line x1="350" y1="20" x2="350" y2="150" stroke="#333" stroke-width="1" stroke-dasharray="4,3"/>
  <rect x="370" y="10" width="310" height="150" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="525" y="36" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ff2d00">Traditional Code Wins</text>
  <line x1="386" y1="46" x2="664" y2="46" stroke="#222" stroke-width="1"/>
  <text x="525" y="70" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">ATS scoring</text>
  <text x="525" y="92" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">Readability metrics</text>
  <text x="525" y="114" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">Keyword extraction + Job matching</text>
  <text x="525" y="142" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#ff2d00">Measurement + Matching</text>
</svg>
<figcaption>Decision boundary: use LLMs for generation/interpretation, use code for measurement/matching.</figcaption>
</figure>

The pattern: use AI for generation and interpretation. Use code for measurement and matching. If you can write a deterministic algorithm that gives a correct answer, don't use an LLM.

## Layer 3: The Recursive Lesson
{: #layer-3-the-recursive-lesson}

At every layer, the same truth emerges: AI amplifies human judgment but doesn't replace it.

- **Layer 1**: Claude Code amplifies my development speed, but I decide architecture, scope, and sequencing.
- **Layer 2**: The LLM in Career Enabler amplifies resume quality, but the user decides which suggestions to accept.
- **Layer 3**: The tailored resume amplifies a candidate's presentation, but the hiring manager evaluates the human behind the document.

This isn't philosophical. It's a product design principle. Every AI product needs to answer: "What is the human's role in this system?" If the answer is "nothing," you've either built something trivial or something dangerous.

## Honest Self-Critique
{: #honest-self-critique}

Shipping fast means making tradeoffs, and I want to be specific about what's strong and what's not.

**Career Enabler Strengths:** Lean architecture, cost-efficient AI pipeline, comprehensive feature set (16 features), BYOK model that scales without absorbing LLM costs.

**Career Enabler Gaps:**
- **No collaboration** — Can't share a draft with a mentor for review
- **Limited job boards** — 3 boards integrated, no LinkedIn/Indeed
- **No resume analytics** — No way to track which versions get callbacks
- **SQLite scaling ceiling** — Limits to single-user concurrency
- **No A/B testing** — Can't compare AI output quality across prompts

**[Agentic PM](https://github.com/Arcanag/agentic-pm) Strengths:** Clean agent separation, comprehensive database schema, multi-channel intake, Monte Carlo simulation for forecasting.

**Agentic PM Gaps:**
- **Cold start problem** — No historical data to calibrate estimation accuracy
- **No agent memory** — Agents don't improve from past decisions
- **Enterprise auth gaps** — No SSO, basic RBAC only
- **Linear orchestration** — No event-driven cascading updates
- **Basic intake filtering** — Multi-channel signal-to-noise ratio is low

<div class="callout"><p>Listing what's wrong with your own product isn't self-deprecation. It's the most PM thing you can do. It shows you understand scope, tradeoffs, and what a V2 roadmap looks like.</p></div>

## What Building Taught That Studying Couldn't
{: #what-building-taught}

I've read PM books, taken courses, studied frameworks. Building two products taught me things none of that did:

**Prioritization under real pressure.** When you have 24 hours and a product vision, every feature competes for time. Interview prep almost got cut from Career Enabler. I kept it because it completes the user journey — tailor, match, AND prep.

**Scope cuts that hurt.** I wanted a Chrome extension that auto-fills JDs from LinkedIn. It would have been a killer feature. I cut it because it was a 4-hour rabbit hole for a V2 feature. That decision physically hurt, and that's how you know it was the right kind of scope management.

**Architecture tradeoffs with real consequences.** Choosing SQLite meant accepting single-user limits. I chose it anyway because shipping TODAY for one user was more valuable than shipping NEXT WEEK for many.

**The gap between "works" and "done."** Every feature had a moment where it worked in manual testing but wasn't done — missing error handling, no loading states, no edge cases. The discipline to write tests and handle errors separates a demo from a product.

Here's what I believe about building: you don't need permission to ship. You don't need a title to make product decisions. You don't need a company's blessing to build software that solves real problems. The compound effect of shipping real software, with real tradeoffs, teaches more than any course or certification.

The portfolio is the proof. The GitHub history is the track record. The architecture decisions are the case study.

---

*Both projects are open source: [Career Enabler](https://github.com/Arcanag/career-enabler) and [Agentic PM](https://github.com/Arcanag/agentic-pm).*
