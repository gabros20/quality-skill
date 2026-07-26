# Severity Map — ODC Spine with A0-A3 / P0-P3 Mapped On

Defect classification worksheet. **ODC (Chillarege) is the spine; A0-A3 (craft) and P0-P3
(functional) are mapped onto it, not shipped as rivals.** Use this to classify a defect once and
route it consistently. Source: `references/defect-lifecycle.md`.

**P0-P3 origin:** adapted from `pbakaus/impeccable` (Apache-2.0) — attribution travels into
SOURCES.md wherever this scale is used. Run severity honestly: the point is to find problems, not to
award a high number.

## 1. Classify the defect on the two ODC axes first

ODC's two axes are orthogonal — fill both before assigning any severity label.

**Defect type** (what fix was needed — not the cause): Assignment/Initialization · Checking ·
Algorithm/Method · Function · Timing/Serialization · Interface · Relationship.

**Qualifier:** Missing · Incorrect · Extraneous.

**Trigger** (what activity surfaced it): *Review* — Backward/Lateral compatibility, Design
conformance, Concurrency, Logic flow, Side effects, Rare situation · *Function test* — Coverage,
Variation, Sequencing, Interaction · *System test* — Recovery, Start/Restart, Workload/Stress, HW/SW
config, Blocked test.

| Field | Value |
|---|---|
| Defect type | |
| Qualifier | Missing / Incorrect / Extraneous |
| Trigger | |
| Trigger activity (review / function test / system test) | |

## 2. Map onto the severity scale that applies

Two scales, kept separate deliberately — they route to different fixers and carry different
ship-blocking weight. Do not collapse them into one ladder.

### A0-A3 — craft / art-direction findings (visual, composition, direction)

| Severity | Meaning | Blocks ship? |
|---|---|---|
| A0 | Direction violation — off-direction palette/type/register, broken hierarchy | Yes — drives a revision round |
| A1 | Composition/rhythm failure, or a real detail defect | Yes — drives a revision round |
| A2 | Refinement — sub-perceptual spacing/alignment/motion-tuning | No — advisory |
| A3 | Delight — optional polish | No — advisory |

### P0-P3 — functional/correctness findings (routed by impact, not fix effort)

| Severity | Meaning | Blocks ship? |
|---|---|---|
| P0 | Blocks the core task or excludes a user (unusable control, contrast failure on a critical path) | Yes |
| P1 | **The boundary test: would a real user contact support over this?** If yes, it's at least P1. | Yes — unless immediately fixed |
| P2 | Friction or inconsistency that slows people but has a workaround | No — non-blocking |
| P3 | Polish, delight, refinement | No — non-blocking |

**Escalation path:** a hard functional break spotted during a craft-scoped pass still routes to
P0/P1, regardless of which scale the reviewer started from — A2/A3 can be non-blocking in a way a P2
usually cannot; don't let scale choice suppress a real functional finding.

## 3. Go/no-go rule

**Any P0, or a P1 you can't immediately fix, is a NO-GO.** Don't round up a broken core flow to
"ready" because visual polish is otherwise good. This rule is the whole gate for a single defect —
`assets/release-gate-checklist.md` governs the aggregate round discipline.

## 4. Worksheet — classify a batch

| # | Defect | Defect type | Qualifier | Trigger | Scale (A/P) | Severity | Blocks? | Routed to |
|---|---|---|---|---|---|---|---|---|
| | | | | | | | | |

## 5. Known-unaudited numbers — do not cite as fact

ODC's own value claims (*"reduces root-cause analysis cost by a factor of 10x"*, *"$100M/year"*) are
Chillarege's own unaudited figures — usable as motivation, never as a measured result in a dossier.
