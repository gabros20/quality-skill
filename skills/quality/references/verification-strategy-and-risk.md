# Verification Strategy and Risk

Purpose: Decide how much verification a thing warrants, at what altitude, and what is deliberately
left unverified — before any single technique is chosen.

Read when: a verification effort is being planned or scoped; someone asks "what should we test
before this release?"; effort must be allocated across competing risks; or a stopping decision is
needed and nobody can say what would justify it.

Inputs: the product and its surfaces; risk appetite; NFR budgets and threat model from
`architecture` if they exist; acceptance criteria from `product` if they exist.

Produces: a ranked risk model, an allocation of verification effort with the rank each effort
serves, an explicit "deliberately not verified" list, entry/exit criteria, and the stopping
heuristic to be recorded at the gate.

## Skip when:

- You already have a ranked risk model and need to name an oracle or grade evidence for one item on
  it → `oracles-and-evidence.md`.
- You need the release/claim decision itself, the dossier, or the residual-risk record →
  `release-gate-and-claims.md`.
- You need NFR-specific budgets (perf, a11y, security) → the matching job file; this file only says
  *how much* effort a budget earns, not what the budget's number should be.
- You need defect severity or routing → `defect-lifecycle.md`.

## Contents

- [Risk ranking and budget allocation](#risk-ranking-and-budget-allocation)
- [Recording which rank an effort served](#recording-which-rank-an-effort-served)
- [The shape debate: contested, not resolved](#the-shape-debate-contested-not-resolved)
- [What we deliberately do not verify](#what-we-deliberately-do-not-verify)
- [Stopping heuristics](#stopping-heuristics)
- [Entry and exit criteria](#entry-and-exit-criteria)
- ["Good enough" as a rational acceptance state](#good-enough-as-a-rational-acceptance-state)

## Risk ranking and budget allocation

Verification is a finite budget spent against an infinite space of possible failures. Rank first,
spend second. Impact × probability, 1–5 each, banded:

| Score (impact × probability) | Band | Allocation | Technique posture |
|---|---|---|---|
| 20–25 | Critical | ~60% of remaining budget | Multiple independent techniques, adversarial read required |
| 12–19 | High | ~25% | One strong technique, spot-checked |
| 6–11 | Medium | ~10% | Smoke-level automated check |
| 1–5 | Low | ~5% | Exploratory pass or explicitly waived |

*Bands adapted from `proffesor-for-testing/agentic-qe` (MIT). These are an adopted convention, not a
derived result — no published study fixes these percentages. Per I12, they are cited because they
came from somewhere, and they remain yours to justify or change.*

Calibrate impact with concrete anchors, not adjectives — e.g. 5 = revenue loss, data breach, legal
exposure, user-safety harm; 1 = negligible, cosmetic, no stakeholder ever notices. Anchors make the
score reproducible across two different people scoring the same risk.

This is a budget-*splitting* heuristic, not a technique catalogue — pick techniques per job file
(`functional-verification.md`, `security-and-privacy-verification.md`, etc.) once a band is assigned.

**I14 governs this, and I14 is itself contested** (see below): allocating by ranked risk is the
default rule this skill teaches, but the shape traditions argue for allocating by architecture
instead. Hold both — rank first is the operative default; the shape debate is about *where the mass
of low-level technique effort goes*, a narrower question than *which risk gets budget at all*.

## Recording which rank an effort served

Every verification effort you spend must trace back to the rank that justified it. Untraceable effort
is invisible to an auditor and cannot be defended when budget is cut. Minimum record per effort:

| Field | Example |
|---|---|
| Risk item | "Checkout payment submission" |
| Rank / band | 22 / Critical |
| Effort spent | 3 independent techniques: integration test, manual adversarial pass, load test |
| Evidence state produced | `observed` (see `oracles-and-evidence.md`) |

An effort with no risk item behind it is either gold-plating a Low item or verifying something nobody
ranked — both are findings worth surfacing in the dossier, not silently absorbing.

## The shape debate: contested, not resolved

Pyramid (Cohn), trophy (Dodds), honeycomb (Spotify) disagree about where test *mass* should sit —
unit-heavy, integration-heavy, or integration-heavy-for-microservices-specifically. **Do not resolve
this debate by picking a shape and presenting it as settled.** Two facts should stop you:

1. **Neither Cohn's pyramid nor Dodds's trophy states a numeric ratio.** Cohn's original 2009
   treatment names layers, not percentages `[UNVERIFIED — absence-of-evidence claim; the primary
   book was not read, only secondary treatments]`; the Dodds half **is** verified — the trophy is
   glossed by "mostly integration" as a
   personal diminishing-returns heuristic (~70% coverage), not measured data. The 80/15/5 and
   70/20/10 splits in circulation are later accretions by *other* authors, not the originators.
2. **The one institution that does publish a ratio contradicts itself.** *Software Engineering at
   Google* ch. 11 states "around 80% unit, 15% integration, 5% end-to-end" as "a very rough
   guideline." A Google engineer writing separately in 2011 gave 70/20/10 and openly admitted the
   split was "pulled out of a hat." Same institution, different numbers, one self-disclaimed as
   arbitrary.

**Teach allocation by where defects actually originate**, not by an inherited ratio: instrument
escaped defects (see `defect-lifecycle.md` on triage) and let the observed source distribution of real
bugs pull the mix toward the layer that actually catches them. Fowler, quoting Searls, calls the
ratio debate itself "a distraction" — few teams write tests fast, reliable, and specific regardless of
layer, and that property (Beck's twelve desiderata: isolated, composable, deterministic, fast,
writable, readable, behavioral, structure-insensitive, automated, specific, predictive, inspiring)
is judged per-test, not per-shape.

**Any ratio this skill or its user adopts is the adopter's to justify, not the canon's to supply.**
State the ratio you chose, the defect data (or its absence) that justified it, and date-stamp it —
ratios rot as architecture changes.

## What we deliberately do not verify

**Required output, not optional courtesy.** ISO/IEC 15026-2 §7.2(b) permits omitting required
verification content "unless documented justification is provided for doing otherwise" — omission is
permitted, *silent* omission is not. Every verification pass must produce an explicit list of what was
in scope for ranking and either ruled out-of-band or accepted as Low-band with no effort spent.

Minimum content of the list:

- The item considered.
- Why it was excluded or deprioritized (below the risk line; out of the adversary's declared maximum
  capability, per `oracles-and-evidence.md`'s abuse-case scoping; explicitly deferred to a sibling
  skill).
- Who owns the decision and when it should be revisited.

A verification report with no such list is not more thorough than one that has it — it has simply
hidden its residual risk. This list feeds directly into the residual-risk record owned by
`release-gate-and-claims.md`; this file only requires that the list exist and be honest.

## Stopping heuristics

Stopping is always heuristic — there is no test-completeness proof for a non-trivial system. The
literature's eleven named heuristics (Bolton, 2009) are not a menu to pick the "best" one; they are a
device for noticing *which one you are already acting on*: Time's Up, the Piñata (first sufficiently
dramatic problem), the Dead Horse, Mission Accomplished, Mission Revoked, I Feel Stuck, the Pause That
Refreshes (temporary, not a true stop), the Flatline, the Customary Conclusion, No More Interesting
Questions, and Avoidance/Indifference — the last explicitly a failure mode to catch in yourself, not
to endorse.

**Say which heuristic you stopped on, every time.** "Residual risk: low" is meaningless if the
stopping rule was *Time's Up!* or, worse, *Avoidance/Indifference* — fatigue disguised as sufficiency.
It means something defensible if the rule was *No More Interesting Questions* against the ranked risk
model above. The failure mode this guards against: **stopping by fatigue without noticing**, then
reporting the stop as a judgment.

## Entry and exit criteria

State both before verification starts, per risk band, not as an afterthought at the end:

| | Entry | Exit |
|---|---|---|
| Critical | Risk item ranked, oracle named per item, environment matches production-equivalent config | Zero unrefuted Critical-band findings, or each has an owner + expiry recorded as residual risk |
| High | Risk item ranked, at least one technique selected | Technique executed, evidence state recorded, findings triaged |
| Medium / Low | Item appears on the "what we do not verify" list or gets a smoke pass | Smoke pass recorded, or the omission is documented per the section above |

Entry criteria that are never checked make the exit criteria meaningless — an exit rule evaluated
against work that never properly started is a stopping heuristic (see above) dressed as rigor.

## "Good enough" as a rational acceptance state

Bach's four-part definition (IEEE Computer, 1997) is the antidote to treating incomplete verification
as failure:

1. It has sufficient benefit.
2. It has no critical problems.
3. The benefit sufficiently outweighs the problems that remain.
4. Further improvement would be more harmful than helpful, in the present situation.

**"Good enough" is a rational acceptance state, not mediocrity.** Verifying everything conceivable is
framed in the literature as compulsive, not virtuous — every hour spent re-verifying a Low-band item is
an hour not spent on an unranked Critical one. This is the operational payoff of ranking first: "good
enough" only has content once you can point to the ranked list and the stopping heuristic that
produced the decision to stop. Without both, "good enough" collapses back into an excuse.

## Failure modes and handoff

- **Ranking skipped, technique chosen first** — the most common failure. If no risk rank exists,
  produce one before selecting a technique; do not let tool availability drive priority.
- **A ratio presented as settled fact** — if you ship a pyramid/trophy/honeycomb percentage, cite who
  chose it and why, never as canon.
- **The "do not verify" list is empty** — treat an empty list as suspicious, not as thoroughness;
  confirm every Low-band item was actually considered, not simply never noticed.
- **No stopping heuristic named** — if a report says "verification complete" with no heuristic
  attached, send it back before it reaches the gate.
- Hand the ranked risk model and residual-risk candidates to `release-gate-and-claims.md` for the
  ship/claim decision; hand named oracles per item to `oracles-and-evidence.md`; hand triage of
  findings produced during verification to `defect-lifecycle.md`.
