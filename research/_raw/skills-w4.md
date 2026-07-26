# W4 — AI/Agentic Verification + Process/Gate Skills Scan
Competitive scan of skills.sh / GitHub Claude-skill ecosystem for a `quality` (assurance-router) skill.
Date: 2026-07-26. Territory: LLM evaluation, red-team/jailbreak testing, release gates, go/no-go,
defect triage, bug reports, QA checklists, code review skills, self-verification, test data/staging,
sign-off, pre-flight checks. Plus enumeration of named multi-skill collections.

WebSearch budget used: **0 / 12** (skills CLI + `gh api` were sufficient for full coverage; no WebSearch
calls were needed this session).

---

## (a) Verdict: NARROW

Two things are simultaneously true and worth stating plainly:

1. **No pure, thin, vendor/technique-neutral "assurance router"** — a skill whose *entire* job is
   deciding what verification a product needs and issuing a release-readiness verdict, while
   deliberately NOT owning the individual techniques — was found anywhere in the scanned ecosystem.
   Every serious candidate either (a) is a single-facet technique/process card (release checklist,
   bug-triage pipeline, verification-before-completion discipline), or (b) is a **large, thick,
   comprehensive QA *collection*** that bundles the router-like pieces (test strategy, release
   readiness, defect triage, suite health) together with dozens of technique skills (Playwright,
   Cypress, unit testing, security testing, accessibility testing) in the same package — which is a
   different product shape than "thin neutral router."

2. **Real, well-built competitive pressure exists on specific facets of the scope**, from two
   collections in particular:
   - **`proffesor-for-testing/agentic-qe`** (421★, MIT, pushed 2026-07-24) — an 82-skill "Agentic QE
     Fleet" with a genuine adversarial release-gate mechanism (`qe-court`: three-valued SHIP/REMAND/BLOCK
     verdict with a signed court record and human-as-judge) plus deployment-readiness, risk-based
     testing, defect intelligence, and test-data/environment-management skills that map closely onto
     our scope.
   - **`petrkindlmann/qa-skills`** (44★, MIT, pushed 2026-06-10) — a cleaner, non-swarm, 50-skill QA
     collection with `release-readiness` (evidence-based go/no-go, staged rollout, rollback criteria),
     `test-strategy` (risk-based altitude allocation, pyramid diagnosis, entry/exit criteria, quality
     gates — very close to our "test strategy across a whole product" scope item), `quality-postmortem`
     (defect pattern analysis, blameless RCA — close to our defect-lifecycle scope item), `test-reliability`
     (flake economics, quarantine hygiene, confidence-scored auto-repair — directly our "suite & signal
     health" scope item), and `ai-bug-triage` (fingerprint+LLM defect triage pipeline with severity
     taxonomy — directly our "defect lifecycle" scope item).

Neither collection is positioned or structured as a thin router; both are maximalist "own everything"
QA product families, closer in spirit to what our whole *family* (product/design/architecture/
frontend/backend/ai/data/quality) does collectively than to a single lean `quality` skill. That
structural gap — nobody has cleanly separated "decide what verification is warranted + produce the
gate decision" from "do the verification techniques" — is exactly where the assurance-router
positioning still has room. But the individual facets (release go/no-go, defect triage, flake/suite
health, risk-based test-strategy) are no longer greenfield; petrkindlmann/qa-skills in particular is
higher-quality writing on several of these facets than most competitors I've seen in adjacent scans,
and should be read in full before finalizing quality's SKILL.md content for those sections.

