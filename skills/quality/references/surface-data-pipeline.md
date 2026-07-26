# Surface: Data Pipeline

Purpose: Decide which jobs matter most, in what order, and where this skill's independent
verification ends and `data`'s construction-side testing begins when the thing under verification is
a batch or streaming data pipeline.

Read when: verifying that a pipeline's declared contracts actually hold in production, or that a
tracking implementation matches the tracking plan it claims to implement.

Inputs: the pipeline and its declared contracts; the tracking plan if one exists; `data`'s
in-pipeline trust gates, which are construction-side and verified here independently.

Produces: a surface-specific job order, an independent contract-versus-production check, a
tracking-plan drift finding set, and an explicit statement of the seam with `data`.

## Skip when:

- You are building the pipeline, its tests, or its in-pipeline data-quality checks
  → `data` (`quality-and-testing.md`), not this skill.
- You are verifying a request/response API rather than a pipeline → `surface-service-api.md`.
- You need the mechanics of a specific check (schema diff, freshness SLA test) rather than what this
  surface prioritizes → `functional-verification.md` or `oracles-and-evidence.md`.

## Contents

- [Why this is the weakest surface in the incumbent ecosystem](#why-this-is-the-weakest-surface-in-the-incumbent-ecosystem)
- [Job order](#job-order)
- [Verifying declared contracts hold in production](#verifying-declared-contracts-hold-in-production)
- [Verifying tracking implementation against the tracking plan](#verifying-tracking-implementation-against-the-tracking-plan)
- [The seam with `data`](#the-seam-with-data)

## Why this is the weakest surface in the incumbent ecosystem

Across all 50 skills in the neutral incumbent QA router, `"data pipeline"` returns one incidental hit
and `"data engineer"` returns zero — the surface is effectively unserved. That is not evidence the
surface is low-risk; pipelines fail silently (a schema drifts, a join fans out, an upstream contract
changes) far more often than they fail loudly, and a silent failure has no test-runner exit code to
report at all. This is the surface where **naming the oracle** (`oracles-and-evidence.md`) does the
most work, because the default oracle — "the pipeline ran without throwing" — verifies almost nothing.

## Job order

| Order | Job | Why it goes here on this surface |
|---|---|---|
| 1 | `verification-strategy-and-risk.md` | Rank by downstream consumer blast radius (a metric feeding a billing decision outranks a dashboard nobody reads) |
| 2 | `oracles-and-evidence.md` | The oracle is rarely the pipeline's own assertions — see below |
| 3 | `functional-verification.md` | Row-level and aggregate correctness against an independent source, not the pipeline's self-check |
| 4 | `suite-and-signal-health.md` | Freshness and volume anomalies function like flake here — a late-but-not-failed run is a distinct evidence-validity state |
| 5 | `compatibility-and-support-matrix.md` | Only if the pipeline serves multiple consumer schema versions concurrently; otherwise skip |
| 6 | `defect-lifecycle.md` | Triage to the owning `data` pipeline, distinguishing a contract violation from a one-off data anomaly |
| 7 | `release-gate-and-claims.md` | Ship/claim split — "the pipeline is trustworthy" is a claim like any other and needs the same residual-risk record |

`accessibility-conformance.md`, `security-and-privacy-verification.md` (beyond PII handling, which
routes to `data`'s own governance work), and `ai-behavior-verification.md` do not apply unless the
pipeline feeds a UI, handles regulated data, or feeds a model directly — check before including them.

## Verifying declared contracts hold in production

`data` authors a data contract (schema, freshness SLA, semantic guarantees) as part of building the
pipeline. This skill's job is to verify **independently** that the contract holds against production
data, not to re-read the contract and trust it. Concretely: validate a live sample against the declared
schema (not the schema the pipeline code believes it emits — pull the schema from the actual output),
check freshness against the SLA using the consumer's clock, and reconcile a sampled aggregate against
an independent source (the system of record, a second computation path, a known invariant) rather than
against the pipeline's own output a second time. A contract that has never been checked against
production is `not_tested`, regardless of how carefully it was authored.

## Verifying tracking implementation against the tracking plan

A tracking plan (event names, properties, expected cardinality) is a specification; the events a
product actually emits are an implementation. The two drift constantly — a renamed property, a
property emitted as a string where the plan specifies a number, an event that stopped firing after a
refactor. Verify by capturing real emitted events (from a staging environment exercising the documented
user flows, or a production sample) and diffing them against the plan's schema, field by field — do
not accept "the analytics dashboard shows numbers" as evidence the plan is implemented, because a
dashboard can render plausible numbers from a wrongly-typed or partially-firing event. Report drift as
a defect against the owning product surface, triaged per `defect-lifecycle.md`.

## The seam with `data`

`data` owns **in-pipeline trust gates as construction** — dbt tests, Great Expectations-style checks,
and similar assertions written by the pipeline's own author as part of building it, checked against
the pipeline's own assumptions. This skill verifies **independently**: a different party, checking
against a different oracle (an external system of record, the tracking plan as written, a reconciled
total from elsewhere), after construction is complete. The two are not redundant — an in-pipeline check
can be satisfied by an assertion that encodes the same misunderstanding as the pipeline logic it
checks; independent verification is specifically the technique that does not share that blind spot.
This is the **shared-source-of-truth failure** — see `oracles-and-evidence.md` §5, which owns it.
Route pipeline-construction requests ("write a dbt test", "add a Great Expectations suite") to `data`
without absorbing them.
