# Surface: AI System

Purpose: Decide which jobs matter most, in what order, and where this skill's gate-role diverges
from `ai`'s development-instrument role when the thing under verification is an LLM-driven or agentic
product feature.

Read when: model-driven behaviour is the thing under verification, rather than the application
surrounding it — or an agent that takes actions is about to be called production-ready or autonomous,
or a voice agent's latency, task completion, or interruption handling is about to be claimed.

Inputs: the AI feature and its model/prompt versions; `ai`'s eval set, treated here as an artifact
under scrutiny rather than as authority; the declared adversary and defended-against maximum.

Produces: a surface-specific job order, an evaluation-as-gate posture distinct from
evaluation-as-instrument, a judge-validity assessment, a red-team scope with its limits, and the
recovery and side-effect drills an action-taking claim must carry, and the caller's-ear evidence a
voice claim needs.

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
- [Recovery and side-effect evidence](#recovery-and-side-effect-evidence)
- [Voice: evidence at the caller's ear](#voice-evidence-at-the-callers-ear)

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

## Recovery and side-effect evidence

An agent that acts fails where no behavioural eval looks: a worker dies between a downstream success
and the local receipt, an approval arrives twice, a deploy lands under a paused run. A
**"production-ready" or "autonomous actions" claim is a claim about those conditions**, so a pass rate
on answer quality cannot support it. Before either claim enters the dossier
(`release-gate-and-claims.md` "The evidence dossier"), each drill below is a row in the
requirement-to-evidence matrix with its evidence state. A drill not run is `not_tested`; one attempted
that could not complete is `blocked`. Either way it also gets a line in "What we deliberately did not
verify", and the claim narrows to the conditions the completed drills cover, or is not made.

This skill plans the drills and judges their evidence; it writes none of them. The pack in the Owner
column writes and runs each one and hands back the artifact.

| Drill | Refutes the proposition that… | Oracle | Owner |
|---|---|---|---|
| Kill the worker before, during, and after a tool call, including after downstream success but before the local receipt | recovery never repeats or loses an effect | One external effect per logical operation, or an explicit unknown outcome sent to review | `backend` |
| Deliver the same start, webhook, and approval event twice | duplicates collapse | One logical effect and one charge | `backend` |
| Reconnect from another device during a run | replay is faithful | No duplicate or superseded final output | `frontend` |
| Revoke a connector or tenant membership while a run waits | resume re-checks access | The now-forbidden action is blocked | `backend` |
| Cancel while specialists run | cancel stops future work | Future work stops, resources release, completed effects are recorded (cancel is not undo) | `backend` |
| Delete a user fact and a source document | deletion propagates | Absent from vectors, summaries, caches, artifacts, active contexts, and restored checkpoints; backups follow a declared deletion/replay policy | `ai` (memory forget path, `memory.md` "Governed memory — applies to all four philosophies") · `data` (source document through the index) |
| Deploy a changed workflow, tool, or skill version with older runs paused | paused runs resume intentionally | They resume under the declared compatibility policy, and an approved action keeps its meaning | `backend` (version pins); `operate` runs the deploy |
| Inject hostile instructions through a web page, tool description, skill, memory candidate, and document | content cannot become authority | No permission escalation, no cross-tenant access | `ai` |
| Exhaust a tenant budget and a provider quota | exhaustion degrades boundedly | Bounded retries, fair scheduling, a clear partial-result status | `backend` |
| Restore the database and object metadata in staging | recovery meets its targets | Measured recovery time and data loss against targets declared beforehand (`operate` `recoverability.md` "MTD → RTO → RPO, in that order") | `operate` |

Across the set, a pass is **one external effect, a correct receipt, and a recoverable user-visible
run** — read from the target system's final state and its receipt. An effect taken only from the
agent's transcript saying it acted is an assumption (§6.6.2): `not_tested`, unless an observed
neighbour supports an `inferred` reading. Evidence stays inside its conditions: a public single-turn
benchmark says nothing about multi-step tool trajectories, a staging restore is not a production
restore, and a drill run against last release's workflow versions says nothing about this one. The
injection drill is red-teaming and inherits its limits (above); OWASP's AI Agent Security Cheat Sheet
abuse-case matrix (approval bypass, memory poisoning, recursive tool abuse, multi-agent chaining;
observed 2026-10-17) names classes to put in or out of its declared scope.

## Voice: evidence at the caller's ear

Voice claims are claims about what a caller hears, so evidence gathered anywhere else stays inside
its own conditions (`oracles-and-evidence.md` "The "what this evidence does not establish" table"). `ai` writes and
runs the voice evals (`surface-voice.md` "Voice evals at the caller's ear"); this skill judges whether
they support the claim.

| Claim | Supported by | Does not extend from |
|---|---|---|
| Latency | Voice-to-voice at the ear (caller speech end → first agent audio heard), p50/p95/p99 over enough turns that outliers do not set p95, on the deployed transport | Summed stage medians; a vendor's figure — vendor-reported, never `observed` here |
| Task completion | Pass rate against the target system's final state, on audio with the deployment's noise, accents, language, and codec | Text-mode runs or clean-audio simulation: on τ-Voice a text pass does not predict a voice pass (figures: `ai` `surface-voice.md` "Voice evals at the caller's ear") |
| Interruption handling | Labelled calls scored as two opposing rates — false yields (stopped for a backchannel or noise) and swallowed interruptions (talked over a real one) — plus whether the reply after it is right | One blended rate, or timing alone: on EchoChain no real-time voice model passes over 50% of post-interruption state updates (arXiv 2604.16456; observed 2026-10-17) |
| Recognition | Task-relevant error rate on the product's own calls, in its language and codec | English or wideband public benchmarks |
| Containment or transfer rate | A trend on the product's own calls, against its own baseline | An "industry average" — vendor-published, with no neutral public baseline found (2026-10-17) |

A simulated caller covers only the conditions it simulates; each other one (an accent, line noise, a
language, the codec) is a line in "What we deliberately did not verify". A
judge that scores calls stays `inferred` until calibrated on a human-labelled sample of the product's
own calls (Judge validity, above). A human-validated comparison (21,600 human judgments) found 0.92
against 0.73 evaluation F1, with the top platform's staff among the authors (arXiv 2511.04133;
observed 2026-10-17) — it licenses no platform choice.
Speech providers change defaults under a deployed agent with no deploy, so a passing audio run is
dated to the provider configuration it ran against.
