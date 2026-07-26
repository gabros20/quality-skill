# Usage reference

## Activation

`quality` should trigger on requests to **independently verify an assembled product and decide
whether it may ship** — planning how much verification a change warrants, judging whether a result
means what it appears to mean, verifying an end-to-end journey, judging an accessibility conformance
claim, checking whether a performance or load number supports the claim made about it, verifying
security/privacy controls independently of the code that implements them, defining a
browser/device/platform support matrix, verifying an AI system's behavior rather than trusting its
builder's own eval, judging whether a test suite can be believed, classifying a defect, or issuing a
go/no-go release decision. Realistic triggers: "run a release go/no-go," "can we claim this is
accessible, or did we only scan it," "is this test suite trustworthy," "our suite is flaky and nobody
trusts it," "independently verify this agent-built feature," "what's our residual risk before we
ship," "audit this for a regulated conformance claim."

It should **not** trigger on: "write the unit/component/service/pipeline/eval tests" (`frontend` ·
`backend` · `data` · `ai`), "TDD, red-green-refactor" (the building skill), "lint, complexity, or diff
review" (the skill that owns the code), "set NFR budgets, threat model, system decomposition"
(`architecture`), "author acceptance criteria, decide what 'good' means for users" (`product`), "build
CI/CD, deploy, monitor, run incidents, set SLOs" (`operate`), "design or read out an experiment"
(`growth`), "fix what verification found" (the owning skill, unless remediation is explicitly in
scope), or "design intent, usability critique against that intent" (`design`) — unless the request
also requires independent verification.

Use `/quality` as documentation shorthand only. Codex explicit invocation is `$quality`; other clients
use an `@` mention, a skill tool, or natural-language activation.

## Mission and boundary

`quality` provides **independent evidence** that an assembled product meets its functional and
non-functional expectations, and converts that evidence into **two separate decisions: may we ship,
and what may we claim.** It writes no tests — `frontend`, `backend`, `data`, and `ai` already own
construction-side testing and remain responsible for the quality of their own work. `quality` owns the
layer above the techniques: deciding what verification is warranted and at what altitude, deciding
what will deliberately go unverified, producing evidence with its class named rather than a green
tick, and turning that into a release decision with residual risk written down, owned, and given an
expiry. It reports; it does not remediate — findings route back to the skill that owns the code unless
remediation is explicitly in scope. It consumes upstream artifacts (NFR budgets, threat model, build
artifacts, `handoff.yaml`) when they exist, works standalone when they don't, recommends siblings for
work it does not own, and never silently invokes them.

## Workflow

1. Establish the **primary job** and the **base surface**; add `surface-regulated` additively only
   when conformance claims, audit evidence, or verifier-independence requirements are in play.
2. Rank risks and allocate verification by rank — recording which rank each effort serves, and what is
   deliberately left unverified. Say which stopping heuristic you stopped on.
3. For each verification performed, name its oracle and record what its result does **not** establish.
4. Assign an evidence class — `observed` / `inferred` / `not_tested` / `blocked` — to every finding and
   every gap; never report a weaker class in the vocabulary of a stronger one.
5. Classify defects (ODC spine), state harm in the user's domain terms, and route them to the owning
   skill.
6. Assemble the evidence dossier **together with its adversarial read** — never one without the other.
7. Issue the two decisions separately — may we ship, and what may we claim — with residual risk owned
   and given an expiry.
8. Emit a compact `handoff.yaml` (with `volatile_facts`) when downstream work is expected.

## Route by job

| User intent | Reference | Expected contribution |
|---|---|---|
| How much verification does this warrant, and what do we skip? | `references/verification-strategy-and-risk.md` | Risk-ranked altitude allocation, stopping heuristics, "what we deliberately do not verify" as a required output |
| How do I know this result means what it appears to mean? | `references/oracles-and-evidence.md` | Naming the oracle; the four evidence states; the "what this evidence does not establish" table |
| Does the assembled system actually work end to end? | `references/functional-verification.md` | Journeys, cross-service verification, contract testing's limits, evidence capture on failure |
| Can we claim this is accessible? | `references/accessibility-conformance.md` | Conformance vs scan, the machine-testable boundary, claim scope, VPAT/ACR |
| Is it fast enough, and does the measurement support that? | `references/performance-and-load-verification.md` | Field vs lab, percentiles and populations, coordinated omission |
| Is it secure and privacy-correct, independently of the controls we built? | `references/security-and-privacy-verification.md` | Assurance grades, what a clean scan cannot decide, severity precedence conflicts |
| Which browsers, devices and platforms are in scope? | `references/compatibility-and-support-matrix.md` | Building the matrix, where its numbers may legitimately come from, licence terms |
| Has the model's behaviour been verified, not just evaluated by its builder? | `references/ai-behavior-verification.md` | Evals as a gate, judge validity, non-determinism, verifying agent-built work |
| Can this test suite be believed at all? | `references/suite-and-signal-health.md` | Coverage semantics, mutation, flake as an evidence-validity problem |
| What is this finding, how bad is it, and where does it go? | `references/defect-lifecycle.md` | ODC classification spine, reproducibility, harm stated in user terms |
| May we ship, and what may we claim? | `references/release-gate-and-claims.md` | The evidence dossier with its adversarial read, the release/claim split |

Surface overlays (`surface-web-app-and-site`, `surface-service-api`, `surface-mobile`,
`surface-data-pipeline`, `surface-ai-system`, `surface-regulated`) reshape the primary job for that
system's shape. Always stack `surface-regulated` additively on top of the base surface — it changes
the compliance posture, not the base.

## Outputs and completion

| Output | Complete when |
|---|---|
| Verification plan | Risks are ranked, budget is allocated by rank, and what is deliberately not verified is stated rather than silent |
| Verification result | The oracle is named and the "what this does not establish" gap is recorded alongside the finding |
| Functional/accessibility/performance/security/compatibility/AI-behavior evidence | Every item carries an evidence class (`observed` / `inferred` / `not_tested` / `blocked`) |
| Defect record | ODC classification set, reproducibility stated, harm stated in user terms, routed to the owning skill |
| Suite-health judgment | Coverage, flake, and mutation status stated with their limits, not treated as a single trust score |
| Evidence dossier ⭐ | Present together with its adversarial read; residual risk carries an owner and an expiry |
| Release decision | Ship and claim decisions issued separately, each with its own residual risk |

When downstream work is expected, provide the `handoff.yaml` companion with artifact paths, findings,
owners, constraints, `volatile_facts` (fact / as-of / re-verify-at), and the recommended next skill —
typically the owning build skill to remediate, or `operate` to deploy — without duplicating the full
dossier.
