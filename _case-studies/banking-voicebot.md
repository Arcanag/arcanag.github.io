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
  - title: "The Broken Metric"
    anchor: "the-broken-metric"
  - title: "Three Problems, One Sprint"
    anchor: "three-problems-one-sprint"
  - title: "What Went Wrong"
    anchor: "what-went-wrong"
  - title: "What We Built"
    anchor: "what-we-built"
  - title: "Lessons Learned"
    anchor: "lessons-learned"
---

## Context & Takeover
{: #context--takeover}

Skit.ai builds conversational AI for enterprise — voicebots that handle millions of calls for banks, telecoms, and insurance companies. Our largest India client was one of the country's biggest private-sector banks, running a bilingual voicebot (English + Hindi) that handled **100,000+ calls per day** across an air-gapped, on-premises Kubernetes cluster.

I took over Phase 2 of this project in **January 2025** — covering SLU (Spoken Language Understanding) improvement, new use case development, and MIS accuracy. By **April 2025**, I had full project ownership: three squads, 553 tracked work items, and a client relationship that needed repair.

What I inherited was a technically ambitious system — 2,188 conversational states, 133 integration endpoints to the bank's core systems — but one where the most basic question couldn't be answered reliably: *how many calls is the bot actually resolving?*

The bank's senior leadership was asking for metric improvement in every review meeting. Our ML lead was messaging the team: *"We need to be very aggressive on outcomes. We don't have much time. By Feb end we must improve the Containment Rate."* But the metric itself was broken, and nobody had stopped to fix it.

<div class="metric-box">
  <span class="metric-box__label">Daily Call Volume</span>
  <span class="metric-box__number">100K+</span>
</div>

## The Broken Metric
{: #the-broken-metric}

Containment rate — the percentage of calls fully resolved by the AI without human handoff — was our primary business metric. In **December 2024**, internal calculations showed **44% containment**. By **January 2025**, the same calculation showed **14.9%**. A colleague flagged it plainly: *"Containment rate in Dec'24 was 44% and in Jan'25 it was 14.9%. Nobody knows why and I'm not even sure if my calculation is right."*

My first instinct as the incoming PM was the same as everyone else's: find a way to improve containment fast. But the more I dug into the data, the clearer it became that we weren't dealing with a performance problem — we were dealing with a **measurement problem**.

Investigation revealed **50+ containment-related bugs** in our reporting system. The most damaging: calls where customers gave up after repeated failed attempts ("max retries hangup") were being counted as *contained* — successfully resolved. Other bugs included entire days of blank containment data, PIN generation flows not tracked at all, and use cases silently missing from reports. In total, we logged **45 separate MIS tickets** before the picture was complete.

The PM decision I'm most proud of was the least popular one: **fix measurement before optimization.** Everyone wanted to improve the number. I insisted we first make the number trustworthy. I pushed for a full MIS revamp from scratch — a "100% trust" rebuild of our containment reporting.

The cost was real. After the fix, our PM saw the impact immediately: *"Our containment is down 30%, from 1,000 calls to 700 calls. Need to figure this out — this is after MIS update."* We hadn't gotten worse. We'd started measuring honestly. But explaining a 30% drop in your primary metric to a bank that's already questioning your product is not a comfortable conversation.

We rebuilt the entire reporting stack: **12+ automated dashboards** covering daily, weekly, and monthly metrics; intent-wise containment alerts; RCA dashboards for day-over-day and week-over-week analysis; and a metrics waterfall for leadership reviews. The bank received **automated daily containment reports** — 201 of which I can count in our email history.

<div class="metric-box">
  <span class="metric-box__label">Containment Bugs Found</span>
  <span class="metric-box__number">50+</span>
</div>

<figure class="viz" role="img" aria-label="Containment metric timeline showing the crisis from December 2024 to June 2025">
<svg viewBox="0 0 700 140" xmlns="http://www.w3.org/2000/svg">
  <line x1="60" y1="70" x2="640" y2="70" stroke="#444" stroke-width="2"/>
  <circle cx="120" cy="70" r="6" fill="#f0ebe0"/><text x="120" y="45" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#f0ebe0">44%</text><text x="120" y="100" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888">Dec 2024</text>
  <circle cx="280" cy="70" r="6" fill="#ff2d00"/><text x="280" y="45" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#ff2d00">14.9%</text><text x="280" y="100" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888">Jan 2025</text>
  <circle cx="440" cy="70" r="6" fill="#f0ebe0"/><text x="440" y="45" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#f0ebe0">MIS Fix</text><text x="440" y="100" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888">Apr 2025</text>
  <circle cx="580" cy="70" r="6" fill="#f0ebe0"/><text x="580" y="45" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#f0ebe0">Honest Baseline</text><text x="580" y="100" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#888">Jun 2025</text>
  <text x="200" y="128" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#ff2d00">Measurement problem, not performance</text>
</svg>
<figcaption>Containment metric timeline: the 44% → 14.9% drop was a measurement crisis, not a performance one.</figcaption>
</figure>

## Three Problems, One Sprint
{: #three-problems-one-sprint}

With accurate data in hand, three failure patterns emerged — each requiring a different team and approach:

**Intent classification gaps.** Our SLU model recognized **60+ intents**, but the bank had **300+ use cases** customers called about. An analysis of 18,940 tagged live utterances revealed a **16.4% SLU error rate** — nearly 1 in 6 customer intents were being misclassified. Anything outside our intent universe was immediately escalated to a human agent.

**Authentication failures.** This was the finding that changed priorities. **47% of callers failed after entering their OTP.** Nearly half of all customers who reached the authentication step were being dropped before they could complete their request. This was surfaced directly in a joint meeting with the bank's team — and it meant that even perfectly classified intents were losing customers downstream.

**Conversation flow dead-ends.** Certain flows had no graceful fallbacks. When the bot couldn't understand a response after 3 attempts, it would hang up. Calls our old MIS counted as "contained" were actually customers abandoning in frustration.

I proposed a **hybrid approach**: flow optimization and authentication fixes for quick wins, SLU expansion for sustained improvement, and security compliance absorbed in parallel. Three options were considered — full SLU retrain (8-12 weeks in an air-gapped environment), conversation flow redesign only, or the hybrid. We went with hybrid because it let us show incremental progress to the bank while building toward larger model improvements.

What we explicitly said no to: full platform re-architecture, building custom ASR, and migrating off the air-gapped environment. Each had internal advocates. Each would have taken quarters, not weeks.

I organized the work into **three squads**: Squad 1 (maintenance and bug fixes), Squad 2 (new use cases and intent expansion), Squad 3 (security, compliance, and infrastructure). Each squad had clear ownership, and the bank's stakeholders knew exactly who to contact for what.

<figure class="viz" role="img" aria-label="Three squads organizational structure">
<svg viewBox="0 0 700 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="216" height="80" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="118" y="38" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f0ebe0">Squad 1</text>
  <text x="118" y="58" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">Maintenance</text>
  <text x="118" y="74" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">& Bug Fixes</text>
  <rect x="242" y="10" width="216" height="80" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="350" y="38" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f0ebe0">Squad 2</text>
  <text x="350" y="58" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">New Use Cases</text>
  <text x="350" y="74" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">& SLU Expansion</text>
  <rect x="474" y="10" width="216" height="80" rx="4" fill="#141414" stroke="#222" stroke-width="1.5"/>
  <text x="582" y="38" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="bold" fill="#f0ebe0">Squad 3</text>
  <text x="582" y="58" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">Security, Compliance</text>
  <text x="582" y="74" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#888">& Infrastructure</text>
</svg>
<figcaption>Three squads with clear ownership: maintenance, expansion, and security delivered in parallel.</figcaption>
</figure>

<div class="metric-box">
  <span class="metric-box__label">OTP Failure Rate</span>
  <span class="metric-box__number">47%</span>
</div>

<figure class="viz" role="img" aria-label="Authentication failure funnel showing 47% drop at OTP stage">
<svg viewBox="0 0 700 180" xmlns="http://www.w3.org/2000/svg">
  <rect x="40" y="10" width="560" height="32" rx="3" fill="#222"/>
  <text x="50" y="31" font-family="sans-serif" font-size="12" fill="#f0ebe0">Total Calls</text><text x="590" y="31" text-anchor="end" font-family="sans-serif" font-size="12" fill="#888">100%</text>
  <rect x="70" y="52" width="468" height="32" rx="3" fill="#222"/>
  <text x="80" y="73" font-family="sans-serif" font-size="12" fill="#f0ebe0">SLU Classified</text><text x="528" y="73" text-anchor="end" font-family="sans-serif" font-size="12" fill="#888">83.6%</text>
  <rect x="100" y="94" width="380" height="32" rx="3" fill="#222"/>
  <text x="110" y="115" font-family="sans-serif" font-size="12" fill="#f0ebe0">OTP Reached</text><text x="470" y="115" text-anchor="end" font-family="sans-serif" font-size="12" fill="#888">~65%</text>
  <rect x="130" y="136" width="200" height="32" rx="3" fill="#ff2d00" opacity="0.8"/>
  <text x="140" y="157" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f0ebe0">Authenticated</text><text x="320" y="157" text-anchor="end" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f0ebe0">53%</text>
  <text x="400" y="157" font-family="sans-serif" font-size="11" fill="#ff2d00">47% failed at OTP</text>
</svg>
<figcaption>Authentication funnel: 47% of callers failed at the OTP stage — the single biggest containment blocker.</figcaption>
</figure>

## What Went Wrong
{: #what-went-wrong}

This section exists because I believe case studies that only show wins aren't useful. Here's what didn't go as planned.

**SLU retraining didn't move containment.** We exported 14,000 live utterances from the air-gapped environment — a multi-week process involving manual data transfer, anonymization, and compliance review. The retrained model improved intent accuracy on paper. Containment didn't budge. The reason was obvious in retrospect: improving classification only matters if the flows behind those intents actually exist. We had better recognition of what customers wanted, but no way to serve half of those requests. I should have mapped intent coverage to existing flows before approving the retraining cycle. That sequencing mistake cost us 3-4 weeks.

**The October 4th outage.** A service mesh failure took down the bot during live calls. The escalation was immediate and brutal. From the incident channel: *"ICICI bot is failing again. Who is working on it?"* ... *"Nobody is responding. Only Anurag alone cannot handle this."* ... *"Client is yelling on the call."* I was the sole responder from our side. We resolved it by restarting affected services, but the real failure was structural: we had no incident response procedure, no on-call rotation, and no pre-defined escalation path. The bank's senior stakeholder was furious — and rightly so.

**Solo deployment on November 26th.** Both infrastructure engineers were on leave. I deployed Flow 0.1.127 to production and DR myself — intent probing changes and SMS middleware. It worked, but deploying to a live banking system as a single point of failure is not a process success. It's a risk I should have escalated earlier.

**The ARSIM incident (March 2026).** During planned server maintenance, an infrastructure team member shut down production services without confirming with or informing the bank. Approximately 7 minutes of unplanned downtime during live calls. The failure wasn't technical — it was process: no mandatory client approval step existed for maintenance windows. We built one afterward. But the trust cost with the bank was immediate.

**Security scope creep.** The bank added LDAP + MFA authentication, DB encryption (mobile number masking), HTTPS migration, and SRTP compliance to our backlog mid-sprint. Each was non-negotiable — RBI regulatory requirements. Absorbing this without slowing the containment initiative required constant re-prioritization. Some weeks, security consumed 60% of infrastructure bandwidth.

## What We Built
{: #what-we-built}

Despite the setbacks, the project delivered meaningful improvement across multiple dimensions:

**Measurement integrity.** 50+ containment bugs fixed. MIS rebuilt from scratch with "100% trust" as the design principle. 12+ automated dashboards deployed. The bank now received daily automated containment reports they could verify against their own data — a fundamental shift from "we think the metric is X" to "here's the metric, here's how we calculated it, here's how you can validate it."

**SLU accuracy.** Inscope success rate reached **91%**, with out-of-scope success at **82%** — earning sign-off for production deployment on December 17, 2025. Post-deployment, we observed measurable improvement in high-volume flows: imobile, unable to transact, transaction issues, and outstanding balance.

<div class="metric-box">
  <span class="metric-box__label">SLU Inscope Accuracy</span>
  <span class="metric-box__number">91%</span>
</div>

<figure class="viz" role="img" aria-label="SLU accuracy improvement: error rate 16.4% before, inscope accuracy 91% after">
<svg viewBox="0 0 700 120" xmlns="http://www.w3.org/2000/svg">
  <text x="30" y="35" font-family="sans-serif" font-size="11" fill="#888">Before</text>
  <rect x="130" y="20" width="93" height="28" rx="3" fill="#ff2d00" opacity="0.7"/>
  <text x="235" y="39" font-family="sans-serif" font-size="12" fill="#ff2d00">16.4% error rate</text>
  <text x="30" y="80" font-family="sans-serif" font-size="11" fill="#888">After</text>
  <rect x="130" y="65" width="516" height="28" rx="3" fill="#f0ebe0" opacity="0.9"/>
  <text x="658" y="84" font-family="sans-serif" font-size="12" font-weight="bold" fill="#f0ebe0">91% inscope</text>
  <rect x="130" y="100" width="465" height="6" rx="2" fill="#888" opacity="0.3"/>
  <text x="607" y="110" font-family="sans-serif" font-size="10" fill="#888">82% OOS</text>
</svg>
<figcaption>SLU accuracy transformation: from 16.4% error rate to 91% inscope and 82% out-of-scope success.</figcaption>
</figure>

**Authentication improvement.** The 47% OTP failure rate was addressed through a redesigned authentication journey, DTMF patience features (3-second wait per digit), and multiple CUG testing rounds before production rollout.

**Deployment discipline.** 5 production deployments managed across August 2025 to March 2026 (Flow 0.1.56 → 0.1.127, Aug 12 → Nov 26), each with a formal Plan of Action, email-based approval chain, and coordinated execution across production and DR environments.

**Incident governance.** After the October outage: a 20-scenario air-gapped Kubernetes runbook. After the ARSIM incident: mandatory written client approval policy for all maintenance windows. These weren't product improvements — they were process improvements that made every subsequent product improvement possible.

**Security delivered in parallel.** LDAP + MFA, DB encryption, HTTPS migration, APIGEE API Key + OAuth — all RBI-mandated, all delivered without blocking the containment improvement track. This was the hardest prioritization challenge of the project: saying "yes, and" to compliance requirements while protecting the main delivery thread.

## Lessons Learned
{: #lessons-learned}

**Fix measurement first.** We spent months making product improvements against a metric we couldn't trust. When we fixed the MIS, we discovered the real baseline was far lower than anyone thought — and some of our earlier "improvements" were invisible because the old system was masking them. If I could restart this project, the MIS revamp would be week one, not month four.

**Enterprise AI governance is product management.** POAs, approval chains, CUG testing, email-based sign-offs — these aren't overhead. They're the product management discipline that separates enterprise AI from demo AI. The ARSIM incident taught me this viscerally: a 7-minute unplanned outage doesn't just cost you uptime metrics. It costs you the trust that takes months to rebuild.

**Single points of failure are PM risks, not just engineering risks.** One person responding to production outages. One person deploying to a live banking system. These aren't war stories — they're process failures. The PM's job is to flag these as risks before they become incidents, not to absorb them heroically after the fact.

**Influence through data breaks deadlocks.** The engineering team believed containment issues were client configuration problems. The bank believed our bot didn't understand their customers. Both were partially right. What broke the deadlock was aggregate data — 16.4% SLU error rate across 18,940 tagged turns, with clear pattern clustering. Data doesn't just inform decisions. In cross-functional conflicts, it's the only thing that does.

**Absorb scope without losing the thread.** RBI-mandated security requirements arrived mid-sprint and weren't negotiable. The PM's job isn't to push back on non-negotiable compliance — it's to organize the work so that compliance happens *and* the primary delivery target survives. Three squads with clear ownership made this possible. Without that structure, security would have consumed the entire team.
