# Quality Skill — Web-Canon Corpus (Channel: literature)

**Date of research: 2026-07-26.** Every volatile fact below is stamped to that date.
**Channel lead:** Opus, with four Sonnet workers on disjoint clusters (raw files in `_raw/canon-w1..w4.md`,
plus the lead's own cluster in `_raw/canon-lead.md`).

## Why this channel exists

The competitive channel returned **NARROW**: a decent neutral QA router already exists
(`petrkindlmann/qa-skills`, 50 skills). What an exhaustive grep across 50 competing skills could not
find — every term returning **zero** — was the *judgment layer*: `residual risk`, `oracle problem`,
`what not to test`, `evidence dossier`, `abuse case`, `compatibility matrix`, `suite runtime budget`.

The finding of this channel is that **six of those seven terms are not novel at all. They are old, they
are well-theorised, and several of them are in international standards.** They are simply absent from
the agent-skills ecosystem. The differentiator for this skill is not invention; it is *transmission* —
carrying a mature literature that practitioners stopped reading into a place where agents will act on it.

Two finds carry the section on their own, and neither was on the original research plan:

1. **The evidence dossier already exists as a standardised object.** It is called an **assurance case**,
   and **ISO/IEC 15026-2:2011** specifies its required contents. Uncertainty and conditions-of-applicability
   are `shall`-level required fields of every claim. Nobody in the skills ecosystem cites it.
2. **"Residual risk" as a verification concept is traceable to a 1999 security paper** — McDermott &
   Fox's abuse-case paper — which also supplies, in the same three paragraphs, verification-as-refutation,
   assurance-strength grading by method, and risk-ranked budget allocation.

---

## 0. THE CONVERGENCE — three channels, three directions, one conclusion

**This is the strongest structural argument the research has produced, and no competitor has written it
down.** Three independent channels, working from disjoint evidence, arrived at the same conclusion:
**a verification result cannot be binary, because the thing producing it cannot decide every case.**

| Direction | Finding | Source | Verified by |
|---|---|---|---|
| **Theory** | An oracle *"helps you decide"* whether a test passed — it does not *"tell you."* Oracles are heuristic devices that *"sometimes point us to the wrong decision."* A fallible oracle **cannot** produce a binary truth. | Kaner, kaner.com/?p=190 (2012) | this channel (W2) |
| **Standards** | ACT Rules carry a formal three-valued **EARL test-mode split: `automatic` / `manual` / `semiAuto`**, with real rules producing "further testing needed" outcomes. A standards body has already formalised "the tool could not decide." | W3C ACT Rules | **github channel** |
| **Tooling** | axe-core ships an **`incomplete` / "needs review"** result class, and **55% of its 105 documented rules can return it.** The single most-used a11y engine in the world tells you, in the majority of its rules, that it might not know. | axe-core | **github channel** |

**These map one-to-one onto the evidence-state vocabulary the skills channel found**
(`observed` / `inferred` / `not_tested` / `blocked`). Theory says a binary verdict is *epistemically*
unavailable; standards say the *specification* already has a third value; tooling says the *implementation
already emits it*. The vocabulary is not an invention of this skill — it is the name for something three
independent bodies of work already require.

> **Cross-channel attribution.** The ACT test-mode and axe-core rows above were **source-verified by the
> github channel, not by me.** They are reproduced here as cross-channel findings with that provenance
> attached, per the same discipline the rest of this corpus applies to secondary sources. Do not
> re-derive them — the lead has ruled that boundary closed.

**One folk number is settled, and settled the right way.** The commonly repeated claim that automated
tooling detects only a minority of WCAG issues now has a real figure and a real provenance:

- **57%** — Deque, 2021, with methodology captured. `[github-channel verified]`
- **80.39%** — the widely circulated figure — **flagged UNCONFIRMED.** `[github channel]`
- The **~30%** figure that circulates in practitioner folklore was searched for by W4 in this channel and
  **no citable source was found.** See §5.2.

And a second boundary worth carrying: **axe's four impact levels are not WCAG conformance levels.**
`[github-channel verified]` A tool's severity vocabulary and a standard's conformance vocabulary are
different namespaces, and conflating them is the accessibility-specific instance of I5.

---

## 1. THE JUDGMENT LAYER

The headline section. Assembled from the strongest available primary treatment of six questions:
*what is an oracle · what do we deliberately not test · what risk remains after the gate · what is
evidence as opposed to assertion · testing vs checking · how is verification effort allocated by risk.*

### 1.1 Evidence vs. assertion — the assurance case

`[FULL DETAIL: §3.5 below and _raw/canon-lead.md §1]`

**ISO/IEC 15026-2:2011(E)**, *Systems and software engineering — Systems and software assurance —
Part 2: Assurance case*. Read directly from the IEEE-adoption PDF and extracted locally with pypdf, so
every quotation here was read from the standard's own text rather than a fetch summary.
https://wildart.github.io/MISG5020/standards/ISO-15026-2.pdf · https://www.iso.org/standard/52926.html

Scope, verbatim:

> "An assurance case includes a top-level claim for a property of a system or product (or set of
> claims), systematic argumentation regarding this claim, and the evidence and explicit assumptions
> that underlie this argumentation. Arguing through multiple levels of subordinate claims, this
> structured argumentation connects the top-level claim to the evidence and assumptions."

And the posture the skill should copy exactly, verbatim:

> "This part of ISO/IEC 15026 does not place requirements on the quality of the contents of an
> assurance case. Rather, it places requirements on the **existence** of the contents and structure of
> an assurance case."

**The single most useful clause in the standard — §6.3.2, claim contents, verbatim:**

> "a) Claim's property (required).
> b) Limitations on the value of the property associated with the claim (e.g., on its range) (required).
> c) **Limitations on the uncertainty of the property value meeting its limitations (required).**
> d) Limitations on duration of claim's applicability (optional).
> e) Duration-related uncertainty (optional).
> f) **Limitations on conditions under which the claim is applicable (required).**
> g) Condition-related uncertainty (optional).
> h) If a property in a claim applies to some subset of systems, products, or their elements, their
> identification including relevant versions or instances (conditionally required).
> i) Consequences or risks if they are relevant to claim (conditionally required)."

A claim without stated **uncertainty** (c) and without stated **conditions of applicability** (f) is
non-conforming. That is residual risk as a schema obligation, published in 2011. (d) is the expiry date
on an accepted risk. (h) binds the claim to a build.

**The anti-extrapolation rule, §6.3.3, verbatim:**

> "The conditions, including any specified durations, covered by the combination of assurance case
> components supporting a claim shall together cover the conditions, including any specified duration,
> for which the claim is applicable."

This is the standards-grade form of *never infer an untested surface from a tested one*, and of the
compositional fallacy (a design-system pass is not a product-workflow pass).

**The assertion/evidence boundary, Figure 1 + §6.6.2, verbatim:**

> "Evidence is either a fact, a datum, an object, a claim or an assurance case. **A claim is called an
> assumption if it appears in an assurance case as evidence.**"

> "The third kind of an assumption is not inherently true; rather **it is a claim not fully warranted by
> evidence**."

An unsupported proposition placed in the evidence set is *an assumption, not evidence*, and must be
labelled with the basis of its uncertainty. This is the `observed` vs `inferred` distinction with
standards backing.

**And the duty to carry the case against yourself, §6.6.3, verbatim:**

> "If an assumption is partially warranted or **contradicted by evidence**, this evidence shall be
> associated with it."

Plus §6.4.2 and §6.5.1 NOTEs: arguments and evidence may "**detract from**" claims. Counter-evidence is
in scope by construction, not an optional courtesy.

**Three further `shall`s that map one-to-one onto the skill's design:**

> §6.2(d) "A claim, argument, evidence, or assumption shall not support itself either directly or
> indirectly." — *"it passes, therefore it is correct" is a structural violation.*

> §6.3.4 "Because the choice of a top-level claim and its property is critical ... a top-level claim
> shall have a justification for its choice." — *you must justify what you chose to verify.*

> §7.2(b) "Cover all the contents specified in Clause 6 **unless documented justification is provided
> for doing otherwise.**" — *you may leave a part out, but you must say why. Silence is non-conformance;
> a stated gap is conformance.* This is "what we deliberately did not verify", standardised.

> §7.1(a) NOTE "As an element of the system, the assurance case is generally expected to be delivered
> with the system and **maintained as the system is maintained**." — *the dossier expires when the
> system moves.*

> §7.1(d) "**Identification of the entity or entities asserting conformance** shall be provided in the
> assurance case." — *assurance is signed.*

**Evidence metadata, §6.5.2, verbatim** — the hook for grading agent-produced evidence:

> "Evidence shall contain or have associated with it information regarding its:
> a) Definition. b) **Scope of applicability.** c) **Uncertainty, including the reliability of its
> source (e.g., authenticity, trustworthiness, and competence) and the measurement accuracy.**"

A screenshot an agent says it took and a CI artifact with a run URL are not the same evidence tier, and
the standard already requires you to say which.

**The best one-line model of a release claim**, from UK Defence Standard 00-56 Issue 4 (Part 1) via
https://en.wikipedia.org/wiki/Safety_case — note both qualifiers:

> "a structured argument, supported by evidence, intended to justify that a system is **acceptably**
> safe **for a specific application in a specific operating environment**."

Not "safe". Not "safe everywhere".

**The counterweight — assurance arguments are routinely fallacious.** Greenwell, Knight, Holloway &
Pease, *"A Taxonomy of Fallacies in System Safety Arguments"*, 24th International System Safety
Conference, August 2006 — cited in ISO/IEC 15026-2's own bibliography as reference [1]
`[lead-verified in the standard's PDF]`. The paper's contents could not be extracted
`[UNVERIFIED — see §6]`, but the existence of a live 2024–2026 literature on assurance **"defeaters"**
and **"assurance weakeners"** is itself the finding: the field's current frontier is *what undermines a
case*. Any skill shipping a dossier must ship the adversarial read of it too — and 15026-2 §1 concedes
the point in its own scope.

### 1.2 Residual risk and risk-based allocation — the abuse case

`[FULL DETAIL: §3.5 below and _raw/canon-lead.md §4b]`

**John McDermott and Chris Fox, "Using Abuse Case Models for Security Requirements Analysis",
Proceedings of the 15th Annual Computer Security Applications Conference (ACSAC), December 1999.**
https://www.acsac.org/1999/papers/wed-b-1030-john.pdf — downloaded and extracted locally with pypdf;
**every quotation below was read from the paper's own text.**

`abuse case` was one of the seven zero-hit terms. The paper that coined it turns out to contain the
best statement in this entire corpus of *why* a verification skill needs a residual-risk object.

Definition, verbatim:

> "We define an abuse case as a specification of a type of complete interaction between a system and
> one or more actors, where the results of the interaction are harmful to the system, one of the
> actors, or one of the stakeholders in the system."

Harm, not mere compromise, verbatim:

> "We cannot define completeness just in terms of coherent transactions between actors and the system.
> Instead, we must define abuse in terms of interactions that result in **actual harm**. ... it may be
> possible to define an interaction that reveals a session key to an actor that should not see the
> session key. However, we would not call this interaction an abuse case, because no actor has used the
> compromised key to divulge the contents of a message or make an unauthorized change to stored data.
> If we extend the interaction to include the posting of the key on a public web site then we have an
> abuse case."

**The key passage — verification as refutation, assurance strength, budget allocation, and residual
risk, all in three paragraphs, verbatim:**

> "During the design and testing phases of a security engineering process, we can apply abuse cases
> through a **refutation process**. As we analyze and design the system, we refute each use case to the
> appropriate level of assurance. ... For example, we may argue that 40-bit cryptographic keys are
> sufficient to refute an abuse case involving a Script Kiddie actor, because of their specified
> resource limitations, but not against a Nazgul."

> "**The strength of the refutation can be used to characterize the assurance we have.** A refutation
> arrived at during an informal code walk through is not as strong as a refutation based on formal
> methods. **Abuse cases can be ranked or weighted according to the assurance that should be applied to
> them. The assurance budget for a project can then be allocated by abuse case, according to the
> ranking.**"

> "Customers will be better informed when choosing between modified functionality in a use case and the
> **residual risk in an unrefuted abuse case**."

That last sentence — published 1999 — is the concept the competitive channel found *zero* times across
fifty competing skills. And it arrives with a mechanism:

1. Enumerate harms per adversary, **"primarily on the basis of skills and resources."**
2. **Refute** each — verification is refutation, not confirmation.
3. **The strength of the refutation method is the assurance level** (walkthrough < formal methods).
   Assurance is a graded property of the *argument*, not a boolean.
4. **Allocate the assurance budget by ranking.** Risk-based altitude allocation, 1999.
5. Whatever is **unrefuted is residual risk**, surfaced to the decision-maker as an explicit trade-off.

Scope of adversary is an explicit recorded decision, verbatim: *"we describe the range of privileges
that might be used to accomplish the abuse, **up to the maximum we intend to deal with**."* Anything
beyond is out of scope *by decision*, which is exactly the shape a "what we deliberately do not verify"
statement needs.

And on discarding candidate risks, verbatim: **"We must be cautious when discarding an abuse case as
unlikely."** The discard is itself a recorded decision.

The authors' own limits, verbatim — worth carrying so the technique is not oversold:

> "**We intentionally make abuse case models ambiguous and incomplete and do not worry about their
> soundness.** ... The same qualities that make them powerful in security requirements analysis render
> them unfit as tools for high assurance."

`[NEGATIVE RESULT]` **https://owasp.org/www-community/Abuse_Case returns HTTP 404.** OWASP has no
abuse-case community page at that path. The concept is thin in the most-consulted practitioner
reference too, which strengthens the wedge rather than weakening it.

### 1.3 The oracle problem

`[FULL DETAIL: §3.2 below and _raw/canon-w2.md §1]`

**The strongest formulation found is Cem Kaner's, and its force is in a single word-change he made to
his own definition.** Source: kaner.com/?p=190, *"The Oracle Problem and the Teaching of Software
Testing"*, 11 September 2012.

The classical definition, verbatim:

> "a software testing oracle [is] a tool that tells you whether the program passed your test"

Kaner's revision, verbatim:

> "a software testing oracle is a tool that **helps you decide** whether the program passed your test"

**"Tells you" → "helps you decide."** That edit converts the oracle from a verdict-machine into a
heuristic device, and it is the whole judgment layer in one substitution. Kaner then states the
consequence directly, verbatim:

> "Oracles are heuristic devices: they are useful tools that help us make decisions, but sometimes they
> point us to the wrong decision."

And names the two failure modes in decision-theoretic terms, verbatim:

> "you might make either of the classic mistakes of decision theory: The *miss*: you believe the program
> has passed even though it did something wrong. The *false alarm*: you believe the program has failed
> even though it has behaved appropriately."

Together these are the citable form of *you cannot test without an oracle, and every oracle is fallible*.
Kaner does not write that sentence, but the two quotes jointly assert exactly it.

