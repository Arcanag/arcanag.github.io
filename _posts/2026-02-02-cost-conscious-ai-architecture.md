---
layout: post
title: "Cost-Conscious AI Architecture: How to Stop Bleeding Tokens"
description: "Specific patterns for reducing LLM costs — Python preprocessing, zero-token ATS scoring, SQLite vs Postgres decisions, and BYOK as a business model."
category: "Technical Deep-Dive"
theme_color: "#4A9EFF"
hero_bg_word: "TOKENS"
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

<div class="cs-impact-strip">
  <div class="cs-impact-cell">
    <div class="cs-impact-value">$0</div>
    <div class="cs-impact-label">ATS Scoring Cost</div>
    <div class="cs-impact-desc">Zero-token scoring via Python NLP</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-value">~$5/mo</div>
    <div class="cs-impact-label">Infrastructure</div>
    <div class="cs-impact-desc">Two products, full stack</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-value">40-60%</div>
    <div class="cs-impact-label">Token Savings</div>
    <div class="cs-impact-desc">Delta-only prompting pattern</div>
  </div>
</div>

## The Token Bleed Problem
{: #the-token-bleed-problem}

<p class="cs-lead">Most AI products have a dirty secret: they send way too much text to the LLM. A typical resume is <strong>800-1200 words</strong>. A job description is <strong>500-1000 words</strong>. Concatenate both and send them to Claude with "make this resume match this JD" — you're burning <strong>2000+ input tokens</strong> per request before the model starts generating.</p>

Multiply that by thousands of users, and your API bill becomes your biggest cost center.

When I built [Career Enabler](https://github.com/Arcanag/career-enabler), I treated token cost as a first-class architecture constraint. The result: LLM calls receive only the structured delta between the resume and the job description, not the raw documents.


## The Preprocessing Pipeline
{: #the-preprocessing-pipeline}

<p class="cs-lead">Here's the actual pipeline that runs before any LLM call in Career Enabler:</p>

<figure class="mermaid-diagram" role="img" aria-label="Preprocessing pipeline: five free Python stages feed a structured delta to the LLM — the only paid step">
<svg viewBox="0 0 820 90" xmlns="http://www.w3.org/2000/svg">
  <!-- Stage 1: PDF Input -->
  <rect x="5" y="20" width="90" height="44" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="50" y="40" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e8eaed">PDF Input</text>
  <text x="50" y="55" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#7d8590">pdfplumber</text>
  <text x="50" y="75" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="#7d8590">$0</text>
  <!-- Arrow 1 -->
  <line x1="97" y1="42" x2="120" y2="42" stroke="#545d68" stroke-width="1.5" marker-end="url(#arrowhead)"/>
  <!-- Stage 2: NER -->
  <rect x="122" y="20" width="90" height="44" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="167" y="40" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e8eaed">NER</text>
  <text x="167" y="55" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#7d8590">spaCy</text>
  <text x="167" y="75" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="#7d8590">$0</text>
  <!-- Arrow 2 -->
  <line x1="214" y1="42" x2="237" y2="42" stroke="#545d68" stroke-width="1.5" marker-end="url(#arrowhead)"/>
  <!-- Stage 3: TF-IDF -->
  <rect x="239" y="20" width="90" height="44" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="284" y="40" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e8eaed">Keywords</text>
  <text x="284" y="55" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#7d8590">TF-IDF</text>
  <text x="284" y="75" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="#7d8590">$0</text>
  <!-- Arrow 3 -->
  <line x1="331" y1="42" x2="354" y2="42" stroke="#545d68" stroke-width="1.5" marker-end="url(#arrowhead)"/>
  <!-- Stage 4: Readability -->
  <rect x="356" y="20" width="90" height="44" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="401" y="40" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e8eaed">Readability</text>
  <text x="401" y="55" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#7d8590">textstat</text>
  <text x="401" y="75" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="#7d8590">$0</text>
  <!-- Arrow 4 -->
  <line x1="448" y1="42" x2="471" y2="42" stroke="#545d68" stroke-width="1.5" marker-end="url(#arrowhead)"/>
  <!-- Stage 5: Delta Prompt -->
  <rect x="473" y="20" width="100" height="44" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="523" y="40" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e8eaed">Delta Prompt</text>
  <text x="523" y="55" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#7d8590">structured</text>
  <text x="523" y="75" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="#7d8590">$0</text>
  <!-- Arrow 5 -->
  <line x1="575" y1="42" x2="598" y2="42" stroke="#545d68" stroke-width="1.5" marker-end="url(#arrowhead)"/>
  <!-- Stage 6: LLM (accent) -->
  <rect x="600" y="20" width="90" height="44" rx="4" fill="#161b22" stroke="#4A9EFF" stroke-width="2"/>
  <text x="645" y="40" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#4A9EFF">LLM</text>
  <text x="645" y="55" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#4A9EFF">Claude API</text>
  <text x="645" y="75" text-anchor="middle" font-family="sans-serif" font-size="9" font-weight="bold" fill="#4A9EFF">$$</text>
  <!-- Arrowhead marker -->
  <defs>
    <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#545d68"/>
    </marker>
  </defs>
</svg>
<figcaption>Five free Python stages extract, parse, compare, and score before the LLM sees anything. Only the final step costs money.</figcaption>
</figure>

**pdfplumber** extracts structured text from PDFs. **spaCy NER** pulls entities (names, orgs, skills, dates). **TF-IDF** produces a keyword gap analysis against the JD. **textstat** flags readability mismatches. All four run locally at zero cost — only the structured delta prompt hits the LLM:

```
Missing JD keywords: [Kubernetes, A/B testing, stakeholder management]
Readability gap: Resume grade 14, target grade 11
Weak bullets: [bullet 3 in job 1 — no quantified impact]
Task: Rewrite only the following 3 bullets to incorporate
missing keywords and improve readability.
```

<figure class="viz" role="img" aria-label="Token cost reduction: 2000 tokens naively vs 300 tokens with preprocessing">
<svg viewBox="0 0 700 110" xmlns="http://www.w3.org/2000/svg">
  <text x="30" y="32" font-family="sans-serif" font-size="11" fill="#7d8590">Naive</text>
  <rect x="110" y="15" width="540" height="28" rx="3" fill="#545d68"/>
  <text x="660" y="34" font-family="sans-serif" font-size="12" fill="#7d8590">2000 tokens</text>
  <text x="30" y="74" font-family="sans-serif" font-size="11" fill="#7d8590">Delta</text>
  <rect x="110" y="57" width="81" height="28" rx="3" fill="#4A9EFF" opacity="0.8"/>
  <text x="660" y="76" font-family="sans-serif" font-size="12" font-weight="bold" fill="#4A9EFF">~300 tokens</text>
  <text x="350" y="102" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#4A9EFF">~85% token reduction via preprocessing</text>
</svg>
<figcaption>Preprocessing eliminates ~85% of tokens before the LLM sees them — better output at a fraction of the cost.</figcaption>
</figure>

The LLM receives maybe 300 tokens of structured context instead of 2000 tokens of raw text. It generates better output because the problem is pre-digested, and it costs a fraction of the naive approach.

<div class="cs-statement reveal">Every token you send to an LLM should be a token that ONLY an LLM can process.</div>

<div class="callout"><p>If Python can handle it — keyword matching, readability scoring, entity extraction — Python should handle it.</p></div>

## Zero-Token ATS Scoring
{: #zero-token-ats-scoring}

<p class="cs-lead">Career Enabler's ATS compatibility score uses absolutely no LLM tokens. The entire scoring engine is deterministic Python:</p>

<div class="cs-impact-strip">
  <div class="cs-impact-cell">
    <div class="cs-impact-value">Parsability</div>
    <div class="cs-impact-label">Checks</div>
    <div class="cs-impact-desc">ATS section extraction, standard headers</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-value">Keywords</div>
    <div class="cs-impact-label">Matching</div>
    <div class="cs-impact-desc">TF-IDF cosine similarity, section-weighted</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-value">Formatting</div>
    <div class="cs-impact-label">Rules</div>
    <div class="cs-impact-desc">Layout detection, font inference, no graphics</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-value">Structure</div>
    <div class="cs-impact-label">Analysis</div>
    <div class="cs-impact-desc">Required sections, chronology, date formats</div>
  </div>
</div>

This runs in under 100ms and gives users an immediate score while the LLM-powered tailoring runs asynchronously. Users get fast feedback AND deep tailoring, but the fast part costs nothing.

## SQLite vs Postgres: A Framework
{: #sqlite-vs-postgres}

<p class="cs-lead">I built two products on the same day and chose different databases for each. That wasn't an accident.</p>

**Career Enabler uses SQLite** because it's a single-user tool, write concurrency is minimal, query patterns are simple CRUD, and there's zero operational overhead — no database server to manage, backup is a file copy.

**[Agentic PM](https://github.com/Arcanag/agentic-pm) uses Postgres** because multiple AI agents write concurrently, multi-tenant data isolation requires row-level security, complex queries join across agents/tasks/sprints, and the Monte Carlo simulation generates thousands of records.

<figure class="viz" role="img" aria-label="SQLite vs Postgres decision matrix based on concurrency and query complexity">
<svg viewBox="0 0 700 180" xmlns="http://www.w3.org/2000/svg">
  <text x="350" y="16" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#7d8590">Query Complexity →</text>
  <text x="16" y="100" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#7d8590" transform="rotate(-90 16 100)">Concurrency →</text>
  <rect x="80" y="30" width="270" height="65" rx="4" fill="#161b22" stroke="#ff2d00" stroke-width="1.5"/>
  <text x="215" y="55" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e8eaed">Low Concurrency + Simple</text>
  <text x="215" y="73" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#4A9EFF">SQLite</text>
  <text x="215" y="87" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#7d8590">Career Enabler</text>
  <rect x="370" y="30" width="270" height="65" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="505" y="55" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#7d8590">Low Concurrency + Complex</text>
  <text x="505" y="73" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#7d8590">Either</text>
  <rect x="80" y="105" width="270" height="65" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="215" y="130" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#7d8590">High Concurrency + Simple</text>
  <text x="215" y="148" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#7d8590">Postgres</text>
  <rect x="370" y="105" width="270" height="65" rx="4" fill="#161b22" stroke="#FFFFFF" stroke-width="1.5"/>
  <text x="505" y="130" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e8eaed">High Concurrency + Complex</text>
  <text x="505" y="148" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#e8eaed">Postgres</text>
  <text x="505" y="162" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#7d8590">Agentic PM</text>
</svg>
<figcaption>Database decision framework: concurrency and query complexity determine the right choice.</figcaption>
</figure>

<div class="callout"><p>The framework: assess four dimensions. (1) User concurrency — how many simultaneous writers? (2) Write patterns — simple CRUD or complex transactions? (3) Query complexity — single-table lookups or multi-join analytics? (4) Ops budget — can you afford a database server? If all four answer "simple," SQLite is the right choice.</p></div>

## BYOK as Cost Architecture
{: #byok-as-cost-architecture}

<p class="cs-lead">Career Enabler uses a Bring Your Own Key model for LLM access. This isn't just a pricing decision — it's an architecture decision:</p>

<ul class="cs-body-list">
  <li><strong>Cost elimination</strong> — No margin calculation on token usage, no throttling heavy users, no surprise bills.</li>
  <li><strong>Trust simplification</strong> — Users control their own data flow directly to the LLM provider.</li>
  <li><strong>Pricing clarity</strong> — Platform charges $9/month. LLM costs are transparent and separate.</li>
  <li><strong>Scaling decoupled from costs</strong> — Server costs scale with compute (cheap), not LLM consumption (expensive).</li>
</ul>

<figure class="mermaid-diagram" role="img" aria-label="BYOK trust flow: API key travels from user to server to Claude API, never exposed to the browser">
<svg viewBox="0 0 720 120" xmlns="http://www.w3.org/2000/svg">
  <!-- User -->
  <rect x="20" y="25" width="100" height="44" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="70" y="45" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e8eaed">User</text>
  <text x="70" y="59" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#7d8590">enters API key</text>
  <!-- Arrow 1 -->
  <line x1="122" y1="47" x2="168" y2="47" stroke="#545d68" stroke-width="1.5" marker-end="url(#arrowhead2)"/>
  <!-- Browser -->
  <rect x="170" y="25" width="100" height="44" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="220" y="45" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e8eaed">Browser</text>
  <text x="220" y="59" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#7d8590">sends to server</text>
  <!-- Arrow 2 -->
  <line x1="272" y1="47" x2="318" y2="47" stroke="#545d68" stroke-width="1.5" marker-end="url(#arrowhead2)"/>
  <!-- Server -->
  <rect x="320" y="25" width="140" height="44" rx="4" fill="#161b22" stroke="#4A9EFF" stroke-width="2"/>
  <text x="390" y="42" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#e8eaed">Server</text>
  <text x="390" y="58" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#4A9EFF">encrypted key storage</text>
  <!-- Arrow 3 -->
  <line x1="462" y1="47" x2="508" y2="47" stroke="#545d68" stroke-width="1.5" marker-end="url(#arrowhead2)"/>
  <!-- Claude API -->
  <rect x="510" y="25" width="110" height="44" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="565" y="45" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e8eaed">Claude API</text>
  <text x="565" y="59" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#7d8590">LLM call</text>
  <!-- Label -->
  <text x="360" y="100" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#4A9EFF">API key never leaves the server</text>
  <!-- Arrowhead marker -->
  <defs>
    <marker id="arrowhead2" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#545d68"/>
    </marker>
  </defs>
</svg>
<figcaption>The BFF proxy pattern: API keys are encrypted server-side, with rate limiting to prevent accidental token burns from UI bugs.</figcaption>
</figure>

The tradeoff is onboarding friction, but for technical professionals transitioning roles, getting an API key is a 2-minute task.

## Putting It Together
{: #putting-it-together}

<p class="cs-lead">The full cost architecture:</p>


<ul class="cs-body-list">
  <li><strong>Compute</strong>: Single-container app. No database server, no Redis, no message queue.</li>
  <li><strong>LLM costs</strong>: Borne by the user via BYOK. Product cost is $0 per LLM call.</li>
  <li><strong>Preprocessing</strong>: All Python libraries. No API costs.</li>
  <li><strong>Storage</strong>: SQLite file + uploaded PDFs. Megabytes, not gigabytes.</li>
</ul>

<figure class="viz" role="img" aria-label="Cost architecture stack totaling approximately 5 dollars per month">
<svg viewBox="0 0 700 160" xmlns="http://www.w3.org/2000/svg">
  <rect x="40" y="10" width="400" height="28" rx="3" fill="#161b22" stroke="#21262d" stroke-width="1"/>
  <text x="50" y="29" font-family="sans-serif" font-size="11" fill="#e8eaed">Compute: single container</text><text x="430" y="29" font-family="sans-serif" font-size="11" fill="#4A9EFF">~$5/mo</text>
  <rect x="40" y="44" width="400" height="28" rx="3" fill="#161b22" stroke="#21262d" stroke-width="1"/>
  <text x="50" y="63" font-family="sans-serif" font-size="11" fill="#e8eaed">Database: SQLite</text><text x="430" y="63" font-family="sans-serif" font-size="11" fill="#7d8590">$0</text>
  <rect x="40" y="78" width="400" height="28" rx="3" fill="#161b22" stroke="#21262d" stroke-width="1"/>
  <text x="50" y="97" font-family="sans-serif" font-size="11" fill="#e8eaed">LLM: BYOK (user pays)</text><text x="430" y="97" font-family="sans-serif" font-size="11" fill="#7d8590">$0</text>
  <rect x="40" y="112" width="400" height="28" rx="3" fill="#161b22" stroke="#21262d" stroke-width="1"/>
  <text x="50" y="131" font-family="sans-serif" font-size="11" fill="#e8eaed">Preprocessing: Python libraries</text><text x="430" y="131" font-family="sans-serif" font-size="11" fill="#7d8590">$0</text>
  <text x="240" y="155" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#4A9EFF">Total: ~$5/month</text>
</svg>
<figcaption>Full cost stack: lean architecture eliminates every cost that doesn't directly improve user outcomes.</figcaption>
</figure>

Compare this to the naive architecture: managed Postgres ($20-50/mo), Redis ($15/mo), LLM API costs absorbed by the platform, plus the engineering overhead of managing all those services.

<div class="callout"><p>Lean AI architecture isn't about being cheap. It's about putting every dollar where it creates user value. Postgres doesn't make resumes better. Python preprocessing DOES make LLM outputs better AND cheaper. Spend where it matters.</p></div>

The same preprocessing-before-LLM principle applied to [Agentic PM](https://github.com/Arcanag/agentic-pm) — the decomposition agent doesn't send raw epic descriptions to Claude. It parses structure, identifies dependencies, and estimates complexity heuristically, only sending the ambiguous parts to the LLM.

<div class="cs-statement reveal">Token consciousness isn't premature optimization. It's product architecture.</div>

---

*Explore the preprocessing pipeline: [Career Enabler](https://github.com/Arcanag/career-enabler). See the multi-agent architecture: [Agentic PM](https://github.com/Arcanag/agentic-pm).*
