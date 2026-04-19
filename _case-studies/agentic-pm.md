---
layout: case-study
title: "Designing an AI Management System with Specialized Agents"
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

None of this requires human judgment. Without a system to handle the operational layer, product managers become glorified task routers, losing the bandwidth needed for strategy, stakeholder alignment, and actual product decisions.

<div class="cs-impact-strip">
  <div class="cs-impact-cell">
    <div class="cs-impact-value">40–60%</div>
    <div class="cs-impact-label">PM Time Lost</div>
    <div class="cs-impact-desc">Spent on mechanical operational tasks that require no human judgment</div>
  </div>
</div>

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

The Next.js app acts as a BFF proxy — API keys never reach the client. The Prisma schema supports full multi-tenancy with organization-based data isolation, task hierarchy with dependency tracking, RACI matrix support, and integration configs for Jira, GitHub, Slack, and Google.

<div class="callout">
<strong>Why this schema matters:</strong> The data model IS the product. The schema was designed before the first agent was built — and it shows. Every AI capability traces back to a structural decision.
</div>

<figure class="mermaid-diagram mermaid-diagram--wide" role="img" aria-label="Schema diagram showing Team Workspace as root with Team Member credentials, Client Request lifecycle, Work Item hierarchy with Blockers and Team Assignments, Deadline confidence bands, and AI Action Log with AI Alerts">
<img src="/assets/images/case-studies/16-agentic-pm-schema.svg" alt="Agentic PM data model: Team Workspace branches into Team Member (personal AI credentials), Client Request (captured from email, Slack, or meetings, with AI-generated follow-up questions), Work Item (subtasks, blockers, team assignments with clear ownership), Deadline (three confidence-level dates), and AI Action Log (every AI decision recorded, with self-expiring alerts)" />
<figcaption>Schema-first design — every AI capability maps back to a structural decision in the data model.</figcaption>
</figure>

Every box in this diagram is a category of information the system stores. Starting from the centre — a **Team Workspace** holds all projects, people, and activity. Each **Team Member** connects their own AI credentials so the system can act on their behalf. **Client Requests** are captured automatically from email, Slack, or meetings and held until a PM reviews them — with AI-generated follow-up questions attached to fill any gaps. Each request breaks down into **Work Items** with clear **Blockers** (what must finish first) and **Team Assignments** (who is responsible, who approves, and who just needs to be kept informed). **Deadlines** are stored as three dates — optimistic, realistic, and conservative — rather than a single date that is always wrong. Finally, every decision the AI makes is recorded in an **AI Action Log**, which generates **Alerts** that flag risks and automatically expire once resolved so the feed stays clean.

