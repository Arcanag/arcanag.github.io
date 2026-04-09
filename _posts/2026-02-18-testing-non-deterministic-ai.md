---
layout: post
title: "Testing Non-Deterministic AI Products: A Practical Playbook"
description: "100+ tests across two AI products — how to build a testing pyramid when your core feature returns different output every time."
category: "Technical Deep-Dive"
theme_color: "#4A9EFF"
hero_bg_word: "TESTING"
read_time: "8 min read"
date: 2026-02-18
tags: ["testing", "ai-products", "pytest", "playwright"]
toc:
  - title: "The Problem"
    anchor: "the-problem"
  - title: "Strategy 1: Mock LLM Responses"
    anchor: "strategy-1-mock-llm-responses"
  - title: "Strategy 2: Test Preprocessing Separately"
    anchor: "strategy-2-test-preprocessing"
  - title: "Strategy 3: Schema Validation"
    anchor: "strategy-3-schema-validation"
  - title: "Strategy 4: E2E User Flow Tests"
    anchor: "strategy-4-e2e-user-flows"
  - title: "The AI Testing Pyramid"
    anchor: "the-ai-testing-pyramid"
  - title: "What Not to Test"
    anchor: "what-not-to-test"
---

<div class="cs-impact-strip">
  <div class="cs-impact-cell">
    <div class="cs-impact-value">100+</div>
    <div class="cs-impact-label">Tests</div>
    <div class="cs-impact-desc">Across two AI products</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-value">4</div>
    <div class="cs-impact-label">Strategies</div>
    <div class="cs-impact-desc">Mock, preprocess, schema, manual</div>
  </div>
  <div class="cs-impact-cell">
    <div class="cs-impact-value">3</div>
    <div class="cs-impact-label">Automated Layers</div>
    <div class="cs-impact-desc">Unit, integration, E2E</div>
  </div>
</div>

