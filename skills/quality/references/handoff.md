# Handoff

Purpose: Decide what this skill consumes from upstream, what it emits downstream, and the
`handoff.yaml` companion's shape — not verification technique, and not the gate itself.

Read when: downstream work is expected (`operate` will deploy, a build skill will remediate), or
upstream artifacts exist and must be consumed without silently overriding them.

Inputs: NFR budgets and threat model from `architecture`; acceptance criteria from `product`;
construction-side testing from `frontend`, `backend`, `data`, `ai` — each optional, and their
absence stated explicitly rather than invented around.

Produces: a `handoff.yaml` companion carrying the evidence ledger with per-item evidence states,
residual risks with owners and expiries, the ship and claim decisions separately, routed defects,
and a `volatile_facts` block.

## Skip when:

- You need the release/claim decision procedure or the residual-risk record's content
  → `release-gate-and-claims.md`; this file only describes how that record travels onward.
- You need defect severity or triage-routing rules → `defect-lifecycle.md`; this file only describes
  the envelope defects travel back to the owning skill in.
- No upstream artifact exists and none is being produced right now → read "Running standalone" below
  before assuming a budget or acceptance criterion that was never supplied.

## Contents

- [What this skill consumes](#what-this-skill-consumes)
- [What this skill emits](#what-this-skill-emits)
- [The `handoff.yaml` companion](#the-handoffyaml-companion)
- [The `volatile_facts` block](#the-volatile_facts-block)
- [Running standalone](#running-standalone)

## What this skill consumes

| From | Consumes | If absent |
|---|---|---|
| `architecture` | NFR budgets (latency, throughput, availability targets) and the threat model | Do not invent a budget; verify against no numeric target and say so explicitly in the report |
| `product` | Acceptance criteria for the feature or release | Verify observable behavior against the risk model alone; state that no acceptance criteria were supplied, not that they were met |
| The owning build skill (`frontend`, `backend`, `ai`, `data`) | Its own construction-side test results, as an evidence input to grade — not to re-derive from scratch | Treat the surface as unverified at the construction layer; this skill's independent verification still applies but has no prior evidence to build on |

Consuming an upstream artifact means using it without silently overriding it — a supplied NFR budget or
acceptance criterion is a constraint this skill verifies against, not a starting point it is free to
revise. A conflict between a supplied artifact and what verification finds is a finding to report, not
a discrepancy to resolve unilaterally.

## What this skill emits

**To `operate`:** what must pass before deploy, and what remains unverified. Two distinct lists, never
merged into one "quality score":

- **Gate result** — the ship/claim decision from `release-gate-and-claims.md`, with any conditions
  attached (e.g., "ships with recorded exception on X, unqualified claim withheld").
- **Residual risk** — everything unrefuted at time of handoff, each item with an owner and an expiry
  (per invariant 6), so `operate` knows what it is inheriting rather than discovering it in production.

**Back to the owning build skill:** defects found during verification, with triage routing already
applied per `defect-lifecycle.md` — severity, minimal repro, and which owning surface/component the
defect routes to. This skill does not fix what it finds; it hands a routed, reproducible defect back to
the skill that owns the fix.

## The `handoff.yaml` companion

Emit a `handoff.yaml` alongside the verification report whenever downstream work is expected. Minimum
shape:

```yaml
release_id: <identifier for the thing being verified>
generated: 2026-07-26          # date-stamp every emission, not just the first
gate_result:
  decision: ship | ship-with-exception | block
  claim: <exact scope of what may be claimed, or "none">
residual_risk:
  - item: <risk description>
    owner: <name or role>
    expiry: <date or trigger condition>
evidence_summary:
  - surface: <which surface file this covers>
    class: observed | inferred | not_tested | blocked
    scope: <exact conditions this evidence covers, per oracles-and-evidence.md>
defects:
  - id: <identifier>
    severity: <ODC-mapped severity, per defect-lifecycle.md>
    routes_to: <owning skill/component>
volatile_facts: []             # see below
```

Keep `evidence_summary` scoped to what was actually produced — an entry with no matching evidence
class recorded is a silent omission, forbidden by invariant 5.

## The `volatile_facts` block

Everything in this domain churns: tool versions, thresholds, licenses, prices, and the standards
themselves (EN 301 549 revisions, WCAG versions, DORA metric definitions). `volatile_facts` exists so a
downstream consumer knows exactly what to re-verify before trusting an old handoff, rather than
inheriting a stale number silently:

```yaml
volatile_facts:
  - fact: "axe-core rule set version"
    value_at_handoff: "<version>"
    reverify: "before reuse if > 90 days old, or on any axe-core upgrade"
  - fact: "performance budget source"
    value_at_handoff: "<budget and its origin, e.g. architecture NFR doc revision N>"
    reverify: "on any architecture NFR revision"
```

Every entry needs a value, a date it was true as of, and a re-verify trigger — an entry with only a
value and no trigger is not distinguishable later from an unstated assumption.

## Running standalone

When this skill runs with no upstream `architecture` budget, no `product` acceptance criteria, and no
prior build-skill test evidence supplied, **say so explicitly in the handoff rather than inventing any
of the three.** A fabricated NFR budget or acceptance criterion is worse than none: it launders an
assumption into the vocabulary of a supplied constraint, which is exactly the silent-omission failure
this skill exists to prevent everywhere else. State plainly: "no upstream NFR budget was supplied;
verification proceeded against the risk model in `verification-strategy-and-risk.md` alone" — and let
the residual-risk record carry the consequence of that gap forward.
