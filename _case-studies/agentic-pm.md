---
layout: case-study
title: "Designing an AI Project Management OS with 6 Specialized Agents"
description: "A product case study on architecting a multi-agent system that automates PM operational work — requirement parsing, task decomposition, team routing, timeline forecasting, and client communication."
category: "AI Product — Multi-Agent System Design"
key_metric: "6 AI agents, 81+ tests"
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
  - title: "What I Learned"
    anchor: "what-i-learned"
---

## The Problem
{: #the-problem}

After years of managing delivery for AI products, I had seen a pattern repeat across every project: the operational overhead of project management scales linearly with team size, but it should not. Requirements come in through email, Slack, and meetings in unstructured formats. Breaking them into actionable tasks is mechanical work. Assigning tasks to the right people based on skills and capacity is a lookup problem. Status reports are just aggregation.

None of this requires human judgment. Yet PMs spend 40-60% of their time on exactly these tasks.

I wanted to build what I kept wishing existed: an AI system that handles the operational layer of project management, freeing PMs to focus on strategy, stakeholder alignment, and product decisions — the work that actually requires human thinking.

Agentic PM is that system: 6 specialized AI agents that automate the PM operational workflow from requirement intake to timeline forecasting.

<div class="metric-box">
  <span class="metric-box__label">AI Agents</span>
  <span class="metric-box__number">6</span>
</div>

<div class="metric-box">
  <span class="metric-box__label">PRs Merged</span>
  <span class="metric-box__number">19</span>
</div>

<div class="metric-box">
  <span class="metric-box__label">Test Coverage</span>
  <span class="metric-box__number">81+ tests</span>
</div>

## System Design
{: #system-design}

The architecture reflects a core belief: **multi-agent systems should be composed of specialists, not one general-purpose agent trying to do everything.**

Each agent has a single responsibility, a well-defined input/output contract, and can be tested independently. The agents compose into a pipeline, but they are not tightly coupled — you can use the Requirement Parser without the Decomposition Agent, or the Communication Agent without the Timeline Agent.

### Stack

- **Frontend:** Next.js 15 (App Router, TypeScript)
- **Backend:** FastAPI (Python, async)
- **Database:** PostgreSQL via Supabase (production), SQLite for testing
- **AI:** Claude (BYOK with encrypted key storage)
- **Monorepo:** Turborepo with 5 packages
- **Testing:** 55 API tests + 12 frontend tests + 14 LLM mock tests

### Monorepo Structure

```
agentic-pm/
  apps/
    web/          # Next.js 15 frontend
    api/          # FastAPI backend
  packages/
    db/           # Prisma schema + migrations
    ui/           # Shared component library
    types/        # TypeScript interfaces
```

The Turborepo monorepo was a deliberate choice. With a Next.js frontend and FastAPI backend, sharing type definitions and database schemas across packages prevents the drift that kills multi-service projects.

### BFF Proxy Pattern

The Next.js app acts as a Backend-for-Frontend proxy to the FastAPI service. API keys never reach the client. This was refactored in PR AP-21, which collapsed 450 lines of duplicated proxy code into 100 lines of clean middleware.

### Multi-Tenant Data Model

The Prisma schema supports full multi-tenancy with organization-based data isolation. The schema includes auth models, organization membership with role-based access, teams with skills and availability metadata, full task hierarchy with dependency tracking, client requirements with clarification threads, work assignments with RACI matrix support, milestones with confidence intervals, agent runs with audit trails, and integration configs for Jira, GitHub, Slack, and Google.

<div class="callout">
<strong>Why this schema matters:</strong> The data model IS the product. A multi-agent PM tool without proper dependency tracking, RACI support, and audit trails is a toy. The schema was designed before the first agent was built.
</div>

## The 6 Agents
{: #the-6-agents}

Each agent is designed around a specific PM operational task. Here is what they do and the product thinking behind each one.

### 1. Requirement Parser

**Input:** Unstructured text (email, Slack message, meeting notes, manual entry)
**Output:** Structured requirement with title, description, priority, category, acceptance criteria, and clarification questions

The parser does not just extract information — it identifies what is *missing*. If a client says "we need a dashboard," the parser generates clarification questions: What metrics? Who is the audience? What is the refresh frequency?

### 2. Decomposition Agent

**Input:** Structured requirement
**Output:** Epic with nested Features, Stories, and Tasks

This is the agent I am most proud of. It takes a high-level requirement and produces a full work breakdown structure with INVEST-validated user stories and story point estimates. Stories that fail INVEST validation are flagged with specific reasons.

<div class="metric-box">
  <span class="metric-box__label">Hierarchy Levels</span>
  <span class="metric-box__number">Epic > Feature > Story > Task</span>
</div>

### 3. Routing Agent

**Input:** Task list + team profiles (skills, capacity, current workload)
**Output:** Assignments with RACI matrix + key person risk analysis

The routing agent considers three dimensions: **expertise match**, **capacity**, and **dependency awareness**. It also flags key person risk — when a single team member is the only one who can deliver a critical task.

### 4. Communication Agent

**Input:** Project state (tasks, progress, blockers, milestones)
**Output:** Client-ready status reports with insights and action items

Status reports are the most time-consuming zero-creativity PM task. This agent generates structured reports with progress summary, milestone status, risk flags, and action items with owners.

### 5. Chat Agent

**Input:** Natural language questions about the project
**Output:** Contextual answers grounded in project data

Instead of digging through Jira filters, a PM can ask: "What is blocking the payment integration?" or "Which team members are overallocated this sprint?"

### 6. Timeline Agent

**Input:** Task list with estimates, dependencies, and team assignments
**Output:** Monte Carlo forecast with P50/P75/P90 confidence dates + critical path

Instead of producing a single delivery date (which is always wrong), the Timeline Agent runs Monte Carlo simulations across the task graph, accounting for estimation uncertainty and dependency chains.

- **P50:** 50% chance of completing by this date (aggressive)
- **P75:** 75% chance (realistic)
- **P90:** 90% chance (conservative)

<div class="callout">
<strong>Product insight:</strong> Shipping dates are not single points — they are probability distributions. Any PM tool that gives you one date is lying to you. Monte Carlo forecasting makes uncertainty explicit, which is what stakeholders actually need for planning.
</div>

## Multi-Channel Intelligence
{: #multi-channel-intelligence}

Requirements do not arrive in neat forms. They come through email threads, Slack messages, and Jira tickets. Agentic PM meets requirements where they live.

### Gmail Integration (PRs AP-11, AP-12)

The system monitors a configured Gmail inbox for emails matching project-related patterns. When a client emails a feature request, the Requirement Parser automatically extracts structured requirements and creates draft items for PM review.

### Slack Integration (PR AP-13)

Messages in designated channels are parsed for requirement signals. A product manager saying "client X wants SSO support by Q3" in Slack becomes a structured requirement with priority, acceptance criteria gaps, and clarification questions — automatically.

### Jira Integration (PR AP-14)

Requirements created in Agentic PM can push to Jira as epics and stories. Updates in Jira reflect back. Teams should not have to abandon their existing tools.

<div class="metric-box">
  <span class="metric-box__label">Intake Channels</span>
  <span class="metric-box__number">4</span>
</div>

## Honest Assessment
{: #honest-assessment}

Here is where the system falls short.

**What is weak:**

- **Agent orchestration is linear.** The agents work in sequence, but real PM workflows are not linear. A change in timeline should trigger re-routing, which should update the communication report. This feedback loop does not exist yet.
- **LLM output consistency.** The Decomposition Agent occasionally produces stories that are too large or too vague. The INVEST validation catches some of these, but not all.
- **No production deployment.** This runs locally. No CI/CD pipeline, no staging environment, no monitoring.
- **Monte Carlo accuracy is unvalidated.** The simulation parameters are based on industry heuristics, not calibrated data from actual project outcomes.
- **Multi-channel intake is MVP.** The Gmail and Slack integrations capture messages, but signal-to-noise filtering is basic.

**What I would do differently with more time:**

- The 6-agent architecture is more complex than a v1 needs. A 3-agent system (Decomposition, Routing, Timeline) would have delivered 80% of the value. I built the other three because I could, not because users needed them yet.
- Build an event-driven orchestration layer — the current linear pipeline means a timeline change doesn't cascade to routing or communication.
- Deploy to a real team for 2 sprints and measure time saved, decomposition accuracy, and forecast calibration before adding more agents.
- Add a feedback loop where PMs can rate agent outputs, creating training data for prompt improvement.

<div class="callout">
<strong>The gap that matters most:</strong> Without validation against real project data, this is a well-architected demo. The path from demo to product requires deploying with a real team, measuring outcomes, and iterating on agent prompts based on actual PM feedback.
</div>

## What I Learned
{: #what-i-learned}

### 1. Multi-Agent Design Is a Product Problem, Not an Engineering Problem

The hardest decisions were not technical. They were: How many agents? What is each agent's boundary? When does one agent's output become another's input? These are product decomposition questions disguised as architecture questions.

### 2. The Schema Is the Product

I spent more time on the Prisma schema than on any individual agent. The data model — with its dependency tracking, RACI support, confidence intervals, and audit trail — defines what the product can and cannot do. Schema-first design is underrated.

### 3. Testing AI Systems Requires a Different Strategy

The 81+ tests break down as: 55 API tests (deterministic behavior), 12 frontend tests (component rendering), and 14 LLM mock tests (agent behavior with controlled inputs). You cannot assert on exact LLM output, so tests validate structure, required fields, and constraint satisfaction. This is a testing philosophy refined through years of evaluating non-deterministic AI systems in production.

### 4. BFF Proxy Is Non-Negotiable for AI Products

The refactor from 450 lines of scattered proxy code to 100 lines of clean BFF middleware was one of the highest-ROI changes. In any AI product where users provide API keys, the frontend must never touch those keys directly.

### 5. Building Both Products in One Day Proved a Thesis

Career Enabler and Agentic PM were both built on the same day — a compressed timeline that was possible because of years of production experience with AI systems, not because the work was trivial. The role of the human in AI-assisted development shifts from implementation to product judgment — deciding what to build, how to scope it, and where to cut corners deliberately.

---

