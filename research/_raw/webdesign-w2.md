# webdesign extraction — W2 verify-read (quality lens)

Scope: full read of `section-design-workflow.md`, `frontend-build-patterns.md`, `design-thinking.md`,
`design-direction.md`, `frontend-design-principles.md`, `SOURCES.md`, and `agents/openai.yaml`; grep +
context-read of the 13 remaining reference files for verification-flavored material (thresholds, pass/fail
language, checklists). Every candidate below was cross-checked against
`digital-product-skill/research/product/webdesign-extraction.md` by exact-string grep.

**Headline finding: the prior extraction pass already lifted essentially every quality-flavored item found
here, verbatim — just tagged `[design]`/`[frontend]`/`[product]`/`[cross]` instead of `[quality]` (which
didn't exist yet). No genuinely new quality item turned up under exhaustive grep cross-check. This file's
value is re-surfacing that subset under the `quality` lens, with the ownership/theme framing the merge
needs, not new content the prior pass missed.** Every item is marked `ALSO-IN-PRIOR` with the exact line(s)
in `webdesign-extraction.md` where it already lives, per the task's over-include instruction.

`agents/openai.yaml` was read in full — 6 lines of OpenAI-agent metadata (display name, description
"Distinctive website design, build, and visual QA", default prompt, invocation policy). No lift-worthy
technique/checklist content; noted for completeness only.

---

## Review gates & go/no-go

### The anti-boring checklist (run on every section before shipping)
- **Source:** `references/section-design-workflow.md:128–149`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:661–684`)
- **Why quality:** explicit pass/fail gate on finished section work — "Section fails if you answer 'no' to
  the top block or 'yes' to the bottom block" — plus a named anti-pattern tell-list to check against.
- **Ownership:** shared with design

```
## The anti-boring checklist (run on every section before shipping)

Section fails if you answer "no" to the top block or "yes" to the bottom block.

**Must be YES:**
- [ ] **Depth:** are there ≥2 visual planes, or at least one unifying texture/glow/shadow? (not one flat fill)
- [ ] **One focal point:** squint — is it obvious what's #1? Exactly one element is biggest/boldest.
- [ ] **Contrast move:** is there a real jump in scale OR weight OR color OR depth somewhere?
- [ ] **One signature:** what's the one thing someone remembers here? (if "nothing" → recompose)
- [ ] **Grayscale test:** hierarchy still reads with color removed? (proves it's not propped up by color)
- [ ] **Spacing system:** gaps come from one scale (4/8px base); within-group gap < between-group gap.
- [ ] **Quality floor:** responsive to mobile, visible keyboard focus, `prefers-reduced-motion` respected.

**Must be NO (the "AI-slop" tells — any one is a hit):**
- [ ] Centered-everything with even spacing throughout.
- [ ] Three identical equal-width feature cards as the only idea.
- [ ] Every section the same rhythm (centered text over a uniform card grid).
- [ ] Weak heading↔body contrast; default Inter + indigo-600/slate-900; purple/gradient decoration for its own sake.
- [ ] Emoji used as icons; predictable 01/02/03 markers on content that isn't actually a sequence.
- [ ] More than two "bold moves" fighting in one section.

Full rationale and fixes for each tell: `design-thinking.md` (§B3–B5).
```

Working-method step that invokes it (`section-design-workflow.md:164`):
```
5. Run the **anti-boring checklist**. Remove one accessory (Chanel rule) before you ship.
```

---

### Visual end-to-end self-check
- **Source:** `references/frontend-build-patterns.md:280–301`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:1082`)
- **Why quality:** the through-line claim of the whole file — "a green build proves the code compiles, not
  that the page looks right" — is exactly the "don't trust the builder's own claim" discipline `quality`
  owns; the numbered procedure is an independent verification method (real-browser screenshot audit, not a
  self-report).
- **Ownership:** shared with frontend

```
## Visual end-to-end self-check

**A green build proves the code compiles, not that the page looks right.** Before calling a build
done:

1. **Serve the build** and get the full route list from the sitemap.
2. **Screenshot every route at two viewports** — a standard desktop width (e.g. 1440×900) and a
   representative mobile device size — using a browser-automation tool. For pages with
   scroll-reveal or lazy-loaded content, a single full-page screenshot can capture blank —
   step-scroll with a short wait between steps, then scroll back to the top before the final
   capture. Capture tooling — script the batch, `agent-browser` for interactive poking, and the
   honest-degrade rule — is specified in
   [art-review.md](art-review.md#capture-tooling-what-this-review-physically-needs).
3. **Actually look at each screenshot** for real defects: text overflow/clipping (an oversized
   display heading is the classic case), element overlap, a fixed header obscuring the first
   heading, broken or placeholder images, an unreachable or overlapping mobile nav, cramped or
   collapsed spacing, low-contrast text over imagery, horizontal scroll on mobile. Also re-check
   against the anti-slop checklist above.
4. **Fix and re-shoot** — edit the offending component/theme, rebuild, re-screenshot only the
   affected routes. Loop until both viewports read clean, capping at a few rounds and explicitly
   noting any residual issue rather than looping forever.
5. **Tear down the server** when done — don't leave a dev/preview server stranded on a port.
```

---

### Iterative design-review loop
- **Source:** `references/frontend-build-patterns.md:303–318`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:1085`)
- **Why quality:** the blocking/optional split plus "leave unflagged sections alone" is a review-gate
  discipline — what a reviewer's punch-list obligates the builder to fix vs. may skip, and the rule against
  scope creep during a fix pass.
- **Ownership:** shared with frontend

```
## Iterative design-review loop

When a build already exists and a design reviewer has left a punch-list rather than starting from
scratch:

1. Apply every **blocking** item — both direction violations (off-spec palette/type/register,
   anti-slop tells) and composition failures (centered-everything, uniform card grids, flat
   rhythm, a missing signature section). Each item should name a route, a section, and a concrete
   fix — recompose, re-theme, or re-rhythm exactly those sections.
2. Take cheap, clearly-right optional suggestions if you agree with them.
3. **Leave unflagged sections alone.** Don't regress work that was already signed off, and don't
   redesign the whole page because one section needed a fix.
4. Rebuild and re-run the full visual self-check so the reviewed state is reflected for the next
   round.

Work only from the punch-list as written — never guess at unstated intent behind a flagged item.
```

---

### Acceptance checklist (frontend build)
- **Source:** `references/frontend-build-patterns.md:320–330`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:1088`)
- **Why quality:** explicit binary acceptance criteria for calling a build done — registry
  completeness+fail-loud, green build AND clean screenshots, route/redirect completeness with no silent
  404s.
