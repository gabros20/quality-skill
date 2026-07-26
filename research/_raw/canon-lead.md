# Canon LEAD — Assurance Cases & Quality Models (the theory of the evidence dossier)

**Researched by the channel lead, 2026-07-26.** This cluster was NOT assigned to W1–W4. It exists
because the skills-channel verdict named the **evidence dossier** — an artifact binding risk model →
verification performed → evidence produced → decision → residual risk — as the clearest opening, and
the literature already has a formal, standardised theory of exactly that object. It is called an
**assurance case**. No competing skill in the scanned ecosystem cites it.

Method: WebFetch of primary sources + direct extraction of the ISO/IEC 15026-2 PDF text (pypdf) so
that quotations are read from the standard itself, not from a fetch summary. 3 WebSearch calls used.

---

## 1. The assurance case — the formal object our "evidence dossier" is

### 1.1 Primary source, read directly

**ISO/IEC 15026-2:2011(E)**, *Systems and software engineering — Systems and software assurance —
Part 2: Assurance case*. Read as the IEEE adoption: *IEEE Standard Adoption of ISO/IEC 15026-2:2011*.
PDF: https://wildart.github.io/MISG5020/standards/ISO-15026-2.pdf
Catalogue entry: https://www.iso.org/standard/52926.html · IEEE: https://standards.ieee.org/standard/15026-2-2011.html

> **[UNVERIFIED — supersession]** NIST's glossary cites **ISO/IEC 15026-1:2019** for its assurance-case
> definition, so Part 1 has a 2019 edition. Whether **Part 2** has been revised since 2011 was not
> confirmed (iso.org returned HTTP 403 on direct fetch). Treat the 2011 text as the version read; do
> not assert it is the current edition.

**Scope, verbatim (Clause 1):**

> "This part of ISO/IEC 15026 specifies minimum requirements for the structure and contents of an
> assurance case. An assurance case includes a top-level claim for a property of a system or product
> (or set of claims), systematic argumentation regarding this claim, and the evidence and explicit
> assumptions that underlie this argumentation. Arguing through multiple levels of subordinate claims,
> this structured argumentation connects the top-level claim to the evidence and assumptions."

**The single most important sentence for us, verbatim (Clause 1):**

> "This part of ISO/IEC 15026 does not place requirements on the quality of the contents of an
> assurance case. Rather, it places requirements on the existence of the contents and structure of an
> assurance case."

That is the exact posture a skill should take: it cannot guarantee the verification was good, but it
can guarantee the dossier *has the parts*, including the parts that say what is unknown.

**Scope note, verbatim:** assurance cases are

> "generally developed to support claims in areas such as safety, reliability, maintainability, human
> factors, operability, and security, although these assurance cases are often called by more specific
> names, e.g. safety case or reliability and maintainability (R&M) case."

→ The object is domain-general. Nothing stops it covering a11y, perf, privacy, or "this AI-written
suite actually verifies something."

### 1.2 The five components — verbatim (Clause 6.2)

> "The five principal components of an assurance case are claims, arguments, evidence, justifications,
> and assumptions."

Formal definition, verbatim (Figure 1, informative):

> "An assurance case is defined to be a quadruple of a claim c, a justification j of c, a set es of
> evidence and an argument g which assures c using es."

> "Given a claim c and a set es of evidence, an argument that assures c using es is defined to be a
> reason why c is true..." (sentence continues in source)

> "Evidence is either a fact, a datum, an object, a claim or an assurance case. **A claim is called an
> assumption if it appears in an assurance case as evidence.**"

> "Comment: A claim appearing as evidence is called an assumption because such evidence is a
> proposition without any reason why it is true. When a reason for its truth is provided, it is expected
> that an assurance case, whose argument is that reason, is constructed and provided as the evidence
> instead of providing only the claim as evidence."

**This is the anti-hallucination invariant, stated formally in a 2011 ISO standard.** An unsupported
proposition entering the evidence set is not evidence — it is an assumption, and it must be labelled
as one. That is precisely the `inferred` vs `observed` distinction the skills channel identified,
with standards backing.

### 1.3 Structural requirements — verbatim (Clause 6.2)

> "a) An assurance case shall have one or more top-level claims that are the ultimate goals of its argumentation."
> "b) An argument shall be supported by one or more claims, evidence, or assumptions."
> "c) A claim shall be supported either by just one argument, or by one or more claims, evidence, or assumptions."
> "d) A claim, argument, evidence, or assumption shall not support itself either directly or indirectly."

(d) is a **no-circular-reasoning rule as a normative shall.** Directly usable: "the test suite is
correct because it passes" is a (d) violation.

> "a) The components of an assurance case shall be unambiguous, identifiable, and accessible."

### 1.4 Claim contents — the residual-risk schema, verbatim (Clause 6.3)

