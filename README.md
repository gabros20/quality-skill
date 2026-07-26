# quality — Quality Engineering

**Visual guide:** [quality-skill.vercel.app](https://quality-skill.vercel.app)

Provide **independent evidence** that an assembled product meets its functional and non-functional
expectations, and convert that evidence into **two separate decisions: may we ship, and what may we
claim.** `quality` is the **Verify** stage of the [Digital Product Skills](https://github.com/gabros20)
family, sitting after `frontend`/`backend`/`data`/`ai` (Build) and before `operate` (deploy, monitor,
run incidents): an agent skill for judging what has already been built, not for building it.

**This skill writes no tests.** Construction-side testing already has four owners —
`frontend`, `backend`, `data`, `ai` — and each keeps responsibility for the quality of its own work.
`quality` owns the layer above the techniques: deciding what verification is warranted and at what
altitude, deciding **what will deliberately go unverified**, producing evidence with its class named
rather than a green tick, and turning that into a release decision with the residual risk written
down, owned, and given an expiry. It reports; it does not remediate. The one-line positioning: it
answers *"how do I know, and how would I know I was wrong?"* — and refuses to answer *"how do I test
this?"*

**On the competitive landscape, plainly stated:** a good, neutral QA router already exists —
`petrkindlmann/qa-skills` (MIT) — and it is not badly designed. It owns unit and E2E test authoring
because it is a standalone pack with nowhere to hand construction-side testing to. For a solo
developer with no sibling skills installed, that blended library may well be the better product. Our
difference is structural, not a claim of superior design: we sit in a family that already builds, so
we can refuse to write tests without leaving a hole. A competitor cannot copy that boundary without
first becoming a family.

## What it does

A **faceted router**: pick one primary job × at most one base surface (the regulated overlay stacks
additively on top).

**Primary jobs** — verification strategy & risk · **oracles & evidence ⭐** · functional verification ·
accessibility conformance · performance & load verification · security & privacy verification ·
compatibility & support matrix · AI behavior verification · suite & signal health · defect lifecycle ·
release gate & claims.

**Surface overlays** — web app & site (default) · service API · mobile · data pipeline · AI/agentic
system · **regulated** (additive). The base surface reshapes how every job applies for that system
shape; `surface-regulated` stacks on top of whichever base surface applies rather than replacing it —
add it only when conformance claims, audit evidence, or verifier-independence requirements are in
play.

**The differentiator: a four-way convergence.** Theory (Kaner's test oracle *helps you decide*, it
does not *tell you*), standards (W3C ACT's `automatic`/`manual`/`semiAuto` EARL test-mode split),
tooling (axe-core ships an `incomplete` class, returnable by 55% of its 105 documented rules), and a
formal assurance standard (ISO/IEC 15026-2:2011) all require the same thing: **a verification result
cannot be binary, because the thing producing it cannot decide every case.** All four map onto one
vocabulary — `observed` / `inferred` / `not_tested` / `blocked` — and ISO/IEC 15026-2 §7.2(b) makes
**"what we deliberately did not verify" a required section, not a courtesy: omission is permitted,
silent omission is not.** The flagship, [oracles-and-evidence](skills/quality/references/oracles-and-evidence.md),
carries this through-line: **name the oracle, grade the evidence, publish the gap — and subtract the
folk number.**

The evidence dossier and its adversarial read are shipped as one feature, never two — the same
literature that specifies assurance cases has spent twenty years documenting that they are routinely
fallacious in practice. And several folk numbers are named and subtracted with receipts rather than
repeated: the 80% coverage threshold has no published rationale (three tools converge on it as a
Schelling point, not a derivation); neither Cohn's pyramid nor Dodds's trophy states a numeric ratio;
automated accessibility detection is a contested range split vendor-vs-independent, never a single
number.

## Install

```bash
npx skills add gabros20/quality-skill -g -y
```

Or use it in Codex with `$quality`.

## Examples

```text
$quality run a release go/no-go on this web app before we ship

$quality can we claim this dashboard is WCAG 2.2 AA conformant, or only that we scanned it

$quality our test suite is flaky and nobody trusts a red build anymore

$quality independently verify this agent-built feature before it merges

$quality we need audit-ready evidence for a regulated conformance claim on top of our web app
```

## Route by job

| User intent | Reads | Contribution |
|---|---|---|
| How much verification does this warrant, and what do we skip? | [verification-strategy-and-risk](skills/quality/references/verification-strategy-and-risk.md) | Risk-ranked altitude allocation, the shape debate handled as contested, stopping heuristics, "what we deliberately do not verify" as a required output |
| How do I know this result means what it appears to mean? ⭐ | [oracles-and-evidence](skills/quality/references/oracles-and-evidence.md) | **Flagship.** Naming the oracle; the four evidence states; the "what this evidence does not establish" table, generatable for any tool |
| Does the assembled system actually work end to end? | [functional-verification](skills/quality/references/functional-verification.md) | Journeys, cross-service verification, contract testing's limits, evidence capture on failure, untrusted runner output |
| Can we claim this is accessible? | [accessibility-conformance](skills/quality/references/accessibility-conformance.md) | Conformance vs scan, the machine-testable boundary, claim scope, VPAT/ACR |
| Is it fast enough, and does the measurement support that? | [performance-and-load-verification](skills/quality/references/performance-and-load-verification.md) | Field vs lab, percentiles and populations, coordinated omission, scores as compressed judgments |
| Is it secure and privacy-correct, independently of the controls we built? | [security-and-privacy-verification](skills/quality/references/security-and-privacy-verification.md) | Assurance grades, what a clean scan cannot decide, severity precedence conflicts, residual risk in machine-readable form |
| Which browsers, devices and platforms are in scope? | [compatibility-and-support-matrix](skills/quality/references/compatibility-and-support-matrix.md) | Building the matrix, where its numbers may legitimately come from, and the licence terms on that data |
| Has the model's behaviour been verified, not just evaluated by its builder? | [ai-behavior-verification](skills/quality/references/ai-behavior-verification.md) | Evals as a gate, judge validity, non-determinism, red-teaming, verifying agent-built work |
| Can this test suite be believed at all? | [suite-and-signal-health](skills/quality/references/suite-and-signal-health.md) | Coverage semantics, mutation, flake as an evidence-validity problem, suite runtime budget |
| What is this finding, how bad is it, and where does it go? | [defect-lifecycle](skills/quality/references/defect-lifecycle.md) | ODC classification spine, reproducibility, harm stated in user terms, triage routing |
| May we ship, and what may we claim? | [release-gate-and-claims](skills/quality/references/release-gate-and-claims.md) | The evidence dossier with its adversarial read, the release/claim split, residual risk with owner and expiry |

**Surface overlay (add at most one base; the regulated overlay stacks additively):**

| System type | Reads | Reshapes |
|---|---|---|
| Web app, SaaS, marketing site, landing page (default) | [surface-web-app-and-site](skills/quality/references/surface-web-app-and-site.md) | The default surface for rendered-experience verification |
| API or service | [surface-service-api](skills/quality/references/surface-service-api.md) | Verifying a service boundary rather than a rendered experience |
| iOS or Android | [surface-mobile](skills/quality/references/surface-mobile.md) | Device matrices, store review as an external gate, platform accessibility APIs |
| Data pipeline | [surface-data-pipeline](skills/quality/references/surface-data-pipeline.md) | Verifying declared contracts hold, or that tracking matches the plan |
| LLM or agentic system | [surface-ai-system](skills/quality/references/surface-ai-system.md) | Model-driven behaviour is the thing under verification |
| **Regulated ⭐ (additive)** | [surface-regulated](skills/quality/references/surface-regulated.md) | **Stacks on a base surface.** Conformance claims, traceability, evidence retention, verifier independence |

Plus [handoff](skills/quality/references/handoff.md) — the `handoff.yaml` companion (with
`volatile_facts`) for downstream work, typically back to the owning build skill to remediate or to
`operate` to deploy.

## Outputs

The evidence dossier with its adversarial read, a risk-ranked verification plan naming what is
deliberately left unverified, findings with an ODC classification and a stated evidence class, a
release decision and a separate claim decision each with residual risk owned and given an expiry, plus
fillable worksheets and a `handoff.yaml` companion (carrying `volatile_facts`) that routes findings
back to the owning skill or forward to `operate` — grounded in what each artifact names and
date-stamped for re-verification, never a frozen template dump.

## Reference and asset library

18 references under `skills/quality/references/` (11 primary jobs, 5 base surfaces, 1 regulated
additive overlay, 1 handoff contract) and 8 fillable assets under `skills/quality/assets/`:

- **Assets:** `evidence-dossier.md` · `evidence-worksheet.md` · `risk-matrix.md` · `severity-map.md` ·
  `flake-policy.md` · `compatibility-matrix.md` · `release-gate-checklist.md` · `handoff.yaml`

## Digital Product lifecycle

`quality` is the **Verify** stage: it consumes `frontend`/`backend`/`data`/`ai`'s built artifacts and
`handoff.yaml` from Build, and `architecture`'s NFR budgets and threat model where they exist, then
routes findings back to the owning skill (remediation is out of scope unless explicitly requested) or
forward to `operate` when the release is cleared to deploy. It does not write tests, set NFR budgets,
author acceptance criteria, or design experiments. It works standalone with no upstream artifact
required, and never silently invokes a sibling skill.

## Repository layout

```text
skills/quality/  runtime skill (SKILL.md + 18 references + 8 assets + agents/openai.yaml)
evals/           activation · traversal · output · compression-ablation fixtures
research/        5-channel research corpora + build-gate synthesis
docs/            installation and usage
.codex-plugin/   plugin manifest
```

## Documentation & releases

- [docs/installation.md](docs/installation.md) · [docs/usage.md](docs/usage.md) ·
  [docs/recipes.md](docs/recipes.md)
- [CHANGELOG.md](CHANGELOG.md) — release history (current: v0.1.0)
- [SOURCES.md](skills/quality/SOURCES.md) — source attribution and license posture
- [CONTRIBUTING.md](CONTRIBUTING.md) — local validation (`scripts/lint-skill`, `scripts/check-sync`)

## License

MIT — see [LICENSE](LICENSE).
