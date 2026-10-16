# Surface: Web App and Site

Purpose: Decide which jobs matter most, in what order, and with what oracles when the thing under
verification is a browser-rendered web application, SaaS product, marketing site, or landing page.

Read when: the default surface applies — anything rendered in a browser, including marketing and
landing pages, which are first-class here rather than an afterthought, and the rebuild, redesign or
platform migration of an existing site.

Inputs: the running application or site; performance budgets and threat model from `architecture`
if they exist; the accessibility claim being contemplated, if any.

Produces: a surface-specific job order, the oracles available and unavailable on this surface, and
the claims characteristically overstated here.

## Skip when:

- The thing under verification is an API with no rendered surface → `surface-service-api.md`.
- It is a native iOS/Android app → `surface-mobile.md`.
- It is a batch or streaming data pipeline with no UI → `surface-data-pipeline.md`.
- It embeds an LLM-driven feature whose behavior is the primary risk (chat, agent, generated content)
  → treat that feature under `surface-ai-system.md` while this file still governs the surrounding app.
- The product carries a conformance obligation (public-sector, EN 301 549, ADA/Section 508 claim)
  → add `surface-regulated.md` on top of this file; it is additive, not a replacement.
- You need the technique itself (how to run a contract test, how to grade an axe result) rather than
  what changes on this surface → the named job file.

## Contents

