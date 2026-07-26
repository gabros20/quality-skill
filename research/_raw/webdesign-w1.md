# webdesign-extraction.md → quality re-tag (Worker W1)

**What this is.** A re-tagging pass over `/Users/tamas/Documents/Personal/Projects/digital-product-skill/research/product/webdesign-extraction.md` (1562 lines, ~296 item-blocks originally tagged `[product]` / `[design]` / `[frontend]` / `[cross]`). At the time of that extraction, `[quality]` did not exist as a destination. This document pulls out every item-block whose content is genuinely `quality` material — independent verification and system-level evidence for a built product — regardless of its original tag.

**Method.** Read the full 1562-line source document sequentially in four chunks. Every item-block was considered against the quality definition: test strategy, independent audit method, review gates and go/no-go decisions, severity/priority scales, defect reporting and triage, pass/fail criteria and thresholds, checklists that judge finished work, accessibility conformance verification, performance measurement against budget, compatibility checking, release readiness, and the discipline of not trusting the builder's own claim that something is done. Over-inclusion was preferred to under-inclusion per instructions; borderline items are marked as such in their "Why quality" line.

**Headline finding.** `art-review.md` — tagged almost entirely `[design]`/`[cross]` in the original pass — is structurally a quality/audit-gate specification wearing design-review clothing: it defines a severity scale (A0–A3), a verdict state machine (revise/approve), a no-first-pass-sign-off rule, a convergence/round-cap discipline, a machine-readable review-record schema, and an explicit statement that "functional correctness... belongs to a correctness QA pass" separate from design taste. Its content is dual-owned (design owns *what* is being judged — direction fidelity, composition; quality owns *how judging and gating work* — the scale, the state machine, the schema, the discipline). Likewise `design-critique.md` (scored heuristics, severity routing, mechanical checks) and several acceptance-checklist items scattered through `frontend-build-patterns.md`, `design-direction.md`, and `SKILL.md` are quality material that happened to live inside the old webdesign skill because it had nowhere else to put them.

---

## Theme: Review gates & go/no-go decisions

### Go/no-go QA gate (coverage, build health, real-browser check, blocking rule)
- **Source:** `design-critique.md:92-118`
- **Original tag:** `[product]`
- **Why quality:** This is the canonical release-readiness gate: mechanical coverage/build-health layers folded into the same P0–P3 severity list, with an explicit NO-GO rule. Core quality material.
- **Ownership:** shared with product

> When this rubric is the final check before a build ships (not just self-critique while building), add two mechanical layers underneath the judgment above, and let them gate the ship decision directly:
> - **Coverage.** Confirm every component/section the design or content plan calls for is actually wired up and rendering — not silently missing or falling back to a blank/placeholder state. A design system, template, or content model that defines a piece but never renders it is a load-bearing gap, not a cosmetic one: treat any such gap as a **blocker** (P0/NO-GO), not a polish item.
> - **Build health.** The build/typecheck/lint pipeline passes clean, and — if a design-system spec like `DESIGN.md` backs the project — it still lints clean... with no broken token references.
> - **Look at the real thing, don't just build it.** Drive a real browser and screenshot *every* route/page at both a desktop viewport (e.g. 1440×900) and a mobile device viewport (e.g. an iPhone-class width), then read the screenshots. Route real layout/visual defects — overflow or clipping, header overlap, broken or placeholder media, unusable mobile navigation, unwanted horizontal scroll, low contrast — into the P0–P3 severity system above. A screenshot-only review (never actually looking at rendered output) misses exactly the defects that matter most to a real visitor.
> Fold the coverage and build-health findings into the same P0–P3 list rather than keeping them as a separate checklist — a broken build or a missing section is exactly the kind of P0 that should block a ship decision alongside a usability P0 found by eye. **Any P0, or a P1 you can't immediately fix, is a NO-GO** — don't round up a broken core flow to "ready" because the visual polish is otherwise good.

### Verdict rules (approve / revise)
- **Source:** `art-review.md:157-165`
- **Original tag:** `[cross]`
- **Why quality:** Defines the exact conditions under which a review returns a ship/no-ship verdict — a go/no-go decision rule with concrete, addressable-instruction requirements.
- **Ownership:** shared with design

> The **verdict**:
> - **`revise`** when any A0/A1 remains. List those as **specific, addressable instructions** the builder can act on without you present — name the page, the section, what's wrong, and the concrete fix ("hero is centered with two buttons; recompose as an asymmetric 5:7 split, text flush-left, per the design direction's editorial register"). A2/A3 go in a separate notes list (worth taking, don't gate).
> - **`approve`** when there are **zero A0 and zero A1** findings — the build honors the direction — **and this is not the first review round** (see the no-first-pass rule below).

### No-first-pass-sign-off rule
- **Source:** `art-review.md:167-179`
- **Original tag:** `[cross]`
- **Why quality:** A named decision rule that forbids rubber-stamping on round 1 — directly matches "the discipline of not trusting the builder's own claim that something is done."
- **Ownership:** shared with design

> **Round 1 must never be a sign-off.** A first look almost always has *something* worth fixing, and a too-easy round-1 approval is exactly the failure this discipline exists to prevent. So on **round 1**:
> - If you found any A0/A1 → `revise` as normal.
> - If you genuinely found **no** A0/A1 → you still return **`revise`**, and **promote the 1–3 highest-value refinements** (your best A2 items — the icon/text/alignment/detail improvements that would most lift the build) into the blocking list so the builder makes **one real polish pass**. Mark each promoted item as gating this round (elevate it to A1 for routing purposes) and flag it as promoted, and say in the summary that these are promoted round-1 polish items, not direction violations.
> This guarantees at least one build→review→**fix**→review cycle. From **round 2 onward** the normal rule applies: `approve` the moment A0/A1 are clear.

