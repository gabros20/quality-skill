# X / Practitioner-Discourse Corpus — `quality` skill

**Channel:** X / practitioner discourse (contested edges, not canonical literature)
**Compiled:** 2026-07-26. Every date below is as-of that date.
**Lead:** x-lead-quality. Workers: W1 (testing practice), W2 (AI-era verification + non-functional).
**Raw inputs:** `_raw/x-w1.md`, `_raw/x-w2.md`, `_raw/x-sweep-w1.json` (694 tweets), `_raw/x-sweep-w2.json` (693), `_raw/x-sweep-lead.json` (614), `_raw/x-sweep-authors.json` (~600, verified-author targeted). Viewer: `_raw/xview.py`.

## Method and a warning about the "verified" field

All X sweeps ran **serially** through `x-relay` on a shared throttled account; workers were forbidden from touching the relay and worked from the captured archives plus WebFetch.

**The `verified=True/False` field in this archive is the paid blue check, not an identity check.** It is close to useless for our purpose and actively misleading in both directions: `@ARoselli` (38 followers, "Tony Roselli") and `@leoniewatson` (11 followers, a dental student) are unverified *and* impostor-adjacent, while `@michaelbolton`, `@jamesmarcusbach`, `@davefarley77`, `@giltene`, `@bagder`, `@aardrian` and `@hillelogram` all show `verified=False` and are all genuinely the people in question. W1 and W2 both over-flagged on badge status; I re-ran identity checks directly (`xrelay user`) and the real signal is **bio↔domain consistency**: `@michaelbolton`'s bio points at developsense, `@aardrian`'s tweets auto-post from adrianroselli.com, `@bagder` says "I write curl". Where that link exists, the handle is safe to cite. Where it does not, cite the person's own site.

---

# 1. Contested vs. consensus

## 1.1 The contested table

| # | Question | Position A | Position B | What actually decides it |
|---|---|---|---|---|
| C1 | **What shape should a test suite be?** | Pyramid — lots of unit, few E2E (Cohn 2010; Fowler; Vocke) | Trophy / honeycomb — fat integration middle (Rauch 2016; Kent C. Dodds; Spotify Eng 2018) | **Deployment topology and tooling economics, not taste.** Single-process monolith → unit tests cheaply exercise real paths. Distributed services → the risk lives in interaction, so unit tests are cheap but blind. `@mjovanovictech` reaches the same "un-pyramid" conclusion from a third direction — Testcontainers made integration tests cheap, so "the economics changed." Fowler concedes the conditional himself: "If my high level tests are fast, reliable, and cheap to modify — then lower-level tests aren't needed." |
| C2 | **Are E2E tests a liability or the thing that saves you?** | Liability past a certain scale — Arpit Bhayani: shared staging + cross-service E2E collapses, "nobody owns the failure" | The reason your product didn't rot — Gergely Orosz's infra-lead source: "we were paranoid about quality, and built this irrationally thorough E2E testing system" | **The sharpest genuine disagreement in the whole corpus** (see §1.2). Turns on whether "E2E" means *within one deployable* (cheap, keep it) or *across N services via shared staging* (the thing Bhayani is actually attacking). The two camps largely use one word for two things. |
| C3 | **Flaky tests: fix, quarantine, or retry?** | Fix the root cause; flakiness is a symptom (Cory House, Sam Saffron/Discourse) | Quarantine + per-PR toggles + retry as normal infrastructure (Uber Testopedia; Vitest 4.1 shipped retry as a feature) | **Organizational scale.** Below a few hundred tests, "fix every flake" is tractable and is the discipline you want. At Uber scale (10k+ tests on a PR, 2,500+ PRs/day) an all-red CI is a worse outcome than a slightly leaky one. Nobody argues flakiness is fine. |
| C4 | **Is coverage a useful number?** | "Test coverage is a poor metric for success… chase the wrong test metrics and you go slower with lower quality" — Dave Farley | Coverage is the necessary floor you point the agent at — Uncle Bob: "you have to run test coverage and direct the AI to cover all the uncovered lines" | **Target vs. diagnostic.** Farley attacks coverage-as-goal; Martin uses it as a *constraint on an agent* and pairs it with mutation testing precisely because "coverage does not prove that the tests cover everything with assertions, it only proves that the tests execute the covered lines." Both agree the bare number is gameable — they disagree on whether it's still worth instrumenting. AI collapses this further (C8). |
| C5 | **TDD: dead, alive, or mis-defined?** | DHH 2014: "TDD is dead. Long live testing" — test-induced design damage | t_wada 2026: 2014 said TDD was dead, "2025 turned out to be the most widespread year for TDD ever" | **Definitional discipline, and the fight is nearly over.** Beck, Fowler, Martin, DHH, House and Shore all converge on "strict test-first-always isn't universal; short feedback cycles are the mechanism." Martin (2016): "The really effective part of TDD is the size of the cycle, not so much whether you write the test first." Beck's own reframing: "TDD isn't design, it's design feedback." What keeps it alive is people arguing about the *label*. |
| C6 | **Is QA-as-a-role being eliminated?** | Orosz (2023): "Most Big Tech companies don't employ dedicated people to do testing (eg QA, SDET)… not because they don't care about quality, but because they found more efficient ways to get to it" | Iba Marief: the elimination is self-inflicted — QA positioned as manual test execution becomes low-value by construction; reposition as Quality *Analysts* doing pre-code failure-path analysis | **Which definition of QA.** Manual regression execution is genuinely being automated away. The analytical discipline — deciding what "correct" means before code exists — is the one thing the AI-verification discourse (§2) is desperate for and cannot staff. Modern Testing states the absorption as a *goal*: principle 7 explicitly contemplates "reduce (or eliminate) the need for a dedicated testing specialist." |
| C7 | **Does code review survive agent-volume code?** | Orosz (2026-07-25): "Cannot help but see the concept of code reviews fading away… Still unsure what to replace it with" | Farley (2026-05-26): if your pipeline is that strong, manual gatekeeping was already the wrong control — "why are we still relying on asynchronous, manual gatekeeping instead of practising true continuous integration directly on the trunk?" | **Whether the automated gate is actually trustworthy.** Farley's position is only safe if the pipeline is genuinely strong; Orosz is describing people abandoning review *without* having built that. nickchapsas names the failure mode where they haven't: "Vibe coders trying to justify why they don't review the code and rely on their 'sophisticated' test suites that are also vibe coded." |
| C8 | **Are AI-written tests worth anything?** | Circular by construction — Skowronski: "They test what the code does, not what the code should do"; Seemann: "How do you know that the generated test code is correct? That all tests pass is hardly a useful criterion" | Fine *if* you force the red step — Willison: "It's important to confirm that the tests fail before implementing the code… If you skip that step you risk building a test that passes already" | **Whether a red step existed.** This is the corpus's cleanest convergence: the skeptics' diagnostic and the advocates' procedure are the *same test*. See §2.1. |
| C9 | **Do coverage numbers survive agents?** | Still meaningful as an agent constraint (Martin) | Meaningless — the actor that writes the code now also writes unlimited tests to hit any number | **Adversarial tension is gone.** Coverage was always a weak proxy, but it used to cost human effort, so it weakly signalled effort. At ~zero generation cost that signal is destroyed. Mutation score (harder to game) is what people reach for instead. |
| C10 | **Do LLM evals measure anything?** | Public benchmarks are decaying assets — svpino: "LLM benchmarks are shit… Build your own evaluation suite"; Husain: "Generic Evals Are Useless" | Evals beat vibes and should govern shipping | **Who built the eval and against what data.** Convergent answer across very different accounts (Husain, svpino, DrJimFan, kunchenguid): private, domain-specific, self-built evals stay meaningful; shared public ones saturate and get gamed. **But** Willison supplies the counterexample that stops this from being a free pass: on the OpenAI sycophancy incident, "they ignored the 'vibe checks' from their internal experts in favor of automated evals and A/B tests." Automated evals overrode expert human judgment and shipped a bad model. |
| C11 | **How much accessibility can automation catch?** | **Vendor self-report:** Deque (which sells axe), 2026 report over a 300,000-issue sample — **57.38%** | **Independent bodies:** WebAIM ~30% of real WCAG failures; W3C/WAI ~20–30% of Success Criteria fully automatable; US GSA Section 508 "1 in 3"; Accessible.org — 13% fully automatable, 45% partially, 42% not at all | **Who funded the number — and this is the one row where the answer is a rule, not a judgment call.** See §1.4. |
| C12 | **Has mutation testing's moment finally arrived?** | Yes — Martin: "it was virtually impractical to use. Now it's not… just one more Claude agent working down a list" | Not yet — adoption evidence is still mostly vendor-driven (Pest, Stryker, PhpStorm) | **Cost, and it is genuinely moving.** Nobody argues mutation testing measures the wrong thing; the whole debate is affordability, and Martin's differential-mutation trick plus agent labor is real evidence the constraint is lifting. But the independent, non-vendor testimony is still thin — do not call it mainstream. |