- [Why the marketing site is first-class here](#why-the-marketing-site-is-first-class-here)
- [Job order](#job-order)
- [Oracles available on this surface](#oracles-available-on-this-surface)
- [Oracles not available on this surface](#oracles-not-available-on-this-surface)
- [Rebuilds and migrations: the source site is the oracle](#rebuilds-and-migrations-the-source-site-is-the-oracle)
- [Status, content, and the probe's client](#status-content-and-the-probes-client)
- [Screenshot evidence has its own failure modes](#screenshot-evidence-has-its-own-failure-modes)
- [Achievable evidence](#achievable-evidence)
- [Characteristic overclaims](#characteristic-overclaims)

## Why the marketing site is first-class here

The incumbent QA-skill ecosystem serves this case at effectively zero coverage: `"landing page"`
returns zero hits and `"marketing site"` returns two incidental hits across 50 competing skills, while
web app, mobile and API are all first-class there. A landing page is not a lightweight afterthought
of "the web app" — it carries its own dominant risks that a general web-app checklist will not surface
on its own: **conversion-path correctness** (does the primary call-to-action actually complete: form
submit, checkout, signup — not "does the button render"), **accessibility conformance claims** made in
marketing copy or a public statement, **Core Web Vitals as experienced in the field** (not the lab
score shown to the team that shipped it), and **cross-browser rendering** for a page whose traffic mix
is unknown and disproportionately mobile-Safari and in-app webviews. Rank these four risks explicitly
for a marketing surface; do not inherit a SaaS-app risk ranking and assume it transfers.

## Job order

| Order | Job | Why it goes here on this surface |
|---|---|---|
| 1 | `verification-strategy-and-risk.md` | Rank conversion path, auth, and payment above cosmetic risk before choosing any technique |
| 2 | `oracles-and-evidence.md` | Name the oracle per risk item before running a tool; this is the surface where "green Lighthouse" gets mistaken for an oracle most often |
| 3 | `functional-verification.md` | The conversion path and any cross-service journey (checkout, signup, auth) is assembled-system behavior, not a component test |
| 4 | `accessibility-conformance.md` | Public-facing pages carry conformance exposure even without a regulated claim; scope the claim before it is made in copy |
| 5 | `performance-and-load-verification.md` | Field data (CrUX) vs lab data (Lighthouse/synthetic) diverge most visibly here because real traffic is public and heterogeneous |
| 6 | `compatibility-and-support-matrix.md` | Cross-browser and cross-viewport rendering; build the matrix from real traffic mix, not from the team's own device drawer |
| 7 | `security-and-privacy-verification.md` | Forms, auth, cookie/consent behavior, third-party script exposure |
| 8 | `suite-and-signal-health.md` | E2E flake in browser automation is the dominant suite-health risk here |
| 9 | `defect-lifecycle.md` | Triage findings back to `frontend` (or the owning build skill) |
| 10 | `release-gate-and-claims.md` | The ship/claim split, always last |

`ai-behavior-verification.md` only enters if the app embeds LLM-driven behavior; otherwise skip it.

## Oracles available on this surface

- Rendered DOM and computed accessibility tree — directly inspectable, not inferred.
- Computed style (`getComputedStyle`) — whether a design token actually reached the element. A green
  build is no oracle for this: a stylesheet optimizer can drop a whole token block on a parse error it
  reports only as a soft warning, leaving layout intact and every font and size at its fallback.
- Public production traffic, which unlocks field performance data (CrUX) unavailable pre-launch.
- Cross-browser automation grids (Playwright projects, BrowserStack/Sauce-class services) for a real,
  if partial, rendering matrix.
- Visual diffing against a prior known-good state — a change detector, not a correctness oracle; it
  tells you *something* changed, not whether the new state is right.

## Oracles not available on this surface

- **No field Core Web Vitals before real traffic exists.** CrUX requires a public-data threshold; a
  staging environment or a freshly launched page has no field oracle yet — lab data is the only
  evidence class available pre-launch, and it must be reported as such (see
  `performance-and-load-verification.md`).
- **No oracle for "looks right."** Visual regression and design-system conformance detect deviation
  from a baseline, not aesthetic or brand correctness — never report a visual diff pass as a design
  QA pass.
- **No production-truth for conversion rate at verification time.** Verification can show the path
  completes; it cannot show users take it, or take it at the rate the business needs — that is a
  `growth` question, not this skill's.

## Rebuilds and migrations: the source site is the oracle

When an existing site is rebuilt, redesigned, or moved to a new platform, the live source is the
strongest oracle this surface ever gets — a complete, pre-existing statement of routes, copy, assets
and behaviour that nobody on the build side authored. Run these checks inside job order 3.

**The oracle follows the declared intent.** A faithful rebuild is judged against the source; a
redesign holds some dimensions to it (copy, routes, brand) and deliberately changes others (look,
layout). Fix per dimension which are held, and how strictly, before review starts: a taste rubric on a
fidelity job flags correct reproduction as a defect, and a fidelity rubric on a redesign blocks the
change that was ordered.

| Parity check (computable against the source) | What fails silently without it |
|---|---|
| Every source route has a built route or a redirect | Dropped pages; lost inbound links after a URL change |
| Every kept internal link resolves — **nested menu entries and multi-segment paths included** | Header/footer links to pages never built; a fix verified on a flat nav that misses mega-menus |
| Copy and metadata, at the strictness the intent sets | Copy rewritten in a job that promised to keep it |
| Every content-block type has a renderer | A block with no renderer renders nothing and raises no error |
| Each brand and hero asset traces to a captured source asset | Stock photo in a missing hero slot; text wordmark for a graphic logo |
| Interactive widgets (slider, carousel, accordion, tabs) still behave | An interactive feature rebuilt as a static shell |
| Residue: sitemap/robots base URL, placeholder images, dev-only routes | A shipped sitemap pointing at a placeholder domain |

**An identity break is never polish.** In a fidelity job, a substituted brand image, a text stand-in
for a logo, or a static shell for an interactive feature blocks — name these non-downgradable before
review (`defect-lifecycle.md`). A placeholder is a legitimate fallback when no asset exists; an
*uncounted* placeholder is silent omission — report how many slots fell back.

## Status, content, and the probe's client

**Status code and rendered content are separate propositions; assert both.** A `200` can be a
deployment-protection login page, a soft-404, or an error page served as success; a friendly
not-found page can look identical to the intended page in a screenshot while returning `404`.
"Every route returns 200" is evidence about status codes, not about pages.

**The probe's client is part of the oracle.** A bare HTTP client runs no lazy-loading and can be
refused (`403`) by bot or hotlink protection a real browser passes; a crawler's cleaned or headless
view can be a degraded variant of what the raw response carries. Match the client to how users fetch,
and log every fetch failure as `blocked` — a failure silently dropped from a link or asset check reads
as a pass.

## Screenshot evidence has its own failure modes

A screenshot is evidence of the page only once it shows the settled state; until then a blank or
duplicated region is a finding about the capture. Known artifacts: full-page capture under mobile
emulation can mis-stitch into repeated content; a fast scroll-and-reset leaves scroll-triggered
reveals unfired, so content sits at zero opacity while the DOM is correct; downscaled full-page shots
hide section detail; a capture to an unresolvable path can write no file and raise no error. Confirm a
visual defect in the DOM before filing it; capture after step-scrolling (or with reduced motion forced
so reveals settle), per section at native resolution, at a desktop and a mobile viewport.

## Achievable evidence

Expect `observed` evidence for rendered functional paths and automatable accessibility checks on
in-scope pages; expect `inferred` for cross-browser behavior sampled from a matrix rather than every
combination; expect `not_tested` or `blocked` for field performance pre-launch and for browser/device
combinations outside the built matrix. State which class you produced per claim — see
`oracles-and-evidence.md`.

## Characteristic overclaims

- **A Lighthouse performance score of 100 reported as "the page is fast."** Lighthouse's own scoring
  weights are not uniform or self-evidently correct (see the INP/TBT worked example in
  `oracles-and-evidence.md`); a score is a compressed, authored judgment, not a measurement of user
  experience.
- **An automated accessibility scan reported as "the page is accessible."** Automated tools resolve a
  documented minority of conformance criteria; the remainder needs the manual/semi-automatic evidence
  class described in `accessibility-conformance.md`. Never let a scan pass launder a conformance claim.
- **One viewport or one browser tested, reported as "works everywhere."** A tested combination proves
  that combination; it never licenses an inference about an untested one — see the anti-inference
  invariant in `oracles-and-evidence.md`.
- **A green E2E suite reported as "the conversion path works in production."** The suite proves the
  path works under the suite's environment and data; production configuration, real payment
  processors, and real third-party scripts are separate conditions the evidence does not cover.
