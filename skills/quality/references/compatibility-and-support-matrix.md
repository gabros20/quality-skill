# Compatibility and Support Matrix

Purpose: Decide which browsers, devices, OS versions, and platforms are in scope for verification —
and, more specifically, where the numbers behind that decision may legitimately come from and under
what licence. Competitors already publish tier tables; this reference exists because almost none of
them show their work.

Read when:
- Building or reviewing a browser/device/OS support matrix for a release.
- Deciding whether a feature is "safe to ship" without a fallback.
- A support-tier table exists but nobody can say where its numbers came from or whether they are
  still current.
- A row says "partial support" with no explanation of what specifically doesn't work.

Skip when:
- The ask is writing the polyfill, fallback, or progressive-enhancement code itself → `frontend`.
- The ask is provisioning device farms or cloud-browser CI infrastructure → `operate`.
- The ask is assistive-technology support (screen readers, voice control) →
  `accessibility-conformance.md` — Baseline explicitly does not cover this (§3 below).
- The ask is per-device performance budgets → `performance-and-load-verification.md`.
- The ask is the general evidence-state vocabulary this reference relies on →
  `oracles-and-evidence.md`.

Inputs:
- The product's own traffic/analytics data, if it exists (state explicitly when it does not — do
  not substitute a generic market-share number for real data you could have gathered).
- Audience geography — support decisions that ignore region routinely get pruned wrong (§4).
- Whether the question is "may I use this feature at all" (a Baseline/caniuse/BCD question) or
  "which devices are we testing on" (a traffic-tier question) — different decisions, different
  sources.
- The dated snapshot version of whichever data source is consulted (`caniuse-lite`,
  `browser-compat-data`, `web-features`) — an undated matrix is already stale by definition.

Produces:
- A matrix expressed as a **query against a dated snapshot**, not a frozen list, with the snapshot
  date recorded.
- Every "partial support" row carrying a written note of what specifically fails — never a bare
  flag.
- A stated distinction between the automation engine tested and the shipping consumer browser,
  where they differ.
- Licence attribution obligations satisfied for any consumed data (caniuse requires it; MDN BCD
  does not).
- A re-verify date for the whole matrix, because every source behind it is a moving target.

## Contents
- Where the numbers may legitimately come from, and their licences
- `partial_implementation`: compatibility's own `not_tested`
- Baseline: the newest published answer to "is this safe to use"
- Constructing the matrix from real usage, not inherited defaults
- Traffic-tiered device selection
- The cloud-browser trap
- Dated review — the matrix goes stale silently

## Procedure

### 1. Where the numbers may legitimately come from, and their licences
All facts below verified 2026-07-26; re-verify version/date before relying on them past a few
months — these sources release on independent, frequent cadences.

**caniuse** (`Fyrd/caniuse`, **CC-BY-4.0** on the data) defines seven support states, verbatim from
its own contribution guide: `y` (yes, by default) · `a` (**almost supported / partial**) · `n` (no)
· `p` (no, but polyfillable) · `u` (unknown) · `x` (**requires a prefix**) · `d` (**disabled by
default, needs a flag**). Three separately named degrees of "sort of works" (`a`, `x`, `d`), not one
bucket. **CC-BY-4.0 requires attribution** — "mention somewhere that the source is caniuse.com" —
and that obligation travels transitively through `caniuse-lite` and browserslist; it is easy to miss
because front-end build dependencies are habitually assumed attribution-free.

**MDN browser-compat-data** (`mdn/browser-compat-data`, **CC0-1.0**, v8.0.8, 2026-07-24) models the
same territory with a schema instead of a letter code: `version_added` (the only mandatory field),
`version_removed`, **`partial_implementation`** (boolean), `prefix`/`alternative_name` (mutually
exclusive), and `flags`. CC0 requires no attribution — strictly more permissive than caniuse's data.
**The web's two most-consulted compatibility datasets carry materially different licence
obligations**; know which one a given matrix's numbers actually descend from.

