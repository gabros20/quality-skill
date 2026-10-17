# Oracles and evidence ⭐ (flagship)

Purpose: This file decides how to name the oracle behind any check, grade what a result actually
proves, and state that grade in a shared vocabulary — the judgment layer every other `quality`
reference and both release decisions (may we ship, what may we claim) are built on top of.

Read when:
- A tool, scanner, or suite produced a result and something has to be said about what it proves.
- Two tools disagree, or a green result needs to be translated into a claim someone can rely on.
- Writing or reviewing any "evidence" artifact — a dossier row, a VPAT line, a CI gate comment.

Skip when:
- Allocating verification effort by risk, defining entry/exit criteria, or naming a stopping
  heuristic — → `verification-strategy-and-risk.md`.
- The check is domain-specific and its evidence boundary is already worked out:
  `accessibility-conformance.md`, `performance-and-load-verification.md`,
  `security-and-privacy-verification.md`,
  `ai-behavior-verification.md`, `suite-and-signal-health.md` — each applies this file's method.
- Assembling the dossier, running its adversarial read, or deciding release/claim — →
  `release-gate-and-claims.md`, which owns that pairing and must not be separated from it.
- Writing the actual test — → the owning construction skill (`frontend`/`backend`/`ai`/`data`).

Inputs: a check, scan, or suite that produced a result; access to how it computed that result
(source, docs, or config — not marketing copy).

Produces: the named oracle behind the result; its evidence-state classification
(`observed`/`inferred`/`not_tested`/`blocked`); a "does not establish" row usable in a dossier.

## Contents
- Name the oracle
- The four-way convergence (and the honest divergence)
- The four evidence states
- The "what this evidence does not establish" table
- Interrogate the check itself
- Validation
- Failure modes and handoff

## Procedure

### 1. Name the oracle
Cem Kaner's revision is the whole judgment layer in one substitution: a testing oracle is not "a
tool that tells you whether the program passed your test" but **"a tool that helps you decide
whether the program passed your test"** (kaner.com/?p=190, 2012) — "useful tools that help us make
decisions, but sometimes they point us to the wrong decision." A fallible oracle cannot produce a
binary truth; a binary verdict is not something to demand from a check, it is epistemically
unavailable by construction. Grading the evidence, not trusting the verdict, is the job.

**Procedure — for any check, before trusting its output:**
1. State the exact proposition the check evaluates, in one sentence. Not "it validates the API" —
   "the response matches the OpenAPI schema for this status code."
2. Find where that proposition came from: a machine-readable spec, an author's declared judgment
   call, a convention nobody wrote down, or nothing at all.
3. Decide whether the oracle is mechanical (a computable predicate, same answer every run) or
   requires a human in the loop. A check can only evaluate a proposition someone already decided
   was worth asking and phrased precisely enough for a machine — it cannot notice a problem nobody
   thought to ask about. If the proposition is computable, compute it: a reviewer, human or model,
   hand-tracing "does every route exist, does every block type have a renderer" is a weaker and more
   fudgeable oracle than the script that counts. Keep judgment for what cannot be computed.
4. State what the oracle cannot decide. Every oracle has a boundary; naming it is the deliverable.
5. Record it: `oracle: <name/type> — decides: <proposition> — cannot decide: <boundary>`.

**Three tools, three different answers to "what makes this correct?"** — proof the oracle is a
design choice, not a given:

| Tool | Where the oracle comes from | Character |
|---|---|---|
| **Schemathesis** | Derived from the OpenAPI spec: 13 named checks (`status_code_conformance`, `response_schema_conformance`, `ignored_auth`, …) | Spec-derived — but even here, `positive_data_acceptance` accepts `401/403/404/409/5xx` as valid rejections, admitting valid data can legitimately fail for reasons orthogonal to schema shape. |
| **Pact** | Author declares a *minimal* expected response; verification passes if the real response "contains **at least**" that data | Deliberately loose — matcher guidance invokes **Postel's Law** explicitly, advising matchers "as loose as possible." Compatibility chosen over strictness. |
| **Karate** | The `match` keyword carries fuzzy markers the author opts into per field | Author-declared — strictness is a per-assertion decision, not a framework policy. |