- **Ownership:** shared with frontend

```
## Acceptance checklist

- A client component exists for every section key in the catalog; the section-map registry covers
  all of them with no gaps, and fails loud (not silently) on a miss.
- The build is green **and** desktop + mobile screenshots show no unresolved layout/visual defect
  (residuals explicitly noted, not silently ignored).
- Routes match the target sitemap; unresolved media falls back to a placeholder (logged, never
  silent); every kept nav/footer link resolves to either a real built page or the "not part of the
  demo" fallback — no kept link ever 404s.
- If routes were restructured, every entry in the redirect map is implemented and returns a
  permanent redirect — no legacy URL 404s.
```

---

### `design.md lint` — the QA gate
- **Source:** `references/design-direction.md:106–114`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:1007`, `1010`)
- **Why quality:** explicitly self-labeled "**The QA gate.**" — a tool-enforced verification step
  independent of the author's claim that a design system is coherent/compliant.
- **Ownership:** shared with design

```
| Command | Use |
|---|---|
| `design.md spec [--rules]` | Print the spec (or just the rules table) — inject into the authoring prompt so you work against the installed version. |
| `design.md lint <file>` | Validate: resolves token refs, checks **WCAG contrast** (AA < 4.5:1 warns), structure. Emits JSON findings. **The QA gate.** |
| `design.md export <file> --format <fmt>` | Export tokens. `json-tailwind` (Tailwind v3 config), `css-tailwind` (Tailwind v4 `@theme` CSS), `dtcg` (W3C `tokens.json`). **The bridge into the build.** |
| `design.md diff <a> <b>` | Token + prose regression detection between versions; nonzero exit on regression. Gate design iterations. |
```

---

### Acceptance criterion (DESIGN.md authoring)
- **Source:** `references/design-direction.md:189–193`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:1326`)
- **Why quality:** a named, binary go/no-go criterion for whether a design-system document is fit to hand
  off to a build.
- **Ownership:** shared with design

```
## Acceptance criterion

`design.md lint` passes with **no `broken-ref` errors**; the `DESIGN.md` covers at least `colors`
and `typography`, carries a Do's-and-Don'ts section, and no choice matches an unexamined entry in
[anti-default-catalog.md](anti-default-catalog.md).
```

