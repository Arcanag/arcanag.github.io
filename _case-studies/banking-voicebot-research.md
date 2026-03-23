---
layout: case-study
title: "Banking Voicebot — Research Knowledge Base"
theme_color: "#047857"
hidden: true
published: false
---

# Banking Voicebot — Research Knowledge Base

> Primary source data for the case study. Last updated: 2026-03-22.
> Sources: Slack (Skit.ai workspace), Jira (vernacular-ai.atlassian.net), local project files.
> Gmail/Drive/Calendar: ACTIVE — OAuth re-authenticated 2026-03-22 with Desktop client.

---

## Verified Metrics

| Metric | Value | Source | Date | Confidence |
|--------|-------|--------|------|------------|
| Containment rate (Dec 2024) | 44% | Anurag DM to Sneha | 2025-01-25 | High — Anurag's own calculation |
| Containment rate (Jan 2025) | 14.9% | Sneha Saraf DM | 2025-01-25 | Medium — "not sure if my calculation is right" |
| Containment drop post-MIS fix | "down 30% from 1000 calls to 700 calls" | Naveen Rajgariya DM to Anurag | ~2025-06 | High — after MIS update revealed real numbers |
| SLU inscope success rate | 91% | Anurag status update to Rahul | ~2025-12 | High — testing result for production sign-off |
| SLU OOS success rate | 82% | Same update to Rahul | ~2025-12 | High — same testing cycle |
| SLU misfires | 3,098 out of 18,940 tagged turns (~16.4%) | Aaron Dsouza in #icici-slu-plan-v2 | ~2026-01 | High — ML analysis |
| Auto-tagger accuracy | 75.59% (644/852 confident predictions) | Aaron Dsouza in #icici-slu-plan-v2 | ~2026-01 | High — evaluation result |
| OTP failure rate | 47% fail post entering OTP | Sharan Titto meeting notes | ~2025-05 | High — from client meeting MOM |
| February containment volume (Skit count) | 118,025 contained calls | Sneha Saraf in #icici-internal | ~2026-03 | High — from internal data |
| February containment volume (ICICI count) | 146,254 contained calls | Sneha Saraf comparing with bank data | ~2026-03 | High — discrepancy flagged |
| SLU training audio needed | ~20K samples for ASR upgrade | Aaron Dsouza in #icicibank-voicebot-2-0 | ~2026-02 | High — technical requirement |
| Payment received from ICICI | Rs. 1,29,92,000 (~$155K) | #cash-collections_india — Vedita Gaonkar | ~2025-12 | High — actual payment record |
| ICICI Lombard containment target | 35% → 50% → 55% | Saakshit Bhan in #delivery_india | Multiple dates | High — different client but useful context |

---

## Key Slack Quotes (Sourced)

### Containment Metrics Accuracy Issue
> "They are saying containment is not accurate, to uska call review kar raha"
> — Anurag Sharma, DM with Sneha Saraf, Dec 2025

> "Containment rate in Dec'24 was 44% and in Jan'25 it was 14.9%. Nobody knows why and I'm not even sure if my calculation is right!"
> — Sneha Saraf, DM conversation, Jan 2025

> "Also, Major: Our containment is down 30% from 1000 calls to 700 calls. Need to figure this out - this is after MIS update"
> — Naveen Rajgariya, DM to Anurag, ~Jun 2025

> "How to ensure trust in MIS?" — Action item from Naveen in group planning thread

### SLU Improvement Results
> "SLU Improvement for all major intents and fixes for application status, lien, charges. We have also received sign-off for production deployment on 17th Dec. The testing shows an inscope success rate of 91% and OOS success rate of 82%."
> — Anurag Sharma, status update to Rahul Chakravarty, ~Dec 2025

> "The SLU deployment has shown slight improvement in inscope and containment. We have seen some major improvement in imobile, unable to transact, transaction issue and outstanding balance flow."
> — Anurag Sharma, #delivery_india weekly update

### SLU Misfires Analysis
> "Total tagged turns are: 18,940. Out of these there are 3,098 SLU misfires in total. Major misfires: inform_product → card_cancellation = 357, inform_product → oos = 335, oos → confirm = 247, request_agent → oos = 161"
> — Aaron Dsouza, #icici-slu-plan-v2

### Urgency from Leadership
> "Team, we need to be very aggressive on ICICI's outcomes. We don't have much time. By Feb end we must improve the Containment Rate."
> — Chintan (ML/Product lead), #icici-slu-plan-v2, Dec 2025