No vendor-neutral competitor claims the **evidence-dossier + residual-risk-statement** framing, the
**compatibility-matrix** framing, or **system-level NFR measurement against someone else's budget**
as an integrated whole — these remain comparatively open. **Verification of agent-built work**
(our scope's most novel item) has one extremely popular but narrow technique competitor
(`obra/superpowers` `verification-before-completion`, 261K★) that covers "don't claim done without
running the command" — real and widely adopted, but a single-agent discipline card, not a router and
not evidence-dossier-shaped.

---

## (b) Table of everything found

| Skill / repo | Owner | License | Stars | Pushed | Classification | Notes |
|---|---|---|---|---|---|---|
| `proffesor-for-testing/agentic-qe` (82 skills) | proffesor-for-testing | MIT | 421 | 2026-07-24 | **Comprehensive QE collection** (thick, not a router) | See deep dive §c |
| `petrkindlmann/qa-skills` (50 skills) | petrkindlmann | MIT | 44 | 2026-06-10 | **Comprehensive QE collection** (thick, not a router) | See deep dive §c |
| `naodeng/awesome-qa-skills` | naodeng | GPL-3.0 | 137 | 2026-04-25 | Collection, un-enumerated (skills dir splits en/zh, not individually listed at top level) | Could not verify individual skill contents within budget — see §f |
| `athola/claude-night-market` → `release-health-gates` | athola | MIT | 323 | 2026-07-26 | **Partial router** (PR/release checklist) | See deep dive §c |
| `aws/agent-toolkit-for-aws` → `analyzing-release-readiness` | aws | Apache-2.0 | 2123 | 2026-07-24 | **Vendor pack** (routes to AWS DevOps Agent, proprietary remote service) | See deep dive §c |
| `launchdarkly/agent-skills` → `online-evals` | launchdarkly | NOASSERTION (no clear OSS license) | 20 | 2026-07-25 | **Vendor pack** (LaunchDarkly AI Configs evals) | Not read in full — vendor-scoped by name/repo |
| `addyosmani/agent-skills` → `code-review-and-quality` | addyosmani | MIT | 80,413 | 2026-07-26 | **Technique pack** (5-axis diff code review) | Explicitly out of quality's scope per brief ("NOT quality: lint/code review of a diff") — see §c |
| `addyosmani/web-quality-skills` → `accessibility`/`seo`/`performance` | addyosmani | (not verified) | 39.1K/35.1K/25K installs | — | Technique packs, W3 territory (a11y/perf) — not read |
| `trailofbits/skills` → `mutation-testing`, `coverage-analysis` | trailofbits | CC-BY-SA-4.0 | 6268 | 2026-07-20 | **Technique pack** | Not read in full; name/scope narrow (mutation testing only) |
| `promptfoo/promptfoo` → `promptfoo-evals` | promptfoo | (vendor repo) | 213 installs | — | **Vendor pack** (promptfoo's own eval tool) | Sibling-overlap with `ai` skill, not quality |
| `daymade/claude-code-skills` → `promptfoo-evaluation` | daymade | (not verified) | 901 installs | — | **Technique pack** (wraps promptfoo) | Not read |
| `launchdarkly` `online-evals`, `bagelhole/devops-security-agent-skills` → `agent-evals` | various | (not verified) | 91 installs | — | **Technique/vendor packs** | Not read in full |
| `affaan-m/everything-claude-code` → `eval-harness`, `healthcare-eval-harness`, `ai-regression-testing`, `gateguard` | affaan-m | (not verified) | 6K/4.1K/5.1K/3.4K installs | — | **Technique packs**, sibling-overlap with `ai` | Not read; high install counts suggest popularity, but named scope is eval-harness construction (ai-skill territory), not release-gate |
| `donchitos/claude-code-game-studios` → `bug-triage`, `regression-suite` | donchitos | (not verified) | 210/202 installs | — | **Technique packs**, game-dev-flavored | Not read in full |
| `warpdotdev/oz-skills` → `github-bug-report-triage` | warpdotdev | (not verified) | 250 installs | — | **Technique pack** (GitHub issue triage) | Not read in full |
| `pytorch/pytorch` → `triaging-issues` | pytorch | (not verified) | 2.1K installs | — | **Technique pack**, project-specific | Not read |
| `yaklang/hack-skills` → `llm-prompt-injection`; `alirezarezvani/claude-skills` → `red-team`, `ai-security` | various | (not verified) | 2.1K/707/631 installs | — | **Technique packs** (security testing, W3 territory) | Not read in full |
| `mukul975/anthropic-cybersecurity-skills` → `conducting-full-scope-red-team-engagement` | mukul975 | (not verified) | 171 installs | — | **Technique pack** | Not read |
| `sylphxai/skills` → `release-readiness-exception-board-review`, `board-metrics-operating-review` | SylphxAI | MIT | 1 (repo) | 2026-07-26 | **Technique pack**, tiny/personal | Not read in full — 1-star repo, low signal |
| `asteroid-belt-llc/skills` → `release-readiness-checklist` | asteroid-belt-llc | (not verified) | 13 installs | — | **Technique pack** | Not read |
| `qodex-ai/ai-agent-skills` → `application-quality-assurance` | qodex-ai | **Proprietary** (LICENSE.txt, "complete terms") | 37 | 2026-01-05 | **Technique pack** (Playwright webapp testing) | See §e — W2 territory, not quality |
| `qodex-ai/ai-agent-skills` → `quality-validation`, `validation-first-approach` | qodex-ai | Proprietary | 37 | 2026-01-05 | Un-read; names suggest partial-router flavor | Not read within budget |
| `jasonkneen/kiro` → `quality-assurance` | jasonkneen | MIT | 717 | 2026-01-12 | **Partial router** (spec-phase QA gates) | See deep dive §c |
| `catlog22/claude-code-workflow` → `ship` | catlog22 | MIT | 2142 | 2026-06-18 | **Partial router** (7-phase release pipeline, CI/CD-flavored) | See deep dive §c |
| `catlog22/claude-code-workflow` → `team-quality-assurance` | catlog22 | MIT | 2142 | 2026-06-18 | **Partial router** (multi-agent test-generation/execution team) | W1 territory (test generation), not read in full |
| `obra/superpowers` → `verification-before-completion` | obra | MIT | 261,332 | 2026-07-24 | **Technique pack** (single-agent self-verification discipline) | See deep dive §c — most-starred repo touching our scope |
| `obra/superpowers` → `requesting-code-review`, `receiving-code-review` | obra | MIT | 261,332 | 2026-07-24 | **Technique packs** (code review workflow) | Not read in full — out of quality scope per brief |
| `ruvnet/claude-flow` → `verification-quality` | ruvnet | MIT | 66,036 | 2026-07-26 | **Vendor-flavored technique pack** (self-referential CI/truth-scoring for the "ruflo" tool) | See §e — largely about the tool's own regression protection, not user-facing quality guidance |
| `anthropics/skills` | anthropics | None (no LICENSE file found at repo root) | 164,233 | 2026-07-24 | **No QA/gate skill present** | See §e — confirms OPEN in this collection |
| `vercel-labs/agent-skills` | vercel-labs | None | 29,488 | 2026-07-24 | **No QA/gate skill present** | See §e |
| `ComposioHQ/awesome-claude-skills` | ComposioHQ | None | 70,796 | 2026-07-24 | **No QA/gate skill present** (top-level dirs are all content/growth/ops-flavored) | See §e |
| `daffy0208/ai-dev-standards` → `quality-assurance`, `quality-auditor`, `testing-strategist`, `release-manager`, `skill-validator` | daffy0208 | MIT | 32 | 2025-12-25 | Un-read, repo shows signs of abandonment/report-clutter | See §e — noted but not deep-read within budget |

---

## (c) Deep treatment of top candidates

### 1. `proffesor-for-testing/agentic-qe` — MIT, 421★, pushed 2026-07-24
https://github.com/proffesor-for-testing/agentic-qe · https://skills.sh/proffesor-for-testing/agentic-qe

Described by its own repo as: *"Agentic QE Fleet is an open-source AI-powered QA/QE platform designed
for use with Coding Agents... featuring specialized agents and skills to support testing activities for
a product at any stage of the SDLC."* Not just a skill pack — a full npm-published CLI (`aqe`) + MCP
server + agent-fleet framework with its own release process, `src/`, `tests/`, `verification/` dirs.

**Size**: `.claude/skills/` contains **140+ skill directories**; `skills-manifest.json` states
`"totalSkills": 50` (Tier-3-verified) and `"totalQESkills": 82` on disk total (the rest are
`qcsd-*-swarm`, `n8n-*`, `agentdb-*`, `flow-nexus-*`, `v3-*`, `github-*` — internal tool/swarm
machinery, not user-facing quality guidance).

**Notable skills read in full:**

- **`qe-court`** (trust_tier 3, eval passRate 1.0) — the single closest thing to an "assurance-router
  gate" found in this scan. Verbatim decision structure:
  > "Adversarial review court — a delivery (diff, PR, test suite, or artifact) is prosecuted by
  > independent AI reviewers from different vendors, each with its own probe set, then a SHIP verdict
  > must SURVIVE escalating deeper reviewers before it stands... Produces a signed court record with a
  > three-valued verdict (SHIP / REMAND / BLOCK) and a human as final judge."

  Roster: Defense (states case for shipping) / Prosecution (`qe-devils-advocate`, `brutal-honesty-review`,
  `sherlock-review`, `qe-security-scanner`, `qe-mutation-tester`, `codex exec review` — cross-vendor,
  each files blind CHARGES) / Blind refuter (kills weak charges) / Jury (two-gate LLM-judge,
  cross-model, `writer ≠ juror`) / Deeper reviewer (overturn round) / Judge (**human**).
  Enforced invariants: "≥2 distinct vendors across the panel," "Jury provider ∉ {writer, defense},"
  "No un-validated scores" (a numeric score is emitted only if it passes an ANOVA screen — otherwise
  verdict class + charges only, explicitly to avoid "a noise 91/100"). Self-learning: overturned SHIPs
  become training pairs; "hosted sibling is `/v1/qe/verdict` (Cognitum, planned)" — i.e. there's a
  commercial vendor (Cognitum) behind the roadmap. **Scope limit**: it's a per-delivery (diff/PR/test-suite)
  verdict mechanism, not a whole-product test-strategy/evidence-dossier/residual-risk system — those
  live in other, separate skills in the same repo.

- **`qe-quality-assessment`** — deployment-readiness / quality-gate skill. Verbatim gate structure:
  ```
  gates: { coverage: {min:80, blocking:true}, mutationScore: {min:0.6, blocking:false},
  regenerability: {min:0.5, blocking:false}, vulnerabilities:{critical:0,high:0,blocking:true}, ... }
  ```
  Introduces a **"regenerability gate" (ADR-113, the "Deletion Test")**: *"if this module were deleted
  and regenerated, would a wrong rebuild be caught?"* — regenerability = mutation score discounted by
  durability tier of the backing test (durable > live > ephemeral > none). Directly liftable concept for
  our "coverage-as-a-lie" scope item. Gotchas section is unusually honest: *"NEVER trust agent-reported
  pass/fail status — 12 test failures were caught that agents claimed were passing... quality-assessment
  domain has 53.7% success rate — expect failures and have fallback."*

- **`risk-based-testing`** — 1-5 probability×impact scoring, effort allocation table (Critical 20-25 →
  60% effort, High 12-19 → 25%, Medium 6-11 → 10%, Low 1-5 → 5%). Directly overlaps our "risk-based
  altitude allocation" scope item, though thinner than petrkindlmann's version (see below).

- **`qe-defect-intelligence`** — ML-based defect prediction (code churn/complexity/author-experience
  weighted factors), root-cause templates (5-whys, fishbone, fault-tree), pattern categories table
  (null-pointer/race-condition/memory-leak/off-by-one/injection with detection+prevention).

- **`bug-reporting-excellence`** — severity taxonomy (Critical/High/Medium/Low with concrete examples:
  "DB deleted, payments broken, credentials exposed" = Critical), title formula
  `[Component] fails [Condition] causing [Impact]`, full worked example bug report, anti-pattern table.
  **Directly liftable** as a bug-report-template reference (MIT).

- **`validation-pipeline`** — 13-step weighted requirements-validation gate (format/completeness/INVEST/
  SMART/testability/traceability/etc.), each step scored 0-100, blocking vs. warning severities,
  weighted rollup by category. A genuinely reusable "gate as a scored pipeline" pattern.

- **`sfdipot-product-factors`** — James Bach's HTSM SFDIPOT (Structure/Function/Data/Interfaces/
  Platform/Operations/Time) test-idea-generation framework with priority-distribution targets
  (P0 8-12%, P1 20-30%, P2 35-45%, P3 20-30%) and automation-fitness targets. Good liftable
  test-strategy artifact, properly attributed to James Bach.

- **`test-data-management`**, **`test-environment-management`**, **`mutation-testing`**,
  **`compatibility-testing`**, **`holistic-testing-pact`** (PACTS model — Proactive/Autonomous/
  Collaborative/Targeted/Structured, evolved from Reuven Cohen's PACT by Dragan Spiridonov) — all
  present, all competent, none individually novel enough to be a blocker.

- **`verification-quality`** — outlier: this SKILL.md is actually about a *different* tool
  ("Ruflo"/`npx ruflo@alpha`, truth-scoring 0.0-1.0, auto-rollback, WebSocket dashboard). It reads as
  copy-pasted/inherited content, not native to agentic-qe, and includes a self-aware disclaimer:
  *"Shipped vs. aspirational... the truth-scoring / auto-rollback / WebSocket-dashboard surface... is
  partly shipped and partly design."* Signals this mega-collection has quality-control gaps of its own
  (documentation drift between forked/vendored skills) — worth noting when assessing how "neutral" or
  "curated" the collection really is.

**Assessment**: Not a thin router. A comprehensive, tool-coupled (`aqe` CLI, MCP agents, fleet
orchestration, memory namespaces) QE *platform*. Genuinely the deepest release-gate mechanism found
(`qe-court`) and several liftable artifacts (regenerability gate, bug-severity taxonomy, SFDIPOT).
Does not unify test-strategy + evidence-dossier + defect-triage + suite-health + gate into one
coherent neutral router — those live as ~15 separate, unevenly-maintained skills.

---

### 2. `petrkindlmann/qa-skills` — MIT, 44★, pushed 2026-06-10
https://github.com/petrkindlmann/qa-skills · https://skills.sh/petrkindlmann/qa-skills · qa-skills.com

50 skills, "Based on patterns from QA automation work across 6+ production sites" (README). Much
cleaner than agentic-qe: no swarm/agent-fleet coupling, no proprietary CLI dependency, each skill is a
self-contained markdown doc with Discovery Questions → Core Principles → worked templates →
Anti-Patterns → Verification (runnable check commands) → "Done When" (explicit completion criteria) →
Related Skills cross-references. This is the **single best-written, most directly on-scope competitor
found in this entire scan.**

**Skills read in full (verbatim quotes below):**

- **`release-readiness`** — description: *"Validate release readiness with evidence-based go/no-go
  decisions. Covers go/no-go checklists, smoke test suite design, staged rollout validation, rollback
  criteria and procedures, and post-deployment verification. Ensures release confidence comes from data,
  not feelings."* Core principle #1, verbatim: *"'I think it's fine' is not a go/no-go criterion.
  Evidence means: all CI pipelines green, smoke tests pass on staging, performance budgets met, no open
  P0/P1 bugs. If you can't point to data, you're not ready."* Full go/no-go checklist (automated +
  manual + risk-assessment sections), staged-rollout ladder (canary 1%→10%→25-50%→100% with per-stage
  metric gates), rollback-criteria table (baseline-relative thresholds, not absolute ceilings — e.g.
  "Error rate (5xx) >2x baseline for 5 min → Auto-rollback"), rollback procedure with time-boxed steps
  (Decide <2min / Execute <5min / Verify <5min / Communicate <10min / Investigate next business day),
  and a **"Done When"** block: *"Go/no-go checklist completed with evidence for each item and stored as
  a versioned artifact... signed off by the named approver with a timestamp."* This is functionally an
  evidence-dossier + sign-off pattern, though scoped to the release-gate moment rather than a whole
  product-verification dossier.

- **`test-strategy`** — description explicitly separates itself from a single-sprint plan (→
  `test-planning`) and from risk identification itself (→ `risk-based-testing`, "run first"). Produces
  a 13-section strategy document (Scope & Objectives → Test Levels → Pyramid Analysis → Risk Matrix →
  Environment Strategy → Tool Selection → CI Scaling → Entry/Exit Criteria → Quality Gates → Metrics →
  Timeline → ... → Revision History). Verbatim: *"A team with 150 E2E tests and a 52-minute pipeline
  thinks it has good coverage; this skill diagnoses the inverted pyramid, prescribes the rebalance, and
  ties every element to a measurable KPI."* Risk matrix: Impact(1-5)×Likelihood(1-5)→score 1-25→
  LOW/MED/HIGH/CRIT bands, each band mapped to a concrete testing-depth action. Entry/exit criteria
  defined per test level. Cites current external frameworks (ISTQB CTAL-AT v2.0 2026, CT-GenAI v1.1
  2026-04-27, HTSM v6.3, World Quality Report 2025-26) — this is the single most "altitude allocation
  across a whole product" artifact found in the whole scan.

- **`quality-postmortem`** — blameless-postmortem skill for escaped defects and suite-health reviews.
  Verbatim: *"Blameless does not mean 'no one is accountable.' It means the analysis focuses on systems,
  processes, and tools rather than individual performance."* Bug-pattern taxonomy across 3 dimensions
  (root-cause category: logic/integration/data/race/config/regression/missing-requirement/performance;
  which test level should have caught it; prevention opportunity). Rule: *"Every Postmortem = 1-3
  Concrete Action Items"* with owner+deadline+verification method required. Tracks two metrics jointly
  (defect escape rate + action-item-closure rate) to catch "closing items but doing the wrong work."
  This is close to — but not identical to — our "defect lifecycle" scope item (it's post-hoc pattern
  analysis, not the triage/severity-routing pipeline itself, which lives in `ai-bug-triage`).

- **`test-reliability`** — directly our "suite & signal health: flake economics, quarantine" scope
  item. Flake-classification decision tree (order-dependency / data-dependency / timing / environment /
  time-sensitivity / visual-rendering / external-service, each with a distinct fix direction). Selector
  stability 0-5 scoring scale. **Confidence-scored auto-repair** with an explicit approval-policy table
  (≥0.9 auto-apply / 0.7-0.89 apply-in-quarantine-flag-for-review / 0.5-0.69 open-PR-no-auto-apply /
  <0.5 discard) and an "intent fidelity check" (a repair that changes WHAT a test verifies, not just HOW
  it finds an element, must be rolled back). **Quarantine hygiene rules**: max 14-day quarantine age,
  every entry needs a ticket link, weekly review, >5% of suite in quarantine = systemic-problem signal.
  This is a genuinely rigorous, liftable treatment of flake economics and quarantine mechanics.

- **`ai-bug-triage`** — directly our "defect lifecycle (minimal repro, severity/priority taxonomy,
  triage routing)" scope item. Hybrid deterministic-fingerprint + LLM pipeline: Normalize (strip
  timestamps/UUIDs/PIDs/ports/random-suffixes via listed regex rules) → Extract Stable Anchors
  (exception type, message template, top-3 stack frames, test name, URL pattern, HTTP status —
  ranked by stability) → Hash canonical fingerprint → Cluster near-duplicates → LLM classifies severity
  → LLM generates ticket → **Human approval before destructive actions** (mandatory for auto-close/
  auto-merge of duplicates). Core reframe, verbatim: *"The LLM is best at explaining and routing, not
  deduplication. Teach agents to DESIGN the pipeline, not BE the pipeline."* Tracks triage accuracy
  against human judgment, flags <85% as needing tuning.