---

## Severity & priority scales

### `design.md` lint-rule severity table
- **Source:** `references/design-direction.md:111–114`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:1010`)
- **Why quality:** a real error/warn/info severity taxonomy attached to specific, named defect classes —
  the shape of a defect-triage scale, tool-enforced rather than self-reported.
- **Ownership:** quality-only (severity taxonomy itself); shared with design (the underlying rules)

```
**Lint rules** (9): `broken-ref` (error) · `missing-primary` (warn) · `contrast-ratio` (warn,
<4.5:1) · `orphaned-tokens` (warn) · `token-summary` (info) · `missing-sections` (info) ·
`missing-typography` (warn) · `section-order` (warn) · `unknown-key` (warn — typo detection, e.g.
`colours:` → `colors:`).
```

---

## Audit checklists (judging finished work)

### Refinement pass checklist (B5)
- **Source:** `references/design-thinking.md:93–101`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:515–521`)
- **Why quality:** a self-audit checklist run *before shipping* a finished section — includes the
  numeric WCAG AA 4.5:1 threshold and explicit type/spacing scale limits used to check, not produce, work.
- **Ownership:** shared with design

```
## B5. Refinement pass checklist (run before shipping a section)
- **Squint test** — hierarchy survives blur? Primary action still obvious?
- **Grayscale test** — works with color removed? (proves hierarchy isn't propped up by color alone)
- **Alignment audit** — count left edges; collapse strays to the grid.
- **Spacing audit** — within-group gaps < between-group gaps, consistently; values from one scale (4/8px base).
- **Type audit** — ≤3 sizes, ≤2 families, body line length 45–75ch; headings on the scale.
- **Color audit** — one accent, used once for the primary action; WCAG AA contrast (4.5:1 text).
- **Remove-one test** — can any element be deleted without loss? If yes, delete it and add space.
- **Consistency** — radii, shadows, button styles, icon weight all from one token set.
```

---

### Critique framework (B6)
- **Source:** `references/design-thinking.md:103–120`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:1329–1336`)
- **Why quality:** a scored-rubric critique method that explicitly separates taste from function and
  names the dimensions a reviewer scores — plus a cross-reference to the heavier P0–P3/Nielsen rubric in
  `design-critique.md` (already captured by the lead, not reproduced here).
- **Ownership:** shared with design

```
## B6. Critique framework (how to judge it — and give feedback)
- **Separate taste from function.** Ban "I like / I don't like." Anchor every note to a goal: user task,
  hierarchy, readability, conversion, accessibility, brand. "The CTA loses to the image because it has
  less contrast" beats "the button feels off."
- **Structure feedback** with *I like / I wish / What if* — what works, a constructive gap, an
  exploratory option.
- **Dimensions to score** (usable rubric): hierarchy & focal point · spacing & rhythm consistency ·
  alignment/grid discipline · type system · color discipline (accent rationing + contrast) · whitespace ·
  the one bold move (memorability) · motion purposefulness · accessibility (contrast, reduced-motion,
  focus states) · reads intentional vs templated.
- **Order:** section job → hierarchy → system consistency → polish. Don't critique a gradient before the
  reading order is right.

> For a heavier structured pass — Nielsen heuristics scored 0–40, cognitive-load checks, test personas,
> P0–P3 severity — use [design-critique.md](design-critique.md); for the token-level "AI tells" catalog
> (cream/sand OKLCH band, reflex-reject fonts, ghost-card defects) run a draft against
> [anti-default-catalog.md](anti-default-catalog.md). The checklist above (B5) and this critique
> framework (B6) stand on their own when a quick pass is all you need.
```

---

### Craft gotchas — "treat any such parser warning as a hard failure"
- **Source:** `references/frontend-build-patterns.md:258–278`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:1078–1079`)
- **Why quality:** the closing sentence is a direct statement of the "don't trust the green build" quality
  discipline — verify computed output, don't trust a compiler's silence, and a specific instance of a
  headless-browser QA blind spot (black map iframe).
- **Ownership:** shared with frontend