### Convergence discipline (round-over-round, cap the loop)
- **Source:** `art-review.md:184-195`
- **Original tag:** `[cross]`
- **Why quality:** Governs how a multi-round review process terminates — a release-process discipline (don't chase perfection, don't thrash, cap rounds) that is exactly quality's territory.
- **Ownership:** shared with design

> - **Converge from round 2 on, don't chase perfection.** Once the mandatory first revision is done, approve as soon as A0/A1 are clear, even if A2/A3 remain. The bar is "honors the direction and has no obviously-unfinished details," not "flawless." Don't hold the build hostage to taste micro-preferences.
> - **Round-over-round, only escalate.** On round 2+, judge whether your prior blocking items were fixed. Don't introduce *new* low-value nitpicks you let pass earlier — that's thrash. New A0/A1 only if a revision genuinely broke something or a real defect was missed.
> - **Cap the loop.** Agree a hard round limit up front (a good default is 3 rounds). If A0/A1 still remain at the cap, proceed anyway with the findings recorded — so make the final round's blocking list the *highest-leverage* fixes, not an exhaustive one.

### Reviewer/builder role separation; scope boundary vs correctness QA
- **Source:** `art-review.md:229-236`
- **Original tag:** `[cross]`
- **Why quality:** Explicitly names the boundary between design-taste review and a "correctness QA pass" (build/typecheck, coverage, route parity, broken links, data delivery) — this is the clearest statement in the whole source document of exactly where quality's jurisdiction begins.
- **Ownership:** quality-only (the boundary statement itself); shared with design (the review it's bounding)

> "**The reviewer's deliverable is the punch-list, not the fix.** A build that drifts from the direction is exactly what this review exists to catch, but someone else does the fixing — keep the roles separate even if the same person plays both at different times.
> **Design taste only.** Functional correctness (build/typecheck, coverage of intended components, route parity, broken links, data delivery) belongs to a correctness QA pass..., don't duplicate it here. If you spot a hard functional break (a section renders nothing, an image 404s everywhere), note it in the summary so it gets caught early, but your severities are about the *look*."

### Iterative design-review loop
- **Source:** `frontend-build-patterns.md:303-318`
- **Original tag:** `[frontend]/[cross]`
- **Why quality:** A revise→rebuild→re-verify loop procedure with an explicit anti-regression rule ("leave unflagged sections alone") — process discipline for closing out review findings.
- **Ownership:** shared with frontend

> Iterative design-review loop: 1) Apply every **blocking** item — both direction violations and composition failures. Each item should name a route, a section, and a concrete fix. 2) Take cheap, clearly-right optional suggestions if you agree. 3) **Leave unflagged sections alone** — don't regress signed-off work, don't redesign the whole page for one fix. 4) Rebuild and re-run the full visual self-check. Work only from the punch-list as written — never guess at unstated intent behind a flagged item.

### Acceptance checklist (build/registry/route/redirect completeness)
- **Source:** `frontend-build-patterns.md:320-330`
- **Original tag:** `[frontend]`
- **Why quality:** A literal release-acceptance checklist — pass/fail criteria for whether a build is ready, including the explicit conjunction "build is green **and** desktop+mobile screenshots show no unresolved defect."
- **Ownership:** shared with frontend

> Acceptance checklist: client component exists for every section key, registry covers all with no gaps and fails loud on a miss; build is green **and** desktop+mobile screenshots show no unresolved defect (residuals explicitly noted); routes match target sitemap, unresolved media falls back to placeholder (logged, never silent), every kept nav/footer link resolves to real page or "not part of demo" fallback — no kept link ever 404s; if routes restructured, every redirect-map entry implemented and returns permanent redirect.

### Acceptance criterion (DESIGN.md / lint)
- **Source:** `design-direction.md:189-193`
- **Original tag:** `[cross]`
- **Why quality:** An explicit pass/fail acceptance criterion for a design-system artifact, gated on a lint tool with zero errors — a release gate in miniature.
- **Ownership:** shared with design

> `design.md lint` passes with **no `broken-ref` errors**; the `DESIGN.md` covers at least `colors` and `typography`, carries a Do's-and-Don'ts section, and no choice matches an unexamined entry in [anti-default-catalog.md](anti-default-catalog.md).

### Completion and handoff checklist (verification honesty)
- **Source:** `SKILL.md` L96-107
- **Original tag:** `[cross]`
- **Why quality:** Explicit instruction to never overstate what verification was actually performed ("never imply screenshot review when only code was available") — this is precisely "the discipline of not trusting the builder's own claim that something is done," applied reflexively to the reviewer's own claims.
- **Ownership:** quality-only

> Before completion:
> - Confirm every requested page, section, state, or review artifact exists.
> - Validate the result at the viewports and interaction states relevant to the request.
> - For visual review, state which rendered evidence was actually inspected; never imply screenshot review when only code was available.
> - Record unresolved content, asset, accessibility, engineering, SEO, or measurement work with an owner rather than silently absorbing it.
> - When downstream implementation or assurance is expected, provide artifact paths, constraints, decisions, risks, and the recommended next skill without duplicating the full artifact.