## The 6 Agents
{: #the-6-agents}

<p class="cs-lead">Each agent is designed around a specific PM operational task. Here is what they do and the product thinking behind each one.</p>

<div class="outcome-grid">
  <div class="outcome-card">
    <div class="outcome-card__title">Requirement Parser</div>
    <div class="outcome-card__metric">Unstructured → Structured</div>
    <div class="outcome-card__desc">Parses email, Slack, and meeting notes into titled requirements with priority and acceptance criteria. Identifies what is missing — and generates the clarification questions a PM would ask.</div>
  </div>
  <div class="outcome-card">
    <div class="outcome-card__title">Decomposition Agent</div>
    <div class="outcome-card__metric">Requirement → Epic → Story → Task</div>
    <div class="outcome-card__desc">Produces a full 4-level work breakdown structure from a single requirement. Stories that fail INVEST validation are flagged with specific reasons, not silently accepted.</div>
  </div>
  <div class="outcome-card">
    <div class="outcome-card__title">Routing Agent</div>
    <div class="outcome-card__metric">Tasks → RACI Assignments</div>
    <div class="outcome-card__desc">Assigns work by weighing expertise match, sprint capacity, and dependency awareness. Flags key person risk when a single team member is the only one who can deliver a critical task.</div>
  </div>
  <div class="outcome-card">
    <div class="outcome-card__title">Communication Agent</div>
    <div class="outcome-card__metric">Project State → Status Report</div>
    <div class="outcome-card__desc">Aggregates tasks, progress, blockers, and milestones into structured client-ready reports. The most time-consuming zero-creativity PM task, automated.</div>
  </div>
  <div class="outcome-card">
    <div class="outcome-card__title">Chat Agent</div>
    <div class="outcome-card__metric">Natural Language → Project Answers</div>
    <div class="outcome-card__desc">Answers questions grounded in live project data — "What is blocking the payment integration?" or "Who is overallocated this sprint?" — without touching a Jira filter.</div>
  </div>
  <div class="outcome-card">
    <div class="outcome-card__title">Timeline Agent</div>
    <div class="outcome-card__metric">Task Graph → P50 / P75 / P90</div>
    <div class="outcome-card__desc">Runs Monte Carlo simulations across the dependency graph to produce confidence-banded delivery dates. Replaces the single-date estimate, which is always wrong.</div>
  </div>
</div>


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

<div class="decision-grid" role="img" aria-label="Three intake integrations: Gmail, Slack, and Jira">
  <div class="decision-card" style="border-color:#7C3AED">
    <div class="decision-card__title">Gmail</div>
    <div class="decision-card__row"><span class="decision-card__label">Signal</span><span class="decision-card__value">Client emails</span></div>
    <div class="decision-card__row"><span class="decision-card__label">How</span><span class="decision-card__value">Inbox monitoring for project patterns</span></div>
    <div class="decision-card__row"><span class="decision-card__label">Output</span><span class="decision-card__value">Draft requirements for PM review</span></div>
  </div>
  <div class="decision-card" style="border-color:#7C3AED">
    <div class="decision-card__title">Slack</div>
    <div class="decision-card__row"><span class="decision-card__label">Signal</span><span class="decision-card__value">Channel messages</span></div>
    <div class="decision-card__row"><span class="decision-card__label">How</span><span class="decision-card__value">Parses requirement signals in real time</span></div>
    <div class="decision-card__row"><span class="decision-card__label">Output</span><span class="decision-card__value">Structured requirement with priority + gaps</span></div>
  </div>
  <div class="decision-card" style="border-color:#7C3AED">
    <div class="decision-card__title">Jira</div>
    <div class="decision-card__row"><span class="decision-card__label">Signal</span><span class="decision-card__value">Existing tickets</span></div>
    <div class="decision-card__row"><span class="decision-card__label">How</span><span class="decision-card__value">Bi-directional sync of epics and stories</span></div>
    <div class="decision-card__row"><span class="decision-card__label">Output</span><span class="decision-card__value">Teams keep their existing workflow</span></div>
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
  <path d="M 120,26 C 215,26 215,70 310,70" fill="none" stroke="#545d68" stroke-width="1.5"/>
  <path d="M 120,70 L 310,70" fill="none" stroke="#545d68" stroke-width="1.5"/>
  <path d="M 120,114 C 215,114 215,70 310,70" fill="none" stroke="#545d68" stroke-width="1.5"/>
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

<div class="lesson-grid">
  <div class="lesson-card">
    <span class="lesson-card__number">01</span>
    <div class="lesson-card__title">Linear Orchestration</div>
    <div class="lesson-card__body">The agents work in sequence, but real PM workflows are not linear. A timeline change should trigger re-routing, which should update the communication report. This feedback loop does not exist yet.</div>
  </div>
  <div class="lesson-card">
    <span class="lesson-card__number">02</span>
    <div class="lesson-card__title">LLM Output Consistency</div>
    <div class="lesson-card__body">The Decomposition Agent occasionally produces stories that are too large or too vague. INVEST validation catches some of these, but structural checks can't catch intent drift.</div>
  </div>
  <div class="lesson-card">
    <span class="lesson-card__number">03</span>
    <div class="lesson-card__title">No Production Deployment</div>
    <div class="lesson-card__body">The system runs locally. There is no CI/CD pipeline, no staging environment, and no monitoring. The architecture is production-ready; the deployment is not.</div>
  </div>
  <div class="lesson-card">
    <span class="lesson-card__number">04</span>
    <div class="lesson-card__title">Unvalidated Monte Carlo</div>
    <div class="lesson-card__body">Simulation parameters are based on industry heuristics, not calibrated against actual project outcomes. The model is structurally correct but not yet empirically grounded.</div>
  </div>
  <div class="lesson-card" style="grid-column: 1 / -1">
    <span class="lesson-card__number">05</span>
    <div class="lesson-card__title">Multi-Channel Intake is MVP</div>
    <div class="lesson-card__body">Gmail and Slack integrations capture messages, but signal-to-noise filtering is basic. A PM channel with 200 messages a day would surface too many false positives to be useful.</div>
  </div>
</div>

<div class="callout">
<strong>The gap that matters most:</strong> Without validation against real project data, this is a well-architected demo. The path from demo to product requires deploying with a real team, measuring outcomes, and iterating on agent prompts based on actual PM feedback.
</div>

## Things I'd Do Differently
{: #things-id-do-differently}

<div class="cs-statement reveal">The data model IS the product. Schema-first design is underrated.</div>

<div class="lesson-grid lesson-grid--rows">
  <div class="lesson-card lesson-card--row">
    <span class="lesson-card__number">01</span>
    <div>
      <div class="lesson-card__title">Multi-Agent Design Is a Product Problem, Not an Engineering Problem</div>
      <div class="lesson-card__body">The hardest decisions were not technical. They were: How many agents? What is each agent's boundary? When does one agent's output become another's input? These are product decomposition questions disguised as architecture questions.</div>
    </div>
  </div>
  <div class="lesson-card lesson-card--row">
    <span class="lesson-card__number">02</span>
    <div>
      <div class="lesson-card__title">The Schema Is the Product</div>
      <div class="lesson-card__body">I spent more time on the Prisma schema than on any individual agent. The data model — with its dependency tracking, RACI support, confidence intervals, and audit trail — defines what the product can and cannot do.</div>
    </div>
  </div>
  <div class="lesson-card lesson-card--row">
    <span class="lesson-card__number">03</span>
    <div>
      <div class="lesson-card__title">Testing AI Systems Requires a Different Strategy</div>
      <div class="lesson-card__body">The 81+ tests break down as: 55 API tests (deterministic behavior), 12 frontend tests (component rendering), and 14 LLM mock tests (agent behavior with controlled inputs). You cannot assert on exact LLM output, so tests validate structure, required fields, and constraint satisfaction.</div>
    </div>
  </div>
  <div class="lesson-card lesson-card--row">
    <span class="lesson-card__number">04</span>
    <div>
      <div class="lesson-card__title">Protecting User Credentials Is Non-Negotiable</div>
      <div class="lesson-card__body">When users bring their own AI credentials to a product, those keys must be protected at all times — never exposed in the browser. The architecture routes all AI calls through a server-side proxy so credentials are always encrypted and handled securely.</div>
    </div>
  </div>
  <div class="lesson-card lesson-card--row">
    <span class="lesson-card__number">05</span>
    <div>
      <div class="lesson-card__title">Speed Comes From Experience, Not Shortcuts</div>
      <div class="lesson-card__body">Agentic PM was built in a compressed timeline — not because the architecture is simple, but because years of managing AI product delivery made it possible to move fast without compromising on the fundamentals: a solid data model, clean agent boundaries, and a test suite that could catch regressions.</div>
    </div>
  </div>
</div>

> The role of the human in AI-assisted development shifts from implementation to product judgment — deciding what to build, how to scope it, and where to cut corners deliberately.

---

