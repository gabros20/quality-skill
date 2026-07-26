# Suite and Signal Health

Purpose: Decide whether the verification apparatus itself — coverage, mutation score, flake rate,
runtime — can be believed, before any number it produces is asserted as evidence.

Read when: a suite's trustworthiness is in question; someone proposes a coverage target; flake is
being tolerated or retried away; or an AI-authored suite needs assessing.

Inputs: the existing test suite and its metrics; CI history including flake and runtime; the
proposed or inherited thresholds.

Produces: a judgement on whether the suite's signal is believable, a quarantine policy with a
forcing function and time bound, and an explicit statement of what each metric cannot establish.

## Skip when:

- You need the evidence-state vocabulary (`observed`/`inferred`/`not_tested`/`blocked`) or how to
  generate a "what this evidence does not establish" row for a new tool → `oracles-and-evidence.md`.
- You need the release/claim decision, the dossier, or the residual-risk record that a suite-health
  finding feeds → `release-gate-and-claims.md`.
- You need to rank risk or allocate the verification budget before choosing a technique →
  `verification-strategy-and-risk.md`.
- A flaky test's triage turns up a real product bug → `defect-lifecycle.md` owns severity and routing
  from that point.
- You need non-determinism, judge validity, or eval-set leakage for an AI system's own evals — a
  distinct problem from suite flakiness → `ai-behavior-verification.md`.

## Contents