### The design.md CLI — lint as "the QA gate," diff as regression gate
- **Source:** `design-direction.md:102-114`
- **Original tag:** `[frontend]`
- **Why quality:** The source text literally labels `design.md lint` as "**The QA gate**" and `design.md diff` as a mechanism to "Gate design iterations" via "nonzero exit on regression" — an automated verification/regression-gate tool, plus a 9-rule lint list including a WCAG contrast check.
- **Ownership:** shared with frontend

> | Command | Use |
> |---|---|
> | `design.md spec [--rules]` | Print the spec (or just the rules table) — inject into the authoring prompt so you work against the installed version. |
> | `design.md lint <file>` | Validate: resolves token refs, checks **WCAG contrast** (AA < 4.5:1 warns), structure. Emits JSON findings. **The QA gate.** |
> | `design.md export <file> --format <fmt>` | Export tokens. `json-tailwind` (Tailwind v3 config), `css-tailwind` (Tailwind v4 `@theme` CSS), `dtcg` (W3C `tokens.json`). **The bridge into the build.** |
> | `design.md diff <a> <b>` | Token + prose regression detection between versions; nonzero exit on regression. Gate design iterations. |
> **Lint rules** (9): `broken-ref` (error) · `missing-primary` (warn) · `contrast-ratio` (warn, <4.5:1) · `orphaned-tokens` (warn) · `token-summary` (info) · `missing-sections` (info) · `missing-typography` (warn) · `section-order` (warn) · `unknown-key` (warn — typo detection, e.g. `colours:` → `colors:`).

---

## Theme: Severity & priority scales

### A0–A3 severity scale (art-direction review)
- **Source:** `art-review.md:137-153`
- **Original tag:** `[design]`
- **Why quality:** A named, four-level severity scale with explicit blocking/advisory routing rules — the exact shape of a defect-triage scale.
- **Ownership:** shared with design

