# Surface: AI System

Purpose: Decide which jobs matter most, in what order, and where this skill's gate-role diverges
from `ai`'s development-instrument role when the thing under verification is an LLM-driven or agentic
product feature.

Read when: model-driven behaviour is the thing under verification, rather than the application
surrounding it.

Inputs: the AI feature and its model/prompt versions; `ai`'s eval set, treated here as an artifact
under scrutiny rather than as authority; the declared adversary and defended-against maximum.

Produces: a surface-specific job order, an evaluation-as-gate posture distinct from
evaluation-as-instrument, a judge-validity assessment, and a red-team scope with its limits.

## Skip when:

- You are building or iterating on evals to improve a prompt, model choice, or agent design
  → `ai` (`evaluation.md`), not this skill.
- The AI feature is incidental and the dominant risk is the surrounding app (routing, auth, rendering)
  → verify that surface (`surface-web-app-and-site.md`, `surface-service-api.md`) and apply this file
  only to the AI-driven behavior itself.
- You need the mechanics of a specific eval or red-team technique rather than what this surface
  prioritizes → `ai-behavior-verification.md`.

## Contents

- [Job order](#job-order)
- [The seam with `ai`: instrument vs. gate](#the-seam-with-ai-instrument-vs-gate)
- [Non-determinism](#non-determinism)
- [Judge validity](#judge-validity)
- [Red-teaming](#red-teaming)

## Job order

| Order | Job | Why it goes here on this surface |
|---|---|---|
| 1 | `verification-strategy-and-risk.md` | Rank by harm class (factual error, unsafe content, data leak, unauthorized action) before choosing eval breadth |
| 2 | `oracles-and-evidence.md` | This surface has the weakest native oracles of any surface — naming one is the whole job |
| 3 | `ai-behavior-verification.md` | Evals-as-gate, non-determinism, judge validity, red-team, eval-set leakage — all owned here |
| 4 | `functional-verification.md` | The surrounding application logic the model output feeds into (tool calls executed, downstream state changed) |
| 5 | `security-and-privacy-verification.md` | Prompt injection, data exfiltration via tool use, PII leakage through generated output |
| 6 | `suite-and-signal-health.md` | Eval-suite flake and eval-set staleness are distinct failure modes from code-suite flake |
| 7 | `defect-lifecycle.md` | Triage to the owning `ai` build skill, distinguishing a model-behavior regression from an application bug |
| 8 | `release-gate-and-claims.md` | Ship/claim split — a claim about model behavior needs the same residual-risk record as any other claim |

`accessibility-conformance.md` and `compatibility-and-support-matrix.md` apply only insofar as the
surrounding UI carries those risks; they say nothing about model behavior itself.

## The seam with `ai`: instrument vs. gate

`ai` builds evaluation as a **development instrument** — a fast, iterable signal used to compare
prompts, models, and agent configurations while building, optimized for iteration speed and directional
signal. This skill treats evaluation as a **gate** — the same technique, a different institutional role:
a gate needs a fixed, disclosed eval set (not one still being iterated on), an independence-of-evaluator
posture (the person deciding to ship should not be the only person who wrote the eval), and a pass/fail
threshold that was set before the run, not chosen after seeing the result. The same eval suite can serve
both roles at different times; conflating them — treating an eval built for iteration as if it were
gate-grade evidence — is the characteristic failure on this surface. State which role a given eval run
served before citing its result in a release decision.

## Non-determinism

Model output varies run-to-run even at fixed inputs (sampling temperature above zero, and silent
provider-side model updates even at temperature zero), so a single passing run is weaker evidence here
than a single passing run on deterministic code. Report evaluation results as a distribution (pass rate
across N runs, with N and the sampling configuration stated) rather than a single verdict, and
date-stamp the model version tested — a passing result against last month's model version is not
evidence about today's, per the evidence-conditions invariant in `oracles-and-evidence.md`. Full
technique in `ai-behavior-verification.md`.

## Judge validity

An LLM-as-judge is itself an oracle that can be wrong, and using one to grade another model's output
does not escape the oracle problem — it relocates it. Before trusting a judge's verdict, establish the
judge's own correlation with human judgment on a held-out sample, and treat an unvalidated judge's
output as `inferred` at best, never `observed`. A judge trained or prompted on the same assumptions as
the system it grades can share its blind spot — this is the **shared-source-of-truth failure**
(`oracles-and-evidence.md` §5: *an author's verification shares the author's blind spot*), which is a
different failure from the compositional fallacy. Full technique in `ai-behavior-verification.md`.

## Red-teaming

Adversarial probing (prompt injection, jailbreak attempts, data-exfiltration attempts via tool use) is
the closest analogue this surface has to a penetration test, and it shares the same limits: a red-team
pass proves the probed attacks failed against the probed configuration; it does not prove the absence
of an attack nobody tried. State the adversary's declared maximum capability and the attack set actually
attempted before reporting a clean red-team result — an unstated scope is the silent-omission failure
the skill's invariants forbid elsewhere. Full technique, including eval-set leakage risk (an attack the
model was trained or fine-tuned against is not evidence about a novel one), in `ai-behavior-verification.md`.