**browserslist** (`browserslist/browserslist`, MIT, 4.28.7, 2026-07-21) supplies the query language
most tooling resolves against. `defaults` is not a list, it's a compound query —
`> 0.5%, last 2 versions, Firefox ESR, not dead` — that re-resolves differently every time
`caniuse-lite` updates. `dead` means "no official support or updates for 24 months"; the durable
definition is the 24-month rule, any named list under it (currently including IE 11, old
BlackBerry, old Samsung, Baidu) is a snapshot of whatever the rule currently matches, not the rule
itself. **browserslist's own docs warn against the intuitive instinct to prune by familiarity**:
"don't remove browsers just because you don't know them — Opera Mini has 100 million users in
Africa," and pure percentage-based pruning risks recreating "the monopoly and stagnation situation
we had with Internet Explorer 6."

**Baseline** (`web-platform-dx/web-features`, Apache-2.0, v3.34.2, 2026-07-24) is the newest and
most operationally usable of the four, because it is directly queryable from browserslist
(`baseline widely available`, `baseline newly available`). Its model and licence terms are covered
in §3.

**The staleness hazard that nothing warns you about at build time:** every percentage or `last N`
query is only as fresh as the bundled `caniuse-lite` snapshot. A stale snapshot produces a
**silently wrong matrix with no error** — the build does not fail, it computes against outdated
usage numbers. Pin and date the snapshot; a matrix without a recorded snapshot date is not
verifiable, only asserted.

### 2. `partial_implementation`: compatibility's own `not_tested`
Two independent standards bodies landed on the identical rule for "sort of works," which is strong
enough convergence to adopt outright: **caniuse requires a human-written note whenever status `a`
is used; MDN BCD's schema requires a `notes` entry whenever `partial_implementation` is set.**
Neither project allows "partial" to stand alone as a bare flag.

Baseline goes one step further and resolves the ambiguity in the strict direction: computing
"newly available" or "widely available" status **excludes any feature flagged
`partial_implementation`** in the underlying BCD data — a feature partially supported anywhere in
the core set is treated as not supported at all for Baseline purposes, full stop.

Map this explicitly onto this skill's own evidence-state vocabulary: **`partial_implementation` is
the compatibility domain's version of `not_tested`.** "Supported, but not really" is not a weaker
kind of "supported" — it is a first-class state that must carry its own written justification,
exactly as an evidence dossier's `not_tested` row must carry an owner and a reason rather than a
silent gap (invariant 5: omission is permitted, silent omission is not). A matrix row reading
"partial" with no note is a silent omission wearing a support claim's clothes.

### 3. Baseline: the newest published answer to "is this safe to use"
Baseline's **core browser set is exactly seven**: Safari (iOS), Safari (macOS), Chrome (Android),
Chrome (desktop), Edge (desktop), Firefox (Android), Firefox (desktop).

- **"Newly available"**: for each current stable release in the core seven, BCD reports the feature
  supported (partial implementations excluded, per §2).
- **"Widely available"**: the feature's keystone date is on or before **today minus 30 months**, and
  on or before the release date of the latest Firefox ESR. The 30-month figure is unusually
  honestly sourced for a threshold: the spec states it approximates "developer signals, estimates
  of browser release uptake over time, an estimate of high total market share support, and the
  project owners group's best judgement" — a reasoned number with a named rationale, not an
  unexplained Schelling point.
- **Rolling, not fixed:** both statuses are computed against *today's* date. A feature's Baseline
  status can change without the feature itself changing — Baseline's own stated goal is that
  features "can and should join and leave Baseline status" as conditions shift. A matrix built on a
  Baseline query is only as current as its last resolution.