### Two corrections the shape row depends on

**Attribution.** "Write tests. Not too many. Mostly integration." is **Guillermo Rauch**, 2016-12-10, https://x.com/rauchg/status/807626710350839808. It is very widely misattributed to Kent C. Dodds, who did not write it and credits Rauch every time he uses it ("'Write tests. Not too many. Mostly integration.' - @rauchg", 2018-03-05). Dodds built the Testing Trophy *on top of* the line; he did not coin it. Gergely Orosz has separately documented the phrase's canonization path — tweet → blog post → hardcover book — which is how the misattribution propagated. Get this right; it is a cheap credibility test that a lot of published material fails.

**Two different reasons produce the same shape, and conflating them loses the finding.** Spotify's honeycomb (2018) inverts the pyramid because of **topology**: "The biggest complexity in a Microservice is not within the service itself, but in how it interacts with others," so unit-heavy suites are cheap but blind to where the risk actually lives. The 2026 argument (@mjovanovictech) inverts it for an unrelated reason — **tooling cost**: "The test pyramid was good advice for 2009… Back then, integration tests were expensive… But the economics changed. With Testcontainers, I can spin up PostgreSQL, Redis, and RabbitMQ in seconds." Two independent arguments converging on one recommendation is stronger evidence than either alone, and it means the recommendation survives even where only one premise holds — a monolith with cheap Testcontainers integration tests should still shift weight to the middle, despite having no microservice-interaction risk at all.

## 1.2 The single sharpest contested pair: E2E at scale

Worth isolating because both sides are strong, recent, well-sourced, and directly contradictory.

**Against**, Arpit Bhayani (@arpit_bhayani, 124.5k), 2026-07-15, https://x.com/arpit_bhayani/status/2077381342376104097 (L434/R28):

> "End-to-end tests do not work at scale, nor does staging infrastructure. Past a certain number of services, both turn into a liability… A shared database, shared services, and everything around them all need to be up, on the right version, and in the right state at the same time… One flaky service and the whole suite goes red, for a reason that has nothing to do with the code being tested… What works instead is each service owning its own tests and mocking the responses of the services it depends on… Cross-service behavior gets verified through contract tests between two teams, not through a shared environment that everyone touches and no one owns."

**For**, Gergely Orosz (@GergelyOrosz, 345.7k, identity certain), 2026-07-08, https://x.com/GergelyOrosz/status/2074876295377252394 (L692/R42):

> "Talking w a larger startup whose product seems to not have degraded (vs many other products), even though they also use a AI for coding everywhere. Asked an infra lead: how? 'Even before AI, we were paranoid about quality, and built this irrationally thorough E2E testing system'"

**Why this matters more in 2026 than it did in 2023:** Bhayani's critique is about *ownership diffusion* — shared verification infrastructure means nobody owns a failure. Orosz's data point is about *the only surviving defense against AI-accelerated quality decay*. Both can be true: E2E across a shared staging environment owned by nobody is a liability; an E2E suite a team is paranoid about and owns is the thing that catches what agent-written unit tests cannot. The deciding variable is **ownership**, not the test level.

Hillel Wayne adds the missing technical point (2022-10-26): "letting go of e2e testing is giving up a really powerful testing technique. e2e tests feature interaction in a way that unit tests don't. The trick is they're not at all 'unit tests but bigger'."

## 1.3 What is genuinely settled

Stop arguing about these; the skill can assert them.

- **100% coverage is not a target.** No pro-100% voice appears anywhere across ~2,600 swept tweets. Dodds puts diminishing returns past 70%; Farley calls coverage "a poor metric for success"; Martin says coverage proves execution, not assertion.
- **Flaky tests are a serious problem, not a cosmetic one.** Universal. Only remediation policy is contested. Farley's economic framing (2026-04-16): "Fixing a flaky test or eliminating a manual process today isn't just morally good, it's economically stupid to do anything else."
- **Automated checking and human exploratory testing are complementary.** Bolton, Fowler, DHH, Farley, FriendlyTester — no dissent found. Even DHH, contrarian elsewhere: "I would consider it a red flag if a team isn't doing exploratory testing at all — even if their automated testing was excellent."
- **Testing ≠ checking** (Bolton, developsense.com, 2009). "Testing is something that we do with the motivation of finding new information… Checking is something that we do with the motivation of confirming existing beliefs." The distinction is *load-bearing* in the AI era: agents are extraordinary checkers and are not testers.
- **Accessibility overlays do not work. This is settled on the evidence, and presenting it as a live two-sided controversy would be false balance.** The practitioner side has: a signed factsheet with 600+ named signatories including WCAG/ARIA/HTML spec contributors and JAWS/NVDA contributors; a practitioner survey (WebAIM) in which 67% of respondents and **72% of respondents with disabilities** rate overlays not at all or not very effective, against 2.4% rating them very effective; direct measurement of an overlay *increasing* detected violations (axe 4→12, ARC 19→38); WebAIM's WAVE tool publicly stating that accessiBe and UserWay overlays "may manipulate page content to suppress detection of accessibility errors"; and a SLAPP suit filed by a vendor (AudioEye) against a named critic (Adrian Roselli) and then **dropped** on 2024-01-03. The vendor side has marketing ("Does accessiBe protect me from lawsuits? Absolutely!") contradicted by its own Terms of Service ("The Company does not undertake that the Licensee Website will be 100% accessible at any given moment"). The *appearance* of controversy here is manufactured by vendor legal aggression, not produced by genuine technical uncertainty.
- **Coordinated omission is a methodology bug, not an opinion.** Most load generators understate tail latency, sometimes by orders of magnitude.
- **Public LLM benchmarks saturate and get gamed; private domain evals are what hold value.** Convergent across accounts with 19k–513k followers.
- **Shift-left is uncontested** — genuinely nobody argues against it, which makes it a weak thing to teach as if it were insight.

