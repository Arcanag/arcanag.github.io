---
layout: post
title: "Cost-Conscious AI Architecture: How to Stop Bleeding Tokens"
description: "Specific patterns for reducing LLM costs — Python preprocessing, zero-token ATS scoring, SQLite vs Postgres decisions, and BYOK as a business model."
category: "Technical Deep-Dive"
read_time: "10 min read"
date: 2026-02-02
tags: ["ai-architecture", "llm-optimization", "cost-reduction", "python"]
toc:
  - title: "The Token Bleed Problem"
    anchor: "the-token-bleed-problem"
  - title: "The Preprocessing Pipeline"
    anchor: "the-preprocessing-pipeline"
  - title: "Zero-Token ATS Scoring"
    anchor: "zero-token-ats-scoring"
  - title: "SQLite vs Postgres: A Framework"
    anchor: "sqlite-vs-postgres"
  - title: "BYOK as Cost Architecture"
    anchor: "byok-as-cost-architecture"
  - title: "Putting It Together"
    anchor: "putting-it-together"
---

<div class="callout callout--tldr">
Most AI products bleed tokens by sending raw text to LLMs. This post details specific patterns — Python preprocessing, zero-token ATS scoring, SQLite vs Postgres decisions, and BYOK as a business model — that cut infrastructure costs to ~$5/month.
</div>