**Lineage.** Kaner credits **Elaine Weyuker's 1980 "On Testing Nontestable Programs"** as foundational —
the paper arguing some programs are inherently unverifiable because no independent oracle exists.
**Doug Hoffman** presented an oracle taxonomy at Quality Week in 1998, which Kaner incorporates. The
taxonomy's *names* — Constraint oracle · Regression oracle · Self-verifying data · Physical model ·
Business model · Statistical model · State model · Interaction model · Calculation oracles · Inverse
oracle · Reference program — are confirmed, but `[UNVERIFIED]` the per-item definitions could not be
retrieved (kaner.com/pdfs/PNSQCoracleTutorial.pdf 404'd). Treat as a checklist of **partial-oracle
strategies to investigate**, not as fully specified techniques.

**The practical answer to "I have no oracle": FEW HICCUPPS.** Bach & Bolton's consistency heuristic —
an oracle is *"a way of recognizing a problem"*, and each letter names a kind of consistency whose
violation signals a possible bug. Verified twice against developsense.com/blog/2012/07/few-hiccupps
(published 23 July 2012, edited 2016-12-18 and 2017-01-26):

| | Name | Description |
|---|---|---|
| **F** | Familiarity | "We expect the system to be **inconsistent** with patterns of familiar problems." |
| **E** | Explainability | "We expect a system to be understandable to the degree that we can articulately explain its behaviour to ourselves and others." |
| **W** | World | "We expect the product to be consistent with things that we know about or can observe in the world." |
| **H** | History | consistent with past versions of itself |
| **I** | Image | consistent with the image/brand/reputation the organization wants to project |
| **C** | Claims | consistent with things important people say about it (docs, specs, marketing) |
| **C** | Comparable Products | consistent with comparable or competitive products |
| **U** | User Desires | consistent with ideas about what reasonable users might want |
| **P** | Product | each element consistent with comparable elements in the same system |
| **P** | Purpose | consistent with the explicit and implicit uses people might put it to |
| **S** | Statutes / Standards | "We expect a system to be consistent with relevant statutes, acts, laws, regulations, or standards." |

The "F" is placed first deliberately (hence "(F)EW HICCUPPS", not a clean acronym) because testers
usually start from familiar-problem patterns. Bolton's own caveat, verbatim: these heuristics are
**"fallible and context-dependent; to be applied, not followed."** The pre-2012 original was plain
**HICCUPPS** (items 4–11), without F/E/W.

**And the sharpest limit on the heuristic, from Kaner, verbatim** — a genuine disagreement inside the
same school:

> "I don't find them helpful for designing tests" — and specifically **"worthless for designing
> automated tests"** because **"the consistencies don't guide testers toward oracle ideas that are
> specific enough to be programmed."**

That is not a flaw in the heuristic; it is the testing/checking distinction appearing from the other
side. A device that is excellent for human idea-generation can be useless as a machine specification.

### 1.4 Testing vs checking

`[FULL DETAIL: §3.2 below and _raw/canon-w2.md §2]`

**The current formal definitions** — Bach & Bolton, *"Testing and Checking Refined"*, satisfice.com/blog/archives/856,
originally **March 2013** (the page's 2024-08-10 timestamp reflects a re-save; the companion post at
developsense.com/blog/2013/03/testing-and-checking-redefined is dated 29 March 2013 and refers back to
James' post of "March 26 or so"). Verbatim:

> **Testing:** "The process of evaluating a product by learning about it through experiencing,
> exploring, and experimenting, which includes to some degree: questioning, study, modeling,
> observation, inference, etc."

> **Checking:** "The mechanistic process of verifying propositions about the product."

> **Human Checking:** "An attempted checking process wherein humans verify propositions without the
> mediation of tools."

> **Machine Checking:** "A checking process wherein tools verify propositions without the mediation of
> humans."

> **Human/Machine Checking:** "An attempted checking process wherein both humans and tools cooperate to
> verify propositions about the product."

The structural claim, verbatim:

> "Testing encompasses checking, but checking cannot encompass testing."

And on the limit of machines, verbatim:

> "Humans can perform motivated actions; tools can only exhibit programmed behaviour."

**Two nuances that are usually lost and that this corpus should preserve:**

1. **The 2009 original is superseded and the authors walked it back.** Bolton's 2009 post
   (developsense.com/blog/2009/08/testing-vs-checking) framed checking as *"a process of confirmation,
   verification, and validation"* motivated by *"confirming existing beliefs"*, and used the
   **"sapient / non-sapient"** vocabulary. That page now carries a postscript: *"Please read the new
   version first."* The authors **abandoned "sapience" because it implied tool-supported work was
   inherently inferior.** Anyone citing the 2009 framing is citing a retracted version.
2. **The 2025 position is stronger still: checking is *inside* testing.** Bolton,
   developsense.com/blog/2025/04/checking-is-inside-testing, April 2025 — checking is a component
   activity performed *within* testing, not an opposing activity and not a substitute for it.

**The operative rule for an agent:** a check can only evaluate a proposition that some human already
decided was worth asking and phrased precisely enough for a machine. Automation cannot notice a problem
nobody thought to ask about, cannot judge whether an observed difference matters, and cannot decide it
has learned enough. **"All checks passed" certifies only that the propositions someone encoded are still
true. It says nothing about propositions nobody encoded.**

### 1.5 What we deliberately do not test

`[FULL DETAIL: §3.2 below and _raw/canon-w2.md §3]`

Four independent sources converge, and none of them treats deliberate non-coverage as a failure.

**Bach, "Good Enough Software", IEEE Computer 30(8), August 1997** `[secondary reproduction —
egr.msu.edu; the satisfice.com primary PDF was not fetched]`. The four-part definition:

> 1. "It has sufficient benefits."
> 2. "It has no critical problems."
> 3. "The benefits sufficiently outweigh the problems [that remain]."
> 4. "Further improvement would be more harmful than helpful" in the present situation.

And the load-bearing sentence, verbatim:

> "**Good Enough has nothing to do with mediocrity. It has to do with rational choices, as opposed to
> compulsive behavior.**"

Testing everything conceivable is framed as *compulsive*, not virtuous.

**Bolton's stopping heuristics** (developsense.com/blog/2009/09/when-do-we-stop-test, 11 September 2009).
The framing first: *"we can't know for sure when we're done, because any approach to answering the
stopping question is necessarily heuristic."* The eleven:

**The Time's Up!** · **The Piñata** (stop after "the first sufficiently dramatic problem") · **The Dead
Horse** · **The Mission Accomplished** · **The Mission Revoked** · **The I Feel Stuck!** · **The Pause
That Refreshes** (temporary, not a true stop) · **The Flatline** · **The Customary Conclusion** ·
**No More Interesting Questions** · **The Avoidance/Indifference** heuristic — this last one explicitly
presented as something to *notice and question in yourself*, not to endorse. Kaner later adds
**Mission Rejected** (the tester declines on ethical grounds).

**The point of the list is not to pick one.** It is a device for making a tester notice which heuristic
they are already acting on, so stopping is examined rather than automatic. An agent should **say which
heuristic it stopped on.**

> **These eleven are the missing half of the release gate, and this is the corpus's most directly
> actionable finding.** Every competitor's gate answers *"did the checks pass?"* — an input question.
> **None answers *"have we looked hard enough to stop looking?"*** — and without that second answer, a
> residual-risk statement is decorative. "Residual risk: low" means nothing if the stopping rule was
> *Time's Up!* or, worse, *Avoidance/Indifference*. It means something quite different if the rule was
> *No More Interesting Questions* against a ranked risk model.
>
> **The gate should therefore carry three fields, not one:** the checks' result · **the stopping
> heuristic invoked** · and Bach's four-part good-enough judgment (sufficient benefit · no critical
> problems · benefit outweighs remaining problems · further improvement net-harmful). The first is what
> the ecosystem already has. The second and third are what nobody has written down, and together they
> are the strongest available answer to the question this skill exists to ask.

**Bach's HTSM v6.0** (8 February 2024, satisfice.com/tools/htsm.pdf, read in full as PDF) states the
epistemics outright, verbatim:

> "**You can never know the 'actual' quality of a software product—you can't 'verify' quality, as
> such**—but by performing tests, you can make an assessment, and that takes the form of a **story** you
> tell (including bugs, curios, etc.)."

The output of testing is never "quality confirmed." It is a **bounded story**, and everything the story
did not cover is unknown *by construction, not by oversight*. That is the cleanest available statement
of why residual risk is structural rather than a sign of sloppy work.

**And the standards side agrees**, from §1.1: ISO/IEC 15026-2 §7.2(b) permits omitting required dossier
content *"unless documented justification is provided for doing otherwise"* — silence is
non-conformance, a stated gap is conformance.

### 1.6 Risk-based altitude allocation

The literature offers three independent formulations, from three different decades and traditions:

1. **McDermott & Fox 1999** (§1.2): rank abuse cases; *"The assurance budget for a project can then be
   allocated by abuse case, according to the ranking."* Assurance strength graded by refutation method.
2. **OWASP ASVS 5.0.0** (§3.4): L1/L2/L3, where the level determines not just *how many* requirements
   but *what access the verifier needs* — L1 is black-box-achievable, L2/L3 require source, architecture
   and people. **The best existing model of "how much verification is warranted."**
3. **Bach's HTSM Quality Criteria** (§3.2): CRUSSPIC STMPL as a checklist of risk *dimensions*, where
   *"Each of the items on this list can be thought of as a potential risk area."*

`[Contested]` W1's cluster shows the *shape* traditions (pyramid/trophy/honeycomb) allocate by
architecture rather than by risk, and Fowler — quoting Justin Searls — argues the ratio question is
*"a distraction"* altogether. See §4.

### 1.7 Evidence quality and the limits of coverage

`[FULL DETAIL: §3.3 below and _raw/canon-w3.md §1–3]`

The judgment layer needs an answer to *"we have 90% coverage and a green suite — what does that
establish?"* The literature's answer is: **less than you think, and the shortfall is structural.**

**Marick, 1997 — the unfixable blind spot**, verbatim:

> "**It can only tell me how the code that exists has been exercised. It can't tell me how code that
> ought to exist would have been exercised.**"

Coverage cannot measure the absence of code. **Faults of omission** — *"those that are fixed by adding
new code"* — are invisible to every coverage tool by construction. And his heuristic for what a coverage
gap actually signals, verbatim: *"If a part of your test suite is weak in a way that coverage can detect,
it's likely also weak in a way coverage can't detect."* A coverage gap is a **clue about the tester**,
not just a gap in the code.

**Inozemtseva & Holmes, ICSE 2014 — the empirical settlement.** 31,000 suites, five systems, up to
724,000 SLOC — the largest such study at the time. Verbatim:

> "**coverage, while useful for identifying under-tested parts of a program, should not be used as a
> quality target because it is not a good indicator of test suite effectiveness.**"

With the decisive detail: control for suite size and the correlation collapses — to *"essentially zero"*
on one project and **negative (−0.35)** on another. And stronger coverage types add nearly nothing
(τ ≈ 0.91–0.92 between statement, decision and MC/DC).

**Google, ICSE-SEIP 2018 — the same mistake one level up.** Google abandoned mutation *score* because it
was infeasible and, critically, verbatim: *"we were also unable to find a good way to surface it to the
engineers in an actionable way."* **The failure mode of an assurance metric is not inaccuracy — it is
un-actionability.** A number that cannot be turned into a decision is not evidence.

**Fowler, 2011 — why a flaky suite is worse than no suite**, verbatim:

> "**Once you start ignoring a regression test failure, then that test is useless and you might as well
> throw it away.** ... **Once that discipline is lost, then a failure in the healthy deterministic tests
> will get ignored too.**"

Evidence integrity is **contagious in both directions**. This is the strongest argument in the corpus
that suite health is not hygiene but an evidence-validity question: a suite with a known flake rate
produces results whose meaning has already decayed.

**And the honest positive case**, from Facebook's predictive test selection: *"over 95% of individual test
failures and over 99.9% of faulty changes are still reported"* at half the cost. Note the shape — a
**quantified, bounded, deliberately accepted miss rate.** That is what a residual-risk statement looks
like when someone actually does the work.

---

## 1b. WHAT THIS EVIDENCE DOES NOT ESTABLISH

**The operational form of the oracle problem, one row per evidence type.** Every row is the same move:
a tool produced a green result; name precisely what that green result *cannot* speak to. This is the
table the competitive set gestures at and never writes down.

Each "does not establish" claim is sourced. Where the source is another channel, it is marked.

| Evidence produced | What it establishes | **What it does NOT establish** | Source |
|---|---|---|---|
| **A passing unit/integration suite** | The propositions someone encoded are still true. | Anything about propositions nobody encoded. *"Testing encompasses checking, but checking cannot encompass testing."* | Bach & Bolton 2013 |
| **High code coverage** | Which lines were executed. | Whether the code that *should* exist is missing. *"It can't tell me how code that ought to exist would have been exercised."* Faults of omission are invisible by construction. And empirically, controlling for suite size, coverage/effectiveness correlation collapses — to ~0 on one project, **−0.35** on another. | Marick 1997; Inozemtseva & Holmes ICSE 2014 |
| **A high mutation score** | Synthetic simple faults are detected. | That it means anything actionable at scale — Google dropped the aggregate score because it was *"unable to be surfaced to engineers in an actionable way."* Also: equivalent mutants are **undecidable**, so the denominator is never exactly known. | Petrović & Ivanković 2018; Jia & Harman 2011 |
| **A green suite that retries on failure** | That some run eventually passed. | That the failure was noise. ~**1 in 6** flaky-to-fixed transitions at Google traced to a real production bug; **24%** of flaky fixes changed the code under test. Retry-to-green discards that signal. | Listfield 2017 `[low-confidence]`; Luo et al. FSE 2014 |
| **A passing automated a11y scan** | A bounded set of machine-detectable failure patterns is absent from one page state. | Full pages · complete processes · **accessibility-supported** AT compatibility · non-interference — WCAG conformance requirements 2–5, none of which a scanner touches. And the scanner itself says so: **55% of axe's rules can return `incomplete`**; ACT formally distinguishes `automatic` / `manual` / `semiAuto`. | w3.org/TR/WCAG22 §5; **github channel** |
| **A green Lighthouse score** | One simulated run under synthetic conditions. | Real-user experience. *"Only field measurement can accurately capture the complete picture."* Conformance means **75th-percentile field data across mobile and desktop.** | web.dev/articles/vitals |
| **A passing k6 / load run at target RPS** | The harness sent load and got responses. | True tail latency, unless the workload model is declared and **coordinated omission** is corrected. A closed-loop generator sends *fewer* requests during a stall, so the worst latencies are systematically the missing samples. Worked case: p99 **249µs → 665ms**, *"over 2,600 times higher."* It also says nothing about soak (leaks), spike (burst), or stress (beyond-capacity) behavior unless that test type was run. | Tene, mechanical-sympathy; ScyllaDB |
| **A clean SAST/DAST scan** | No externally reachable instance of the patterns the tool encodes. | Anything at ASVS **L2 or L3** — those levels require *"documentation, architecture, source code, and the people involved"* and are **not reachable by black-box scanning at all.** Nor business logic (WSTG-BUSL) or authorization (WSTG-ATHZ), which are manual procedures. | OWASP ASVS 5.0.0; WSTG 4.2 |
| **"We checked the OWASP Top 10"** | Awareness of a risk taxonomy. | A verification claim. The Top 10 is an *awareness document*; OWASP pairs it with ASVS for verifiable requirements. Same for the **LLM Top 10** — a scoping taxonomy for red-teaming, not a pass/fail target. | owasp.org |
| **A passing eval / benchmark score** | The model behaved as scored on the sampled distribution, at that version, on that date. | Anything beyond those conditions — ISO/IEC 15026-2 §6.3.3 forbids extending a claim past the conditions its evidence covers. And **NIST AI RMF has no conformance scan**: evidence means artifacts across GOVERN/MAP/MEASURE/MANAGE against the seven trustworthiness characteristics. | ISO/IEC 15026-2; NIST AI RMF |
| **A passing suite of LLM-written tests** | That the code's **current behavior** was recorded. | That the behavior is **correct**. A behavior-derived test has no oracle beyond the code itself. `[UNVERIFIED empirically — see I27; this is a reasoned mechanism, not a measured finding]` | Kaner's oracle definition + characterization-testing literature |
| **A cookie banner rendering** | A banner rendered. | Consent-before-tracking. Evidence is network-level: no non-essential request fires pre-consent, withdrawal works, DSARs are fulfilled, GPC measurably changes behavior. Google's own guidance says verify **tag firing in Tag Assistant**, not the code. | developers.google.com; W4 §6 |
| **A completed VPAT/ACR** | A vendor's self-assessment. | Third-party verification — VPATs are not independently audited by default. And rows marked "Not Applicable"/"Not Evaluated" are gaps, not passes. | itic.org |
| **A green CI pipeline overall** | Every gate someone configured returned true. | The release decision. *"You can never know the 'actual' quality of a software product—you can't 'verify' quality, as such."* The output is a bounded story; everything outside it is unknown by construction. | Bach, HTSM v6.0 (2024) |

**The pattern to lift:** each row pairs a *tool output* with the *scope of applicability* that output
carries — which is exactly ISO/IEC 15026-2 §6.5.2(b), "scope of applicability," made concrete per
evidence type. The skill should be able to generate this row for any new tool it meets.

---

## 2. INVARIANTS

Twenty-two candidate universal principles the skill could carry, each traced to source and phrased as a
rule an agent can apply. **Contested** ones are marked with who contests them. Ordered roughly by how
load-bearing they are for the wedge.

| # | Invariant | Source(s) | Contested? |
|---|---|---|---|
| **I1** | **Every verdict rests on an oracle, and every oracle is a decision aid, not a proof.** State what the oracle is. If you cannot name it, you are not testing — you are guessing. | Kaner, kaner.com/?p=190 (2012); Weyuker 1980 | No |
| **I2** | **A passing check certifies only the propositions someone encoded.** Never report "all checks passed" as "the software is fine." | Bach & Bolton, satisfice.com/blog/archives/856 (2013) | Contested by heavy-automation practitioners who conflate the two; central RST claim |
| **I3** | **Checking is inside testing, not opposed to it and not a substitute for it.** Automation cannot notice a problem nobody thought to ask about. | Bolton, developsense.com/blog/2025/04/checking-is-inside-testing (2025) | No — but supersedes Bolton's own retracted 2009 "sapient/non-sapient" framing |
| **I4** | **A claim without stated uncertainty and stated conditions of applicability is not a conforming claim.** Name the build, the browser, the config, the confidence. | ISO/IEC 15026-2:2011 §6.3.2(c),(f),(h) — normative `shall` | No |
| **I5** | **Evidence may not be extended past the conditions it covers.** Never infer an untested surface from a tested one; a component pass is not a product-workflow pass. | ISO/IEC 15026-2:2011 §6.3.3; WCAG 2.2 Conformance Requirements 2 & 3 | No — two independent standards converge |
| **I6** | **An unsupported proposition in the evidence set is an assumption, not evidence, and must be labelled with the basis of its uncertainty.** | ISO/IEC 15026-2:2011 Fig. 1, §6.6.2 | No |
| **I7** | **Whatever is not refuted is residual risk, and it must be surfaced to the decision-maker as an explicit trade-off.** | McDermott & Fox, ACSAC 1999 §6 | No |
| **I8** | **Verification is refutation, not confirmation.** Attempt to show harm is possible; do not attempt to show things work. | McDermott & Fox 1999 §6; ISTQB Principle 1 ("Testing shows the presence, not the absence of defects") | No — rare cross-school agreement |
| **I9** | **The strength of the refutation method is the assurance level.** A walkthrough, a scan, and a proof are not the same evidence. Grade the method, not just the outcome. | McDermott & Fox 1999 §6; OWASP ASVS 5.0.0 L1/L2/L3 | No |
| **I10** | **Omitting verification is permitted; omitting it silently is not.** A stated, justified gap is conformance. Silence is non-conformance. | ISO/IEC 15026-2:2011 §7.2(b) | No |
| **I11** | **The output of testing is a bounded story, never "quality verified."** Everything the story did not cover is unknown by construction, not by oversight. | Bach, HTSM v6.0 (2024) | No |
| **I12** | **Say which stopping heuristic you stopped on.** Stopping is always heuristic; the failure mode is stopping by fatigue without noticing. | Bolton, developsense.com/blog/2009/09/when-do-we-stop-test (2009) | No |
| **I13** | **"Good enough" is a rational acceptance state, not mediocrity.** Sufficient benefit · no critical problems · benefit outweighs remaining problems · further improvement net-harmful. | Bach, IEEE Computer 30(8), Aug 1997 | No — culturally resisted, not intellectually |
| **I14** | **Allocate the verification budget by ranked risk, and record which rank each effort served.** | McDermott & Fox 1999; ASVS levels; HTSM Quality Criteria as risk dimensions | **Contested** — Fowler (quoting Searls) argues allocation-by-ratio is "a distraction"; the shape traditions allocate by architecture instead |
| **I15** | **A finding is not a finding until it reaches actual harm to a stakeholder.** State the harm in the user's domain terms, not the mechanism's. | McDermott & Fox 1999 §4 | No |
| **I16** | **Name the adversary and the maximum you intend to defend against.** Beyond that line is out of scope *by decision*, and the line is part of the record. | McDermott & Fox 1999 §4, §6 | No |
| **I17** | **Coverage finds untested code; it does not measure test quality.** Never make a coverage number a target — *"it is not a good indicator of test suite effectiveness."* | Marick 1997; Fowler 2012; **Inozemtseva & Holmes, ICSE 2014 (empirical)** | No — settled by the largest study of its kind |
| **I23** | **No metric can detect a fault of omission.** Coverage measures the code that exists, never the code that should exist. Absence of code is invisible to every tool. | Marick 1997 | No |
| **I24** | **A flaky suite is not a hygiene problem, it is an evidence-validity problem.** Once failures start being ignored, the healthy tests stop being believed too. Quarantine with a forcing function; never retry-to-green. | Fowler 2011; Google Testing Blog 2016 | No |
| **I25** | **A flaky test may be a real bug.** ~1 in 6 flaky-to-fixed transitions at Google traced to a production defect; 24% of flaky fixes changed the code under test. Never delete a flake without triaging it. | Listfield 2017 `[low-confidence extraction]`; Luo et al., FSE 2014 | No |
| **I26** | **An unactionable assurance metric is not evidence.** Google dropped mutation score because it *"could not be surfaced to engineers in an actionable way"* — not because it was inaccurate. | Petrović & Ivanković, ICSE-SEIP 2018 | No |
| **I27** | **A test derived from observed behavior records what the code does, not what it should do.** This is the oracle problem wearing new clothes; the AI-specific risk is volume and invisibility, not novelty. | Reasoned from Kaner's oracle definition + characterization-testing literature | **`[UNVERIFIED empirically]`** — no study quantifying "LLM tests assert the bug" was found. Ship the reasoning, not a number. |
| **I28** | **State the accepted miss rate.** Where verification is deliberately incomplete, quantify and bound the gap rather than leaving it implicit. | Machalica et al., ICSE-SEIP 2019 (*">95% of failures, >99.9% of faulty changes"*) | No |
| **I18** | **Push verification to the cheapest altitude that can detect the failure mode** — but keep a higher-level test when nothing lower can catch what it catches. | Vocke/Fowler, practical-test-pyramid.html (2018) | **Contested in emphasis** — Dodds' trophy and Spotify's honeycomb both push effort *up* toward integration |
| **I18b** | **Allocate by where defects actually originate, never by an inherited ratio.** **Neither Cohn's pyramid nor Dodds' trophy states a numeric ratio** — the percentages practitioners argue over are later accretions, and the one institution that does publish a number contradicts itself (80/15/5 vs 70/20/10, the latter self-disclaimed as *"pulled out of a hat"*). Any ratio you adopt is yours to justify, not the canon's to supply. | Cohn 2009 via Fowler `[UNVERIFIED — absence of evidence, primary book not read]`; Dodds; *SWE at Google* ch. 11; Bland 2011 | **Contested** — Google's book still publishes a ratio; Fowler/Searls call ratio-talk *"a distraction"* |
| **I19** | **Judge a test by its properties, not by which layer it sits in** — Beck's twelve desiderata are dials in tension, not a checklist. | Beck, testdesiderata.com; Fowler/Searls, 2021-test-shapes.html | No — this is the field's 2026 convergence point |
| **I20** | **A scan is not conformance.** For every non-functional standard, name what evidence the standard itself requires beyond a tool's output. | WCAG 2.2 §5 (five conformance requirements); ASVS L2/L3 access requirements; web.dev field-vs-lab | No — the standards say it themselves |
| **I21** | **Lab measurement is not field measurement.** *"Only field measurement can accurately capture the complete picture."* Report the percentile and the population. | web.dev/articles/vitals; Tene on coordinated omission; Dean & Barroso | No |
| **I22** | **There are no best practices, only good practices in context** — never present a technique as universally correct. | Context-Driven Principle 2; ISTQB Principle 6 (citing Kaner 2011) | **Contested institutionally** (ISO/IEC/IEEE 29119 and the certification industry) **but not substantively** — ISTQB's own syllabus concedes the principle |

**Twenty-eight in total** (I1–I28; the numbering runs past 22 because W3's cluster added six). If the
skill can only carry a handful, the load-bearing set is **I1, I2, I5, I7, I10** — see §7.

### Note on I4/I11 — the honest divergence to declare

ISO/IEC 15026-2 requires **quantified** uncertainty on every claim. In web-product QA, numeric
uncertainty is almost never available. The honest adaptation is an **ordinal evidence-state vocabulary**
(`observed` / `inferred` / `not_tested` / `blocked`) rather than a probability — and the skill should
state this as a **deliberate divergence from the standard**, not present it as conformance to it.

---

## 3. CLUSTER CORPORA

### 3.1 Cluster 1 — Test strategy and the shape debate (W1)

Full raw detail: `_raw/canon-w1.md`. W1 used its full 15-WebSearch budget; xunitpatterns.com was
unreachable (`ECONNREFUSED`, 2 attempts) and watirmelon.blog had an expired TLS certificate.

**Cohn's pyramid.** Mike Cohn, *Succeeding with Agile*, 2009. Layers: Unit → Service → UI. Per Fowler's
`TestPyramid.html` (1 May 2012, rev. 2016/2017): *"Most people know about the the Test Pyramid due to
Mike Cohn, when he described it in his 2009 book Succeeding with Agile."* Fowler's gloss: *"you should
have many more low-level UnitTests than high level BroadStackTests running through a GUI."*
**Key finding: Cohn attached no numeric ratios.** The 80/15/5 and 70/20/10 splits in circulation are
later accretions by other authors. `[UNVERIFIED via primary book text — consistent across all reachable
secondary sources, but this is absence-of-evidence.]`

**Fowler.** The load-bearing rules:
- *Practical Test Pyramid* (Ham Vocke, 26 Feb 2018): **push tests down** — keep a higher-level test only
  if it catches something no lower-level test can. Test observable behavior, not implementation.
- *TestCoverage* (17 Apr 2012): **"Test coverage is a useful tool for finding untested parts of a
  codebase. Test coverage is of little use as a numeric statement of how good your tests are."** And on
  100%: *"I would be suspicious of anything like 100% - it would smell of someone writing tests to make
  the coverage numbers happy, but not thinking about what they are doing."* His outcome-based test:
  (1) bugs rarely escape to production **and** (2) you are rarely hesitant to change code. Quoting
  Marick: *"I expect a high level of coverage. Sometimes managers require one. There's a subtle
  difference."*
- *IntegrationTest* (16 Jan 2018): the term has **two incompatible meanings** — *narrow* (one
  integration point, doubles elsewhere) vs *broad* (live versions of all services). Say which.
- *UnitTest* (2014/2017): **solitary vs sociable**; classicist vs mockist. Default to real collaborators —
  *"If talking to the resource is stable and fast enough for you then there's no reason not to do it."*
- *Test Shapes* (2 Jun 2021): Fowler's own re-litigation. His diagnosis is that much of the
  pyramid-vs-honeycomb fight is **definitional** — a "sociable unit test" and a "narrow integration
  test" can be the same physical test. His chosen rule defers to Justin Searls, quoted approvingly:
  > "People love debating what percentage of which type of tests to write, but it's a distraction.
  > Nearly zero teams write expressive tests that establish clear boundaries, run quickly & reliably,
  > and only fail for useful reasons."
- *SelfTestingCode*: *"You aren't really doing continuous integration unless you have self-testing
  code."* And TDD is decoupled from it: *"you can't consider your work to be done until you have the tests."*

**Kent C. Dodds / Testing Trophy.** Static → Unit → Integration → E2E, widest at Integration.
The guiding principle, verbatim and repeated across his corpus:

> "The more your tests resemble the way your software is used, the more confidence they can give you."

Framed as *"return on investment where 'return' is 'confidence' and 'investment' is 'time.'"* The maxim
"Write tests. Not too many. Mostly integration." originates with **Guillermo Rauch, 10 Dec 2016**;
Dodds' 13 Jul 2019 post is the gloss. "Not too many" is anchored on his own diminishing-returns figure
of **~70% coverage** — his personal heuristic, not measured data. *Avoid the Test User* (24 May 2019):
testing implementation details invents a third audience — *"confidence that things work for the testing
user. But nobody cares about the testing user."* Like Cohn, **Dodds attaches no numeric ratios to the
trophy.**

**Google.** *Software Engineering at Google*, chs. 11–14, abseil.io/resources/swe-book.
- The **Beyoncé Rule**: *"If you liked it, then you shoulda put a test on it."* — explicitly extended to
  performance, security, accessibility and failure scenarios, not just functional correctness.
- The ratio, verbatim from ch. 11: *"As a very rough guideline, we tend to aim to have a mix of around
  80% of our tests being narrow-scoped unit tests that validate the majority of our business logic; 15%
  medium-scoped integration tests that validate the interactions between two or more components; and 5%
  end-to-end tests that validate the entire system."* Immediately qualified — *"every team's mix will be
  a little different."*
- **Test sizes are about hermeticity, not scope.** *"Small tests are restricted to one thread, one
  process, one machine."* Large tests *"may be nonhermetic"*, *"may be nondeterministic"*, default
  timeout *"15 minutes or 1 hour"*. Hermeticity defined: *"the SUT's isolation from usages and
  interactions from other components than the test in question."*
  `[UNVERIFIED]` the full side-by-side constraint table (sleeps/network/filesystem/DB) would not render
  through WebFetch across two targeted attempts; only "one thread, one process, one machine" is
  first-hand.
- **Test doubles preference order** (ch. 13): real implementation > fake > stub > mock. *"A real
  implementation should be preferred over a test double."* With the institutional confession:
  *"when mocking frameworks first came into use at Google, they seemed like a hammer fit for every
  nail... though these tests were easy to write, we suffered greatly given that they required constant
  effort to maintain while rarely finding bugs."*
- **Unchanging tests** (ch. 12): tests should change when *requirements* change, not when
  *implementation* changes. Pure refactorings → tests untouched. DAMP over DRY.
- **Flakiness**: *"At Google, our flaky rate hovers around 0.15%, which implies thousands of flakes
  every day."* and *"Our experience suggests that as you approach 1% flakiness, the tests begin to lose
  value."*

**Kent Beck — Test Desiderata**, all 12 verbatim from testdesiderata.com:

> 1. **Isolated** — "tests should return the same results regardless of the order in which they are run."
> 2. **Composable** — "I should be able to test different dimensions of variability separately and combine the results."
> 3. **Deterministic** — "if nothing changes, the test result shouldn't change."
> 4. **Fast** — "tests should run quickly."
> 5. **Writable** — "tests should be cheap to write relative to the cost of the code being tested."
> 6. **Readable** — "tests should be comprehensible for reader, invoking the motivation for writing this particular test."
> 7. **Behavioral** — "tests should be sensitive to changes in the behavior of the code under test."
> 8. **Structure-insensitive** — "tests should not change their result if the structure of the code changes."
> 9. **Automated** — "tests should run without human intervention."
> 10. **Specific** — "if a test fails, the cause of the failure should be obvious."
> 11. **Predictive** — "if the tests all pass, then the code under test should be suitable for production."
> 12. **Inspiring** — "passing the tests should inspire confidence"

**Beck's framing is load-bearing and is usually dropped downstream**, verbatim:
> "Some properties support each other... Some properties interfere with each other... Sometimes (and
> this is the magic), properties only seem to interfere."

These are **dials to trade off deliberately, not a compliance checklist.** Note #11 **Predictive** is a
statement of the oracle problem in one line: the whole value of a suite is the inference from "tests
pass" to "suitable for production", and that inference is exactly what is never guaranteed.
`[UNVERIFIED]` original 2019 publication venue/date — testdesiderata.com surfaced no date.

**Test double taxonomy** — Meszaros' five, as transcribed by Fowler (`TestDouble.html`,
`mocksArentStubs.html`); **xunitpatterns.com was unreachable, so this is Fowler's transcription of
Meszaros, not a first-hand fetch** `[UNVERIFIED: primary source unreachable]`:

