# Canon W3 — Evidence, Coverage & Suite Health
Compiled 2026-07-26. Worker W3 of 4, `quality` skill canon build.

## 0. Sources reached / not reached (+ WebSearch calls used)

**WebSearch calls used: ~15 (at the session's stated soft cap).** Wherever WebFetch's small-model summarizer looked unreliable, I fetched the raw file directly (`curl` bypassing a broken TLS cert on exampler.com, or WebFetch on a PDF that then gets handed to me raw via the Read tool) and quote from the primary text I actually read, not from a WebFetch summary. Every verbatim block below was read directly by me in full or in the cited page range — none are WebSearch-snippet paraphrases presented as quotes.

**Successfully reached and read in full/substantial part (primary sources):**
- Brian Marick, "How to Misuse Code Coverage" (1997/1999) — full 13-page PDF read verbatim (had to bypass a broken TLS cert on `exampler.com` via `curl`; WebFetch itself cannot reach this domain — cert mismatches to `*.user.fm`)
- Martin Fowler, "TestCoverage" bliki (martinfowler.com/bliki/TestCoverage.html, 17 Apr 2012) — full page text extracted and read verbatim
- Martin Fowler, "Eradicating Non-Determinism in Tests" (martinfowler.com/articles/nonDeterminism.html, 14 Apr 2011) — full article read verbatim
- Inozemtseva & Holmes, "Coverage Is Not Strongly Correlated with Test Suite Effectiveness" (ICSE 2014) — full 11-page PDF read verbatim (cs.ubc.ca/~rtholmes/papers/icse_2014_inozemtseva.pdf)
- Petrović & Ivanković, "State of Mutation Testing at Google" (ICSE-SEIP 2018) — full paper read verbatim (static.googleusercontent.com mirror of research.google.com/pubs/archive/46584.pdf)
- Jia & Harman, "An Analysis and Survey of the Development of Mutation Testing" (IEEE TSE 2011) — pages 1–6 read verbatim (crest.cs.ucl.ac.uk/fileadmin/crest/sebasepaper/JiaH10.pdf); did not read the full 31 pages
- Luo, Hariri, Eloussi, Marinov, "An Empirical Analysis of Flaky Tests" (FSE 2014) — read the authors' own FSE-2014 presentation slide deck in full (mir.cs.illinois.edu/farah/presentations/fse14_presentation.pdf); did NOT read the full paper PDF itself (paywalled ACM DL; direct-download attempts 404'd)
- Bettenburg, Just, Schröter, Weiss, Premraj, Zimmermann, "What Makes a Good Bug Report?" (FSE 2008) — full paper read verbatim (thomas-zimmermann.com/publications/files/bettenburg-fse-2008.pdf)
- van Deursen, Moonen, van den Bergh, Kok, "Refactoring Test Code" (XP2001 / CWI report SEN-R0119) — full paper read verbatim (ir.cwi.nl/pub/4324/04324D.pdf)
- Ram Chillarege, "ODC — Orthogonal Defect Classification" tutorial deck (2000) — read in full (pdfs.semanticscholar.org mirror); this is Chillarege's own slide deck, a primary source from the ODC inventor, though not the original 1992 IEEE TSE paper text itself
- Google Testing Blog, "Flaky Tests at Google and How We Mitigate Them" (John Micco, May 2016) — read via a mirror (googblogs.com) that reproduced the article text; the canonical testing.googleblog.com page's WebFetch extraction returned only reader comments, not the article body, so I cross-checked against the mirror
- Google Testing Blog, "Where do our flaky tests come from?" (Jeff Listfield, 17 Apr 2017) — WebFetch extraction returned mostly reader comments; I obtained one substantive quoted finding from the comments/author-reply section but NOT the full article body or its charts
- Perry, Srivastava, Kumar, Boneh, "Do Users Write More Insecure Code with AI Assistants?" (CCS 2023) — pages 1–3 of the arXiv PDF (2211.03622) read verbatim, covering abstract, methodology, and participant counts
- Machalica et al., "Predictive Test Selection" (Facebook, ICSE-SEIP 2019) — abstract read via WebFetch on arxiv.org/abs/1810.05286
- dora.dev "DORA Metrics — Four Keys" guide page — fetched directly, last-updated date visible (5 Jan 2026)

