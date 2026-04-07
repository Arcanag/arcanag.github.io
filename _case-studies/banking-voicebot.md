---
layout: case-study
title: "Rebuilding Trust in a 100K-Call-Per-Day Banking Voicebot"
description: "A project management case study on inheriting a voicebot with broken metrics, rebuilding measurement from scratch, and driving SLU accuracy to 91% — all in an air-gapped enterprise environment."
theme_color: "#1e40af"
category: "Enterprise AI — Project Management"
key_metric: "50+ metric bugs → trusted MIS"
read_time: "12 min read"
date: 2025-10-01
toc:
  - title: "Context & Takeover"
    anchor: "context--takeover"
  - title: "Parallel Development"
    anchor: "parallel-development"
  - title: "The Broken Metric"
    anchor: "the-broken-metric"
  - title: "Divide and Conquer"
    anchor: "divide-and-conquer-triaging-system-failures"
  - title: "What Went Wrong"
    anchor: "what-went-wrong"
  - title: "What We Built"
    anchor: "what-we-built"
  - title: "Things I'd Do Differently"
    anchor: "things-id-do-differently"
---

<div class="callout callout--tldr">
<p><strong>Role:</strong> Project Manager, end-to-end ownership of a 100K-call/day banking voicebot.</p>
<p><strong>Problem:</strong> Inherited broken metrics — containment was fiction (20K actual vs 8L target).</p>
<p><strong>Impact:</strong> Built a call resolution funnel from scratch, drove SLU accuracy from 70% to 91%, survived 15 critical incidents, and shipped 30 use cases across 5 delivery waves.</p>
</div>

<figure class="mermaid-diagram mermaid-diagram--wide" role="img" aria-label="Project timeline from October 2024 to March 2026 showing five phases: Discovery, Foundation, Stabilization, Acceleration, and Scale">
<img src="/assets/images/case-studies/13-project-timeline.svg" alt="Timeline showing key milestones: MIS bug discovery (Oct 2024), project takeover (Jan 2025), MIS revamp (Apr 2025), 47% OTP failure found (May 2025), major outages (Sep-Oct 2025), SLU 91% sign-off (Dec 2025), and 118K-146K contained calls/month by Mar 2026" />
<figcaption>18-month project arc — from inheriting broken metrics to delivering at scale.</figcaption>
</figure>