> "- **A0 — direction violation.** Off-direction palette/type/register, a clear anti-default-catalog tell, broken hierarchy. **Blocks** → drives a revision round.
> - **A1 — composition/rhythm failure OR a real detail defect.** Centered-everything, uniform repeated card grids, identical section rhythm, no signature section on the page — **and** the detail-level flaws that read as unfinished: an **icon misused / wrong-for-meaning / awkwardly positioned / mismatched in size or style**, **text that overflows, clips, collides, or breaks into awkward orphans**, **visibly misaligned elements** (things that should share an edge/baseline but don't). **Blocks.** (Judge severity by how obvious it is — a clearly awkward icon or broken text wrap is A1; a 2px nudge is A2.)
> - **A2 — refinement.** Sub-perceptual spacing/alignment/measure/motion-tuning that would lift it but isn't *noticeably* wrong. Advisory — fix if cheap, never blocks.
> - **A3 — delight.** Optional polish. Advisory."

### Round-1 acceptance criteria (A0/A1 mandatory)
- **Source:** `art-review.md:220-225`
- **Original tag:** `[design]`
- **Why quality:** Ties the A0–A3 scale to concrete acceptance criteria for a review record — pass/fail conditions expressed as data-contract rules.
- **Ownership:** shared with design

> "The review record has an explicit `verdict`; on `revise`, every A0/A1 appears in the blocking list with a concrete fix. On `approve`, blocking is empty and `signed_off` is true. **Round 1's verdict is never `approve`** — it always carries at least one blocking item, whether a real A0/A1 or a promoted round-1 polish item."

### Review-record output schema (machine-readable severity findings)
- **Source:** `art-review.md:201-216`
- **Original tag:** `[cross]`
- **Why quality:** A typed schema for recording review findings — severity, per-section fidelity, blocking vs. notes, sign-off boolean. This is exactly the data shape a quality/defect-tracking system needs.
- **Ownership:** shared with design

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

### P0–P3 severity routing (design-critique)
- **Source:** `design-critique.md:74-82`
- **Original tag:** `[cross]`
- **Why quality:** A second, independent severity scale with a concrete escalation test ("would a real user contact support over this?") — defect triage discipline.
- **Ownership:** shared with design

> **P0** — blocks the core task or excludes a user (unusable control, contrast failure on a primary action, keyboard trap).
> **P1** — the test: **"would a real user contact support over this?"** If yes, it's at least P1.
> **P2** — friction or inconsistency that slows people but has a workaround.
> **P3** — polish, delight, refinement.

### Content-drift as a top-severity finding
- **Source:** `art-review.md:32-34`
- **Original tag:** `[product]`
- **Why quality:** A severity-classification decision rule — when to escalate a specific defect type to top severity, tied to source-copy/IP preservation.
- **Ownership:** shared with product

> "If the project preserves existing copy as SEO-sensitive IP, also flag any section whose copy the build **altered** from the source/blueprint as a top-severity finding — content drift isn't a design nitpick when the copy itself must be preserved."

---

## Theme: Audit checklists (judging finished work)

### Nielsen's 10 heuristics scored 0–4, with honesty calibration
- **Source:** `design-critique.md:36-45`
- **Original tag:** `[design]`
- **Why quality:** A scored independent-audit method against a named external standard (Nielsen heuristics), with an explicit anti-grade-inflation calibration statement — squarely "independent audit method."
- **Ownership:** shared with design

> Score each heuristic 0 (broken) → 4 (exemplary): visibility of system status · match to the real world · user control & freedom (undo/redo, escape hatches) · consistency & standards · error prevention · recognition over recall · flexibility & efficiency · aesthetic & minimalist design · help users recognize/diagnose/recover from errors · help & documentation.
> **Honesty calibration:** most real, shipped interfaces score **20–32 / 40**. A 38 means you aren't looking hard enough. Report the per-heuristic scores, not just the total, and name the lowest two as the focus.

### Five test personas
- **Source:** `design-critique.md:59-64`
- **Original tag:** `[design]`
- **Why quality:** A structured multi-persona verification walkthrough of a built flow — an independent audit technique, including an explicit accessibility-user pass.
- **Ownership:** shared with design

> Walk the key flow as each: **power user** (is it fast, keyboardable?), **first-timer** (is the next step obvious?), **accessibility user** (focus order, contrast, labels, reduced motion), **stress-tester** (long strings, empty/overflow/error states), **distracted-mobile** (one thumb, sunlight, half-attention).

### Cognitive-load classification and working-memory rule
- **Source:** `design-critique.md:47-58`
- **Original tag:** `[cross]`
- **Why quality:** Numeric thresholds (nav ≤ 5, hierarchy ≤ 3 tiers, form ≤ 4 fields) used to flag named violations — a review checklist with hard limits, borderline shared with design since the underlying classification (intrinsic/extraneous/germane) is a design-thinking concept.
- **Ownership:** shared with design

> Classify load as **intrinsic** (inherent to the task — keep), **extraneous** (caused by the design — cut), or **germane** (builds the user's mental model — keep). Then check:
> - **Working-Memory Rule:** a person holds **≤ 4 items** at once (Miller's 7±2, revised down by Cowan, 2001). Concretely: **nav ≤ 5** top items, **hierarchy ≤ 3 tiers**, **a form step ≤ 4 fields** before it feels like work.
> - Watch for named violations — e.g. **"The Wall of Options"** (every choice shown at once with no progressive disclosure), undifferentiated dense tables, dialogs that ask the user to remember something from the previous screen.

### Mechanical checks (deterministic, eye-missed defects)
- **Source:** `design-critique.md:66-72`
- **Original tag:** `[cross]`
- **Why quality:** Explicitly "deterministic checks the eye misses" — contrast ratios, overflow, heading-level skips, tap-target size, line length, token-usage — this is an accessibility-and-consistency conformance checklist, plus an explicit nod to automated tooling.
- **Ownership:** shared with design

> Pair the judgment above with deterministic checks the eye misses: contrast ratios (AA ≥ 4.5:1 body / 3:1 large), text never clipped or overflowing its container, no skipped heading levels, tap targets ≥ 44px, line length ~45–75ch, design-system tokens actually used (no off-scale one-off colors / radii / fonts). Check by hand or with the build's lint/a11y tooling; if you have an automated contrast/a11y detector available, run it and treat this as the pass it automates.

### Synthesis method / peak-end rule for review writeups
- **Source:** `design-critique.md:84-90`
- **Original tag:** `[cross]`
- **Why quality:** Method for reconciling judgment-based and mechanical-check findings (agreement, detector-caught misses, false positives) when writing up a review — reporting discipline for an audit.
- **Ownership:** shared with design

> Don't just list findings — **weave** the two assessments: note where judgment and mechanical checks agree (high confidence), where the detector flagged something the review missed (and vice-versa), and call out any false positives. Close with a **peak-end read**: what's the emotional high point of the flow, and what's the last thing the user feels? Those two moments disproportionately shape how the whole experience is remembered.

### Purpose/provenance — "run it honestly"
- **Source:** `design-critique.md:25-33`
- **Original tag:** `[cross]`
- **Why quality:** States the core discipline of independent audit directly: "the point is to find the problems, not to award a high number."
- **Ownership:** shared with design

> A repeatable way to *review* an interface, not just admire it... Adapted from `pbakaus/impeccable` (Apache-2.0). Run it honestly — the point is to find the problems, not to award a high number.

### The anti-boring checklist (pass/fail on a built section)
- **Source:** `section-design-workflow.md:128-149`
- **Original tag:** `[design]`
- **Why quality:** A literal pass/fail checklist ("Section fails if you answer 'no' to the top block or 'yes' to the bottom block") used to judge a finished section — this is a gate, not a build instruction, even though the underlying subject matter is design craft.
- **Ownership:** shared with design

> "Section fails if you answer "no" to the top block or "yes" to the bottom block.
> **Must be YES:**
> - Depth: are there ≥2 visual planes, or at least one unifying texture/glow/shadow? (not one flat fill)
> - One focal point: squint — is it obvious what's #1? Exactly one element is biggest/boldest.
> - Contrast move: is there a real jump in scale OR weight OR color OR depth somewhere?
> - One signature: what's the one thing someone remembers here? (if "nothing" → recompose)
> - Grayscale test: hierarchy still reads with color removed? (proves it's not propped up by color)
> - Spacing system: gaps come from one scale (4/8px base); within-group gap < between-group gap.
> - Quality floor: responsive to mobile, visible keyboard focus, `prefers-reduced-motion` respected.
> **Must be NO (the "AI-slop" tells — any one is a hit):**
> - Centered-everything with even spacing throughout.
> - Three identical equal-width feature cards as the only idea.
> - Every section the same rhythm (centered text over a uniform card grid).
> - Weak heading↔body contrast; default Inter + indigo-600/slate-900; purple/gradient decoration for its own sake.
> - Emoji used as icons; predictable 01/02/03 markers on content that isn't actually a sequence.
> - More than two "bold moves" fighting in one section."

### Anti-default catalog as an audit reference ("how to use this")
- **Source:** `anti-default-catalog.md:71-78`
- **Original tag:** `[design]`
- **Why quality:** The source text itself states this catalog is "the reference an art-review.md pass judges a finished build against" — i.e. it is explicitly repurposed as an audit checklist, not just a build-time style guide.
- **Ownership:** shared with design

> "## How to use this
> During the plan-critique pass..., run your draft token system against this list: any color, type, or structural choice that matches a tell must either earn its place with a brief-specific reason or be replaced — and say what you changed and why. It's also the reference an [art-review.md](art-review.md) pass judges a finished build against."

### B5: Refinement pass checklist (self-critique, borderline)
- **Source:** `design-thinking.md:93-101`
- **Original tag:** `[design]`
- **Why quality:** Borderline — this is a self-critique checklist the builder runs on their *own* work before shipping, rather than an independent verifier's audit. Included because it is an explicit 8-item pass/fail-style checklist with numeric limits, a pattern quality could adopt as a pre-ship self-check gate.
- **Ownership:** shared with design

> - **Squint test** — hierarchy survives blur? Primary action still obvious?
> - **Grayscale test** — works with color removed? (proves hierarchy isn't propped up by color alone)
> - **Alignment audit** — count left edges; collapse strays to the grid.
> - **Spacing audit** — within-group gaps < between-group gaps, consistently; values from one scale (4/8px base).
> - **Type audit** — ≤3 sizes, ≤2 families, body line length 45–75ch; headings on the scale.
> - **Color audit** — one accent, used once for the primary action; WCAG AA contrast (4.5:1 text).
> - **Remove-one test** — can any element be deleted without loss? If yes, delete it and add space.
> - **Consistency** — radii, shadows, button styles, icon weight all from one token set.

### B6: Critique framework (I like/I wish/what if + scoring rubric + ordering rule)
- **Source:** `design-thinking.md:103-114`
- **Original tag:** `[cross]`
- **Why quality:** A structured critique method that separates taste from function and defines a scoring rubric with an explicit ordering discipline — a review methodology.
- **Ownership:** shared with design

> - **Separate taste from function.** Ban "I like / I don't like." Anchor every note to a goal: user task, hierarchy, readability, conversion, accessibility, brand. "The CTA loses to the image because it has less contrast" beats "the button feels off."
> - **Structure feedback** with *I like / I wish / What if* — what works, a constructive gap, an exploratory option.
> - **Dimensions to score** (usable rubric): hierarchy & focal point · spacing & rhythm consistency · alignment/grid discipline · type system · color discipline (accent rationing + contrast) · whitespace · the one bold move (memorability) · motion purposefulness · accessibility (contrast, reduced-motion, focus states) · reads intentional vs templated.
> - **Order:** section job → hierarchy → system consistency → polish. Don't critique a gradient before the reading order is right.

### The award-winner's discipline — Awwwards judging rubric
- **Source:** `experimental-and-creative.md:150-161`
- **Original tag:** `[product]/[cross]`
- **Why quality:** A named external scoring rubric (Design 40 / Usability 30 / Creativity 20 / Content 10) used to judge finished creative work, plus an explicit accessibility-floor clause even for experimental sections — a judging framework, borderline since its primary use in the source is a design-strategy heuristic.
- **Ownership:** shared with product and design

> **The award-winner's discipline (synthesized from Awwwards judging)**: "One signature, not twenty effects." Awwwards weights **Design 40 / Usability 30 / Creativity 20 / Content 10** — creativity is real but usability outweighs it. Spend the wow on ONE moment. "Custom > template." Judges spot off-the-shelf instantly. "Performance is design." Treat the frame budget as a constraint from day one. "Narrative." The signature should *mean* something about the subject — emotion and story, not effect for its own sake. "Accessibility floor still applies." Reduced-motion path, keyboard reachability, focus states, and no meaning-by-motion-alone — even on the most experimental section.

### Section-archetype catalog acceptance checklist
- **Source:** `section-archetypes.md:154-165`
- **Original tag:** `[cross]`
- **Why quality:** A structural correctness checklist for a content-model artifact (unique keys, fixed type vocabulary, collection/global marking, dangling-link fallback rule, logo field rule) — a pass/fail acceptance gate for a non-visual artifact.
- **Ownership:** shared with product

> Acceptance checklist (verbatim list) — unique keys, fixed type vocabulary, collection/global marking, `interactive` marker, sitemap references only catalog keys + home route, dangling-link fallback rule, logo field rule.

### Visual end-to-end self-check
- **Source:** `frontend-build-patterns.md:280-301`
- **Original tag:** `[frontend]/[cross]`
- **Why quality:** Opens with the exact quality thesis — "A green build proves the code compiles, not that the page looks right" — then gives a concrete independent-verification procedure (screenshot every route, hunt for named defect types, capped fix/re-shoot loop, explicit residual-issue reporting).
- **Ownership:** shared with frontend

> Visual end-to-end self-check: **A green build proves the code compiles, not that the page looks right.** 1) Serve the build, get full route list from sitemap. 2) Screenshot every route at two viewports (e.g. 1440×900 desktop + a representative mobile size); for scroll-reveal/lazy-loaded content, step-scroll with short waits, then scroll back to top before final capture. 3) Actually look at each screenshot for real defects: text overflow/clipping (oversized display heading is classic), element overlap, fixed header obscuring first heading, broken/placeholder images, unreachable/overlapping mobile nav, cramped/collapsed spacing, low-contrast text over imagery, horizontal scroll on mobile; re-check against anti-slop checklist. 4) Fix and re-shoot — loop capping at a few rounds, explicitly noting residual issues rather than looping forever. 5) Tear down the server when done.