**6.3.1 Form of claim:**

> "A claim shall be a true-false statement that states the limitations on the values of an unambiguously
> defined property—called the claim's property, limitations on the uncertainty of the property's value
> meeting the limitations on it, and limitations on conditions under which the claim is applicable."

**6.3.2 Claim contents — the required/optional list, verbatim:**

> "a) Claim's property (required).
> b) Limitations on the value of the property associated with the claim (e.g., on its range) (required).
> c) Limitations on the uncertainty of the property value meeting its limitations (required).
> d) Limitations on duration of claim's applicability (optional).
> e) Duration-related uncertainty (optional).
> f) Limitations on conditions under which the claim is applicable (required).
> g) Condition-related uncertainty (optional).
> h) If a property in a claim applies to some subset of systems, products, or their elements, their
> identification including relevant versions or instances (conditionally required).
> i) Consequences or risks if they are relevant to claim (conditionally required)."

**This is the most valuable single find in my cluster.** Read the required fields:
- (c) **uncertainty is a required field of every claim.** A claim without stated uncertainty is
  non-conforming. That is "residual risk" as a schema obligation, from a standards body, in 2011.
- (f) **conditions of applicability are required.** "Passes on Chrome 141/macOS" is a conforming claim;
  "works in browsers" is not.
- (d) **duration of applicability** — the *expiry date* on an accepted risk, already in the standard
  (optional there; our skill can make it required).
- (h) **version/instance identification** — the claim is bound to a build.
- (i) consequences/risks attached to the claim itself.

**6.3.3 Coverage of conditions, verbatim:**

> "The conditions, including any specified durations, covered by the combination of assurance case
> components supporting a claim shall together cover the conditions, including any specified duration,
> for which the claim is applicable."

→ **The compositional / extrapolation rule, normatively.** You may not claim over conditions your
evidence does not cover. This is the standards-grade form of "never infer an untested surface from a
tested one" and of "a design-system pass is not a product-workflow pass."

**6.3.4 Justification of the choice of top-level claims, verbatim:**

> "Because the choice of a top-level claim and its property is critical in order to meet the objective
> of an assurance case and drives the assurance case's formulation, a top-level claim shall have a
> justification for its choice."
> "NOTE Justification for the top-level claim serves as a means for communicating risk among
> stakeholders of the system and for recording agreement."

→ You must justify *what you chose to prove*. That is the standard's version of "what did you
deliberately not test, and why is that the right cut."

### 1.5 Arguments — verbatim (Clause 6.4)

> "a) The argument shall be stated in a manner that uses the components directly below it.
> b) The argument shall reach a conclusion or conclusions that relate to each claim it supports.
> c) The argument shall establish the uncertainties of each conclusion it reaches.
> d) The argument shall contain the information needed to establish its effect on uncertainty."

**6.4.2, verbatim:**

> "An argument shall have an associated justification for the validity or merit of its method of
> reasoning (e.g., calculating or arguing)."
> "NOTE ... Arguments are used to support **or detract from** claims."

→ Note (c): **uncertainty must propagate.** And arguments may *detract* — counter-evidence is a
first-class citizen, not an omission.

### 1.6 Evidence — verbatim (Clause 6.5)

> "6.5.1 Evidence contents — Evidence shall contain tangible data or information."

> "NOTE Many kinds of evidence exist. Among these are human experience reports, history, observations,
> measurements, tests, evaluative and compliance results, correctness of design rationale, analyses,
> comparison of artefacts, reviews, and defects and other quality assurance and field data. Evidence
> can already exist, be newly created or collected, or be planned for the future. The evidence should
> support **or detract from** the claims in the assurance case. The body of evidence can become quite
> large and should be organized, located, and presented to be understandable to those who review,
> approve, or directly use it."

**6.5.2 Associated information, verbatim — the metadata every piece of evidence must carry:**

> "Evidence shall contain or have associated with it information regarding its:
> a) Definition.
> b) Scope of applicability.
> c) Uncertainty, including the reliability of its source (e.g., authenticity, trustworthiness, and
> competence) and the measurement accuracy."

→ **(c) "reliability of its source ... trustworthiness"** is the hook for grading agent-produced
evidence. A screenshot an agent says it took and a CI artifact with a run URL are not the same
evidence tier, and the standard already requires you to say which.

> "6.5.3 Associated assumptions — Any assumptions related to evidence shall be included in the assurance case."

### 1.7 Assumptions — verbatim (Clause 6.6)

> "6.6.1 Form of Assumption — An assumption shall take the form of a claim and a reason for it."

