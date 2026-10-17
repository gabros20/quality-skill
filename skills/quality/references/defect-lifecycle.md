# Defect Lifecycle

Purpose: Decide what a finding is, how it is described, how severe it is, and where it goes once
verification has produced it.

Read when: verification has produced findings that must be classified, prioritised, or routed; a
severity dispute needs settling; or a report must be made reproducible enough to act on.

Inputs: raw findings with their evidence; the owning skill for each affected area; the release
gate's severity thresholds.

Produces: classified defects with one classification and exactly one severity value, minimal
reproductions, harm stated in the user's domain terms, and routing to the owning skill.

## Skip when:

- You need to decide *whether* to verify something and how much effort it earns → use
  `verification-strategy-and-risk.md` first; that risk rank is an input here.
- You need to name the oracle or evidence state behind a finding before it becomes a defect record →
  `oracles-and-evidence.md`.
- You need the ship/no-ship dossier and residual-risk record that findings feed into →
  `release-gate-and-claims.md`.
- You are being asked to *fix* the defect → route to the owning sibling skill (see Triage below); this
  skill reports, it does not fix.

## Contents

- [ODC as the classification spine](#odc-as-the-classification-spine)
- [Mapping the inherited scales onto ODC](#mapping-the-inherited-scales-onto-odc)
- [What makes a report reproducible](#what-makes-a-report-reproducible)
- [A finding is not a finding until it reaches harm](#a-finding-is-not-a-finding-until-it-reaches-harm)
- [The P1 boundary test](#the-p1-boundary-test)
- [The go/no-go rule](#the-gono-go-rule)
- [Triage routing](#triage-routing)

## ODC as the classification spine

Chillarege's Orthogonal Defect Classification gives a defect record two independent axes that answer
*what kind of fix was needed* and *what surfaced it* — before anything is said about how bad it is.

| Axis | Values | Answers |
|---|---|---|
| **Type** (the fix, not the cause) | Assignment/Initialization · Checking · Algorithm/Method · Function · Timing/Serialization · Interface · Relationship | What kind of change closes the gap |
| **Qualifier** | Missing · Incorrect · Extraneous | Refines Type — was the needed logic absent, wrong, or superfluous |
| **Trigger** | Activity-specific: review triggers (backward/lateral compatibility, design conformance, concurrency, logic flow, side effects, rare situation) · function-test triggers (coverage, variation, sequencing, interaction, simple/complex path) · system-test triggers (recovery, start/restart, workload/stress, configuration, blocked test) | What condition made a latent defect surface |
| **Impact** | Usability · Reliability · Performance · Integrity/Security · Maintainability · Standards · Documentation · Capability · Installability | Which stakeholder-facing quality attribute is harmed — the bridge to severity |

ODC's own value claims ("reduces root-cause analysis cost by 10x") are the inventor's unaudited
figures — do not cite them as evidence. What is worth taking is the classification discipline itself:
**Type is what was needed to fix the problem, not what caused it** — a distinction that keeps a defect
record from turning into a root-cause debate before triage has even happened.

## Mapping the inherited scales onto ODC

Two severity scales were inherited from the decommissioned `webdesign` skill: **A0–A3** (craft/
art-direction) and **P0–P3** (functional/usability correctness), deliberately run as separate tracks
there. **Ruling: both scales are kept, but as severity-within-ODC, not as a second and third
classification system running alongside it.** ODC's **Impact** attribute is the routing key:

| Defect's ODC Impact | Routes through | Because |
|---|---|---|
| Usability, where the defect is a direction/craft conformance issue (off-palette, broken composition rhythm, an unfinished-looking detail) rather than a broken interaction | **A0–A3** | Craft findings have a subjective bar and a different fixer (design/frontend craft) than a functional break |
| Reliability, Security/Integrity, Performance-as-broken, Capability, or Usability where the defect blocks or excludes a user from completing a task | **P0–P3** | Functional findings are impact-not-effort routed and have a checkable severity boundary (below) |

A defect record therefore carries **one ODC classification (Type/Qualifier/Trigger/Impact)** plus
**exactly one severity value from whichever scale its Impact routes to** — never both scales, and
never a third invented ladder. This is the synthesis ruling for this skill: adopt ODC as the spine,
map the inherited scales onto it, rather than shipping two ad-hoc ladders or a third.

**A0–A3** (blocking is A0/A1, advisory is A2/A3):

| Severity | Meaning |
|---|---|
| A0 | Direction violation — off-direction palette/type/register, broken hierarchy. Blocks. |
| A1 | Composition/rhythm failure, or a real detail defect (misused icon, overflowing/clipped/colliding text, visible misalignment). Blocks. |
| A2 | Refinement — sub-perceptual spacing/alignment/motion tuning. Advisory; fix if cheap, never blocks. |
| A3 | Delight — optional polish. Advisory. |

**P0–P3** (routed by impact, never by how easy the fix is):

| Severity | Meaning |
|---|---|
| P0 | Blocks the core task or excludes a user — unusable control, contrast failure on a primary action, keyboard trap. |
| P1 | The boundary test below. |
| P2 | Friction or inconsistency that slows people but has a workaround. |
| P3 | Polish, delight, refinement. |

Source and licence: the P0–P3 scale and the gate machinery below derive from `pbakaus/impeccable`
(Apache-2.0, confirmed at the repo's `/LICENSE` as of 2026-07-26) — cite it wherever this scale or the
go/no-go rule is reproduced. Re-verify the licence at github.com/pbakaus/impeccable before relying on
it past that date; licences change without notice.

## What makes a report reproducible

A finding without a reproducible record is not evidence, it is testimony. Three required elements,
ranked by developer-importance data (Bettenburg et al., FSE 2008, surveying what developers actually
use to act on a report):

1. **Minimal repro (steps to reproduce)** — rated most important by 83% of developers surveyed, the
   single highest-value item a report can carry. State the smallest sequence that reproduces the
   defect, not the sequence you happened to be running.
2. **Environment** — build/version, browser or runtime, config, data state. Without it, a "fixed"
   claim later cannot be checked against the same conditions the defect was observed under.
3. **Evidence class** — `observed` / `inferred` / `not_tested` / `blocked` (see
   `oracles-and-evidence.md`). Never report a weaker class in the vocabulary of a stronger one — a
   defect you inferred from a log is not the same report as one you watched happen.

**The gap between what's wanted and what's supplied is not ignorance — it's difficulty.** Bettenburg's
data shows reporters *know* what's valuable (0.839 correlation between what developers consider
important and what reporters *think* is important) and still don't supply it (−0.035 correlation
between importance and what's actually *provided*), because the highest-value items are the hardest to
produce — a test case was rated 75% difficulty by reporters. Budget effort accordingly: a minimal
repro is worth spending disproportionate time on, because it is both the most wanted and the most
often skipped.

One counterintuitive finding worth carrying into triage: developers do not treat duplicate reports as
pure waste — "duplicates are not really problems, they often add useful information." Do not
suppress a duplicate; merge it and keep what it adds.

## A finding is not a finding until it reaches harm

Not every deviation from spec is a defect worth recording as a finding. McDermott & Fox's definition of
harm (1999) is the test: an interaction is only in scope once its result is "harmful to the system,
one of the actors, or one of the stakeholders in the system" — not merely a technical irregularity.
Their own worked example: an interaction that reveals a session key to the wrong actor is not yet
harmful; extend it to that actor posting the key publicly, and it is.

**State the harm in the user's domain terms, not the mechanism's.** "The `onBlur` handler fires twice"
is a mechanism description; "the discount code is silently applied twice, overcharging or undercharging
the customer" is a finding. A defect record that only describes the mechanism has not yet established
that it belongs in the report at all — trace it to the stakeholder it harms before filing it.

## The P1 boundary test

The scale above needs a checkable line between "blocks" (P0) and "everything else." The boundary test
for P1, verbatim and worth keeping exactly as stated because it is memorable and checkable:

> **"Would a real user contact support over this?"** If yes, it's at least P1.

This converts an impact judgment into a concrete, simulatable question instead of an adjective
("annoying," "minor"). Apply it before applying any other severity criterion — it disambiguates the
P1/P2 boundary, which is otherwise the easiest place to under- or over-call severity.

## The go/no-go rule

> **Any P0, or a P1 you can't immediately fix, is a NO-GO.**

Do not round up a build with a broken core flow to "ready" because the surrounding polish is good.
This is the failure mode the rule exists to prevent: **rounding severity up** — letting the presence of
unrelated good work talk a P0 or an unfixed P1 down into something shippable. The rule is deliberately
blunt: it does not weigh a P0 against how much else went well, because that weighing is exactly the
rationalization the rule is designed to block.

**Check the verdict record against its own findings, mechanically.** A GO that lists an unresolved P0
or unfixed P1, an approve with open A0/A1 items, or a revise with an empty blocking list is a
malformed record — reject it, do not reinterpret it. One cause is a scale that never says which
severity blocks, which is how a GO gets issued beside a P1 that leaves a whole viewport's navigation
unreachable.

**Name the non-downgradable findings before review.** A reviewer left to weigh can rationalize an
identity break as "an acceptable stand-in." For each job, list the findings that block whatever else
is good — on a fidelity rebuild, the identity breaks in `surface-web-app-and-site.md` — and read the criteria's own allowances for
loopholes: "replace a broken image" is not licence to replace a missing one.

This rule composes with the round-convergence discipline owned by `release-gate-and-claims.md`: round
one of a review may never be an unconditional sign-off, and from round two on, approve the moment
blocking severities (A0/A1, P0, and any un-fixed P1) clear — round-over-round, only escalate, never
introduce new low-value findings you previously let pass. Attribution: this gate mechanic derives from
`pbakaus/impeccable` (Apache-2.0).

## Triage routing

**This skill reports; it does not fix.** Once a finding is classified (ODC) and severity-routed
(A0–A3 or P0–P3), route it back to the sibling skill that owns construction for the surface it lives
on — `frontend`, `backend`, `ai`, or `data` — never absorb the fix here. A minimal triage record for
the handoff:

| Field | Content |
|---|---|
| ODC Type / Qualifier / Trigger / Impact | Classification, not root cause |
| Severity | A0–A3 or P0–P3, per the routing rule above |
| Repro | Minimal steps, environment, evidence class |
| Owning skill | `frontend` / `backend` / `ai` / `data` / other |
| Harm statement | In the stakeholder's domain terms |

An unclassified "bug" handed to an owning skill with no severity and no repro is not a triage — it is
an unfiled complaint, and it will not survive contact with a backlog.

**Cascades file as one chain.** When several findings share a root — a write left a required field
empty, so a block would not publish, so the page 404s — link them to the root: severity follows the
worst user-facing harm in the chain, routing follows the root. A finding in a third-party dependency
goes upstream when it is reproducible, systemic, and actionable by that owner; otherwise it stays a
local workaround with its residual risk recorded.

## Failure modes and handoff

- **Two scales and a third invented one, all in play at once** — collapse back to the single ODC
  Impact routing rule above; a defect gets one classification and one severity value.
- **Severity assigned by fix effort instead of impact** — both P0–P3 and A0–A3 are routed by impact;
  "it's a one-line fix" is never a severity argument.
- **Rounding a P0 or unfixed P1 up because everything else looks good** — apply the go/no-go rule
  literally; it exists specifically to prevent this.
- **A finding filed before it reaches stakeholder harm** — trace the mechanism to a domain-terms harm
  statement before it counts as a finding at all.
- Hand the ranked, classified defect record to the owning sibling skill for remediation; hand residual,
  un-fixed findings to `release-gate-and-claims.md` as candidates for the residual-risk record with an
  owner and expiry.