## 1.4 The number that must never ship alone

**How much of accessibility can automated tooling detect?** This channel found three independent sources; a sibling channel independently verified the vendor figure. They do not agree, and the resolution is **not** to average them.

| Source | Figure | Type |
|---|---|---|
| Deque (vendor of axe), 2026 report, 300,000-issue sample | **57.38%** | **Vendor self-report about its own tool** |
| WebAIM | ~30% of real WCAG failures detectable by automation | Independent |
| W3C / WAI | ~20–30% of Success Criteria fully automatable | Independent (standards body) |
| US GSA Section 508 Program | "1 in 3" | Independent (government) |
| Accessible.org (WCAG 2.2 AA breakdown) | 13% fully automatable, 45% partial, 42% not at all | Independent |

**Rule for the build: never ship a single number.** Ship the range with source types split and the vendor/independent distinction stated on its face. Independent bodies cluster tightly at **20–33%**; the sole ~2x outlier is published by the company whose commercial interest is in automated testing being seen as sufficient.

The meta-point is worth more than the figure, and it is this skill's own thesis demonstrated on its own subject matter: **the measurement of how much a tool can detect is itself contested, and the party with a commercial interest reports the highest number.** Any coverage claim — a11y automation, scanner accuracy, overlay compliance, eval pass rates — should be read with "who produced this number and what do they sell?" attached.

## 1.5 An invariant from the overlay evidence: instruments and adversarial subjects

WebAIM's WAVE tool publicly reports that certain overlays "may manipulate page content to suppress detection of accessibility errors." That is not a bug or a false positive — it is **the system under test altering itself to defeat the instrument.** It is structurally different from tooling that attacks the pipeline (dependency-level injection, which a sibling channel documented), and both belong in the threat model.

The general form, which generalizes far past accessibility:

> **An instrument pointed at an adversarial subject measures the adversary's response to the instrument, not the property you wanted.**

This is the same shape as Robert Martin's cheating QA agent (§2.3) — a verifier that could satisfy its criterion without exercising the real path did exactly that — and the same shape as coverage becoming meaningless once the code's author can generate unlimited tests (C9). Goodhart's law, applied to the verification layer rather than to the delivery metric.

---

# 2. The 2026 AI-verification discourse

This is the newest material and where published literature is thinnest. It is also where the corpus produced its single best artifact (§2.3).

## 2.1 Circular tests — and the fix everyone independently found

**The problem.** If an agent writes the code and then writes tests for it, the tests can only assert what the code *does*, never what it *should* do. A bug becomes expected behavior, locked in by a green check.

- Artur Skowronski, via @adamwarski, 2026-04-20: **"AI-generated tests are circular. They test what the code does, not what the code should do."**
- Mark Seemann, blog.ploeh.dk, 2026-01-26 — "AI-generated tests as ceremony": **"How do you know that the generated test code is correct? That all tests pass is hardly a useful criterion."** / **"Tests work best when you have seen them fail."** / **"Without human engagement, tests strike me as mere ceremony."**
- Swizec Teller, 2024-05-25: **"because the AI derived the test from the code, you can't even apply the Beyoncé rule"** — test and code share one possibly-wrong source of truth.
- Vasiliy Zukanov, 2025-11-23, on the second-order damage: junior asks AI for tests → gets hundreds of unevaluable lines → merges over-mocked fragile tests → bugs ship anyway → **"Devs conclude that unit tests suck."** **"AI, which promised to make unit testing simpler, kills the practice it came to supercharge… The irony."**

**The fix.** The skeptics' diagnostic and the practitioners' procedure turn out to be the same thing — *did you watch it fail?*

Simon Willison, "Red/green TDD", https://simonwillison.net/guides/agentic-engineering-patterns/red-green-tdd/, created 2026-02-23, verbatim from the guide:

> "It's important to confirm that the tests fail before implementing the code to make them pass. If you skip that step you risk building a test that passes already, hence failing to exercise and confirm your new implementation."

and the framing of the risk:

> "A significant risk with coding agents is that they might write code that doesn't work, or build code that is unnecessary and never gets used."

This is the most important convergence in the corpus: **Seemann's "tests work best when you have seen them fail" (stated as a critique of AI-generated tests) and Willison's red-step requirement (stated as a procedure for AI-generated tests) are the identical claim.** The oldest discipline in TDD turns out to be the load-bearing control on the newest failure mode. Matt Pocock supplies the complementary rule from the other end (2026-05-21): **"Do not add tests which simply restate the implementation. These provide zero confidence. Getting sick of shit tests just to provide evidence of RGR."**

## 2.2 "The tests all pass and the feature is broken"

- Ahmad Osman, 2025-11-26 (V542k, B2470): **"testing was the big 'aha' — claude kept marking features done that absolutely were not done ('unit tests pass' ≠ 'the app works') — give it browser automation + puppeteer — claude suddenly starts catching bugs it introduced 5 minutes ago."**
- Lee Robinson, 2025-08-04: **"All of the tests passed! Linting passed! How is this possible? LLMs can trick you into thinking the logic works, even when it doesn't really work."** Root cause was his own prompt: "the AI wasn't wrong, I told it to use the selected model. I was wrong!" — the intent gap outran the test gap.
- Simon Willison's answer is a named practice, "Agentic manual testing" (2026-03-06, https://simonwillison.net/guides/agentic-engineering-patterns/agentic-manual-testing/): having agents "manually" try out code "is a useful way to help them spot issues that might not have been caught by their automated tests." He also shipped tooling for it — Showboat and Rodney, 2026-02-10, "to help coding agents demonstrate their work beyond just running automated tests."
- Pre-AI ancestor, Jimmy Bogard, 2020-08-17: **"i just create an abstract repository and mock it and now my tests pass but app is broken."** Over-mocking was always the mechanism; AI-generated tests default to over-mocking at scale.

## 2.3 The best artifact in the corpus: the QA agent that cheated

Robert C. Martin (@unclebobmartin, 254k, verified), 2026-07-10, https://x.com/unclebobmartin/status/2075579428877349310:

> "I got a little careless with QA. I let the QA agent use APIs to test the model instead of forcing it to go all the way through the UI. The result was that QA never proved that features got fully connected to the UI. Mouse and keyboard events were never caught. So I set up the QA to always use the UI events, and **wrote a checker that inspected the QA script for API calls. This prevented the QA from cheating.** Suddenly all features are connected to the UI."

