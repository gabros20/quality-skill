# Accessibility Conformance

Purpose: Decide whether an accessibility *conformance claim* is warranted — a different question
from whether a scan passed, and this file never lets the second stand in for the first.

Read when:
- A request asks to "verify accessibility," "check WCAG compliance," or produce/validate a VPAT,
  ACR, or conformance statement.
- A scan (axe, Lighthouse, WAVE, IBM Equal Access) has produced a report and someone wants to know
  what it licenses you to say.
- A surface is regulated (EN 301 549, EAA, ADA/508) and the claim has legal weight.

## Skip when:

- You need to *build* the fix, not verify it → the owning construction skill (`frontend`, etc.).
- You need the general evidence-state vocabulary (`observed`/`inferred`/`not_tested`/`blocked`) or
  how to name an oracle for a tool you have not seen before → `oracles-and-evidence.md`, which owns
  the vocabulary this file only applies.
- You need the ship/claim split mechanics, the dossier, or residual-risk recording →
  `release-gate-and-claims.md`.
- The surface carries a statutory conformance obligation (EN 301 549, EAA, ADA Title II/III) →
  `surface-regulated.md` for the additive audit-evidence and retention requirements; this file
  supplies the conformance vocabulary that overlay applies.
- The question is interaction correctness, not conformance (e.g., "does the modal trap focus
  correctly") → `functional-verification.md`.

Inputs:
- The WCAG conformance level targeted (A / AA / AAA) and version (2.2 unless stated otherwise).
- Scan output from at least one automated tool, with its rule set and version.
- The scope claimed: which pages, which processes, which assistive-technology/browser pairs.

Produces:
- A conformance-claim scope statement (level, pages, processes, AT support, non-interference).
- A stated evidence class per requirement, never a single pass/fail.
- A machine-vs-human coverage split for the SCs in scope, so residual risk is explicit rather than
  implied by a clean scan.

## Contents

- [A scan is not conformance](#a-scan-is-not-conformance)
- [The machine-testable boundary](#the-machine-testable-boundary)
- [Impact levels are not conformance levels](#impact-levels-are-not-conformance-levels)
- [The automated-coverage figure — never a single number](#the-automated-coverage-figure--never-a-single-number)
- [Claim scope](#claim-scope)
- [VPAT / ACR and EN 301 549](#vpat--acr-and-en-301-549)
- [Overlays: settled, not contested](#overlays-settled-not-contested)
- [Validation](#validation)
- [Failure modes and handoff](#failure-modes-and-handoff)

## A scan is not conformance

WCAG 2.2 (W3C Recommendation, 12 December 2024, w3.org/TR/WCAG22, re-verify before citing a later
version) states **five conformance requirements**, verbatim:

1. **Conformance Level** — "Three levels of conformance are defined: A (lowest), AA, and AAA
   (highest)."
2. **Full Pages** — "Conformance is defined for full pages." A page does not conform by fixing part
   of itself.
3. **Complete Processes** — "When a process involves multiple web pages, all pages in the process
   conform at the specified level." A checkout flow is not conformant because three of its five
   steps are.
4. **Accessibility Support** — technologies must be used in ways "supported by users' assistive
   technologies as well as the accessibility features in browsers and other user agents."
5. **Non-Interference** — non-supported technology may be present only if it does not block access
   to the rest of the page.

An automated scan is at best partial evidence toward requirement 4 (and only the portion of it a
tool can evaluate) and says **nothing** about 2, 3, or 5. A green scan on one page state is not
evidence about the process the page belongs to, and I4 (evidence may not be extended past what it
covers) applies directly: never infer process-level or site-level conformance from a page-level
pass. This is the single best-sourced instance in any standard of "a passing check certifies only
the propositions someone encoded" (I2).

Conforming alternate versions remain a permitted route to conformance and should be recorded as a
distinct claim, not folded into the primary page's status.

## The machine-testable boundary

Four independently built tools invented the same third bucket — not pass/fail, but "cannot decide,
a human must look":

| Tool | Third state | Verbatim / structure |
|---|---|---|
| axe-core | `incomplete` ("needs review") | "results were aborted and require further testing... could neither be determined to definitively pass or definitively fail" |
| IBM Equal Access | `POTENTIAL` / `MANUAL` | `eRuleConfidence { PASS, FAIL, POTENTIAL, MANUAL }` |
| ACT Rules (W3C EARL) | `semiAuto` | formal three-valued test mode: `automatic` / `manual` / `semiAuto` |
| ZAP (adjacent domain) | reserved confidence values | `CONFIDENCE_FALSE_POSITIVE`/`CONFIDENCE_USER_CONFIRMED` exist only for a human to write in |

**Concretely: 58 of axe-core's 105 documented rules (55%) can return `incomplete`** — a majority of
the rule surface, including high-traffic rules like `color-contrast`, `image-alt`, `link-name`, and
`heading-order` (verified 2026-07-26; re-check against current axe-core docs before citing a
different total rule count). A scan that "passes" on one of these rules routinely means the tool
could not decide, not that the page is fine.

ACT Rules formalize the same asymmetry per Success Criterion, e.g. (verbatim structure):

```yaml
wcag20:4.1.2:
  forConformance: true
  failed: not satisfied
  passed: further testing needed
  inapplicable: further testing needed
```

**Only `failed` is a definitive verdict.** A passing or inapplicable automated result yields
"further testing needed," never conformance — in the standards body's own vocabulary, not an
inference this skill is adding.

The boundary sorts predictably by SC type, not randomly:
- **Structural/syntactic** (ARIA validity, required attributes, markup presence) — heavily
  automatable; 4.1.2 Name/Role/Value is the most rule-dense SC in both axe and ACT.
- **Content-quality** (1.1.1 alt-text *appropriateness*, 2.4.4 Link Purpose, 2.4.6 Headings and
  Labels, 3.3.2 Labels or Instructions) — presence is checkable, quality is not.
- **Human-only** — 2.4.3 Focus Order has no rule in axe or ACT at all; the absence of a rule is
  itself the evidence that "logical order" is a semantic judgment with no fixed correct answer.
  1.2.x caption *accuracy/synchronization* is likewise not machine-verifiable today.

## Impact levels are not conformance levels

axe-core assigns four impact levels — Minor, Moderate, Serious, Critical — and disclaims them
itself: "the actual impact for the user could be lower; in some instances, it could be higher... we
encourage users of tools to evaluate each individual issue." **Impact and WCAG level are orthogonal
axes, routinely conflated.** axe's own rule table falsifies any mapping: `color-contrast` is WCAG
**AA** but impact **Serious**; `image-alt` is WCAG **A** but impact **Critical**. "This is a Level A
issue, therefore low severity" is an unsupported inference — treat impact as a triage signal for
remediation order, never as a conformance statement.

## The automated-coverage figure — never a single number

This figure ships as a **range split by source type, never a single percentage** (controller
ruling; do not collapse it):

| Source | Figure | Type |
|---|---|---|
| Deque (sells axe), 2021 study, 2,000+ audits / 13,000+ pages / ~300,000 issues | **57%** | Vendor self-report about its own tool |
| WebAIM | ~30% of real WCAG failures | Independent |
| W3C/WAI | ~20–30% of Success Criteria fully automatable | Independent, standards body |
| US GSA Section 508 Program | "1 in 3" (~33%) | Independent, government |

**Ship 20–57%, vendor vs. independent split stated on its face. A newer Deque claim of 57.38%
automated / 80.39% "combined" figure is UNCONFIRMED — the primary report did not resolve for
re-verification; do not cite it.** Re-verify both bands before use — this is a volatile, contested
figure, not a settled constant, and no single number should ever be presented as "the" automation
coverage rate.

Note methodology, not just the number: Deque's 57% measures share of *issues found in the wild*
covered by automation; the ~20–30% independent figures measure share of *Success Criteria*
automatable. These are different denominators — cite the methodology alongside the number, or
neither.

**The meta-point matters more than the figure: the measurement of how much a tool can detect is
itself contested, and the party with a commercial interest in "tools are sufficient" reports the
highest number.** Treat this as the general rule for any coverage claim, not an accessibility
quirk — check who produced a number and what they sell before citing it (I12).

## Claim scope

A conformance claim is a compound statement, not a single boolean. State each dimension explicitly
before asserting or accepting a claim:

| Dimension | Must state |
|---|---|
| Level | A, AA, or AAA — never bare "accessible" |
| Version | WCAG 2.2 (12 Dec 2024) unless a specific reason to claim 2.1; 2.2 removed 4.1.1 Parsing and added 9 new SCs, so a 2.1 claim on a 2.2-built product needs a stated reason |
| Scope | Named full pages or named complete processes — a partial-page or partial-flow claim is not a WCAG claim |
| AT support | Which assistive technologies and browsers were actually used, not "should work" |
| Evidence class | `observed` (real AT testing performed) vs `inferred` (scan only) per requirement — never report the weaker as the stronger (I3) |

A claim missing any dimension is incomplete, not conservative — silent omission is not permitted
(I5); state what was not evaluated as explicitly as what was.

## VPAT / ACR and EN 301 549

**VPAT** (Voluntary Product Accessibility Template, itic.org/policy/accessibility/vpat) has four
current editions: **2.5 508**, **2.5 EU** (EN 301 549), **2.5 WCAG**, **2.5 INT**. The load-bearing
distinction, verbatim: **"A version of the VPAT which has been completed for a specific product is
an ACR"** (Accessibility Conformance Report). The blank template is not evidence; a completed ACR
is — and even then it is evidence of a **vendor's own claim**, not third-party verification. State
which it is when handing one to a decision-maker.

Conformance vocabulary confirmed in the template: **"Supports; Partially Supports; Does Not
Support; Not Applicable."** `[UNVERIFIED]` — a commonly-expected fifth term, "Not Evaluated," did
not appear on the fetched page as of 2026-07-26; check the VPAT 2.5 template itself before quoting
it as a defined term.

**EN 301 549** (V3.2.1, March 2021) is WCAG 2.1 AA-aligned and broader than WCAG — it also covers
non-web software, documents, hardware, and telecoms. `[UNVERIFIED — secondary sources only]` a
V4.1.x aligning to WCAG 2.2 is expected in 2026; the **European Accessibility Act** enforcement
dates (begins 28 June 2025, full compliance 28 June 2030) are from secondary legal commentary, not
the primary EUR-Lex text. Re-verify both before treating as current in a regulated claim, and route
statutory audit-evidence and retention requirements to `surface-regulated.md`.

## Overlays: settled, not contested

This is not a live two-sided debate — treat it as decided, and do not manufacture false balance.
Evidence, as of 2026-07-26:

- A signed practitioner factsheet with **600+ named signatories**, including WCAG/ARIA/HTML spec
  contributors and JAWS/NVDA contributors (originated by Karl Groves).
- A WebAIM practitioner survey: **67%** of respondents, and **72% of respondents with
  disabilities**, rate overlay tools "not at all" or "not very" effective; only 2.4% rate them very
  effective.
- **Direct measurement of an overlay increasing detected violations** on the same page (axe 4→12,
  ARC 19→38 in the cited comparison) — the fix made the automated evidence worse, not better.
- WebAIM's own WAVE tool states publicly that accessiBe and UserWay overlays "may manipulate page
  content to suppress detection of accessibility errors."
- A SLAPP suit by an overlay vendor (AudioEye) against a named practitioner critic (Adrian
  Roselli), **dropped 2024-01-03**.

**This is a distinct abuse case from a tool that attacks its own pipeline: here the system under
test is altered to defeat the measuring instrument.** General form, applicable past accessibility:
**an instrument pointed at an adversarial subject measures the adversary's response to the
instrument, not the property you wanted.** Do not accept an overlay's own compliance dashboard as
evidence; if an overlay is in scope, verify with an instrument the vendor does not control.

## Validation

- [ ] Every claim states level, version, scope (pages/processes named), AT support, and evidence
      class per requirement — no dimension silently omitted.
- [ ] No coverage figure appears as a single number; the 20–57% split is present with source types
      when automation coverage is discussed.
- [ ] No claim infers process- or site-level conformance from a page-level scan result.
- [ ] Impact levels (axe Minor–Critical) are never reported as WCAG conformance levels (A–AAA).
- [ ] If an overlay is part of the remediation, its own dashboard is not the sole evidence.

## Failure modes and handoff

- **Reporting "0 violations found" as "the page is accessible"** — restate as: automated rules
  passed or were inapplicable; N rules returned `incomplete`; manual/AT verification status is
  [performed/not performed]. Hand the residual `not_tested` items to `release-gate-and-claims.md`
  as recorded residual risk, not a silent pass.
- **A claim scope smaller than what is being asserted publicly** — e.g., one template page tested,
  "WCAG AA compliant" claimed site-wide. Stop and require the claim to match the tested scope, or
  require more testing before the claim ships.
- **Statutory obligation detected mid-review** (EN 301 549, ADA, EAA) — route to
  `surface-regulated.md` for audit-evidence retention and re-verification cadence; this file does
  not own legal sign-off.
- Hand named-oracle and evidence-state bookkeeping to `oracles-and-evidence.md`; hand the
  ship/claim decision and residual-risk expiry to `release-gate-and-claims.md`.
