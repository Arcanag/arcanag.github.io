---
layout: case-study
title: "Designing an AI Project Management OS with 6 Specialized Agents"
description: "A product case study on architecting a multi-agent system that automates PM operational work — requirement parsing, task decomposition, team routing, timeline forecasting, and client communication."
theme_color: "#7C3AED"
hero_bg_word: "AGENTS"
category: "AI Product — Multi-Agent System Design"
key_metric: "6 agents &middot; 81+ tests &middot; 40-60% automated"
read_time: "11 min read"
date: 2026-03-22
toc:
  - title: "The Problem"
    anchor: "the-problem"
  - title: "System Design"
    anchor: "system-design"
  - title: "The 6 Agents"
    anchor: "the-6-agents"
  - title: "Multi-Channel Intelligence"
    anchor: "multi-channel-intelligence"
  - title: "Honest Assessment"
    anchor: "honest-assessment"
  - title: "Things I'd Do Differently"
    anchor: "things-id-do-differently"
---

<div class="cs-impact-strip">
  <div class="cs-impact-cell">
    <div class="cs-impact-value">6</div>
    <div class="cs-impact-label">AI Agents</div>
    <div class="cs-impact-desc">Specialized for PM workflow automation</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-value">81+</div>
    <div class="cs-impact-label">Tests</div>
    <div class="cs-impact-desc">Across 19 PRs in Turborepo monorepo</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-value">40-60%</div>
    <div class="cs-impact-label">PM Overhead Automated</div>
    <div class="cs-impact-desc">Parsing, routing, forecasting, comms</div>
  </div>
</div>

