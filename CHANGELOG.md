# Changelog

All notable changes to **quality** are documented here.

The release procedure synchronizes `.codex-plugin/plugin.json`, this changelog, git tag
`v<version>`, and the matching GitHub Release. Runtime `SKILL.md` contains no version metadata.

## [Unreleased]

### Added
- `surface-ai-system.md` **Recovery and side-effect evidence**: a "production-ready" or "autonomous
  actions" claim needs ten recovery drills as requirement-to-evidence rows in the dossier (worker
  killed around a tool call, duplicate start/webhook/approval, reconnect from another device,
  revocation while waiting, cancellation during fan-out, deletion propagation, paused runs across a
  deploy, injection through every content channel, budget and quota exhaustion, staging restore),
  each with the proposition it refutes and its oracle; a drill not run is `not_tested` and narrows
  the claim. This skill plans and judges; the owning Build pack writes each drill. Router row and
  OWASP AI Agent Security Cheat Sheet source entry; one traversal and one output eval.

## [0.2.0] — 2026-10-17

### Added
- **Rebuild and migration verification** (`surface-web-app-and-site.md`, router row): the source site
  as the oracle, with the oracle keyed to the declared intent (fidelity vs redesign); computable parity
  checks (routes/redirects, every kept link including nested menus and multi-segment paths, copy and
  metadata, block-renderer coverage, asset provenance, widget behaviour, residue); status code and
  rendered content as separate propositions; the probe's client as part of the oracle; screenshot
  evidence validity; computed style as an oracle a green build is not.
- **Oracles:** an unconfirmed "not found" is `inferred`, not an observed absence; compute what is
  computable; replay a gate against a known-bad archived run to watch it fail; the common shapes of a
  pass for a proposition nobody exercised (write-path confirmation, empty-set gates, fail-open guards,
  prose-only criteria, proxy comparisons).
- **Functional / compatibility:** a substitute counts only for the properties it implements, with a
  control that must fail; an emulated architecture is not the native one.
- **Strategy:** page/route sampling follows the risk rank, never crawl order.
- **Defects:** verdict-record consistency check, non-downgradable findings named before review,
  cascades filed as one chain, upstream-filing filter. **AI behaviour:** audit agent-built outputs for
  substitution and read the run log.
- One traversal and one output eval case.
- **Cross-pack alignment with `design` and `frontend` on rebuilds:** a disclosed, owner-approved
  generated fill in a non-brand, non-hero decorative slot is a declared gap, not a substitution; a
  placeholder route is a declared gap, and one without `noindex` or listed in the sitemap is a soft-404
  defect; "fidelity" cross-names frontend's "faithful rebuild" and design's "reproduce".

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

[0.2.0]: https://github.com/gabros20/quality-skill/releases/tag/v0.2.0
[0.1.2]: https://github.com/gabros20/quality-skill/releases/tag/v0.1.2
[0.1.0]: https://github.com/gabros20/quality-skill/releases/tag/v0.1.0
