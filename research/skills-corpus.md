# `quality` skill — agent-skills ecosystem competitive corpus

**Channel:** find-skills / agent-skills-ecosystem
**Date of record:** 2026-07-26 — all install counts, star counts and `pushed_at` values are as of this date and are volatile
**Instrument:** `npx skills find` (skills.sh index) as primary discovery, `gh` CLI for repo hydration, LICENSE files read directly (never metadata fields alone), SKILL.md bodies read for every serious candidate
**Channel shape:** 1 lead (Opus) + 4 Sonnet workers on disjoint keyword territories. Raw worker reports: `_raw/skills-w1.md` (core testing & strategy), `_raw/skills-w2.md` (e2e/browser/mobile/compatibility), `_raw/skills-w3.md` (non-functional verification), `_raw/skills-w4.md` (AI-eval + release-gate + process).
**Provenance convention:** claims marked **[lead-verified]** were read directly by the lead; **[W1]**/**[W2]**/**[W3]**/**[W4]** are worker-reported and carry that worker's own verification note. `[UNVERIFIED]` means nobody confirmed it.
**Web budget:** the shared session WebSearch budget was near exhaustion at channel start. **Zero WebSearch calls were used by the lead or by W1/W2/W3** — the skills.sh CLI plus `gh api` proved sufficient. See §7 for what this costs us.

---

## 1. Wedge verdict

> ### **NARROW.**
>
> A genuinely neutral, vendor-agnostic QA router **already exists and is good**: `petrkindlmann/qa-skills` (MIT, 50 skills, 15,637 lines) ships an explicit routing skill (`qa-do`), risk scoring that drives coverage allocation (`risk-based-testing`, `test-strategy`), a 443-line evidence-based go/no-go gate (`release-readiness`), suite-health economics (`test-suite-curation`), and per-NFR measure-and-gate skills. It is not a technique pack and it is not a vendor pack. Calling this wedge OPEN would be flattery.
>
> The wedge is **not CLOSED**, because no pack — that one included — assembles the whole discipline into one **vendor-neutral, surface-aware, evidence-producing** decision. Four independent channels converged on the same verdict from four disjoint keyword territories, which is the strongest signal this corpus contains.

**All four channels' independent reads:**

| Channel | Territory | Verdict |
|---|---|---|
| Lead | cross-cutting + deep-read of the two leaders | NARROW |
| W1 | core testing & test strategy | *"NARROW, leaning toward the edge of CLOSED for one specific competitor"* |
| W2 | e2e / browser / mobile / compatibility | *"OPEN-leaning-NARROW"* in-lane; flagged the cross-lane risk explicitly |
| W3 | a11y / perf / security / privacy | NARROW — *"partial routers exist per-NFR-domain; a genuine cross-domain, vendor-neutral assurance router was not found"* |
| W4 | AI-eval + release gate + process | NARROW — *"no pure, thin, vendor/technique-neutral assurance router was found anywhere in the scanned ecosystem"*, but *"real, well-built competitive pressure exists on specific facets"* |

**W4's framing is the sharpest statement of the opening and is adopted here:** every serious candidate is either a single-facet process card, or a **large, thick, maximalist QA *collection*** that bundles the router-like pieces together with dozens of technique skills in one package. *"Nobody has cleanly separated 'decide what verification is warranted + produce the gate decision' from 'do the verification techniques.'"* The two leaders are closer in spirit to what our whole *family* does collectively than to a single lean `quality` skill.

### What this skill is that `qa-skills` is not

> `qa-skills` is a **QA department in a box** — fifty skills that will write your Playwright tests, write your unit tests, stand up your CI, run your canary, and also, among those fifty, help you decide what to test and whether to ship. `quality` is not a department; it is **the independent verification function of a product family that already builds**. It writes no tests, because `frontend`, `backend`, `ai` and `data` already own construction-side testing. What it owns instead is the layer no pack in the ecosystem has written down: given a product, its surfaces, and a risk profile, decide *what verification is warranted, at what altitude, and what will deliberately go unverified*; produce **independent evidence** with its states named (`observed` / `inferred` / `not_tested` / `blocked`) rather than a green tick; and convert that evidence into two separate decisions — *may we ship* and *what may we claim* — with the residual risk written down, owned, and given an expiry. `qa-skills` answers "how do I test this?" fifty times, very well. `quality` answers "how do I know, and how would I know I was wrong?" once, and refuses to answer the first question at all.

### The five strongest pieces of evidence

**1. A neutral router exists, and it is genuinely a router — not a library index.** **[lead-verified]** `petrkindlmann/qa-skills@qa-do` describes itself verbatim as a *"Routing skill of last resort. Takes a plain-language QA situation and names the right 1-2 skills to use and in what order."* It carries a 47-row situation→skill table, four named disambiguation pairs, an anti-pattern list, and a self-declared staleness invariant. Its three core principles:

> 1. **Route to the most precise skill, not the nearest neighbor.** A vague match to a broad skill is worse than a direct hit on a narrow one.
> 2. **One or two skills, in order — never a pile.** … Routing to three skills means the situation is ambiguous — ask a clarifying question instead.
> 3. **The routing table is the source of truth, and it goes stale.** This router is uniquely prone to drift: every skill added to `skills/` is a row that may be missing here.

Its table already contains our headline flow: *"What should we test before this release?"* → `risk-based-testing` → `release-readiness`, ordered *"Risk first, then checklist."*
Source: https://github.com/petrkindlmann/qa-skills/blob/main/skills/qa-do/SKILL.md · MIT (LICENSE read: *"MIT License / Copyright (c) 2026 Petr Kindlmann"*)

**2. The claimed exclusive territory is already ~70% occupied by that one repo — more than my first pass suggested.** Mapping the brief's exclusive-territory list against its 50 skills: test strategy → `test-strategy` + `test-planning`; risk-based altitude allocation → `risk-based-testing` (Impact×Likelihood 5×5 → CRITICAL/HIGH/MEDIUM/LOW bands, each tied to a testing-action/automation/monitoring policy) **[W1]**; release decision → `release-readiness`; defect lifecycle → `ai-bug-triage` + `bug-reproduction`; suite & signal health → `test-suite-curation` + `test-reliability` + `coverage-analysis`; test data & environments → `test-data-management` + `test-environments`; **compatibility matrix → `cross-browser-testing` + `mobile-testing`, with a real analytics-driven P0/P1/P2 traffic-tier table** **[W2]**; NFR measurement → `performance-testing`, `accessibility-testing`, `security-testing`, `compliance-testing`, all explicitly framed as *measure-and-gate, not fix* **[W3]**. Only the adversarial/independent method and the judgment layer are weakly held.

> **Correction to an earlier reading.** A grep for the literal phrase *"compatibility matrix"* returns zero hits in that repo, and I initially recorded compatibility-matrix strategy as an ecosystem gap. W2's deep read shows the capability is present and well-built under different names — including the rule *"A row with no ticket and no fallback is an open bug, not a documented issue"* and the discipline *"Playwright's WebKit is not Safari… Report 'WebKit coverage,' not 'Safari coverage.'"* Phrase-absence is not capability-absence, and the gap claim does not survive.

**3. But the judgment layer is genuinely empty — verified by exhaustive grep across all 50 skills and their `references/`.** **[lead-verified]**

| Concept | Occurrences in `petrkindlmann/qa-skills` |
|---|---|
| `residual risk` | **0** |
| `oracle problem` | **0** (one incidental "test oracle" inside an `ai-test-generation` prompt-patterns reference) |
| `what not to test` | **0** |
| `evidence dossier` / `dossier` | **0** |
| `abuse case` | **0** |
| `suite runtime budget` | **0** |

The techniques are covered in depth. What is missing is the layer that decides *which* verification a given risk profile warrants, *what is deliberately left unverified*, and *what risk remains after the gate*. W1 reaches the same conclusion structurally: no repo found does risk-based altitude allocation **and** an evidence dossier **and** a residual-risk statement **and** the oracle problem **and** defect lifecycle **and** suite health **and** compatibility **and** NFR-against-someone-else's-budget **and** agent-work verification *"as one coherent, vendor-neutral, technique-agnostic package that stays above the techniques."*

**4. The high-adoption options are all either vendor-locked or thin — there is no neutral *and* popular assurance router.** **[lead-verified]**
- `proffesor-for-testing/agentic-qe` — **421★**, MIT, 105–124 skills, `pushed_at` 2026-07-24. Far more adopted than qa-skills (44★), but its skills are command documentation for its own `aqe`/`ruflo` CLI and 19-agent fleet: `aqe quality assess --scope src/ --gates all`, `npx ruflo@alpha truth`. Adopting one skill means adopting the fleet **[W1]**.
- `anthropics/knowledge-work-plugins@testing-strategy` — Apache-2.0, repo 23,048★, 4.9K installs, `pushed_at` 2026-07-26. The highest-provenance testing-strategy skill in the ecosystem is **~35 lines**: a testing-pyramid ASCII diagram, four strategy-by-component bullets, a "Focus on / Skip" pair, and a one-line output spec. **[lead-verified]** Notably it *does* contain primitive versions of two things we claim — a surface facet (*"API endpoints / Data pipelines / Frontend / Infrastructure"*) and a what-not-to-test line (*"Skip: trivial getters/setters, framework code, one-off scripts"*) — as a sketch, not a discipline.
- `wshobson/agents` — 38,235★ repo, 9.7K/8.2K installs on its a11y skills, but W3's read confirms technique-pack content that *"explicitly mixes 'auditing' and 'fixing'"*; the install count is marketplace visibility, not depth **[W3]**.
- `mattpocock/skills@qa` — 169.9K historical installs but **confirmed deprecated** (`skills/deprecated/qa/SKILL.md`) and never test strategy — a conversational bug-filing tool **[W1]**.

**5. The measure-vs-fix split and the evidence dossier are validated by independent authors — but only inside accessibility.** **[W3]** This is the most important nuance in the corpus, and it cuts both ways.
- `community-access/accessibility-agents` (MIT, 367★, v6.0.0, `pushed_at` 2026-07-25) cleanly separates measure from fix: `playwright-verifier` is *"a **read-only** agent — you never edit source files"* reporting **PASS / FAIL / REGRESSION**; `ci-accessibility` offers Strict/Standard/Baseline gating; `accessibility-regression-detector` classifies **Regressed / New / Persistent / Fixed**; `accessibility-lead` *"make[s] the ship/no-ship decision."* That is assurance-router behaviour.
- `sylphxai/skills@accessibility-conformance-program-review` (MIT, 1★, 40 installs) is shaped almost exactly like our brief: it distinguishes **`observed` / `inferred` / `not_tested` / `blocked`** evidence states, holds the guardrails *"Never claim conformance from automated scans alone"* and *"Never average away a blocker that prevents a disabled user from completing a core task,"* and outputs an Authority ledger + requirement-to-evidence matrix + issue portfolio + claim/release/exception decisions.

W3's synthesis: skills that do the measure/decide split correctly are *"a small, real minority — not the default posture of the ecosystem — and none of them do it across more than one NFR domain at once."* So the *pattern* is proven to be wanted and buildable; the *generalisation* is unbuilt.

**6. The flagship collections are empty of QA and gate skills entirely.** **[W4]** W4 enumerated the nine named multi-skill collections directly:

| Collection | Stars | QA / verification / gate member? |
|---|---|---|
| `anthropics/skills` | 164,233 | **No.** 17 skills; only `webapp-testing` touches testing at all (browser/UI, not gate). **No LICENSE file at repo root.** |
| `vercel-labs/agent-skills` | 29,488 | **No.** 7–9 skills, zero QA presence. **No LICENSE file at root.** |
| `ComposioHQ/awesome-claude-skills` | 70,796 | **No.** 24+ dirs, all content/growth/ops; only `webapp-testing`. **No LICENSE file at root.** |
| `obra/superpowers` | 261,332 | Yes — `verification-before-completion` + code-review pair (see §3.6) |
| `ruvnet/claude-flow` | 66,036 | One — `verification-quality`, self-referential to its own `ruflo` tool |
| `qodex-ai/ai-agent-skills` | 37 | Several by name — **licence is Proprietary**, confirmed via `LICENSE.txt` |
| `daffy0208/ai-dev-standards` | 32 | Several by name; repo shows abandonment signals (pushed 2025-12-25) |
| `jasonkneen/kiro` | 717 | One — spec-phase-gated partial router |
| `catlog22/claude-code-workflow` | 2,142 | Two — `ship` (release *engineering*), `team-quality-assurance` |

The three highest-distribution, highest-provenance collections in the ecosystem — Anthropic's own, Vercel's, and the most-starred community catalogue — ship **no quality, QA, release-gate, or defect-triage skill of any kind**. Whatever else is true, the flagship shelf is bare.

### The flagship argument, in one move

Take the three numbers together, because separately each is a curiosity and together they are the case:

| | |
|---|---|
| **261,332★** | `obra/superpowers@verification-before-completion` — *"NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE."* A single-agent, single-session discipline card. **[W4]** |
| **0** | QA, gate, triage or verification skills in `anthropics/skills` (164K★), `vercel-labs/agent-skills` (29K★), `ComposioHQ/awesome-claude-skills` (71K★) combined. **[W4]** |
| **44★** | The one vendor-neutral pack that actually routes across assurance dimensions. **[lead-verified]** |

**The problem is validated at enormous scale, and nobody has built a router over it.** A quarter of a million stars say the ecosystem knows agents claim work is done without evidence — that is as strong a demand signal as this ecosystem produces. What exists to meet it is one rule about what an agent may say in a single message. Above that rule there is nothing: no allocation of verification effort by risk, no evidence whose states are named, no dossier, no release decision, no residual risk. The flagship collections that would normally absorb such a need have not touched it. The one pack that has real assurance depth has 44 stars and cannot separate verification from construction because it is standalone.

That gap — between a discipline card at 261K★ and a 44★ router that must also write your unit tests — is the wedge. It is narrow because the 44★ pack is genuinely good, and it is real because nothing occupies the space between them.

### What would change my mind

**Toward CLOSED.** If `petrkindlmann/qa-skills` adds a residual-risk statement, an evidence dossier binding strategy→evidence→decision, and surface-faceted routing, the wedge shuts. This is a live risk, not a hypothetical: single-author, actively maintained, already at v2.0 skill versions, already shipping `evals/` and a public site (qa-skills.com), and it already has the router file such additions would slot into. W1 independently rated it *"leaning toward the edge of CLOSED."*

**Toward OPEN.** If `release-readiness` and `risk-based-testing` were thin templates I would upgrade to OPEN. I read both in full and they are **not** thin — 443 and 337 lines respectively, with baseline-relative rollback thresholds, staged-rollout promotion criteria, a versioned auditable sign-off artifact, and a six-phase risk workflow. I cannot argue them away.

**A caution against our own novelty claims.** Three artifacts in the wild are at least as good as what the family currently plans. Two from `agentic-qe`:
- `agentic-qe@qe-court` — a three-valued **SHIP / REMAND / BLOCK** verdict from independent cross-vendor adversaries, where *"a passing grade is the claim under attack, not the finish line"* and any SHIP must survive an escalating deeper reviewer. **[lead-verified]**
- `agentic-qe@qe-quality-assessment` — the **regenerability / "Deletion Test"** gate: *"coverage measures lines executed; mutation score measures whether the tests would notice a bug; regenerability answers the Deletion Test — 'if this module were deleted and regenerated, would a wrong rebuild be caught?'"* **[W1]**

And a third, from the most-starred repo in the entire scan **[W4]** — `obra/superpowers@verification-before-completion` (MIT, **261,332★**):

> **NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE.** If you haven't run the verification command in this message, you cannot claim it passes.

The family cannot claim novelty for adversarial independent review producing a ship verdict, for coverage-as-a-lie, or for "don't trust an agent's claim that it verified something." It can claim novelty for putting them **above the techniques, across surfaces, under one evidence dossier, with a residual-risk statement attached**.

---

## 2. The competitive map

**T** = technique pack · **V** = vendor pack · **PR** = partial router · **AR** = assurance router

### Tier 1 — genuine competitors

| Name | URL | Owner | License (source) | Signals | Class | Scope covered | Scope missing |
|---|---|---|---|---|---|---|---|
| **qa-skills** (50 skills, 15,637 lines) | https://github.com/petrkindlmann/qa-skills | Petr Kindlmann | MIT (LICENSE read) | 44★, 10 forks, created 2026-03-23, pushed 2026-06-10; 8–511 installs/skill | **PR** | Router (`qa-do`); risk→coverage allocation; go/no-go gate w/ auditable artifact; defect triage + repro; flake/quarantine; suite curation w/ mutation proof; coverage; test data; environments; browser/device tier matrices; perf/a11y/security/privacy as measure-and-gate | Residual risk; oracle problem; what-NOT-to-test doctrine; evidence dossier; abuse cases; **surface-faceted routing**; quality↔operate boundary; cross-domain NFR synthesis; blends construction (`unit-testing`, `playwright-automation`) with verification |
| **agentic-qe** ("Agentic QE Fleet") | https://github.com/proffesor-for-testing/agentic-qe | Agentic QE Contributors (framework by Dragan Spiridonov) | MIT (LICENSE read) | **421★**, 75 forks, created 2025-09-11, pushed 2026-07-24. Skill count is reported inconsistently — see note below the table | **V** | `qe-court` SHIP/REMAND/BLOCK; regenerability gate; risk→effort allocation (60/25/10/5%); SFDIPOT/HTSM; mutation, compatibility, localization, chaos, contract, mobile, a11y; trust-tier + eval infrastructure; evidence ZIPs; 3-way exit codes | **Vendor-neutrality** (bound to `aqe`/`ruflo` CLI, 19-agent fleet, own MCP namespaces, own ADRs); product-surface routing; residual-risk statement; whole-product (vs diff/CI) scope |
| **accessibility-agents** (≈80 sub-skills) | https://github.com/community-access/accessibility-agents (= `taylorarndt/a11y-agent-team`) | Taylor Arndt | MIT (LICENSE read) **[W3]** | 367★, v6.0.0, pushed 2026-07-25; 127–221 installs/sub-skill | **PR** (a11y-only) | Read-only independent verification (PASS/FAIL/REGRESSION); Strict/Standard/Baseline CI gating; Regressed/New/Persistent/Fixed classification; VPAT/508/EN 301 549/EAA/AODA mapping; ship/no-ship lead | Everything outside a11y; also ships an autonomous `web-issue-fixer`, so the *suite* mixes fix and measure |
| **sylphxai/skills@accessibility-conformance-program-review** | https://github.com/sylphxai/skills | SylphxAI | MIT (LICENSE read) **[W3]** | 1★, 40 installs, pushed 2026-07-26; one of ~110 uniformly-named "X-review" skills — **authorship provenance `[UNVERIFIED]`, possibly templated/bulk-generated** | **PR** (a11y-only) | Closest single artifact to our brief: observed/inferred/not_tested/blocked evidence states; authority ledger; requirement-to-evidence matrix; issue portfolio; claim/release/exception decisions | Explicitly single-domain; explicitly refuses *"generic QA planning"*; negligible adoption |

> **Note on agentic-qe's size.** Three sources disagree: its own `TRUST-TIERS.md` says **105 skills** but was generated 2026-02-02; W1's live count is **124**; W4 reads `skills-manifest.json` as `"totalSkills": 50` (Tier-3-verified) and `"totalQESkills": 82`, against **140+ directories** on disk, the remainder being `qcsd-*-swarm`, `n8n-*`, `agentdb-*`, `flow-nexus-*`, `v3-*`, `github-*` internal machinery rather than user-facing quality guidance. **Use W4's numbers**: ~82 QE skills, 50 of them verified, inside a 140+-directory tree. The discrepancy is itself a finding — the collection's own metadata has drifted.

### Tier 1b — process/gate partial routers **[W4]**

| Name | URL | Owner | License | Signals | Class | Note |
|---|---|---|---|---|---|---|
| `obra/superpowers@verification-before-completion` | https://github.com/obra/superpowers | obra | MIT | **261,332★** — the most-starred repo touching our scope, by a wide margin | **T** | *"NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE."* A single-agent, single-session discipline card with a rationalization-prevention table. Governs how an agent talks about its own work in the moment — not how a team decides a product is ready. See §3.6 |
| `aws/agent-toolkit-for-aws@analyzing-release-readiness` | https://github.com/aws/agent-toolkit-for-aws | AWS | Apache-2.0 (skill) | 2,123★, pushed 2026-07-24 | **V** | Orchestrates calls to a **proprietary hosted "AWS DevOps Agent"** (`aws_devops_agent__create_release_readiness_review`). Apache-2.0 skill wrapping an AWS-hosted backend. **Release-readiness-as-a-vendor-service is a live commercial pattern** — a "who else is selling this" data point |
| `athola/claude-night-market@release-health-gates` | https://github.com/athola/claude-night-market | athola | MIT | 323★, pushed 2026-07-26 | **PR** | Four gate categories (Scope & Risk / Quality Signals / Comms & Docs / Operations) → a Release Gate markdown snippet in the PR + a persisted "rollout scorecard" for retros. Checklist-only: no independent evidence generation, no adversarial verification, no risk-based allocation |
| `catlog22/claude-code-workflow@ship` | https://github.com/catlog22/claude-code-workflow | catlog22 | MIT | 2,142★, pushed 2026-06-18 | **PR** | 7 blocking phases (Pre-Flight → AI Review → Version Bump → Changelog → PR → Publish → GitHub Release) + `preflight-report.json`. Centre of gravity is release *engineering* — the CI/CD territory the brief excludes |
| `jasonkneen/kiro@quality-assurance` | https://github.com/jasonkneen/kiro | jasonkneen | MIT | 717★, pushed 2026-01-12 | **PR** | Phase-gated validation tied to Kiro's own spec-driven methodology (Requirements → Design → Tasks). The "quality gate tied to a proprietary process" pattern |
| `addyosmani/agent-skills@code-review-and-quality` | https://github.com/addyosmani/agent-skills | Addy Osmani | MIT | **80,413★**, pushed 2026-07-26 | **T** | Five-axis diff review (Correctness / Readability / Architecture / Security / Performance). **Explicitly out of our scope** per the brief. Listed because its star count proves the adjacent code-review niche is thoroughly occupied — and because it confirms that niche stops at the diff and never reaches release-readiness, triage, or strategy |
| `naodeng/awesome-qa-skills` | https://github.com/naodeng/awesome-qa-skills | naodeng | **GPL-3.0** | 137★, pushed 2026-04-25 | collection `[UNVERIFIED]` | `skills/` splits into `en`/`zh` locale dirs; contents not enumerated within budget. **Copyleft — flag before any reuse.** The largest unread QA collection in the corpus |

### Tier 2 — notable, non-competing

| Name | URL | Owner | License | Signals | Class | Note |
|---|---|---|---|---|---|---|
| `anthropics/knowledge-work-plugins@testing-strategy` | https://github.com/anthropics/knowledge-work-plugins | Anthropic | Apache-2.0 | repo 23,048★, 4.9K installs, pushed 2026-07-26 | **T** | **~35 lines.** Highest provenance, near-zero depth. Sibling skills `deploy-checklist`, `incident-response` sit separately — Anthropic also splits quality-ish from operate-ish **[lead-verified]** |
| `fugazi/test-automation-skills-agents` (9 skills) | https://github.com/fugazi/test-automation-skills-agents | Douglas Urrea Ocampo | MIT (LICENSE read) | 202★, 36 forks, pushed 2026-07-26 | **T** collection | `qa-manual-istqb` = full ISTQB CTFL lifecycle incl. **Test Completion**, traceability matrix, `templates/test-summary-report.md` — nearest evidence-dossier precedent. Tool-coupled, no router **[lead-verified]** |
| `donchitos/claude-code-game-studios` (QA cluster) | https://github.com/donchitos/claude-code-game-studios | donchitos | MIT `[license body not read]` | **23,397★**, pushed 2026-05-21; skills 198–202 installs | **V** (domain) | `test-evidence-review` yields **ADEQUATE / INCOMPLETE / MISSING** per story and maps story-type→evidence-type. Hard-coded to `production/qa/`, `production/epics/` **[lead-verified]** |
| `addyosmani/web-quality-skills@web-quality-audit` | https://github.com/addyosmani/web-quality-skills | Addy Osmani (Google Chrome) | MIT (LICENSE read) **[W3]** | 2,543★, 17.8K installs, pushed 2026-06-14 | **T** | Highest-profile author found. Confirmed fix-oriented (*"**Fix:** Specific code change"*), no independent-evidence concept, no gate **[W3]** |
| `lambdatest/agent-skills` (~50 skills) | https://github.com/lambdatest/agent-skills | LambdaTest / TestMu AI | MIT (LICENSE read) **[W2]** | 335★, pushed 2026-07-24; appium 304 installs | **V** | Generates test code that runs on TestMu AI cloud. Classic vendor pack **[W2]** |
| `currents-dev/playwright-best-practices-skill` | https://github.com/currents-dev/playwright-best-practices-skill | Currents.dev | MIT (LICENSE read) **[W2]** | 340★, **64.8K installs**, pushed 2026-07-21 | **T** | Vendor-published but not vendor-locked; ~40 reference files. Construction framing, not gate. Has `debugging/flaky-tests.md` worth a follow-up read **[W2]** |
| `microsoft/playwright-cli@playwright-cli` | — | Microsoft | `[UNVERIFIED]` | **98.5K installs** — highest single-skill count found | **T** | Not hydrated **[W2]** |
| `wshobson/agents` (`wcag-audit-patterns`, `screen-reader-testing`, `e2e-testing-patterns`) | https://github.com/wshobson/agents | wshobson | MIT | 38,235★ repo; 9.7K / 8.2K / 19.9K installs | **T** | Mixes audit and fix; content thinner than qa-skills or community-access **[W3]** |
| `cypress-io/ai-toolkit` | https://github.com/cypress-io/ai-toolkit | Cypress.io | MIT | 37★; 3.3K/2.8K/2.6K installs | **V** | Official Cypress **[W2]** |
| `android/skills@testing-setup` | https://github.com/android/skills | Google | Apache-2.0 / custom | 6,357★, 677 installs | **T** | Pure scaffolding — on the brief's own exclusion list **[W2]** |
| `PramodDutta/qaskills` | https://github.com/PramodDutta/qaskills | Pramod Dutta ("The Testing Academy") | MIT (LICENSE read) **[W1]** | 185★, pushed 2026-07-25 | marketplace | **A commercial QA-skills directory business** — repo contains `COMPETITOR-ANALYSIS.md` and `SEO-STRATEGY.md`. An ecosystem *player*, not a competing skill **[W1]** |
| `mgifford/accessibility-skills` | https://github.com/mgifford/accessibility-skills | Mike Gifford | **AGPL-3.0** | 33★, pushed 2026-07-26 | **T** | **Copyleft — do not lift.** The only non-permissive licence found **[W3]** |
| `vasilyu1983/AI-Agents-public@qa-testing-strategy` | https://github.com/vasilyu1983/AI-Agents-public | Vasiliy Uvarov | MIT (LICENSE read) **[W1]** | 68★, 417 installs | **T**/PR-in-monolith | Competent quality-gate/flake-SLO content, shallower than the leaders **[W1]** |
| `javalenciacai/QASkills@senior-qa-engineer` | https://github.com/javalenciacai/QASkills | javalenciacai | MIT (LICENSE read) **[W1]** | 4★, 16 installs | thin orchestrator | 7-phase ISTQB lifecycle router that delegates to skills **that may not exist publicly**. The *pattern* is instructive; the artifact is a stub **[W1]** |
| `trailofbits/skills@mutation-testing` | https://github.com/trailofbits/skills | Trail of Bits | `[UNVERIFIED]` | 2.6K installs | **T** | Reputable security firm, single technique **[W1]** |
| `softaworks/agent-toolkit@qa-test-planner` | https://github.com/softaworks/agent-toolkit | softaworks | MIT | 2,238★, 4K installs | **T** `[UNVERIFIED depth]` | High reach, unread — flagged follow-up **[W1]** |

