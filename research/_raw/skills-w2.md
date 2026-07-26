# W2 Skills Scan — E2E, Browser Automation, Mobile & Compatibility Testing
Date: 2026-07-26. Instrument: `skills` CLI (skills.sh index) + `gh api` hydration. WebSearch budget: **0/10 used** (not needed — gh api + skills CLI covered everything).

---

## (a) Verdict for MY territory: **NARROW**

Within e2e/browser-automation/mobile/compatibility specifically:

- **No pure e2e/browser/mobile skill closes the assurance-router wedge.** Every dedicated e2e/mobile/browser skill I found is either a **technique pack** (one tool: Playwright, Cypress, Selenium, Appium, Detox, Maestro, XCUITest, Espresso — dozens of these) or a **vendor pack** (LambdaTest/TestMu AI's 50-skill framework catalogue, all funneling execution to their cloud; Currents.dev's Playwright reference, published by a test-analytics vendor but the skill itself is generic authoring guidance).
- **Two "partial routers" exist that are worth flagging strongly**, both narrow-slice (browser+mobile+visual only, not whole-product):
  1. **`petrkindlmann/qa-skills`** — `cross-browser-testing`, `mobile-testing`, `visual-testing` skills form a genuine narrow-slice router: analytics-driven browser/device tiering (P0/P1/P2), framework-decision trees, threshold tuning, known-issues logs, "Done When" gates. This is the single best-engineered browser/mobile/visual content I found in the whole scan — MIT, actively maintained (pushed 2026-06-10), small-ish (44 stars, so low adoption despite quality).
  2. **`proffesor-for-testing/agentic-qe`** — `qe-browser` (a hand-built Vibium/WebDriver-BiDi wrapper with typed assertions, evidence ZIPs, structured exit codes distinguishing failed-vs-skipped), `e2e-flow-verifier`, `compatibility-testing`, `mobile-testing`, `visual-testing-advanced` are all well-engineered narrow-slice routers for MY lane. **Important flag for the full-team verdict**: this repo is NOT limited to my lane — it's a 100+-skill "Agentic QE Fleet" (19-agent swarm, `.claude/skills/` includes `risk-based-testing`, `release`, `quality-metrics`, `defect-intelligence`, `qe-quality-gate`, `qe-deployment-readiness`) that explicitly claims release-readiness/gate/defect-triage territory — squarely W1/W4 turf. 421 stars, MIT, pushed 2026-07-24 (2 days ago — very active). **Whoever owns W1/W4 territory should independently evaluate `risk-based-testing`, `release`, `quality-metrics`, `defect-intelligence` skills in this same repo** — on my narrow reading of the browser/mobile/visual pieces alone it doesn't override my NARROW verdict, but the repo as a whole may push the overall cross-family verdict toward CLOSED depending on what those other skills actually say. I did not deep-read them (out of my lane) — flagging, not verdicting.
- Neither partial router owns cross-technique risk-based altitude allocation for a whole product, an evidence dossier, defect triage, or a release-readiness decision — they only decide "which browsers/devices/frameworks" within their own slice. That is exactly the "partial router" definition, not "assurance router."
- The official `android/skills@testing-setup` (Google, 6357 stars) is pure test-scaffolding (installs JUnit/Espresso/Robolectric/Roborazzi, configures DI) — explicitly out of quality scope by the brief's own exclusion list.

**Bottom line for my lane: OPEN-leaning-NARROW.** The wedge (whole-product risk-based verification decision + evidence dossier + release gate) is untouched by any e2e/mobile/browser-specific skill. Two adjacent, well-built narrow-slice routers exist and are worth studying for liftable material, but neither is a competitor to assurance-router positioning as defined.

---

## (b) Table of everything found