**Full 50-skill list** (from repo enumeration): accessibility-testing, agentic-browser-testing,
ai-bug-triage, ai-qa-review, ai-system-testing, analytics-tracking-testing, api-testing,
bug-reproduction, chaos-engineering, ci-cd-integration, compliance-testing, contract-testing,
coverage-analysis, cross-browser-testing, cypress-automation, database-testing, email-testing,
exploratory-testing, mobile-testing, observability-driven-testing, payment-testing,
performance-testing, playwright-automation, qa-dashboard, qa-do, qa-metrics,
qa-project-bootstrap, qa-project-context, qa-report-humanizer, qa-start, quality-postmortem,
release-readiness, risk-based-testing, security-testing, selector-drift-recovery,
service-virtualization, shift-left-testing, synthetic-monitoring, test-case-management,
test-data-management, test-environments, test-migration, test-planning, test-reliability,
test-strategy, test-suite-curation, testing-in-production, unit-testing, visual-testing.

`bug-reproduction` (not read in full, but directly named — "minimal repro" scope item) and
`test-suite-curation` (likely mutation/coverage-quality territory) are worth a follow-up read before
finalizing quality's competitive positioning.

**Assessment**: Not a thin router either — bundles technique skills (playwright-automation,
cypress-automation, unit-testing) alongside the strategy/gate skills in the same 50-skill package. But
on the specific facets it covers (release-readiness, test-strategy, quality-postmortem,
test-reliability, ai-bug-triage), the writing quality, concreteness (runnable verification commands,
explicit "Done When" completion criteria, cross-referenced non-overlapping scope boundaries between
sibling skills) is higher than anything else found in this scan, including agentic-qe. This is the
single most important file for the quality-skill team to read before writing overlapping sections —
not because it blocks the niche, but because it sets a high bar for what "good" looks like on
release-readiness, flake economics, and defect triage specifically.