No tool can pick the right oracle for you, which is exactly why "what is the oracle here?" has to
sit above the tools, not inside any one of them.

### 2. The four-way convergence
Four independent bodies of work, reached from four directions, land on the same conclusion: **a
verification result cannot be binary, because the thing producing it cannot decide every case.**
This is the strongest structural argument in the skill — no competitor's technique library states
it, because none of them had to reconcile theory, a standards body, a shipping tool, and an
assurance standard at once.

| Direction | Finding | Source |
|---|---|---|
| **Theory** | An oracle "helps you decide," it does not "tell you" (§1 above). | Kaner, 2012 |
| **Standards** | ACT Rules carry a formal three-valued EARL test-mode split — `automatic` / `manual` / `semiAuto` — with real rules producing "further testing needed." | W3C ACT |
| **Tooling** | axe-core ships an `incomplete` result class. **55% of its 105 documented rules can return it** — in the majority of its rules, the most-used a11y engine says it might not know. | axe-core |
| **Assurance standard** | Every claim's uncertainty and conditions of applicability `shall` be stated (§6.3.2(c),(f)); evidence `shall` not be extended past the conditions it covers (§6.3.3); required content may be omitted only with documented justification (§7.2(b)) — all normative `shall`. | ISO/IEC 15026-2:2011 |

These map onto one operational vocabulary (§3): theory says binary is epistemically unavailable,
standards say the spec already carries a third value, tooling says the implementation already
emits it, and the assurance standard says an unstated-uncertainty claim is non-conforming. Four
independent directions requiring the same thing is not a coincidence — it is the strongest
available argument that this is how verification works, not a stylistic choice.

**The declared divergence — state it, do not dress it up.** ISO/IEC 15026-2 requires **quantified**
uncertainty on every claim (§6.3.2(c)). Web-product QA almost never has a number to put there. This
skill ships an **ordinal** evidence-state vocabulary instead — `observed`/`inferred`/`not_tested`/
`blocked` — and says so plainly. That is a deliberate adaptation of the standard, not conformance to
it, and no dossier built on this file may claim ISO/IEC 15026-2 conformance on the strength of the
vocabulary alone.

### 3. The four evidence states
The operational vocabulary every reference and the dossier use. Report a result as one of:

| State | Means | Example |
|---|---|---|
| `observed` | Directly witnessed under stated conditions — a human check, or a typed tool channel (exit code, JUnit XML, JSON) exercising the real system. | A manual AT pass on the checkout flow; a passing E2E run against staging. |
| `inferred` | Not directly checked; derived from a covered, `observed` result plus a stated similarity assumption. | "This page uses only design-system component X, which was `observed` passing" — valid only if the composition itself, not just the component, was checked. |
| `not_tested` | No evidence exists. Must be labelled deliberate (a scoped decision, with the stopping heuristic or risk rank it was traded against) or accidental (a gap that needs an owner). | A surface out of this release's risk allocation. |
| `blocked` | Verification was attempted and could not complete — environment, access, or tooling failure. Distinct from `not_tested`: this was tried. | A scan that timed out; a rule axe-core itself returns as `incomplete`. |

Four rules, non-negotiable:
1. **Never report a weaker class in the vocabulary of a stronger one.** An `inferred` result does
   not get written up as `observed`; a `blocked` scan does not get written up as `not_tested` (it
   was attempted) or silently dropped.
2. **Never infer an untested surface, platform, or workflow from a neighbouring result.** A pass on
   Chrome desktop is not evidence for Safari mobile; a pass on one workflow is not evidence for an
   adjacent one, however similar it looks.
3. **Never treat a design-system pass as proof that composed product workflows pass** — the
   compositional fallacy. Component-level `observed` results do not transitively become
   product-level `observed` results; the composition itself is a separate proposition with its own
   oracle.
4. **A "not found" is evidence about the instrument until a second probe confirms it.** A crawler
   reading a cleaned or rendered variant can report a hero video missing while a plain fetch of the
   raw response carries its URL inline; a vendor compatibility table that omits a feature does not
   show the current release lacks it. Report an unconfirmed absence as `inferred` (`blocked` if the
   probe failed), never as an `observed` absence, and confirm it with a rawer, independent instrument
   before it drives a decision.