---

## Theme: Accessibility & contrast thresholds

### Contrast/accessibility floor (color-and-rhythm)
- **Source:** `color-and-rhythm.md:88-91`
- **Original tag:** `[design]`
- **Why quality:** A hard numeric accessibility threshold (WCAG AA contrast) with a verification instruction ("verify on both surfaces if you alternate... and on the brightest image area if text sits over a photo") — a conformance check, not just a build-time target.
- **Ownership:** shared with design

> "Body text ≥ **4.5:1**, large text (≥18pt / 14pt bold) ≥ **3:1** (WCAG AA). Verify on *both* surfaces if you alternate (§1) and on the *brightest* image area if text sits over a photo (`imagery.md §3`).
> Never carry meaning by color alone (accent + an icon/label)."

---

## Theme: Performance criteria

### Core Web Vitals as a design constraint (borderline)
- **Source:** `trust-proof-and-structure.md:86-103` (specific bullet within the larger SEO-structure item)
- **Original tag:** `[cross]/[frontend]`
- **Why quality:** Names concrete performance thresholds (CLS avoidance mechanism, sub-3s/sub-1s load target for LCP) tied to a trust/ranking signal — borderline, because in the source it is framed as a build-time constraint rather than a post-build measurement/verification step. Flagged because "performance measurement against a budget" is explicitly quality's territory and the numeric target itself is the seed of a budget.
- **Ownership:** shared with frontend and product