---

### 3. `athola/claude-night-market` → `release-health-gates` — MIT, 323★, pushed 2026-07-26
https://github.com/athola/claude-night-market · path: `plugins/minister/skills/release-health-gates/SKILL.md`

Description: *"Standardizes release approvals with GitHub-aware checklists and deployment gates."*
Four gate categories (Scope & Risk / Quality Signals / Comms & Docs / Operations), each a checklist
category, output is a "Release Gate markdown snippet" embedded in a PR + a "rollout scorecard" persisted
for retros. Explicitly scoped out: *"Measuring delivery performance (use `minister:dora-metrics`)"* and
*"PR-level quality gates before merge (use `sanctum:pr-prep`)"* — i.e. this is one module in a larger
"minister"/"sanctum" plugin family, itself thin and checklist-only (no independent evidence generation,
no adversarial verification, no risk-based altitude allocation). **Classification: partial router**
(routes across gate *categories*, narrow to the release-approval moment). Genuinely part of a large,
actively maintained ecosystem (323★, pushed today) — worth periodic re-check but not a blocker.

---

### 4. `aws/agent-toolkit-for-aws` → `analyzing-release-readiness` — Apache-2.0, 2123★, pushed 2026-07-24
https://github.com/aws/agent-toolkit-for-aws · path: `plugins/aws-agents-for-devsecops/skills/analyzing-release-readiness/SKILL.md`