> "6.6.2 ... An assumption can have one of three kinds of origins. Two kinds are inherently true given
> their context and role within the assurance case. These are (1) an assumption implied by the specified
> conditions restricting the applicability of the claim(s) it supports and (2) an assumption inherent in
> a method of argumentation... These two kinds of assumptions have zero uncertainty.
> The third kind of an assumption is not inherently true; rather **it is a claim not fully warranted by
> evidence**. This third kind of assumption shall:
> a) Contain a claim and a reason for it.
> b) Contain an indication, identification, or description of the basis of the estimate of the
> uncertainty regarding the truth of the assumption."

> "NOTE For best results, such assumptions should have one or more of the following characteristics:
> have low uncertainty or low risk because they are of low criticality in argumentation, have a weak
> impact on the argumentation, have a weak effect on critical values or consequences, or **are few in
> number**."

> "6.6.3 Associated evidence — If an assumption is partially warranted or **contradicted by evidence**,
> this evidence shall be associated with it."

→ **6.6.3 is a normative duty to record counter-evidence against your own assumption.** This is the
single strongest citation available for "an assurance artifact must carry the case against itself."

### 1.8 Required outcomes — verbatim (Clause 7)

> "a) An assurance case meeting the requirements of Clause 6 shall be provided as an element of the system.
> NOTE As an element of the system, the assurance case is generally expected to be delivered with the
> system and maintained as the system is maintained."
> "b) A logical mapping meeting the requirements of 7.2 shall be provided as a part of the assurance case."
> "c) Records documenting the fulfilment of the requirements of this part of ISO/IEC 15026 shall be
> identified and referenced by the assurance case."
> "d) **Identification of the entity or entities asserting conformance shall be provided in the assurance case.**"

> "7.2 ... An assurance case shall:
> a) Include an unambiguous mapping to the components and relationships in Clause 6.
> b) **Cover all the contents specified in Clause 6 unless documented justification is provided for
> doing otherwise.**"

→ 7(a): **the dossier is part of the system and is maintained with it** — it rots if the system moves.
→ 7(d): **a named asserting entity.** Signature/ownership is normative.
→ 7.2(b): **omissions require documented justification** — you may leave a part out, but you must say
why. That is the "what we deliberately did not verify" mechanism, standardised.

### 1.9 Other definitions of "assurance case" (for triangulation)

From the NIST CSRC glossary — https://csrc.nist.gov/glossary/term/assurance_case (verbatim):

> "A reasoned, auditable artifact created that supports the contention that its top-level claim (or set
> of claims), is satisfied, including systematic argumentation and its underlying evidence and explicit
> assumptions that support the claim(s)."
> — *NIST SP 800-160v1r1, citing ISO/IEC 15026-1:2019*

> "A structured set of arguments and a body of evidence showing that an information system satisfies
> specific claims with respect to a given quality attribute."
> — *CNSSI 4009-2015 (citing NIST SP 800-39); NIST SP 800-137; NIST SP 800-39 (citing SEI, CMU)*

> "A structured set of arguments and a body of evidence showing that a system satisfies specific claims
> with respect to a given quality attribute."
> — *NIST SP 800-53A Rev. 5 (citing SEI, Arguing Security)*

**Safety case** — https://en.wikipedia.org/wiki/Safety_case, citing UK Defence Standard 00-56 Issue 4
(Part 1), *Safety Management Requirements for Defence Systems*:

> "a structured argument, supported by evidence, intended to justify that a system is acceptably safe
> for a specific application in a specific operating environment."

Note the two qualifiers doing the work: **"acceptably" safe**, for **"a specific application in a
specific operating environment."** Not "safe." Not "safe everywhere." The best one-line model in the
literature for what a release decision actually asserts.

---

## 2. Goal Structuring Notation (GSN) — the notation for the above

- SCSC GSN hub: https://scsc.uk/gsn — **[PARTIAL]** the landing page hosts standardisation info and
  the GSN Standard Working Group details, but contains **no definitions and no version number**; it is
  an index page. I did **not** reach the GSN Community Standard document itself.