### Tier 3 — long tail (surfaced, classification `[UNVERIFIED]` unless noted)

`daffy0208/ai-dev-standards@quality-assurance` (175 inst, MIT, fuses code-quality enforcement with gates — *"exactly the boundary our skill should NOT blur"* **[W1]**) · `qodex-ai/ai-agent-skills@application-quality-assurance` (123 inst, **NO LICENSE FILE CONFIRMED** **[W1]**) · `ruvnet/claude-flow@verification-&-quality-assurance` (102 inst) · `404kidwiz/claude-supercode-skills@qa-expert` (153) · `jasonkneen/kiro@quality-assurance` (69) · `catlog22/claude-code-workflow@team-quality-assurance` (66) · `borghei/claude-skills@skill-tester` (128) · `alvarovillalbaa/agent-suite@quality-assurance` (6) · `tachyon-beep/skillpacks@using-quality-engineering` (7) · `milosmilicevicsf/sdet-skills` (4★) · `aj-geddes/useful-ai-prompts` (7+ testing skills, 400–800 inst each) · `secondsky/claude-skills` (303/343) · `hashicorp/agent-skills@run-acceptance-tests` (2.5K, V) · `dbt-labs/dbt-agent-skills` (626, V) · `dotnet/skills@test-tagging` (456) · `firebase/agent-skills` security-rules auditors (78K/20K, V, Firebase-only) · `harness/harness-skills@configure-dast-scan` (V) · `bagelhole/devops-security-agent-skills` (43★, 80+ skills) · `aaronontheweb/dotnet-skills@crap-analysis` (423) · `jabrena/cursor-rules-java@acceptance-tests` ×5 (150–170 each) · `tovimx/maestro-mobile-testing-skill` (774) · `charleswiltgen/axiom` iOS (1,091★) · `vabole/apple-skills@xcuitest` (291★) · `skydoves/android-testing-skills` (296★, Apache-2.0) · `klamping/webdriverio-skills` (5★) · `testdino-hq/playwright-skill` (332★, 4.7K) · agent-verification micro-packs: `pedronauck/skills@agent-output-audit` (99), `itallstartedwithaidea/agent-skills@verification-loops` (52), `thebushidocollective/han@proof-of-work` (44), `wojons/skills@trust-but-verify` (36), `aurite-ai/agent-verifier@verify-patterns` (26) · gate micro-packs: `oisincoveney/skills@quality-gate`, `terraphim/terraphim-skills@quality-gate`, `marcioaltoe/skills@evidence-gate` (20–26 each, **unread — the remaining coverage gap** **[W3]**).