> "**Core Web Vitals as a design constraint, not a cleanup pass:** reserve media space with `aspect-ratio`/`width`+`height` to avoid **CLS**; lazy-load below-the-fold; WebP/AVIF; keep the hero light for **LCP**. Sub-3s (ideally sub-1s) load is itself a trust and ranking signal."

---

## Theme: Compatibility rules

No item-blocks in the source document were found to be primarily about cross-browser/cross-device *compatibility checking* as an independent verification activity (browser-support caveats exist throughout `imagery.md`, `experimental-and-creative.md`, and `motion-and-interaction.md`, but they are framed as build-time progressive-enhancement guidance rather than a post-build compatibility audit, so they were left with their original `[frontend]`/`[design]` tags).

---

## Theme: Workflow/process discipline

### Art-direction review — purpose statement
- **Source:** `art-review.md:1-3`
- **Original tag:** `[design]`
- **Why quality:** Frames the entire reference as "judging a rendered build against its approved visual direction" — the definition of independent verification, even though the subject matter judged is design taste.
- **Ownership:** shared with design

> "# Art-direction review — judging a build against its design direction
> Purpose: Judge a rendered build against its approved visual direction and return an actionable punch list or sign-off."

### The studio creative-review pass — reviewer stance
- **Source:** `art-review.md:26-30`
- **Original tag:** `[design]`
- **Why quality:** Establishes the reviewer-is-not-the-builder discipline and the direction→build→review→revise→sign-off cycle — a process description of an independent QA loop.
- **Ownership:** shared with design

> "The studio creative-review pass: the eye that set the visual direction ... checks the build before final correctness QA. You judge with taste, not a test runner. If you can't edit the code yourself, your job is to **see, judge, and write the punch-list** for whoever builds — direction → build → *review* → revise → sign-off, repeated until the build honors the direction."

### What you judge against — 4-point framework
- **Source:** `art-review.md:36-50`
- **Original tag:** `[design]`
- **Why quality:** Defines the evidence base an independent reviewer must check a build against (the written contract, source signals, project-specific doctrine, and the reviewer's own informed judgment) — an audit-method specification.
- **Ownership:** shared with design

> "1. **The project's `DESIGN.md`** (or equivalent design-direction document) — the contract that was written. Palette, type pairing, register per-surface, the signature element. Does the build read as this direction, or did it drift to a default?
> 2. **The original source design signals**, when the brief is "new look, same brand" — the source look the build should still evoke.
> 3. **Any project-specific design-system doctrine** the build was supposed to follow — an anti-slop checklist, editorial principles, an "art-direct the page" rule set. Absent a project-specific doctrine, use [anti-default-catalog.md] and [frontend-design-principles.md] as the bar, including the **signature-section rule**: every page needs at least one bespoke composition, not just a catalog assembly of generic sections.
> 4. Your own design taste, informed by the anti-default catalog and the "spend your boldness in one place" discipline."

### Capture tooling capability contract
- **Source:** `art-review.md:52-64`
- **Original tag:** `[frontend]`
- **Why quality:** Specifies the minimum evidence-capture capability required to do a visual review at all (serve, screenshot at two viewports with reduced-motion emulated, multimodal read) — an evidence-standard for an audit.
- **Ownership:** shared with frontend

> "This review is visual: it cannot run from source code alone. The capability contract, independent of any specific tool:
> 1. **Serve the build** (dev server or static output) on a local port.
> 2. **Screenshot it programmatically** — per-section tight crops, two viewports (desktop ~1440×900 and an iPhone-class device), `prefers-reduced-motion` emulated, each element scrolled into view before the shot (lazy images).
> 3. **Read the images** — the reviewing model must be multimodal. No vision, no art review.
> Token economy: **spend tokens reading crops, not driving the browser.** A picture is worth a thousand tokens; a chatty automation layer burns them before you've seen anything."

### Tooling specifics + honest degradation rule
- **Source:** `art-review.md:66-78`
- **Original tag:** `[frontend]`
- **Why quality:** Includes the explicit instruction "Never present an unviewed review as a viewed one" — a direct instance of not overstating verification actually performed.
- **Ownership:** shared with frontend

> "**Batch capture (building the manifest): script it.** A short throwaway Playwright script — or a shell loop issued as one command — that walks every route/section and writes all crops plus an ordered manifest (document order, desktop before mobile) to a directory in a single run. Zero tokens while it runs; you only pay to look at the results.
> **Interactive inspection (hover states, nav, forms, "what does this actually do"): `agent-browser`** — a fast CDP-based CLI built for agents (`npm i -g agent-browser && agent-browser install`, then `agent-browser skills get core` for usage that matches the installed version). Terse output — a click returns "Done", not a page snapshot — makes it an order of magnitude cheaper in context than MCP-based browser automation; it needs no Playwright/Puppeteer install and runs on any agent host. `set viewport 1440 900` / `set device "iPhone 14"` cover the two-viewport rule.
> **Fallback: your host's native browser tools** (e.g. Claude Code's Chrome integration) when nothing can be installed.
> **No browser at all → degrade honestly.** Review markup/CSS/tokens against the direction and label the result explicitly: *"code-level pass — not an art review; no build was viewed."* Never present an unviewed review as a viewed one."