- `[UNVERIFIED]` — the GSN element vocabulary (Goal, Strategy, Solution, Context, Assumption,
  Justification) and the current version/date of the **GSN Community Standard** were **not verified**.
  Wikipedia's Safety case article does reference GSN as a graphical notation used to document safety
  cases (https://en.wikipedia.org/wiki/Safety_case), which is the only GSN claim I can support.
- **Do not put GSN element definitions in the skill without re-verifying at source.** Flagged as a
  follow-up. The ISO/IEC 15026-2 vocabulary above is fully verified and is sufficient on its own.

---

## 3. The critique — assurance arguments are systematically fallacious

This is essential balance. The assurance case is not a magic artifact; the research on it is largely
research on how it goes wrong.

**Greenwell, Knight, Holloway & Pease, "A Taxonomy of Fallacies in System Safety Arguments",**
24th International System Safety Conference, Albuquerque, NM, August 2006.
Cited in ISO/IEC 15026-2:2011's own bibliography as reference [1] — **[lead-verified in the PDF]**,
where the author list is given as "Greenwell, William S., John C. Knight, and Jacob J. Pease".
Copy: https://libraopen.library.virginia.edu/public_view/fx719m45s ·
ResearchGate: https://www.researchgate.net/publication/238566332_A_Taxonomy_of_Fallacies_in_System_Safety_Arguments

**[PARTIAL — could not extract verbatim]** Both the Libra PDF endpoint
(https://libraopen.library.virginia.edu/downloads/08612n54w) and the pre-redirect URL returned empty
content to WebFetch. The following is from search-result summaries and is **secondhand**:

- `[UNVERIFIED — secondhand]` Three top categories: **relevance, acceptability and sufficiency** fallacies.
- `[UNVERIFIED — secondhand]` A later refinement gives **33 fallacies in 7 categories**: Circular
  Reasoning, Diversionary Arguments, Fallacious Appeals, Mathematical Fallacies, Unsupported
  Assertions, Omission of Key Evidence, Linguistic Fallacies.
- `[UNVERIFIED — secondhand]` The case study covered **three industrial safety cases** and found the
  frequency of logical fallacies "significant" and following "common themes."

**Do not ship the 33/7 numbers or the category list without opening the paper.** The *categories* are
too useful to lose, though — "Unsupported Assertions" and "Omission of Key Evidence" are precisely the
two failure modes of an agent-written evidence dossier. Re-verify before use.

**Related live research thread (2025–2026), surfaced but not read:**
- "A Taxonomy of Real-World Defeaters in Safety Assurance Cases" — https://arxiv.org/pdf/2502.00238
- "Evaluating AI-supported eliminative argumentation for developing reliable assurance cases",
  *Empirical Software Engineering* (2025) — https://link.springer.com/article/10.1007/s10664-025-10799-8
- "A PRISMA-driven systematic mapping study on system assurance weakeners" —
  https://www.sciencedirect.com/science/article/pii/S0950584924001319
- "Reasoning About Confidence and Uncertainty in Assurance Cases: A Survey" —
  https://conservancy.umn.edu/server/api/core/bitstreams/b124f753-1fa0-4286-8d17-1b7e1891f69a/content

All four `[UNVERIFIED — title/URL only, not read]`. The existence of an active **"defeaters"** and
**"assurance weakeners"** literature is itself the finding: the field's current frontier is *what
undermines a case*, which is the residual-risk question in its academic form.

---

## 4. ISO/IEC 25010:2023 — the quality-characteristic taxonomy

Why it belongs in this corpus: a verification skill needs a vendor-neutral answer to "quality of
*what*?" when allocating verification effort. This is the standard answer, it is current, and it was
revised in 2023 in ways that matter to this family.

**Standard:** ISO/IEC 25010:2023, *Systems and software engineering — Systems and software Quality
Requirements and Evaluation (SQuaRE) — Product quality model*, **second edition**.
https://www.iso.org/standard/78176.html · https://www.iso.org/obp/ui/en/#!iso:std:78176:en
Definitions below quoted from https://iso25000.com/index.php/en/iso-25000-standards/iso-25010

**Verified change note** (from ISO catalogue text via search, 2026-07-26):
- The second edition, with ISO/IEC 25002 (1st ed.) and ISO/IEC 25019 (1st ed.), **cancels and replaces
  ISO/IEC 25010:2011**, which has been technically revised.
- **Safety** added as a characteristic (subcharacteristics: operational constraint, risk
  identification, fail safe, hazard warning, safe integration).
- **"Usability" renamed to "Interaction capability"**; **"Portability" renamed to "Flexibility"**.
- The model comprises **nine characteristics**.

> **Note on direct verification:** iso.org returned **HTTP 403** to WebFetch on both the standard page
> and the OBP viewer. The edition/change facts above come from ISO catalogue text surfaced via
> WebSearch, corroborated by the iso25000.com content matching the 2023 vocabulary exactly (Safety,
> Flexibility, Interaction capability, Faultlessness, Resistance — none of which exist in the 2011
> model). I regard the edition claim as verified by corroboration; the *sub-characteristic wording* is
> verified only against iso25000.com, not against the standard text.

### The nine characteristics (definitions verbatim from iso25000.com)

**1. Functional Suitability**
- *Functional completeness* — "Degree to which the set of functions covers all the specified tasks and intended users' objectives."
- *Functional correctness* — "Degree to which a product or system provides accurate results when used by intended users."
- *Functional appropriateness* — "Degree to which the functions facilitate the accomplishment of specified tasks and objectives."

**2. Performance Efficiency**
- *Time behaviour* — "Degree to which the response time and throughput rates of a product or system, when performing its functions, meet requirements."
- *Resource utilization* — "Degree to which the amounts and types of resources used by a product or system, when performing its functions, meet requirements."
- *Capacity* — "Degree to which the maximum limits of a product or system parameter meet requirements."

**3. Compatibility**
- *Co-existence* — "Degree to which a product can perform its required functions efficiently while sharing a common environment and resources with other products, without detrimental impact on any other product."
- *Interoperability* — "Degree to which a system, product or component can exchange information with other products and mutually use the information that has been exchanged."

**4. Interaction Capability** (was "Usability" in 2011)
- Sub-characteristics: *Appropriateness recognizability, Learnability, Operability, User error protection, User engagement, Inclusivity, User assistance, Self-descriptiveness* (8).
- `[PARTIAL]` individual definitions not captured — page pagination. Note **Inclusivity** and
  **User assistance** are new vocabulary vs 2011; **Inclusivity** is the accessibility hook.

**5. Reliability** — "Degree to which a system, product or component performs specified functions under specified conditions for a specified period of time."
- *Faultlessness* — "Degree to which a system, product or component performs specified functions without fault under normal operation." (replaces 2011 "Maturity")
- *Availability* — "Degree to which a system, product or component is operational and accessible when required for use."
- *Fault tolerance* — "Degree to which a system, product or component operates as intended despite the presence of hardware or software faults."
- *Recoverability* — "Degree to which, in the event of an interruption or a failure, a product or system can recover the data directly affected and re-establish the desired state."

**6. Security** — "Degree to which a product or system defends against attack patterns by malicious actors and protects information and data so that persons or other products or systems have the degree of data access appropriate to their types and levels of authorization."
- Sub-characteristics: *Confidentiality, Integrity, Non-repudiation, Accountability, Authenticity, Resistance* (Resistance is new in 2023).
- `[PARTIAL]` individual definitions not captured.

**7. Maintainability** — "Degree of effectiveness and efficiency with which a product or system can be modified to improve it, correct it or adapt it to changes in environment, and in requirements."
- Sub-characteristics: *Modularity, Reusability, Analysability, Modifiability, **Testability***.
- **Testability is a sub-characteristic of Maintainability in the standard model** — worth noting: the
  standard treats "can this be verified at all" as a property of the product, not of the test suite.

**8. Flexibility** (was "Portability") — "Degree to which a product can be adapted to changes in its requirements, contexts of use or system environment."
- *Adaptability* — "Degree to which a product or system can effectively and efficiently be adapted for or transferred to different hardware, software or other operational or usage environments."
- *Scalability* — "Degree to which a product can handle growing or shrinking workloads or to adapt its capacity to handle variability."
- *Installability* — "Degree of effectiveness and efficiency with which a product or system can be successfully installed and/or uninstalled in a specified environment."
- *Replaceability* — "Degree to which a product can replace another specified software product for the same purpose in the same environment."

**9. Safety** (NEW in 2023) — "Degree to which a product under defined conditions to avoid a state in which human life, health, property, or the environment is endangered." *(sic — the definition as published on iso25000.com is ungrammatical; quoted as found)*
- *Operational constraint* — "Degree to which a product or system constrains its operation to within safe parameters or states when encountering operational hazard."
- *Risk identification* — "Degree to which a product can identify a course of events or operations that can expose life, property or environment to unacceptable risk."
- *Fail safe* — "Degree to which a product can automatically place itself in a safe operating mode, or to revert to a safe condition in the event of a failure."
- *Hazard warning* — "Degree to which a product or system provides warnings of unacceptable risks to operations or internal controls so that they can react in sufficient time to sustain safe operations."
- *Safe integration* — "Degree to which a product can maintain safety during and after integration with one or more components."

**Companion standards worth a line:** ISO/IEC 25002 (quality models overview, 1st ed.) and
**ISO/IEC 25019** (quality-in-use model, 1st ed.) — both new alongside the 2023 revision.
`[UNVERIFIED]` beyond their existence and the fact they jointly replace 25010:2011.

---

## 4b. Abuse cases — the origin of "residual risk" as a verification concept

Added because `abuse case` was one of the **seven zero-hit terms** across all 50 competing skills, and
it was not assigned to any of W1–W4. The primary paper turns out to contain the single best statement
in the entire corpus of *why* a verification skill needs a residual-risk object.

**Primary source, read directly.** John McDermott and Chris Fox, *"Using Abuse Case Models for
Security Requirements Analysis"*, **Proceedings of the 15th Annual Computer Security Applications
Conference (ACSAC), December 1999**, Scottsdale, Arizona. Department of Computer Science, James
Madison University. PDF: https://www.acsac.org/1999/papers/wed-b-1030-john.pdf
ACM: https://dl.acm.org/citation.cfm?id=784691

Method note: WebFetch could not parse the PDF; it was downloaded and extracted locally with pypdf.
**Every quotation below was read from the extracted paper text**, not from a fetch summary or a
search-result snippet.

### The definition, verbatim (§4)

> "We define an abuse case as a specification of a type of complete interaction between a system and
> one or more actors, where the results of the interaction are harmful to the system, one of the
> actors, or one of the stakeholders in the system."

### The completeness rule — harm, not just compromise (§4, verbatim)

> "We cannot define completeness just in terms of coherent transactions between actors and the system.
> Instead, we must define abuse in terms of interactions that result in actual harm. A complete abuse
> case defines an interaction between an actor and the system that results in harm to a resource
> associated with one of the actors, one of the stakeholders, or the system itself. For example, it may
> be possible to define an interaction that reveals a session key to an actor that should not see the
> session key. However, we would not call this interaction an abuse case, because no actor has used the
> compromised key to divulge the contents of a message or make an unauthorized change to stored data.
> If we extend the interaction to include the posting of the key on a public web site then we have an
> abuse case."

→ **A finding is not a finding until it lands in harm.** This is a directly liftable discipline for
severity assessment: an unexploited weakness and a demonstrated harm are different objects.

### Minimal privilege and the privilege range (§4, verbatim)

> "A further distinction we make is that an abuse case should describe the abuse of privilege used to
> complete the abuse case. Clearly, any abuse can be accomplished by gaining total control of the target
> machine through modification of the system software or firmware. In many cases it is not necessary to
> abuse this much privilege in the real system, so we need to include abuse of privilege that is less
> than maximal. To guard against simple abuses, an abuse case should describe interactions involving the
> minimal abuse of privilege necessary to accomplish the harm intended by the abusing actor. However,
> in the real system, an attacker may employ more than minimal effort. For this reason, we describe the
> range of privileges that might be used to accomplish the abuse, up to the maximum we intend to deal
> with."

→ Note the last clause: **"up to the maximum we intend to deal with."** The scope of adversary you
choose to defend against is an explicit, recorded decision — i.e. a deliberate non-coverage statement.

### The four-step construction process (§ process, verbatim; step numbering is as printed in the paper)

> "1. **Identify the actors.** After the actors of the use case model have been identified, identify the
> actors of the abuse case model. If an actor in the use case model might attempt harmful use of the
> system, then add a corresponding malicious actor to the abuse case model. After the insider roles are
> represented, then actors should be added for any intruders that might be a problem. **Distinguish
> outsiders primarily on the basis of skills and resources.**"

> "2. **Identify the abuse cases.** For each actor, determine their interactions with the system. Name
> each abuse case. At this point, it is helpful to draw an abuse case diagram."

> "4. **Define abuse cases.** As the interface to the system becomes more refined and the specific
> components are identified, the abuse case can be described..."

> "3. **Check granularity.** There may be too few abuse cases or there may be too many... In our
> experience there are two ways we can wind up with too many abuse cases: 1) including possible but
> unlikely cases, or 2) modeling with too much detail... **We must be cautious when discarding an abuse
> case as unlikely.** ... A good abuse case model will have uniform granularity of detail in its cases,
> and not too many of them."

