# GitHub W2 — The gate & signal layer
(as of 2026-07-26)

Scope: exact gate definitions, exact default thresholds, and the stated rationale for those
thresholds, across SonarQube/SonarCloud, coverage tools, mutation testing, test-impact
analysis, flake detection/quarantine, evidence/report formats, and DORA. Every threshold below
is either (a) quoted/derived from a primary source (docs page, source file, JSON schema) with
a URL, or (b) explicitly marked `[UNVERIFIED]`. Nothing is invented.

Corrections received mid-research from the channel lead (`github-lead-quality`) are folded in
inline and flagged as "lead-verified" where they replace or refine my own findings.

---

## A. Gate definitions harvested

### A.1 SonarQube "Sonar way" built-in quality gate — ground truth from source, not docs

Docs-page paraphrase and actual source code **disagree** on the model, so the source code wins.
Verified against `server/sonar-server-common/src/main/java/org/sonar/server/qualitygate/builtin/SonarWayQualityGate.java`
in `SonarSource/sonarqube` (main branch, HEAD at time of check = repo pushed 2026-07-24T20:31:39Z,
matching latest release tag `26.7.0.124771`, published 2026-07-08). Full class body:

```java
public class SonarWayQualityGate implements BuiltInQualityGate {
  public static final String NAME = "Sonar way";
  private final List<Condition> conditions;
  public SonarWayQualityGate() {
    this.conditions = asList(
      new Condition(NEW_VIOLATIONS_KEY, GREATER_THAN, "0"),
      new Condition(NEW_COVERAGE_KEY, LESS_THAN, "80"),
      new Condition(NEW_DUPLICATED_LINES_DENSITY_KEY, GREATER_THAN, "3"),
      new Condition(NEW_SECURITY_HOTSPOTS_REVIEWED_KEY, LESS_THAN, "100"));
  }
  ...
  public boolean supportsAiCode() { return false; }
}
```
Source: https://github.com/SonarSource/sonarqube/blob/master/server/sonar-server-common/src/main/java/org/sonar/server/qualitygate/builtin/SonarWayQualityGate.java (fetched via `gh api repos/SonarSource/sonarqube/contents/...`, 2026-07-26)

**The exact four conditions, current model, all on New Code:**

| # | Metric key | Operator | Threshold | Plain meaning |
|---|---|---|---|---|
| 1 | `new_violations` | `GREATER_THAN` | `0` | Zero new issues of any kind tolerated on new code |
| 2 | `new_coverage` | `LESS_THAN` | `80` | New code line coverage must be ≥ 80% |
| 3 | `new_duplicated_lines_density` | `GREATER_THAN` | `3` | New code duplication must be ≤ 3% |
| 4 | `new_security_hotspots_reviewed` | `LESS_THAN` | `100` | 100% of new hotspots must have been reviewed |

This matches the doc-derived summary from `docs.sonarsource.com` (WebSearch, 2026-07-26):
> "1. No new issues are introduced / 2. All new Security Hotspots are reviewed / 3. New code test coverage is greater than or equal to 80.0% / 4. Duplication in the new code is less than or equal to 3.0%"
— https://docs.sonarsource.com/sonarqube-server/quality-standards-administration/managing-quality-gates/introduction-to-quality-gates (accessed 2026-07-26)

**Important version-drift finding (this is exactly the kind of judgment content the brief wants):**
The gate used to be **rating-based** — separate conditions requiring New Maintainability
Rating / New Reliability Rating / New Security Rating to be "A" on new code — rather than a
single `new_violations > 0` condition. Proof this is a real historical model, not a guess: the
`QualityGateCaycChecker.java` source (same repo) still carries **both** the current and the
legacy metric sets, with the legacy one marked for removal:

```java
public static final Set<Metric<? extends Serializable>> CAYC_METRICS = Set.of(
    NEW_VIOLATIONS, NEW_SECURITY_HOTSPOTS_REVIEWED,
    NEW_DUPLICATED_LINES_DENSITY, NEW_COVERAGE);

// To be removed after transition
static final Set<Metric<? extends Serializable>> LEGACY_CAYC_METRICS = Set.of(
    NEW_MAINTAINABILITY_RATING, NEW_RELIABILITY_RATING,
    NEW_SECURITY_HOTSPOTS_REVIEWED, NEW_SECURITY_RATING,
    NEW_DUPLICATED_LINES_DENSITY, NEW_COVERAGE);
```
Source: https://github.com/SonarSource/sonarqube/blob/master/server/sonar-webserver-webapi/src/main/java/org/sonar/server/qualitygate/QualityGateCaycChecker.java

**So: if you are citing a threshold table for SonarQube's default gate, you must state which
model — rating-based (pre-transition / "Standard Experience" severity mode) or
violations-count-based (current, MQR-mode-aligned) — and the version. As of the 2026-07-26
main-branch snapshot (release 26.7.0), the shipped default is the violations-count model.**
Older docs snapshots (e.g. SonarQube Server 9.8/9.9 metric-definitions pages, still live on
docs.sonarsource.com) describe the rating-based Reliability/Security rating scale (see D.2)
that fed the legacy gate.

**A curiosity found in the same code search, worth noting but not load-bearing:** there is a
migration class `DecommissionSonarWayForAiCodeQualityGate` (package
`org.sonar.server.platform.db.migration.version.v202604`) that renames a built-in gate literally
named **"Sonar way for AI Code"** to **"Sonar way for AI code (legacy)"** and un-marks it as
built-in once superseded. This confirms Sonar shipped (and is now retiring/consolidating) a
**separate, AI-code-specific built-in quality gate** distinct from the general "Sonar way" gate
— i.e., Sonar's own product roadmap already treats "code written/assisted by AI" as needing a
distinct gate identity. Exact condition set of that AI-code gate: `[UNVERIFIED]` — not
extracted in this pass; flag for follow-up if the skill wants to cite it.
Source: https://github.com/SonarSource/sonarqube/blob/master/server/sonar-db-migration/src/main/java/org/sonar/server/platform/db/migration/version/v202604/DecommissionSonarWayForAiCodeQualityGate.java

**What happens when the gate fails (verbatim, from docs):**
> "For pull requests: the quality gate status will also be displayed in the repository platform as a pull request decoration. It can be used to block the merge of the pull request if the quality gate fails."
> "For CI pipelines: The quality gate status can be reported to your CI pipeline. It can be used to fail your CI pipeline if the quality gate fails."
— https://docs.sonarsource.com/sonarqube-server/quality-standards-administration/managing-quality-gates/introduction-to-quality-gates (2026-07-26)

**The question the gate answers, verbatim:** "is my project ready for release?" — same source.

**What this gate does NOT decide:** overall/whole-codebase debt (explicitly out of scope by
design, see A.2); anything about test *quality* (a test suite that hits 80% new-code coverage
with weak assertions passes cleanly — see mutation testing, section D.1, for the tool that
actually measures that); security issues that are not "hotspots" flagged by Sonar's own rule
set (no SCA/dependency-vulnerability condition in Sonar way itself — that requires
Enterprise-tier SCA, see I).

### A.2 Clean as You Code — the doctrine, verbatim, with its argument

> "Clean as You Code is Sonar's methodology for keeping code clean as you add or modify it, instead of trying to clean everything in one big remediation effort."
> "Sonar applies quality standards and gates so that Sonar warns (and can block) issues in that new code."
— https://docs.sonarsource.com/sonarqube-server/quality-standards-administration/clean-as-you-code/introduction-to-clean-as-you-code (accessed via WebFetch, 2026-07-26)

**The stated argument for why new-code-only is correct** (two distinct claims bundled together):

1. **Gradual-improvement claim**: "When you add new code, you usually also touch part of the old code. Cleaning the new code helps you gradually fix issues in the old code too, improving the whole codebase over time." — i.e., the gate rides on top of the fact that most PRs touch legacy lines anyway, so new-code discipline has a spillover effect on the old codebase without requiring a dedicated remediation project.
2. **Relevance/actionability claim**: feedback stays "relevant and actionable" by surfacing issues "during normal development flow (IDE → PR → branch)" rather than as a wall of pre-existing debt a developer didn't create and has no immediate context to fix.

This is the same shape of argument Codecov makes independently for patch-over-project coverage
(see B.1) — **both vendors converge on "gate the diff, not the estate," for structurally
identical reasons**: (a) it's actionable by the person who can act on it, (b) it avoids
punishing a change for sins it didn't commit, (c) it's the only way to get 100%-of-target
compliance without a multi-quarter remediation slog. This convergence is itself a citable
judgment finding for the skill — two independent vendors in different domains (static analysis,
coverage) landed on the identical "gate the new, not the old" argument.

