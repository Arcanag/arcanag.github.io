---
layout: case-study
title: "How We Rebuilt Voicebot Metrics and Lifted SLU Accuracy to 91% for India's Largest Private Bank"
description: "A B2B AI case study on driving product improvement without the PM title — fixing broken measurement, improving intent classification across 100K+ daily calls, and surviving production incidents in an air-gapped enterprise environment."
category: "B2B AI Product"
key_metric: "91% inscope accuracy"
read_time: "14 min read"
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

The voicebot was deployed in an **air-gapped, on-premises Kubernetes cluster** — no internet access, no external container registry, no quick hotfixes. Every deployment required a formal Plan of Action, email approval chains, and coordinated downtime windows across production and disaster recovery environments. The system itself was massive: **2,188 conversational states**, **36 active intents**, **144 backend API actions**, and **133 integration endpoints** connecting to the bank's core systems. It handled **67,000 to 112,000 calls per day** in a bilingual setup (English + Hindi).

The problem surfaced in late 2024 when the bank's team questioned our containment numbers — the percentage of calls fully resolved by the AI without human handoff. Our internal calculation showed **44% containment in December 2024**, but by January 2025, the same calculation showed **14.9%**. Nobody could explain the drop. As one colleague put it: *"Containment rate in Dec'24 was 44% and in Jan'25 it was 14.9%. Nobody knows why and I'm not even sure if my calculation is right."*

The metric itself had become unreliable. And when your primary business metric can't be trusted, everything downstream — client confidence, renewal conversations, product prioritization — breaks.

<div class="metric-box">
  <span class="metric-box__label">Daily Call Volume</span>
  <span class="metric-box__number">100K+</span>
</div>

