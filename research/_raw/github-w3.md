# GitHub W3 — Non-functional verification tooling
(as of 2026-07-26. All facts below were pulled live via `gh api` against the actual repo content, or via WebFetch/WebSearch of the cited URL, on this date unless otherwise noted. Version/license claims are read from source, not from memory.)

---

## A. The machine-testable vs human-judgment boundary (accessibility) — HEADLINE SECTION

This is the single cleanest, most citable "the tool is honestly telling you what it cannot decide" pattern in the entire non-functional-verification space. Four independent tools (axe-core, ACT Rules, IBM Equal Access, and even pa11y as a downstream consumer) all converge on the same structural idea: **a machine can produce three outcomes, not two** — pass, fail, and "I cannot tell, a human must look." They just name the third bucket differently.

### A1. axe-core result taxonomy, `incomplete` verbatim

Source: `dequelabs/axe-core`, `doc/API.md` (fetched from repo HEAD, 2026-07-26; latest tagged release `v4.12.1`, published 2026-06-10).

axe-core's `axe.run()` callback returns a results object with **four** arrays, not two:

> "The callback function passed in as the third parameter of `axe.run` runs on the results object. This object has four components – a `passes` array, a `violations` array, an `incomplete` array and an `inapplicable` array."

Verbatim definitions of each (`doc/API.md`, "result arrays" section):

> - `passes`: These results indicate what elements passed the rules
> - `violations`: These results indicate what elements failed the rules
> - `inapplicable`: These results indicate which rules did not run because no matching content was found on the page. For example, with no video, those rules won't run.
> - `incomplete`: Also known as "needs review," these results were aborted and require further testing. This can happen either because of technical restrictions to what the rule can test, or because a JavaScript error occurred.

And earlier in the same doc, describing `incomplete` as "review items":

> "The `incomplete` array (also referred to as the 'review items') indicates which nodes could neither be determined to definitively pass or definitively fail. They are separated out in order that a user interface can display these to the user for manual review (hence the term 'review items')."

**This is the crown jewel the brief asked for.** axe-core does not silently guess. When a rule's check logic cannot resolve pass/fail programmatically (most commonly because the answer depends on rendering context axe can't fully evaluate, or on human perceptual/semantic judgment), it puts the node in `incomplete` rather than forcing it into `violations` or `passes`. The `resultTypes` option (`doc/API.md` line ~427, ~590-607) lets a caller ask axe to report only certain result types, and axe's own docs explicitly warn that skipping `incomplete` collection is a performance/completeness trade-off, not a "these don't matter" signal.

**Which rules commonly return `incomplete`.** axe-core's `doc/rule-descriptions.md` (163-line generated table, fetched from repo HEAD) tags every rule's "Issue Type" as either `failure` alone or `failure, needs review`. Of the **105** rules listed with a `dequeuniversity.com/rules/axe/4.12/...` link, **58 (55%)** carry the `needs review` tag — meaning a majority of axe's rule surface is architecturally capable of producing `incomplete` results, not just failing/passing. The full list of rule IDs tagged `needs review` (verbatim rule IDs, axe-core v4.12):

```
area-alt, aria-allowed-attr, aria-braille-equivalent, aria-command-name,
aria-hidden-focus, aria-input-field-name, aria-meter-name,
aria-progressbar-name, aria-prohibited-attr, aria-required-children,
aria-tab-name, aria-toggle-field-name, aria-tooltip-name,
aria-valid-attr-value, button-name, bypass, color-contrast,
duplicate-id-aria, form-field-multiple-labels, frame-focusable-content,
frame-title-unique, frame-title, image-alt, input-button-name,
input-image-alt, label, link-in-text-block, link-name, nested-interactive,
no-autoplay-audio, object-alt, role-img-alt, select-name,
server-side-image-map, summary-name, svg-img-alt, td-headers-attr,
th-has-data-cells, video-caption, autocomplete-valid, target-size,
aria-allowed-role, aria-dialog-name, aria-text, aria-treeitem-name,
empty-heading, empty-table-header, frame-tested, heading-order,
skip-link, table-duplicate-name, color-contrast-enhanced,
identical-links-same-purpose, css-orientation-lock, hidden-content,
p-as-heading, aria-roledescription, audio-caption
```

Note `color-contrast` is on this list — this is the canonical example the brief anticipated: color-contrast on gradients, background images, overlapping/semi-transparent elements, or text over video cannot be reliably resolved by axe's contrast algorithm, so it degrades to `incomplete` rather than a false pass/fail. `link-name` and `image-alt` are also on the list, which is the formal grounding for "alt-text appropriateness is not machine-decidable" (see A4).

### A2. axe impact levels + definitions (verbatim)

Source: `dequelabs/axe-core`, `doc/issue_impact.md` (fetched from repo HEAD 2026-07-26).

Framing paragraph (verbatim):

> "Axe-core assigns an impact according to our assessment of the likely impact of an issue on users with disabilities who would be affected by this issue. In any given context, the actual impact for the user could be lower; in some instances, it could be higher. For this reason, we encourage users of tools to evaluate each individual issue and assess the impact in the context of their application or content."

This sentence is itself judgment content: axe explicitly disclaims that its impact rating is a *generic estimate*, not a contextual truth — the tool is telling you its own severity label needs a human sanity-check.

The four levels, verbatim:

> **Minor** — Considered to be a nuisance or an annoyance bug. Prioritize fixing it if the fix only takes a few minutes and the developer is working on the same screen/feature at the same time, otherwise the issue should not be prioritized. Will still get in the way of compliance if not fixed.
>
> **Moderate** — Results in some difficulty for people with disabilities, but will generally not prevent them from accessing fundamental features or content. Users may be frustrated and abandon non-critical workflows. Prioritize fixing in this release, if there are no higher-priority issues. Will get in the way of compliance if not fixed.
>
> **Serious** — Results in serious barriers for people with disabilities, and will partially or fully prevent them from accessing fundamental features or content. People relying on assistive technologies will experience significant frustration and may abandon essential workflows. Issues falling under this category are major problems, and remediation should be a priority.
>
> **Critical** — Results in blocked content for people with disabilities, and will definitely prevent them from accessing fundamental features or content. This type of issue puts your organization at risk. Prioritize fixing as soon as possible, within the week if possible. Remediation should be a top priority.

**Impact ≠ WCAG conformance level — these are orthogonal axes, and conflating them is a common mistake.** Grounding: in `rule-descriptions.md`, `color-contrast` (WCAG 2 **AA**, tag `wcag143`) is rated impact **Serious**, while `image-alt` (WCAG 2 **A**, tag `wcag111`) is rated impact **Critical**. A-level and AA-level rules appear at every impact level in the table — there is no fixed mapping from "WCAG level" to "axe impact." WCAG conformance level (A/AA/AAA) is about which *success criterion* is violated and its place in the WCAG structure; axe impact is Deque's own empirical judgment about *user harm severity*, independent of the SC's conformance tier. A tool or skill that reports "this is a Level A issue, therefore high severity" is making an unsupported inference — axe's own table falsifies that mapping.

### A3. ACT Rules: automated vs semi-automated — the formal, standards-body version of the boundary

Source: `act-rules/act-rules.github.io` (repo fetched 2026-07-26; **95 rules** currently in `_rules/`); W3C ACT Rules Format spec at `https://www.w3.org/TR/act-rules-format/` (fetched 2026-07-26).

The ACT Rules Format 1.1 spec does **not** hard-partition rules into "automated" vs "manual" categories at the rule-definition level. Instead it defines the atomic unit of testing, a **Check**, permissively enough to cover the whole spectrum:

> "A procedure resulting in one or more outcomes when used to evaluate the accessibility of a web page or other test subject. The procedure can be a step by step description of how to manually perform a test, a fully automated test, or some combination of manual and automated testing." (W3C ACT Rules Format 1.1)

The formal automated/semi-automated split lives one layer down, in how an ACT rule's **implementation** is registered, using the EARL (Evaluation and Report Language) vocabulary:

> "[test modes](https://www.w3.org/TR/EARL10-Schema/#TestMode) of the checks (e.g. automatic, manual, semiAuto)" (ACT Rules Format spec, Implementations section)

So the canonical three-way split — `automatic`, `manual`, `semiAuto` — is a W3C vocabulary term (EARL `TestMode`), and ACT rules document, per-implementation, which mode their checks run in. This is a more rigorous version of what axe encodes informally via `incomplete`.

Every individual ACT rule file also encodes a *result-outcome-to-WCAG-conformance* mapping that is explicit about "further testing needed." Example, from `aria-hidden-no-focusable-content-6cfa84.md` (rule ID `6cfa84`, fetched from repo HEAD):

```yaml
accessibility_requirements:
  wcag20:4.1.2: # Name, Role, Value (A)
    forConformance: true
    failed: not satisfied
    passed: further testing needed
    inapplicable: further testing needed
```

Read literally: even when this specific ACT rule's automated check *passes* or is *inapplicable*, the rule itself declares the WCAG success criterion is only "further testing needed" — not conformant. Only a `failed` outcome is treated as a definitive SC verdict. This is the ACT-rules-format equivalent of axe's `incomplete`, expressed per-SC rather than per-node.

**License of the ACT rules repo**: the repo's `LICENSE.md` points to the **W3C Software and Document Notice and License**, not a standard OSI license:

