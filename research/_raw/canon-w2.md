# Canon W2 — Context-Driven School & Theory of Testing

Compiled 2026-07-26. All facts date-stamped as of this date unless the source itself is historical (noted per item).

---

## 0. Sources reached / not reached (+ WebSearch calls used)

**WebSearch calls used: 14** (budget was ~15; stayed within budget by front-loading WebFetch of canonical URLs and using WebSearch only to locate exact URLs or cross-verify a mnemonic).

### Reached (WebFetch succeeded, content verified)
- developsense.com/blog/2012/07/few-hiccupps (FEW HICCUPPS, verified twice for accuracy)
- developsense.com/blog/2013/03/testing-and-checking-redefined (Bolton's commentary; the actual definitions live on Bach's satisfice.com blog)
- developsense.com/blog/2009/08/testing-vs-checking (original 2009 testing/checking distinction)
- developsense.com/blog/2025/04/checking-is-inside-testing (2025 refinement)
- developsense.com/blog/2009/09/when-do-we-stop-test (stopping heuristics)
- developsense.com/blog/2014/09/frequently-asked-questions-about-the-29119-controversy (Bolton's 29119 FAQ)
- developsense.com/presentations/2019-05-RefactoringtheAgileTestingQuadrants.pdf (Bach & Bolton's full slide deck, read as PDF — rich verbatim material)
- satisfice.com/blog/archives/856 ("Testing and Checking Refined" by Bach & Bolton — the primal source; fetched successfully this time)
- satisfice.com/download/session-based-test-management (landing page only; PDF itself not directly downloadable via WebFetch — supplemented via WebSearch-sourced secondary summaries)
- satisfice.us/articles/et-article.pdf ("Exploratory Testing Explained" v1.3, James Bach, 2003 — read in full as PDF, extensive verbatim material)
- developsense.com/resource/htsm.pdf **and** its correct current source, satisfice.com — resolved via `/Users/tamas/.claude/...tool-results/webfetch-...cynvn5.pdf`, read directly as a PDF: **Heuristic Test Strategy Model v6.0** (James Bach, 2/8/2024) — full text extracted, all mnemonics verbatim
- context-driven-testing.com (the 7 principles, verbatim)
- context-driven-testing.com/please-sign-the-petition-to-stop-iso-29119 (Stop 29119 rationale)
- rapid-software-testing.com (RST definition and premises)
- kaner.com/?p=190 ("The Oracle Problem and the Teaching of Software Testing" — Kaner's oracle definitions and Hoffman's taxonomy)
- ministryoftesting.com/articles/test-heuristics-cheat-sheet (Hendrickson/Lyndsay/Emery cheat sheet — summary-level, categories confirmed but not every line item)
- althority.com/cheat_sheet (secondary summary of the same cheat sheet)
- egr.msu.edu (secondary but faithful reproduction of Bach's "Good Enough Software" / IEEE Computer Aug 1997)
- **ISTQB Certified Tester Foundation Level Syllabus v4.0.1 (2024-09-15)**, fetched as PDF via bcs.org mirror, converted to text locally with `pdftotext` (poppler installed for this purpose) — full verbatim extraction of Section 1.3 (Seven Testing Principles), Section 2.2 (Test Levels and Types), Section 5.1.7 (Testing Quadrants — ISTQB explicitly cites Marick 2003 and Crispin 2008)

### Not reached / partially reached (named explicitly, per instructions)
- **kaner.com/pdfs/PNSQCoracleTutorial.pdf** — 404. Kaner's oracle tutorial slide deck could not be fetched directly; oracle taxonomy was instead recovered from the kaner.com/?p=190 blog post, which cites the same taxonomy.
- **satisfice.com/blog/archives/22** — reached, but was not the HICCUPPS post (a counterstrings article); the correct HICCUPPS content was recovered from developsense.com/blog/2012/07/few-hiccupps instead.
- **satisfice.com/download/session-based-test-management** (the actual PDF file) — the landing page loaded but the PDF's download link is a client-side (JS) action; the raw PDF bytes were not retrieved. SBTM's charter format, TBS metrics, and PROOF debrief mnemonic were reconstructed from Jon/James Bach's "Exploratory Testing Explained" (which cites and links SBTM), from secondary aggregator pages (HandWiki, Wikipedia "Session-based testing", abbreviations.com for PROOF), and cross-checked. **Flag:** the PROOF mnemonic (Past, Results, Obstacles, Outlook, Feelings) is widely and consistently attributed to Jon Bach across multiple independent secondary sources, but was not confirmed against the primary satisfice.com PDF in this session — treat as high-confidence but secondary-sourced.
- **ipetitions.com/petition/stop29119** — HTTP 403 (blocked). The petition's existence, creation date (2014-08-28), and creator (Cem Kaner) were confirmed via context-driven-testing.com's own page about it and Bolton's FAQ, both of which quote/link the petition; the petition's exact original wording/signature count was not independently verified.
- **exampler.com/old-blog/2003/08/21 and /08/22** (Brian Marick's original quadrants posts) — TLS certificate mismatch (`www.exampler.com` cert doesn't match), site appears to have migrated or lapsed. Marick's original quadrant content was recovered second-hand, but with unusually strong provenance: Bach & Bolton's 2019 conference deck ("Refactoring the Agile Testing Quadrants") reproduces Marick's original 2×2 diagram exactly (labeled "Marick's Original," citing the exampler.com URLs) and quotes his framing directly. This is treated as reliable because it is a primary-source-adjacent reproduction by people arguing directly against Marick's diagram (i.e., they have no motive to misstate it favorably).
- **Metamorphic testing (Chen et al.) primary source** — not fetched (out of scope per instructions: "do not over-invest"). Flagged as [UNVERIFIED — not independently sourced this session] below in §1.

---

## 1. THE ORACLE PROBLEM

### 1.1 What an oracle is — Kaner's definitions

Cem Kaner, on kaner.com (post "The Oracle Problem and the Teaching of Software Testing", dated **2012-09-11**, kaner.com/?p=190):

> Initial/classical definition: **"a software testing oracle [is] a tool that tells you whether the program passed your test"**

Kaner explicitly revises this because it implies false certainty. His refined definition:

> **"a software testing oracle is a tool that helps you decide whether the program passed your test"**

The shift — from "tells you" to "helps you decide" — is the single most important move in the whole oracle literature: it converts the oracle from an oracle-as-verdict into an oracle-as-heuristic-device. Kaner frames the history of his own thinking directly:

> "When I first studied testing, I learned that a test involved comparison of the test result to an expected result. The expected result was the *oracle*."

This is consistent with the classic "Testing Computer Software" (Kaner, Falk, Nguyen) framing that a test needs a way to know pass from fail — "expected results" — but Kaner's later writing (this post, and the BBST course materials) explicitly generalizes "expected result" to "oracle" and then explicitly problematizes it.

### 1.2 Why oracles are fallible — the decision-theory framing

Kaner explicitly imports the vocabulary of statistical decision theory to describe oracle failure:

> "you might make either of the classic mistakes of decision theory: The *miss*: you believe the program has passed even though it did something wrong. The *false alarm*: you believe the program has failed even though it has behaved appropriately."

And the general statement of oracle fallibility:

> "Oracles are heuristic devices: they are useful tools that help us make decisions, but sometimes they point us to the wrong decision."

This is the direct, citable form of the instruction's target claim: **"you cannot test without an oracle, and every oracle is fallible."** Kaner does not use exactly that sentence in what was retrievable this session, but the two quotes above jointly assert precisely that content, from the person who is most closely identified with formalizing "oracle" as a term of art in software testing.

### 1.3 Historical lineage

- Kaner's post credits **Elaine Weyuker's 1980 paper "On Testing Nontestable Programs"** as foundational — this is the paper that first rigorously argued some programs are inherently hard/impossible to fully verify because no independent oracle exists (e.g., programs that compute the very thing you'd need to check them, like a compiler compiling itself, or programs with genuinely unknown correct answers such as scientific simulations).
- **Doug Hoffman** presented an oracle taxonomy at Quality Week in **1998**, which Kaner incorporates and extends.

### 1.4 Doug Hoffman's oracle taxonomy (via Kaner's exposition)

Kaner's post enumerates (not further defined in the retrievable text beyond naming — treat item-level descriptions as [UNVERIFIED — names only, not full definitions]):

- Constraint oracle
- Regression oracle
- Self-verifying data
- Physical model
- Business model
- Statistical model
- State model
- Interaction model
- Calculation oracles
- Inverse oracle
- Reference program

**Note on incompleteness:** kaner.com/pdfs/PNSQCoracleTutorial.pdf (the fuller oracle tutorial deck, which likely defines each of the above types in a sentence or two) returned a 404 and could not be fetched this session. The list above should be treated as a checklist of *names of partial-oracle strategies* rather than fully verified individual definitions. An agent using this list should treat each item as "a candidate partial-oracle heuristic to investigate further," not as a fully specified technique.

### 1.5 Cem Kaner's definition of testing (context for the oracle discussion)

Widely and consistently attributed (via BBST course materials, cross-confirmed by multiple independent secondary sources in this session's WebSearch):

> **"Testing is an empirical, technical investigation conducted to provide quality-related information about a software product to a stakeholder."**

This is the canonical Kaner definition of *testing itself* — distinct from, but load-bearing for, the oracle discussion: testing is an "empirical, technical investigation," and an oracle is the mechanism inside that investigation that lets you interpret an observation as pass/fail. **[Note: this exact wording was recovered via WebSearch aggregation, not a direct primary-source fetch in this session; it is extremely widely and consistently quoted across BBST-affiliated sources, so confidence is high, but it is flagged as secondary-sourced rather than directly verified against a kaner.com page in this session.]**

### 1.6 Michael Bolton / James Bach — FEW HICCUPPS (the full, verified oracle heuristic)

Source: **developsense.com/blog/2012/07/few-hiccupps**, published **2012-07-23**, with edits **2016-12-18** and **2017-01-26**. This post is explicitly a joint Bach/Bolton development of Bach's earlier **HICCUPPS** heuristic (see §1.7 for the original, pre-2012 version). Verified via two independent WebFetches of the same URL to eliminate extraction error (the first pass initially dropped the "Comparable Products" item; the second, more targeted, pass confirmed the full 11-item list).

**Framing, verbatim:** an oracle, in Bach/Bolton's usage, is **"a way of recognizing a problem"** — testers recognize problems when the product is *inconsistent* with some principle or expectation. Every letter below names a *kind of consistency* whose violation is a signal of a possible bug. Bolton: these heuristics are **"fallible and context-dependent; to be applied, not followed."**

The complete mnemonic, **(F)EW HICCUPPS**, in order:

| Letter | Name | Verbatim/near-verbatim description |
|---|---|---|
| **F** | **Familiarity** | "We expect the system to be **inconsistent** with patterns of familiar problems." |
| **E** | **Explainability** | "We expect a system to be understandable to the degree that we can articulately explain its behaviour to ourselves and others." |
| **W** | **World** | "We expect the product to be consistent with things that we know about or can observe in the world." |
| **H** | **History** | We expect the present version of the system to be consistent with past versions of it. |
| **I** | **Image** | We expect the system to be consistent with an image that the organization wants to project, with its brand, or with its reputation. |
| **C** | **Claims** | We expect the system to be consistent with things important people say about it (documentation, specs, marketing). |
| **C** | **Comparable Products** | We expect the system to be consistent with comparable or competitive products/systems. |
| **U** | **User Desires** (formerly "User Expectations") | We expect the system to be consistent with ideas about what reasonable users might want. |
| **P** | **Product** | We expect each element of the system to be consistent with comparable elements in the same system (internal consistency). |
| **P** | **Purpose** | We expect the system to be consistent with the explicit and implicit uses to which people might put it. |
| **S** | **Statutes / Standards** | "We expect a system to be consistent with relevant statutes, acts, laws, regulations, or standards." |

**Why the mnemonic is spelled the way it is:** the "F" was placed first (making it "(F)EW HICCUPPS" rather than a plain acronym) specifically to flag that testers often start by looking for familiar-problem patterns. This is an explicit design note from Bolton, not an artifact of alphabetization.

### 1.7 The original HICCUPPS (pre-2012, James Bach)

Before Familiarity/Explainability/World were added, Bach's original heuristic was simply **HICCUPPS**: History, Image, Comparable products, Claims, User expectations, Product, Purpose, Statutes (i.e., items 4–11 in the table above, without F/E/W). The instructions asked to verify the exact order at source rather than trust a prior listing — the order above (as fetched directly from developsense.com) is the order to treat as canonical for the *current* (post-2012) version. **[Note: the FEW HICCUPPS letter order is stable across the two independent fetches performed this session, and matches the order recovered via WebSearch aggregation, so confidence in this exact ordering is high.]**

### 1.8 Metamorphic testing as a partial answer to the oracle problem

Per the assignment's own instruction ("do not over-invest"), this was not independently sourced this session. **[UNVERIFIED — no primary Chen et al. source fetched this session.]** What can be stated without a primary fetch, purely as background context an agent should treat cautiously: metamorphic testing is generally described in the testing literature as addressing the oracle problem for programs where no full oracle exists, by testing *relations* between multiple executions of the program (e.g., "if I sort this list and then reverse it, some property should relate to sorting the reversed list") rather than testing any single execution against an absolute expected output. This is consistent with, and a formalization-adjacent cousin of, Kaner/Hoffman's "self-verifying data" and "inverse oracle" partial-oracle categories (§1.4). Do not treat the description above as verbatim from Chen et al.; it is a general characterization only, flagged as unverified against a primary source in this session.

### 1.9 Synthesis for the skill (agent-usable rule)

- **Rule: Every test requires an oracle, explicit or tacit, and every oracle is heuristic — a decision aid, not a proof.** Source: Kaner, kaner.com/?p=190 (2012).
- **Rule: When no strong oracle exists (a "nontestable program" per Weyuker 1980), decompose the check into partial oracles** (regression, constraint, self-verifying data, inverse, statistical model, etc. — Hoffman's taxonomy) rather than declaring the area untestable.
- **Rule: When you cannot articulate what a test would compare against, use a consistency heuristic (FEW HICCUPPS) to generate candidate expectations** — history, comparable products, claims, user desires, internal product consistency, purpose, and statutes are all legitimate, independent sources of "what should happen here."

---

## 2. Testing vs Checking (verbatim definitions)

### 2.1 The 2009 original distinction

Source: **developsense.com/blog/2009/08/testing-vs-checking**, published **2009-08-29** (Michael Bolton). This is Bolton's *first* cut at the distinction, superseded in 2013 but historically important:

> **Checking** is "a process of confirmation, verification, and validation" — motivated by "confirming existing beliefs," focused on making sure "the program doesn't fail."

> **Testing** aims at "finding new information" — "a process of exploration, discovery, investigation, and learning," focused on learning "everything that matters about how the program works and about how it might not work."

Key differentiator, verbatim: **"A check provides a binary result—true or false, yes or no."** These are **"machine-decidable."** And the sapience criterion, verbatim:

> "Whether we automate the process or not, if we could express our question such that a machine could ask and answer it via an assertion, it's almost certainly checking. If it requires a human, it's a sapient process."

A **2014 postscript** on this same page explicitly retracts/redirects: *"Please read the new version first"* — pointing to the 2013 refinement below. **This 2009 version is historical and superseded — flag any agent-facing rule derived from it as needing the 2013 update.**

### 2.2 The 2013 refinement — the primary, current formal definitions

Source: **satisfice.com/blog/archives/856**, "Testing and Checking Refined," by **James Bach and Michael Bolton**, posted (per this session's fetch metadata) **2024-08-10** — note this date is almost certainly the date of a *republication/mirror* rather than original authorship; the companion commentary post at developsense.com/blog/2013/03/testing-and-checking-redefined is dated **2013-03-29** and refers back to "James' blog" post from "March 26 or so [2013]." **Treat the true original publication date as March 2013**, with the 2024-08-10 timestamp likely reflecting a page re-save/migration at satisfice.com. Flagged as a minor date-provenance uncertainty, not a content uncertainty.

**Verbatim formal definitions, as fetched:**

> **Testing:** "The process of evaluating a product by learning about it through experiencing, exploring, and experimenting, which includes to some degree: questioning, study, modeling, observation, inference, etc."

> **Checking:** "The mechanistic process of verifying propositions about the product."

> **Human Checking:** "An attempted checking process wherein humans verify propositions without the mediation of tools."

> **Machine Checking:** "A checking process wherein tools verify propositions without the mediation of humans."

> **Human/Machine Checking:** "An attempted checking process wherein both humans and tools cooperate to verify propositions about the product."

**The structural claim (Bach & Bolton's central argument):**

> "Testing encompasses checking, but checking cannot encompass testing." A check can exist independently, but checking derives meaning only within a broader testing strategy.

**Retirement of "sapience":** the authors explicitly abandoned the earlier "sapient/non-sapient" vocabulary because it implied that tool-supported (non-sapient) work was inherently inferior, which created misunderstanding. This is an important nuance: **the 2013 refinement is a walk-back from a possibly-condescending framing in the 2009 version, not a doubling-down on it.**

**Key line on human vs. machine limits, verbatim:** "Humans can perform motivated actions; tools can only exhibit programmed behaviour." Humans attempting to follow an algorithmic checking process will inevitably interpret and adjust beyond the prescribed procedure — this drift is itself evidence that they were doing more than checking (they were testing). Machines cannot drift this way; a machine executing a check does only, exactly, what it was programmed to do.

### 2.3 The 2025 further refinement — "Checking is Inside Testing"

Source: **developsense.com/blog/2025/04/checking-is-inside-testing**, published **2025-04-10** (with an odd secondary "2025-08-23" surface date in this session's fetch — treat April 2025 as primary). This post's title states the current, most refined position directly: **checking is a component activity performed *within* testing, not a separate or opposing activity, and not something that can stand as a substitute for testing.** It explicitly references three prior essays as the canonical trilogy on this topic:
1. "Testing and Checking Refined" (Bach & Bolton, 2013)
2. "On Testing and Checking Refined" (Bolton, 2013-03-29)
3. "Testing, Checking, and Changing the Language" (Bolton — title only; not independently fetched this session, [UNVERIFIED — not fetched]).

### 2.4 What automation can and cannot do — synthesis for the skill

From the combined 2009/2013/2025 material:
- Automation (a "check") can only ever evaluate a **proposition that a human has already decided is worth asking, phrased so precisely that a machine can evaluate it as true/false.**
- Automation **cannot** notice a problem nobody thought to ask about; it cannot exercise judgment about whether an observed difference matters; it cannot decide when it has learned enough, or whether it has learned the *right* thing.
- Every automated check is therefore parasitic on an act of human testing that (a) decided the check was worth writing, (b) chose the oracle the check encodes, and (c) will eventually notice when the check has gone stale, is checking the wrong thing, or is missing an entire class of problem the humans never encoded.
- **Agent-usable rule: never report "all checks passed" as equivalent to "the software is fine." Checks passing only certifies that the propositions someone thought to encode are still true. It says nothing about propositions nobody encoded.**

---

## 3. What we deliberately do NOT test / stopping heuristics / good-enough

### 3.1 James Bach — "Good Enough Software" (1997)

Source: secondary but faithful reproduction (egr.msu.edu) of Bach's original **IEEE Computer, Vol. 30, No. 8, August 1997** article; original SD'97/STAR'97/University of Colorado talks. **[Note: the primary satisfice.com PDF of this article was not directly fetched this session; content below is recovered from a university course's faithful summary page, treated as reliable given specificity and internal consistency, but flagged as secondary-sourced.]**

Bach's four-part definition of "good enough":

1. "It has sufficient benefits."
2. "It has no critical problems."
3. "The benefits sufficiently outweigh the problems [that remain]."
4. "Further improvement would be more harmful than helpful" in the present situation.

Key philosophical point, verbatim: **"Good Enough has nothing to do with mediocrity. It has to do with rational choices, as opposed to compulsive behavior."** This is the load-bearing sentence for the skill's "what we deliberately don't test" thesis: choosing *not* to chase a given class of bug, or *not* to test past a certain point, is framed by Bach not as laziness but as a rational act of judgment under constraint — the alternative (testing/fixing everything conceivable) is "compulsive," not virtuous.

### 3.2 Michael Bolton — stopping heuristics ("When Do We Stop a Test?")

Source: **developsense.com/blog/2009/09/when-do-we-stop-test**, published **2009-09-11**.

Framing: "we can't know for sure when we're done, because any approach to answering the stopping question is necessarily heuristic." The full list of stopping heuristics (names and descriptions as fetched):

1. **The Time's Up! Heuristic** — Testing stops when allocated time expires, though one should still ask whether the needed information was actually obtained.
2. **The Piñata Heuristic** — Stop after "the first sufficiently dramatic problem," while considering whether other significant issues remain undiscovered.
3. **The Dead Horse Heuristic** — The program is judged too buggy for further testing to have much marginal value, while recognizing the risk of missing more critical issues underneath.
4. **The Mission Accomplished Heuristic** — Stop after all initially posed questions have been answered, while recognizing that testing itself may have raised new questions worth pursuing.
5. **The Mission Revoked Heuristic** — The client mandates a stop (budget exhausted, project cancelled), regardless of testing's informational state.
6. **The I Feel Stuck! Heuristic** — Pause due to a perceived blocking obstacle: missing specifications, a blocking bug, lack of needed expertise.
7. **The Pause That Refreshes Heuristic** — A *temporary* suspension for rest, research, or replanning — not a true stop.
8. **The Flatline Heuristic** — The system produces the same (crashed or identically-behaving) result regardless of input variation, which could mean either "broken" or "stable" — ambiguous, and risks missing implications either way.
9. **The Customary Conclusion Heuristic** — Stop after completing an established, conventional protocol (a fixed test cycle, a standard regression pass) — worth questioning whether the convention itself still makes sense.
10. **No More Interesting Questions** — Stop when the remaining unanswered questions are judged not to be worth their testing cost, informed by risk assessment.
11. **The Avoidance/Indifference Heuristic** — Stop due to disinterest, fatigue, or business pressure overriding the value of further problem discovery — this one is explicitly presented as a heuristic to *notice and question in yourself*, not to endorse.

**Later addition (cited within the same thread, attributed to Cem Kaner):** **Mission Rejected** — the tester personally declines to continue testing (an ethical/professional stopping point distinct from all the above, which are about information or resources).

**Agent-usable framing:** none of these heuristics is a "correct" stopping rule; the list itself is Bolton's device for making testers *notice which heuristic they're currently acting on*, so that the choice to stop is examined rather than automatic. An agent building a "when to stop testing" feature should surface which heuristic applies to the current situation, not silently pick one.

### 3.3 Residual risk after a test cycle

No single canonical source was found and fetched this session specifically packaging "residual risk taxonomy" as a named artifact (as opposed to the general framing throughout HTSM's "Quality Criteria Categories," which function as a risk checklist — see §10.2). The closest primary framing is HTSM's own text (Bach, v6.0, 2024, quoted directly from the fetched PDF):

> "You can never know the 'actual' quality of a software product—you can't 'verify' quality, as such—but by performing tests, you can make an assessment, and that takes the form of a story you tell (including bugs, curios, etc.)."

This is the direct primary-source statement that **the output of testing is never "quality confirmed," it is a bounded story with an implicit and unavoidable residual-risk penumbra** — everything the story didn't cover remains unknown, by construction, not by oversight.

### 3.4 Synthesis for the skill

- **Rule:** frame "what we didn't test" explicitly, using the Quality Criteria Categories (§10.2) as a checklist of risk *dimensions* that were, or were not, addressed — this converts silent gaps into visible, named residual risk.
- **Rule:** apply a named stopping heuristic (§3.2) deliberately and say which one out loud, rather than stopping by default/fatigue (the Avoidance/Indifference Heuristic).
- **Rule:** "good enough" is a first-class deliverable state, not a failure state — Bach's four-part test (§3.1) is a legitimate acceptance gate, distinct from "fully tested."

---

## 4. Rapid Software Testing (RST)

Source: **rapid-software-testing.com** (fetched directly, 2026-07-26 snapshot).

**RST's definition of testing, verbatim:**

> "We test to develop a comprehensive understanding of the product and the risks around it. We test to find problems that threaten the value of the product, or that threaten the on-time, successful completion of any kind of development work."

Additional framing: testing exists to "help the business, managers, and developers decide whether the product they've got is the product they want."

**Core premises (as characterized by this session's fetch of the site):**

1. **Human-centered testing** — the tester, not tools or process, is the central figure.
2. **Experiential learning** — testers build product knowledge by "experiencing, exploring, and experimenting, quickly and expertly."
3. **Risk-focused** — testing exists to reveal business risks that could cause "unpleasant and expensive surprises."
4. **Responsible practice / duty of care** — "releasing poorly tested software would be a breach of that duty."
5. **Context-driven philosophy** — skilled people need "freedom and the tools to do testing well," i.e., RST explicitly positions itself as an implementation/methodology of the context-driven school (see §9), not a separate philosophy.

RST is created and taught by **James Bach and Michael Bolton** (co-creators; confirmed independently via the Bach/Bolton 2019 "Refactoring the Agile Testing Quadrants" deck, which both sign as DevelopSense/Satisfice).

---

## 5. SBTM & exploratory charters

### 5.1 Origin

**Session-Based Test Management (SBTM)** was developed by **Jonathan Bach and James Marcus Bach**, originally at **Hewlett-Packard**, with the seminal article dated to **November 2000** (per satisfice.com's own download-page metadata, "originally created November 1, 2000," "last updated July 7, 2021"). James Bach's own 2003 "Exploratory Testing Explained" describes SBTM as **"a method specifically designed to make exploratory testing auditable and measurable on a wider scale."**

### 5.2 Session definition

> A session is **"an uninterrupted block of reviewable, chartered test effort."** (Jonathan Bach — consistently attributed across multiple independent secondary sources this session; the primary PDF text was not directly retrieved, so treat as high-confidence secondary.)

### 5.3 TBS metrics

Test sessions are broken into three task categories, and testers self-report the approximate proportion of session time spent on each:

- **T — Test design and execution**
- **B — Bug investigation and reporting**
- **S — Session setup**

### 5.4 Debrief protocol — PROOF

The debrief is described (secondary-sourced, cross-confirmed across multiple independent pages) as a short (5–10 minute) discussion between the tester and the test lead/manager about the session report, structured around the mnemonic **PROOF**:

- **P — Past:** What happened during the session?
- **R — Results:** What was achieved during the session?
- **O — Obstacles:** What got in the way of good testing?
- **O — Outlook:** What still needs to be done?
- **F — Feelings:** How does the tester feel about all this?

**[Flag: PROOF was not directly confirmed against the primary satisfice.com SBTM PDF in this session (that PDF's bytes were not retrievable — see §0). It is, however, consistently and specifically attributed to Jon Bach across several independent secondary sources with matching wording, so it is treated as reliable but secondary-sourced.]**

### 5.5 Charter format and examples (primary-sourced, from James Bach's "Exploratory Testing Explained" v1.3, 2003-04-16, satisfice.us/articles/et-article.pdf — read in full as a PDF this session)

Bach's own framing, verbatim: **"An exploratory test session often begins with a charter, which states the mission and perhaps some of the tactics to be used."** Charters may be self-chosen or assigned; sometimes written, sometimes implicit in vague existing test-case documentation.

Verbatim example charters given in the source (for a fictional product "DecideRight"), reproduced in full because the instructions call for exact charter wording as a template class:

- "Explore and analyze the product elements of DecideRight. Produce a test coverage outline."
- "Identify and test all claims in the DecideRight manual. (either use checkmark/X/? notation on the printed manual, or list each tested claim in your notes)"
- "Define work flows through DecideRight and try each one. The flows should represent realistic scenarios of use, and they should collectively encompass each primary function of the product."
- "We need to understand the performance and reliability characteristics of DecideRight as decision complexity increased. Start with a nominal scenario and scale it up in terms of number of options and factors until the application appears to hang, crash, or gracefully prevent user from enlarging any further."
- "Test all fields that allow data entry (you know the drill: function, stress, and limits, please)"
- "Analyze the file format of a DecideRight scenario and determine the behavior of the application when its elements are programmatically manipulated. Test for error handling and performance when coping with pathological scenario files."
- "Check UI against Windows interface standards."
- "Is there any way to corrupt a scenario file? How would we know it's corrupted? Investigate the feasibility of writing an automatic file checker. Find out if the developers have already done so."
- "Test integration with external applications, especially Microsoft Word."
- "Determine the decision analysis algorithm by experimentation and reproduce it in Excel. Then, use that spreadsheet to test DecideRight with complex decision scenarios."
- "Run DecideRight under AppVerifier and report any errors."

Bach's own note on why these look loose: **"They are intended to communicate the mission of a test session clearly and succinctly to testers who have already been trained in the expectations, vocabulary, techniques and tools used by the organization. ... in ET we make maximum use of skill, rather than attempting to represent every action in written form."**

Also from the same source — **Cem Kaner's "tour bus" principle** (verbatim): a general plan of attack with permission to deviate briefly — **"Even people on a tour bus get to step off it occasionally and wander around. The key is not to miss the tour entirely, nor to fall asleep on the bus."**

And Kaner's suggested management ritual, verbatim: regular (at least weekly) meetings opened with the standard question, **"What is the most interesting bug you've found recently? Show it to me."**

---

## 6. Hendrickson / Explore It! / cheat sheet

### 6.1 The exploratory charter template

From Elisabeth Hendrickson's *Explore It!* (Pragmatic Bookshelf), reproduced consistently across secondary sources (the book itself was not fetched as a full text this session — [secondary-sourced, high confidence given specificity and consistency]):

> **"Explore \<target\> with \<resources\> to discover \<information\>."**

- **Target:** what is being explored — a feature, requirement, module.
- **Resources:** what the tester brings — a tool, data set, technique, configuration, or a related/interdependent feature.
- **Information:** what kind of finding is being sought — e.g., characterizing security, performance, reliability, capability, usability, consistency of design, or violations of a standard.

This is structurally near-identical to Bach's SBTM-era charter concept (§5.5) but formalized into an explicit fill-in-the-blank template — useful directly as an agent-generatable prompt pattern.

### 6.2 Test Heuristics Cheat Sheet — Hendrickson, Lyndsay, Emery

Source: ministryoftesting.com/articles/test-heuristics-cheat-sheet and althority.com/cheat_sheet (both fetched; content is a categorized index, not the full line-by-line document text — the complete document was not retrievable as full text this session, so this is a **structural index, not verbatim reproduction**).

Copyright: **© 2006 Quality Tree Software, Inc.** and **© 2022 Ministry of Testing Ltd.** Original ideas credited to **Elisabeth Hendrickson, James Lyndsay, and Dale Emery**, with additional community contributions layered in over time (this is a living/updated document, not a fixed 2006 artifact).

Categories present in the current version (names only — sub-items not independently verified verbatim this session, **[UNVERIFIED at item level]**):

- **Data Type Attacks:** Paths/Files, Time and Date, Numbers, Strings, General
- **Web Tests:** Navigation, Input, Syntax, Preferences, Accessibility/A11y
- **API Test Mnemonics:** BINMEN, POISED, VADER (named frameworks; expansions not verified this session)
- **Mobile Testing:** a "MOBILE APP TESTING" mnemonic covering device, orientation, browsers, interrupts, etc.
- **Core Heuristics:** Variable Analysis, TouchPoints, Boundaries, CRUD, Follow the Data, Configurations, Interruptions, Starvation, Position, Selection, Count, Multi-User, Flood, Dependencies, Constraints, Input Method, Sequences, Sorting, State Analysis, Map Making
- **User-Focused Frameworks:** RCRCRC, FAILURE, WWWWWHKE, Diversity & Inclusion approaches, "Seven Dwarfs" personas
- **Quality Frameworks:** TORCH, MCOASTER, "Seen and Heard," TuTTu/TaTTa, SACRED, TRIMS
- **Judgment Frameworks:** Inconsistencies/Absences/Extras, Observations (Input/Output/Linkage), Requirements, Nouns & Verbs, Deming's Cycle

**Important caveat for the skill:** this cheat sheet is large, actively maintained, and clearly has grown substantially since 2006 (note the 2022 Ministry of Testing copyright layer). An agent citing "the Hendrickson cheat sheet" should point to the live document (ministryoftesting.com/articles/test-heuristics-cheat-sheet) rather than treat any specific version as fixed and canonical, and should not assume the full expansions of the many named mnemonics above without checking the live page.

---

## 7. Kaner / BBST

### 7.1 Kaner's definition of testing

Repeated here from §1.5 for completeness:

> **"Testing is an empirical, technical investigation conducted to provide quality-related information about a software product to a stakeholder."**

**[Secondary-sourced this session — see §1.5 flag.]**

### 7.2 BBST (Black Box Software Testing)

BBST is Kaner's course series, referenced across multiple fetched sources this session (kaner.com, satisfice.us/articles/et-article.pdf, and search results pointing to bbst.courses). Confirmed structural facts:
- BBST is delivered as a set of named courses, including at least **BBST Foundations**, **BBST Bug Advocacy**, and **BBST Test Design** (module names recovered via search-result titles: "Cem Kaner: The impossibility of complete testing," "BBST Bug Advocacy" — bbst.courses).
- BBST's required reading explicitly includes the **Hendrickson/Lyndsay/Emery Test Heuristics Cheat Sheet** (§6.2) as assigned material for the Test Design course — confirming a direct pedagogical link between Kaner's BBST curriculum and the Hendrickson/Bach/Bolton heuristics literature; the schools overlap and cross-cite constantly.
- **"The impossibility of complete testing"** is an explicit, named BBST teaching point attributed to Kaner (title recovered via search; not independently fetched as full text this session — [UNVERIFIED at content level, title only confirmed]).

### 7.3 Kaner's critique of consistency heuristics (a narrower point than "best practices," worth distinguishing)

From kaner.com/?p=190 (2012), Kaner critiques the Bach/Bolton HICCUPPS-family heuristics specifically for automation purposes, verbatim:

> "I don't find them helpful for designing tests" — and, more specifically, they are **"worthless for designing automated tests"** because **"the consistencies don't guide testers toward oracle ideas that are specific enough to be programmed."**

**Important distinction for the skill:** this is *not* Kaner's famous general critique of "best practices" in testing (that critique is better understood as embodied directly in Context-Driven Testing Principle #2 — "There are good practices in context, but there are no best practices," see §9 — which Kaner co-authored). The kaner.com/?p=190 quote above is a narrower, more technical objection: Kaner is saying FEW HICCUPPS is a good *idea-generation* heuristic for human testers but a poor *specification* device for automated checks, because it doesn't resolve down to a concrete assertion a machine could execute. This is itself a nice, citable, concrete instance of the general testing-vs-checking distinction (§2): a heuristic that's excellent for human sapient testing can be simultaneously useless for machine checking, and that's expected, not a flaw in the heuristic.

---

## 8. Marick's quadrants (both versions) — and the Bach/Bolton critique

### 8.1 Marick's original (2003)

Source: recovered via the Bach/Bolton 2019 deck ("Refactoring the Agile Testing Quadrants," developsense.com/presentations/2019-05-RefactoringtheAgileTestingQuadrants.pdf, read in full as a PDF this session), which reproduces Marick's diagram directly and cites exampler.com/old-blog/2003/08/21/ and /08/22/#agile-testing-project-2 as sources (those exampler.com URLs themselves were not independently fetchable this session — TLS cert mismatch, see §0).

**Marick's original 2×2**, verbatim axis labels as reproduced in the Bach/Bolton deck:
- Vertical axis: **Business Facing** (top) vs. **Technology Facing** (bottom)
- Horizontal axis: **Support Programming** (left) vs. **Critique Product** (right)

Four quadrants (unlabeled with specific techniques in Marick's original — it was presented as a bare 2×2 grid with colored quadrants, per the reproduced diagram). Bach/Bolton's critique specifically targets how Marick's original framed things: **"Marick's original and his comments on it frame simple output checks as more 'integral' to the programming process than vigorous testing."**

### 8.2 Crispin & Gregory's earlier version (from *Agile Testing*)

The Bach/Bolton deck reproduces this version's labeling directly:
- Vertical: **Business Facing** (top) / **Technology Facing** (bottom)
- Horizontal: **Supporting the Team** (left) / **Critique Product** (right)
- **Q1 (bottom-left, technology-facing, supporting):** Unit Tests, Component Tests
- **Q2 (top-left, business-facing, supporting):** Functional Tests, Examples, Story Tests, Prototypes, Simulations
- **Q3 (top-right, business-facing, critiquing):** Exploratory Testing, Scenarios, Usability Testing, UAT (User Acceptance Testing), Alpha/Beta
- **Q4 (bottom-right, technology-facing, critiquing):** Performance & Load Testing, Security Testing, "-ility" Testing

Cloud annotations on the original diagram: "Automated" (bottom), "Manual" (top-right), "Tools" (bottom-right), "Automated & Manual" / "Manual" (top corners).

### 8.3 Crispin & Gregory's newer version (from *More Agile Testing*)

- Vertical: **Business Facing** (top) / **Technology Facing** (bottom)
- Horizontal: **Guide Development** (left) / **Critique the Product** (right) — note "Supporting the Team" was renamed "Guide Development"
- **Q1:** Unit Tests, Component Tests (code level), Testing Connectivity
- **Q2:** Examples, A/B Tests, Story Tests (written first), UX (user experience) testing, Prototypes, Simulations
- **Q3:** Exploratory Testing, Workflows, System Integration (business-oriented), Usability Testing, UAT
- **Q4:** Performance Testing, Load Testing, Security Testing, Quality Attributes (…ilities)

### 8.4 Bach & Bolton's critique (2018/2019, "Refactoring the Agile Testing Quadrants")

This is a substantial, sharp, primary-source critique — reproduced at length because it directly supports the skill's core "checking vs. testing" thesis in a second, independent register. Key points, verbatim where marked:

1. **Historical framing (Bolton, verbatim):** "Increasingly, testing is confused with 'checking builds'. Our fixation on 'test automation' is causing us to lose connection with the human, social purposes of software development and testing... what I'm seeing at conferences and in talk about testing often looks like elaborate attempts to avoid making contact with the software, our clients, our customers, and our mission."
2. **Core objection to "Supporting Programming":** Crispin & Gregory's labeling implies critique (testing) is *not* supporting the team, and that testers who don't write code don't belong in Agile. Bach/Bolton's counter, verbatim: **"Testing—critiquing the product—IS supporting the team!"**
3. **On automated/manual as a category error, verbatim:** "There is no such thing as 'manual' or 'automated' testing, just as there isn't 'manual' or 'automated' programming." (They point to a specific companion post: developsense.com/blog/2013/02/manual-and-automated-testing — not independently fetched this session, [UNVERIFIED, title/URL only].)
4. **On reification (turning tests into things), verbatim:** "Test cases are not tests; examples are not tests." "Tests are not artifacts; they're performances." "The most important parts of testing (tacit knowledge, social judgment, context awareness) cannot be scripted or encoded." "It is pointless to discuss whether 'business people' can 'read the tests' because what they can read are not tests – they are partial representations of testing activity (or else they are checks)."
5. **Both quadrant versions criticized for pinning techniques to quadrants confusingly** — e.g., "Isn't TDD a form of exploratory development?" "Can we not test [a] component using an exploratory approach?" "Aren't '-ilities' (capability, reliability, testability…) relevant everywhere?" "Is security testing technology facing? Isn't it business facing?"
6. **Bach/Bolton's proposed replacement: reframe the axes around business value, not "facing."** Their alternative model reframes the four quadrants as: **Envisioning Success** (discover something worth building), **Focusing** (build with change in mind / build cleanly), **Anticipating Failure** (study what we built, defocusing), and **Defocusing** (deep testing for hidden/subtle/rare problems) — mapped onto **High Value of Product** and **Low Cost of Development** axes rather than "business/technology facing." Within this, they define **Four Frames for Testing** — **Preparation** (fostering testability), **Intention** (developing the design), **Discipline** (building cleanly and simply), and **Realization** (experimenting imaginatively and suspiciously) — with a central definition of testing repeated inline on the slide: **"Testing is... Evaluating a product by learning about it through experimentation and exploration."** (This is a compressed paraphrase of the 2013 formal definition in §2.2, used as a running anchor throughout the deck.)

### 8.5 ISTQB's own absorption of the quadrants (for the comparison in §9)

The ISTQB CTFL v4.0.1 syllabus (2024-09-15) has its own §5.1.7 "Testing Quadrants," explicitly citing **"Marick 2003, Crispin 2008"** as the model's origin, and defines the four quadrants in ISTQB's own institutional language:
- **Q1 (technology facing, support the team):** component tests and component integration tests; automated, in CI.
- **Q2 (business facing, support the team):** functional tests, examples, user story tests, UX prototypes, API testing, simulations; manual or automated.
- **Q3 (business facing, critique the product):** exploratory testing, usability testing, user acceptance testing; user-oriented, often manual.
- **Q4 (technology facing, critique the product):** smoke tests and non-functional tests (except usability); often automated.

**Disagreement flag:** ISTQB explicitly names "exploratory testing" as belonging to a single quadrant (Q3, business-facing/critiquing) — exactly the kind of "pinning a technique to one quadrant" move that Bach & Bolton's 2018/2019 critique (§8.4, point 5) directly and specifically objects to as confused (their own example: "Can we not test [a] component using an exploratory approach?" implies exploratory testing is a *stance*, applicable everywhere, not a technique confined to one quadrant).

---

## 9. Context-driven principles (all 7 verbatim)

Source: **context-driven-testing.com**, fetched directly. Presented under the header **"The Seven Basic Principles of the Context-Driven School,"** credited to the work of **Cem Kaner, James Bach, and Bret Pettichord** in *Lessons Learned in Software Testing: A Context-Driven Approach*. No specific page-level publication date is shown on the page itself (the book itself was published 2001).

1. "The value of any practice depends on its context."
2. "There are good practices in context, but there are no best practices."
3. "People, working together, are the most important part of any project's context."
4. "Projects unfold over time in ways that are often not predictable."
5. "The product is a solution. If the problem isn't solved, the product doesn't work."
6. "Good software testing is a challenging intellectual process."
7. "Only through judgment and skill, exercised cooperatively throughout the entire project, are we able to do the right things at the right times to effectively test our products."

**Agent-usable rule derived directly from Principle 2:** never present a testing technique, tool, or checklist item in this skill as a "best practice" in absolute terms; always frame recommendations as context-conditional ("this is a good practice when X context conditions hold").

---

## 10. HTSM: SFDIPOT, CRUSSPIC STMPL, FEW HICCUPPS (all verbatim)

Source: **Heuristic Test Strategy Model, v6.0**, James Bach, satisfice.com/tools/htsm.pdf (also mirrored at developsense.com/resource/htsm.pdf), dated **2024-02-08** ("2/8/2024" on the document), copyright 1996–2024 Satisfice, Inc. Read in full as a PDF this session (all five pages). This is the single richest primary artifact obtained this session and is reproduced at length below because the skill explicitly values letter-perfect mnemonics.

### 10.0 The model as a whole (verbatim framing)

> "The Heuristic Test Strategy Model is a set of patterns for designing and choosing tests to perform. The immediate purpose of this model is to remind testers of what to think about during that process."

Structure (a diagram in the source shows this as a cycle): **Project Environment** + **Quality Criteria** + **Product Elements** feed into **Test Techniques**, which produce **The Testing and Quality Story**. Verbatim on the output: **"You can never know the 'actual' quality of a software product— you can't 'verify' quality, as such— but by performing tests, you can make an assessment, and that takes the form of a story you tell (including bugs, curios, etc.)."**

### 10.1 Product Elements — SFDIPOT ("San Francisco Depot")

Seven top-level categories, **Structure, Function, Data, Interfaces, Platform, Operations, Time** — verbatim category definitions and full sub-item lists from the source:

- **Structure** — *Everything that comprises the physical product.* Sub-items: Code, Hardware, Service, Non-executable files, Collateral.
- **Function** — *Everything that the product does.* Sub-items: Multi-user/Social, Calculation, Time-related, Security-related, Transformations, Startup/Shutdown, Multimedia, Error Handling, Interactions, Testability.
- **Data** — *Everything that the product processes and produces.* Sub-items: Input/Output, Preset, Persistent, Interdependent/Interacting, Sequences/Combinations, Cardinality, Big/Little, Invalid/Noise, Lifecycle.
- **Interfaces** — *Every conduit by which the product is accessed or expressed.* Sub-items: User Interfaces, System Interfaces, API/SDK, Import/export.
- **Platform** — *Everything on which the product depends (and that is outside your project).* Sub-items: External Hardware, External Software, Embedded Components, Product Footprint.
- **Operations** — *How the product will be used.* Sub-items: Users, Environment, Common Use, Disfavored Use, Extreme Use.
- **Time** — *Any relationship between the product and time.* Sub-items: Input/Output, Fast/Slow, Changing Rates, Concurrency.

### 10.2 Quality Criteria Categories — CRUSSPIC STMPL

Verbatim: "A quality criterion is some requirement that defines what the product should be. ... Each of the items on this list can be thought of as a potential risk area."

- **Capability** — *Can it perform the required functions?* Sufficiency, Correctness.
- **Reliability** — *Will it work well and resist failure in all required situations?* Robustness, Error handling, Data Integrity, Safety.
- **Usability** — *How easy is it for a real user to use the product?* Learnability, Operability, Accessibility.
- **Charisma** (extra category, outside the CRUSSPIC STMPL 13-letter mnemonic proper) — *How appealing is the product?* Aesthetics, Uniqueness, Entrancement, Image.
- **Security** — *How well is the product protected against unauthorized use or intrusion?* Authentication, Authorization, Privacy, Security holes.
- **Scalability** — *How well does the deployment of the product scale up or down?* (no sub-items listed)
- **Compatibility** — *How well does it work with external components & configurations?* Application Compatibility, Operating System Compatibility, Hardware Compatibility, Backward Compatibility, Product Footprint.
- **Performance** — *How speedy and responsive is it?* (no sub-items listed)
- **Installability** — *How easily can it be installed onto its target platform(s)?* System requirements, Configuration, Uninstallation, Upgrades/patches, Administration.
- **Development** — *How well can we create, test, and modify it?* Sub-items map directly to the **STMPL** tail of the mnemonic: **Supportability, Testability, Maintainability, Portability, Localizability.**

**Letter-by-letter mnemonic mapping (reconstructed directly from the verbatim category list above, in the source's own presentation order):** Capability, Reliability, Usability, **[Charisma — present in the document but not part of the 13-letter CRUSSPIC STMPL name]**, Security, Scalability, Compatibility, Performance, Installability, Development{Supportability, Testability, Maintainability, Portability, Localizability} → **C-R-U-S-S-C-P-I-S-T-M-P-L**, commonly written **CRUSSPIC STMPL**. Note Charisma is a genuine category in the current v6.0 document but sits outside the classic mnemonic name — an agent should still surface it as a quality dimension, just note it's the "extra" one not encoded in the pronounceable acronym.

### 10.3 General Test Techniques — nine named families (no single-letter mnemonic given in v6.0)

Verbatim: "The list includes nine families of general techniques. By 'general technique' we mean that the technique is simple and universal enough to apply to a wide variety of contexts."

1. **Function Testing** — *Test what it can do.* (Identify functions → determine pass/fail signal → test each function → confirm it does what it should and not what it shouldn't.)
2. **Claims Testing** — *Challenge every claim.* (Gather reference materials with claims — SLAs, EULAs, ads, specs, help text, manuals — analyze and clarify vague claims, test each claim; if testing from an explicit spec, expect spec and product to be brought into alignment.)
3. **Domain Testing** — *Partition the data.* (Boundary values, typical values, convenient values, invalid values, best representatives; consider combinations; force the full output range.)
4. **User Testing** — *Involve the users.* (Identify user categories/roles, determine use cases, get real user data/logs or bring in real users, otherwise simulate carefully; use a variety of users/roles, not just one.)
5. **Stress Testing** — *Overwhelm the product.* (Find vulnerable sub-systems, select/generate challenging data or resource-constrained conditions: large/complex data, high loads, long runs, many test cases, low memory.)
6. **Risk Testing** — *Imagine a problem, then look for it.* (What could go wrong; which matters most; how would you detect it; design tests specifically to reveal it; consult experts/docs/past bug reports/risk heuristics.)
7. **Flow Testing** — *Do one thing after another.* (Chained activities, e.g. tours through a state model; don't reset between actions; vary timing/sequencing; try parallel threads.)
8. **Tool-Supported Testing** — *Use tools to make testers more powerful.* (Tools that perform/check a lot; partially automate coverage; partially automate oracles; automatic change detectors; automatic test data generators.)
9. **Scenario Testing** — *Test to a compelling story.* Verbatim: "A good scenario test is a compelling story of how someone who matters might do something that matters with the product."

### 10.4 Project Environment (verbatim category names; no single mnemonic name given in v6.0, though third-party sources call an earlier variant "CIDTESTD" — **[UNVERIFIED against this v6.0 primary source, which does not itself present a single-word acronym for this section]**)

Eight categories, verbatim names and one-line definitions from the source:

- **Mission** — *Your purpose on this project, as understood by you and your customers.*
- **Information** — *Information about the product or project that is needed for testing.*
- **Developer Relations** — *How you get along with the programmers.* (Sub-concepts: Rapport, Hubris, Defensiveness, Feedback loop, Feedback.)
- **Test Team** — *Anyone who will perform or support testing.*
- **Equipment & Tools** — *Hardware, software, or documents required to administer testing.* (Sub-concepts: Hardware, Automated Checking, Analytical Tools, Matrices & Checklists, Signals.)
- **Schedule** — *The sequence, duration, and synchronization of project events.* (Sub-concepts: Test Design, Test Execution, Development, Documentation.)
- **Test Items** — *The product to be tested.* (Sub-concepts: Scope, Availability, Interoperable Systems, Volatility, New Stuff, Testability, Future Releases.)
- **Deliverables** — *The observable products of the test project.* (Sub-concepts: Content, Purpose, Standards, Media.)

### 10.5 FEW HICCUPPS

Already reproduced verbatim and verified twice in §1.6 above — cross-referenced here because the assignment explicitly groups it with HTSM. Note FEW HICCUPPS is **not** part of the HTSM v6.0 PDF itself (that document does not mention oracles by name in the retrieved text) — it is a separate, companion Bach/Bolton heuristic, published on developsense.com, that the RST/HTSM ecosystem treats as a peer artifact for a different purpose (oracle-finding rather than test-idea-generation/coverage).

---

## 11. Weinberg

Source: recovered via WebSearch aggregation this session; not independently fetched as a full primary text (Weinberg's *Quality Software Management: Volume 1, Systems Thinking* is a print book) — **[secondary-sourced, but extremely widely and consistently attributed, high confidence]**.

> **Jerry Weinberg's original formulation: "Quality is value to some person(s)."** (*Quality Software Management, Vol. 1: Systems Thinking*, cited as appearing on p. 7.)

> **James Bach's extension, later also used by Michael Bolton: "…who matter(s)"** — yielding the commonly quoted combined form, **"Quality is value to some person(s) who matter(s)."**

**Why this matters for the skill (synthesis, not sourced):** the extension is not cosmetic. Weinberg's original leaves "value to whom" completely open — quality could trivially be maximized by picking a person who's satisfied with anything. Bach's "who matters" forces an explicit, examined judgment call about *whose* values the testing effort is actually serving (the paying customer? end users? a regulator? the on-call engineer at 3am?) — and different stakeholders can disagree about what's valuable, which is precisely why testing requires judgment (context-driven principle 3 and 7, §9) rather than a fixed checklist.

---

## 12. ISTQB vs context-driven / Stop 29119

### 12.1 What ISTQB claims — verbatim, from the current syllabus

Source: **ISTQB Certified Tester Foundation Level (CTFL) Syllabus v4.0.1**, dated **2024-09-15**, © International Software Testing Qualifications Board. Fetched as PDF (via a BCS mirror) and converted to text locally with `pdftotext` this session — this is a direct, verbatim primary-source extraction, not a secondary summary.

**The Seven Testing Principles, verbatim, in full (this supersedes any paraphrase found via search):**

> "A number of testing principles offering general guidelines applicable to all testing have been suggested over the years. This syllabus describes seven such principles.
>
> 1. **Testing shows the presence, not the absence of defects.** Testing can show that defects are present in the test object, but cannot prove that there are no defects (Buxton 1970). Testing reduces the probability of defects remaining undiscovered in the test object, but even if no defects are found, testing cannot prove test object correctness.
>
> 2. **Exhaustive testing is impossible.** Testing everything is not feasible except in trivial cases (Manna 1978). Rather than attempting to test exhaustively, test techniques..., test case prioritization..., and risk-based testing... should be used to focus test efforts.
>
> 3. **Early testing saves time and money.** Defects that are removed early in the process will not cause subsequent defects in derived work products. The cost of quality will be reduced since fewer failures will occur later in the SDLC (Boehm 1981). To find defects early, both static testing... and dynamic testing... should be started as early as possible.
>
> 4. **Defects cluster together.** A small number of system components usually contain most of the defects discovered or are responsible for most of the operational failures (Enders 1975). This phenomenon is an illustration of the Pareto principle. Predicted defect clusters, and actual defect clusters observed during testing or in operation, are an important input for risk-based testing...
>
> 5. **Tests wear out.** If the same tests are repeated many times, they become increasingly ineffective in detecting new defects (Beizer 1990). To overcome this effect, existing tests and test data may need to be modified, and new tests may need to be written. However, in some cases, repeating the same tests can have a beneficial outcome, e.g., in automated regression testing...
>
> 6. **Testing is context dependent.** There is no single universally applicable approach to testing. Testing is done differently in different contexts (**Kaner 2011**).
>
> 7. **Absence-of-defects fallacy.** It is a fallacy (i.e., a misconception) to expect that software verification will ensure the success of a system. Thoroughly testing all the specified requirements and fixing all the defects found could still produce a system that does not fulfill the users' needs and expectations, that does not help in achieving the customer's business goals, and that is inferior compared to other competing systems. In addition to verification, validation should also be carried out (Boehm 1981)."

**Notable and worth flagging explicitly: ISTQB Principle 6 directly cites "Kaner 2011"** — i.e., ISTQB's own foundational syllabus explicitly credits Cem Kaner, the co-author of the Context-Driven Testing principles (§9) and the harshest institutional critic of ISO 29119, as the source for the "testing is context dependent" principle. **This is real, primary-sourced common ground between the two "opposed" schools, not merely a rhetorical claim** — worth presenting to the reader as a genuine point of convergence underneath the institutional conflict.

Also notable: ISTQB's own syllabus explicitly points to **ISO/IEC/IEEE 29119-1** (for testing concepts) and **29119-2** (for test processes) as "further information" — confirming that ISTQB's syllabus and the ISO 29119 standard family are institutionally aligned/cross-referencing, which is precisely the alignment the context-driven school's Stop 29119 petition (§12.3) objects to.

### 12.2 ISTQB test levels and test types (verbatim, abridged)

Five test levels (verbatim names and one-line characterizations): **Component testing** (unit testing; isolated components, often by developers), **Component integration testing** (interfaces/interactions between components), **System testing** (overall system behavior, functional + non-functional), **System integration testing** (interfaces with other systems/external services), **Acceptance testing** (validation, readiness for deployment — UAT, operational, contractual, regulatory, alpha, beta).

Four test types: **Functional testing** (what the system should do), **Non-functional testing** (how well it behaves — citing **ISO/IEC 25010**'s eight characteristics: Performance efficiency, Compatibility, Usability, Reliability, Security, Maintainability, Portability, Safety), **Black-box testing**, **White-box testing** (implied structure; not fully quoted here).

### 12.3 The context-driven objection, and the Stop 29119 petition

**What the petition is:** the **"Stop 29119" petition**, at ipetitions.com/petition/stop29119, created **2014-08-28**, initiated by **Cem Kaner** (per context-driven-testing.com/please-sign-the-petition-to-stop-iso-29119, which is Kaner's own site page about it, dated the same day, and explicitly states he doesn't expect it to succeed but considers the protest itself important — verbatim: he'd rather "protest ... rather than simply accept its consequences in silence").

**Stated objections (verbatim/near-verbatim, from context-driven-testing.com and Bolton's FAQ, developsense.com/blog/2014/09/frequently-asked-questions-about-the-29119-controversy, 2014-09-02):**

1. **Philosophical incompatibility:** "ISO 29119 and context-driven testing represent 'opposite points of view.'" ISO 29119 "ignores the existence of the context-driven testing school" entirely.
2. **Process-over-substance critique (Bolton, verbatim):** ISO 29119 is "an overstructured process model, focused on relentless, ponderous, wasteful bureaucracy and paperwork, with negligible content on actual testing." And: "a moment that a tester spends on useless documentation is a moment in which she's not focused on identifying risks and finding problems."
3. **Rent-seeking / certification-industry critique:** the standard creates "opportunities for commercial exploitation" via certification and consulting products; a standard produced by "a relatively small portion of the software engineering community" who can "dominate the standards committees" and can afford to invest heavily in promoting it, without it representing a real practitioner consensus.
4. **Legal/regulatory risk (this is the sharpest, most concrete objection, worth surfacing prominently):** "The existence of a standard makes it easier for a court... to rule that the standard-approved approach is the professionally correct one" — i.e., once a voluntary standard exists, it can become a de facto legal benchmark for "professional" practice, exposing practitioners who use non-standard (including context-driven/exploratory) approaches to liability risk even where those approaches are more effective for a given context. Bolton, verbatim: once adopted by regulators or referenced in contracts, "'voluntary' standards become de facto mandatory," producing defensive compliance rather than genuine quality improvement.
5. **Terminology standardization objection:** Bolton "opposes mandating a 'common language' for testing," arguing this ignores real contextual differences across organizations and development approaches — directly downstream of Context-Driven Principle 1 ("The value of any practice depends on its context," §9).
6. **Skill-devaluation objection:** the standard's emphasis on process artifacts "displaces emphasis on 'the skill set and the mindset of the individual tester'" — which the context-driven school treats as the actual locus of testing quality (directly downstream of Principle 6/7, §9).

### 12.4 Presenting both sides fairly — synthesis

- **ISTQB's own position (steelmanned):** testing needs a shared vocabulary and a baseline body of knowledge to make hiring, training, and cross-team communication tractable at industry scale; the Seven Principles themselves (§12.1) are not, on their face, incompatible with context-driven thinking — Principle 2 ("exhaustive testing is impossible") and Principle 6 ("testing is context dependent," explicitly citing Kaner) are close cousins of Context-Driven Principles 1 and 2 (§9). The conflict is less about the *principles* (which substantially overlap) and more about **certification as an industry gatekeeping mechanism**, and about the **29119 process-standard's prescriptive documentation apparatus**, which context-driven testers see as testing-theater that substitutes paperwork for actual investigation.
- **Context-driven's position (steelmanned):** any *standard*, by definition, claims a "best" or "correct" way to do something — but Context-Driven Principle 2 explicitly denies that best practices (in the abstract, decontextualized sense) exist at all. A test-process standard that gets cited in contracts and courtrooms doesn't just describe practice, it starts to *define* what "professionally correct" testing looks like, which is a much higher-stakes claim than a training syllabus makes.
- **For the skill:** treat ISTQB's Seven Principles as legitimate, citable, and largely uncontroversial baseline epistemology (§12.1) — they are good raw material for an agent's reasoning about testing limits. Treat ISO 29119's *process prescriptions* (test plan documents, formal test level/type taxonomies as mandatory structure) as the actually contested layer, and treat "there is no best practice, only good practice in context" (Context-Driven Principle 2) as the operative tie-breaker whenever the skill has to choose between "follow the standard process" and "follow what this specific context needs."

---

## 13. Decision rules extracted

| Rule | Source | URL | Contested? |
|---|---|---|---|
| Every test needs an oracle; every oracle is heuristic and fallible (miss vs. false alarm) | Kaner | kaner.com/?p=190 | No — foundational, widely shared |
| When no full oracle exists, decompose into partial oracles (regression, constraint, self-verifying data, inverse, statistical/state/interaction model, etc.) | Kaner/Hoffman | kaner.com/?p=190 | No |
| Use FEW HICCUPPS to generate candidate expectations when no spec exists (Familiarity, Explainability, World, History, Image, Claims, Comparable Products, User Desires, Product, Purpose, Statutes) | Bach & Bolton | developsense.com/blog/2012/07/few-hiccupps | No — but explicitly "to be applied, not followed" |
| A consistency heuristic that's great for human sapient idea-generation can be simultaneously useless for programming an automated check — that's expected, not a flaw | Kaner | kaner.com/?p=190 | No |
| Never equate "all automated checks passed" with "the software is fine" — checking only certifies encoded propositions, not unencoded ones | Bach & Bolton | satisfice.com/blog/archives/856 | No — but frequently violated in practice, hence worth stating as a rule |
| Testing ⊃ Checking; checking cannot encompass testing | Bach & Bolton | satisfice.com/blog/archives/856 | Yes — disputed by heavy-automation practitioners who conflate the two; central CDT/RST claim |
| "Good enough" (sufficient benefit, no critical problems, benefit>cost, further improvement net-harmful) is a legitimate acceptance gate, not a failure state | Bach | egr.msu.edu (secondary of 1997 IEEE Computer article) | No, but often culturally resisted |
| Apply a *named* stopping heuristic deliberately (Time's Up, Piñata, Dead Horse, Mission Accomplished/Revoked, I Feel Stuck, Pause That Refreshes, Flatline, Customary Conclusion, No More Interesting Questions, Avoidance/Indifference, Mission Rejected) rather than stopping by default | Bolton (+Kaner for Mission Rejected) | developsense.com/blog/2009/09/when-do-we-stop-test | No |
| Frame untested areas using Quality Criteria Categories (CRUSSPIC STMPL + Charisma) as an explicit residual-risk checklist | Bach | HTSM v6.0 PDF, satisfice.com/tools/htsm.pdf | No |
| The value of any practice depends on context; there are no best practices, only good practices in context | Kaner, Bach, Pettichord | context-driven-testing.com | **Yes — the central ISTQB/ISO 29119 fault line** |
| Testing is context dependent (Principle 6) | ISTQB (citing Kaner 2011) | ISTQB CTFL Syllabus v4.0.1, §1.3 | No — genuine convergence point between the "opposed" schools |
| Exhaustive testing is impossible / testing shows presence not absence of defects | ISTQB Principles 1 & 2 | ISTQB CTFL Syllabus v4.0.1, §1.3 | No — close cousin of CDT thinking despite institutional rivalry |
| Don't pin a technique (esp. exploratory testing) to a single quadrant/phase — most techniques and stances apply everywhere | Bach & Bolton | developsense.com/presentations/2019-05-RefactoringtheAgileTestingQuadrants.pdf | **Yes — direct critique of ISTQB's own §5.1.7 quadrant treatment** |
| A standard that gets cited in contracts/courts becomes a de facto "professionally correct" benchmark, creating liability risk for non-standard (including exploratory/context-driven) approaches | Kaner / Bolton | context-driven-testing.com/please-sign-the-petition-to-stop-iso-29119; developsense.com/blog/2014/09/frequently-asked-questions-about-the-29119-controversy | **Yes — this is the sharpest, most concrete Stop-29119 argument** |
| Quality is value to some person(s) who matter(s) — always name whose values are being served | Weinberg + Bach | (secondary-sourced; *Quality Software Management, Vol. 1*, p.7 + Bach's extension) | No |
| Use the "Explore <target> with <resources> to discover <information>" template to generate exploratory charters | Hendrickson | *Explore It!* (secondary-sourced) | No |
| Report TBS proportions (Test design/execution, Bug investigation, Setup) per session for transparency into where time actually went | J. Bach / J. Bach (SBTM) | secondary-sourced, satisfice.com/download/session-based-test-management (landing page only) | No |

---

## 14. [UNVERIFIED] items — full list, with reasons

1. **Doug Hoffman's oracle taxonomy — individual item definitions** (Constraint oracle, Regression oracle, Self-verifying data, Physical model, Business model, Statistical model, State model, Interaction model, Calculation oracles, Inverse oracle, Reference program). Names confirmed via kaner.com/?p=190; per-item definitions not independently verified — kaner.com/pdfs/PNSQCoracleTutorial.pdf 404'd. (§1.4)
2. **Metamorphic testing (Chen et al.)** — no primary source fetched this session; description given is a general characterization only, explicitly flagged as such. (§1.8)
3. **Cem Kaner's exact-wording definition of testing** ("empirical, technical investigation...") — recovered via WebSearch aggregation of BBST-affiliated sources, not a direct primary-source fetch this session. High confidence given consistency across sources, but not independently verified against a kaner.com page. (§1.5, §7.1)
4. **SBTM's full primary-source text** (charter format specifics beyond what's inferable from "Exploratory Testing Explained," the exact session-report template, and the PROOF debrief mnemonic) — the primary satisfice.com PDF could not be downloaded (client-side download link); PROOF is cross-confirmed across several independent secondary sources with consistent wording but not verified against the primary PDF. (§0, §5.2–5.4)
5. **Marick's original 2003 blog posts** (exampler.com/old-blog/2003/08/21 and /08/22) — TLS certificate failure prevented direct access; content recovered via a high-provenance secondary source (Bach & Bolton's 2018/2019 conference deck, which reproduces the diagram directly while citing and linking the same URLs, and which has no motive to misrepresent Marick favorably since they're critiquing him). (§0, §8.1)
6. **Ipetitions.com/petition/stop29119 exact original petition text and signature count** — HTTP 403; existence, date, and creator confirmed via context-driven-testing.com and developsense.com secondary pages instead. (§0, §12.3)
7. **BINMEN, POISED, VADER, MOBILE APP TESTING, RCRCRC, FAILURE, WWWWWHKE, TORCH, MCOASTER, TuTTu/TaTTa, SACRED, TRIMS** (named mnemonics referenced within the current Hendrickson/Lyndsay/Emery Test Heuristics Cheat Sheet index) — names confirmed, but letter-by-letter expansions were NOT retrieved this session (the fetched pages gave only a categorized table of contents, not the full document body). An agent needing these must fetch ministryoftesting.com/articles/test-heuristics-cheat-sheet directly and read the full body before using any of these mnemonics letter-by-letter. (§6.2)
8. **"Cem Kaner's critique of best practices"** as a distinct, dedicated essay — was not separately located and fetched this session as its own primary artifact. What was found instead (§7.3) is a narrower critique of consistency heuristics for automation, plus the general "no best practices" claim embedded in Context-Driven Principle 2 (co-authored by Kaner). Do not conflate these into a single quote.
9. **"Testing, Checking, and Changing the Language"** (Bolton) — title and existence confirmed via the 2025 "Checking is Inside Testing" post's own references list; not independently fetched. (§2.3)
10. **developsense.com/blog/2013/02/manual-and-automated-testing** — referenced by the Bach/Bolton 2019 deck as further reading on why "manual vs. automated testing" is a category error; not independently fetched this session. (§8.4)
11. **Exact CIDTESTD-style single-word mnemonic name for HTSM's "Project Environment" section** — the current v6.0 primary source (fetched and read in full) does not itself present a one-word acronym for this section; a third-party search result claimed the name "CIDTESTD," which does not obviously map to the current category list (Mission, Information, Developer Relations, Test Team, Equipment & Tools, Schedule, Test Items, Deliverables) and is treated as possibly reflecting an older HTSM version's category set. Do not use "CIDTESTD" as if it were confirmed against the current v6.0 text. (§10.4)
12. **ISTQB Foundation Level Syllabus's exact treatment of "test techniques overview," "white-box testing," and other chapters beyond §1.3/§2.2/§5.1.7** — the full document (78 pages) was fetched and converted to text, but only the sections directly relevant to this cluster's brief (principles, levels/types, quadrants) were read in this session; other chapters were not reviewed and should not be assumed covered.
