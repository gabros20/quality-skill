# Sources

The `quality` skill was built from a five-channel research pass (agent-skills ecosystem, GitHub
tooling, canonical literature and standards, practitioner discourse, and extraction from the
decommissioned `webdesign` skill), **2026-07-26** — full source-linked corpora live in this repo's
`research/` directory.

**Everything volatile here — tool versions, thresholds, licences, standard revisions — was verified
on 2026-07-26 and is date-stamped in the references. Re-verify before relying on any of it.**

## Two licensing rules this skill teaches, both learned the hard way

1. **Never trust a repository's API or metadata licence field.** In a 24-repo sample, **3 (~12%)**
   had clear LICENSE files while GitHub's API reported `NOASSERTION` — Hypothesis (MPL-2.0), Pact-js
   (MIT), pytest-rerunfailures (MPL-2.0).
2. **Reading *the* LICENSE file is not enough — list *every* licence-like file at the root and
   reconcile them.** Artillery's API field **and all 14 of its `package.json` files** say `MPL-2.0`,
   while the repo also ships `LICENSE-BSL.txt` (BSL 1.1; Licensed Works = "Azure-related code";
   **evaluation and/or non-production use only**). Three sources agree on the convenient wrong
   answer. A single-file check returns "MPL-2.0, clean".

Related: **Gatling's report-generation module carries a proprietary licence whose terms reach the
generated output** — relevant wherever tool reports are retained or shared as evidence artifacts.
And Semgrep's rule registry was relicensed 2024-12-13: the engine remains LGPL-2.1, the rules do not.

## Lifted with attribution

- **`pbakaus/impeccable`** (Apache-2.0, verified from `/LICENSE`) —
  https://github.com/pbakaus/impeccable. Reached this skill via the decommissioned `webdesign`
  skill, whose `art-review.md`, `design-critique.md` and `anti-default-catalog.md` were adapted from
  it and are **not** covered by that skill's own `SOURCES.md`. The Apache-2.0 obligation attaches to:
  the **P0–P3 severity scale**, the **go/no-go gate**, the **no-first-pass-sign-off rule**, the
  **round-convergence discipline**, the Nielsen-heuristic rubric with its honesty-calibration clause,
  the cognitive-load checks, the review personas, and the mechanical checks.
- **`@google/design.md`** (Apache-2.0, verified at https://github.com/google-labs-code/design.md
  `/LICENSE`). **The npm package carries no `license` field — cite the repository, never npm.**