> "Please deep dive to downstream pipeline and help with a plan to increase the net containment rate. I am confident, just fixing this one flow category, will start lifting the outcome."
> — Chintan, #icici-slu-plan-v2

### OTP / Authentication Failure
> "47% fail post entering OTP. Skit to create customer journey in authentication! ICICI to check on whether generating OTP on call will be feasible or not."
> — Sharan Titto, meeting notes from client call, ~May 2025

### ARSIM / Production Incident
> "kubelet is down in master node. Kubelet logs showed 'Failed to start cAdvisor' err='inotify_init: too many open files' — kernel's fs.inotify.max_user_instances limit was exhausted, causing kubelet to exit with status=1/FAILURE."
> — Sonu Gupta, #icicibank-voicebot-2-0, Mar 9 2026

> "Prod ARSIM has been cancelled. We will need to replan prod ARSIM again."
> — Anurag Sharma, #icicibank-voicebot-2-0, Mar 2026

> "During this period, we also made an internal mistake by shutting down the service without confirming with or informing ICICI, which resulted in an unexpected impact of approximately 7 minutes."
> — Anurag Sharma, DM to Rahul describing the incident, ~Mar 2026

### October 2025 Outage
> "ICICI bot is failing again today. Who is working on it?"
> "Nobody is responding. Only Anurag alone cannot handle this."
> "Manis is very angry. We need support urgently"
> "Client is yelling on the call."
> — Ishwardas Kumbhare, #icici_outage, Oct 4, 2025

> "investigation showed that egress traffic from fsm-grpc was unable to reach dependent services such as Echo, Integration Proxy, Redis, and RabbitMQ. Initial attempts to resolve by restarting Linkerd pods were unsuccessful, however, restarting all services restored connectivity."
> — Anurag Sharma, #icici_outage, Oct 5, 2025 (post-incident analysis)

---

## MIS / Reporting System Details

### Automated Alert Dashboards (from Meghana Teegala DM)
**External alerts (shared with ICICI):**
- VB 2.0 Summary
- VB 2.0 - Intent Wise Containment Volume

**Internal alerts:**
- Containment Report
- ICICI: Metrics Waterfall (Leadership)
- [ICICI Bank] Use Case Wise Key Metrics [Automation]
- [ICICI Bank] Key Metrics: Daily
- [ICICI Bank] Key Metrics: Monthly
- ICICI: Intent Wise Alerts
- VB 2.0 - Internal Summary - Weekly
- VB 2.0 - Internal Summary - Monthly
- ICICI: Inscope, Containment and Agent Transfer Alerts
- [ICICI Bank]: RCA Dashboard - DOD
- [ICICI Bank]: RCA Dashboard - WOW

### Google Sheets with Containment Data
- Use case wise Inscope and Containment trend: [internal spreadsheet]
- NP (ICICI) shared data: [internal spreadsheet]
- Infrastructure tracking: [internal spreadsheet]

### MIS Bug Details
- **IC-363**: "Max Retries Hangup treated as contained call" — discovered Oct 2024
- **IC-397**: Containment data blank for some intents
- **IC-313**: Wrong "Not Transferred" tagging
- **IC-499**: MIS Revamp from scratch (initiated Apr 2025)
- **Notion COE doc**: "7-Mar-2025 MIS incorrect Containment Data missing for 10 intents"

---

## Timeline (Sourced from Slack)

| Date | Event | Source |
|------|-------|--------|
| Oct 2024 | MIS containment bug discovered (max retries = contained) | IC-363 |
| Dec 2024 | Containment rate measured at 44% | Anurag DM |
| Jan 2025 | Containment rate drops to 14.9% (measurement issues) | Sneha DM |
| ~Mar 2025 | MIS incorrect — containment data missing for 10 intents | Notion COE doc via Naveen |
| Apr 2025 | MIS Revamp initiated from scratch (IC-499) | Jira |
| ~May 2025 | Client meeting: 47% OTP failure identified | Sharan meeting notes |
| ~Jun 2025 | Post-MIS update: "containment down 30% from 1000 to 700 calls" | Naveen DM |
| Sep 2025 | Redis/TTS outage — ICICI Genesys error observed | #icici_outage |
| Oct 4-5, 2025 | Major outage: Linkerd DNS failure in fsm-grpc, client "yelling" | #icici_outage |
| Nov 2025 | Use case wise Inscope/Containment tracking updated | Preetham DM |
| ~Dec 2025 | SLU improvement deployed: inscope 91%, OOS 82%, sign-off for Dec 17 prod deploy | Anurag status to Rahul |
| Dec 2025 | Chintan: "By Feb end we must improve Containment Rate" — urgency push | #icici-slu-plan-v2 |
| ~Jan 2026 | SLU misfire analysis: 3,098/18,940 turns (16.4% error rate) | Aaron in #icici-slu-plan-v2 |
| ~Feb 2026 | SLU auto-tagger evaluated: 75.59% accuracy | Aaron in #icici-slu-plan-v2 |
| ~Feb 2026 | Aaron: need ~20K audio samples for ASR upgrade retraining | #icicibank-voicebot-2-0 |
| Mar 9, 2026 | kubelet down on master node (inotify exhaustion) | Sonu in #icicibank-voicebot-2-0 |
| Mar 11, 2026 | PROD ARSIM: internal mistake shutting down service without client confirmation (~7 min impact) | Anurag DM to Rahul |
| ~Mar 2026 | Feb containment data discrepancy: Skit 118K vs ICICI 146K | Sneha in #icici-internal |