```
## Craft gotchas (learned the hard way)

- **Container-token collision.** If your global stylesheet owns container/spacing custom
  properties (e.g. `--container-*`), keep the per-project theme file free of the same names —
  redefining or removing that block re-collapses `max-w-*`-based layout across the whole site.
  Solved once in a good template; don't re-break it by "cleaning up" the token file.
- **Grid child collapse.** An element with `max-w-*` placed directly inside a
  `grid-cols-[minmax(0,1fr)_auto]`-style track shrinks to min-content instead of filling its
  track — add `w-full` explicitly.
- **Button label wrap.** Inline-flex button labels can wrap mid-phrase ("View / Projects") — set
  `white-space: nowrap` on button/label text.
- **Map embeds paint black in headless browsers.** An embedded map iframe can render as a solid
  black box under headless/automated screenshot capture — put an on-brand fallback panel behind
  the iframe so automated visual QA doesn't flag (or ship) a black rectangle.
- **A literal `*` in a comment inside/near a token block can silently drop the whole block.**
  Some CSS minifiers/parsers choke on glob-style names in prose comments (e.g. writing
  `--spacing-*` inside a comment near `@theme`) and print a soft warning while dropping the entire
  token block — a build that's green but has lost all its tokens. Avoid literal `*` glob syntax in
  comments near token definitions; treat any such parser warning as a hard failure, and verify
  tokens are actually applied (inspect computed styles) during visual QA, not just from a green
  build.
```

---

### The decoration discipline (reject-if-unjustified rule)
- **Source:** `references/decoration.md:129–132`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:437`)
- **Why quality:** a binary keep/cut rule with a named justification test — the closest thing this file has
  to a rejection criterion for a build artifact.
- **Ownership:** shared with design

```
## The discipline
Every decoration must justify itself: **depth, brand, or eye-guidance.** If none of those, cut it
(Chanel rule — remove one accessory before shipping). Loud, saturated, hard-edged decoration is the cheap
tell; faint, color-matched, edge-faded, *relevant* decoration is the premium one.
```

---

### Tailwind theme checklist (author + build)
- **Source:** `references/tailwind-v4-theme.md:130–139`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:1225`)
- **Why quality:** a verification checklist run against a finished theme file to confirm no collision/
  regression before build — checks output state, not just process.
- **Ownership:** shared with frontend

```
## 5. Checklist (author + build)

- [ ] No t-shirt `--spacing-*` keys reach the generated theme (spacing as base + numeric, or
      non-reserved names).
- [ ] `--container-*` defined → `max-w-*` resolves to real widths (no `max-w-[42rem]` magic
      numbers).
- [ ] Every DESIGN.md prose section with visual weight maps to a namespace: *Elevation & Depth* →
      shadows, *Motion* → ease/animate, *Layout* → container/aspect.
- [ ] Font families bound to the loaded font faces.
- [ ] `design.md lint` clean; the built `@theme` is the export **plus** the companion (full
      coverage).
```

---

### Structure acceptance checklist (section catalog / IA)
- **Source:** `references/section-archetypes.md:154–165`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:1377`)
- **Why quality:** binary completeness checks against a finished sitemap/section-catalog artifact — unique
  keys, type-vocabulary conformance, no pruned/dangling links.
- **Ownership:** shared with product

```
## Acceptance checklist

- Every section key in the catalog is unique.
- Every field's type is one of the fixed content-type vocabulary.
- Every repeatable section is marked as a collection candidate; every shared-value section is
  marked global.
- Every slider/carousel/accordion/tabs section carries its `interactive` marker.
- The sitemap references only catalog section keys and includes the home route.
- Every internal route referenced by a page resolves to a sitemap page **or** is a kept
  nav/footer link that the frontend sends to the "not part of the demo" fallback — links are
  never pruned down to the built set.
- The navigation's logo field is set whenever a logo was actually captured/available.
```

---

## Accessibility & contrast thresholds

### Contrast & accessibility (non-negotiable floor)
- **Source:** `references/color-and-rhythm.md:88–91`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:399`)
- **Why quality:** a hard numeric conformance threshold (WCAG AA), explicitly labeled non-negotiable —
  exactly the shape of an accessibility gate a reviewer checks independently of the builder's say-so.
- **Ownership:** shared with design

```
## 6. Contrast & accessibility (non-negotiable floor)
- Body text ≥ **4.5:1**, large text (≥18pt / 14pt bold) ≥ **3:1** (WCAG AA). Verify on *both* surfaces if
  you alternate (§1) and on the *brightest* image area if text sits over a photo (`imagery.md §3`).
- Never carry meaning by color alone (accent + an icon/label).
```

