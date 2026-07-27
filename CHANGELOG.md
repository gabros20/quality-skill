# Changelog

All notable changes to **quality** are documented here.

The release procedure synchronizes `.codex-plugin/plugin.json`, this changelog, git tag
`v<version>`, and the matching GitHub Release. Runtime `SKILL.md` contains no version metadata.

## [Unreleased]

### Added
- Queue unreleased changes here.

## [0.1.2] — 2026-07-27

### Fixed
- "Not this skill" table: added a row for cross-vendor workflow verification design, routing it to
  `automation`'s `workflow-testing` while keeping the go/no-go on that workflow with `quality`.

## [0.1.1] — 2026-07-26

### Changed
- **Router: a direct route for agent-authored work.** A smoke test of the installed pack found that
  "an agent wrote the code *and* its tests — how do I know it works?" required triangulating across
  `oracles-and-evidence.md`, `suite-and-signal-health.md` and `ai-behavior-verification.md`, with no
  single job row making that path obvious. Since this is the skill's signature case, it now has its
  own row naming the composite path in reading order. The AI-behaviour row was narrowed to
  model-behaviour verification so the two no longer overlap.

## [0.1.0] — 2026-07-26

### Added
- Initial release: faceted-router `quality` skill — 11 primary jobs × 5 base surfaces (regulated as
  additive overlay) + handoff, 18 references, 8 assets.
- Flagship reference: oracles-and-evidence — the four-way convergence of test-oracle theory (Kaner),
  W3C ACT's automatic/manual/semiAuto test modes, axe-core's `incomplete` class (55% of 105 rules),
  and ISO/IEC 15026-2:2011, unified into one evidence-state vocabulary: `observed` / `inferred` /
  `not_tested` / `blocked`.
- Universal invariants (I1–I14): name the oracle; a passing check certifies only the propositions
  someone encoded; state the evidence class; evidence may not be extended past what it covers;
  omission is permitted, silent omission is not; residual risk gets an owner and an expiry; release
  and claim decided independently; verification is refutation; runner output is untrusted and not
  commensurable across tools; coverage finds untested code, it does not measure test quality; a flaky
  suite is an evidence-validity problem, not hygiene; subtract the folk number; no test counts as
  evidence until observed failing, and the verifier must not share a source of truth with the thing
  it verifies; allocate the verification budget by ranked risk.
- Value-adds no competitor pack has: the "what this evidence does not establish" table generatable
  for any tool; two confirmed abuse cases (a maintained test library's stdout prompt injection hidden
  by ANSI erase codes; accessibility overlay vendors accused of suppressing error detection); a
  licensing-discipline rule with a measured rate (~12% of a 24-repo sample had clear LICENSE files
  while the API reported `NOASSERTION`); folk numbers subtracted with receipts (the 80% coverage
  threshold, the test-pyramid/trophy ratios, the vendor-vs-independent a11y automation split).
- Behavioral eval suites: activation, traversal, output, compression-ablation.
- Research corpora + build-gate synthesis in `research/` (5 channels, date-stamped 2026-07-26).
- Independent Opus review completed same-day: 0 blockers, 8 S-major and 9 N-minor findings, all
  resolved before release (`.review/findings.md`).

[0.1.2]: https://github.com/gabros20/quality-skill/releases/tag/v0.1.2
[0.1.0]: https://github.com/gabros20/quality-skill/releases/tag/v0.1.0