| Skill / repo | Owner/vendor | License | Size (approx) | Last updated | Installs/stars | Classification |
|---|---|---|---|---|---|---|
| `proffesor-for-testing/agentic-qe` (whole repo; my-lane skills: `qe-browser`, `e2e-flow-verifier`, `compatibility-testing`, `mobile-testing`, `visual-testing-advanced`, `browser`, `qe-visual-accessibility`, `security-visual-testing`) | Open-source ("Agentic QE" / Dragan Spiridonov) | MIT | 100+ skills repo-wide; my-lane skills 1-6 files each | 2026-07-24 | 421★ (repo) | Partial router (my lane) / possible broader assurance-router claim outside my lane — **flag for W1/W4** |
| `petrkindlmann/qa-skills` (my-lane: `cross-browser-testing`, `mobile-testing`, `visual-testing`, `agentic-browser-testing`, `cypress-automation`, `playwright-automation`, `selector-drift-recovery`) | Petr Kindlmann (indie) | MIT | 50 skills repo-wide | 2026-06-10 | 44★ | Partial router (my lane) — best content quality found |
| `lambdatest/agent-skills` (appium, xcuitest, espresso, detox, cypress, playwright, puppeteer, selenium, webdriverio, flutter-testing, hyperexecute, smartui, test-framework-migration) | LambdaTest / TestMu AI | MIT | ~50 skill dirs | 2026-07-24 | 335★ repo; e.g. appium-skill 304 installs, selenium-skill 206 | Vendor pack (routes to TestMu AI cloud) |
| `currents-dev/playwright-best-practices-skill` | Currents.dev (CI test-analytics vendor) | MIT (Currents Software Inc, 2026) | 1 SKILL.md + ~8 reference dirs, dozens of .md files | 2026-07-21 | 340★ / 64.8K installs | Technique pack (generic Playwright authoring guide; vendor-published but not vendor-locked) |
| `cypress-io/ai-toolkit` (`cypress-author`, `cypress-explain`, `cypress-docs`) | Cypress.io (official) | MIT | small | 2026-07-06 | 37★ repo; 3.3K/2.8K/2.6K installs | Vendor pack (official) |
| `android/skills@testing-setup` | Google LLC (official) | Apache-2.0 / custom LICENSE.txt | 1 SKILL.md + references | 2026-07-14 | 6357★ (repo) / 677 installs | Technique/setup pack — explicitly out of quality scope (test scaffolding, not verification decision) |
| `wshobson/agents@e2e-testing-patterns` | wshobson (large multi-domain marketplace) | MIT | 1 SKILL.md + 1 references file | 2026-07-22 | 38235★ (repo, huge generic marketplace) / 19.9K installs (highest reach found) | Technique pack — generic E2E best-practices, shallow (testing pyramid, selector advice, common pitfalls) |
| `microsoft/playwright-cli@playwright-cli` | Microsoft (official) | [UNVERIFIED — not hydrated] | — | — | 98.5K installs (highest) | Technique pack (official Playwright CLI skill) |
| `tovimx/maestro-mobile-testing-skill` | Indie | none found at repo level [UNVERIFIED] | — | 2026-02-08 | 17★ / 774 installs | Technique pack (single tool: Maestro) |
| `charleswiltgen/axiom` (`axiom-ios-testing`, `axiom-xctest-automation`) | Indie (Charles Wiltgen) | MIT | not hydrated (path not found via code search) | 2026-07-26 | 1091★ repo / 249+204 installs | Technique pack (iOS/XCTest) — [UNVERIFIED depth] |
| `vabole/apple-skills@xcuitest` | Indie | MIT | not hydrated | 2026-07-26 | 291★ repo / 367 installs | Technique pack (XCUITest) — [UNVERIFIED depth] |
| `skydoves/android-testing-skills@writing-espresso-tests` | Indie (skydoves, known Android OSS author) | Apache-2.0 | not hydrated | 2026-05-25 | 296★ repo / 15 installs | Technique pack (Espresso) — [UNVERIFIED depth] |
| `klamping/webdriverio-skills` (4 skills: writing/analyze/running/creating) | Indie (WebdriverIO community figure) | MIT | not hydrated | 2026-02-19 | 5★ repo / 18-32 installs each | Technique pack, low adoption |
| `testdino-hq/playwright-skill` (`playwright-skill`, `playwright-pom`) | TestDino (test-reporting vendor) | MIT | not hydrated | 2026-07-02 | 332★ repo / 4.7K + 217 installs | Vendor-adjacent technique pack — [UNVERIFIED whether it covers flake/reporting analytics] |
| `secondsky/claude-skills` (`playwright`, `mobile-app-testing`) | Indie multi-domain skill collector | MIT | not hydrated | 2026-07-25 | 195★ repo / 770 + 355 installs | Not hydrated — [UNVERIFIED] likely technique pack given repo is a general multi-domain grab-bag |
| `vasilyu1983/ai-agents-public` (`qa-testing-ios`, `qa-testing-android`) | Indie | MIT | not hydrated | 2026-07-13 | 68★ repo / 164 + 279 installs | Not hydrated — [UNVERIFIED] |
| `bmad-labs/skills@typescript-e2e-testing` | Indie | not hydrated | — | — | 2.1K installs | [UNVERIFIED] |
| `hieutrtr/ai1-skills@e2e-testing`, `affaan-m/ecc@e2e-testing`, `affaan-m/everything-claude-code@e2e-testing` | Indie collectors | not hydrated | — | — | 1.6K, 1.4K, 6.2K installs | [UNVERIFIED]; note `affaan-m/everything-claude-code` repo-level star count returned as 233,465★ by `gh api` — anomalously high for this kind of repo, flagging as **possibly a gh api artifact, not independently confirmed** |
| `manutej/luxor-claude-marketplace@playwright-visual-testing` | Indie marketplace | none found [UNVERIFIED] | — | 2026-06-13 | 61★ repo / 999 installs | Technique pack (visual) — not hydrated |
| `martinholovsky/claude-skills-generator@browser-automation` | Indie | not hydrated | — | — | 216 installs | Likely browser-driving (agentic), not QA — per brief's note, distinguish |
| `sickn33/antigravity-awesome-skills@e2e-testing` | Indie collector | not hydrated | — | — | 189 installs | [UNVERIFIED] |
| `smithery.ai@agent-browser` | Smithery (MCP marketplace) | not hydrated | — | — | 106 installs | Browser-driving skill, not QA (per brief's distinction) |
| `aj-geddes/useful-ai-prompts@visual-regression-testing`, `@test-automation-framework` | Indie prompt-collection | not hydrated | — | — | 605 + 448 installs | [UNVERIFIED] likely generic prompt scaffolds, not engineered skills |
| `patricio0312rev/skills@visual-regression-tester`, `@cypress-playwright-setup` | Indie | MIT | not hydrated | 2026-01-12 | 52★ repo / 241 + 232 installs | [UNVERIFIED] |
| `alirezarezvani/claude-skills@migrate`, `mindrally/skills@selenium-automation`/`puppeteer-automation`/`cypress` | Indie | Apache-2.0 (mindrally) | not hydrated | 2026-06-09 (mindrally) | 1.6K / 1K / 1.6K / 574 installs | Technique packs, not hydrated |
| `dyad-sh/dyad@dyad:debug-with-playwright` | Dyad (AI app builder) | not hydrated | — | — | 27 installs | Debugging aid, not QA router |

Total distinct skill entries surfaced across 26 queries: ~90 (many overlapping across queries, e.g. Appium/Playwright/Cypress skills recur). No result for: "snapshot testing," "cross-browser testing" (as an exact phrase — found via "browser compatibility"-adjacent queries instead), "device matrix," "browser compatibility," "mobile app testing," "ios testing," "flutter testing," "react native testing," "test recorder," "visual diff testing."

---

## (c) Deep notes on top candidates, with verbatim liftable quotes

### 1. `petrkindlmann/qa-skills` — `cross-browser-testing` skill
Repo: https://github.com/petrkindlmann/qa-skills · skills.sh: https://skills.sh/petrkindlmann/qa-skills/cross-browser-testing
License: MIT (verified via `LICENSE` file read). Author metadata: `kindlmann`, version "2.0". Last push 2026-06-10T18:06:18Z. 44 repo stars.

**Liftable — analytics-driven tier system** (verbatim):
```
| Tier | Criteria | Coverage | When to run |
|------|----------|----------|-------------|
| **P0** | >10% traffic share | Full test suite | Every PR, every deploy |
| **P1** | 3-10% traffic share | Smoke + critical paths | Nightly, pre-release |
| **P2** | 1-3% traffic share | Smoke tests only | Weekly, pre-release |
| **Skip** | <1% traffic share | Not tested | Manual spot-check if reported |
```
**Liftable — known-issues log template** (verbatim, forces a test-or-ticket per divergence):
```
| Affected browser | Repro | Workaround / fallback / ticket | Test asserts (user outcome, not CSS) |
```
with the rule: *"A row with no ticket and no fallback is an open bug, not a documented issue."*

**Liftable — "engines are not brands" principle**: *"Playwright's WebKit is not Safari and its Chromium is not Chrome — they share an engine, not the shipped product (codecs, fonts, enterprise policy, update cadence all differ). Report 'WebKit coverage,' not 'Safari coverage,' unless you ran real Safari on a cloud grid."*

**Liftable — Anti-patterns list** (7 named anti-patterns incl. "Testing only on Chrome," "Reporting WebKit/Chromium as Safari/Chrome," "Static browser matrix").

**Liftable — Done When gate** (verbatim, exactly the shape a quality skill's "compatibility matrix" job would want):
```
- Browser matrix defined using real analytics data (last 90 days), with tier assignments
  (P0/P1/P2) documented and justified by traffic share, committed to a file carrying a
  dated `next-review` field.
- ...
- A tracked issue exists for the next quarterly matrix review...
```

### 2. `petrkindlmann/qa-skills` — `mobile-testing` skill
Same repo/license/date. skills.sh: https://skills.sh/petrkindlmann/qa-skills/mobile-testing

**Liftable — framework decision table**:
```
| App type | Primary choice | Why |
| Native iOS/Android, hybrid | Appium 3.x | Driver-based, mature ecosystem, deepest native + gesture coverage |
| React Native | Detox | Gray-box, synchronizes with the RN bridge, fastest feedback, least flake |
| Cross-platform, mixed-skill team | Maestro | Declarative YAML, native AI commands, lowest authoring friction |
| Flutter | Patrol 4.x | Flutter-native integration testing |
```
**Liftable — device farm tier split**: *"Typical split: 60% of tests on P0 devices, 30% on P1, 10% on P2."*
**Liftable — biometric ordering gotcha**: *"enroll the biometric with `device.setBiometricEnrollment(true)` before calling `device.matchBiometric()`. Matching without prior enrollment is a no-op."*
**Liftable — 7 anti-patterns + a "Verification" section with literal exit-code-0 smoke commands** per framework (Appium/Detox/Maestro).

### 3. `petrkindlmann/qa-skills` — `visual-testing` skill
**Liftable — threshold table**:
```
| Option | Use when |
| maxDiffPixels: 0 | Pixel-perfect components (icons, logos, design-system atoms) |
| maxDiffPixels: 50-100 | Full-page layouts where antialiasing varies slightly |
| maxDiffPixelRatio: 0.01 | Full-page screenshots where absolute pixel count varies with viewport |
| threshold: 0.2 | Cross-browser testing where color rendering differs slightly |
```
**Liftable principle**: *"Screenshots are artifacts, not test results. ... A test that says 'visual diff detected' without showing the diff is useless — always upload expected/actual/diff images as CI artifacts."* And: *"A suite with a 10% false-positive rate gets ignored within a month."*

### 4. `proffesor-for-testing/agentic-qe` — `qe-browser`, `e2e-flow-verifier`, `compatibility-testing`, `mobile-testing`, `visual-testing-advanced`
Repo: https://github.com/proffesor-for-testing/agentic-qe · License MIT (verified via LICENSE file). 421★, pushed 2026-07-24 (2 days before this scan — very active).

This is the most heavily engineered set of my-lane skills found. Notable design:
- **`qe-browser`** wraps [Vibium](https://github.com/VibiumDev/vibium) (Apache-2.0, WebDriver-BiDi, 10MB binary) with QE-specific primitives — 16 typed assertion kinds, batch execution, visual-diff scripts, a prompt-injection scanner (attributed: *"ported from gsd-browser (MIT/Apache-2.0)"*), and a semantic intent-scorer (15 intents incl. `accept_cookies`, `submit_form`).
- **Liftable — 3-way exit-code contract** distinguishing a real failure from an environment problem, directly transferable to any browser-driven check in a quality skill:
```
| Exit | Status    | Meaning |
| 0    | success   | every assertion passed / operation completed |
| 1    | failed    | genuine assertion failure or operation error |
| 2    | skipped   | vibium unavailable; environment problem, not a test result |
```
This "skipped ≠ failed, distinguish exit code 2" pattern is genuinely liftable design guidance for any assurance-router evidence contract.
- **`e2e-flow-verifier`** — produces an **evidence ZIP** (screenshots + DOM snapshots + timeline + console/network logs) per flow, closer to "evidence dossier" territory than most technique packs.
- **`compatibility-testing`** and **`mobile-testing`** repeat the same device-tier logic as qa-skills (95%+ coverage heuristic, Tier 1/2/3 = 60/30/10%) — convergent with an independent author, worth noting as a cross-validated heuristic.

**Important scope flag (not verdicted by me)**: this repo also contains, *outside my lane*, skills named `risk-based-testing`, `release`, `quality-metrics`, `defect-intelligence`, `test-automation-strategy`, `qe-quality-gate` (as an agent), `qe-deployment-readiness` (as an agent), and a root `agentic-quality-engineering` skill describing a **19-agent fleet** with **PACTS principles** (Proactive/Autonomous/Collaborative/Targeted/Structured) and explicit "quality decision," "full pipeline," and "Release" agent categories. Verbatim from `agentic-quality-engineering/SKILL.md`:
> *"Quick Agent Selection: ... Quality decision → `qe-quality-gate` ... Full pipeline → `qe-fleet-commander`"*

I did not deep-read those skills (outside my assigned lane) but flag them as the single most important finding for whoever owns risk-based-testing/release-gate/defect-triage territory (W1/W4) to independently verify — this could materially shift the family-wide verdict.

### 5. `lambdatest/agent-skills` — `appium-skill` (representative of the whole vendor pack)
Repo: https://github.com/lambdatest/agent-skills · License MIT (verified). 335★ repo, pushed 2026-07-24.
Confirmed vendor pack: README states *"TestMu AI (Formerly LambdaTest) is the world's first full-stack AI Agentic Quality Engineering platform"* and every skill's job is to **generate test code** that optionally runs on TestMu AI's cloud (100+ real devices). `appium-skill/SKILL.md` opens: *"You are a senior mobile QA architect. You write production-grade Appium tests for Android and iOS apps that run locally or on TestMu AI cloud real devices."* This is code generation, not verification decision-making — classic vendor pack, not competitive with assurance-router positioning.

### 6. `currents-dev/playwright-best-practices-skill`
Repo: https://github.com/currents-dev/playwright-best-practices-skill · License MIT (Currents Software Inc, verified via LICENSE.md). 340★, 64.8K installs (2nd-highest install count found in my whole scan), pushed 2026-07-21.
Despite being published by a flaky-test/CI-analytics vendor (Currents.dev), the skill content itself is a comprehensive **generic Playwright authoring reference** (E2E, component, API, visual, a11y, security, Electron, extensions — an "activity-based reference guide" table routing to ~40 markdown files under `core/`, `advanced/`, `testing-patterns/`, `debugging/`, `infrastructure-ci-cd/`). It has a dedicated `debugging/flaky-tests.md` (not fully read — out of budget) but the SKILL.md framing is "how do I write/debug this test," i.e., construction, not a release-gate or suite-health decision. Classified as technique pack, not a quality competitor — but worth a follow-up read of `flaky-tests.md` by whoever owns flake-economics scope, given the vendor's specialty.

---

## (d) Liftable-artifact list (URL + license)

1. Browser-matrix P0/P1/P2 traffic-tier table + known-issues log template — `petrkindlmann/qa-skills/skills/cross-browser-testing/SKILL.md` — MIT.
2. Mobile framework-decision table (Appium/Detox/Maestro/Patrol) + 60/30/10 device-tier split — `petrkindlmann/qa-skills/skills/mobile-testing/SKILL.md` — MIT.
3. Visual-diff threshold table (`maxDiffPixels`/`maxDiffPixelRatio`/`threshold` by use case) — `petrkindlmann/qa-skills/skills/visual-testing/SKILL.md` — MIT.
4. 3-way exit-code contract (success/failed/skipped, "skipped ≠ failed") — `proffesor-for-testing/agentic-qe/.claude/skills/qe-browser/SKILL.md` — MIT.
5. Evidence-ZIP pattern (screenshots + DOM snapshots + timeline + console/network log per flow) — `proffesor-for-testing/agentic-qe/.claude/skills/e2e-flow-verifier/SKILL.md` — MIT.
6. iOS-vs-Android device coverage tiers + differences table — `proffesor-for-testing/agentic-qe/.claude/skills/mobile-testing/SKILL.md` — MIT.

All six are MIT-licensed (verified from each repo's LICENSE file directly, not metadata) — safe to paraphrase/restructure for a new skill; verbatim copying of tables should still carry attribution given license notice-preservation norms.

---

## (e) What I could NOT verify, and why

- **microsoft/playwright-cli@playwright-cli** (98.5K installs, the single highest-install skill in my whole scan) was not hydrated — ran out of prioritization budget; official Microsoft skill, worth a follow-up read given its reach.
- Several repos returned skills.sh listings but I did not open their SKILL.md content: `charleswiltgen/axiom` (couldn't locate the file path via `gh search code`), `vabole/apple-skills`, `skydoves/android-testing-skills`, `klamping/webdriverio-skills`, `testdino-hq/playwright-skill`, `secondsky/claude-skills`, `vasilyu1983/ai-agents-public`, `mindrally/skills`, `patricio0312rev/skills`, `manutej/luxor-claude-marketplace`, `aj-geddes/useful-ai-prompts`. Marked `[UNVERIFIED]` in the table above — none showed obvious router-scope signals in their skill names/descriptions returned by the CLI, so I prioritized the repos with clearer router-like signals (qa-skills, agentic-qe, lambdatest).
- `affaan-m/everything-claude-code` repo star count returned by `gh api` as 233,465 — this is anomalously high for what looks like a personal skills collection and I could not cross-check it against a second source within budget. Flagging as possibly a `gh api` data artifact rather than a confirmed figure.
- Did not verify whether `martinholovsky/claude-skills-generator@browser-automation` and `smithery.ai@agent-browser` are pure browser-driving (agent-navigates-the-web) skills vs. having QA claims — the brief asked me to distinguish these; based on names/description snippets in the CLI output they read as browser-driving, not QA, but I did not open their SKILL.md to confirm.
- I did not deep-read `risk-based-testing`, `release`, `quality-metrics`, `defect-intelligence`, `test-automation-strategy` inside `proffesor-for-testing/agentic-qe` or the 15+ non-my-lane skills inside `petrkindlmann/qa-skills` (release-readiness, test-strategy, quality-postmortem, qa-metrics) — these are W1/W4 territory per the brief's split; I flag their existence but did not verdict them.
- WebSearch: 0/10 used — not needed, `gh api` + skills CLI gave everything required.

---

## (f) Full search log (query → hit count)

1. "e2e testing" → 6 hits
2. "end-to-end testing" → 6 hits
3. "cypress" → 6 hits
4. "selenium" → 6 hits
5. "webdriverio" → 6 hits
6. "puppeteer" → 6 hits
7. "browser automation testing" → 6 hits
8. "visual regression" → 6 hits
9. "screenshot testing" → 6 hits
10. "snapshot testing" → 0 hits
11. "cross-browser testing" → 0 hits
12. "device matrix" → 0 hits
13. "browser compatibility" → 0 hits
14. "mobile app testing" → 0 hits
15. "ios testing" → 0 hits
16. "xcuitest" → 6 hits
17. "android testing" → 6 hits
18. "espresso testing" → 6 hits
19. "maestro mobile testing" → 6 hits
20. "detox react native testing" → 6 hits
21. "appium" → 6 hits
22. "page object model" → 6 hits
23. "flutter testing" → 0 hits
24. "react native testing" → 0 hits
25. "test recorder" → 0 hits
26. "visual diff testing" → 0 hits

Total: 26 queries, 16 returned results, 10 returned zero (either genuinely absent from the index, or phrased differently than indexed skill descriptions — e.g. "flutter testing" returned nothing here but `lambdatest/agent-skills@flutter-testing-skill` exists and was found via the `appium` / repo-listing route instead, confirming the CLI's search is title/description-keyword-matched, not exhaustive).

Raw CLI output preserved at: `/private/tmp/claude-501/-Users-tamas-Documents-Personal-Projects-digital-product-skill/6e26377a-a327-4398-9067-5e297b41c424/scratchpad/search_log.txt` (session-local, not part of deliverable).