- **`sylphxai/skills@accessibility-conformance-program-review`** (MIT) — the
  **`observed` / `inferred` / `not_tested` / `blocked`** evidence-state taxonomy, the
  requirement-to-evidence matrix, and the **release/claim split**
  (*"a product may ship with a recorded exception without earning an unqualified conformance
  claim"*). Repository authorship is `[UNVERIFIED]`; the mechanisms stand on their own merits.
- **`proffesor-for-testing/agentic-qe`** (MIT) — https://github.com/proffesor-for-testing/agentic-qe.
  **Ideas adapted, machinery not used** (it requires its own CLI and agent fleet): the adversarial
  review court with **blind charging** and **asymmetric overturn**; the **regenerability /
  Deletion Test** gate with warn-by-default adoption; the **risk-score → verification-effort
  allocation bands**; and the **suite-health trending metric set** (pass rate, flakiness, MTTR on a
  flaky fix, coverage delta).

## Ideas used, text re-expressed

- **`bendc/frontend-guidelines`** — **no LICENSE file, therefore all-rights-reserved.** Ideas that
  reached this skill through `webdesign` have been **re-expressed in our own words**; no
  near-verbatim text is shipped. Origin acknowledged as the old skill acknowledged it.

## Studied for structure, nothing lifted

- **`petrkindlmann/qa-skills`** (MIT) — https://github.com/petrkindlmann/qa-skills. The closest
  neighbour and a genuinely good pack. It is **not** badly designed: it owns construction-side
  testing because it is standalone and has nowhere to delegate it. This skill delegates to
  `frontend`, `backend`, `data` and `ai` instead.
- **`obra/superpowers@verification-before-completion`** — validates the agent-verification problem at
  scale; a single-session discipline card rather than a router.
- `community-access/accessibility-agents` (MIT) · `wshobson/agents` (MIT) ·
  `addyosmani/web-quality-skills` · vendor packs (LambdaTest, Google Android, Microsoft Playwright).

## Deliberately NOT used — licence incompatible or unlicensed

`naodeng/awesome-qa-skills` (**GPL-3.0**) · `mgifford/accessibility-skills` (**AGPL-3.0**) ·
`trailofbits/skills` (**CC-BY-SA-4.0**) · `qodex-ai` (**proprietary**) · `anthropics/skills`,
`vercel-labs/agent-skills`, `ComposioHQ/awesome-claude-skills` (**no LICENSE file at all**).

## Standards and specifications

- **ISO/IEC 15026-2:2011** — assurance cases. The formal spine for the evidence dossier: §6.3.2
  (claims carry uncertainty and conditions of applicability), §6.3.3 (evidence may not be extended
  past what it covers), §6.6.2 (unsupported propositions are assumptions), **§7.2(b) (omission is
  permitted; silent omission is not)**. **Declared divergence:** the standard requires *quantified*
  uncertainty; this skill ships an *ordinal* evidence-state vocabulary instead and says so.
- **WCAG 2.2** (W3C Recommendation, 2024-12-12) — five conformance requirements; 4.1.1 Parsing
  removed — https://www.w3.org/TR/WCAG22/ · **ACT Rules** with the `automatic`/`manual`/`semiAuto`
  EARL test-mode split — https://www.w3.org/WAI/standards-guidelines/act/rules/ · VPAT/ACR ·
  EN 301 549
- **OWASP** — WSTG 4.2 · **ASVS 5.0.0** (L1/L2/L3 verification levels) · Top 10:2025 ·
  **LLM Top 10:2025** — https://owasp.org/
- **NIST AI RMF** (four functions, seven trustworthy-AI characteristics) · ISO/IEC 42001 · EU AI Act
- **Core Web Vitals** — LCP 2.5s / INP 200ms / CLS 0.1 at the 75th percentile;
  field-over-lab primacy — https://web.dev/articles/vitals
- **OpenVEX** `not_affected` justification enum — residual risk in machine-readable form
- **Compatibility data:** caniuse (**CC-BY-4.0**) · MDN browser-compat-data incl.
  `partial_implementation` (**CC0**) · browserslist · Baseline's "widely available" rule

## Literature

- **Cem Kaner** — the test oracle (*"helps you decide"*, not *"tells you"*) — https://kaner.com/?p=190
- **James Bach & Michael Bolton** — testing vs checking (2013; the page's 2024-08-10 timestamp is a
  re-save, not a revision); Rapid Software Testing;
  HTSM v6.0 (2024); **Bolton's stopping heuristics**; Bach's *Good Enough Software* (IEEE Computer,
  Aug 1997) — https://www.satisfice.com/ · https://www.developsense.com/
  **Caution: a 2023-04-01 post announcing RST's retirement "because of AI" is an April Fools joke.**
- **Brian Marick** — *How to Misuse Code Coverage* (1997) · **Inozemtseva & Holmes**, ICSE 2014
  (coverage does not measure suite effectiveness) · **Jia & Harman** (mutation survey) ·
  **Petrović & Ivanković**, ICSE-SEIP 2018 (Google dropped mutation score as unactionable)
- **Ram Chillarege — Orthogonal Defect Classification (ODC)**, the sourced defect taxonomy adopted as
  this skill's classification spine · **Bettenburg et al.** (bug-report quality) ·
  **van Deursen et al.** (the original 11 test smells)
- **McDermott & Fox**, ACSAC 1999 — abuse cases, refutation, and residual risk
- **Kent Beck** — Test Desiderata · **Martin Fowler** — Practical Test Pyramid, TestCoverage,
  non-determinism taxonomy · **Kent C. Dodds** — Testing Trophy · **Guillermo Rauch** (2016-12-10) —
  *"Write tests. Not too many. Mostly integration."* **(originator; commonly misattributed)**
- **Software Engineering at Google** ch. 11–14 — test sizes, hermetic servers, the Beyoncé rule
- **Gil Tene** — coordinated omission · **Dean & Barroso** — tail at scale
- **DORA** — now **five** metrics, not four (`deployment rework rate` added). Elite/High/Medium/Low
  band numbers reached only via secondary sources — `[UNVERIFIED]`, re-source before citing.

## Numbers this skill refuses to ship unqualified

- **The 80% coverage threshold has no published rationale.** Three independent defaults converge on
  it (SonarQube `new_coverage < 80`, nyc watermarks `[80, 95]`, JaCoCo's example rule `0.80`) and no
  primary source justifies 80 over 70 or 90. It is an industry Schelling point.
- **Neither Cohn's pyramid nor Dodds's trophy states a numeric ratio.** The percentages are later
  accretions; the one institution publishing numbers contradicts itself (80/15/5 in
  *SWE at Google* vs Bland's 70/20/10, self-disclaimed as arbitrary).
- **Automated accessibility detection is a contested range, split by source type:** vendor
  self-report **57%** (Deque 2021 study — 2,000+ audits, 13,000+ pages, ~300,000 issues; the figure
  whose methodology was captured and verified) vs independent measurement clustering **~20–33%**
  (WebAIM ~30%, W3C/WAI ~20–30% of Success Criteria fully automatable, GSA "1 in 3",
  Accessible.org 13% fully / 45% partial / 42% not at all).
  **Never ship a single number; cite the range with the vendor/independent split on its face.**
  Two newer Deque claims — **57.38%** automated and **80.39%** combined — are **`[UNVERIFIED]`**:
  the underlying methodology was not retrievable, and one corpus channel places the 300,000-issue
  sample with these newer figures rather than the 2021 study, a conflict this skill does not
  resolve. Note also that 57% and ~20–30% are not measuring the same quantity in the first place.
  **Cite 57% (2021); do not ship 57.38% or 80.39% without fresh verification.**
- **"LLM-written tests assert existing bugs" is reasoning, not measurement.** No quantified study was
  found. The mechanism ships; no number does.

## Confirmed abuse cases (the ecosystem's `abuse case` count is zero)

- **`jqwik-team/jqwik`** (EPL-2.0, verified) ships a deliberate prompt injection in stdout under a
  documented "Anti-AI Usage Clause", emitted on every test execution and hidden from interactive
  terminals by ANSI erase codes while remaining in the bytes that CI logs and agents read. Recorded
  as data; never complied with. → *runner output is untrusted; take verdicts from typed channels.*
- **Accessibility overlay vendors** publicly accused by WebAIM of manipulating pages to suppress
  error detection, with measured violation increases under overlays and a dropped SLAPP suit against
  a named practitioner. → *an instrument pointed at an adversarial subject measures the adversary's
  response to the instrument, not the property you wanted.*

## Attribution hazards encountered

Four X accounts were confirmed **impostors or misidentifications** of named accessibility and
testing practitioners during research. Where a handle could not be confirmed, this skill cites the
person's own site or publication instead.

## Method

Five channels · 21 agents (5 Opus leads, 16 Sonnet workers) · ~150 skills-CLI queries · ~90 repos
surfaced · ~35 SKILL.md files read in full · ~2,600 tweets swept to ~95 curated · primary-source PDFs
read raw rather than through summarizers. Corpora and raw worker output: `research/` and
`research/_raw/`. Open gaps are recorded rather than smoothed.