> 1. **Dummy** — "objects are passed around but never actually used. Usually they are just used to fill parameter lists."
> 2. **Fake** — "objects actually have working implementations, but usually take some shortcut which makes them not suitable for production"
> 3. **Stub** — "provide canned answers to calls made during the test, usually not responding at all to anything outside what's programmed in for the test."
> 4. **Spy** — "stubs that also record some information based on how they were called"
> 5. **Mock** — "pre-programmed with expectations which form a specification of the calls they are expected to receive..."

Fowler adds the second axis: *"only mocks insist upon behavior verification."*

**Contract testing.** Pact (docs.pact.io) is "contract by example", generated during consumer test
execution. The limitation is the important part, verbatim:

> Contract testing alone "does not provide any test based assurance that the consumers are calling the
> provider in the correct manner, or that the provider can meet all its consumers' expectations."

`can-i-deploy` answers *"Is the version I'm about to deploy compatible with versions already running in
my target environment?"* — an automated compatibility gate that decouples deployment schedules.
Robinson's original ConsumerDrivenContracts (12 Jun 2006) carries a scope condition usually forgotten:
it applies *"in the context of either a single enterprise or a closed community of well-know [sic]
services"*. PactFlow's bi-directional contract testing exists precisely because that assumption breaks
at scale.