---

## Key Stakeholders (from Slack)

| Person | Role/Context |
|--------|-------------|
| Anurag Sharma | Delivery Manager / de facto product owner for ICICI |
| Rahul Chakravarty | Engineering lead / Anurag's reporting line |
| Naveen Rajgariya | PM at Skit.ai |
| Chintan | ML/Product lead — driving SLU optimization |
| Aaron Dsouza | ML Engineer — SLU retraining, misfire analysis |
| Sneha Saraf | Data/Analytics — MIS reporting, containment tracking |
| Preetham M Pagad | Data — use case wise inscope/containment tracking |
| Sharan Titto | Client management — meeting notes, escalations |
| Saakshit Bhan | Delivery India — weekly GBU updates |
| Aditya | Infrastructure lead |
| Sonu Gupta | Infrastructure — on-prem K8s operations |
| NP (Nainesh Patel?) | ICICI Bank stakeholder — reviews data, demands accuracy |
| Manish | ICICI Bank senior stakeholder — "very angry" during outages |

---

## Slack Channels Relevant to Case Study

| Channel | ID | Purpose |
|---------|-----|---------|
| #icicibank-voicebot-2-0 | — | Main project channel |
| #icici-internal | — | Internal ICICI discussions |
| #icici-slu-plan-v2 | — | SLU optimization planning |
| #icici-slu-improvement | — | SLU improvement execution |
| #icici_outage | — | Incident response |
| #delivery_india | — | Weekly Good/Bad/Ugly updates |
| #icici-da-connect | — | DA connect operations |
| #icici-on-site-things | — | On-site logistics |
| #cash-collections_india | — | Payment tracking |
| #inc-2025-08-11-icici-prod-calls-getting-dropped | — | Aug 2025 incident |

---

## Unverified / Still Needed

| Data Point | Status | Where to Look |
|-----------|--------|---------------|
| **Containment rate 52% baseline** | Different metric definition or time period than spreadsheet data | [internal spreadsheet] + Slack DMs |
| **Containment rate 78% after** | Likely refers to a different metric (e.g., inscope success rate) | [internal spreadsheet] + Anurag status update |
| **NPS 34 → 61** | NOT FOUND in any Slack search | May be in email/Drive docs or internal survey tool |
| **$2.1M ARR** | NOT FOUND — only found Rs 1.3Cr (~$155K) payment | May be total contract value in different doc |
| **$800K at risk** | NOT FOUND | Likely in contract/renewal emails |
| **16 enterprise clients** | Confirmed multiple clients in SE project | Jira shows 73 client apps in integration proxy |
| **Actual monthly containment trend** | READ — Oct 2025: ~24%, Dec 2025: 20-23%. Daily calls: 67K-112K | Spreadsheet "ICICI: Use case wise Performance" |
| **ARSIM runbook** | Confirmed exists on GitHub | `black-mirror/infra/runbooks/ARSIM_Runbook.md` |

---

## Notion Documents Referenced in Slack
- ML Improvement Plan: [internal doc]
- 7-Mar-2025 MIS incorrect Containment Data: [internal doc]
- ARSIM Prod: [internal doc]
- ICICI SFTP Access Guide: [internal doc]

---

## Jira Deep Dive Findings

### Containment Bug Tickets (15+ tickets)

