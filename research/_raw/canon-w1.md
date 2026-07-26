# Canon W1 — Test Strategy & the Shape Debate

Researcher: W1. Date of research: 2026-07-26. All volatile facts (ratios, dates, "current state") are as observed on this date.

## 0. Sources reached / not reached (+ WebSearch calls used)

**WebSearch calls used: 15** (of the ~15 cap). All further research after this point relied on WebFetch only (uncapped, but used sparingly and only against known-good URLs).

### Reached successfully (WebFetch)
- martinfowler.com/articles/practical-test-pyramid.html
- martinfowler.com/bliki/TestPyramid.html
- martinfowler.com/articles/2021-test-shapes.html
- martinfowler.com/bliki/UnitTest.html
- martinfowler.com/bliki/TestDouble.html
- martinfowler.com/articles/mocksArentStubs.html
- martinfowler.com/articles/consumerDrivenContracts.html
- martinfowler.com/bliki/TestCoverage.html
- martinfowler.com/bliki/IntegrationTest.html
- martinfowler.com/bliki/SelfTestingCode.html
- martinfowler.com/bliki/BroadStackTest.html
- kentcdodds.com/blog/the-testing-trophy-and-testing-classifications
- kentcdodds.com/blog/write-tests
- kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests
- kentcdodds.com/blog/avoid-the-test-user
- abseil.io/resources/swe-book/html/ch11.html (Testing Overview) — fetched 3×, targeted prompts
- abseil.io/resources/swe-book/html/ch12.html (Unit Testing)
- abseil.io/resources/swe-book/html/ch13.html (Test Doubles)
- abseil.io/resources/swe-book/html/ch14.html (Larger Testing) — fetched 2×, still incomplete (see below)
- testdesiderata.com (redirected from kentbeck.github.io/TestDesiderata/)
- docs.pact.io/ (landing), docs.pact.io/pact_broker/can_i_deploy
- watirmelon.blog/2012/01/31/introducing-the-software-testing-ice-cream-cone/ → **FAILED, certificate expired**
- engineering.atspotify.com/2018/01/testing-of-microservices
- testing.googleblog.com/2010/12/test-sizes.html → fetched, but tool returned only comments/metadata, not the body (see §4)
- testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html → fetched, tool could not surface the exact headline percentage from body text (see §4, §11)
- mike-bland.com/2011/11/01/small-medium-large.html
- mike-bland.com/2011/10/18/test-certified.html
- smashingmagazine.com/2023/09/long-live-test-pyramid/
- pactflow.io/bi-directional-contract-testing/

### NOT reached / failed
- **xunitpatterns.com — every attempt (2×) returned `connect ECONNREFUSED 52.1.13.203:443`.** This is Gerard Meszaros' primary canonical source for the five-test-double taxonomy (Dummy/Fake/Stub/Spy/Mock) and I could not reach it directly. I substituted Martin Fowler's `TestDouble.html` and `mocksArentStubs.html`, which both quote Meszaros' definitions at length and cite him explicitly — see §6. Treat the wording in §6 as Fowler's transcription of Meszaros, not a first-hand fetch of xunitpatterns.com. Flagged `[UNVERIFIED: primary source unreachable]` where relevant.
- **watirmelon.blog/2012/01/31/introducing-the-software-testing-ice-cream-cone/** — WebFetch failed with "certificate has expired." Alister Scott's ice-cream-cone origin story in §8 is reconstructed from WebSearch result snippets (Google's synthesis of the page), not a direct fetch. Flagged.
- Google's exact Small/Medium/Large **technical constraint table** (threads / network / sleep / filesystem / DB / timeouts, side by side) — the abseil.io ch14 HTML page, fetched twice with targeted prompts, yields only "Small tests are restricted to one thread, one process, one machine" and general prose about Large tests being slow/nonhermetic/nondeterministic. It does NOT appear to render a literal constraint table in the HTML the fetch tool receives (possibly a table/graphic not captured by HTML→markdown conversion). I supplemented with Mike Bland's 2011 blog post (a Google engineer's own explainer, pre-book) and a WebSearch-sourced paraphrase for the "no sleep / no blocking network calls" framing — flagged where secondary.
- The exact wording of the Google Testing Blog's original 2010 "Test Sizes" post body (Simon Stewart) — WebFetch returned only comments/metadata, not the article body.

## 1. Cohn's pyramid

**Primary source:** Mike Cohn, *Succeeding with Agile: Software Development Using Scrum*, 2009. I could not fetch the book text directly (not freely hosted); all Cohn-specific claims below are corroborated by Martin Fowler's `TestPyramid.html` (which discusses Cohn's book directly and is a canonical secondary source Fowler himself treats as authoritative) plus WebSearch snippets summarizing secondary write-ups. Treat book-page-level quotes as `[UNVERIFIED — could not access primary text]`.

From Fowler's `bliki/TestPyramid.html` (1 May 2012; revised 7 Aug 2016, 15 Nov 2017):

> "Most people know about the the Test Pyramid due to Mike Cohn, when he described it in his 2009 book Succeeding with Agile."

Fowler adds provenance that goes beyond the book itself:

> Cohn originally sketched the pyramid in conversation with Lisa Crispin (2003–4) and presented it at a scrum gathering in 2004. Jason Huggins independently developed a similar concept around 2006.

**Layer names (three layers, per multiple secondary sources and Fowler's summary):** Unit Tests (base) → Service Tests (middle) → UI Tests (top).

Fowler's own gloss on the shape:

> "you should have many more low-level UnitTests than high level BroadStackTests running through a GUI."

**What Cohn actually said vs. what got attributed to him:** This is the crux of the research task and worth stating plainly:
- Cohn's original pyramid, as reported, did **not** attach specific numeric ratios (no "70%", "80%", etc.) — it was a qualitative shape argument: fewer tests as you go up, because higher layers are slower/more brittle/costlier to maintain.
- The specific numeric splits (80/15/5, 70/20/10, etc.) that circulate today are attributable to **later authors** — most concretely to Google's *Software Engineering at Google* (80/15/5, see §4) and to Mike Bland's 2011 personal blog post (70/20/10, explicitly "pulled out of a hat" — see §4) — **not to Cohn**. `[UNVERIFIED via primary text, but the absence of a numeric ratio in Cohn is consistent across every secondary source I could reach; no source I found attributes a specific percentage split to Cohn's book itself.]`
- Cohn's terminology ("Service Tests") is also frequently mistranslated in later commentary as "Integration Tests" — Fowler's `IntegrationTest.html` (§2) treats this substitution as a major source of the field's terminological confusion.

**Decision rule extracted:** Allocate test volume in inverse proportion to a layer's cost (speed, reliability, maintenance burden) and in proportion to how low-level/deterministic the layer is — write far more fast, cheap unit tests than slow, brittle, whole-system tests. No numeric ratio in the original formulation.

## 2. Fowler

### 2.1 "The Practical Test Pyramid" (Ham Vocke, martinfowler.com/articles/practical-test-pyramid.html, 26 February 2018)

Vocke restates Cohn's pyramid with concrete layer definitions and explicit decision rules:

> "Write tests with different granularity" — "The more high-level you get the fewer tests you should have."

Core anti-pattern warning, verbatim in spirit per the fetch:

> Avoid the "test ice-cream cone" anti-pattern — an inverted pyramid structure that becomes "a nightmare to maintain and takes way too long to run."

**Layer/type definitions (verbatim per fetch):**
- **Unit Tests:** test a single unit (function or class) in isolation, typically replacing external collaborators with test doubles; should test the public interface and observable behavior.
- **Integration Tests:** test the integration of your application with external parts (databases, filesystems, network calls); narrow integration tests focus on one integration point at a time.
- **Contract Tests:** "Consumer-Driven Contract tests (CDC tests) let the consumers drive the implementation of a contract."
- **UI Tests:** test that "the user interface of your application works correctly. User input should trigger the right actions, data should be presented to the user."
- **End-to-End Tests:** test your "entire, completely integrated system" through user interfaces — "the broadest part of your test suite" (note: this phrase, taken at face value, is a slip/typo in either the original or the fetch summary — the pyramid claims E2E is the *smallest*/*narrowest* part; flagging as `[UNVERIFIED — possible extraction error, re-check primary text if precision on this exact sentence matters]`).

