---
layout: case-study
title: "Rebuilding Trust in a 100K-Call-Per-Day Banking Voicebot"
description: "A project management case study on inheriting a voicebot with broken metrics, rebuilding measurement from scratch, and driving SLU accuracy to 91% — all in an air-gapped enterprise environment."
theme_color: "#4A9EFF"
hero_bg_word: "VOICEBOT"
category: "Enterprise AI — Project Management"
key_metric: "91% SLU &middot; 30 use cases &middot; 100K+ calls/day"
read_time: "12 min read"
date: 2026-04-01
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

<div class="cs-impact-strip">
  <div class="cs-impact-cell">
    <div class="cs-impact-value">70→91%</div>
    <div class="cs-impact-label">SLU Accuracy</div>
    <div class="cs-impact-desc">Inscope identification, production signed-off</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-value">30</div>
    <div class="cs-impact-label">Use Cases Shipped</div>
    <div class="cs-impact-desc">Across 5 delivery waves, 27-step pipeline each</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-value">100K+</div>
    <div class="cs-impact-label">Daily Calls</div>
    <div class="cs-impact-desc">Air-gapped, on-premises Kubernetes</div>
  </div>
</div>

<figure class="mermaid-diagram mermaid-diagram--wide" role="img" aria-label="Project timeline from October 2024 to March 2026 showing five phases: Discovery, Foundation, Stabilization, Acceleration, and Scale">
<img src="/assets/images/case-studies/13-project-timeline.svg" alt="Timeline showing key milestones: MIS bug discovery (Oct 2024), project takeover (Jan 2025), MIS revamp (Apr 2025), 47% OTP failure found (May 2025), major outages (Sep-Oct 2025), SLU 91% sign-off (Dec 2025), and 118K-146K contained calls/month by Mar 2026" />
<figcaption>18-month project arc — from inheriting broken metrics to delivering at scale.</figcaption>
</figure>

