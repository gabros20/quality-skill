# Surface: Service and API

Purpose: Decide which jobs matter most, in what order, and what a contract test does and does not
establish when the thing under verification is a service or API with no rendered UI of its own.

Read when: the thing under verification is a service boundary rather than a rendered experience —
an HTTP or RPC API, a message consumer, or a service in an assembled system.

Inputs: the service and its published contracts; consumer expectations; NFR budgets and threat
model from `architecture` if they exist.

Produces: a surface-specific job order, an explicit list of what a passing contract does not
establish, an authorization-matrix verification approach, and the load model chosen with its
justification.

## Skip when:

- The thing under verification has a rendered UI as its primary surface → `surface-web-app-and-site.md`
  or `surface-mobile.md`; treat any API behind it under this file only for the API's own contract.
- The service is a batch or streaming data pipeline rather than a request/response or event API
  → `surface-data-pipeline.md`.
- The service wraps an LLM and the dominant risk is model behavior, not contract shape
  → `surface-ai-system.md`.
- You need the mechanics of writing the contract test or the load tool itself, rather than what this
  surface prioritizes → `functional-verification.md` or `performance-and-load-verification.md`.

## Contents

- [Job order](#job-order)
- [Contract verification as the cheap alternative](#contract-verification-as-the-cheap-alternative)
- [What a contract test does not establish](#what-a-contract-test-does-not-establish)
- [Authorization-matrix verification](#authorization-matrix-verification)
- [Load models for this surface](#load-models-for-this-surface)

## Job order

| Order | Job | Why it goes here on this surface |
|---|---|---|
| 1 | `verification-strategy-and-risk.md` | Rank endpoints by blast radius (write vs. read, auth boundary crossed, money moved) before choosing coverage breadth |
| 2 | `oracles-and-evidence.md` | Name the oracle — the schema, the spec, the upstream contract — before trusting a green suite |
| 3 | `functional-verification.md` | Contract and integration behavior across service boundaries |
| 4 | `security-and-privacy-verification.md` | Authorization matrix is the dominant risk class on this surface |
| 5 | `performance-and-load-verification.md` | Throughput, concurrency, and saturation models replace page-load models here |
| 6 | `compatibility-and-support-matrix.md` | API version support and deprecation windows, when multiple consumer versions are live |
| 7 | `suite-and-signal-health.md` | Contract-test flake usually traces to shared fixtures or test-environment state, not timing |
| 8 | `defect-lifecycle.md` | Triage to the owning `backend` (or equivalent) skill |
| 9 | `release-gate-and-claims.md` | Ship/claim split, always last |

`accessibility-conformance.md` does not apply unless the API serves a UI directly (e.g., server-driven
UI payloads); skip otherwise.

## Contract verification as the cheap alternative

A consumer-driven or schema-based contract test (Pact-style, OpenAPI/JSON-Schema validation against
real requests and responses) is the cheapest technique that still produces `observed` evidence about
an interface, because it checks the actual wire shape rather than a re-implementation of the provider's
logic. Prefer it over broad end-to-end coverage across every consumer whenever the risk being verified
is *interface compatibility* rather than *business-logic correctness* — end-to-end coverage should be
reserved for the risk items ranked high enough to warrant it (`verification-strategy-and-risk.md`),
not used as the default because it "covers more."

## What a contract test does not establish

State this explicitly in the verification report; a contract pass is `observed` evidence about shape
only, not about the propositions below:

| Not established by a contract pass | What would establish it |
|---|---|
| Semantic correctness of the response body (a field can match its schema and still hold the wrong value) | `functional-verification.md` — behavioral assertions against known inputs |
| Behavior under concurrent load or partial failure (timeouts, retries, backpressure) | `performance-and-load-verification.md` |
| Authorization is actually enforced for every role/resource combination | The authorization matrix, below |
| Backward compatibility across every live consumer version, not just the one tested | `compatibility-and-support-matrix.md` |
| Real production data shapes, which drift from the schema's happy-path fixtures over time | Ongoing contract verification against production samples, not a one-time pass |

A contract pass is not weaker evidence in general — it is precise evidence about a narrower
proposition than "the API works." Report it as such; do not let it stand in for the rows above.

## Authorization-matrix verification

Every endpoint × every role (including "unauthenticated" and "authenticated-but-wrong-tenant") is a
cell that must be independently exercised — authorization defects concentrate at the edges of the
matrix (adjacent roles, resource-ownership boundaries, tenant isolation) far more than at its center.
Treat an untested cell as `not_tested`, never as `inferred` from a neighboring cell that passed — the
anti-inference invariant in `oracles-and-evidence.md` applies at full force here because authorization
bugs are the highest-blast-radius class this surface produces. See
`security-and-privacy-verification.md` for how to grade the evidence a scanner or manual test produces
for each cell.

## Load models for this surface

An API's load model is throughput and concurrency, not "page load time" — pick the model to the
traffic shape, and name which one you used:

| Model | What it exercises |
|---|---|
| Closed (fixed concurrency) | Saturation behavior under a bounded number of clients |
| Open (fixed arrival rate) | Queueing behavior when demand is independent of response time |
| Soak (sustained duration) | Resource leaks, connection-pool exhaustion, slow degradation |
| Spike (step change) | Autoscaling and cold-start behavior |

**Coordinated omission** — a load generator that only samples response times from requests it has
already sent, silently excluding the requests it could not send because prior ones were still
blocked — understates tail latency systematically. Name the tool's sampling method before trusting a
p99 number; full treatment is in `performance-and-load-verification.md`.
