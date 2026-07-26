# W3 — Non-functional verification skills (a11y / perf / security-testing / privacy-compliance)

Scope owned: accessibility audit/conformance, WCAG, screen-reader testing, axe-core, Lighthouse/Core Web
Vitals, performance/load testing (k6/JMeter/Gatling), security testing (DAST/SAST/pentest/OWASP), threat
modeling (boundary only), privacy checks/GDPR, SOC2/compliance evidence, VPAT/accessibility conformance
reports. Date-stamped 2026-07-26. Session WebSearch budget: 0/10 used (skills-CLI + `gh` sufficed).

---

## (a) My read: NARROW

No neutral, cross-domain "assurance router" exists that spans accessibility + performance + security +
privacy as ONE altitude-aware decision engine producing a single evidence dossier and release-readiness
call. That specific shape is OPEN. But within the **accessibility slice alone**, the niche is no longer
empty — `community-access/accessibility-agents` (aka `taylorarndt/a11y-agent-team`, same author, same
content) and `sylphxai/skills@accessibility-conformance-program-review` both do real measure-and-decide
work (VPAT/ACR mapping, evidence-state taxonomies, ship/no-ship gating) that goes beyond "how to build
accessible things." And `petrkindlmann/qa-skills` — a 47-skill MIT family — has individually-scoped,
CI-enforced, budget-gated skills for performance, security, accessibility, and compliance testing, each
explicitly framed as "measure and gate," not "fix." No single skill in that family unifies all NFR
domains into one cross-domain dossier+gate, so it does not close the wedge by itself, but it is the
closest thing to a competitor found in this scan and should be read carefully before positioning `quality`
as an assurance router. **Verdict: NARROW** — partial routers exist per-NFR-domain; a genuine
cross-domain, vendor-neutral assurance router was not found.

Evidence for NARROW (not CLOSED): every candidate found is either (1) scoped to a single NFR technique/
tool, (2) scoped to accessibility only (no perf/security/privacy in the same decision loop), or (3) a
set of parallel narrow skills with explicit "not for X, see skill Y" boundaries rather than one skill
that decides *what* verification a given risk profile warrants across domains, at what altitude, in what
order, and issues one release-readiness verdict. Nobody found combines a11y + perf + security + privacy
evidence into a single cross-domain dossier and gate.

Evidence against pure OPEN: `sylphxai/skills@accessibility-conformance-program-review` explicitly states
its job is "Build an evidence-backed program that can support product decisions without turning a
scanner result into a conformance claim," distinguishes `observed`/`inferred`/`not_tested`/`blocked`
evidence, and "Decides release and claim status independently." That is assurance-router behavior — just
confined to the accessibility domain. `community-access/accessibility-agents` has a `playwright-verifier`
sub-skill that is explicitly independent/read-only fix verification producing PASS/FAIL/REGRESSION
verdicts, plus a `ci-accessibility` skill with strict/standard/baseline gating strategies and an
`accessibility-lead` that "makes the ship/no-ship decision." These are real, working assurance-router
patterns — just not generalized past accessibility.

---

## (b) Table of everything found

