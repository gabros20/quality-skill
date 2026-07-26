# The `[quality]` slice of the decommissioned `webdesign` skill

## 1. What this is

This is the assurance-and-verification material extracted from the old `webdesign` skill
(`/Users/tamas/Documents/Personal/Projects/webdesign/skills/webdesign/` — `SKILL.md` + 22 reference
files, 3,993 lines of references + 115 lines of SKILL.md). A previous destructuring pass produced
`research/product/webdesign-extraction.md`, but that pass had only four destination tags —
`[product]`, `[design]`, `[frontend]`, `[cross]`. **`[quality]` did not exist as a destination at the
time**, so QA-flavored material was either force-fitted into one of those four or judged low-value
and never lifted. This document is the slice that pass could not produce: everything the old skill
knew about *judging whether a built thing is good, independently, and deciding whether to ship it* —
as opposed to how to make it good, which stays with `design` and `frontend`. Every item is verbatim
with a `file:line` reference into the source, which is about to be deleted.

The governing distinction throughout: **`quality` does not own making things good. It owns judging
them, independently, and gating the release.** "Here is how to build X" is not ours. "Here is how to
review / score / reject / gate / verify X" is.

### Nothing was lost — this corpus is a re-tag, not a rescue

State this plainly up front, because it changes how the document should be read. The risk this
channel existed to guard against — quality material lost forever when the old skill is deleted —
**did not materialise.** An independent exhaustive re-read of the source (pass W2) checked every
quality-flavored candidate against the prior four-tag extraction and found **28 items, 0 of them
net-new**: the original pass had already lifted every one of them verbatim. It simply had no
`[quality]` bucket to route them into, so they sit under `[design]`, `[frontend]`, `[cross]`, and
`[product]` tags that misdescribe them.

So the value of this document is **re-tagging plus quality-specific framing** — the why-quality
argument, the ownership seam, and the ranking — not net-new recovery. Two caveats on the strength of
that proof: W2's cross-check was by exact-string match, which can miss a block the earlier pass
lifted with different whitespace or truncation; and the completeness claim covers the *prior
extraction's* coverage, not this document's, since a handful of items here (the `SKILL.md` scope
boundary, `agents/openai.yaml`) were lifted for boundary evidence rather than as technique content.
Treat it as strong evidence, not a formal guarantee.

### Two independent passes converged on the same conclusion about `art-review.md`

Worth recording as a methodological result rather than a coincidence. The lead's direct full read and
W1's re-tag pass — which did not see each other's work — independently concluded that
`art-review.md` **is a quality-audit specification wearing design-review clothing**: it carries a
severity scale, a verdict state machine, a mandatory-first-revision rule, round-convergence and cap
discipline, an evidence-capture contract, and a machine-readable review-record schema. None of that
is design craft. The convergence is the main reason to trust the recommendation to lift the whole
machinery rather than cherry-pick the severity scale.

The single most important discovery of this pass: the old skill ran **two parallel severity systems**
(A0–A3 for design/art-direction, P0–P3 for functional/usability correctness) and said so explicitly.
It also carried a set of anti-rubber-stamp mechanisms — a mandatory first-revision rule, a convergence
cap, an evidence-integrity rule, and the line "a green build proves the code compiles, not that the
page looks right" — that together form a coherent doctrine of *not trusting the builder's own claim
that something is done*. That doctrine is the real prize here, and it generalizes far beyond web.

---

## 2. The headline transfers

Ranked by value to the new `quality` skill. Each with the argument for why it is assurance material
and not craft material.

**1. The go/no-go gate rule** — `design-critique.md:117-118`
> **Any P0, or a P1 you can't immediately fix, is a NO-GO** — don't round up a broken core flow to "ready" because the visual polish is otherwise good.

A named, unambiguous ship decision rule *plus* a named failure mode it exists to prevent
(rounding up). This is the most directly transferable artifact in the entire skill; it is a gate and
nothing but a gate.

**2. The A0–A3 design-severity scale** — `art-review.md:137-153`
A four-point scale where A0/A1 **block** and A2/A3 are advisory, with an explicit note that it is "a
distinct severity track from a functional/correctness QA pass." Assurance, not craft: it is a routing
function from *observation* to *ship consequence*. The fact that the old skill deliberately ran two
severity tracks side by side is itself a design insight `quality` should inherit.

**3. The P0–P3 functional-severity scale** — `design-critique.md:74-82`
Routed "by impact, not by how easy it is to fix," with the P1 test **"would a real user contact
support over this?"** A triage rubric with a memorable, checkable boundary test between severities —
rare and worth keeping verbatim.

**4. The anti-rubber-stamp mechanism: the no-first-pass rule PAIRED WITH convergence discipline** —
`art-review.md:167-182` + `art-review.md:184-195`

This is a single transfer, not two, and it is the most distinctive thing in the corpus. Treat the
pairing as load-bearing.

- **The forcing half** (`:167-182`): round 1 may never be a sign-off. If the reviewer genuinely
  finds no A0/A1, they must **promote the 1–3 highest-value A2 refinements into the blocking list**,
  flagged as promoted, so the builder makes one real polish pass. This "guarantees at least one
  build→review→**fix**→review cycle."
- **The terminating half** (`:184-195`): from round 2, approve the moment A0/A1 are clear even if
  A2/A3 remain; round-over-round **only escalate** — introducing new low-value nitpicks you let pass
  earlier "is thrash"; and **cap the loop** at a hard round limit (default 3), proceeding anyway with
  findings recorded if the cap is hit.

**Why the pairing is the point.** A technique pack never owns this; an assurance skill can. The
forcing half alone is a hazing ritual — it manufactures a revision round with no bound on how many
follow. The terminating half alone is toothless — it optimises for closing the review, which is
exactly the rubber-stamp failure. Together they form a mechanism with a **built-in termination
guarantee**: at least one real fix, at most N rounds, with monotonic severity so the bar cannot
ratchet upward mid-loop. That is a genuinely rare construction — most review doctrines specify a
standard and leave convergence to goodwill. The source even flags its own intent, heading the second
half "*this is what keeps the loop safe — not 'crazy picky'*."

**5. "A green build proves the code compiles, not that the page looks right."** — `frontend-build-patterns.md:282`
The canonical anti-false-confidence line of the whole skill. One sentence that states why an
independent verification layer must exist at all. This belongs at the top of the `quality` skill.