**The 2026 state of the shape debate.** Spotify's **Testing Honeycomb** (Schaffer & Dybeck, 11 Jan 2018,
engineering.atspotify.com) — *"The biggest complexity in a Microservice is not within the service
itself, but in how it interacts with others, and that deserves special attention."* The **ice-cream
cone** is Alister Scott's, watirmelon.blog, 31 Jan 2012 `[UNVERIFIED — expired TLS certificate on that
domain as of 2026-07-26; reconstructed from search snippets]`. The **testing diamond** has **no
identifiable single originator** `[UNVERIFIED]`. The pyramid is still actively defended — Ramona
Schwering, Smashing Magazine, *"Long Live The Test Pyramid"*, 6 Sep 2023: *"In no way do I believe the
Test Pyramid is dead. I might even argue that it is as essential to know it now as ever."*

W1's synthesis, which I endorse: by 2026 there is no winning shape. What has converged is a **meta-rule** —
choose the mix by where your system's actual bug sources live, and judge individual tests by Beck's
properties rather than by hitting a ratio.

### 3.2 Cluster 2 — The context-driven school and the theory of testing (W2)

Full raw detail: `_raw/canon-w2.md` — the richest of the four files. W2 used 14 of 15 WebSearch calls,
read the **HTSM v6.0 PDF** and **Bach's "Exploratory Testing Explained" PDF** in full, and installed
poppler locally to extract the **ISTQB CTFL v4.0.1 syllabus** rather than trusting a summary. The
oracle and testing-vs-checking material is in §1.3 and §1.4 above; this section carries the rest.

**The seven Context-Driven principles, verbatim** (context-driven-testing.com; Kaner, Bach &
Pettichord, *Lessons Learned in Software Testing*, 2001):

> 1. "The value of any practice depends on its context."
> 2. "There are good practices in context, but there are no best practices."
> 3. "People, working together, are the most important part of any project's context."
> 4. "Projects unfold over time in ways that are often not predictable."
> 5. "The product is a solution. If the problem isn't solved, the product doesn't work."
> 6. "Good software testing is a challenging intellectual process."
> 7. "Only through judgment and skill, exercised cooperatively throughout the entire project, are we
>    able to do the right things at the right times to effectively test our products."

**Kaner's definition of testing** `[secondary-sourced — consistently quoted across BBST material, not
verified against a primary kaner.com page this session]`:

> "Testing is an empirical, technical investigation conducted to provide quality-related information
> about a software product to a stakeholder."

**Weinberg + Bach on quality** `[secondary-sourced; *Quality Software Management, Vol. 1*, cited at p.7]`:
Weinberg's *"Quality is value to some person(s)"*, extended by Bach to **"…who matter(s)."** The
extension is not cosmetic: without it, quality is trivially maximised by picking an undemanding person.
"Who matters" forces an examined judgment about whose values the verification serves.

**Rapid Software Testing** (rapid-software-testing.com), Bach & Bolton. Definition, verbatim:

> "We test to develop a comprehensive understanding of the product and the risks around it. We test to
> find problems that threaten the value of the product, or that threaten the on-time, successful
> completion of any kind of development work."

Premises include a **duty of care** — *"releasing poorly tested software would be a breach of that duty."*

**HTSM v6.0** (James Bach, 8 February 2024, © 1996–2024 Satisfice). Framing, verbatim: *"The Heuristic
Test Strategy Model is a set of patterns for designing and choosing tests to perform. The immediate
purpose of this model is to remind testers of what to think about during that process."* Project
Environment + Quality Criteria + Product Elements feed Test Techniques, producing **The Testing and
Quality Story**.

- **Product Elements — SFDIPOT ("San Francisco Depot")**, verbatim category glosses:
  **Structure** *(Everything that comprises the physical product)* — Code, Hardware, Service,
  Non-executable files, Collateral · **Function** *(Everything that the product does)* —
  Multi-user/Social, Calculation, Time-related, Security-related, Transformations, Startup/Shutdown,
  Multimedia, Error Handling, Interactions, Testability · **Data** *(Everything that the product
  processes and produces)* — Input/Output, Preset, Persistent, Interdependent/Interacting,
  Sequences/Combinations, Cardinality, Big/Little, Invalid/Noise, Lifecycle · **Interfaces** *(Every
  conduit by which the product is accessed or expressed)* — User Interfaces, System Interfaces, API/SDK,
  Import/export · **Platform** *(Everything on which the product depends and that is outside your
  project)* — External Hardware, External Software, Embedded Components, Product Footprint ·
  **Operations** *(How the product will be used)* — Users, Environment, Common Use, Disfavored Use,
  Extreme Use · **Time** *(Any relationship between the product and time)* — Input/Output, Fast/Slow,
  Changing Rates, Concurrency.
- **Quality Criteria — CRUSSPIC STMPL.** Verbatim framing: *"A quality criterion is some requirement
  that defines what the product should be. ... **Each of the items on this list can be thought of as a
  potential risk area.**"* Capability · Reliability · Usability · **Charisma** *(present in v6.0 but
  outside the pronounceable acronym — Aesthetics, Uniqueness, Entrancement, Image)* · Security ·
  Scalability · Compatibility · Performance · Installability · **Development**, whose sub-items are the
  STMPL tail: **Supportability, Testability, Maintainability, Portability, Localizability.**
- **Nine general test technique families**, verbatim glosses: Function Testing *(Test what it can do)* ·
  Claims Testing *(Challenge every claim)* · Domain Testing *(Partition the data)* · User Testing
  *(Involve the users)* · Stress Testing *(Overwhelm the product)* · **Risk Testing** *(Imagine a
  problem, then look for it)* · Flow Testing *(Do one thing after another)* · Tool-Supported Testing
  *(Use tools to make testers more powerful)* · Scenario Testing *(Test to a compelling story)* — with
  the definition *"A good scenario test is a compelling story of how someone who matters might do
  something that matters with the product."*
- `[UNVERIFIED]` **"CIDTESTD"** is *not* confirmed as the mnemonic for HTSM's Project Environment
  section; v6.0 presents no acronym there and its eight categories (Mission, Information, Developer
  Relations, Test Team, Equipment & Tools, Schedule, Test Items, Deliverables) do not obviously map to
  it. Do not use it.

**SBTM.** Jonathan Bach and James Bach, originally at Hewlett-Packard, seminal article November 2000.
A session is *"an uninterrupted block of reviewable, chartered test effort."* **TBS metrics** — testers
self-report the proportion of session time spent on **T**est design and execution, **B**ug investigation
and reporting, **S**ession setup. The debrief mnemonic **PROOF** — Past, Results, Obstacles, Outlook,
Feelings `[secondary-sourced; the primary satisfice.com PDF's bytes were not retrievable — the download
link is a client-side action]`.

**Exploratory charters.** Bach's own framing from *Exploratory Testing Explained* v1.3 (16 April 2003,
read in full): *"An exploratory test session often begins with a charter, which states the mission and
perhaps some of the tactics to be used."* Real example charters are in `_raw/canon-w2.md §5.5`.
Hendrickson's *Explore It!* template `[secondary-sourced]`:

> "**Explore \<target\> with \<resources\> to discover \<information\>.**"

Also from Bach's PDF, **Kaner's "tour bus" principle**, verbatim: *"Even people on a tour bus get to
step off it occasionally and wander around. The key is not to miss the tour entirely, nor to fall asleep
on the bus."* And Kaner's management ritual: open meetings with *"What is the most interesting bug you've
found recently? Show it to me."*

**The Hendrickson/Lyndsay/Emery Test Heuristics Cheat Sheet** (© 2006 Quality Tree Software; © 2022
Ministry of Testing) is a **living document** that has grown substantially since 2006. W2 recovered its
category index but **not** the letter-by-letter expansions of the many mnemonics it now contains
(BINMEN, POISED, VADER, RCRCRC, FAILURE, WWWWWHKE, TORCH, MCOASTER, SACRED, TRIMS…). `[UNVERIFIED at
item level — cite the live page, do not reproduce these mnemonics from memory.]`

**Marick's testing quadrants — and the critique.** Marick's original 2003 posts were unreachable (TLS
certificate mismatch on exampler.com), but were recovered from an unusually high-provenance secondary:
Bach & Bolton's own 2019 deck *"Refactoring the Agile Testing Quadrants"*, which reproduces the diagram
while arguing against it — so it has no motive to flatter it.

- **Marick's original axes:** Business Facing / Technology Facing × **Support Programming** / Critique Product.
- **Crispin & Gregory (*Agile Testing*)** renamed the left axis **Supporting the Team**; Q1 unit/component,
  Q2 functional/story tests/prototypes, Q3 exploratory/usability/UAT, Q4 performance/security/"-ilities".
- **Crispin & Gregory (*More Agile Testing*)** renamed it again to **Guide Development**.
- **Bach & Bolton's critique** is sharp and directly reinforces this skill's thesis in a second register:
  > "Testing—critiquing the product—IS supporting the team!"
  > "There is no such thing as 'manual' or 'automated' testing, just as there isn't 'manual' or
  > 'automated' programming."
  > "Test cases are not tests; examples are not tests." · "**Tests are not artifacts; they're
  > performances.**" · "It is pointless to discuss whether 'business people' can 'read the tests'
  > because what they can read are not tests – they are partial representations of testing activity (or
  > else they are checks)."

  And Bolton on the drift of the field: *"Increasingly, testing is confused with 'checking builds'. Our
  fixation on 'test automation' is causing us to lose connection with the human, social purposes of
  software development and testing... what I'm seeing at conferences and in talk about testing often
  looks like elaborate attempts to avoid making contact with the software, our clients, our customers,
  and our mission."*

**ISTQB — steelmanned from the primary syllabus.** CTFL v4.0.1, 15 September 2024, extracted verbatim.
The **Seven Testing Principles** (abridged to their titles and key clauses; full text in
`_raw/canon-w2.md §12.1`):

> 1. **"Testing shows the presence, not the absence of defects."** (Buxton 1970)
> 2. **"Exhaustive testing is impossible."** (Manna 1978)
> 3. **"Early testing saves time and money."** (Boehm 1981)
> 4. **"Defects cluster together."** (Enders 1975)
> 5. **"Tests wear out."** (Beizer 1990)
> 6. **"Testing is context dependent."** (**Kaner 2011**)
> 7. **"Absence-of-defects fallacy."** (Boehm 1981)

**The most interesting single finding in this cluster:** **ISTQB Principle 6 cites Kaner 2011.** The
institution the context-driven school opposes credits the context-driven school's co-founder for the
principle that testing is context dependent. That is documented common ground, from the primary syllabus,
not a rhetorical concession.

**Stop 29119.** Petition at ipetitions.com/petition/stop29119, created **28 August 2014**, initiated by
**Cem Kaner** `[the petition page itself returned HTTP 403; existence, date and creator confirmed via
context-driven-testing.com and Bolton's FAQ]`. The objections, from Bolton's FAQ (2 September 2014) and
context-driven-testing.com:

1. Philosophical incompatibility — ISO 29119 *"ignores the existence of the context-driven testing school."*
2. Process over substance, verbatim: 29119 is *"an overstructured process model, focused on relentless,
   ponderous, wasteful bureaucracy and paperwork, with negligible content on actual testing"*, and
   *"a moment that a tester spends on useless documentation is a moment in which she's not focused on
   identifying risks and finding problems."*
3. Rent-seeking via the certification industry.
4. **The sharpest and most concrete objection — legal capture**, verbatim: *"The existence of a standard
   makes it easier for a court... to rule that the standard-approved approach is the professionally
   correct one."* Once referenced in regulation or contracts, *"'voluntary' standards become de facto
   mandatory"*, producing defensive compliance rather than quality.
5. Objection to mandating a common testing vocabulary.
6. Objection to displacing *"the skill set and the mindset of the individual tester."*

Note the syllabus itself points readers to **ISO/IEC/IEEE 29119-1 and -2** as further reading —
confirming the institutional alignment the petition targets.

### 3.3 Cluster 3 — Evidence, coverage and suite health (W3)

Full raw detail: `_raw/canon-w3.md`. W3 used ~15 WebSearch calls and **read seven primary papers in full**
rather than trusting summaries — including bypassing a broken TLS certificate on exampler.com with
`curl` to get Marick's original PDF. Its AI section is the most disciplined in the corpus: it searched
for the "LLM tests assert the bug" study, **did not find one, and said so** rather than manufacturing a
citation.

#### Coverage — the canon and the critique

**Brian Marick, "How to Misuse Code Coverage" (1997, republished 1999).**
exampler.com/testing-com/writings/coverage.pdf — read in full. The central argument, verbatim:

> "I've satisfied the coverage tool. But I'm not done testing, because this code is wrong. The programmer
> either never knew or forgot that `perform_operation` can actually return three status codes ... And the
> coverage tool didn't tell me to write the needed tests. **It can't. It can only tell me how the code
> that exists has been exercised. It can't tell me how code that ought to exist would have been
> exercised.**"

He names the class: **faults of omission** — *"those that are fixed by adding new code"* — and cites
Glass81's description of them as *"code not complex enough for the problem."* **This is the coverage
metric's structural blind spot and it is unfixable: no coverage tool can measure the absence of code.**

Marick's operating heuristic, verbatim (the one Fowler later quotes back):

> "If a part of your test suite is weak in a way that coverage can detect, it's likely also weak in a way
> coverage can't detect."

On tools, verbatim:

> "coverage tools don't give commands ('make that evaluate true'), they give clues ('you made some
> mistakes somewhere around there'). If you treat their clues as commands, you'll end up in the fable of
> the Sorcerer's Apprentice ... **Don't use code coverage in test design.** The return on your testing
> dollar (in terms of bugs found) is too low."

And on gates — the Goodhart mechanism, observed in the field a quarter-century before it was fashionable
to name it:

> "Suppose a manager requires some level of coverage, perhaps 85%, as a 'shipping gate'. ... The problem
> with this approach is that people optimize their performance according to how they're measured. ...
> **There's usually a few who have [gone higher], but everyone else is clustered right around 85%.**
> ... Coverage numbers (like many numbers) are dangerous because they're **objective but incomplete.**"

W3 correctly flags this clustering observation as **Marick's own anecdote from consulting, not a
controlled study.** His constructive practice is risk-tiering — High risk tested thoroughly, Medium
partially, Low incidentally, with coverage read *per bucket*: *"Looking at aggregate coverage is a matter
of idle curiosity."*

**Fowler's TestCoverage bliki** (17 April 2012) is already quoted in §3.1; W3 read it in full and adds
his low-end caveat, verbatim: *"Certainly low coverage numbers, say below half, are a sign of trouble.
But high numbers don't necessarily mean much, and lead to ignorance-promoting dashboards."*

**The empirical settlement — Inozemtseva & Holmes, "Coverage Is Not Strongly Correlated with Test Suite
Effectiveness", ICSE 2014** (ACM Distinguished Paper). Full 11-page PDF read. Abstract, verbatim:

> "Our study is the largest to date in the literature: we generated 31,000 test suites for five systems
> consisting of up to 724,000 lines of source code. ... **We found that there is a low to moderate
> correlation between coverage and effectiveness when the number of test cases in the suite is controlled
> for. In addition, we found that stronger forms of coverage do not provide greater insight into the
> effectiveness of the suite. Our results suggest that coverage, while useful for identifying
> under-tested parts of a program, should not be used as a quality target because it is not a good
> indicator of test suite effectiveness.**"

The decisive manipulation: *"Controlling for suite size always lowered the correlation... Joda Time was
at one extreme: the correlation ... ranged from 0.80 to 0.85 when suite size was ignored, but **dropped
to essentially zero when suite size was controlled for.**"* One project (HSQLDB) showed a **negative**
correlation (−0.35). And the three coverage types are near-interchangeable (τ ≈ 0.91–0.92 with each
other) — **stronger coverage types buy almost nothing.**

They aim this at standards bodies, verbatim: DO-178B's MC/DC mandate *"may increase expenses without
necessarily increasing quality."* Their proposed substitute: *"**mutation score may be a good substitute
for coverage** in this context."* `[Their own threats-to-validity: effectiveness is mutation-kill-based,
not real-fault-based.]` `[UNVERIFIED]` the DO-178**C** Level A–E → coverage-type table is
vendor-whitepaper sourced; only the DO-178**B** MC/DC link is primary-confirmed, inside this paper.

#### Mutation testing

**Jia & Harman, IEEE TSE 2011** (pages 1–6 read). Definitions verbatim: mutation score is *"the ratio of
the number of killed mutants over the total number of non-equivalent mutants."* The **equivalent mutant
problem**, verbatim: *"**Automatically detecting all equivalent mutants is impossible ..., because
program equivalence is undecidable.**"* The **Competent Programmer Hypothesis** (DeMillo et al. 1978):
*"programmers are competent, which implies that they tend to develop programs close to the correct
version."* The **Coupling Effect Hypothesis**, in Offutt's precise reformulation: *"complex faults are
coupled to simple faults in a program in such a way that a test data set that detects all simple faults
in a program will detect a high percentage of the complex faults."*

**Petrović & Ivanković, "State of Mutation Testing at Google", ICSE-SEIP 2018** — full paper read, and
the most important practical finding in this cluster. Verbatim:

> "At present it is infeasably expensive to compute the absolute mutation score for the codebase at any
> given fixed point. ... **In addition to the computation costs of the mutation score, we were also
> unable to find a good way to surface it to the engineers in an actionable way.**"

**Google explicitly rejected mutation *score* as an operating metric.** Instead: per-diff living-mutant
findings, "arid node" suppression (logging, imports, `sleep`, memoization, idiomatic boilerplate), and a
developer feedback loop. Their numbers: 70,000 diffs, 1.1M mutants, 150,000 actionable findings, and
*"the reported usefulness of the surfaced results improved from 20% to 80%"*, settling at **75% useful**.
Median **2 living mutants per diff** (99th percentile 43).

**This is the same error as coverage-as-a-gate, one level up.** A global mutation-score target repeats
Marick's mistake with a more expensive tool.

#### Flaky tests

**Google Testing Blog, John Micco, May 2016** `[read via a googblogs.com mirror — the canonical page's
extraction returned only reader comments]`:

> "across our entire corpus of tests, we see a continual rate of about **1.5% of all test runs reporting
> a 'flaky' result**"
> "Almost **16% of our tests have some level of flakiness associated with them!**"

Mitigations, verbatim: a flag *"causing it to report a failure only if it fails **3 times in a row**"*,
and an automated tool that *"automatically quarantines the test ... and files a bug."*

**Jeff Listfield, April 2017** `[low confidence — extracted from a comment/author reply, not the article
body]`: *"when a stable test became flaky, and we could track it to a specific code change, **the problem
was a bug in production code 1/6th of the time.**"*

**Luo, Hariri, Eloussi & Marinov, "An Empirical Analysis of Flaky Tests", FSE 2014** `[read via the
authors' own FSE-2014 slide deck, not the paper]`. Method: all 151 Apache projects → 1,129 commit
messages → 486 fixed flaky tests → 161 inspected in depth. Definition, verbatim: *"Test outcome
non-determinism: Same code revision / Same input and configuration / Passes/fails non-deterministically."*

Root-cause taxonomy, top three ≈ **78%** combined:
- **Async Wait** — *"Test makes async calls but doesn't wait for the result properly"* (largest single cause)
- **Concurrency** — *"Flakiness caused by buggy thread interleavings (excluding Async Wait) — Data races /
  Atomicity violations / Deadlocks."*
- **Test Order Dependency** — *"Dependency between tests and the result depends on running order"*

Then Resource Leak, Network, Time, I/O, Randomness, Floating Point Operations, Unordered Collections.

Two findings that matter for policy: **126 of 161 flaky tests were flaky from the moment they were
written**, and **24% (38/161) of flaky-test fixes also changed the code under test** — of those, 86%
fixed a genuine non-deterministic bug. Their own slide title says it: **"Flaky Tests Are Still Valuable
For Catching Bugs and Should Not be Ignored or Removed."**

**Fowler, "Eradicating Non-Determinism in Tests" (14 April 2011)** — full article read. The five causes:
**Lack of Isolation · Asynchronous Behavior · Remote Services · Time · Resource Leaks.** And the reason
this matters more than it looks, verbatim:

> "Non-deterministic tests have two problems, firstly they are useless, secondly they are **a virulent
> infection that can completely ruin your entire test suite.** ... **Once you start ignoring a regression
> test failure, then that test is useless and you might as well throw it away.** ... If you have a suite
> of 100 tests with 10 non-deterministic tests in them, than that suite will often fail. ... **Once that
> discipline is lost, then a failure in the healthy deterministic tests will get ignored too.**"

His quarantine policy, verbatim — with the forcing function that is usually omitted:

> "Place any non-deterministic test in a quarantined area. **(But fix quarantined tests quickly.)** ...
> A danger here is that tests keep getting thrown into quarantine and forgotten ... One is a simple
> numeric limit: e.g. only allow 8 tests in quarantine ... Another route is to put a time limit on how
> long a test may be in quarantine, such as **no longer than a week.**"

#### Suite economics

`[UNVERIFIED]` the **10-minute commit stage** (Beck / Fowler / Humble & Farley) — W3 could not read the
primary text and explicitly declines to quote it. Fowler's TestCoverage page independently corroborates
the trade-off without a number: *"You can always move slow tests to a later stage in your deployment
pipeline... Doing these things will slow down the feedback from those tests, but that's part of the
trade-off of build times versus test confidence."*

**Machalica et al., "Predictive Test Selection" (Facebook, ICSE-SEIP 2019)** `[abstract only]`: the
strategy *"reduces the total infrastructure cost of testing code changes by a factor of two, while
guaranteeing that **over 95% of individual test failures and over 99.9% of faulty changes are still
reported back to developers.**"* Note the shape of this claim — a **quantified, bounded, deliberately
accepted miss rate.** That is a residual-risk statement in production form.

**Deletion criterion**, from Fowler: a test you have already started ignoring on failure *"is useless and
you might as well throw it away."* The criterion is **demonstrated developer behavior**, not age or
coverage contribution.

#### Test smells

**van Deursen, Moonen, van den Bergh & Kok, "Refactoring Test Code" (XP2001 / CWI SEN-R0119)** — full
paper read; the canonical catalogue, with original numbering:

> **1. Mystery Guest** — "When a test uses external resources, such as a file containing test data, the
> test is no longer self contained."
> **2. Resource Optimism** — "Test code that makes optimistic assumptions about the existence (or
> absence) and state of external resources ... can cause non-deterministic behavior in test outcomes."
> **3. Test Run War** — "tests run fine as long as you are the only one testing but fail when more
> programmers run them. This is most likely caused by resource interference."
> **4. General Fixture** — "the setUp fixture is too general and different tests only access part of the
> fixture."
> **5. Eager Test** — "a test method checks several methods of the object to be tested."
> **6. Lazy Test** — "several test methods check the same method using the same fixture."
> **7. Assertion Roulette** — "**'Guess what's wrong?'** This smell comes from having a number of
> assertions in a test method that have no explanation. If one of the assertions fails, you do not know
> which one it is."
> **8. Indirect Testing** — "a test class contains methods that actually perform tests on other objects."
> **9. For Testers Only** — "a production class contains methods that are only used by test methods."
> **10. Sensitive Equality** — "equality checks using the toString method ... may depend on many
> irrelevant details such as commas, quotes, spaces."
> **11. Test Code Duplication** — including *test implication*: "test A and B cover the same production
> code, and A fails if and only if B fails."