`[UNVERIFIED]` — the exact numeric/period definition of "new code" (e.g. "since previous
version," "since a specific date," "number of days," "reference branch") was referenced by the
docs ("Sonar defines what counts as new code... see Configuring new code calculation") but the
precise default period was not captured in this pass — Sonar supports multiple new-code
definition methods (previous version, number of days, reference branch, specified date) and the
default varies by product (SonarQube Server vs Cloud) and version. Flag for follow-up rather
than guess.

### A.3 JaCoCo `check` goal — an explicit rule language, not a single number

JaCoCo's Maven `check` goal is a genuine **rule DSL**, more expressive than a flat percentage
gate. Verbatim structure (https://www.jacoco.org/jacoco/trunk/doc/check-mojo.html, 2026-07-26):

```xml
<rule>
  <element>BUNDLE|PACKAGE|CLASS|SOURCEFILE|METHOD</element>
  <limits>
    <limit>
      <counter>INSTRUCTION|LINE|BRANCH|COMPLEXITY|METHOD|CLASS</counter>
      <value>TOTALCOUNT|COVEREDCOUNT|MISSEDCOUNT|COVEREDRATIO|MISSEDRATIO</value>
      <minimum>value</minimum>
      <maximum>value</maximum>
    </limit>
  </limits>
</rule>
```
Defaults when unspecified: `element` defaults to `BUNDLE`, `counter` defaults to `INSTRUCTION`,
`value` defaults to `COVEREDRATIO`. Documented example rule enforces 80% instruction coverage
**and separately** zero missed classes:
```xml
<rule><element>BUNDLE</element><limits>
  <limit><counter>INSTRUCTION</counter><value>COVEREDRATIO</value><minimum>0.80</minimum></limit>
  <limit><counter>CLASS</counter><value>MISSEDCOUNT</value><maximum>0</maximum></limit>
</limits></rule>
```
**What this decides that a flat "80% coverage" number cannot**: JaCoCo can gate on *counts*
(MISSEDCOUNT/COVEREDCOUNT), not just ratios — e.g. "at most 0 fully-untested classes" is a
different (and often more useful) gate than "80% average," because a ratio gate can hide one
100%-untested class inside an otherwise well-tested bundle. **What it does NOT decide**: JaCoCo
has no first-class new-code/diff concept baked into `check` — diff-scoping coverage with JaCoCo
requires external tooling layered on top (this is precisely the gap Codecov's patch-coverage
product and generic diff-coverage tools fill).

Repo: `jacoco/jacoco` — license `NOASSERTION` per GitHub metadata (2026-07-26); 4,593 stars;
pushed 2026-07-24T18:37:39Z (active); latest release `v0.8.15`, 2026-06-05.
`[UNVERIFIED]`: I did not pull the raw LICENSE file text for jacoco/jacoco in this pass (the API
returned `NOASSERTION`, meaning GitHub's license-detector could not classify it automatically —
JaCoCo is widely known to use EPL-2.0, but that specific claim was not verified against the
actual LICENSE file text in this session; flag for a follow-up `gh api .../contents/LICENSE` read
before publishing a licensing table).

### A.4 Codecov status checks — `project` / `patch` / `changes`, full YAML schema

From https://docs.codecov.com/docs/commit-status (WebFetch, 2026-07-26):

```yaml
coverage:
  status:
    project:
      default:
        target: auto
        threshold: 5
        base: auto
        flags: []
        paths: []
        branches: []
        if_ci_failed: error
        informational: false
        only_pulls: false
    patch:
      default:
        target: auto
        threshold: 0%
        base: auto
        branches: []
        if_ci_failed: error
        only_pulls: false
        flags: []
        paths: []
```
Note the asymmetry baked into the *defaults themselves*: `project.threshold` defaults to `5`
(i.e., allow project coverage to drop up to 5 points before failing) while `patch.threshold`
defaults to `0%` (zero tolerance on new-code coverage regression by default) — this is Codecov
encoding "gate the diff strictly, be lenient on the aggregate" directly into its shipped
defaults, independently arriving at the same "new code is where strictness belongs" posture as
Sonar's Clean-as-You-Code (A.2).

`changes` status: the docs describe behavior ("detecting coverage changes not included in
commit/pull diffs") but no explicit separate YAML schema block was captured in this pass —
`[UNVERIFIED]` for its exact default keys; treat as: it warns about coverage drift in files
*outside* the diff, a genuinely distinct third failure mode from both `project` and `patch`.

`if_ci_failed: error` default behavior: if the CI run that produced the coverage report itself
failed, the status check errors out (rather than silently passing or silently failing) — this is
itself a judgment default (fail closed on ambiguous input, not fail open).

Repo: `codecov/codecov-action` — MIT license (metadata, 2026-07-26); 1,697 stars; latest release
`v7.0.0`, 2026-06-07; pushed 2026-06-09 (active, though slower cadence than the Sonar/Stryker
repos — the Action wrapper repo, not the core Codecov service, which is closed-source SaaS).

### A.5 Stryker mutation-score break gate

See D.1 for the full formula; the gate mechanics:
```
thresholds.high (default 80): mutation score >= high → green
thresholds.low  (default 60): high > score >= low   → orange/yellow
thresholds.break (default null): score < break       → Stryker exits 1 (build failure)
```
Source: https://stryker-mutator.io/docs/stryker-js/configuration/ (WebFetch, 2026-07-26).
**Judgment content**: `break` defaults to `null`, meaning **Stryker ships with the actual
CI-failing gate turned off by default** — `high`/`low` only control report coloring. A team must
deliberately opt in to making mutation score a merge-blocking gate. This mirrors PIT's identical
default posture (A.6) — both major mutation-testing tools in different ecosystems (JS, Java) ship
with the *scoring* on by default but the *gate* off by default, requiring explicit opt-in. That
convergence is a strong signal that "mutation testing is safe to introduce as visibility before
you make it a gate" is close to industry consensus best practice, not an accident of one tool's
defaults.

### A.6 PIT (pitest) `mutationThreshold` / `coverageThreshold` — verified in source, default 0 = off

Docs page (https://pitest.org/quickstart/maven/, 2026-07-26) states only:
> "Mutation score threshold at which to fail the build. This is a percentage (0-100) representing the fraction of killed mutations out of all mutations." (no default stated on the docs page itself)

Actual default, verified in source (`gh api repos/hcoles/pitest/contents/pitest-maven/src/main/java/org/pitest/maven/PitMojo.java`, 2026-07-26):
```java
@Parameter(defaultValue = "0", property = "mutationThreshold")
private String mutationThreshold = "0";
...
@Parameter(defaultValue = "0", property = "coverageThreshold")
private String coverageThreshold = "0";
...
private void throwErrorIfScoreBelowThreshold(final MutationStatistics result) {
  BigDecimal threshold = new BigDecimal(this.mutationThreshold);
  if (threshold.compareTo(BigDecimal.ZERO) != 0) {   // <-- gate is a no-op when threshold==0
    ...
```
**This is an exact, primary-source-verified fact, not an inference**: PIT's own comparison logic
explicitly special-cases `threshold == 0` as "do nothing." So both `mutationThreshold` and
`coverageThreshold` are **off by default** and must be explicitly set to a nonzero value to gate
a build. Repo: `hcoles/pitest`, Apache-2.0 (metadata + typical for the project), 1,836 stars,
pushed 2026-07-20 (very active — same-day as latest release), latest release `1.25.8`,
2026-07-20.

### A.7 coverage.py `fail_under` — exit code 2, not the generic 1

> "A target coverage percentage. If the total coverage measurement is under this value, then exit with a status code of 2."
> "If you specify a non-integral value, you must also set [report] precision properly to make use of the decimal places. A setting of 100 will fail any value under 100, regardless of the number of decimal places of precision."
— https://coverage.readthedocs.io/en/latest/config.html (WebFetch, 2026-07-26)

**Judgment content**: the distinct exit code (2, vs. coverage.py's other failure modes) is
deliberately different so CI scripts can distinguish "coverage measurement failed to run" from
"coverage ran fine but was below the bar" — a small but real piece of designed-in signal
granularity. The precision caveat is itself an "encoded gotcha": a naive `fail_under: 79.5`
without setting `precision` will behave as if truncated to the reporting precision, silently
producing a stricter or looser gate than the author intended — worth a place in a "footguns"
list for the skill.

Repo: `coveragepy/coveragepy` (moved from `nedbat/coveragepy` — **lead-verified rename**, license
unchanged: Apache-2.0). 3,398 stars, pushed 2026-07-22 (active), latest release `7.15.2`,
2026-07-15.

### A.8 nyc / istanbul coverage thresholds and watermarks

Two distinct mechanisms, read directly from `istanbuljs/nyc`'s own README
(`gh api repos/istanbuljs/nyc/contents/README.md`, 2026-07-26):

**Hard gate** (`check-coverage`):
> "You can set custom coverage thresholds that will fail if `check-coverage` is set to `true` and your coverage drops below those thresholds. For example, in the following `nyc` configuration, dropping below 80% branch, line, functions, or statements coverage would fail the build (you can have any combination of these):"
```json
{ "branches": 80, "lines": 80, "functions": 80, "statements": 80 }
```
> "To do this check on a per-file basis (as opposed to in aggregate), set the `per-file` option to `true`."

Actual current gate logic, read directly from `index.js` in the repo (primary source, not docs):
```js
_checkCoverage (summary, thresholds, file) {
  Object.keys(thresholds).forEach(function (key) {
    var coverage = summary[key].pct
    if (coverage < thresholds[key]) {
      process.exitCode = 1
      ...
```
`check-coverage` itself defaults to `false` (must be explicitly enabled) — same table:
`| check-coverage | Check whether coverage is within thresholds, fail if not | Boolean | false |`

**Soft/reporting signal** (watermarks — NOT a gate, purely a report-coloring hint):
> "high-watermarks represent healthy test coverage (in many reports this is represented with green highlighting). low-watermarks represent sub-optimal coverage levels (in many reports this is represented with red highlighting)."
Default: `{"lines":[80,95],"functions":[80,95],"branches":[80,95],"statements":[80,95]}`

**Gotcha worth flagging explicitly — the "negative threshold" feature does NOT exist in
current nyc.** The brief's prompt referenced this as an "interesting judgment encoding," and it
is real, but it belongs to nyc's **predecessor**, the original `gotwarlost/istanbul` CLI (now
deprecated/legacy), not to current `nyc`. Verified via GitHub code search
(`gh api search/code -f q="checkCoverage negative threshold"`) which surfaced classic-istanbul
source containing:
> "When a threshold is specified as a negative number it represents the maximum number of uncovered entities allowed."
I then read current nyc's own `index.js` `_checkCoverage` method directly (quoted above) and
confirmed it does a plain `coverage < thresholds[key]` comparison with **no negative-number
branch** at all. **So: cite the negative-threshold idea as a historical/classic-istanbul feature
("allow up to N uncovered lines" as an alternative encoding to a percentage), and explicitly do
NOT claim current `nyc` supports it** — that would be exactly the kind of unverifiable claim
the brief warns against. This is a good illustration for the skill of *why you check primary
source, not memory*: the feature is real, well-documented for one generation of a tool family,
and silently absent from the actively-maintained successor.

Repo: `istanbuljs/nyc` — ISC license, 5,770 stars, pushed 2026-05-17, latest release
`nyc-v18.0.0`, 2026-02-22.

---

## B. Threshold defaults WITH stated rationale (and, separately, thresholds with NO published rationale)

### B.1 WITH rationale — patch coverage over project coverage (Codecov)

Full verbatim argument, from https://about.codecov.io/blog/why-patch-coverage-is-more-important-than-project-coverage/ (WebFetch, 2026-07-26):

> "a developer should test their own code versus test all of the code."

> "demanding 100% project coverage on a team puts an undue burden and stress on a team. It can also shift valuable engineering resources to the wrong tasks."

> "aiming for high patch coverage is a more effective strategy than demanding high project coverage. It is actionable and relevant to a developer's workflow and can help to identify bugs before they merge changes."

> "While 100% project coverage may be a noble aspiration, it's often impractical and resource-intensive."

**The precise failure mode being argued against**: a flat project-coverage floor ("must stay
above 80%") penalizes a pull request for legacy code it did not touch and cannot reasonably be
asked to fix as a side effect of an unrelated change — this is the same "don't boil the ocean"
argument Sonar makes for Clean-as-You-Code (A.2), arrived at independently in a different
product category. **This convergence — two unrelated vendors, coverage tooling and static
analysis, landing on structurally identical "gate the diff" reasoning — is probably the single
most citable piece of judgment content in this whole shard.**

### B.2 WITH rationale — Stryker's `break: null` default and PIT's `threshold: 0` default

Both documented and source-verified in A.5/A.6. The implicit rationale (not stated as prose by
either project, but evident from the mechanism and corroborated by both projects converging on
the same choice independently): **mutation testing produces a lot of noise on a codebase's first
run** (equivalent mutants, weak-but-intentional test gaps, slow test suites) and forcing a hard
gate on day one would make teams disable the tool rather than fix their tests. Shipping the
*score* visible but the *gate* off is a deliberate soft-launch posture. This is inference from
mechanism, not a quoted rationale — flagged as such, not presented as a vendor quote.

### B.3 WITH rationale — SonarQube's Clean as You Code (see A.2, full verbatim quotes there)

### B.4 NO published rationale found — the "80%" coverage number itself

Multiple tools independently default to **80%** as a coverage bar:
- Sonar way: `new_coverage < 80` (A.1)
- nyc watermarks: `[80, 95]` (A.8)
- JaCoCo example rule in official docs: `minimum 0.80` (A.3)

None of the primary sources fetched in this pass **justify why 80 specifically**, as opposed to
70 or 90. This convergence-without-justification is itself a finding worth stating plainly to
the skill: **"80%" functions as an industry Schelling point, not a number anyone has published
rigorous evidence for.** I did not find, in any primary source touched in this pass, a
vendor-published argument of the form "80% because X." This matches the brief's suspicion —
flagging it explicitly as **no rigorous source located** is the correct, valuable answer here,
not a fabricated citation. `[UNVERIFIED — and likely unverifiable]`: whether any of the
frequently-cited academic arguments against fixed coverage targets (Martin Fowler's `TestCoverage`
bliki entry arguing coverage is a "useful negative signal but a poor positive one," or
Google Testing Blog posts on coverage) contain a specific counter-number was **not fetched in
this pass** (would need dedicated WebFetch of martinfowler.com/bliki/TestCoverage.html and
testing.googleblog.com — not reached given budget; recommend a follow-up pass specifically on
this before publishing a "coverage skepticism" section, so as not to paraphrase from memory).

### B.5 NO published rationale found — Coveralls thresholds

Coveralls (hosted service, no clean primary-source docs page for a `coverage_change_threshold`
was reachable in this pass — `docs.coveralls.io/coveralls-json` 404'd). `[UNVERIFIED]`: I could
not locate and verbatim-quote an official Coveralls threshold schema or a published rationale
for any specific number in this session. Do not cite Coveralls threshold defaults in the skill
without a dedicated follow-up fetch of its current docs (`docs.coveralls.io`) — better to omit
than to guess, per the hard rule.

### B.6 WITH rationale — Predictive Test Selection's accepted miss rate (this is the closest thing to "residual risk" written down as a number)

From the Facebook/Meta paper abstract (arXiv 1810.05286, WebFetch, 2026-07-26):
> "over 95% of individual test failures and over 99.9% of faulty changes are still reported"
> the strategy "reduces the total infrastructure cost of testing code changes by a factor of two"

This is an explicit, numeric, **accepted-residual-risk statement**: Meta is willing to miss up to
~5% of individual test failures (but <0.1% of faulty *changes*, which is the metric that
actually matters for shipping — a single change can trip many redundant test failures, so the
gap between "95% of failures" and "99.9% of changes" is itself an important nuance: catching a
change doesn't require catching every failing test it causes, just at least one) in exchange for
halving CI infrastructure cost. See G for full detail.

---

## C. Severity & status taxonomies

### C.1 SonarQube — OLD model (Standard Experience / legacy rating basis)

Bug/Vulnerability/Code Smell issue types, each carrying one of: Blocker, Critical, Major, Minor,
Info. This maps directly onto the legacy Reliability/Security Rating bands (see D.2):
> Reliability Rating — A: "0 bug", B: "at least one minor bug", C: "at least one major bug", D: "at least one critical bug", E: "at least one blocker bug"
> Security Rating — A: "0 vulnerability", B: "at least one minor vulnerability", C: "at least one major vulnerability", D: "at least one critical vulnerability", E: "at least one blocker vulnerability"
— https://docs.sonarsource.com/sonarqube-server/10.8/user-guide/code-metrics/metrics-definition (WebFetch, 2026-07-26; page explicitly labeled "Standard Experience")

### C.2 SonarQube — NEW model (MQR mode: Clean Code Attributes + Software Qualities + Impact Severity)

**Software Qualities** (what is impacted):
> "Security is the protection of your software from unauthorized access, use, or destruction."
> "Reliability is a measure of how your software is capable of maintaining its level of performance under stated conditions for a stated period of time."
> "Maintainability refers to the ease with which you can repair, improve and understand software code."
— https://docs.sonarsource.com/sonarqube-server/2025.3/user-guide/rules/software-qualities (via WebSearch synthesis, 2026-07-26)

**Impact Severity** (how badly, per quality, per rule violation): Blocker / High / Medium / Low
/ Info, verbatim:
> "Blocker: An issue that has a significant probability of severe unintended consequences on the application that should be fixed immediately, including bugs leading to production crashes and security flaws allowing attackers to extract sensitive data or execute malicious code."
> "High: An issue with a high impact on the application that should be fixed as soon as possible."
> "Medium: An issue with a medium impact."
> "Low/Info: There is no expected impact on the application, for informational purposes only."

**Clean Code Attributes** (the *why* a rule exists, orthogonal to impact), four categories,
verbatim names and descriptions (WebSearch synthesis of docs.sonarsource.com Clean Code
Attributes pages, 2026-07-26):
- **Consistent**: "The code is written in a uniform and conventional way, where every instruction makes sense, is adequately formed, and clearly communicates its behavior."
- **Intentional**: "code is clear, logical, complete, and efficient."
- **Adaptable**: "code is focused, distinct, modular, and tested." — with sub-attributes:
  - *Focused*: "The code has a single, narrow, and specific scope, with only one concise purpose"
  - *Distinct*: "The code procedures and data are unique and distinctive, without undue duplication"
  - *Modular*: "The code has been organized to emphasize separation between its parts, with minimal and clearly defined relationships"
  - *Tested*: "The code has automated checks that provide confidence in the functionality"
- **Responsible**: "code is lawful, trustworthy, and respectful. The code respects licensing and copyright regulation..."

**The mapping between old and new model**: a single rule maps to (a) one-or-more Clean Code
Attributes it violates, and (b) one-or-more Software Qualities it impacts, each with its own
Impact Severity — this is a **many-to-many** relationship, a genuinely richer model than the
old single-severity-per-issue scheme. `[UNVERIFIED]`: I was unable to fetch a page containing an
explicit old-severity-to-new-impact-severity **conversion table** (e.g. "old Major maps to new
Medium") in this pass — several attempted docs URLs 404'd. If the skill needs an exact
Major→Medium-style mapping table, that requires a dedicated follow-up fetch; do not assume a
1:1 mapping exists just because both scales have similar cardinality (old has 5 severities ×
3 types; new has 5 impact severities × 3 qualities — structurally similar but not necessarily
identical thresholds).

### C.3 Security Hotspot vs Vulnerability — the genuine "needs human review" distinction

Verbatim (https://docs.sonarsource.com/sonarqube-server/user-guide/security-hotspots via WebFetch, 2026-07-26):
> Security Hotspot: "Security-sensitive piece of code is highlighted, but the overall application security may not be impacted."
> Vulnerability: "A problem that impacts the application's security has been discovered and needs to be fixed immediately."

**Why hotspots require human review, not automatic classification**: the docs' own example is
cookie secure-flags — HTTPS already provides primary protection, so a secure flag may be
unnecessary for a tracking cookie that was never meant to travel over plain HTTP. The tool
cannot know the deployment context, so it defers the call to a human. This is precisely the
industry's version of the **oracle problem written down as product design**: the tool can
detect *pattern presence* but not *ground truth about whether the pattern is a defect in this
specific context* — that gap is filled by mandatory human judgment, encoded as a required
workflow state rather than a boolean pass/fail.

**Hotspot review status values, verbatim:**
> "To review: Default status; needs to be checked"
> "Acknowledged: Fix is pending or time is needed for next steps"
> "Fixed: Developer has applied a fix"
> "Safe: No change necessary; other protections already in place"

The Sonar way gate's `new_security_hotspots_reviewed < 100` condition (A.1) gates on **whether
the human review happened at all**, not on the outcome of that review — a hotspot marked "Safe"
counts as reviewed and satisfies the gate exactly as well as one marked "Fixed." This is a
deliberate and important design point: **the gate enforces process completion (a human looked at
it), not a specific verdict.**

### C.4 SonarQube Maintainability/Reliability/Security rating letter bands (A–E)

See D.2 for the full numeric formula and bands.

### C.5 Stryker mutant status taxonomy — full current list, verbatim

From https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/ (WebFetch, 2026-07-26):

| Status | Verbatim definition |
|---|---|
| Pending | "The mutant has been generated, but not run yet. This is a temporary state and will be changed once the mutant has been tested." |
| Killed | "When at least one test failed while this mutant was active, the mutant is killed." |
| Survived | "When all tests passed while this mutant was active, the mutant survived." |
| No coverage | "The mutant isn't covered by one of your tests and survived as a result." |
| Timeout | "The running of tests with this mutant active resulted in a timeout. For example, the mutant resulted in an infinite loop in your code." |
| Runtime error | "The running of the tests resulted in an error (rather than a failed test)...when a test runner throws an OutOfMemoryError or for dynamic languages where the mutant resulted in unparsable code." |
| Compile error | "The mutant caused a compile error. This can happen in compiled languages." |
| Ignored | "The mutant wasn't tested because it is ignored. Either by user action, or for another reason." |

This is precisely the "taxonomy of test-suite weakness kinds" the brief asked for: `Survived`
= a real gap (tests exist, mutant slipped through); `No coverage` = a *worse* gap (no test even
touches the code); `Timeout`/`RuntimeError`/`CompileError` are **excluded from the score
entirely** (see D.1) because they are inconclusive about test quality, not evidence of it.

### C.6 mutmut mutant status taxonomy — primary source (exit-code map), not docs

mutmut's own docs (mutmut.readthedocs.io) do **not** publish a formal status taxonomy — verified
by direct WebFetch, which came back empty on this point. The actual taxonomy only exists in
source. Read directly from `src/mutmut/__main__.py` in `boxed/mutmut`
(`gh api repos/boxed/mutmut/contents/src/mutmut/__main__.py`, 2026-07-26):

```python
status_by_exit_code = defaultdict(
    lambda: "suspicious",
    {
        1: "killed", 3: "killed", -24: "timeout",   # (note: -24 reassigned below, see raw source)
        0: "survived",
        5: "no tests", 33: "no tests",
        2: "check was interrupted by user",
        None: "not checked",
        34: "skipped",
        35: "suspicious",
        36: "timeout",
        37: "caught by type check",
        24: "timeout", 152: "timeout", 255: "timeout",
        -11: "segfault", -9: "segfault",
    },
)
```
Full status set: `killed`, `survived`, `no tests`, `check was interrupted by user`,
`not checked`, `skipped`, `suspicious`, `timeout`, `caught by type check`, `segfault`. Note the
dict has two conflicting `-24` entries in the raw source order (first mapped to `killed`, later
overwritten to `timeout` — Python dict literals let the later key win) — a minor internal
inconsistency in mutmut's own source worth flagging if precision matters, not worth over-reading.
**`caught by type check`** is a genuinely distinctive category not present in Stryker's or PIT's
taxonomy — mutmut is Python-specific and treats a static type-checker catching a mutant as a
separate signal from a test catching it, which is an interesting and under-cited distinction (a
mutant "killed" by `mypy` rather than by a test tells you something different about where your
safety net actually is).
Source: https://github.com/boxed/mutmut/blob/master/src/mutmut/__main__.py

### C.7 CTRF (Common Test Report Format) status enum

From the actual JSON Schema (`gh api repos/ctrf-io/ctrf/contents/schema/ctrf.schema.json`, 2026-07-26):
```json
"status": { "enum": ["passed", "failed", "skipped", "pending", "other"] }
```
Five states — notably **no `broken` state** (contrast with Allure, C.8) and an explicit
catch-all `other` for anything a tool can't normalize, plus a separate `rawStatus` field:
> "rawStatus": "Original status from source tool before normalization"
This is CTRF explicitly acknowledging it is a **normalization layer over heterogeneous native
tool statuses**, and preserving the original value for anyone who needs to undo the
normalization — a deliberate design choice for a lossy-but-documented mapping.

### C.8 Allure test status enum — the `broken` vs `failed` distinction, verbatim

From https://allurereport.org/docs/test-statuses/ (via WebSearch synthesis, 2026-07-26):
> "Passed: A passed test (green) is a test that finished successfully..."
> "Failed: A failed test (red) is a test that encountered an unexpected behavior in the system under test, which means that the test itself seems to be valid (not Broken), but its execution ended with a false assertion."
> "Broken: A broken test (yellow) is a test that failed because of a test defect. Unlike Failed, this status means that the test was unable to check the product's behavior as it intended to, therefore, the failure may or may not indicate an actual product defect."
> "Skipped: A skipped test (gray) is a test that was included in the test plan but then not executed."
Plus **Unknown** (fifth status, for results the reporting tool cannot classify).

**This is a genuine, citable judgment distinction**: `Failed` means "the assertion under test
actually caught something" (signal about the product); `Broken` means "the test itself threw
before or instead of asserting" (signal about the test harness — a null pointer in test setup, a
missing fixture, a flaky external dependency at the *infrastructure* level, not the *assertion*
level). Conflating these two (which JUnit XML's flat `failure`/`error` split — see F.1 — actually
does distinguish, interestingly, in the opposite direction of naming) causes teams to
misattribute test debt: a spike in `Broken` is an infrastructure/test-code problem, a spike in
`Failed` is a product-regression signal, and they need different owners and different urgency.

**Allure severity levels, verbatim** (WebSearch synthesis of allurereport.org, 2026-07-26):
> "Blocker: This is the highest severity level. A blocker issue or a test case failure is something that completely prevents further testing or use of the product or system."
> "Critical: A critical issue is a major problem that significantly impacts the functionality of the product or system, but does not entirely prevent its use or testing."
> "Normal: A normal severity issue is a moderate problem. It impacts the product or system in a noticeable way, but it's not as crucial as blocker or critical issues. It should be addressed in the course of normal workflow."
> "Minor: A minor issue has a small impact on the product or system. It might cause some inconvenience or confusion, but it doesn't significantly affect the overall functionality."
> Trivial: named but definition not captured in the sources reached this pass — `[UNVERIFIED]` for its exact wording.

### C.9 cargo-mutants outcome taxonomy — verbatim, 4 states

From https://mutants.rs/using-results.html (WebFetch, 2026-07-26):
> "caught — A test failed with this mutant applied. This is a good sign about test coverage."
> "missed — No test failed with this mutation applied, which seems to indicate a gap in test coverage."
> "unviable — The attempted mutation doesn't compile. This is inconclusive about test coverage and no action is needed."
> "timeout — The mutation caused the test suite to run for a long time, until it was eventually killed."

Deliberately smaller vocabulary than Stryker's 8 states or mutmut's 10 — cargo-mutants collapses
"survived because untested" and "survived because tests ran but didn't catch it" into a single
`missed`, trading granularity for simplicity. `unviable`'s framing — "no action is needed" — is
the most explicit, calm statement of the equivalent-mutant-adjacent compile-failure case among
all four tools compared here.

### C.10 JUnit XML result elements — the ambiguity is itself the finding

> "There is no official specification for the JUnit XML file format and various tools generate and support different flavors of this format."
— https://github.com/testmoapp/junitxml (WebFetch, 2026-07-26), the de-facto community reference
guide, explicitly self-described as unofficial: "to document a common set of elements,
attributes and conventions supported by many tools."

Common structure: `<testsuites>` (root, optional if single suite) → `<testsuite>` (class/folder/
group, nestable) → `<testcase name= classname= time=>`. Child element determines outcome:
`<failure>` (assertion/check failure), `<error>` (unexpected exception during execution — this
is JUnit XML's closest analogue to Allure's `Broken`, though the split point is not identical),
`<skipped>` (not executed). **No child element = passed** — passing is the implicit default,
not an explicit tag, which is itself a design decision with consequences: a schema-invalid or
truncated report can silently read as "all passed" rather than erroring, a real footgun for any
evidence-dossier pipeline consuming JUnit XML as a source of truth.

---

## D. Scoring models

### D.1 Stryker mutation score — both formulas, verbatim, with exact status-to-bucket mapping

From https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/ (WebFetch, 2026-07-26):

**Mutation score**: `detected / valid * 100`
**Mutation score based on covered code**: `detected / covered * 100`

Where:
- `detected = killed + timeout`
- `valid = detected + undetected`
- `covered = detected + survived`

**Why two formulas exist, and what each answers**: plain mutation score divides by *all valid
mutants* (detected + undetected), which includes mutants your tests never had a chance to catch
because the code path has zero coverage (`NoCoverage` status contributes to `undetected` but is
not the same failure mode as a covered-but-weak test). "Mutation score based on covered code"
excludes uncovered mutants from the denominator entirely, answering a narrower, more
forgiving question: **"of the code my tests actually touch, how good are the assertions?"** — as
opposed to the plain score's broader question, **"of all the code that exists, how much is
genuinely defended?"** A team with low overall coverage but a high covered-code mutation score
has a *coverage* problem, not a *test-quality* problem, and the two-formula split is precisely
designed to let a team tell those two problems apart — this is a direct, tool-native answer to
"what not to test yet vs. what you tested badly."

Compile errors and runtime errors are excluded from both formulas' denominators entirely (not
counted as valid mutants) — the tool explicitly does not let inconclusive results pollute the
score in either direction.

### D.2 SonarQube rating bands (A–E) — exact boundaries, both models

**Maintainability Rating** (technical debt ratio), verbatim formula and bands
(https://docs.sonarsource.com/sonarqube-server/10.8/user-guide/code-metrics/metrics-definition, WebFetch, 2026-07-26):
```
sqale_debt_ratio = technical debt / (cost to develop one line of code × number of lines of code)
```
Default cost-to-develop-one-line: 30 minutes. Bands:
| Rating | Technical debt ratio |
|---|---|
| A | ≤ 5% |
| B | 5% – <10% |
| C | 10% – <20% |
| D | 20% – <50% |
| E | ≥ 50% |

These bands are **user-configurable** in both the Server and Cloud UIs (Administration →
Configuration → General Settings → Technical Debt) — the 5/10/20/50 split is a shipped default,
not an immutable constant, which itself matters for a skill: citing "SonarQube says C means
10-20% debt" should carry the caveat that any given installation may have overridden it.

**Reliability Rating and Security Rating** (legacy "Standard Experience" mode — see C.1 for
full verbatim, C.2 for the newer MQR-mode replacement which uses Impact Severity instead of a
single per-project rating letter per software quality). Note: MQR mode still surfaces an overall
per-project rating letter for each Software Quality (Security/Reliability/Maintainability), but
the *contributing input* is Impact Severity counts (C.2) rather than the old Blocker/Critical/
Major/Minor/Info Bug/Vulnerability counts (C.1) — `[UNVERIFIED]`: the exact formula translating
a mix of Impact-Severity-tagged issues into a single A–E project rating under MQR mode was not
captured verbatim in this pass; flag for follow-up before citing a precise MQR-mode rating
formula.

### D.3 DORA performance-level bands — 2024 report, via secondary sources (flag: not primary-fetched)

`dora-team/fourkeys` — **lead-verified: `archived: true`, last push 2024-01-23, Apache-2.0,
2,238 stars.** Do not present it as live/maintained tooling; it is a reference implementation of
the four-keys pipeline, not currently maintained. The DORA metric *definitions* and *performance
bands*, by contrast, remain actively published research, separate from that dead repo — this
split (dead reference implementation vs. living methodology) should be stated explicitly to
avoid conflating "this specific GitHub project is abandoned" with "the metric is obsolete,"
which are unrelated facts.

**Current metric set, from dora.dev** (https://dora.dev/guides/dora-metrics-four-keys/, WebFetch,
2026-07-26) — note this page now lists **five** metrics, not the classic four, reflecting a
metric-set change over time exactly as the brief warned:
> "Change lead time: The amount of time it takes for a change to go from committed to version control to deployed in production."
> "Deployment frequency: The number of deployments over a given period or the time between deployments."
> "Change fail rate: The ratio of deployments that require immediate intervention following a deployment."
> "Deployment rework rate: The ratio of deployments that are unplanned but happen as a result of an incident in production." — **this is the newly added fifth metric**, not part of the classic "four keys."
> "Failed deployment recovery time: The time it takes to recover from a deployment that fails and requires immediate intervention."

**Numeric Elite/High/Medium/Low band boundaries**: dora.dev's own guide page did **not** contain
a numeric band table in the content reached by WebFetch (confirmed by two separate fetch/probe
attempts against that URL). The numeric bands below are therefore sourced from **secondary
aggregator summaries of the 2024 State of DevOps report** (WebSearch, 2026-07-26), not from a
primary DORA report PDF fetched directly in this session — **treat as lower-confidence than
everything else in this document and re-verify against the actual DORA 2024/2025 report PDF
before publishing a numbers table in the skill**:

> "Elite performers deploy on-demand (multiple times per day), have a lead time for changes under one day, a change failure rate under 5%, and restore service in under one hour." `[secondary source, unverified against primary PDF]`
> "Low performers can take one to six months to ship a single change." `[secondary source, unverified]`
> Distribution cited for 2024: "approximately 18% of teams fell into the elite tier, 26% high, 37% medium, and 19% low." `[secondary source, unverified]`

**The most interesting and citable finding here is not a number, it's an admitted anomaly**:
> "For the first time, the medium performance cluster has a lower change failure rate than the high performance cluster... this is unusual as these metrics typically move together across performance levels."
This is DORA's own research program flagging that **one of its own gate-relevant metrics
(change failure rate) stopped monotonically separating performance tiers** in a given report
year. That is about as close as an industry benchmark gets to publishing "this signal's
reliability degraded" — genuinely rare and valuable content, but sourced secondhand
(`getdx.com`/`octopus.com` blog summaries, not the DORA report itself), so it must be labeled as
such rather than presented as a DORA-authored quote. **Action item for the skill maintainers**:
before citing exact DORA band numbers, fetch the primary `dora.dev` research report or
`cloud.google.com/devops/state-of-devops` PDF directly and re-verify every number in this
subsection — I am flagging low confidence deliberately rather than upgrading these to "verified."

### D.4 PIT mutator groups — default vs full, exact list

From https://pitest.org/quickstart/mutators/ (WebFetch, 2026-07-26):

**DEFAULTS group**: Conditionals Boundary, Increments, Invert Negatives, Math, Negate
Conditionals, Void Method Calls, Empty Returns, False Returns, True Returns, Null Returns,
Primitive Returns.

**In ALL/STRONGER but excluded from DEFAULTS**, with stated reasoning verbatim where given:
- **Remove Conditionals** — "the reason these are not enabled by default is that there is a large degree of overlap in the tests required to kill these mutations and those required to kill mutations from other default operators such as the conditional boundaries mutator." *(judgment: redundant signal, not weaker signal — deliberately pruned for efficiency, not for being unreliable)*
- **Experimental Member Variable** — "likely to create equivalent mutations" *(judgment: pruned because it inflates the false-positive-equivalent-mutant burden)*
- **Constructor Call Mutator** — "fairly unstable and likely to cause NullPointerExceptions even with weak test suites" *(judgment: pruned because it produces noise that looks like a kill but isn't a meaningful one)*
- **Non Void Method Call Mutator** — "fairly unstable for some types" and "may also create equivalent mutations"
- All other "Experimental" mutators (Argument Propagation, Big Integer, Naked Receiver, etc.) — excluded on grounds of general immaturity/instability, not specific reasoning per-mutator.

**This is a full, citable "why we deliberately weakened the default signal" rationale set** —
directly answers the brief's call for tools that document *why* something is excluded, not just
*that* it is. PIT's own default-mutator design is arguably the single richest primary source in
this entire research pass for "engineering judgment about test-suite-weakness measurement,
written down and justified."

---

## E. Flake: operational definitions + quarantine policies

### E.1 Datadog — the cleanest operational definition + concrete quarantine numbers found

Operational definition, verbatim (https://docs.datadoghq.com/tests/flaky_test_management/, WebFetch, 2026-07-26):
> "a test that exhibits both a passing and failing status across multiple test runs for the same commit" — with the emphasis "this occurs without any code changes between runs, making the test an unreliable indicator of code quality."

Quarantine mechanics, verbatim (https://docs.datadoghq.com/tests/flaky_management/, WebFetch, 2026-07-26):
> "Keep the test running in the background, but failures don't affect CI status or break pipelines."
A quarantined test execution is tagged `@test.test_management.is_quarantined:true`.

**Exit-from-quarantine numbers** (WebSearch synthesis + WebFetch of docs.datadoghq.com/tests/flaky_management/, 2026-07-26):
> Tests transition to **Fixed** state "after passing consistently for **30 days**" — a concrete, citable number.
> Tests can move to **Disabled** "if they remain quarantined for a specified duration or meet failure rate thresholds" — `[UNVERIFIED]` for the exact duration/threshold numbers; the docs referenced policy automation without stating the specific default figures in the content reached.

**This is the strongest "quarantine still runs, doesn't gate, exits on a time-boxed signal"
policy definition found across all vendors in this pass** — concrete enough to model a skill's
own quarantine policy after: (1) still execute (visibility preserved), (2) don't gate (no
build-blocking), (3) time-boxed re-qualification (30 days of clean runs to graduate back to
trusted).

### E.2 Trunk — product exists, operational thresholds not published in reachable docs

> Trunk can "Detect, quarantine, and eliminate flaky tests" and describes "broken tests — tests failing consistently at a high rate" as a distinct category from flaky ones.
> "Flaky Tests allows you to quarantine detected flaky tests, stopping them from failing your CI jobs."
> Quarantine "can be automatic or manual."
— https://docs.trunk.io/flaky-tests (WebFetch, 2026-07-26)

`[UNVERIFIED]`: the exact number-of-runs / pass-fail-mix trigger for Trunk's auto-quarantine was
not found in the docs pages reached in this session (a more specific detection-mechanics page
404'd on the URL guessed). Do not cite a specific Trunk threshold number without a further
targeted fetch. What IS verified: quarantined tests are explicitly framed as **not blocking CI**
("stopping them from failing your CI jobs") — directionally consistent with Datadog's policy
(E.1) even though the exact trigger numbers differ in verifiability.

### E.3 Google "Flaky Tests at Google" — could not verify numbers this session; do not cite from memory

I attempted to fetch `testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html`
(John Micco's widely-cited post) twice via WebFetch and once via a web-archive mirror (blocked:
"Claude Code is unable to fetch from web.archive.org"). Both direct attempts returned only the
comments section, not the article body — the actual percentage figures commonly attributed to
this post (which circulate widely in secondary sources, e.g. claims about the share of test
transitions that are flaky) were **not independently re-verified against primary source text in
this session**. **Per the hard rule against inventing numbers: I am explicitly declining to
reproduce the commonly-repeated figure here, because I could not confirm the exact wording
myself in this pass.** `[UNVERIFIED — requires a direct re-fetch of the original blogspot post
body, or Micco's original slide deck, before any specific percentage is cited in the skill]`.
This is a case where the honest answer is "known to exist, not independently confirmed here,"
which is a real and useful finding: it tells the skill authors exactly what needs a follow-up
fetch rather than letting a plausible-sounding number slip through uncited.

### E.4 Gradle Develocity — flaky-aware Predictive Test Selection, no numeric flake trigger found

From https://docs.develocity.ai/2026.2/using-develocity/predictive-test-selection/ (WebFetch, 2026-07-26, after two redirects: `docs.gradle.com/develocity/...` → `docs.develocity.ai/predictive-test-selection/` → the versioned URL above — a real-world illustration of doc-URL churn worth noting for anyone hardcoding these links):

> "Tests that are recently new, recently changed, recently failed, or recently flaky are always selected." — i.e., flaky tests are *always run*, never skipped by the predictive-selection model, which is a deliberate safety carve-out: the system that exists to run *fewer* tests explicitly refuses to apply that logic to tests already known to be unreliable.

> Trade-off framing, verbatim: "The trade-off is testing comprehensiveness for feedback speed: local and pre-merge builds complete faster, while a subsequent pipeline stage can run the remaining tests."

Three named **selection profiles**, verbatim, no numeric confidence percentages published in
the reached content: **Conservative** ("Selects more tests to maximize confidence"),
**Standard** ("Balances confidence and time savings"), **Fast** ("Selects fewer tests to
maximize time savings"). `[UNVERIFIED]`: exact percentage/confidence-level numbers behind each
profile were not found in the docs content reached — a separate "Flaky Test Detection Guide" is
referenced but its URL 404'd on the guessed path in this session.

### E.5 CTRF's built-in flaky signal — the schema itself encodes an operational definition

From the CTRF JSON Schema (`ctrf-io/ctrf`, primary source, 2026-07-26):
```json
"flaky": { "description": "True if test passed after one or more failed attempts", "type": "boolean" }
```
and at the summary level:
```json
"flaky": { "description": "Count of flaky tests (passed after failed attempts)", "type": "integer" }
```
**This is a clean, unambiguous, machine-checkable operational definition, baked directly into a
report-format schema rather than left to prose**: flaky = eventually passed, but only after at
least one failed attempt within the same run. Simpler than Datadog's "mixed pass/fail across
multiple runs on the same commit" (E.1) — CTRF's definition is scoped to **retries within a
single test-run session**, not cross-run/cross-commit history, which is a narrower and more
mechanically simple (but also less powerful — it can't catch a test that's 100% green on retries
within one CI run but flips outcome across different CI runs of the identical commit) notion of
flaky than Datadog's.

### E.6 What "quarantine" means, compared across vendors — the actual judgment content

| Vendor | Still executes? | Still gates the build? | Exit condition |
|---|---|---|---|
| Datadog | Yes ("running in the background") | No ("failures don't affect CI status") | Fixed after 30 consecutive clean days |
| Trunk | Implied yes (not stated explicitly) | No ("stopping them from failing your CI jobs") | `[UNVERIFIED]` |
| Develocity predictive selection | Always selected (not skipped) | N/A — not a quarantine mechanism, a selection-inclusion rule | N/A |

**The consistent pattern across every vendor that publishes a policy at all**: quarantine means
"keep observing, stop gating" — never "stop running." No vendor in this pass documented a
quarantine mode that silently deletes/skips execution of the test; all treat continued execution
as necessary to detect graduation back to trusted status. That consistency, across independently
built products, is itself the judgment content worth encoding in the skill: **a quarantine
policy that stops running the test entirely is not what the industry's flaky-test tooling
means by "quarantine."**

---

## F. Evidence/report formats: schemas and status enums

### F.1 JUnit XML — see C.10 for full detail. No official spec; `testmoapp/junitxml` is the closest thing to a de-facto reference, explicitly self-described as unofficial.

### F.2 CTRF (Common Test Report Format) — full schema detail

Repo: `ctrf-io/ctrf`, MIT license (metadata, 2026-07-26), 85 stars, pushed 2026-02-07 (last
push ~5.5 months before this research date — noticeably slower cadence than the other tools in
this shard; worth flagging as a **younger, lower-adoption standardization attempt**, not yet at
the maturity of JUnit XML's de-facto universality or Allure's ecosystem size). No release tag
found via `gh api repos/ctrf-io/ctrf/releases/latest` (404) — the project may not use GitHub
Releases, relying on `specVersion` field inside the schema and npm/package versioning instead;
`[UNVERIFIED]` for a canonical "latest version" number outside the schema's own
`specVersion` pattern field.

Top-level required fields: `results`, `reportFormat` (const `"CTRF"`), `specVersion` (semver
string). `results` requires `tool`, `summary`, `tests`.

`summary` required fields: `tests, passed, failed, skipped, pending, other, start, stop` — plus
optional `flaky`, `suites`, `duration`. Note `passed/failed/skipped/pending/other` **are required
to sum to `tests`** by the schema's own field naming even though the schema itself does not
enforce that arithmetic constraint (JSON Schema has no native cross-field-sum validation) — a
consumer must check that invariant itself if it matters, another good "what the schema does NOT
decide" note.

Per-test fields (from the schema, `tests[]` items): `id` (UUID), `name`, `status` (enum:
`passed|failed|skipped|pending|other`), `duration`, `start`, `stop`, `suite` (hierarchy array),
`message`, `trace`, `snippet`, `ai` ("AI-generated diagnostic data or suggestions" — a
notably forward-looking field for an AI-assisted-debugging era), `line`, `rawStatus` (pre-
normalization original status), `tags`, `labels` (open key-value bag explicitly described as
for "priority, severity, external identifiers"), `type` (unit/integration/e2e classification),
`filePath`, `retries`, `retryAttempts[]` (full nested per-attempt records with their own status/
message/trace/stdout/stderr/attachments), `flaky` (boolean, see E.5).

Attachment schema (nested inside `retryAttempts[]`): `name`, `contentType` (MIME type), `path`
(URI/path), `extra`. Every major object in the schema carries an open `extra: object` extension
point — CTRF is explicitly designed to be extended by tool authors without breaking schema
validation, a deliberate anti-fragmentation design choice for a nascent standard trying to
displace an ambiguous incumbent (JUnit XML).

### F.3 Allure — status enum and severity, see C.8. Schema notes:

Repo: `allure-framework/allure2`, Apache-2.0 (metadata, 2026-07-26), 5,470 stars, pushed
2026-07-24 (very active), latest release `2.44.0`, 2026-07-01. `[UNVERIFIED]`: I did not pull a
raw attachment/step schema field list for Allure's result JSON in this pass (would require
either a docs fetch of a schema-reference page not reached, or reading
`allure-framework/allure2`'s Java model classes directly, e.g. `TestResult.java`) — flag for
follow-up if the skill needs the exact field-by-field schema comparable to what I captured for
CTRF above.

### F.4 ReportPortal — license confirmed clean, no open-core split found

**Lead-verified and independently confirmed via directory listing**: `reportportal/reportportal`
LICENSE file is Apache-2.0, matching the GitHub metadata `.license.spdx_id` — **no
metadata-vs-file mismatch here**, contrary to the brief's stated suspicion. I additionally
listed the repo's top-level contents (`gh api repos/reportportal/reportportal/contents/`,
2026-07-26) looking for an `ee/`/`enterprise/`/`pro/` open-core split directory: none found — the
repo is a monorepo of `service-api`, `service-authorization`, `service-auto-analyzer`,
`service-index`, `service-jobs`, `service-ui`, all under the same root LICENSE. ReportPortal's
commercial angle (per its README/positioning) is a **hosted SaaS + support** business model, not
a source-license-gated feature split — say this plainly rather than implying a trap that isn't
there, per lead's explicit correction. Repo stats: 2,009 stars, pushed 2026-06-29, latest
release `26.0.3`, 2026-05-28.

### F.5 OpenTelemetry test/CI semantic conventions

`[UNVERIFIED]` — not investigated in this pass beyond noting the brief's ask; OpenTelemetry does
have semantic-convention working groups covering CI/CD (`cicd.*` attributes exist in the
semantic-conventions spec as of recent versions) but I did not fetch
`opentelemetry.io/docs/specs/semconv/attributes-registry/cicd/` or equivalent in this session to
verify field names or status. Flag for follow-up rather than reconstructing from memory — this
is exactly the kind of item where a remembered-but-unverified attribute name would be worse than
an admitted gap.

---

## G. Risk-based selection & accepted residual risk

### G.1 Facebook/Meta Predictive Test Selection (arXiv 1810.05286) — the numbers, verbatim

> "over 95% of individual test failures and over 99.9% of faulty changes are still reported"
> the system "reduces the total infrastructure cost of testing code changes by a factor of two"
— arXiv abstract, WebFetch 2026-07-26

**Read the two percentages precisely — they answer different questions and the gap between them
is the actual insight**: "95% of individual test failures" is a per-test-case recall number
(if a test would fail, 95% of the time the system chooses to run it). "99.9% of faulty changes"
is a per-commit outcome number (if a change is genuinely bad, 99.9% of the time *at least one*
of the tests that would catch it gets selected). The second number is much higher than the first
precisely because a single bad change often breaks multiple redundant tests, so missing one
doesn't mean missing the change. **This is the single clearest example in the entire research
pass of an industry actor explicitly quantifying and accepting a residual-risk number, and
explaining (implicitly, through the choice of which metric to report) why the aggregate risk is
much smaller than the naive per-test miss rate suggests.** This is exactly the "residual risk"
concept named in the brief's zero-grep-hit list — found written down as hard numbers, not as a
vague gesture.

### G.2 CloudBees Smart Tests (formerly Launchable) — org renamed, product renamed, concept intact

**Lead-verified correction folded in, plus independently re-confirmed**: `launchableinc/cli`
now full-name-resolves to `cloudbees-oss/smart-tests-cli` (`gh api repos/launchableinc/cli` and
`gh api repos/cloudbees-oss/smart-tests-cli` both return `full_name: "cloudbees-oss/smart-tests-cli"`,
confirming a GitHub-level repo-rename redirect, not two separate repos). Current state: 27
stars, not archived, last push 2026-07-17, Apache-2.0. Its own README states plainly:
> "This is a CLI to interact with CloudBees Smart Tests." — pointing to `help.launchableinc.com`
docs, which are themselves now CloudBees-branded.

**This is precisely the kind of stale-reference trap the skill should teach people to check
for**: the org name "Launchable" is dead as an independent product identity (it was
acquired/absorbed into CloudBees), but the OSS CLI artifact is not archived and still receives
commits — a naive "check if archived" heuristic alone would have missed the rebrand entirely
and cited a name nobody uses anymore. **Both facts matter and must be stated together**: (1) not
archived, still shipping code, (2) the product/company identity it serves has changed name.
Neither fact alone gives the correct picture.

**Concept to cite** (not tied to the tiny current OSS repo's activity level): Launchable's
original pitch was a **"confidence target"** model — pick a percentage of full test-suite
confidence you want (analogous to Develocity's Conservative/Standard/Fast profiles, G.3-adjacent)
and the system selects the minimal test subset estimated to hit that confidence level.
`[UNVERIFIED]`: I did not re-verify the exact current terminology or default confidence-target
percentage from CloudBees' current docs (`help.launchableinc.com`) in this pass — cite the
*concept* (percentage-of-confidence test selection) without asserting a specific current default
number.

### G.3 OSS equivalents — what each decides and does NOT decide

- **pytest-testmon** (`tarpas/pytest-testmon`, MIT license, 1,000 stars, pushed 2026-07-22 — wait, verify: repo metadata shows pushed 2025-12-01, latest release `v2.2.0` 2025-12-01 — noticeably less recently active than most repos in this shard (about 8 months stale as of 2026-07-26), worth flagging as a maintenance-signal caveat). Per its own README: "a pytest plug-in which automatically selects and re-executes only tests affected by recent changes," using dynamic coverage-based dependency tracking (it builds a `.testmondata` database from actual line-level coverage on a baseline run, then re-runs only tests whose covered lines changed). **What it decides**: which tests are affected, based on empirically observed coverage, not static analysis. **What it does NOT decide**: anything about tests that were never run in the baseline pass, or code reached only via genuinely dynamic constructs coverage.py's tracer cannot see ahead of time; also inherently a single-machine/single-history construct — it has no notion of "confidence target," it is deterministic dependency tracking, not a probabilistic risk model like Meta's system.

- **Jest `--onlyChanged` / `--changedSince`** — verbatim from https://jestjs.io/docs/cli (WebFetch, 2026-07-26): `--onlyChanged` "Attempts to identify which tests to run based on which files have changed in the current repository. Only works if you're running tests in a git/hg repository at the moment and **requires a static dependency graph (ie. no dynamic requires)**." That parenthetical is the load-bearing caveat: Jest's selection mechanism is explicitly incompatible with dynamic `require()`/`import()` patterns — a real, stated **"what it does NOT decide correctly"** limitation, straight from the docs.

- **Nx `affected`** — verbatim/paraphrase from https://nx.dev/ci/features/affected (WebFetch, 2026-07-26): determines affected projects by diffing `base`/`head` git commits, mapping changed files to projects via the project graph, then tracing the dependency graph outward. Two explicit stated caveats: (1) "If you're modifying a project that is used by a large portion of your monorepo projects, you might end up running tasks for almost all the projects in the workspace" — a shared-dependency blast-radius problem inherent to any graph-based selection; (2) "Nx will mark all projects as affected whenever your package manager's lock file changes" — a deliberate conservative fail-safe, explicitly trading selection precision for safety whenever the tool can't be confident about what a dependency bump touched. **This fail-safe is itself a good citable "accepted-risk-in-reverse" pattern**: rather than accept residual risk to save time (like Meta's system), Nx accepts a worst-case full-suite run whenever its confidence in graph accuracy drops, i.e. it fails closed rather than fails fast.

- **Bazel target-based selection / `dotnet` TIA** — `[UNVERIFIED]` — not independently fetched/verified in this pass; both are real, well-known mechanisms (Bazel's fine-grained build-graph-based test target selection; `dotnet test` / Visual Studio's Test Impact Analysis using dynamic instrumentation) but no primary-source quote or exact default behavior was captured this session. Do not present specifics on these two beyond their existence without a follow-up fetch.

---

## H. Tool table

| Tool | Repo URL | License (file-verified) | Latest release / date | Maintenance signal (as of 2026-07-26) | What it decides | What it does NOT decide |
|---|---|---|---|---|---|---|
| SonarQube (Community Build codebase) | github.com/SonarSource/sonarqube | LGPL-3.0 (LICENSE.txt read directly, matches metadata) | 26.7.0.124771 (2026-07-08) | 10,825 stars, pushed 2026-07-24, not archived — very active | New-code gate pass/fail; issue severity/impact classification; hotspot review workflow state | Whether tests are any *good* (no mutation signal); overall legacy debt remediation timeline; dependency/SCA vulnerabilities (Enterprise-tier feature) |
| Codecov Action | github.com/codecov/codecov-action | MIT (metadata) | v7.0.0 (2026-06-07) | 1,697 stars, pushed 2026-06-09 — active but slower cadence (wrapper around closed-source SaaS core) | Patch/project/changes coverage pass-fail against configurable targets | Test quality/assertion strength; anything not measurable as line/branch coverage |
| JaCoCo | github.com/jacoco/jacoco | `NOASSERTION` per GitHub metadata — **file text not independently verified this pass**, `[UNVERIFIED]` | v0.8.15 (2026-06-05) | 4,593 stars, pushed 2026-07-24 — active | Bundle/package/class/method-level coverage ratios and counts via a rule DSL | Diff/new-code scoping (needs external tooling); test quality |
| coverage.py | github.com/coveragepy/coveragepy (renamed from nedbat/coveragepy — **rename, not relicense**) | Apache-2.0 (per lead-verified LICENSE.txt read) | 7.15.2 (2026-07-15) | 3,398 stars, pushed 2026-07-22 — active | Python line/branch coverage measurement and a single `fail_under` percentage gate | Multi-file diff scoping; anything beyond Python |
| nyc / Istanbul | github.com/istanbuljs/nyc | ISC (metadata) | nyc-v18.0.0 (2026-02-22) | 5,770 stars, pushed 2026-05-17 — active, slower than some peers | JS/TS coverage instrumentation + `check-coverage` percentage gate (opt-in) + watermark report coloring (non-gating) | Negative/count-based thresholds (that's the deprecated classic-`istanbul` CLI, not current nyc — verified absent from current source, see A.8) |
| Stryker (stryker-js) | github.com/stryker-mutator/stryker-js | Apache-2.0 (metadata) | v9.6.1 (2026-04-10) | 2,960 stars, pushed 2026-07-24 — very active | Mutation score (two formulas) + optional break-gate | Equivalent-mutant identification (explicitly "no definitive way," manual only) |
| PIT (pitest) | github.com/hcoles/pitest | Apache-2.0 (typical/metadata) | 1.25.8 (2026-07-20) | 1,836 stars, pushed 2026-07-20 — very active, same-day as release | Java mutation score + coverage, with a documented default-mutator subset chosen to avoid redundant/noisy signal | Gating (both thresholds default to `0`/off, source-verified) |
| mutmut | github.com/boxed/mutmut | BSD-3-Clause (metadata) | 3.6.0 (tag; no Releases API entry) | 1,359 stars, pushed 2026-07-16 — active | Python mutation status via a 10-state exit-code taxonomy, including a distinct "caught by type check" state | No formally documented mutation-score formula or CI-threshold flag found in reachable docs this pass — `[UNVERIFIED]` |
| cargo-mutants | github.com/sourcefrog/cargo-mutants | MIT (metadata) | v27.1.0 (2026-06-02) | 1,232 stars, pushed 2026-07-06 — active | Rust mutation testing with a deliberately small 4-state outcome vocabulary; timeout = 5× baseline (min 20s) by default | Equivalent mutants (folded into `unviable`/`missed` without a separate "equivalent" bucket) |
| CloudBees Smart Tests CLI (fka Launchable) | github.com/cloudbees-oss/smart-tests-cli (redirect from launchableinc/cli — **lead-verified**) | Apache-2.0 (metadata) | — (not checked for a tagged release) | 27 stars, pushed 2026-07-17 — small but not dead | Confidence-target-based test subset selection (concept; current exact default `[UNVERIFIED]`) | Anything the underlying ML model wasn't trained on; vendor now CloudBees, not an independent company |
| Meta Predictive Test Selection | arXiv 1810.05286 (paper, not a maintained repo) | N/A — research paper | Published 2018 (arXiv id) | N/A — describes an internal Meta system, not an OSS release | Stated numerically: ≥95% test-failure recall, ≥99.9% faulty-change recall, 2× infra cost reduction | Nothing about implementation is open-sourced; numbers are Meta-internal-workload-specific, not universal |
| pytest-testmon | github.com/tarpas/pytest-testmon | MIT (metadata) | v2.2.0 (2025-12-01) | 1,000 stars, pushed 2025-12-01 — **~8 months stale as of 2026-07-26**, flag as slower-moving than peers | Dynamic coverage-based test-affects-code dependency tracking and re-run selection | Anything not covered by the coverage-trace baseline; static/dynamic-import edge cases |
| Allure2 | github.com/allure-framework/allure2 | Apache-2.0 (metadata) | 2.44.0 (2026-07-01) | 5,470 stars, pushed 2026-07-24 — very active | Test result status (5-state incl. distinct `broken`) and 5-level severity labeling | Report generation only — Allure does not run tests or decide pass/fail itself, it visualizes upstream results |
| ReportPortal | github.com/reportportal/reportportal | Apache-2.0 (LICENSE file read directly — **matches metadata, no mismatch found**, contra initial suspicion) | 26.0.3 (2026-05-28) | 2,009 stars, pushed 2026-06-29 — active | AI-assisted test-result aggregation/analysis dashboard across CI runs | No open-core code-license split found (no ee/pro dirs); commercial model is hosted SaaS, not license-gated features |
| CTRF | github.com/ctrf-io/ctrf | MIT (metadata) | No Releases API entry found; schema versioned via internal `specVersion` field | 85 stars, pushed 2026-02-07 — **~5.5 months stale as of 2026-07-26**, youngest/least-adopted standard in this table | JSON schema for normalized test results across tools, incl. built-in `flaky` boolean/count and `rawStatus` pre-normalization field | Does not itself run tests, gate builds, or define severity beyond an open `labels` bag |
| dora-team/fourkeys | github.com/dora-team/fourkeys | Apache-2.0 (metadata) | — | **Archived: true, pushed 2024-01-23** — dead reference implementation (lead-verified) | Was a reference pipeline for computing the four/five DORA metrics from CI/CD event data | Does not reflect any DORA metric-definition changes since archival; treat metric definitions (dora.dev) as separate and still-living from this dead repo |

---

## I. Licensing notes: open-core splits, metadata-vs-file mismatches

1. **SonarQube (`SonarSource/sonarqube`)** — LICENSE.txt confirms **LGPL-3.0**, matching GitHub
   metadata exactly (no mismatch). This repo is the codebase for what Sonar now brands the
   **Community Build**. The open-core boundary is *not* visible in this repo's file tree (no
   `ee/`/`enterprise/` directories were found) — Developer/Enterprise/Data Center Edition
   features (branch analysis on self-hosted, taint analysis, portfolio management, compliance
   reports for OWASP Top 10/CWE Top 25/PCI DSS, SCA) are added in **separate, closed-source
   plugin layers not present in this open repository at all**, rather than gated by
   commented-out code inside the OSS repo. Per secondary-source pricing pages (WebSearch
   synthesis, `[secondary source, directionally reliable but not a Sonar-primary-source price
   list]`, 2026-07-26): self-hosted starts free (Community Build), roughly $2,500/yr (Developer,
   ~100K LOC), ~$16,000/yr (Enterprise, ~1M LOC), ~$100,000/yr (Data Center, ~10M LOC) — treat
   these dollar figures as `[UNVERIFIED against Sonar's own pricing page]`, cite only the
   *feature* boundary (branch analysis, taint analysis, compliance reports = paid tiers) as the
   more durable fact.

2. **`jacoco/jacoco`** — GitHub license metadata returns `NOASSERTION` (GitHub's detector
   couldn't classify it), meaning **I could not confirm the license from metadata alone**, and I
   did not pull the raw LICENSE file text in this pass. JaCoCo is widely known in the ecosystem
   to be EPL-2.0-licensed, but per the hard rule against asserting unverified facts, this
   specific claim is flagged `[UNVERIFIED]` here rather than stated as confirmed — a direct
   `gh api repos/jacoco/jacoco/contents/LICENSE` read is a two-second follow-up before
   publishing a licensing table that includes JaCoCo.

3. **`coveragepy/coveragepy`** (renamed from `nedbat/coveragepy`) — **lead-verified**: Apache-2.0,
   confirmed unchanged across the rename. General principle stated by the lead and worth
   repeating in the skill itself: **a repo move/rename is a staleness signal (stale links,
   possibly stale docs referencing the old path), not a licensing signal** — across the ~70
   repos checked centrally this session, every renamed repo kept its license. Do not infer a
   relicense from a rename.

4. **`launchableinc/cli` → `cloudbees-oss/smart-tests-cli`** — **lead-verified and independently
   re-confirmed**: this is a genuine org-and-product rename (Launchable → CloudBees Smart Tests
   following acquisition), not just a repo move within the same org. License unchanged
   (Apache-2.0). The distinguishing feature from the coverage.py case above: here the *product
   identity and company* changed, not just the repo path — a stronger staleness trap for anyone
   citing "Launchable" as a going concern.

5. **`reportportal/reportportal`** — **lead-verified, independently re-confirmed by directory
   listing**: Apache-2.0 file matches Apache-2.0 metadata, **no mismatch**. I explicitly checked
   for an open-core split (`ee/`, `enterprise/`, `pro/` directories) and found none — all
   services (`service-api`, `service-authorization`, `service-auto-analyzer`, `service-index`,
   `service-jobs`, `service-ui`) sit under one root LICENSE. State this as a clean result, not a
   near-miss — per lead's explicit instruction not to imply a trap that isn't there.

6. **`dora-team/fourkeys`** — Apache-2.0, unambiguous, but **archived** (lead-verified,
   independently confirmed: `archived: true`, `pushed_at: 2024-01-23T16:12:12Z`). The licensing
   fact and the maintenance fact are both simple here; the risk is conflating "dead repo" with
   "dead methodology" (see D.3) — they are unrelated.

7. **General pattern worth stating to the skill directly**: in this entire shard, the only
   license ambiguity found was JaCoCo's `NOASSERTION` metadata (an absence of confirmation, not
   a confirmed mismatch), and no case of GitHub metadata actively *disagreeing* with a repo's
   real LICENSE file was found among the repos checked in this pass (SonarQube, coverage.py,
   nyc, Stryker, PIT, mutmut, cargo-mutants, CTRF, Allure2, ReportPortal, fourkeys). The
   brief's suspicion that ReportPortal or an enterprise-tiered project would show a
   metadata/file mismatch did **not** pan out for ReportPortal specifically — worth reporting
   as a genuine negative result rather than forcing a "gotcha" that isn't there.

---

## J. Open gaps / [UNVERIFIED] and why

Listed in priority order (most likely to matter for the skill first):

1. **DORA Elite/High/Medium/Low numeric bands (D.3)** — sourced from secondary blog
   aggregation of the 2024 State of DevOps report, not fetched directly from a primary DORA PDF
   in this session. **Do not publish these numbers in the skill without a direct fetch of the
   primary report.** The metric-definition text itself (5 metrics, verbatim quotes) IS
   primary-sourced from dora.dev and safe to use.

2. **Google "Flaky Tests at Google" blog numbers (E.3)** — could not retrieve the article body
   text (only comments rendered) across three fetch attempts including a blocked archive.org
   attempt. **No number from this post should be cited in the skill until a direct re-fetch
   succeeds.**

3. **SonarQube "new code" default definition period (A.2)** — docs referenced the concept and
   a "Configuring new code calculation" page, but the exact default period/method (previous
   version vs. N days vs. reference branch vs. specified date) was not captured verbatim.

4. **MQR-mode overall project-rating formula (D.2)** — confirmed the Impact-Severity/Software-
   Quality model exists and confirmed the legacy rating-band formula, but did not confirm the
   precise current formula for computing an A–E project rating from a mix of Impact-Severity-
   tagged issues under MQR mode specifically.

5. **Old-severity-to-new-Impact-Severity conversion table (C.2)** — confirmed both taxonomies
   exist and confirmed a rule maps to both, but did not find/verify an explicit published
   crosswalk table (e.g. "Major → Medium") — do not assume one exists with 1:1 cardinality.

6. **JaCoCo license file text (I.2)** — metadata inconclusive (`NOASSERTION`); raw file not
   pulled this pass. Trivial follow-up, flagged rather than assumed.

7. **Coveralls threshold schema and rationale (B.5)** — could not reach usable docs
   (`docs.coveralls.io/coveralls-json` 404'd); omitted rather than guessed.

8. **Trunk auto-quarantine numeric trigger (E.2)** and **Develocity flaky-detection numeric
   trigger (E.4)** — both products clearly document *that* they detect and quarantine flaky
   tests and roughly *what quarantine does* (don't gate, keep observing), but neither
   documented *the exact numeric trigger* (N runs, mixed-result ratio) in the pages reached this
   session.

9. **Allure2 raw result-object field schema (F.3)** — status/severity enums fully captured
   (C.8), but a field-by-field attachment/step/parameter schema comparable to what was extracted
   for CTRF (F.2) was not pulled from source in this pass.

10. **OpenTelemetry CI/test semantic conventions (F.5)** — not investigated beyond noting they
    likely exist; zero verbatim content captured.

11. **Bazel target-based test selection and .NET Test Impact Analysis (G.3)** — noted as real
    and well-known but not independently source-verified in this pass; no claims made about
    their specifics beyond existence.

12. **CloudBees Smart Tests current confidence-target default (G.2)** — the *concept* (percentage-
    of-confidence test selection) is well-established from Launchable's original positioning,
    but the current CloudBees-branded docs and any current default percentage were not
    re-fetched in this session.

**What was deliberately NOT cut despite time pressure, per the brief's explicit priority order
("cut sections 4/5 before cutting 1/2/3")**: sections A/B/C (Sonar gates, taxonomies, severity
models) and D (scoring formulas, mutation testing) received the deepest primary-source
verification, including direct reads of SonarQube's and PIT's and mutmut's actual source code
(not just docs) — this is where the highest-confidence, most load-bearing content in this
document lives. Sections E (flake) and G (risk-based selection) are present and useful but carry
more `[UNVERIFIED]` flags proportionally, consistent with the stated cutting priority.
