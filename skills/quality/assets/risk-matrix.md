# Risk Matrix (fillable)

Impact × probability ranking that drives verification allocation. Rank first, spend second —
verification is a finite budget against an infinite space of possible failures. Source:
`references/verification-strategy-and-risk.md`.

## Scoring

Score each candidate risk 1–5 on both axes. Calibrate with concrete anchors, not adjectives, so two
different people scoring the same risk converge.

**Impact anchors:** 5 = revenue loss / data breach / legal exposure / user-safety harm · 3 = visible
functional break with a workaround · 1 = negligible, cosmetic, no stakeholder ever notices.

**Probability anchors:** 5 = happens on the primary path, every session · 3 = edge-case path, some
sessions · 1 = requires an unlikely combination of conditions.

## The matrix

| # | Risk item | Impact (1-5) | Probability (1-5) | Score (I×P) | Band | Rank this verification effort served |
|---|---|---|---|---|---|---|
| | | | | | | |
| | | | | | | |
| | | | | | | |

## Band → allocation (default; adjust and record why if you deviate)

| Score | Band | Budget allocation | Technique posture |
|---|---|---|---|
| 20-25 | Critical | ~60% of remaining budget | Multiple independent techniques, adversarial read required |
| 12-19 | High | ~25% | One strong technique, spot-checked |
| 6-11 | Medium | ~10% | Smoke-level automated check |
| 1-5 | Low | ~5% | Exploratory pass or explicitly waived |

*Adapted from `proffesor-for-testing/agentic-qe` (MIT). Adopted convention, not a derived result —
no published study fixes these percentages.*

## Which rank each verification effort served

Every effort spent must trace back to the row that justified it. An effort with no risk item behind
it is either gold-plating a Low item or verifying something nobody ranked — surface it, don't absorb
it silently.

| Verification effort spent | Risk item # (from matrix above) | Band | Evidence state produced |
|---|---|---|---|
| | | | observed / inferred / not_tested / blocked |

## Deliberately not verified, and why

Required, not optional (ISO/IEC 15026-2 §7.2(b) — omission permitted, silent omission not). An empty
table below is suspicious, not a sign of thoroughness — confirm every Low-band item was actually
considered and not simply never noticed.

| Item considered | Why excluded | Owner | Revisit by |
|---|---|---|---|
| | below risk line / out of declared adversary scope / deferred to a sibling skill / no oracle exists | | |

## Stopping heuristic

Which of Bolton's heuristics did you actually stop on? (Time's Up · the Piñata · the Dead Horse ·
Mission Accomplished · Mission Revoked · I Feel Stuck · the Pause That Refreshes · the Flatline · the
Customary Conclusion · No More Interesting Questions · Avoidance/Indifference — the last is a failure
mode to catch, not endorse.)

Heuristic stopped on: [ ]. Why it's defensible against the ranked list above: [ ]

**Self-audit:** every row in the matrix has a band; every band has at least one traced effort or an
explicit entry in "deliberately not verified"; a stopping heuristic is named. Missing any of the
three means the matrix isn't done, regardless of how many rows are filled in.