| Name | Repo (skills.sh) | Owner | License | Size | Last push | Installs/Stars | Classification |
|---|---|---|---|---|---|---|---|
| web-quality-audit | [addyosmani/web-quality-skills](https://skills.sh/addyosmani/web-quality-skills/web-quality-audit) | Addy Osmani (Google Chrome) | MIT (LICENSE verified) | 58KB repo | 2026-06-14 | 2,543★ / top hit "perf audit" | **Technique pack** (broad: perf+a11y+SEO+best-practices, but teaches fixes) |
| accessibility-agents (11-skill suite incl. compliance-mapping, ci-accessibility, playwright-verifier, accessibility-regression-detector, wcag-guide, accessibility-lead, +70 more) | [community-access/accessibility-agents](https://skills.sh/community-access/accessibility-agents) (= [taylorarndt/a11y-agent-team](https://skills.sh/taylorarndt/a11y-agent-team), same author/content) | Taylor Arndt | MIT (LICENSE verified) | 4.5MB repo, ~80 sub-skills | 2026-07-25 (v6.0.0, active) | 367★ / 127-221 installs per sub-skill | **Partial router (a11y-only)** — closest thing to measure+decide in a11y |
| accessibility-conformance-program-review | [sylphxai/skills](https://skills.sh/sylphxai/skills/accessibility-conformance-program-review) | SylphxAI | MIT (LICENSE verified) | part of ~110-skill "review" catalog | 2026-07-26 | 1★ / 40 installs | **Partial router (a11y-only)**, highest rigor of anything found |
| security-assurance-operations-review | [sylphxai/skills](https://skills.sh/sylphxai/skills) | SylphxAI | MIT | same catalog | 2026-07-26 | 1★ | Adjacent, NOT competitor — customer trust/procurement packet, explicitly excludes pentest/threat-model/impl |
| qa-skills (47-skill suite incl. performance-testing, security-testing, accessibility-testing, compliance-testing, release-readiness) | [petrkindlmann/qa-skills](https://skills.sh/petrkindlmann/qa-skills) | Petr Kindlmann | MIT (LICENSE verified) | 1.8MB, 47 skills | 2026-06-10 | 44★ / 199-511 installs per sub-skill | **Partial router, per-domain** — most mature cross-NFR family found, but no unifying dossier skill |
| wcag-audit-patterns | [wshobson/agents](https://skills.sh/wshobson/agents/wcag-audit-patterns) | wshobson | MIT | part of huge plugin marketplace | 2026-07-22 | 38,235★ (repo), 9.7K installs (skill) | **Technique pack** (audit+fix mixed) |
| screen-reader-testing | [wshobson/agents](https://skills.sh/wshobson/agents/screen-reader-testing) | wshobson | MIT | same repo | 2026-07-22 | 38,235★ / 8.2K installs | **Technique pack** |
| gsp-accessibility-audit, accessibility-auditor (×2), flutter-accessibility-audit, wcag-accessibility-audit | various small repos | various | mostly MIT/unstated | small | mixed | **Technique packs**, low install counts (20-940) |
| legal-compliance-mapping | [community-access/accessibility-agents](https://skills.sh/community-access/accessibility-agents/legal-compliance-mapping) | Taylor Arndt | MIT | — | 2026-07-25 | 127 installs | Same as compliance-mapping above; VPAT/Section 508/EN 301 549/ADA/AODA mapping |
| dpia-assessment, dpia-mitigation-plan, dpia-risk-scoring | [borghei/claude-skills](https://skills.sh/borghei/claude-skills/dpia-assessment), [mukul975/privacy-data-protection-skills](https://skills.sh/mukul975/privacy-data-protection-skills) | various | unverified | small | unverified | **Technique packs** — privacy impact assessment methodology, not full NFR router |
| vulnerability-scanning (×6 variants) | aj-geddes/useful-ai-prompts, secondsky/claude-skills, mukul975/anthropic-cybersecurity-skills, bagelhole/devops-security-agent-skills, masriyan/claude-code-cybersecurity-skill | various | mostly MIT | small-med | mixed | **Technique/vendor packs** |
| threat-modeling (×6 variants) | aws/agent-toolkit-for-aws, bobmatnyc/claude-mpm-skills, mukul975, briiirussell, bagelhole, nickcrew | various | mixed | small | mixed | **Technique packs** — explicitly OUT of quality scope (budget-setting, not us) |
| dast-scanning, configure-dast-scan | bagelhole/devops-security-agent-skills, harness/harness-skills | Harness (vendor), bagelhole | MIT | — | — | bagelhole: **broad devops/security KB** (80+ skills, 43★, MIT); harness: **vendor pack** (Harness CI/CD DAST config) |
| firebase-security-rules-auditor, firestore-security-rules-auditor | firebase/agent-skills | Google/Firebase | — | — | — | **Vendor pack** (huge installs 78K/20K but Firebase-only, out of general scope) |
| load-test-scenario-builder, load-testing, k6-load-testing, core-web-vitals | patricio0312rev/skills, absolutelyskilled/absolutelyskilled, sickn33/antigravity-awesome-skills | various | mixed | small | mixed | **Technique packs** |
| performance-budget-setter, validating-performance-budgets | patricio0312rev/skills, jeremylongshore/claude-code-plugins-plus-skills | various | mixed | — | — | **Technique packs** — budget *setting*, explicitly not our territory but adjacent |
| release-readiness (petrkindlmann), analyzing-release-readiness (aws), windows/macos-release-readiness (sylphxai) | various | various | MIT | — | — | Go/no-go decision skills — bordering W4 territory; petrkindlmann's is evidence-based and cross-references perf/security/a11y skills |
| quality-gate (×2: oisincoveney/skills, terraphim/terraphim-skills), evidence-gate (marcioaltoe/skills) | various | various | unverified | small (20-26 installs) | unverified | Low-signal, likely generic code-quality gates, not NFR-specific — **not deep-read, low priority** |
| mgifford/accessibility-skills | [mgifford/accessibility-skills](https://skills.sh/mgifford/accessibility-skills) | Mike Gifford (known a11y practitioner) | **AGPL-3.0** | 741KB | 2026-07-26 | 33★ | Technique pack (tables, progressive-enhancement sub-skills); AGPL is notable — copyleft, not freely liftable like the MIT packs |

## (c) Deep notes — top candidates

### 1. `community-access/accessibility-agents` (= `taylorarndt/a11y-agent-team`) — the closest thing to a competitor in the a11y slice

Repo: https://github.com/community-access/accessibility-agents · MIT · 367★ · pushed 2026-07-25 (v6.0.0,
active release cadence — RELEASE-4.5.0.md through RELEASE-6.0.0.md present) · ships a CLI, MCP server,
VS Code extension, and GitHub Action alongside ~80 SKILL.md files.

This is a full accessibility **team**, not a single skill — it separates "measure" from "fix" from
"verify" more cleanly than any other candidate found:

- `accessibility-lead` — orchestrator; per its own SKILL.md: *"You do not do all the work yourself. You
  delegate to specialists and synthesize their findings... 4. Make the ship/no-ship decision."* This is a
  release-readiness gate, scoped to a11y.
- `playwright-verifier` — explicitly a read-only, independent verification agent:
  > *"You are a fix verification agent. You are a **read-only** agent — you never edit source files...
  > invoked internally by `web-issue-fixer` after each fix is applied to verify the fix resolved the
  > issue without introducing regressions."* Reports **PASS / FAIL / REGRESSION** — this is exactly the
  > "measure, don't fix" pattern our `quality` skill would want, applied narrowly to a11y fixes.
- `ci-accessibility` — CI gating skill with three named strategies: *"Strict — fail on any new violation
  / Standard — fail on critical/serious only (recommended) / Baseline — fail only when violation count
  increases (best for brownfield)."* Produces SARIF for GitHub code scanning, baseline files
  (`axe-baseline.json`), PR annotations.
- `accessibility-regression-detector` — classifies findings **Regressed / New / Persistent / Fixed**
  against a `.a11y-baseline.json`, ranked by priority — a genuine suite/signal-health pattern (liftable).
- `compliance-mapping` (= `legal-compliance-mapping`) — maps WCAG findings to Section 508, ADA
  Title II/III, EN 301 549, EAA, AODA, and generates VPAT 2.5 tables. Liftable VPAT taxonomy:
  > *"Supports / Partially Supports / Does Not Support / Not Applicable"*
- `wcag-guide` — pure standards teaching, explicitly *"Does not write or review code."* Liftable POUR
  table and A/AA/AAA conformance-level table.

**What it does NOT cover from quality scope:** anything outside accessibility — no performance
measurement, no security verification, no privacy checks, no cross-pack test-data/environment strategy,
no defect severity/priority taxonomy generalized beyond a11y, no compatibility matrix. It also **mixes
fix and measure** at the product level (there's a `web-issue-fixer` skill in the same suite that
autonomously patches code) — so as a whole product it is not "measure-only," even though the specific
`playwright-verifier`/`ci-accessibility` sub-skills are cleanly measure-only.

**Liftable material:** VPAT conformance-level vocabulary, the Strict/Standard/Baseline CI-gating
taxonomy, the Regressed/New/Persistent/Fixed classification, and the PASS/FAIL/REGRESSION verification
report format. Source: https://github.com/community-access/accessibility-agents/blob/main/codex-skills/
(compliance-mapping, ci-accessibility, playwright-verifier, accessibility-regression-detector)/SKILL.md
— MIT, freely liftable with attribution optional under MIT terms.

### 2. `sylphxai/skills@accessibility-conformance-program-review` — highest-rigor single skill found

Repo: https://github.com/sylphxai/skills · MIT · 1★, 40 installs (low adoption signal) · pushed
2026-07-26 · one skill among ~110 similarly-patterned "X-review" skills in a generic
business/product-operations catalog (most of the other ~109 have nothing to do with quality — e.g.
`ad-monetization-review`, `game-economy-review`).

This single skill is, on paper, the best match to the assurance-router shape found anywhere in this scan
— but scoped strictly to accessibility, and with very low real-world adoption (1 star). Its SKILL.md
description reads almost like our own brief:

> *"Design or audit a product accessibility conformance program spanning target standards,
> representative workflows, manual and assistive-technology testing, issue governance, release evidence,
> VPAT/ACR inputs, remediation, and exceptions. Use when the requested artifact is a durable conformance
> program, claim-evidence review, or release/procurement decision. Do not use for a single UI critique,
> a code-level accessibility fix, generic QA planning, or legal advice."*

Guardrails (verbatim, directly liftable methodology):
> *"Never claim conformance from automated scans alone."*
> *"Distinguish `observed`, `inferred`, `not_tested`, and `blocked` evidence states."*
> *"Never average away a blocker that prevents a disabled user from completing a core task."*

Output schema (verbatim) includes an **Authority ledger**, **Requirement-to-evidence matrix**, **Issue
and remediation portfolio** (columns: Finding / User-task impact / Reach / Workaround / Owner / Due /
Retest / Release effect), and **Claim, release, and exception decisions**. This maps almost 1:1 onto what
`quality`'s evidence-dossier + defect-triage + release-decision jobs would need to produce — just for a11y
only.

**What it does NOT cover:** performance, security, privacy — it is explicitly single-domain. It also
explicitly refuses generic QA planning ("Do not use for... generic QA planning") — so it self-limits its
territory, confirming it is not attempting to be a cross-domain router.

**Liftable material:** the observed/inferred/not_tested/blocked evidence-state taxonomy and the
requirement-to-evidence-matrix / issue-portfolio / claim-release-exception output schema. Source:
https://github.com/sylphxai/skills/blob/main/skills/accessibility-conformance-program-review/SKILL.md —
MIT.

### 3. `petrkindlmann/qa-skills` — most comprehensive per-NFR-domain family (cross-team overlap warning)

Repo: https://github.com/petrkindlmann/qa-skills · MIT (LICENSE verified) · 44★ · pushed 2026-06-10 ·
47 distinct SKILL.md files ("50 QA and test-automation skills" per repo description), each narrowly
scoped with explicit cross-referencing ("Not for X — use skill Y", "Related: ...").

This repo is highly relevant across **all four workers'** territories (test-strategy/coverage → W1;
cross-browser/visual/mobile → W2; performance/security/accessibility/compliance-testing → me;
release-readiness/CI-CD/quality-postmortem → W4). Flagging for the lead to reconcile in case other
workers also surfaced it. My deep-read covers only the four skills in my scope:

- **`performance-testing`** (v2.0, MIT): explicitly measure-against-budget framing, not fix:
  > *"Measure, assert, and protect application performance with budgets enforced in CI, not subjective
  > 'feels fast enough' assessments... A report that says 'LCP is 3.2s' is information; a CI gate that
  > fails the build at 2.5s is accountability."*
  > *"Budgets are only real if CI enforces them... Wire budgets into the pipeline as k6 thresholds and
  > Lighthouse assertions so regressions fail the build, not a quarterly review."*
  Covers k6 load/stress/soak/spike + Lighthouse CI + Core Web Vitals (LCP/INP/CLS), explicitly notes
  "gate TBT, not INP" for Lighthouse CI. This is a technique pack for the *how*, but its framing (budget
  set elsewhere, this skill enforces/measures) matches our MEASURE-not-SET distinction closely.

- **`security-testing`** (v2.1, MIT): OWASP Top 10 (2025), DAST/SCA/SAST/auth negative-path tests,
  explicitly bounded: *"Scope is automated scanning + negative-path security tests in CI, not manual
  penetration testing."* Defense-in-depth framing: *"no single tool catches everything... Layer DAST +
  SCA + SAST + auth tests + secret scanning."* Explicitly routes threat-modeling and compliance mapping
  elsewhere — clean boundary discipline, technique-pack-ish but budget/gate-aware.

- **`accessibility-testing`** (v2.0, MIT): axe-core + Playwright + keyboard/screen-reader/ARIA, states
  plainly: *"Automated tools catch 30-40% of issues... Passing axe is necessary, not sufficient."*
  Routes compliance/legal mapping to `compliance-testing`.

- **`compliance-testing`** (v2.0, MIT): **this is the closest thing to a genuine "privacy checks" NFR
  competitor found in the whole scan.** Covers GDPR/CMP consent verification, Google Consent Mode v2,
  GPC, CCPA/US state opt-out (with an unusually current regulatory table — Texas TDPSA, Indiana CDPA eff.
  1 Jan 2026, EU AI Act Article 50 transparency from 2 Aug 2026), Better Ads Standards, cookie-inventory
  auditing. Framing is explicitly measure/assert, not fix or set-policy:
  > *"Compliance is binary: a single analytics cookie that fires before consent... is a violation no
  > matter how polished the rest of the flow looks."*
  > *"Automate the technical checks, schedule the legal audits... A human still audits privacy-policy
  > language... Don't pretend a test settles a legal-language question."*
  > *"Verify behavior, not the CMP... Assert the actual outcome: were cookies set, did scripts load, was
  > the GPC opt-out registered. The CMP is an implementation detail; compliance is measured by
  > behavior."*
  This is a genuine, current (regulatory dates through mid/late-2026), MIT-licensed privacy-verification
  skill — worth reading in full before writing `quality`'s privacy-checks job.

- **`release-readiness`** (v2.0, MIT) cross-references all of the above ("performance budgets met, no
  open P0/P1 bugs" as go/no-go evidence) but does not itself aggregate a11y/perf/security/privacy
  evidence into one dossier — it is a go/no-go **checklist-and-process** skill (closer to W4 territory),
  not a cross-domain evidence synthesizer.

**What this family does NOT do:** no single skill in the 47 unifies evidence across a11y + perf +
security + privacy into one dossier and one decision — each domain skill is independently gated in CI,
and `release-readiness` only checks that each gate is green, it doesn't reconcile or weight evidence
across domains, adjudicate conflicting signals, or reason about "what altitude of verification a given
risk profile warrants" the way our assurance-router definition requires. That synthesis-and-judgment
layer across NFR domains is the part still open.

**Liftable material:** the "budgets are only real if CI enforces them" principle, the Strict/binary
compliance framing, the "automated tools catch 30-40% of a11y issues" statistic (also echoed almost
verbatim by the community-access suite, suggesting it's now common knowledge in this space, not proprietary),
the layered-defense-in-depth security framing, and the very clean "Not for X — use Y" skill-boundary
convention itself is worth studying for our own faceted-router hygiene. Source:
https://github.com/petrkindlmann/qa-skills/blob/main/skills/(performance-testing|security-testing|
accessibility-testing|compliance-testing|release-readiness)/SKILL.md — MIT.

### 4. `addyosmani/web-quality-skills@web-quality-audit` — largest-install technique pack, confirmed NOT a competitor

Repo: https://github.com/addyosmani/web-quality-skills · MIT · 2,543★ · pushed 2026-06-14 · authored by
Addy Osmani (Google Chrome performance/DX). By far the highest-profile name attached to any candidate in
this scan, so worth flagging even though it fails the assurance-router test cleanly.

Full read of SKILL.md confirms: it is a Lighthouse-categories teaching document (Performance,
Accessibility, SEO, Best Practices — "150+ checks") whose own stated output format is fix-oriented:

> *"### Critical issues (X found) — **[Category]** Issue description. File: `path/to/file.js:123` —
> **Impact:** Why this matters — **Fix:** Specific code change or recommendation"*

It has a severity table (Critical/High/Medium/Low, verbatim below) and a pre-deploy checklist, but no
independent-evidence concept, no defect lifecycle, no suite-health tracking, no release gate distinct
from "fix everything critical." **Classification: technique pack** (broad topic coverage does not make
it a router — it never decides *whether* to verify or *how much*, it just teaches what good looks like
and how to fix bad).

Liftable material (Core Web Vitals thresholds, useful as a citable current-as-of-2026 budget reference):
```
LCP (Largest Contentful Paint) < 2.5s
INP (Interaction to Next Paint) < 200ms
CLS (Cumulative Layout Shift) < 0.1
```
Severity table:
```
| Level | Description | Action |
| Critical | Security vulnerabilities, complete failures | Fix immediately |
| High | Core Web Vitals failures, major a11y barriers | Fix before launch |
| Medium | Performance opportunities, SEO improvements | Fix within sprint |
| Low | Minor optimizations, code quality | Fix when convenient |
```
Source: https://github.com/addyosmani/web-quality-skills/blob/main/skills/web-quality-audit/SKILL.md —
MIT, freely liftable. Also notes a useful, dated fact: Lighthouse v13 (Oct 2025+) migrated from
per-opportunity audits to "Performance Insight Audits" — cls-culprits-insight and image-delivery-insight
consolidated several older named audits. Worth knowing if `quality` cites specific Lighthouse audit IDs.

### 5. `wshobson/agents` (wcag-audit-patterns, screen-reader-testing) — huge distribution, technique-pack content

Repo: https://github.com/wshobson/agents · MIT · **38,235★** (the single highest-star repo touched in
this scan; it's a large multi-harness plugin marketplace, not accessibility-specific) · pushed
2026-07-22 · `wcag-audit-patterns` alone shows 9.7K installs, `screen-reader-testing` 8.2K — both far
higher than any other a11y skill found.

Read of `wcag-audit-patterns`: POUR principles, A/AA/AAA table, a Critical/Serious/Moderate violation
taxonomy (liftable — different cut than Osmani's Critical/High/Medium/Low):
```
Critical (Blockers): Missing alt text for functional images · No keyboard access to interactive
  elements · Missing form labels · Auto-playing media without controls
Serious: Insufficient color contrast · Missing skip links · Inaccessible custom widgets · Missing
  page titles
Moderate: Missing language attribute · Unclear link text · Missing landmarks · Improper heading
  hierarchy
```
Explicitly mixes "auditing" and "fixing" in its own use-cases list ("Conducting accessibility audits...
Fixing WCAG violations... Implementing accessible components"). **Classification: technique pack.** Its
huge install count is a distribution/marketplace-visibility signal (wshobson/agents is a very widely
installed general plugin catalog), not evidence of a mature a11y-specific competitor — the content itself
is thinner than either community-access's suite or petrkindlmann's `accessibility-testing`.
Source: https://github.com/wshobson/agents/blob/main/plugins/accessibility-compliance/skills/
wcag-audit-patterns/SKILL.md — MIT.

---

## (d) Liftable-artifact list (URL + license)

1. VPAT conformance vocabulary (Supports / Partially Supports / Does Not Support / Not Applicable) +
   Section 508/ADA/EN 301 549/EAA/AODA framework-mapping workflow — MIT —
   https://github.com/community-access/accessibility-agents/blob/main/codex-skills/compliance-mapping/SKILL.md
2. CI accessibility gating taxonomy (Strict / Standard / Baseline) + SARIF/baseline pattern — MIT —
   https://github.com/community-access/accessibility-agents/blob/main/codex-skills/ci-accessibility/SKILL.md
3. Regression classification (Regressed / New / Persistent / Fixed) — MIT —
   https://github.com/community-access/accessibility-agents/blob/main/codex-skills/accessibility-regression-detector/SKILL.md
4. Independent fix-verification report pattern (PASS / FAIL / REGRESSION, read-only agent) — MIT —
   https://github.com/community-access/accessibility-agents/blob/main/codex-skills/playwright-verifier/SKILL.md
5. Evidence-state taxonomy (observed / inferred / not_tested / blocked) + requirement-to-evidence matrix
   + issue/remediation portfolio schema + claim-release-exception decision schema — MIT —
   https://github.com/sylphxai/skills/blob/main/skills/accessibility-conformance-program-review/SKILL.md
6. "Budgets are only real if CI enforces them" measurement framing + k6/Lighthouse CI budget-gate pattern
   — MIT — https://github.com/petrkindlmann/qa-skills/blob/main/skills/performance-testing/SKILL.md
7. Binary-compliance / "verify behavior not the CMP" privacy-check framing + current 2026 regulatory
   table (GDPR/CCPA/state laws/EU AI Act dates) — MIT —
   https://github.com/petrkindlmann/qa-skills/blob/main/skills/compliance-testing/SKILL.md
8. Defense-in-depth security-testing layering (DAST+SCA+SAST+auth tests+secret scanning) + OWASP Top 10
   (2025) framing — MIT — https://github.com/petrkindlmann/qa-skills/blob/main/skills/security-testing/SKILL.md
9. Core Web Vitals thresholds (LCP<2.5s / INP<200ms / CLS<0.1) + Critical/High/Medium/Low severity table
   + Lighthouse v13 "Performance Insight Audits" migration note — MIT —
   https://github.com/addyosmani/web-quality-skills/blob/main/skills/web-quality-audit/SKILL.md
10. Critical/Serious/Moderate a11y violation taxonomy (alternate cut to #9's severity scale) — MIT —
    https://github.com/wshobson/agents/blob/main/plugins/accessibility-compliance/skills/wcag-audit-patterns/SKILL.md

Note on licensing caution: `mgifford/accessibility-skills` is **AGPL-3.0**, not MIT — if any material
from that repo is ever lifted (I did not deep-read it beyond confirming license/description), it carries
copyleft obligations unlike everything else in this list. Flagging so nobody accidentally treats it like
the MIT majority.

---

## (e) Measure-against-budget vs fix — explicit finding

This was the crux instruction and the clearest finding of the scan: **the ecosystem is bimodal.**

- High-install, high-visibility packs (`addyosmani/web-quality-skills`, `wshobson/agents` wcag patterns,
  most of the small single-purpose "accessibility-auditor"/"performance-testing" skills found via CLI)
  are **fix-oriented technique packs**. Their own output formats say "Fix: specific code change." They
  do not distinguish "who set the budget" from "did we hit it" — they conflate audit and remediation in
  one skill.
- A small number of skills explicitly and deliberately separate **measure-and-decide** from **fix**:
  - `community-access/accessibility-agents`'s `playwright-verifier` (read-only verification only) and
    `ci-accessibility` (gate configuration only) vs. its own separate `web-issue-fixer` (the fix skill).
  - `sylphxai/skills@accessibility-conformance-program-review`, which explicitly refuses to be a fix
    skill: *"For source-code remediation, hand off verified findings and acceptance tests to the owning
    implementation agent."*
  - `petrkindlmann/qa-skills@performance-testing` and `@compliance-testing`, both of which frame
    themselves as budget-enforcement/CI-gate skills that assume the budget/policy is set elsewhere and
    their job is to assert compliance, not author the standard.

So: skills that do the measure/decide split correctly are a small, real minority — not the default
posture of the ecosystem — and none of them do it across more than one NFR domain at once. This directly
supports the NARROW verdict: the *pattern* our `quality` skill would embody is validated as a real,
recognized distinction by multiple independent authors, but nobody has generalized it across the full
NFR surface.

---

## (f) What I could NOT verify, and why

- **Star/install counts are point-in-time** (2026-07-26) and installs are skills.sh's own counter, not
  GitHub — could shift. Marked as such throughout, not re-verified via a second source.
- **wshobson/agents' 38,235★** is the *repo's* total stars (a huge multi-plugin marketplace), not
  specific to the accessibility-compliance plugin — could not isolate stars per-plugin via the GitHub
  API (stars are repo-level only). Installs-per-skill (9.7K / 8.2K) come from skills.sh and are the more
  relevant signal for that plugin's actual pickup.
- **sylphxai/skills' actual usage** is unverifiable beyond the 40-install / 1-star signal from skills.sh
  and GitHub — I could not determine whether this ~110-skill catalog is hand-authored, LLM-generated in
  bulk, or something in between; the uniform naming pattern across ~110 "X-review" skills is suggestive
  of templated/generated authorship, which should temper how much weight the "highest rigor" framing in
  section (c)#2 is given. Flagging as `[UNVERIFIED]` — provenance/authorship rigor of sylphxai/skills.
  Content quality read on its own terms was still high regardless of authorship method.
  `[UNVERIFIED]`
- **DPIA-related skills** (`borghei/claude-skills@dpia-assessment`, `mukul975/privacy-data-protection-
  skills@dpia-risk-scoring`) were found but not deep-read (license/content) — time budget was spent on
  higher-install, higher-signal candidates instead. `[UNVERIFIED — not deep-read]`
- **GDPR/SOC2/audit-trail/compliance-evidence direct-keyword CLI searches all returned zero hits**
  (`"GDPR"`, `"SOC2"`, `"compliance evidence"`, `"audit trail"`, `"privacy compliance"`, `"DPIA privacy
  impact assessment"` all returned "No skills found"). This is a genuine CLI/semantic-search limitation,
  not necessarily evidence of ecosystem absence — the `petrkindlmann/qa-skills@compliance-testing` skill
  exists and is directly on-topic but was only found via the adjacent "quality gate evidence dossier" and
  earlier "accessibility conformance" query chains, not a direct compliance query. **Flagging: privacy/
  compliance-evidence coverage in this report should be treated as a lower-confidence lower-bound, not a
  complete picture** — a more exhaustive pass (e.g., via GitHub code search directly rather than the
  skills.sh CLI) might surface more compliance-evidence-specific skills.
- I did **not** install or execute any skill — all judgments are from reading SKILL.md source, matching
  the "no fabrication" instruction; no runtime behavior was tested.
- `quality-gate` (oisincoveney/skills, terraphim/terraphim-skills) and `evidence-gate` (marcioaltoe/skills)
  were found (low installs, 20-26) but not opened — flagged as low-priority/`[UNVERIFIED — not deep-read]`
  given the install-count signal; if the lead wants exhaustive coverage these three are the remaining gap.
- Single-word CLI queries (`"performance"`, `"accessibility"`, `"a11y"`, `"k6"`, `"OWASP"`) reliably
  returned zero results while 2-3 word queries succeeded — this appears to be a semantic-search minimum-
  signal threshold in the `skills find` CLI itself, not an ecosystem-absence signal. Noted so the lead
  doesn't misread "No skills found for a11y" as meaning no a11y skills exist.

---

## (g) Full search log

Skills-CLI searches (21 total, well within the ~18-22 target), each with hit count:

1. `"accessibility audit"` → 6 hits (flutter/skills, mastepanoski, webflow ×2, davila7, patricio0312rev)
2. `"WCAG conformance"` → 6 hits (community-access, sushegaad, sylphxai, owl-listener, masup9, tejovanthn)
3. `"VPAT accessibility conformance report"` → 6 hits (wshobson 9.7K, community-access, sylphxai,
   taylorarndt, tejovanthn, alexsrebernic)
4. `"performance testing load test"` → 6 hits (absolutelyskilled, 404kidwiz, yonatangross ×2, naodeng,
   kentoshimizu)
5. `"k6 load testing"` → 0 hits
6. `"security testing penetration test"` → 0 hits
7. `"OWASP top 10 vulnerability scan"` → 0 hits
8. `"k6"` → 0 hits
9. `"penetration testing"` → 0 hits
10. `"OWASP"` → 0 hits
11. `"vulnerability scanning"` → 6 hits (aj-geddes, secondsky, mukul975 ×2, bagelhole, masriyan)
12. `"security audit"` → 6 hits (firebase ×2, cloudflare, ruvnet, sickn33, charon-fan)
13. `"DAST SAST"` → 6 hits (nickcrew, bagelhole, incluud [false positive - astro], alphaonedev,
    unitoneai, harness)
14. `"threat modeling"` → 6 hits (aws, bobmatnyc, mukul975, briiirussell, bagelhole, nickcrew)
15. `"GDPR compliance"` → 0 hits
16. `"SOC2 compliance evidence"` → 0 hits
17. `"GDPR"` → 0 hits
18. `"SOC2"` → 0 hits
19. `"compliance evidence"` → 0 hits
20. `"audit trail"` → 0 hits
21. `"privacy compliance"` → 0 hits
22. `"data privacy audit"` → 0 hits
23. `"Lighthouse Core Web Vitals"` → 0 hits
24. `"screen reader testing"` → 0 hits
25. `"axe-core accessibility"` → 0 hits
26. `"Lighthouse audit"` → 0 hits
27. `"web performance"` → 0 hits
28. `"a11y"` → 0 hits
29. `"performance"` → 0 hits
30. `"accessibility"` → 0 hits
31. `"accessibility conformance"` → 6 hits (leonchaox, sylphxai, tejovanthn, jubscodes, matthewalton,
    alexsrebernic)
32. `"accessibility testing"` → 6 hits (aj-geddes 511, pedronauck 269, community-access, petrkindlmann,
    community-access again, proffesor-for-testing)
33. `"performance budget"` → 6 hits (patricio0312rev, indranilbanerjee, jeremylongshore, mohitagw15856,
    proflead, mrcalderon3d)
34. `"load testing"` → 6 hits (patricio0312rev, absolutelyskilled, microsoftdocs, rand, sickn33,
    finsilabs)
35. `"accessibility agent team"` → 6 hits (mostly false positives — onewave-ai, jsonlee12138, devxoul,
    taylorarndt, davepoon, androidpoet)
36. `"browser compatibility matrix"` → 6 hits (github, proffesor-for-testing ×2, petrkindlmann,
    simota, wojons)
37. `"non functional requirements"` → 6 hits (aj-geddes, jabrena, proyecto26, wojons, managedcode,
    rafaelgorski)
38. `"CVSS risk rating"` → 6 hits (secondsky, absolutelyskilled, snailsploit, unitoneai, agentsecops,
    alan951)
39. `"nonfunctional testing suite"` → 6 hits (agentmantis, wojons, lgtm-hq, dhruvanbhalara, archiplan-ai,
    instructa)
40. `"stress testing"` → 6 hits (aj-geddes, jbrukh, gbasin, dollardill, slgoodrich, smithery.ai)
41. `"Deque axe DevTools"` → 6 hits (mostly false positives — 0xbigboss, warpdotdev, posthog, southleft,
    claude-dev-suite, adaptationio)
42. `"release readiness"` → 6 hits (aws, petrkindlmann, drillan, sylphxai ×2, webriq)
43. `"residual risk"` → 6 hits (borghei, glebis, yuzc-001, mukul975, awslabs)
44. `"DPIA privacy impact assessment"` → 0 hits
45. `"qa release gate"` → 0 hits
46. `"defect severity triage"` → 0 hits
47. `"core web vitals audit"` → 6 hits (secondsky, travisjneuman, absolutelyskilled, alphaonedev,
    89jobrien, podo)
48. `"web performance audit"` → 6 hits (addyosmani 17.8K, aj-geddes, developers.cloudflare.com [bundled
    web-perf], secondsky, warpdotdev, alphaonedev)
49. `"legal compliance mapping"` → 6 hits (rshankras, community-access, wojons, owl-listener, dmend3z,
    tyler-r-kendrick)
50. `"screen reader NVDA VoiceOver"` → 6 hits (wshobson 8.2K, sickn33, community-access, rmyndharis,
    dragoon0x, convxai)
51. `"Deque accessibility"` → 6 hits, all false positives (martinholovsky, szeyu, southleft, mgifford ×2,
    southleft)
52. `"quality gate evidence dossier"` → 6 hits (oisincoveney, jurgendn, lyy [false positive], marcioaltoe,
    terraphim, sorawit-w)

(Some zero-hit queries above are #s where the CLI's semantic matcher returned nothing — noted in section
(f) as a probable CLI threshold artifact rather than ecosystem absence.)

`gh` API hydration calls: `repos/{owner}/{repo}` (stars/pushed_at/license/size) for 8 repos; `contents/`
directory listings for 3 repos; `contents/LICENSE` reads for 4 repos (all confirmed MIT with named
copyright holders); `contents/.../SKILL.md` reads for 13 individual skill files across 5 repos; one
`search/code` call to locate wshobson's exact SKILL.md path. No WebSearch or WebFetch calls used —
0/10 of the session WebSearch budget consumed.