## The Problem
{: #the-problem}

<p class="cs-lead">You've built an AI product. You want to write tests. You write:</p>

```python
result = generate_tailored_resume(resume, job_description)
assert result == expected_output  # This WILL fail on the next run
```

And it breaks immediately, because LLMs are non-deterministic. Even with temperature set to 0, outputs vary across API versions and model updates. So you either skip testing (dangerous) or test the wrong things (wasteful).

Building [Career Enabler](https://github.com/Arcanag/career-enabler) and [Agentic PM](https://github.com/Arcanag/agentic-pm) forced me to develop a practical testing strategy for AI products. Together, they have over 100 tests.


## Strategy 1: Mock LLM Responses
{: #strategy-1-mock-llm-responses}

<p class="cs-lead">The most important insight: most of your business logic happens AROUND the LLM call, not inside it. You can test all of that logic by mocking the LLM response with a predictable fixture.</p>

<figure class="mermaid-diagram" role="img" aria-label="Decision flowchart: deterministic inputs use mocked LLM for reliable assertions, non-deterministic inputs with real LLM produce unreliable results">
<svg viewBox="0 0 700 260" xmlns="http://www.w3.org/2000/svg">
  <!-- Test Input -->
  <rect x="20" y="100" width="120" height="40" rx="4" fill="#161b22" stroke="#21262d" stroke-width="1.5"/>
  <text x="80" y="125" text-anchor="middle" font-family="sans-serif" font-size="12" fill="#e8eaed">Test Input</text>
  <!-- Arrow to diamond -->
  <line x1="140" y1="120" x2="210" y2="120" stroke="#21262d" stroke-width="1.5"/>
  <polygon points="207,116 215,120 207,124" fill="#21262d"/>
  <!-- Decision diamond -->
  <polygon points="300,70 390,120 300,170 210,120" fill="#161b22" stroke="#4A9EFF" stroke-width="1.5"/>
  <text x="300" y="116" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#4A9EFF">Deterministic?</text>
  <text x="300" y="130" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#4A9EFF">(pre/post LLM)</text>
  <!-- YES path (top) -->
  <line x1="300" y1="70" x2="300" y2="30" stroke="#3fb950" stroke-width="1.5"/>
  <polygon points="296,33 300,25 304,33" fill="#3fb950"/>
  <text x="312" y="55" font-family="sans-serif" font-size="10" fill="#3fb950">YES</text>
  <!-- Mock LLM box -->
  <rect x="230" y="0" width="140" height="30" rx="4" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="300" y="20" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e8eaed">Mock LLM Response</text>
  <!-- Arrow to Assert -->
  <line x1="370" y1="15" x2="440" y2="15" stroke="#3fb950" stroke-width="1.5"/>
  <polygon points="437,11 445,15 437,19" fill="#3fb950"/>
  <!-- Assert Logic box -->
  <rect x="445" y="0" width="140" height="30" rx="4" fill="#161b22" stroke="#3fb950" stroke-width="1.5"/>
  <text x="515" y="20" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#3fb950">Assert Logic</text>
  <!-- Checkmark -->
  <text x="600" y="22" font-family="sans-serif" font-size="16" fill="#3fb950">&#x2713;</text>
  <!-- NO path (bottom) -->
  <line x1="300" y1="170" x2="300" y2="210" stroke="#f85149" stroke-width="1.5"/>
  <polygon points="296,207 300,215 304,207" fill="#f85149"/>
  <text x="312" y="195" font-family="sans-serif" font-size="10" fill="#f85149">NO</text>
  <!-- Real LLM box -->
  <rect x="230" y="215" width="140" height="30" rx="4" fill="#161b22" stroke="#f85149" stroke-width="1.5"/>
  <text x="300" y="235" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e8eaed">Real LLM Call</text>
  <!-- Arrow to Non-deterministic -->
  <line x1="370" y1="230" x2="440" y2="230" stroke="#f85149" stroke-width="1.5"/>
  <polygon points="437,226 445,230 437,234" fill="#f85149"/>
  <!-- Non-deterministic box -->
  <rect x="445" y="215" width="175" height="30" rx="4" fill="#161b22" stroke="#f85149" stroke-width="1.5"/>
  <text x="532" y="235" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#f85149">Non-deterministic</text>
  <!-- X mark -->
  <text x="635" y="237" font-family="sans-serif" font-size="16" fill="#f85149">&#x2717;</text>
</svg>
<figcaption>Mock the LLM to make tests deterministic — test your logic, not the model's output.</figcaption>
</figure>

Agentic PM has 14 tests that use mocked LLM responses. The pattern:

```python
@patch('agents.decomposition.call_llm')
def test_epic_decomposition_creates_subtasks(mock_llm):
    mock_llm.return_value = {
        "tasks": [
            {"title": "Design API schema", "hours": 4, "confidence": 0.9},
            {"title": "Implement endpoints", "hours": 8, "confidence": 0.85},
        ]
    }
    result = decompose_epic("Build user authentication API")
    assert len(result.tasks) == 2
    assert all(t.confidence > 0.8 for t in result.tasks)
    assert result.total_estimate == 12
```

What this tests: the decomposition agent correctly parses LLM output, creates task objects, computes aggregates, and applies confidence thresholds. These are YOUR business rules, and they're fully deterministic once the LLM response is fixed.

What this doesn't test: whether the LLM produces good decompositions. That's a different kind of testing (see "What Not to Test").

<div class="callout"><p>Mock tests answer: "If the LLM gives me a reasonable response, does my code do the right thing with it?" This is the highest-ROI test you can write for an AI product.</p></div>

## Strategy 2: Test Preprocessing Separately
{: #strategy-2-test-preprocessing}

<p class="cs-lead">Career Enabler's preprocessing pipeline — PDF parsing, NER, TF-IDF keyword matching, readability analysis, ATS scoring — is entirely deterministic. These deserve dedicated test suites.</p>

```python
def test_ats_keyword_matching():
    resume = create_resume(skills=["Python", "Django", "REST APIs"])
    jd = create_jd(required=["Python", "Django", "Kubernetes", "GraphQL"])
    score = calculate_ats_score(resume, jd)
    assert score.keyword_match == 0.5  # 2 out of 4
    assert set(score.missing) == {"Kubernetes", "GraphQL"}
```

These tests run in milliseconds, require no API calls, and catch real bugs. When I changed the TF-IDF weighting to give more importance to skills section keywords, these tests immediately caught the score shift and validated the new behavior.

## Strategy 3: Schema Validation
{: #strategy-3-schema-validation}

<p class="cs-lead">Both products use a <code>parse_llm_json()</code> utility that validates LLM responses against Pydantic models. The test strategy: verify parsing handles well-formed, malformed, and edge cases.</p>

```python
def test_parse_llm_json_with_markdown_wrapper():
    raw = '```json\n{"tasks": [{"title": "Setup", "hours": 4}]}\n```'
    result = parse_llm_json(raw, schema=TaskListSchema)
    assert len(result.tasks) == 1

def test_parse_llm_json_refusal():
    raw = "I'm sorry, I can't help with that."
    with pytest.raises(LLMParsingError):
        parse_llm_json(raw, schema=TaskListSchema)
```

That last test matters more than you'd think. LLMs occasionally return apologies or refusals instead of JSON. Your code needs to handle this gracefully — retry, return a user-friendly error, or fall back to a default.

## Strategy 4: E2E User Flow Tests
{: #strategy-4-e2e-user-flows}

<p class="cs-lead">Career Enabler has Playwright tests that verify complete workflows without asserting on AI-generated content:</p>

```python
async def test_resume_tailoring_flow(page):
    await page.goto("/tailor")
    await page.set_input_files("#resume-upload", "fixtures/sample.pdf")
    await page.fill("#jd-input", SAMPLE_JD)
    await page.click("#generate-btn")
    await page.wait_for_selector("#result-panel", timeout=30000)
    assert await page.is_visible("#download-btn")
    result_text = await page.inner_text("#result-panel")
    assert len(result_text) > 100  # Something was generated
```

E2E tests are your safety net for integration issues: auth token expiry, CORS problems, file upload limits, timeout handling. They test the plumbing, not the AI.

## The AI Testing Pyramid
{: #the-ai-testing-pyramid}

<p class="cs-lead">Here's the testing pyramid for AI products:</p>

### Level 1 — Unit Tests (60%)

Mocked LLM + preprocessing. Fast, deterministic, high coverage. Run on every commit.

### Level 2 — Integration Tests (20%)

Schema validation, error handling for malformed/refused responses. Run on every commit.

### Level 3 — E2E Tests (15%)

Playwright tests that verify user flows, not content. Run on every PR.

### Level 4 — Manual Evaluation (5%)

Periodically generate outputs and review qualitatively. Maintain an eval set of inputs and review weekly. This can't be automated, but it CAN be structured.


<figure class="viz" role="img" aria-label="AI testing pyramid: unit tests 60%, integration 20%, E2E 15%, manual eval 5%">
<svg viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg">
  <polygon points="350,15 580,175 120,175" fill="none" stroke="#21262d" stroke-width="1"/>
  <rect x="150" y="140" width="400" height="32" rx="2" fill="#161b22" stroke="#21262d" stroke-width="1"/>
  <text x="350" y="161" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e8eaed">Unit Tests — Mocked LLM + Preprocessing (60%)</text>
  <rect x="200" y="105" width="300" height="30" rx="2" fill="#161b22" stroke="#21262d" stroke-width="1"/>
  <text x="350" y="124" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#e8eaed">Integration Tests (20%)</text>
  <rect x="250" y="72" width="200" height="28" rx="2" fill="#161b22" stroke="#21262d" stroke-width="1"/>
  <text x="350" y="91" text-anchor="middle" font-family="sans-serif" font-size="11" fill="#7d8590">E2E — Playwright (15%)</text>
  <rect x="300" y="40" width="100" height="26" rx="2" fill="#161b22" stroke="#ff2d00" stroke-width="1.5"/>
  <text x="350" y="58" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#4A9EFF">Manual (5%)</text>
  <text x="350" y="192" text-anchor="middle" font-family="sans-serif" font-size="10" fill="#7d8590">100+ tests across two AI products</text>
</svg>
<figcaption>AI testing pyramid: most coverage from fast mocked unit tests; manual evaluation reserved for qualitative review.</figcaption>
</figure>

## What Not to Test
{: #what-not-to-test}

<p class="cs-lead">Equally important — what I deliberately don't test:</p>

<ul class="cs-body-list">
  <li><strong>Don't test LLM output quality with assertions.</strong> "The tailored resume should mention Python" will break when the LLM writes "Python 3.x" instead.</li>
  <li><strong>Don't test for specific wording.</strong> <code>assert "stakeholder management" in result</code> is brittle. The LLM might write "stakeholder engagement" — both correct, both failing your test.</li>
  <li><strong>Don't create golden file tests for LLM outputs.</strong> Snapshot testing works for React components because renders are deterministic. It doesn't work for LLM outputs.</li>
</ul>

The boundary is clear: test your code, validate your contracts, verify your flows. Evaluate your AI separately, with human judgment and structured eval sets — not with pytest assertions.

---

*See the test suites: [Career Enabler](https://github.com/Arcanag/career-enabler) and [Agentic PM](https://github.com/Arcanag/agentic-pm).*