## The Token Bleed Problem
{: #the-token-bleed-problem}

Most AI products have a dirty secret: they send way too much text to the LLM. A typical resume is **800-1200 words**. A job description is **500-1000 words**. Concatenate both and send them to Claude with "make this resume match this JD" — you're burning **2000+ input tokens** per request before the model starts generating.

Multiply that by thousands of users, and your API bill becomes your biggest cost center.

When I built [Career Enabler](https://github.com/Arcanag/career-enabler), I treated token cost as a first-class architecture constraint. The result: LLM calls receive only the structured delta between the resume and the job description, not the raw documents.

<div class="metric-box"><span class="metric-box__label">ATS Scoring LLM Cost</span><span class="metric-box__number">$0</span></div>

<div class="metric-box"><span class="metric-box__label">Preprocessing Steps Before LLM</span><span class="metric-box__number">5</span></div>

## The Preprocessing Pipeline
{: #the-preprocessing-pipeline}

Here's the actual pipeline that runs before any LLM call in Career Enabler:

**Step 1 — PDF Extraction (pdfplumber).** Raw PDF goes in. Structured text comes out. pdfplumber handles multi-column layouts, tables, and formatting artifacts. This is a Python library, not an API call. Cost: zero.

**Step 2 — Named Entity Recognition (spaCy).** spaCy's NER pipeline extracts structured entities: names, organizations, dates, skills, job titles. Instead of sending raw paragraphs to the LLM, we extract structured data. Cost: zero.

**Step 3 — Keyword Matching (TF-IDF).** TF-IDF vectorization compares the resume against the job description at a keyword level. We identify which JD keywords are present, which are missing, and which resume keywords are irrelevant. This produces a structured gap analysis. Cost: zero.

**Step 4 — Readability Analysis (textstat).** textstat computes Flesch-Kincaid grade level, sentence complexity, and word length distributions. If the resume reads at grade 16 and the JD is written at grade 10, that's a signal the language is too academic. Cost: zero.

**Step 5 — Structured Delta Prompt.** Only NOW do we call the LLM. But instead of two full documents, we send a structured prompt:

```
Missing JD keywords: [Kubernetes, A/B testing, stakeholder management]
Readability gap: Resume grade 14, target grade 11
Weak bullets: [bullet 3 in job 1 — no quantified impact]
Task: Rewrite only the following 3 bullets to incorporate
missing keywords and improve readability.
```

<figure class="viz" role="img" aria-label="Token cost reduction: 2000 tokens naively vs 300 tokens with preprocessing">
<svg viewBox="0 0 700 110" xmlns="http://www.w3.org/2000/svg">
  <text x="30" y="32" font-family="sans-serif" font-size="11" fill="#888">Naive</text>
  <rect x="110" y="15" width="540" height="28" rx="3" fill="#444"/>
  <text x="660" y="34" font-family="sans-serif" font-size="12" fill="#888">2000 tokens</text>
  <text x="30" y="74" font-family="sans-serif" font-size="11" fill="#888">Delta</text>
  <rect x="110" y="57" width="81" height="28" rx="3" fill="#ff2d00" opacity="0.8"/>
  <text x="660" y="76" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ff2d00">~300 tokens</text>
  <text x="350" y="102" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#ff2d00">~85% token reduction via preprocessing</text>
</svg>
<figcaption>Preprocessing eliminates ~85% of tokens before the LLM sees them — better output at a fraction of the cost.</figcaption>
</figure>

The LLM receives maybe 300 tokens of structured context instead of 2000 tokens of raw text. It generates better output because the problem is pre-digested, and it costs a fraction of the naive approach.

<p class="statement">Every token you send to an LLM should be a token that ONLY an LLM can process.</p>

<div class="callout"><p>If Python can handle it — keyword matching, readability scoring, entity extraction — Python should handle it.</p></div>

## Zero-Token ATS Scoring
{: #zero-token-ats-scoring}

Career Enabler's ATS compatibility score uses absolutely no LLM tokens. The entire scoring engine is deterministic Python:

- **Parsability checks**: Can standard ATS parsers extract sections? Are headers using standard labels?
- **Keyword matching**: TF-IDF cosine similarity between resume and JD, with section-weighted scoring
- **Formatting rules**: Single-column layout detection, standard font inference, no tables/graphics flags
- **Structure analysis**: Presence of required sections, chronological ordering, date format consistency

This runs in under 100ms and gives users an immediate score while the LLM-powered tailoring runs asynchronously. Users get fast feedback AND deep tailoring, but the fast part costs nothing.

## SQLite vs Postgres: A Framework
{: #sqlite-vs-postgres}

I built two products on the same day and chose different databases for each. That wasn't an accident.

**Career Enabler uses SQLite** because it's a single-user tool, write concurrency is minimal, query patterns are simple CRUD, and there's zero operational overhead — no database server to manage, backup is a file copy.

**[Agentic PM](https://github.com/Arcanag/agentic-pm) uses Postgres** because multiple AI agents write concurrently, multi-tenant data isolation requires row-level security, complex queries join across agents/tasks/sprints, and the Monte Carlo simulation generates thousands of records.

<figure class="viz" role="img" aria-label="SQLite vs Postgres decision matrix based on concurrency and query complexity">
<svg viewBox="0 0 700 180" xmlns="http://www.w3.org/2000/svg">
  <text x="350" y="16" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888">Query Complexity →</text>
  <text x="16" y="100" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888" transform="rotate(-90 16 100)">Concurrency →</text>
  <rect x="80" y="30" width="270" height="65" rx="4" fill="#141414" stroke="#ff2d00" stroke-width="1.5"/>
  <text x="215" y="55" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#FFFFFF">Low Concurrency + Simple</text>
  <text x="215" y="73" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ff2d00">SQLite</text>
  <text x="215" y="87" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#888">Career Enabler</text>
  <rect x="370" y="30" width="270" height="65" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="505" y="55" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">Low Concurrency + Complex</text>
  <text x="505" y="73" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#888">Either</text>
  <rect x="80" y="105" width="270" height="65" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="215" y="130" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">High Concurrency + Simple</text>
  <text x="215" y="148" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#888">Postgres</text>
  <rect x="370" y="105" width="270" height="65" rx="4" fill="#141414" stroke="#FFFFFF" stroke-width="1.5"/>
  <text x="505" y="130" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#FFFFFF">High Concurrency + Complex</text>
  <text x="505" y="148" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF">Postgres</text>
  <text x="505" y="162" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#888">Agentic PM</text>
</svg>
<figcaption>Database decision framework: concurrency and query complexity determine the right choice.</figcaption>
</figure>

<div class="callout"><p>The framework: assess four dimensions. (1) User concurrency — how many simultaneous writers? (2) Write patterns — simple CRUD or complex transactions? (3) Query complexity — single-table lookups or multi-join analytics? (4) Ops budget — can you afford a database server? If all four answer "simple," SQLite is the right choice.</p></div>

## BYOK as Cost Architecture
{: #byok-as-cost-architecture}

Career Enabler uses a Bring Your Own Key model for LLM access. This isn't just a pricing decision — it's an architecture decision:

- **Cost elimination** — The product doesn't absorb LLM costs. No margin calculation on token usage, no throttling heavy users, no surprise bills.
- **Trust simplification** — Users control their own data flow. Their resume text goes from their browser to their API key to the LLM provider.
- **Pricing clarity** — The product charges for the platform ($9/month). LLM costs are transparent and separate.
- **Scaling decoupled from costs** — If the product gets 10,000 users tomorrow, server costs scale with compute (cheap) — not with LLM consumption (expensive and unpredictable).

The tradeoff is onboarding friction. But for the target audience (technical professionals transitioning roles), getting an API key is a 2-minute task.

The BFF proxy pattern ensures API keys never reach the browser — they're encrypted server-side, and the backend makes all LLM calls on behalf of the user. Rate limiting at the proxy layer prevents accidental token burns from UI bugs.

## Putting It Together
{: #putting-it-together}

The full cost architecture:

<div class="metric-box"><span class="metric-box__label">Infrastructure Cost</span><span class="metric-box__number">~$5/mo</span></div>

- **Compute**: Single-container app. No database server, no Redis, no message queue.
- **LLM costs**: Borne by the user via BYOK. Product cost is $0 per LLM call.
- **Preprocessing**: All Python libraries. No API costs.
- **Storage**: SQLite file + uploaded PDFs. Megabytes, not gigabytes.

<figure class="viz" role="img" aria-label="Cost architecture stack totaling approximately 5 dollars per month">
<svg viewBox="0 0 700 160" xmlns="http://www.w3.org/2000/svg">
  <rect x="40" y="10" width="400" height="28" rx="3" fill="#141414" stroke="#222" stroke-width="1"/>
  <text x="50" y="29" font-family="sans-serif" font-size="11" fill="#FFFFFF">Compute: single container</text><text x="430" y="29" font-family="sans-serif" font-size="11" fill="#ff2d00">~$5/mo</text>
  <rect x="40" y="44" width="400" height="28" rx="3" fill="#141414" stroke="#222" stroke-width="1"/>
  <text x="50" y="63" font-family="sans-serif" font-size="11" fill="#FFFFFF">Database: SQLite</text><text x="430" y="63" font-family="sans-serif" font-size="11" fill="#888">$0</text>
  <rect x="40" y="78" width="400" height="28" rx="3" fill="#141414" stroke="#222" stroke-width="1"/>
  <text x="50" y="97" font-family="sans-serif" font-size="11" fill="#FFFFFF">LLM: BYOK (user pays)</text><text x="430" y="97" font-family="sans-serif" font-size="11" fill="#888">$0</text>
  <rect x="40" y="112" width="400" height="28" rx="3" fill="#141414" stroke="#222" stroke-width="1"/>
  <text x="50" y="131" font-family="sans-serif" font-size="11" fill="#FFFFFF">Preprocessing: Python libraries</text><text x="430" y="131" font-family="sans-serif" font-size="11" fill="#888">$0</text>
  <text x="240" y="155" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ff2d00">Total: ~$5/month</text>
</svg>
<figcaption>Full cost stack: lean architecture eliminates every cost that doesn't directly improve user outcomes.</figcaption>
</figure>

Compare this to the naive architecture: managed Postgres ($20-50/mo), Redis ($15/mo), LLM API costs absorbed by the platform, plus the engineering overhead of managing all those services.

<div class="callout"><p>Lean AI architecture isn't about being cheap. It's about putting every dollar where it creates user value. Postgres doesn't make resumes better. Python preprocessing DOES make LLM outputs better AND cheaper. Spend where it matters.</p></div>

The same preprocessing-before-LLM principle applied to [Agentic PM](https://github.com/Arcanag/agentic-pm) — the decomposition agent doesn't send raw epic descriptions to Claude. It parses structure, identifies dependencies, and estimates complexity heuristically, only sending the ambiguous parts to the LLM.

<p class="statement">Token consciousness isn't premature optimization. It's product architecture.</p>

---

*Explore the preprocessing pipeline: [Career Enabler](https://github.com/Arcanag/career-enabler). See the multi-agent architecture: [Agentic PM](https://github.com/Arcanag/agentic-pm).*