### Capture procedure (systematic evidence-gathering)
- **Source:** `art-review.md:85-92`
- **Original tag:** `[design]`
- **Why quality:** A systematic evidence-collection procedure (ordered manifest, both viewports, reduced-motion settled) that distinguishes a real capture miss from a design defect — audit-evidence discipline.
- **Ownership:** shared with design

> "Full-page screenshots downscale and lose the detail art direction actually lives in. Capture each distinct section/component of the built page as its own tight crop, at both a desktop viewport and a mobile device viewport, with reduced motion emulated so reveal/scroll animations settle to their final resting state before the shot — a blank crop from motion-in-progress is a capture miss, not a design defect; note it and move on. Build an ordered manifest (document order, desktop before mobile per section) so the walk below is systematic rather than a random scroll-through."

### Write-as-you-go rule (avoid recency bias in review notes)
- **Source:** `art-review.md:94-100`
- **Original tag:** `[design]`
- **Why quality:** A methodological rule against batching judgment (which loses early findings to fading first impressions) — evidence-integrity discipline for an audit.
- **Ownership:** shared with design

> "Go down the manifest in order. For **each** section: look at it, then **immediately write a short finding for it** into a running notes document before moving to the next. Don't batch the whole page and judge it at the end — typing each observation as you see it keeps every per-section judgment available, so when you synthesize the final hand-off nothing gets lost to a fading first impression."

### Zoom-in discipline (don't rubber-stamp the gestalt)
- **Source:** `art-review.md:102-108`
- **Original tag:** `[design]`
- **Why quality:** Explicit anti-complacency instruction for an auditor — "Finding nothing is a conclusion you earn by looking, not a default."
- **Ownership:** shared with design

> "**Zoom in — don't rubber-stamp the gestalt.** A section can read fine at a glance and still be wrong in the details: a misused or awkwardly placed icon, an icon in the wrong size/style, text that wraps into an orphan or overflows its container, a label misaligned with its value, elements that don't sit on a shared line. These are exactly the flaws that slip through a fast "looks good" approval. Inspect each crop at full resolution and **actively hunt for the small defect** in every section before you accept it. Finding nothing is a conclusion you earn by looking, not a default."

### Per-section review checklist (direction fidelity, composition, iconography, micro-typography)
- **Source:** `art-review.md:110-135`
- **Original tag:** `[design]`
- **Why quality:** A detailed per-section checklist used to inspect and score a finished build — the operational core of the art-review audit.
- **Ownership:** shared with design