### High star counts that do NOT close the wedge

The most likely challenge to this verdict is *"but look at these numbers."* Each is answered here, because an unanswered star count reads as a missed competitor.

| Pack | Signal | Why it does not compete |
|---|---|---|
| `obra/superpowers@verification-before-completion` | **261,332★** | Single-agent, single-session honesty rule. Governs how an agent narrates its own work in the moment; no router, no dossier, no altitude, no release decision. **[W4]** |
| `addyosmani/agent-skills@code-review-and-quality` | **80,413★** | Five-axis review **of a diff**. On the brief's own exclusion list. Confirmed to stop at the diff — never reaches release-readiness, triage, or strategy. **[W4]** |
| `wshobson/agents@wcag-audit-patterns` / `@screen-reader-testing` | 38,235★ repo; 9.7K / 8.2K installs | Confirmed **fix-oriented** — its own use-cases list mixes *"conducting accessibility audits"* with *"fixing WCAG violations."* Installs reflect marketplace visibility; content is thinner than qa-skills or community-access. **[W3]** |
| `donchitos/claude-code-game-studios` | **23,397★** | Stars are for the game-studio concept. QA cluster is hard-coded to `production/qa/`, `production/epics/` and a game story taxonomy. **[lead-verified]** |
| `anthropics/knowledge-work-plugins@testing-strategy` | 23,048★ repo, 4.9K installs | **~35 lines.** Highest provenance, near-zero depth. **[lead-verified]** |
| `addyosmani/web-quality-skills@web-quality-audit` | 2,543★, 17.8K installs | Lighthouse-categories teaching doc; own output format is *"**Fix:** Specific code change."* No independent-evidence concept, no gate. **[W3]** |
| `microsoft/playwright-cli` | **98.5K installs** | Single-tool technique pack. Unread, but scope is unambiguous from name and owner. **[W2]** |
| `currents-dev/playwright-best-practices-skill` | 64.8K installs | Generic Playwright *authoring* reference. Construction framing, not gate. **[W2]** |
| `mattpocock/skills@qa` | 169.9K historical installs | **Deprecated** (`skills/deprecated/qa/`), and never test strategy — a conversational bug-filing tool. **[W1]** |

**The pattern:** every high-adoption pack in our space is either a *tool* skill, a *fix* skill, a *diff* skill, or a one-line discipline card. Adoption in this ecosystem tracks tool demand and catalogue visibility, not assurance depth. The two packs with real assurance depth have 421★ and 44★.

**Negative results worth recording.** `npx skills find "quality gate"` → *"No skills found"* **[lead-verified, and W1 independently]**. Also zero-hit: `"release readiness"`, `"risk-based testing"`, `"test data management"`, `"compatibility matrix"`, `"BDD"`, `"test case design"`, `"integration testing"`, `"sdet"` **[W1]**; `"GDPR"`, `"SOC2"`, `"compliance evidence"`, `"audit trail"`, `"OWASP"`, `"k6"`, `"a11y"`, `"accessibility"`, `"performance"` **[W3]**; `"snapshot testing"`, `"cross-browser testing"`, `"device matrix"`, `"mobile app testing"`, `"ios testing"` **[W2]**.
**These are CLI recall artifacts, not ecosystem absence** — all three workers independently established that matching skills demonstrably exist for many of these queries. See §7.

---

## 3. Closest competitors

### 3.1 `petrkindlmann/qa-skills` — the reference competitor

- **URL:** https://github.com/petrkindlmann/qa-skills · site https://qa-skills.com · MIT (LICENSE read directly)
- **Size:** 50 skills, 15,637 lines of SKILL.md (~313 lines/skill), plus `references/` subtrees, `evals/`, `agents/`, `skills_index.json`
- **Signals:** 44★, 10 forks, created 2026-03-23, pushed 2026-06-10 (≈6 weeks stale). Per-skill installs 8–511.
- **Cross-tool posture:** frontmatter declares *"Tested with Claude Code, Codex, Cursor, Gemini CLI. Reads the project root; no network access required."*

**What it does well that we must match or beat.**

*Scope discipline as an engineering practice.* Every skill's `description` frontmatter carries an explicit `Not for: … Related: …` block, so the runtime's own matcher sees the exclusions. W1: this is *"deliberately engineered to avoid overlap between its own skills."* The family already does this; it is now table stakes, not differentiation.

*Suite-health economics, done properly.* `test-suite-curation` is the standout and directly pre-empts our coverage-as-a-lie claim **[W1]**:

> *"Test A and Test B cover the exact same lines, so a tired engineer deletes B — and three weeks later a production defect slips through because B was the only test that asserted the rounding was correct. **Coverage equality is not redundancy.**"*
> *"The only evidence that one test subsumes another is that the survivor catches the same faults, which you prove with mutation testing, not a coverage diff."*
> *"Deletion is destructive and must be reversible in practice. 'It's in git history' is not a recovery plan. Quarantine first…, observe for a defined window…, then delete with sign-off."*
> *"The agent's edge is whole-corpus analysis, not deletion authority… the agent *proposes*; a human *approves*."*

It produces *"a defensible 'what we deleted and why' record"* — an audit trail structurally like an evidence dossier, scoped to pruning.

*The gate produces an auditable artifact.* `release-readiness` **[lead-verified]**: *"Release confidence comes from evidence, not feelings. 'I think it's fine' is not a go/no-go criterion… If you can't point to data, you're not ready."* It requires the checklist be *"stored as a versioned artifact (e.g. `RELEASE-<version>.md` or a tracked issue) so sign-off is auditable,"* and its Done-When demands a *"named approver with a timestamp."* Its Risk Assessment block asks for change-scope category, blast radius, and revert complexity.

*NFR skills that measure rather than fix* **[W3]**: `performance-testing` — *"A report that says 'LCP is 3.2s' is information; a CI gate that fails the build at 2.5s is accountability… Budgets are only real if CI enforces them."* `compliance-testing` — *"Verify behavior, not the CMP… The CMP is an implementation detail; compliance is measured by behavior,"* with a regulatory table current through EU AI Act Art. 50 (2 Aug 2026). `accessibility-testing` — *"Passing axe is necessary, not sufficient."*

**Where it is beatable — the four openings.**

1. **No judgment layer.** See §1.3. `risk-based-testing` and `release-readiness` are linked by prose, not by a mechanism carrying risk scores into gate criteria. The gate is a fixed template (*"Use this as a template. Adapt it to your context"*), not a decision *derived from* the risk model.
2. **It routes by keyword, not by surface.** The `qa-do` table keys on situation phrasing. There is no notion of *which product surface* changes what verification is warranted — mobile, cross-browser and API are single rows, not a facet. The family's proven jobs × surfaces idiom has no counterpart here.
3. **It blends construction with verification.** W1's sharpest point: the same flat `skills/` directory and the same `qa-do` router own `unit-testing`, `playwright-automation`, `cypress-automation`, `mobile-testing`, `security-testing` as first-class routed destinations. Per the brief's own definition an assurance router owns strategy and the gate, *"NOT the techniques."* This is the clearest structural differentiation available — but it must be *argued*, because a single blended QA library is a legitimate competing design that many users would prefer.
4. **No quality↔operate boundary, and low adoption.** A large fraction of `release-readiness` is `operate` material: rollback procedure and thresholds, canary promotion ladders, a feature-flag vendor comparison (LaunchDarkly / Statsig / GrowthBook / Unleash / Flagsmith / Harness FME), DORA targets, post-deploy monitoring windows. The library also holds `ci-cd-integration`, `synthetic-monitoring`, `testing-in-production`, `observability-driven-testing`, `quality-postmortem`. Its "release gate" is a **deployment-safety** gate, not a **verification-evidence** gate. And at 44★ the wedge is contested, not won.

### 3.2 `proffesor-for-testing/agentic-qe` — the big vendor pack

- **URL:** https://github.com/proffesor-for-testing/agentic-qe · MIT (LICENSE read: *"Copyright (c) 2025 Agentic QE Contributors"*)
- **Signals:** **421★**, 75 forks, created 2025-09-11, pushed **2026-07-24** — the most actively maintained repo found. Repo ~83 MB (full npm package + CLI + Dockerfile).
- **Size discrepancy to note:** its own `TRUST-TIERS.md` says **105 skills** but was generated 2026-02-02; W1's live count is **124** (62 V2 methodology + 24 V3 domain + 30 platform). Treat 124 as current.

**What it does well — three things worth studying.**

*A trust-tier system applying assurance to itself.* **[lead-verified]** `TRUST-TIERS.md` (policy "ADR-056 – Trust But Verify"):

| Tier | Count | Description |
|---|---|---|
| 3 – Verified | 44 | Full evaluation test suite |
| 2 – Validated | 7 | Has executable validator |
| 1 – Structured | 5 | Has JSON output schema |
| 0 – Advisory | 49 | SKILL.md only |

Each Tier-3 skill declares `trust_tier`, `schema_path`, `validator_path`, `eval_path`, plus `passRate`, `criticalPassRate` and `lastValidated` inline.

*`qe-court` — the strongest gate design in the ecosystem.* **[lead-verified]**

> a delivery (diff, PR, test suite, or artifact) is prosecuted by independent AI reviewers from different vendors, each with its own probe set, then a SHIP verdict must SURVIVE escalating deeper reviewers before it stands… Produces a signed court record with a three-valued verdict (SHIP / REMAND / BLOCK) and a human as final judge.

> **The one rule that makes it a court and not a rubber stamp:** a passing grade is the *claim under attack*, not the finish line. A shallow `91/100 SHIP` that a deeper reviewer can overturn is a bug in the review, not a delivery that shipped.

Named roles: Defense / Prosecution / Blind refuter / Jury / Deeper reviewer / **Judge = the human**. With an explicit anti-shortcut warning that the reduced workflow *"can falsely rate SHIP by skipping the security / mutation / defect lanes."*

*Unusual honesty about agent failure modes* **[W1]** — directly relevant to our agent-work-verification claim, and evidence that someone is already on it:

> *"NEVER trust agent-reported pass/fail status — 12 test failures were caught that agents claimed were passing… Completion theater: agent hardcoded version '3.0.0' instead of reading from package.json… quality-assessment domain has 53.7% success rate — expect failures and have fallback."*

**Why it does not close the wedge.** It is not neutral and cannot be made neutral: every skill's frontmatter lists its own `agents: [...]` fleet, bodies invoke `aqe`/`ruflo` commands, memory conventions are `aqe/coordination/*`. W1: *"Adopting any one skill effectively means adopting the fleet."* Its `verification-quality` skill documents *its own repository's* CI guards and states plainly *"Shipped vs. aspirational… treat the 'CI Guards' section below as the authoritative current state"* — part of its headline truth-scoring/auto-rollback surface is design, not shipped **[lead-verified]**. Scope-wise, `qe-quality-assessment` is a **code/CI-level** gate (coverage, mutation, complexity, vulnerabilities, weighted A–F grade), not a whole-product cross-surface residual-risk decision.

### 3.3 The accessibility slice — where our pattern already exists in miniature **[W3]**

Treated together because they matter as a pair.

**`community-access/accessibility-agents`** (MIT, 367★, v6.0.0, pushed 2026-07-25; ships a CLI, MCP server, VS Code extension and GitHub Action alongside ~80 SKILL.md files) separates measure from fix better than anything else found:

> `playwright-verifier`: *"You are a fix verification agent. You are a **read-only** agent — you never edit source files."* → reports **PASS / FAIL / REGRESSION**
> `ci-accessibility`: *"Strict — fail on any new violation / Standard — fail on critical/serious only (recommended) / Baseline — fail only when violation count increases (best for brownfield)"*
> `accessibility-lead`: *"You do not do all the work yourself. You delegate to specialists and synthesize their findings… Make the ship/no-ship decision."*

**`sylphxai/skills@accessibility-conformance-program-review`** (MIT, 1★, 40 installs) reads almost like our brief:

> *"Design or audit a product accessibility conformance program spanning target standards, representative workflows, manual and assistive-technology testing, issue governance, release evidence, VPAT/ACR inputs, remediation, and exceptions… Do not use for a single UI critique, a code-level accessibility fix, generic QA planning, or legal advice."*

Guardrails: *"Never claim conformance from automated scans alone."* · *"Distinguish `observed`, `inferred`, `not_tested`, and `blocked` evidence states."* · *"Never average away a blocker that prevents a disabled user from completing a core task."*

**Why they matter.** They prove the assurance-router shape is wanted and buildable, and they hand us a working evidence-state vocabulary. **Why they don't close it.** Both are single-domain and say so; `community-access` also ships an autonomous `web-issue-fixer`, so the suite as a whole mixes fix and measure; `sylphxai` has negligible adoption and `[UNVERIFIED]` authorship provenance (~110 uniformly-named "X-review" skills suggests bulk generation — W3 flags this as a reason to temper the "highest rigor" framing).

### 3.4 `fugazi/test-automation-skills-agents@qa-manual-istqb` — the body-of-knowledge link **[lead-verified]**

MIT (LICENSE read), repo 202★, pushed 2026-07-26. A *"Complete ISTQB Foundation Level (CTFL) aligned workflow… Test Planning → Test Analysis → Test Design → Test Implementation → Test Execution → **Test Completion**"* covering test design techniques (EP, BVA, decision tables, state transitions, use cases), defect lifecycle, **traceability matrices (requirements ↔ tests ↔ defects)**, exploratory charters and static testing, with fill-in templates including `templates/test-summary-report.md`. Its Test Completion phase is the ecosystem's nearest evidence-dossier precedent. But it is one flat skill, tool-coupled to Playwright scaffolds, with no router, no altitude allocation and no gate decision.

### 3.5 `donchitos/claude-code-game-studios@test-evidence-review` — accidental prior art **[lead-verified]**

23,397★ repo (stars are for the game-studio concept, not the QA skills). Independently invented a piece of our thesis:

> `/smoke-check` verifies that test files **exist** and **pass**. This skill goes further — it reviews the **quality** of those tests and evidence documents. A test file that exists and passes may still leave critical behaviour uncovered. A manual evidence doc that exists may lack the sign-offs required for closure.

Produces **ADEQUATE / INCOMPLETE / MISSING** per story and maps **story type → required evidence type** (Logic → unit tests; Integration → integration tests + playtest records; Visual/Feel and UI → evidence documents; Config/Data → smoke reports). That is altitude allocation by artifact class — exactly the mechanism qa-skills lacks. Hard-coded to `production/qa/`, `production/epics/`, `production/sprints/`, so not installable as a neutral router.

### 3.6 `obra/superpowers@verification-before-completion` — the agent-verification incumbent **[W4]**

- **URL:** https://github.com/obra/superpowers · path `skills/verification-before-completion/SKILL.md` · MIT
- **Signals:** **261,332★**, pushed 2026-07-24 — larger than `anthropics/skills` itself, and the most-starred repository touching our scope anywhere in this scan.

Core rule, verbatim:

> **NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE.** If you haven't run the verification command in this message, you cannot claim it passes.

Paired with a rationalization-prevention table (*"Should work now"* → *"RUN the verification"*; *"Agent said success"* → *"Verify independently"*).

**Why this matters to us.** "Verification of agent-built work" was the gap I initially rated cleanest. It is not clean. The *problem* is extremely well recognised — a quarter of a million stars' worth — and the *in-the-moment discipline* is solved and widely adopted. Any claim that this territory is unoccupied is wrong and would not survive contact with a reviewer.

**Why it still leaves room.** It is a single-agent, single-session discipline card. It governs *how an agent talks about its own work right now*; it is not a router, produces no evidence dossier, allocates no verification altitude, and issues no release decision. It says "run the command before you claim it passed" — not "here is what independent evidence establishes that this AI-written test suite actually verifies anything, and here is the residual risk." The opening is the product-level, dossier-shaped version — and `agentic-qe`'s regenerability gate (L6) is a better starting point for it than anything in `superpowers`.

The same repo also ships `requesting-code-review`, `receiving-code-review`, `systematic-debugging`, `test-driven-development` — all explicitly outside the brief's scope for `quality`.

---

## 4. Coverage gaps in the ecosystem — the shape of our opening

Ordered by defensibility. Gaps 1–4 survived four independent channels; gap 5 is weaker than it first appeared and is stated with its counter-evidence.

