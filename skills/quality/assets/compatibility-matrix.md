# Compatibility / Support Matrix (fillable)

Where the tiers come from and what may legally be shipped alongside them — most support tables have
tiers; almost none document where the numbers came from or the licence on the data behind them.
Source: `references/compatibility-and-support-matrix.md`. Date-stamped 2026-07-26 — browser/data
versions in this file rot; re-verify at the pointer given.

## 1. Support tiers

| Tier | Browsers/devices/versions in tier | Justification | Upstream data source | Source licence |
|---|---|---|---|---|
| Tier 1 (fully supported) | | | | |
| Tier 2 (best-effort) | | | | |
| Tier 3 / unsupported | | | | |

**Express the target as a query, not a frozen list** where possible (e.g. browserslist `defaults`,
or `baseline widely available`) — a resolved list drifts silently as the underlying data updates; a
query re-resolves on every check.

## 2. Upstream sources and their licences (2026-07-26 — reverify before relying on this table)

| Source | What it answers | Licence | Attribution required? |
|---|---|---|---|
| **caniuse (Fyrd/caniuse)** | "Can I use this feature, in which browser versions" | **CC-BY-4.0** | Yes — *"mention somewhere that the source is caniuse.com."* Attribution obligation travels transitively through `caniuse-lite`/browserslist consumers. |
| **MDN Browser Compat Data (mdn/browser-compat-data)** | Per-feature `version_added`, `partial_implementation`, notes | **CC0-1.0** | No — strictly more permissive than caniuse, no attribution required |
| **browserslist** | Resolves a *query* (`defaults`, `> 0.5%`, `not dead`, custom stats, `baseline widely available`, `maintained node versions`) against caniuse-lite data | MIT (tool licence; data licence is caniuse's, see above) | Attribute the underlying caniuse data if you cite specific numbers |
| **Baseline (web-platform-dx)** | `limited` / `newly available` / `widely available` status per feature, computed against *today's* date | **Apache-2.0** (`web-platform-dx/web-features` v3.34.2, verified 2026-07-26) | Baseline is a rolling definition — a feature's status changes over time without the feature changing; date every reference to it |

**Never confuse caniuse's `statuses` (spec maturity: WD/CR/REC/etc.) with its per-browser support
data — they answer different questions.**

## 3. `partial_implementation` handling

Baseline treats a partially-implemented feature as **not supported at all** — do not round a partial
implementation up to "supported." MDN BCD's schema requires a `notes` field whenever
`partial_implementation` is set; carry that note into this matrix, don't drop it.

| Feature | Browser/version | `partial_implementation`? | Note (required if yes) |
|---|---|---|---|
| | | | |

## 4. What this matrix does not decide (Baseline's own stated non-goals — apply generally)

- Does not identify **universally** available features — "widely available" ≠ 100% reach.
- Does not cover assistive technology support (screen readers, magnifiers, voice control) — that is
  a separate accessibility conformance question, see `references/accessibility-conformance.md`.
- Does not replace fine-grained per-feature reporting — this matrix is a decision summary, not a
  substitute for checking caniuse/MDN directly on a specific feature.
- Does not tell you when to *stop* shipping a polyfill on its own — pair it with usage data.

## 5. Freshness

- `caniuse-lite` snapshot pinned/updated: [ date ] — **a stale snapshot fails silently**, it does not
  error; check the installed version explicitly.
- browserslist / BCD versions used: [ ]
- **Next review date:** [ ] — set this before shipping the matrix, not after.

## 6. Self-audit

- [ ] Every tier has a stated justification, not just a list of names
- [ ] Every number in this matrix traces to caniuse, MDN BCD, or browserslist — not to memory
- [ ] Attribution given wherever caniuse-derived data is cited (directly or via browserslist)
- [ ] `partial_implementation` rows carry their required note
- [ ] Next-review date is set and dated, not left as "ongoing"