| Ticket | Issue | Impact |
|--------|-------|--------|
| IC-363 | Max Retries Hangup treated as contained call | Inflated containment numbers — calls where customers gave up were counted as resolved |
| IC-397 | Containment data blank in MIS (20-Nov-24) | Full day of missing data |
| IC-313 | Contained call incorrectly tagged "Not transferred" | Misclassification reducing reported containment |
| IC-314 | MIS Containment Bug (generic) | Business-reported |
| IC-378 | Low containment numbers for 3 consecutive days (14-16 Oct 24) | Required RCA from Skit |
| IC-384 | Containment numbers not available in MIS | Complete data loss |
| IC-383 | PIN Gen containment data not available | Use-case specific data gap |
| IC-285 | All loans containment = 0 from 17th Jul 25 | P1 production issue |
| IC-433 | Contained call showing under "not transferred" | Misclassification |
| IC-419 | NRMN Account Activate: contained showing as not transferred | Flow-specific bug |
| IC-420 | FAQ contained (resolved) then transferred | Calls double-counted |

**Total: 50 containment-related tickets, 45 MIS-related tickets found via JQL**

### MIS Revamp (IC-499 / IC-331)
- **IC-499**: "Build a robust MIS with 100% trust" — initiated 7-Apr-25
- **IC-331**: "New MIS architecture ensuring increased trust and robustness" — P2 High priority
- Both on hold as of Jun 2025 pending AHT issue + serviced calls data
- Shared MIS file for "doubt clarity and approval" with NP (ICICI stakeholder)

### Exact Deployment Timeline (from Jira INF tickets)

| Date | Ticket | Flow Version | iProxy Version | Key Changes |
|------|--------|-------------|----------------|-------------|
| 2025-08-12 | INF-3994 | 0.1.56 | v4.1.509 | CUG deployment, 15:00-17:00 downtime, helmfile-based |
| 2025-10-17 | INF-4164 | 0.1.111 | — | POA doc in Drive |
| 2025-10-24 | INF-4171 | 0.1.112 | — | Bug fix, deployed + tested same day by client |
| 2025-11-26 | INF-4236 | 0.1.127 | v4.1.655 | SMS Trans middleware, Intent Probing at confirmation stage. Anurag deployed solo (Sonu + Jithin on leave) |
| 2026-03-12 | INF-4421 | — | v4.1.763 | Auth Token + API Key for APIGEE Corp |

**Infrastructure:** PROD [internal], DR [internal], DB [internal] (PostgreSQL)
**Parent Epic:** INF-3591 "ICICI Bank" (created 2025-04-03, In Progress)

### 100% CPU Incident (INF-4306)
- DR server hit 100% CPU on Jan 6, 2026
- Blocked for 1+ month — Grafana access required port opening through ICICI's security process
- Sonu investigated: "No evidence of pod restarts, errors, or system logs corresponding to the Jan 6 CPU utilization alert" (logs already rotated)
- Anurag suggested mapping Grafana to another open port as workaround

### IC-27: Improvement Areas Overview
Key improvement areas identified:
- Communication channel management (Email, WhatsApp, Teams)
- Deployment checklist and order (Flow first, SLU second, others after)
- DTMF impact and performance
- **Meeting with Mehul: show metric improvement, planned tasks, tasks for next 15 days, deployment impact**
- Impact analysis workflow before/after changes

