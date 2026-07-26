# Recipes

Use the invocation form supported by your client. The examples below use Codex's explicit
`$quality` form.

## Release go/no-go on a web app

Use when: a web app is code-complete and the team needs a ship decision, not another test run — and
wants the residual risk written down rather than implied by a green CI badge.

```text
Use $quality to run a release go/no-go on our checkout redesign before we ship — what's the residual
risk, and who owns it?
```

Route: primary job `verification-strategy-and-risk` (rank the risks, allocate the verification budget,
state what is deliberately left unverified) → `functional-verification` (the end-to-end journeys that
matter) → `release-gate-and-claims` (the evidence dossier assembled together with its adversarial
read, never one without the other) + surface `surface-web-app-and-site`. Output is two separate
decisions — may we ship, and what may we claim — plus residual risk with an owner and an expiry, not a
single pass/fail verdict.

## Judge an accessibility conformance claim

Use when: someone wants to say "this is accessible" in a spec, a sales deck, or a VPAT — and the only
evidence in hand is an automated scanner report.

```text
Use $quality to tell us whether we can claim WCAG 2.2 AA conformance on this dashboard, or only that
we ran a scan on it.
```

Route: primary job `accessibility-conformance` (conformance vs. scan, the machine-testable boundary,
claim scope, VPAT/ACR) + `oracles-and-evidence` (the flagship — axe-core's `incomplete` class is
returnable by 55% of its 105 rules, so a clean scan is not evidence the remaining rules pass) +
surface `surface-web-app-and-site`. The evidence-state vocabulary (`observed` / `inferred` /
`not_tested` / `blocked`) forces the automated-only portion to be named as partial, never rounded up
to "accessible."

## "Our suite is flaky and nobody trusts it"

Use when: CI is red or green depending on the retry, engineers have started ignoring failures, and
the team can't tell whether the product regressed or the suite is just unreliable.

```text
Use $quality to figure out why nobody trusts our test suite anymore and give us a plan to fix the
signal, not just the flakes.
```

Route: primary job `suite-and-signal-health` — flake treated as an evidence-validity problem rather
than hygiene (never retry-to-green, never delete a flake without triage), coverage semantics separated
from test quality, and a suite runtime budget. Produces a quarantine policy with a forcing function
(`assets/flake-policy.md`) rather than a silent skip list, plus a stated verdict on whether the
suite's coverage number means what people think it means.

## Independently verify agent-built work

Use when: an AI coding agent (or another team's agent) shipped a feature or a test suite, and someone
needs to verify it before merge rather than trust the agent's own report that it's done.

```text
Use $quality to independently verify this agent-built PR before we merge — including its own tests.
```

Route: primary job `ai-behavior-verification` (verifying agent-built work specifically, not just model
evals) + `oracles-and-evidence` (I13 — the verifier must not share a source of truth with the thing it
verifies; a test the agent wrote and a test the agent's own harness runs are not independent evidence)
+ `functional-verification` for the end-to-end check. This is where the flagship invariant bites
hardest: a passing check certifies only the propositions someone encoded, and an agent grading its own
work is not independent evidence by construction.

## Stack the regulated overlay on a base surface

Use when: a product that already has ordinary web-app verification in place now needs audit-ready,
traceable evidence for a regulated conformance claim — without throwing away the base verification
work already done.

```text
Use $quality to get us to audit-ready evidence for a regulated accessibility conformance claim on top
of our existing web app verification — we can't just re-run the same scan and call it done.
```

Route: surface `surface-regulated` **stacked additively on** `surface-web-app-and-site` — the base
surface still supplies the day-to-day verification approach; the regulated overlay adds traceability,
evidence retention, and verifier-independence requirements on top of it, never replacing it. Primary
job `accessibility-conformance` for the claim scope + `release-gate-and-claims` for the dossier. Per
ISO/IEC 15026-2 §7.2(b): omission is still permitted under the overlay, but every omission must now be
stated and justified, never silent — the overlay raises the evidentiary bar, it does not relax the
base surface's own rules.