> "4. **Check completeness and minimality.** Each abuse case description should be checked to see if it
> describes an interaction that results in harm to a user or stakeholder in the system. We should also
> check to see if a critical abuse case may have been omitted..."

*(The printed paper numbers these 1, 2, 4, 3, 4 — a typo in the original. Reproduced as printed.)*

### THE key passage — refutation, assurance budget, and residual risk (§6, verbatim)

> "During the design and testing phases of a security engineering process, we can apply abuse cases
> through a **refutation process**. As we analyze and design the system, we refute each use case to the
> appropriate level of assurance. This is one reason for describing the actors in greater detail in an
> abuse case. Our refutation may depend on the skills, resources, or objectives of the actor. For
> example, we may argue that 40-bit cryptographic keys are sufficient to refute an abuse case involving
> a Script Kiddie actor, because of their specified resource limitations, but not against a Nazgul."

> "**The strength of the refutation can be used to characterize the assurance we have.** A refutation
> arrived at during an informal code walk through is not as strong as a refutation based on formal
> methods. **Abuse cases can be ranked or weighted according to the assurance that should be applied to
> them. The assurance budget for a project can then be allocated by abuse case, according to the
> ranking.**"

> "During testing, we can design our security function tests to **refute** abuse cases. For example, we
> can apply the abuse case directly as a family of test cases. We form a test team that has the same
> skills and resources as the actors associated with the abuse case and let them exercise our system
> features."

