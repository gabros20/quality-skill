# `quality` skill — synthesis

**Written by:** the controller (main agent), from five channel corpora.
**Date:** 2026-07-26. **Status:** build-gate decision artifact.

Corpora: `skills-corpus.md` (625) · `web-canon-corpus.md` (1,822) · `webdesign-extraction.md` (1,456)
· `github-corpus.md` (1,131) · `x-corpus.md` · `controller-notes.md` (rulings and corrections).
Raw worker output retained in `_raw/` (~9,000 lines).

---

## 1. Wedge: NARROW — and why that is still a build

Four independent lanes of the skills channel, working disjoint keyword territories, all returned
NARROW. A genuinely neutral QA router already exists and is good: `petrkindlmann/qa-skills` (MIT,
50 skills, 15,637 lines) with a real dispatch table, a risk-scoring skill, and a 443-line
evidence-based go/no-go gate. **Roughly 70% of the territory named in the separation-of-concerns
clarification is already occupied by that one repo.** Anyone who claims this niche is empty has not
read it.

The remaining opening is specific and was established by exhaustive grep, not impression. Across all
50 of its skills and their references:

| Concept | Occurrences |
|---|---|
| `residual risk` | 0 |
| `oracle problem` | 0 |
| `what not to test` | 0 |
| `evidence dossier` | 0 |
| `abuse case` | 0 |
| `suite runtime budget` | 0 |

The techniques are covered, often better than we would cover them. **The judgment layer that decides
which techniques are warranted, what is deliberately left unverified, and what risk remains after the
gate is not written down anywhere in the ecosystem.**

Three further facts bound the opportunity:

1. **The popular option is not neutral.** `agentic-qe` (421★) is command documentation for its own
   CLI and agent fleet, and labels part of itself aspirational. The neutral option has 44★.
2. **The flagship shelf is bare.** `anthropics/skills`, `vercel-labs/agent-skills` and
   `ComposioHQ/awesome-claude-skills` ship **no** quality/QA/gate/triage skill at all. Anthropic's own
   `testing-strategy` is ~35 lines.
3. **The problem is validated at enormous scale with no router over it.**
   `obra/superpowers@verification-before-completion` — "don't claim done without fresh evidence" — sits
   at **261,332★** as a single-session discipline card. The gap between a 261K★ discipline card and a
   44★ router that must also write your unit tests *is* the wedge.

### The structural argument — why we can hold a boundary a competitor cannot

`qa-skills` owns `unit-testing`, `playwright-automation` and `cypress-automation` alongside its
router. That is not a design flaw. **It is standalone, so it has nowhere to hand construction-testing
to; refusing would leave a hole.** We already ship four owners — `frontend/testing.md`,
`backend/backend-testing.md`, `ai/evaluation.md`, `data/quality-and-testing.md`. The boundary that
would be arbitrary self-limitation for a standalone pack is **structurally native to us**, and a
competitor cannot copy it without first becoming a family.

**Honest counterweight, to be preserved in the build:** for a solo developer with no family
installed, the blended library is probably the better product. Our advantage is real only inside the
family. The skill must not claim `qa-skills` is badly designed.

### Risk on the verdict

`npx skills find` **misses skills by their exact names** (`"test strategy"` → 0 hits while that exact
skill exists). Zero-hit results prove nothing; the verdict rests on the **depth of what was found, not
the completeness of the sweep**. Largest known unread object: `naodeng/awesome-qa-skills` (137★,
GPL-3.0). Follow-up if more confidence is wanted: re-sweep via `gh search code` over SKILL.md
frontmatter.

---

## 2. Mission and through-line

**Mission.** Provide independent evidence that the assembled product meets its functional and
non-functional expectations, and convert that evidence into two separate decisions: **may we ship**,
and **what may we claim**.

**Through-line:**
> **Name the oracle, grade the evidence, publish the gap — and subtract the folk number.**

**Positioning (skills channel, hardened against a reader who knows both packs):** `qa-skills` answers
*"how do I test this?"* fifty times, very well. `quality` answers *"how do I know, and how would I
know I was wrong?"* once, and refuses to answer the first question at all.

---

## 3. The crown jewel: a four-way convergence