**Not reached / could not verify to primary-source standard (flagged, not guessed):**
- IEEE 1044 (Standard Classification for Software Anomalies) — paywalled IEEE standard; not fetched. Section 7 below gives only what is safely known about its structure from secondary description, explicitly marked UNVERIFIED for exact wording.
- Full RTCA DO-178C text — paywalled; the DO-178C Level A/B/C/D → coverage-type mapping table given below is reconstructed from secondary/industry sources (vendor whitepapers), NOT read from the primary standard. The DO-178B (not C) → MC/DC link IS independently confirmed inside the Inozemtseva & Holmes paper itself (which cites Hayhurst et al.'s NASA tech report), so that specific claim is on firmer footing than the full A–D table.
- GitClear code-quality reports — not fetched at all this session (budget ran out); do not cite any GitClear number in this file.
- Google's "Advances in Continuous Integration Testing @Google" / Google TAP paper — found a URL in search results but did not fetch or read it. Not cited.
- Humble & Farley, *Continuous Delivery* (book) — no direct text access; the "ten-minute build/commit stage" guidance is reported below only as a well-known paraphrase, explicitly flagged as unverified-verbatim.
- DORA 2025 report primary text on "team archetypes" replacing the Elite/High/Medium/Low four-tier model — the dora.dev overview page I fetched is a navigation shell with no report body; my claim that the 2025 report retired the four-tier model rests on third-party blog summaries (Scrums.com, Koalr.com) found via WebSearch, NOT on reading dora.dev's own report text. Flagged UNVERIFIED accordingly — treat as directionally likely but not confirmed to primary-source standard.
- Any specific "LLM tests assert the existing bug as expected behavior" empirical study — I could not find a definitive peer-reviewed paper measuring this specific phenomenon by name. What exists (per WebSearch snippets only, not read in full) is a broader 2024–2025 literature on LLM-generated test/assertion quality that raises the concern but doesn't quantify it. Treated as UNVERIFIED / open question in Section 9, not stated as an established finding.
- AI code review tool false-positive-rate studies — not found within budget. Not cited.

---

## 1. Coverage: the canon and the critique

### 1.1 Brian Marick, "How to Misuse Code Coverage" (1997, republished 1999 by Reliable Software Technologies)

Read in full, verbatim, via `exampler.com/testing-com/writings/coverage.pdf` (fetched with curl because WebFetch cannot reach this host — TLS cert mismatch).

**The core argument — coverage tells you what you missed, not what's safe:**

Marick walks through a concrete example (a line-counting tool `lc`) where a coverage tool reports 100% "feasible" coverage after two tests are added, and directly refutes the inference that testing is therefore done:

> "But it's not. Consider this code: ... Suppose I ran some tests over this code and checked the coverage. Further suppose that the coverage tool told me I'd never taken the `if` on line 24 in the true direction. The natural thing to do would be to set up a test such that the operation fails with a FATAL_ERROR ... I've satisfied the coverage tool. But I'm not done testing, because this code is wrong. The programmer either never knew or forgot that `perform_operation` can actually return three status codes ... The test suite should check that the code handles recoverable errors correctly. But no test does that (else the bug would have been discovered). And the coverage tool didn't tell me to write the needed tests. **It can't. It can only tell me how the code that exists has been exercised. It can't tell me how code that ought to exist would have been exercised.**"

He names this class of bug explicitly:

> "These types of bugs — those that are fixed by adding new code — are sometimes called *faults of omission*. Unfortunately, they are quite common in real life ... My favorite one is [Glass81], in which he describes faults of omission as 'code not complex enough for the problem'."

**His key operating heuristic** (also the one Fowler later quotes back):

> "If a part of your test suite is weak in a way that coverage can detect, it's likely also weak in a way coverage can't detect."

**On coverage tools as clues, not commands:**

> "I warn against it by saying that coverage tools don't give commands ('make that evaluate true'), they give clues ('you made some mistakes somewhere around there'). If you treat their clues as commands, you'll end up in the fable of the Sorcerer's Apprentice ... Designing your initial test suite to achieve 100% coverage is an even worse idea. It's a sure way to create a test suite weak at finding those all-important faults of omission ... **Don't use code coverage in test design. The return on your testing dollar (in terms of bugs found) is too low.**"

**On managers making coverage a shipping gate — the clustering observation** (this is the empirical-flavored anecdote that most secondary sources garble; here is the actual text):

> "Suppose a manager requires some level of coverage, perhaps 85%, as a 'shipping gate'. The product is not done — and you can't ship — until you have 85% coverage. The problem with this approach is that people optimize their performance according to how they're measured. ... Perhaps this might hint at the answer: when I talk about coverage to organizations that use 85%, say, as a shipping gate, I sometimes ask how many people have gotten substantially higher, perhaps 90%. **There's usually a few who have, but everyone else is clustered right around 85%.** Are we to believe that those other people just happened to hit 85% and were unable to find any other tests worth writing? Or did they write a first set of tests, take their coverage results, bang away at the program until they got just over 85%, and then heave a sigh of relief at having finished a not-very-fun job? ... I'm picking on managers. It's their job to provide appropriate incentives ... Coverage numbers (like many numbers) are dangerous because they're objective but incomplete."

This is a first-person anecdotal observation Marick reports from his own consulting conversations — **not** a controlled empirical study with a sample size. Treat "clustering at the mandated threshold" as a plausible, widely-repeated, but *anecdotal* claim from a credible practitioner, not as peer-reviewed data. (For the actual peer-reviewed correlation data, see Inozemtseva & Holmes below.)

**On risk-based allocation** (his actual constructive practice, often omitted from summaries): he divides code into High/Medium/Low risk and tests High risk thoroughly, Medium partially, Low incidentally — then treats coverage numbers per-bucket, not in aggregate:

> "Looking at aggregate coverage is a matter of idle curiosity. It tells me more about how much of the code was low risk than it tells anything about testing."

**Source:** Brian Marick, "How to Misuse Code Coverage," Testing Foundations, 1997 (this version written while at Reliable Software Technologies, 1999). `http://www.exampler.com/testing-com/writings/coverage.pdf`. Historical (1997) but still the canonical citation; current as a position, dated as an artifact — the multiple-condition-coverage terminology it uses ("multiple condition coverage") predates today's more standard "branch"/"MC/DC" vocabulary.

### 1.2 Martin Fowler, "TestCoverage" bliki entry

Read in full verbatim at martinfowler.com/bliki/TestCoverage.html, published **17 April 2012**, byline Martin Fowler, tags "testing, metrics."

**On targets vs. expectations — quoting Marick directly:**

> "From time to time I hear people asking what value of test coverage (also called code coverage) they should aim for, or stating their coverage levels with pride. Such statements miss the point. **Test coverage is a useful tool for finding untested parts of a codebase. Test coverage is of little use as a numeric statement of how good your tests are.** ... I've heard of places that may say things like 'you can't go into production with less than 87% coverage'. I've heard some people say that you should use things like TDD and must get 100% coverage. A wise man once said: 'I expect a high level of coverage. Sometimes managers require one. There's a subtle difference.' — Brian Marick"

**On the number itself:**

> "If you are testing thoughtfully and well, I would expect a coverage percentage in the upper 80s or 90s. **I would be suspicious of anything like 100% - it would smell of someone writing tests to make the coverage numbers happy, but not thinking about what they are doing.**"

**On what "enough testing" actually means (his substitute for a coverage target):**

> "I would say you are doing enough testing if the following is true: You rarely get bugs that escape into production, and You are rarely hesitant to change some code for fear it will cause production bugs."

**On the low end still mattering:**

> "Certainly low coverage numbers, say below half, are a sign of trouble. But high numbers don't necessarily mean much, and lead to ignorance-promoting dashboards."

**On over-testing / slow tests:**

> "One sign you are testing too much is if your tests are slowing you down ... Some people think that you have too many tests if they take too long to run. I'm less convinced by this argument. You can always move slow tests to a later stage in your deployment pipeline, or even pull them out of the pipeline and run them periodically."

**The value of coverage tooling, precisely bounded:**

> "So what is the value of coverage analysis again? Well it helps you find which bits of your code aren't being tested. It's worth running coverage tools every so often and looking at these bits of untested code."

And a second Marick quote he closes on:

> "If a part of your test suite is weak in a way that coverage can detect, it's likely also weak in a way coverage can't detect. — Brian Marick"

**Source:** Martin Fowler, "TestCoverage," martinfowler.com/bliki/TestCoverage.html, 17 April 2012. Current as of 2026-07-26 (bliki entries are not typically revised after publication; no revision note on the page).

### 1.3 Goodhart's Law applied to coverage

Not independently sourced this session (no primary Goodhart's Law text fetched — it's a well-known 1975 economics observation, "when a measure becomes a target, it ceases to be a good measure," commonly attributed to Charles Goodhart / popularized by Marilyn Strathern's paraphrase). Marick's and Fowler's arguments above are, in substance, a pre-Goodhart's-Law-naming application of exactly this mechanism to coverage: the moment coverage-as-number becomes a gate, people write tests that maximize the number rather than fault-finding power (Marick's clustering anecdote; Inozemtseva's empirical confirmation below that gaming coverage numerically does not track effectiveness). **[UNVERIFIED as attribution]** — I have not independently verified the exact wording or originator of "Goodhart's Law" this session; treat the *name* as common knowledge, not as a claim requiring a fresh citation, but do not put words in Goodhart's mouth without a primary check.

### 1.4 Inozemtseva & Holmes, "Coverage Is Not Strongly Correlated with Test Suite Effectiveness" (ICSE 2014)

Read in full verbatim (11-page PDF, cs.ubc.ca/~rtholmes/papers/icse_2014_inozemtseva.pdf). ACM Distinguished Paper Award, ICSE '14, May 31–June 7 2014, Hyderabad, India.

**Abstract, verbatim:**

> "The coverage of a test suite is often used as a proxy for its ability to detect faults. However, previous studies that investigated the correlation between code coverage and test suite effectiveness have failed to reach a consensus about the nature and strength of the relationship between these test suite characteristics. ... We have extended these studies by evaluating the relationship between test suite size, coverage, and effectiveness for large Java programs. Our study is the largest to date in the literature: we generated 31,000 test suites for five systems consisting of up to 724,000 lines of source code. We measured the statement coverage, decision coverage, and modified condition coverage of these suites and used mutation testing to evaluate their fault detection effectiveness. **We found that there is a low to moderate correlation between coverage and effectiveness when the number of test cases in the suite is controlled for. In addition, we found that stronger forms of coverage do not provide greater insight into the effectiveness of the suite. Our results suggest that coverage, while useful for identifying under-tested parts of a program, should not be used as a quality target because it is not a good indicator of test suite effectiveness.**"

**Methodology, exact numbers:** 5 subject programs (Apache POI, Closure Compiler, HSQLDB, JFreeChart, Joda Time), up to 724,089 SLOC (Closure); 31,000 randomly-sampled test suites total, sizes 3/10/30/100/300/1000/3000 test methods; coverage measured with CodeCover (statement, decision, modified condition coverage / MCC); effectiveness measured with the mutation tool PIT (mutant kill rate, both "raw"/breadth and "normalized"/depth effectiveness measures).

**The precise correlation numbers** (Kendall τ, Guilford scale: <0.4 "low", 0.4–0.7 "moderate", 0.7–0.9 "high", >0.9 "very high"):

- Table 3 (normalized effectiveness vs. coverage type, size ignored): Apache POI 0.75–0.77, Closure 0.83–0.84, **HSQLDB −0.35 (negative)**, JFreeChart 0.50–0.53, Joda Time 0.80.
- When suite size is *controlled for* (the paper's central manipulation): "Controlling for suite size always lowered the correlation between coverage and effectiveness ... Joda Time was at one extreme: the correlation between coverage and effectiveness ranged from 0.80 to 0.85 when suite size was ignored, but **dropped to essentially zero when suite size was controlled for.**"
- Different coverage *types* barely differ from each other: "Statement/Decision" τ = 0.92, "Decision/MCC" τ = 0.91, "Statement/MCC" τ = 0.92 — i.e., the three coverage types are highly correlated with *each other*, meaning a stronger coverage type (like MC/DC) gives little extra signal beyond simple statement coverage.

**On MC/DC and DO-178B specifically** (this is the paper's own citation, and it's the strongest primary-source link I have this session between MC/DC and aviation regulation):

> "Modified condition coverage (MCC) is the most difficult of these three to satisfy. For a test suite to be modified condition adequate ... the suite must include 2ⁿ test cases for every decision with n conditions in it. This form of coverage is not commonly used in practice; however, it is very similar to modified condition/decision coverage (MC/DC), which is widely used in the avionics industry. Specifically, **Federal Aviation Administration standard DO-178B states that the most critical software in the aircraft must be tested with a suite that is modified condition/decision coverage adequate.**"

Note: this is DO-178B (the predecessor standard), not DO-178C, as cited by this paper. The general MC/DC-mandate claim is well-established and DO-178C carried the same MC/DC requirement forward for the top criticality level, but I have not independently verified the DO-178C-specific wording against the primary standard text this session (see Section 0).

**Their conclusion, addressed explicitly to standards bodies:**

> "Finally, our results are pertinent to standards bodies that set requirements for software testing. The FAA standard DO-178B, mentioned earlier in this paper, requires the use of MC/DC adequate suites to ensure the quality of the resulting software; **however, our results suggest that this requirement may increase expenses without necessarily increasing quality.**"

**Their proposed substitute metric:**

> "Of course, developers still want to measure the quality of their test suites, meaning they need a metric that does correlate with fault detection ability. While this is still an open problem, we currently feel that **mutation score may be a good substitute for coverage** in this context."

**Threats to validity they name themselves** (important for not overclaiming this result): the effectiveness metric is mutation-kill-based, not real-fault-based (addressed via a companion study, Just et al. 2014, cited as future work); some prior studies found coverage/effectiveness relationships only appear at very high coverage levels their suites rarely reached; results may not generalize to closed-source systems or to systems with less than ~1,000 test cases (58% of the 1,254 open-source Java projects surveyed by a companion study, Gopinath et al. 2014, had *no* test suite at all, let alone a comprehensive one).

**Source:** Laura Inozemtseva and Reid Holmes, "Coverage Is Not Strongly Correlated with Test Suite Effectiveness," ICSE '14 (36th International Conference on Software Engineering), May 2014. `https://www.cs.ubc.ca/~rtholmes/papers/icse_2014_inozemtseva.pdf`

### 1.5 Coverage types — verified definitions from primary sources above

- **Statement coverage**: "the fraction of the executable statements in the program that are run by the test suite" (Inozemtseva & Holmes, verbatim). "It is relatively easy to satisfy, easy to understand and can be measured quickly ... However, it is one of the weaker forms of coverage, since executing a line does not necessarily reveal an error in that line" (same source).
- **Decision (branch) coverage**: "the fraction of decisions (i.e., branches) in the program that are executed by its test suite. Decision coverage is somewhat harder to satisfy and measure than statement coverage" (Inozemtseva & Holmes, verbatim).
- **Modified condition coverage (MCC) / MC/DC**: "For a test suite to be modified condition adequate ... the suite must include 2ⁿ test cases for every decision with n conditions in it" — Inozemtseva & Holmes, citing Hayhurst, Veerhusen, Chilenski & Rierson's NASA Langley tutorial on MC/DC (2001). Marick's paper (1997) independently describes essentially the same idea under the name "multiple condition coverage": "It measures whether each logical condition in the code has evaluated both true and false (in some execution of the program, not necessarily in the same one)."
- **DO-178C Level → coverage-type mapping** — **[SECONDARY SOURCE, NOT PRIMARY-VERIFIED]**: industry sources (vendor whitepapers found via search, not read from the RTCA standard itself) consistently describe: Level A (catastrophic failure condition) → 100% MC/DC; Level B (hazardous) → 100% decision coverage; Level C (major) → 100% statement coverage; Level D (minor) → requirements-based testing only, no structural coverage mandate; Level E (no safety effect) → no coverage requirement. The DO-178B (not C) MC/DC-for-most-critical-software claim is independently confirmed inside Inozemtseva & Holmes (primary-read). The full A–D table should be treated as well-established industry knowledge but is flagged here because I did not read RTCA DO-178C's own text this session.

**Applicable rule:** never set a coverage percentage as a release gate or a design target; use coverage only as a map of *where you have not looked yet*, then apply judgment (Marick's risk triage) to decide whether the gap matters. A coverage number, high or low, tells you nothing about fault-detection power on its own (Inozemtseva & Holmes, empirically, at the largest scale attempted to date as of 2014).

---

## 2. Mutation testing

### 2.1 Definitions, hypotheses — Jia & Harman survey (IEEE TSE 2011), pages 1–6 read verbatim

**Mutation score, mutant, killed/living mutant — verbatim:**

> "In mutation analysis, from a program p, a set of faulty programs p′ called mutants, is generated ... A transformation rule that generates a mutant from the original program is known as a mutation operator ... [After test execution] If the result of running p′ is different from the result of running p for any test case in T, then the mutant p′ is said to be 'killed', otherwise it is said to have 'survived'. ... Mutation Testing concludes with an adequacy score, known as the Mutation Score, which indicates the quality of the input test set. The mutation score (MS) is the ratio of the number of killed mutants over the total number of non-equivalent mutants."

**Equivalent mutant problem, verbatim:**

> "there may still be a few 'surviving' mutants ... there are some mutants that can never be killed, because they always produce the same output as the original program. These mutants are called Equivalent Mutants. They are syntactically different but functionally equivalent to the original program. **Automatically detecting all equivalent mutants is impossible ..., because program equivalence is undecidable.**"

**Human oracle problem, verbatim:**

> "The human oracle problem refers to the process of checking the original program's output with each test case ... mutating testing is effective precisely because it is demanding and this can lead to an increase in the number of test cases, thereby increasing oracle cost. This oracle cost is often the most expensive part of the overall test activity."

**Competent Programmer Hypothesis (CPH) — verbatim:**

> "The CPH was first introduced by DeMillo et al. in 1978 [66]. It states that **programmers are competent, which implies that they tend to develop programs close to the correct version.** As a result, although there may be faults in the program delivered by a competent programmer, we assume that these faults are merely a few simple faults which can be corrected by a few small syntactical changes. Therefore, in Mutation Testing, only faults constructed from several simple syntactical changes are applied, which represent the faults made by 'competent programmers'."

**Coupling Effect / Coupling Effect Hypothesis — verbatim (with the precise distinction the paper draws between the original 1978 statement and Offutt's later, precise reformulation):**

> "The Coupling Effect was also proposed by DeMillo et al. in 1978 [66]. Unlike the CPH concerning a programmer's behaviour, the Coupling Effect concerns the type of faults used in mutation analysis. It states that 'Test data that distinguishes all programs differing from a correct one by only simple errors is so sensitive that it also implicitly distinguishes more complex errors'. Offutt [174], [175] extended this into the Coupling Effect Hypothesis and the Mutation Coupling Effect Hypothesis with a precise definition of simple and complex faults. In his definition, a simple fault is represented by a simple mutant which is created by making a single syntactical change, while a complex fault is represented by a complex mutant which is created by making more than one change. **According to Offutt, the Coupling Effect Hypothesis is that 'complex faults are coupled to simple faults in a program in such a way that a test data set that detects all simple faults in a program will detect a high percentage of the complex faults'** [175]. The Mutation Coupling Effect Hypothesis now becomes 'Complex mutants are coupled to simple mutants in such a way that a test data set that detects all simple mutants in a program will also detect a large percentage of the complex mutants'."

**Empirical validation the survey cites, verbatim, with numbers:**

> "Lipton and Sayward [145] conducted an empirical study using a small program, FIND. In their experiment, all possible 2nd-order mutants with two more programs, MID and TRITYP, is investigated. The results suggested that **test data developed to kill 1st-order mutants killed over 99% 2nd-order and 3rd-order mutants.** This study implied that the mutation coupling effect hypothesis does, indeed manifest itself in practice."

**Applicable rule:** mutation score is only meaningful relative to non-equivalent mutants, and the equivalent-mutant problem is *provably unsolvable in general* (undecidable) — any tool claiming to fully auto-detect equivalent mutants is overclaiming. The coupling hypothesis is the theoretical justification for why testing against small, simple synthetic faults (mutants) is a reasonable proxy for catching complex real bugs — but it is a hypothesis validated empirically on small programs (FIND, MID, TRITYP), not a law.

### 2.2 Petrović & Ivanković, "State of Mutation Testing at Google" (ICSE-SEIP 2018) — full paper read verbatim

**Scale, verbatim from the abstract:**

> "The described system is used by 6,000 engineers in Google on all code changes they author or review, affecting in total more than 13,000 code authors as part of the mandatory code review process. The system processes about 30% of all diffs across Google that have statement coverage calculated. About 15% of coverage statement calculations fail across Google."

**Why they don't compute a global mutation score — verbatim:**

> "The Google repository contains about two billion lines of code. On average, 40'000 changes are commited to the codebase every workday ... At present it is infeasably expensive to compute the absolute mutation score for the codebase at any given fixed point. It would be even more expensive to keep re-computing the mutation score in any fixed time period (e.g., daily or weekly) and it is almost imposible to compute the full score after each commit. **In addition to the computation costs of the mutation score, we were also unable to find a good way to surface it to the engineers in an actionable way.**"

This is the single most important practical claim in this section: **Google explicitly rejected mutation *score* as their operating metric.** Instead they surface individual "living mutant" findings per code-review diff, and measure *developer-perceived usefulness per finding*, not an aggregate percentage.

**"Arid" mutant filtering — the "productive mutant" mechanism** (the paper never uses the literal phrase "productive mutant" — the operative concept is "arid node," the opposite: a node judged NOT worth mutating because mutants there are predictably useless):

> "Some parts of code are less interesting than others. Surfacing living mutants in uninteresting statements like logging has a negative impact on human time spent analyzing the finding, and its cognitive overhead. ... We argue that this is a good tradeoff because the number of possible mutants is always orders of magnitude larger than what we could reasonably present to the developers within the existing developer tools, and it's more effective to prevent high impact faults, rather than arid faults."

Arid-node categories they name explicitly: logging statements, import statements, return statements (the statement itself, not its contained expression), time/deadline-setting calls (`sleep`, `set_deadline`), memory-reservation calls (`std::vector::reserve`), memoization/cache-lookup blocks, equivalent-mutant-prone operator swaps (e.g. `for (i = 0; i < 10; ...)` → `i != 10`), language-idiomatic boilerplate (`if __name__ == "__main__"` in Python, Guice-annotated code and `equals`/`hashCode`/`toString` in Java, `goog.require`/`goog.provide` in Closure-JS, unused-variable/import patterns in Go).

**Their actionability numbers, verbatim:**

> "We empirically validated the proposed approach on the Google codebase by evaluating more than 70'000 diffs, testing 1.1 million mutants and surfacing 150'000 actionable findings during code review. **Using this developer feeback loop, the reported usefulness of the surfaced results improved from 20% to 80%.**"

> "75% of all findings with feedback were found useful by developers." (final measured state, per-finding "Please fix" vs "Not useful" clicks)

> "Over 87% of all test runs over mutants fail, killing the mutant. This is not the mutation score ... because of the probabilistic nature of mutagenesis where only a subset of mutants is generated and evaluated."

**Per-diff volume (their operative unit, not a global score):**

> "the number of living mutants per diff is significant (median is 2 mutants, 99th percentile is 43 mutants)."

**Mutation-operator survivability breakdown** (SBR = Statement Block Removal, UOI = Unary Operator Insertion, ROR = Relational Operator Replacement, LCR = Logical Connector Replacement, AOR = Arithmetic Operator Replacement): SBR = 72.18% of all generated mutants, survival rate 12.9%; UOI 17.19% of mutants; LCR is "the most robust" survivor at 15% overall but also the operator developers found *most useful* when it did survive (87.3% "please fix" rate) — AOR was least useful (61.7%).

**Their own conclusion, verbatim:**

> "Developer attention is a valuable resource and should be used with care. In large systems, we have found there to be too many living mutants to efficiently find and surface the surviving ones in a useful and actionable manner. ... We found 75% of the surfaced findings with feedback to be reported useful, and we have observed many cases in which mutants caught actual bugs in the code, and even more where test suites were improved to kill the reported mutants."

**Rule an agent can apply:** at scale, mutation testing must be diff-scoped and filtered (arid-node suppression), surfaced as individual code-review findings with a binary "useful/not useful" feedback loop, and evaluated on *developer-perceived usefulness of specific findings* — never on a single aggregate mutation-score percentage. A global mutation-score target is the mutation-testing equivalent of Marick's coverage-percentage-as-gate mistake, and Google explicitly rejected it as infeasible and non-actionable.

### 2.3 Practical tools and actionable scores

Not independently re-verified via primary source this session beyond what's already cited above — PIT/pitest is the tool Inozemtseva & Holmes and Petrović & Ivanković both cite/use for mutation analysis in Java contexts (Inozemtseva's own subject-program mutation generation used PIT explicitly). Stryker (JS/TS/C#/Scala) is a widely-known parallel tool but I did not fetch stryker-mutator.io this session — **do not cite a specific Stryker "actionable score" number without a fresh check.** The one number I *can* source primary-verbatim for "what's actionable" is Google's: they don't use a score threshold at all; they use per-finding feedback (75-80% "useful" rate) as the actionability signal.

---

## 3. Flaky tests: empirical + practice

### 3.1 Google — "Flaky Tests at Google and How We Mitigate Them" (John Micco, Google Testing Blog, May 2016)

Read via a mirror (googblogs.com/testing.googleblog.com's own page extraction returned only reader comments, not the article body — flagged in Section 0). The quotes below are reproduced from that mirror; treat with slightly less certainty than a direct-primary quote, though the numbers match what is widely and consistently cited elsewhere as this post's content.

> "across our entire corpus of tests, we see a continual rate of about **1.5% of all test runs reporting a "flaky" result**"

> "Almost **16% of our tests have some level of flakiness associated with them!** This is a staggering number; it means that more than 1 in 7 of the tests"

**Mitigation mechanisms described, verbatim:**

> a way to denote a test as flaky - causing it to report a failure only if it fails **3 times in a row**.

> [an automated tool] "automatically quarantines the test. Quarantining removes the test from the critical path and files a bug for developers to reduce the flakiness."

**Publication details:** Google Testing Blog, May 2016, author John Micco; the post was later also published in IEEE Software (2017) per secondary confirmation, not independently verified this session.

### 3.2 Google — "Where do our flaky tests come from?" (Jeff Listfield, Google Testing Blog, 17 April 2017)

WebFetch extraction of the canonical URL returned mostly reader comments; the one substantive quoted content I obtained (from a comment/author-reply, not the main article body — flagged, lower confidence) is:

> "There are a few patterns - some tests rely on random numbers, some occasionally hit time outs in test and infra code, etc."

> "One team within Google gathered some data regarding this. They found that when a stable test became flaky, and we could track it to a specific code change, **the problem was a bug in production code 1/6th of the time.**"

This second quote is important and should be treated carefully: it directly supports "flaky tests are sometimes real bugs, not noise" — but I have NOT read the full article, so I cannot report its main statistical content (which was presented in charts I could not extract). Do not extrapolate beyond this single sentence.

**Source dates:** 17 April 2017, testing.googleblog.com. Both Google posts are now 9–10 years old as of 2026-07-26 — treat the specific percentages (1.5%, 16%) as **historical/dated data points about Google's internal test corpus circa 2016**, not necessarily current or generalizable to other organizations' test suites today.

### 3.3 Luo, Hariri, Eloussi, Marinov, "An Empirical Analysis of Flaky Tests" (FSE 2014)

I read the authors' own FSE-2014 conference presentation slide deck in full (mir.cs.illinois.edu/farah/presentations/fse14_presentation.pdf), not the paper text itself. The slides are a primary source (authored by the paper's own authors) but a *lossier* one than the paper — treat percentages here as author-stated but not accompanied by the paper's full methodological caveats.

**Definition, verbatim from the slides:**

> "Test outcome non-determinism: Same code revision / Same input and configuration / Passes/fails non-deterministically. Such tests are a.k.a. flaky tests."

**Methodology, exact numbers:** searched commit logs of **all 151 Apache projects** for "flak" and "intermit" keywords → 1,129 commit messages → manually labeled **486 fixed flaky tests** as likely distinct → sampled and inspected **161 commits** in detail for the root-cause/manifestation/fix analysis below.

**Root-cause taxonomy with the relative-frequency chart they show** (bar heights, not exact labeled percentages, but the "78%" figure is their own on-slide annotation covering the top three combined):

> "Root Causes Distribution [bar chart: Async Wait (highest, ~74 of the sampled commits), Concurrency (~32), Test Order Dependency (~19), then Resource Leak, Network, Time, I/O, Randomness, Floating Point Operations, Unordered Collections, in descending and much smaller amounts] **78%**" [the "78%" appears to annotate that Async Wait + Concurrency + Test Order Dependency together account for roughly 78% of their sampled root causes]

Category definitions, verbatim from the slides:

> **Async Wait**: "Test makes async calls but doesn't wait for the result properly" (example: HBASE-2684, a test using a bare `Thread.sleep(2000)` before asserting on state that a background async operation was supposed to have updated).

> **Concurrency**: "Flakiness caused by buggy thread interleavings (excluding Async Wait) — Data races / Atomicity violations / Deadlocks. Non-determinism could either come from test code or code under test."

> **Test Order Dependency**: "Dependency between tests and the result depends on running order" (example: HBASE-7113, two `@Test` methods that share implicit state through calls to the same REST endpoint).

**Other root causes named** (unquantified individually beyond the bar chart): Resource Leak, Network, Time, I/O, Randomness, Floating Point Operations, Unordered Collections.

**Introduction findings, verbatim:**

> "Most (**126 out of 161**) flaky tests are flaky the first time they are written. Flakiness is later introduced when: A new test introduces dependency on old tests / Patching a bug/refactoring/adding new functionality."

**Manifestation findings for Async Wait, verbatim with chart percentages:**

> "One Ordering VS Multiple Orderings" pie chart: **93% One Ordering, 7% Multiple Orderings** (i.e., 93% of Async Wait flaky tests only fail under one specific bad ordering, not many possible orderings)
> "External Resources VS Internal Resources" pie chart: **91% Internal Resources, 9% External Resources**
> "W/ Time Parameter VS W/O Time Parameter": **66% w/o time parameter, 34% w/ time parameter** (i.e., most rely on a `sleep`/`waitFor` call *without* an explicit numeric time argument, meaning the flakiness manifests as an implicit/hidden race)
> Combined: "One Ordering and Internal Resources VS Others": **85% vs. 15%**

**Test Order Dependency source-of-dependency breakdown, verbatim chart percentages:** Static Field in Test 14%, Static Field in CUT (code under test) 41%, External Dependency 45%.

**Fixing code under test (Q4), verbatim:**

> "**24% (38 out of 161)** flaky tests are fixed by changing both test and CUT. Changes to CUT: [pie: Deterministic Bug 8%, Non Deterministic Bug 86%, Non Deterministic No Bug 6%]"

Their explicit takeaway, stated as a slide title:

> "Implication 4: **Flaky Tests Are Still Valuable For Catching Bugs and Should Not be Ignored or Removed**"

**Fix-strategy breakdowns, verbatim:**

> Fix Async Wait Flaky Tests: "Sleep and timed waitFor only decrease flakiness probability" [pie: Add/modify waitFor 58%, Add/modify sleep 26%, Reorder execution 3%, Other 13%]

> Test Order Dependency Fixes: [pie: Setup/clean up state 74%, Remove dependency 16%, Merge tests 10%]

**Their own top-line quote about industrial prevalence (cited from a ThoughtWorks developer, on their own title slide):**

> "'If you do not have a flaky functional tests build, you are not doing anything real' -- A ThoughtWorks Developer. **TAP system at Google has 1.6M test failures in last 15 months, 73K (4.56%) are flaky failures.**" [this 4.56%/TAP figure is the authors citing an external Google statistic in their own talk, not their own finding]

**Source:** Qingzhou Luo, Farah Hariri, Lamyaa Eloussi, Darko Marinov, "An Empirical Analysis of Flaky Tests," FSE 2014 (22nd ACM SIGSOFT International Symposium on Foundations of Software Engineering), Hong Kong, 16–21 Nov 2014. Public dataset referenced: `mir.cs.illinois.edu/farah/studied_flaky_commits.csv`.

### 3.4 Industrial deflaking practice — quarantine, retry, budgets

From Fowler's non-determinism article (full text read, see Section 4.2 for the complete non-determinism taxonomy) — his quarantine policy, verbatim:

> "Place any non-deterministic test in a quarantined area. **(But fix quarantined tests quickly.)**" ... "A danger here is that tests keep getting thrown into quarantine and forgotten ... it's worthwhile to have a mechanism that ensures that tests don't stay in quarantine too long. I've come across various ways to do this. One is a simple numeric limit: e.g. only allow 8 tests in quarantine ... Another route is to put a time limit on how long a test may be in quarantine, such as **no longer than a week.**"

Google's retry policy, from Section 3.1 above: mark as flaky, require **3 consecutive failures** before reporting a real failure — this is explicitly a rerun/retry-based masking policy, distinct from and complementary to quarantine (removal from the critical path + filed bug).

**Rule an agent can apply:** a retried test is a quarantined test with extra steps — retry-until-pass CI policies mask flakiness statistically (Google's "3 in a row" threshold) but do not fix it; Fowler's quarantine is explicit removal + a hard numeric or time-boxed forcing-function to prevent quarantine from becoming a graveyard; Luo et al.'s finding that 1-in-6 flaky-to-fixed transitions revealed a real production bug means an automated "just retry it" policy without quarantine + triage risks silently swallowing real defects.

---

## 4. Suite economics, runtime budgets, deletion

### 4.1 Martin Fowler, "Eradicating Non-Determinism in Tests" (14 April 2011) — full article read verbatim

**The taxonomy of causes, verbatim from his table of contents and section structure** (this is the definitive, citable taxonomy for this topic):

1. **Lack of Isolation** — "Keep your tests isolated from each other, so that execution of one test will not affect any others." Two remediation strategies given: rebuild starting state from scratch each time (his preference: "it's often easier — and in particular easier to find the source of a problem") vs. explicit clean-up (transaction rollback for DB tests is his named trick). Named non-DB isolation trap: "static data and singletons... A good example for this kind of problem is contextual environment, such as the currently logged in user."
2. **Asynchronous Behavior** — "Never use bare sleeps to wait for asynchonous responses: use a callback or polling." He gives explicit pseudo-code for the polling pattern with a `pollingInterval` and `waitLimit`, and separately recommends Meszaros's "Humble Object" pattern to sidestep async testing entirely by isolating the logic under test from the async boundary.
3. **Remote Services** — "it's vital to ensure determinism, so it's time to reach for a Test Double... In this manner we can ensure determinism." He pairs this with "Contract Tests" (a term he's credited elsewhere with coining) to verify the double still matches the real remote system's behavior, run periodically rather than in the main deployment pipeline.
4. **Time** — "Always wrap the system clock, so it can be easily substituted for testing." Concrete failure mode named: "I once saw a system that generated random keys based on clock values. This systems started failing when it was moved to a faster machine that could allocate multiple ids within a single clock tick."
5. **Resource Leaks** — recommends a Resource Pool "configure[d] ... to a size of 1 and make it throw an exception should it get a request for a resource when it has none left to give. That way the first test to request a resource after the leak will fail — which makes it a lot easier to find the problem test." This is a deliberate constraint-tightening technique to force latent bugs to surface reliably in test rather than intermittently in production.

**Why non-determinism is uniquely destructive, verbatim:**

> "Non-deterministic tests have two problems, firstly they are useless, secondly they are a virulent infection that can completely ruin your entire test suite. ... The trouble with non-deterministic tests is that when they go red, you have no idea whether its due to a bug, or just part of the non-deterministic behavior. Usually with these tests a non-deterministic failure is relatively common, so you end up shrugging your shoulders when these tests go red. **Once you start ignoring a regression test failure, then that test is useless and you might as well throw it away.**"

> "Indeed you really ought to throw a non-deterministic test away, since if you don't it has an infectious quality. If you have a suite of 100 tests with 10 non-deterministic tests in them, than that suite will often fail. Initially people will look at the failure report and notice that the failures are in non-deterministic tests, but soon they'll lose the discipline to do that. **Once that discipline is lost, then a failure in the healthy deterministic tests will get ignored too.**"

**When randomness/non-determinism is deliberately useful (his own caveat):**

> "There is a useful role for non-deterministic tests. Tests seeded from a randomizer can help hunt out edge cases. Performance tests will always come back with different values. But these kinds of tests are quite different from automated regression tests, which are my focus here."

**Source:** Martin Fowler, "Eradicating Non-Determinism in Tests," martinfowler.com/articles/nonDeterminism.html, first published 14 April 2011.

### 4.2 Runtime budgets — 10-minute build

**[UNVERIFIED verbatim — paraphrase only]**: The commonly-cited "ten-minute build/commit stage" guidance is associated with Kent Beck's *Extreme Programming Explained* and Martin Fowler's "Continuous Integration" bliki entry, and formalized as the "commit stage should run in under 10 minutes" guidance in Humble & Farley's *Continuous Delivery* (2010). I did NOT fetch or read primary text from either source this session (see Section 0), so I cannot give an exact quotation or confirm the number hasn't been revised in later editions. Treat "keep the commit-stage build under ~10 minutes so developers keep the CI feedback loop in their working memory" as a widely-repeated, credible-but-unverified-this-session industry rule of thumb. Fowler's TestCoverage page (which I *did* read in full, Section 1.2) independently corroborates the underlying trade-off without citing a specific number: "You can always move slow tests to a later stage in your deployment pipeline, or even pull them out of the pipeline and run them periodically. Doing these things will slow down the feedback from those tests, but that's part of the trade-off of build times versus test confidence."

### 4.3 Test selection / prioritization / impact analysis

**Machalica, Samylkin, Porth, Chandra, "Predictive Test Selection" (Facebook, ICSE-SEIP 2019)** — abstract read via WebFetch on arxiv.org/abs/1810.05286:

> "The strategy reduces the total infrastructure cost of testing code changes by a factor of two, while guaranteeing that **over 95% of individual test failures and over 99.9% of faulty changes are still reported back to developers.**"

This is a machine-learned test-selection system: rather than running every potentially-impacted test on every change (infeasible at Facebook's commit rate), it learns from historical test-outcome data which subset of tests is worth running per change, trading a small, quantified, bounded risk of missed failures for a 2x infrastructure cost reduction. **[Not independently verified beyond the abstract — did not read the full paper this session.]**

I was unable to fetch or read Google's TAP-based test-selection/prioritization work this session (found a URL, did not fetch it — see Section 0); do not cite Google TAP numbers.

### 4.4 When to delete tests

From Fowler's non-determinism article (already quoted above): a test you've started ignoring on failure "is useless and you might as well throw it away" — his explicit, blunt deletion criterion is *demonstrated developer behavior* (you're already ignoring its red status), not a coverage or age threshold.

From Marick (Section 1.1): the corollary rule for *never writing* a certain class of low-value test in the first place is his risk-tiering — Low-risk code gets no intentional test investment at all ("I don't intentionally test the low risk code... I will not make more than a trivial, offhand effort").

I did not find or read Kent Beck's specific "desiderata tension" text this session — **[not sourced, do not cite verbatim]**. General framing only: Beck's test desiderata (fast, isolated, repeatable, self-checking, timely, etc., per various XP-lineage sources) are in tension with each other, and a test that fails one badly enough (e.g., non-deterministic = not repeatable) is a deletion or quarantine candidate regardless of its coverage contribution.

**Rule an agent can apply:** the cost of a test is not fixed at write-time — it's paid every CI run, every time someone has to diagnose a spurious failure, and every time it slows the feedback loop enough that people stop trusting red builds. A test that is *routinely ignored on failure* has already crossed the deletion threshold; keeping it "just in case" is a sunk-cost fallacy that actively degrades the rest of the suite's credibility (Fowler's "virulent infection" framing).

---

## 5. Assertion quality & test smells

### 5.1 van Deursen, Moonen, van den Bergh, Kok, "Refactoring Test Code" (XP2001 / CWI SEN-R0119, 31 July 2001) — full paper read verbatim

This is THE canonical test-smell catalogue; I read the complete original text (not a later secondary re-listing), so the 11 smells below are transcribed with their **original numbering and definitions exactly as published**, including the refactorings the authors paired with each.

> **Smell 1: Mystery Guest.** "When a test uses external resources, such as a file containing test data, the test is no longer self contained. Consequently, there is not enough information to understand the tested functionality, making it hard to use that test as documentation. Moreover, using external resources introduces hidden dependencies: if some force changes or deletes such a resource, tests start failing." → *Inline Resource* or *Setup External Resource*.

> **Smell 2: Resource Optimism.** "Test code that makes optimistic assumptions about the existence (or absence) and state of external resources (such as particular directories or database tables) can cause non-deterministic behavior in test outcomes." → *Setup External Resource*.

> **Smell 3: Test Run War.** "Such wars arise when the tests run fine as long as you are the only one testing but fail when more programmers run them. This is most likely caused by resource interference." → *Make Resource Unique*.

> **Smell 4: General Fixture.** "Things start to smell when the setUp fixture is too general and different tests only access part of the fixture. Such setUps are harder to read and understand. Moreover, they may make tests run more slowly ... The danger of having tests that take too much time to complete is that testing starts interfering with the rest of the programming process and programmers eventually may not run the tests at all." → *Extract Method* (Fowler) + *Inline Method*, or split into separate test classes via *Extract Class*.

> **Smell 5: Eager Test.** "When a test method checks several methods of the object to be tested, it is hard to read and understand, and therefore more difficult to use as documentation. Moreover, it makes tests more dependent on each other and harder to maintain." → *Extract Method*, noting "splitting into smaller methods can slow down the tests due to increased setup/teardown overhead."

> **Smell 6: Lazy Test.** "This occurs when several test methods check the same method using the same fixture (but for example check the values of different instance variables). Such tests often only have meaning when considering them together." → *Inline Method*.

> **Smell 7: Assertion Roulette.** "**'Guess what's wrong?' This smell comes from having a number of assertions in a test method that have no explanation. If one of the assertions fails, you do not know which one it is.**" → *Add Assertion Explanation* (i.e., use the optional message argument JUnit assertions provide).

> **Smell 8: Indirect Testing.** "A test class is supposed to test its counterpart in the production code. It starts to smell when a test class contains methods that actually perform tests on other objects ... The fact that this smell arises also indicates that there might be problems with data hiding in the production code." Authors note explicitly: "opinions differ on indirect testing. Some people do not consider it a smell but a way to guard tests against changes in the 'lower' classes. We feel that there are more losses than gains to this approach."

> **Smell 9: For Testers Only.** "When a production class contains methods that are only used by test methods, these methods either (1) are not needed and can be removed, or (2) are only needed to set up a fixture for testing ... Fear of this smell may lead to another undesirable situation: a class without corresponding test class."

> **Smell 10: Sensitive Equality.** "It is fast and easy to write equality checks using the toString method ... Such tests, however may depend on many irrelevant details such as commas, quotes, spaces, etc. Whenever the toString method for an object is changed, tests start failing." → *Introduce Equality Method* (implement a real `equals`).

> **Smell 11: Test Code Duplication.** "Test code may contain undesirable duplication. In particular the parts that set up test fixtures are susceptible to this problem ... A special case of code duplication is *test implication*: test A and B cover the same production code, and A fails if and only if B fails."

**Their six associated test-specific refactorings, named:** Inline Resource, Setup External Resource, Make Resource Unique, Reduce Data ("Minimize the data that is setup in fixtures to the bare essentials"), Add Assertion Explanation, Introduce Equality Method.

**Test-code / production-code ratio, verbatim** (their own project's observed ratio, presented as an XP norm):

> "The test code / production code ratio may vary from project to project, but is ideally considered to approach a ratio of 1:1. In our project we currently have a 2:3 ratio."

**Source:** A. van Deursen, L.M.F. Moonen, A. van den Bergh, G. Kok, "Refactoring Test Code," CWI Report SEN-R0119, published in *Proceedings of the 2nd International Conference on Extreme Programming and Flexible Processes in Software Engineering (XP2001)*, Cagliari, Italy, 20–23 May 2001.

### 5.2 Assertion-free tests and property-based testing

Not independently sourced this session beyond the "Assertion Roulette" smell above (a symptom of *too many unexplained* assertions, the opposite failure mode from *no* assertions). **[UNVERIFIED — not researched this session]**: I did not fetch primary sources on the "assertion-free test" anti-pattern specifically, nor on QuickCheck/Hypothesis lineage this session. Do not cite specifics beyond what's already common knowledge (QuickCheck originated at Chalmers, Claessen & Hughes, ICFP 2000; Hypothesis is its best-known Python descendant) without a fresh check — I have not verified these facts against primary sources this session and flag them purely as background context, not as researched findings.

**Rule an agent can apply:** Assertion Roulette is a readability/diagnosability smell (you can't tell *which* assertion failed), which is a distinct problem from an assertion-free test (which can't fail at all, i.e., a test that always reports success regardless of the code's actual behavior — the "coverage-driven testing" failure mode Marick already warned about in Section 1.1, where people write tests to satisfy a coverage tool without checking anything meaningful).

---

## 6. DORA / change failure rate

### 6.1 Current dora.dev "Four Keys" metric definitions (page fetched directly, last-updated 5 January 2026)

Verbatim definitions from the current dora.dev guide page (note: the page itself groups these as 5 metrics across two categories, not the classic "four keys" framing — see caveat below):

**Throughput metrics:**
> "Change lead time: The amount of time it takes for a change to go from committed to version control to deployed in production."
> "Deployment frequency: The number of deployments over a given period or the time between deployments."
> "Failed deployment recovery time: The time it takes to recover from a deployment that fails and requires immediate intervention."

**Instability metrics:**
> "Change fail rate: The ratio of deployments that require immediate intervention following a deployment. Likely resulting in a rollback of the changes or a 'hotfix' to quickly remediate any issues."
> "Deployment rework rate: The ratio of deployments that are unplanned but happen as a result of an incident in production."

**Important framing note for the skill:** this current page already lists **5 metrics**, not the classic "four keys" (deployment frequency, lead time for changes, change failure rate, time to restore service) that most 2018–2023-era literature cites. "Change fail rate" here has replaced the older "change failure rate" naming, and "Deployment rework rate" is an addition not present in the original DORA four-keys model. **No Elite/High/Medium/Low performance-cluster percentage thresholds are present on this specific page** — I looked and they are not there (see Section 0 for why: the page is a metrics-definition guide, not the annual report itself).

### 6.2 The 2025 "team archetypes" question — flagged UNVERIFIED

Multiple third-party sources found via WebSearch (not dora.dev itself — the dora.dev/research/2025/ overview page I fetched is a navigation shell with no report body extractable) claim the **2025 State of DevOps report retired the Elite/High/Medium/Low four-tier performance model in favor of seven "team archetypes"** (one of which, "Accelerators," is described as the rough successor to the old "Elite" tier, cited by one third-party source at "approximately 18% of teams surveyed in the 2025 report, down from 26% in 2024"). **I was not able to confirm this directly against dora.dev's own report text this session — treat this entire paragraph as plausible but unverified.** If the `quality` skill states DORA thresholds as fact, it should either (a) re-verify directly against the current dora.dev report before publishing, or (b) explicitly hedge that DORA's own framework changed materially in 2025 and any specific percentage thresholds are likely stale within months of being written down.

**Rule an agent can apply regardless of the tier question:** change failure rate (or "change fail rate" in the current DORA vocabulary) is DORA's chosen *outcome* measure of assurance quality — it measures whether verification (tests, review, staging) actually caught what needed catching, as opposed to input measures like coverage percentage or test count. An agent should track and report change fail rate trends over time for a given team rather than trying to slot the team into an externally-defined performance tier, both because (a) the tier boundaries are demonstrably not stable year-to-year (per the sources above) and (b) DORA's own framework for tiering appears to be in flux as of the 2025 report.

---

## 7. Defect taxonomies (IEEE 1044, ODC verbatim)

### 7.1 IEEE 1044 — NOT independently verified this session

**[UNVERIFIED]** — IEEE 1044 (Standard Classification for Software Anomalies) is a paywalled IEEE standard; I did not fetch or read it this session. What is safely reportable without a primary read: IEEE 1044 defines a classification scheme for software anomalies covering attributes across the anomaly lifecycle (recognition, investigation, action, disposition), and is commonly cited alongside ODC as a complementary, more general-purpose defect-classification standard. **Do not quote specific IEEE 1044 attribute names or definitions as verbatim** — I have none to give. If this section needs to be complete for the skill, it requires a follow-up fetch with IEEE standard access.

### 7.2 Orthogonal Defect Classification (ODC) — Chillarege's own tutorial deck, read in full

Source: Ram Chillarege, "ODC — Orthogonal Defect Classification," Tutorial 2000, self-published slide deck (mirrored via Semantic Scholar). Chillarege is the ODC inventor at IBM Research; this is a primary source from him directly, though it is a tutorial deck rather than the original 1992 IEEE TSE paper text (Chillarege, "Orthogonal Defect Classification — A Concept for In-Process Measurements," IEEE Transactions on Software Engineering, 18(11):943–956, Nov 1992 — I did not fetch that original paper's text itself this session, only Chillarege's later tutorial slides, which restate the same taxonomy).

**Definition of defect type, verbatim from the slide:**

> "**The defect type is the meaning of the fix** — It is not the cause of the bug — It is what was needed to fix the problem — From a programming perspective — Collectively the defect types describe the nature of work"

**Definition of defect trigger, verbatim:**

> "**Trigger is the catalyst that helps a defect surface** — Defects are latent by definition - until detected — Triggers - are not 'cause', they are facilitators — The trigger is the catalyst which surfaces the defect"

**The full defect-type list** (ODC Version 5.1, "Responder Input," Target = Design/Code), verbatim from the slide table:

> Assignment-Initialization, Checking, Algorithm/Method, Function, Timing/Serialization, Interface, Relationship

(A separate parallel list applies when Target = Information Development: Editorial, Technical, Navigational; and when Target = Build/Package: Process Conformance, Code Integration, Install Dependencies, Shipped files, Packaging Scripts, Feature Install Dependencies, Media; and when Target = National Language Support: Translation, Character Handling, User Interface, Language Expectation, Enablement.)

**Defect Qualifier, verbatim:** "Missing, Incorrect, Extraneous" — applied to any defect type to indicate whether the fix added something missing, corrected something incorrect, or removed something extraneous.

**The full trigger list, organized by development activity**, verbatim from the "Triggers - associated by typical activities" slide:

> **Review Inspection**: Backward compatibility, Lateral compatibility, Design conformance, Concurrency, Logic flow, Side Effects, Rare Situation [plus, from the fuller "ODC Version 5.1 Submitter Input" table: Understanding Flow, Internal Document, Language Dependency]

> **Function Test** (Unit Test/Function Test): Coverage, Variation, Sequencing, Interaction, Simple Path, Combination Path [the fuller table splits this into **White Box**: Simple Path, Complex Path; **Black Box**: Coverage, Variation, Sequencing, Interaction]

> **System Test**: Recovery, Start and Restart, Workload/Stress, HW Configuration, SW Configuration, Blocked Test (old Normal mode)

> **Information Development** (a fourth activity category, from the fuller table): Accuracy, Aesthetics, Clarity, Consistency, Completeness, Organization, Retrievability, Style, Task

**Other attributes in the ODC 5.1 schema**, verbatim from the "ODC Defect Attributes" summary slide, split by who supplies them:

> **Submitter-side**: Activity (Review/Inspection, Unit Test/Func Test, System Test, Information, Product Use), Trigger (activity-specific, per lists above), plus Defect ID, Phase Found, Date Open, and **Impact** (Installability, Integrity/Security, Performance, Maintenance, Standards, Documentation, Usability, Reliability, Capability).

> **Responder-side**: Target (Requirements, Design, Code, Information, UI, Build, NLS), Type (target-specific — the Defect Type lists above), Source (Developed in House, Reused from Library, Ported, Outsourced), Qualifier (Missing, Incorrect, Extraneous), plus Date Closed, Component, Severity.

**ODC's own claimed value proposition, verbatim from the summary slide:**

> "ODC was invented circa 1990 and evolved over 10 years — Reaches around 3000 IBM engineers worldwide ('99) — Motorola, Telcordia, Nortel, Lucent, .. are also users. Low implementation cost, very significant returns — **Reduces root cause analysis cost by a factor of 10x** — Cost savings of $100 M / year in one legacy product."

This "$100M/year" and "10x root cause analysis" figures are Chillarege's own self-reported claims from his tutorial, not an independently audited third-party study — treat as a vendor/inventor claim, not neutral empirical evidence, though it's a widely repeated figure in the ODC literature.

**Rule an agent can apply:** ODC's central design principle is that defect *type* (what was fixed) and *trigger* (what circumstance surfaced it) are orthogonal, independent classification axes that together let you read a "process signature" off the defect stream without any extra data collection burden beyond what triage already requires — e.g., a cluster of "Function"-type defects surfacing via "Design Conformance" triggers late in the cycle signals a requirements/design gap, not a coding-carelessness problem, which should redirect the *process* fix, not just the code fix.

---

## 8. Bug report quality

### 8.1 Bettenburg, Just, Schröter, Weiss, Premraj, Zimmermann, "What Makes a Good Bug Report?" (FSE 2008) — full paper read verbatim

**Study scale, verbatim:** surveyed developers and reporters of Apache, Eclipse, Mozilla; "The analysis of the **466 responses** revealed an information mismatch between what developers need and what users supply." Precisely: 872 developers contacted → 156 responses (19.3% response rate) → 130 consistent after removing 26 inconsistent; 1,354 reporters contacted → 310 responses (25.9%) → 215 consistent after removing 95 inconsistent.

**The ranked "importance" list for developers** (Table 2, percentages = "importance" = conditional likelihood an item selected as "used" (D1) was also selected as "most helpful" (D2)):

> steps to reproduce (83%), stack traces (57%), test cases (51%), screenshots (26%), expected behavior (22%), code examples (14%), summary (13%), version (12%), error reports (12%), build information (8%), component (3%), product (5%), operating system (4%), hardware (0%), severity (0%)

Their own prose summary, verbatim:

> "For the importance of items, **steps to reproduce** stand out clearly. Next in line are **stack traces and test cases**, both of which help narrowing down the search space for defects. Observed behavior, albeit weakly, mimics steps to reproduce the bug, which is why it may be rated important. Screenshots were rated as high, but often are helpful only for a subset of bugs, e.g., GUI errors."

**The mismatch findings, verbatim, with the exact statistics:**

> "First we compared which information developers use to resolve bugs (question D1) and which information reporters provide (R1) ... the results match only for the top three items and the last one. In between there are many disagreements, the most notable ones for stack traces, test cases, code examples, product, and operating system. **Overall, the Spearman correlation between what developers use and what reporters provide was 0.321, far from being ideal.**"

> "Next we checked whether reporters provide the information that is most important for developers ... **The Spearman correlation of -0.035 between what developers consider as important and what reporters provide shows a huge gap.** In particular, it indicates that reporters do not focus on the information important for developers."

> "Interestingly, ... most reporters know which information developers need. In other words, **ignorance of reporters is not a reason for the aforementioned information mismatch.** ... This is confirmed by the Spearman correlation of **0.839**, indicating a very strong relation between what developers and reporters consider as important."

So the mismatch is not a knowledge gap — reporters *know* what's wanted (0.839 correlation between "what devs want" and "what reporters think devs want") but fail to actually *provide* it (0.321 / −0.035 correlations), because the highest-value items (stack traces, test cases) are also rated the *most difficult to provide* by reporters themselves (Table 3: test cases 75% difficulty, code examples 43%, steps to reproduce 51%, stack traces 24%).

**Most severe problems, verbatim:**

> "Among the problems experienced by developers, incomplete information was, by far, most commonly encountered. ... The most severe problems were **errors in steps to reproduce and incomplete information.**" Quoted developer: "The biggest causes of delay are not wrong information, but absent information."

**Surprising finding on duplicates, verbatim:**

> "A very interesting observation is that developers do not suffer too much from bug duplicates, although earlier research considered this to be a serious problem." Quoted developer: "Duplicates are not really problems. They often add useful information."

**Reproduction-step and duplicate-detection research they cite/relate to:** this paper's own related-work section cites Weimer's finding that "reports also accompanied by patches were three times as likely to be addressed as standard bug reports," and Hooimeijer & Weimer's separate lifetime-prediction model for bug reports — noting explicitly that quality (their developer-rated measure) and lifetime (Hooimeijer & Weimer's measure) are "independent measures" (Spearman correlation 0.002–0.068 between the two).

**Source:** N. Bettenburg, S. Just, A. Schröter, C. Weiss, R. Premraj, T. Zimmermann, "What Makes a Good Bug Report?", SIGSOFT 2008/FSE-16, Atlanta, Georgia, 9–15 Nov 2008.

**Rule an agent can apply:** the single highest-leverage thing a bug reporter (human or an AI agent filing an issue) can do is provide a minimal, concrete reproduction — steps to reproduce is both the #1 "importance" item (83%) and the #1 "most severe problem when wrong" item across two independently-asked survey questions in this dataset. If an agent generates bug reports, it should prioritize a runnable repro over prose description, and should not assume that knowing what's wanted (which even human reporters mostly do, per the 0.839 correlation) is the same as actually supplying it.

---

## 9. Verifying AI-generated code and tests

**This section is flagged as the highest-risk section in this file per the task brief. Everything below is reported with explicit confidence levels — do not silently upgrade anything here to "established fact" in downstream skill content without a fresh primary-source check.**

### 9.1 Perry, Srivastava, Kumar, Boneh, "Do Users Write More Insecure Code with AI Assistants?" (CCS 2023) — pages 1–3 read verbatim

**Abstract, verbatim:**

> "We conduct the first large-scale user study examining how users interact with an AI Code assistant to solve a variety of security related tasks across different programming languages. Overall, we find that **participants who had access to an AI assistant based on OpenAI's codex-davinci-002 model wrote significantly less secure code than those without access.** Additionally, participants with access to an AI assistant were also more likely to believe they wrote secure code than those without access to the AI assistant, suggesting that such tools may lead users to be overconfident about security flaws in their code."

**Exact methodology, verbatim:**

> "we designed and conducted a comprehensive user study where **47 participants** conducted five security-related programming tasks spanning three different programming languages (Python, JavaScript, and C)."

> "we were left with **47 participants — 33 in the experiment group and 14 in the control group.**"

**Findings on trust/overconfidence, verbatim:**

> "participants that were provided access to an AI assistant were more likely to believe that they wrote secure code than those without access to the AI assistant, highlighting the potential pitfalls of deploying such tools without appropriate guardrails."

**Their own explicit caveat about small sample size, verbatim:**

> "Due to small sample sizes, we document when results are statistically significant. For future studies that require larger samples potentially at the cost of the quality of participants ... other approaches such as only giving a participant one question selected at random and recruiting many more participants through platforms like Prolific are viable options."

**My assessment for the skill:** this is a real, peer-reviewed (ACM CCS 2023) user study, and the headline finding ("AI assistance → less secure code, but more confidence in that code's security") is directly and verbatim supported. But **N=47 (33 vs 14) is small**, the model tested (`codex-davinci-002`) is now obsolete (superseded by multiple generations of coding models since 2022), and the tasks were deliberately security-focused, short, self-contained programming exercises — not representative of general-purpose coding tasks or of frontier 2025–2026 coding models with much better safety training. **Do not present this study's numbers as current evidence about today's AI coding assistants — cite it as historical (2022 data collection, 2023 publication) evidence that the *overconfidence* dynamic is a real, measured risk pattern, not as a live statistic about current model security.**

### 9.2 GitClear reports — NOT sourced this session

**[UNVERIFIED — explicitly not cited]**. I ran out of research budget before fetching any GitClear report this session. Any GitClear statistic that appears elsewhere in this project's canon should be independently re-verified before being repeated — I am flagging this specifically because GitClear numbers (on AI-generated code churn/duplication rates) circulate widely in secondary commentary and are exactly the kind of "press-release number" the task brief warned about.

### 9.3 "LLM tests assert the bug as expected behavior" — open question, not a confirmed finding

I searched for a definitive study establishing this specific, well-known practitioner concern (that an LLM asked to generate tests for existing code may write assertions that encode the code's *current*, possibly-buggy behavior as the expected/correct behavior, because the LLM has no independent oracle beyond "what does this code currently output"). I found only secondary-source WebSearch snippets referencing a broader 2024–2025 literature on LLM-generated test/assertion quality (e.g., large-scale evaluations of LLM unit-test generation across multiple models and prompting techniques, work specifically on assertion-generation models). **I did not read any of these papers in full, and I could not find one that names and quantifies this specific "asserts the bug" phenomenon.** 

**Assessment for the skill:** treat "LLM-generated tests risk encoding existing bugs as expected behavior" as a *logically sound, widely-voiced practitioner concern* consistent with how these tools work (an LLM generating a test from code, absent an independent specification, has no way to distinguish "this is what the code does" from "this is what the code should do") — but NOT as an empirically quantified finding with a citable percentage. This is exactly the kind of claim the task brief says should be marked `[UNVERIFIED]` rather than reported with a remembered number.

**The applicable rule an agent CAN safely state without over-claiming:** a test generated purely by observing a program's current behavior (whether by a human characterization-testing pass or by an LLM) encodes what the code *does*, not necessarily what it *should* do — this is a structural property of behavior-derived tests, independent of whether an LLM or a human wrote them, and long predates LLMs (it's the classic "characterization test" caveat in legacy-code literature). The novel AI-specific risk is scale and invisibility: an LLM can generate large volumes of plausible-looking, passing tests very fast, which can create false confidence that behavior has been *specified and verified* when it has only been *recorded*.

### 9.4 AI code review tool false-positive rates

**[UNVERIFIED — not researched this session]**. No sources fetched. Do not cite any specific false-positive-rate number for AI code review tools.

### 9.5 The one methodologically-solid comparison point I do have

Google's own 2024/2025 internal study (reported inside the *related work* section of the Perry et al. paper I read directly, Section 9.1) is referenced there as: "Google reported a 6% reduction in coding iteration time in a study of 10K developers using an internal code completion model" — **this is Perry et al. citing a different, uncited-in-full source; I have not independently verified this figure against a Google primary source this session.** Reproduced here only because I read it directly inside a paper I did fetch — flag its provenance clearly if reused (it is a third-hand citation, not something I verified against Google's own publication).

---

## 10. Decision rules extracted

| Rule | Source | URL | Contested? |
|---|---|---|---|
| Never set a coverage percentage as a release gate or design target; use coverage only to find untested code | Marick 1997; Fowler 2012 | exampler.com/testing-com/writings/coverage.pdf; martinfowler.com/bliki/TestCoverage.html | No — both primary sources agree; empirically reinforced by Inozemtseva & Holmes 2014 |
| 100% coverage is a smell, not a virtue — it usually means tests were written to satisfy the tool, not to find bugs | Fowler 2012, quoting/extending Marick | martinfowler.com/bliki/TestCoverage.html | No |
| Coverage tools give "clues," not "commands" — treating a missed-coverage line as an order to write a trivial test destroys the tool's diagnostic value | Marick 1997 | exampler.com/testing-com/writings/coverage.pdf | No |
| Coverage type (statement vs. decision vs. MC/DC) barely matters — they're highly inter-correlated (τ ≈ 0.91–0.92) and stronger types don't add proportionate insight | Inozemtseva & Holmes 2014 | cs.ubc.ca/~rtholmes/papers/icse_2014_inozemtseva.pdf | No, but their own paper flags that other studies (higher coverage thresholds, different metrics) found stronger relationships — the correlation is context-dependent |
| A test suite's fault-detection power should be measured by mutation score, not coverage, if you need a single number at all | Inozemtseva & Holmes 2014 | same as above | No |
| Never compute or chase a single global mutation-score percentage at scale — surface individual mutant findings per code-review diff instead, and track "usefulness" feedback, not a score | Petrović & Ivanković 2018 (Google) | research.google.com/pubs/archive/46584.pdf | No — this is a considered, explicit design decision by the paper's authors, not a default |
| A retried test is a quarantined test with extra steps — automatic retry-on-fail masks flakiness statistically but does not fix it, and without quarantine + a forcing function (numeric or time limit) it silently erodes signal | Fowler 2011; Google 2016 blog | martinfowler.com/articles/nonDeterminism.html; testing.googleblog.com (May 2016) | No |
| A test you've started ignoring on failure is already dead — delete it or quarantine it, don't leave it in the "healthy" suite | Fowler 2011 | martinfowler.com/articles/nonDeterminism.html | No |
| Flaky tests are not pure noise — roughly 1 in 6 flaky-to-fixed transitions traced a real production bug at Google, and fixing flaky tests changed the code-under-test (not just the test) in 24% of a sampled Apache dataset | Google blog (2017, low-confidence extraction); Luo et al. FSE 2014 | testing.googleblog.com/2017/04; mir.cs.illinois.edu/farah/presentations/fse14_presentation.pdf | Partially — the Google figure is from a low-confidence partial extraction (Section 0), treat cautiously |
| Assertion Roulette (unexplained multiple assertions per test) and the other 10 van Deursen test smells are a distinct, orthogonal quality axis from coverage — a test can have perfect coverage and be an unreadable, undiagnosable smell-riddled mess | van Deursen et al. 2001 | ir.cwi.nl/pub/4324/04324D.pdf | No |
| Steps to reproduce is the single highest-leverage item in a bug report — both the #1 "importance" item and the #1 "most severe when wrong/missing" item, independently | Bettenburg et al. 2008 | thomas-zimmermann.com/publications/files/bettenburg-fse-2008.pdf | No |
| Reporters (human or AI) usually know what information is wanted (0.839 correlation) but fail to supply it (0.321/-0.035 correlation) because the highest-value items are also the hardest to produce — the fix is tooling that captures repro/stack-trace/test-case automatically, not more reporter education | Bettenburg et al. 2008 | same as above | No |
| Track change fail rate (DORA's outcome measure of assurance quality) over time for your own team rather than benchmarking against externally-defined performance tiers, which are demonstrably unstable year-to-year | dora.dev (current); third-party reports of 2025 DORA changes | dora.dev/guides/dora-metrics-four-keys/ | The tier-instability claim itself is UNVERIFIED against DORA's own text this session — flag when reused |
| ODC's defect Type + Trigger are deliberately orthogonal axes — reading their joint distribution tells you where in the process (not just where in the code) a problem originates, without extra data-collection cost beyond normal triage | Chillarege ODC tutorial | pdfs.semanticscholar.org (Chillarege ODC tutorial mirror) | No |
| A behavior-derived test (human-written characterization test OR LLM-generated test from existing code) encodes what code does, not what it should do — this is structural, not a new AI-specific flaw, but AI-generated tests can create false confidence at much greater scale and speed | Reasoned from first principles + legacy-code testing literature; NOT an empirically quantified AI-specific finding | — | **Contested / not empirically settled** — flagged explicitly as the highest-uncertainty rule in this file |
| AI-assisted coding measurably increased security-flaw rates AND increased developer confidence that their code was secure, in a 2022-vintage, N=47, codex-davinci-002-specific study — treat as historical evidence of an overconfidence *pattern*, not as a live statistic about current models | Perry et al., CCS 2023 | arxiv.org/abs/2211.03622 | Model and study are dated; do not extrapolate the specific percentage/effect size to current AI coding tools without a fresh study |

---

## 11. Numeric thresholds & statistics (number | exact source | date | verified?)

| Number | Exact source | Date of data | Verified this session? |
|---|---|---|---|
| Coverage "upper 80s or 90s" as a sign of thoughtful testing; be suspicious of 100% | Fowler, TestCoverage bliki | Published 17 Apr 2012 | Yes — full page read verbatim |
| Coverage below ~50% is "a sign of trouble" | Fowler, TestCoverage bliki | Published 17 Apr 2012 | Yes |
| 85% as a commonly-mandated coverage shipping gate, with observed clustering just above it | Marick, "How to Misuse Code Coverage" | 1997/1999 | Yes, but the clustering claim is Marick's own anecdotal observation, not a controlled study |
| Kendall τ 0.75–0.85 (coverage vs. effectiveness, size ignored); drops to "low to moderate" (paper's own characterization) or "essentially zero" for some projects (e.g., Joda Time) when suite size is controlled for | Inozemtseva & Holmes, ICSE 2014 | Published 2014, data collected on 5 Java systems | Yes — full paper read verbatim, exact per-project numbers in Section 1.4 |
| 31,000 test suites, up to 724,089 SLOC, 5 subject systems | Inozemtseva & Holmes, ICSE 2014 | 2014 | Yes |
| Statement/Decision coverage-type intercorrelation τ = 0.92; Decision/MCC τ = 0.91; Statement/MCC τ = 0.92 | Inozemtseva & Holmes, ICSE 2014 | 2014 | Yes |
| Google mutation testing: 6,000 engineers, 13,000+ code authors, ~30% of all Google diffs with statement coverage processed, ~15% of coverage calcs fail | Petrović & Ivanković, ICSE-SEIP 2018 | 2018 | Yes — full paper read verbatim |
| Google mutation testing: 70,000 diffs evaluated, 1.1M mutants, 150,000 actionable findings, usefulness improved 20%→80%, settled at 75% "useful" | Petrović & Ivanković, ICSE-SEIP 2018 | 2018 | Yes |
| Google mutation testing: median 2 living mutants/diff, 99th percentile 43 | Petrović & Ivanković, ICSE-SEIP 2018 | 2018 | Yes |
| Google mutation testing: >87% of test runs against mutants kill the mutant (not the mutation score) | Petrović & Ivanković, ICSE-SEIP 2018 | 2018 | Yes |
| Coupling hypothesis empirical support: tests killing 99%+ of 1st-order mutants also killed 99%+ of 2nd/3rd-order mutants (Lipton & Sayward study on program FIND) | Jia & Harman survey, IEEE TSE 2011, citing Lipton & Sayward | Survey published 2011; underlying study older | Yes — read directly in the survey's own text (pages 1–6) |
| Google flaky tests: ~1.5% of all test runs report "flaky," ~16% of all tests have some flakiness | Google Testing Blog (Micco), via mirror | May 2016 | Partial — read via mirror, not the canonical URL directly (Section 0); numbers are widely and consistently repeated elsewhere |
| Google flaky tests: "3 consecutive failures" threshold before reporting a real failure | Google Testing Blog (Micco), via mirror | May 2016 | Partial, same caveat |
| Flaky-to-fixed transitions: real production bug found ~1/6th of the time | Google Testing Blog (Listfield), partial extraction | Apr 2017 | Low confidence — one sentence extracted from comments, not the main article (Section 0) |
| TAP (Google) 1.6M test failures over 15 months, 73K (4.56%) flaky | Cited third-hand inside Luo et al.'s own FSE 2014 slides | Slides dated Nov 2014 | Low-medium confidence — Luo et al. citing an external Google stat in their own talk, not independently verified by me against a Google primary source |
| Luo et al.: 151 Apache projects searched, 1,129 commit messages, 486 fixed flaky tests identified, 161 sampled in depth | Luo et al., FSE 2014 slides | 2014 | Yes — read directly in the authors' own slide deck |
| Luo et al.: Async Wait / Concurrency / Test Order Dependency ≈ 78% of sampled root causes combined | Luo et al., FSE 2014 slides | 2014 | Yes, per the slide's own on-chart annotation |
| Luo et al.: 126/161 (78.3%) flaky tests were flaky from first commit | Luo et al., FSE 2014 slides | 2014 | Yes |
| Luo et al.: 24% (38/161) of flaky-test fixes also changed the code under test; of those, 86% fixed a non-deterministic bug in that code | Luo et al., FSE 2014 slides | 2014 | Yes |
| van Deursen et al.'s own project: test:production code ratio 2:3 | van Deursen et al., XP2001 | 2001 | Yes — full paper read verbatim |
| Bettenburg et al.: 466 total survey responses (156 developers + 310 reporters, before consistency filtering); 130/215 consistent after filtering | Bettenburg et al., FSE 2008 | 2008 | Yes — full paper read verbatim |
| Bettenburg et al.: Spearman correlations — 0.321 (what devs use vs. what reporters provide), −0.035 (what devs consider important vs. what reporters provide), 0.839 (what devs consider important vs. what reporters *think* is important) | Bettenburg et al., FSE 2008 | 2008 | Yes |
| Bettenburg et al.: steps-to-reproduce importance 83%; stack traces 57%; test cases 51% (developer side, Table 2) | Bettenburg et al., FSE 2008 | 2008 | Yes |
| CUEZILLA tool: up to 41–48% exact-agreement accuracy predicting bug-report quality | Bettenburg et al., FSE 2008 | 2008 | Yes |
| ODC: "reduces root cause analysis cost by a factor of 10x," "$100M/year" savings in one legacy product | Chillarege ODC tutorial (self-reported) | Tutorial dated 2000 | Yes as a quote — but it is the inventor's own unaudited claim, not third-party-verified |
| Perry et al.: N=47 (33 experiment/AI-assisted, 14 control), 5 tasks, 3 languages, model codex-davinci-002 | Perry, Srivastava, Kumar, Boneh, CCS 2023 | Data collected ~2022, published 2023 | Yes — pages 1–3 of the arXiv PDF read verbatim |
| Facebook predictive test selection: infrastructure cost reduced by factor of 2, >95% of individual test failures and >99.9% of faulty changes still reported | Machalica et al., ICSE-SEIP 2019 | 2019 | Partial — abstract only, via WebFetch, not the full paper |
| DORA 2025 report allegedly retired 4-tier model for 7 "team archetypes"; "Accelerators" ≈18% of 2025 sample (down from 26% "Elite" in 2024) | Third-party blog summaries (not dora.dev itself) | Report dated 2025 | **UNVERIFIED — explicitly flagged, do not treat as confirmed** |

---

## 12. [UNVERIFIED] items — consolidated list

For quick scanning by whoever synthesizes this canon — every item below should either be re-verified before being stated as fact in the finished skill, or explicitly kept hedged:

1. **IEEE 1044** — no primary text read at all this session. No verbatim classification attributes to offer.
2. **DO-178C's own text** for the Level A/B/C/D → coverage-type mapping table — reconstructed from secondary/vendor sources, not the RTCA standard itself. (The DO-178B–MC/DC link specifically IS confirmed via a primary source, Inozemtseva & Holmes, who cite it directly — but that's DO-178B, and their own citation is to a NASA tutorial report, not the FAA standard's text itself.)
3. **GitClear reports** — not fetched, not cited, flag if this number appears anywhere else in the combined canon.
4. **Continuous Delivery's "10-minute build/commit stage"** exact wording — paraphrase only, Humble & Farley's book text not read this session.
5. **DORA 2025 "team archetypes replacing four tiers"** claim, and the specific 18%/26% Accelerator percentages — sourced only from third-party blogs, not from dora.dev's own report text.
6. **"LLM tests assert the bug as expected behavior"** as a quantified empirical finding — not found as a named, measured phenomenon in any paper I could locate or read this session; treated in Section 9.3 as a reasoned-but-unconfirmed concern.
7. **AI code review tool false-positive rates** — no sources found at all.
8. **Google's "6% reduction in coding iteration time, 10K developers"** figure — this is Perry et al. (a paper I read directly) citing a different, unverified-by-me source; treat as third-hand.
9. **Stryker / PIT "actionable mutation score" thresholds** — no specific number sourced this session; only Google's per-finding-feedback approach (75-80% "useful") is primary-verified, and that is explicitly NOT a score threshold.
10. **Google's flaky-test blog posts** (both the May 2016 and April 2017 ones) — read via a mirror or via a partial/comments-only extraction, not the canonical page's article body directly. Numbers are widely corroborated elsewhere but flagged per the task's strict verification bar.
11. **Google TAP test-selection/prioritization paper** — found a URL, never fetched. No claims made from it.
12. **QuickCheck/Hypothesis lineage facts** in Section 5.2 — background knowledge, not verified against primary sources this session.