### Text-over-image contrast (WCAG applied to scrims)
- **Source:** `references/imagery.md:82–97`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:550`)
- **Why quality:** the same WCAG threshold re-applied to a specific, verifiable case (text over a photo) —
  the "verify on the brightest worst-case photo" instruction is a test-methodology note.
- **Ownership:** shared with design

```
## 3. Text over image — readable scrim / overlay
...
Levers, least→most damage to the image: **strip/highlight** behind text only → **copy space** (crop so
text sits where the image is quiet) → **backdrop-blur chip** (`backdrop-filter:blur(8px); background:rgb(0
0 0 /.25)`) → **full tint** (last resort). Add `text-shadow: 0 1px 3px rgb(0 0 0 /.6)` for stray bright
pixels. **WCAG:** body ≥ 4.5:1, large text ≥ 3:1.
- **Pitfall:** A fixed scrim fails on light images — make scrim strength/direction respond, or use a
  darkened variant. Test the *brightest* worst-case photo (CMS images vary).
```

### Body readability contrast rule
- **Source:** `references/typography.md:126–132`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:757`)
- **Why quality:** same WCAG 4.5:1 floor, third independent occurrence, applied to body-text readability
  specifically.
- **Ownership:** shared with design

```
## 7. Body readability (the unglamorous rule that sells the rest)
- **Why:** All the display drama collapses if the body is hard to read.
- **How:** body 16–18px; **line length 45–75ch** (`max-width: 65ch`); line-height ~1.5–1.65 for body,
  tighter for headings; left-align long copy (never justify or center paragraphs); establish a vertical
  rhythm (consistent spacing multiples).
- **Pitfall:** Full-width body text (>75ch) tanks readability; centered multi-line paragraphs are hard to
  track. Contrast ≥ 4.5:1 for body.
```

### CTA-color contrast as the a11y floor
- **Source:** `references/persuasion-and-conversion.md:113–126`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:398` area / same section captured under `[product]`)
- **Why quality:** fourth independent occurrence of the same threshold, framed explicitly as "also the
  a11y floor" inside a conversion-design context.
- **Ownership:** shared with design/product

```
- **Color psychology — evidence vs myth** — universal color→emotion→purchase claims are **largely unsupported
  folklore.** What's real: (1) **contrast** drives CTA performance (a red button beats blue *on a blue page*
  because it stands out, not because red is "better"); (2) color aids **differentiation** and **brand recall**;
  (3) palettes shift perceived premium-ness/mood, not deterministic behavior. *Apply:* pick CTA color for max
  contrast against its surroundings (≥4.5:1, also the a11y floor); use color for hierarchy + brand
  distinctiveness. *Pitfall:* don't cite "blue = trust, orange = buy" as fact.
```

### Neumorphism fails WCAG contrast (anti-pattern verdict)
- **Source:** `references/depth-and-texture.md:191–195`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:469–470`)
- **Why quality:** a named technique carries an explicit accessibility-failure verdict as the reason to
  avoid it — a rejection criterion grounded in a conformance failure, not taste.
- **Ownership:** shared with design

```
## 8. NEUMORPHISM — know it, mostly avoid it
- **Why dated:** dual light/dark inset-shadow "extruded plastic" (peaked ~2020) fails WCAG contrast
  (buttons don't look clickable), breaks in dark mode, can't reuse native components.
- **Where it still works:** sparingly — one toggle/slider thumb/subtle card — *with* a real border for
  affordance. The premium 2026 "soft tactile" equivalent is **glass + layered shadow + grain**, not this.
```

### B2B SaaS security/compliance/accessibility badge list
- **Source:** `references/niche-and-vertical-design.md:198–204`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:173`)
- **Why quality:** names WCAG AA alongside SOC 2 / ISO 27001 / GDPR as a compliance-signal checklist a
  reviewer would look for on a finished B2B SaaS marketing site.
- **Ownership:** shared with product

```
**Proof:** **named customer logos**,
G2 ratings, usage metrics ("Join 5,000+ companies"), quantified case outcomes, **security/compliance badges
(SOC 2, ISO 27001, GDPR, WCAG AA)**. **CTA:** one primary per page; first-person ("Start My Free Trial");
risk-reducers ("No Credit Card Required"); 3–5 form fields; offer trial + demo for different readiness.
**Register:** product-forward — real screenshots/silent loops, workflow micro-animations, WCAG AA, WebP/AVIF +
lazy-load, distinct mobile layouts.
```

### Semantic heading-hierarchy rule (screen-reader/SEO conformance)
- **Source:** `references/trust-proof-and-structure.md:90–91`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:1383`)
- **Why quality:** a structural conformance rule ("exactly one H1," no skipped levels) checkable against a
  finished document outline independent of visual styling.