> "We can also **rank abuse cases in order to allocate testing resources.**"

> "Since both use cases and abuse cases are readily understood by users and customers, they can be used
> to explain security-related design trade-offs. **Customers will be better informed when choosing
> between modified functionality in a use case and the residual risk in an unrefuted abuse case.**"

**This last sentence is the most valuable single quotation in my cluster.** "Residual risk in an
unrefuted abuse case" — published 1999 — is the concept the skills channel found *zero* times across
fifty competing skills, stated precisely, with a mechanism attached:

1. Enumerate what harm looks like, per adversary, by skills and resources.
2. Attempt to **refute** each — verification is refutation, not confirmation.
3. **The strength of the refutation is the assurance level**, and it varies by method (code walkthrough
   < formal methods). Assurance is a graded property of the *argument*, not a boolean.
4. **Allocate the assurance budget by ranking** — this is risk-based altitude allocation, 1999.
5. Whatever remains **unrefuted is residual risk**, and it is presented to the customer as an explicit
   trade-off against functionality.

That is the skill's whole judgment layer, in one 1999 security-requirements paper, generalisable off
security with no loss.

### The authors' own limits, verbatim (§7)

> "Abuse case models are not a substitute for mathematical security models. **We intentionally make
> abuse case models ambiguous and incomplete and do not worry about their soundness.** Abuse case models
> do not replace any other part of a sound security engineering process. **The same qualities that make
> them powerful in security requirements analysis render them unfit as tools for high assurance.** On
> the other hand, we have found them to be very useful as a complementary tool, when used during the
> requirements, design, and testing phases of a project."

