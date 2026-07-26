# Security and Privacy Verification

Purpose: Decide what security and privacy evidence establishes, and what it does not — grading the
assurance a given method actually earns rather than accepting "scan passed" as a verdict.

Read when: security or privacy evidence must be judged rather than produced; scanner output needs
interpreting; severity sources conflict; or a privacy behaviour claim must be verified.

Inputs: the threat model from `architecture` if it exists; the controls implemented by the building
skills; scanner output; the declared adversary and defended-against maximum.

Produces: findings graded by the assurance level their method earns, an explicit list of what each
scan cannot decide, resolved severity where authorities conflict, and residual risk recorded in a
machine-readable form.

## Skip when:

- Setting the threat model, trust boundaries, or which assets matter → `architecture` owns this; this
  file verifies against a threat model, it does not author one.
- Writing the security controls themselves (input validation, auth code, encryption) → the owning
  building skill (`frontend`, `backend`, `data`).
- Verifying an AI system's behavior — prompt injection resistance, jailbreak resilience, red-teaming a
  model's outputs → `ai-behavior-verification.md`. This file covers the LLM Top 10 as a scoping
  checklist only; the actual probing method lives there.
- You need the general evidence-state vocabulary (`observed`/`inferred`/`not_tested`/`blocked`) or how
  to name an oracle → `oracles-and-evidence.md`; this file applies that vocabulary to one domain, it
  does not redefine it.
- Triaging a found defect, or the residual-risk record and ship/claim decision → `defect-lifecycle.md`
  / `release-gate-and-claims.md`.

## Contents