- **Ownership:** shared with product

```
- **Heading hierarchy:** exactly **one `H1`** (the page's main title); `H2`/`H3` for nested subsections in
  order — don't skip levels or pick headings for size (style with CSS). This doubles as the visual hierarchy.
```

---

## Performance criteria

### Core Web Vitals as a design constraint
- **Source:** `references/trust-proof-and-structure.md:97–99`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:1386`)
- **Why quality:** names concrete, measurable performance budgets (CLS avoidance mechanism, LCP,
  sub-3s/sub-1s load) framed as a constraint to verify, not just a build goal.
- **Ownership:** shared with frontend

```
- **Core Web Vitals as a design constraint, not a cleanup pass:** reserve media space with `aspect-ratio`/
  `width`+`height` to avoid **CLS**; lazy-load below-the-fold; WebP/AVIF; keep the hero light for **LCP**.
  Sub-3s (ideally sub-1s) load is itself a trust and ranking signal.
```

### Awwwards judging weights and performance-as-design discipline
- **Source:** `references/experimental-and-creative.md:27–32, 150–161`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:24`, `115`, `1339`)
- **Why quality:** an external, numeric judging rubric (Design 40 / Usability 30 / Creativity 20 /
  Content 10) used to score finished work, plus an explicit frame-budget/60fps performance criterion.
- **Ownership:** shared with frontend/design

```
This is the layer that takes a section from "clean and modern" to *award-winning*. It is heavier (WebGL,
canvas, JS) and **must be rationed**: the research is unanimous — every Awwwards Site-of-the-Day shares
**one signature moment that makes you stop scrolling, not twenty effects**. Custom interaction is the
single biggest differentiator between award winners and templated/AI sites; **performance is a creative
discipline**, not a post-launch pass. So: pick ONE experimental move per page, build it bespoke, make it
run at 60fps on a mid-range phone, and gate it behind `prefers-reduced-motion` + lazy init.

...

## The award-winner's discipline (synthesized from Awwwards judging)
- **One signature, not twenty effects.** Awwwards weights Design 40 / Usability 30 / Creativity 20 /
  Content 10 — creativity is real but usability outweighs it. Spend the wow on ONE moment.
- **Custom > template.** Judges spot off-the-shelf instantly; the differentiator is bespoke interaction
  tied to the subject's story, not a library dropped in.
- **Performance is design.** Complex visuals must load fast and run smooth on mid-range devices. Treat the
  frame budget as a constraint from day one: lazy-init heavy canvases, pause offscreen, cap dpr/particle
  count, ship static fallbacks.
- **Narrative.** The signature should *mean* something about the subject — emotion and story, not effect
  for its own sake. (Ties to `design-thinking.md §B4` and the core "one bold move" law.)
- **Accessibility floor still applies.** Reduced-motion path, keyboard reachability, focus states, and no
  meaning-by-motion-alone — even on the most experimental section.
```

### GPU/element-count budget (glassmorphism)
- **Source:** `references/depth-and-texture.md:140–145`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:942`)
- **Why quality:** a hard numeric cap ("max 2–3 glass elements per viewport") framed as a performance
  constraint, not a style preference.
- **Ownership:** shared with frontend

```
- **Levers:** blur **8–15px**; bg opacity **8–30%**; the `saturate()` and the **inset top highlight** are
  what separate premium glass from a grey blur.
- **Example:** Apple "Liquid Glass", macOS sidebars, floating nav over hero media.
- **Pitfall:** GPU-heavy — **max 2–3 glass elements per viewport**, never animate `backdrop-filter`, drop
  blur to 6–8px on mobile. Needs a busy/colorful backdrop to read as glass. Ship `-webkit-` prefix + a
  solid fallback (`@supports not (backdrop-filter: blur())`).
```

### Image weight budget (architecture-firm vertical pitfall)
- **Source:** `references/niche-and-vertical-design.md:104–106`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:155`)
- **Why quality:** a concrete numeric asset budget ("cap ~2000px / ≤200KB") listed as a pitfall to check
  for on a finished site, alongside a load-speed expectation stat.
- **Ownership:** shared with product