**Decision rules (this is the load-bearing part per the lead's framing request):**
1. "Write lots of small, fast unit tests; some coarse-grained tests; very few high-level tests."
2. **Push tests down the pyramid**: "If a higher-level test gives you more confidence that your application works correctly, you should have it" — otherwise eliminate redundant tests. I.e., a lower-level test that gives equivalent confidence should replace a higher-level one; only keep a higher-level test if it catches something no lower-level test can.
3. Test **observable behavior**, not implementation: "if I enter values x and y, will the result be z?" rather than internal call sequences.
4. **Avoid testing private methods** — treat the need to do so as a design smell; refactor into separate classes instead.
5. Don't test trivial code (simple getters/setters).

### 2.2 "TestPyramid" bliki (martinfowler.com/bliki/TestPyramid.html, 1 May 2012 / rev. 2016, 2017)

Covered in §1 for Cohn attribution. Additional content:

> High-level tests serve as "a second line of test defense," catching bugs that unit tests should have prevented.

Three layers as Fowler frames them: Base (Unit Tests, most numerous/fastest/cheapest) → Middle (Subcutaneous/Service-Layer Tests) → Top (GUI/End-to-End Tests, fewest/slowest/most expensive).

Ice-cream-cone warning: UI-driven test automation "quickly runs into trouble, becoming an ice-cream cone" — brittle, expensive, slow, worsened by record-playback tooling.

### 2.3 "Test Shapes" (martinfowler.com/articles/2021-test-shapes.html, Fowler, 2 June 2021)

This is Fowler's own re-litigation of the shape debate, and it contains the single most important **decision rule that supersedes ratio arguments**. Named alternative shapes discussed: Honeycomb, Trophy, and Tim Bray's "misshapen blobs."

**Fowler's diagnosis of *why* the pyramid-vs-honeycomb/trophy fight exists** — definitional confusion, not substantive disagreement:

> Critics of excessive mocking (which characterizes solitary unit tests) often advocate honeycomb structures. They implicitly define "unit tests" narrowly as isolated, mocked tests, while sociable tests integrating real dependencies might be recategorized as integration tests under their framework.

I.e., a "sociable unit test" in the classicist framing and a "narrow integration test" in the honeycomb framing can be **the same physical test**, differently labeled — so the ratio debate is partly a taxonomy dispute, not a strategy dispute.

**Fowler's chosen decision rule** — he explicitly defers to Justin Searls over ratio talk:

> "People love debating what percentage of which type of tests to write, but it's a distraction. Nearly zero teams write expressive tests that establish clear boundaries, run quickly & reliably, and only fail for useful reasons." — Justin Searls, quoted approvingly by Fowler.

**Extracted decision rule:** stop optimizing the ratio; optimize test *expressiveness*, *speed*, *reliability*, and *specificity of failure* (this echoes Kent Beck's Desiderata — see §5).

### 2.4 "UnitTest" bliki (martinfowler.com/bliki/UnitTest.html, 5 May 2014; rev. 24 Oct 2014, 9 Mar 2017)

> "unit tests are low-level, focusing on a small part of the software system," "usually written these days by the programmers themselves using their regular tools," "significantly faster than other kinds of tests."

**Solitary vs. Sociable** (this is the load-bearing distinction requested by the lead):
- **Solitary:** uses test doubles for collaborators to isolate the unit under test, preventing faults in dependencies from causing test failures.
- **Sociable:** "these tests are tests of the behavior of a single unit. We write the tests assuming everything other than that unit is working correctly." Real collaborator objects are used.

**Classicist vs. Mockist:** "Two schools of xunit testing developed" in the 2000s. Mockists prioritize solitary tests via mock frameworks; classicists prefer sociable tests. Fowler self-identifies as classicist.

**Decision rule for choosing solitary vs. sociable:**
- Use test doubles when collaboration is "awkward" (e.g., remote services).
- Consider doubles for external resources (DBs, filesystems) for speed and determinism.
- But: "If talking to the resource is stable and fast enough for you then there's no reason not to do it" — i.e., default to sociable/real unless a concrete cost (speed, determinism, awkwardness) forces isolation.

### 2.5 "TestDouble" bliki (martinfowler.com/bliki/TestDouble.html)

> "Test Double is a generic term for any case where you replace a production object for testing purposes."

Explicitly sourced to Gerard Meszaros' xUnit Test Patterns work. Full five-type taxonomy reproduced in §6.

### 2.6 "Mocks Aren't Stubs" (martinfowler.com/articles/mocksArentStubs.html)

**State verification vs. behavior verification** — the central distinction:
- State verification: examine the final condition of objects after method execution.
- Behavior verification: check "whether the order made the correct calls on the warehouse" via mock expectations rather than object state.

> "only mocks insist upon behavior verification."

**Classical vs. mockist TDD, in Fowler's own words:**
> Classical: "use real objects if possible and a double if it's awkward." Mockist: "will always use a mock for any object with interesting behavior."

**Fowler's stated personal position (a value judgment, not neutral reporting — flag this as opinion, not fact):**
> "Personally I've always been a old fashioned classic TDDer and thus far I don't see any reason to change." He worries mockist testing risks "coupling tests to implementation," forcing developers to "constantly think about how the SUT is going to be implemented." He concedes he's only tried mockist style "on toys" and that "many good developers... are very happy and convinced mockists" — i.e., he flags this as a live, unresolved disagreement between capable practitioners, not a settled question.

### 2.7 "ConsumerDrivenContracts" (martinfowler.com/articles/consumerDrivenContracts.html, Ian Robinson, 12 June 2006)

> Consumer-driven contracts: "Provider contracts emerge to meet consumer expectations and demands" — providers derive obligations from consumers' actual needs rather than imposing a unilateral contract.

**Problem solved:** tight, hidden coupling when consumers nominally depend on an entire provider contract but only use part of it, blocking independent evolution.

**Decision rule / scope condition (important — this bounds when the pattern applies):**
> The pattern applies "in the context of either a single enterprise or a closed community of well-know [sic] services" where providers can influence how consumers establish contracts.

This is a meaningful constraint: CDC as Robinson originally described it assumes a bounded, cooperative ecosystem — not necessarily open/public APIs with unknown consumers. (Contrast with Pact's later generalization and PactFlow's bi-directional model, §7, which explicitly targets larger orgs where this closed-community assumption breaks down.)

### 2.8 "TestCoverage" bliki (martinfowler.com/bliki/TestCoverage.html, 17 April 2012)

> "Test coverage is a useful tool for finding untested parts of a codebase. Test coverage is of little use as a numeric statement of how good your tests are."

On mandated thresholds:
> Organizations sometimes declare "you can't go into production with less than 87% coverage" or require 100%. Fowler quotes Brian Marick: "I expect a high level of coverage. Sometimes managers require one. There's a subtle difference."

On 100% specifically:
> "I would be suspicious of anything like 100% - it would smell of someone writing tests to make the coverage numbers happy, but not thinking about what they are doing."

**Decision rule (outcome-based, not metric-based):**
1. You rarely get bugs escaping to production, **and**
2. You are rarely hesitant to change code for fear of breaking production.

If both hold, coverage is adequate regardless of the number; a well-tested codebase will naturally land coverage in "the upper 80s or 90s," but that's a *symptom*, not a *target*.

### 2.9 "IntegrationTest" bliki (martinfowler.com/bliki/IntegrationTest.html, 16 January 2018)

This directly addresses the ambiguity flagged by the lead. Fowler identifies **two incompatible meanings in circulation**:

- **Narrow integration tests:** exercise "only that portion of the code in my service that talks to a separate service," using test doubles for everything else; fast, limited scope.
- **Broad integration tests:** "require live versions of all services," testing code paths across the entire system; heavy infrastructure requirement.

> Many developers only recognize the broad definition, causing terminology conflicts.

**Decision rule / disambiguation guidance:** use "system test" or "end-to-end test" for the broad meaning, and explicitly say "narrow integration test" for the focused variant. Fowler continues using "unit test" for both solitary and sociable varieties, adding descriptors only when the distinction matters. He advises teams relying solely on broad integration tests to explore narrow ones, since narrow tests typically give faster, more reliable feedback within deployment pipelines.

### 2.10 "BroadStackTest" bliki (martinfowler.com/bliki/BroadStackTest.html, 22 April 2013)

> "A broad-stack test is a test that exercises most of the parts of a large application." Also called an end-to-end or full-stack test.

> "broad-stack tests also tend to be harder to maintain and slower to run than component tests. As a result the TestPyramid suggests using fewer broad-stack tests."

### 2.11 "SelfTestingCode" bliki (martinfowler.com/bliki/SelfTestingCode.html, orig. 5 May 2005, rev. 1 May 2014)

> Self-testing code: the ability to "run a series of automated tests against the code base and be confident that, should the tests pass, your code is free of any substantial defects."

Foundational claims:
1. "You aren't really doing continuous integration unless you have self-testing code."
2. Enables safe refactoring — a "virtuous spiral" of faster feature development.
3. Reduces production bugs when tests and code are written together as a discipline.

**Decision rule — explicitly decouples self-testing code from TDD:**
> "You can also produce self-testing code by writing tests after writing code—although you can't consider your work to be done until you have the tests." The tests themselves are what matter, not the sequence in which they're written.

## 3. Kent C. Dodds / Testing Trophy

### 3.1 "The Testing Trophy and Testing Classifications" (kentcdodds.com/blog/the-testing-trophy-and-testing-classifications, 3 June 2021)

**Trophy layers, bottom to top:** Static → Unit → Integration → End-to-End. (Diagram: a trophy shape, widest in the middle at Integration.)

**Guiding principle (verbatim, the single most important sentence in this cluster — repeated across nearly all Dodds sources):**
> "The more your tests resemble the way your software is used, the more confidence they can give you."

**Why integration is emphasized:**
> Dodds frames the whole model as "return on investment where 'return' is 'confidence' and 'investment' is 'time.'" Integration tests are argued to catch real-world failures while remaining maintainable, versus unit tests that risk testing implementation details.

Note per the fetch: Dodds does **not** attach explicit numeric percentages to the trophy layers — the "trophy" is a qualitative shape (narrow at the extremes, wide in the middle) rather than a ratio commitment. This mirrors the finding on Cohn (§1): numeric ratios are mostly a later accretion by third parties, not something the shape's originators themselves state as hard numbers.

### 3.2 "Write tests. Not too many. Mostly integration." (kentcdodds.com/blog/write-tests, 13 July 2019)

**Origin of the maxim:** Guillermo Rauch (creator of Socket.io, founder of Zeit.co/Vercel) tweeted this on 10 December 2016. Dodds' post is an extended gloss on the tweet, published ~2.5 years later.

**"Write tests":**
> Static typing/linting (TypeScript, ESLint) "can get you a remarkable amount of confidence," but tests are still needed to catch business-logic errors that types can't.

**"Not too many":**
> Diminishing returns on tests "as the coverage increases much beyond 70%." Obsessive coverage chasing leads to testing trivial/logic-free code and testing implementation details, both of which slow refactoring without adding confidence. `[Note: this 70% figure is Dodds' own stated diminishing-returns threshold — distinct from, and should not be conflated with, Fowler's coverage discussion in §2.8 which gives no fixed number, or Google's ratios in §4 which are about test-type mix, not coverage percentage.]`

**"Mostly integration":**
> "Integration tests strike a great balance on the trade-offs between confidence and speed/expense." Reduce mocking — "when you mock something you're removing all confidence in the integration." Also warns against shallow rendering in React testing (a specific, dated framework-testing recommendation).

### 3.3 "Static vs Unit vs Integration vs E2E Testing" (kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests, 3 June 2021)

**Definitions (verbatim per fetch):**
- Static: "Catch typos and type errors as you write the code."
- Unit: "Verify that individual, isolated parts work as expected."
- Integration: "Verify that several units work together in harmony."
- End to End: "A helper robot that behaves like a user to click around the app and verify that it functions correctly."

**Tradeoff framework, moving up the pyramid/trophy:**
1. Cost increases (more points of failure, higher maintenance).
2. Speed decreases (more code executed per test).
3. Confidence increases (tests more closely resemble actual user behavior).

**Decision rule:** choose the layer based on what confidence gap needs filling and what cost/speed tradeoff is acceptable — "Static analysis cannot verify business logic. Unit tests cannot confirm proper dependency interactions. Integration tests cannot guarantee correct backend communication." Prioritize confidence over categorical purity.

### 3.4 "Avoid the Test User" (kentcdodds.com/blog/avoid-the-test-user, 24 May 2019)

Core argument: testing implementation details introduces a fictitious third audience — the "testing user" — that exists only to satisfy the test, distinct from the two audiences that matter: the end user and the developer consuming the code/component.

> Testing implementation details gives "confidence that things work for the testing user. But nobody cares about the testing user."

Practical cost: internal refactors force test churn unrelated to real functionality — busywork without value.

**Decision rule:** write tests against the *contract* your code has with its real users (people using the UI; developers importing the module) — the same "resembles usage" principle as §3.1, applied specifically to warn against special test-only affordances/paths. This is also the founding principle of Testing Library (Dodds is its creator), though the fetched page does not explicitly restate the Testing Library attribution in those words — noting as `[secondary inference, high confidence but not a direct quote tying this article to the library's own docs]`.

## 4. Google (SWE at Google, test sizes, Beyoncé rule, flakiness)

Primary source: *Software Engineering at Google*, free online at abseil.io/resources/swe-book — Chapters 11 (Testing Overview), 12 (Unit Testing), 13 (Test Doubles), 14 (Larger Testing).

### 4.1 Testing philosophy (Ch. 11)

> "Automated testing is foundational to enabling software to change." Testing "can quickly catch mistakes, and this makes it possible to change software with confidence."

> "An equally important reason why you want to test your software is to support the ability to change."

Tests are framed as "the first clients of your code" — writing them surfaces design flaws early.

### 4.2 The Beyoncé Rule (Ch. 11)

> "If you liked it, then you shoulda put a test on it."

Framed as covering everything a team doesn't want to break — including performance, security, accessibility, and failure scenarios, not just functional correctness.

### 4.3 The 80/15/5 ratio — exact quote and provenance (Ch. 11, "Test Scope" section)

This is the canonical, book-stated ratio, and I obtained the exact sentence on a targeted re-fetch:

> "As a very rough guideline, we tend to aim to have a mix of around 80% of our tests being narrow-scoped unit tests that validate the majority of our business logic; 15% medium-scoped integration tests that validate the interactions between two or more components; and 5% end-to-end tests that validate the entire system."

Google immediately qualifies this: "every team's mix will be a little different" depending on architectural realities. It is explicitly a "very rough guideline," not a mandate.

### 4.4 Test sizes — Small / Medium / Large

From Ch. 11/14 (direct fetch, verbatim where possible):

> "Small tests are restricted to one thread, one process, one machine."
> "Larger tests do not have the same restrictions." They "may be slow" — "Our large tests have a default timeout of 15 minutes or 1 hour, but we also have tests that run for multiple hours or even days." They "may be nonhermetic. Large tests may share resources with other tests and traffic." They "may be nondeterministic."

**Hermeticity, defined (Ch. 14):**
> "Hermeticity: This is the SUT's isolation from usages and interactions from other components than the test in question."

**Important gap:** despite two targeted fetches of ch14, I could not get the tool to surface a full side-by-side constraint table (threads/network/sleep/filesystem/DB/time explicitly enumerated per size). The book almost certainly contains this level of detail (it is well known from secondary literature — e.g., "no sleep statements, no blocking network calls, single-threaded" for Small), but I can only confirm "one thread, one process, one machine" as directly fetched primary text. The richer constraint list should be treated as `[UNVERIFIED via direct primary fetch — sourced from secondary paraphrase/summary via WebSearch, not confirmed verbatim in the book's HTML as rendered to this tool]`.

**Mike Bland's independent, earlier (2011) explainer** — a named Google engineer's own account, useful as a second, older data point, not a substitute for the book:

> **Small (Unit):** "Very fine-grained; exercises low-level logic at the scope of a function or a class; no external resources (except possibly a small data file or two, but preferably no file system dependencies whatsoever); very fast execution on the order of seconds"
> **Medium (Integration):** "Exercises interaction between discrete components; may have file system dependencies or run multiple processes; runs on the order of minutes"
> **Large (System):** "Exercises the entire system, end-to-end; used to identify catastrophic errors and performance bottlenecks at scale; may launch or interact with services in a datacenter, preferably with a staging environment to avoid affecting production (especially user traffic, and most especially advertising traffic!); can run on the order of minutes or hours"

Mike Bland's own ratio claim, **explicitly and honestly caveated by him as arbitrary**:
> "roughly 70% small, 20% medium, and 10% large for the common case" — but he states these proportions were "pulled out of a hat" and served only as "a very useful starting point for discussion and goal-setting."

**This is a direct, dated contradiction with the book's 80/15/5** — see §10.

### 4.5 Test Certified program (Mike Bland, mike-bland.com/2011/10/18/test-certified.html, 18 Oct 2011)

Historical program (developed ~2006 by Bharat Mediratta and Nick Lesiecki), the precursor culture to what's now codified in the book:

> Test Certified (TC) was "a twelve-step program (without twelve steps, exactly) for getting teams to improve their developer testing practices."

**Levels (per Bland's account):**
- **Level One:** measurement/tooling setup — continuous build machines, test coverage metrics, test classification (small/medium/large), identification of flaky tests. Designed for 1–5 days, 1–2 engineers.
- **Level Two:** written policy forbidding untested code submissions, plus numeric goals for coverage and test-size balance.
- **Level Three:** sustained high coverage across all test types, low tolerance for broken/flaky tests, ongoing commitment.
- Later iterations added **Levels Four and Five** with stricter coverage requirements and static-analysis integration. `[This later-levels detail is thinner in sourcing — treat as a secondary characterization, not a verbatim quote.]`

### 4.6 Test Doubles at Google (Ch. 13)

> Test double defined as "an object or function that can stand in for a real implementation in a test, similar to how a stunt double can stand in for an actor in a movie."

**Preference order, explicit:**
1. **Real implementations (preferred)** — use when fast, deterministic, simple dependencies (e.g., value objects: money, dates, addresses, collections). "A real implementation should be preferred over a test double."
2. **Fakes** — lightweight, real-behaving-but-production-unsuitable implementations (e.g., in-memory DB). Must be owned/maintained by the API-owning team (not individual test authors) and must themselves be tested for conformance to the real API's contract.
3. **Stubs** — hardcoded returns for specific scenarios; quick but exposes implementation details; use sparingly, on a small number of functions with direct test-assertion relationships.
4. **Mocks / interaction testing** — validates *how* functions are called, not correctness of outcome; appropriate only for state-changing functions (e.g., sendEmail, saveRecord); avoid where possible due to brittleness.

**Explicit warning from institutional experience with overuse:**
> "when mocking frameworks first came into use at Google, they seemed like a hammer fit for every nail... though these tests were easy to write, we suffered greatly given that they required constant effort to maintain while rarely finding bugs."

### 4.7 Unit testing principles (Ch. 12)

> The ideal test is **unchanging** after being written — it should only need modification when *requirements* change, not when *implementation* changes.

**Four categories of production change and how tests should respond:**
- Pure refactorings → tests untouched.
- New features → existing tests untouched; new tests added.
- Bug fixes → new tests for missed cases; don't modify existing tests.
- Behavior changes → only now should existing tests be updated.

**Test public APIs, not implementation** — "if a test breaks from a change, that same change would likely break real users."

**Test state, not interactions** — interaction-based (mock-heavy) tests are brittle because they encode implementation, not outcome.

**DAMP over DRY** — "Descriptive And Meaningful Phrases" preferred over strict deduplication; some repetition is acceptable for per-test clarity; each test should be understandable without jumping to helpers.

**Behavior-driven structure** — Given/When/Then; name tests around behaviors (e.g. `shouldNotAllowWithdrawalsWhenBalanceIsEmpty`), not around methods.

### 4.8 Flakiness

Two distinct, dated numbers found — **do not conflate them**:

- *Software Engineering at Google* (book, current canonical text), Ch. 11, exact quotes:
  > "At Google, our flaky rate hovers around 0.15%, which implies thousands of flakes every day."
  > "Our experience suggests that as you approach 1% flakiness, the tests begin to lose value."
  > "If each test has even a 0.1% of failing when it should not, and you run 10,000 tests per day, you will be investigating 10 flakes per day."

- Google Testing Blog, "Flaky Tests at Google and How We Mitigate Them," John Micco, 27 May 2016 (testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html) — I could not get the fetch tool to surface the article's own headline percentage from the rendered body (it appears to have returned mostly comments/metadata); WebSearch snippets referencing this same 2016 post elsewhere cite "about 1.5% of test runs" as flaky. **This 1.5% figure is `[UNVERIFIED — not confirmed via direct primary-text fetch of the 2016 post itself]`** and should be treated with caution; it may also simply be measuring a different thing (test-run flake rate vs. steady-state flaky-test population rate) than the book's 0.15%, which would resolve the apparent conflict without contradiction. Flagging both numbers rather than picking one.

Mitigation strategies cited (via WebSearch synthesis of the 2016 post, not a confirmed direct quote): categorization/monitoring of flaky tests, automatic quarantine of high-flake tests with auto-filed bugs, selective rerun-on-failure, tracking flakiness changes to pinpoint root cause. `[Secondary-source paraphrase, not verbatim.]`

## 5. Kent Beck's Test Desiderata (verbatim, all 12)

Source: testdesiderata.com (redirected from kentbeck.github.io/TestDesiderata/, so treat as the canonical current hosting of this content; original context per general knowledge is a 2019 Twitter thread / Medium post — I could not independently confirm the exact original 2019 publication venue/date via this fetch, so date is `[UNVERIFIED — page itself did not surface a date]`).

All 12 properties, verbatim with Beck's one-line gloss, exactly as returned by the fetch:

1. **Isolated** — "tests should return the same results regardless of the order in which they are run."
2. **Composable** — "I should be able to test different dimensions of variability separately and combine the results."
3. **Deterministic** — "if nothing changes, the test result shouldn't change."
4. **Fast** — "tests should run quickly."
5. **Writable** — "tests should be cheap to write relative to the cost of the code being tested."
6. **Readable** — "tests should be comprehensible for reader, invoking the motivation for writing this particular test."
7. **Behavioral** — "tests should be sensitive to changes in the behavior of the code under test."
8. **Structure-insensitive** — "tests should not change their result if the structure of the code changes."
9. **Automated** — "tests should run without human intervention."
10. **Specific** — "if a test fails, the cause of the failure should be obvious."
11. **Predictive** — "if the tests all pass, then the code under test should be suitable for production."
12. **Inspiring** — "passing the tests should inspire confidence"

**Framing — properties in tension, not a checklist (verbatim):**

> "Some properties support each other... Some properties interfere with each other... Sometimes (and this is the magic), properties only seem to interfere."

**This framing is load-bearing and should not be dropped when this list is reused downstream:** Beck is explicit that you cannot maximize all 12 simultaneously — e.g., Fast and Isolated can pull against Behavioral fidelity in a large integrated system; the skill/agent applying this list should treat it as a set of dials to trade off deliberately per test, not a compliance checklist to tick uniformly.

I did not find, in the fetched page, a separately reachable "programmer test principles" document distinct from this one — no such page was surfaced. `[Not located; flagging as not found rather than guessing a URL.]`

## 6. Test double taxonomy

**Primary-source caveat:** xunitpatterns.com itself was unreachable (§0). The following is Meszaros' taxonomy as transcribed and cited by Martin Fowler across `bliki/TestDouble.html` and `articles/mocksArentStubs.html`, both of which explicitly attribute it to Gerard Meszaros' xUnit Test Patterns work. Wording is verbatim from Fowler's pages, which appear to closely paraphrase/quote Meszaros directly.

> "Test Double is a generic term for any case where you replace a production object for testing purposes." (Fowler, TestDouble.html)

**The five kinds, verbatim (identical wording appeared in both Fowler pages fetched, suggesting stable, faithful transcription of Meszaros):**

1. **Dummy** — "objects are passed around but never actually used. Usually they are just used to fill parameter lists."
2. **Fake** — "objects actually have working implementations, but usually take some shortcut which makes them not suitable for production"
3. **Stub** — "provide canned answers to calls made during the test, usually not responding at all to anything outside what's programmed in for the test."
4. **Spy** — "stubs that also record some information based on how they were called"
5. **Mock** — "pre-programmed with expectations which form a specification of the calls they are expected to receive. They can throw an exception if they receive a call they don't expect and are checked during verification to ensure they got all the calls they were expecting."

Note the internal taxonomy relationship implied by the wording itself: Spy is explicitly defined as a **subtype of Stub** ("stubs that also record..."), and Mock is distinguished from all the others by being the only one that does **behavior verification** (checks it received the calls it expected) rather than pure state/canned-response behavior.

**Where Fowler's usage diverges from strict Meszaros terminology:** Fowler notes explicitly, per `mocksArentStubs.html`:

> "only mocks insist upon behavior verification."

This is Fowler's own **generalization/emphasis**, used to build his classicist/mockist framing (§2.6) — Meszaros' taxonomy itself is a naming/behavior scheme for five distinct object roles, whereas Fowler layers a second axis on top (state vs. behavior verification) to explain *why* the mockist school treats Mock as categorically different from the other four. In other words: Meszaros gives you the noun taxonomy; Fowler adds the verification-philosophy axis that explains why the classicist/mockist rift exists. `[This distinction — taxonomy vs. philosophy layered on top — is my synthesis of the two fetched Fowler pages, both of which independently reproduce the same five definitions; I could not cross-check this synthesis against Meszaros' own framing directly due to the xunitpatterns.com outage.]`

## 7. Contract testing

### 7.1 Pact's model (docs.pact.io)

> Consumer-driven contract testing is "code-first" — "the contract is generated during the execution of the automated consumer tests." Benefit: only communication paths actually used by consumers get tested, so providers can change unused behavior freely.

**What a contract verifies:** that inter-application messages (HTTP request/response, or queue messages) "conform to a shared understanding that is documented in a contract" — described as "contract by example": each test case is one concrete request/response pair.

**What a contract explicitly does NOT verify (direct quote, important):**
> Contract testing alone "does not provide any test based assurance that the consumers are calling the provider in the correct manner, or that the provider can meet all its consumers' expectations." This is a stated limitation relative to broader integration testing.

This is the core "targeted substitute, not a replacement" framing the lead asked about: a contract test tells you the specific interactions exercised in the pact are compatible; it does **not** tell you the consumer's overall usage pattern is correct, nor that a consumer whose interactions weren't captured in a pact will work.

### 7.2 Pact Broker / can-i-deploy

> The `can-i-deploy` tool answers: "Is the version I'm about to deploy compatible with versions already running in my target environment?" — "Before you deploy a new version of an application to a production environment, you need to know whether or not the version you're about to deploy is compatible with the versions of the other apps that already exist in that environment."

Mechanism: the "Pact Matrix" tracks every consumer/provider version pair that has been tested together; deployments are recorded (`record-deployment`); `can-i-deploy` checks whether the candidate version has successful verification results against every currently-deployed dependent version, returning exit code 0 only when "All required verification results are published and successful."

**Decision rule this enables:** independent, decoupled deployability — teams can deploy on their own schedule without a synchronized big-bang release, as long as the broker shows all cross-service verifications green. This is a direct, practical replacement for "deploy everything together and run a full integration/E2E suite" in organizations with many services.

### 7.3 Bi-directional contract testing (PactFlow)

> BDCT is "a type of static contract testing where two contracts—one representing the expectations of the consumer and the other representing the provider's capabilities—are compared to ensure compatibility" — consumers generate a contract from a mocking tool (Wiremock, MSW, Cypress, etc.), providers verify a provider contract using a functional API testing tool, both are uploaded to PactFlow and compared for compatibility.

Contrast with classic CDC: in classic Pact CDC, the consumer's pact **drives** the provider's verification test directly (the provider replays the consumer-authored pact). In BDCT, consumer and provider generate contracts **independently**, and PactFlow reconciles them — reducing organizational coupling (no need for provider to run consumer-authored tests) at the cost of being a PactFlow-exclusive commercial feature (not in the open-source Pact Broker), and only supporting Pact/OpenAPI-Spec formats currently (with SOAP/Protobuf/GraphQL/Postman on a stated roadmap).

**Decision rule:** BDCT is positioned for **larger organizations** where requiring every provider team to run every consumer's Pact tests doesn't scale, or where retrofitting contract testing onto systems already documented via OpenAPI is more practical than adopting Pact's consumer-test-first workflow.

### 7.4 Fowler's ConsumerDrivenContracts (2006)

Already covered in §2.7 — note the scope constraint: Robinson's original 2006 formulation assumes "a single enterprise or a closed community of well-know[n] services." Pact's later generalization, and especially PactFlow's BDCT, are explicit attempts to relax that closed-community assumption for larger/looser organizations — this is a genuine **evolution** of the pattern, not just a re-implementation. `[Framing/synthesis is mine; both underlying facts are separately sourced above.]`

## 8. State of the shape debate 2026

### 8.1 Ice-cream cone — origin

Coined by **Alister Scott**, a core contributor to the Watir community, on his blog watirmelon.blog, in a 2012 post ("Introducing the Software Testing Ice-Cream Cone," dated 31 January 2012 per the URL slug). **I could not directly fetch this page — WebFetch failed with "certificate has expired."** The description below is reconstructed from WebSearch result snippets (which themselves synthesize the page), not a direct primary read:

> The ice-cream cone anti-pattern describes a testing effort inverted from the pyramid: too few low-level (unit/integration/component) tests, too many tests run through the GUI, and an even larger number of manual tests on top. Consequence: team time gets consumed by UI-test maintenance/troubleshooting, and confidence shrinks as runtimes and false-failure rates increase.

`[UNVERIFIED — primary source (watirmelon.blog) not directly reachable due to expired TLS cert on that domain; description is a secondary reconstruction. Note the cert issue is dated 2026-07-26 — the site's cert may simply have lapsed, this is a site-operational fact, not evidence against Scott's authorship, which is corroborated identically across multiple independent secondary sources found via WebSearch.]`

### 8.2 Testing Honeycomb — Spotify

Source: engineering.atspotify.com/2018/01/testing-of-microservices, authors André Schaffer & Rickard Dybeck, **published 11 January 2018**.

> Spotify proposes the Testing Honeycomb as "a more fitting way of structuring our tests for Microservices" versus the pyramid.

> "The biggest complexity in a Microservice is not within the service itself, but in how it interacts with others, and that deserves special attention."

**Shape/layers:** focus primarily on **Integration Tests** (largest layer) → few **Implementation Detail Tests** (smaller) → virtually no **Integrated Tests** (ideally none). This inverts the pyramid's unit-heavy base in favor of integration-heavy middle — explicitly scoped to **microservices**, where the risk surface is interaction between small services rather than complex internal logic in any one service.

**Decision rule (implicit but clear):** when a service is small and its internal logic is simple, but its correctness heavily depends on correct interaction with other services, shift test investment toward integration-level tests; unit tests of trivial internal logic have low marginal value in that specific architecture.

### 8.3 Testing Diamond

No single credited originator found with confidence — multiple sources describe the shape convergently but I could not find one canonical "coiner" the way Cohn (pyramid), Dodds (trophy), Spotify (honeycomb), and Scott (ice-cream cone) are each individually credited. `[UNVERIFIED — treat "testing diamond" as a convergently-arrived-at community term, not attributable to one named source, unless a stronger citation surfaces later.]`

General description (via WebSearch synthesis): roughly equal emphasis on unit and integration tests, or integration-weighted; motivated by the observation that the strict pyramid's "unit tests are the majority" assumption doesn't hold for systems where most complexity/risk lives at integration boundaries (APIs, data transformation, DB interactions). Considered most applicable to "projects where system integrations matter most."

### 8.4 Is the pyramid still defended in 2026?

**Yes, with qualification — the strongest, most recent single source found is Ramona Schwering, Smashing Magazine, "Long Live The Test Pyramid," 6 September 2023:**

> "In no way do I believe the Test Pyramid is dead. I might even argue that it is as essential to know it now as ever."

Notably, per the fetch, Schwering does **not** dismiss the alternatives — she calls the Trophy "the most sensible" among them while noting integration/E2E tests carry "longer runtimes and lower reliability." Her actual position is closer to: the pyramid remains the right *default heuristic*, but real teams adapt it, and the debate should center on tests that "run quickly and reliably and only fail when there's a real problem," regardless of which shape metaphor is used — which is essentially the same conclusion Fowler reaches via Justin Searls in §2.3 (2021) and Google reaches via emphasizing hermeticity/determinism over ratio (§4).

**2026-dated commentary** (from WebSearch snippets of onpathtesting.com, qalified.com, baytechconsulting.com, digitalapplied.com, ankurm.com — all secondary/marketing-adjacent sources, not individually verified via direct fetch, so treat collectively as `[lower-confidence, secondary blog-aggregate signal, not individually fact-checked]`):

> Consensus reported: "the 2026 reality is that both shapes are valid and the choice should be deliberate" — pyramid favored for "backend services that have heavy domain logic," trophy/integration-weighted favored for "frontends and integration-heavy services." "The most effective teams in 2026 do not argue about which shape is 'correct'... They ask... 'Where do our bugs actually come from?' Then they aim their testing effort there."

**Synthesized conclusion for this cluster (my own read across every source above, high confidence):** By 2026 there is no single "winning" shape among credible voices. What's converged on instead, across Fowler (2021), Google (SWE at Google), Dodds (implicitly, via "resembles usage"), and even pyramid-defenders like Schwering (2023), is a **shared meta-rule**: pick your test-type mix based on **where your system's actual risk/complexity/bug-source lives**, and judge individual tests by properties (speed, determinism, expressiveness, specific-failure-signal — i.e., Beck's Desiderata, §5) rather than by hitting a target ratio. The ratio debate (pyramid vs. trophy vs. honeycomb vs. diamond) is now widely treated as a **starting heuristic per architecture style**, not a universal law: pyramid for monoliths/heavy-domain-logic backends, honeycomb for microservices, trophy for integration-heavy frontends, diamond for integration-centric systems (APIs/data pipelines).

## 9. Decision rules extracted (table)

| Rule | Source | URL | Contested? |
|---|---|---|---|
| Write far more low-level tests than high-level ones; the pyramid is a shape, not a ratio in the original | Cohn (via Fowler) | martinfowler.com/bliki/TestPyramid.html | No — widely accepted as historical baseline |
| Push tests down: only keep a higher-level test if no lower-level test gives equivalent confidence | Vocke/Fowler | martinfowler.com/articles/practical-test-pyramid.html | No |
| Test observable behavior/public API, not implementation/private methods | Fowler; Google (ch12) | practical-test-pyramid.html; abseil ch12 | No — convergent |
| Stop debating ratios; optimize for expressive, fast, reliable tests that fail for real reasons | Fowler quoting Justin Searls | martinfowler.com/articles/2021-test-shapes.html | Contested in spirit against ratio-oriented advice (§4.3, Cohn/Google) |
| Default to sociable/real collaborators; isolate (solitary/double) only when collaboration is awkward, slow, or nondeterministic | Fowler | martinfowler.com/bliki/UnitTest.html | Yes — vs. mockist school, "always use a mock for interesting behavior" |
| Classicist: use real objects if possible, double if awkward. Mockist: always mock objects with interesting behavior | Fowler | mocksArentStubs.html | Explicitly presented as an unresolved disagreement between capable practitioners |
| Coverage is a detector of untested code, not a quality score; judge by (rare escaped bugs) AND (rare fear of change), not a % target | Fowler | martinfowler.com/bliki/TestCoverage.html | No |
| Disambiguate "integration test" explicitly: narrow (one dependency, doubles elsewhere) vs. broad (full live stack) — prefer narrow when possible for faster/more reliable feedback | Fowler | martinfowler.com/bliki/IntegrationTest.html | No, but widely violated in practice per Fowler's own complaint |
| The more tests resemble real usage, the more confidence they provide; avoid test-only users/paths | Kent C. Dodds | kentcdodds.com/blog/avoid-the-test-user; testing-trophy | No — but in tension with "isolate for speed" rules above |
| Diminishing test-writing returns beyond ~70% coverage; avoid testing trivial/logic-free code | Dodds | kentcdodds.com/blog/write-tests | Dodds' own number, not corroborated elsewhere |
| Real implementation > Fake > Stub > Mock, in that preference order; mocks only for state-changing calls, used sparingly | Google (ch13) | abseil.io ch13 | No, but explicitly contradicts naive "mock everything" default some teams adopt |
| Tests should be unchanging except when requirements (not implementation) change; test behaviors not methods | Google (ch12) | abseil.io ch12 | No |
| Beyoncé Rule: if you care about it, put a test on it — covers non-functional properties too (perf, security, a11y) | Google (ch11) | abseil.io ch11 | No |
| Aim ~80/15/5 unit/integration/e2e as a rough guideline, expect team variance | Google (ch11, current book) | abseil.io ch11 | Yes — vs. Mike Bland's own earlier 70/20/10 "pulled out of a hat" (§10) |
| Contract tests verify only the specific captured interactions; they do NOT verify a consumer's full usage pattern or that the provider satisfies all consumers | Pact docs | docs.pact.io | No, but frequently misunderstood/oversold as full integration-test replacement |
| Use can-i-deploy as an automated compatibility gate to decouple deployment schedules across services | Pact docs | docs.pact.io/pact_broker/can_i_deploy | No |
| Shift toward integration-heavy testing (honeycomb) specifically for microservices, where interaction risk exceeds internal-logic risk | Spotify Eng | engineering.atspotify.com/2018/01/testing-of-microservices | Yes — explicitly a departure from the pyramid, scoped to microservice architecture |
| Choose shape by architecture style: pyramid for heavy-domain-logic backends/monoliths, honeycomb for microservices, trophy for integration-heavy frontends | 2026 synthesis (multiple secondary sources) | see §8.4 | This is itself the resolution of the contest, not a single-source rule |
| All 12 Desiderata properties are in tension; treat as dials to trade off per test, not a uniform checklist | Kent Beck | testdesiderata.com | No, but frequently flattened into a checklist by downstream users — Beck explicitly warns against this |

## 10. Direct contradictions between authorities

1. **Test-mix ratio: 80/15/5 (Google's book, current) vs. 70/20/10 (Mike Bland, Google engineer, 2011, explicitly "pulled out of a hat").** Both are "Google" sources, ~13 years apart, and the earlier one openly disclaims precision. This is a real, dated drift within the same institution's own numbers — not different institutions disagreeing. Treat both as illustrative anchors, not physical constants. See §4.3, §4.4.

2. **Classicist vs. mockist testing philosophy — Fowler (classicist: default to real objects, mock only when awkward) vs. the mockist school (default to mocking any object with interesting behavior).** Fowler frankly states this is unresolved between capable people, not a case where one side is simply wrong. See §2.6.

3. **Pyramid (unit-heavy base) vs. Honeycomb (integration-heavy middle, Spotify) vs. Trophy (integration-weighted, Dodds) vs. Diamond (integration/unit roughly equal).** These are genuinely different prescriptions for where to put testing *volume*, not just definitional confusion — though Fowler (§2.3) argues part of the apparent conflict is definitional (what counts as "unit" vs. "integration" differs by camp). The архitecture-contingent resolution in §8.4 is the field's current best answer, not a proof that one shape is universally correct.

4. **Ratio-talk itself is contested as a category.** Fowler (via Searls, 2021) and, implicitly, Kent Beck's Desiderata (properties-based, not ratio-based) argue that debating percentages is "a distraction" — directly at odds with Google's own book, which states a specific 80/15/5 ratio as a "very rough guideline" worth stating. Both camps exist within otherwise well-respected, current sources — this is a live methodological disagreement about whether numeric ratios are even a useful unit of guidance, not just noise.

5. **Flakiness rate: 0.15% (SWE at Google book, current) vs. ~1.5% (secondary citations of the 2016 Google Testing Blog post, unconfirmed via direct fetch).** Possibly measuring different things (steady-state flaky population vs. per-run flake incidence), which would dissolve the apparent order-of-magnitude conflict — but I could not confirm this resolution directly, since the 2016 post's body text wasn't retrievable. Flagged rather than resolved. See §4.8, §11.

6. **Consumer-driven contract testing's original scope (Robinson 2006: "closed community of well-know[n] services") vs. Pact's broader generalized use today, further loosened by PactFlow's bi-directional model for large/looser orgs.** Not a contradiction between authors disagreeing, but a real scope drift over 20 years worth flagging so the skill doesn't apply Robinson's closed-community assumption where it no longer fits the tooling's actual use.

## 11. Numeric thresholds & ratios (with source + date)

| Number | What it measures | Source | Date | Confidence |
|---|---|---|---|---|
| 80% unit / 15% integration / 5% e2e | Test-type mix, "very rough guideline" | *Software Engineering at Google*, Ch. 11 | Book publication 2020 (content as currently hosted, checked 2026-07-26) | High — direct verbatim fetch |
| 70% small / 20% medium / 10% large | Test-size mix, explicitly "pulled out of a hat" | Mike Bland (Google engineer) blog | 1 Nov 2011 | High — direct verbatim fetch, but author himself disclaims precision |
| ~70% code coverage | Point of diminishing returns on writing more tests | Kent C. Dodds | 13 Jul 2019 | High — direct fetch, but it's one author's personal heuristic, not measured/cited data |
| 0.15% | Google's steady-state flaky test rate | *Software Engineering at Google*, Ch. 11 | Book, checked 2026-07-26 | High — direct verbatim fetch, three related sentences confirmed |
| ~1% flakiness | Threshold beyond which tests "begin to lose value" | *Software Engineering at Google*, Ch. 11 | same | High — direct verbatim fetch |
| ~1.5% flaky test runs | Flaky rate | Testing Blog 2016 post (John Micco), via secondary citation only | 27 May 2016 | Low — `[UNVERIFIED, could not confirm via direct primary fetch]` |
| 87% or 100% coverage mandates | Cited as examples of coverage targets some orgs impose | Fowler, quoting/paraphrasing common practice, not a specific org | 17 Apr 2012 | Medium — Fowler presents 87% as an illustrative example, not attributed to a specific real policy |
| 15 min / 1 hr default timeout, multi-hour/day max | Google's Large test timeout defaults | *Software Engineering at Google*, Ch. 14 | Book, checked 2026-07-26 | High — direct verbatim fetch |
| Small tests: "one thread, one process, one machine" | Hard constraint on Small tests | *Software Engineering at Google*, Ch. 11/14 | Book, checked 2026-07-26 | High — direct verbatim fetch, confirmed twice |

## 12. [UNVERIFIED] items

Consolidated list of everything flagged as unverified above, for the lead's convenience:

1. Mike Cohn's original book text — no numeric ratio attributed to Cohn himself in any source reached; absence-of-evidence, not direct primary-text confirmation (I could not access *Succeeding with Agile* directly).
2. Gerard Meszaros' xUnit Test Patterns taxonomy (§6) — sourced via Fowler's transcription, not a direct fetch of xunitpatterns.com (site unreachable, `ECONNREFUSED`, 2×).
3. Alister Scott's original ice-cream-cone post (§8.1) — watirmelon.blog unreachable (expired TLS certificate); description is WebSearch-snippet reconstruction only.
4. Google's full Small/Medium/Large constraint table — threads/network/sleep/filesystem/DB/timeouts enumerated together — not retrievable verbatim from abseil.io ch14 via this tool; only "one thread, one process, one machine" confirmed directly. Richer "no sleep, no blocking network calls" framing is secondary-source paraphrase.
5. The 2016 Google Testing Blog flaky-test percentage (~1.5%) — not confirmed via direct fetch of the post body; only secondary citations found it.
6. Kent Beck's Test Desiderata original publication date/venue (2019 Twitter thread vs. Medium/Substack post, per the task brief) — testdesiderata.com itself did not surface a date in the fetched content.
7. A single named "coiner" of the Testing Diamond shape — no individual/organization credited with confidence across sources found.
8. The exact phrase "the broadest part of your test suite" applied to E2E tests in Vocke's practical-test-pyramid summary (§2.1) — reads inconsistently with the pyramid's own shape claim (E2E should be *narrowest*); may be a WebFetch extraction/summarization artifact rather than the article's actual wording. Recommend a human re-check of the primary page if this exact sentence is going to be quoted downstream.
9. Later Test Certified "Levels Four and Five" (§4.5) — thin sourcing, characterized rather than quoted.
10. 2026-dated shape-debate commentary (onpathtesting.com, qalified.com, baytechconsulting.com, digitalapplied.com, ankurm.com) — all via WebSearch snippet synthesis only, none individually fetched/fact-checked; treat as a directional signal about market/blog consensus in 2026, not as citable authoritative fact.