- [Coverage: what it finds, and its unfixable blind spot](#coverage-what-it-finds-and-its-unfixable-blind-spot)
- [The 80% threshold: a Schelling point, not a rationale](#the-80-threshold-a-schelling-point-not-a-rationale)
- [Mutation testing: the answer coverage cannot give](#mutation-testing-the-answer-coverage-cannot-give)
- [Regenerability: the sharpest answer for AI-authored code](#regenerability-the-sharpest-answer-for-ai-authored-code)
- [Flake is an evidence-validity problem, not hygiene](#flake-is-an-evidence-validity-problem-not-hygiene)
- [The compounding math](#the-compounding-math)
- [Suite runtime as a first-class budget](#suite-runtime-as-a-first-class-budget)
- [Failure modes and handoff](#failure-modes-and-handoff)

## Coverage: what it finds, and its unfixable blind spot

Coverage answers exactly one question: which lines executed. It does not answer whether the tests that
executed them assert anything meaningful, and this is not a tooling gap — it is structural.

**Marick (1997), the original statement:** *"It can only tell me how the code that exists has been
exercised. It can't tell me how code that ought to exist would have been exercised."* He names the
class **faults of omission** — bugs fixed by adding new code — and the claim generalizes to every
coverage metric that will ever be built: **no metric can detect the absence of code**, because a
metric can only measure what is there to instrument.

**This is not asserted, it is measured — the largest study of its kind.** Inozemtseva & Holmes, ICSE
2014 (ACM Distinguished Paper), generated 31,000 test suites across five systems up to 724,000 SLOC:

> "There is a low to moderate correlation between coverage and effectiveness when the number of test
> cases in the suite is controlled for... coverage, while useful for identifying under-tested parts of
> a program, should not be used as a quality target because it is not a good indicator of test suite
> effectiveness."

The decisive detail: raw correlation looked strong (τ 0.75–0.85) *only because larger suites have both
more coverage and more tests*. Control for suite size and it collapses to ~0 on one project and
**−0.35** (negative) on another. Statement, decision, and MC/DC coverage also correlate with each
other at τ 0.91–0.92 — they are near-interchangeable, so a stronger coverage *type* buys almost
nothing. **Treat any single coverage percentage as a map of what was touched, never as a proxy for
test quality.**

Marick's own operating heuristic is the constructive use: coverage read **per risk bucket**, not in
aggregate — *"looking at aggregate coverage is a matter of idle curiosity"* — and a coverage gap is a
clue about where the tester didn't look, which is often correlated with other undetected weaknesses.

## The 80% threshold: a Schelling point, not a rationale

Three independent tools converge on the same number, and none of them cites a study for it:

| Tool | Default | What it gates |
|---|---|---|
| SonarQube Sonar way (`SonarWayQualityGate.java`, 26.7.0.124771) | `new_coverage < 80` fails | new-code coverage |
| nyc | watermark range `[80, 95]` | reporting thresholds |
| JaCoCo | official example rule, `minimum 0.80` | line/branch coverage |

**No primary source names why 80, as opposed to 70 or 90.** Marick's own 1997 anecdote about a
required 85% gate is a consulting observation, not a controlled study, and he reports teams clustering
"right around 85%" as a Goodhart effect, not evidence the number was correct. Fowler's independent
data point is directional, not a target: *"upper 80s or 90s"* is what a *thoughtfully tested* codebase
tends to show as a symptom, and *"below ~50%... a sign of trouble"* — neither is a gate value. **Treat
80% as an industry Schelling point: a number everyone converged on because everyone else did, not a
number anyone measured.** If you adopt it as a gate, say so plainly and cite it as convention, never as
a validated threshold — and prefer the diff-scoped form (below) over a whole-codebase target.

## Mutation testing: the answer coverage cannot give

Mutation testing answers what coverage structurally cannot: **not just "was this line run" but "would
a test have noticed if this line were wrong."** A tool seeds synthetic faults (mutants) into the code
and reruns the suite; a mutant a test suite fails to catch is "survived" — a defect the suite would not
have caught even though the line was executed.

**Stryker's two formulas make the distinction operational:**

```
Mutation score                       = detected / valid    (valid = detected + undetected)
Mutation score based on covered code = detected / covered  (covered = detected + survived)
```

A team with low coverage but a high *covered-code* score has a **coverage problem**; a team with high
coverage but a low covered-code score has a **test-quality problem** — the split exists precisely to
tell those two failures apart, which raw coverage cannot do. The mutant-status taxonomy separates real
weakness from noise: `Killed` / `Survived` (a genuine gap) / **`No coverage`** (a worse gap — nothing
even ran against it) / `Timeout` / `Runtime error` / `Compile error` (excluded from both denominators —
inconclusive results must not pollute the score either direction).

**The honest counterweight — an unactionable assurance metric is not evidence.** Google evaluated
mutation testing at scale (Petrović & Ivanković, ICSE-SEIP 2018: 70,000 diffs, 1.1M mutants) and
explicitly rejected a global mutation-*score* target:

> "At present it is infeasibly expensive to compute the absolute mutation score for the codebase at
> any given fixed point... we were also unable to find a good way to surface it to the engineers in an
> actionable way."

**Google dropped mutation score because it could not be turned into a decision an engineer could act
on — not because it was inaccurate.** That is the general failure mode of an assurance metric: accuracy
is necessary but not sufficient; a number nobody can act on is not evidence, it is noise with a
precision decimal. Google's replacement — per-diff living-mutant findings with "arid node" suppression
(logging, imports, `sleep`, idiomatic boilerplate) and a developer feedback loop — moved usefulness
from 20% to a settled 75%, at a median of 2 living mutants per diff. **The lesson transfers directly:
a global mutation-score gate repeats coverage's own mistake with a more expensive tool. A per-change,
actionable signal does not.**

Also structural, not a tooling limit: the **equivalent mutant problem** — *"automatically detecting all
equivalent mutants is impossible... because program equivalence is undecidable"* (Jia & Harman, IEEE
TSE 2011) — means the denominator of any mutation score is never exactly known. Report mutation score
with that caveat attached, the same way a coverage percentage needs its scope-of-applicability caveat.

## Regenerability: the sharpest answer for AI-authored code

Coverage and mutation score can both be satisfied by tests that encode the same misunderstanding as
the implementation — a real risk once suites are AI-authored at volume. The regenerability check (the
"Deletion Test," `agentic-qe`, MIT) asks a different question: **if this module were deleted and
regenerated from its tests and spec, would a wrong rebuild be caught?** Regenerability is mutation
score discounted by the durability of what backs the module — durable (a real spec/contract) > live
(a running reference) > ephemeral (only the current implementation) > none. Ephemeral-only tests score
low precisely because they cannot survive a reimplementation; they would pass a wrong rebuild that
made the same mistake as the original. Report it alongside, not instead of, coverage and mutation:

```
Coverage 88% ✅ / Mutation 41% ⚠️ / Regenerability: ephemeral-only ⚠️
```

Ship any regenerability gate **warn-by-default** (see below) — the point is visibility into suite
value, not a new brownfield blocker on day one.

## Flake is an evidence-validity problem, not hygiene

A flaky test is not a nuisance to clean up when convenient. Fowler's argument (2011) is the strongest
in the corpus for why suite health is epistemic, not cosmetic:

> "Once you start ignoring a regression test failure, then that test is useless and you might as well
> throw it away... Once that discipline is lost, then a failure in the healthy deterministic tests will
> get ignored too."

**Ignoring one flake does not cost you one test's signal — it costs you the suite's credibility.** Once
a team learns to click "rerun" on red, a real failure in an unrelated, perfectly deterministic test
gets the same reflexive rerun. The suite has stopped being evidence and become a formality everyone has
learned to route around.

**Rules that follow directly:**

- **Never retry-to-green.** A rerun that turns red into green tells you a run eventually passed, not
  that the failure was noise. Root-cause taxonomy work (Luo et al., FSE 2014 — 151 projects, 486 fixed
  flaky tests, 161 inspected) found **24% of flaky-test fixes also changed the code under test**, and
  86% of those fixed a genuine non-deterministic production bug. **A flaky test may be a real bug and
  must never be deleted without triage.** Google's own data point (Listfield 2017, low-confidence
  extraction) put it at roughly **1 in 6** flaky-to-fixed transitions traced to a production defect.
  126 of 161 flaky tests in the Luo sample were flaky from the moment they were written — flakiness is
  usually a day-one property, not decay.
- **Quarantine with a forcing function and a time bound**, never an unbounded holding pen. Fowler's
  policy: place the test in a quarantined area, but bound it — *"only allow 8 tests in quarantine"* or
  *"no longer than a week"* — so quarantine is a queue with a deadline, not a place tests go to be
  forgotten. Concrete hygiene numbers worth adopting (`petrkindlmann/qa-skills`, MIT): quarantine
  entries capped at 14 days, every entry linked to a ticket, weekly review, and **more than 5% of a
  suite in quarantine is a systemic-problem signal**, not 500 independent nuisances.
- **Delete only after triage confirms no signal.** The deletion criterion is demonstrated behavior —
  a test the team has already started ignoring on failure — not age or low coverage contribution. But
  demonstrated-ignored and triaged-as-noise are different gates: confirm the root cause first (async
  wait, concurrency, order dependency — the top three causes, ~78% combined, per Luo et al.), *then*
  fix or delete.

**No shared verdict vocabulary exists across test runners, which is itself a signal-health risk.**
Playwright reports a distinct `flaky` verdict on retry; pytest-rerunfailures reports `RERUN` atop an
eventual pass; Cypress Cloud forces a policy choice between two named strategies
(`detect-flake-and-pass-on-threshold` vs `detect-flake-but-always-fail`); **Jest has no flaky concept
at all — an eventually-passing test is silently reported as `passed`, indistinguishable from a test
that passed cleanly.** A "pass" from Jest and a "pass" from Playwright are different propositions.
This is the empirical case for normalizing verdicts above the runner rather than trusting whichever
vocabulary a given tool happens to ship — see `oracles-and-evidence.md` for the typed-channel rule this
implies (runner stdout is untrusted; take verdicts from exit codes, JUnit XML, or JSON reporters only).

Track suite health as trending metrics, not a one-time check: pass rate (target >95%, alert <90%),
flakiness (<5%, alert >10%), MTTR on a flaky fix (<4h, alert >24h), and coverage delta run-to-run
(alert on a drop >2%) are a defensible starting set (`petrkindlmann/qa-skills`, MIT) — with the same
caveat as any threshold in this file: state it as adopted convention, not derived fact.

## The compounding math

A per-test flake rate that sounds negligible compounds across a suite. Documented worked example
(Detox, MIT), verbatim:

> "Assume you have a suite of 100 tests and each test is flaky in 0.5% of executions... The total
> flakiness of your entire suite is about 40% (the exact formula is `1 - (1 - 0.005)^100`). This means
> that there's 40% chance your suite will fail without an actual bug! This makes your entire suite
> useless."

**0.5% per test → 40% suite-level failure rate with no bug present.** Report flake at the suite level,
never only per-test — a "0.5%, basically nothing" framing is the exact place this metric hides. Google
reports its own steady-state test-run flake rate around 1.5% (2016, read via mirror — treat as
directional, nine-plus years old) with roughly 16% of tests showing *some* flakiness, and states
separately (*Software Engineering at Google*, ch. 11) that *"as you approach 1% flakiness, the tests
begin to lose value"* — consistent with the compounding math above, not a coincidence.

## Suite runtime as a first-class budget

Suite runtime is a verification-budget decision, not an infrastructure afterthought — a slow suite gets
skipped, and a skipped suite produces no evidence at all. Concrete anchors:

- **Test sizing by hermeticity, not scope** (*Software Engineering at Google*, ch. 11/14): small tests
  are restricted to one thread, one process, one machine; large tests may be non-hermetic and
  non-deterministic, with default timeouts of 15 minutes or 1 hour. Put slow, non-hermetic tests in a
  later pipeline stage deliberately — Fowler's framing: *"you can always move slow tests to a later
  stage... that's part of the trade-off of build times versus test confidence."* State the trade-off;
  do not let it happen by accretion.
- **Predictive test selection is a quantified, bounded, accepted miss rate** — the shape a
  runtime-budget trade-off should take when you do it deliberately. Meta's predictive selection
  (ICSE-SEIP 2019) halves CI infrastructure cost while still reporting *"over 95% of individual test
  failures and over 99.9% of faulty changes."* The 5%/0.1% gap is not hidden — it is the residual risk,
  stated as a number, in exchange for a stated cost saving. Any suite-runtime shortcut this skill
  recommends should be reported the same way: bounded, quantified, and named as a trade rather than
  presented as free.
- **A test:production code ratio near 1:1** is the field's rough ideal (van Deursen et al., XP2001,
  observed 2:3 in the studied codebase) — useful as a sanity check on suite bloat, not a target to
  engineer toward.

## Failure modes and handoff

- **A coverage or mutation number reported without its scope-of-applicability caveat** — send it back;
  neither metric means what an unqualified percentage implies it means.
- **Retry-to-green treated as a passing run** — this is not hygiene debt, it is an evidence-validity
  violation; route it to the quarantine policy above, never to a silent rerun.
- **A flaky test deleted before triage** — block it; confirm root cause and rule out a real bug first.
- **"Flakiness: 0.5%, negligible" reported without the suite-level number** — recompute at suite scale
  before accepting the claim.
- Hand a triaged flaky-test-revealed bug to `defect-lifecycle.md`; hand a suite-health finding that
  changes what may be claimed to `release-gate-and-claims.md`; hand a suite-runtime trade-off that
  changes budget allocation back to `verification-strategy-and-risk.md`.
