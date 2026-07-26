# W1 Competitive Scan — Core Testing & Test-Strategy Skills (agent-skills ecosystem)

Date: 2026-07-26. Territory: quality/QA/test-strategy/unit/integration/TDD/BDD/test-automation/regression/exploratory/test-case-design/acceptance/contract-testing/mutation-testing/flaky-tests/coverage/test-pyramid. Excludes e2e/browser/mobile (W2), a11y/perf/security (W3), AI-eval/release-gate/process (W4) — though several repos in my territory bundle those in, which I note but do not deep-read.

---

## (a) Verdict: NARROW, leaning toward the edge of CLOSED for one specific competitor

The niche is **NOT open**. Two repos are genuine, well-built competitors that materially overlap with the assurance-router definition:

1. **`petrkindlmann/qa-skills`** (50 skills, MIT, 44 stars, pushed 2026-06-10) is the strongest single find. It has a real router (`qa-do`) that takes a plain-language QA situation and names 1-2 skills in order; a `qa-start` sequenced launcher (`qa-project-context` → `test-strategy` → `test-planning`); and dedicated skills for exactly the scope items in the brief: `release-readiness` (evidence-based go/no-go checklist, smoke suite design, staged rollout, rollback criteria tied to DORA targets), `test-strategy` (risk matrix, pyramid diagnosis, KPIs, 13-section doc template), `risk-based-testing`, `exploratory-testing` (SBTM, HICCUPS heuristics, charters), `test-suite-curation` (coverage-equality-is-not-redundancy, mutation-testing-to-prove-subsumption, quarantine+grace-period+audit record — this is genuinely "suite & signal health"), `ai-bug-triage` (fingerprint+LLM defect triage, severity/priority matrix), `quality-postmortem` (5 Whys, blameless retro), `test-reliability` (flake root-cause), `test-case-management`, `test-data-management`, `test-environments`, `compliance-testing`. **However**, it does NOT cleanly separate itself from technique ownership the way the assurance-router definition requires ("owns test strategy... NOT the techniques") — the same flat `skills/` directory and the same `qa-do` router also directly own construction-adjacent technique packs: `unit-testing`, `playwright-automation`, `cypress-automation`, `mobile-testing`, `accessibility-testing`, `security-testing`. So it is a **broad, high-quality, mostly-neutral router that blends strategy/verification with technique packs** — closer to "partial-router-plus" than a pure assurance-router. It is the single most important artifact for whoever builds the `quality` skill to read before finalizing scope, specifically to avoid overlapping it accidentally and to differentiate on the construction/verification boundary.