## The Problem: PM Overhead Scaling
{: #the-problem}

<p class="cs-lead">After years of managing delivery for AI products, I had seen a painful pattern repeat across every project: <strong>the operational overhead of project management scales linearly with team size, but it shouldn't.</strong></p>

Requirements come through email, Slack, and meetings in messy, unstructured formats. Breaking them into actionable tasks is mechanical. Assigning those tasks based on skills and capacity is a simple lookup problem. Status reports? Pure aggregation.

None of this requires human judgment. **Yet PMs spend 40-60% of their time trapped in these tasks.** Without a system to handle the operational layer, product managers become glorified task routers, losing the bandwidth needed for strategy, stakeholder alignment, and actual product decisions.

**The Solution:** I built what I kept wishing existed — an AI system that entirely automates the operational layer of project management.

<div class="cs-statement reveal">The constraint was clear: automate the mechanical, preserve the judgment. Every agent boundary was drawn at the line where human product thinking begins.</div>

Agentic PM is that system: 6 specialized AI agents that automate the PM workflow from requirement intake to timeline forecasting. But here's what nobody expected when building this architecture...


## System Design
{: #system-design}

<div class="cs-statement reveal">Multi-agent systems should be composed of specialists, not one general-purpose agent trying to do everything.</div>

The architecture reflects this core belief.

Each agent has a **single responsibility**, a well-defined **input/output contract**, and can be **tested independently**.

The agents compose into a pipeline, but they are not tightly coupled:
- You can use the **Requirement Parser** without the Decomposition Agent.
- You can use the **Communication Agent** without the Timeline Agent.

<figure class="viz" role="img" aria-label="6-agent pipeline: Requirement Parser to Decomposition to Routing, branching to Communication, Chat, and Timeline">
<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="80" width="120" height="40" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="70" y="96" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e8eaed">Requirement</text>
  <text x="70" y="110" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e8eaed">Parser</text>
  <line x1="130" y1="100" x2="160" y2="100" stroke="#545d68" stroke-width="1.5"/><polygon points="160,96 168,100 160,104" fill="#545d68"/>
  <rect x="168" y="80" width="120" height="40" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="228" y="96" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e8eaed">Decomposition</text>
  <text x="228" y="110" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e8eaed">Agent</text>
  <line x1="288" y1="100" x2="318" y2="100" stroke="#545d68" stroke-width="1.5"/><polygon points="318,96 326,100 318,104" fill="#545d68"/>
  <rect x="326" y="80" width="100" height="40" rx="4" fill="#161b22" stroke="#7C3AED" stroke-width="1.5"/>
  <text x="376" y="105" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#e8eaed">Routing</text>
  <line x1="426" y1="100" x2="456" y2="100" stroke="#545d68" stroke-width="1.5"/>
  <line x1="456" y1="100" x2="456" y2="35" stroke="#545d68" stroke-width="1.5"/>
  <line x1="456" y1="35" x2="486" y2="35" stroke="#545d68" stroke-width="1.5"/><polygon points="486,31 494,35 486,39" fill="#545d68"/>
  <line x1="456" y1="100" x2="486" y2="100" stroke="#545d68" stroke-width="1.5"/><polygon points="486,96 494,100 486,104" fill="#545d68"/>
  <line x1="456" y1="100" x2="456" y2="165" stroke="#545d68" stroke-width="1.5"/>
  <line x1="456" y1="165" x2="486" y2="165" stroke="#545d68" stroke-width="1.5"/><polygon points="486,161 494,165 486,169" fill="#545d68"/>
  <rect x="494" y="15" width="120" height="40" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="554" y="40" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e8eaed">Communication</text>
  <rect x="494" y="80" width="120" height="40" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="554" y="105" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e8eaed">Chat Agent</text>
  <rect x="494" y="145" width="120" height="40" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="554" y="170" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#e8eaed">Timeline Agent</text>
</svg>
<figcaption>6-agent pipeline: requirements flow through parsing, decomposition, and routing before dispatch to specialist agents.</figcaption>
</figure>

<div class="testimonial">
  <p class="testimonial__sentiment">ARCHITECTURE INSIGHT</p>
  <p class="testimonial__quote">"The hardest decisions in multi-agent design aren't technical — they're about where one agent's responsibility ends and another's begins. Get the boundaries wrong and you build a monolith wearing a microservices costume."</p>
  <p class="testimonial__attribution">— Reflection from building the 6-agent pipeline</p>
</div>

### Architecture

<figure class="mermaid-diagram" role="img" aria-label="System architecture: Turborepo monorepo with Next.js frontend, BFF proxy, FastAPI backend, Supabase, and Claude AI">
<svg viewBox="0 0 700 280" xmlns="http://www.w3.org/2000/svg">
  <!-- User -->
  <rect x="10" y="110" width="80" height="40" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="50" y="135" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#e8eaed">User</text>

  <!-- Arrow -->
  <line x1="90" y1="130" x2="130" y2="130" stroke="#545d68" stroke-width="1.5"/>
  <polygon points="130,126 138,130 130,134" fill="#545d68"/>

  <!-- Next.js / BFF -->
  <rect x="140" y="80" width="130" height="100" rx="4" fill="#161b22" stroke="#7C3AED" stroke-width="1.5"/>
  <text x="205" y="105" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#e8eaed">Next.js 15</text>
  <text x="205" y="122" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#7d8590">App Router + UI</text>
  <line x1="160" y1="135" x2="250" y2="135" stroke="#21262d" stroke-width="1"/>
  <text x="205" y="155" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#7C3AED">BFF Proxy</text>
  <text x="205" y="170" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#7d8590">API keys never reach client</text>

  <!-- Arrow -->
  <line x1="270" y1="130" x2="310" y2="130" stroke="#545d68" stroke-width="1.5"/>
  <polygon points="310,126 318,130 310,134" fill="#545d68"/>

  <!-- FastAPI -->
  <rect x="320" y="80" width="130" height="100" rx="4" fill="#161b22" stroke="#7C3AED" stroke-width="1.5"/>
  <text x="385" y="105" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#e8eaed">FastAPI</text>
  <text x="385" y="122" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#7d8590">Python, async</text>
  <line x1="340" y1="135" x2="430" y2="135" stroke="#21262d" stroke-width="1"/>
  <text x="385" y="155" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#7C3AED">6 AI Agents</text>
  <text x="385" y="170" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#7d8590">81+ tests</text>

  <!-- Arrow to Supabase -->
  <line x1="450" y1="110" x2="500" y2="60" stroke="#545d68" stroke-width="1.5"/>
  <polygon points="498,55 506,58 500,64" fill="#545d68"/>

  <!-- Supabase -->
  <rect x="500" y="20" width="120" height="50" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="560" y="42" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#e8eaed">Supabase</text>
  <text x="560" y="58" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#7d8590">PostgreSQL + Auth</text>

  <!-- Arrow to Claude -->
  <line x1="450" y1="150" x2="500" y2="200" stroke="#545d68" stroke-width="1.5"/>
  <polygon points="498,204 506,202 500,196" fill="#545d68"/>

  <!-- Claude -->
  <rect x="500" y="190" width="120" height="50" rx="4" fill="#161b22" stroke="#7C3AED" stroke-width="1.5"/>
  <text x="560" y="212" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#e8eaed">Claude API</text>
  <text x="560" y="228" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#7d8590">BYOK encrypted keys</text>

  <!-- Monorepo label -->
  <rect x="130" y="240" width="330" height="30" rx="4" fill="none" stroke="#21262d" stroke-width="1" stroke-dasharray="4"/>
  <text x="295" y="260" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#545d68">Turborepo monorepo: 5 packages (web, api, db, ui, types)</text>
</svg>
<figcaption>System architecture — BFF proxy pattern with encrypted BYOK keys, multi-tenant Supabase, and 6 specialized AI agents.</figcaption>
</figure>

The Next.js app acts as a BFF proxy — API keys never reach the client. PR AP-21 collapsed 450 lines of duplicated proxy code into 100 lines of clean middleware. The Prisma schema supports full multi-tenancy with organization-based data isolation, task hierarchy with dependency tracking, RACI matrix support, and integration configs for Jira, GitHub, Slack, and Google.

<div class="callout">
<strong>Why this schema matters:</strong> The data model IS the product. A multi-agent PM tool without proper dependency tracking, RACI support, and audit trails is a toy. The schema was designed before the first agent was built.
</div>

## The 6 Agents
{: #the-6-agents}

<p class="cs-lead">Each agent is designed around a specific PM operational task. Here is what they do and the product thinking behind each one.</p>

### 1. Requirement Parser

<div class="cs-impact-strip">
  <div class="cs-impact-cell">
    <div class="cs-impact-label">Input</div>
    <div class="cs-impact-value">Unstructured Text</div>
    <div class="cs-impact-desc">Email, Slack, meeting notes, manual entry</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-label">Output</div>
    <div class="cs-impact-value">Structured Requirement</div>
    <div class="cs-impact-desc">Title, priority, acceptance criteria, clarification questions</div>
  </div>
</div>

The parser identifies what is *missing*. If a client says "we need a dashboard," it generates clarification questions: What metrics? Who is the audience? What refresh frequency?

### 2. Decomposition Agent

<div class="cs-impact-strip">
  <div class="cs-impact-cell">
    <div class="cs-impact-label">Input</div>
    <div class="cs-impact-value">Requirement</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-label">Output</div>
    <div class="cs-impact-value">Epic &rarr; Story &rarr; Task</div>
    <div class="cs-impact-desc">INVEST-validated with story points</div>
  </div>
</div>

Takes a high-level requirement and produces a full work breakdown structure. Stories that fail INVEST validation are flagged with specific reasons.

<div class="cs-impact-strip">
  <div class="cs-impact-cell">
    <div class="cs-impact-value">4</div>
    <div class="cs-impact-label">Hierarchy Levels</div>
    <div class="cs-impact-desc">Epic &gt; Feature &gt; Story &gt; Task</div>
  </div>
</div>

### 3. Routing Agent

<div class="cs-impact-strip">
  <div class="cs-impact-cell">
    <div class="cs-impact-label">Input</div>
    <div class="cs-impact-value">Tasks + Profiles</div>
    <div class="cs-impact-desc">Skills, capacity, current workload</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-label">Output</div>
    <div class="cs-impact-value">RACI Assignments</div>
    <div class="cs-impact-desc">+ key person risk analysis</div>
  </div>
</div>

<div class="cs-impact-strip">
  <div class="cs-impact-cell">
    <div class="cs-impact-value">Expertise</div>
    <div class="cs-impact-label">Match</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-value">Capacity</div>
    <div class="cs-impact-label">Availability</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-value">Dependency</div>
    <div class="cs-impact-label">Awareness</div>
  </div>
</div>

Flags key person risk — when a single team member is the only one who can deliver a critical task.

### 4. Communication Agent

<div class="cs-impact-strip">
  <div class="cs-impact-cell">
    <div class="cs-impact-label">Input</div>
    <div class="cs-impact-value">Project State</div>
    <div class="cs-impact-desc">Tasks, progress, blockers, milestones</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-label">Output</div>
    <div class="cs-impact-value">Status Reports</div>
    <div class="cs-impact-desc">Progress, risks, action items with owners</div>
  </div>
</div>

The most time-consuming zero-creativity PM task — automated with structured insights.

### 5. Chat Agent

<div class="cs-impact-strip">
  <div class="cs-impact-cell">
    <div class="cs-impact-label">Input</div>
    <div class="cs-impact-value">Natural Language</div>
    <div class="cs-impact-desc">Questions about the project</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-label">Output</div>
    <div class="cs-impact-value">Contextual Answers</div>
    <div class="cs-impact-desc">Grounded in project data</div>
  </div>
</div>

Instead of digging through Jira filters: "What is blocking the payment integration?" or "Which team members are overallocated this sprint?"

### 6. Timeline Agent

<div class="cs-impact-strip">
  <div class="cs-impact-cell">
    <div class="cs-impact-label">Input</div>
    <div class="cs-impact-value">Task Graph</div>
    <div class="cs-impact-desc">Estimates, dependencies, assignments</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-label">Output</div>
    <div class="cs-impact-value">Monte Carlo</div>
    <div class="cs-impact-desc">P50/P75/P90 dates + critical path</div>
  </div>
</div>

Instead of producing a single delivery date (which is always wrong), the Timeline Agent runs Monte Carlo simulations across the task graph, accounting for estimation uncertainty and dependency chains.

<ul class="cs-body-list">
  <li><strong>P50:</strong> 50% chance of completing by this date (aggressive)</li>
  <li><strong>P75:</strong> 75% chance (realistic)</li>
  <li><strong>P90:</strong> 90% chance (conservative)</li>
</ul>

<figure class="viz" role="img" aria-label="Monte Carlo distribution with P50, P75, and P90 confidence intervals">
<svg viewBox="0 0 700 180" xmlns="http://www.w3.org/2000/svg">
  <path d="M 60,145 C 110,140 170,118 230,60 C 275,28 300,22 340,22 C 380,28 405,60 445,90 C 490,118 520,140 560,145" fill="#161b22" stroke="#FFFFFF" stroke-width="1.5"/>
  <line x1="50" y1="145" x2="570" y2="145" stroke="#333" stroke-width="1"/>
  <line x1="340" y1="20" x2="340" y2="145" stroke="#7C3AED" stroke-width="1.5" stroke-dasharray="5,4"/>
  <line x1="420" y1="65" x2="420" y2="145" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="5,4"/>
  <line x1="490" y1="118" x2="490" y2="145" stroke="#888" stroke-width="1.5" stroke-dasharray="5,4"/>
  <text x="340" y="163" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#7C3AED">P50</text>
  <text x="340" y="176" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#7C3AED">Aggressive</text>
  <text x="420" y="163" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#e8eaed">P75</text>
  <text x="420" y="176" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#e8eaed">Realistic</text>
  <text x="490" y="163" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#7d8590">P90</text>
  <text x="490" y="176" text-anchor="middle" font-family="sans-serif" font-size="9" fill="#7d8590">Conservative</text>
</svg>
<figcaption>Monte Carlo simulation: 1,000 iterations produce a probability distribution. P50/P75/P90 mark delivery confidence levels.</figcaption>
</figure>

<div class="callout">
<strong>Product insight:</strong> Shipping dates are not single points — they are probability distributions. Any PM tool that gives you one date is lying to you. Monte Carlo forecasting makes uncertainty explicit, which is what stakeholders actually need for planning.
</div>

## Multi-Channel Intelligence
{: #multi-channel-intelligence}

<p class="cs-lead">Requirements do not arrive in neat forms. They come through email threads, Slack messages, and Jira tickets. Agentic PM meets requirements where they live.</p>

### Gmail Integration (PRs AP-11, AP-12)

The system monitors a configured Gmail inbox for emails matching project-related patterns. When a client emails a feature request, the Requirement Parser automatically extracts structured requirements and creates draft items for PM review.

### Slack Integration (PR AP-13)

Messages in designated channels are parsed for requirement signals. A product manager saying "client X wants SSO support by Q3" in Slack becomes a structured requirement with priority, acceptance criteria gaps, and clarification questions — automatically.

### Jira Integration (PR AP-14)

Requirements created in Agentic PM can push to Jira as epics and stories. Updates in Jira reflect back. Teams should not have to abandon their existing tools.

<div class="cs-impact-strip">
  <div class="cs-impact-cell">
    <div class="cs-impact-value">4</div>
    <div class="cs-impact-label">Intake Channels</div>
    <div class="cs-impact-desc">Gmail, Slack, Jira, and direct input</div>
  </div>
</div>

<figure class="viz" role="img" aria-label="Multi-channel intake: Gmail, Slack, and Jira converge into the Requirement Parser">
<svg viewBox="0 0 700 140" xmlns="http://www.w3.org/2000/svg">
  <rect x="30" y="10" width="90" height="32" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="75" y="31" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e8eaed">Gmail</text>
  <rect x="30" y="54" width="90" height="32" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="75" y="75" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e8eaed">Slack</text>
  <rect x="30" y="98" width="90" height="32" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="75" y="119" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e8eaed">Jira</text>
  <line x1="120" y1="26" x2="310" y2="70" stroke="#545d68" stroke-width="1.5"/>
  <line x1="120" y1="70" x2="310" y2="70" stroke="#545d68" stroke-width="1.5"/>
  <line x1="120" y1="114" x2="310" y2="70" stroke="#545d68" stroke-width="1.5"/>
  <polygon points="310,66 318,70 310,74" fill="#545d68"/>
  <rect x="318" y="48" width="160" height="44" rx="4" fill="#161b22" stroke="#7C3AED" stroke-width="1.5"/>
  <text x="398" y="66" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e8eaed">Requirement</text>
  <text x="398" y="82" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e8eaed">Parser</text>
</svg>
<figcaption>Three intake channels converge into the Requirement Parser for unified processing.</figcaption>
</figure>

## Honest Assessment
{: #honest-assessment}

<p class="cs-lead">Here is where the system falls short.</p>

### What Is Weak

<ul class="cs-body-list">
  <li><strong>Agent orchestration is linear.</strong> The agents work in sequence, but real PM workflows are not linear. A change in timeline should trigger re-routing, which should update the communication report. This feedback loop does not exist yet.</li>
  <li><strong>LLM output consistency.</strong> The Decomposition Agent occasionally produces stories that are too large or too vague. The INVEST validation catches some of these, but not all.</li>
  <li><strong>No production deployment.</strong> This runs locally. No CI/CD pipeline, no staging environment, no monitoring.</li>
  <li><strong>Monte Carlo accuracy is unvalidated.</strong> The simulation parameters are based on industry heuristics, not calibrated data from actual project outcomes.</li>
  <li><strong>Multi-channel intake is MVP.</strong> The Gmail and Slack integrations capture messages, but signal-to-noise filtering is basic.</li>
</ul>

### What I Would Do Differently

<ul class="cs-body-list">
  <li><strong>Over-engineered v1</strong> — The 6-agent architecture is more complex than a v1 needs. A 3-agent system (Decomposition, Routing, Timeline) would have delivered 80% of the value.</li>
  <li><strong>Missing event-driven orchestration</strong> — The current linear pipeline means a timeline change doesn't cascade to routing or communication. An event bus would close this loop.</li>
  <li><strong>No real-world validation</strong> — Deploy to a real team for 2 sprints and measure time saved, decomposition accuracy, and forecast calibration before adding more agents.</li>
  <li><strong>No feedback loop</strong> — PMs should be able to rate agent outputs, creating training data for prompt improvement over time.</li>
</ul>

<div class="callout">
<strong>The gap that matters most:</strong> Without validation against real project data, this is a well-architected demo. The path from demo to product requires deploying with a real team, measuring outcomes, and iterating on agent prompts based on actual PM feedback.
</div>

## Things I'd Do Differently
{: #things-id-do-differently}

### 1. Multi-Agent Design Is a Product Problem, Not an Engineering Problem

The hardest decisions were not technical. They were: How many agents? What is each agent's boundary? When does one agent's output become another's input? These are product decomposition questions disguised as architecture questions.

### 2. The Schema Is the Product

<div class="cs-statement reveal">The data model IS the product. Schema-first design is underrated.</div>

I spent more time on the Prisma schema than on any individual agent. The data model — with its dependency tracking, RACI support, confidence intervals, and audit trail — defines what the product can and cannot do.

### 3. Testing AI Systems Requires a Different Strategy

The 81+ tests break down as: 55 API tests (deterministic behavior), 12 frontend tests (component rendering), and 14 LLM mock tests (agent behavior with controlled inputs). You cannot assert on exact LLM output, so tests validate structure, required fields, and constraint satisfaction. This is a testing philosophy refined through years of evaluating non-deterministic AI systems in production.

### 4. BFF Proxy Is Non-Negotiable for AI Products

The refactor from 450 lines of scattered proxy code to 100 lines of clean BFF middleware was one of the highest-ROI changes. In any AI product where users provide API keys, the frontend must never touch those keys directly.

### 5. Building Both Products in One Day Proved a Thesis

Career Enabler and Agentic PM were both built on the same day — a compressed timeline that was possible because of years of production experience with AI systems, not because the work was trivial.

> The role of the human in AI-assisted development shifts from implementation to product judgment — deciding what to build, how to scope it, and where to cut corners deliberately.

---