**6. Evidence integrity — the honest-degrade rule (the family's anti-hallucination invariant)** — `art-review.md:79-81`
> **No browser at all → degrade honestly.** Review markup/CSS/tokens against the direction and label the result explicitly: *"code-level pass — not an art review; no build was viewed."* Never present an unviewed review as a viewed one.

Restated as a completion obligation at `SKILL.md:102-103`: "state which rendered evidence was
actually inspected; never imply screenshot review when only code was available."

**Generalize this past the browser case.** Stripped of its web specifics, the rule is: *an audit
report must state the evidence class it actually rests on, and a weaker evidence class may never be
reported in the vocabulary of a stronger one.* The browser/no-browser split is one instance; the same
invariant covers reviewing a test suite you did not run, a migration you did not execute against real
data, a benchmark you did not measure, an API you recalled rather than read. This is the digital-
product family's **anti-hallucination invariant stated in QA terms** — it converts "don't make things
up" from an exhortation into a reporting obligation with a named label to attach. Its natural
companion in the corpus is Q61 ("verify the API, don't recall it", `design-direction.md:41-43`),
which is the same invariant applied at authoring time rather than review time.

**7. The two-assessment audit method + weave synthesis** — `design-critique.md:34-90`
Judgment (Nielsen heuristics scored 0–4, /40) paired with deterministic mechanical checks, then a
**synthesis that names where the two agree (high confidence), where the detector caught what the eye
missed and vice-versa, and any false positives.** A genuine dual-track audit method with an explicit
reconciliation step — most review rubrics skip the reconciliation.

**8. Honesty calibration against grade inflation** — `design-critique.md:43-45`
> **Honesty calibration:** most real, shipped interfaces score **20–32 / 40**. A 38 means you aren't looking hard enough.

A calibration control aimed at *the auditor*, not the artifact. Pure assurance metacognition, and
directly reusable for any scored rubric the new skill defines.

**9. The `lint` QA gate and the `diff` regression gate** — `design-direction.md:107-114`
A spec file that is *lintable* (9 named rules with error/warn/info severities, including a
`contrast-ratio` rule at <4.5:1) and *diffable* with **"nonzero exit on regression. Gate design
iterations."** This is machine-checkable gating with a real severity taxonomy — the closest thing in
the corpus to CI-grade assurance.

**10. Coverage as a blocker** — `design-critique.md:98-102`
Anything the design or content plan calls for but that never renders is "a load-bearing gap, not a
cosmetic one: treat any such gap as a **blocker** (P0/NO-GO), not a polish item." A release-readiness
completeness check with an explicit anti-minimization instruction.

**11. The reviewer's deliverable is the punch-list, not the fix** — `art-review.md:229-231`
Role separation between judge and builder, held "even if the same person plays both at different
times." The independence principle, stated plainly.

---

## 3. Full verbatim item catalog

### Theme A — Review gates & go/no-go decisions

**Q1. The go/no-go gate (full section)** — `design-critique.md:92-118` · quality-only
> ## Running this as a go/no-go QA gate
>
> When this rubric is the final check before a build ships (not just self-critique while building),
> add two mechanical layers underneath the judgment above, and let them gate the ship decision
> directly:
>
> - **Coverage.** Confirm every component/section the design or content plan calls for is actually
>   wired up and rendering — not silently missing or falling back to a blank/placeholder state. A
>   design system, template, or content model that defines a piece but never renders it is a
>   load-bearing gap, not a cosmetic one: treat any such gap as a **blocker** (P0/NO-GO), not a
>   polish item.
> - **Build health.** The build/typecheck/lint pipeline passes clean, and — if a design-system spec
>   like `DESIGN.md` backs the project — it still lints clean (see
>   [design-direction.md](design-direction.md)) with no broken token references.
> - **Look at the real thing, don't just build it.** Drive a real browser and screenshot *every*
>   route/page at both a desktop viewport (e.g. 1440×900) and a mobile device viewport (e.g. an
>   iPhone-class width), then read the screenshots. Route real layout/visual defects — overflow or
>   clipping, header overlap, broken or placeholder media, unusable mobile navigation, unwanted
>   horizontal scroll, low contrast — into the P0–P3 severity system above. A screenshot-only review
>   (never actually looking at rendered output) misses exactly the defects that matter most to a
>   real visitor.
>
> Fold the coverage and build-health findings into the same P0–P3 list rather than keeping them as a
> separate checklist — a broken build or a missing section is exactly the kind of P0 that should
> block a ship decision alongside a usability P0 found by eye. **Any P0, or a P1 you can't
> immediately fix, is a NO-GO** — don't round up a broken core flow to "ready" because the visual
> polish is otherwise good.

**Q2. The verdict decision + `revise` / `approve` definitions** — `art-review.md:155-165` · quality-only
> ### 4. Synthesize the hand-off + verdict
>
> After the walk, write up a structured hand-off (shape below). The **verdict**:
>
> - **`revise`** when any A0/A1 remains. List those as **specific, addressable instructions** the
>   builder can act on without you present — name the page, the section, what's wrong, and the
>   concrete fix ("hero is centered with two buttons; recompose as an asymmetric 5:7 split, text
>   flush-left, per the design direction's editorial register"). A2/A3 go in a separate notes list
>   (worth taking, don't gate).
> - **`approve`** when there are **zero A0 and zero A1** findings — the build honors the direction —
>   **and this is not the first review round** (see the no-first-pass rule below).

**Q3. The no-first-pass-sign-off rule** — `art-review.md:167-182` · quality-only
> ### The no-first-pass-sign-off rule (round 1 always sends something back)
>
> **Round 1 must never be a sign-off.** A first look almost always has *something* worth fixing, and
> a too-easy round-1 approval is exactly the failure this discipline exists to prevent. So on
> **round 1**:
>
> - If you found any A0/A1 → `revise` as normal.
> - If you genuinely found **no** A0/A1 → you still return **`revise`**, and **promote the 1–3
>   highest-value refinements** (your best A2 items — the icon/text/alignment/detail improvements
>   that would most lift the build) into the blocking list so the builder makes **one real polish
>   pass**. Mark each promoted item as gating this round (elevate it to A1 for routing purposes) and
>   flag it as promoted, and say in the summary that these are promoted round-1 polish items, not
>   direction violations.
>
> This guarantees at least one build→review→**fix**→review cycle. From **round 2 onward** the normal
> rule applies: `approve` the moment A0/A1 are clear.

**Q4. Acceptance clause for the review artifact itself** — `art-review.md:220-225` · quality-only
> ## Acceptance
>
> The review record has an explicit `verdict`; on `revise`, every A0/A1 appears in the blocking list
> with a concrete fix. On `approve`, blocking is empty and `signed_off` is true. **Round 1's verdict
> is never `approve`** — it always carries at least one blocking item, whether a real A0/A1 or a
> promoted round-1 polish item.

**Q5. `design.md lint` as the QA gate / `diff` as the regression gate** — `design-direction.md:107-110` · shared with design
> | `design.md lint <file>` | Validate: resolves token refs, checks **WCAG contrast** (AA < 4.5:1 warns), structure. Emits JSON findings. **The QA gate.** |
> | `design.md export <file> --format <fmt>` | Export tokens. `json-tailwind` (Tailwind v3 config), `css-tailwind` (Tailwind v4 `@theme` CSS), `dtcg` (W3C `tokens.json`). **The bridge into the build.** |
> | `design.md diff <a> <b>` | Token + prose regression detection between versions; nonzero exit on regression. Gate design iterations. |

**Q6. Validate + iterate-diff steps** — `design-direction.md:180-187` · shared with design
> ### 4. Validate
>
> Run `design.md lint <file>`; fix every `broken-ref` (always) and resolve contrast warnings before
> handing the file to a build.
>
> ### 5. On iteration, diff
>
> `design.md diff <old> <new>` to catch regressions between direction iterations.

**Q7. The anti-boring checklist as a literal pass/fail gate** — `section-design-workflow.md:128-149` · shared with design
> ## The anti-boring checklist (run on every section before shipping)
>
> Section fails if you answer "no" to the top block or "yes" to the bottom block.
>
> **Must be YES:**
> - [ ] **Depth:** are there ≥2 visual planes, or at least one unifying texture/glow/shadow? (not one flat fill)
> - [ ] **One focal point:** squint — is it obvious what's #1? Exactly one element is biggest/boldest.
> - [ ] **Contrast move:** is there a real jump in scale OR weight OR color OR depth somewhere?
> - [ ] **One signature:** what's the one thing someone remembers here? (if "nothing" → recompose)
> - [ ] **Grayscale test:** hierarchy still reads with color removed? (proves it's not propped up by color)
> - [ ] **Spacing system:** gaps come from one scale (4/8px base); within-group gap < between-group gap.
> - [ ] **Quality floor:** responsive to mobile, visible keyboard focus, `prefers-reduced-motion` respected.
>
> **Must be NO (the "AI-slop" tells — any one is a hit):**
> - [ ] Centered-everything with even spacing throughout.
> - [ ] Three identical equal-width feature cards as the only idea.
> - [ ] Every section the same rhythm (centered text over a uniform card grid).
> - [ ] Weak heading↔body contrast; default Inter + indigo-600/slate-900; purple/gradient decoration for its own sake.
> - [ ] Emoji used as icons; predictable 01/02/03 markers on content that isn't actually a sequence.
> - [ ] More than two "bold moves" fighting in one section.

Routing note: the *gate mechanic* ("fails if… any one is a hit") is `quality`; the *contents* of the
bottom block are design taste. See §4 seam ruling S1.

**Q8. The critique gate named in the core workflow** — `SKILL.md:40-41` · quality-only
> 5. **Art review:** inspect rendered evidence section by section and issue an A0-A3 punch list.
> 6. **Critique gate:** score usability and visual quality, route findings, and decide go/no-go.

---

### Theme B — Severity & priority scales

**Q9. The A0–A3 design-severity scale** — `art-review.md:137-153` · quality-only
> ### 3. Score severities — A0–A3
>
> Route each finding by how much it hurts the *design* (this is a distinct severity track from a
> functional/correctness QA pass — see [design-critique.md](design-critique.md) for that one):
>
> - **A0 — direction violation.** Off-direction palette/type/register, a clear anti-default-catalog
>   tell, broken hierarchy. **Blocks** → drives a revision round.
> - **A1 — composition/rhythm failure OR a real detail defect.** Centered-everything, uniform
>   repeated card grids, identical section rhythm, no signature section on the page — **and** the
>   detail-level flaws that read as unfinished: an **icon misused / wrong-for-meaning / awkwardly
>   positioned / mismatched in size or style**, **text that overflows, clips, collides, or breaks
>   into awkward orphans**, **visibly misaligned elements** (things that should share an edge/
>   baseline but don't). **Blocks.** (Judge severity by how obvious it is — a clearly awkward icon or
>   broken text wrap is A1; a 2px nudge is A2.)
> - **A2 — refinement.** Sub-perceptual spacing/alignment/measure/motion-tuning that would lift it
>   but isn't *noticeably* wrong. Advisory — fix if cheap, never blocks.
> - **A3 — delight.** Optional polish. Advisory.

**Q10. The P0–P3 severity routing scale** — `design-critique.md:74-82` · quality-only
> ## Severity routing (P0–P3)
>
> Route every finding by impact, not by how easy it is to fix:
>
> - **P0** — blocks the core task or excludes a user (unusable control, contrast failure on a
>   primary action, keyboard trap).
> - **P1** — the test: **"would a real user contact support over this?"** If yes, it's at least P1.
> - **P2** — friction or inconsistency that slows people but has a workaround.
> - **P3** — polish, delight, refinement.

**Q11. The 9-rule lint severity taxonomy** — `design-direction.md:111-114` · shared with design
> **Lint rules** (9): `broken-ref` (error) · `missing-primary` (warn) · `contrast-ratio` (warn,
> <4.5:1) · `orphaned-tokens` (warn) · `token-summary` (info) · `missing-sections` (info) ·
> `missing-typography` (warn) · `section-order` (warn) · `unknown-key` (warn — typo detection, e.g.
> `colours:` → `colors:`).

**Q12. Content drift as a top-severity finding** — `art-review.md:32-34` · quality-only
> If the project preserves existing copy as SEO-sensitive IP, also flag any section whose copy the
> build **altered** from the source/blueprint as a top-severity finding — content drift isn't a
> design nitpick when the copy itself must be preserved.

**Q13. Structural error/warning severities in the DESIGN.md format** — `design-direction.md:89-93` · shared with design
> All optional, but present sections **must appear in this order** (out-of-order → `section-order`
> warning; duplicate heading → hard error). All `##`:
>
> `Overview` (brand/personality/audience) · `Colors` · `Typography` · `Layout` · `Elevation & Depth`
> · `Shapes` · `Components` · `Do's and Don'ts`.

---

### Theme C — Audit checklists, acceptance criteria & defect reports

**Q14. The structured review-record schema** — `art-review.md:197-218` · quality-only
> ## Output shape
>
> A structured review record per round:
>
> ```ts
> {
>   round: number,                       // 1-based
>   verdict: "approve" | "revise",
>   summary: string,                     // one paragraph: does the build read as the direction? top issues.
>   per_section: Array<{
>     location: string,                  // page/route + section identifier
>     direction_fidelity: "on" | "drifted" | "off",
>     findings: Array<{ severity: "A0"|"A1"|"A2"|"A3", issue: string, fix: string }>
>   }>,
>   blocking: Array<{ location: string, severity: "A0"|"A1", issue: string, fix: string,
>                     promoted?: boolean }>,   // promoted:true = a round-1 A2 raised to gate the mandatory first polish pass
>   notes: Array<{ location: string, severity: "A2"|"A3", issue: string, fix: string }>,
>   signed_off: boolean                  // true only on verdict "approve"
> }
> ```
>
> Plus a running per-section notes document (the human-readable trail from step 2).

**Q15. Assessment A — Nielsen heuristics scored, with honesty calibration** — `design-critique.md:34-46` · quality-only
> ## Assessment A — heuristic + cognitive-load review
>
> ### 1. Nielsen's 10 usability heuristics, scored 0–4 each (/40)
>
> Score each heuristic 0 (broken) → 4 (exemplary): visibility of system status · match to the real
> world · user control & freedom (undo/redo, escape hatches) · consistency & standards · error
> prevention · recognition over recall · flexibility & efficiency · aesthetic & minimalist design ·
> help users recognize/diagnose/recover from errors · help & documentation.
>
> **Honesty calibration:** most real, shipped interfaces score **20–32 / 40**. A 38 means you aren't
> looking hard enough. Report the per-heuristic scores, not just the total, and name the lowest two
> as the focus.

**Q16. Assessment B — mechanical checks** — `design-critique.md:66-72` · quality-only
> ## Assessment B — mechanical checks
>
> Pair the judgment above with deterministic checks the eye misses: contrast ratios (AA ≥ 4.5:1 body
> / 3:1 large), text never clipped or overflowing its container, no skipped heading levels, tap
> targets ≥ 44px, line length ~45–75ch, design-system tokens actually used (no off-scale one-off
> colors / radii / fonts). Check by hand or with the build's lint/a11y tooling; if you have an
> automated contrast/a11y detector available, run it and treat this as the pass it automates.

**Q17. Synthesis — weaving the two assessments** — `design-critique.md:84-90` · quality-only
> ## Synthesis
>
> Don't just list findings — **weave** the two assessments: note where judgment and mechanical
> checks agree (high confidence), where the detector flagged something the review missed (and
> vice-versa), and call out any false positives. Close with a **peak-end read**: what's the emotional
> high point of the flow, and what's the last thing the user feels? Those two moments
> disproportionately shape how the whole experience is remembered.

**Q18. Five test personas (coverage model for walking a flow)** — `design-critique.md:59-64` · quality-only
> ### 3. Five test personas
>
> Walk the key flow as each: **power user** (is it fast, keyboardable?), **first-timer** (is the
> next step obvious?), **accessibility user** (focus order, contrast, labels, reduced motion),
> **stress-tester** (long strings, empty/overflow/error states), **distracted-mobile** (one thumb,
> sunlight, half-attention).

**Q19. Frontend build acceptance checklist** — `frontend-build-patterns.md:320-330` · shared with frontend
> ## Acceptance checklist
>
> - A client component exists for every section key in the catalog; the section-map registry covers
>   all of them with no gaps, and fails loud (not silently) on a miss.
> - The build is green **and** desktop + mobile screenshots show no unresolved layout/visual defect
>   (residuals explicitly noted, not silently ignored).
> - Routes match the target sitemap; unresolved media falls back to a placeholder (logged, never
>   silent); every kept nav/footer link resolves to either a real built page or the "not part of the
>   demo" fallback — no kept link ever 404s.
> - If routes were restructured, every entry in the redirect map is implemented and returns a
>   permanent redirect — no legacy URL 404s.

**Q20. The refinement-pass checklist (run before shipping a section)** — `design-thinking.md:93-101` · shared with design
> ## B5. Refinement pass checklist (run before shipping a section)
> - **Squint test** — hierarchy survives blur? Primary action still obvious?
> - **Grayscale test** — works with color removed? (proves hierarchy isn't propped up by color alone)
> - **Alignment audit** — count left edges; collapse strays to the grid.
> - **Spacing audit** — within-group gaps < between-group gaps, consistently; values from one scale (4/8px base).
> - **Type audit** — ≤3 sizes, ≤2 families, body line length 45–75ch; headings on the scale.
> - **Color audit** — one accent, used once for the primary action; WCAG AA contrast (4.5:1 text).
> - **Remove-one test** — can any element be deleted without loss? If yes, delete it and add space.
> - **Consistency** — radii, shadows, button styles, icon weight all from one token set.

**Q21. The critique framework — separating taste from function** — `design-thinking.md:103-114` · shared with design
> ## B6. Critique framework (how to judge it — and give feedback)
> - **Separate taste from function.** Ban "I like / I don't like." Anchor every note to a goal: user task,
>   hierarchy, readability, conversion, accessibility, brand. "The CTA loses to the image because it has
>   less contrast" beats "the button feels off."
> - **Structure feedback** with *I like / I wish / What if* — what works, a constructive gap, an
>   exploratory option.
> - **Dimensions to score** (usable rubric): hierarchy & focal point · spacing & rhythm consistency ·
>   alignment/grid discipline · type system · color discipline (accent rationing + contrast) · whitespace ·
>   the one bold move (memorability) · motion purposefulness · accessibility (contrast, reduced-motion,
>   focus states) · reads intentional vs templated.
> - **Order:** section job → hierarchy → system consistency → polish. Don't critique a gradient before the
>   reading order is right.

**Q22. Design-direction acceptance criterion** — `design-direction.md:189-193` · shared with design
> ## Acceptance criterion
>
> `design.md lint` passes with **no `broken-ref` errors**; the `DESIGN.md` covers at least `colors`
> and `typography`, carries a Do's-and-Don'ts section, and no choice matches an unexamined entry in
> [anti-default-catalog.md](anti-default-catalog.md).

**Q23. Section-catalog acceptance checklist** — `section-archetypes.md:154-165` · shared with product
> ## Acceptance checklist
>
> - Every section key in the catalog is unique.
> - Every field's type is one of the fixed content-type vocabulary.
> - Every repeatable section is marked as a collection candidate; every shared-value section is
>   marked global.
> - Every slider/carousel/accordion/tabs section carries its `interactive` marker.
> - The sitemap references only catalog section keys and includes the home route.
> - Every internal route referenced by a page resolves to a sitemap page **or** is a kept
>   nav/footer link that the frontend sends to the "not part of the demo" fallback — links are
>   never pruned down to the built set.
> - The navigation's logo field is set whenever a logo was actually captured/available.

**Q24. Theme author+build checklist** — `tailwind-v4-theme.md:130-140` · shared with frontend
> ## 5. Checklist (author + build)
>
> - [ ] No t-shirt `--spacing-*` keys reach the generated theme (spacing as base + numeric, or
>       non-reserved names).
> - [ ] `--container-*` defined → `max-w-*` resolves to real widths (no `max-w-[42rem]` magic
>       numbers).
> - [ ] Every DESIGN.md prose section with visual weight maps to a namespace: *Elevation & Depth* →
>       shadows, *Motion* → ease/animate, *Layout* → container/aspect.
> - [ ] Font families bound to the loaded font faces.
> - [ ] `design.md lint` clean; the built `@theme` is the export **plus** the companion (full
>       coverage).

**Q25. The per-section walk — write the finding as you go** — `art-review.md:94-100` · quality-only
> ### 2. Walk the sections ONE BY ONE — write a finding as you go
>
> Go down the manifest in order. For **each** section: look at it, then **immediately write a short
> finding for it** into a running notes document before moving to the next. Don't batch the whole
> page and judge it at the end — typing each observation as you see it keeps every per-section
> judgment available, so when you synthesize the final hand-off nothing gets lost to a fading first
> impression.

**Q26. The per-section audit question set** — `art-review.md:110-135` · shared with design
> For each section ask:
>
> - **Direction fidelity** — palette/type/register match the design direction? Or drifted to a
>   default (cream+serif+terracotta, near-black+acid-accent, generic broadsheet — see
>   [anti-default-catalog.md](anti-default-catalog.md))?
> - **Composition** — asymmetry & tension, or centered-everything? Intentional grid use, or a
>   uniform card grid? Real type hierarchy (display↔body jump), or flat?
> - **Rhythm** — does this section's density differ from its neighbors, or is every section the same
>   height/padding?
> - **Iconography** *(inspect every icon)* — is each icon the **right symbol for its meaning** (not
>   a vaguely-related or generic glyph)? One **consistent set/style/weight** across the section (not
>   mixed outline+solid, not mismatched sizes)? **Optically centered & aligned** in its container and
>   on a shared baseline/axis with its label (not floating, off-center, clipped, oversized, or
>   crammed against text)? No **emoji-as-icons** and no **hand-rolled inline icon SVG** when a real
>   icon library was available and a meaning→icon mapping exists — a wrong-for-meaning, hand-drawn,
>   mis-sized, or mixed-weight icon is a real defect, not a nitpick.
> - **Micro-typography & element detail** — **awkward line breaks / orphans / widows**, text that
>   **overflows, clips, or collides** with a neighbor, cramped or uneven padding, headings that wrap
>   badly, **misaligned elements** (things that should share an edge/baseline but don't),
>   inconsistent gaps, off-center content, buttons with lopsided label padding. The small
>   alignment/spacing/wrapping flaws that make a build feel unfinished.
> - **Anti-slop tells** — rounded-2xl+shadow cards, gradient text, emoji icons, purple/indigo, a
>   predictable 3-col icon-title-blurb, weak contrast (full catalog:
>   [anti-default-catalog.md](anti-default-catalog.md)).
> - **Desktop ↔ mobile** — does the composition hold on mobile, or collapse to a generic stack? Do
>   icons and text keep their alignment on mobile, or do labels wrap and icons drift?

**Q27. What the review judges against** — `art-review.md:36-50` · shared with design
> ## What you judge against
>
> 1. **The project's `DESIGN.md`** (or equivalent design-direction document) — the contract that was
>    written. Palette, type pairing, register per-surface, the signature element. Does the build read
>    as this direction, or did it drift to a default?
> 2. **The original source design signals**, when the brief is "new look, same brand" — the source
>    look the build should still evoke.
> 3. **Any project-specific design-system doctrine** the build was supposed to follow — an anti-slop
>    checklist, editorial principles, an "art-direct the page" rule set. Absent a project-specific
>    doctrine, use [anti-default-catalog.md](anti-default-catalog.md) and
>    [frontend-design-principles.md](frontend-design-principles.md) as the bar, including the
>    **signature-section rule**: every page needs at least one bespoke composition, not just a
>    catalog assembly of generic sections.
> 4. Your own design taste, informed by the anti-default catalog and the "spend your boldness in one
>    place" discipline (see [frontend-design-principles.md](frontend-design-principles.md#restraint-and-self-critique)).

**Q28. Purpose/Read-when/Skip-when/Produces contract for a review reference** — `art-review.md:1-15` and `design-critique.md:1-15` · quality-only
> # Art-direction review — judging a build against its design direction
>
> Purpose: Judge a rendered build against its approved visual direction and return an actionable punch list or sign-off.
>
> Read when:
> - A page is implemented and rendered evidence can be compared with DESIGN.md or another approved direction.
>
> Skip when:
> - No rendered evidence exists and the request is only for code correctness.
>
> Inputs:
> - Approved direction, runnable build, relevant viewports, and captured renders.
>
> Produces:
> - Evidence-backed A0-A3 findings, revision instructions, or visual sign-off.

and

> # Design critique — a scored review rubric
>
> Purpose: Run a repeatable scored visual and usability review that produces a go or no-go decision.
>
> Read when:
> - The request asks for structured critique, severity routing, or a final visual QA gate.
>
> Skip when:
> - The request is an art-direction comparison against one approved design; use art-review instead.
>
> Inputs:
> - Rendered interface, target personas, constraints, and available mechanical checks.
>
> Produces:
> - Scored findings, severity, synthesis, and a go or no-go result.

Routing note: the *disambiguation between the two review types* (art-review vs critique) is a
`quality` routing concern — the new skill inherits the need to tell them apart.

---

### Theme D — Accessibility & contrast thresholds

**Q29. Contrast & accessibility, the non-negotiable floor** — `color-and-rhythm.md:88-91` · shared with design
> ## 6. Contrast & accessibility (non-negotiable floor)
> - Body text ≥ **4.5:1**, large text (≥18pt / 14pt bold) ≥ **3:1** (WCAG AA). Verify on *both* surfaces if
>   you alternate (§1) and on the *brightest* image area if text sits over a photo (`imagery.md §3`).
> - Never carry meaning by color alone (accent + an icon/label).

**Q30. Contrast over imagery** — `imagery.md:95` · shared with design
> pixels. **WCAG:** body ≥ 4.5:1, large text ≥ 3:1.

**Q31. Accessibility as a quality floor, itemized** — `frontend-build-patterns.md:351-357` · shared with frontend
> **Accessibility is not an afterthought** — bake it into the quality floor:
> - Real `alt` text that describes the content (`alt="Company"`, not `alt="Logo"`).
> - Links and buttons marked as such — **never `<div class=button>`**; in React use
>   `<button>`/`<a>`/`<Link>`.
> - Never rely on color alone to carry information.
> - Explicitly label every form control (`<label>` wrapping or `htmlFor`).
> - Visible keyboard focus; honor `prefers-reduced-motion`.

**Q32. The unannounced quality floor** — `frontend-design-principles.md:174-175` · shared with design
> Build to a quality floor without announcing it: responsive
> down to mobile, visible keyboard focus, reduced motion respected.

**Q33. Accessibility floor applies even to experimental work** — `experimental-and-creative.md:160-161` · shared with design
> - **Accessibility floor still applies.** Reduced-motion path, keyboard reachability, focus states, and no
>   meaning-by-motion-alone — even on the most experimental section.

**Q34. Tap-target minimum (Fitts's law)** — `persuasion-and-conversion.md:66` · shared with design
> - **Fitts's law** — big, near, easy targets: CTA ≈2× body size, ≥44×44px tap target, placed where the eye

**Q35. Contrast as both conversion and a11y floor** — `persuasion-and-conversion.md:125` · shared with design
> contrast against its surroundings (≥4.5:1, also the a11y floor); use color for hierarchy + brand

**Q36. Neumorphism fails WCAG contrast** — `depth-and-texture.md:191-192` · shared with design
> ## 8. NEUMORPHISM — know it, mostly avoid it
> - **Why dated:** dual light/dark inset-shadow "extruded plastic" (peaked ~2020) fails WCAG contrast

**Q37. Type hard limits and body contrast** — `typography.md:28-30` and `typography.md:128-132` · shared with design
> Type carries the personality of a section — make it a memorable element, not a neutral delivery vehicle.
> Each entry: **why → how → pitfall.** Hard limits that keep it from looking templated: **≤2 families,
> ≤3 sizes per section, body line length 45–75ch.**

and

> - **How:** body 16–18px; **line length 45–75ch** (`max-width: 65ch`); line-height ~1.5–1.65 for body,
>   tighter for headings; left-align long copy (never justify or center paragraphs); establish a vertical
>   track. Contrast ≥ 4.5:1 for body.

**Q38. Browser-zoom conformance (WCAG 1.4.4)** — `typography.md:52` · shared with frontend
> penalties), and respects browser zoom (mixing `rem` with `vw` satisfies WCAG 1.4.4).

**Q39. Watermark type must not reduce real-text contrast** — `typography.md:123-124` · shared with design
> - **Pitfall:** Keep opacity low (≤8%) or it competes with the foreground; ensure it never reduces contrast
>   of real text in front of it. `aria-hidden` it / use a pseudo-element so screen readers skip the decoration.

**Q40. Accessibility-user persona check** — `design-critique.md:62` (extract of Q18) · quality-only
> **accessibility user** (focus order, contrast, labels, reduced motion)

**Q41. Background-lightness accessibility shortcut** — `color-and-rhythm.md:57` · shared with design
> - **Accessibility shortcut:** Backgrounds with **L ≥ 0.87** generally pair safely with black text; keep the same L across hues so all buttons share contrast.

**Q42. Contrast checking is sRGB-based; AA-check both surfaces** — `design-direction.md:83-86` · shared with design
> - **Colors** are converted to sRGB for WCAG contrast checking; `#RRGGBB` is the recommended
>   default. For perceptual control, author palette values in **OKLCH** instead
>   (`oklch(L C H)` — vary L, hold C/H for a harmonious ramp; one accent) and AA-check both surfaces
>   when the page alternates light↔dark.

---

### Theme E — Performance criteria & budgets

**Q43. Performance is design — the frame budget as a constraint** — `experimental-and-creative.md:155-157` · shared with design
> - **Performance is design.** Complex visuals must load fast and run smooth on mid-range devices. Treat the
>   frame budget as a constraint from day one: lazy-init heavy canvases, pause offscreen, cap dpr/particle
>   count, ship static fallbacks.

**Q44. The 60fps mid-range-phone bar** — `experimental-and-creative.md:28-32` · shared with frontend
> canvas, JS) and **must be rationed**: the research is unanimous — every Awwwards Site-of-the-Day shares
> …
> run at 60fps on a mid-range phone, and gate it behind `prefers-reduced-motion` + lazy init.

**Q45. Core Web Vitals as a design constraint** — `trust-proof-and-structure.md:97-100` · shared with frontend
> - **Core Web Vitals as a design constraint, not a cleanup pass:** reserve media space with `aspect-ratio`/
>   `width`+`height` to avoid **CLS**; lazy-load below-the-fold; WebP/AVIF; keep the hero light for **LCP**.
>   Sub-3s (ideally sub-1s) load is itself a trust and ranking signal. (Perf details: `depth-and-texture.md`,
>   `imagery.md §9`, `experimental-and-creative.md`.)

**Q46. Image weight cap** — `niche-and-vertical-design.md:105` · shared with design
> heavy un-optimized images (cap ~2000px / ≤200KB); neglecting mobile (majority of traffic); hiding team/process.

**Q47. Glass-element budget per viewport** — `depth-and-texture.md:143` · shared with design
> - **Pitfall:** GPU-heavy — **max 2–3 glass elements per viewport**, never animate `backdrop-filter`, drop

**Q48. CLS prevention as a shipping requirement** — `imagery.md:184` and `imagery.md:196-198` · shared with frontend
> - **Why:** `aspect-ratio` reserves space (kills CLS); `object-fit: cover` fills any box without squishing; `<picture>` swaps the *crop* per viewport — keeping every technique above responsive and shift-free.

and

> - **Pitfall:** `object-fit: cover` silently crops faces/products on extreme ratios — set `object-position`
>   and verify. Always ship `width`/`height` attrs **or** `aspect-ratio` to reserve space.
>   Use `<picture>` only when the *crop* must change; for mere resolution use `srcset`/`sizes`.

**Q49. Motion duration bands** — `motion-and-interaction.md:152-155` · shared with design
> - **Duration:** small UI 150–240ms; overlays/sections 300–400ms; most transitions 200–500ms. More travel = slightly longer.
> - **Easing:** `ease-out` for entrances (fast in, settle), `ease-in` for exits, `cubic-bezier(0.16,1,0.3,1)`
>   (expo-out) for the "expensive" decelerate. Never linear for UI (only loops/marquees/scrubs).
> - **Stagger:** 60–100ms between siblings; cap total so a list doesn't crawl.

**Q50. View-transition duration ceiling** — `experimental-and-creative.md:136-137` · shared with frontend
> - **Pitfall:** `view-transition-name` must be **unique per snapshot** on a page or the transition errors;
>   large/looping transitions feel slow — keep ≤400ms. Re-check it doesn't fight a smooth-scroll lib.

**Q51. Compositor-only animation rule** — `frontend-build-patterns.md:414-416` · shared with frontend
> **Animations — the load-bearing rule for motion.** Favor **transitions over keyframe
> animations**, and **only animate `opacity` and `transform`** — these are compositor-friendly and
> don't trigger layout. Animating `margin`/`width`/`top` causes reflow and visibly janks.

**Q52. Performance budget as a declared input** — `experimental-and-creative.md:12` · shared with frontend
> - Creative objective, target devices, performance budget, and fallback requirements.

---

### Theme F — Evidence, capture & review integrity

**Q53. The capture capability contract** — `art-review.md:52-64` · quality-only
> ## Capture tooling — what this review physically needs
>
> This review is visual: it cannot run from source code alone. The capability contract, independent
> of any specific tool:
>
> 1. **Serve the build** (dev server or static output) on a local port.
> 2. **Screenshot it programmatically** — per-section tight crops, two viewports (desktop ~1440×900
>    and an iPhone-class device), `prefers-reduced-motion` emulated, each element scrolled into view
>    before the shot (lazy images).
> 3. **Read the images** — the reviewing model must be multimodal. No vision, no art review.
>
> Token economy: **spend tokens reading crops, not driving the browser.** A picture is worth a
> thousand tokens; a chatty automation layer burns them before you've seen anything.

**Q54. The honest-degrade rule (evidence integrity)** — `art-review.md:79-81` · quality-only
> - **No browser at all → degrade honestly.** Review markup/CSS/tokens against the direction and
>   label the result explicitly: *"code-level pass — not an art review; no build was viewed."*
>   Never present an unviewed review as a viewed one.

**Q55. Never imply screenshot review when only code was available** — `SKILL.md:102-103` · quality-only
> - For visual review, state which rendered evidence was actually inspected; never imply screenshot
>   review when only code was available.

**Q56. Capture at full resolution, section by section** — `art-review.md:85-92` · quality-only
> ### 1. Capture the build section by section, at full resolution
>
> Full-page screenshots downscale and lose the detail art direction actually lives in. Capture each
> distinct section/component of the built page as its own tight crop, at both a desktop viewport and
> a mobile device viewport, with reduced motion emulated so reveal/scroll animations settle to their
> final resting state before the shot — a blank crop from motion-in-progress is a capture miss, not
> a design defect; note it and move on. Build an ordered manifest (document order, desktop before
> mobile per section) so the walk below is systematic rather than a random scroll-through.

**Q57. Zoom in — don't rubber-stamp the gestalt** — `art-review.md:102-108` · quality-only
> > **Zoom in — don't rubber-stamp the gestalt.** A section can read fine at a glance and still be
> > wrong in the details: a misused or awkwardly placed icon, an icon in the wrong size/style, text
> > that wraps into an orphan or overflows its container, a label misaligned with its value, elements
> > that don't sit on a shared line. These are exactly the flaws that slip through a fast "looks
> > good" approval. Inspect each crop at full resolution and **actively hunt for the small defect**
> > in every section before you accept it. Finding nothing is a conclusion you earn by looking, not a
> > default.

**Q58. "A green build proves the code compiles, not that the page looks right."** — `frontend-build-patterns.md:280-301` · shared with frontend
> ## Visual end-to-end self-check
>
> **A green build proves the code compiles, not that the page looks right.** Before calling a build
> done:
>
> 1. **Serve the build** and get the full route list from the sitemap.
> 2. **Screenshot every route at two viewports** — a standard desktop width (e.g. 1440×900) and a
>    representative mobile device size — using a browser-automation tool. For pages with
>    scroll-reveal or lazy-loaded content, a single full-page screenshot can capture blank —
>    step-scroll with a short wait between steps, then scroll back to the top before the final
>    capture. Capture tooling — script the batch, `agent-browser` for interactive poking, and the
>    honest-degrade rule — is specified in
>    [art-review.md](art-review.md#capture-tooling-what-this-review-physically-needs).
> 3. **Actually look at each screenshot** for real defects: text overflow/clipping (an oversized
>    display heading is the classic case), element overlap, a fixed header obscuring the first
>    heading, broken or placeholder images, an unreachable or overlapping mobile nav, cramped or
>    collapsed spacing, low-contrast text over imagery, horizontal scroll on mobile. Also re-check
>    against the anti-slop checklist above.
> 4. **Fix and re-shoot** — edit the offending component/theme, rebuild, re-screenshot only the
>    affected routes. Loop until both viewports read clean, capping at a few rounds and explicitly
>    noting any residual issue rather than looping forever.
> 5. **Tear down the server** when done — don't leave a dev/preview server stranded on a port.

**Q59. Verify tokens are actually applied — a green build can have lost them** — `frontend-build-patterns.md:272-278` · shared with frontend
> - **A literal `*` in a comment inside/near a token block can silently drop the whole block.**
>   Some CSS minifiers/parsers choke on glob-style names in prose comments (e.g. writing
>   `--spacing-*` inside a comment near `@theme`) and print a soft warning while dropping the entire
>   token block — a build that's green but has lost all its tokens. Avoid literal `*` glob syntax in
>   comments near token definitions; treat any such parser warning as a hard failure, and verify
>   tokens are actually applied (inspect computed styles) during visual QA, not just from a green
>   build.

**Q60. Known false positive in automated visual QA — map embeds paint black headless** — `frontend-build-patterns.md:269-271` · shared with frontend
> - **Map embeds paint black in headless browsers.** An embedded map iframe can render as a solid
>   black box under headless/automated screenshot capture — put an on-brand fallback panel behind
>   the iframe so automated visual QA doesn't flag (or ship) a black rectangle.

**Q61. Verify the API, don't recall it (anti-staleness)** — `design-direction.md:41-43` · shared with design
> **Pin the version — it's alpha and the schema churns.** Run `npx @google/design.md@<pinned>` (or
> install `@google/design.md` as a dev dependency at a fixed version). Before authoring, run
> `design.md spec` and work against *that* output, not memory — verify the API, don't recall it.

**Q62. Screenshot your own work while building** — `frontend-design-principles.md:175-176` · shared with design
> Critique your own work as you
> build, taking screenshots when possible — a picture is worth 1000 tokens.

**Q63. Fail loud, never silently** — `frontend-build-patterns.md:196-198` · shared with frontend
> - **An unmatched key should fail loud in development** (throw or warn clearly) rather than
>   silently rendering nothing — a silent skip is a section quietly missing from a live page with
>   no error anywhere.

**Q64. Log the unresolved set, don't swallow it** — `frontend-build-patterns.md:230-233` · shared with frontend
> Resolve every media reference to
> a local file under the public assets directory; when a reference can't be resolved, fall back to
> a clean placeholder component — never a broken image — and log the unresolved set so it's visible,
> not silently swallowed.

---

### Theme G — Workflow & process discipline

**Q65. Convergence discipline** — `art-review.md:184-195` · quality-only
> ### Convergence discipline (this is what keeps the loop safe — not "crazy picky")
>
> - **Converge from round 2 on, don't chase perfection.** Once the mandatory first revision is done,
>   approve as soon as A0/A1 are clear, even if A2/A3 remain. The bar is "honors the direction and
>   has no obviously-unfinished details," not "flawless." Don't hold the build hostage to taste
>   micro-preferences.
> - **Round-over-round, only escalate.** On round 2+, judge whether your prior blocking items were
>   fixed. Don't introduce *new* low-value nitpicks you let pass earlier — that's thrash. New A0/A1
>   only if a revision genuinely broke something or a real defect was missed.
> - **Cap the loop.** Agree a hard round limit up front (a good default is 3 rounds). If A0/A1 still
>   remain at the cap, proceed anyway with the findings recorded — so make the final round's blocking
>   list the *highest-leverage* fixes, not an exhaustive one.

**Q66. Boundaries — the reviewer's deliverable is the punch-list, not the fix** — `art-review.md:227-236` · quality-only
> ## Boundaries
>
> - **The reviewer's deliverable is the punch-list, not the fix.** A build that drifts from the
>   direction is exactly what this review exists to catch, but someone else does the fixing — keep
>   the roles separate even if the same person plays both at different times.
> - **Design taste only.** Functional correctness (build/typecheck, coverage of intended
>   components, route parity, broken links, data delivery) belongs to a correctness QA pass (see
>   [design-critique.md](design-critique.md)) — don't duplicate it here. If you spot a hard
>   functional break (a section renders nothing, an image 404s everywhere), note it in the summary so
>   it gets caught early, but your severities are about the *look*.

**Q67. The studio review loop and its role sequence** — `art-review.md:26-30` · quality-only
> The studio creative-review pass: the eye that set the visual direction (see
> [design-direction.md](design-direction.md)) checks the build before final correctness QA. You
> judge with taste, not a test runner. If you can't edit the code yourself, your job is to **see,
> judge, and write the punch-list** for whoever builds — direction → build → *review* → revise →
> sign-off, repeated until the build honors the direction.

**Q68. Acting on a punch-list — the builder's side of the loop** — `frontend-build-patterns.md:303-318` · shared with frontend
> ## Iterative design-review loop
>
> When a build already exists and a design reviewer has left a punch-list rather than starting from
> scratch:
>
> 1. Apply every **blocking** item — both direction violations (off-spec palette/type/register,
>    anti-slop tells) and composition failures (centered-everything, uniform card grids, flat
>    rhythm, a missing signature section). Each item should name a route, a section, and a concrete
>    fix — recompose, re-theme, or re-rhythm exactly those sections.
> 2. Take cheap, clearly-right optional suggestions if you agree with them.
> 3. **Leave unflagged sections alone.** Don't regress work that was already signed off, and don't
>    redesign the whole page because one section needed a fix.
> 4. Rebuild and re-run the full visual self-check so the reviewed state is reflected for the next
>    round.
>
> Work only from the punch-list as written — never guess at unstated intent behind a flagged item.

**Q69. Completion and handoff obligations** — `SKILL.md:96-107` · quality-only
> ## Completion and handoff
>
> Before completion:
>
> - Confirm every requested page, section, state, or review artifact exists.
> - Validate the result at the viewports and interaction states relevant to the request.
> - For visual review, state which rendered evidence was actually inspected; never imply screenshot
>   review when only code was available.
> - Record unresolved content, asset, accessibility, engineering, SEO, or measurement work with an
>   owner rather than silently absorbing it.
> - When downstream implementation or assurance is expected, provide artifact paths, constraints,
>   decisions, risks, and the recommended next skill without duplicating the full artifact.

**Q70. Run it honestly — the point is to find the problems** — `design-critique.md:31-32` · quality-only
> Adapted from `pbakaus/impeccable` (Apache-2.0). Run it honestly — the point is to find the
> problems, not to award a high number.

**Q71. Plan-critique before build** — `frontend-design-principles.md:151-156` · shared with design
> Then review that plan against the brief before building: if any part of it reads like the generic
> default you would produce for any similar page (work through a similar prompt to see if you arrive
> somewhere similar) rather than a choice made for this specific brief — revise that part, say what
> you changed and why. Only after you've confirmed the relative uniqueness of your design plan should
> you start to write the code, following the revised plan exactly and deriving every color and type
> decision from it.

**Q72. Self-critique pointer with cognitive thresholds** — `frontend-design-principles.md:176-181` · shared with design
> For a structured pass
> rather than an impressionistic one — Nielsen heuristics scored 0–40 with honesty calibration, a
> cognitive-load / working-memory check (nav ≤ 5, ≤ 3 tiers, ≤ 4 fields), five test personas, and
> P0–P3 severity routing — use [design-critique.md](design-critique.md). Consider Chanel's advice:
> before leaving the house, take a look in the mirror and remove one accessory. Keep notes on what
> you've tried across passes — memory of prior attempts helps avoid repeating a rejected idea.

**Q73. Clean up dev scaffolding before shipping** — `frontend-build-patterns.md:252-256` · shared with frontend
> ## Clean up dev scaffolding before shipping
>
> Delete any dev-only style-guide/reference routes and the unused reference component catalog
> before the final build — they exist for the build process itself, not for the shipped site, and
> must not ship as live routes.

**Q74. The universal check-against-defaults invariant** — `SKILL.md:83-86` · shared with design
> - Check every result against named defaults and the anti-boring gate; remove one decorative move
>   before shipping.
> - Preserve responsive behavior, interaction states, reduced motion, and legibility while pursuing
>   distinctiveness.

**Q75. Artifact contract — record assumptions and code status** — `SKILL.md:88-94` · shared with product
> ## Artifact contract
>
> Produce only the artifacts the request needs. Depending on the selected route, these may include a
> visual-direction brief, `DESIGN.md`, sitemap and section catalog, section implementation, complete
> appearance layer, art-review punch list, or scored critique. Every artifact must record its input
> constraints, material assumptions, and whether code is exploratory, visual-reference, or intended
> for production integration.

---

### Theme H — Cognitive-load & usability thresholds

**Q76. Cognitive load classification + the Working-Memory Rule** — `design-critique.md:47-58` · quality-only
> ### 2. Cognitive load
>
> Classify load as **intrinsic** (inherent to the task — keep), **extraneous** (caused by the
> design — cut), or **germane** (builds the user's mental model — keep). Then check:
>
> - **Working-Memory Rule:** a person holds **≤ 4 items** at once (Miller's 7±2, revised down by
>   Cowan, 2001). Concretely: **nav ≤ 5** top items, **hierarchy ≤ 3 tiers**, **a form step ≤ 4
>   fields** before it feels like work.
> - Watch for named violations — e.g. **"The Wall of Options"** (every choice shown at once with no
>   progressive disclosure), undifferentiated dense tables, dialogs that ask the user to remember
>   something from the previous screen.

**Q77. The 5-second test** — `persuasion-and-conversion.md:101` and `niche-and-vertical-design.md:203` · shared with product
> headlines ("Reimagine tomorrow") fail the 5-second test.

and

> **Dial:** ~55% info/proof. **Pitfalls:** jargon failing the 5-sec test;

**Q78. Click-depth ceiling for a conversion flow** — `niche-and-vertical-design.md:127` · shared with product
> communicate exclusivity + convert with zero friction (hospitality: **home → room → booking in ≤3 clicks**,

**Q79. Full interactive state coverage as the bar in serve register** — `frontend-design-principles.md:70-74` · shared with design
> This
> inverts several defaults: prefer a **fixed rem type scale** over fluid `clamp()`; give every
> interactive component its **full state set** (hover / focus / active / disabled / loading /
> empty / error); reach for boring, proven patterns over novel ones (a modal as the *first* idea is
> usually laziness, not a choice); and **Inter / SF Pro is a legitimate pick here, not a tell**.

**Q80. State-completeness as an explicit anti-pattern check** — `layout-and-composition.md:240` · shared with design
> (hover/focus/active/disabled/loading/empty each distinct). Anti-pattern ("AI slop"): centered-everything,

**Q81. Awwwards judging weights (usability outweighs creativity)** — `experimental-and-creative.md:150-152` · shared with design
> ## The award-winner's discipline (synthesized from Awwwards judging)
> - **One signature, not twenty effects.** Awwwards weights Design 40 / Usability 30 / Creativity 20 /
>   Content 10 — creativity is real but usability outweighs it. Spend the wow on ONE moment.

---

### Theme I — Defect definitions

**Q82. An icon defect is a real defect, not a nitpick** — `frontend-design-principles.md:121-124` · shared with design
> An icon used wrong-for-meaning, hand-rolled, mis-sized, or
> mixed-weight — or decoration that reads as noise rather than one deliberate move — is a real defect
> at review time (see [art-review.md](art-review.md)), not a nitpick; the point of naming real
> libraries in the direction is that the builder had no excuse to invent worse.

**Q83. Redirect/404 regression definition** — `frontend-build-patterns.md:246-250` · shared with frontend
> **Redirects when the IA changes.** If routes were restructured (not just a straight port), old
> URLs need to keep resolving — implement a redirect map (`{ from, to, permanent: true }` entries,
> 301) in the framework's routing config from whatever migration plan defined the old→new mapping.
> Skipping this means every legacy inbound link/bookmark/search-ranked URL 404s, which is exactly
> the SEO equity a rewrite is supposed to carry forward.

**Q84. Sitemap must satisfy a committed redirect map** — `section-archetypes.md:57-58` · shared with product
> funnel or audience), the new sitemap must still satisfy any redirect map already committed to
> (every "moved-to" URL from a migration plan needs a matching sitemap route) — that redirect target

**Q85. The single biggest self-inflicted failure mode** — `section-archetypes.md:88` · shared with product
> usable — the single biggest self-inflicted failure mode in this step. Logo/hero media and

**Q86. Never resolve media to a screenshot or bare URL** — `section-archetypes.md:117-122` · shared with product
> **Resolve media fields to a real, resolvable asset reference — never a bare rendered URL and
> never a screenshot.** For each image slot, resolve it to the actual captured/local asset file;
> …
> real content gap — flag it for asset generation/sourcing, don't paper over it.

**Q87. Horizontal-scroll defect and its mechanism** — `imagery.md:126` and `layout-and-composition.md:52` · shared with frontend
> - **Pitfall:** `width:100vw; margin-left:calc(50% - 50vw)` causes horizontal scroll with a scrollbar present — the grid-breakout method avoids it. Reset overlaps to a clean stack on mobile.

and

> approach sidesteps it. If you must use vw, add `overflow-x: hidden` on `html`.

**Q88. Tilt legibility ceiling** — `imagery.md:145` · shared with design
> - **Pitfall:** Steep tilts murder UI legibility — keep ≤20° if the screenshot must be readable. Bake at 2× and `object-fit: cover`; CSS-scaling a small PNG looks cheap.

**Q89. Verify high-chroma colors against gamut** — `color-and-rhythm.md:58-59` · shared with design
> - **Pitfall:** High chroma can fall outside a screen's gamut — verify at oklch.com. Don't let saturation
>   changes drift the hue (OKLCH avoids HSL's hue shift, but only if you change C, not H).

**Q90. Re-check contrast on both surfaces when alternating** — `color-and-rhythm.md:33` · shared with design
> - **Pitfall:** Mechanical zebra striping is a template tell — vary the *interval*. Re-check contrast/accent legibility on both surfaces; an accent tuned for light bg may wash out on dark.

---

### Theme J — Compatibility rules (negative finding)

**Q91. There is no independent compatibility-audit material in the source.** Recorded as an explicit
negative finding so nobody re-searches for it. Browser-support caveats exist throughout
`imagery.md`, `experimental-and-creative.md`, and `motion-and-interaction.md`, but every one of them
is framed as *build-time progressive enhancement* ("gate it behind `prefers-reduced-motion`",
"Firefox support is recent/partial", "static grain/gradient fallback for no-WebGL") rather than as a
post-build compatibility verification activity. The only items with an audit flavor are the
two-viewport capture rule (Q53, Q56, Q58) and the desktop↔mobile question in Q26.

**Confirmed independently three ways:** W1's re-tag pass over the prior extraction returned **0
items** for this theme; W2's exhaustive source re-read returned **0**; and the lead's own targeted
grep for compatibility-flavored language across all 22 references surfaced only progressive-
enhancement guidance. Three passes agreeing on zero is a result, not an omission.

**Stated as a named gap:** the old `webdesign` skill never treated cross-browser / cross-device
checking as an independent verification activity. `quality` must therefore **source its
compatibility-verification doctrine from the GitHub and canon channels**, not from this one. Nothing
here will seed it. Recording this so the gap is known rather than discovered late — a named gap is
one the new skill knows it must fill.

Representative examples of the build-time framing, for the record:
> - **Pitfall:** Firefox support is recent/partial. **Gate it:** `@media (prefers-reduced-motion:` — `motion-and-interaction.md:55`
> gradient/grain fallback for `prefers-reduced-motion` and no-WebGL. One per page, hero only. — `experimental-and-creative.md:73`

---

### Theme K — Additional audit criteria (merged from the parallel verification passes)

**Q92. The anti-default catalog's own statement of its audit role** — `anti-default-catalog.md:71-78` · shared with design
> ## How to use this
>
> During the plan-critique pass (see
> [frontend-design-principles.md](frontend-design-principles.md#process-brainstorm-explore-plan-critique-build-critique-again)),
> run your draft token system against this list: any color, type, or structural choice that matches
> a tell must either earn its place with a brief-specific reason or be replaced — and say what you
> changed and why. It's also the reference an [art-review.md](art-review.md) pass judges a finished
> build against.

Routing note: the catalog itself declares it is used at two different times — as a build-time
self-check *and* as the bar a finished-build review judges against. That dual role is the seam in S1.

**Q93. The decoration reject-if-unjustified rule** — `decoration.md:130-132` · shared with design
> Every decoration must justify itself: **depth, brand, or eye-guidance.** If none of those, cut it
> (Chanel rule — remove one accessory before shipping). Loud, saturated, hard-edged decoration is the cheap
> tell; faint, color-matched, edge-faded, *relevant* decoration is the premium one.

**Q94. Test the brightest worst-case photo** — `imagery.md:86-87` · shared with design
> - **Pitfall:** A fixed scrim fails on light images — make scrim strength/direction respond, or use a
>   darkened variant. Test the *brightest* worst-case photo (CMS images vary).

Routing note: a genuine test-methodology instruction — pick the worst case, not a representative
case. `quality` should generalize this.

**Q95. Heading-hierarchy conformance** — `trust-proof-and-structure.md:90-91` · shared with product
> - **Heading hierarchy:** exactly **one `H1`** (the page's main title); `H2`/`H3` for nested subsections in
>   order — don't skip levels or pick headings for size (style with CSS). This doubles as the visual hierarchy.

Pairs with "no skipped heading levels" in the mechanical checks (Q16). Structurally verifiable
against a finished document outline, independent of visual styling.

**Q96. Compliance-signal checklist including WCAG AA** — `niche-and-vertical-design.md:198-204` · shared with product
> **Proof:** **named customer logos**,
> G2 ratings, usage metrics ("Join 5,000+ companies"), quantified case outcomes, **security/compliance badges
> (SOC 2, ISO 27001, GDPR, WCAG AA)**. **CTA:** one primary per page; first-person ("Start My Free Trial");
> risk-reducers ("No Credit Card Required"); 3–5 form fields; offer trial + demo for different readiness.
> **Register:** product-forward — real screenshots/silent loops, workflow micro-animations, WCAG AA, WebP/AVIF +
> lazy-load, distinct mobile layouts.

Note: this is the only place in the corpus where accessibility conformance appears as an
*externally-attested compliance claim* rather than an internal check.

**Q97. Attention Ratio — a measurable page-level criterion** — `persuasion-and-conversion.md:77-94` · shared with product
> Governing metric: **Attention Ratio** = links-on-page ÷ intended-actions. A campaign landing page should
> approach **1:1** (one action, nothing else clickable); tightening toward 1:1 commonly lifts conversion ~31%.

A named, countable ratio with a target — checkable against a finished page.

**Q98. The dark-pattern rejection table** — `persuasion-and-conversion.md:150-163` · shared with product
> ## The ethical line (keep every device honest)
> The same mechanism flips sides by truthfulness. FTC (2022→2025) blacklists fake timers, false scarcity,
> hidden subscriptions, and confirmshaming as material misrepresentations.
>
> | Mechanism | Ethical use | Dark pattern |
> |---|---|---|
> | Scarcity/urgency | Real deadline/stock | Fake/re-arming timers, false "2 left" (FTC-actionable) |
> | Commitment | Honest progressive steps | Hidden cost revealed late |
> | Social proof | Real reviews + identity | Fabricated/stock testimonials |
> | Default / Zeigarnik | Smart defaults, true progress | Forced continuity, infinite gamified bars |
> | Endowment | Personalize a real trial | Easy-in / hard-out cancellation |
> | Confirmshaming | Neutral decline option | Guilt-trip opt-out copy |
>
> Design for the user's **informed yes.**

Routing note: **this is the strongest item in the merged additions.** It is a mechanism-by-mechanism
reject-if-present table with a named external authority (FTC 2022→2025) — i.e. a compliance audit
checklist for a finished conversion flow, not design advice. `quality` should take it; `product`
contributes the persuasion mechanics it indexes.

---

### Theme L — Scope-boundary evidence

**Q99. The old skill explicitly disclaimed full accessibility audits** — `SKILL.md:3-11` · boundary-defining
> description: >-
>   Design and build distinctive websites, landing pages, and marketing-site interfaces from direction
>   through visual QA of the builds it produces. Use for art direction, DESIGN.md systems, page IA,
>   section composition, typography, color, imagery, motion, conversion-aware layout, CSS/theme
>   implementation, or visual critique of those builds. Include frontend code only when it produces
>   the approved appearance. Do not use for application state or data architecture, backend work,
>   component API engineering, app dashboards and product UI, full accessibility audits, general SEO
>   strategy, growth planning, or standalone design critique of work it did not build, unless the
>   request also requires website design.

Two findings here, both useful negative space for the new skill:
1. The old skill advertised "**visual QA of the builds it produces**" — i.e. it only ever claimed
   assurance over *its own* output, and explicitly disclaimed "**standalone design critique of work
   it did not build**." `quality`'s whole premise is the opposite: independent review of work it did
   not build. This is the cleanest statement of why `quality` needs to exist as a separate skill.
2. "**full accessibility audits**" was explicitly out of scope. Confirms accessibility conformance
   verification was never owned anywhere in the old skill — `quality` inherits an unowned gap, not a
   handover.

Reinforced at `SKILL.md:109-114`:
> ## Adjacent handoffs
>
> Recommend, but do not automatically invoke, adjacent capabilities for asset generation, reusable
> component API engineering, design-system extraction, full WCAG auditing, specialized browser/media
> techniques, or throwaway multi-direction prototyping. This skill specifies visual requirements and
> passes forward the approved artifacts; the adjacent capability owns its specialist output.

**Q100. The skill's own agent manifest names visual QA as core scope** — `agents/openai.yaml:1-6` · boundary-defining
> interface:
>   display_name: "Webdesign"
>   short_description: "Distinctive website design, build, and visual QA"
>   default_prompt: "Use $webdesign to design and review a distinctive responsive landing page."
> policy:
>   allow_implicit_invocation: true

Carries no technique, threshold, or checklist — recorded only to close out the `agents/` directory
and to evidence that QA was advertised as one of three headline capabilities.

---

## 4. Shared-ownership items — proposed seam rulings

**S1. The anti-boring checklist (Q7) and the anti-default catalog.**
Ruling: **`quality` owns the gate mechanic; `design` owns the list contents.** The sentence "Section
fails if you answer 'no' to the top block or 'yes' to the bottom block" is a pass/fail rule and
belongs to `quality`. The specific tells (cream/sand OKLCH band, reflex-reject fonts, ghost-card
defects) are dated design taste — `design` owns them and must keep them current. `quality` should
reference the catalog as *a* bar, never inline it, because inlining ages it. Note the source itself
says: "**These are dated to 2026** — they're accurate now and will age; treat them as a live list,
not gospel" (`anti-default-catalog.md:21-22`).

**S2. The A0–A3 vs P0–P3 split.**
Ruling: **`quality` owns both scales and the rule that they are distinct tracks.** `design`
contributes the criteria that populate A0/A1 (what counts as a direction violation). This is the
cleanest seam in the corpus because the source already drew it explicitly at `art-review.md:139-140`
and `art-review.md:232-236`.

**S3. Accessibility thresholds (Q29–Q42).**
Ruling: **`quality` owns conformance *verification*; `design` owns designing to the floor.** The
same 4.5:1 number appears in both roles. `design` says "author the palette so it passes"; `quality`
says "measure it, on both surfaces, on the brightest image area, and fail the build if it doesn't."
`quality` should own the verification procedure and the "verify on *both* surfaces" instruction
specifically, since that is a test-coverage concern.

**S4. The visual end-to-end self-check (Q58).**
Ruling: **shared, with `quality` owning the principle and `frontend` owning the procedure.** "A
green build proves the code compiles, not that the page looks right" is an assurance axiom and
belongs to `quality`. The five mechanical steps (serve, screenshot, look, fix, tear down) are a
frontend build-hygiene routine. `quality` should state the axiom and the requirement for independent
rendered evidence; `frontend` keeps the how-to.

**S5. The refinement checklist and critique framework (Q20, Q21).**
Ruling: **`design` owns them as self-critique; `quality` inherits the "separate taste from function
/ ban I-like-I-don't-like" rule outright.** That rule is about the *epistemics of a review*, not
about design, and it is the intellectual root of the whole severity-routing approach. `quality`
should take it and generalize it.

**S6. Acceptance checklists (Q19, Q22, Q23, Q24).**
Ruling: **each producing skill keeps its own acceptance checklist; `quality` owns the meta-pattern.**
The valuable transferable observation is that every stage of the old skill terminated in a named,
enumerable acceptance criterion. `quality` should require that of every stage rather than absorbing
four domain-specific lists.

**S7. Performance criteria (Q43–Q52).**
Ruling: **`quality` owns measurement against a budget; `frontend`/`design` own hitting it.** The
transferable item is `experimental-and-creative.md:12` listing "performance budget" as a declared
*input* — i.e. the budget is agreed up front and then verified, which is exactly the assurance
pattern. Specific numbers (60fps, ≤400ms, ≤200KB) are illustrative and will age; `quality` should
carry the pattern and treat the numbers as examples.

**S8. Capture tooling (Q53).**
Ruling: **`quality` owns the *capability contract*; nobody owns the tool names.** "Serve it,
screenshot it at two viewports with reduced motion, read the images with a multimodal model" is
durable. `agent-browser` install commands are not — they will rot and should be dropped or marked
illustrative. The line "**No vision, no art review**" is the load-bearing part.

---

## 4b. Open design questions — for the controller, deliberately unresolved

These are surfaced as decisions, not resolved. Each would change the shape of the new skill.

**OQ1 — Keep two severity tracks, or unify? (the structural question)**
The old skill deliberately ran **two separate severity scales**: A0–A3 for art-direction/craft
findings and P0–P3 for functional/correctness findings. This was not an accident of two authors —
the source says so explicitly and twice: "this is a distinct severity track from a
functional/correctness QA pass" (`art-review.md:139-140`), and the art-review Boundaries section
hands functional correctness to the critique pass and tells the reviewer not to duplicate it
(`art-review.md:232-236`). Even the escalation path is specified: a hard functional break spotted
during art review goes in the *summary*, not the severity list.

*The case for keeping two:* they answer different questions (does it honor the intent / does it
work), they have different evidence requirements (a multimodal reviewer vs a test runner), they
route to different fixers, and A2/A3 can be non-blocking in a way a P2 usually cannot. Collapsing
them loses the ability to say "this ships despite being ugly."

*The case for unifying:* one vocabulary is cheaper to teach and to tool; two scales invite
mis-routing at the boundary; and severity is ultimately about ship-impact, which is one axis. Most
industry practice runs a single P0–P3.

*My read, offered not applied:* the split is real and defensible, but it is a **web-specific**
artifact — it exists because art direction has a subjective bar that functional QA does not. Whether
that generalizes across the digital-product family is precisely the controller's call. **Not
resolved here.**

**OQ2 — Does the FTC dark-pattern table (Q98) belong to `quality` or `product`?**
I routed it to `quality` because it is a mechanism-by-mechanism reject-if-present table anchored to
an external regulator, i.e. a compliance-verification checklist against a finished flow. The
counter-argument is that it indexes persuasion mechanics that `product` owns, and that a skill
judging a build shouldn't also be the authority on conversion ethics. **Open seam question.**

**OQ3 — Do builder-side self-checks belong here at all?**
Per the seam rules, a builder checking their own work is construction-side. Several high-quality
checklists in this corpus are exactly that (see the tagging below). They are retained because their
*criteria* are reusable, but adopting them as-is would import self-assessment into a skill whose
premise is independent assessment. **Recommend adopting the criteria and discarding the framing;
flagged rather than decided.**

**OQ4 — The `bendc/frontend-guidelines` licensing gap.** See §6.1 consequence 3. Legal call, not a
research call.

---

## 4c. Provenance tagging — builder-side self-checks and borderline items

Carried forward explicitly rather than silently resolved, per the seam rules.

**Builder-side self-check — adopt only if reframed as independent criteria.** These are the
*builder* checking their own work before shipping, not an independent verifier auditing it. The
criteria are sound; the stance is construction-side.

| Item | Source | Note |
|---|---|---|
| Q7 — the anti-boring checklist | `section-design-workflow.md:128-149` | "run on every section before shipping" — self-administered. The pass/fail *mechanic* transfers; the self-administration does not. |
| Q20 — B5 refinement pass checklist | `design-thinking.md:93-101` | Explicitly a self-critique pass. Its numeric limits (≤3 sizes, ≤2 families, 45–75ch, 4.5:1) are independently checkable and should be lifted as criteria. |
| Q58 — visual end-to-end self-check | `frontend-build-patterns.md:280-301` | Named "self-check". The axiom at `:282` is assurance doctrine; the five steps are build hygiene. |
| Q62 — screenshot your own work | `frontend-design-principles.md:175-176` | Pure self-critique. |
| Q71 — plan-critique before build | `frontend-design-principles.md:151-156` | Self-administered gate on a plan, pre-build. |
| Q74 — the anti-boring gate invariant | `SKILL.md:83-86` | Same. |

**Borderline — framed as a build constraint rather than a post-build measurement.**

| Item | Source | Note |
|---|---|---|
| Q45 — Core Web Vitals | `trust-proof-and-structure.md:97-100` | The source says explicitly "as a design constraint, **not a cleanup pass**" — i.e. it is deliberately framed *away* from post-build measurement. `quality` wants the opposite framing: CWV as a measured threshold at the gate. Keep the numbers, invert the stance. |
| Q43, Q44, Q52 — frame budget / 60fps / performance budget | `experimental-and-creative.md:12, 28-32, 155-157` | Same pattern: budgets declared as inputs at design time. The assurance move is verifying against them afterwards. |

**Borderline — W2's trio, kept and tagged.**

| Item | Source | Note |
|---|---|---|
| Q97 — Attention Ratio | `persuasion-and-conversion.md:77-94` | A countable ratio with a target (≈1:1). Genuinely measurable against a finished page; the "~31% lift" claim is uncited and should not be repeated as fact. |
| Q34 / Q84 — Fitts's law ≥44×44px | `persuasion-and-conversion.md:66-67` | A concrete minimum a mobile-usability audit checks. Corroborated independently by Q16's "tap targets ≥ 44px". |
| Q98 — FTC dark-pattern table | `persuasion-and-conversion.md:150-163` | See OQ2. Strongest of the three. |

---

## 5. Deliberately excluded

Considered and rejected as craft-not-assurance, recorded so this is auditable:

1. **The whole technique layer** — `layout-and-composition.md`, `typography.md` (except its numeric
   limits), `depth-and-texture.md`, `decoration.md`, `imagery.md`, `motion-and-interaction.md`,
   `experimental-and-creative.md`. These are "how to make it good." Only their thresholds and
   pass/fail pitfalls were lifted.
2. **`anti-default-catalog.md` contents** — the specific palettes, the OKLCH band, the
   reflex-reject font list, the GPT ghost-card defects. Design taste, explicitly dated, will age.
   Excluded as content; its *role* as a rejection checklist is captured in Q7/Q27/S1.
3. **`niche-and-vertical-design.md`, `persuasion-and-conversion.md`, `trust-proof-and-structure.md`,
   `section-archetypes.md` catalogs** — product/design strategy. Only their numeric criteria and
   acceptance checklists were lifted.
4. **`frontend-build-patterns.md` HTML/CSS/JSX craft sections** (lines 338-434) — with the
   exception of the accessibility floor (Q31) and the compositor-animation rule (Q51), these are
   implementation style guidance owned by `frontend`.
5. **`tailwind-v4-theme.md` namespace maps and scales** — implementation detail. Only its checklist
   (Q24) was lifted.
6. **The `design.md` token format specification** (`design-direction.md:45-122`) — a file-format
   spec owned by `design`. Only the lint/diff gates, the lint-rule severities, and the acceptance
   criterion were lifted.
7. **Tool-specific install/CLI invocations** — `npm i -g agent-browser`, `agent-browser skills get
   core`, `set viewport 1440 900`. Excluded as ephemeral; the capability contract replaces them.
8. **The "one bold move + restraint" doctrine and register model** — genuinely load-bearing, but
   they are *design direction*, not assurance. `quality` references them as the bar a review judges
   against (Q27) without owning them.
9. **Awwwards/vertical folklore** (the 20-60-20 curation rule, per-vertical dials) — product/design.
   The one exception lifted is the judging-weight observation (Q81) because it is a scoring rubric.

---

## 6. Provenance & licensing

**Important structural finding: `SOURCES.md` does not cover the quality-relevant files.**
`SOURCES.md` (154 lines) enumerates provenance for exactly 13 technique references —
`color-and-rhythm`, `decoration`, `depth-and-texture`, `design-thinking`,
`experimental-and-creative`, `frontend-build-patterns`, `imagery`, `layout-and-composition`,
`motion-and-interaction`, `niche-and-vertical-design`, `persuasion-and-conversion`,
`trust-proof-and-structure`, `typography` (`SOURCES.md:19-31`). It contains **no entry** for
`art-review.md`, `design-critique.md`, or `anti-default-catalog.md` — the three files that supplied
the bulk of this extraction. A grep for `impeccable|apache|licen|MIT|CC BY|nielsen|cowan|miller|WCAG`
across `SOURCES.md` returns zero hits. Their attribution is **inline in the files themselves**, which
means it would be lost if the files were deleted without this record.

**Attributions that attach to lifted material:**

- `design-critique.md:31-32` — the source of Q1, Q10, Q15, Q16, Q17, Q18, Q70, Q76:
  > Adapted from `pbakaus/impeccable` (Apache-2.0). Run it honestly — the point is to find the
  > problems, not to award a high number.

- `anti-default-catalog.md:21-24` — the source of the rejection-checklist role referenced by Q7/Q27:
  > Adapted from `pbakaus/impeccable` (Apache-2.0). **These are dated to 2026** — they're accurate now
  > and will age; treat them as a live list, not gospel. Brand register only — in *serve* register
  > (see [frontend-design-principles.md](frontend-design-principles.md#register-is-the-design-the-product-or-does-it-serve-it))
  > some of these are legitimate.

- `frontend-design-principles.md:62` — the source of Q79's register model:
  > (Concept adapted from `pbakaus/impeccable`.)

- `frontend-build-patterns.md:334-336` — the source of Q19, Q31, Q51, Q58, Q59, Q60, Q63, Q64, Q68, Q73, Q83:
  > *Adapted from bendc/frontend-guidelines (Ben De Cock), modernized — dated 2015-era advice
  > (recursion-over-loops, IIFE-as-conditional, arguments/apply/bind gymnastics, blanket
  > prefer-Map-over-objects) has been corrected.*

- `design-critique.md:36` — Nielsen's 10 usability heuristics, named but not otherwise cited in the source.

- `design-critique.md:52-53` — the Working-Memory Rule (Q76):
  > (Miller's 7±2, revised down by Cowan, 2001)

- `design-direction.md:38` — the tool underlying Q5, Q6, Q11, Q22:
  > `design.md` (npm `@google/design.md`, Apache-2.0, status **alpha**) is a plain-Markdown format for
  > handing a design system to a coding agent.

- `experimental-and-creative.md:150` — the source of Q81: "synthesized from Awwwards judging".

### 6.1 Upstream licensing — verified, and what must travel into the new skill

Network-verified 2026-07-26. **This is the section to read at build time.**

| Upstream | Verified license | LICENSE path | Status |
|---|---|---|---|
| `pbakaus/impeccable` — github.com/pbakaus/impeccable | **Apache-2.0** (SPDX: `Apache-2.0`) | `/LICENSE` | Confirmed; repo exists, described as "The design language that makes your AI harness better at design." |
| `@google/design.md` → github.com/google-labs-code/design.md | **Apache-2.0** (SPDX: `Apache-2.0`) | `/LICENSE` | Confirmed at the repo. Note: the **npm registry metadata carries no `license` field**; latest published 0.3.0 (2026-06-15), spec status still `alpha`. |
| `bendc/frontend-guidelines` — github.com/bendc/frontend-guidelines | **NONE VISIBLE** | — | ⚠️ **No license file.** Repo exists (9.1k stars), described "Some HTML, CSS and JS best practices." |

**Three consequences, in order of importance:**

1. **The Apache-2.0 obligation from `pbakaus/impeccable` attaches to the highest-value transfers.**
   Specifically: the **P0–P3 severity scale**, the **go/no-go gate**, the **Nielsen 0–40 rubric with
   honesty calibration**, the **cognitive-load / working-memory checks**, the **five test personas**,
   and the **mechanical-check list** (Q1, Q10, Q15, Q16, Q17, Q18, Q70, Q76) — plus the register
   model at Q79. That is most of §2's top ten. Apache-2.0 requires retaining the notice and stating
   changes; the new skill's `SOURCES.md` must name the repo, the license, and the fact that the
   material is **adapted, not copied verbatim**.

2. **A second Apache-2.0 obligation arrives via `@google/design.md`** for the lint/diff gate material
   (Q5, Q6, Q11, Q22). Lower-risk, but note the npm metadata gap — cite the **GitHub repo**, not the
   npm page, as the license source.

3. **⚠️ `bendc/frontend-guidelines` has no license at all.** This is the one genuine legal flag in
   the corpus, and it is *new* information — the old skill asserted the adaptation without noting
   the licensing status. All-rights-reserved is the default for an unlicensed repo. The affected
   items are Q19, Q31, Q51, Q58, Q59, Q60, Q63, Q64, Q68, Q73, Q83 — which includes **Q58, the "green
   build proves the code compiles" self-check** (headline transfer #5). Mitigating factors: the old
   skill's own note says the material was "modernized" with dated advice "corrected," so what we hold
   is already a derivative rather than a copy; and several affected items (fail-loud registries, CLS
   prevention, redirect maps) are commonplace industry practice not original to that repo.
   **Recommendation: keep the items, attribute the credit as the old skill did, and re-express
   anything close to verbatim in our own words.** Flag to the controller rather than resolve — this
   is a call for whoever owns the release.

**Exact attribution strings to carry forward, verbatim, per file:**

- `design-critique.md:31` → `Adapted from `pbakaus/impeccable` (Apache-2.0). Run it honestly — the point is to find the problems, not to award a high number.`
- `anti-default-catalog.md:21` → `Adapted from `pbakaus/impeccable` (Apache-2.0). **These are dated to 2026** — they're accurate now and will age; treat them as a live list, not gospel.`
- `frontend-design-principles.md:62` → `(Concept adapted from `pbakaus/impeccable`.)`
- `frontend-build-patterns.md:334-336` → `*Adapted from bendc/frontend-guidelines (Ben De Cock), modernized — dated 2015-era advice (recursion-over-loops, IIFE-as-conditional, arguments/apply/bind gymnastics, blanket prefer-Map-over-objects) has been corrected.*`
- `design-direction.md:38` → ``design.md` (npm `@google/design.md`, Apache-2.0, status **alpha**) is a plain-Markdown format for handing a design system to a coding agent.`

**Uncited-but-owed academic credit** (named in the source without a formal citation; the new skill
should cite properly rather than inherit the gap): Nielsen's 10 usability heuristics
(`design-critique.md:36`); Miller's 7±2 as revised by Cowan 2001 (`design-critique.md:52-53`);
Fitts's law (`persuasion-and-conversion.md:66`); Cialdini (`persuasion-and-conversion.md` §
principles); the FTC 2022→2025 dark-pattern enforcement basis (`persuasion-and-conversion.md:150-152`);
and "synthesized from Awwwards judging" (`experimental-and-creative.md:150`), which is an
unverifiable attribution — the 40/30/20/10 weights in Q81 should be treated as **unverified** and
re-sourced or dropped before they appear in a shipped skill.

---

## 7. Totals

| Theme | Items |
|---|---|
| A — Review gates & go/no-go decisions | 8 (Q1–Q8) |
| B — Severity & priority scales | 5 (Q9–Q13) |
| C — Audit checklists, acceptance criteria & defect reports | 15 (Q14–Q28) |
| D — Accessibility & contrast thresholds | 14 (Q29–Q42) |
| E — Performance criteria & budgets | 10 (Q43–Q52) |
| F — Evidence, capture & review integrity | 12 (Q53–Q64) |
| G — Workflow & process discipline | 11 (Q65–Q75) |
| H — Cognitive-load & usability thresholds | 6 (Q76–Q81) |
| I — Defect definitions | 9 (Q82–Q90) |
| J — Compatibility rules | 1 (Q91 — explicit negative finding) |
| K — Additional audit criteria (merged from parallel passes) | 7 (Q92–Q98) |
| L — Scope-boundary evidence | 2 (Q99–Q100) |
| **Grand total** | **100 items** |

Ownership split: **26 quality-only**, **45 shared with design**, **17 shared with frontend**,
**12 shared with product**, **2 boundary-defining**, **1 negative finding**.

Source coverage: `SKILL.md`, `agents/openai.yaml`, and **all 22** reference files were read or
grepped; 18 contributed at least one item. The four that contributed none —
`experimental-and-creative.md` beyond its thresholds, `layout-and-composition.md` beyond two,
`tailwind-v4-theme.md` beyond its checklist, and `section-archetypes.md` beyond its acceptance
list — are accounted for in §5.

Seam rulings proposed: **8** (S1–S8). Deliberate exclusions recorded: **9**.

### Method note — how this was assembled

Three independent passes, deliberately overlapping so a miss in one would be caught by another:

1. **Lead direct read.** `SKILL.md`, `art-review.md`, `design-critique.md`,
   `anti-default-catalog.md`, `design-thinking.md`, `section-design-workflow.md`,
   `frontend-design-principles.md`, `design-direction.md`, `frontend-build-patterns.md` read in
   full (1,723 lines), plus a targeted threshold/pass-fail grep across the remaining 13 references,
   plus network verification of all three upstream licenses (§6.1).
2. **W1 — re-tag pass** over the 1,562-line prior extraction, hunting `[quality]` material
   mis-filed under the four original tags. Raw output: `_raw/webdesign-w1.md` (506 lines,
   **43 item-blocks**). Its per-theme counts: gates 10 · severity 5 · checklists 13 · a11y 1 ·
   performance 1 · **compatibility 0** · process 12 · other 1.
3. **W2 — verify-read** of the source hunting material never lifted at all, cross-checked against
   the prior extraction by exact-string match. Raw output: `_raw/webdesign-w2.md` (686 lines,
   **28 items, 0 NEW**) — the completeness proof discussed in §1.

**Merged coverage.** W2's contribution was not new items but **depth in W1's thin themes**:
accessibility went from W1's 1 item to 14 (the WCAG 4.5:1 / 3:1 rule recurring independently across
five files, plus the neumorphism conformance failure and the H1-hierarchy rule), and performance from
1 to 10 (Core Web Vitals, Awwwards weights and frame budget, the GPU element cap, the image-weight
budget). Deduplication was on `file:line`; where two passes lifted the same block, one verbatim copy
is kept and the routing notes are merged.

Passes 1 and 2/3 converged on the same headline transfers independently, which is the main reason to
trust the ranking in §2. Themes K and L exist because the worker passes surfaced items the lead's
read did not — most importantly the dark-pattern rejection table (Q98) and the scope-boundary
evidence (Q99), the latter being the clearest available argument for why `quality` must be a
separate skill rather than a `design` sub-mode. Theme J is a negative finding worth as much as a
positive one: there is no compatibility-audit doctrine to inherit.

The raw worker outputs are retained at `research/quality/_raw/` rather than deleted, so any
verbatim block in this document can be traced back to which pass found it.
