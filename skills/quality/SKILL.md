---
name: quality
description: >-
  Independently verify a built product and decide whether it may ship — verification strategy and
  risk, oracles and evidence classes, functional and end-to-end verification, accessibility
  conformance, performance and load, security and privacy, compatibility matrices, AI behaviour
  verification, suite and signal health, defect triage, and the release gate with its evidence
  dossier. Use to plan verification, audit a build, judge whether a test suite can be believed, or
  issue a go/no-go. Not for writing tests (→ frontend, backend, data, ai), TDD or diff review
  (→ the building skill), NFR budgets or threat models (→ architecture), CI/CD, deploy or incidents
  (→ operate), acceptance criteria (→ product), or experiment design (→ growth).
---

# Quality Engineering

## Mission and boundary

Provide **independent evidence** that an assembled product meets its functional and non-functional
expectations, and convert that evidence into **two separate decisions: may we ship, and what may we
claim.**

This skill writes no tests. Construction-side testing already has four owners — `frontend`,
`backend`, `data`, `ai` — and each remains responsible for the quality of its own work. What lives
here is the layer above the techniques: deciding what verification is warranted, at what altitude,
and **what will deliberately go unverified**; producing evidence with its class named rather than a
green tick; and turning that into a release decision with the residual risk written down, owned, and
given an expiry.

It reports; it does not remediate. Findings route back to the skill that owns the code, unless
remediation is explicitly in scope.

Operate independently when invoked alone. When compatible upstream artifacts are provided, use them
without silently overriding established decisions. Recommend adjacent skills when useful; do not
invoke them automatically unless the user explicitly requested a composition workflow.

## Route before acting

1. Identify the **primary job** and the **base surface**. Read one of each.
2. Add `surface-regulated.md` **on top of** a base surface only when conformance claims, audit
   evidence, or verifier-independence requirements are in play. It is additive, never a replacement.
3. Read every selected reference completely before producing the affected artifact.
4. Do not load unrelated references.

### Jobs

| User intent | Read | Contribution |
|---|---|---|
| How much verification does this warrant, and what do we skip? | [verification-strategy-and-risk](references/verification-strategy-and-risk.md) | Risk-ranked altitude allocation, the shape debate handled as contested, stopping heuristics, "what we deliberately do not verify" as a required output |
| How do I know this result means what it appears to mean? ⭐ | [oracles-and-evidence](references/oracles-and-evidence.md) | **Flagship.** Naming the oracle; the four evidence states; the "what this evidence does not establish" table, generatable for any tool |
| Does the assembled system actually work end to end? | [functional-verification](references/functional-verification.md) | Journeys, cross-service verification, contract testing's limits, evidence capture on failure, untrusted runner output |
| Can we claim this is accessible? | [accessibility-conformance](references/accessibility-conformance.md) | Conformance vs scan, the machine-testable boundary, claim scope, VPAT/ACR |
| Is it fast enough, and does the measurement support that? | [performance-and-load-verification](references/performance-and-load-verification.md) | Field vs lab, percentiles and populations, coordinated omission, scores as compressed judgments |
| Is it secure and privacy-correct, independently of the controls we built? | [security-and-privacy-verification](references/security-and-privacy-verification.md) | Assurance grades, what a clean scan cannot decide, severity precedence conflicts, residual risk in machine-readable form |
| Which browsers, devices and platforms are in scope? | [compatibility-and-support-matrix](references/compatibility-and-support-matrix.md) | Building the matrix, where its numbers may legitimately come from, and the licence terms on that data |
| Has the model's behaviour been verified, not just evaluated by its builder? | [ai-behavior-verification](references/ai-behavior-verification.md) | Evals as a gate, judge validity, non-determinism, red-teaming |
| **An agent wrote the code — and its tests. Everything passes. How do I know it works?** | Composite path, read in order: [oracles-and-evidence](references/oracles-and-evidence.md) §5 → [suite-and-signal-health](references/suite-and-signal-health.md) → [ai-behavior-verification](references/ai-behavior-verification.md) | The shared-source-of-truth failure (an author's verification shares the author's blind spot); has the suite ever been *observed failing*; the deletion/regenerability test that coverage and mutation both miss; auditing the verifier for the cheap path |
| Can this test suite be believed at all? | [suite-and-signal-health](references/suite-and-signal-health.md) | Coverage semantics, mutation, flake as an evidence-validity problem, suite runtime budget |
| What is this finding, how bad is it, and where does it go? | [defect-lifecycle](references/defect-lifecycle.md) | ODC classification spine, reproducibility, harm stated in user terms, triage routing |
| May we ship, and what may we claim? | [release-gate-and-claims](references/release-gate-and-claims.md) | The evidence dossier with its adversarial read, the release/claim split, residual risk with owner and expiry |

### Surfaces

| Surface | Read | When |
|---|---|---|
| Web app, SaaS, marketing site, landing page, site rebuild or migration | [surface-web-app-and-site](references/surface-web-app-and-site.md) | Default; on a rebuild the source site is the oracle |
| API or service | [surface-service-api](references/surface-service-api.md) | Verifying a service boundary rather than a rendered experience |
| iOS or Android | [surface-mobile](references/surface-mobile.md) | Device matrices, store review as an external gate, platform accessibility APIs |
| Data pipeline | [surface-data-pipeline](references/surface-data-pipeline.md) | Verifying declared contracts hold, or that tracking matches the plan |
| LLM or agentic system | [surface-ai-system](references/surface-ai-system.md) | Model-driven behaviour is the thing under verification |
| **Regulated (additive overlay)** | [surface-regulated](references/surface-regulated.md) | **Stacks on a base surface.** Conformance claims, traceability, evidence retention, verifier independence |