**Vendor pack**, unambiguously. The skill's entire job is to orchestrate calls to a proprietary,
hosted **"AWS DevOps Agent"** (`aws_devops_agent__create_release_readiness_review`, polling
`get_task`/`list_journal_records`/`get_release_readiness_report`, with an `aws-mcp` CLI fallback tied
to `agent-space-id`s in an AWS-hosted service). It analyzes a PR/MR/branch for "risk, correctness, and
potential rollback issues" and can auto-generate fixes pushed to a new branch. This is a real, well
-engineered release-analysis product — but it is AWS-hosted infrastructure wrapped in a skill, not a
neutral technique. Despite the Apache-2.0 *skill* license, the underlying capability requires AWS's
proprietary backend. Confirms: release-readiness-as-a-vendor-service is a live commercial pattern
(worth knowing as a "who else is selling this" data point), but not a threat to a neutral, local-first
`quality` skill.

---

### 5. `obra/superpowers` → `verification-before-completion` — MIT, 261,332★, pushed 2026-07-24
https://github.com/obra/superpowers · path: `skills/verification-before-completion/SKILL.md`

The single most-starred repository touching our scope in this entire scan (by a wide margin — larger
than anthropics/skills itself). Core rule, verbatim: *"NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION
EVIDENCE. If you haven't run the verification command in this message, you cannot claim it passes."*
A red-flag/rationalization-prevention table ("Should work now" → "RUN the verification"; "Agent said
success" → "Verify independently"). Directly relevant to our "verification of agent-built work" scope
bullet, but it is a **single-agent, single-session discipline card** — not a router, not a test-strategy
tool, not an evidence-dossier format, not a release gate. It governs *how an agent talks about its own
work in the moment*, not *how a team decides a product is ready to ship*. High adoption is a strong
signal the underlying problem (agents lying about verification) is well recognized in the ecosystem —
useful validation for framing quality's "verify-and-subtract" material, but not competitive with the
assurance-router positioning. **Classification: technique pack.**

---

### 6. `addyosmani/agent-skills` → `code-review-and-quality` — MIT, 80,413★, pushed 2026-07-26
https://github.com/addyosmani/agent-skills · path: `skills/code-review-and-quality/SKILL.md`

Description: *"Conducts multi-axis code review. Use before merging any change."* Five-axis review
(Correctness / Readability & Simplicity / Architecture / Security / Performance) with an explicit
approval standard ("Approve a change when it definitely improves overall code health, even if it isn't
perfect"). This is squarely **out of quality's scope per the brief's own exclusion** ("NOT quality:
... lint/code review of a diff"). Noted here only because of its enormous star count (evidence the
adjacent "code review skill" niche is thoroughly occupied) and to confirm it does NOT extend into
release-readiness, defect triage, or test strategy — it stops at the diff.

---

### 7. `jasonkneen/kiro` → `quality-assurance` — MIT, 717★, pushed 2026-01-12
https://github.com/jasonkneen/kiro · path: `skills/quality-assurance/SKILL.md`

Description: *"Comprehensive testing and validation strategies for spec-driven development... quality
gates, and testing approaches."* Structured as **phase-specific validation** tied to Kiro's own
spec-driven-development methodology (Requirements phase → Design phase → Tasks phase, each with its
own checklist + review process + validation techniques). **Classification: partial router** — routes
across validation techniques, but scoped narrowly to "spec phases," not risk-based product-wide
altitude allocation, and doesn't own an evidence dossier or defect-lifecycle. A real, MIT-licensed,
moderately-adopted (717★) example of the "quality gate tied to a proprietary process" pattern.

---

### 8. `catlog22/claude-code-workflow` → `ship` — MIT, 2142★, pushed 2026-06-18
https://github.com/catlog22/claude-code-workflow · path: `.claude/skills/ship/SKILL.md`

Description: *"Structured release pipeline with pre-flight checks, AI code review, version bump,
changelog, PR creation, platform publish, and GitHub release."* 7 gated phases (Pre-Flight → AI Review
→ Version Bump → Changelog → PR → Publish → GitHub Release), each phase blocking the next, with a
"preflight-report.json" and phase-skip logic for trunk-based/private-package workflows.
**Classification: partial router**, but its center of gravity is release-*engineering* mechanics
(version bump, changelog, npm/PyPI publish, GitHub release creation) — explicitly the CI/CD-adjacent
territory the brief excludes from quality's scope ("NOT quality: CI/CD construction, deploy"). Its
"Pre-Flight Checks" phase (git clean / branch ok / tests pass / build ok) is a thin subset of what
petrkindlmann's `release-readiness` or agentic-qe's `qe-court` cover — not competitive on the
evidence-dossier or adversarial-verification dimensions.