- [ASVS levels are assurance grades, not a checkbox](#asvs-levels-are-assurance-grades-not-a-checkbox)
- [A clean scan is not security](#a-clean-scan-is-not-security)
- [Two-axis confidence models: reserving room for a human](#two-axis-confidence-models-reserving-room-for-a-human)
- [Severity precedence when authorities disagree](#severity-precedence-when-authorities-disagree)
- [OpenVEX: residual risk in machine-readable form](#openvex-residual-risk-in-machine-readable-form)
- [Name the adversary and the line you defend](#name-the-adversary-and-the-line-you-defend)
- [Behavioral privacy verification](#behavioral-privacy-verification)
- [Failure modes and handoff](#failure-modes-and-handoff)

All facts below are current as of 2026-07-26. Standards and tool behavior in this domain churn —
re-verify version numbers and thresholds against the primary source before citing them as current.

## ASVS levels are assurance grades, not a checkbox

**OWASP ASVS 5.0.0** (released 30 May 2025, supersedes 4.0.3) states its three levels verbatim:

> **Level 1:** "the minimum requirements to consider when securing an application... a critical
> starting point." **Level 2:** "Most applications should be striving to achieve this level...
> Around 50% of the requirements in the ASVS are L2." **Level 3:** "the goal for applications looking
> to demonstrate the highest levels of security... the final ~30% of requirements."

The level is not a scope dial on the same evidence — it names a **different refutation method**:

| Level | What reaches it | What it cannot certify |
|---|---|---|
| L1 | External black-box penetration testing; no source access needed | Anything requiring knowledge of internal design decisions |
| L2 | Requires access to documentation, architecture, and source code | Anything the reviewers didn't have standing to inspect |
| L3 | Requires the people involved — design reviews, interviews, threat-model walkthroughs | Still bounded by what was in scope for the review |

A walkthrough, a scan, and a formal proof are not interchangeable evidence of "secure." **The strength
of the refutation method used *is* the assurance level** — this is I8 (verification is refutation)
applied to security specifically. Reporting "ASVS compliant" with no level attached is reporting
nothing; report the level and what access the assessment actually had.

ASVS 5.0.0's 17 chapters (V1 Encoding and Sanitization … V17 WebRTC) are the scope map; **WSTG 4.2**
(OWASP Web Security Testing Guide, released 2020-12-03, v5.0 in development) supplies the twelve
testable categories run against that scope: Information Gathering, Configuration and Deployment
Management, Identity Management, Authentication, Authorization, Session Management, Input Validation,
Error Handling, Weak Cryptography, Business Logic, Client-side, API Testing.

## A clean scan is not security

Name what the scanner in front of you cannot decide, before trusting its "no findings" output:

- **A DAST crawl** (automated WSTG-style scanning) reaches network-observable behavior only. It
  systematically misses **WSTG-BUSL (Business Logic)** and most of **WSTG-ATHZ (Authorization)** —
  both require understanding what the application is *supposed* to prevent, which a crawler has no
  model of. A clean DAST run is evidence about injection and misconfiguration classes; it is silent on
  "can user A read user B's data because the authorization check was never written."
- **A SAST/rule-based scanner** (Semgrep, and similarly ZAP's passive rules) certifies only the
  patterns someone encoded as rules (I2). Semgrep's own rule-metadata schema makes this explicit and
  machine-enforced: any rule tagged `category: security` is schema-required to declare `cwe`,
  `likelihood`, `impact`, and `subcategory` — a JSON Schema conditional (`if category == security,
  then require cwe, likelihood, impact, subcategory, references`) that forces every security rule to
  carry its own scope declaration. A scan built from N such rules certifies N propositions, not
  "secure."
- **The OWASP Top 10:2025** (A01 Broken Access Control … A10 Mishandling of Exceptional Conditions)
  and the **OWASP Top 10 for LLM Applications 2025** (LLM01 Prompt Injection … LLM10 Unbounded
  Consumption) are **awareness documents, not verification checklists.** "We checked the OWASP Top 10"
  is not a verification claim. "We verified against ASVS L2, chapters mapped to A01–A10:2025, with the
  access L2 requires" is. Use the Top 10 lists to *scope* an effort — never as evidence a check was
  performed.

## Two-axis confidence models: reserving room for a human

Both **ZAP** and **Semgrep**, independently, refuse to collapse a finding into a single severity
number — because severity alone conflates "how bad if true" with "how sure are we it's true."

**ZAP** (`Alert.java`, Apache-2.0) separates the two axes explicitly:

```
RISK_INFO=0, RISK_LOW=1, RISK_MEDIUM=2, RISK_HIGH=3
CONFIDENCE_FALSE_POSITIVE=0, CONFIDENCE_LOW=1, CONFIDENCE_MEDIUM=2,
CONFIDENCE_HIGH=3, CONFIDENCE_USER_CONFIRMED=4
```

Fresh alerts default to `risk=INFO, confidence=MEDIUM` — a deliberately skeptical starting stance. And
critically, per ZAP's own docs: *"ZAP will not raise an alert with a confidence of either 'False
Positive' or 'Confirmed'. However you can set these levels either manually or via an Alert Filter."*
**The two extreme confidence values exist only as a place for a human to write a verdict.** The
automated engine never emits them itself. "High risk / Low confidence" (worth a quick look, probably
noise) and "High risk / High confidence" (drop everything) are materially different work items that a
single severity field would erase.

**Semgrep's** rule metadata carries the same structure independently: `confidence`, `likelihood`, and
`impact` are three separate `LOW`/`MEDIUM`/`HIGH` axes on every security rule, not one blended score.

Treat this pattern as a design requirement, not a tool quirk: **any security-finding pipeline your
verification effort trusts should expose risk and confidence as separate fields, and should reserve at
least one value on the confidence axis for a human to write down "I looked, and this is a false
positive" or "I looked, and I confirm this."** A pipeline that only emits a single blended severity has
already made the human-override decision for you, silently.

## Severity precedence when authorities disagree

Security is popularly assumed to be objective — a CVE has *a* severity. It does not. **Trivy**
publishes its tie-break rule and reasoning verbatim, and it is a clean, documented instance of the
oracle problem inside a domain that looks like it shouldn't have one:

> "The severity is taken from the selected data source since the severity from vendors is more
> accurate. Using CVE-2023-0464 as an example, while it is rated as 'HIGH' in NVD, Red Hat has marked
> its 'Impact' as 'Low'. As a result, Trivy will display it as 'Low'... NVD doesn't know how the vendor
> distributes the software. Red Hat evaluates the severity more accurately."

Precedence order: **vendor advisory → CVSS base-score band (0.1–3.9 Low, 4.0–6.9 Medium, 7.0–8.9 High,
9.0–10.0 Critical) → NVD.** The disagreement is not hidden — it stays auditable in the output:

```json
"SeveritySource": "debian",
"VendorSeverity": {"amazon":2,"cbl-mariner":4,"ghsa":4,"nvd":4,"photon":4,"redhat":2,"ubuntu":2}
```

Seven sources, three different numbers, one documented rule for which one wins — and Trivy still
closes with *"Regardless of the chosen mode, user review of detected vulnerabilities is crucial."*
**A vendor-over-NVD tie-break rule is itself a named oracle**, no different in kind from a test
assertion someone wrote: it certifies only the proposition "this precedence order is a reasonable
proxy for real severity," which is a judgment call, not a fact about the vulnerability. Report which
source a severity came from whenever two sources could plausibly disagree; never report a resolved
severity as if it were unanimous.

## OpenVEX: residual risk in machine-readable form

A vulnerability scanner finding a component is not the same as that component being exploitable in
your product — but "we know about it and it's fine" is exactly the kind of claim that gets asserted
without evidence. **VEX (Vulnerability Exploitability eXchange)** exists to make that claim a
controlled vocabulary instead of free text. Status is one of `not_affected` / `affected` / `fixed` /
`under_investigation`. The valuable part is the **justification enum required for `not_affected`**,
verbatim from OpenVEX:

> `component_not_present` · `vulnerable_code_not_present` · `vulnerable_code_not_in_execute_path` ·
> `vulnerable_code_cannot_be_controlled_by_adversary` · `inline_mitigations_already_exist`

This is I6 (whatever is unrefuted is residual risk, with an owner) instantiated as a machine-readable
standard: a present-but-unexploited vulnerability does not have to be silently suppressed from a
report, and it does not have to block a release either — it gets recorded with a specific, checkable
reason. **A `not_affected` status with no justification code is not evidence; it is an assertion.**
When ingesting or producing a VEX document, require the justification, not just the status.

**Vocabulary caveat:** CycloneDX and OpenVEX are not unified — Trivy's CycloneDX output uses
`code_not_reachable` for the same concept OpenVEX names `vulnerable_code_not_in_execute_path`.
Reconcile the vocabulary before treating two tools' outputs as commensurable (I9).

## Name the adversary and the line you defend

Every security verification effort implicitly defends against *some* adversary and *not* others — the
difference between "we defend against unauthenticated remote attackers" and "we defend against a
malicious insider with database credentials" changes which findings matter and which are out of scope.

**Name the adversary and its maximum capability before verification starts, and record it as part of
the evidence, not as an unstated assumption.** Beyond that line, a gap is out of scope *by decision* —
which is different from, and much stronger than, a gap that exists because nobody thought about it.
This is I5 (omission is permitted; silent omission is not) applied to the adversary model itself:

- "We defend against OWASP Top 10:2025 classes reachable by an unauthenticated external actor" is a
  scoped, checkable claim.
- "We're secure" with no adversary named is not falsifiable and therefore not a verification claim at
  all.

Use the Top 10 lists (web and LLM) to *write down the scope decision*, then verify against ASVS at the
level the scope justifies. The line itself — what is excluded and why — belongs in the "what we
deliberately did not verify" record owned by `verification-strategy-and-risk.md`, carried into the
residual-risk record owned by `release-gate-and-claims.md`.

## Behavioral privacy verification

Privacy conformance is routinely verified by reading a policy document or a cookie-banner's presence.
**Neither is evidence of privacy behavior.** Verify what the system does, not what it claims to do:

- **Consent signals must be verified by observing actual network behavior, not by reading the
  implementation.** Google's own recommendation for Consent Mode v2 (`ad_storage`, `analytics_storage`,
  `ad_user_data`, `ad_personalization` — each `granted`/`denied`) is to inspect **actual tag firing**
  (e.g. in Tag Assistant), not to read the consent-management code. This is the evidence-vs-assertion
  principle appearing inside a vendor's own verification guidance: code that is supposed to block a tag
  is not evidence the tag was blocked.
- **Pre-consent network capture**: before consent is granted, capture actual outbound requests and
  confirm no tracking calls fire. A passing code review of the consent gate is `inferred` evidence at
  best; an observed, empty network log during the pre-consent window is `observed` evidence.
- **Withdrawal must be tested as an action, not assumed from the presence of a toggle.** Toggle it,
  re-observe network behavior, confirm the flow actually stops.
- **Global Privacy Control (GPC) and similar signals**: verify the signal is honored by observing
  behavior change when the header/signal is present, not by reading a policy statement that claims
  compliance. `[UNVERIFIED — jurisdiction-specific legal requirements around GPC vary; treat any
  specific statutory citation as needing its own legal re-verification, not an engineering one.]`
- **DSAR (data subject access request) fulfillment**: verify a request actually returns/deletes the
  claimed data by exercising the mechanism, not by confirming a support workflow exists on paper.

None of the above is legal advice or a compliance certification — it is engineering verification
practice for behavior that a legal/compliance function has already specified as a requirement. Route
the requirement itself back to `product`/`architecture`; this file only verifies whether the observed
behavior matches it.

## Failure modes and handoff

- **Reporting "ASVS compliant" with no level** — always state L1/L2/L3 and what access the assessment
  had; an unlevelled claim is not gradeable.
- **Treating a DAST/SAST "no findings" run as "secure"** — name the categories the tool structurally
  cannot reach (WSTG-BUSL, WSTG-ATHZ for DAST; unencoded rule gaps for SAST) before reporting clean.
- **Collapsing risk and confidence into one severity number** — reintroduces exactly the ambiguity ZAP
  and Semgrep's schemas were built to remove.
- **Citing a severity as unanimous when sources disagree** — state the winning source per Trivy's
  precedence model whenever cross-source disagreement is plausible.
- **A `not_affected` VEX status with no justification code** — treat as an unsupported assertion, not
  evidence.
- **No adversary named** — send back any security verification report that does not state whose attack
  it defended against and where that defense was deliberately capped.
- **Policy-document or code-review-only privacy claims** — require an observed network/behavioral
  check before accepting a consent, withdrawal, or DSAR claim as `observed` rather than `inferred`.
- Hand the adversary-scope decision and any residual security/privacy findings to
  `release-gate-and-claims.md`; hand found defects to `defect-lifecycle.md` for severity and routing;
  hand AI-specific behavioral probing to `ai-behavior-verification.md`.