Their own observed test:production ratio was **2:3**, against an XP ideal *"considered to approach a
ratio of 1:1."*

#### Change failure rate — and a DORA warning

**dora.dev's current Four Keys guide (last updated 5 January 2026) lists FIVE metrics, not four**, and
has renamed the assurance metric. Verbatim:

> **Throughput:** "Change lead time..." · "Deployment frequency..." · "**Failed deployment recovery
> time**: The time it takes to recover from a deployment that fails and requires immediate intervention."
> **Instability:** "**Change fail rate**: The ratio of deployments that require immediate intervention
> following a deployment. Likely resulting in a rollback of the changes or a 'hotfix'..." ·
> "**Deployment rework rate**: The ratio of deployments that are unplanned but happen as a result of an
> incident in production."

**No Elite/High/Medium/Low percentage thresholds appear on this page.** W3 looked and reports their
absence as a finding. `[UNVERIFIED]` third-party sources claim the **2025 State of DevOps report retired
the four-tier model for seven "team archetypes"** — this could **not** be confirmed against dora.dev's
own report text.

**The rule this produces is stronger than any threshold:** track change fail rate as a **trend for your
own team**, not against externally-defined tiers, because DORA's own framework demonstrably moves — and
"change fail rate" is the *outcome* measure of whether verification caught what needed catching, as
opposed to input measures like coverage or test count.

#### Defect taxonomy — ODC