### IC-312: SLU Intent Universe Expansion
- Current: 60+ intents recognized
- Target: 300+ use cases (ICICI's full scope)
- Next Action (Oct 2025): Mohan (ICICI) to share definitions for each category
- Squad 2 (New Usecases) responsible

### Deployment POA Documents (Google Drive)
| Deployment | POA Link |
|-----------|----------|
| Oct 17, 2025 | [internal document] |
| Oct 24, 2025 | [internal document] |
| Nov 26, 2025 | [internal document] |

### Notion Documents (from Jira)
- Production Deployment SOP: [internal doc]
- RTO Calculator: [internal doc]

---

## Google Workspace Findings

### Gmail: 201 Containment Report Emails
- **Automated daily containment reports** sent from `voicebot@icici.bank.in`
- Subject: "Containment Report" — sent daily
- 201+ emails found — confirms systematic metric tracking

### Google Drive Documents Found

| Document | Type | Last Modified | Key Data |
|----------|------|--------------|----------|
| ICICI Containment Analysis - Last 7 days | Spreadsheet | 2024-08-07 | Historical containment analysis |
| Containment @ICICI Bank Voicebot 2.0 | Presentation | 2024-08-05 | Containment presentation deck |
| ICICI Bank <>Skit.ai Voicebot_Weekly updates | Presentation | 2026-02-18 | Weekly update deck for client |
| ICICI Bank BOT Downtime Volume Analysis | Spreadsheet | 2026-01-19 | Downtime impact analysis |
| [ICICI Bank] Voicebot - Daywise Hourwise Key Metrics | Spreadsheet | 2025-12-29 | Granular hourly metrics |
| ICICI Bank - Voicebot Improvement Plan - OND 2025 | Spreadsheet | 2025-12-18 | Q4 2025 improvement plan |
| ICICI_Voicebot_Plan_of_Action.docx | Document | 2025-10-21 | Deployment POA template |
| ICICI Voicebot Air-Gapped K8s Runbook v1.0 | Document | 2026-03-11 | Post-incident runbook (3 copies) |
| ICICI Voicebot — Debit Card Cancellation Flow Proposal | Document | 2025-10-14 | Flow design proposal |

### ACTUAL Containment Data from Spreadsheet

**Source:** [internal spreadsheet]
**Title:** "ICICI: Use case wise Performance"
**Sheets:** Overall, Daily Metrics (1088 rows), SLU Impact, Use case wise (4028 rows)

#### October 2025 Containment Trend (from "Overall" sheet)

| Period | Avg Containment % | Avg Inscope % | Avg Daily Calls |
|--------|-------------------|---------------|-----------------|
| Oct 1-7, 2025 | 23.8% | 24.2% | 96,000 |
| Oct 8-14, 2025 | 23.2% | 26.0% | 87,000 |
| Oct 15-21, 2025 | 24.6% | 29.2% | 78,000 |
| Oct 22-31, 2025 | 24.3% | 27.8% | 84,000 |

#### December 2025 Containment Trend

| Period | Avg Containment % | Avg Inscope % | Avg Daily Calls |
|--------|-------------------|---------------|-----------------|
| Dec 1-7, 2025 | 19.7% | 26.1% | 78,000 |
| Dec 8-14, 2025 | 19.8% | 25.8% | 78,000 |
| Dec 15-23, 2025 | 23.3% | 25.7% | 67,000 |

**KEY FINDING: Containment rate is 19-25%, NOT 52% or 78%.**

The containment metric in this spreadsheet measures contained calls as a % of inscope calls.
- **Oct 2025 average: ~24%**
- **Early Dec 2025: ~20%** (dropped after some change)
- **Late Dec 2025: ~23%** (recovering after SLU deployment)
- Daily call volume: **67,000-112,000 calls/day** (massive scale)

### Calendar Events
- "IB Internal - Bridge" — daily all-day meeting (14 attendees)
- "ICICI Analytics Bandwidth Plan" — scheduled today (16:30-17:00)

---

## Notes for Case Study Update

### What the data reveals vs current case study:

**The containment metric definition varies across sources.**

The spreadsheet "ICICI: Use case wise Performance" shows:
- **Oct 2025: ~24% containment** (contained calls / inscope calls)
- **Dec 2025: 20-23% containment**
- **Daily call volume: 67K-112K calls**

Possible explanations:
1. **Different metric definition**: The 52%→78% may use a different formula (e.g., contained + serviced / total calls, or contained / total bot calls excluding IVR)
2. **Different time period**: The 44% from Dec 2024 (Slack) vs 24% from Oct 2025 (Sheets) suggests the metric definition changed after the MIS revamp
3. **The MIS revamp itself changed the numbers**: "Our containment is down 30%" (Naveen) — fixing measurement revealed the real (lower) rate
4. **SLU inscope success rate (91%) is the "78%"**: The case study may be conflating inscope success with containment

**Recommendation:** The case study should use verified metrics only, and be explicit about which metric is being discussed. The strongest verifiable claim is:
- **SLU inscope success: 91%** (from test results, sign-off for Dec 17 deployment)
- **SLU OOS success: 82%**
- **Scale: 67K-112K calls/day, 118K-146K contained calls/month**
- **MIS revamp: 50+ containment bug tickets → rebuilt from scratch**
- **47% OTP failure rate** identified and addressed

2. **The "messy middle" is even messier than described.** Multiple outages (Oct 2025 Linkerd failure, Sep 2025 Redis/TTS), client "yelling on call", nobody from tech answering phones, a 7-minute unplanned service shutdown during ARSIM.

3. **The SLU improvement story is well-documented.** 91% inscope success rate and 82% OOS rate are real test results. The misfire analysis (3,098/18,940 = 16.4%) gives concrete evidence of the problem.

4. **47% OTP failure** is a powerful data point not in the current case study — this was a major contributor to poor containment.

5. **The containment volume numbers are large.** 118K-146K contained calls per month in Feb 2026, 67K-112K daily calls.

6. **Revenue figures need verification.** Rs 1.3Cr (~$155K) payment found in Slack is a single installment. $2.1M ARR not verified.

7. **201 daily containment report emails** from `voicebot@icici.bank.in` — confirms systematic metric tracking by the bank itself.