1. **The judgment layer above the techniques.** Nobody writes down *residual risk*, *the oracle problem*, *what we deliberately chose not to verify*, or an **evidence dossier** that binds risk model → verification performed → evidence produced → decision. qa-skills has a risk model and a gate with no mechanism carrying one into the other; agentic-qe has a verdict with no risk model behind it; the a11y packs have the dossier shape but only for a11y. This is the clearest opening and the intellectually load-bearing part of the discipline.

2. **Surface-faceted routing.** Every pack routes by situation phrasing (qa-skills), its own agent roster (agentic-qe), or tool (fugazi, lambdatest). None routes by **product surface × risk profile** — website, web app, iOS, Android, API/service, data pipeline, AI/agentic system, internal tool — where the surface genuinely changes which verification is warranted and at what altitude. The nearest thing in the whole ecosystem is Anthropic's four-bullet *"API endpoints / Data pipelines / Frontend / Infrastructure"* sketch inside a 35-line skill.

3. **Cross-domain NFR synthesis.** **[W3]** Per-domain measure-and-gate skills are good and getting better, but *"none of them do it across more than one NFR domain at once."* Nobody reconciles or weights a11y + perf + security + privacy evidence into one dossier, adjudicates conflicting signals across domains, or reasons about what altitude of verification a given risk profile warrants across them. qa-skills' `release-readiness` only checks that each domain's gate is green — it does not synthesise.