```
- **Pitfalls:** designing for peers not clients; portfolio bloat diluting the best work; gorgeous-but-empty;
  heavy un-optimized images (cap ~2000px / ≤200KB); neglecting mobile (majority of traffic); hiding team/process.
```

---

## Other (borderline / process discipline)

### Attention Ratio — a measurable conversion-page criterion
- **Source:** `references/persuasion-and-conversion.md:77–94`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md:198`)
- **Why quality:** a named, measurable ratio (links-on-page ÷ intended-actions, target ≈1:1) that functions
  as a pass/fail-style metric for a finished landing page, distinct from the design/build guidance around
  it.
- **Ownership:** shared with product

```
Governing metric: **Attention Ratio** = links-on-page ÷ intended-actions. A campaign landing page should
approach **1:1** (one action, nothing else clickable); tightening toward 1:1 commonly lifts conversion ~31%.
```

### Fitts's law tap-target minimum
- **Source:** `references/persuasion-and-conversion.md:66–67`
- **Status:** ALSO-IN-PRIOR (`webdesign-extraction.md` — same section as line 198 context)
- **Why quality:** a concrete minimum tap-target size, the kind of number a mobile-usability audit checks.
- **Ownership:** shared with design

```
- **Fitts's law** — big, near, easy targets: CTA ≈2× body size, ≥44×44px tap target, placed where the eye
  rests (end of a reading flow / thumb zone); sticky CTA on long pages. *Pitfall:* tiny/far/crowded buttons.
```

### Ethical-persuasion line table (dark-pattern rejection criteria)
- **Source:** `references/persuasion-and-conversion.md:150–163`
- **Status:** ALSO-IN-PRIOR (per grep: "FTC" ×4, "dark pattern" ×5 hits in prior extraction)
- **Why quality:** a mechanism-by-mechanism ethical/legal table distinguishing acceptable use from an
  FTC-actionable dark pattern — functions as a reject-if-present list when auditing a finished conversion
  flow.
- **Ownership:** shared with product

```
## The ethical line (keep every device honest)
The same mechanism flips sides by truthfulness. FTC (2022→2025) blacklists fake timers, false scarcity,
hidden subscriptions, and confirmshaming as material misrepresentations.

| Mechanism | Ethical use | Dark pattern |
|---|---|---|
| Scarcity/urgency | Real deadline/stock | Fake/re-arming timers, false "2 left" (FTC-actionable) |
| Commitment | Honest progressive steps | Hidden cost revealed late |
| Social proof | Real reviews + identity | Fabricated/stock testimonials |
| Default / Zeigarnik | Smart defaults, true progress | Forced continuity, infinite gamified bars |
| Endowment | Personalize a real trial | Easy-in / hard-out cancellation |
| Confirmshaming | Neutral decline option | Guilt-trip opt-out copy |

Design for the user's **informed yes.**
```

### `agents/openai.yaml` — inert metadata, no lift
- **Source:** `agents/openai.yaml:1–6`
- **Status:** N/A (not a content item; recorded for completeness of the required read)
- **Why quality:** the `short_description` names "visual QA" as part of the skill's scope, confirming the
  webdesign skill self-identifies as covering QA — but the file carries no technique, threshold, or
  checklist to extract.
- **Ownership:** n/a

```
interface:
  display_name: "Webdesign"
  short_description: "Distinctive website design, build, and visual QA"
  default_prompt: "Use $webdesign to design and review a distinctive responsive landing page."
policy:
  allow_implicit_invocation: true
```

---

## Attribution / sources (SOURCES.md lines attaching to lifted material)

Only the source lines for files this document actually quotes from:

**frontend-build-patterns.md** (`SOURCES.md:81–83`):
```
## frontend-build-patterns.md

