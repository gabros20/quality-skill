# Release Gate and Claims

Purpose: Decide two things independently — **may we ship** and **what may we claim** — and require
the adversarial read of the evidence to ship as part of the same artifact, never as a separable extra.

Read when: a go/no-go decision is being made; an evidence dossier must be assembled or challenged;
a conformance claim is being contemplated; or residual risk must be recorded and owned.

Inputs: the evidence ledger with per-item classes; classified defects; the ranked risk model and
the "deliberately not verified" list; the stopping heuristic actually used.

Produces: two separate decisions (ship, and claim), an evidence dossier containing its own
adversarial read, residual risks with owners and expiries, and the recorded stopping heuristic.

## Skip when:

- You need to name an oracle or state an evidence class for one check → `oracles-and-evidence.md`
  (this file consumes that vocabulary; it does not define it).
- You need to rank risk or allocate verification budget before the gate is reached →
  `verification-strategy-and-risk.md` (that file also owns the full eleven stopping heuristics;
  restated here only as a gate-record requirement).
- You need coverage, mutation, or flake findings themselves → `suite-and-signal-health.md`; this file
  consumes their output as dossier evidence, it does not re-derive them.
- You need defect severity or routing for something the gate found → `defect-lifecycle.md`.
- You need surface-specific claim wording (VPAT/ACR text, a performance budget's number) → the matching
  surface or job file; this file owns the *shape* of a claim, not its NFR-specific content.

## Contents

- [The evidence dossier](#the-evidence-dossier)
- [What we deliberately did not verify — required, not a courtesy](#what-we-deliberately-did-not-verify--required-not-a-courtesy)
- [The release/claim split](#the-releaseclaim-split)
- [Residual risk: owner and expiry](#residual-risk-owner-and-expiry)
- [The adversarial read, shipped as part of the dossier](#the-adversarial-read-shipped-as-part-of-the-dossier)
- [Verdict class and evidence sufficiency are orthogonal](#verdict-class-and-evidence-sufficiency-are-orthogonal)
- [The convergence machinery: ship as a pair](#the-convergence-machinery-ship-as-a-pair)
- [Gate the change; ship the gate warn-first](#gate-the-change-ship-the-gate-warn-first)
- [Say which stopping heuristic you stopped on](#say-which-stopping-heuristic-you-stopped-on)
- [Failure modes and handoff](#failure-modes-and-handoff)

## The evidence dossier

The dossier is the assurance case for a release, warranted by **ISO/IEC 15026-2:2011**. Its structure
is not a style choice — the standard makes specific fields `shall`-required, and a dossier missing them
is non-conforming by the standard's own text, not by this skill's opinion.

**§6.3.2 — every claim in the dossier carries, at minimum:** its property; limitations on the value
(required); **limitations on the uncertainty of that value (required)**; **limitations on the
conditions under which it applies (required)**; and, where the claim applies to a subset of the
system, that subset's identification and version. A claim missing stated uncertainty or stated
conditions of applicability is not a lesser claim — it is not a conforming claim at all.

**§6.3.3 — evidence may not be extended past what it covers.** *"The conditions... covered by the
combination of assurance case components supporting a claim shall together cover the conditions... for
which the claim is applicable."* A component-test pass is not a product-workflow pass; a staging-config
pass is not a production-config pass. Never infer an untested condition from a tested neighbor.

**§6.6.2 — an unsupported proposition is an assumption, not evidence,** and must be labeled with the
basis of its uncertainty. A screenshot an agent says it took and a CI artifact with a run URL are not
the same evidence tier (§6.5.2: evidence carries its scope of applicability and the reliability of its
source) — say which tier each dossier entry is.

**§6.2(d) — a claim may not support itself.** "It passes, therefore it is correct" is a structural
violation of the standard, not a style problem; every claim needs argumentation and evidence external
to the thing being claimed. **§7.1(d) — assurance is signed:** the dossier names the entity asserting
conformance, not just the tool that ran.

**Minimum dossier schema** (generalizes the closest artifact found in the ecosystem — an MIT-licensed
accessibility-conformance skill shaped almost exactly like this brief; adapt its shape past one domain):

| Section | Content |
|---|---|
| Decision and scope | Audience, release/claim decision, surfaces, workflows, explicit exclusions |
| Authority ledger | Requirement source, version/date, retrieved-at, scope, status, evidence owner |
| Requirement-to-evidence matrix | Requirement, workflow/surface, method, result, **evidence state**, evidence link |
| Issue and remediation portfolio | Finding, user-impact, workaround, owner, due date, retest, release effect |
| What we deliberately did not verify | Required section — see below |
| The adversarial read | Required, never shipped separately — see below |
| Claim, release, and exception decisions | Claim status / release status / caveats / exception owner / expiry |

Evidence states in the matrix column come from `oracles-and-evidence.md` — this file only requires the
column exist and be honest, never a weaker state reported in the vocabulary of a stronger one.

## What we deliberately did not verify — required, not a courtesy

**§7.2(b), verbatim:** *"Cover all the contents specified in Clause 6 unless documented justification is
provided for doing otherwise."* Read precisely: omission is permitted. **Silence is not.** A dossier
that simply does not mention a surface is non-conforming; a dossier that names the surface and states
why it was left unverified — out of the ranked risk model, out of the declared adversary's maximum
capability, explicitly deferred and owned by a named person — conforms. This section is not
"nice-to-have completeness." It is the mechanical test of whether §7.2(b) was honored, and it must
appear even when it is short.

## The release/claim split

**The single most load-bearing sentence in this file**, from the closest prior art found in the
ecosystem (MIT, adapt the idea, not the wording): *decide release and claim status independently — a
product may ship with a recorded exception without earning an unqualified conformance claim.*

This is McDermott & Fox's residual-risk statement (1999) in operational, two-decision form, and it
dissolves the exact binary that makes gates get overridden in practice: a reviewer facing one merged
ship/claim decision, under deadline pressure, will round an exception up to "fine" because the
alternative reads as "don't ship." Splitting the decision removes that pressure — **shipping with a
recorded exception is always available and never requires pretending the exception doesn't exist.**

## Residual risk: owner and expiry

**Whatever is unrefuted is residual risk**, and a residual-risk entry without an owner and an expiry is
not a risk record — it is a sentence that will rot in a document nobody revisits. ISO/IEC 15026-2
§6.3.2(d) gives the schema hook: a claim's limitation on duration is *"optional"* in the standard's
letter, but this skill teaches it as required in practice — an accepted exception with no expiry is an
accepted exception forever, silently, which is exactly the silent-omission failure §7.2(b) forbids.

Minimum residual-risk record: the item, why it is unrefuted (not tested, deferred, out of declared
adversary scope), the owner, and the date it must be revisited or re-verified. Where the residual risk
needs a controlled-vocabulary justification rather than a free-text sentence, the security-tooling
world has already built one worth reusing verbatim as a pattern: OpenVEX's `not_affected` justification
enum — `component_not_present` / `vulnerable_code_not_present` /
`vulnerable_code_not_in_execute_path` / `vulnerable_code_cannot_be_controlled_by_adversary` /
`inline_mitigations_already_exist`. A residual-risk record that picks from a closed vocabulary like
this is auditable in a way "low risk, probably fine" is not.

## The adversarial read, shipped as part of the dossier

**A dossier without its adversarial read is the failure mode the assurance-case literature has spent
twenty years documenting.** ISO/IEC 15026-2 concedes this about itself, in its own scope text: *"This
part of ISO/IEC 15026 does not place requirements on the quality of the contents of an assurance case.
Rather, it places requirements on the existence of the contents and structure."* The standard
guarantees a dossier has the right shape. It does not, and says it does not, guarantee anyone tried to
break it. A live academic literature on assurance-case **"defeaters"** and **"assurance weakeners"**
exists for exactly this reason, and the standard's own bibliography cites a taxonomy of fallacies in
safety arguments as foundational reading. **The dossier and its adversarial read are one feature. Ship
them as one artifact or the dossier is decorative.**

The strongest available mechanism for the adversarial read is a court-shaped review process found in
an MIT-licensed agentic-QE pack — **adapt the ideas below, not the vendor names, agent roles, or CLI
machinery they are embedded in:**

- **Independent challengers file blind.** Each generates its own probe set against the dossier's
  claims without seeing the defense of "why this should ship" or each other's findings first.
  Independence has to be a *procedure*, not a declared property — a challenger who has seen the
  defense is not independent, whatever its title says.
- **A kill round, before charges count.** Every charge is itself attacked — is it reproducible, is it
  real — before it is allowed into the record. A charge that does not survive its own kill round is not
  stored as a finding at all. This is what keeps an adversarial process from filling the dossier with
  noise instead of signal.
- **Asymmetric overturn — the single best idea to carry forward.** An optimistic verdict ("ship") must
  *survive* escalation to a deeper reviewer; a blocking verdict needs only **one** surviving fatal
  charge to stand. The burden of proof falls entirely on "ship," never on "block." Concretely: loop the
  escalation until dry — a ship verdict stands only once **K consecutive deeper rounds find nothing
  new**, with K tuned per domain as the point where new charges stop appearing. This is the strongest
  available answer this corpus found to *"how do you know you looked hard enough before shipping?"*
- **An overturned ship decision is the highest-value signal available**, not an embarrassment to bury.
  A gate that was too easy the first time and got caught by deeper review is exactly the case worth
  recording and feeding back — it is what makes the gate harder to fool next time.
- **Refuse to emit a number you cannot validate.** Publish a verdict class and its charges; publish a
  numeric score only if the scoring method has actually been checked for whether it discriminates
  real from noise cases. A confident-looking "91/100" that nobody validated is false precision
  presented as false confidence — worse than no number at all.

## Verdict class and evidence sufficiency are orthogonal

**A three-valued verdict (ship / needs-fixes / block) does not tell you whether anyone looked hard
enough — that is a second, independent axis.** It is tempting to fold "insufficient evidence" into the
middle value of a three-valued verdict; do not. In the strongest adversarial model examined, the
middle verdict means *fixable charges survived and delivery is close* — real, minor defects were
found. It does not mean *nobody looked at this surface*. Collapsing the two produces a gate that cannot
express the one state this skill exists to name: **"this is green because nobody looked."**

Carry both axes, always:

| Axis | Values | Answers |
|---|---|---|
| Verdict class | ship / needs-fixes / block | Was a defect found and how serious is it? |
| Evidence sufficiency (per requirement, from `oracles-and-evidence.md`) | `observed` / `inferred` / `not_tested` / `blocked` | Did anyone actually look, and how directly? |

A requirement can be `ship`-verdict *and* `not_tested` simultaneously — nothing challenged it because
nothing examined it, which is a materially different residual risk than `ship`-verdict-and-`observed`.
Report both, every time; a merged single field always throws one of the two questions away.

## The convergence machinery: ship as a pair

Inherited from a design-review discipline (`pbakaus/impeccable`, Apache-2.0) that solved a structurally
identical problem — a reviewer rubber-stamping on the first pass — and generalizes past design review
to any release gate with a human sign-off step. **Ship both halves together; each alone fails
differently:**

- **Round one may never approve.** If the reviewer genuinely finds nothing blocking, promote the one to
  three highest-value lesser findings into the blocking list anyway, so at least one real
  review-fix-review cycle happens before anything is called done. **Alone, this half is a hazing
  ritual** — an artificial revision demand with no bound on how many rounds it can repeat.
- **From round two, approve once the top severities clear.** Lower-severity items may remain; only
  escalate, never introduce a new low-value objection that was let pass earlier (that is thrash, not
  rigor); and cap the loop at a hard round limit (a defensible default is 3) — at the cap, proceed with
  the remaining findings recorded as residual risk rather than looping indefinitely. **Alone, this half
  is toothless** — nothing stops a first-pass rubber stamp.

**Together, the two halves give a termination guarantee**: at least one real fix is forced, and the
loop is bounded, so the bar cannot be gamed by looping forever *or* by approving immediately. Ship them
as a pair or do not ship either.

## Gate the change; ship the gate warn-first

Two principles, converged on independently by vendors with no shared lineage: **gate the change, not
the whole codebase** — actionable by the person who can act on it, and the only model reaching full
compliance on a legacy codebase without a remediation project first (SonarQube and Codecov both
arrived here separately); and **ship the gate's default as warn, not block** — mutation-testing tools
ship new gates off so adoption never breaks a pipeline, flipping to blocking once trust is earned. See
`suite-and-signal-health.md` for the specifics.

## Say which stopping heuristic you stopped on

`verification-strategy-and-risk.md` owns the full set of eleven stopping heuristics; this file's rule
is narrower and specific to the gate record: **every gate decision must name which heuristic it stopped
on, in the dossier itself, not just carry it in a separate verification log.** "Residual risk: low" and
"ship" mean something different depending on whether the stopping rule was *No More Interesting
Questions* against a ranked risk model, or *Time's Up!* — a deadline, not a judgment. A gate record with
a verdict and no named stopping heuristic has hidden exactly the information that would let a
downstream reader tell those two cases apart.

## Failure modes and handoff

- **A claim shipped with no stated uncertainty or conditions of applicability** — non-conforming by
  ISO/IEC 15026-2 §6.3.2 itself; return it before it reaches the dossier.
- **A dossier with no "what we deliberately did not verify" section** — treat the absence as a finding
  in itself, not as evidence of thoroughness.
- **An unqualified conformance claim resting on a recorded exception** — block the claim, not
  necessarily the release; the release/claim split exists precisely so this never has to be a single
  decision made under pressure.
- **A residual-risk entry with no owner or no expiry** — it is not a risk record yet; send it back.
- **A dossier shipped without its adversarial read, or with the adversarial read as a separate,
  skippable appendix** — this is the exact failure the standard's own scope note warns about; treat the
  two as one artifact, always.
- **Verdict class used as a proxy for evidence sufficiency, or vice versa** — a gate that cannot say
  "ship, but nobody looked at this" has merged two axes that must stay separate.
- **A round-one approval, or an unbounded revision loop with no round cap** — both are convergence
  failures; ship the paired discipline above, never one half.
- Hand a finding that changes NFR-specific claim wording (a11y conformance level, a performance budget
  breach) to the matching surface or job file; hand a defect the gate surfaced to
  `defect-lifecycle.md`; hand a change to the ranked risk model itself back to
  `verification-strategy-and-risk.md`.