## Discovery & Research
{: #discovery--research}

I didn't have a PM title, but I had something more useful: direct access to conversation analytics and the trust of both the engineering team and the bank's stakeholders. I started by pulling data across the system, looking for why the numbers were unreliable.

**The first discovery: our own containment metrics were wrong.** A bug in MIS reporting was counting "max retries hangup" as contained calls — callers who gave up after too many failed attempts were being marked as successfully handled. This was tracked as a P1 issue (IC-363). But it was just the beginning. Over the following months, we found **50+ containment-related bugs** in our reporting system: containment data going blank for entire days, calls classified as "Not Transferred" when they should have been "Contained," PIN generation containment not tracked at all, and entire use cases missing from the MIS.

After the MIS fix, our PM flagged the real impact: *"Our containment is down 30% from 1,000 calls to 700 calls. Need to figure this out — this is after MIS update."* We hadn't gotten worse. We'd started measuring honestly.

With accurate data in hand, three failure patterns emerged:

- **Intent classification gaps**: Our SLU (Spoken Language Understanding) model only recognized **60+ intents**, but the bank had **300+ use cases** customers called about. An analysis of 18,940 tagged live turns revealed **3,098 SLU misfires (16.4% error rate)** — with the top misfire being `inform_product → card_cancellation` at 357 occurrences. Anything outside our intent universe was immediately escalated to a human agent.
- **Authentication failures**: **47% of callers failed after entering their OTP.** This was a massive leak — nearly half of all callers who reached the authentication step were being dropped before they could complete their request. The bank's team noted this directly in a joint meeting.
- **Conversation flow dead-ends**: Certain flows lacked graceful fallbacks — when the bot couldn't understand a response after 3 attempts, it would hang up rather than offer alternatives. Calls that were "contained" by our old MIS were actually customers abandoning in frustration.

The insight that changed our approach: **the problem wasn't just the model — it was the entire pipeline.** SLU accuracy, OTP capture, flow design, and metric integrity all needed to move together.

## Framing & Strategy
{: #framing--strategy}

I packaged these findings into a Containment Improvement Proposal. The framing was built around a simple question the bank's leadership kept asking in every meeting with Mehul (their senior stakeholder): *"Show us metric improvement, planned tasks, tasks for next 15 days, deployment impact."*

The ML/Product lead set the urgency: *"Team, we need to be very aggressive on ICICI's outcomes. We don't have much time. By Feb end we must improve the Containment Rate."*

Three options were on the table:

1. **Full SLU model retrain** — retrain the entire spoken language understanding model with production utterances. High potential impact, but 8-12 weeks to execute in an air-gapped environment where training data had to be manually exported.
2. **Conversation flow redesign** — rewrite fallback handling and add probing flows for ambiguous intents. Faster to ship, testable on the CUG (Closed User Group) environment.
3. **Hybrid approach** — targeted SLU expansion with live utterances + flow optimization + authentication fixes. Ship improvements in parallel workstreams.

We chose option 3. It let us show incremental progress to the client while building toward the larger model improvement. I organized the work into three squads: Squad 1 (maintenance and bug fixes), Squad 2 (new use cases and intent expansion), Squad 3 (security, compliance, and infrastructure).

What we explicitly decided **not** to do: full platform re-architecture, building custom ASR, or migrating off the air-gapped environment. These were multi-quarter investments that wouldn't move the needle before the renewal.

## The Messy Middle
{: #the-messy-middle}

### The persuasion problem

The engineering team initially pushed back. Their view: "These are client configuration issues, not product issues." The bank's team echoed a similar sentiment from the other side: "Your bot doesn't understand our customers."

I presented the aggregate data showing the same failure patterns across all enterprise clients — this wasn't a single client's misconfiguration. It was a product gap. The SLU misfire analysis (3,098 errors in 18,940 turns, with clear pattern clustering) was the turning point.

### What went wrong

**SLU retraining was harder than expected.** We exported 14,000 live utterances from the air-gapped environment for model retraining — a multi-week process involving manual data transfer, anonymization, and compliance review. The first retrained model improved intent accuracy on paper, but containment didn't budge. Why? Because improving classification only matters if the flows behind those intents actually exist. We had better recognition of what customers wanted, but no way to serve half of those requests.

**The October 4th outage.** A Linkerd service mesh DNS failure caused the FSM-GRPC service to lose connectivity to Echo, Integration Proxy, Redis, and RabbitMQ — effectively taking down the entire bot. The escalation was brutal. From the incident channel: *"ICICI bot is failing again today. Who is working on it?"* ... *"Nobody is responding. Only Anurag alone cannot handle this."* ... *"Manis is very angry. We need support urgently."* ... *"Client is yelling on the call."*

I was the only person from our side initially available. We diagnosed it as a DNS resolution failure in the Linkerd proxy sidecar, resolved by restarting the affected pods, and spent the next two weeks building proper incident response procedures.

**The ARSIM incident (March 2026).** During a planned server maintenance (ARSIM — Automated Rolling Security and Infrastructure Maintenance), the infrastructure team shut down kubelet on the production master node. The root cause from the on-call engineer: *"kubelet is down in master node. Kubelet logs showed 'Failed to start cAdvisor' err='inotify_init: too many open files' — kernel's fs.inotify.max_user_instances limit was exhausted."* Separately, we made an internal mistake by shutting down the service without confirming with or informing the bank, resulting in approximately 7 minutes of unexpected impact during live calls.

This forced us to create a 20-scenario air-gapped K8s runbook and a mandatory written client approval policy for all future maintenance windows.

**Scope creep on security.** The bank added LDAP + MFA authentication, DB encryption (mobile number masking), HTTPS migration, and SRTP compliance to our backlog mid-sprint. Each was non-negotiable — RBI regulatory requirements. We had to absorb this work without slowing the containment initiative.

### The pivot

After the SLU retraining didn't move containment, I shifted the team's focus:

1. **Flow optimization first**: Add intent probing at confirmation stages, implement "OOS probing" (out-of-scope probing to catch intents we couldn't serve), and fix prompt parity issues between English and Hindi flows.
2. **Authentication fix**: Address the 47% OTP failure rate by redesigning the customer journey through authentication, implementing a DTMF patience feature (3-second wait per digit), and running multiple testing rounds.
3. **MIS rebuild**: New containment reporting built from scratch — 50+ bug tickets resolved, achieving "100% trust" in our numbers. This included 12+ automated dashboards: daily/weekly/monthly metrics, intent-wise alerts, RCA dashboards, and a metrics waterfall for leadership.
4. **Parallel SLU expansion**: Continue expanding the intent universe from 60+ to 300+ intents. The auto-tagger achieved **75.59% accuracy** on confident predictions (644/852), and the ML team planned to scale to 20K+ audio samples for the ASR upgrade.

<div class="callout">
Deployment timeline: Aug 12 (Flow 0.1.56, iProxy v4.1.509) → Oct 17 (Flow 0.1.111) → Oct 24 (Flow 0.1.112, bug fix) → Nov 26 (Flow 0.1.127, Intent Probing + SMS middleware, deployed solo when both infra engineers were on leave) → Mar 12 (iProxy v4.1.763, APIGEE Auth Token migration). Each deployment required a formal POA, email approval from the bank, and coordinated PROD + DR execution.
</div>

## Results & Impact
{: #results--impact}

<div class="metric-box">
  <span class="metric-box__label">SLU Inscope Accuracy<br>after improvement</span>
  <span class="metric-box__number">91%</span>
</div>

<div class="metric-box">
  <span class="metric-box__label">SLU Out-of-Scope<br>accuracy</span>
  <span class="metric-box__number">82%</span>
</div>

<div class="metric-box">
  <span class="metric-box__label">Daily Call Volume<br>handled by bot</span>
  <span class="metric-box__number">100K+</span>
</div>

**What moved the needle:**
- **SLU inscope success rate reached 91%**, with OOS success at 82% — earning sign-off for production deployment on December 17, 2025. Post-deployment monitoring showed *"slight improvement in inscope and containment"* with *"major improvement in imobile, unable to transact, transaction issue and outstanding balance flow."*
- **MIS rebuilt from scratch** — 50+ containment bugs fixed, 45+ MIS tickets resolved. The bank now received automated daily containment reports (201+ emails tracked), intent-wise alerts, and weekly/monthly dashboards they trusted.
- **5 production deployments** managed across Aug 2025–Mar 2026, each with POA, approval chain, and PROD+DR execution. Flow versions progressed from 0.1.56 to 0.1.127+.
- **250+ Integration Proxy releases** (v4.1.509 to v4.1.763) shipped in parallel.
- **553 tracked work items** in the project alone.
- **Full security posture uplift** delivered in parallel: LDAP + MFA, DB encryption, HTTPS migration, API Key + OAuth on APIGEE, ASLC Content Security compliance — without blocking product improvements.
- **118,000–146,000 contained calls per month** by February 2026 (with discrepancy between our count and the bank's being actively reconciled).

**What we didn't achieve:** The intent universe expansion from 60+ to 300+ intents is still ongoing. The auto-tagger accuracy of 75.59% means significant human tagging effort is still required. The 47% OTP failure rate was identified and the authentication journey redesigned, but DTMF accuracy in production remains dependent on the bank's telephony infrastructure. And the MIS numbers still don't perfectly reconcile between our system and the bank's — *"Ours: 118,025. ICICI Bank's: 146,254. Am I missing something here?"* — a gap we're still closing.

## Reflection
{: #reflection}

**What I'd do differently:** Start with MIS accuracy *before anything else*. We spent months making product improvements against a metric we couldn't trust. When we finally fixed the measurement, we discovered the real baseline was much lower than we thought — and some of our "improvements" were invisible because the old MIS was masking them. Fix measurement first, then optimize.

**The transferable insight:** In AI products, there's a dangerous assumption that model accuracy is the primary lever. At Skit.ai, the model was only one component of a system that included conversation design, authentication UX (47% OTP failure!), integration reliability, and reporting accuracy. Improving intent classification by 40% did nothing for containment until we fixed the flows, the measurement, and the input capture. **The data closest to the customer is the most persuasive roadmap input** — not the model accuracy benchmark, but the conversation log where you can hear a customer give up.

**What this taught me about AI products in enterprise:** Air-gapped, compliance-heavy environments don't move slowly because people are slow. They move slowly because every change carries real risk — a bad deployment takes down live calls to bank customers. When your infra team accidentally kills kubelet during ARSIM, the client isn't angry about downtime. They're angry because nobody told them before it happened. The discipline of formal POAs, approval chains, and CUG testing isn't overhead. It's the product management skill that separates enterprise AI from demo AI.

**On metric integrity:** The most impactful thing I did wasn't a product improvement — it was forcing the MIS revamp. Fifty containment bugs. Entire use cases missing from reports. "Max retries hangup" counted as success. When your ML/Product lead messages the team saying *"we need to be very aggressive on outcomes"* and your metric definition is broken, you're optimizing against noise. The MIS rebuild was unglamorous, but it was the foundation that made every subsequent improvement measurable and credible.