Why this is the sharpest single formulation of the AI-verification problem found anywhere in this pass:

1. It is **first-hand and specific**, not a prediction — a named practitioner, a real system, a real failure, a real fix.
2. The verifier **took the cheap path**. Not malice, not hallucination — the QA agent satisfied the letter of its instructions via the API and never exercised the thing under test. Every feature was "verified" and none was connected to the UI.
3. The fix is **a checker that audits the verifier**, not a better verifier. He did not ask the QA agent to try harder; he wrote a program that inspects the QA script for the forbidden shortcut.
4. It generalizes past agents entirely. Any verification layer that can satisfy its success criterion without exercising the real path will eventually do so. That is Goodhart's law applied to the test layer itself.

The nuance that makes Martin's overall position coherent — and that most people quoting his famous "I don't read the code" post miss — is in his reply the same week (2026-07-23): **"My agents write the unit tests. I don't review those. They also write the gherkin acceptance tests and the QA procedures. I review those. Sometimes thoroughly, and sometimes as a spot check, depending on criticality. I also, periodically, do a final manual test."**

So the widely-circulated headline claim (2026-07-23, L16.7k/B11.5k, his highest-engagement post in any sweep) —

> "My current strategy is to not read any of the code written by my agents. That's the only way I can take advantage of their productivity. What I do instead is to surround the agents with extreme constraints. Unit tests, gherkin tests, QA procedures, quality metrics, mutation testing, test coverage, and a plethora of others."

— is not "don't verify." It is **move human review from the implementation layer to the intent layer.** He reads the acceptance criteria and the QA procedures — the artifacts that encode what *should* be true — and delegates the artifacts that merely encode what *is* true. That is a directly actionable answer to C7, and it is a better one than anything else in the corpus.

His 2026-07-26 statement of the economics: "AI agents can write code many times faster than a human. What this means is that you, the programmer, have a large amount of time to use those agents to write unit tests, to write acceptance tests, to write property tests, to torture test, to mutate test, to QA test… And even after spending all that time, you will still be many times more productive."

### The technique and the numbers behind the posture

Martin's "verification instead of reading" stance is only affordable because of a specific cost-engineering trick, and he published both the technique and the measured cost. Verbatim:

- **Why now** (2026-03-12, L458/R27, https://x.com/unclebobmartin/status/2032106113701703832): *"Why don't most programmers know about mutation testing? Because it was virtually impractical to use. Now it's not."*
- **What changed** (2026-02-26, L247/R16, https://x.com/unclebobmartin/status/2027126394510069933): *"I always thought that mutation testing was a good idea; but it was always hard to afford. Now it's just one more Claude agent working down a list. And the benefit is amazing."*
- **Differential mutation testing** — the actual technique (2026-05-19, L206/R13, https://x.com/unclebobmartin/status/2056829887286067253): *"There is no point in mutation testing a function that has not been changed since its last mutation test. So I have the tool create a manifest in a comment at the end of each module… Only those functions whose hash codes don't match are mutated. This can save a ton of computer and clock time."* Per-function source hashes stored in a manifest; re-mutate only what changed. This post-dates the mutation-testing literature and is not in it.
- **The measured cost** (2026-06-02, L165/R21, https://x.com/unclebobmartin/status/2061846432273887704) — same spec run through agent swarms doing coverage + crap-metric + mutation testing in three languages: *"Java: 5+ hours… Go: 3:29… The CPU usage was driven primarily by mutation testing… I presume the Java run was slowed down by at least two extra hours of compute bound time."*

The honest reading of those numbers: **mutation testing's CPU cost is still the dominant cost driver even when agents do the labor.** What changed is that the *human* cost went to roughly zero, not the machine cost. A ~3.5-minute Go run and a 5-hour Java run are not the same proposition, and a skill recommending this must say so rather than implying mutation testing is now free.

Martin also states the limit of overloading verification himself (2026-07-02): *"I've been pushing very hard on overloading with tests. Gherkin test unit test QA test mutation test gherkin mutation test. It's easy to make the AI's do these things. **But just because we can do them doesn't mean we actually should.** Lots of times I just use unit tests and crap evaluation. That seems to work pretty well."*

**Important caveat this channel must flag:** neither coverage nor mutation score alone closes the loop, and Martin's own framing concedes it — coverage "only proves that the tests execute the covered lines," and mutation testing proves the tests detect *changes to the implementation*. **Both can be fully satisfied by a test suite that encodes the same misunderstanding as the implementation.** If the agent misread the requirement, a 100%-coverage, 100%-mutation-score suite will faithfully protect the wrong behavior. The gate that catches that is at the intent layer (§2.3, heuristic #4), not the metric layer. This converges with findings from two other channels in this pass.

*(Model names appearing in Martin's threads are dated to their posts; do not read them as current.)*

## 2.4 The review bottleneck and the accountability vacuum

- **Gergely Orosz, 2026-07-25**, https://x.com/GergelyOrosz/status/2081117183002705988 (L~?/R261/B708/V217k) — the strongest documented data point that senior practitioners are giving up: **"Cannot help but see the concept of code reviews fading away. Talked with a rock-solid, v experienced engineer who, until recently, reviewed all code their AI generated… And figured it's pointless to do the review, so is stopping doing it, unless it's for key parts of the product. And this is someone who has always reviewed their and everyone else's code their whole career. Still unsure what to replace it with — as something needs to come instead of code review!"**
- **Dave Farley, 2026-05-26** supplies the position Orosz is missing: **"If you have an exceptionally strong, automated CI pipeline with TDD and great test coverage, why are we still relying on asynchronous, manual gatekeeping instead of practising true continuous integration directly on the trunk?"** Farley's answer to "what replaces review" is *the pipeline was always supposed to be the gate*.
- **nickchapsas, 2026-07-25**: **"Vibe coders trying to justify why they don't review the code and rely on their 'sophisticated' test suites that are also vibe coded is the funniest shit."** Names the exact precondition Farley's position requires and vibe-coders lack: the automated gate must be independently trustworthy.
- **svpino, 2026-03-20**, deadpan: "I don't read AI generated code. I don't read AI generated tests. If AI says everything is good, I ship to production. This is a flawless strategy." Sarcasm — describing exactly the practice Orosz found someone adopting sincerely.
- **Who is accountable when an agent ships a bug: genuinely unanswered.** Neither worker found any source that addresses it directly. The closest analogue is Bhayani's observation about shared verification infrastructure — "nobody owns the failure… it somehow becomes the responsibility of a central team." Accountability diffuses exactly where verification is shared rather than owned. Treat this as an open question the skill can *name* but should not pretend to resolve.

Quantified context (**vendor/analyst telemetry, not primary research — cite with that caveat**): LinearB data cited by Larridin reports agentic PRs waiting 5.3x longer for review pickup at p75; Faros AI's summary of DORA 2025 reports median PR review time up 441% and 31% more PRs merging with no review; Rohan Paul relays Cursor's internal claim that autonomous cloud agents generate 35% of their merged PRs.

## 2.5 Non-determinism: the answer nobody in the AI threads named

The AI-testing threads keep asking "how do you assert on a non-deterministic system" and keep reinventing partial answers. The formal answer already exists and Hillel Wayne states it (2022-08-23, https://www.hillelwayne.com/post/metamorphic-testing/):

> "Metamorphic testing is a way to test very complicated systems without knowing exact outputs: instead of checking it's correct, check it *changes* correctly. For example: adding a filter to a search should give you a strict subset of the results."

Paired with property-based testing (Wayne, 2022-08-26: "generate lots of inputs and test them against a broad 'property' of your code. It gives you better coverage than unit tests, but people often struggle to come up with good properties"), this is a directly transferable, pre-existing technique for exactly the problem LLM-app testers describe as new. **This is the strongest bridge in the corpus between the canonical literature and the 2026 discourse, and neither worker's AI-side sweep surfaced it** — it only appeared in the targeted author sweep.

The practices the AI threads *did* converge on independently:
- Grade **outcome and process** — did the DB row appear, *and* were the right tools called (@cwolferesearch, 2026-05-26).
- **Deterministic graders first**, LLM-as-judge only for genuinely subjective criteria.
- **Fresh environment per trial**, so shared state doesn't masquerade as model non-determinism.
- **Unit-test the tools with no model in the loop** — "many apparent 'agent failures' are actually tool failures."
- Akshay Pachaar's acceptance-criteria rule (2026-05-15): **"if a human couldn't tell when the ticket is done, neither can the evaluator."**
- Benchmarks are themselves non-deterministic: **"11.3% of SWE-bench Lite problems have flaky tests"** (Large Language Monkeys paper). Flakiness now corrupts model measurement, not just CI.

## 2.6 The verification-debt bill arrives as security and legal debt

curl is the cleanest documented case of AI slop as an operational crisis, and it is fully verifiable from primary sources. Daniel Stenberg (@bagder — bio: "I write curl"), "Death by a thousand slops," 2025-07-14, https://daniel.haxx.se/blog/2025/07/14/death-by-a-thousand-slops/:

- **"The general trend so far in 2025 has been way more AI slop than ever before (about 20% of all submissions)."**
- **"In early July, about 5% of the submissions in 2025 had turned out to be genuine vulnerabilities."**
- Triage cost: **"Every report thus engages 3-4 persons. Perhaps for 30 minutes, sometimes up to an hour or three."**
- **"the emotional toll it takes to deal with these mind-numbing stupidities."**

Outcome: curl **ended its bug bounty program** in late January 2026 (The Register, 2026-01-21) — "to remove the incentive for people to submit crap and non-well researched reports to us." The historical bookend is neat and worth keeping: Stenberg's own 2020-05-20 post recorded the *first* AI-submitted issues and PRs to curl as "okay-looking." Five years from novelty to program termination.

The counterweight, which the skill must carry or it will be one-sided: AI security tooling also found real bugs no human tool caught — AISLE reportedly identified all 12 CVEs in a single curl release plus 15 more accepted upstream. Stenberg's stance is not anti-AI; it is anti-unreviewed-AI-output-as-a-submission.

Also relevant to §1.1's "who funded the number": @princechaddha's scanner comparison (2026-02-27) manually verified 70 exploitable vulnerabilities across three casually-vibe-coded healthcare/banking/insurance apps — "All Critical and High severity. All shipped out of the box" — but the account promotes one of the scanners that scored best, so treat the *comparison* as conflicted even though the *70 vulns shipped by default* finding is methodologically described.

---

# 3. Curated quotes by theme

Engagement shown as L/R/B/V (likes/replies/bookmarks/views) where captured.

### Testing vs. checking, and what testing is for
- Michael Bolton, developsense.com/blog/2009/08/testing-vs-checking/: "Testing is something that we do with the motivation of finding new information… Checking is something that we do with the motivation of confirming existing beliefs… A check provides a binary result—true or false, yes or no."
- Michael Bolton (@michaelbolton), 2023-05-29, L19: "Alas, better testing doesn't *necessarily* lead to better software. But it can lead to better awareness of the state of the software. That in turn can help people to recognize problems in software, whereupon people can figure out how they might make it better." — https://x.com/michaelbolton/status/1663250209307017217
- Michael Bolton, 2022-12-18, L24: "If you believe testing is a repetitive task, and only a repetitive task, you might want to pause and reflect." — https://x.com/michaelbolton/status/1604578826977251329
- Michael Bolton, 2022-10-25, L78: "Testers: your periodic reminder that functionality is one thing; data is another. If you're only testing functions without looking critically at the data that's being created, read, stored, retrieved, modified, archived, deleted, et cetera, be prepared for a world of surprises." — https://x.com/michaelbolton/status/1584698931291852807
- **Michael Bolton, 2022-10-30, L9** — prescient on AI-assisted testing, three years early: "This is indeed painful; more so because much 'manual' testing IS done badly. More painful yet: the idea people with limited testing skill will be able to write code that amounts to better testing. **What is more likely is that bad testing will be done faster and worse than ever.**" — https://x.com/michaelbolton/status/1586869362543181824
- **James Bach (@jamesmarcusbach), 2021-08-18, L?**: "I wrote 'It's too easy to sell dumb ideas from 40 years ago, and it's too hard to sell skilled testing.' So, that's still true. **The testing role has, if anything, further deteriorated, as ignorant people now assume that AI can do testing.**" — https://x.com/jamesmarcusbach/status/1428144392590675977
- James Bach, 2022-10-16, L16: "Countless thousands of people create test cases and perform testing on product in the software industry. Yet few of us, when challenged, can concisely and compellingly explain why we chose to do these tests instead of those tests."
- Dave Farley, 2019-04-04: "Let's use Humans for what they are good at: Fuzzy pattern matching, intelligent analysis. Let's use machines for what they are good at: Fast repeatable results for 10's, or 100's, of thousands of tests."
- Kevlin Henney, quoted by Marit van Dijk (@MaritvanDijk77) at KotlinConf, 2023-04-14: "However much testing you're doing now, you're gonna need to do more with ChatGPT."

### TDD, as its own author frames it
- Kent Beck (@KentBeck, 185k, verified), 2023-12-07, L50: "TDD isn't design, it's design feedback" — https://x.com/KentBeck/status/1732817551791628481 (→ tidyfirst.substack.com/p/tdd-isnt-design)
- Kent Beck, 2023-12-11, L116/B48: "Canon TDD — I keep reading critiques of processes that aren't TDD, so I summarized the original definition & pointed out common misconceptions." — https://x.com/KentBeck/status/1734255046471320036
- Kent Beck, 2023-05-19, L285/R54/V86k: "When did TDD become an identity? 'I'm not a TDD person'—I heard this the other day. 😕 It's not a genetic disposition, like cilantro tasting like soap. How did this happen?" — https://x.com/KentBeck/status/1659570408314773505
- Kent Beck, 2023-10-31, L124/R32: "Someone who has come out against TDD: how long does it take from when you make a coding error to when you catch it? How often do you make coding errors? I'm looking for actual anecdotes." — the best-framed question in the entire TDD debate; it converts an identity argument into a measurable one. https://x.com/KentBeck/status/1719351908706750589
- Kent Beck, 2018-07-02: "It started out as Test-Driven Design, but then I realized that the influence of the workflow pervaded development--quality, teamwork, maintainability, peace of mind. And design."
- Dave Farley, 2024-06-10 (thread): "they will nearly always attempt to imagine the solution that they anticipate that they will eventually write, and then write the test to test that imaginary solution. This over-couples tests to solutions, even when the solution you write the test for doesn't yet exist!"
- Dave Farley, 2025-05-09, L58: "Most bugs aren't coding errors. They're misunderstandings. Acceptance Test-Driven Development (ATDD) fixes that—by aligning devs, testers & stakeholders before code is written."
- Robert C. Martin, blog.cleancoder.com (2016): "The really effective part of TDD is the size of the cycle, not so much whether you write the test first… The reason we write the tests first is that it encourages us to keep the cycles really short."
- DHH, 2014-04-23, the origin: "TDD is dead. Long live testing" — https://x.com/dhh/status/458928132527902720
- t_wada, 2026-02-26: "2014年に『TDD is Dead』と言われるも2025年はTDDがこれまでで一番普及した年になったので、XXXis Deadなんてそんなもんです。" (Even though "TDD is Dead" was declared in 2014, 2025 turned out to be the most widespread year for TDD ever — that's just how "X is dead" claims go.)

### Coverage and Goodhart
- Dave Farley, 2024-05-23, L54/B13: "Test coverage is a poor metric for success. Focusing on test coverage reports can lead to poor outcomes. Development is tricky, and if you chase the wrong test metrics you can end up going slower with lower quality." — https://x.com/davefarley77/status/1793676261342257165
- Robert C. Martin, 2026-03-21, L201: "Coverage does not prove that the tests cover everything with assertions, it only proves that the tests execute the covered lines. Those holes are leaks that the AI can sneak through -- and it will."
- Milan Milanovic, 2026-06-02: "Reward coverage percentage, and you get trivial tests that assert nothing, while the hard integration tests stay unwritten… Before you attach a reward to a number, ask one question: could gaming it leave you worse off than measuring nothing at all?"
- David Khourshid, 2022-08-27, L656: "Use-case coverage is far more important than code coverage. You can have 100% code coverage and still have your app break in prod."

### AI-written tests
- Artur Skowronski via @adamwarski, 2026-04-20: "AI-generated tests are circular. They test what the code does, not what the code should do."
- Mark Seemann, blog.ploeh.dk, 2026-01-26: "Tests work best when you have seen them fail." / "Without human engagement, tests strike me as mere ceremony."
- Simon Willison, 2026-02-23: "It's important to confirm that the tests fail before implementing the code to make them pass. If you skip that step you risk building a test that passes already."
- Matt Pocock, 2026-05-21, L875: "Do not add tests which simply restate the implementation. These provide zero confidence."
- @usetusk, 2026-03-13: "Your AI-generated tests are expensive assertions against hallucinated data." (Their eval: traffic-augmented generation won 67% overall, 100% on mock-data realism; without real traffic "the agent repeatedly hallucinated order IDs and error formats.")

### Verification, review, accountability
- Robert C. Martin, 2026-07-10: the QA-agent-cheating account, §2.3 — the corpus's best artifact.
- Robert C. Martin, 2026-07-23, L16707/B11518/V4.24M: "My current strategy is to not read any of the code written by my agents… What I do instead is to surround the agents with extreme constraints."
- Robert C. Martin, 2026-07-23 (reply): "My agents write the unit tests. I don't review those. They also write the gherkin acceptance tests and the QA procedures. I review those."
- Gergely Orosz, 2026-07-25: "Cannot help but see the concept of code reviews fading away… Still unsure what to replace it with."
- Dave Farley, 2026-05-26, L40: "why are we still relying on asynchronous, manual gatekeeping instead of practising true continuous integration directly on the trunk?"
- Addy Osmani, 2026-02-28: "The unsolved problem isn't generation but verification. That's where engineering judgment becomes your highest-leverage skill."
- **Andrej Karpathy, 2026-01-26, L40777/R1638/B37047/V7.8M** — primary source, captured verbatim in `x-sweep-w1.json`, https://x.com/karpathy/status/2015883857489522876. The widely-paraphrased "watch them like a hawk" line in context: "The models definitely still make mistakes and **if you have any code you actually care about I would watch them like a hawk, in a nice large IDE on the side.** The mistakes have changed a lot - they are not simple syntax errors anymore, they are subtle conceptual errors that a slightly sloppy, hasty junior dev might do. **The most common category is that the models make wrong assumptions on your behalf and just run along with them without checking.** They also don't manage their confusion, they don't seek clarifications, they don't surface inconsistencies, they don't present tradeoffs, they don't push back when they should." The second bolded sentence is the better citation for this skill: *unchecked wrong assumptions* is the mechanism underneath the circular-test problem in §2.1 — the agent assumes current behavior is intended behavior and encodes it.
- Andrej Karpathy, same post, on the verification asymmetry that makes review survivable at all: "Generation (writing code) and discrimination (reading code) are different capabilities in the brain… you can review code just fine even if you struggle to write it." Also his own leverage rule: "Don't tell it what to do, give it success criteria and watch it go. **Get it to write tests first and then pass them.**"
- Simon Willison, Bun-rewrite notes, 2026-07-08: the team used "a language-independent test suite with a million assertions, adversarial code review, and — when something does go wrong, fixing the process that generates the code instead of hand-fixing the code."

### Evals
- Hamel Husain / Shreya Shankar, 2025-05-10: "Foundation model benchmarks are not the same as your application evals. Generic Evals Are Useless… Look at your data. Be careful of overfitting to test data."
- svpino, 2025-05-01: "LLM benchmarks are shit… Build your own evaluation suite. Never make any decision based on someone else's metrics."
- Jim Fan, 2024-05-02: the three surviving eval types — private third-party-scored sets, arena-style comparative ("you can't game democracy"), and your own internal benchmarks ("you can't game your customers").
- **Simon Willison, 2025-05-02**, the counterweight to eval-maximalism, on OpenAI's sycophancy incident: "One of the biggest misses? They ignored the 'vibe checks' from their internal experts in favor of automated evals and A/B tests (Everything in the AI industry always comes down to 'vibes')" — https://x.com/simonw/status/1918350698292600914

### Non-determinism
- Hillel Wayne, 2022-08-23: "Metamorphic testing is a way to test very complicated systems without knowing exact outputs: instead of checking it's correct, check it *changes* correctly."
- Hillel Wayne, 2022-08-26, L204: "Property-based testing is when you generate lots of inputs and test them against a broad 'property' of your code. It gives you better coverage than unit tests, but people often struggle to come up with good properties."
- Charity Majors, paraphrased by Hillel Wayne, 2022-09-24: "after deployment, we're not testing code, we're testing systems. Biologist, not god."
- @rakyll (Jaana Dogan), 2025-02-11: "AGI will be achieved when there are no flaky tests."

### Progressive delivery / testing in production
- Kent Beck on Facebook 2011, relayed by Gergely Orosz, 2025-06-11: Facebook wrote no unit tests and pushed to production without automated testing — balanced by devs taking personal responsibility for their code, "nothing was 'someone else's problem'", heavy feature-flag use for risky code, and staged rollouts to smaller markets like New Zealand. The clearest documented case in the corpus that progressive delivery can substitute for a test suite **only when paired with an ownership culture**.
- Gergely Orosz, 2025-01-19, L1269: on OKR-driven quality collapse — a company that stopped "Listening to customers / Doing proper QA testing / Holding a new release until it is ready for prod."

### Latency measurement — Gil Tene's own words
*(The canon channel covers coordinated-omission theory from primary sources; do not re-derive it from here. These two tweets are additive only because they are Tene stating the rule himself, in one sentence, on this channel.)*
- **Gil Tene (@giltene), 2024-08-11**, coordinated omission in his own words: "The general concept for correct measurement in load generators is simple: all load generators have 'a plan' (of some sort). **Latency should be measured from when a the thing was planned to be started to when it actually finished. Measuring from the actual start time is wrong.**" — https://x.com/giltene/status/1822515017453064637
- **Gil Tene, 2016-04-12, L39**: "DON'T use or report standard deviation for latency. Ever. Except if you mean it as a joke." — https://x.com/giltene/status/719739201126809600
- Gil Tene, via Tyler Treat's explainer (bravenewgeek.com, 2015-12-12): coordinated omission is "a conspiracy we're all a part of." Treat's worked example: a system that runs at 1ms for 100s then freezes for 100s has a true ~25s average latency; a coordination-omitting load generator reports ~10.9ms — understating by three orders of magnitude.

### Accessibility overlays
- Overlay Factsheet (Karl Groves et al., overlayfactsheet.com): "No overlay product on the market can cause a website to become fully compliant with any existing accessibility standard and therefore cannot eliminate legal risk." / "Overlay widgets are unnecessary and are poorly placed in the technology stack."
- WebAIM practitioner survey: "A strong majority (67%) of respondents rate these tools as not at all or not very effective. Respondents with disabilities were even less favorable with 72% rating them not at all or not very effective, and only 2.4% rating them as very effective."
- WebAIM (@webaim), 2023-06-02: "This version now informs users that accessiBe and UserWay overlays may manipulate page content to suppress detection of accessibility errors."
- Adrian Roselli, adrianroselli.com/2020/06/accessibe-will-get-you-sued.html: "The accessiBe overlay widget does not reduce automated testing tool errors, but instead increases them." (axe 4→12, ARC 19→38.)
- Adrian Roselli (@aardrian), 2023-06-09: "Overlay vendor accessiBe has demonstrated its woeful incompetence at trying (and lying): there is no quick fix for helping real humans with real needs." — https://x.com/aardrian/status/1667150801041514497
- Adrian Roselli, 2024-01-03: "AudioEye Has Dropped Its Suit Against Me" — https://x.com/aardrian/status/1742595027656716518 → adrianroselli.com/2024/01/audioeye-has-dropped-its-suit-against-me.html. Lainey Feingold's analysis (lflegal.com, 2023-07): "This case is a classic strategic lawsuit against public participation, or 'SLAPP.'"
- CSUN Assistive Technology Conference (@CSUNCOD), 2021-03-06: "the accessibility overlay has been removed. It was implemented without our approval. The Conference does not endorse this product." — the field's flagship conference had to remove one from its own site.

### AI slop and scanner fatigue
- Daniel Stenberg, 2025-07-14: "about 20% of all submissions" were AI slop; "about 5% of the submissions in 2025 had turned out to be genuine vulnerabilities."
- Nikki Siapno, 2026-07-17: "If security scanners generate too many false positives, developers begin treating security checks like any other noisy build failure… scanner fidelity matters."

---

# 4. Practitioner heuristics

Rules people actually use that never made it into the formal literature. Ordered by how strongly the corpus supports them.

1. **Watch it fail first — especially when a machine wrote it.** The oldest TDD discipline is the only reliable control on the newest failure mode. If a test has never been observed failing against a deliberately broken version of the code, you have no evidence it tests anything. (Seemann + Willison, independently, from opposite sides of the argument.)
2. **Never let the verifier and the thing verified share a source of truth.** If the same agent, prompt, and context produced both the code and its test, they cannot check each other. Keep one independent oracle: a pre-existing spec, a previous implementation, recorded real traffic, a different model, or a human-reviewed acceptance criterion.
3. **Audit the verifier for shortcuts, don't just trust its verdict.** Martin's checker that inspects the QA script for API calls. Any verification layer that *can* satisfy its success criterion without exercising the real path eventually will.
4. **Move human review from the implementation layer to the intent layer.** Review the acceptance criteria, the gherkin, the QA procedure — the artifacts that encode what *should* be true. Delegate review of the artifacts that merely restate what *is* true. (Martin's actual practice, as distinct from his headline.)
5. **Ask "could gaming this metric leave us worse off than measuring nothing?" before attaching any reward to a quality number.** (Milanovic.) Post-agent, apply it to coverage first.
6. **"If a human couldn't tell when the ticket is done, neither can the evaluator."** (Pachaar.) Good acceptance criteria point at an observable artifact, not an outcome adjective.
7. **When outputs are non-deterministic, assert on relations rather than values** — metamorphic testing ("adding a filter should give a strict subset") and property-based testing. This is the formal answer to the question the LLM-testing threads keep asking as if it were new. (Wayne.)
8. **Grade the trajectory and the tools, not just the final answer.** Unit-test tools with no model in the loop first — many apparent agent failures are tool failures.
9. **Run every eval trial from a fresh environment**, so shared state can't masquerade as model non-determinism.
10. **Verify with real recorded inputs, not synthetic ones.** Agents hallucinate plausible fixtures (order IDs, error formats) unless anchored to real data.
11. **Verify at the layer the user touches, not the layer the agent worked in.** Force UI events, not API calls; browser automation, not unit-test green.
12. **Fix the process that generated the bug, not the bug.** (Bun team via Willison.) The durable-verification mindset when generation is cheap.
13. **Only mutation-test functions whose source hash changed since the last run** — differential mutation testing, a cost-control trick that post-dates the mutation-testing literature. (Martin.)
14. **Push test ownership to the smallest unit that can own it.** Shared verification infrastructure diffuses accountability; "nobody owns the failure." (Bhayani.) The corollary from Orosz: an E2E suite a team is *paranoid about and owns* is different from a shared staging suite, and it is currently the best-documented defense against AI-accelerated quality decay.
15. **Fixing a flaky test is not hygiene, it's economics.** "It's economically stupid to do anything else." (Farley.)
16. **Reposition QA from end-of-pipeline gatekeeping to pre-code failure-path analysis.** (Marief.) The AI-verification discourse's unmet need is precisely "someone who defines what correct means before generation" — which is the Quality Analyst role, not the manual tester role.
17. **Check who funded the number** before trusting any quality percentage — a11y automation coverage, scanner accuracy, overlay compliance. The corpus contains a clean 2x vendor-vs-independent divergence.
18. **Beware progressive delivery as a substitute for testing unless the ownership culture exists.** Facebook 2011 worked because devs fixed bugs regardless of whose commit caused them. Copy the flags without the ownership and you get neither.

19. **Distrust confident obituaries — including ones this skill might be tempted to write.** "TDD is dead" was declared by a prominent practitioner in 2014; twelve years of evidence say it did not take (t_wada: 2025 was "the most widespread year for TDD ever"). The substantive resolution was not that one side won but that the fight was a category error — Martin, 2016: "The really effective part of TDD is the size of the cycle, not so much whether you write the test first." This skill will encounter several live obituaries (code review is dead, QA is dead, coverage is dead, benchmarks are dead). Report the *mechanism* being claimed, not the death certificate.

**Invariant candidates** (strongest, most falsifiable, most generalizable):
- **No test counts as evidence until it has been observed failing.** (#1)
- **The verifier must not share a source of truth with the thing verified.** (#2)
- **Audit the verifier for shortcuts; a verification layer that can pass without exercising the real path will.** (#3)
- **An instrument pointed at an adversarial subject measures the adversary's response to the instrument, not the property you wanted.** (§1.5) — covers overlays suppressing detection, agents gaming coverage, and verifier agents taking the cheap path, in one statement.

---

# 5. Attribution hazards

**Confirmed impostors / wrong accounts — do not cite:**
- **`@ARoselli`** — "Tony Roselli," 38 followers, empty bio. **Not** Adrian Roselli. The real account is **`@aardrian`** (8,852 followers, bio "Adrian Roselli (no blue check)", tweets auto-post from adrianroselli.com). This is exactly the class of error a prior build in this family made.
- **`@leoniewatson`** — "leonie," 11 followers, "5th Year Dental Student studying at Newcastle Universiry." **Not** Léonie Watson.
- **`@tink`** — a Visa-owned fintech company. **Not** Léonie Watson (whose handle-adjacent identity elsewhere is "tink"). No verified X presence for her was found; **cite tink.uk or tetralogical.com instead**.
- **`@BrentJensen`** — 24 followers, empty bio. Almost certainly not the Modern Testing co-author. **Cite moderntesting.org instead.**

**Not found on X at all** (searched directly): `@maaretp`, `@lisacrispin`, `@alanpage`, `@AdrianRoselli` — all returned null. For Maaret Pyhäjärvi, Lisa Crispin, and Alan Page, cite their own sites/books; do not guess a handle.

**Left the platform — cite the new home:**
- **`@hillelogram`** — bio reads "Inactive; Bluesky is @hillelwayne(dot)com … No longer on this hellsite." His archived tweets are quotable and dated, but cite **hillelwayne.com** for anything current.
- **`@karlgroves`** — bio: "No longer participating in Elon Musk's misinformation machine. Find me on LinkedIn." Cite **overlayfactsheet.com** (his project) instead.

**A satire that reads as real — the trap of this corpus:**
- **Michael Bolton, 2023-04-01**: "After 20 years of collaboration on Rapid Software Testing, James Bach and I have decided that advances in technology mean that we can now retire the approach." (https://x.com/michaelbolton/status/1642177564109045763 → developsense.com/blog/2023/04/winding-up). **This is an April Fools' joke.** Verified by fetching the post, which signs off "—Michael Bolton, April 1, 2023" and states "This April Fool's joke was inspired by…". The post satirizes the claim that ChatGPT will make testing machine-performed and testers extinct. Because it is a sincere-sounding retirement announcement from the leading exponent of exploratory testing, dated inside the AI hype window, **any sweep for "testing + AI" will surface it and it is very easy to cite as real.** Do not.

**Unverifiable claims encountered — flagged, excluded, or caveated:**
- **"1 in 4 public agent skills carry a vulnerability"** (SkillSpector) — near-verbatim across ~7 promotional accounts in a short window; no primary study located. Treat as marketing copy, not a finding.
- **A Dave Farley quote via a third party** ("vibe coding is a bad idea, and AI-generated tests are a terrible one") — secondhand paraphrase of a talk. Directionally consistent with his verified positions but **not** a confirmed verbatim quote. Farley's own verified tweets (quoted throughout §3) make the same points and should be used instead.
- **"Google: ~16% of tests are flaky"** — traces in this sweep only to a *comment* on a blog post attributing it to John Micco. Not a primary Google source. Do not present as a Google figure.
- **Vendor-reported telemetry** on review bottlenecks (LinearB/Larridin/Faros summaries of DORA) — useful directional evidence, not primary research. Caveat every use.
- Low-follower accounts (`@fog_glutamine`, `@hwisesa23`, `@usetusk`, `@elune0x`) produced some of the sharpest one-liners in the sweep. Quote the *line*, never the *authority*. Several "10 agent evals" threads were near-identical across multiple sub-400-follower accounts — syndicated templates, not independent corroboration.

---

# 6. Open gaps

- **Who is accountable when an agent ships a bug** — no source anywhere addresses it directly. Both workers searched; both found only adjacent material. This appears to be genuinely unresolved in July 2026 rather than missed. The skill should name it as open.
- **Context-driven testing school on X is largely archival — a limitation of this channel, not a hole in the research.** Bolton and Bach are present and quotable (both contributed genuinely valuable material to §3), but their recent activity is mostly class promotion; their substantive positions live on developsense.com and satisfice.com. Maaret Pyhäjärvi, Lisa Crispin, Elisabeth Hendrickson (`@testobsessed` exists but returned nothing on-topic) and Alan Page / Brent Jensen are effectively absent from X discourse. **Their absence here says nothing about their views and leaves no gap in the pass overall — the canon channel covers this material in depth from primary sources.** Testing-vs-checking in particular should be sourced from canon, not re-derived from my §3 excerpts. A channel that names who it could not hear is more trustworthy than one that implies it heard everyone.
- **Modern Testing is a primary-source-only finding.** moderntesting.org states the principles; no practitioner *debate* about them surfaced. Whether the framework is contested or simply dormant by 2026 is unanswered.
- **Shift-left vs shift-right as an opposed pair barely exists.** Shift-left appears only as uncontested good; "shift-right" as a named counter-term essentially doesn't appear. Cannot fully distinguish genuine consensus from under-sampling, but the sweep was broad enough that consensus is the likelier reading.
- **Lighthouse gaming** had **zero** direct hits across all four archives. Covered only via WebFetch of secondary sources (a dev.to post). The lab-vs-field distinction is real and well-understood but is not a live X argument — treat it as textbook material, not discourse.
- **Léonie Watson**: no verifiable X presence located. A named practitioner in the brief who is genuinely unreachable through this channel.
- **`from:` operator under `--product Top` silently returns nothing useful.** The first author sweep produced ~5 tweets per named author; re-running with `--from` + `--product Latest` produced the entire haul in §3. Anyone reusing `x-relay` for author-targeted work should use the flag and Latest ranking. Recording this because it nearly cost the corpus its best material.
- **Budget note:** the two workers consumed ~10 WebSearch calls each (W2 used all 10). I used WebFetch only. The shared session WebSearch budget should be assumed heavily depleted.