**What Baseline explicitly does not decide** — treat its own non-goals as first-class judgment
content, not fine print: it does not identify universal availability ("many Baseline features will
not achieve 100% user reach soon or perhaps ever"); it does not cover **assistive technology**
support at all (screen readers, magnifiers, voice control — route that question to
`accessibility-conformance.md`); it does not cover non-web runtimes (Node, Deno, Electron); it does
not tell you when it's safe to *stop* shipping a polyfill except via the "widely available"
threshold itself; and it explicitly does not replace fine-grained reporting — caniuse and MDN
remain the tools for "what exactly is broken where," Baseline only answers "may I use this feature
at all."

### 4. Constructing the matrix from real usage, not inherited defaults
The failure mode this reference exists to prevent is inheriting a competitor's tier table (or last
year's own) without re-deriving it. The construction order, assembled from the sources above:
1. **Your own analytics first** — real traffic beats any market-share proxy for your specific
   audience.
2. **Region-scoped market-share data second**, when your own analytics don't cover a market you
   need — with browserslist's warning in mind: don't drop a browser because it's unfamiliar to the
   team; Opera Mini's ~100M African users and Chinese QQ Browser's share (larger than Firefox and
   desktop Safari combined) are the standing counterexamples to "nobody uses that."
3. **Express the target as a query against a dated snapshot**, never a frozen list — the resolved
   set is expected to drift as usage and release cadence change; that's the query working as
   designed, not decay.
4. **Use Baseline for "may I use this feature," caniuse/BCD for "what exactly is broken where."**
   They answer different questions; don't make one stand in for the other.
5. **Never ship a partial-support row without the note** (§2).

### 5. Traffic-tiered device selection
Device-cloud vendors publish quantified tiering; treat the numbers as **citable anchors from a
vendor with an obvious commercial interest, not an independent standard** — the same subtraction
this skill applies to any other unrationalized number. BrowserStack publishes the most explicit
tiering found: ≤15k monthly visitors → 7 devices, 15k–300k → 11, 300k+ → 17, plus geography-specific
device lists for major non-US markets — with its own stated method putting analytics first and
market-share data second, the same order as §4.

Two vendor taxonomies are useful independent of any tiering advice: **AWS Device Farm's dimension
list** (manufacturer, form factor, platform, OS version, model) is a reasonable checklist for what
a matrix row should encode regardless of vendor. **Firebase Test Lab's capacity tiers
(High/Medium/Low) measure run-throughput, not audience reach** — a different axis entirely; don't
conflate "how many devices we can afford to run against" with "how many devices our users actually
carry."

### 6. The cloud-browser trap
**A cloud or automation-engine browser is not the shipping consumer browser.** Playwright's WebKit
build is not Safari; running a check against it establishes WebKit-engine coverage, not Safari
coverage, and a matrix that reports the two interchangeably is reporting a stronger claim than it
verified. Keep engine and browser identity distinct in every row: what was actually executed
(engine + version, e.g. "WebKit 26.0 via Playwright") versus what a user experiences (the branded,
vendor-shipped browser, which may embed a different engine build, different flags, or different
OS-level compositor behavior). Where the two are known to diverge, name the automation engine
explicitly rather than borrowing the consumer browser's name for it.

### 7. Dated review — the matrix goes stale silently
Nothing about a compatibility matrix fails loudly when it goes out of date:
- A stale `caniuse-lite` produces a silently wrong resolved browser set (§1) — no build error.
- Baseline status is computed against *today's* date (§3) — a feature that was "widely available"
  at matrix-build time can still be accurately described that way months later purely because
  nobody re-ran the query, while the reverse (a feature crossing the 30-month line since the matrix
  was built) goes unnoticed the same way.
- EOL/support-window data should come from a structured, dated source (`endoflife.date`, MIT)
  rather than institutional memory.

**Recommend a `last-verified` date on the matrix itself**, with a stated re-resolution cadence
(before each release, or on a fixed interval — pick one and record it), rather than treating the
matrix as a document written once and trusted indefinitely. A matrix with no date is not evidence
of current support; it's evidence of *someone's* support decision *at some past, unstated time*.

## Validation
- [ ] Every support-tier number traces to a named source (own analytics, a named market-share
      source, or a named vendor's published tiering) — never asserted from memory.
- [ ] Every partial-support row carries a written note of what specifically fails, not a bare flag.
- [ ] The matrix states its target as a query against a dated snapshot, and the snapshot date is
      recorded.
- [ ] Automation-engine coverage and shipping-browser coverage are named separately wherever they
      could be confused (WebKit ≠ Safari).
- [ ] caniuse-derived data carries attribution; MDN BCD-derived data is correctly noted as not
      requiring it.
- [ ] The matrix has a `last-verified` date and a stated re-resolution cadence.

## Failure modes and handoff
- The question is really "does our AT support work," not browser/OS support →
  `accessibility-conformance.md`.
- The question is per-device performance budgets or load behavior →
  `performance-and-load-verification.md`.
- The gap found is a missing polyfill or fallback → the owning `frontend` reference, not this one.
- The matrix decision needs to become a stated release exception or claim →
  `release-gate-and-claims.md`.