## Context & Takeover
{: #context--takeover}

<p class="cs-lead">Skit.ai provides enterprise conversational AI solutions. For our largest Indian client, a top-tier private-sector bank, we deployed a bilingual (English + Hindi) voicebot handling <strong>100,000+ daily calls</strong> within an air-gapped, on-premises Kubernetes environment.</p>

### What I Inherited

<div class="cs-two-col">
  <div class="cs-two-col__left">
    <p>I took over this project in <strong>January 2025</strong>. On paper, it was a continuation — Phase 1 (a single use case) had been completed and signed off the week I joined. In practice, the handover was closer to a cold start.</p>
    <p>The gap between "documented business requirements" and "shippable product" was enormous. None of the underlying technical work existed — no conversational flows, no API integration specs, no ML model architecture for multi-skill routing.</p>
    <p>Every use case had to be treated as greenfield development built on the Phase 1 platform foundation.</p>
  </div>
  <div class="cs-two-col__right">
    <div class="cs-scorecard-grid">
      <div class="cs-scorecard-grid__cell">
        <span class="scorecard__indicator scorecard__indicator--red"></span>
        <span class="cs-scorecard-grid__label">Deployment Stability</span>
        <span class="cs-scorecard-grid__value">Fragile — single use case, brittle</span>
      </div>
      <div class="cs-scorecard-grid__cell">
        <span class="scorecard__indicator scorecard__indicator--red"></span>
        <span class="cs-scorecard-grid__label">Platform Reliability</span>
        <span class="cs-scorecard-grid__value">Known issues in flow builder, auth, analytics</span>
      </div>
      <div class="cs-scorecard-grid__cell">
        <span class="scorecard__indicator scorecard__indicator--amber"></span>
        <span class="cs-scorecard-grid__label">NLU Maturity</span>
        <span class="cs-scorecard-grid__value">74 intents — many mistagged as out-of-scope</span>
      </div>
      <div class="cs-scorecard-grid__cell">
        <span class="scorecard__indicator scorecard__indicator--red"></span>
        <span class="cs-scorecard-grid__label">Documentation</span>
        <span class="cs-scorecard-grid__value">Zero — no flows, no specs, no handover docs</span>
      </div>
    </div>
  </div>
</div>

### The Challenge

By **April 2025**, I was managing the project end-to-end — leading three squads, repairing a strained client relationship, and confronting a critical blind spot: unreliable resolution tracking.

<div class="cs-impact-strip">
  <div class="cs-impact-cell">
    <div class="cs-impact-value">2,188</div>
    <div class="cs-impact-label">Conversational States</div>
    <div class="cs-impact-desc">Bilingual flows across 5 banking skill groups</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-value">130+</div>
    <div class="cs-impact-label">Core Banking Integrations</div>
    <div class="cs-impact-desc">Each requiring API testing and prompt alignment</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-value">30</div>
    <div class="cs-impact-label">Use Cases</div>
    <div class="cs-impact-desc">27-step lifecycle from intake to production sign-off</div>
  </div>
</div>

Each use case required its own API integrations, NLU model changes, conversational flow design, and multi-round testing.

<div class="cs-pipeline-row" role="img" aria-label="27-step use case development lifecycle spanning 7 phases">
  <div class="cs-pipeline-row__phase cs-pipeline-row__phase--accent">
    <span class="cs-pipeline-row__title">Requirements</span>
    <span class="cs-pipeline-row__step">Requirement Intake</span>
    <span class="cs-pipeline-row__step">BRD Review</span>
    <span class="cs-pipeline-row__step">Parameter Definition</span>
    <span class="cs-pipeline-row__step">Routing Details</span>
  </div>
  <span class="cs-pipeline-row__arrow" aria-hidden="true">&rarr;</span>
  <div class="cs-pipeline-row__phase">
    <span class="cs-pipeline-row__title">Bank Prerequisites</span>
    <span class="cs-pipeline-row__step">API Documentation</span>
    <span class="cs-pipeline-row__step">SMS Content</span>
    <span class="cs-pipeline-row__step">Production Recordings</span>
    <span class="cs-pipeline-row__step">Test Data</span>
  </div>
  <span class="cs-pipeline-row__arrow" aria-hidden="true">&rarr;</span>
  <div class="cs-pipeline-row__phase cs-pipeline-row__phase--accent">
    <span class="cs-pipeline-row__title">Design & Build</span>
    <span class="cs-pipeline-row__step">Flow Design</span>
    <span class="cs-pipeline-row__step">Prompt Alignment</span>
    <span class="cs-pipeline-row__step">NLU Intent Training</span>
    <span class="cs-pipeline-row__step">Entity Mapping</span>
    <span class="cs-pipeline-row__step">API Integration</span>
  </div>
  <span class="cs-pipeline-row__arrow" aria-hidden="true">&rarr;</span>
  <div class="cs-pipeline-row__phase">
    <span class="cs-pipeline-row__title">Integration</span>
    <span class="cs-pipeline-row__step">End-to-End Wiring</span>
    <span class="cs-pipeline-row__step">Error Handling</span>
    <span class="cs-pipeline-row__step">Fallback Flows</span>
    <span class="cs-pipeline-row__step">DTMF Config</span>
  </div>
  <span class="cs-pipeline-row__arrow" aria-hidden="true">&rarr;</span>
  <div class="cs-pipeline-row__phase">
    <span class="cs-pipeline-row__title">Testing</span>
    <span class="cs-pipeline-row__step">Internal QA</span>
    <span class="cs-pipeline-row__step">Bug Fixes</span>
    <span class="cs-pipeline-row__step">CUG Testing</span>
    <span class="cs-pipeline-row__step">Client Validation</span>
  </div>
  <span class="cs-pipeline-row__arrow" aria-hidden="true">&rarr;</span>
  <div class="cs-pipeline-row__phase">
    <span class="cs-pipeline-row__title">Deployment</span>
    <span class="cs-pipeline-row__step">POA Document</span>
    <span class="cs-pipeline-row__step">Email Approval</span>
    <span class="cs-pipeline-row__step">DR Deploy</span>
    <span class="cs-pipeline-row__step">Prod Deploy</span>
  </div>
  <span class="cs-pipeline-row__arrow" aria-hidden="true">&rarr;</span>
  <div class="cs-pipeline-row__phase cs-pipeline-row__phase--accent">
    <span class="cs-pipeline-row__title">Sign-off</span>
    <span class="cs-pipeline-row__step">Production Monitoring</span>
    <span class="cs-pipeline-row__step">Metric Validation</span>
    <span class="cs-pipeline-row__step">Client Sign-off</span>
  </div>
</div>

We batched these into five delivery waves with staggered UAT timelines, but even with disciplined batching, the coordination overhead across four levels of the bank's hierarchy was substantial.

### The Catalyst

The bank's leadership was heavily focused on ROI. Our contractual commitment was ambitious: **8 Lakh contained calls** out of **25 Lakh total monthly calls**. However, when I inherited the project in January, we were only containing **20,000 calls**. The bank demanded immediate and aggressive improvements to the Containment Rate in every review meeting. But before we could improve the bot's performance, I had to confront the reality that the containment metric itself was broken — and it had to be fixed before we could prove any real value.

<div class="cs-swap">
  <span class="cs-swap__before">20K</span>
  <span class="cs-swap__arrow" aria-hidden="true">&rarr;</span>
  <span class="cs-swap__after">800K target</span>
  <span class="cs-swap__context">Contained calls: actual vs. contractual commitment</span>
</div>

## Parallel Development
{: #parallel-development}

<p class="cs-lead">While the team was fighting fires on the live system — fixing metrics, stabilizing infrastructure, and absorbing security mandates — we were simultaneously building the next generation of the product.</p>
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

<p class="cs-lead"><strong>Containment rate</strong> — the percentage of calls fully resolved by the AI without human handoff — was our primary business metric. Transitioning into January, internal reports showed a severe, unexplained plunge. The most alarming part wasn't the decline itself — it was the lack of clarity behind it.</p>
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

<div class="cs-statement reveal">When faced with broken metrics, I halted optimization and chose to build an entirely new analytics funnel from scratch.</div>

The most critical structural change was eliminating the confusion between a "contained" call and a "resolved" call. I designed a multi-layered funnel that tracked user interactions from the first IVR ping down to the final disposition. The funnel provided visibility into:


**By isolating exact drop-off points, we moved away from chasing vanity numbers and started making targeted, data-backed product decisions.**

<div class="cs-funnel reveal">
  <div class="cs-funnel__step">
    <span class="cs-funnel__label">Total Calls on IVR</span>
    <div class="cs-funnel__bar"><div class="cs-funnel__fill" style="width:100%"></div></div>
    <span class="cs-funnel__pct">100%</span>
  </div>
  <div class="cs-funnel__step">
    <span class="cs-funnel__label">Calls Sent to Bot</span>
    <div class="cs-funnel__bar"><div class="cs-funnel__fill" style="width:78%"></div></div>
    <span class="cs-funnel__pct">Bot-eligible</span>
  </div>
  <div class="cs-funnel__step">
    <span class="cs-funnel__label">Bot Trained for Intent</span>
    <div class="cs-funnel__bar"><div class="cs-funnel__fill" style="width:60%"></div></div>
    <span class="cs-funnel__pct">Covered</span>
  </div>
  <div class="cs-funnel__step">
    <span class="cs-funnel__label">Bot Identified Intent</span>
    <div class="cs-funnel__bar"><div class="cs-funnel__fill" style="width:45%"></div></div>
    <span class="cs-funnel__pct">SLU hit</span>
  </div>
  <div class="cs-funnel__step">
    <span class="cs-funnel__label">User Confirmed</span>
    <div class="cs-funnel__bar"><div class="cs-funnel__fill" style="width:35%"></div></div>
    <span class="cs-funnel__pct">Confirmed</span>
  </div>
  <div class="cs-funnel__branch">
    <div class="cs-funnel__branch-item cs-funnel__branch-item--yes">&#10003; Resolved</div>
    <div class="cs-funnel__branch-item cs-funnel__branch-item--no">&#10007; Not Resolved</div>
  </div>
</div>

<a href="/frameworks/voicebot-metrics-funnel/" class="cs-fw-link reveal">&rarr; Explore the full Voicebot Call Resolution Funnel framework</a>

<div class="testimonial">
  <p class="testimonial__sentiment">TRUST RESTORED</p>
  <p class="testimonial__quote">"After the funnel rebuild, this was the first time the bank's team could independently verify our containment numbers against their own raw data. The conversation shifted from 'we don't trust your metrics' to 'show us how to improve them.'"</p>
  <p class="testimonial__attribution">— Paraphrased stakeholder reaction, post-MIS deployment</p>
</div>

## Divide and Conquer: Triaging System Failures
{: #divide-and-conquer-triaging-system-failures}

<p class="cs-lead">With accurate data in hand, three failure patterns emerged — each requiring a different team and approach:</p>
{: .cs2-lead}

<figure class="mermaid-diagram" role="img" aria-label="Pie chart showing the breakdown of system failures: 47% authentication, 30% intent classification, 23% conversation dead-ends">
<img src="/assets/images/case-studies/09-failure-breakdown.svg" alt="Pie chart: Authentication Failures (47% OTP drop-off), Intent Classification Gaps (SLU at 70%), and Conversation Flow Dead-Ends (23%)" />
<figcaption>Authentication failures dominated — the biggest blocker wasn't intent classification but OTP drop-off.</figcaption>
</figure>

<ul class="cs-body-list">
  <li><strong>Intent classification gaps.</strong> The SLU model was inherited from a simple 20-intent call-steering bot. Intents had been bolted on without cleanup, never restructured for <strong>300+ use cases</strong>. At <strong>70%</strong> accuracy on trained intents, it consistently failed on complex utterances — indirect requests, multi-intents — escalating everything else to human agents.</li>
  <li><strong>Authentication failures.</strong> The finding that changed priorities: <strong>47% of callers failed after entering their OTP.</strong> Root cause was critical DTMF bugs — failure to capture the first digit or timing out on inter-digit inputs. Even perfectly classified intents were losing customers downstream.</li>
  <li><strong>Conversation flow dead-ends.</strong> No graceful fallbacks. After three failed attempts, the bot would simply hang up. Calls our old MIS counted as "contained" were customers abandoning in frustration.</li>
</ul>

I proposed a **hybrid approach**: flow optimization and authentication fixes for quick wins, SLU expansion for sustained improvement, and security compliance absorbed in parallel.


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
<p class="cs2-aside cs2-aside--centered">The hybrid approach balanced immediate wins with sustained model improvement.</p>

I organized the work into **three squads**: Squad 1 (maintenance and bug fixes), Squad 2 (new use cases and intent expansion), and Squad 3 (security, compliance, and infrastructure). Each squad had clear ownership, and the bank's stakeholders knew exactly who to contact for what.

<figure class="viz" role="img" aria-label="Three squads organizational structure with team composition">
<svg viewBox="0 0 700 140" xmlns="http://www.w3.org/2000/svg">
  <!-- Squad 1 -->
  <rect x="10" y="10" width="216" height="120" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="118" y="35" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#e8eaed">Squad 1</text>
  <text x="118" y="55" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#7d8590">Maintenance & Bug Fixes</text>
  <line x1="40" y1="68" x2="196" y2="68" stroke="#21262d" stroke-width="1"/>
  <text x="118" y="88" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#4A9EFF">Designer</text>
  <text x="118" y="104" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#4A9EFF">Analyst</text>
  <text x="118" y="120" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#4A9EFF">Operations</text>

  <!-- Squad 2 -->
  <rect x="242" y="10" width="216" height="120" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="350" y="35" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#e8eaed">Squad 2</text>
  <text x="350" y="55" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#7d8590">New Use Cases</text>
  <line x1="272" y1="68" x2="428" y2="68" stroke="#21262d" stroke-width="1"/>
  <text x="296" y="88" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#4A9EFF">Engineer</text>
  <text x="404" y="88" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#4A9EFF">Designer</text>
  <text x="296" y="108" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#4A9EFF">Operations</text>
  <text x="404" y="108" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#4A9EFF">ML</text>

  <!-- Squad 3 -->
  <rect x="474" y="10" width="216" height="120" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="582" y="35" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#e8eaed">Squad 3</text>
  <text x="582" y="55" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#7d8590">Security & Infrastructure</text>
  <line x1="504" y1="68" x2="660" y2="68" stroke="#21262d" stroke-width="1"/>
  <text x="582" y="88" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#4A9EFF">DevOps</text>
  <text x="582" y="104" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#4A9EFF">Engineering</text>
  <text x="582" y="120" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#4A9EFF">Product</text>
</svg>
<figcaption>Three squads with clear ownership: maintenance, expansion, and security delivered in parallel.</figcaption>
</figure>


## What Went Wrong
{: #what-went-wrong}

<p class="cs-lead">This section exists because I believe case studies that only show wins aren't useful. Here's what didn't go as planned:</p>
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

<div class="cs-statement reveal">Our model was solution-oriented, but customers call to articulate problems — not state clear requests.</div>

However, this effort failed to address a massive structural gap in our identification layer. The bot's architecture was fundamentally solution-oriented, expecting customers to state clear requests. In reality, customers call to articulate complex problems.

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
  <div class="mismatch__arrow mismatch__arrow--dashed"></div>
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

<div class="cs-incident-bar">
  <div class="cs-incident-bar__header">
    <span class="cs-incident-bar__title">15 Incidents in 3 Months</span>
    <span class="cs-incident-bar__subtitle">Sep – Nov 2025</span>
  </div>
  <div class="cs-incident-bar__chart">
    <div class="cs-incident-bar__row">
      <span class="cs-incident-bar__label">DR Switchover</span>
      <div class="cs-incident-bar__track"><div class="cs-incident-bar__fill cs-incident-bar__fill--5" style="width:33%"></div></div>
      <span class="cs-incident-bar__count">5</span>
    </div>
    <div class="cs-incident-bar__row">
      <span class="cs-incident-bar__label">Bank API Failures</span>
      <div class="cs-incident-bar__track"><div class="cs-incident-bar__fill cs-incident-bar__fill--4" style="width:27%"></div></div>
      <span class="cs-incident-bar__count">4</span>
    </div>
    <div class="cs-incident-bar__row">
      <span class="cs-incident-bar__label">Network Drops</span>
      <div class="cs-incident-bar__track"><div class="cs-incident-bar__fill cs-incident-bar__fill--3" style="width:20%"></div></div>
      <span class="cs-incident-bar__count">3</span>
    </div>
    <div class="cs-incident-bar__row">
      <span class="cs-incident-bar__label">Process Failures</span>
      <div class="cs-incident-bar__track"><div class="cs-incident-bar__fill cs-incident-bar__fill--2" style="width:13%"></div></div>
      <span class="cs-incident-bar__count">2</span>
    </div>
    <div class="cs-incident-bar__row">
      <span class="cs-incident-bar__label">DB/Infra</span>
      <div class="cs-incident-bar__track"><div class="cs-incident-bar__fill cs-incident-bar__fill--1" style="width:7%"></div></div>
      <span class="cs-incident-bar__count">1</span>
    </div>
  </div>
</div>

These outages were driven by a combination of our own architectural flaws — specifically around production-to-DR switchover mechanisms — and external vulnerabilities like bank API connection failures and network drops. The sheer volume strained the bank's trust and severely disrupted our containment improvement drive.

### The ARSIM Process Failure

<div class="cs-before-after">
  <div class="cs-before-after__col cs-before-after__col--before">
    <span class="cs-before-after__label">Before</span>
    <p>No mandatory client approval for maintenance windows. Infrastructure team could shut down production services without confirming with the bank.</p>
  </div>
  <span class="cs-before-after__arrow" aria-hidden="true">&rarr;</span>
  <div class="cs-before-after__col cs-before-after__col--after">
    <span class="cs-before-after__label">After</span>
    <p>Mandatory written client handshake before any system touches. Formal maintenance window approval chain instituted immediately.</p>
  </div>
</div>

The failure caused approximately seven minutes of unplanned downtime during live calls. It wasn't technical — it was a pure process breakdown. The damage to our credibility was already done.

### Security Scope Creep

The bank added **LDAP + MFA authentication, DB encryption, HTTPS migration, and SRTP compliance** to our backlog mid-sprint. Each was a non-negotiable RBI regulatory requirement.

<figure class="mermaid-diagram" role="img" aria-label="Gantt chart showing security compliance items injected mid-sprint alongside the original delivery scope">
<img src="/assets/images/case-studies/15-security-scope.svg" alt="Gantt chart: Original sprint scope (Containment Improvements, Use Case Development, SLU Model Expansion) running from Jul-Dec 2025. Injected security items (LDAP+MFA, DB Encryption, HTTPS Migration, SRTP Compliance, APIGEE OAuth) overlapping from Aug 2025 to Mar 2026. Milestone: Squad 3 at 90% security capacity in Oct 2025." />
<figcaption>RBI-mandated security requirements (red) injected mid-sprint on top of the existing delivery scope.</figcaption>
</figure>

<div class="cs-callout-stat">
  <div class="cs-callout-stat__value">90%</div>
  <div class="cs-callout-stat__text">Absorbing these mandates without stalling our containment initiatives required ruthless re-prioritization. During certain weeks, security compliance consumed <strong>90% of our infrastructure bandwidth</strong>, creating severe bottlenecks for feature deployments.</div>
</div>

## What We Built
{: #what-we-built}

<p class="cs-lead">Despite the setbacks, the project delivered meaningful improvement across multiple dimensions:</p>
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
</div>

Here's the detail behind each outcome:

<div class="cs-swap">
  <span class="cs-swap__before">70%</span>
  <span class="cs-swap__arrow" aria-hidden="true">&rarr;</span>
  <span class="cs-swap__after">91%</span>
  <span class="cs-swap__context">SLU Inscope Accuracy — Before &rarr; After</span>
</div>

<div class="cs-statement reveal">Post-deployment, we observed measurable improvement in the highest-volume flows — iMobile, unable to transact, transaction issues, and outstanding balance. The SLU model earned production sign-off on December 17, 2025.</div>

### Authentication Improvement

The crippling **47% OTP failure rate** was directly addressed through a redesigned authentication journey and crucial DTMF patience features.

<div class="cs-impact-strip">
  <div class="cs-impact-cell">
    <div class="cs-impact-value">8s</div>
    <div class="cs-impact-label">First-Digit Wait</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-value">6s</div>
    <div class="cs-impact-label">Inter-Digit Wait</div>
  </div>
</div>

### Deployment Discipline

<div class="cs-impact-strip">
  <div class="cs-impact-cell">
    <div class="cs-impact-value">5</div>
    <div class="cs-impact-label">Major Deploys</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-value">8 mo</div>
    <div class="cs-impact-label">Timeline (Aug–Mar)</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-value">2×</div>
    <div class="cs-impact-label">Environments</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-value">100%</div>
    <div class="cs-impact-label">POA Coverage</div>
  </div>
</div>

Each release executed with formal Plan of Action, email-based approval chain, and coordinated Prod + DR execution.

<div class="cs-two-col cs-two-col--divided">
  <div class="cs-two-col__left">
    <h3>Incident Governance</h3>
    <p>Built a <strong>20-scenario air-gapped K8s runbook</strong> after the October outage — L1/L2 teams could execute recovery immediately, eliminating single points of failure. Instituted <strong>mandatory client approval</strong> for all maintenance windows, on-call rotations, and escalation matrices. Every subsequent delivery was safe.</p>
  </div>
  <div class="cs-two-col__right">
    <h3>Security Delivered in Parallel</h3>
    <p>RBI-mandated compliance — LDAP+MFA, DB encryption, HTTPS, APIGEE OAuth — delivered by <strong>dedicated Squad 3</strong> without blocking containment. Phased rollout negotiated with the bank, security regressions embedded into existing QA cycles to prevent bottlenecks.</p>
  </div>
</div>

## Things I'd Do Differently
{: #things-id-do-differently}

<p class="cs-lead">The air-gapped environment was the defining constraint. Every decision — from squad structure to deployment discipline to the 20-scenario runbook — was shaped by the physical reality that nothing could be debugged remotely.</p>

<div class="cs-statement reveal">If I could restart this 30-use-case rollout, building a "100% trust" analytics pipeline wouldn't be a mid-project pivot — it would be week one.</div>

<div class="lesson-grid lesson-grid--rows">
  <div class="lesson-card lesson-card--row">
    <span class="lesson-card__number">01</span>
    <div class="lesson-card__content">
      <div class="lesson-card__title">Fix measurement first</div>
      <div class="lesson-card__body">We chased 8L contained calls against a system we couldn't trust. Pausing optimization to build a call resolution funnel from scratch revealed the real baseline was 20K calls — reporting bugs and broken fallbacks had masked reality. Trusted analytics should have been week one.</div>
    </div>
  </div>
  <div class="lesson-card lesson-card--row">
    <span class="lesson-card__number">02</span>
    <div class="lesson-card__content">
      <div class="lesson-card__title">Enterprise AI governance is product management</div>
      <div class="lesson-card__body">POAs, approval chains, CUG testing, maintenance windows — not overhead, but the discipline separating enterprise AI from a demo. The ARSIM 7-minute outage didn't just hurt our SLA — it cost months of rebuilt trust because a mandatory client handshake didn't exist.</div>
    </div>
  </div>
  <div class="lesson-card lesson-card--row">
    <span class="lesson-card__number">03</span>
    <div class="lesson-card__content">
      <div class="lesson-card__title">Single points of failure are PM risks</div>
      <div class="lesson-card__body">One engineer for prod-to-DR switchovers. Undocumented tribal knowledge for recovery. 15 critical incidents in 3 months forced us to mature overnight — on-call rotations, escalation matrices, 20-scenario K8s runbooks. Build operational muscle before you need it.</div>
    </div>
  </div>
  <div class="lesson-card lesson-card--row">
    <span class="lesson-card__number">04</span>
    <div class="lesson-card__content">
      <div class="lesson-card__title">Influence through data breaks deadlocks</div>
      <div class="lesson-card__body">Everyone blamed the NLU model. Our funnel data revealed 47% of callers dropped at OTP — DTMF timeout bugs, not intent classification. Bringing this data to the bank aligned everyone instantly on a hybrid fix. In cross-functional deadlocks, aggregate data is the only objective tiebreaker.</div>
    </div>
  </div>
  <div class="lesson-card lesson-card--row">
    <span class="lesson-card__number">05</span>
    <div class="lesson-card__content">
      <div class="lesson-card__title">Absorb scope without losing the thread</div>
      <div class="lesson-card__body">RBI-mandated security arrived mid-sprint — non-negotiable. Three distinct squads was the answer: dedicated Squad 3 for all infra and compliance, shielding core teams from context switching. A PM's job isn't to push back on compliance — it's to organize work so it doesn't kill delivery.</div>
    </div>
  </div>
</div>

<blockquote class="testimonial testimonial--featured">
  <p class="testimonial__quote">"In cross-functional deadlocks, aggregate data is the only objective tiebreaker."</p>
</blockquote>