## Context & Takeover
{: #context--takeover}

### The Context

Skit.ai provides enterprise conversational AI solutions. For our largest Indian client, a top-tier private-sector bank, we deployed a bilingual (English + Hindi) voicebot handling **100,000+ daily calls** within an air-gapped, on-premises Kubernetes environment.

### What I Inherited

I took over this project in **January 2025**. On paper, it was a continuation — Phase 1 (a single use case) had been completed and signed off the week I joined. In practice, the handover was closer to a cold start.

<div class="scorecard">
  <div class="scorecard__item">
    <div class="scorecard__header">
      <span class="scorecard__indicator scorecard__indicator--red"></span>
      <span class="scorecard__label">Deployment Stability</span>
    </div>
    <span class="scorecard__value">Fragile — single use case, brittle</span>
  </div>
  <div class="scorecard__item">
    <div class="scorecard__header">
      <span class="scorecard__indicator scorecard__indicator--red"></span>
      <span class="scorecard__label">Platform Reliability</span>
    </div>
    <span class="scorecard__value">Known issues in flow builder, auth, analytics</span>
  </div>
  <div class="scorecard__item">
    <div class="scorecard__header">
      <span class="scorecard__indicator scorecard__indicator--amber"></span>
      <span class="scorecard__label">NLU Maturity</span>
    </div>
    <span class="scorecard__value">74 intents — many mistagged as out-of-scope</span>
  </div>
  <div class="scorecard__item">
    <div class="scorecard__header">
      <span class="scorecard__indicator scorecard__indicator--red"></span>
      <span class="scorecard__label">Documentation</span>
    </div>
    <span class="scorecard__value">Zero — no flows, no specs, no handover docs</span>
  </div>
</div>

The gap between "documented business requirements" and "shippable product" was enormous. None of the underlying technical work existed — no conversational flows, no API integration specs, no ML model architecture for multi-skill routing.

Every use case had to be treated as greenfield development built on the Phase 1 platform foundation.

### The Challenge

By **April 2025**, I was fully managing the project end-to-end, leading three squads through a complex backlog while simultaneously repairing a strained client relationship. The system was highly sophisticated — with **2,188 conversational states** and **130+ core banking integrations** — but suffered from a critical blind spot: unreliable resolution tracking.

The scope was massive: **30 use cases** spanning five banking skill groups, each requiring its own API integrations, NLU model changes, conversational flow design, and multi-round testing.

Each use case followed a **27-step development lifecycle** — from requirement intake through API testing, flow design, prompt alignment, integration, internal QA, closed user group testing, and finally production sign-off.

<div class="pipeline" role="img" aria-label="27-step use case development lifecycle spanning 7 phases">
  <div class="pipeline__phase pipeline__phase--accent">
    <div class="pipeline__phase-title">1. Requirements</div>
    <div class="pipeline__step">Requirement Intake</div>
    <div class="pipeline__step">BRD Review</div>
    <div class="pipeline__step">Parameter Definition</div>
    <div class="pipeline__step">Routing Details</div>
  </div>
  <div class="pipeline__phase">
    <div class="pipeline__phase-title">2. Bank Prerequisites</div>
    <div class="pipeline__step">API Documentation</div>
    <div class="pipeline__step">SMS Content</div>
    <div class="pipeline__step">Production Recordings</div>
    <div class="pipeline__step">Test Data</div>
  </div>
  <div class="pipeline__phase pipeline__phase--accent">
    <div class="pipeline__phase-title">3. Design & Build</div>
    <div class="pipeline__step">Flow Design</div>
    <div class="pipeline__step">Prompt Alignment</div>
    <div class="pipeline__step">NLU Intent Training</div>
    <div class="pipeline__step">Entity Mapping</div>
    <div class="pipeline__step">API Integration</div>
  </div>
  <div class="pipeline__phase">
    <div class="pipeline__phase-title">4. Integration</div>
    <div class="pipeline__step">End-to-End Wiring</div>
    <div class="pipeline__step">Error Handling</div>
    <div class="pipeline__step">Fallback Flows</div>
    <div class="pipeline__step">DTMF Config</div>
  </div>
  <div class="pipeline__phase">
    <div class="pipeline__phase-title">5. Testing</div>
    <div class="pipeline__step">Internal QA</div>
    <div class="pipeline__step">Bug Fixes</div>
    <div class="pipeline__step">CUG Testing</div>
    <div class="pipeline__step">Client Validation</div>
  </div>
  <div class="pipeline__phase">
    <div class="pipeline__phase-title">6. Deployment</div>
    <div class="pipeline__step">POA Document</div>
    <div class="pipeline__step">Email Approval</div>
    <div class="pipeline__step">DR Deploy</div>
    <div class="pipeline__step">Prod Deploy</div>
  </div>
  <div class="pipeline__phase pipeline__phase--accent">
    <div class="pipeline__phase-title">7. Sign-off</div>
    <div class="pipeline__step">Production Monitoring</div>
    <div class="pipeline__step">Metric Validation</div>
    <div class="pipeline__step">Client Sign-off</div>
  </div>
</div>
<p class="cs2-aside" style="margin-top:var(--space-sm);">Each of the 30 use cases passed through this 27-step pipeline — from requirement intake to production sign-off.</p>

We batched these into five delivery waves with staggered UAT timelines, but even with disciplined batching, the coordination overhead across four levels of the bank's hierarchy was substantial.

<div class="metric-box">
  <span class="metric-box__label">Conversational States</span>
  <span class="metric-box__number">2,188</span>
</div>
<div class="metric-box">
  <span class="metric-box__label">API Integrations</span>
  <span class="metric-box__number">130+</span>
</div>
<div class="metric-box">
  <span class="metric-box__label">Use Cases</span>
  <span class="metric-box__number">30</span>
</div>

### The Catalyst

The bank's leadership was heavily focused on ROI. Our contractual commitment was ambitious: **8 Lakh contained calls** out of **25 Lakh total monthly calls**. However, when I inherited the project in January, we were only containing **20,000 calls**. The bank demanded immediate and aggressive improvements to the Containment Rate in every review meeting. But before we could improve the bot's performance, I had to confront the reality that the containment metric itself was broken — and it had to be fixed before we could prove any real value.

<div class="metric-box">
  <span class="metric-box__label">Daily Call Volume</span>
  <span class="metric-box__number">100K+</span>
</div>
<div class="metric-box">
  <span class="metric-box__label">Contractual Target</span>
  <span class="metric-box__number">8L calls</span>
</div>
<div class="metric-box">
  <span class="metric-box__label">Actual at Takeover</span>
  <span class="metric-box__number">20K calls</span>
</div>

## Parallel Development
{: #parallel-development}

While the team was fighting fires on the live system — fixing metrics, stabilizing infrastructure, and absorbing security mandates — we were simultaneously building the next generation of the product.
{: .cs2-lead}

Phase 2 encompassed **30 new use cases** across five banking skill groups. Crucially, this phase introduced three completely new product categories: **NRI Account, Current Account, and Loan**. These categories were entirely absent from the existing model, API landscape, and flow design — each brought its own complex NLU requirements and compliance gates.

### The Scale of Parallel Execution

This wasn't sequential work. At any given point, we were managing use cases at every stage of the lifecycle simultaneously — from requirement clarification and API integration testing, to closed user group validation and waiting on the bank's teams for prerequisites.

Each use case required tight coordination across our design, engineering, ML, and operations teams, plus alignment with multiple levels of the bank's technical and business stakeholders.

The dependency chains were brutal. A single use case could be severely delayed because it required extensive integration and custom parsing development on our side — even when all APIs were already built on the bank's end. We tracked these dependencies obsessively, batching use cases into five delivery waves to create predictable testing windows while maintaining the flexibility to pull forward unblocked work.

<figure class="mermaid-diagram" role="img" aria-label="Gantt chart showing five delivery waves of use cases with parallel MIS, SLU, and security tracks">
<img src="/assets/images/case-studies/04-delivery-waves.svg" alt="Gantt chart: Wave 1 (8 use cases, Apr-Aug 2025), Wave 2 (6, Jun-Nov), Wave 3 (6, Aug-Jan 2026), Wave 4 (5, Oct-Mar), Wave 5 (5, Dec-May). Parallel critical tracks: MIS Revamp, SLU Retraining, Security Compliance" />
<figcaption>Five delivery waves with staggered development, CUG testing, and production deploys — plus three parallel critical tracks.</figcaption>
</figure>

### ML Model Expansion at Scale

The Phase 1 NLU model was never designed for this massive scope. It had only **30 intents**, many tagged as out-of-scope placeholders, and fundamentally lacked the entity structures required for multi-product, multi-skill routing. Furthermore, there were multiple data overlaps in the existing model for Phase 1. This meant there was a high probability of misfires if new intents were simply added without caution.

To safely navigate this, Phase 2 required generating new intents, designing new entity types, and extensively retagging existing training data.

We organized the ML work into distinct training groups:

<div class="tree" role="img" aria-label="ML model expansion organized into three training categories">
  <div class="tree__root tree__root--muted">Phase 2 ML Model Expansion</div>
  <div class="tree__connector"></div>
  <div class="tree__branches">
    <div class="tree__branch">
      <div class="tree__branch-connector"></div>
      <div class="tree__node tree__node--highlight">Full Retraining</div>
      <div class="tree__leaves">
        <div class="tree__leaf">New intents for NRI, Current Account, Loan</div>
        <div class="tree__leaf">Fresh model architecture for multi-product routing</div>
      </div>
    </div>
    <div class="tree__branch">
      <div class="tree__branch-connector"></div>
      <div class="tree__node tree__node--highlight">Entity Additions</div>
      <div class="tree__leaves">
        <div class="tree__leaf">New slot types for existing intents</div>
        <div class="tree__leaf">Multi-product entity disambiguation</div>
      </div>
    </div>
    <div class="tree__branch">
      <div class="tree__branch-connector"></div>
      <div class="tree__node tree__node--highlight">Edge-Case Testing</div>
      <div class="tree__leaves">
        <div class="tree__leaf">Ambiguous UPI queries</div>
        <div class="tree__leaf">Grid value activation conflicts</div>
        <div class="tree__leaf">Sequential card type probing</div>
      </div>
    </div>
  </div>
  <p class="tree__caption">Three distinct ML work streams — each requiring a different approach to model expansion.</p>
</div>

### Managing External Dependencies

Perhaps the hardest aspect of parallel development was managing the bank's side of the equation. Each use case had **seven bank-side prerequisites** — all of which had to be completed before our 20-step execution process could begin.

<figure class="mermaid-diagram" role="img" aria-label="Seven bank-side prerequisites that gate each use case before Skit.ai development can begin">
<img src="/assets/images/case-studies/08-prerequisites-gate.svg" alt="Flow diagram showing Bank-Side Prerequisites at top, fanning out to 7 gates (Requirement Documents, API Documentation, Parameter Definitions, Routing Details, SMS Content, Production Recordings, Test Data), converging to Ready for 20-Step Execution, then Skit.ai Development Pipeline" />
<figcaption>All seven gates had to clear before a use case could enter our development pipeline.</figcaption>
</figure>

At any given time, multiple use cases were blocked on one or more of these prerequisites. Even with the APIs built, some were undocumented or returning errors during our integration testing.

Several required whitelisting through the bank's infrastructure team, triggering complex approval chains. We maintained a live dependency tracker and escalated blockers through the appropriate levels of the bank's hierarchy — a process that required knowing exactly which stakeholder owned which decision.

### Current State

As of early 2025, Phase 1 was live and signed off. The first batch of eight Phase 2 use cases had completed development and entered closed user group testing for production deployment.

Four subsequent batches were in various stages of development, with UAT targets staggered through mid-2025. The project had evolved from a single-use-case deployment into a full-scale banking platform — and managing that evolution while keeping the live system stable was the defining challenge of the role.

## The Broken Metric
{: #the-broken-metric}

**Containment rate** — the percentage of calls fully resolved by the AI without human handoff — was our primary business metric. Transitioning into January, internal reports showed a severe, unexplained plunge. The most alarming part wasn't the decline itself — it was the lack of clarity behind it.
{: .cs2-lead}

A colleague frankly admitted: nobody understood the cause of the crash, and worse, there was zero confidence that our tracking calculations were even correct.

My first instinct was the same as everyone else's: drive up the containment rate fast. But the deeper I dug, the clearer it became that we were facing a compounding crisis driven by three distinct root causes:

<div class="tree" role="img" aria-label="Diagnostic tree showing three root causes of the broken containment rate">
  <div class="tree__root">Broken Containment Rate<br/><small>20K actual vs 8L target</small></div>
  <div class="tree__connector"></div>
  <div class="tree__branches">
    <div class="tree__branch">
      <div class="tree__branch-connector"></div>
      <div class="tree__node">Compromised<br/>Analytics Pipeline</div>
      <div class="tree__leaves">
        <div class="tree__leaf">50+ containment bugs in tracking code</div>
        <div class="tree__leaf">Max-retry hangups counted as contained</div>
        <div class="tree__leaf">Missing data for 10+ intents</div>
      </div>
    </div>
    <div class="tree__branch">
      <div class="tree__branch-connector"></div>
      <div class="tree__node">Metric<br/>Misalignment</div>
      <div class="tree__leaves">
        <div class="tree__leaf">No shared definition of success</div>
        <div class="tree__leaf">Containment confused with Resolution</div>
        <div class="tree__leaf">Team and client measuring differently</div>
      </div>
    </div>
    <div class="tree__branch">
      <div class="tree__branch-connector"></div>
      <div class="tree__node">Rushed Product<br/>Design</div>
      <div class="tree__leaves">
        <div class="tree__leaf">No graceful fallbacks</div>
        <div class="tree__leaf">3-attempt hangups counted as contained</div>
        <div class="tree__leaf">Incomplete conversational flows</div>
      </div>
    </div>
  </div>
  <p class="tree__caption">Three compounding root causes — each requiring a fundamentally different intervention.</p>
</div>

<p class="statement">When faced with broken metrics, I halted optimization and chose to build an entirely new analytics funnel from scratch.</p>

The most critical structural change was eliminating the confusion between a "contained" call and a "resolved" call. I designed a multi-layered funnel that tracked user interactions from the first IVR ping down to the final disposition. The funnel provided visibility into:

- **Traffic Qualification:** Total calls on the IVR vs. total calls actually eligible for bot handling.
- **Intent Processing:** How many calls hit our 50 trained intents, and whether the bot successfully followed instructions to identify those intents.
- **User Confirmation:** A strict measure of whether the user confirmed the bot's understanding of their problem.
- **True Resolution vs. Drop-off:** The final branch that cleanly separated actual Resolutions (the bot fulfilled the request) from non-resolutions (user hangups, bot error hangups, or manual agent transfers).

<p class="statement">By isolating exact drop-off points, we moved away from chasing vanity numbers and started making targeted, data-backed product decisions.</p>

<figure class="viz" role="img" aria-label="Voicebot Call Resolution Funnel showing stages from IVR entry to final disposition">
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
  <!-- Funnel stages — center-aligned at x=350 -->
  <rect x="40" y="10" width="620" height="36" rx="3" fill="#222"/>
  <text x="55" y="34" font-family="sans-serif" font-size="13" fill="#FFFFFF">Total Calls on IVR</text>
  <text x="645" y="34" text-anchor="end" font-family="sans-serif" font-size="12" fill="#888">100%</text>

  <rect x="80" y="58" width="540" height="36" rx="3" fill="#222"/>
  <text x="95" y="82" font-family="sans-serif" font-size="13" fill="#FFFFFF">Calls Sent to Bot</text>
  <text x="605" y="82" text-anchor="end" font-family="sans-serif" font-size="12" fill="#888">Bot-eligible</text>

  <rect x="120" y="106" width="460" height="36" rx="3" fill="#222"/>
  <text x="135" y="130" font-family="sans-serif" font-size="13" fill="#FFFFFF">Bot Trained for Instruction</text>
  <text x="565" y="130" text-anchor="end" font-family="sans-serif" font-size="12" fill="#888">Intent covered</text>

  <rect x="160" y="154" width="380" height="36" rx="3" fill="#222"/>
  <text x="175" y="178" font-family="sans-serif" font-size="13" fill="#FFFFFF">Bot Identified Intent</text>
  <text x="525" y="178" text-anchor="end" font-family="sans-serif" font-size="12" fill="#888">SLU success</text>

  <rect x="200" y="202" width="300" height="36" rx="3" fill="#222"/>
  <text x="215" y="226" font-family="sans-serif" font-size="13" fill="#FFFFFF">User Confirmed Intent</text>
  <text x="485" y="226" text-anchor="end" font-family="sans-serif" font-size="12" fill="#888">Confirmed</text>

  <!-- Final split -->
  <rect x="203" y="250" width="140" height="36" rx="3" fill="#ff2d00" opacity="0.8"/>
  <text x="273" y="274" text-anchor="middle" font-family="sans-serif" font-size="12" font-weight="bold" fill="#FFFFFF">Resolved</text>

  <rect x="358" y="250" width="140" height="36" rx="3" fill="#333"/>
  <text x="428" y="274" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#888">Not Resolved</text>
</svg>
<figcaption>The call resolution funnel I built — tracking every call from IVR entry to final disposition. Each layer isolates a specific drop-off point.</figcaption>
</figure>

<div class="info-card" style="background:#141414;border:1.5px solid #2A2A2A;border-radius:8px;padding:1.25rem 1.5rem;margin:1.5rem 0;box-shadow:0 1px 3px rgba(0,0,0,0.3);">
  <p style="margin:0 0 0.5rem;font-family:'Barlow Condensed',sans-serif;font-size:1rem;color:#FFFFFF;"><strong>Framework: Voicebot Call Resolution Funnel</strong></p>
  <p style="margin:0 0 0.75rem;font-size:0.9rem;color:#888;">I turned this measurement approach into a reusable framework — with definitions, formulas, benchmarks, diagnostic questions, and ownership mapping for every stage of the funnel.</p>
  <a href="/frameworks/voicebot-metrics-funnel/" style="font-family:'Space Mono',monospace;font-size:0.85rem;color:#ff2d00;text-decoration:none;border-bottom:1px solid #ff2d00;">Explore the full framework &rarr;</a>
</div>

<div class="testimonial">
  <p class="testimonial__sentiment">TRUST RESTORED</p>
  <p class="testimonial__quote">"After the funnel rebuild, this was the first time the bank's team could independently verify our containment numbers against their own raw data. The conversation shifted from 'we don't trust your metrics' to 'show us how to improve them.'"</p>
  <p class="testimonial__attribution">— Paraphrased stakeholder reaction, post-MIS deployment</p>
</div>

## Divide and Conquer: Triaging System Failures
{: #divide-and-conquer-triaging-system-failures}

With accurate data in hand, three failure patterns emerged — each requiring a different team and approach:
{: .cs2-lead}

<figure class="mermaid-diagram" role="img" aria-label="Pie chart showing the breakdown of system failures: 47% authentication, 30% intent classification, 23% conversation dead-ends">
<img src="/assets/images/case-studies/09-failure-breakdown.svg" alt="Pie chart: Authentication Failures (47% OTP drop-off), Intent Classification Gaps (SLU at 70%), and Conversation Flow Dead-Ends (23%)" />
<figcaption>Authentication failures dominated — the biggest blocker wasn't intent classification but OTP drop-off.</figcaption>
</figure>

- **Intent classification gaps.** The SLU model was inherited from Voicebot 1.0, which was originally just a simple call-steering bot with 20 intents. Over time, new intents had been bolted on without proper cleanup, and the architecture was never restructured to handle the bank's massive scope of **300+ use cases**. While SLU performance sat at around **70%** for the intents it was explicitly trained for, the model consistently failed on complex utterances like indirect requests or multi-intents. Anything outside this fragile intent universe was immediately escalated to a human agent.
- **Authentication failures.** This was the finding that changed priorities. A staggering **47% of callers failed after entering their OTP.** Digging into the data, we discovered this was driven by critical DTMF input bugs, specifically failures to capture the first digit or timing out during inter-digit inputs. Surfaced directly in a joint meeting with the bank's team, this meant that even perfectly classified intents were losing customers downstream before they could complete their requests.
- **Conversation flow dead-ends.** Certain flows had no graceful fallbacks. When the bot couldn't understand a response after three attempts, it would simply hang up. Calls our old MIS had counted as "contained" were actually just customers abandoning the bot in frustration.

<div class="metric-box">
  <span class="metric-box__label">OTP Failure Rate</span>
  <span class="metric-box__number">47%</span>
</div>

I proposed a **hybrid approach**: flow optimization and authentication fixes for quick wins, SLU expansion for sustained improvement, and security compliance absorbed in parallel.

We considered three options: a full SLU retrain, conversation flow redesign only, or the hybrid model.

<div class="decision-grid" role="img" aria-label="Decision matrix comparing three approaches">
  <div class="decision-card">
    <div class="decision-card__title">Full SLU Retrain</div>
    <div class="decision-card__row"><span class="decision-card__label">Timeline</span><span class="decision-card__value">6+ months</span></div>
    <div class="decision-card__row"><span class="decision-card__label">Risk</span><span class="decision-card__value">High — air-gapped constraints</span></div>
    <div class="decision-card__row"><span class="decision-card__label">Impact</span><span class="decision-card__value">Comprehensive but delayed</span></div>
  </div>
  <div class="decision-card">
    <div class="decision-card__title">Flow Redesign Only</div>
    <div class="decision-card__row"><span class="decision-card__label">Timeline</span><span class="decision-card__value">2-3 months</span></div>
    <div class="decision-card__row"><span class="decision-card__label">Risk</span><span class="decision-card__value">Low</span></div>
    <div class="decision-card__row"><span class="decision-card__label">Impact</span><span class="decision-card__value">Quick wins only, no lasting fix</span></div>
  </div>
  <div class="decision-card decision-card--chosen">
    <div class="decision-card__title">Hybrid Approach</div>
    <div class="decision-card__row"><span class="decision-card__label">Timeline</span><span class="decision-card__value">Immediate + ongoing</span></div>
    <div class="decision-card__row"><span class="decision-card__label">Risk</span><span class="decision-card__value">Medium — parallel execution</span></div>
    <div class="decision-card__row"><span class="decision-card__label">Impact</span><span class="decision-card__value">Quick wins NOW + sustained improvement</span></div>
    <span class="decision-card__badge">Chosen</span>
  </div>
</div>
<p class="cs2-aside" style="margin-top:var(--space-xs);text-align:center;">The hybrid approach balanced immediate wins with sustained model improvement.</p>

A complete SLU retrain would have taken **6+ months** — not including the preliminary research required in the air-gapped environment. The hybrid approach let us show immediate, incremental progress while laying the groundwork for larger model improvements.

I organized the work into **three squads**: Squad 1 (maintenance and bug fixes), Squad 2 (new use cases and intent expansion), and Squad 3 (security, compliance, and infrastructure). Each squad had clear ownership, and the bank's stakeholders knew exactly who to contact for what.

<figure class="viz" role="img" aria-label="Three squads organizational structure with team composition">
<svg viewBox="0 0 700 140" xmlns="http://www.w3.org/2000/svg">
  <!-- Squad 1 -->
  <rect x="10" y="10" width="216" height="120" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="118" y="35" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF">Squad 1</text>
  <text x="118" y="55" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">Maintenance & Bug Fixes</text>
  <line x1="40" y1="68" x2="196" y2="68" stroke="#333" stroke-width="1"/>
  <text x="118" y="88" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#ff2d00">Designer</text>
  <text x="118" y="104" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#ff2d00">Analyst</text>
  <text x="118" y="120" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#ff2d00">Operations</text>

  <!-- Squad 2 -->
  <rect x="242" y="10" width="216" height="120" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="350" y="35" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF">Squad 2</text>
  <text x="350" y="55" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">New Use Cases</text>
  <line x1="272" y1="68" x2="428" y2="68" stroke="#333" stroke-width="1"/>
  <text x="296" y="88" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#ff2d00">Engineer</text>
  <text x="404" y="88" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#ff2d00">Designer</text>
  <text x="296" y="108" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#ff2d00">Operations</text>
  <text x="404" y="108" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#ff2d00">ML</text>

  <!-- Squad 3 -->
  <rect x="474" y="10" width="216" height="120" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="582" y="35" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF">Squad 3</text>
  <text x="582" y="55" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">Security & Infrastructure</text>
  <line x1="504" y1="68" x2="660" y2="68" stroke="#333" stroke-width="1"/>
  <text x="582" y="88" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#ff2d00">DevOps</text>
  <text x="582" y="104" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#ff2d00">Engineering</text>
  <text x="582" y="120" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#ff2d00">Product</text>
</svg>
<figcaption>Three squads with clear ownership: maintenance, expansion, and security delivered in parallel.</figcaption>
</figure>


## What Went Wrong
{: #what-went-wrong}

This section exists because I believe case studies that only show wins aren't useful. Here's what didn't go as planned:
{: .cs2-lead}

<div class="lesson-grid">
  <div class="lesson-card">
    <span class="lesson-card__number">01</span>
    <div class="lesson-card__title">Architectural Mismatch</div>
    <div class="lesson-card__body">SLU improved from 70% to 91%, but the model was solution-oriented while customers articulate problems. Complex utterances triggered multiple conflicting intents.</div>
  </div>
  <div class="lesson-card">
    <span class="lesson-card__number">02</span>
    <div class="lesson-card__title">System Instability</div>
    <div class="lesson-card__body">15 incidents in 3 months — driven by architectural flaws in production-to-DR switchover and external vulnerabilities like bank API failures.</div>
  </div>
  <div class="lesson-card">
    <span class="lesson-card__number">03</span>
    <div class="lesson-card__title">The ARSIM Process Failure</div>
    <div class="lesson-card__body">7 minutes of unplanned downtime during live calls because a mandatory client approval step didn't exist for maintenance windows.</div>
  </div>
  <div class="lesson-card">
    <span class="lesson-card__number">04</span>
    <div class="lesson-card__title">Security Scope Creep</div>
    <div class="lesson-card__body">RBI-mandated compliance consumed 90% of infrastructure bandwidth during peak weeks, creating severe bottlenecks for feature deployments.</div>
  </div>
</div>

### Architectural Mismatch

We invested heavily in retraining the SLU model, which yielded strong on-paper results: identification improved from **70% to 91%**, driving a roughly **46% increase** in containment.

However, this effort failed to address a massive structural gap in our identification layer. The bot's architecture was fundamentally solution-oriented, expecting customers to state clear requests. In reality, customers call to articulate complex problems.

<p class="statement">Our model was solution-oriented, but customers call to articulate problems — not state clear requests.</p>

For example, a customer saying, "I am at an airport lounge and trying to make a payment but the transaction is not working," would misfire into conflicting intents.

<div class="mismatch" role="img" aria-label="Complex customer utterance colliding with multiple intents">
  <div class="mismatch__utterance">"I am at an airport lounge and trying to make a payment but the transaction is not working"</div>
  <div class="mismatch__arrow"></div>
  <div class="mismatch__label">SLU Model (solution-oriented)</div>
  <div class="mismatch__arrow"></div>
  <div class="mismatch__intents">
    <span class="mismatch__intent">airport-lounge</span>
    <span class="mismatch__intent">transaction-issue</span>
    <span class="mismatch__intent">transaction-status</span>
  </div>
  <div class="mismatch__arrow"></div>
  <div class="mismatch__collision">Intent Collision — No disambiguation layer</div>
  <div class="mismatch__arrow"></div>
  <div class="mismatch__result">Misfire or Wrong Flow</div>
  <div class="mismatch__arrow" style="border-left:1px dashed var(--color-border-mid);background:none;"></div>
  <div class="mismatch__label">What was needed</div>
  <div class="mismatch__needed">
    <span class="mismatch__needed-item">Hierarchical root intent</span>
    <span class="mismatch__needed-item">Multi-intent handling</span>
    <span class="mismatch__needed-item">Problem-to-solution disambiguation</span>
  </div>
  <p class="mismatch__caption">A single complex utterance triggering three conflicting intents — the model lacked disambiguation.</p>
</div>

A failed payment could stem from multiple distinct root causes—a blocked card, an exhausted limit, insufficient funds, or a specific channel issue (UPI vs. credit card). Because our model lacked a hierarchical root intent structure and the design couldn't handle multi-intents or disambiguate similar-sounding utterances, our higher baseline accuracy couldn't save these nuanced customer journeys.

### System Instability

We went through a highly volatile period, logging **15 separate incidents** over a three-month span. These outages were driven by a combination of our own architectural flaws — specifically around production-to-DR switchover mechanisms — and external vulnerabilities like bank API connection failures and network drops.

The sheer volume of issues strained the bank's trust, exposed the fragility of our system under real-world banking loads, and severely disrupted our containment improvement drive.

<div class="metric-box">
  <span class="metric-box__label">Critical Incidents (3 months)</span>
  <span class="metric-box__number">15</span>
</div>

### The ARSIM Process Failure

During planned server maintenance, an infrastructure team member shut down production services without confirming with or informing the bank. This caused approximately seven minutes of unplanned downtime during live calls. The failure wasn't technical; it was a pure process breakdown because a mandatory client approval step did not exist for maintenance windows. We instituted one immediately afterward, but the damage to our credibility was already done.

### Security Scope Creep

The bank added **LDAP + MFA authentication, DB encryption, HTTPS migration, and SRTP compliance** to our backlog mid-sprint. Each was a non-negotiable RBI regulatory requirement.

<figure class="mermaid-diagram" role="img" aria-label="Gantt chart showing security compliance items injected mid-sprint alongside the original delivery scope">
<img src="/assets/images/case-studies/15-security-scope.svg" alt="Gantt chart: Original sprint scope (Containment Improvements, Use Case Development, SLU Model Expansion) running from Jul-Dec 2025. Injected security items (LDAP+MFA, DB Encryption, HTTPS Migration, SRTP Compliance, APIGEE OAuth) overlapping from Aug 2025 to Mar 2026. Milestone: Squad 3 at 90% security capacity in Oct 2025." />
<figcaption>RBI-mandated security requirements (red) injected mid-sprint on top of the existing delivery scope.</figcaption>
</figure>

Absorbing these mandates without stalling our containment initiatives required ruthless re-prioritization. During certain weeks, security compliance consumed **90% of our infrastructure bandwidth**, creating severe bottlenecks for feature deployments.

## What We Built
{: #what-we-built}

Despite the setbacks, the project delivered meaningful improvement across multiple dimensions:
{: .cs2-lead}

<div class="outcome-grid">
  <div class="outcome-card">
    <div class="outcome-card__title">Measurement Integrity</div>
    <div class="outcome-card__metric">50+ bugs fixed</div>
    <div class="outcome-card__desc">Overhauled analytics pipeline with "100% trust" as design principle. Bank receives daily reports they can verify against raw data.</div>
  </div>
  <div class="outcome-card">
    <div class="outcome-card__title">SLU Accuracy</div>
    <div class="outcome-card__metric">91% inscope</div>
    <div class="outcome-card__desc">From 70% to 91% inscope, 82% out-of-scope. Earned production sign-off Dec 17, 2025.</div>
  </div>
  <div class="outcome-card">
    <div class="outcome-card__title">ML Safeguards</div>
    <div class="outcome-card__metric">&lt;0.6 = escalate</div>
    <div class="outcome-card__desc">Custom mutation plugin overrides low-confidence predictions. Graceful human escalation instead of misfired loops.</div>
  </div>
  <div class="outcome-card">
    <div class="outcome-card__title">Authentication Fix</div>
    <div class="outcome-card__metric">47% → improved</div>
    <div class="outcome-card__desc">Redesigned OTP journey with 8s first-digit and 6s inter-digit DTMF patience. Validated through CUG rounds.</div>
  </div>
  <div class="outcome-card">
    <div class="outcome-card__title">Deployment Discipline</div>
    <div class="outcome-card__metric">5 major deploys</div>
    <div class="outcome-card__desc">Formal POA, email approval chain, coordinated Prod + DR execution from Aug 2025 to Mar 2026.</div>
  </div>
  <div class="outcome-card">
    <div class="outcome-card__title">Incident Governance</div>
    <div class="outcome-card__metric">20-scenario runbook</div>
    <div class="outcome-card__desc">Air-gapped K8s runbook for L1/L2 teams. On-call rotations and escalation matrices eliminated single points of failure.</div>
  </div>
  <div class="outcome-card">
    <div class="outcome-card__title">Security Compliance</div>
    <div class="outcome-card__metric">Parallel delivery</div>
    <div class="outcome-card__desc">LDAP+MFA, DB encryption, HTTPS, APIGEE OAuth — delivered by dedicated Squad 3 without blocking containment track.</div>
  </div>
</div>

Here's the detail behind each outcome:

**Measurement integrity.** We fixed **50+ containment bugs** that were skewing the data. We overhauled the underlying analytics pipeline and debugged the existing dashboards to ensure complete data accuracy.

Operating with "100% trust" as our design principle, we enabled the bank to receive daily automated containment reports they could verify against their own raw data. A fundamental shift from "we think the metric is X" to "here's the metric, here's how we calculated it, and here's how you can validate it."

**SLU accuracy.** In-scope success rate reached **91%**, with out-of-scope success at **82%** — earning sign-off for production deployment on December 17, 2025. Post-deployment, we observed measurable improvement in high-volume flows: iMobile, unable to transact, transaction issues, and outstanding balance.

<div class="metric-box">
  <span class="metric-box__label">SLU Inscope Accuracy</span>
  <span class="metric-box__number">91%</span>
</div>

<figure class="viz" role="img" aria-label="SLU accuracy improvement: from 70% to 91% intent identification">
<svg viewBox="0 0 700 130" xmlns="http://www.w3.org/2000/svg">
  <!-- Before: 70% -->
  <text x="10" y="35" font-family="sans-serif" font-size="11" fill="#888">Before</text>
  <rect x="80" y="18" width="378" height="30" rx="3" fill="#ff2d00" opacity="0.7"/>
  <text x="92" y="38" font-family="sans-serif" font-size="13" font-weight="bold" fill="#FFFFFF">70% identification</text>

  <!-- After: 91% inscope -->
  <text x="10" y="82" font-family="sans-serif" font-size="11" fill="#888">After</text>
  <rect x="80" y="65" width="491" height="30" rx="3" fill="#FFFFFF" opacity="0.9"/>
  <text x="92" y="85" font-family="sans-serif" font-size="13" font-weight="bold" fill="#111">91% inscope</text>

  <!-- After: 82% OOS (subtle sub-bar) -->
  <rect x="80" y="104" width="443" height="8" rx="2" fill="#888" opacity="0.3"/>
  <text x="533" y="113" font-family="sans-serif" font-size="10" fill="#888">82% OOS</text>
</svg>
<figcaption>SLU accuracy transformation: from 70% to 91% inscope identification, with 82% out-of-scope success.</figcaption>
</figure>

<div class="testimonial">
  <p class="testimonial__sentiment">MEASURABLE IMPACT</p>
  <p class="testimonial__quote">"Post-deployment, we observed measurable improvement in the highest-volume flows — iMobile, unable to transact, transaction issues, and outstanding balance. The SLU model earned production sign-off on December 17, 2025."</p>
  <p class="testimonial__attribution">— Production deployment outcome</p>
</div>

**Machine learning safeguards.** We engineered a custom mutation plugin to protect the customer experience from the model's remaining blind spots. It actively monitored live utterances, cross-referencing them against bank-approved regex patterns to override faulty or low-confidence predictions.

We instituted a strict fallback threshold: any intent scoring below **0.6 confidence** was automatically mutated to "out-of-scope." Instead of guessing and trapping users in misfired loops, the system gracefully escalated to a human agent — drastically reducing customer friction.

**Authentication improvement.** The crippling **47% OTP failure rate** was directly addressed through a redesigned authentication journey and crucial DTMF patience features.

We optimized listening parameters: **first-digit wait time to 8 seconds** and **inter-digit wait time to 6 seconds**. This significantly reduced timeouts for slower users and was validated through multiple Closed User Group (CUG) testing rounds before production rollout.

<div class="metric-box">
  <span class="metric-box__label">First-Digit Wait</span>
  <span class="metric-box__number">8s</span>
</div>
<div class="metric-box">
  <span class="metric-box__label">Inter-Digit Wait</span>
  <span class="metric-box__number">6s</span>
</div>

**Deployment discipline.** We successfully managed five major production deployments between August 2025 and March 2026. Each release was executed with strict adherence to a formal Plan of Action, an explicit email-based approval chain, and tightly coordinated execution across both Production and Disaster Recovery (DR) environments.

<div class="metric-box">
  <span class="metric-box__label">Major Deployments (Aug 2025 – Mar 2026)</span>
  <span class="metric-box__number">5</span>
</div>

**Incident governance.** The early outages forced us to mature our operations overnight, shifting from a reactive to a proactive operational model.

After the October outage, we built a comprehensive **20-scenario air-gapped Kubernetes runbook**. This empowered L1 and L2 support teams to execute recovery protocols immediately, drastically reducing MTTR without relying on a single point of failure.

Following the ARSIM incident, we instituted mandatory written client approval for all maintenance windows — enforcing a formal handshake before any system touches. Coupled with new on-call rotations and escalation matrices, these were the foundational process improvements that made every subsequent delivery safe.

**Security delivered in parallel.** Delivering RBI-mandated compliance — LDAP + MFA, DB encryption, HTTPS migration, and APIGEE API Key + OAuth integration — was the hardest prioritization challenge of the project.

We managed this without blocking the primary containment track through strict resource isolation. A dedicated **Squad 3** handled all infrastructure and compliance work, shielding the core conversational and ML teams from context switching.

We negotiated a phased rollout schedule with the bank and embedded security regressions directly into our existing QA cycles to prevent testing bottlenecks. It was a masterclass in saying "yes, and" to rigid compliance requirements while fiercely protecting the main delivery timeline.

## Things I'd Do Differently
{: #things-id-do-differently}

<p class="statement">The air-gapped environment was the defining constraint. Every decision — from squad structure to deployment discipline to the 20-scenario runbook — was shaped by the physical reality that nothing could be debugged remotely.</p>

<div class="lesson-grid">
  <div class="lesson-card">
    <span class="lesson-card__number">01</span>
    <div class="lesson-card__title">Fix measurement first</div>
    <div class="lesson-card__body">We chased 8L contained calls against a tracking system we couldn't trust. Building a "100% trust" analytics pipeline should have been week one, not a mid-project pivot.</div>
    <div class="lesson-card__quote">If I could restart, building trusted analytics wouldn't be a pivot — it would be week one.</div>
  </div>
  <div class="lesson-card">
    <span class="lesson-card__number">02</span>
    <div class="lesson-card__title">Enterprise AI governance is product management</div>
    <div class="lesson-card__body">POAs, approval chains, CUG testing, maintenance windows — these aren't overhead. They're the discipline that separates enterprise-grade AI from a sandbox demo.</div>
    <div class="lesson-card__quote">The ARSIM 7-minute outage didn't just hurt our SLA — it cost months of rebuilt trust.</div>
  </div>
  <div class="lesson-card">
    <span class="lesson-card__number">03</span>
    <div class="lesson-card__title">Single points of failure are PM risks</div>
    <div class="lesson-card__body">Relying on one infrastructure engineer for prod-to-DR switchovers is a process failure, not just technical debt. Build operational muscle before you need it.</div>
    <div class="lesson-card__quote">15 critical incidents forced us to mature overnight — on-call rotations, escalation matrices, 20-scenario runbooks.</div>
  </div>
  <div class="lesson-card">
    <span class="lesson-card__number">04</span>
    <div class="lesson-card__title">Influence through data breaks deadlocks</div>
    <div class="lesson-card__body">Everyone blamed the NLU model. The data revealed 47% of callers dropped off at OTP — a completely different bottleneck that aligned everyone instantly.</div>
    <div class="lesson-card__quote">In cross-functional deadlocks, aggregate data is the only objective tiebreaker.</div>
  </div>
  <div class="lesson-card">
    <span class="lesson-card__number">05</span>
    <div class="lesson-card__title">Absorb scope without losing the thread</div>
    <div class="lesson-card__body">RBI-mandated security arrived mid-sprint. Three distinct squads was the only way to deliver compliance without killing the primary containment track.</div>
    <div class="lesson-card__quote">A PM's job isn't to push back on compliance — it's to organize the work so it doesn't kill delivery.</div>
  </div>
</div>

### Fix measurement first

We spent months chasing an ambitious contractual commitment of 8 Lakh contained calls against a tracking system we fundamentally couldn't trust. When we paused optimization to build a multi-layered call resolution funnel from scratch — separating true "resolution" from mere "containment" — we discovered the real baseline was a mere 20,000 calls. Deep-seated reporting bugs and poorly designed fallback flows had been masking the reality of user drop-offs.

> If I could restart this 30-use-case rollout, building a "100% trust" analytics pipeline wouldn't be a mid-project pivot — it would be week one.

### Enterprise AI governance is product management

Formal Plans of Action (POAs), email-based approval chains, CUG testing, and strict maintenance windows — these aren't administrative overhead. They are the product management discipline that separates enterprise-grade AI from a sandbox demo.

The ARSIM incident taught me this viscerally: when an infrastructure engineer shut down production services during live calls without a mandatory client handshake, that **7-minute unplanned outage** didn't just hurt our SLA. It cost us the client trust that takes months to rebuild.

### Single points of failure are PM risks, not just engineering risks

Relying on a single infrastructure engineer for production-to-DR switchovers, or leaving system recovery to undocumented tribal knowledge, aren't just technical debts — they are process failures.

Enduring **15 critical incidents** over a volatile three-month span forced us to mature overnight. A PM's job is to identify these gaps and build operational muscle — on-call rotations, escalation matrices, and **20-scenario Kubernetes runbooks** — so L1/L2 teams can execute recoveries without needing a hero.

### Influence through data breaks deadlocks

When containment plunged, everyone had a theory. The immediate instinct was to blame the inherited 30-intent NLU model.

But the data from our newly isolated funnels revealed a completely different bottleneck: **47% of callers were dropping off immediately after entering their OTP.** The root cause wasn't intent classification — it was critical DTMF timeout bugs.

Bringing this exact data to the bank aligned everyone instantly on a hybrid approach: optimizing DTMF wait times for an immediate win, while strategically expanding the SLU model in the background.

> In cross-functional deadlocks, aggregate data is the only objective tiebreaker.

### Absorb scope without losing the thread

RBI-mandated security requirements — LDAP + MFA, DB encryption, HTTPS migration — arrived mid-sprint and were strictly non-negotiable. A PM's job isn't to push back on regulatory compliance; it's to organize the work so compliance is achieved without killing the primary delivery target.

Structuring the project into **three distinct squads** was the only way this survived. Isolating all infrastructure and security tasks into a dedicated Squad 3 shielded the core teams from context switching, preventing scope creep from consuming the entire team's bandwidth.