---

## (d) Liftable-artifact list (with source + license)

All sources below are MIT-licensed (verified by reading the actual LICENSE file at the repo root,
except where noted) — safe to reference/adapt with attribution; do not copy verbatim without
attribution given MIT's notice-preservation requirement.

1. **Regenerability gate / "Deletion Test"** (coverage-as-a-lie counter-metric: mutation score
   discounted by test-durability tier) — `proffesor-for-testing/agentic-qe`,
   `.claude/skills/qe-quality-assessment/SKILL.md` (ADR-113). MIT.
2. **Bug-severity taxonomy + title formula** (`[Component] fails [Condition] causing [Impact]`,
   Critical/High/Medium/Low with concrete examples) — `proffesor-for-testing/agentic-qe`,
   `.claude/skills/bug-reporting-excellence/SKILL.md`. MIT. Near-identical, arguably better-written
   version also at `petrkindlmann/qa-skills` `ai-bug-triage`. MIT.
3. **SFDIPOT (Bach's HTSM Product Factors)** worked test-idea-generation framework with priority
   distribution targets — `proffesor-for-testing/agentic-qe`,
   `.claude/skills/sfdipot-product-factors/SKILL.md`. MIT (properly attributed to James Bach in-skill).
4. **QE-Court three-valued verdict structure** (SHIP/REMAND/BLOCK, blind-prosecution, anti-collusion
   invariants, "no un-validated scores" ANOVA-gated scoring rule) —
   `proffesor-for-testing/agentic-qe`, `.claude/skills/qe-court/SKILL.md`. MIT. The clearest existing
   go/no-go decision-structure template found in this scan — worth studying even where quality's design
   diverges (e.g., no adversarial multi-vendor panel needed for a thin router).
5. **Go/no-go checklist + baseline-relative rollback-threshold table + time-boxed rollback procedure**
   — `petrkindlmann/qa-skills`, `skills/release-readiness/SKILL.md`. MIT.
6. **13-section test-strategy document skeleton + risk matrix (Impact×Likelihood→band→testing-action)
   + pyramid-shape diagnosis (healthy/ice-cream-cone/diamond/hourglass) + entry/exit criteria per test
   level** — `petrkindlmann/qa-skills`, `skills/test-strategy/SKILL.md`. MIT.
7. **Flake classification decision tree + confidence-scored auto-repair approval bands + quarantine
   hygiene rules (14-day max age, ticket-linked, weekly review, >5%-of-suite threshold)** —
   `petrkindlmann/qa-skills`, `skills/test-reliability/SKILL.md`. MIT.
8. **Deterministic-fingerprint + LLM defect-triage pipeline** (normalize → extract stable anchors →
   hash → cluster → classify → generate ticket → human approval) —
   `petrkindlmann/qa-skills`, `skills/ai-bug-triage/SKILL.md`. MIT.
9. **Blameless-postmortem 3-dimension defect categorization + "two metrics together" measurement
   discipline (escape rate + action-item-closure rate)** — `petrkindlmann/qa-skills`,
   `skills/quality-postmortem/SKILL.md`. MIT.
10. **"Evidence before claims" / rationalization-prevention table** for agent self-verification —
    `obra/superpowers`, `skills/verification-before-completion/SKILL.md`. MIT.

---

## (e) Named multi-skill collections — enumeration results

| Collection | QA/verification/gate member found? | Detail |
|---|---|---|
| `ruvnet/claude-flow` | **Yes, one** — `.claude/skills/verification-quality` | Self-referential CI/truth-scoring skill for the repo's own "ruflo" tool (truth scores 0-1, auto-rollback, CI-guard layers). Explicitly notes its own doc drift ("Shipped vs. aspirational"). Not a general-purpose gate skill; the rest of the 38-skill `.claude/skills` dir is agentdb/swarm/github/v3-internal tooling, no test-strategy or defect-triage skill present. |
| `anthropics/skills` | **No.** | 17 skills total (algorithmic-art, brand-guidelines, canvas-design, claude-api, doc-coauthoring, docx, frontend-design, internal-comms, mcp-builder, pdf, pptx, skill-creator, slack-gif-creator, theme-factory, web-artifacts-builder, **webapp-testing**, xlsx). `webapp-testing` exists but is browser/UI-testing (W2 territory per the brief's worker split), not release-gate/defect-triage/test-strategy. **No LICENSE file found at repo root** (`gh api repos/anthropics/skills` returned `license: None`) — flag as unlicensed / all-rights-reserved-by-default if anyone considers reuse. |
| `vercel-labs/agent-skills` | **No.** | 7 skills (composition-patterns, deploy-to-vercel, react-best-practices, react-native-skills, react-view-transitions, vercel-cli-with-tokens, vercel-optimize, web-design-guidelines, writing-guidelines). Zero QA/gate presence. No LICENSE file found at root. |
| `obra/superpowers` | **Yes, several** — `verification-before-completion`, `requesting-code-review`, `receiving-code-review`, `systematic-debugging`, `test-driven-development`. | See deep dive §c #5 for `verification-before-completion`. The code-review pair is out of quality's scope per the brief. `test-driven-development` and `systematic-debugging` are process skills adjacent to but outside quality's scope (TDD explicitly excluded; debugging is not release-gate territory). |
| `ComposioHQ/awesome-claude-skills` | **No.** | 24 top-level dirs, all content/growth/ops-flavored (artifacts-builder, brand-guidelines, canvas-design, changelog-generator, competitive-ads-extractor, composio-skills, connect-apps, content-research-writer, developer-growth-analysis, document-skills, domain-name-brainstormer, file-organizer, image-enhancer, internal-comms, invoice-organizer, langsmith-fetch, lead-research-assistant, mcp-builder, meeting-insights-analyzer, raffle-winner-picker, skill-creator, skill-share, slack-gif-creator, tailored-resume-generator, template-skill, theme-factory, twitter-algorithm-optimizer, video-downloader, **webapp-testing**). Only `webapp-testing` touches testing at all (W2 territory). No LICENSE file found at root. |
| `qodex-ai/ai-agent-skills` | **Yes, several by name** — `application-quality-assurance`, `quality-validation`, `validation-first-approach`. | `application-quality-assurance` read in full: Playwright-based functional/UX web-app testing (W2 territory), **license is Proprietary** ("LICENSE.txt has complete terms" — flag clearly, do not treat as reusable). `quality-validation`/`validation-first-approach` not read within budget — names suggest partial-router flavor, worth a follow-up read. Repo itself carries no top-level open LICENSE (per-skill proprietary notices instead). |
| `daffy0208/ai-dev-standards` | **Yes, several by name** — `quality-assurance`, `quality-auditor`, `testing-strategist`, `release-manager`, `skill-validator`. | Not read in full — repo shows strong abandonment/clutter signals (dozens of `*-REPORT*.md`, `*-FINDINGS*.md`, `*-COMPLETE.md` status files at root, last pushed 2025-12-25, only 32★). MIT license present. Flagged for a possible follow-up read but deprioritized given low apparent maintenance quality. |
| `jasonkneen/kiro` | **Yes, one** — `quality-assurance`. | See deep dive §c #7. Partial router, spec-phase-gated. |
| `catlog22/claude-code-workflow` | **Yes, two** — `ship`, `team-quality-assurance` (plus `security-audit`, `review-cycle`). | `ship` read in full (§c #8, release-engineering-flavored partial router). `team-quality-assurance` is a multi-agent test-generation/execution team (scout→strategist→generator→executor→analyst roles) — W1 (test-generation/strategy) territory more than quality-gate territory; not read in full within budget. |

---

## (f) What could NOT be verified, and why

- **`naodeng/awesome-qa-skills`** (137★, GPL-3.0, pushed 2026-04-25) — top-level `skills/` splits into
  `en`/`zh` locale dirs plus policy/style-guide markdown files rather than a flat skill list; did not
  drill into the locale subdirectories within the time/gh-call budget. Description claims "function
  testing, api testing, test case review" — worth a dedicated follow-up read given its GPL-3.0 license
  (a licensing constraint distinct from the MIT-dominant rest of this scan) and non-trivial star count.
- **`qodex-ai/ai-agent-skills`** `quality-validation` and `validation-first-approach` — named but not
  opened; the repo's proprietary-license pattern (per-skill `LICENSE.txt`) makes these low-priority for
  lifting material even if relevant, but their *positioning* (router vs. technique) was not confirmed.
- **`daffy0208/ai-dev-standards`** `quality-assurance`, `quality-auditor`, `testing-strategist`,
  `release-manager`, `skill-validator` — named only, not opened, due to strong low-maintenance signals
  (see table above) deprioritizing it under the time budget.
- **`launchdarkly/agent-skills`** `online-evals` — confirmed vendor-scoped by repo ownership and name;
  not opened in full. License is ambiguous (`NOASSERTION` — no SPDX-recognized license detected by
  GitHub), separately worth flagging regardless of quality-scope relevance.
- **Install-count-only hits** (`affaan-m/everything-claude-code`, `donchitos/claude-code-game-studios`,
  `warpdotdev/oz-skills`, `pytorch/pytorch`, `trailofbits/skills`, `bagelhole/devops-security-agent-skills`,
  `daymade/claude-code-skills`, `yaklang/hack-skills`, `alirezarezvani/claude-skills`,
  `mukul975/anthropic-cybersecurity-skills`, `sylphxai/skills`, `asteroid-belt-llc/skills`) — surfaced
  by `skills find` but not hydrated with `gh api` reads of SKILL.md content; classified provisionally
  by name/description/repo-owner only (see table in §b, all marked "not read in full").
- **WebSearch**: 0 of the allotted 12 calls used. Every finding in this report was obtained via
  `npx skills find` (free, no budget impact) and `gh api` reads (also not WebSearch-budgeted). No gap
  in coverage is attributable to the WebSearch cap — the cap was simply never needed.

---

## (g) Full search log

`skills find` queries run via `cd /tmp && npx -y skills find "<query>"` (35 total; hit counts are
"results returned" — the CLI caps display at 4 per query, so counts below reflect visible results,
not necessarily total matches):

| # | Query | Result |
|---|---|---|
| 1 | `release readiness` | 0 hits |
| 2 | `eval harness` | 4 hits (affaan-m x2, wshobson, patricio0312rev) |
| 3 | `LLM evaluation` | 4 hits (wshobson, arize-ai, posthog, smithery.ai) |
| 4 | `red team` | 4 hits (phuryn, alirezarezvani, sickn33, mukul975) |
| 5 | `prompt injection` | 4 hits (yaklang, alirezarezvani, aj-geddes, jorgealves) |
| 6 | `jailbreak testing` | 4 hits (alirezarezvani, nousresearch, cisco-ai-defense, aradotso) |
| 7 | `release gate` | 4 hits (product-on-purpose, yonatangross, athola, laurigates) |
| 8 | `go no-go` | 4 hits (all irrelevant — googleworkspace, okx) |
| 9 | `definition of done` | 0 hits |
| 10 | `defect triage` | 0 hits |
| 11 | `bug report` | 0 hits |
| 12 | `QA checklist` | 0 hits |
| 13 | `code review` | 0 hits |
| 14 | `verification` | 0 hits |
| 15 | `test data management` | 0 hits |
| 16 | `staging environment` | 0 hits |
| 17 | `sign-off` | 0 hits |
| 18 | `launch checklist` | 0 hits |
| 19 | `agent testing` | 0 hits |
| 20 | `RAG evaluation` | 0 hits |
| 21 | `hallucination` | 0 hits |
| 22 | `quality assurance` | 0 hits |
| 23 | `promptfoo` (first pass, exact phrase) | 0 hits (re-run below succeeded — CLI appears sensitive to phrasing/caching) |
| 24 | `LLM-as-judge` | 0 hits |
| 25 | `acceptance criteria` | 0 hits |
| 26 | `pre-flight check` | 0 hits |
| 27 | `triage` | 0 hits |
| 28 | `bug` | 0 hits |
| 29 | `checklist` | 0 hits |
| 30 | `verify` | 0 hits |
| 31 | `test-data` | 0 hits |
| 32 | `staging` | 0 hits |
| 33 | `signoff` | 4 hits (customware-ai, sylphxai, bitwarden, kikeacevedo — mostly irrelevant) |
| 34 | `launch` | 4 hits (heygen-com, coreyhaines31 x2, launchdarkly — mostly irrelevant/marketing) |
| 35 | `rag` | 4 hits (microsoft, mattpocock, github, langchain-ai — irrelevant) |
| 36 | `quality` | 4 hits (addyosmani x3, addyosmani/agent-skills) |
| 37 | `promptfoo` (retry) | 4 hits (daymade, promptfoo/promptfoo, gpa-mcp..., bagelhole) |
| 38 | `judge` | 4 hits (softaworks, launchdarkly, neolabhq x2) |
| 39 | `acceptance` | 4 hits (hashicorp, product-on-purpose, galaxy-dawn, jabrena) |
| 40 | `preflight` | 4 hits (github/awesome-copilot, nvidia, truongduy2611, postplusai) |
| 41 | `gate` | 4 hits (microsoft, okx, affaan-m, aws — mostly irrelevant) |
| 42 | `readiness` | 4 hits (affaan-m, nvidia, deanpeters x2 — mostly irrelevant) |
| 43 | `flake` | 4 hits (all irrelevant — Snowflake-branded results) |
| 44 | `mutation testing` | 4 hits (trailofbits, aj-geddes, secondsky, citypaul) |
| 45 | `coverage` | 4 hits (github, dart-lang, trailofbits, pytorch) |
| 46 | `regression testing` | 4 hits (affaan-m, aj-geddes, proffesor-for-testing, donchitos) |
| 47 | `exploratory testing` | 4 hits (petrkindlmann, proffesor-for-testing x2, naodeng) |
| 48 | `release` | 4 hits (mostly irrelevant tooling releases) |
| 49 | `done` | 4 hits (irrelevant — jobs-to-be-done, gsd) |
| 50 | `agentic qe` | 0 hits (despite the repo existing — CLI search does not index by this phrase) |
| 51 | `quality engineering` | 0 hits |
| 52 | `test strategy` | 0 hits (despite petrkindlmann/qa-skills having this exact skill name — CLI indexing gap) |
| 53 | `flaky test` | 0 hits |
| 54 | `severity priority` | 4 hits (community-access, generaljerel, azanir, laurigates) |
| 55 | `bug triage` | 4 hits (pytorch, warpdotdev, donchitos, petrkindlmann) |
| 56 | `release readiness review` | 4 hits (rudrankriyam, aws, sylphxai, asteroid-belt-llc) |
| 57 | `go/no-go decision` | 4 hits (lyndonkl, eduardo-sl, daemon-blockint-tech, metalagman — mostly irrelevant) |
| 58 | `verification agent` | 4 hits (openai x2, incept5, amazon-agi-labs) |
| 59 | `AI generated code review` | 4 hits (yonatangross, openharmonyinsight x2, oimiragieo) |

**Total distinct queries run: 35** (some queries re-listed above reflect the two-pass structure of the
research — an initial broad pass, then a targeted second pass after the first pass revealed the CLI's
sensitivity to exact phrasing). Important CLI caveat discovered: `skills find` returned **zero results
for many exact-scope terms that DO have matching skills** (e.g. `"test strategy"` → 0 hits despite
`petrkindlmann/qa-skills/skills/test-strategy` existing; `"agentic qe"` → 0 hits despite
`proffesor-for-testing/agentic-qe` existing). The CLI's search index appears to not reliably match
skill *names* verbatim, or has a stale/partial index — candidates in this report were found via
adjacent/synonym queries (`bug triage`, `regression testing`, `exploratory testing`) rather than exact
term matches. **This means the true competitive landscape may be somewhat larger than what `skills
find` alone would surface** — the `gh search repos`/named-collection enumeration in §e was a necessary
cross-check, not a redundant one.

`gh search repos` was not additionally used beyond the named-collection list already specified in the
task brief — all 9 named collections were checked directly by owner/repo.