2. **`proffesor-for-testing/agentic-qe`** ("Agentic QE Fleet", MIT, 421 stars, pushed 2026-07-24 — updated *today*, 124 skills across V2/V3/Platform tiers) is bigger and more actively maintained, but is a **vendor pack for its own framework**, not a neutral router: it requires installing their `aqe` CLI, a 19-agent fleet, MCP memory namespaces (`aqe/coordination/*`), and its own coordination topology. Content quality is real (e.g. `qe-quality-assessment`'s regenerability/Deletion-Test gate citing "ADR-113," `risk-based-testing`'s 60/25/10/5% effort-allocation-by-risk-score table, `sfdipot-product-factors` = James Bach's HTSM lifted faithfully, honest "Gotchas" sections admitting a 53.7% success rate and agent-hallucination failure modes) — but it is fused to code-level CI/CD quality gates (coverage, mutation score, complexity) rather than a whole-product, cross-surface risk-based verification decision. Classify as **vendor pack with partial-router characteristics inside its own ecosystem** — a serious technical reference, not a positioning threat to a vendor-neutral standalone `quality` skill, precisely because adopting it means adopting their fleet/CLI.

No repo found in this scan does all of: (i) risk-based **altitude** allocation across a whole product surface, (ii) a release-readiness decision **plus** an evidence dossier **plus** a residual-risk statement, (iii) the adversarial/independent method including the oracle problem, (iv) defect lifecycle, (v) suite/signal health, (vi) cross-pack test data & environment strategy, (vii) compatibility matrix, (viii) NFR verification against someone else's budget, and (ix) verification of AI/agent-built work — **as one coherent, vendor-neutral, technique-agnostic package that stays above the techniques**. `petrkindlmann/qa-skills` covers the largest fraction of that list (missing a clean compatibility-matrix skill by that name, and NFR-against-someone-else's-budget framing; its `performance-testing` skill wasn't deep-read here — W3 territory). Given how close it comes, I would not call this OPEN; I'd call it **NARROW**, with `petrkindlmann/qa-skills` as the reference competitor to differentiate against (mainly on: staying purely at the strategy/evidence/gate layer, not also owning `unit-testing`/`playwright-automation`/`cypress-automation` as first-class routed skills; and on cross-surface altitude allocation rather than QA-department process).

---

## (b) Full table of everything found

| Name | Repo (skills.sh) | Owner | License | Size | Last push | Stars/Installs | Classification | Notes |
|---|---|---|---|---|---|---|---|---|
| qa-skills (50-skill pack) | github.com/petrkindlmann/qa-skills | Petr Kindlmann (individual) | MIT (LICENSE verified) | 1.8MB repo, 50 skills | 2026-06-10 | 44 stars / skills range 8-217 installs per skill | **Broad router + technique packs (partial-router-plus)** | Strongest single competitor; see deep notes |
| agentic-qe (Agentic QE Fleet) | github.com/proffesor-for-testing/agentic-qe | proffesor-for-testing (Dragan Spiridonov's "Agentic QE Framework") | MIT (LICENSE verified) | 83MB repo, 124 skills (85 QE + 24 V3 + platform) | 2026-07-24 | 421 stars / skills 93-421 installs per skill | **Vendor pack (own fleet/CLI) w/ partial-router internals** | Requires `aqe` CLI + 19-agent fleet; see deep notes |
| ai-agents-public (shared-skills, qa-testing-strategy) | github.com/vasilyu1983/AI-Agents-public | Vasiliy Uvarov | MIT (LICENSE verified) | 5.7MB repo; qa-testing-strategy is 1 of ~20 shared skills in a broader dev framework (backend/frontend/ops/qa mixed) | 2026-07-13 | 68 stars / qa-testing-strategy 417 installs, qa-api-testing-contracts 147 | Technique/partial-router embedded in general dev-framework | Decent quality-gate/flake-SLO content but shallow vs. the two leaders; QA is one slice of a much bigger monolith |
| qaskills (QASkills, senior-qa-engineer) | github.com/javalenciacai/QASkills | javalenciacai | MIT (LICENSE verified) | 75KB, single skill | 2026-02-09 | 4 stars / 16 installs | Thin orchestrator stub | Defines a 7-phase QA lifecycle router but delegates to skills that must be found/installed/created dynamically — no actual methodology content in the file itself |
| qaskills (QA Skills Directory / "The Testing Academy") | github.com/PramodDutta/qaskills | Pramod Dutta | MIT (LICENSE verified) | 23MB repo (monorepo: landing page, SEO strategy, `packs/`, `seed-skills/`) | 2026-07-25 | 185 stars | Marketplace/directory product, not itself one skill | Repo contains `COMPETITOR-ANALYSIS.md`, `SEO-STRATEGY.md` — this is a commercial skills-directory business, not primarily a testing methodology; not deep-read further (out of primary scope, flag for awareness — a QA-skills marketplace competitor exists in the ecosystem itself) |
| skills (qa — DEPRECATED) | github.com/mattpocock/skills | Matt Pocock | MIT | 893KB repo | 2026-07-23 | 188,875 stars (repo-wide) | Technique pack, deprecated | Actual file at `skills/deprecated/qa/SKILL.md` — an interactive "user reports bugs conversationally → agent files GitHub issues" flow. Not test-strategy. High historical install count (169.9K) but confirmed deprecated |
| sdet-skills | github.com/milosmilicevicsf/sdet-skills | Milos Milicevic | MIT (LICENSE verified) | 37KB | 2026-07-13 | 4 stars | Technique pack | "Trustworthy e2e, API, flaky-test and test-data disciplines" per description — small, recently pushed; not deep-read (low install signal, size) |
| ai-dev-standards (quality-assurance) | github.com/daffy0208/ai-dev-standards | daffy0208 | MIT | 5.6MB repo | 2025-12-25 | 32 stars / 175 installs | Technique pack mixing construction + gates | Consolidates "testing-strategist + code-quality-enforcer + validation-gate-checker" into one skill; generic test-pyramid + code-standards + phase-gates content, competent but not deep; construction (code quality enforcement) fused with verification — exactly the boundary our skill should NOT blur |
| ai-agent-skills (application-quality-assurance) | github.com/qodex-ai/ai-agent-skills | qodex-ai (vendor) | **NO LICENSE FILE FOUND** [UNVERIFIED — could not confirm via metadata; `license` field returned null] | 3.9MB | 2026-01-05 | 37 stars / 123 installs | Vendor pack | Company-branded (qodex.ai product); not deep-read further given W1 scope priority |
| claude-flow (verification & quality assurance) | github.com/ruvnet/claude-flow | ruvnet | [UNVERIFIED — not hydrated] | — | — | 102 installs | Likely technique/vendor pack (claude-flow orchestration platform) | Not deep-read — large unrelated orchestration repo, low marginal value vs. budget spent |
| kiro (quality-assurance) | github.com/jasonkneen/kiro | jasonkneen | [UNVERIFIED] | — | — | 69 installs | Not deep-read | Lower install count than top candidates |
| claude-code-workflow (team-quality-assurance) | github.com/catlog22/claude-code-workflow | catlog22 | [UNVERIFIED] | — | — | 66 installs | Not deep-read | — |
| agent-suite (quality-assurance) | github.com/alvarovillalbaa/agent-suite | alvarovillalbaa | [UNVERIFIED] | — | — | 6 installs | Not deep-read, negligible install count | — |
| agent-toolkit (qa-test-planner) | github.com/softaworks/agent-toolkit | softaworks | MIT | 781KB | 2026-03-05 | 2,238 stars / 4K installs | Technique pack [UNVERIFIED depth] | High install count for a single planner skill; not deep-read due to budget, flagged for follow-up |
| knowledge-work-plugins (testing-strategy) | github.com/anthropics/knowledge-work-plugins | Anthropic | [UNVERIFIED] | — | — | 4.9K installs | Not deep-read | Official Anthropic plugin repo — worth a deeper look in a follow-up pass given install count and provenance |
| anthropics/skills (webapp-testing) | github.com/anthropics/skills | Anthropic | [UNVERIFIED] | — | — | 121.6K installs | Likely technique pack (webapp/browser testing) — W2 territory | Out of my territory (browser/e2e); flagging existence only |
| wshobson/agents (python-testing-patterns, e2e-testing-patterns) | github.com/wshobson/agents | wshobson | [UNVERIFIED] | — | — | 28.2K / 19.9K installs | Technique packs (language/e2e specific) | Not deep-read — clear technique-pack classification from name/description alone |
| trailofbits/skills (mutation-testing) | github.com/trailofbits/skills | Trail of Bits | [UNVERIFIED] | — | — | 2.6K installs | Technique pack | Reputable security firm; single-technique skill, does not close the wedge |
| jwilger/agent-skills (mutation-testing) | github.com/jwilger/agent-skills | jwilger | [UNVERIFIED] | — | — | 97 installs | Technique pack | — |
| aj-geddes/useful-ai-prompts (multiple: api-contract-testing, mutation-testing, unit-testing-framework, test-data-generation, visual-regression-testing, e2e-testing-automation, test-automation-framework) | github.com/aj-geddes/useful-ai-prompts | aj-geddes | [UNVERIFIED] | — | — | 400-800 installs each | Technique-pack collection | Appeared across many queries as a broad but shallow-sounding prompt library; not deep-read |
| secondsky/claude-skills (mutation-testing, api-contract-testing) | github.com/secondsky/claude-skills | secondsky | [UNVERIFIED] | — | — | 303 / 343 installs | Technique packs | — |
| owl-listener/designer-skills (usability/accessibility/click test-plan) | github.com/owl-listener/designer-skills | owl-listener | [UNVERIFIED] | — | — | ~900-940 installs | Technique packs, design-adjacent | W3-ish (a11y) — flagged only |
| donchitos/claude-code-game-studios (regression-suite, test-flakiness) | github.com/donchitos/claude-code-game-studios | donchitos | [UNVERIFIED] | — | — | 198-202 installs | Technique packs, game-dev specific | — |
| aaronontheweb/dotnet-skills (crap-analysis) | github.com/aaronontheweb/dotnet-skills | aaronontheweb | [UNVERIFIED] | — | — | 423 installs | Technique pack (.NET-specific coverage metric) | — |
| rrezartprebreza/spring-boot-skills (testing-pyramid) | github.com/rrezartprebreza/spring-boot-skills | rrezartprebreza | [UNVERIFIED] | — | — | 45 installs | Technique pack (Spring-specific) | — |
| jabrena/cursor-rules-java (acceptance-tests × 5 framework variants) | github.com/jabrena/cursor-rules-java | jabrena | [UNVERIFIED] | — | — | 150-170 installs each | Technique packs, Java-framework-specific | — |
| hashicorp/agent-skills (run-acceptance-tests) | github.com/hashicorp/agent-skills | HashiCorp | [UNVERIFIED] | — | — | 2.5K installs | Vendor pack | HashiCorp's own tooling |
| dbt-labs/dbt-agent-skills (adding-dbt-unit-test) | github.com/dbt-labs/dbt-agent-skills | dbt Labs | [UNVERIFIED] | — | — | 626 installs | Vendor pack | dbt-specific |
| dotnet/skills (test-tagging) | github.com/dotnet/skills | Microsoft/.NET | [UNVERIFIED] | — | — | 456 installs | Vendor/technique pack | — |
| melodic-software/claude-code-plugins (test-pyramid-design) | github.com/melodic-software/claude-code-plugins | melodic-software | [UNVERIFIED] | — | — | 11 installs | Technique pack, low signal | — |
| modu-ai/moai-adk (moai-ref-testing-pyramid) | github.com/modu-ai/moai-adk | modu-ai | [UNVERIFIED] | — | — | 10 installs | Technique pack, low signal | — |

---

## (c) Deep notes on top candidates

### 1. `petrkindlmann/qa-skills` — the reference competitor

- Repo: https://github.com/petrkindlmann/qa-skills — skills.sh: https://skills.sh/petrkindlmann/qa-skills
- 50 skills, MIT license (verified: `LICENSE` file present, "MIT License / Copyright (c) 2026 Petr Kindlmann")
- pushed_at 2026-06-10T18:06:18Z (~6 weeks stale as of today)
- Explicit cross-tool compatibility statement in skill frontmatter: "Tested with Claude Code, Codex, Cursor, Gemini CLI. Reads the project root; no network access required."
- Every skill's frontmatter carries a `Not for: ... Related: ...` disambiguation block — deliberately engineered to avoid overlap between its own skills, which is exactly the kind of scope discipline a `quality` skill needs against *this* repo.

**`qa-do` (routing skill of last resort)** — verbatim excerpt:
> "Routing skill of last resort. Takes a plain-language QA situation and names the right 1-2 skills to use and in what order... Route to the most precise skill, not the nearest neighbor... One or two skills, in order — never a pile... The routing table is the source of truth, and it goes stale."

Its routing table example directly matches our scope: `"What should we test before this release?"` → `risk-based-testing` → `release-readiness` ("Risk first, then checklist"). This is a real, if shallow, altitude-allocation-then-gate pattern.

**`release-readiness`** — verbatim excerpt (Core Principles):
> "1. Release confidence comes from evidence, not feelings... If you can't point to data, you're not ready.
> 4. Rollback criteria must be defined BEFORE release... Tie the trigger to your DORA targets — a release whose error rate would push you past your change-failure-rate target, or whose recovery would blow your MTTR target, is one the rollback rule exists to stop."

Contains a full Go/No-Go checklist (automated checks / manual checks / risk assessment with blast-radius and revert-complexity scoring) and a 5-8-test smoke suite design section. This is directly liftable as a checklist skeleton (see liftable-artifact list below).

**`test-strategy`** — verbatim excerpt:
> "A team with 150 E2E tests and a 52-minute pipeline thinks it has good coverage; this skill diagnoses the inverted pyramid, prescribes the rebalance, and ties every element to a measurable KPI."

Risk matrix: Impact (1-5) × Likelihood (1-5) → CRITICAL(15-25)/HIGH(10-14)/MEDIUM(5-9)/LOW(1-4), each banded to a concrete testing-action + automation + monitoring policy. Test-level ownership table (Unit/Integration/E2E/API/Visual/Performance/Security/Accessibility with owner, framework, target %, run frequency). Team-maturity calibration (startup/growing/established) changes what's even in scope. References worked examples for SaaS/e-commerce/API-first/media in `references/strategy-templates.md` (not fetched — flagged unread).

**`test-suite-curation`** — this is the standout find for "suite & signal health," directly hitting "coverage-as-a-lie":
> "Test A and Test B cover the exact same lines, so a tired engineer deletes B — and three weeks later a production defect slips through because B was the only test that asserted the rounding was correct. Coverage equality is not redundancy."
> "Coverage equality is not redundancy. Two tests hitting the same lines can assert completely different things... The only evidence that one test subsumes another is that the survivor catches the same faults, which you prove with mutation testing, not a coverage diff."
> "The agent's edge is whole-corpus analysis, not deletion authority... the agent *proposes*; a human *approves*."
> "Deletion is destructive and must be reversible in practice. 'It's in git history' is not a recovery plan. Quarantine first..., observe for a defined window..., then delete with sign-off."

Produces smoke/core/extended tiering by risk + defect-detection history, and "a defensible 'what we deleted and why' record" — i.e. an audit trail, structurally similar to an evidence dossier but scoped to suite pruning rather than release decisions.

**`ai-bug-triage`** — defect lifecycle content:
> "A hybrid pipeline for bug classification, deduplication, and ticket generation. Deterministic fingerprinting handles deduplication (what LLMs are bad at); LLM handles explanation, severity assessment, and ticket writing (what LLMs are good at). Key reframe: The LLM is best at explaining and routing, not deduplication."

Includes a severity/priority matrix and bug-report templates (not fully quoted here — file continues past what was read).

**`quality-postmortem`** — blameless-postmortem process with 5 Whys, "Not for: live release go/no-go decisions — use release-readiness" (again showing deliberate boundary discipline).

**`exploratory-testing`** — directly addresses the "adversarial/independent method" scope item: Session-Based Test Management (SBTM), charter writing, HICCUPS/FEW HICCUPS heuristics, charter-pattern routing table (new feature / regression / bug investigation), each charter mapped to a reference file with time-split guidance.

**What it does NOT cover from our scope:**
- No explicit "oracle problem" framing found in the excerpt read (charter/heuristic-based, but didn't name the oracle problem directly — [UNVERIFIED, only read first ~50 lines of `exploratory-testing/SKILL.md`]).
- No dedicated "compatibility matrix" skill by that name (has `cross-browser-testing`, which is W2/W3-adjacent, not read).
- No explicit "verification of AI/agent-built work" as its own first-class skill — `ai-qa-review` and `ai-test-generation` exist but weren't read; `ai-system-testing` exists for "testing your product's own AI/LLM features" (a different thing — that's testing an AI *feature*, not verifying AI/agent-*built* work, though adjacent).
- No system-level "NFR measured against someone else's budget" framing seen (performance-testing skill not read — W3 territory, flagged for W3 to check).
- It explicitly BLURS construction and verification by including `unit-testing`, `playwright-automation`, `cypress-automation` as first-class routed skills alongside strategy skills — this is the clearest differentiation opportunity for our `quality` skill (stay above the techniques; this repo does not).

### 2. `proffesor-for-testing/agentic-qe` — the Agentic QE Fleet

- Repo: https://github.com/proffesor-for-testing/agentic-qe — skills.sh: https://skills.sh/proffesor-for-testing/agentic-qe (per-skill URLs, e.g. https://skills.sh/proffesor-for-testing/agentic-qe/risk-based-testing)
- MIT license (verified: "MIT License / Copyright (c) 2025 Agentic QE Contributors")
- pushed_at 2026-07-24T10:33:06Z — **updated 2 days before this scan**, most actively maintained repo found
- 421 stars, 83MB repo (full npm package + CLI + Dockerfile + tests, not just skills)
- Description: "Agentic QE Fleet is an open-source AI-powered QA/QE platform... Based on the Agentic QE Framework created by Dragan Spiridonov."
- 124 skills total: 62 "V2 Methodology" (vendor-agnostic QE practices), 24 "V3 Domain" (implementation guides for its own DDD bounded contexts), 30 "Platform" (claude-flow-managed: agentdb, github, flow-nexus — clearly vendor/infra tooling)

**Structural verdict: this is a framework/product, not a portable skill.** Every skill's frontmatter lists `agents: [...]` (its own 19-agent fleet), most bodies invoke its own `aqe` CLI (`aqe quality assess`, `aqe risk-analyze`, `aqe agent spawn`) and its own MCP memory namespace convention (`aqe/coordination/*`, `aqe/learning/*`). Adopting any one skill effectively means adopting the fleet.

**`agentic-quality-engineering`** (core/entry skill) — PACTS framework (Proactive, Autonomous, Collaborative, Targeted, Structured), 19-agent fleet table, coordination topologies (hierarchical/mesh/sequential), trust-progression model ("Month 1: Agent suggests → Human decides... Month 4: Agent handles critical with oversight"). This is agent-orchestration doctrine, not test-strategy doctrine.

**`qe-quality-assessment`** — deployment-readiness / quality-gate skill, genuinely interesting liftable concept:
> "Fault detection — coverage is necessary but NOT sufficient (ADR-113). A suite can hit 90% coverage and catch no bugs; mutation score does not lie."
> "**Regenerability gate (ADR-113)**: Coverage measures lines executed; mutation score measures whether the tests would notice a bug; regenerability answers the Deletion Test — 'if this module were deleted and regenerated, would a wrong rebuild be caught?' Regenerability = mutation score discounted by the durability tier backing the module (durable > live > ephemeral > none); ephemeral-only tests score low because they don't survive a reimplementation."

Also has an honest, unusually candid "Gotchas" section:
> "NEVER trust agent-reported pass/fail status — 12 test failures were caught that agents claimed were passing (Nagual pattern, reward 0.92). Completion theater: agent hardcoded version '3.0.0' instead of reading from package.json... quality-assessment domain has 53.7% success rate — expect failures and have fallback."

This is scoped to **code-level CI/CD quality gates** (coverage/mutation/complexity/vulnerabilities), weighted quality-score rubric (test_coverage 0.25, code_quality 0.20, security 0.25, reliability 0.20, documentation 0.10 → A-F grade), not whole-product-surface risk allocation.

**`risk-based-testing`** — verbatim risk-scoring/allocation table:
| Score | Priority | Effort | Action |
|---|---|---|---|
| 20-25 | Critical | 60% | Comprehensive testing, multiple techniques |
| 12-19 | High | 25% | Thorough testing, automation priority |
| 6-11 | Medium | 10% | Standard testing, basic automation |
| 1-5 | Low | 5% | Smoke test, exploratory only |

This is a clean, directly liftable altitude-allocation heuristic (1-5 × 1-5 probability/impact scale → 4-tier effort split).

**`sfdipot-product-factors`** — faithful implementation of James Bach's Heuristic Test Strategy Model (HTSM) Product Factors mnemonic (Structure/Function/Data/Interfaces/Platform/Operations/Time), with quality gates ("Human exploration >= 10%", priority distribution P0 8-12% / P1 20-30% / P2 35-45% / P3 20-30%). Public-domain testing heuristic, MIT-licensed implementation — liftable as a checklist, note the concept itself predates and is not owned by this repo.

**`bug-reporting-excellence`** — minimal-repro + severity-taxonomy content (Critical/High/Medium/Low), bug report formula template.

**`test-metrics-dashboard`** — directly liftable suite/signal-health table:
| Metric | Formula | Target | Alert |
|---|---|---|---|
| Pass Rate | Passed/Total | >95% | <90% |
| Flakiness Rate | Flaky/Total | <5% | >10% |
| MTTR | Avg failure→fix time | <4h | >24h |
| Execution Time | Suite duration | <10min | >20min |
| Coverage Delta | Current−Previous | ≥0% | <−2% |

Gotcha quoted: "Flakiness rate is underreported — a test that fails 1/100 times still breaks CI weekly."

**What it does NOT cover from our scope (as read):**
- Does not present a whole-product, cross-surface release-readiness dossier — its "deployment readiness" content is code/CI-gate-centric (coverage, tests-pass, vulnerabilities), not a residual-risk statement across product surfaces.
- Does not clearly separate "assurance router" from "technique execution" — it is explicitly an agent-fleet execution platform, the opposite of "thin."
- `verification-quality` skill (19.6KB, "truth scoring... 0.95 accuracy threshold... automatic rollback system") looked like the closest thing to "verification of AI/agent-built work" by name but **was not read in full** — flagged [UNVERIFIED CONTENT, size/description only].

### 3. Others (light notes)

- `vasilyu1983/AI-Agents-public` — `qa-testing-strategy` skill within a much larger general-purpose dev-agent framework (backend/frontend/ops/qa/dev-workflow all as peers). Content read (~60 lines) is competent — risk-based scope statement, "Use Instead" disambiguation table, quality-gate/flake-SLO/quarantine-with-expiry language similar in spirit to the top two but shallower and generalist. Classify as technique/partial-router embedded in a non-QA-specific monolith — not a dedicated competitor.
- `javalenciacai/QASkills` — a 7-phase QA lifecycle orchestrator skill (`senior-qa-engineer`) that *delegates* to skills named `user-story-verifier`, `test-design-istqb`, `test-execution-manager`, `defect-lifecycle-manager`, `cicd-testing-integration`, `qa-process-improvement` — but this single-skill repo only contains the router file itself; the referenced skills were not found as separate repos in this scan and may not exist publicly. Thin, 4 stars — low signal, but the *pattern* (ISTQB-grounded lifecycle router) is worth noting as a design idea.
- `PramodDutta/qaskills` — is a **commercial QA-skills directory/marketplace product** ("The Testing Academy"), not primarily a single competing skill. Its repo literally contains `COMPETITOR-ANALYSIS.md` and `SEO-STRATEGY.md`, i.e. it's building a business around cataloguing QA skills. Worth knowing this exists as an ecosystem player (185 stars, very actively pushed — 2026-07-25, i.e. yesterday) but out of scope for a single-skill deep-read; flagged for awareness only.
- `mattpocock/skills@qa` — confirmed **deprecated** (`skills/deprecated/qa/SKILL.md`), and even when live it was a "user narrates bugs conversationally → agent files GitHub issues" tool, not test strategy. Despite the eye-catching 169.9K install figure (repo-wide, not skill-specific), not a competitor.

---

## (d) Liftable-artifact list

All items below are MIT-licensed per verified LICENSE files; cite source + note the license on reuse.

1. **Risk scoring → effort allocation table** (probability×impact 1-5 scale, 4 tiers, 60/25/10/5% effort split). Source: `proffesor-for-testing/agentic-qe`, `.claude/skills/risk-based-testing/SKILL.md`. https://github.com/proffesor-for-testing/agentic-qe/blob/main/.claude/skills/risk-based-testing/SKILL.md — MIT.
2. **Impact×Likelihood 5x5 risk matrix banded to testing-action/automation/monitoring policy** (CRITICAL 15-25 / HIGH 10-14 / MEDIUM 5-9 / LOW 1-4). Source: `petrkindlmann/qa-skills`, `skills/test-strategy/SKILL.md`. https://github.com/petrkindlmann/qa-skills/blob/main/skills/test-strategy/SKILL.md — MIT.
3. **Go/No-Go release checklist skeleton** (automated checks / manual checks / risk assessment, each item evidence-backed) + smoke-test-suite design (5-8 critical-journey tests) + rollback criteria tied to DORA change-failure-rate/MTTR targets. Source: `petrkindlmann/qa-skills`, `skills/release-readiness/SKILL.md`. Same repo/license as above.
4. **"Coverage equality is not redundancy" principle + mutation-testing-as-subsumption-proof + quarantine-grace-period-then-delete-with-sign-off workflow + audit record requirement.** Source: `petrkindlmann/qa-skills`, `skills/test-suite-curation/SKILL.md`. Same repo/license.
5. **Regenerability / "Deletion Test" gate concept** (mutation score discounted by durability tier: durable > live > ephemeral > none) as a sharper alternative to raw coverage-as-a-lie. Source: `proffesor-for-testing/agentic-qe`, `.claude/skills/qe-quality-assessment/SKILL.md` (references ADR-113 in that repo — ADR itself not fetched). MIT.
6. **Test-health metrics table** (pass rate / flakiness rate / MTTR / execution time / coverage delta, each with target + alert threshold) + "flakiness rate is underreported" gotcha. Source: `proffesor-for-testing/agentic-qe`, `.claude/skills/test-metrics-dashboard/SKILL.md`. MIT.
7. **Weighted quality-score rubric** (coverage 0.25 / code quality 0.20 / security 0.25 / reliability 0.20 / documentation 0.10 → A-F grade). Source: `proffesor-for-testing/agentic-qe`, `.claude/skills/qe-quality-assessment/SKILL.md`. MIT. (Use with caution — this is code/CI-centric, not product-surface-level.)
8. **SFDIPOT (James Bach's HTSM Product Factors)** as a systematic requirements/test-idea generator — public-domain testing heuristic; this repo's specific writeup (subcategories, sample test ideas, priority-distribution quality gates) is MIT-licensed. Source: `proffesor-for-testing/agentic-qe`, `.claude/skills/sfdipot-product-factors/SKILL.md`.
9. **`qa-do` router pattern itself** — "route to 1-2 skills, in order, never a pile" + explicit `Not for / Related` disambiguation frontmatter convention on every skill — a good design pattern to imitate for keeping a router honest and low-noise as the family of skills grows. Source: `petrkindlmann/qa-skills`, `skills/qa-do/SKILL.md`. MIT.
10. **Bug report severity taxonomy + formula template** (Title formula, Severity/Environment/Expected/Actual/Steps/Impact sections). Source: `proffesor-for-testing/agentic-qe`, `.claude/skills/bug-reporting-excellence/SKILL.md`. MIT.

---

## (e) What I could NOT verify, and why

- **Star counts / install counts / license for**: `ruvnet/claude-flow`, `jasonkneen/kiro`, `catlog22/claude-code-workflow`, `alvarovillalbaa/agent-suite`, `softaworks/agent-toolkit`, `anthropics/knowledge-work-plugins`, `anthropics/skills`, `wshobson/agents`, `trailofbits/skills`, `jwilger/agent-skills`, `aj-geddes/useful-ai-prompts`, `secondsky/claude-skills`, `owl-listener/designer-skills`, `donchitos/claude-code-game-studios`, `aaronontheweb/dotnet-skills`, `rrezartprebreza/spring-boot-skills`, `jabrena/cursor-rules-java`, `hashicorp/agent-skills`, `dbt-labs/dbt-agent-skills`, `dotnet/skills`, `melodic-software/claude-code-plugins`, `modu-ai/moai-adk`, `qodex-ai/ai-agent-skills` (license came back null via API — genuinely no LICENSE file confirmed, or API gap — [UNVERIFIED, needs a direct repo LICENSE read]). Reason: time/budget triage — install counts from `skills find` output are recorded in the table but repo-level metadata (`gh api repos/OWNER/REPO`) was not called for all of these; prioritized the two leaders plus enough breadth to be confident about classification.
- **`agentic-qe`'s `verification-quality` skill full content** (19.6KB — the most promising "verification of AI/agent-built work" candidate by name/size) — only its size was checked, not its body. [UNVERIFIED CONTENT]
- **`petrkindlmann/qa-skills`'s `references/*.md` files** (e.g. `diagrams-and-worksheets.md`, `strategy-templates.md`, `heuristics-and-automation.md`) — referenced repeatedly by the SKILL.md files as containing the actual worked examples and full risk-matrix tables, but not fetched. The SKILL.md bodies themselves were read in full or near-full; the references directories were not.
- **Whether `exploratory-testing` (petrkindlmann) names the "oracle problem" explicitly** — only the first ~50 lines were read; the file likely continues.
- **`gh search code`** hit GitHub's search-API rate limit partway through (403, "API rate limit exceeded for user ID..."), which blocked one lookup (`qodex-ai/ai-agent-skills` skill path). Regular `gh api repos/...` content reads were unaffected and used as the primary method throughout.
- **WebSearch budget**: 0 of the 10-call cap was used — the `npx skills find` CLI plus `gh api` were sufficient for full coverage in this territory. No WebSearch calls were needed or made.

---

## (f) Full search log

All via `cd /tmp && npx -y skills find "<query>"`, skills CLI v1.5.18. Each entry: query → number of results shown (CLI caps at ~6 per query) and whether genuinely new candidates surfaced.

1. "quality assurance" → 6 hits (daffy0208, qodex-ai, ruvnet/claude-flow, jasonkneen/kiro, catlog22, alvarovillalbaa)
2. "test strategy" → 6 hits (anthropics/knowledge-work-plugins, marketcalls, wshaddix, vasilyu1983, neolabhq, proffesor-for-testing)
3. "QA" → 6 hits (mattpocock, firecrawl, github/awesome-copilot, affaan-m, lijigang, softaworks)
4. "testing" → 6 hits (anthropics/skills, coreyhaines31, samber, wshobson, clerk, wshobson)
5. "test plan" → 6 hits (softaworks, api/git, github/awesome-copilot, owl-listener ×3)
6. "exploratory testing" → 6 hits (petrkindlmann, proffesor-for-testing ×2, naodeng, copyleftdev, j4flmao)
7. "regression testing" → 6 hits (affaan-m, aj-geddes, proffesor-for-testing, donchitos, editframe ×2)
8. "defect triage" → 6 hits (sharpdeveye, javalenciacai, bsene, chatmaterials, ukkuru, imminaa)
9. "flaky tests" → 6 hits (donchitos, tuist, posthog, streamlit, smithery.ai, kvet)
10. "code coverage" → 6 hits (aaronontheweb, levnikolaevich, eyadsibai, kevintsengtw, jeremylongshore, amplicode)
11. "test pyramid" → 6 hits (proffesor-for-testing ×2, rrezartprebreza, geb-algebra, melodic-software, modu-ai)
12. "mutation testing" → 6 hits (trailofbits, aj-geddes, secondsky, citypaul, jwilger, proffesor-for-testing)
13. "contract testing" → 6 hits (aj-geddes, secondsky, petrkindlmann, patricio0312rev, vasilyu1983, proffesor-for-testing)
14. "test automation" → 6 hits (apifox, aj-geddes ×2, fugazi, sickn33, proffesor-for-testing)
15. "unit testing" → 6 hits (dbt-labs, aj-geddes, bmad-labs, krutikjain, umbraco, jabrena)
16. "acceptance testing" → 6 hits (hashicorp, jabrena ×3, oxc-project)
17. "BDD" → 0 hits
18. "test case design" → 0 hits
19. "release readiness" → 0 hits
20. "quality gate" → 0 hits
21. "risk-based testing" → 0 hits
22. "quality" → 6 hits (addyosmani ×4, wshobson) — mostly W3 territory (a11y/seo/perf)
23. "verification" → 6 hits (obra/superpowers, caffeinelabs, affaan-m ×3)
24. "test data" → 6 hits (cognitedata, tursodatabase, aj-geddes, cinience ×3)
25. "negative testing" → 6 hits (dotnet, jaygptpro, lyndonkl, lvlup-sw, darrenhinde, solvelab)
26. "oracle problem" → 6 hits (all "oracle" the AI-model-router skill, not testing-oracle — false positive keyword collision)
27. "suite health" → 6 hits (pramoddutta/qaskills, xiduzo, claude-dev-suite, j4flmao, others — mostly false positives)
28. "quarantine tests" → 6 hits (parcadei, petrkindlmann/test-reliability, donchitos, smithery.ai, mergifyio, dadbodgeoff)
29. "coverage as a lie" → 6 hits (mostly false positives — owainlewis, alexander-danilenko, milosmilicevicsf/sdet-skills, 2389-research, bjcoombs, tenfoldmarc)
30. "test data management" → 0 hits
31. "compatibility matrix" → 0 hits
32. "NFR testing" → 0 hits
33. "verify AI generated code" → 0 hits
34. "severity priority triage" → 0 hits
35. "bug lifecycle" → 0 hits
36. "integration testing" → 0 hits
37. "sdet" → 0 hits

**Coverage assessment**: 37 CLI queries run (well above the suggested 15-20 floor), zero WebSearch calls used. The CLI's search appears keyword/fuzzy-matched against skill names+descriptions with a hard ~6-result cap per query and no pagination, so some queries (especially multi-word phrases like "test case design," "quality gate," "release readiness") returned zero hits even though matching skills exist (e.g. `petrkindlmann/qa-skills` has both `release-readiness` and skills implying quality gates) — discovered these via repo hydration, not the CLI. This means the CLI likely under-reports recall for compound-phrase queries; single-word and common-bigram queries were more reliable. Given this, the repo-level hydration of the two leading candidates (`petrkindlmann/qa-skills`, `proffesor-for-testing/agentic-qe`) was the higher-signal method once they surfaced, and I leaned on it accordingly.
