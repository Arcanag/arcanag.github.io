---
layout: case-study
title: "How We Improved Voicebot Containment from 52% to 78% for India's Largest Private Bank"
description: "A B2B AI case study on driving product improvement without the PM title — improving voicebot performance across a 2,188-state conversational AI system in an air-gapped enterprise environment."
category: "B2B AI Product"
key_metric: "52% → 78% containment"
read_time: "12 min read"
date: 2025-10-01
toc:
  - title: "Context & Problem"
    anchor: "context--problem"
  - title: "Discovery & Research"
    anchor: "discovery--research"
  - title: "Framing & Strategy"
    anchor: "framing--strategy"
  - title: "The Messy Middle"
    anchor: "the-messy-middle"
  - title: "Results & Impact"
    anchor: "results--impact"
  - title: "Reflection"
    anchor: "reflection"
---

## Context & Problem
{: #context--problem}

Skit.ai (formerly Vernacular.ai) builds conversational AI for enterprise — voicebots that handle millions of inbound and outbound calls for banks, telecoms, and insurance companies. I joined as a Delivery Manager, but the role quickly evolved into something closer to a product owner for our largest client: one of India's biggest private-sector banks.

The voicebot was deployed in an **air-gapped, on-premises Kubernetes cluster** — no internet access, no external container registry, no quick hotfixes. Every deployment required a formal Plan of Action, email approval chains, and coordinated downtime windows across production and disaster recovery environments. The system itself was massive: **2,188 conversational states**, **36 active intents**, **144 backend API actions**, and **133 integration endpoints** connecting to the bank's core systems.

The problem was clear from the data: **containment rate — the percentage of calls fully resolved by the AI without human handoff — had plateaued at 52%**. The bank was paying for automation that only handled half their calls. With the contract renewal approaching, two factors made this urgent: the bank's internal team was benchmarking us against competitors, and $2.1M in annual revenue was tied to demonstrating measurable improvement.

<div class="metric-box">
  <span class="metric-box__label">Containment Rate<br>at baseline</span>
  <span class="metric-box__number">52%</span>
</div>

## Discovery & Research
{: #discovery--research}

I didn't have a PM title, but I had something more useful: direct access to conversation analytics across all client integrations. I started by pulling data across our 16+ enterprise clients, looking for patterns in where calls were failing.

The first discovery was that **our own containment metrics were wrong**. A bug in MIS reporting was counting "max retries hangup" as contained calls — callers who gave up after too many failed attempts were being marked as successfully handled. This meant our real containment rate was actually *lower* than 52%. Before we could improve the metric, we had to fix how we measured it. This led to a full MIS revamp — rebuilt from scratch to achieve what the team started calling "100% trust" in our numbers.

With accurate data in hand, three failure patterns emerged:

- **Intent classification gaps**: Our SLU (Spoken Language Understanding) model only recognized 60+ intents, but the bank had 300+ use cases customers called about. Anything outside our intent universe was immediately escalated to a human agent.
- **DTMF capture failures**: Secure input (OTP verification, card numbers) via DTMF tones had accuracy issues, causing legitimate callers to fail authentication and get transferred.
- **Conversation flow dead-ends**: Certain flows lacked graceful fallbacks — when the bot couldn't understand a response after 3 attempts, it would hang up rather than offer alternatives.

The insight that changed our approach: **failures clustered in the first 3 conversational turns**, not deeper in the flow. Customers weren't dropping off mid-task — they were being lost before the bot even understood what they wanted.

## Framing & Strategy
{: #framing--strategy}

I packaged these findings into a "Containment Improvement Proposal" with estimated revenue impact per fix. The framing was simple:

> If we expand intent coverage from 60+ to 300+ intents and fix the top 5 failure patterns, we retain this account and protect $2.1M in annual revenue.

Three options were on the table:

1. **Full SLU model retrain** — retrain the entire spoken language understanding model with production utterances. High potential impact, but 8-12 weeks to execute in an air-gapped environment where training data had to be manually exported.
2. **Conversation flow redesign** — rewrite fallback handling and add probing flows for ambiguous intents. Faster to ship, testable on the CUG (Closed User Group) environment.
3. **Hybrid approach** — targeted SLU expansion with live utterances + flow optimization + DTMF accuracy fixes. Ship improvements in parallel workstreams.

We chose option 3. It let us show incremental progress to the client while building toward the larger model improvement. I organized the work into three squads: Squad 1 (maintenance and bug fixes), Squad 2 (new use cases and intent expansion), Squad 3 (security, compliance, and infrastructure).

What we explicitly decided **not** to do: full platform re-architecture, building custom ASR, or migrating off the air-gapped environment. These were multi-quarter investments that wouldn't move the needle before the renewal.

## The Messy Middle
{: #the-messy-middle}

### The persuasion problem

The engineering team initially pushed back. Their view: "These are client configuration issues, not product issues." The bank's team echoed a similar sentiment from the other side: "Your bot doesn't understand our customers."

I presented the aggregate data showing the same 5 failure patterns across all our enterprise clients — this wasn't a single client's misconfiguration. It was a product gap. The meeting where I showed the intent coverage map (60 recognized intents vs. 300+ actual use cases) was the turning point.

### What went wrong

**SLU retraining was harder than expected.** We exported 14,000 live utterances from the air-gapped environment for model retraining — a multi-week process involving manual data transfer, anonymization, and compliance review. The first retrained model improved intent accuracy on paper, but containment didn't budge. Why? Because improving classification only matters if the flows behind those intents actually exist. We had better recognition of what customers wanted, but no way to serve half of those requests.

**The ARSIM incident.** On March 11, our infrastructure team stopped kubelet and containerd on production servers without client approval or traffic diversion. The bot went down during live calls. This wasn't directly related to our containment work, but it consumed two weeks of team bandwidth and forced us to create a 20-scenario air-gapped K8s runbook before the bank would approve further changes.

**Scope creep on security.** The bank added LDAP + MFA authentication, DB encryption (mobile number masking), HTTPS migration, and SRTP compliance to our backlog mid-sprint. Each was non-negotiable — RBI regulatory requirements. We had to absorb this work without slowing the containment initiative.

### The pivot

After the SLU retraining didn't move containment, I shifted the team's focus:

1. **Flow optimization first**: Add intent probing at confirmation stages, implement "OOS probing" (out-of-scope probing to catch intents we couldn't serve), and fix prompt parity issues between English and Hindi flows.
2. **DTMF accuracy fix**: Multiple testing rounds with encryption disabled, patience feature (3-second wait per digit), and soft launch on CUG before production.
3. **MIS rebuild**: New containment reporting with proper definitions — no more false positives inflating the numbers.
4. **Parallel SLU expansion**: Continue expanding the intent universe in the background while flow improvements delivered immediate wins.

<div class="callout">
Sprint timeline: Weeks 1-3: Discovery + MIS fix. Weeks 4-5: Proposal + squad formation. Weeks 6-12: Flow optimization + DTMF fix + 7 production deployments. Weeks 13-16: SLU retraining results deployed. Ongoing: Security compliance absorbed in parallel.
</div>

## Results & Impact
{: #results--impact}

<div class="metric-box">
  <span class="metric-box__label">Containment Rate<br>before → after</span>
  <span class="metric-box__number">52% → 78%</span>
</div>

<div class="metric-box">
  <span class="metric-box__label">Client NPS<br>before → after</span>
  <span class="metric-box__number">34 → 61</span>
</div>

<div class="metric-box">
  <span class="metric-box__label">Revenue Protected<br>annual contract</span>
  <span class="metric-box__number">$2.1M</span>
</div>

**What moved the needle:**
- 7+ production deployments managed across the period, each with POA, approval chain, and PROD+DR deployment
- Flow version progressed from 0.1.56 to 0.1.127+ — continuous improvement cadence
- 250+ Integration Proxy releases (v4.1.509 to v4.1.763)
- 553 tracked work items in the ICICI project alone
- Full security posture uplift delivered in parallel without blocking product improvements

**What we didn't achieve:** We didn't hit 85%. The remaining 22% gap represents edge cases requiring either significant NLU investment (expanding from 60+ to all 300+ bank use cases) or human-in-the-loop hybrid flows for complex multi-step transactions. This is a deliberate trade-off for V2 — the current 78% already covers the use cases that represent the highest call volume and customer frustration.

## Reflection
{: #reflection}

**What I'd do differently:** Start with flow analysis and MIS accuracy *before* model retraining. We lost 3-4 weeks on the SLU retrain cycle before discovering that the flows behind those intents didn't exist yet. If I'd mapped intent coverage to existing flows first, we would have known that flow optimization needed to come before model improvement.

**The transferable insight:** In AI products, there's a dangerous assumption that model accuracy is the primary lever. At Skit.ai, the model was only one component of a system that included conversation design, integration reliability, DTMF capture, and reporting accuracy. Improving intent classification by 40% did nothing for containment until we fixed the flows, the measurement, and the input capture. **The data closest to the customer is the most persuasive roadmap input** — not the model accuracy benchmark, but the conversation log where you can hear a customer give up.

**What this taught me about AI products in enterprise:** Air-gapped, compliance-heavy environments don't move slowly because people are slow. They move slowly because every change carries real risk — a bad deployment takes down live calls to bank customers. The discipline of formal POAs, approval chains, and CUG testing isn't overhead. It's the product management skill that separates enterprise AI from demo AI.