> "- **Direction fidelity** — palette/type/register match the design direction? Or drifted to a default (cream+serif+terracotta, near-black+acid-accent, generic broadsheet...)?
> - **Composition** — asymmetry & tension, or centered-everything? Intentional grid use, or a uniform card grid? Real type hierarchy (display↔body jump), or flat?
> - **Rhythm** — does this section's density differ from its neighbors, or is every section the same height/padding?
> - **Iconography** *(inspect every icon)* — is each icon the **right symbol for its meaning** (not a vaguely-related or generic glyph)? One **consistent set/style/weight** across the section (not mixed outline+solid, not mismatched sizes)? **Optically centered & aligned** in its container and on a shared baseline/axis with its label (not floating, off-center, clipped, oversized, or crammed against text)? No **emoji-as-icons** and no **hand-rolled inline icon SVG** when a real icon library was available and a meaning→icon mapping exists — a wrong-for-meaning, hand-drawn, mis-sized, or mixed-weight icon is a real defect at review time, not a nitpick.
> - **Micro-typography & element detail** — **awkward line breaks / orphans / widows**, text that **overflows, clips, or collides** with a neighbor, cramped or uneven padding, headings that wrap badly, **misaligned elements** (things that should share an edge/baseline but don't), inconsistent gaps, off-center content, buttons with lopsided label padding. The small alignment/spacing/wrapping flaws that make a build feel unfinished.
> - **Anti-slop tells** — rounded-2xl+shadow cards, gradient text, emoji icons, purple/indigo, a predictable 3-col icon-title-blurb, weak contrast...
> - **Desktop ↔ mobile** — does the composition hold on mobile, or collapse to a generic stack? Do icons and text keep their alignment on mobile, or do labels wrap and icons drift?"

### Craft gotchas — treat parser warnings as hard failures (borderline)
- **Source:** `frontend-build-patterns.md:258-277`
- **Original tag:** `[frontend]`
- **Why quality:** Mostly frontend-implementation troubleshooting, but the closing instruction is a pure quality point: "Treat any such parser warning as a hard failure, and verify tokens are actually applied (inspect computed styles) during visual QA, not just from a green build." Included in full for verbatim integrity of the item-block.
- **Ownership:** shared with frontend

> **Container-token collision.** Redefining or removing the container/spacing custom-properties block re-collapses `max-w-*`-based layout across the whole site. **Grid child collapse.** An element with `max-w-*` placed directly inside a `grid-cols-[minmax(0,1fr)_auto]`-style track shrinks to min-content instead of filling its track — add `w-full` explicitly. **Button label wrap.** Inline-flex button labels can wrap mid-phrase ("View / Projects") — set `white-space: nowrap` on button/label text. **Map embeds paint black in headless browsers.** An embedded map iframe can render as a solid black box under headless/automated screenshot capture — put an on-brand fallback panel behind the iframe. **A literal `*` in a comment inside/near a token block can silently drop the whole block.** Some CSS minifiers/parsers choke on glob-style names in prose comments (e.g. writing `--spacing-*` inside a comment near `@theme`) and print a soft warning while dropping the entire token block — a build that's green but has lost all its tokens. Treat any such parser warning as a hard failure, and verify tokens are actually applied (inspect computed styles) during visual QA, not just from a green build.

### Skill scope boundary — excludes "full accessibility audits"
- **Source:** `SKILL.md` L1-12 (frontmatter)
- **Original tag:** `[cross]`
- **Why quality:** Confirms, by explicit exclusion, that "full accessibility audits" were never webdesign's job — useful negative-space evidence that accessibility conformance verification belongs to quality (or a dedicated accessibility skill), not design/frontend.
- **Ownership:** boundary-defining, not itself quality content

> "description: >- Design and build distinctive websites, landing pages, and marketing-site interfaces from direction through visual QA of the builds it produces. Use for art direction, DESIGN.md systems, page IA, section composition, typography, color, imagery, motion, conversion-aware layout, CSS/theme implementation, or visual critique of those builds. Include frontend code only when it produces the approved appearance. Do not use for application state or data architecture, backend work, component API engineering, app dashboards and product UI, full accessibility audits, general SEO strategy, growth planning, or standalone design critique of work it did not build, unless the request also requires website design."

### Core workflow — art review and critique gate as named stages
- **Source:** `SKILL.md` L31-42
- **Original tag:** `[cross]`
- **Why quality:** The overall 6-phase workflow names "Art review" (inspect rendered evidence, issue A0-A3 punch list) and "Critique gate" (score usability/visual quality, route findings, decide go/no-go) as distinct, terminal workflow stages — confirming that review/gate work was treated as its own phase, separate from Direction/Structure/Craft/Build.
- **Ownership:** shared with design

> "## Core workflow
> Enter at the earliest stage required by the request; do not replay upstream work when approved artifacts already exist.
> 1. **Direction:** name the register and point of view; record palette, type, tokens, and signature.
> 2. **Structure:** produce the sitemap, navigation, page blueprints, and deduplicated section catalog.
> 3. **Craft:** give each section one bold move and one or two precisely executed devices.
> 4. **Build:** implement the appearance layer against approved artifacts and the existing stack.
> 5. **Art review:** inspect rendered evidence section by section and issue an A0-A3 punch list.
> 6. **Critique gate:** score usability and visual quality, route findings, and decide go/no-go."

---

## Theme: Other

### Universal invariants — "the anti-boring gate" (borderline)
- **Source:** `SKILL.md` L73-86
- **Original tag:** `[cross]`
- **Why quality:** Borderline — mostly design-craft invariants, but one clause directly names a gate ("Check every result against named defaults and the anti-boring gate; remove one decorative move before shipping"), reinforcing the anti-boring checklist captured above as a genuine pre-ship gate rather than pure style guidance.
- **Ownership:** shared with design

> "## Universal invariants
> - Name the register per surface: marketing and brand surfaces reward distinction; dense product surfaces reward earned familiarity.
> - Design for the subject and business stakes. Sequence emotional impact, proof, and low-friction action instead of blending them into a generic compromise.
> - Give each section depth, one focal point, a meaningful contrast jump, and one bold move supported by no more than one or two devices.
> - Use real content and real assets. Do not hide weak decisions behind lorem ipsum, stock imagery, emoji icons, or invented proof.
> - Check every result against named defaults and the anti-boring gate; remove one decorative move before shipping.
> - Preserve responsive behavior, interaction states, reduced motion, and legibility while pursuing distinctiveness."

---

## Totals

| Theme | Item count |
|---|---:|
| Review gates & go/no-go decisions | 10 |
| Severity & priority scales | 5 |
| Audit checklists (judging finished work) | 13 |
| Accessibility & contrast thresholds | 1 |
| Performance criteria | 1 |
| Compatibility rules | 0 |
| Workflow/process discipline | 12 |
| Other | 1 |
| **Grand total** | **43** |