In the wild: a rule axe-core returns as `incomplete`, or ACT marks `manual`/`semiAuto`, is `blocked`
— not silently `observed` as a pass. "Passing" a scan with unresolved incomplete rules is not the
same claim as a clean, fully-resolved one.

### 4. The "what this evidence does not establish" table
The table the competitive set gestures at and never writes down — and the reason this file is the
flagship. Every row is the same move: a tool produced a green result; state precisely what that
result cannot speak to. **Generate this row for any tool the skill meets:**

1. Read the tool's actual scoring or check logic (source or docs), not its marketing description —
   find the exact proposition it computes.
2. Find the tool's stated scope of applicability: population, environment, run conditions.
3. If the result is a composite score, find the weights or coefficients behind it and whether the
   tool's own source states a rationale for them, or admits it has none.
4. Write what a perfect result still does not cover — the population, behavior, or condition class
   outside the tool's reach even at 100%.
5. Fill the row: `| what was produced | what it establishes | what it does NOT establish | source |`.

Worked rows, verified:

| Evidence produced | Establishes | Does **not** establish |
|---|---|---|
| **Green Lighthouse performance score** | One simulated run under synthetic conditions, v13.4.1's weighted metrics. | Anything about **INP** — `weight: 0`: measured, displayed, zero authority. The score itself is a judgment: **TBT has the heaviest weight (30)**, and its source comment reads *"semi-arbitrarily chosen, but start to approach the 'correct' ones."* A score is a compressed judgment with an author, not a measurement. |
| **Passing automated a11y scan** | A bounded set of machine-detectable failure patterns absent from one page state. | Full pages, complete processes, AT compatibility, non-interference (WCAG 2.2's other four conformance requirements) — the scanner says so itself: **55% of axe's 105 rules can return `incomplete`.** Automated coverage is never one figure: vendor self-report (Deque, who sells axe) **57%**; independent measurement (WebAIM, W3C/WAI, GSA) **20–33%**. Report the split range — never the unconfirmed, circulated 80.39%. |
| **Passing load test at target RPS** | The harness sent load and got responses. | True tail latency, unless coordinated omission is corrected — a closed-loop generator sends *fewer* requests during a stall, so the worst latencies are exactly the missing samples (p99 249µs → 665ms, "over 2,600 times higher"). Nothing about soak, spike, or stress unless that test type ran. |
| **Clean SAST/DAST scan** | No externally reachable instance of the patterns the tool encodes. | Anything at ASVS L2/L3 — those require "documentation, architecture, source code, and the people involved," unreachable by black-box scanning. Nor business logic or authorization flaws, which are manual procedures. |
| **Passing eval / benchmark score** | The model behaved as scored, on that distribution, at that version, on that date. | Anything beyond those conditions — ISO/IEC 15026-2 §6.3.3 forbids extending a claim past what its evidence covers. |
| **Green test-runner output** | Whatever verdict that specific runner emits. | A shared meaning across runners — none exists. Playwright names the third state `flaky` (still exit-code green); Cypress Cloud forces a policy choice; **Jest has no flaky concept and silently reports `passed`.** A "pass" from one runner and another are different propositions — take verdicts from typed channels only. |

**The pattern is the deliverable, not the table** — ISO/IEC 15026-2 §6.5.2(b) ("scope of
applicability") made concrete, tool by tool. Meet a new tool, run the five-step procedure, write
the row.

### 5. Interrogate the check itself
Before asking what a result means (§4), ask whether the check was capable of producing a
meaningful one at all — a distinct failure from a bounded oracle: the oracle answered an *easier*
question than the one asked, and its green result revealed nothing.

**The clearest instance is dated and first-hand.** Robert C. Martin set a QA agent to verify
features, but it tested through APIs, so "QA never proved that features got fully connected to the
UI" — mouse and keyboard events were never exercised (@unclebobmartin, 2026-07-10). *Cited by handle
and date deliberately: a platform "verified" badge is a purchased subscription, not an identity
check, and this file does not treat one as a credibility signal.*
His fix was not a better verifier but **a checker that audits the verifier**: "wrote a checker that
inspected the QA script for API calls. This prevented the QA from cheating."

Three questions to ask about the check itself, before its result is trusted:
1. **Has it ever been observed failing?** An assertion never seen to fail against a deliberately
   broken version has not been demonstrated capable of failing — it is not yet known to be an
   oracle at all. The cheapest way to watch a gate fail: replay it against an archived run already
   known to be bad — it should fail on each known defect inside its scope; a known defect it passes
   is a gap in the gate.
2. **Does the verifier share a source of truth with the thing it verifies?** If the same process
   produced both the implementation and its check, they cannot check each other. Keep one
   independent oracle: a pre-existing spec, real recorded traffic, a different model, or a
   human-reviewed acceptance criterion.

   > **Canonical statement — the shared-source-of-truth failure:** *an author's verification shares
   > the author's blind spot.* This file owns that rule; other references point here rather than
   > restate it. **It is a different failure from the compositional fallacy** (§3 rule 3, where a
   > component pass is wrongly extended to a composition). Compositional fallacy is about *scope*;
   > this is about *independence*. A judge sharing the graded system's assumptions, an in-pipeline
   > check encoding the pipeline's own misunderstanding, and an author signing off their own
   > conformance claim are all instances of this rule, not of that one.
3. **Can this verification layer pass without exercising the real path?** If it can, it eventually
   will. Audit the verifier itself, the way Martin's checker audits the QA script, rather than
   trusting its verdict. The common shapes, each a pass for a proposition nobody exercised — report
   the proposition `not_tested` or `blocked`, never passed:
   - **The write path's confirmation instead of the read path users consume** — an authoring API
     lists content as created while the delivery path serves 404; a `published` flag disagrees with
     what is actually served. Verify through the path the user reads.
   - **A gate over an empty set** — zero pages selected, a validator that skips when its input
     artifact is missing. Zero inputs must fail loudly.
   - **A fail-open guard** — its silence means "no positive match", not "checked and clean".
   - **An acceptance criterion stated only in prose**, or enforced at a warn level nobody reads.
   - **A proxy comparison** — nav labels compared but not link targets; "has a section" accepted on
     a page an order of magnitude smaller than its siblings. Compare against peers, not only existence.

General form, not AI-specific: **an instrument that can satisfy its success criterion without
exercising the real path eventually will, whether the author is a human or an agent.**
AI-authored-test specifics are `ai-behavior-verification.md`'s territory; this is the check-design
discipline underneath it.

## Validation
- Every result carried into a dossier names its oracle and states what that oracle cannot decide.
- Every check the dossier relies on has been observed failing at least once, and does not share a
  source of truth with the thing it verifies.
- No result is reported in the vocabulary of a stronger evidence state than it earned; no absence is
  reported `observed` on one instrument's word.
- No composite score is cited without checking whether its weights carry a stated rationale.
- The a11y coverage figure, if cited, is the split range (57% vendor / 20–33% independent), never
  a single number.
- Any "does not establish" claim ships with its source; nothing is asserted from memory.

## Failure modes and handoff
- **A dossier ships this table without an adversarial read.** The literature on assurance cases
  (ISO/IEC 15026-2's own cited bibliography) has spent two decades showing such cases are routinely
  fallacious in practice, and the standard itself concedes it constrains the *existence* of
  required content, not its *quality* (§1, scope). An unargued "does not establish" table is the
  exact shape that literature warns about — the table and its adversarial read are one feature,
  never two — → `release-gate-and-claims.md`, which owns that pairing and the release/claim split.
- **The tool is new, no worked row yet.** Run the §4 procedure before shipping its score uncritically.
- **Someone wants a probability where this file gives an ordinal state.** Say the §2 divergence from
  ISO/IEC 15026-2 out loud rather than inventing a number to look conformant.
- **The ask is which techniques to run, or where to stop looking.** That is risk-based allocation
  and stopping heuristics, not oracle-naming — → `verification-strategy-and-risk.md`.