> "W3C COMMUNITY CONTRIBUTOR LICENSE AGREEMENT (CLA)" (`LICENSE.md`), which links to `pages/license.md`, the **W3C Software and Document Notice and License** — a permissive copy/modify/distribute license conditioned on preserving the W3C notice.

Note: GitHub's own API reports `license.spdx_id: "NOASSERTION"` for `act-rules/act-rules.github.io` — this is a genuine **API-vs-file disagreement** the brief asked to flag, though the cause is benign: GitHub's SPDX detector doesn't recognize the W3C Document License template, not that the license terms are actually ambiguous.

### A4. WCAG 2.2 SC classification: automatable / flag-for-review / human-only

**Methodology note (read before using this table):** WCAG itself does not publish an official "automatable" tier list. The classification below is built by **grounding each SC in what axe-core and ACT actually implement**, then explicitly marking anywhere I extrapolate. Rows marked "[inference]" are my own synthesis from the grounding data, not a quote from any spec.

| WCAG 2.2 SC | Axe-core rule(s) touching it (from `rule-descriptions.md` tags) | ACT rule coverage | Classification | Basis |
|---|---|---|---|---|
| 1.1.1 Non-text Content | `image-alt`, `input-image-alt`, `object-alt`, `svg-img-alt`, `role-img-alt` — **all tagged `needs review`** | ACT rule `23a2a8` (image alt) | **Flag-for-review** — presence of alt text is automatable; *appropriateness/adequacy* of the text is not | Axe can only test "does an accessible-name-producing attribute exist and is it non-empty"; it cannot judge whether the string is a correct description. This is why every alt-related rule is tagged `needs review` in axe's own table. |
| 1.3.1 Info and Relationships | Partial: `td-headers-attr`, `th-has-data-cells`, `empty-table-header`, `aria-required-children` etc. — several tagged `needs review` | Many ACT rules (structural: table headers, list markup) | **Partially automatable** — structural/markup violations (missing `<th>`, broken ARIA parent/child) are machine-checkable; whether the *visual* relationship matches the *programmatic* one in a bespoke custom-widget layout is not | [inference, grounded in axe's table-header rules and ACT's table-related rules being structural pattern-matches, not visual/semantic comparisons] |
| 1.4.3 / 1.4.6 Contrast (Minimum/Enhanced) | `color-contrast`, `color-contrast-enhanced` — **both tagged `needs review`** | ACT `afw4f7`, `09o5cg` | **Flag-for-review** — contrast ratio math is fully automatable for flat, opaque, non-overlapping colors; indeterminate for gradients, background images, text-over-video, or anti-aliased edges | axe's own table tags `needs review`; this is the textbook example cited across the industry and confirmed structurally by axe's taxonomy, not just by reputation. |
| 2.4.4 Link Purpose (In Context) | `link-name` — tagged `needs review` | ACT `c487ae` | **Flag-for-review** — presence of accessible name is automatable; whether that name conveys the link's *purpose in context* requires reading the surrounding content | Same class of problem as 1.1.1: existence vs. quality. |
| 2.4.6 Headings and Labels | `empty-heading`, `heading-order`, `p-as-heading` — tagged `needs review` | — | **Flag-for-review** — presence/ordering of headings is automatable; whether a heading text is *descriptive* is a judgment call | [inference from axe's `needs review` tag pattern, consistent with 1.1.1/2.4.4] |
| 3.3.2 Labels or Instructions | `label`, `form-field-multiple-labels`, `aria-input-field-name` — tagged `needs review` | ACT rule on input labeling | **Flag-for-review** — label *presence* automatable; label *sufficiency/clarity of instructions* is not | Same pattern. |
| 4.1.2 Name, Role, Value | `aria-allowed-attr`, `aria-required-attr`, `button-name`, `aria-command-name`, dozens more | Very high ACT coverage — this SC is the most rule-dense in both axe and ACT | **Mostly automatable** — ARIA syntax validity, required-attribute presence, and role/state consistency are fully machine-checkable | Deep, mechanical rule set in both axe and ACT; few of these are tagged `needs review` relative to how many rules map to this SC. |
| 2.1.1 Keyboard | Only partially covered (`nested-interactive`, `frame-focusable-content`, `aria-hidden-focus`) | Some coverage (focusability rules) | **Human-only in the general case** | No static analysis of DOM/ARIA state can fully verify that *every* interactive operation is keyboard-operable in a dynamic SPA — this requires interaction simulation or manual keyboard walk-through. Grounded in the sparse, narrow scope of the axe rules that touch this SC (they check specific anti-patterns, not full operability). |
| 2.4.3 Focus Order | No dedicated axe rule found in `rule-descriptions.md` | No ACT rule found covering general focus order | **Human-only** | Absence of a rule is itself evidence: neither axe nor ACT claims to test this because "logical" focus order is a semantic judgment about page meaning, not a DOM property with a fixed correct answer. |
| 1.2.x Captions/Audio Description | `video-caption`, `audio-caption`, `no-autoplay-audio` — tagged `needs review`/failure | Some ACT coverage | **Flag-for-review to human-only** — *presence* of a caption track is checkable; caption *accuracy/synchronization* is not machine-verifiable at all today | [inference from axe's own scope: it can detect a missing `<track>` element, not judge caption quality] |

**Summary pattern (grounded, not inference):** across every SC where axe-core has a rule at all, the SC clusters into two buckets — (a) SCs about **structural/syntactic correctness** (ARIA validity, markup presence, ID references) are heavily automated with few `needs review` tags, and (b) SCs about **content quality/appropriateness** (alt text quality, link purpose, label clarity, heading descriptiveness, contrast on complex backgrounds) are *architecturally* tagged `needs review` in axe's own rule table. This is not an opinion — it falls directly out of counting the `needs review` tags in axe-core's own generated documentation.

### A5. The coverage-percentage claim — verified

**Claim, exact source, and verification status:**

> "57 percent of accessibility issues were completely covered by this automated testing." — Deque blog post, ["Automated Testing Study Identifies 57 Percent of Digital Accessibility Issues"](https://www.deque.com/blog/automated-testing-study-identifies-57-percent-of-digital-accessibility-issues/), published **March 10, 2021**.

Methodology (from the same source, WebFetched 2026-07-26): "The research analyzed anonymized data from over 2,000 audits across various industries, encompassing more than 13,000 pages (all first-time assessments) and nearly 300,000 total issues." Automated testing in this data set was axe-core–powered (Deque's own axe suite).

**Critically, the methodology itself is a piece of judgment content**: Deque explicitly argues that measuring "coverage" as % of *WCAG Success Criteria* automatable (the traditional method, yielding the widely-cited **20–30%** figure this study explicitly sets out to correct) understates real-world impact, because issue *types* are not evenly distributed — a handful of automatable issue types (missing alt text, contrast, missing form labels) account for a disproportionate share of *total issues found in the wild*. So "57%" and "20–30%" are not actually measuring the same thing, and citing one without the other's methodology is misleading. Both numbers should travel together.

**A newer, higher figure exists but needs a status flag**: WebSearch results (2026-07-26) surfaced a claim from Deque's "Automated Accessibility Coverage Report" that automated testing alone finds **57.38%**, and that combining it with Deque's proprietary "Intelligent Guided Testing" (IGT, a semi-automated/guided-manual product feature) raises coverage to **80.39%**. `[UNVERIFIED]` — I was only able to retrieve this via a WebSearch summary of `https://www.deque.com/automated-accessibility-coverage-report/`, not by directly reading the primary report page (it did not resolve cleanly through the fetch pipeline). Treat 57.38%/80.39% as directionally consistent with the verified 57% figure but not independently confirmed at source. The **57% (2021 study) figure is the one to cite as verified**; do not use 80.39% without further verification.

**Load-bearing conclusion for the skill**: "automated accessibility testing catches ~57% of issues by volume, historically believed to be ~20–30% by SC-coverage counting" is a defensible, dated, sourced claim. Any claim above 57% needs its own citation before use.

---

## B. Severity & risk taxonomies

### B1. axe-core impact (four-level) — see A2, verbatim above.

### B2. IBM Equal Access Accessibility Checker — a richer two-axis model with its own explicit "manual" bucket

Source: `IBMa/equal-access`, `common/module/src/engine/IRule.ts` and `common/module/src/config/IConfig.ts` (fetched from repo HEAD 2026-07-26; license **Apache-2.0**, verified from `LICENSE` file; latest release `4.0.29`, published 2026-07-14).

IBM's engine uses a **two-axis model**, structurally parallel to ZAP's risk×confidence (see B3) but for accessibility:

```typescript
export enum eRuleConfidence {
    PASS = "PASS",
    FAIL = "FAIL",
    POTENTIAL = "POTENTIAL",
    MANUAL = "MANUAL"
}

export enum eRulePolicy {
    VIOLATION = "VIOLATION",
    RECOMMENDATION = "RECOMMENDATION",
    INFORMATION = "INFORMATION"
}
```

And a separate, older-but-still-live six-level report taxonomy (`IConfig.ts`, `eRuleLevel`):

```typescript
export enum eRuleLevel {
    violation = "violation",
    potentialviolation = "potentialviolation",
    recommendation = "recommendation",
    potentialrecommendation = "potentialrecommendation",
    manual = "manual",
    pass = "pass",
    ignored = "ignored"
}
```

`manual` is IBM's explicit, first-class "a human must decide this" bucket — the direct analogue of axe's `incomplete` / ACT's `manual` test mode. Confirming this is deliberate design rather than an edge case, the default config comment for `failLevels`/`reportLevels` (`IConfig.ts`) reads: `// Default: ["violation", "review"]` — meaning IBM's own default CI gate is scoped to violation + review-worthy items, not just hard violations, an implicit acknowledgment that "review" items are part of the actionable output, not noise.

### B3. ZAP alert risk × confidence — the two-axis model, verbatim from source

Source: `zaproxy/zaproxy`, `zap/src/main/java/org/parosproxy/paros/core/scanner/Alert.java` (fetched from repo HEAD 2026-07-26; license **Apache-2.0** verified from `LICENSE` file; latest tagged release `w2026-07-21`, a weekly release train).

```java
public static final int RISK_INFO = 0;
public static final int RISK_LOW = 1;
public static final int RISK_MEDIUM = 2;
public static final int RISK_HIGH = 3;
public static final int NUMBER_RISKS = 4;

public static final int CONFIDENCE_FALSE_POSITIVE = 0;
public static final int CONFIDENCE_LOW = 1;
public static final int CONFIDENCE_MEDIUM = 2;
public static final int CONFIDENCE_HIGH = 3;
public static final int CONFIDENCE_USER_CONFIRMED = 4;

public static final String[] MSG_RISK = {"Informational", "Low", "Medium", "High"};
```

Default values on a freshly-constructed `Alert`: `risk = RISK_INFO`, `confidence = CONFIDENCE_MEDIUM` — i.e. ZAP's engine defaults to a *skeptical* stance (Medium, not High, confidence) unless a scan rule explicitly asserts otherwise.

The **Confidence** axis is the genuine judgment-content half of this model, and it's a five-value scale, not a three-value one: `False Positive < Low < Medium < High < User Confirmed`. Per ZAP's own docs (`https://www.zaproxy.org/docs/desktop/start/features/alerts/`, WebFetched 2026-07-26): "ZAP will not raise an alert with a confidence of either 'False Positive' or 'Confirmed'. However you can set these levels either manually or via an Alert Filter." — meaning those two extreme values only exist as a place for a **human** to write down a verdict; the automated engine itself only ever emits Low/Medium/High. This is architecturally the same pattern as axe's `incomplete` and IBM's `MANUAL`: the tool's own output space explicitly reserves room for a human overwrite, and marks its own default output as provisional (confidence ≤ High, never "Confirmed").

Risk × Confidence together produce ZAP's real triage surface — e.g. "High risk / Low confidence" (probably worth a quick look, likely noisy) is a materially different work item than "High risk / High confidence" (drop everything), and ZAP's UI and automation-framework tests (see C4/E2) let you gate on both axes independently.

### B4. Semgrep severity + rule metadata (a ready-made triage schema)

Source: `semgrep/semgrep` (license **LGPL-2.1**, verified from repo `LICENSE` and `cli/LICENSE` — identical text in both locations, no internal split between the CLI wrapper and the core engine at the file level); `semgrep/semgrep-rules` metadata schema file `metadata-schema.yaml.schm` (fetched from repo HEAD 2026-07-26).

**Severity, current mapping** (per `docs.semgrep.dev/writing-rules/rule-syntax`, WebFetched 2026-07-26): the newer severity field accepts `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`; "The older levels `ERROR`, `WARNING`, and `INFO` match `HIGH`, `MEDIUM`, and `LOW`" respectively (backward-compatible aliasing, not a breaking rename).

**The metadata schema is a genuine, machine-enforced triage model**, defined as a JSON Schema (`metadata-schema.yaml.schm`, verbatim excerpt):

```yaml
$schema: http://json-schema.org/draft-07/schema#
schema:
  allOf:
  - type: object
    required:
    - category
    - technology
    properties:
      category:
        type: string
        enum: [security, correctness, best-practice, maintainability, portability, performance, accessibility]
      confidence:
        type: string
        enum: [LOW, MEDIUM, HIGH]
      likelihood:
        type: string
        enum: [LOW, MEDIUM, HIGH]
      impact:
        type: string
        enum: [LOW, MEDIUM, HIGH]
      subcategory:
        type: [array]
        items: {type: string, enum: [audit, vuln, "secure default"]}
      cwe:
        type: [array, string]
        pattern: "^CWE-\\d+.*"
    if:
      properties: {category: {const: security}}
      required: [category]
    then:
      required: [cwe, likelihood, impact, subcategory, references]
```

The `if/then` conditional is the interesting part: **a rule tagged `category: security` is schema-required to declare `cwe`, `likelihood`, `impact`, `subcategory`, and `references`** — Semgrep's own rule-authoring tooling enforces that any security-relevant rule must carry a full triage dossier (three independent LOW/MEDIUM/HIGH axes — confidence, likelihood, impact — plus a CWE reference and evidence links) before it's considered well-formed. This is precisely the kind of "ready-made triage model" the brief asked for, and it's enforced by JSON Schema, not just convention.

### B5. Trivy / Grype severity taxonomy and cross-source disagreement resolution

Source: `aquasecurity/trivy`, `docs/guide/scanner/vulnerability.md` (fetched from repo HEAD 2026-07-26; license **Apache-2.0**; latest release `v0.72.0`, 2026-06-30 — note Trivy itself, the vulnerability-DB feed `aquasecurity/trivy-db`, tags weekly `wYYYY-MM-DD` releases, so treat "latest" carefully depending on which repo you mean).

**Taxonomy**: `CRITICAL` / `HIGH` / `MEDIUM` / `LOW` / `UNKNOWN`, numerically:

```
0 = Unknown, 1 = Low, 2 = Medium, 3 = High, 4 = Critical
```

**How Trivy resolves disagreement between sources (this is exactly the "documented judgment" the brief wants), quoted verbatim:**

> "The severity is taken from the selected data source since the severity from vendors is more accurate. Using CVE-2023-0464 as an example, while it is rated as 'HIGH' in NVD, Red Hat has marked its 'Impact' as 'Low'. As a result, Trivy will display it as 'Low'. The severity depends on the compile option, the default configuration, etc. NVD doesn't know how the vendor distributes the software. Red Hat evaluates the severity more accurately. That's why Trivy prefers vendor scores over NVD."

Fallback chain, precisely ordered:

1. **Vendor-specific advisory severity** (e.g. Red Hat's own "Impact" rating) — preferred whenever available, because the vendor knows their own build configuration/backport state and NVD does not.
2. If the selected source has no severity rating → derive from the **CVSS base score** using a fixed band table: `0.1–3.9 Low, 4.0–6.9 Medium, 7.0–8.9 High, 9.0–10.0 Critical`.
3. If no CVSS score either → fall back to **NVD**.
4. A configurable **preference order** (`--vuln-severity-source`) lets an operator override the default source-priority chain per ecosystem; the JSON report exposes `SeveritySource` (which source won) and `VendorSeverity` (every source's raw rating) so the disagreement is fully auditable, not hidden.

Verbatim JSON example of the audit trail Trivy exposes:

```json
"SeveritySource": "debian",
"VendorSeverity": {
  "amazon": 2, "cbl-mariner": 4, "ghsa": 4, "nvd": 4, "photon": 4, "redhat": 2, "ubuntu": 2
}
```

Also worth noting as its own judgment axis: Trivy's `--detection-priority` flag (`precise` default vs `comprehensive`) is explicitly framed by Trivy's own docs as a precision/recall trade-off:

> "`precise`: This mode prioritizes reducing false positives... `comprehensive`: This mode aims to detect more vulnerabilities, potentially including some that might be false positives... Regardless of the chosen mode, user review of detected vulnerabilities is crucial."

**Grype** (`anchore/grype`, license **Apache-2.0** verified from `LICENSE`, latest release `v0.116.0`, 2026-07-16) uses the same five-tier `CRITICAL/HIGH/MEDIUM/LOW/UNKNOWN/NEGLIGIBLE` style taxonomy but its ignore mechanism is comparatively unstructured — see F2.

### B6. CVSS / EPSS / KEV — severity is not the same axis as exploitability, and mixing them is a documented mistake

**CVSS v3.1 qualitative severity bands** (FIRST.org specification, WebFetched 2026-07-26):

| Rating | CVSS Score |
|---|---|
| None | 0.0 |
| Low | 0.1 – 3.9 |
| Medium | 4.0 – 6.9 |
| High | 7.0 – 8.9 |
| Critical | 9.0 – 10.0 |

**CVSS v4.0** uses the **identical** band table ("Table 22: Qualitative severity rating scale" — verified verbatim from the v4.0 specification document, WebFetched 2026-07-26: "All CVSS scores regardless of nomenclature can be mapped to the qualitative ratings defined in Table 22"). What changed in v4.0 is *not* the severity bands but the underlying metric model: `Scope` was retired and replaced by explicit Vulnerable/Subsequent system impact metrics, a new `Attack Requirements (AT)` base metric was added, the Temporal group was renamed to `Threat`, and a new `Supplemental` metric group (Safety, Automatable, Recovery, Value Density, Vulnerability Response Effort, Provider Urgency) was introduced for OT/ICS and enterprise-risk context. Practical implication for a skill: **a CVSS score alone does not tell you which CVSS version produced it**, and the numeric severity band means the same thing across 3.1 and 4.0 even though the formula changed — comparisons of raw scores across versions are still hazardous because the *inputs* changed even if the *output bands* didn't.

**EPSS (Exploit Prediction Scoring System)** — a different axis entirely, from likelihood-of-severe-impact to likelihood-of-actual-exploitation. Verbatim (FIRST.org, WebFetched 2026-07-26):

> "The Exploit Prediction Scoring System (EPSS) is a data-driven machine-learning model that estimates the probability that a published CVE will be exploited in the wild in the next 30 days." ... "EPSS publishes a 0–1 probability (with ranking percentiles) every day for every CVE." ... EPSS "replaces subjective severity judgments with empirical signals from observed exploitation and ongoing activity, helping you focus limited remediation effort where attacks are most likely."

This is the industry's explicit, published argument that **CVSS severity alone is a poor prioritization signal**: a 9.8-CVSS vulnerability with near-zero real-world exploitation probability (low EPSS) may be a lower operational priority than a 6.5-CVSS vulnerability that's actively being exploited at scale (high EPSS). A defensible triage model uses *both* axes, not CVSS alone.

**CISA KEV (Known Exploited Vulnerabilities catalog)** — a third, binary axis: has this CVE been observed being exploited in the wild, at all, ever (not a probability — a documented fact). Per WebSearch of CISA's own materials (2026-07-26): "Known Exploited Vulnerabilities (KEVs) are a subset of CVEs which have been used to compromise systems in the real world. Reliable evidence of exploitation in the wild is only one of the criteria needed to add a vulnerability to the KEV. A vulnerability must also have a CVE ID and clear remediation guidance." Binding Operational Directive **BOD 22-01** mandates FCEB (US federal civilian) agencies remediate KEV-listed CVEs by a fixed due date (example cited: a CVE added 2025-04-17 carried a due date of 2025-05-08 — roughly a 3-week SLA). `[UNVERIFIED — needs a status check before use]`: one of the CISA page titles surfaced in the same search was literally "BOD 22-01: ... (Revoked)", alongside a separate article about CISA "giving agencies new vulnerability remediation deadlines that take risk levels into account" — this suggests BOD 22-01 may have been superseded by a newer, risk-tiered directive sometime before 2026-07-26. **Do not assert BOD 22-01 is the current live directive without re-checking `cisa.gov` directly** (its `known-exploited-vulnerabilities-catalog` page returned HTTP 403 to automated fetch during this research pass, so I could not confirm current status at source).

**The composite judgment (industry-standard, not this skill's invention)**: Severity (CVSS) × Exploitation probability (EPSS) × Confirmed-in-the-wild (KEV) is the modern three-axis prioritization stack; using CVSS severity as the sole gate is the exact anti-pattern this literature explicitly warns against.

---

## C. Budget & gate file formats — full schemas + verbatim examples

### C1. Lighthouse CI `assert` config — the fullest citable schema in this whole survey

Source: `GoogleChrome/lighthouse-ci`, `docs/configuration.md` (fetched from repo HEAD 2026-07-26; license **Apache-2.0**; repo not archived, `pushed_at: 2026-03-27`).

**Assertion levels** (three, verbatim):

> "`off` - The audit result will not be checked. If an audit is not found in the `assertions` object, it is assumed to be `off`."
> (and `warn` / `error` — non-zero exit only on `error`.)

**Assertion syntax** — eslint-style `level | [level, options]`, keyed by Lighthouse audit ID (audit-level) or `categories:<categoryId>` (category-score-level):

```jsonc
{
  "ci": {
    "assert": {
      "assertions": {
        "installable-manifest": ["warn", {"minScore": 1}],
        "categories:performance": ["warn", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 1}],
        "audit-id-1": ["warn", {"maxNumericValue": 4000}],
        "audit-id-2": ["error", {"minScore": 0.8}]
      }
    }
  }
}
```

Default when an assertion has no explicit options: `{"aggregationMethod": "optimistic", "minScore": 1}` — i.e. if you don't say otherwise, LHCI demands a *perfect* score using the *most favorable* of your collected runs. This is a meaningfully permissive default worth flagging to users who assume "default = strict."

**`maxLength`, `maxNumericValue`, `minScore`** — the three threshold properties, checked against `score`, `details.items.length`, and `numericValue` respectively.

**`aggregationMethod`** — how multiple Lighthouse runs of the same URL are collapsed into one number before the threshold is applied (a real judgment call, not a technicality):

> - `median` - Use the median value from all runs.
> - `optimistic` - Use the value that is most likely to pass from all runs.
> - `pessimistic` - Use the value that is least likely to pass from all runs.
> - `median-run` - Use the value of the run that was determined to be "most representative" of all runs based on key performance metrics.

Choosing `optimistic` vs `pessimistic` is the difference between a CI gate that lets flaky-fast runs mask real regressions and one that lets flaky-slow runs block merges — this choice belongs in a skill's decision framework, not left to the tool default.

**`assertMatrix`** — per-URL-pattern assertion overrides:

```jsonc
{
  "ci": { "assert": { "assertMatrix": [
    { "matchingUrlPattern": ".*", "assertions": {
        "first-contentful-paint": ["warn", {"maxNumericValue": 2000}] } },
    { "matchingUrlPattern": "https://[^/]+/app", "assertions": {
        "interactive": ["warn", {"maxNumericValue": 5000}] } }
  ] } }
}
```

**Presets** (verbatim):

> - `lighthouse:all` - Asserts that every audit received a perfect score. This is extremely difficult to do. Only use as a base on very high quality, greenfield projects and lower the thresholds as needed.
> - `lighthouse:recommended` - Asserts that every audit outside performance received a perfect score, that no resources were flagged for performance opportunities, and warns when metric values drop below a score of `90`. This is a more realistic base that disables hard failures for flaky audits.
> - `lighthouse:no-pwa` - `lighthouse:recommended` but without any of the PWA audits enabled.

CLI invocation form: `lhci assert --preset=lighthouse:recommended --assertions.uses-webp-images=off`.

**A precise correction worth flagging**: LHCI's own docs still describe `budget.json` as an alternative to manual assertions ("Instead of configuring using Lighthouse CI assertions against Lighthouse audits, a `budget.json` file can be used instead"), but a full-tree search of the current `GoogleChrome/lighthouse` repo (2026-07-26) found **zero files with "budget" anywhere in the path** — Lighthouse core no longer ships a dedicated budget audit module. The budget.json parsing logic now lives in **`@lhci/utils`** (`packages/utils/src/budget.js` and `packages/utils/src/budgets-converter.js` in `GoogleChrome/lighthouse-ci`), which converts a budget.json file into LHCI assertions at collection time — i.e. "performance budgets" is now an LHCI-owned feature, not a Lighthouse-core one, even though the schema is unchanged.

### C2. `budget.json` schema (Lighthouse's resource-budget format)

Source: `GoogleChrome/budget.json` — **note this schema-definition repo is archived** (`archived: true`, last push 2019-12-16), though the format it defines is still the one LHCI's `budgets-converter.js` implements today.

```json
[
   {
      "path": "/*",
      "resourceSizes": [
         { "resourceType": "total", "budget": 300 },
         { "resourceType": "script", "budget": 150 }
      ],
      "resourceCounts": [
         { "resourceType": "third-party", "budget": 10 }
      ]
   },
   {
      "path": "/blog",
      "resourceSizes": [
         { "resourceType": "total", "budget": 200 }
      ]
   }
]
```

Field semantics (verbatim, condensed):
- `path` (optional, robots.txt-style pattern) — which pages this budget object applies to; if multiple budgets match a URL, **the last match wins**, so global budgets should be listed first, overrides after.
- `resourceSizes` (optional array) — `{resourceType, budget}` pairs; `budget` is in **kilobytes**, measured against **transfer size**.
- `resourceCounts` (optional array) — same shape, `budget` is a **request count**.
- `resourceType` enum: `document, font, image, media, other, script, stylesheet, third-party, total`.
- A "Proposed Features" section (never implemented in this archived spec repo) lists "Support timing-based budgets" as a wishlist item — i.e. `budget.json` was never officially extended to cover FCP/TTI-style timing budgets at the spec level; any tool claiming timing budgets via this exact file format is going beyond the original spec.

A minimal real-world LHCI fixture confirming the schema is still live (`GoogleChrome/lighthouse-ci`, `packages/cli/test/fixtures/budgets.json`, fetched 2026-07-26):

```json
[
  { "resourceSizes": [{"resourceType": "script", "budget": 1}] }
]
```

### C3. `size-limit` config (`ai/size-limit`)

Source: `ai/size-limit` README (fetched from repo HEAD 2026-07-26; license **MIT**; latest release `v11.x` line, `pushed_at: 2026-07-24`, high-velocity project — 6,933 stars).

`package.json` schema (verbatim from README's step-by-step example):

```json
"size-limit": [
  { "path": "dist/app-*.js", "limit": "35 kB" }
],
"scripts": {
  "size": "npm run build && size-limit",
  "test": "vitest && eslint . && npm run size"
}
```

The tool's own recommended workflow for setting the limit is itself a judgment default worth capturing: "Here's how you can get the size for your current project... Now, let's set the limit. Add 25% to the current total size and use that as the limit." — i.e. size-limit's documented best practice is not "pick a principled target," it's "measure your current size and add a 25% headroom buffer," a pragmatic anti-regression gate rather than an absolute quality bar.

### C4. k6 thresholds — full BNF grammar from source, plus `abortOnFail`

Source: `grafana/k6`, `metrics/thresholds_parser.go` (fetched from repo HEAD 2026-07-26; license **AGPL-3.0**, see H1 for full licensing history/correction) and `grafana.com/docs/k6/latest/using-k6/thresholds/` (WebFetched 2026-07-26).

**The exact BNF grammar, verbatim from the Go source comment**:

```
assertion           -> aggregation_method whitespace* operator whitespace* float
aggregation_method  -> trend | rate | gauge | counter
counter             -> "count" | "rate"
gauge               -> "value"
rate                -> "rate"
trend               -> "avg" | "min" | "max" | "med" | percentile
percentile          -> "p(" float ")"
operator            -> ">" | ">=" | "<=" | "<" | "==" | "===" | "!="
float               -> digit+ ("." digit+)?
digit               -> "0" | "1" | "2" | ... | "9"
whitespace          -> " "
```

Basic example (`examples/thresholds.js`, repo HEAD):

```javascript
export let options = {
    thresholds: {
        http_req_duration: ["p(95)<500"],
        "http_req_duration{name:http://httpbin.org/post}": ["max<1000"],
    }
};
```

**Full object form with `abortOnFail`/`delayAbortEval`** (per current Grafana docs, WebFetched 2026-07-26):

```javascript
export const options = {
  thresholds: {
    metric_name: [
      {
        threshold: 'p(99) < 10',
        abortOnFail: true,       // "Whether to abort the test if the threshold is
                                  //  evaluated to false before the test has completed"
        delayAbortEval: '10s',   // delay before abort evaluation kicks in, relative time string
      },
    ],
  },
};
```

`abortOnFail` is the literal circuit-breaker: a threshold breach can **stop the load test early**, not just mark it failed after the fact — a meaningfully different operational posture than every other gate format surveyed here (which all evaluate post-hoc).

### C5. Gatling assertions DSL

Source: `docs.gatling.io/concepts/assertions/` (WebFetched 2026-07-26); `gatling/gatling` repo license **Apache-2.0** verified from `LICENSE.txt`, latest release info not separately tagged in the monorepo release list checked (repo `pushed_at: 2026-07-21`).

Four-part chained DSL: **Scope** (`global()` / `forAll()` / `details(path)`) → **Statistic** (`responseTime()`, `allRequests()`, `failedRequests()`, `successfulRequests()`, `requestsPerSec()`) → **Metric** (`min/max/mean/stdDev/percentile1-4/percentile(value)` for response time; `percent/count` for request counts) → **Condition** (`lt/lte/gt/gte/between/around/deviatesAround/is/in`).

```java
setUp(scn.injectOpen(injectionProfile))
  .assertions(
    global().responseTime().max().lt(100),
    forAll().failedRequests().percent().lte(5.0),
    details("MyGroup", "MyRequest").failedRequests().percent().is(0.0),
    details("MyGroup").requestsPerSec().between(100.0, 1000.0)
  );
```

Assertions evaluate **after simulation completion** and a failure fails the whole test. Note: "Gatling Enterprise Edition's SLOs take precedence over simulation code assertions" — the commercial Enterprise product has its own gate layer that can override the OSS assertions DSL, which is the open-core boundary to be aware of (see H3).

### C6. pa11y / pa11y-ci `threshold` — the literal gate, plus a specific incomplete-handling knob

Source: `pa11y/pa11y` README (fetched from repo HEAD 2026-07-26; license **LGPL-3.0**, verified from `LICENSE`; latest release `9.1.1`, 2026-02-26) and `pa11y/pa11y-ci` README (license **LGPL-3.0**, verified via GitHub API, same license family).

CLI flag and JS-config field, verbatim:

> `-T, --threshold <number>` — permit this number of errors, warnings, or notices, otherwise fail with exit code 2

> "Pa11y can also ignore notices, warnings, and errors up to a threshold number. This might be useful if you're using CI and don't want to break your build. The following example will return exit code 0 on a page with 9 errors, and return exit code 2 on a page with 10 or more errors." — `pa11y https://example.com --threshold 10`

JS config: `{"threshold": 9}` (default `0` — i.e. pa11y is strict by default: any single issue fails the build unless you explicitly raise the threshold).

**The specific incomplete-handling knob** (this is a direct, practical instance of the A1 boundary leaking into a CI gate): pa11y's axe runner surfaces axe's `incomplete`/"needs review" results, and pa11y gives you an explicit dial for how those get folded into its own three-level (`error`/`warning`/`notice`) severity scheme:

> `--level-cap-when-needs-review <level>` — (axe-only) cap severity of any issue requiring manual review to: error (default), warning, notice

**This default is a trap worth flagging in the skill**: pa11y's out-of-the-box behavior treats axe's `incomplete` ("a human must look at this") results as full `error`-level findings, which count against `--threshold` exactly like a confirmed violation. A team running `pa11y-ci` with a tight threshold and the axe runner, without knowing about this flag, will have their CI gate fail on items axe itself flagged as unresolved rather than as confirmed defects — silently converting "needs human judgment" into "hard CI failure" unless someone explicitly sets `--level-cap-when-needs-review warning` or `notice`.

pa11y-ci top-level config (`README.md`, repo HEAD):

```json
{
  "defaults": { "timeout": 1000, "viewport": { "width": 320, "height": 480 } },
  "urls": [
    "https://pa11y.org/",
    { "url": "https://pa11y.org/contributing", "timeout": 50000, "screenCapture": "myDir/my-screen-capture.png" }
  ]
}
```

`defaults.concurrency` (parallel test count, default `1`) and `defaults.useIncognitoBrowserContext` (default `true`, isolates cookies between page tests) round out pa11y-ci's own top-level options; per-command `-T/--threshold` still governs exit code.

### C7. ZAP Automation Framework — full job/config surface incl. `exitStatus` gate

Source: `zaproxy/zap-extensions`, `addOns/automation/src/test/resources/org/zaproxy/addon/automation/resources/template-max.yaml` (fetched from repo HEAD 2026-07-26 — note this addon's canonical home moved from `zaproxy/zaproxy` to `zaproxy/zap-extensions`).

Top-level `env.parameters` gate flags:

```yaml
parameters:
  failOnError: true      # If set exit on an error
  failOnWarning: false   # If set exit on a warning
  continueOnFailure: false
  progressToStdout: true
```

The dedicated **`exitStatus`** job — the literal CI pass/fail translation layer, verbatim:

```yaml
- type: exitStatus
  parameters:
    errorLevel:      # String: Informational, Low, Medium, High, default: not set
    warnLevel:       # String: Informational, Low, Medium, High, default: not set
    okExitValue:      # Integer: Exit value if all ok, default 0
    errorExitValue:   # Integer: Exit value if there are errors, default 1
    warnExitValue:    # Integer: Exit value if there are warnings, default 2
```

This maps ZAP's four-level **risk** axis (Informational/Low/Medium/High — see B3) directly onto a numeric process exit code, with independent thresholds for "fail the build" (`errorLevel`) vs "warn but pass" (`warnLevel`) — risk-based, not confidence-based; confidence is handled separately (per-alert, via alert filters), so a CI gate configured only on `errorLevel` says nothing about how *confident* ZAP was in those High-risk alerts.

The `activeScan` job's own `tests` block also supports assertion-style pass/fail checks per specific alert, with an explicit confidence field:

```yaml
tests:
  - name: 'test one'
    type: alert
    action: passIfPresent/passIfAbsent
    scanRuleId:
    confidence:    # one of 'False Positive', 'Low', 'Medium', 'High', 'Confirmed'
    risk:          # one of 'Informational', 'Low', 'Medium', 'High'
    onFail: 'info' # one of 'warn', 'error', 'info'
```

---

## D. Scoring models

### D1. Lighthouse — scoring model, weights, curves, bands (v13.4.1, read from source 2026-07-26)

**Category weighting** — Performance category is a weighted average of five *metric* audits (verbatim, `core/config/default-config.js` lines 408-413, `GoogleChrome/lighthouse` @ `v13.4.1`, `pushed_at: 2026-07-25`):

```javascript
{id: 'first-contentful-paint',    weight: 10, group: 'metrics', acronym: 'FCP'},
{id: 'largest-contentful-paint',  weight: 25, group: 'metrics', acronym: 'LCP'},
{id: 'total-blocking-time',       weight: 30, group: 'metrics', acronym: 'TBT'},
{id: 'cumulative-layout-shift',   weight: 25, group: 'metrics', acronym: 'CLS'},
{id: 'speed-index',               weight: 10, group: 'metrics', acronym: 'SI'},
{id: 'interaction-to-next-paint', weight: 0,  group: 'metrics', acronym: 'INP'},
```

Weights sum to 100 across the five *scored* metrics (TBT heaviest at 30, LCP and CLS tied at 25, FCP and SI tied at 10). **INP carries weight 0** — it is measured and displayed but contributes nothing to the Performance score. This is the headline "lab vs field, machine-cannot-decide" artifact for performance: INP's own audit file (`core/audits/metrics/interaction-to-next-paint.js`) declares `supportedModes: ['timespan']` — it requires an actual recorded user interaction, which a single-page-load "navigation" Lighthouse run (the default mode most CI pipelines use) cannot produce. **A perfect/green Lighthouse Performance score is not evidence about INP** — it is silently excluded from the number in the default navigation-mode run. Other weight-0, `group: 'hidden'` audits in the same config include `interactive` (TTI, now deprecated as a scored metric) and `max-potential-fid`.

**Log-normal scoring curve control points** (mobile; each metric's `defaultOptions.scoring` object, `p10` = value that scores 0.9 (green boundary), `median` = value that scores 0.5), read directly from each metric's audit source file:

| Metric | p10 (scores ~0.90) | median (scores ~0.50) | Source comment (verbatim) |
|---|---|---|---|
| FCP | 1800 ms | 3000 ms | "25th and 8th percentiles HTTPArchive -> median and p10." |
| LCP | 2500 ms | 4000 ms | "25th and 13th percentiles HTTPArchive -> median and p10 points." |
| TBT | 200 ms | 600 ms | **"The following coefficients are semi-arbitrarily chosen, but start to approach the 'correct' ones"** |
| CLS | 0.1 | 0.25 | **"This 0.1 target score was determined through both manual evaluation and large-scale analysis."** |
| SI | 3387 ms | 5800 ms | "25th and 5th percentiles HTTPArchive -> median and PODR, then p10 derived from them." |

Desktop control points differ substantially (e.g. FCP p10 934 ms / median 1600 ms; LCP p10 1200 ms / median 2400 ms; SI p10 1311 ms / median 2300 ms) — **mobile and desktop Performance scores are not comparable to each other by design**, because they're scored against different HTTP Archive percentile distributions, not a fixed absolute scale.

**The single most important line to carry into the skill**: TBT is the *heaviest-weighted* metric (30/100) in the entire Performance score, and its own source code openly admits its scoring thresholds are **"semi-arbitrarily chosen"** — i.e. the metric with the most influence over your score has the least-principled threshold-derivation of the five. CLS, by contrast, states its 0.1 target was "determined through both manual evaluation and large-scale analysis" — a stronger empirical claim, though also for a lower-weighted (25) metric.

**Exact score computation** (`shared/util.js` + `shared/statistics.js`, verbatim):

```javascript
static computeLogNormalScore(controlPoints, value) {
  let percentile = statistics.getLogNormalScore(controlPoints, value);
  // Add a boost to scores of 90+, linearly ramping from 0 at 0.9 to half a
  // point (0.005) at 1. Expands scores in (0.9, 1] to (0.9, 1.005], so more top
  // scores will be a perfect 1 after the two-digit Math.floor() rounding below.
  if (percentile > 0.9) {
    percentile += 0.05 * (percentile - 0.9);
  }
  return Math.floor(percentile * 100) / 100;
}
```

The underlying distribution is an inverse-erfc-derived log-normal CDF (`getLogNormalScore`), not a linear interpolation between p10 and median — meaning score deltas near the passing boundary (0.9) are much more sensitive to small timing changes than score deltas in the middle of the distribution.

**Color bands** (`shared/util.js`, verbatim):

```javascript
const PASS_THRESHOLD = 0.9;
const RATINGS = {
  PASS: {label: 'pass', minScore: PASS_THRESHOLD},   // green, 90–100
  AVERAGE: {label: 'average', minScore: 0.5},         // orange, 50–89
  FAIL: {label: 'fail'},                              // red, 0–49
  ERROR: {label: 'error'},
};
```

Best Practices and SEO categories use flat equal-weighting across their audits (per `docs/scoring.md`: "All audits in the Best Practices category are equally weighted... implementing each audit correctly will increase your overall score by ~6 points" and similarly ~8 points per SEO audit, with Structured Data excluded as an unscored manual audit). The Accessibility category historically used a weighted-average model with individual weights per WCAG-mapped audit (the `docs/scoring.md` table I retrieved is explicitly stale, labeled "v7" weights, and current weights should be regenerated via `node core/scripts/print-a11y-scoring.js` rather than assumed — I did not re-run this generator, so **do not cite specific current a11y-category weights as verified**; only the v7-era table above is directly sourced, and it is explicitly out of date).

### D2. Core Web Vitals thresholds + published rationale

Exact boundaries (web.dev, WebFetched 2026-07-26):

| Metric | Good | Needs Improvement | Poor |
|---|---|---|---|
| LCP | ≤ 2500 ms | 2500–4000 ms | > 4000 ms |
| INP | ≤ 200 ms | 200–500 ms | > 500 ms |
| CLS | ≤ 0.1 | 0.1–0.25 | > 0.25 |

**The rationale is a genuine, citable methodology document** — web.dev's "Defining the Core Web Vitals metrics thresholds" article. Key argument, as captured via WebFetch 2026-07-26:

> The thresholds reflect three criteria: (1) alignment with "high-quality user experience" grounded in HCI research, (2) achievability — demonstrated by "at least 10% of origins" meeting the good threshold on real-world data, and (3) practical cross-device implementability using unified thresholds despite hardware differences.

**Why the 75th percentile** (verbatim reasoning, WebFetched 2026-07-26): "the percentile should ensure that a majority of visits to a page or site experienced the target level of performance" while avoiding outlier distortion; the 75th percentile "strikes a reasonable balance" because "most visits to the site (3 of 4) experienced the target level of performance or better," and it would require "25 of those visits... to report large outlier samples" to meaningfully skew the aggregate — i.e. p75 is explicitly chosen as a robustness-to-outliers compromise, not an arbitrary round number.

**INP replaced FID** on a specific, sourced date: "INP will officially become a Core Web Vital and replace FID on March 12" — confirmed as **March 12, 2024** (web.dev blog announcement, WebFetched 2026-07-26). FID was simultaneously deprecated (removed from Search Console immediately; a six-month deprecation grace period applied to other tools).

### D3. CVSS bands — see B6 (identical table applies to both v3.1 and v4.0).

---

## E. Test-type taxonomies

### E1. k6 load test types (Grafana docs, WebFetched 2026-07-26) — verbatim definitions

> **Smoke Tests** — "validate that your script works and that the system performs adequately under minimal load." (Low VUs, seconds/minutes)
>
> **Average-Load Tests** — "assess how your system performs under expected normal conditions." (Average production VUs, 5–60 min)
>
> **Stress Tests** — "assess how a system performs at its limits when load exceeds the expected average." (High VUs, 5–60 min)
>
> **Soak Tests** — "assess the reliability and performance of your system over extended periods." (Average VUs, hours)
>
> **Spike Tests** — "validate the behavior and survival of your system in cases of sudden, short, and massive increases in activity." (Very high VUs, a few minutes)
>
> **Breakpoint Tests** — "gradually increase load to identify the capacity limits of the system." (Load increases until system breaks)

Each test type targets a *different failure mode* (functional correctness under trivial load; steady-state capacity; graceful degradation past capacity; memory/resource leaks over time; burst-handling; absolute ceiling) — a skill should map "what are you actually worried about" to the test type rather than defaulting to one generic load test.

**Percentile-vs-average rationale**: k6's own current threshold docs do **not** contain an explicit "percentiles are better than averages" argument — I looked (`grafana.com/docs/k6/latest/using-k6/thresholds/`, WebFetched 2026-07-26) and the docs present `avg`, `min`, `max`, `med`, and `p(N)` as a neutral menu of aggregation options without a comparative statement about statistical validity. `[UNVERIFIED as a k6-sourced claim]` — the "percentiles hide fewer outliers than averages" argument is industry-standard load-testing folklore (and true), but I could not find k6's own docs making this argument explicitly in the pages checked; do not attribute the rationale to k6's documentation specifically.

### E2. ZAP baseline vs full scan

Source: `zaproxy.org/docs/docker/baseline-scan/` (WebFetched 2026-07-26).

> Baseline scan "runs the ZAP spider against the specified target for (by default) 1 minute and then waits for the passive scanning to complete before reporting the results." It performs **no active attacks** and completes in minutes — safe even against production targets.

Full scan performs active attacks (real exploit attempts against the target) and takes substantially longer — this is the fundamental judgment split in DAST: **passive-only (safe anywhere) vs active (can break things, only run against environments you're allowed to attack)**. ZAP's CI exit-code model for the baseline scan script:

- `0` = success, no failures
- `1` = at least one **FAIL**
- `2` = at least one **WARN**, no FAILs
- `3` = any other failure

All discovered alerts default to `WARN` classification unless a `-c`/`-u` config file remaps specific rule IDs to `FAIL`/`IGNORE`/`INFO` — i.e. ZAP's baseline scan ships maximally permissive by default (nothing fails the build until you explicitly promote specific rules).

### E3. Trivy scan modes/targets

Per Trivy docs (WebFetched 2026-07-26): **Container Image**, **Filesystem**, **Rootfs** (unpacked container image root), **Code Repository**, **Virtual Machine Image**, **Kubernetes** (cluster/KBOM), and **SBOM** (scan a pre-generated SBOM instead of re-analyzing the target directly — useful for air-gapped or supply-chain-attested pipelines where you trust a signed SBOM more than a fresh scan).

---

## F. Residual-risk artifacts

### F1. VEX (Vulnerability Exploitability eXchange) — the formal "this does not affect us" statement, with a controlled justification vocabulary

This is the most rigorous "residual risk" artifact found anywhere in this survey — a **controlled vocabulary**, not free text, for explaining why a known vulnerability is not being fixed.

**Status enum** (OpenVEX spec, WebFetched 2026-07-26, verbatim):

> - `not_affected` — "No remediation is required regarding this vulnerability"
> - `affected` — "Actions are recommended to remediate or address this vulnerability"
> - `fixed` — "These product versions contain a fix for the vulnerability"
> - `under_investigation` — "It is not yet known whether these product versions are affected"

**`not_affected` justification enum** (OpenVEX spec, WebFetched 2026-07-26, verbatim) — this is the superb judgment content the brief called out:

> - `component_not_present` — the vulnerable component is absent from the product
> - `vulnerable_code_not_present` — the component exists but the vulnerable code was excluded during configuration or build
> - `vulnerable_code_not_in_execute_path` — the vulnerable code cannot be executed by the product
> - `vulnerable_code_cannot_be_controlled_by_adversary` — an attacker cannot manipulate the vulnerable code to trigger exploitation
> - `inline_mitigations_already_exist` — built-in protections prevent exploitation and cannot be bypassed or disabled

**Trivy's real CycloneDX VEX example** (`docs/guide/supply-chain/vex/file.md`, fetched from repo HEAD 2026-07-26) — note it uses `code_not_reachable` and a `response` array, showing the CycloneDX flavor of VEX diverges slightly in vocabulary from OpenVEX's justification enum above (both express the same underlying concept — code unreachability — with different exact tokens, which is itself worth flagging: **VEX justification vocabularies are not fully unified across the CycloneDX and OpenVEX formats**):

```json
{
  "bomFormat": "CycloneDX",
  "specVersion": "1.5",
  "vulnerabilities": [{
    "id": "CVE-2020-8911",
    "analysis": {
      "state": "not_affected",
      "justification": "code_not_reachable",
      "response": ["will_not_fix", "update"],
      "detail": "The vulnerable function is not called"
    },
    "affects": [{"ref": "urn:cdx:.../1#pkg:golang/github.com/aws/aws-sdk-go@v1.44.234"}]
  }]
}
```

Trivy supports **CycloneDX** (SBOM target only), **OpenVEX** (all scan targets — image/fs/repo/VM/k8s/SBOM), and **CSAF** as input VEX formats (per Trivy docs, fetched 2026-07-26). When a matching `not_affected` VEX statement is supplied, Trivy filters the vulnerability out of the report entirely rather than merely annotating it — the VEX document doesn't just add a comment, it actively suppresses the finding.

### F2. `.trivyignore` and Grype ignore rules — structured vs. unstructured residual-risk records

**Grype's ignore rule** (`anchore/grype`, `test/cli/testdata/test-ignore-reason/config-with-ignore.yaml`, fetched from repo HEAD 2026-07-26) is comparatively unstructured — a free-text `reason` field, no controlled vocabulary:

```yaml
ignore:
  - vulnerability: CVE-2021-42385
    reason: test reason for vulnerability being ignored
```

This is a meaningful contrast to VEX's controlled justification enum (F1): **Grype's native ignore mechanism records that a human made a decision, and lets them write anything as the reason; VEX records the decision in an interoperable, machine-parseable justification taxonomy**. A skill recommending residual-risk tracking should push toward VEX (or at minimum a locked enum of reasons) over freeform ignore-reason text specifically because freeform text can't be validated, aggregated, or audited across a fleet the way a controlled vocabulary can. Grype also supports OpenVEX documents directly as a first-class input (confirmed via Grype's own repo README, WebFetched 2026-07-26), so the freeform `ignore.reason` path is really the "quick and dirty" option sitting alongside a more rigorous VEX path in the same tool.

### F3. ZAP false-positive handling

Per B3: ZAP's `Alert` model reserves `CONFIDENCE_FALSE_POSITIVE = 0` as a legitimate confidence value, but the automated scan engine itself will never assign it — per ZAP's own docs, "ZAP will not raise an alert with a confidence of either 'False Positive' or 'Confirmed'... you can set these levels either manually or via an Alert Filter." This makes ZAP's false-positive/confirmed handling structurally a **manual override layer bolted onto an automated engine that cannot reach those two states on its own** — the tool built a slot for the human verdict without ever pretending it could reach that verdict itself.

---

## G. Tool table

| Tool | URL | License (LICENSE-file verified) | Version / date checked | Decides | Does NOT decide |
|---|---|---|---|---|---|
| axe-core | `dequelabs/axe-core` | MPL-2.0 (confirmed, LICENSE file) | v4.12.1, 2026-06-10 | Rule-level pass/fail/inapplicable for ~105 documented WCAG/best-practice rules; assigns a 4-level impact | Whether alt text, link text, or headings are *appropriate*; contrast on gradients/images; anything it tags `incomplete` |
| axe-core-npm | `dequelabs/axe-core-npm` | MPL-2.0 | v4.11.3, 2026-05-04 | Node/Playwright/WebdriverIO bindings around axe-core | Same limits as axe-core (it's a wrapper) |
| ACT Rules | `act-rules/act-rules.github.io` | W3C Software and Document License (GitHub API reports `NOASSERTION` — flagged mismatch, benign) | 95 rules in `_rules/`, checked 2026-07-26 | Per-rule Applicability/Expectation with explicit `forConformance`/`further testing needed` outcomes; formalizes `automatic`/`manual`/`semiAuto` test modes via EARL | Whether an SC is conformant when a rule's outcome is "further testing needed" — that's the point |
| pa11y | `pa11y/pa11y` | LGPL-3.0 (confirmed, LICENSE file) | 9.1.1, 2026-02-26 | Threshold-gated CLI wrapper over axe or HTML CodeSniffer, three severity levels (error/warning/notice) | By default, folds axe `incomplete` into `error` via `--level-cap-when-needs-review` (default = error) — a real gotcha |
| pa11y-ci | `pa11y/pa11y-ci` | LGPL-3.0 | pushed 2026-07-14 | Multi-URL orchestration + threshold gate over pa11y | Same axe-incomplete-handling caveat as pa11y |
| IBM Equal Access | `IBMa/equal-access` | Apache-2.0 (confirmed, LICENSE file) | 4.0.29, 2026-07-14 | Two-axis Policy(VIOLATION/RECOMMENDATION/INFORMATION) × Confidence(PASS/FAIL/POTENTIAL/**MANUAL**) model; explicit `manual` report level | Anything landing in `MANUAL` confidence — same boundary as axe `incomplete` |
| Lighthouse | `GoogleChrome/lighthouse` | Apache-2.0 | v13.4.1, 2026-07-20 | Log-normal-curve Performance score (5 weighted metrics), flat-weighted Best-Practices/SEO, WCAG-mapped Accessibility category | INP (weight 0 in the score even when measured); anything requiring real user interaction in default navigation mode |
| Lighthouse CI | `GoogleChrome/lighthouse-ci` | Apache-2.0 | pushed 2026-03-27 | Pass/fail via `assert` config (eslint-style levels, 4 aggregation methods) against Lighthouse audits or `budget.json` | Which `aggregationMethod` is "correct" for your team — that's a policy choice it exposes, not resolves |
| size-limit | `ai/size-limit` | MIT | pushed 2026-07-24 | Bundle-size regression gate against a fixed KB limit | What the "right" limit is — its own docs recommend "current size + 25%" as a heuristic, not a principled target |
| k6 | `grafana/k6` | **AGPL-3.0** (confirmed, LICENSE.md; see H1 — NOT a mid-life relicense, AGPL since the file's first commit) | v2.1.0, 2026-06-30 | `thresholds` expression pass/fail per metric/aggregation/percentile, with optional early `abortOnFail` | Which load-test *type* (smoke/soak/spike/stress/breakpoint) matches your risk profile — you must choose |
| Gatling | `gatling/gatling` | Apache-2.0 (OSS core, confirmed LICENSE.txt) — Enterprise Edition is a separate closed product whose SLOs "take precedence over simulation code assertions" | pushed 2026-07-21 | `assertions()` DSL pass/fail post-run, open vs closed injection workload models | Whether open or closed workload modeling matches your real traffic pattern — a documented modelling judgment, not a default |
| Locust | `locustio/locust` | MIT (confirmed via API) | 2.46.2, 2026-07-24 | Python-scripted load generation; no built-in formal threshold/gate DSL comparable to k6/Gatling (assertions are user-written Python) | Pass/fail thresholds — Locust leaves this entirely to user code, unlike k6/Gatling's declarative gates |
| Apache JMeter | `apache/jmeter` | Apache-2.0 (confirmed via API) | rel/v5.6.3, 2024-01-09 (stale — no release in ~2.5 years as of 2026-07-26) | GUI/XML-scripted load testing with Assertions elements | Modern declarative CI-gate ergonomics — assertions live inside verbose XML test plans, not a clean external config file |
| Artillery | `artilleryio/artillery` | MPL-2.0 (confirmed, LICENSE.txt) **+ a separate `LICENSE-BSL.txt` (Business Source License 1.1) covering Azure-related code specifically, non-production use only until a 4-year Change Date** | artillery-2.0.33, 2026-06-16 | `ensure`/`expect` plugin-based assertions | The BSL-covered Azure integration code specifically is not "open source" in the OSI sense until its Change Date — narrow scope, not the whole project |
| OWASP ZAP | `zaproxy/zaproxy` | Apache-2.0 (confirmed, LICENSE) | weekly release train, `w2026-07-21` | Risk(4)×Confidence(5) alert model; Automation Framework `exitStatus` job maps risk level to process exit code | Confidence is never auto-assigned to "False Positive" or "Confirmed" — reserved for human/AlertFilter assignment only |
| Semgrep | `semgrep/semgrep` | LGPL-2.1 (confirmed, both root and `cli/` LICENSE) — **rule registry separately licensed under "Semgrep Rules License v1.0" since 2024-12-13**, restricting commercial/SaaS reuse of Semgrep-authored rules while the engine stays LGPL-2.1 | pushed 2026-07-25 | Pattern-match findings with a JSON-Schema-enforced metadata dossier (confidence/likelihood/impact/cwe/subcategory required when `category: security`) | Cross-file dataflow (Community Edition is single-file only — that's a Pro Engine/AppSec Platform feature, proprietary) |
| Trivy | `aquasecurity/trivy` | Apache-2.0 (confirmed, LICENSE) | v0.72.0, 2026-06-30 (main CLI) / weekly `w2026-07-21` (vuln DB feed repo) | CRITICAL/HIGH/MEDIUM/LOW/UNKNOWN severity with a fully documented vendor-over-NVD precedence chain; VEX-based suppression | Whether to trust `precise` vs `comprehensive` detection — explicitly framed as your precision/recall trade-off to make |
| Grype | `anchore/grype` | Apache-2.0 (confirmed, LICENSE) | v0.116.0, 2026-07-16 | Same 5/6-tier severity taxonomy; OpenVEX-aware suppression | Ignore-reason quality — its native `ignore.reason` field is freeform text, not validated against any enum |
| Nuclei | `projectdiscovery/nuclei` | MIT (confirmed, `LICENSE.md`); `nuclei-templates` also MIT | pushed 2026-07-26 | Template-driven active scanning with severity metadata per template | Whether a given community template is safe to run against production — no built-in "safe mode" distinction like ZAP baseline vs full |
| Burp Suite | commercial (PortSwigger) | N/A — closed source, brief mention only per brief's own priority ordering | — | — | — |

---

## H. Licensing notes

### H1. k6 — **correction to the brief's premise**: no evidence of a relicense from a permissive license to AGPL

The brief's framing assumed "k6 relicensed to AGPL-3.0 at some point" and asked me to verify and note the change. I checked this directly against git history rather than assuming it, and the premise does not hold up:

```
$ gh api "repos/grafana/k6/commits?path=LICENSE.md&per_page=100"
→ exactly ONE commit in the entire history of LICENSE.md:
  2016-12-13T11:14:41Z  "Added AGPL license info"
```

There is no earlier plain `LICENSE` file (a separate history query for that path returned zero commits), and the repo itself was created 2016-03-21 — so the *only* license event in this repo's history is "AGPL added," roughly 9 months after repo creation, with **no prior MIT/Apache/BSD license file ever committed to the tracked history**. This predates Grafana Labs' 2021 acquisition of k6 (the original project was Load Impact's), and it also predates and is unrelated to Grafana's well-known 2021 AGPLv3 relicensing of its *own* core products (Grafana/Loki/Tempo) — that was a separate event affecting different repos. **k6 has been AGPL-3.0 since essentially its public inception, not relicensed into AGPL from something more permissive.** Current LICENSE.md confirmed AGPL-3.0 (verbatim header: "GNU AFFERO GENERAL PUBLIC LICENSE, Version 3, 19 November 2007"), matching GitHub API's `license.spdx_id: AGPL-3.0` — no API/file mismatch. A secondary `internal/dashboard/LICENSE` file in the same repo is also AGPL-3.0 text, not a different license for that subcomponent.

### H2. Semgrep — the engine/registry split is real, but it's about *rules*, not the *engine*

Confirmed: the OSS engine (`semgrep/semgrep`, both root `LICENSE` and `cli/LICENSE`) is **LGPL-2.1**, matching the GitHub API `spdx_id`. This has not changed. What *did* change, on **2026-... — actually verified date: December 13, 2024** (per Semgrep's own blog, WebFetched 2026-07-26): Semgrep-authored rules — "Community Edition rules... governed by the **Semgrep Rules License v.1.0**, which limits their use to internal, non-competing, and non-SaaS contexts" — moved to a restrictive license that specifically targets competing commercial SAST vendors bundling Semgrep's free rule set into their own paid products, while leaving "individuals, security consultants, and companies using the rules internally" unaffected. A grace period ran until 2025-01-31. Verbatim clarification from the same announcement: the engine "remains LGPL 2.1." **This is exactly the "rules and engine may differ" trap the brief predicted** — don't describe Semgrep as simply "LGPL-2.1 open source" without the separate rule-registry caveat if the use case involves redistributing or reselling Semgrep-maintained rules. (Note: this Semgrep licensing change, and the resulting community fork controversy referenced in industry commentary as "Opengrep," is outside this shard's scope to adjudicate — flagging its existence only.)

### H3. Gatling / Artillery — commercial arms, precisely scoped

- **Gatling**: OSS core (`gatling/gatling`) is Apache-2.0, confirmed from `LICENSE.txt`. Gatling Enterprise is a wholly separate closed-source product; the one documented interaction point in the OSS docs is that Enterprise-configured SLOs "take precedence over simulation code assertions" when both are present — i.e. Enterprise doesn't just add features, it can override the OSS assertions DSL's verdict.
- **Artillery**: root license is MPL-2.0 (confirmed `LICENSE.txt`, matches GitHub API). But the repo *also* ships a second license file, `LICENSE-BSL.txt` (Business Source License 1.1), scoped narrowly and explicitly: "Licensed Works: Azure-related code in Artillery... You may make use of the Licensed Work strictly for evaluation and/or non-production use only... Change Date: Four years from the date the Licensed Work is published... Change License: MPL 2.0." This is a textbook "delayed open source" (BSL) clause applied to one specific integration (Azure) within an otherwise fully-MPL-2.0 project, not a whole-project relicense. GitHub's API-reported `license.spdx_id: MPL-2.0` is accurate for the project as a whole but doesn't surface the BSL carve-out — a case where the API technically isn't wrong, but is incomplete.

### H4. Metadata / API-vs-file mismatches found in this shard

- `act-rules/act-rules.github.io`: GitHub API `license.spdx_id: NOASSERTION`; actual license is the W3C Software and Document Notice and License (a real, permissive, named license GitHub's SPDX detector just doesn't recognize). Not a substantive disagreement, but technically a mismatch per the brief's instruction to flag any.
- No other tool checked in this shard showed an API-vs-LICENSE-file disagreement — axe-core, pa11y, IBM Equal Access, Lighthouse, k6, Gatling, Artillery, ZAP, Semgrep, Trivy, Grype, and Nuclei all had API `spdx_id` values that matched the actual LICENSE file content on direct inspection.

---

## I. Open gaps / [UNVERIFIED] and why

1. **Deque's 80.39% combined coverage figure** (automated + Intelligent Guided Testing) — sourced only via a WebSearch summary of `deque.com/automated-accessibility-coverage-report/`, not a direct primary-source read (the page didn't resolve cleanly through the fetch tool during this session). The **57% (2021 study)** figure is independently verified at source and safe to cite; 80.39% is not, and should be re-verified before use. `[UNVERIFIED]`
2. **CISA BOD 22-01 current status** — search results surfaced a CISA page titled "BOD 22-01: ... (Revoked)" alongside coverage of a newer risk-tiered remediation directive. I could not load `cisa.gov/known-exploited-vulnerabilities-catalog` directly (HTTP 403 to automated fetch) to confirm whether BOD 22-01 has been superseded. Any skill content citing BOD 22-01 as the *current* federal remediation mandate should re-verify at `cisa.gov` first. `[UNVERIFIED]`
3. **k6's own rationale for percentiles over averages** — I could not find k6's current threshold documentation making this argument explicitly (it presents `avg`/`p(N)` neutrally as a menu). The argument is true and standard in load-testing literature generally, but should not be attributed to k6's own docs specifically without a page reference I don't currently have. `[UNVERIFIED as a k6-sourced claim]`
4. **Current Lighthouse Accessibility-category audit weights** — the only weight table I could retrieve from `docs/scoring.md` is explicitly marked stale ("v7") by Lighthouse's own maintainers, who note the authoritative current weights must be regenerated by running `node core/scripts/print-a11y-scoring.js` against the current codebase — I did not execute this generator (no local Lighthouse checkout with a working Node toolchain in this pass), so no current a11y-category weight numbers are asserted anywhere in this document.
5. **WCAG 2.2 SC automatable/flag-for-review/human-only table (A4)** is explicitly a mix of grounded data (axe/ACT rule presence and `needs review` tagging) and my own inference where axe/ACT coverage is sparse or absent (2.1.1 Keyboard, 2.4.3 Focus Order, 1.2.x captions). I've labeled every inferred row; treat ungrounded rows as a reasonable starting hypothesis for the skill to refine, not a settled classification.
6. **Section 4 (privacy/consent scanners) was cut entirely**, per the brief's own explicit prioritization ("cut section 4 then 3's tail — never cut section 1"). No OSS cookie/consent/tracker scanner research was performed in this pass. Nuclei's template-license split, Dependency-Track, and OWASP dependency-check were likewise not researched in depth (Nuclei got a license check only) — these are the "3's tail" that was cut to protect time spent on Section A.
7. **Gatling and Artillery exact "latest release" version tags** were not individually pinned with dates the way Lighthouse/k6/Trivy were — both are high-velocity monorepos where a single canonical "latest version" tag was less immediately discoverable via `gh api .../releases` in the time available; `pushed_at` timestamps are given as a maintenance-signal proxy instead.