**Ram Chillarege's own ODC tutorial deck (2000)** — read in full `[the original 1992 IEEE TSE paper text
was not read]`. The two orthogonal axes, verbatim:

> "**The defect type is the meaning of the fix** — It is not the cause of the bug — It is what was needed
> to fix the problem"
> "**Trigger is the catalyst that helps a defect surface** — Defects are latent by definition - until
> detected — Triggers - are not 'cause', they are facilitators"

**Defect types (Target = Design/Code):** Assignment-Initialization · Checking · Algorithm/Method ·
Function · Timing/Serialization · Interface · Relationship.
**Qualifier:** **Missing, Incorrect, Extraneous.**
**Triggers by activity:** *Review/Inspection* — Backward compatibility, Lateral compatibility, Design
conformance, Concurrency, Logic flow, Side Effects, Rare Situation · *Function Test* — Coverage,
Variation, Sequencing, Interaction (black box); Simple Path, Complex Path (white box) · *System Test* —
Recovery, Start and Restart, Workload/Stress, HW Configuration, SW Configuration, Blocked Test.
**Impact:** Installability, Integrity/Security, Performance, Maintenance, Standards, Documentation,
Usability, Reliability, Capability.

ODC's value claims (*"Reduces root cause analysis cost by a factor of 10x"*, *"$100M / year"*) are
**the inventor's own unaudited figures** — W3 flags them as such.

`[UNVERIFIED]` **IEEE 1044** — paywalled, not read. **No verbatim attributes available.**

#### Bug report quality

**Bettenburg et al., "What Makes a Good Bug Report?", FSE 2008** — full paper read. Developer importance
ranking, verbatim: **steps to reproduce (83%)**, stack traces (57%), test cases (51%), screenshots (26%),
expected behavior (22%), code examples (14%), summary (13%), version (12%), error reports (12%), build
information (8%), product (5%), operating system (4%), component (3%), **hardware (0%), severity (0%)**.

The three Spearman correlations are the finding:

- **0.321** between what developers *use* and what reporters *provide*
- **−0.035** between what developers consider *important* and what reporters *provide*
- **0.839** between what developers consider important and what reporters *think* is important

**So the gap is not ignorance.** Reporters know what is wanted and still don't supply it, because the
highest-value items are the hardest to produce (test cases rated 75% difficulty). *"The biggest causes of
delay are not wrong information, but absent information."* And a counterintuitive result worth carrying:
*"developers do not suffer too much from bug duplicates... 'Duplicates are not really problems. They
often add useful information.'"*

#### Verifying AI-generated code and tests

**This is the section where W3's discipline matters most, and its main result is a negative one.**

**Perry, Srivastava, Kumar & Boneh, "Do Users Write More Insecure Code with AI Assistants?", CCS 2023.**
Abstract verbatim:

> "**participants who had access to an AI assistant based on OpenAI's codex-davinci-002 model wrote
> significantly less secure code than those without access.** Additionally, participants with access to
> an AI assistant were also **more likely to believe they wrote secure code** than those without access
> ... suggesting that such tools may lead users to be overconfident about security flaws in their code."

**N = 47 (33 experiment / 14 control), five tasks, three languages, `codex-davinci-002`.** W3's framing
is the right one and should be carried verbatim into the skill: cite this as **historical evidence that
the overconfidence *dynamic* is real and measured**, not as a live statistic about current models. The
model is three-plus generations obsolete and the sample is small.

**"LLM-written tests encode existing bugs as expected behavior" — NO QUANTIFIED STUDY FOUND.** W3
searched and reports: *"I did not read any of these papers in full, and I could not find one that names
and quantifies this specific 'asserts the bug' phenomenon."* **Do not ship a number here.**

What *can* be said safely, and it is a better formulation anyway:

> A test derived purely from observing a program's current behavior encodes what the code **does**, not
> what it **should** do. This is a structural property of behavior-derived tests, it long predates LLMs
> (the classic characterization-test caveat), and it is **the oracle problem wearing new clothes** — an
> LLM generating a test from code has no independent oracle beyond the code itself. **The novel
> AI-specific risk is scale and invisibility:** an LLM can produce large volumes of plausible, passing
> tests fast, creating confidence that behavior has been *specified and verified* when it has only been
> *recorded.*

`[UNVERIFIED / NOT CITED]` GitClear reports (not fetched — flagged precisely because these numbers
circulate widely); AI code-review false-positive rates (no sources found); Google's "6% reduction in
coding iteration time, 10K developers" (third-hand, seen only inside Perry et al.'s related work).

### 3.4 Cluster 4 — Non-functional verification standards (W4)

Full raw detail: `_raw/canon-w4.md`. W4 used 12 of 15 WebSearch calls and was unusually disciplined
about verification status — it **corrected four assumptions in my brief** and **refused to assert the
widely-repeated "only ~30% of WCAG issues are machine-detectable" figure** because no citable source
could be found. That refusal is a finding: do not ship that number.

**This cluster answers one question per standard: what constitutes evidence of conformance, as opposed
to a passing scan?** The table in §4.6 below is the condensed answer.

#### Accessibility

**WCAG 2.2 is a W3C Recommendation dated 12 December 2024** — current and normative
(https://www.w3.org/TR/WCAG22/). The **five conformance requirements** are the heart of the
evidence-vs-scan distinction:

1. **Conformance Level** — *"Three levels of conformance are defined: A (lowest), AA, and AAA (highest)."*
2. **Full Pages** — *"Conformance is defined for full pages"*; a page cannot conform by fixing part of itself.
3. **Complete Processes** — *"When a process involves multiple web pages, all pages in the process
   conform at the specified level."* You cannot claim conformance for a checkout flow if only some
   steps conform.
4. **Accessibility Support** — technologies must be used in ways that are *"supported by users'
   assistive technologies as well as the accessibility features in browsers and other user agents."*
5. **Non-Interference** — non-supported technology may be present only if it does not block access to
   the rest of the page.

Plus **conforming alternate versions** as a permitted route.

> **Why this matters to the skill:** an automated scan is at best partial evidence toward requirement 4
> and says **nothing at all** about requirements 2, 3, or 5. WCAG's own conformance model is the single
> best existing argument in any standard that a passing scan is not conformance.

**New in 2.2 — 9 success criteria:** 2.4.11 Focus Not Obscured (Minimum) AA · 2.4.12 Focus Not Obscured
(Enhanced) AAA · 2.4.13 Focus Appearance AAA · 2.5.7 Dragging Movements AA · 2.5.8 Target Size (Minimum)
AA · 3.2.6 Consistent Help A · 3.3.7 Redundant Entry A · 3.3.8 Accessible Authentication (Minimum) AA ·
3.3.9 Accessible Authentication (Enhanced) AAA.
**4.1.1 Parsing is removed** — verbatim: *"4.1.1 Parsing is obsolete and removed from WCAG 2.2."*

**ACT Rules** — developed by the ACT Rules Community Group and the ACT Task Force of the AG WG; the
listing carries filter categories **"Manual," "Semi-Automatic," "Automated," "Linter"**, which is itself
the taxonomy proving conformance needs more than automation. Rule count ~145 at act-rules.github.io
`[UNVERIFIED — approximate, read from a dynamically-rendered listing]`.

> **The machine-testable boundary — closed by the github channel, not here.** W4 could not find a
> citable source for the automation-coverage proportion and correctly declined to invent one. The
> github channel closed it from the tooling side, with better evidence than the canon side could reach:
> the formal **EARL test-mode split `automatic` / `manual` / `semiAuto`** (a standards-body
> formalisation of "the tool could not decide"), **axe-core's `incomplete` result class returnable by
> 55% of its 105 documented rules**, the **57% Deque 2021** figure with methodology, the **80.39%**
> figure flagged UNCONFIRMED, and the finding that **axe's four impact levels are not WCAG conformance
> levels.** All `[github-channel verified]`, reproduced here with that attribution and **not
> independently re-derived.** See §0 for why this matters beyond accessibility.

**WebAIM Million 2026** (published 30 March 2026, https://webaim.org/projects/million/):
**95.9% of home pages had detected WCAG 2 failures**, **56.1 errors per page**. Top six: low contrast
text 83.9% · missing alt text 53.1% · missing form input labels 51% · empty links 46.3% · empty buttons
30.6% · missing document language 13.5% — together **96% of all detected errors**.
`[Figures fetch-summarized from the live page, not hand-checked against the report PDF.]`

**VPAT / ACR** (https://www.itic.org/policy/accessibility/vpat). Four editions: **VPAT 2.5 508**,
**2.5 EU** (EN 301 549), **2.5 WCAG**, **2.5 INT**. The distinction that matters, verbatim:
*"A version of the VPAT which has been completed for a specific product is an ACR."* The template is not
evidence; the completed report is — and even then it is evidence of a **vendor's claim**, not a
third-party verification. Conformance vocabulary confirmed: **"supports; partially supports; does not
support; or not applicable."** `[UNVERIFIED]` the expected fifth term **"Not Evaluated"** did not appear
on the fetched page — do not quote it without checking the VPAT 2.5 template itself.

**EN 301 549** — V3.2.1 (March 2021), WCAG 2.1 AA-aligned; a V4.1.x aligning to WCAG 2.2 is expected in
2026. Produced jointly by CEN, CENELEC and ETSI; broader than WCAG (covers non-web software, documents,
hardware, telecoms). **European Accessibility Act**: enforcement began 28 June 2025, full compliance
28 June 2030. `[UNVERIFIED — all EN 301 549 and EAA facts are from secondary legal/standards commentary;
neither the ETSI document nor EUR-Lex was fetched.]`

#### Performance

**Core Web Vitals, verified at https://web.dev/articles/vitals on 2026-07-26 — LCP, INP, CLS:**
- **LCP** — *"should occur within 2.5 seconds of when the page first starts loading."*
- **INP** — *"pages should have an INP of 200 milliseconds or less."*
- **CLS** — *"pages should maintain a CLS of 0.1 or less."*
- Measurement convention, verbatim: *"a good threshold to measure is the **75th percentile** of page
  loads, segmented across mobile and desktop devices."*
- INP's promotion confirmed: *"INP was promoted in 2023 from experimental to pending status with the
  intent to eventually retire FID"* and *"INP became a stable Core Web Vital metric in 2024."*

`[UNVERIFIED]` the "needs improvement"/"poor" upper boundaries were **not** re-quoted this session — only
the "good" thresholds are freshly verified. The 28-day CrUX window was likewise not re-quoted.

**Field vs lab, verbatim** — the sentence that settles the "is a green Lighthouse score evidence?" question:

> "While lab measurement is an essential part of delivering great experiences, it is not a substitute
> for field measurement... Only field measurement can accurately capture the complete picture."

#### Load and capacity

**Coordinated omission — Gil Tene.** The highest-value, least-written-down concept in this cluster.
Verbatim from Tene's mechanical-sympathy thread
(https://groups.google.com/g/mechanical-sympathy/c/icNZJejUHfE/m/BfDekfBEs_sJ):

> "Omission on its own is not a big problem, as long as the omission is random... However, when omission
> is coordinated with observed events, it can dramatically skew the statistical analysis of the
> remaining results."

— the problem being that *"we are only omitting the 'very bad results'."* A closed-loop load generator
that waits for a response before issuing the next request sends **fewer** requests during a stall, so a
long pause becomes one outlier sample instead of the many high-latency samples it should have produced.
Every percentile is deflated. Worked magnitude from ScyllaDB's explainer
(https://www.scylladb.com/2021/04/22/on-coordinated-omission/): uncorrected **P99 = 249µs**;
corrected **P99 = 665ms** — *"over 2,600 times higher."*

**Open vs closed workload models** — Schroeder, Wierman & Harchol-Balter, *"Open Versus Closed: A
Cautionary Tale"*, NSDI 2006. `[UNVERIFIED]` **every** primary route (USENIX PDF and conference page,
kilthub, ResearchGate, Semantic Scholar) returned 403 or empty. The open/closed definitions and the
paper's thesis in `_raw/canon-w4.md §3.1` are standard secondary characterization, **not a verified
quote.** Treat with more caution than anything else in this corpus.

**Tail at scale** — Dean & Barroso, CACM 2013. Verbatim (via ufried.com quoting the paper; CACM 403'd):

> "It is challenging for service providers to keep the tail of latency distribution short for
> interactive services as the size and complexity of the system scales up or as overall use increases.
> Temporary high-latency episodes (unimportant in moderate-size systems) may come to dominate overall
> service performance at large scale."

**Load-type vocabulary** (load / stress / soak / spike / capacity) — ISTQB glossary definitions surfaced
via WebSearch only; **glossary.istqb.org returned 403 twice** `[UNVERIFIED — re-verify before quoting as
"verbatim ISTQB"]`.

#### Security

**OWASP ASVS 5.0.0**, released **30 May 2025** at Global AppSec EU Barcelona — **supersedes 4.0.3; do
not report 4.0.3 as current.** The three verification levels, verbatim from
`OWASP/ASVS` tag `v5.0.0`, `0x03-What-is-the-ASVS.md`:

> **Level 1:** "This level contains the minimum requirements to consider when securing an application
> and represents a critical starting point."
> **Level 2:** "Most applications should be striving to achieve this level of security. Around 50% of
> the requirements in the ASVS are L2."
> **Level 3:** "This level should be the goal for applications looking to demonstrate the highest levels
> of security and provides the final ~30% of requirements to comply with."

**ASVS's level model is the best existing example in any standard of "how much verification is
warranted."** And it carries the sharpest scan-vs-verification statement available: L1 is externally
penetration-testable; **L2 and L3 require access to documentation, architecture, source code, and the
people involved** — i.e. cannot be reached by black-box scanning at all.

ASVS 5.0.0 chapters are a **restructure vs 4.x** (V1–V17): V1 Encoding and Sanitization · V2 Validation
and Business Logic · V3 Web Frontend Security · V4 API and Web Service · V5 File Handling ·
V6 Authentication · V7 Session Management · V8 Authorization · V9 Self-contained Tokens · V10 OAuth and
OIDC · V11 Cryptography · V12 Secure Communication · V13 Configuration · V14 Data Protection ·
V15 Secure Coding and Architecture · V16 Security Logging and Error Handling · V17 WebRTC.

**OWASP WSTG 4.2** (released 3 December 2020; v5.0 in development). Twelve categories:
WSTG-INFO Information Gathering · WSTG-CONF Configuration and Deployment Management · WSTG-IDNT Identity
Management · WSTG-ATHN Authentication · WSTG-ATHZ Authorization · WSTG-SESS Session Management ·
WSTG-INPV Input Validation · WSTG-ERRH Error Handling · WSTG-CRYP Weak Cryptography · WSTG-BUSL Business
Logic · WSTG-CLNT Client-side · WSTG-APIT API Testing. ID format, verbatim: *"Each scenario has an
identifier in the format `WSTG-<category>-<number>`..."*

**OWASP Top 10:2025** — current; **supersedes 2021.** A01 Broken Access Control · A02 Security
Misconfiguration · A03 Software Supply Chain Failures · A04 Cryptographic Failures · A05 Injection ·
A06 Insecure Design · A07 Authentication Failures · A08 Software or Data Integrity Failures ·
A09 Security Logging and Alerting Failures · A10 Mishandling of Exceptional Conditions.

**OWASP Top 10 for LLM Applications 2025** — LLM01 Prompt Injection · LLM02 Sensitive Information
Disclosure · LLM03 Supply Chain · LLM04 Data and Model Poisoning · LLM05 Improper Output Handling ·
LLM06 Excessive Agency · LLM07 System Prompt Leakage · LLM08 Vector and Embedding Weaknesses ·
LLM09 Misinformation · LLM10 Unbounded Consumption.

> The Top 10 lists are **awareness documents, not verification checklists.** "We checked the OWASP Top
> 10" is not a verification claim; "we verified against ASVS L2, chapters mapped to A01–A10:2025" is.

#### AI and privacy

**NIST AI RMF (AI 100-1)** — four core functions **GOVERN, MAP, MEASURE, MANAGE** confirmed by name.
`[UNVERIFIED]` NIST's individual one-line definition of each function could not be extracted (AIRC
sub-pages 404'd; the AI 100-1 PDF returned undecoded binary). The **seven characteristics of trustworthy
AI** — Valid and Reliable · Safe · Secure and Resilient · Accountable and Transparent · Explainable and
Interpretable · Privacy-Enhanced · Fair with Harmful Bias Managed — are `[near-verbatim]` from NIST's own
AIRC site but fetch-summarized, not character-checked. **NIST AI 600-1, the Generative AI Profile, was
released 26 July 2024** (verbatim from nist.gov).

`[UNVERIFIED — all secondary]` ISO/IEC 42001, ISO/IEC 23894, the EU AI Act high-risk conformity date of
2 August 2026, and prEN 18286's status all come from compliance-vendor and law-firm commentary. No ISO
or EUR-Lex primary document was fetched.

**Privacy.** Google **Consent Mode v2** has four parameters — `ad_storage`, `analytics_storage`,
`ad_user_data`, `ad_personalization` — each `'granted'` or `'denied'`; the v2 update added the latter two
in November 2023. Google's own recommended verification method is **inspecting actual tag firing in Tag
Assistant**, not reading the implementation code — which is the evidence-vs-assertion principle appearing
in a vendor's own docs. **GPC**: California's CCPA regulations §999.315(c) reportedly require honoring
user-enabled global privacy controls as a valid opt-out `[UNVERIFIED — secondary legal commentary;
oag.ca.gov not read. The cited $2.75M Disney settlement figure must be re-verified before use.]`

W4 correctly flagged its privacy section as **engineering verification practice, not legal advice.**

#### 4.6 W4's evidence-vs-scan table (condensed)

| Standard | A passing scan is… | Evidence of conformance is… |
|---|---|---|
| WCAG 2.2 | an a11y linter on one page state | full pages + complete processes + accessibility-supported AT testing + non-interference + an explicit A/AA/AAA claim |
| ACT Rules | running only the "Automated" rules | Automated **+** Semi-Automatic **+** Manual rules executed |
| VPAT/ACR | a blank template | a completed criterion-by-criterion ACR with few "Not Evaluated" rows, ideally independently audited |
| Core Web Vitals | one green Lighthouse run | 75th-percentile field/CrUX data across mobile **and** desktop over a real-usage window |
| Load/capacity | one run at target RPS reporting client-side p99 | declared workload model + coordinated-omission-corrected percentiles + the test *type* matched to the risk |
| WSTG | an automated DAST crawl | manual execution of category procedures, especially WSTG-BUSL and WSTG-ATHZ |
| ASVS | "ASVS compliant" with no level | an explicit L1/L2/L3 claim backed by the access that level requires |
| Top 10 / LLM Top 10 | "we checked the Top 10" | using the list to *scope* a verification effort (ASVS mapping; red-teaming) |
| NIST AI RMF | "RMF-aligned" in marketing | artifacts across all four functions measured against the seven characteristics |
| GDPR/CCPA | a cookie banner exists | network-verified pre-consent blocking, working withdrawal, fulfilled DSARs, measurable GPC effect |

### 3.5 Cluster 5 (lead) — Assurance cases and quality models

Full detail in `_raw/canon-lead.md`. Headline material is in §1.1 and §1.2 above. Remaining item:

**ISO/IEC 25010:2023** (2nd edition), *SQuaRE — Product quality model*.
https://www.iso.org/standard/78176.html. **Nine** characteristics. The second edition, with ISO/IEC
25002 and ISO/IEC 25019, **cancels and replaces ISO/IEC 25010:2011**. Verified changes: **Safety added**
as a characteristic; **"usability" renamed "interaction capability"**; **"portability" renamed
"flexibility"**.

> Note: iso.org returns **HTTP 403** to WebFetch. The edition and change facts come from ISO catalogue
> text via WebSearch, corroborated by iso25000.com matching the 2023 vocabulary exactly (Safety,
> Flexibility, Interaction capability, Faultlessness, Resistance — none of which exist in the 2011
> model). Sub-characteristic *wording* is verified only against iso25000.com.

The nine, with sub-characteristics: **Functional Suitability** (completeness, correctness,
appropriateness) · **Performance Efficiency** (time behaviour, resource utilization, capacity) ·
**Compatibility** (co-existence, interoperability) · **Interaction Capability** (appropriateness
recognizability, learnability, operability, user error protection, user engagement, **inclusivity**,
user assistance, self-descriptiveness) · **Reliability** (faultlessness, availability, fault tolerance,
recoverability) · **Security** (confidentiality, integrity, non-repudiation, accountability,
authenticity, **resistance**) · **Maintainability** (modularity, reusability, analysability,
modifiability, **testability**) · **Flexibility** (adaptability, scalability, installability,
replaceability) · **Safety** (operational constraint, risk identification, fail safe, hazard warning,
safe integration).

Two observations for the skill: **testability is a sub-characteristic of maintainability** — the
standard treats "can this be verified at all" as a property of the product, not of the test suite. And
**inclusivity** is now first-class vocabulary, which gives accessibility a home in the quality model
rather than as a bolt-on.

---

## 4. CONTESTED VS. CONSENSUS

Mapped, not resolved. A skill that pretends these are settled will be wrong in front of someone who
knows the literature.

### 4.1 Genuinely contested

**C1 — Pyramid vs. Trophy vs. Honeycomb vs. Diamond.** Cohn/Google put the mass at the bottom (unit);
Dodds puts it in the middle (integration); Spotify's honeycomb puts it in the middle *for microservices
specifically*; the diamond has no identifiable originator. **Fowler's own diagnosis is that part of the
fight is definitional** — a "sociable unit test" and a "narrow integration test" can be the same physical
test under different labels. But not all of it: Spotify's argument is substantive and architecture-scoped
(*"The biggest complexity in a Microservice is not within the service itself, but in how it interacts
with others"*). **Do not pick a shape.** The defensible position is that the mix follows where the
system's bug sources actually are.

**C2 — Is the ratio question even a useful unit of guidance?** Google's book states 80/15/5 as a "very
rough guideline"; Fowler, quoting Searls, calls percentage debates *"a distraction"*; Beck's desiderata
are properties, not proportions. **Both camps are current and credible.** This is a live methodological
disagreement about the *form* of testing guidance, not just its content — and it matters, because a
skill that emits ratios is taking a side.

**C3 — Google against Google on the ratio.** The book says **80/15/5**; Mike Bland, a Google engineer
writing in 2011, said **70/20/10** and openly admitted the numbers were *"pulled out of a hat."* Same
institution, ~13 years apart, one of them disclaiming precision. Treat both as illustrative anchors, not
constants.

**C4 — Classicist vs. mockist.** Fowler: *"use real objects if possible and a double if it's awkward."*
Mockists: always mock any object with interesting behavior. **Fowler explicitly declines to call this
settled**, conceding he has only tried the mockist style *"on toys"* and that *"many good developers...
are very happy and convinced mockists."* Google's ch. 13 lands on Fowler's side by preference order
(real > fake > stub > mock) and reports institutional regret over mock overuse — but that is one
organization's experience, not a proof.

**C5 — Coverage targets — and this one is closer to *settled* than the others.** Fowler: coverage is
*"of little use as a numeric statement of how good your tests are."* Marick, 1997: *"Don't use code
coverage in test design."* And **Inozemtseva & Holmes (ICSE 2014) supply the empirical result** —
controlling for suite size, the coverage/effectiveness correlation collapses, and one project shows a
*negative* correlation. **The "should there be a target" question is answered: no.** What remains
genuinely open is the *residual* disagreement about whether any number is useful as a **floor** — Fowler
says *"below half [is] a sign of trouble"*; Dodds publishes **~70%** as a diminishing-returns point (his
own heuristic, not data). Marick's distinction, quoted by Fowler, is still the sharpest framing:
*"I expect a high level of coverage. Sometimes managers require one. There's a subtle difference."*

**C10 — Is mutation score the replacement?** Inozemtseva & Holmes propose it: *"mutation score may be a
good substitute for coverage in this context."* **Google, four years later, explicitly rejected it** at
scale — infeasible to compute and, worse, *"unable to find a good way to surface it to the engineers in
an actionable way."* Both positions are primary-sourced and current. The reconciliation is probably that
mutation testing is a good *per-diff finding generator* and a bad *aggregate score* — but that is a
synthesis, not something either source states.

**C11 — Do flaky tests get deleted or triaged?** Fowler: a test you ignore on failure *"is useless and
you might as well throw it away."* Luo et al.'s own slide title: **"Flaky Tests Are Still Valuable For
Catching Bugs and Should Not be Ignored or Removed."** These are in real tension. The resolvable reading
is that Fowler is talking about *leaving it in the healthy suite* and Luo et al. about *discarding the
signal* — but the surface advice genuinely conflicts, and a skill should say so rather than pick.

**C12 — DORA's own framework is unstable.** The current dora.dev guide (5 January 2026) lists **five**
metrics, not four, and renames "change failure rate" to **"change fail rate"**, adding "deployment rework
rate" and "failed deployment recovery time." No Elite/High/Medium/Low thresholds appear on it.
`[UNVERIFIED]` third-party sources claim the 2025 report replaced the four-tier model with seven "team
archetypes." **Any skill quoting DORA tier thresholds is quoting something that has moved twice
recently.** Track the trend, not the tier.

**C6 — ISTQB / ISO 29119 vs. the context-driven school.** The genuine finding is that **the conflict is
narrower than the rhetoric.** ISTQB's Principle 6 *"Testing is context dependent"* **cites Kaner 2011** —
the context-driven co-founder who initiated the Stop 29119 petition. The Seven Principles are largely
compatible with context-driven epistemology. What is actually contested is (a) **certification as an
industry gatekeeping mechanism** and (b) **29119's prescriptive process/documentation apparatus**. And
the sharpest objection is not philosophical but legal: *"The existence of a standard makes it easier for
a court... to rule that the standard-approved approach is the professionally correct one."* **Present
both sides; the tie-breaker when they conflict is Context-Driven Principle 2.**

**C7 — Do the testing quadrants describe anything real?** Marick's 2003 2×2, twice relabelled by Crispin
& Gregory, absorbed into ISTQB §5.1.7 — and attacked head-on by Bach & Bolton, who object that pinning
techniques to quadrants is confused (*"Can we not test [a] component using an exploratory approach?"*)
and that the "Supporting Programming" axis implies critique isn't support. ISTQB assigns exploratory
testing to Q3 alone; Bach & Bolton hold that exploration is a **stance available everywhere**, not a
technique with an address. **This is a live, direct, primary-sourced disagreement.**

**C8 — Are FEW HICCUPPS-style heuristics useful for automation?** Bach & Bolton offer them as oracle
generators. **Kaner, in the same tradition, calls them "worthless for designing automated tests"**
because *"the consistencies don't guide testers toward oracle ideas that are specific enough to be
programmed."* Both are right about different jobs — but a skill that hands FEW HICCUPPS to an agent as a
test-generation device is on the wrong side of Kaner's objection.

**C9 — Is an assurance case worth building at all?** ISO/IEC 15026-2 specifies one; Greenwell et al.
(2006) and the current "defeaters"/"assurance weakeners" literature find industrial safety arguments
routinely fallacious. **The standard itself concedes the point** — it constrains *existence* of content,
explicitly *not* quality of content. Ship the dossier and the adversarial read of it, or ship neither.

### 4.2 Genuine consensus (safe to build on)

- **Exhaustive testing is impossible** — ISTQB Principle 2 (citing Manna 1978); Kaner's BBST
  ("the impossibility of complete testing"); Weyuker 1980. Every school.
- **Testing shows presence, not absence, of defects** — ISTQB Principle 1 (citing Buxton 1970);
  the refutation framing in McDermott & Fox 1999. Cross-school.
- **Test observable behavior / the public contract, not implementation** — Fowler, Google ch. 12,
  Dodds ("nobody cares about the testing user"). Convergent across otherwise-opposed camps.
- **Tests should change when requirements change, not when implementation changes** — Google ch. 12;
  Beck's desiderata #8 Structure-insensitive.
- **A scan is not conformance** — WCAG's own five conformance requirements, ASVS's level-access model,
  and web.dev's field-vs-lab statement all say it independently.
- **Context determines the value of a practice** — Context-Driven Principle 1, and **ISTQB Principle 6
  agrees in writing.**
- **Quality is value to some person who matters** — Weinberg + Bach; uncontested, and it is what forces
  the "whose values?" question that risk-ranking depends on.

### 4.3 A staleness finding worth recording

**The ISTQB CTFL v4.0.1 syllabus (15 September 2024) cites ISO/IEC 25010's *eight* characteristics**
(Performance efficiency, Compatibility, Usability, Reliability, Security, Maintainability, Portability,
Safety). That is the **2011** model with Safety bolted on. **ISO/IEC 25010:2023** has **nine**, renamed
Usability → Interaction Capability and Portability → Flexibility, and adds Safety properly. A 2024
syllabus is referencing a superseded quality model with non-current vocabulary. Two independently
verified facts, in direct tension — a good illustration for the skill that **standards references go
stale and must be date-checked**, not inherited.

---

## 5. THRESHOLDS & NUMBERS

Every citable numeric criterion found, with source and verification status. **Confidence column is the
important one** — anything below "verified" must not be shipped as fact without re-checking.

### 5.1 Test strategy

| Number | What it measures | Source | Date | Confidence |
|---|---|---|---|---|
| **80 / 15 / 5** | unit / integration / e2e mix, *"a very rough guideline"* | *SWE at Google* ch. 11, abseil.io | book 2020, checked 2026-07-26 | Verified verbatim |
| 70 / 20 / 10 | small / medium / large mix, author says *"pulled out of a hat"* | Mike Bland, mike-bland.com | 1 Nov 2011 | Verified verbatim; author disclaims precision |
| ~70% coverage | Dodds' diminishing-returns point | kentcdodds.com/blog/write-tests | 13 Jul 2019 | Verified; personal heuristic, not data |
| **0.15%** | Google's steady-state flaky rate | *SWE at Google* ch. 11 | checked 2026-07-26 | Verified verbatim |
| **~1%** | flakiness beyond which *"tests begin to lose value"* | *SWE at Google* ch. 11 | checked 2026-07-26 | Verified verbatim |
| ~1.5% | flaky test *runs* | Google Testing Blog 2016 (Micco), via secondary citation | 27 May 2016 | **`[UNVERIFIED]`** — body text not retrievable; may measure a different quantity than 0.15% |
| 15 min / 1 hr | Google Large-test default timeouts | *SWE at Google* ch. 14 | checked 2026-07-26 | Verified verbatim |
| 1 thread / 1 process / 1 machine | Small-test hard constraint | *SWE at Google* ch. 11/14 | checked 2026-07-26 | Verified verbatim (fuller constraint table **not** retrievable) |
| 87% / 100% | coverage mandates cited as cautionary examples | Fowler, bliki/TestCoverage.html | 17 Apr 2012 | Illustrative, not attributed to a real policy |

### 5.2 Accessibility

| Number | What it measures | Source | Version / date | Confidence |
|---|---|---|---|---|
| **A / AA / AAA** | *"Three levels of conformance are defined: A (lowest), AA, and AAA (highest)"* | w3.org/TR/WCAG22 | Rec. 12 Dec 2024 | Verified verbatim |
| **9** | new Success Criteria in WCAG 2.2 | w3.org/WAI/…/new-in-22 | WCAG 2.2 | Verified (all nine listed in §3.4) |
| 4.1.1 Parsing | *"obsolete and removed from WCAG 2.2"* | w3.org/WAI/…/new-in-22 | WCAG 2.2 | Verified verbatim |
| ~145 | approved ACT rules | act-rules.github.io/rules | live, 2026-07-26 | **`[UNVERIFIED — approximate]`**, dynamic page |
| **95.9%** | home pages with detected WCAG 2 failures | webaim.org/projects/million | 2026 report, pub. 30 Mar 2026 | Verified from live page (not hand-checked vs PDF) |
| **56.1** | average detected errors per page | webaim.org/projects/million | 2026 report | Same |
| 83.9 / 53.1 / 51 / 46.3 / 30.6 / 13.5 % | low contrast / missing alt / missing labels / empty links / empty buttons / missing lang | webaim.org/projects/million | 2026 report | Same; together **96%** of all detected errors |
| **57%** | proportion of WCAG issues detectable by automation | **Deque, 2021** — methodology captured | 2021 | **`[github-channel verified]`** — use this figure |
| 80.39% | the widely circulated alternative | — | — | **`[UNCONFIRMED — github channel]`** do not repeat |
| ~30% | practitioner folklore figure | — | — | **NOT FOUND.** W4 searched this channel; no citable source. **Do not ship it.** |
| **55%** | share of axe-core's **105** documented rules that can return **`incomplete` / "needs review"** | axe-core | 2026-07-26 | **`[github-channel verified]`** |
| 3 | ACT Rules EARL test modes — `automatic` / `manual` / `semiAuto` | W3C ACT Rules | — | **`[github-channel verified]`** |
| 4 | axe impact levels — **not** WCAG conformance levels; different namespaces | axe-core | — | **`[github-channel verified]`** |
| 28 Jun 2025 / 28 Jun 2030 | EAA enforcement start / full compliance | secondary legal commentary | — | **`[UNVERIFIED — primary]`** |

### 5.3 Performance and load

| Number | What it measures | Source | Date | Confidence |
|---|---|---|---|---|
| **LCP ≤ 2.5 s** | *"within 2.5 seconds of when the page first starts loading"* | web.dev/articles/vitals | 2026-07-26 | Verified verbatim |
| **INP ≤ 200 ms** | *"200 milliseconds or less"* | web.dev/articles/vitals | 2026-07-26 | Verified verbatim |
| **CLS ≤ 0.1** | *"0.1 or less"* | web.dev/articles/vitals | 2026-07-26 | Verified verbatim |
| **75th percentile** | *"segmented across mobile and desktop devices"* | web.dev/articles/vitals | 2026-07-26 | Verified verbatim |
| — | CWV "needs improvement" / "poor" upper bounds | — | — | **`[UNVERIFIED]` — not re-quoted this session** |
| 28 days | CrUX rolling window | — | — | **`[UNVERIFIED]` — not re-quoted this session** |
| 249 µs → 665 ms | p99 before/after coordinated-omission correction — *"over 2,600 times higher"* | scylladb.com, 22 Apr 2021 | 2026-07-26 | Verified from the secondary source that publishes it |

### 5.4 Security

| Number | What it measures | Source | Version | Confidence |
|---|---|---|---|---|
| **ASVS 5.0.0** | current version — **supersedes 4.0.3** | owasp.org ASVS project | rel. 30 May 2025 | Verified |
| **~50%** | *"Around 50% of the requirements in the ASVS are L2"* | OWASP/ASVS `v5.0.0` `0x03` | ASVS 5.0.0 | Verified verbatim |
| **~30%** | L3 provides *"the final ~30% of requirements"* | OWASP/ASVS `v5.0.0` `0x03` | ASVS 5.0.0 | Verified verbatim |
| **17** | ASVS 5.0.0 chapters (V1–V17) — a restructure vs 4.x | github.com/OWASP/ASVS tag v5.0.0 | ASVS 5.0.0 | Verified |
| **WSTG 4.2** | current stable, **12** test categories | owasp.org WSTG | rel. 3 Dec 2020 | Verified |
| **Top 10:2025** | current edition — **supersedes 2021** | owasp.org/Top10/2025 | 2025 | Verified (exact month/day not surfaced) |
| **LLM Top 10:2025** | current edition | genai.owasp.org/llm-top-10 | 2025 | Verified |

### 5.5 Standards structure

| Number | What it measures | Source | Confidence |
|---|---|---|---|
| **5** | assurance-case principal components (claims, arguments, evidence, justifications, assumptions) | ISO/IEC 15026-2:2011 §6.2 | Verified verbatim from the standard's text |
| **3 required + 4 optional/conditional** | claim content fields; uncertainty and conditions are *required* | ISO/IEC 15026-2:2011 §6.3.2 | Verified verbatim |
| **9** | ISO/IEC 25010:**2023** quality characteristics (was 8 in 2011) | iso.org 78176 / iso25000.com | Verified by corroboration (iso.org 403s) |
| **8** | ISO/IEC 25010 characteristics as cited by **ISTQB CTFL v4.0.1 (2024)** | ISTQB syllabus §2.2 | Verified — and **stale**, see §4.3 |
| **7** | ISTQB testing principles · Context-Driven principles · NIST trustworthy-AI characteristics | ISTQB CTFL v4.0.1; context-driven-testing.com; NIST AIRC | Verified (NIST wording near-verbatim) |
| **12** | Beck's Test Desiderata | testdesiderata.com | Verified verbatim |
| **11** | FEW HICCUPPS consistency oracles · Bolton's stopping heuristics (+1 from Kaner) · Hoffman oracle types | developsense.com; kaner.com | Names verified; Hoffman definitions `[UNVERIFIED]` |
| **5** | test doubles (Dummy, Fake, Stub, Spy, Mock) | Meszaros via Fowler | `[UNVERIFIED]` primary — xunitpatterns.com unreachable |
| **4** | NIST AI RMF core functions (GOVERN/MAP/MEASURE/MANAGE) | nist.gov | Names verified; **individual definitions `[UNVERIFIED]`** |
| **7 / 10 / 9** | SFDIPOT product elements / CRUSSPIC STMPL-ish quality criteria / HTSM technique families | HTSM v6.0, 8 Feb 2024 | Verified verbatim from the PDF |

### 5.6 Coverage, mutation, flakiness and defects (W3)

All rows below were read from primary papers, not summaries, unless noted.

| Number | What it measures | Source | Date | Confidence |
|---|---|---|---|---|
| **"upper 80s or 90s"** | coverage of a thoughtfully tested codebase — a *symptom*, not a target | Fowler, TestCoverage | 17 Apr 2012 | Verified verbatim |
| **below ~50%** | *"a sign of trouble"* | Fowler, TestCoverage | 17 Apr 2012 | Verified verbatim |
| 85% | commonly mandated coverage gate; teams cluster just above it | Marick | 1997/1999 | Verified quote; **the clustering is his anecdote, not a study** |
| **31,000 suites · 5 systems · 724,089 SLOC** | scale of the coverage-effectiveness study | Inozemtseva & Holmes, ICSE 2014 | 2014 | Verified verbatim |
| τ **0.75–0.85** → **~0** | coverage/effectiveness correlation before vs. after controlling for suite size | Inozemtseva & Holmes | 2014 | Verified verbatim |
| τ **−0.35** | coverage/effectiveness on HSQLDB — **negative** | Inozemtseva & Holmes | 2014 | Verified verbatim |
| τ **0.91–0.92** | correlation *between* statement, decision and MC/DC coverage — they are near-interchangeable | Inozemtseva & Holmes | 2014 | Verified verbatim |
| **>99%** | 2nd/3rd-order mutants killed by tests that killed 1st-order mutants (coupling effect, program FIND) | Jia & Harman TSE 2011, citing Lipton & Sayward | pre-2011 | Verified inside the survey |
| 6,000 engineers · 13,000 authors · ~30% of diffs | Google mutation-testing deployment scale | Petrović & Ivanković, ICSE-SEIP 2018 | 2018 | Verified verbatim |
| 70,000 diffs · 1.1M mutants · 150,000 findings | same study | Petrović & Ivanković | 2018 | Verified verbatim |
| **20% → 80%**, settling at **75%** | developer-reported usefulness of surfaced mutants | Petrović & Ivanković | 2018 | Verified verbatim |
| median **2**, p99 **43** | living mutants per diff | Petrović & Ivanković | 2018 | Verified verbatim |
| **1.5%** | Google test *runs* reporting flaky | Google Testing Blog (Micco) | May 2016 | Read via mirror; **9–10 years old** |
| **16%** | Google tests with *some* flakiness | Google Testing Blog (Micco) | May 2016 | Same caveat |
| **3 in a row** | consecutive failures before a flagged-flaky test reports a real failure | Google Testing Blog (Micco) | May 2016 | Same caveat |
| **1 in 6** | flaky-to-fixed transitions traced to a real production bug | Google Testing Blog (Listfield) | Apr 2017 | **Low confidence** — extracted from a comment, not the article body |
| 151 projects · 1,129 commits · 486 flaky tests · 161 sampled | Luo et al. method | Luo et al., FSE 2014 slides | 2014 | Verified in the authors' own deck |
| **~78%** | Async Wait + Concurrency + Test Order Dependency as share of root causes | Luo et al. | 2014 | Verified (on-chart annotation) |
| **126 / 161** | flaky tests that were flaky from first commit | Luo et al. | 2014 | Verified |
| **24%** (38/161) | flaky fixes that also changed the code under test; 86% of those fixed a real non-deterministic bug | Luo et al. | 2014 | Verified |
| 4.56% (73K of 1.6M over 15 months) | Google TAP flaky failures | Luo et al. slides, citing Google | 2014 | **Low-medium** — third-hand |
| 8 tests / 1 week | Fowler's suggested quarantine forcing-function limits | Fowler, nonDeterminism | 14 Apr 2011 | Verified verbatim |
| **2:3** (ideal ~1:1) | test:production code ratio | van Deursen et al., XP2001 | 2001 | Verified verbatim |
| **83 / 57 / 51%** | developer-rated importance: steps to reproduce / stack traces / test cases | Bettenburg et al., FSE 2008 | 2008 | Verified verbatim |
| **0% / 0%** | importance of *hardware* and *severity* fields | Bettenburg et al. | 2008 | Verified verbatim |
| **0.321 / −0.035 / 0.839** | Spearman: devs-use vs reporters-provide / devs-value vs reporters-provide / devs-value vs reporters-*believe*-valued | Bettenburg et al. | 2008 | Verified verbatim |
| 466 responses (156 dev + 310 reporter) | survey scale | Bettenburg et al. | 2008 | Verified |
| **2× cost, >95% failures, >99.9% faulty changes** | predictive test selection trade | Machalica et al., ICSE-SEIP 2019 | 2019 | Abstract only |
| **N = 47** (33/14), `codex-davinci-002` | AI-assistant security study scale | Perry et al., CCS 2023 | data ~2022 | Verified; **model obsolete, sample small** |
| 10× / $100M per year | ODC's claimed root-cause-analysis savings | Chillarege tutorial | 2000 | Verified as a quote; **inventor's own unaudited claim** |
| **5** (not 4) | metrics on dora.dev's current "Four Keys" guide | dora.dev | page updated 5 Jan 2026 | Verified |
| — | **DORA Elite/High/Medium/Low thresholds** | — | — | **NOT PRESENT on the current guide.** Do not quote tier bands. |

---

## 6. OPEN GAPS

What could not be verified, and why. **Nothing in this section may be shipped as fact without
re-verification.** A prior build in this family shipped a WebFetch-derived claim as "verified" and it was
the sole BLOCKER in review; this section exists so that cannot recur.

### 6.1 Primary sources that were unreachable

| Source | Failure | Consequence |
|---|---|---|
| **xunitpatterns.com** (Meszaros) | `ECONNREFUSED`, 2 attempts | The five test doubles are **Fowler's transcription of Meszaros**, not first-hand. Attribute accordingly. |
| **watirmelon.blog** (Alister Scott, ice-cream cone) | expired TLS certificate | Origin story reconstructed from search snippets only. |
| **exampler.com** (Marick's 2003 quadrants posts) | TLS certificate mismatch | Recovered via Bach & Bolton's 2019 deck — high provenance (they reproduce the diagram while arguing *against* it) but still secondary. |
| **iso.org** (25010, 15026-2 catalogue) | HTTP 403, consistently | 15026-2 text obtained via the IEEE-adoption PDF mirror; 25010 wording only from iso25000.com. |
| **USENIX / kilthub / ResearchGate / Semantic Scholar** ("Open Versus Closed", NSDI 2006) | 403 or empty on **every** route | The open/closed workload argument is **standard secondary characterization, not a verified quote.** Treat with more caution than anything else here. |
| **CACM / barroso.org** ("The Tail at Scale") | 403 / undecodable PDF | Two sentences verbatim via ufried.com; the fan-out mechanism explanation is paraphrase. |
| **kaner.com/pdfs/PNSQCoracleTutorial.pdf** | 404 | Hoffman's oracle taxonomy is **names only**; per-item definitions unverified. |
| **satisfice.com SBTM PDF** | download is a client-side action; bytes not retrievable | Charter format, TBS and **PROOF** are secondary-sourced (consistent across independent sources, but not primary). |
| **ipetitions.com/petition/stop29119** | HTTP 403 | Petition date/creator confirmed via Kaner's and Bolton's own pages; **original wording and signature count unverified.** |
| **glossary.istqb.org** | HTTP 403, 2 attempts | Load/stress/soak/spike/capacity definitions are search-surfaced paraphrase. Do not quote as "verbatim ISTQB." |
| **libraopen.library.virginia.edu** (Greenwell et al. fallacy taxonomy) | empty content on both URLs | The "33 fallacies in 7 categories" figure and the category list are **secondhand and must not be shipped.** |
| **NIST AI 100-1 PDF** | undecoded binary via WebFetch; AIRC sub-pages 404 | The four RMF function **names** are verified; **their individual definitions are not.** |
| **owasp.org/www-community/Abuse_Case** | HTTP 404 | Negative result, and a useful one — OWASP has no abuse-case page. |
| **Cohn, *Succeeding with Agile*** | not freely hosted | "Cohn attached no numeric ratio" is **absence of evidence** across reachable secondary sources, not primary confirmation. |
| **exampler.com** (Marick's coverage PDF) | WebFetch cannot reach — TLS cert mismatches to `*.user.fm` | Recovered via `curl`. **Reachable, but only outside WebFetch.** |
| **IEEE 1044** | paywalled | **No verbatim classification attributes available at all.** The defect-taxonomy section rests on ODC alone. |
| **RTCA DO-178C** | paywalled | The Level A–E → coverage-type table is vendor-whitepaper sourced. Only the DO-178**B** MC/DC link is primary-confirmed (inside Inozemtseva & Holmes). |
| **testing.googleblog.com** (both flaky posts) | extraction returns reader comments, not article body | 2016 numbers read via a mirror; the 2017 "1 in 6" came from a comment reply. |
| **Luo et al. FSE 2014 paper** | ACM DL paywalled; direct download 404'd | Read the authors' own slide deck instead — primary but lossier, without the paper's methodological caveats. |
| **Humble & Farley, *Continuous Delivery*** | no text access | The **10-minute commit stage** number is unquoted. W3 declined to paraphrase it as fact. |
| **dora.dev/research/2025** | navigation shell, no report body | The "team archetypes replaced the four tiers" claim is third-party only. |
| **Chillarege 1992 IEEE TSE paper** | not fetched | ODC taxonomy read from Chillarege's own 2000 tutorial deck instead — primary author, secondary artifact. |

### 6.2 Specific numbers and claims that must not be asserted

1. ~~**Any "% of WCAG issues automation can detect" figure**~~ — **CLOSED by the github channel.** Use
   **57% (Deque, 2021)**; treat **80.39%** as UNCONFIRMED; the folklore **~30%** has no source and W4
   correctly declined to assert it. See §0 and §5.2. *This channel did not verify the 57% figure — it is
   carried with github-channel attribution.*
2. **The 2016 Google flaky-test rate (~1.5%)** — not confirmed from the post body; may measure a
   different quantity than the book's 0.15%.
3. **Google's full Small/Medium/Large constraint table** (sleeps, network, filesystem, DB). Only
   "one thread, one process, one machine" is first-hand.
4. **Greenwell et al.'s "33 fallacies in 7 categories."**
5. **The VPAT fifth term "Not Evaluated"** — expected, but not on the fetched itic.org page.
6. **CWV "needs improvement"/"poor" boundaries and the 28-day CrUX window** — not re-quoted this session.
7. **EN 301 549 version numbers, EAA dates, EU AI Act 2 Aug 2026, prEN 18286 status, ISO/IEC 42001 and
   23894** — all secondary legal/vendor commentary; no primary ETSI/ISO/EUR-Lex document fetched.
8. **The $2.75M Disney GPC settlement (Feb 2026)** — secondary legal commentary; oag.ca.gov not read.
9. **"CIDTESTD"** as HTSM's Project Environment mnemonic — **not** in HTSM v6.0 and does not map to its
   current categories.
10. **Beck's Test Desiderata original venue and date** — testdesiderata.com surfaced no date.
11. **The Testing Diamond's originator** — none identifiable.
12. **Vocke's phrase "the broadest part of your test suite"** applied to E2E tests — reads inconsistently
    with the pyramid's own claim and may be an extraction artifact. Re-check before quoting.
13. **Abuse cases as one of Gary McGraw's touchpoints** — commonly claimed, **not confirmed**; Wikipedia
    cites no such methodology usage. Check *Software Security: Building Security In* directly.
14. **Sindre & Opdahl's misuse-case publication year (2000)** — secondary sources only.
15. **The Hendrickson cheat sheet's mnemonics** (BINMEN, POISED, VADER, RCRCRC, TORCH, SACRED…) — names
    confirmed, **expansions not retrieved.** Cite the live page; never reproduce these from memory.
16. **Any quantified claim that LLM-written tests encode existing bugs as expected behavior.** W3 searched
    for it specifically and **found no study naming or measuring the phenomenon.** The reasoning is sound
    and shippable; a percentage is not.
17. **GitClear's AI code-quality/churn figures** — deliberately not fetched and deliberately not cited.
    Flagged because these numbers circulate widely and are exactly the press-release genre the brief
    warned about. If they appear elsewhere in this project's research, re-verify independently.
18. **AI code-review false-positive rates** — no sources found at all.
19. **Google's "6% reduction in coding iteration time across 10K developers"** — third-hand; seen only
    inside Perry et al.'s related-work section, never verified against a Google publication.
20. **Stryker or PIT "actionable mutation score" thresholds** — none sourced. The only primary-verified
    actionability signal is Google's per-finding feedback rate (75–80% useful), which is explicitly
    **not** a score threshold.
21. **DORA 2025 "team archetypes"** and the 18%/26% Accelerator figures — third-party blogs only.
22. **IEEE 1044 attribute names** — none available. Do not invent them.
23. **QuickCheck / Hypothesis lineage claims** — background knowledge, unverified this session.

### 6.3 Areas the channel did not cover

- **GSN (Goal Structuring Notation)** — scsc.uk/gsn is an index page with no definitions; the GSN
  Community Standard document was not reached. The element vocabulary and version are unverified. The
  ISO/IEC 15026-2 vocabulary is fully verified and sufficient on its own, so this is a nice-to-have.
- **Metamorphic testing** — deliberately deprioritised in the brief; no primary Chen et al. source read.
  It is the most credible formal partial answer to the oracle problem and deserves a pass later.
- **Compatibility matrix as strategy** — not assigned to any worker, on the competitive channel's
  finding that the capability already exists in competitors under other names. Unresearched here.
- **The 2024–2026 assurance "defeaters" / "weakeners" literature** — four papers surfaced by title and
  URL, **none read.** This is the live academic frontier on residual risk and is the highest-value
  follow-up in the corpus.
- **ISO/IEC 25002 and 25019** (new companions to 25010:2023) — existence only.

### 6.4 Budget note

**Final WebSearch total for this channel: ~59 calls** — W1 15, W2 14, W3 ~15, W4 12, lead 3.

All four workers were dispatched in parallel at the start of the pass and had **already completed or
were mid-flight** when the rationing instruction (drop to ~8 each) arrived, so it could not be applied
retroactively. No worker was starved: W2 and W3, the two load-bearing clusters, both landed complete
and each explicitly reported its own budget consumption in its file. **No worker reported search
failures from exhaustion.** The failures in §6.1 are all site-side (403 / 404 / expired TLS), not
budget-side — which means re-running this research with better PDF tooling and authenticated routes to
iso.org, IEEE and USENIX would close most of them without spending more search budget at all.

The machine-testable boundary was closed by the **github channel** rather than re-derived here, per the
lead's ruling — saving this channel an estimated 5–8 further searches.

**Tooling lesson worth carrying:** the most valuable artifacts in this corpus — ISO/IEC 15026-2,
McDermott & Fox 1999, HTSM v6.0, the ISTQB syllabus, Marick's coverage paper, Inozemtseva & Holmes,
the Google mutation paper, van Deursen's smell catalogue, Bettenburg et al. — were obtained **only** by
downloading the file and extracting text locally (`pypdf`, `pdftotext`, `curl` past a broken TLS cert)
after WebFetch returned binary, a comments section, or a lossy summary. **WebFetch's summarisation layer
is the single largest source of unverifiable claims in this research pass.** Extract, then read.

---

## 7. THE SHORTLIST

If the skill carries only five things from this corpus, carry these.

1. **Kaner's one-word edit, and the convergence behind it.** An oracle *"helps you decide"* whether a
   test passed — it does not *"tell you."* Theory (a fallible oracle cannot yield a binary truth),
   standards (ACT's `automatic`/`manual`/`semiAuto`), and tooling (55% of axe rules can return
   `incomplete`) all land on the same place from three directions. **Lead with §0** — this is the
   argument no competitor has, and it is what licenses the whole evidence-state vocabulary.
2. **"All checks passed" certifies only the propositions someone encoded.** Bach & Bolton's
   testing/checking distinction is the sharpest available tool for talking about what an automated
   suite — or an agent — actually established.
3. **Every claim carries its uncertainty and its conditions of applicability, or it is not a claim.**
   ISO/IEC 15026-2 §6.3.2 makes both `shall`-level required fields, and §6.3.3 forbids extending a claim
   past the conditions its evidence covers.
4. **Whatever is unrefuted is residual risk, and the decision-maker sees it.** McDermott & Fox, 1999 —
   with the whole mechanism attached: rank, refute, grade the refutation method, allocate the budget by
   rank, report what survived.
5. **Omission is permitted; silent omission is not.** ISO/IEC 15026-2 §7.2(b) — a documented, justified
   gap conforms; saying nothing does not. This is the single cleanest warrant for a
   "what we deliberately did not verify" section as a *required* part of the artifact.

**And the one table to build the skill around: §1b, "What this evidence does not establish."** It is the
oracle problem in operational form — one row per evidence type, pairing a tool's green result with the
scope of applicability it actually carries. It generalises: the skill should be able to generate that row
for any tool it meets.

**And one thing to carry as a warning rather than a rule:** the same literature that specifies the
evidence dossier has spent twenty years documenting that structured assurance arguments are routinely
fallacious in practice. ISO/IEC 15026-2 concedes in its own scope that it constrains the *existence* of
content, explicitly not its *quality*. A skill that ships a dossier format without shipping the
adversarial read of it has built the thing this corpus warns about.