Four independent bodies of work, reached from four directions, land on one conclusion:
**a verification result cannot be binary, because the thing producing it cannot decide every case.**

| Direction | Finding | Source |
|---|---|---|
| **Theory** | An oracle *"helps you decide"* — it does not *"tell you."* A fallible oracle cannot produce a binary truth. | Kaner (2012) |
| **Standards** | ACT Rules carry a formal three-valued EARL test-mode split: `automatic` / `manual` / `semiAuto`. | W3C ACT |
| **Tooling** | axe-core ships an `incomplete` class, and **55% of its 105 documented rules can return it** — the most-used a11y engine says, in the majority of its rules, that it might not know. | axe-core source |
| **Assurance standard** | Every claim *shall* state uncertainty and conditions of applicability; evidence *shall not* be extended past what it covers; **omission is permitted, silent omission is not**. | ISO/IEC 15026-2:2011 §6.3.2, §6.3.3, §7.2(b) |

These map one-to-one onto the evidence-state vocabulary found independently in the skills channel:
**`observed` / `inferred` / `not_tested` / `blocked`.** The vocabulary is not our invention — it is the
name for something four independent bodies of work already require.

**Declared divergence (keep it explicit, do not dress it as conformance):** ISO/IEC 15026-2 requires
*quantified* uncertainty. Web-product QA almost never has that. We ship an **ordinal** evidence-state
vocabulary instead and say so.

**The warning that shapes the design:** the same literature specifying assurance cases has spent
twenty years documenting that they are routinely fallacious in practice, and the standard concedes it
constrains the *existence* of content, not its *quality*. **A skill that ships a dossier format
without shipping the adversarial read of it has built the thing the literature warns about.** The
dossier and its adversarial read are one feature, never two.

---

## 4. Shape

**11 jobs × 5 base surfaces + 1 additive overlay + handoff = 18 references.**

### Jobs

| # | Job | Owns |
|---|---|---|
| 1 | `verification-strategy-and-risk` | Risk-ranked altitude allocation; what is deliberately not verified; entry/exit criteria; stopping heuristics |
| 2 | **`oracles-and-evidence` ⭐ FLAGSHIP** | The judgment layer. Naming the oracle; the four evidence states; the *"what this evidence does not establish"* table, generatable for any tool |
| 3 | `functional-verification` | Assembled-system behaviour, journeys, cross-service integration — explicitly not unit/component authoring |
| 4 | `accessibility-conformance` | Conformance vs. scan; machine-testable boundary; VPAT/ACR; claim scope |
| 5 | `performance-and-load-verification` | Field vs lab; percentiles and populations; coordinated omission; budgets as inputs from `architecture` |
| 6 | `security-and-privacy-verification` | ASVS levels as assurance grades; scanner confidence models; severity precedence conflicts; behavioural privacy checks |
| 7 | `compatibility-and-support-matrix` | Deciding the matrix, and where its numbers may legitimately come from — with the licence terms on that data |
| 8 | `ai-behavior-verification` | Evals as a gate rather than a dev instrument; judge validity; non-determinism; red-team; eval-set leakage |
| 9 | `suite-and-signal-health` | Flake as an evidence-validity problem; coverage semantics; mutation; regenerability; runtime budget |
| 10 | `defect-lifecycle` | Minimal repro; sourced severity taxonomy; triage routing to the owning pack |
| 11 | `release-gate-and-claims` | The dossier, its adversarial read, residual risk with owner and expiry, and the ship/claim split |

### Surfaces

`surface-web-app-and-site` (default, includes marketing/landing) · `surface-service-api` ·
`surface-mobile` · `surface-data-pipeline` · `surface-ai-system` ·
**`surface-regulated`** (additive overlay — conformance claims, VPAT/ACR, EN 301 549, audit evidence;
mirrors `data`'s regulated overlay and `ai`'s multi-agent overlay).

**Surface coverage is a measured differentiator, not a claim.** Grep across all 50 competitor skills:
web app, mobile and API are first-class; **data pipeline scores one incidental hit, `"data engineer"`
zero, landing page zero, internal tool absent as a facet.** Four of our surfaces are unserved by the
incumbent.

### Open design question for the build