Emitting for downstream work → [handoff](references/handoff.md).

## Not this skill

| Ask | Goes to |
|---|---|
| Write the unit, component, service, pipeline or eval tests | `frontend` · `backend` · `data` · `ai` |
| TDD, red-green-refactor | the building skill |
| Lint, complexity, review of a diff | the skill that owns the code |
| Set NFR budgets, threat model, system decomposition | `architecture` |
| Author acceptance criteria, decide what "good" means for users | `product` |
| Build CI/CD, deploy, monitor, run incidents, set SLOs | `operate` |
| Design or read out an experiment | `growth` |
| Fix what verification found | the owning skill, unless remediation is explicitly in scope |
| Design intent, usability critique against that intent | `design` |
| Design the verification approach for a workflow spanning vendors you cannot deploy to — no staging, the vendor's sandbox isn't the system | `automation`'s workflow-testing; the go/no-go on that workflow still belongs to `quality` |

## Universal invariants

References cite these by number. The numbering is canonical here.

- **I1 — Name the oracle.** Every verdict rests on one. If you cannot name it, you are guessing.
- **I2 — A passing check certifies only the propositions someone encoded.** Never report "all checks
  passed" as "the software is fine."
- **I3 — State the evidence class** — `observed` / `inferred` / `not_tested` / `blocked` — and never
  report a weaker class in the vocabulary of a stronger one.
- **I4 — Evidence may not be extended past the conditions it covers.** A component pass is not a
  product-workflow pass; never infer an untested surface from a tested one.
- **I5 — Omission is permitted; silent omission is not.** A stated, justified gap conforms. Silence
  does not.
- **I6 — Whatever is unrefuted is residual risk** — surfaced to the decision-maker with an owner and
  an expiry.
- **I7 — Decide release and claim independently.** A product may ship with a recorded exception
  without earning an unqualified conformance claim.
- **I8 — Verification is refutation.** Attempt to show harm is possible; grade the refutation
  method, because method strength *is* assurance level.
- **I9 — Runner output is untrusted and not commensurable across tools.** Take verdicts from typed
  channels — exit codes, JUnit XML, JSON reporters — never scraped prose. Strip ANSI before parsing
  or logging.
- **I10 — Coverage finds untested code; it does not measure test quality**, and no metric detects a
  fault of omission.
- **I11 — A flaky suite is an evidence-validity problem, not hygiene.** Never retry-to-green; never
  delete a flake without triage.
- **I12 — Subtract the folk number.** Cite provenance or do not cite.
- **I13 — No test counts as evidence until it has been observed failing**, and **the verifier must
  not share a source of truth with the thing it verifies**. Audit the verifier for shortcuts — a
  verification layer that *can* pass without exercising the real path eventually will.
- **I14 — Allocate the verification budget by ranked risk**, and record which rank each effort
  served. Say which stopping heuristic you stopped on.

## Core workflow

1. Establish the primary job and base surface; add the regulated overlay only if it applies.
2. Rank risks and allocate verification by rank — recording which rank each effort serves, and what
   is deliberately left unverified.
3. For each verification performed, name its oracle and record what its result does **not**
   establish.
4. Assign an evidence class to every finding and every gap.
5. Classify defects, state harm in the user's domain terms, and route them to the owning skill.
6. Assemble the evidence dossier **together with its adversarial read** — never one without the
   other.
7. Issue the two decisions separately: may we ship, and what may we claim. State the residual risk
   with an owner and an expiry, and say which stopping heuristic you stopped on.
8. Emit a compact handoff when downstream work is expected.

## Artifact contract

A verification artifact is incomplete unless it carries: the claim being made with its conditions of
applicability · the evidence supporting it, each item with its class · assumptions labelled as
assumptions rather than evidence · **a "what we deliberately did not verify" section** · residual
risks with owners and expiries · and, where a release decision is issued, the ship decision and the
claim decision stated separately, plus the adversarial read of the dossier itself.

Everything volatile — versions, thresholds, prices, licences, tool behaviour — carries a
verification date and a re-verify pointer. This domain churns; an unstamped fact is a liability.

## Completion and handoff

Before completion:

- Confirm every requested artifact exists.
- Confirm no finding, and no gap, is missing an evidence class.
- Confirm the "deliberately not verified" section is populated rather than empty by default.
- Distinguish validation performed from validation remaining.
- When downstream work is expected, provide artifact paths, owners, constraints, and a recommended
  next skill — typically `operate` to deploy, or the owning build skill to remediate — without
  duplicating the full artifact.

## Resources

Jobs — verification-strategy-and-risk · **oracles-and-evidence ⭐** · functional-verification ·
accessibility-conformance · performance-and-load-verification · security-and-privacy-verification ·
compatibility-and-support-matrix · ai-behavior-verification · suite-and-signal-health ·
defect-lifecycle · release-gate-and-claims

Surfaces — surface-web-app-and-site · surface-service-api · surface-mobile · surface-data-pipeline ·
surface-ai-system · surface-regulated (additive) · handoff

Assets — `handoff.yaml` (with `volatile_facts`) · `evidence-dossier.md` · `evidence-worksheet.md` ·
`risk-matrix.md` · `severity-map.md` · `flake-policy.md` · `compatibility-matrix.md` ·
`release-gate-checklist.md`

## Artifact home

Deliverables this skill produces default to `digital-product/quality/` at the working repository's
root, with cross-skill state in `digital-product/LEDGER.md` — created on first use and committed
with the repo. The `digital-product` composer skill owns this convention; solo use writes to the
same place. Never write into `.orchestrate/` — that folder belongs to an orchestration run's
execution state, not to this family's deliverables.