→ Honest self-limitation, and worth carrying: the technique is a communication and allocation device,
not a proof. Do not oversell it.

### Abuse cases vs misuse cases

- **Misuse cases**: Guttorm Sindre and Andreas L. Opdahl. The widely-cited journal version is
  *"Eliciting security requirements with misuse cases"*, *Requirements Engineering* —
  https://www.researchgate.net/publication/226177413_Eliciting_security_requirements_with_misuse_cases
  `[UNVERIFIED — not read]`. Publication year of the first misuse-case paper reported as **2000** by
  secondary sources; **I did not verify this date at a primary source.**
- Per Wikipedia (https://en.wikipedia.org/wiki/Abuse_case), citing McDermott & Fox for the definition:
  > "An abuse case diagram is created together with a corresponding use case diagram, but not in the
  > same diagram (different from Misuse case)."
  That is the only distinction the page states; it points at a comparison by "Chun Wei" without giving
  its content. A further comparison paper exists at
  https://www.cs.auckland.ac.nz/courses/compsci725s2c/archive/termpapers/csia.pdf `[UNVERIFIED — not read]`.
- `[UNVERIFIED]` Wikipedia contains **no** citation of abuse cases in Gary McGraw's touchpoints, BSIMM,
  or the Microsoft SDL. I could not confirm the common claim that abuse cases are one of McGraw's
  software-security touchpoints. **Do not assert it without checking *Software Security: Building
  Security In* directly.**
- `[NEGATIVE RESULT]` **https://owasp.org/www-community/Abuse_Case returns HTTP 404.** OWASP has no
  abuse-case community page at that path. The concept's absence from the skills ecosystem mirrors a
  thin presence in the most-consulted practitioner reference too — which strengthens the wedge.

---

## 5. Decision rules extracted

| # | Rule an agent can apply | Source | Status |
|---|---|---|---|
| L1 | A claim without stated **uncertainty** is not a conforming claim. Every verification claim carries its uncertainty. | ISO/IEC 15026-2:2011 §6.3.2(c) | Normative `shall` |
| L2 | A claim without stated **conditions of applicability** is not a conforming claim. Name the browser/version/config/build the claim holds under. | §6.3.2(f), §6.3.2(h) | Normative `shall` |
| L3 | Evidence must **cover the conditions the claim asserts**. Never extend a claim past the conditions your evidence covers. | §6.3.3 | Normative `shall` |
| L4 | An unsupported proposition placed in the evidence set is **an assumption, not evidence** — and must be labelled as such with its uncertainty basis. | Figure 1 + §6.6.2 | Normative `shall` |
| L5 | If an assumption is **contradicted by evidence, that counter-evidence must be attached to it.** | §6.6.3 | Normative `shall` |
| L6 | Nothing may support itself, directly or indirectly. "It passes, therefore it is correct" is a structural violation. | §6.2(d) | Normative `shall` |
| L7 | **Justify the choice of top-level claim** — i.e. justify what you chose to verify, not only the verifying. | §6.3.4 | Normative `shall` |
| L8 | Every piece of evidence carries **scope of applicability** and **source reliability/trustworthiness**. Agent-asserted evidence and reproducible artifacts are different tiers. | §6.5.2 | Normative `shall` |
| L9 | You may **omit** a required part of the dossier only with **documented justification**. Silence is non-conformance; a stated gap is conformance. | §7.2(b) | Normative `shall` |
| L10 | The dossier is **an element of the system**, delivered with it and maintained with it. It expires when the system moves. | §7.1(a) + NOTE | Normative `shall` |
| L11 | A dossier names **the entity asserting conformance**. Assurance is signed. | §7.1(d) | Normative `shall` |
| L12 | Arguments may **detract from** claims; evidence may detract from claims. Counter-evidence is in scope by construction. | §6.4.2 NOTE, §6.5.1 NOTE | Normative NOTE |
| L13 | State claims as *acceptably* X **for a specific application in a specific operating environment** — never as bare "X". | Def Stan 00-56 Iss 4 via Wikipedia | Widely adopted |
| L14 | Uncertainty **propagates**: an argument must establish the uncertainty of every conclusion it reaches. | §6.4.1(c),(d) | Normative `shall` |
| L15 | When asking "quality of what?", enumerate against the nine ISO/IEC 25010:2023 characteristics rather than an ad-hoc list. | ISO/IEC 25010:2023 | Current standard |
| L16 | **Verification is refutation.** Attempt to refute the claim that harm can occur; do not attempt to confirm that things work. | McDermott & Fox 1999 §6 | Verified verbatim |
| L17 | **The strength of the refutation method sets the assurance level** — a walkthrough and a formal proof are not the same evidence. Grade the method, not just the outcome. | McDermott & Fox 1999 §6 | Verified verbatim |
| L18 | **Allocate the assurance budget by ranked risk**, and say which rank each verification effort served. | McDermott & Fox 1999 §6 | Verified verbatim |
| L19 | **Whatever remains unrefuted is residual risk**, and it must be surfaced to the decision-maker as an explicit trade-off, not omitted. | McDermott & Fox 1999 §6 | Verified verbatim |
| L20 | A weakness is not a finding until it reaches **actual harm** to a stakeholder; state the harm in the user's domain terms. | McDermott & Fox 1999 §4 | Verified verbatim |
| L21 | Name the **adversary you intend to defend against**, by skills and resources, and record the maximum you intend to deal with. Anything beyond is out of scope by decision. | McDermott & Fox 1999 §4, §6 | Verified verbatim |
| L22 | **Be cautious when discarding a case as unlikely** — the discard is itself a recorded decision. | McDermott & Fox 1999 (granularity step) | Verified verbatim |

---

## 6. What this cluster contests

- **Against the "green tick" model.** Nothing in ISO/IEC 15026-2 permits a boolean. Every claim is
  property + limits + uncertainty + conditions. A CI pass/fail is not a conforming claim; it is at
  best one piece of evidence with a scope of applicability.
- **Against the assurance case itself.** The Greenwell et al. line of work, and the current
  defeaters/weakeners literature, is a sustained finding that structured arguments are routinely
  fallacious in industrial practice. An evidence dossier is a *format that makes reasoning
  inspectable*, not a *guarantee that the reasoning is good* — and 15026-2 §1 concedes exactly this
  in its own scope. Any skill shipping a dossier must ship the adversarial read of it too.
- **Open tension:** 15026-2 requires quantified uncertainty on every claim. In web-product QA,
  numeric uncertainty is usually unavailable. The honest adaptation is an **ordinal** evidence-state
  vocabulary (`observed` / `inferred` / `not_tested` / `blocked`) rather than a probability — which
  should be stated as a deliberate divergence from the standard, not presented as conformance.

---

## 7. [UNVERIFIED] register for this cluster

| Item | Why unverified |
|---|---|
| Whether ISO/IEC 15026-2 has an edition after 2011 | iso.org 403 to WebFetch; only Part 1:2019 confirmed indirectly via NIST glossary |
| GSN element vocabulary and GSN Community Standard version/date | scsc.uk/gsn is an index page with no definitions; standard doc not reached |
| Greenwell et al. fallacy taxonomy: the 3 categories, the "33 fallacies in 7 categories" refinement, and the three-safety-case finding | PDF endpoints returned empty content; figures are from search summaries only |
| ISO/IEC 25010:2023 sub-characteristic definitions for Interaction Capability (8) and Security (6) | site pagination; not captured |
| ISO/IEC 25010:2023 wording verified against the standard itself | iso.org 403; wording taken from iso25000.com |
| ISO/IEC 25002 and 25019 contents | existence only |
| The 2025–26 defeaters / assurance-weakeners papers | titles and URLs surfaced, none read |

**Tooling note:** iso.org blocks WebFetch (403) consistently. The IEEE-adoption PDF mirror was the
only route to the 15026-2 text, and it was extracted locally with pypdf rather than trusted from a
fetch summary — every 15026-2 quotation above was read from the extracted text.