Two severity scales were inherited from the decommissioned `webdesign` skill — A0–A3 (craft) and
P0–P3 (functional), deliberately kept separate there. The canon channel supplies a **sourced**
alternative: Chillarege's ODC defect-type and trigger taxonomy. **Decision: adopt ODC as the spine and
map the inherited scales onto it**, rather than shipping two ad-hoc ladders or inventing a third. The
old split may have been a web-specific artifact.

---

## 5. Invariants (12 for the router)

1. **Name the oracle.** Every verdict rests on one. If you cannot name it, you are guessing, not
   verifying.
2. **A passing check certifies only the propositions someone encoded.** Never report "all checks
   passed" as "the software is fine."
3. **State the evidence class** — `observed` / `inferred` / `not_tested` / `blocked` — and never
   report a weaker class in the vocabulary of a stronger one.
4. **Evidence may not be extended past the conditions it covers.** A component pass is not a
   product-workflow pass; never infer an untested surface from a tested one.
5. **Omission is permitted; silent omission is not.** A stated, justified gap conforms. Silence does
   not.
6. **Whatever is unrefuted is residual risk** — surfaced to the decision-maker with an owner and an
   expiry.
7. **Decide release and claim independently.** A product may ship with a recorded exception without
   earning an unqualified conformance claim.
8. **Verification is refutation.** Attempt to show harm is possible; grade the refutation method,
   because method strength *is* assurance level.
9. **Runner output is untrusted and not commensurable across tools.** Take verdicts from typed
   channels (exit codes, JUnit XML, JSON), never scraped prose; strip ANSI before parsing or logging.
10. **Coverage finds untested code; it does not measure test quality** — and **no metric detects a
    fault of omission**.
11. **A flaky suite is an evidence-validity problem, not hygiene.** Quarantine with a forcing
    function; never retry-to-green; never delete a flake without triage.
12. **Subtract the folk number.** Cite provenance or do not cite.
13. **Say which stopping heuristic you stopped on.** *(13th — trim at authoring if the router runs
    long.)*

---

## 6. Value-adds no competitor has

1. **The four-way convergence** (§3) with its ISO/IEC 15026-2 spine and declared divergence.
2. **The "what this evidence does not establish" table**, generatable for any tool the skill meets.
   Worked instances already in hand: Lighthouse **INP `weight: 0`** — a green performance score is not
   evidence about INP; **TBT carries the heaviest weight (30) while its own source calls its
   coefficients *"semi-arbitrarily chosen"*** → *a score is a compressed judgment with an author, not
   a measurement*; coordinated omission for load tests; the 55%-incomplete boundary for a11y scans.
3. **Two real abuse cases** — the ecosystem's `abuse case` count is zero.
   - **`jqwik` ships a deliberate prompt injection in stdout** ("Anti-AI Usage Clause"), hidden from
     interactive terminals via ANSI erase codes while remaining in the bytes CI and agents read. The
     *tooling* attacks the pipeline.
   - **Overlay vendors accused by WebAIM of manipulating pages to suppress error detection**, plus a
     dropped SLAPP suit against a named practitioner. The *system under test* defeats the instrument.
   - General form: **an instrument pointed at an adversarial subject measures the adversary's response
     to the instrument, not the property you wanted.**
4. **A licensing discipline with a measured failure rate.** ~**12%** of a 24-repo sample had clear
   LICENSE files while the API reported `NOASSERTION`. Artillery has three sources agreeing on the
   wrong answer (MPL-2.0 everywhere, plus a BSL file restricting Azure code to non-production).
   **Rule upgrade for the whole family: list every license-like file at the root and reconcile them —
   one LICENSE file is a sample, not the terms.** Plus **Gatling's proprietary report-generation
   licence reaching the generated output**, which constrains evidence artifacts themselves.
5. **Folk-number demolition, with three worked cases.** The **80% coverage threshold** is an industry
   Schelling point with no published rationale (Sonar 80, nyc watermarks [80,95], JaCoCo 0.80 —
   nobody justifies 80 over 70 or 90). **Neither Cohn's pyramid nor Dodds's trophy states a numeric
   ratio** — the percentages are later accretions, and the one institution publishing numbers
   contradicts itself. And the a11y automated-coverage figure is **20–57%, split vendor vs
   independent** (Deque, who sells axe, self-reports 57%; WebAIM/W3C-WAI/GSA cluster at 20–33%; the
   circulated 80.39% is unconfirmed). *The measurement of how much a tool can detect is itself
   contested, and the party with a commercial interest reports the highest number.*