4. **Verification of agent-built work — REAL BUT CONTESTED, NOT GREENFIELD.** I initially rated this the cleanest gap. That was wrong and the correction matters. `obra/superpowers@verification-before-completion` owns the in-the-moment discipline at **261,332★** **[W4]**; `agentic-qe` owns the mechanism side (*"NEVER trust agent-reported pass/fail status — 12 test failures were caught that agents claimed were passing"*, the regenerability/Deletion-Test gate, `qe-court`'s cross-vendor adversaries) **[W1]**. Beyond those, only micro-packs (≤99 installs). What remains open is narrower and must be stated narrowly: the **neutral, product-level, dossier-shaped** version — establishing what independent evidence shows an AI-written suite actually verifies, and what risk remains — as opposed to a per-message honesty rule or a vendor-bound scoring pipeline.

5. **Compatibility matrix as strategy — WEAKER THAN IT LOOKS.** The phrase is absent everywhere, but the capability is not: qa-skills' `cross-browser-testing` has an analytics-driven P0/P1/P2 traffic-tier table, a dated `next-review` field, a known-issues log, and the engines-are-not-brands discipline; `mobile-testing` has a framework decision table and a 60/30/10 device-tier split; agentic-qe converges on the same tiers independently **[W2]**. What remains open is only the *cross-surface* version — one matrix decision spanning browser + device + OS + locale + assistive tech, defended as a whole. Do not claim this as a headline gap.

6. **Suite economics.** Flake handling is widespread; *flake economics* — what a flaky test costs, when quarantine beats deletion, suite runtime as a scarce budget — is not framed as an economic decision. qa-skills' `test-suite-curation` comes closest and is strong. Narrow opening.

7. **The flagship shelf is bare — a distribution opening, not a content one.** **[W4]** `anthropics/skills` (164K★), `vercel-labs/agent-skills` (29K★) and `ComposioHQ/awesome-claude-skills` (71K★) ship **no quality, QA, gate or triage skill at all**. Every serious QA artifact in this corpus lives in an indie repo (44★–421★) or inside a vendor's platform. There is no canonical, high-provenance quality skill the way `react-best-practices` is canonical for React. That is a positioning opportunity distinct from the content gaps above — and it is also a warning, since the same emptiness means the family will not inherit distribution from the wedge being obvious.

8. **The name is free.** `npx skills find "quality gate"` → *"No skills found."*

---

## 4b. Why a NARROW wedge still justifies building this

The obvious objection: *if a good neutral router already exists, why build?* The answer is structural, not qualitative, and it is the strongest argument in this corpus.

**The seam that `qa-skills` cannot hold, and we get for free.**

W1 named `qa-skills`'s central weakness as owning `unit-testing`, `playwright-automation` and `cypress-automation` as first-class routed skills alongside its strategy and gate skills — blurring construction and verification. That is correct, but the *reason* matters more than the observation: **`qa-skills` is a standalone pack. It has nowhere to hand construction-side testing to.** A user who installs it and asks "write unit tests for this" must be served, so it must own `unit-testing`. Refusing would not be discipline; it would be a hole.

Our family has four owners for that work already:

| Construction-side testing | Owner in the family |
|---|---|
| Component / UI tests | `frontend` → `testing.md` |
| Service / API / integration tests | `backend` → `backend-testing.md` |
| Eval suites, LLM-as-judge, prompt regression | `ai` → `evaluation.md` |
| Pipeline / data tests, DQ checks | `data` → `quality-and-testing.md` |

So the boundary that would be **arbitrary self-limitation for a standalone pack is structurally native to us**. `quality` can be the thin assurance router the ecosystem does not have — not because we are more disciplined, but because we are the only ones with somewhere to put the techniques. This is a moat a standalone competitor cannot copy without becoming a family, and it is the one advantage that does not depend on out-writing a genuinely good author.

**The three content gaps the seam then makes reachable.** Because `quality` is not spending its surface area on technique packs, it can afford depth on what nobody has: the judgment layer (§4.1), surface-faceted routing (§4.2), and cross-domain evidence synthesis (§4.3). A pack carrying fifty technique skills cannot fund that depth without doubling in size.

**Honest counterweight.** A single blended QA library is a legitimate competing design, and for a solo developer with no skill family installed it is probably the *better* product — one install, everything present. Our advantage is real only for users already inside the family. The corpus should not pretend otherwise, and the build should not claim `qa-skills` is badly designed. It is well designed for a different distribution.

### Answers to the six deep-read questions on `petrkindlmann/qa-skills`

**Q1 — Router dispatch logic.** Plain-language situation → 1–2 named skills, in order, via a 47-row lookup table. Inputs are *phrasing*, not risk or context. Verbatim principles quoted in §1.1. Dispatch is keyword-matched, with four named disambiguation pairs and a "three or more destinations = ask a clarifying question" rule. **It is a real router; it is not risk-aware.**

**Q2 — `release-readiness` artifact and residual risk.** Produces a versioned, auditable artifact (`RELEASE-<version>.md` or a tracked issue) with per-item evidence, signed off by a named approver with a timestamp. It has a Risk Assessment block (change-scope category, blast radius, revert complexity). **It carries no residual-risk statement and no claim/release split** — the outcome is a go/no-go against a fixed checklist template, not a decision derived from the risk model. `residual risk` appears zero times in the repo.

**Q3 — `test-strategy` altitude.** Genuinely allocates altitude — Impact×Likelihood 5×5 → CRITICAL/HIGH/MEDIUM/LOW bands, each mapped to a testing-depth action, plus a test-level ownership table and pyramid-shape diagnosis. **But it reasons within one codebase**, not across a product's surfaces. Team-maturity calibration (startup / growing / established) is its only contextual facet.

**Q4 — Surface coverage. This is the sharpest gap, and it is measurable.** Grep across all 50 skills **[lead-verified]**:

| Surface | Coverage in `qa-skills` |
|---|---|
| Web app | **First-class** — the assumed default throughout |
| iOS / Android | **First-class** — `mobile-testing`, plus iOS referenced in 22 skills |
| API / microservice | **Covered** — `api-testing`, `contract-testing`, `service-virtualization` |
| **Data pipeline** | **Essentially absent** — one incidental hit (`qa-dashboard`); `"data engineer"` → 0 |
| **Marketing site / landing page** | **Absent** — `"landing page"` → 0; `"marketing site"` → 2 incidental |
| **Internal tool** | **Absent as a facet** — 2 incidental mentions |
| **Embedded / desktop** | **Incidental only** |

It is a **web-app-and-mobile pack**. Four of the eight surfaces the family cares about are unserved. This is the empirical backbone of the surface-faceted-routing gap.

**Q5 — Does it verify agent-built work?** *Partially, and more than I first credited.* `ai-qa-review` reviews **existing test code** across six smell dimensions, one of which is explicitly **"AI-generated"**, and backs the qualitative smells with a mutation-score gate — *"a test that asserts `toBe(true)` and a 95%-coverage suite that only feeds happy-path input both look green and both hide bugs."* That is real agent-work verification at the **test-code** level. What it does **not** do: verify agent-built *product* code, or connect any of it to system-level evidence or a release decision. (Note `ai-system-testing` is a different thing — testing AI features that ship in your product, i.e. a sibling to our `ai` skill, not agent-work verification.)

**Q6 — Suite & signal health.** Reproduced in full as **L7** (curation doctrine) and **L24** (flake economics, auto-repair approval bands, quarantine hygiene). This is the strongest body of liftable work in the corpus and all of it is MIT.

---

## 5. Liftable material

MIT permits adaptation with attribution and licence notice. In nearly every case the underlying idea is standard practice; what is licensed is the specific expression. Prefer re-derivation over copying.

> **⚠ Licence exclusions — do not lift from these.**
> - `mgifford/accessibility-skills` — **AGPL-3.0** (copyleft) **[W3]**
> - `naodeng/awesome-qa-skills` — **GPL-3.0** (copyleft), 137★, contents unread **[W4]**
> - `trailofbits/skills` — **CC-BY-SA-4.0** (share-alike) **[W4]**
> - `qodex-ai/ai-agent-skills` — **Proprietary**, per-skill `LICENSE.txt` **[W4]**
> - `launchdarkly/agent-skills` — **NOASSERTION**, no SPDX-recognised licence **[W4]**
> - `anthropics/skills`, `vercel-labs/agent-skills`, `ComposioHQ/awesome-claude-skills` — **no LICENSE file at repo root**; all-rights-reserved by default **[W4]**

### L1 — the crown jewel, reproduced in full

**Source:** https://github.com/sylphxai/skills/blob/main/skills/accessibility-conformance-program-review/SKILL.md · **MIT** · repo 1★, 40 installs, pushed 2026-07-26 · **authorship provenance `[UNVERIFIED]`** (one of ~110 uniformly-named "X-review" skills; possibly bulk-generated — the artifact is what matters, not the author) · **[lead-verified, read in full]**

This is the closest thing in the ecosystem to the `quality` positioning: independent verification that **reports and decides** rather than remediates. It is scoped to accessibility, but nearly every mechanism generalises. Reproduced because the lead asked for it in full and because paraphrase loses the precision.

**Guardrails** — verbatim:

> - Never claim conformance from automated scans alone.
> - Never claim legal compliance, certification, or a completed VPAT/ACR without scoped, current, reviewable evidence and known exceptions.
> - Never average away a blocker that prevents a disabled user from completing a core task.
> - **Never treat a design-system pass as proof that composed product workflows pass.**
> - Keep disability-related research data minimal, consented, and access-controlled.
> - **Distinguish `observed`, `inferred`, `not_tested`, and `blocked` evidence states.**

**Source-verification protocol** — verbatim:

> - Resolve the exact product version, standard or platform requirement, version, jurisdiction or contract scope, retrieval time, evaluator method, assistive technology/browser/platform combination, and evidence owner **at task time**.
> - Prefer current primary standards, official templates, platform requirements, and signed procurement terms. Treat summaries and model memory as discovery leads only; **block the affected claim when primary authority is unavailable**.
> - **Keep supplied test results immutable and source-linked. Never infer an untested workflow, platform, disability need, or conformance status from a neighbouring result.**

**Output schema** — verbatim:

```text
Decision and scope:
- audience / release or claim decision / surfaces / workflows / exclusions

Authority ledger:
| Requirement source | Version/date | Retrieved at | Scope | Status | Evidence owner |

Requirement-to-evidence matrix:
| Requirement | Workflow/surface | Method + AT/browser/platform | Result | Confidence | Evidence |

Issue and remediation portfolio:
| Finding | User-task impact | Reach | Workaround | Owner | Due | Retest | Release effect |

Claim, release, and exception decisions:
- claim status / release status / caveats / exception owner / expiry

Prevention and refresh plan:
- design-system contracts / regression tests / training / evidence review cadence
```

**Workflow step 7** — the single most important line in the whole corpus:

> **Decide release and claim status independently. A product may ship with a recorded exception without earning an unqualified conformance claim.**

**How it generalises past accessibility — five mechanisms we should take:**

1. **Evidence states as a closed vocabulary.** `observed` / `inferred` / `not_tested` / `blocked` is what lets an agent say *"I did not actually test this"* instead of implying coverage it does not have. A binary pass/fail structurally cannot express residual risk; this can. Applies unchanged to perf, security, privacy, compatibility, and agent-built work.
2. **Release status ≠ claim status.** Splitting "may we ship" from "what may we assert" *is* the residual-risk statement in operational form, and it dissolves the false binary that makes gates get overridden. Generalises to any NFR claim ("meets the perf budget" vs "ships with a recorded exception on the reports page").
3. **The compositional fallacy, named.** *"Never treat a design-system pass as proof that composed product workflows pass"* is the general form of the verification error our whole family is exposed to — component tests green, product broken. Restate it once, at the top, for every surface.
4. **Never infer from a neighbouring result.** The strongest anti-hallucination invariant found anywhere in the scan, and directly load-bearing for verification of agent-built work: an agent summarising a dossier must not extrapolate an untested surface from a tested one.
5. **Exception register with owner + expiry.** Makes accepted risk a tracked object with a death date rather than a sentence in a doc that rots.

**Caveat carried forward:** 1★ and unverified authorship. Read it independently before building on it. The mechanisms above stand on their own merits regardless of who wrote them.

---

### L3 — `qe-court`, reproduced in full: the best adversarial-method prior art in the ecosystem

**Source:** https://github.com/proffesor-for-testing/agentic-qe/blob/main/.claude/skills/qe-court/SKILL.md · **MIT** (LICENSE read) · `trust_tier: 3`, eval `passRate: 1.0`, `lastValidated: 2026-07-18` · **[lead-verified, read in full]**

Inside a vendor-locked platform, so **we lift the idea, not the machinery** — every provider name, ADR reference and `qe-*` agent below is theirs and must be stripped.

**The protocol** — verbatim:

```
DELIVERY (diff / PR / test-suite / artifact)
   │  1. DEFENSE  — writer model states the case for shipping, from evidence only.
   │  2. PROSECUTION (parallel, blind) — N specialized reviewers, DIFFERENT vendors,
   │     each generates its OWN probe set and files CHARGES (finding + reproduction).
   │  3. KILL ROUND — blind refuters attack each charge; weak/unreproducible ones dropped.
   │  4. JURY — two-gate judge, cross-model, writer≠juror. 3-valued verdict.
   │     A numeric score is emitted ONLY if its rubric passed the ADR-122 ANOVA screen.
   │  5. OVERTURN ROUND — if verdict == SHIP, escalate ONE deeper reviewer. Loop-until-dry:
   │     SHIP only STANDS if K consecutive deeper rounds find nothing new. Surviving fatal → flip.
   │  6. SIGNED COURT RECORD — provenance-tier surviving charges, sign.
   ▼  HUMAN JUDGE (you) — rules SHIP / REMAND / BLOCK on the strongest case both ways.
```

**Verdict states** — verbatim:

| Verdict | Meaning | Trigger |
|---------|---------|---------|
| **SHIP** | Survived the overturn round | No fatal charge survived K deeper rounds |
| **REMAND** | Fixable charges — back to author | Non-fatal charges survived; delivery is close |
| **BLOCK** | A fatal charge survived | ≥1 fatal charge reproduced and not refuted |

**Anti-collusion invariants** — verbatim, *"enforce these or it isn't a court"*:

> 1. **Writer ≠ any juror.** 2. **Prosecutors file blind.** 3. **Overturn is asymmetric** (SHIP must survive escalation; BLOCK needs one surviving fatal charge). 4. **No un-validated scores.**

Plus, from the routing rules: *"**≥2 distinct vendors** across the panel — not just tiers"* and *"**Jury provider ∉ {writer, defense}** — no model grades its own or its writer's output."*

**The five ideas worth more than the implementation:**

1. **Blind charging.** Prosecutors generate their own probe sets and file without seeing the defense or each other. This is the mechanism that makes "independent" real rather than declared — independence as a *procedure*, not an adjective.
2. **Asymmetric overturn — the single best idea here.** *"SHIP must survive escalation; BLOCK needs one surviving fatal charge."* The burden of proof falls entirely on the optimistic verdict. Loop-until-dry: a SHIP stands only if **K consecutive deeper rounds find nothing new**, with K learned per domain as *"the depth at which new charges stop appearing."* This is the ecosystem's only real answer to "how do you know you looked hard enough?"
3. **The kill round.** Charges are themselves attacked before they count; unreproducible ones are dropped, and *"killed/refuted charges are NOT stored as positives (noise control)."* A finding is not evidence until it survives an attempt to destroy it — the discipline that keeps a dossier from filling with noise.
4. **Refuse to emit a number you cannot validate.** A score is published only if its rubric passes a statistical discrimination screen; otherwise verdict class and charges only, *"never a noise '91/100'."*
5. **The overturned SHIP as the highest-value signal.** *"An overturned SHIP is the highest-value signal there is"* — persisted as a `{shallow: SHIP, true: BLOCK|REMAND, charge}` discriminator pair, which is *"what makes the court harder to fool over time."* The gate learns from the cases where it was too easy.

> **Correction to the framing this was handed to me with.** REMAND is *not* "insufficient evidence" — per the source table it is **"fixable charges — back to author; non-fatal charges survived; delivery is close."** It means *defects found and they are minor*, not *we didn't look hard enough*. The insufficient-evidence case is handled elsewhere, by the **asymmetric overturn**: a SHIP that has not yet survived K deeper rounds simply is not a SHIP. This distinction matters for our design, because it means a three-valued verdict alone does **not** give us the evidence-sufficiency dimension — we still need L1's `not_tested` / `blocked` states for that. **Verdict class and evidence state are orthogonal axes, and we need both.**

**Honesty note:** the skill states plainly there is *"no monolithic binary yet"* — it is an orchestration skill composing other agents, with a CLI wrapper and a hosted `/v1/qe/verdict` endpoint (commercial, "Cognitum") still planned. Aspirational in part.

---

### L6 — the regenerability / "Deletion Test" gate, verbatim

**Source:** https://github.com/proffesor-for-testing/agentic-qe/blob/main/.claude/skills/qe-quality-assessment/SKILL.md (their ADR-113) · **MIT** · **[lead-verified]**

> Coverage measures lines executed; **mutation score** measures whether the tests would *notice a bug*, and **regenerability** answers the Deletion Test — "if this module were deleted and regenerated, would a wrong rebuild be caught?" Regenerability = mutation score discounted by the durability tier backing the module (durable > live > ephemeral > none); ephemeral-only tests score low because they don't survive a reimplementation.

Reported alongside coverage rather than instead of it — verbatim display line:

> `Coverage 88% ✅ / Mutation 41% ⚠️ / Regenerability: ephemeral-only ⚠️`

Two design details worth copying: it defaults to **`mode: 'warn'`**, *"'block' to fail CI; warn-by-default so adoption never breaks pipelines"* — the right posture for a gate landing on a brownfield product; and its gate config marks each threshold `blocking: true|false` individually, so coverage and vulnerabilities block while mutation, regenerability, complexity and tech-debt warn.

**Why this is the sharpest answer to coverage-as-a-lie we found.** It is a better test of suite *value* than any percentage, and it is the only metric in the corpus that directly addresses **AI-authored code**: regeneration is exactly the AI case. "Would a wrong rebuild be caught?" is the question to ask of a module an agent wrote and an agent tested — and neither coverage nor mutation score alone answers it, because both can be satisfied by tests that encode the same misunderstanding as the implementation.

---

| # | Artifact | Source | Licence | Use |
|---|---|---|---|---|
| **L1** | *(above — evidence states, authority ledger, requirement-to-evidence matrix, issue portfolio, claim/release/exception split, source-verification protocol)* | https://github.com/sylphxai/skills/blob/main/skills/accessibility-conformance-program-review/SKILL.md | MIT | **Adapt — the single best artifact found.** |
| **L2** | **Bug classification taxonomy** — four top-level classes: Functional (logic error, data handling, state management, validation, integration, authorization, edge case) / Non-Functional (performance, accessibility, security, usability, reliability, compatibility) / **Test Bugs** (wrong assertion, bad selector, missing wait, shared state, stale test data, wrong setup) / **Environment Issues** | https://github.com/petrkindlmann/qa-skills/blob/main/skills/ai-bug-triage/references/classification-taxonomy.md | MIT | **Adapt.** The *Test Bugs* and *Environment Issues* branches are the valuable part — they encode "is the failure in the product, the test, or the environment?", the first question in triage and the core of signal health. |
| **L3** | *(above — full protocol, verdict-state table, anti-collusion invariants, blind charging, asymmetric overturn, kill round, validated-scores-only, overturned-SHIP learning signal)* | https://github.com/proffesor-for-testing/agentic-qe/blob/main/.claude/skills/qe-court/SKILL.md | MIT | **Adapt the ideas; strip the machinery.** |
| **L4** | **Risk score → effort allocation table**: 20–25 Critical → 60% effort (comprehensive, multiple techniques) · 12–19 High → 25% · 6–11 Medium → 10% · 1–5 Low → 5% (smoke + exploratory only) | https://github.com/proffesor-for-testing/agentic-qe/blob/main/.claude/skills/risk-based-testing/SKILL.md | MIT | **Adapt.** The cleanest altitude-allocation heuristic found — turns a risk score into a *budget split*, which is exactly what "what NOT to test" needs to be actionable. |
| **L5** | **Impact × Likelihood 5×5 matrix banded to policy** — CRITICAL 15–25 / HIGH 10–14 / MEDIUM 5–9 / LOW 1–4, each band tied to a testing-action + automation + monitoring policy; plus the 5-point impact scale with calibration examples (5 Catastrophic: revenue loss, data breach, legal action, user safety → 1 Negligible) | `test-strategy` and `risk-based-testing` at https://github.com/petrkindlmann/qa-skills/blob/main/skills/ | MIT | **Adapt.** Standard risk-matrix practice; the liftable part is the calibration examples that make scoring repeatable across people. |
| **L6** | *(above — Deletion Test verbatim, durability tiers, warn-by-default posture, per-threshold blocking flags, side-by-side reporting line)* | https://github.com/proffesor-for-testing/agentic-qe/blob/main/.claude/skills/qe-quality-assessment/SKILL.md | MIT | **Adapt — sharpest answer to coverage-as-a-lie, and the only metric found that directly addresses AI-authored code.** |
| **L7** | **Suite-curation doctrine** — *"Coverage equality is not redundancy"*; mutation testing as the only subsumption proof; quarantine → observe for a defined window → delete with sign-off; *"'It's in git history' is not a recovery plan"*; *"the agent *proposes*; a human *approves*"*; the "what we deleted and why" audit record | https://github.com/petrkindlmann/qa-skills/blob/main/skills/test-suite-curation/SKILL.md | MIT | **Adapt.** Complete, well-argued, and directly on our suite-health territory. |
| **L8** | **Independent-verification report pattern** — read-only verifier (*"you never edit source files"*) reporting **PASS / FAIL / REGRESSION**; plus CI gating taxonomy **Strict / Standard / Baseline**; plus regression classification **Regressed / New / Persistent / Fixed** against a committed baseline | `playwright-verifier`, `ci-accessibility`, `accessibility-regression-detector` at https://github.com/community-access/accessibility-agents/blob/main/codex-skills/ | MIT | **Adapt all three.** The read-only constraint is the cleanest expression of "independent" we found. Baseline-mode gating is the right answer for brownfield products. |
| **L9** | **Go/no-go checklist**, three-block structure: Automated Checks (must pass) / Manual Checks (verify before go) / **Risk Assessment** (change scope categorised · blast radius estimated · revert complexity assessed); plus *"store the completed checklist as a versioned artifact… so sign-off is auditable"* and a named approver + timestamp | https://github.com/petrkindlmann/qa-skills/blob/main/skills/release-readiness/SKILL.md | MIT | **Adapt selectively.** Take the three-block structure and the auditable-artifact rule. Leave the rollback/canary/flag-vendor material — that is `operate`. |
| **L10** | **Test-health metrics table** — Pass rate >95% (alert <90%) · Flakiness <5% (alert >10%) · MTTR <4h (alert >24h) · Execution time <10min (alert >20min) · Coverage delta ≥0% (alert <−2%); with the gotcha *"flakiness rate is underreported — a test that fails 1/100 times still breaks CI weekly"* | https://github.com/proffesor-for-testing/agentic-qe/blob/main/.claude/skills/test-metrics-dashboard/SKILL.md | MIT | **Adapt.** Target + alert threshold per metric is the right shape for signal health. |
| **L11** | **Story-type → required-evidence-type mapping** with **ADEQUATE / INCOMPLETE / MISSING** per-item verdict, and *"a test file that exists and passes may still leave critical behaviour uncovered"* | https://github.com/donchitos/claude-code-game-studios/blob/main/.claude/skills/test-evidence-review/SKILL.md | MIT `[licence body unverified]` | **Adapt the mechanism, not the taxonomy.** Replace game story-types with product surfaces / change classes. The missing link between risk model and gate. |
| **L12** | **Browser matrix P0/P1/P2 traffic-tier table** (>10% → full suite every PR; 3–10% → smoke + critical paths nightly; 1–3% → smoke weekly; <1% → not tested) · known-issues log with *"a row with no ticket and no fallback is an open bug, not a documented issue"* · *"Playwright's WebKit is not Safari… report 'WebKit coverage'"* · Done-When requiring a dated `next-review` field | https://github.com/petrkindlmann/qa-skills/blob/main/skills/cross-browser-testing/SKILL.md | MIT | **Adapt.** Analytics-derived tiers plus a dated review field is exactly how to keep a matrix from rotting. |
| **L13** | **Mobile framework decision table** (Appium 3.x native/hybrid · Detox for RN · Maestro for mixed-skill teams · Patrol 4.x Flutter) + 60/30/10 device-tier split — independently converged on by agentic-qe | https://github.com/petrkindlmann/qa-skills/blob/main/skills/mobile-testing/SKILL.md | MIT | **Adapt.** Cross-validated by two independent authors, which is unusual and raises confidence. |
| **L14** | **3-way exit-code contract** — 0 success / 1 failed (genuine assertion failure) / **2 skipped (environment problem, not a test result)** | https://github.com/proffesor-for-testing/agentic-qe/blob/main/.claude/skills/qe-browser/SKILL.md | MIT | **Adapt.** "Skipped ≠ failed" is a small idea with large consequences for evidence integrity — an environment failure recorded as a test failure poisons the dossier. |
| **L15** | **Evidence-ZIP pattern** — per flow: screenshots + DOM snapshots + timeline + console/network logs | https://github.com/proffesor-for-testing/agentic-qe/blob/main/.claude/skills/e2e-flow-verifier/SKILL.md | MIT | **Adapt** as the concrete artifact format behind the dossier. |
| **L16** | **VPAT conformance vocabulary** — Supports / Partially Supports / Does Not Support / Not Applicable — + Section 508 / ADA Title II–III / EN 301 549 / EAA / AODA mapping workflow | https://github.com/community-access/accessibility-agents/blob/main/codex-skills/compliance-mapping/SKILL.md | MIT | **Adapt.** A four-valued conformance vocabulary generalises well beyond a11y. |
| **L17** | **Measure-not-set framing for NFRs** — *"A report that says 'LCP is 3.2s' is information; a CI gate that fails the build at 2.5s is accountability"*; *"budgets are only real if CI enforces them"*; *"verify behavior, not the CMP"*; *"passing axe is necessary, not sufficient"* | `performance-testing`, `compliance-testing`, `accessibility-testing` at https://github.com/petrkindlmann/qa-skills/blob/main/skills/ | MIT | **Adapt.** These four lines articulate our measure-against-someone-else's-budget doctrine better than we currently do. |
| **L18** | **Visual-diff threshold table** (`maxDiffPixels: 0` design-system atoms · 50–100 full-page layouts · `maxDiffPixelRatio: 0.01` viewport-variable · `threshold: 0.2` cross-browser colour) + *"screenshots are artifacts, not test results"* + *"a suite with a 10% false-positive rate gets ignored within a month"* | https://github.com/petrkindlmann/qa-skills/blob/main/skills/visual-testing/SKILL.md | MIT | **Adapt.** |
| **L19** | **Exploratory charter template** — `Explore [target] / with [resources] / to discover [information]` — plus SBTM session-flow timings, debrief template, session-log format, HICCUPS heuristics | https://github.com/petrkindlmann/qa-skills/blob/main/skills/exploratory-testing/references/session-templates.md | MIT (expression) | **Reference the canon, re-derive the expression.** The charter form is standard SBTM (Bach / Bolton / Hendrickson) public prior art, not this repo's invention — cite the primary source. |
| **L20** | **SFDIPOT** (Structure / Function / Data / Interfaces / Platform / Operations / Time) as a systematic test-idea generator, with priority-distribution gates (P0 8–12% · P1 20–30% · P2 35–45% · P3 20–30%, human exploration ≥10%) | https://github.com/proffesor-for-testing/agentic-qe/blob/main/.claude/skills/sfdipot-product-factors/SKILL.md | MIT (this expression); the mnemonic is Bach's HTSM | **Adapt the expression; cite HTSM.** |
| **L21** | **HTSM v6.3 — Heuristic Test Strategy Model (James Bach)**, cited by qa-skills as its risk-identification lens | https://www.satisfice.com/download/heuristic-test-strategy-model | Satisfice — terms **`[UNVERIFIED]`** | **Reference only** pending a terms check. The field's canonical test-strategy heuristic and the deepest prior art for altitude allocation. |
| **L22** | **ISTQB CTFL lifecycle** (Planning → Analysis → Design → Implementation → Execution → **Completion**) and artifact set: test plan, **test summary report**, traceability matrix, bug log | https://github.com/fugazi/test-automation-skills-agents/blob/main/skills/qa-manual-istqb/SKILL.md | MIT (this expression); ISTQB syllabus separately licensed `[UNVERIFIED]` | **Reference the lifecycle; adapt the artifact list.** Do not reproduce ISTQB syllabus text. |
| **L23** | **Severity scales — three independent cuts to triangulate.** Osmani: Critical (security, complete failures) / High (CWV failures, major a11y barriers) / Medium / Low, each with an action. wshobson a11y: Critical (blockers) / Serious / Moderate with concrete examples. agentic-qe: Critical/High/Medium/Low + bug-report formula. Plus Core Web Vitals budgets LCP <2.5s · INP <200ms · CLS <0.1 | https://github.com/addyosmani/web-quality-skills/blob/main/skills/web-quality-audit/SKILL.md · https://github.com/wshobson/agents/blob/main/plugins/accessibility-compliance/skills/wcag-audit-patterns/SKILL.md · agentic-qe `bug-reporting-excellence` | MIT (all three) | **Adapt by triangulation.** Three independent cuts of the same scale is better evidence than any one of them. |

| **L24** | **Flake/quarantine economics, in full** — flake-classification decision tree (order-dependency / data-dependency / timing / environment / time-sensitivity / visual-rendering / external-service, each with a distinct fix direction) · selector-stability 0–5 scale · **confidence-scored auto-repair approval bands** (≥0.9 auto-apply · 0.7–0.89 apply in quarantine + flag for review · 0.5–0.69 open PR, no auto-apply · <0.5 discard) · **intent-fidelity check** (a repair that changes *what* a test verifies, not just *how* it locates an element, must be rolled back) · **quarantine hygiene** (max 14-day age · every entry needs a ticket link · weekly review · **>5% of suite quarantined = systemic-problem signal**) | https://github.com/petrkindlmann/qa-skills/blob/main/skills/test-reliability/SKILL.md **[W4]** | MIT | **Adapt — the most rigorous treatment of flake economics found anywhere.** The approval bands and the >5% systemic threshold are the parts we do not currently have. |
| **L25** | **Deterministic-fingerprint + LLM defect-triage pipeline** — Normalize (strip timestamps/UUIDs/PIDs/ports/random suffixes) → Extract stable anchors (exception type, message template, top-3 stack frames, test name, URL pattern, HTTP status, *ranked by stability*) → Hash canonical fingerprint → Cluster near-duplicates → LLM classifies severity → LLM generates ticket → **human approval before any destructive action**. Core reframe: *"The LLM is best at explaining and routing, not deduplication. Teach agents to DESIGN the pipeline, not BE the pipeline."* Tracks triage accuracy vs human judgment, flags <85% as needing tuning | https://github.com/petrkindlmann/qa-skills/blob/main/skills/ai-bug-triage/SKILL.md **[W4]** | MIT | **Adapt.** The determinism/LLM split is the right architecture and the reframe line is quotable. |
| **L26** | **`qe-court` anti-collusion invariants** — *"≥2 distinct vendors across the panel"* · *"Jury provider ∉ {writer, defense}"* · *"writer ≠ juror"* · **"No un-validated scores"**: a numeric score is emitted only if it passes an ANOVA screen, otherwise verdict class + charges only — explicitly to avoid *"a noise 91/100"* | https://github.com/proffesor-for-testing/agentic-qe/blob/main/.claude/skills/qe-court/SKILL.md **[W4]** | MIT | **Adapt.** "Refuse to emit a number you cannot validate" is a strong, transferable evidence-integrity rule — arguably the single best idea in the repo. |
| **L27** | **Gate-as-a-scored-pipeline** — 13-step weighted requirements-validation gate (format / completeness / INVEST / SMART / testability / traceability / …), each step scored 0–100, blocking vs warning severities, weighted rollup by category | https://github.com/proffesor-for-testing/agentic-qe/blob/main/.claude/skills/validation-pipeline/SKILL.md **[W4]** | MIT | **Adapt the shape**, not the requirements-specific steps. A reusable pattern for any composite gate. |
| **L28** | **Blameless-postmortem defect categorisation across 3 dimensions** (root-cause category: logic / integration / data / race / config / regression / missing-requirement / performance · *which test level should have caught it* · prevention opportunity) · rule *"Every Postmortem = 1–3 Concrete Action Items"* with owner + deadline + verification method · **two metrics tracked jointly** (defect escape rate + action-item closure rate) to catch *"closing items but doing the wrong work"* | https://github.com/petrkindlmann/qa-skills/blob/main/skills/quality-postmortem/SKILL.md **[W4]** | MIT | **Adapt the "which test level should have caught it" dimension** — it is the feedback loop from escaped defect back into altitude allocation, which is exactly our territory. |
| **L29** | **Test-pyramid shape diagnosis** — healthy / ice-cream-cone / diamond / hourglass, each with symptom and rebalance prescription; plus entry/exit criteria defined per test level; plus a 13-section test-strategy document skeleton | https://github.com/petrkindlmann/qa-skills/blob/main/skills/test-strategy/SKILL.md **[W4]** | MIT | **Adapt.** Named shapes beat prose for diagnosis. Note this skill cites current external frameworks — ISTQB CTAL-AT v2.0 (2026), CT-GenAI v1.1 (2026-04-27), HTSM v6.3, World Quality Report 2025-26 — a good model for how to stay anchored to the canon. |
| **L30** | **"Evidence before claims" rationalization-prevention table** — *"Should work now"* → *"RUN the verification"*; *"Agent said success"* → *"Verify independently"* | https://github.com/obra/superpowers/blob/main/skills/verification-before-completion/SKILL.md **[W4]** | MIT | **Reference, do not re-derive.** At 261K★ this is the incumbent phrasing; cite it rather than competing with it. |

---

## 6. Prior-art structural patterns worth borrowing

1. **Router-with-a-staleness-invariant.** `qa-do` Core Principle 3 makes drift the router's *own* named failure mode and prescribes regeneration from the skills directory. A router should declare how it rots.
2. **Hard numeric cap on router fan-out.** *"One or two skills, in order — never a pile."* Three or more destinations is *defined* as ambiguity requiring a clarifying question, not thoroughness.
3. **Named disambiguation pairs.** List the N overlaps explicitly as `A vs B — condition → A; condition → B` rather than hoping descriptions separate them. qa-skills names exactly four.
4. **Three-valued verdict with an overturn round** (`qe-court`): SHIP / REMAND / BLOCK, where a SHIP must survive a deeper reviewer. The middle value is what makes a gate usable.
5. **Per-item evidence verdict** (`test-evidence-review`): ADEQUATE / INCOMPLETE / MISSING per unit of work, rolled up — not a single global pass/fail. Makes the dossier compositional and shows exactly where residual risk sits.
6. **Evidence states as first-class** (`sylphxai`): observed / inferred / not_tested / blocked. `not_tested` and `blocked` are what make honest residual risk expressible; a binary pass/fail cannot represent them.
7. **The read-only constraint as the definition of independence** (`playwright-verifier`): *"you never edit source files."* One sentence of frontmatter enforces the whole adversarial posture.
8. **Baseline-relative gating for brownfield** (`ci-accessibility`): Strict / Standard / Baseline, where Baseline fails only when the violation count *increases*. Lets a gate be adopted on a product that is already failing.
9. **Trust tiers declared in frontmatter** (agentic-qe): each unit carries its own verification level, last-validated date and pass rates. Self-describing assurance metadata — and a way to apply the discipline to our own family.
10. **Shipped-vs-aspirational disclosure** (agentic-qe `verification-quality`): an explicit callout marking which parts of a document describe reality and which describe design. Rare, honest, and directly applicable to a skill claiming to produce evidence.
11. **"Not for:" in the `description` frontmatter** so the runtime's matcher sees exclusions. Now table stakes across serious packs, not differentiation.
12. **Quick Route table** at the top of a long skill (`risk-based-testing`): situation → start at Phase N, so returning users skip rather than re-read.
13. **Evidence-before-feelings as the gate's first principle:** *"'I think it's fine' is not a go/no-go criterion."*
14. **Dated `next-review` field on any matrix or baseline** (`cross-browser-testing` Done-When) — the anti-rot mechanism for artifacts that silently expire.
15. **Refuse to emit a number you cannot validate** (`qe-court`): a score is published only if it passes a statistical screen; otherwise emit the verdict class and the charges. Prevents false precision from becoming false confidence. **[W4]**
16. **Role separation as an anti-collusion invariant** (`qe-court`): *"writer ≠ juror"*, *"Jury provider ∉ {writer, defense}"*, ≥2 distinct vendors on the panel. Independence stated as a checkable constraint rather than an aspiration. **[W4]**
17. **Approval bands keyed to confidence** (`test-reliability`): auto-apply / apply-but-quarantine / open-a-PR / discard, keyed to a numeric confidence score, with a rollback trigger if the action changed *intent* rather than *mechanism*. A general pattern for any agent action that mutates the thing being verified. **[W4]**
18. **"Done When" blocks with runnable verification commands** (throughout qa-skills): every skill ends with explicit completion criteria plus shell commands whose exit code decides. The strongest anti-hand-wave device found. **[W4]**
19. **Feed escaped defects back into altitude** (`quality-postmortem`): categorise every escape by *which test level should have caught it*, then let that reshape the strategy. Closes the loop from gate failure to allocation. **[W4]**
20. **Two metrics tracked jointly to detect gaming** (`quality-postmortem`): escape rate *and* action-item closure rate, because either alone can be satisfied while the other rots. **[W4]**

---

## 7. Open gaps — what we could not verify, and why

1. **The instrument under-reports — badly, and this is the corpus's biggest weakness.** All four workers independently established that `npx skills find` is keyword/description-matched with a hard ~6-result cap, no pagination, and poor recall on compound phrases and single words alike. Demonstrated failures: `"release readiness"` → 0 hits **[W1]** while `petrkindlmann/qa-skills@release-readiness` demonstrably exists and W3's differently-phrased query found it; `"accessibility"`, `"performance"`, `"a11y"`, `"OWASP"`, `"k6"` → 0 hits **[W3]** in a territory full of such skills; `"flutter testing"` → 0 hits **[W2]** while `lambdatest/agent-skills@flutter-testing-skill` exists. **W4's are the most damning: `"test strategy"` → 0 hits despite `petrkindlmann/qa-skills/skills/test-strategy` existing, and `"agentic qe"` → 0 hits despite `proffesor-for-testing/agentic-qe` existing.** The CLI does not reliably match skill *names* verbatim, and appears to have a stale or partial index. W4 also found it sensitive to caching/phrasing — `"promptfoo"` returned 0 hits on the first pass and 4 on retry.

**Consequences, stated plainly:** zero-hit results in this corpus are evidence of nothing; the named-collection enumeration in W4's §e was a necessary cross-check rather than a redundancy; and **the true competitive landscape is very likely larger than what this corpus documents.** The verdict rests on the depth of what was found, not on the completeness of the sweep. A follow-up pass using GitHub code search directly (`gh search code` over `SKILL.md` frontmatter) rather than the skills.sh index is the highest-value next action if the family wants more confidence.
2. **Skills on GitHub but not indexed on skills.sh are under-covered.** Because the WebSearch budget was preserved (0 calls used), discovery leaned almost entirely on the skills.sh index plus `gh`. That is the most likely hiding place for an unfound competitor.
3. **Long-tail licences and classifications.** Every Tier-3 row and several Tier-2 rows are `[UNVERIFIED]` — surfaced by the CLI with real names, owners, install counts and URLs, but not hydrated and LICENSE not read. Notably unread: `microsoft/playwright-cli` (98.5K installs — the highest single-skill count found), `anthropics/skills@webapp-testing` (121.6K installs), `softaworks/agent-toolkit@qa-test-planner` (2,238★/4K), and the three gate micro-packs `oisincoveney/skills@quality-gate`, `terraphim/terraphim-skills@quality-gate`, `marcioaltoe/skills@evidence-gate`.
4. **`qodex-ai/ai-agent-skills` returned a null licence field and no LICENSE file was confirmed [W1]** — treat as all-rights-reserved until verified.
5. **`donchitos/claude-code-game-studios` licence body not read** — MIT is from the GitHub metadata field only, which this channel's own rule says is insufficient. L11's licence is unconfirmed.
6. **agentic-qe was sampled, not enumerated.** Read: `TRUST-TIERS.md`, `qe-court`, `qe-quality-assessment`, `verification-quality`, `test-automation-strategy`, the full skill-name list **[lead]**, plus `risk-based-testing`, `sfdipot-product-factors`, `bug-reporting-excellence`, `test-metrics-dashboard`, `agentic-quality-engineering` **[W1]** and six in-lane browser/mobile skills **[W2]**. That is ~16 of 124. Claims about what it lacks are weaker than the equivalent grep-verified claims about qa-skills. Its own skill count is also internally inconsistent (105 in a Feb-2026-generated file vs 124 live).
7. **`sylphxai/skills` authorship provenance `[UNVERIFIED]` [W3]** — ~110 uniformly-named "X-review" skills suggests bulk/templated generation. Content quality read well on its own terms, but L1 is our top liftable and rests on a 1-star repo of unknown provenance. Worth an independent read before we build on it.
8. **`petrkindlmann/qa-skills` `references/` subtrees largely unfetched [W1]** — `strategy-templates.md`, `diagrams-and-worksheets.md`, `heuristics-and-automation.md` are cited by the SKILL.mds as holding the worked examples and full matrices. The grep in §1.3 *did* cover `references/`, so the absence findings hold; the depth findings may understate the repo.
9. **`gh search code` hit GitHub's rate limit mid-scan [W1]**, blocking one lookup. Plain `gh api repos/...` reads were unaffected.
10. **`affaan-m/everything-claude-code` reported 233,465★ by `gh api` [W2]** — anomalous for a personal collection, not cross-checked, flagged as possibly a data artifact.
11. **Install counts are skills.sh's own counter**, cannot be cross-checked against stars (which are repo-level), and for skills inside multi-skill repos they are the only adoption signal available. Directional only.
12. **HTSM (Satisfice) licensing not checked** — L21 is reference-only pending that.
13. **No skill was installed or executed.** All judgments are from reading SKILL.md source; no runtime behaviour was tested.

---

## 8. Raw worker reports

- `_raw/skills-w1.md` — core testing & test strategy (37 CLI queries, 0 WebSearch)
- `_raw/skills-w2.md` — e2e / browser / mobile / compatibility (26 CLI queries, 0 WebSearch)
- `_raw/skills-w3.md` — a11y / perf / security / privacy (52 CLI queries, 0 WebSearch)
- `_raw/skills-w4.md` — AI-eval + release gate + process (35+ CLI queries, all 9 named collections enumerated, 0 WebSearch)

**Total channel cost:** ~150 skills-CLI queries, ~90 distinct repos surfaced, ~30 SKILL.md files read in full, 9 multi-skill collections enumerated, **0 WebSearch calls consumed** across the lead and all four workers. The shared session WebSearch budget is untouched by this channel.

---

## 9. Follow-ups, ranked

1. **Re-sweep with GitHub code search, not skills.sh.** §7.1 shows the index misses skills by their exact names. `gh search code` over `SKILL.md` frontmatter is the fix. Highest-value action if the family wants confidence in the sweep's completeness.
2. **Read `petrkindlmann/qa-skills` in full before writing any overlapping section.** W4: *"the single most important file for the quality-skill team to read… not because it blocks the niche, but because it sets a high bar for what 'good' looks like."* Specifically `release-readiness`, `test-strategy`, `test-reliability`, `ai-bug-triage`, `test-suite-curation`, plus the unfetched `references/` subtrees.
3. **Watch it for movement.** Single-author, actively maintained, already has the router file. If it adds residual risk + an evidence dossier + surface routing, the wedge shuts. Re-check before committing to the build.
4. **Read `naodeng/awesome-qa-skills`** (137★, **GPL-3.0**, contents unenumerated) — the largest unread QA collection in the corpus, and a licensing landmine if anyone lifts from it unknowingly.
5. **Unread high-reach skills:** `microsoft/playwright-cli` (98.5K installs), `anthropics/skills@webapp-testing` (121.6K), `softaworks/agent-toolkit@qa-test-planner` (2,238★/4K), `currents-dev`'s `debugging/flaky-tests.md`, and the three gate micro-packs (`oisincoveney`, `terraphim`, `marcioaltoe@evidence-gate`).
6. **Verify `sylphxai/skills` provenance before building on L1.** Our top liftable sits in a 1-star repo of ~110 uniformly-named skills that may be bulk-generated. The artifact is good; the source needs a second look.
7. **Check HTSM (Satisfice) reuse terms** before doing anything with L21 beyond citation.
8. **Confirm licences** for `donchitos/claude-code-game-studios` (L11 depends on it) and the Tier-3 long tail.
