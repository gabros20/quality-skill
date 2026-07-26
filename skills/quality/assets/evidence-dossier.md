# Evidence Dossier (fillable)

The release-evidence artifact. Structure follows ISO/IEC 15026-2:2011 §6 (assurance case content
requirements — the standard requires the *existence* of these contents, not a particular quality bar).
Fill every bracket; an empty required section is a defect in the dossier itself, not a shortcut.
Source: `references/oracles-and-evidence.md`, `references/release-gate-and-claims.md`.

**The adversarial read (Part 6) ships as part of this document, not as a follow-on appendix.** A
dossier without its own challenge attached is the artifact the assurance-case literature has spent
twenty years warning is routinely fallacious in practice — do not file it separately, do not file it
later.

---

## 0. Claim under assessment

> One sentence. What are we claiming, about what system, for whom.

**Claim's property** (ISO/IEC 15026-2 §6.3.2a — required): [ ]

**Scope** — the build/commit/version this claim is about: [ ]

## 1. Conditions of applicability (required)

Per §6.3.2(f) — the claim is void outside these. Never let the claim travel further than this list.

- Environment / config: [ ]
- Browser / device / OS matrix covered: [ ] (see `assets/compatibility-matrix.md`)
- User population / traffic pattern assumed: [ ]
- Date range / build the evidence was gathered against: [ ]
- Duration the claim is expected to hold before re-verification (§6.3.2d, optional but recommended): [ ]

## 2. Stated uncertainty (required)

Per §6.3.2(c) — a claim with no stated uncertainty is non-conforming, not merely incomplete.

- Confidence in the claim, stated in words a decision-maker can act on (not a fake precision number
  unless one is genuinely warranted): [ ]
- What would change this confidence if it turned out false: [ ]

## 3. Evidence supporting the claim

One row per item. Pull rows straight from `assets/evidence-worksheet.md` for any tool used here —
do not re-derive what a tool's pass does and does not establish from scratch.

| Evidence item | Oracle | Evidence class | Conditions it covers | Source (typed channel) |
|---|---|---|---|---|
| | | observed / inferred / not_tested / blocked | | run URL / report path / reviewer |

**Never report a weaker evidence class in the vocabulary of a stronger one.** An `inferred` result
written up as if `observed` is the single most common way a dossier goes wrong.

## 4. Assumptions (labelled as assumptions, not evidence)

Per §6.6.2 — "a claim is called an assumption if it appears in an assurance case as evidence." An
unsupported proposition sitting in Part 3 above is a defect; move it here.

| Assumption | Why it was not independently verified | What would falsify it |
|---|---|---|
| | | |

## 5. What we deliberately did not verify (required — not optional)

Per §7.2(b): omitting content is permitted; omitting it *silently* is not. An empty table here is not
proof of thoroughness — treat it as suspicious and re-check before shipping the dossier.

| Item considered | Why excluded (below risk line / out of declared adversary scope / deferred to sibling skill / no oracle exists) | Owner | Revisit by |
|---|---|---|---|
| | | | |

## 6. Adversarial read (ships with this dossier, not after it)

Attack the claim above as if you did not write it. Minimum required challenges:

- **Self-support check** (§6.2d): does any evidence row above ultimately just restate "it passed,
  therefore it is correct"? List any circular row: [ ]
- **Extrapolation check** (§6.3.3): does any evidence row get used to support a condition it does not
  cover (e.g. a component pass standing in for a product-workflow pass)? [ ]
- **Counter-evidence check** (§6.6.3): is there any known result that *detracts from* the claim that
  isn't already listed in Part 3 or Part 5? A dossier that only lists confirming evidence is
  incomplete by construction. [ ]
- **Gaming check**: could the system under test, or a tool in the pipeline, have altered its own
  measurement (see `references/oracles-and-evidence.md` on adversarial-subject abuse cases)? [ ]
- **Verdict**: does this dossier survive its own challenge? [ survives / needs another round ]

## 7. Signatures (§7.1d — assurance is signed)

| Role | Name | Date |
|---|---|---|
| Prepared by | | |
| Adversarial read by (must differ from preparer) | | |
| Accepted by (ship decision owner) | | |

---

**Reminder — two separate decisions.** This dossier feeds `assets/release-gate-checklist.md` for the
ship/no-go call and the claim decision independently. A recorded exception here can still ship; it
cannot still earn an unqualified conformance claim.