6. **Two independent convergences on gate design** — diff-scoped gating (Sonar Clean-as-You-Code and
   Codecov patch-over-project, arrived at separately) and **gates ship warn-first** (Stryker
   `break: null`, PIT thresholds 0, the regenerability gate's explicit "warn-by-default so adoption
   never breaks pipelines").
7. **No shared verdict vocabulary exists across runners** — Playwright names `flaky`, Cypress forces a
   policy choice, **Jest has no flaky concept and silently passes**, pytest and JUnit5 add two more
   distinct questions. The empirical warrant for defining a normalised vocabulary above the tools.
8. **The family seam**: writes no tests, because four sibling skills already own construction-side
   testing.

---

## 7. Inherited from the decommissioned `webdesign` skill

100 verbatim items across 12 themes, with an independent completeness proof (a second worker found
0 net-new items under exhaustive cross-check). Headline transfers:

- The **go/no-go gate** and its named failure mode (rounding up).
- **No-first-pass-sign-off paired with convergence discipline** — round one may never approve; from
  round two approve once top severities clear, escalation only, hard round cap. **Ship as a pair:
  the first half alone is a hazing ritual, the second alone is toothless. Together they give a
  termination guarantee.**
- The **evidence-integrity rule**, generalised past the browser: *an audit report must state the
  evidence class it rests on, and a weaker class may never be reported in the vocabulary of a
  stronger one.*
- **Compatibility is a genuine zero** — nothing to inherit; sourced entirely from github/canon.

**Licensing:** `pbakaus/impeccable` Apache-2.0 (verified) attaches to the gate machinery itself and
travels into SOURCES.md; `@google/design.md` Apache-2.0 (verified — cite the repo, npm has no licence
field); **`bendc/frontend-guidelines` has NO LICENSE → all-rights-reserved**, affecting ~11 items —
**ruling: keep the ideas, re-express in our own words, ship no near-verbatim text.** The Awwwards
judging weights are unverifiable — **drop or re-source.**

---

## 8. Build plan

Mirrors the drill validated on `design`, `frontend`, `product`, `architecture`, `backend`, `ai`, `data`.

| Stage | Crew | Notes |
|---|---|---|
| Compose | 7 × Sonnet writers on disjoint reference sets | Controller writes `SKILL.md` router and does integration itself |
| Assets | 1 writer | `handoff.yaml` (+`volatile_facts`), evidence-dossier template, "what this does not establish" worksheet, risk matrix, severity/ODC map, flake-quarantine policy, compatibility-matrix worksheet, release-gate checklist |
| Evals | 1 writer | activation · traversal · output · compression-ablation |
| Review | 1 × Opus, independent | Briefed with corpora as ground truth; hunt the hallucinated-fact class specifically |
| Release | storefront ∥ site | Then controller runs the release train |

**Anti-staleness is a first-class invariant here**, not a footnote: every version, threshold, price and
licence in this domain churns, and the corpora are dated 2026-07-26 with re-verify pointers.

**Reviewer must specifically check:** that no folk number ships uncited · that the a11y figure ships
as a split range and never as a single number · that the LLM-tests-assert-the-bug claim ships as
**reasoning, not measurement** (no study exists; it stayed `[UNVERIFIED empirically]` under pressure)
· that the dossier never appears without its adversarial read · that no near-verbatim text from the
unlicensed source survives · that the dropped items (an alleged internal system-prompt leak; a
secondary-paraphrase quotation) do not reappear.

---

## 9. Open gaps carried forward

`naodeng/awesome-qa-skills` GPL-3.0 unread · DORA band numbers secondary-sourced only (and dora.dev
now lists **five** metrics, not four — `deployment rework rate` is new) · IEEE 1044 paywalled ·
Google flaky-test blog numbers unretrievable · `skills find` name-matching defect · no quantified
study of LLM tests asserting existing bugs.