- [frontend-guidelines — Ben De Cock (bendc)](https://github.com/bendc/frontend-guidelines)
```
Also verbatim in `frontend-build-patterns.md:333–336` itself:
```
*Adapted from bendc/frontend-guidelines (Ben De Cock), modernized — dated 2015-era advice
(recursion-over-loops, IIFE-as-conditional, arguments/apply/bind gymnastics, blanket
prefer-Map-over-objects) has been corrected.*
```

**design-thinking.md** (`SOURCES.md:64–70`):
```
## design-thinking.md

- [The 12 Principles of Design — Toptal](https://www.toptal.com/designers/ui/principles-of-design) · [5 Principles of Visual Design — NN/g](https://www.nngroup.com/articles/principles-visual-design/)
- [Visual Hierarchy: Definition — NN/g](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/) · [Structuring a Typographic Hierarchy — Toptal](https://www.toptal.com/designers/typography/typographic-hierarchy)
- [AI Slop Web Design: Spotting and Fixing Generic Websites — 925studios](https://www.925studios.co/blog/ai-slop-web-design-guide) · [Why AI-Generated Websites Still Feel Generic — graystud.io](https://graystud.io/blog/why-ai-generated-websites-still-feel-generic)
- [The Linear Effect — Rectangle (Daryl Ginn)](https://rectangle.substack.com/p/the-linear-effect) · [Four design principles behind Stripe, Linear, Vercel — Pixeldarts](https://www.pixeldarts.com/en/post/four-design-principles-behind-stripe-linear-and-vercel)
- [10-point Design Critique Checklist — Designlab](https://designlab.com/blog/design-critique-checklist-for-ux-designers) · [How to Run a UX Design Critique — UX Tigers](https://www.uxtigers.com/post/design-crit)
```

**experimental-and-creative.md** (`SOURCES.md:72–79`, Awwwards-relevant lines):
```
- [Award-Winning Web Design: Judging Criteria Decoded — Utsubo](https://www.utsubo.com/blog/award-winning-website-design-guide) · [A Guide on Building Awwwards Worthy Websites — Alex Streza](https://medium.com/@alex.streza/a-guide-on-building-awwwards-worthy-websites-c4fa710b1c43)
```

**persuasion-and-conversion.md** (`SOURCES.md:129–137`, ethics/dark-pattern-relevant lines):
```
- [FTC Report on Dark Patterns (2022)](https://www.ftc.gov/news-events/news/press-releases/2022/09/ftc-report-shows-rise-sophisticated-dark-patterns-designed-trick-trap-consumers) · [Deceptive Design — Brignull](https://www.deceptive.design/book/contents/chapter-15)
- [Lindgaard et al. — 50ms first impression](https://www.tandfonline.com/doi/abs/10.1080/01449290500330448) · [First Impressions & Automatic Processing — NN/g](https://www.nngroup.com/articles/first-impressions-human-automaticity/)
```

**trust-proof-and-structure.md** (`SOURCES.md:139–145`, SEO/CWV-relevant lines):
```
- [Semantic HTML for SEO — Search Atlas](https://searchatlas.com/blog/semantic-html/) · [HTML Heading Hierarchy (H1–H6) — Devtrios](https://devtrios.com/blog/html-heading-hierarchy/) · [Structured Data for SEO — Wix](https://www.wix.com/seo/learn/resource/structured-data-for-seo)
```

**color-and-rhythm.md / imagery.md / typography.md** (WCAG contrast threshold — no dedicated external
citation; the 4.5:1/3:1 figures are cited internally as "WCAG AA" without a SOURCES.md entry of their own).

---

## Totals

| Theme | Items | NEW | ALSO-IN-PRIOR |
|---|---:|---:|---:|
| Review gates & go/no-go | 6 | 0 | 6 |
| Severity & priority scales | 1 | 0 | 1 |
| Audit checklists | 7 | 0 | 7 |
| Accessibility & contrast thresholds | 7 | 0 | 7 |
| Performance criteria | 4 | 0 | 4 |
| Other (borderline / process discipline) | 3 | 0 | 3 |
| Inert metadata (not counted as a content item) | — | — | — |
| **Grand total** | **28** | **0** | **28** |

Notes on the totals:
- **0 items were found to be genuinely absent from the prior extraction.** Every quality-flavored passage
  identified through the Step-1 full reads and the Step-2 grep sweep across the 13 remaining reference
  files was already lifted verbatim in `webdesign-extraction.md`, under `[design]`, `[frontend]`,
  `[product]`, or `[cross]` tags.
- This is consistent with the prior pass being unusually thorough (it appears to have captured checklists,
  thresholds, and gates opportunistically even without a `[quality]` bucket to route them to) — the merge
  step should treat this file as a **re-tagging index** into `webdesign-extraction.md` for the `quality`
  skill's build, not as a source of net-new raw material.
- Per the task's over-include instruction, several items with weaker quality framing were still included
  (Attention Ratio, Fitts's-law tap target, the dark-pattern ethics table) — flag these as borderline during
  merge if `quality`'s scope is drawn narrowly.