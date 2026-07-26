# Performance and Load Verification

Purpose: Decide whether performance evidence supports the claim being made — measured against
budgets `architecture` sets, reporting breaches, never renegotiating the number.

Read when:
- A request asks to verify a Core Web Vitals budget, a load-test result, an API latency SLO, or
  whether a performance claim ("fast," "handles N users") is supportable.
- A Lighthouse, LHCI, k6, or Gatling report exists and someone wants to know what it licenses you
  to say.
- A load test produced clean-looking percentiles that need a second look before they are trusted.

## Skip when:

- The budget or SLO number itself needs to be set or renegotiated — that decision belongs to
  `architecture`; this file only measures against a number it was handed and reports the gap.
- You need the general evidence-state vocabulary or how to name an oracle for a new tool →
  `oracles-and-evidence.md`.
- You need the ship/claim split, the dossier, or residual-risk recording →
  `release-gate-and-claims.md`.
- The system under test is an AI/agent pipeline and the question is latency-vs-quality tradeoff for
  model calls → `ai-behavior-verification.md` / `surface-ai-system`.
- The question is functional correctness under load (does the feature still work, not how fast) →
  `functional-verification.md`.

Inputs:
- The budget or SLO, with its source, date, and the traffic population it was set for
  (`architecture`'s artifact — do not invent one here).
- Field data (CrUX, RUM) where a field claim is being made; lab tool version and config where a lab
  claim is being made.
- The workload model used for any load test (open or closed) and the arrival-rate assumption.

Produces:
- A pass/fail against the stated budget, with the percentile and population named.
- An explicit statement of whether the evidence is lab or field, and what that does and does not
  establish.
- A breach report when the budget is missed — never a silently adjusted budget.

## Contents

- [Lab is not field](#lab-is-not-field)
- [Core Web Vitals thresholds](#core-web-vitals-thresholds)
- [The Lighthouse scoring model as a worked example](#the-lighthouse-scoring-model-as-a-worked-example)
- [Reporting a breach concretely](#reporting-a-breach-concretely)
- [Coordinated omission](#coordinated-omission)
- [Open vs. closed workload models](#open-vs-closed-workload-models)
- [Tail latency at scale](#tail-latency-at-scale)
- [Validation](#validation)
- [Failure modes and handoff](#failure-modes-and-handoff)

## Lab is not field

Verified 2026-07-26 at web.dev/articles/vitals, re-verify before citing a later revision:

> "While lab measurement is an essential part of delivering great experiences, it is not a
> substitute for field measurement... Only field measurement can accurately capture the complete
> picture."

**A lab run (Lighthouse, a synthetic load test, a single-machine benchmark) is evidence about one
configuration, one network condition, one moment.** It is not evidence about the population of
real users or real traffic (I4 — evidence may not be extended past the conditions it covers). Any
performance claim must state which class it rests on:

| Class | What it is evidence of | What it is not evidence of |
|---|---|---|
| Lab (Lighthouse, synthetic load test) | The configuration actually run, reproducibly | Real-world device/network mix, real concurrency patterns, real user behavior |
| Field (CrUX, RUM, production load) | What real users/traffic actually experienced | Isolation of *why* — field data rarely pinpoints root cause the way lab data does |

Report **the percentile and the population** every time — "p75 LCP is 2.1s" is a claim about
nothing until you state p75 of *what population, over what window*. A lab run has no population;
say so rather than implying one.

## Core Web Vitals thresholds

Verified at web.dev/articles/vitals, 2026-07-26 — re-verify before citing a later revision, as
these values and their boundaries change:

| Metric | "Good" threshold | Verbatim |
|---|---|---|
| LCP | ≤ 2.5 s | "should occur within 2.5 seconds of when the page first starts loading" |
| INP | ≤ 200 ms | "pages should have an INP of 200 milliseconds or less" |
| CLS | ≤ 0.1 | "pages should maintain a CLS of 0.1 or less" |

**Measurement convention, verbatim: "a good threshold to measure is the 75th percentile of page
loads, segmented across mobile and desktop devices."** A single-page-load measurement is not a
Core Web Vitals claim; a claim requires the percentile and the segment. `[UNVERIFIED — not
re-quoted this session]` the "needs improvement"/"poor" upper boundaries and the 28-day CrUX
rolling window; re-verify both before citing a specific number.

INP replaced FID as the responsiveness metric: promoted from experimental in 2023, stable Core Web
Vital since 2024 (web.dev, verified). A budget still written against FID is stale — check the
budget's own date before applying it.

## The Lighthouse scoring model as a worked example

**A score is a compressed judgment with an author, not a measurement — and Lighthouse's own source
proves it.** Verified from `GoogleChrome/lighthouse` v13.4.1, `core/config/default-config.js:408-413`
(2026-07-26; weights change between major versions — always cite the version):

| Metric | Weight |
|---|---|
| FCP | 10 |
| LCP | 25 |
| TBT | **30** |
| CLS | 25 |
| SI | 10 |
| **INP** | **0** |

**INP carries weight 0.** It is measured and displayed in the report, but contributes nothing to
the score. Lighthouse's own answer to "a lab tool cannot decide responsiveness-to-interaction" is
not to guess — it shows the number and assigns it zero authority. **A green Lighthouse performance
score is not evidence about INP.** Anyone citing "Lighthouse 100" as evidence of good
responsiveness is citing a metric the score does not include.

**TBT carries the heaviest weight (30) while its own control-point source comment reads,
verbatim: "The following coefficients are semi-arbitrarily chosen, but start to approach the
'correct' ones."** The metric with the most influence over the headline number is the one whose
own author documents the least confidence in its calibration. Contrast CLS, whose control point
states real justification: "This 0.1 target score was determined through both manual evaluation
and large-scale analysis." Not every weight is equally arbitrary — but the heaviest one is the
least justified, and the score does not disclose that difference to a reader who only sees the
number.

Two more properties that follow directly from reading the source, not from opinion:
- **Mobile and desktop use different control points** (e.g., FCP p10 1800ms mobile vs. 934ms
  desktop) **by design — the two scores are not comparable.** A regression from 95 (desktop) to 90
  (mobile) on the same build is not evidence of a regression.
- **Weights and control points change between major versions.** A budget or a comparison across
  builds must cite the Lighthouse version each score came from, or the comparison is meaningless.

The general lesson this instance carries: wherever a tool compresses several measured signals into
one number, ask which signals it silently drops (INP, here) and which coefficients its own
maintainers do not claim are principled (TBT, here) before treating the number as more than a
compressed opinion (I2 — a passing/high score certifies only the propositions someone encoded).

## Reporting a breach concretely

Budgets come from `architecture`; this file's job ends at measuring against them and stating the
gap in the tool's own typed output — never a scraped summary line (I9). Three tools converge on
the same shape: a percentile-based expression, evaluated against a stated threshold, machine-typed
pass/fail.

- **k6** `thresholds`, verbatim grammar from source: an aggregation method (`avg`/`min`/`max`/
  `med`/`p(N)`) plus an operator plus a value, e.g. `http_req_duration: ["p(95)<500"]`. An
  `abortOnFail` option can stop the run early on breach rather than only flagging it post hoc —
  state which behavior a given run used, since "the test was aborted" and "the test ran to
  completion and then failed" are different evidence.
- **Gatling** assertions chain scope → statistic → metric → condition, e.g.
  `global().responseTime().percentile(95).lt(500)`.
- **Lighthouse CI** `assert` config evaluates per-audit against a preset or per-URL `assertMatrix`;
  its unstated default (`{"aggregationMethod":"optimistic","minScore":1}`) demands a *perfect*
  score using the *most favorable* of the collected runs — a permissive default a reader who
  assumes "default means strict" will misread.

Point at these for mechanics; this file does not re-teach tool configuration. What every one of
them shares, and what the breach report must preserve: the percentile, the population/URL pattern,
and the exact threshold expression that failed — not a rounded restatement.

## Coordinated omission

**The highest-value, least-written-down concept in load verification.** Verbatim, Gil Tene:

> "Omission on its own is not a big problem, as long as the omission is random... However, when
> omission is coordinated with observed events, it can dramatically skew the statistical analysis
> of the remaining results" — because "we are only omitting the 'very bad results.'"

A **closed-loop** load generator waits for a response before sending the next request. When the
system under test stalls, the generator sends *fewer* requests during the stall — so one long
pause becomes one outlier sample instead of the many high-latency samples a real, always-arriving
workload would have produced. Every percentile downstream is deflated, and the deflation is worst
exactly where it matters most: the tail.

**Worked magnitude** (ScyllaDB, 22 Apr 2021): uncorrected **p99 = 249 µs**; corrected **p99 =
665 ms** — over 2,600 times higher on the same run. A load-test report that does not state whether
its generator corrects for coordinated omission has not established what its own percentile
numbers claim to establish. Ask before trusting a p99: closed-loop and uncorrected, or corrected /
open-loop.

## Open vs. closed workload models

Two generator designs produce different meanings from the same nominal load, `[UNVERIFIED — the
Schroeder/Wierman/Harchol-Balter "Open Versus Closed: A Cautionary Tale" (NSDI 2006) primary text
could not be re-fetched this pass; treat the characterization below as standard secondary summary,
not a verified quote]`:

- **Closed model** — a fixed number of "users," each waiting for a response before issuing the
  next request. Concurrency is capped by construction; when the system slows down, offered load
  drops with it — the generator cannot describe a system that falls permanently behind, because it
  never tries to.
- **Open model** — new requests arrive on their own schedule (e.g., Poisson), independent of when
  previous requests finished. Offered load does not back off when the system slows — this is the
  model that can actually describe queueing collapse.

**The choice changes what the result means, not just its number.** A closed-model test reports "the
system handled N concurrent users acceptably"; an open-model test at the same nominal rate can
reveal unbounded queue growth the closed model structurally cannot show. State which model produced
a load-test result before it is used to support a capacity claim — an unstated model is an
unstated assumption baked into every percentile in the report.

## Tail latency at scale

Dean & Barroso (CACM 2013), verbatim (via secondary quotation; primary CACM page unreachable this
pass):

> "It is challenging for service providers to keep the tail of latency distribution short for
> interactive services as the size and complexity of the system scales up or as overall use
> increases. Temporary high-latency episodes (unimportant in moderate-size systems) may come to
> dominate overall service performance at large scale."

A budget stated only as a mean or median is silent about exactly the failure mode that dominates at
scale. Pair any load-verification result with a tail percentile (p95/p99), not only a central
tendency, and treat a widening tail — even with a stable median — as a finding, not noise.

## Validation

- [ ] Every performance claim states lab or field, and the percentile plus population if field.
- [ ] No Lighthouse score is cited as evidence about INP; INP is reported from its own measured
      value, not inferred from the category score.
- [ ] Any cross-build or cross-device score comparison cites matching Lighthouse versions and
      matching device class (mobile vs. desktop control points are not comparable).
- [ ] Any load-test result states whether its generator is open- or closed-loop and whether it
      corrects for coordinated omission.
- [ ] A tail percentile (p95/p99, not only mean/median) accompanies any capacity or latency claim.
- [ ] The budget being measured against is cited from `architecture`'s artifact with a date —
      never invented or silently adjusted here.

## Failure modes and handoff

- **A missed budget quietly re-negotiated** — this file reports the breach; it does not have the
  authority to lower the number. Route a genuinely wrong budget back to `architecture`.
- **"Lighthouse 100" reported as a responsiveness claim** — INP weight is 0; restate as "INP
  measured at Xms, not scored," and check it against the 200ms threshold directly.
- **A load test's percentile trusted without checking its workload model** — ask open/closed and
  coordinated-omission correction before citing a p99 in a capacity claim; if unknown, report the
  percentile as `inferred`, not `observed` (I3).
- **A field claim made from lab data, or vice versa** — restate with the correct evidence class;
  do not let a lab run answer a question only field data can answer.
- Hand named-oracle and evidence-state bookkeeping to `oracles-and-evidence.md`; hand the
  ship/claim decision and residual-risk expiry (e.g., an accepted tail-latency regression with an
  owner and a date) to `release-gate-and-claims.md`.
