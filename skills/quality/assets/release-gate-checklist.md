# Release Gate Checklist — Go/No-Go (fillable)

The gate. Run this once per release round; it produces two independent decisions, not one. Source:
`references/release-gate-and-claims.md`. Round machinery adapted from the inherited go/no-go
discipline (`pbakaus/impeccable`, Apache-2.0, for the underlying gate mechanics) — the pairing below
is load-bearing, ship it as a pair, never as one half alone.

## 1. Round discipline

**Round 1 may never approve.** A first look almost always has something worth fixing, and a
too-easy round-1 approval is exactly the failure this exists to prevent.

- If any top-severity finding exists (P0/P1, or A0/A1 on a craft-only pass) → `revise`, as normal.
- If genuinely **none** are found → still return `revise`, and promote the 1-3 highest-value
  secondary findings (best P2/A2 items) into the blocking list for this round, marked `promoted`.
  This guarantees at least one build → review → fix → review cycle.

**From round 2 onward:** approve the moment top severities (P0/P1, or A0/A1) are clear, even if
lower-severity items remain. Escalation only — do not introduce new low-value findings you let pass
in an earlier round; that is thrash, and it breaks the monotonic-severity guarantee that lets the
loop terminate.

**Hard round cap:** agreed limit = **___** rounds (default 3). If top severities still remain at the
cap, proceed anyway with findings recorded as residual risk — the cap is a forcing function, not a
license to keep looping indefinitely.

| Round | Date | Top-severity findings open | Verdict | Promoted items (round 1 only) |
|---|---|---|---|---|
| 1 | | | revise (always) | |
| 2 | | | approve / revise | n/a |
| 3 | | | approve / revise | n/a |

## 2. Go/no-go rule (per finding)

**Any P0, or a P1 you can't immediately fix, is a NO-GO.** Don't round up a broken core flow to
"ready" because everything else is otherwise clean. See `assets/severity-map.md` for the full scale
and the P1 boundary test ("would a real user contact support over this?").

## 3. The two decisions — made independently

Do not let a clean ship decision imply an unqualified claim, or vice versa.

**Ship decision:**
- [ ] Zero unrefuted top-severity (P0/P1 or A0/A1) findings, OR
- [ ] Each remaining top-severity finding has an owner + expiry recorded as residual risk, accepted
  by a named person
- **Verdict:** [ ] ship [ ] ship with recorded exception [ ] block

**Claim decision (separate — fill even if shipping):**
- Exact scope of what may be claimed (surface, standard + level, browsers/devices, date): [ ]
- What is explicitly NOT covered by this claim: [ ]
- A product may ship with a recorded exception without earning an unqualified conformance claim —
  if any top-severity item is an accepted exception, the claim must exclude the area it touches.

## 4. Residual risk carried forward

Pull directly from `assets/risk-matrix.md` and `assets/evidence-dossier.md` Part 5 — do not
re-derive; this is a summary view for the gate meeting, not a new register.

| Risk | Owner | Expiry | Accepted by |
|---|---|---|---|
| | | | |

## 5. Stopping heuristic actually used

Name it — "residual risk: low" means nothing if the stopping rule was *Time's Up!* or
*Avoidance/Indifference* (fatigue disguised as sufficiency). It means something if the rule was, say,
*No More Interesting Questions* against a ranked risk model.

Heuristic: [ ] · Why it's defensible here (point at the risk matrix, not a feeling): [ ]

## 6. Evidence-integrity check before signing

- [ ] Every evidence item cited in this gate states its evidence class (`observed` / `inferred` /
  `not_tested` / `blocked`) — none reported in a stronger vocabulary than it earned
- [ ] The dossier's adversarial read (`assets/evidence-dossier.md` Part 6) was actually done, by
  someone other than the preparer
- [ ] "Deliberately not verified" list is non-empty or its emptiness has been specifically challenged

## 7. Sign-off

| Role | Name | Date | Verdict signed off |
|---|---|---|---|
| Round reviewer | | | |
| Ship-decision owner | | | |
| Claim-decision owner | | | |
