# Canon W4 — Non-Functional Verification Standards

Worker: W4. Cluster: accessibility, performance, load/capacity, security, AI, privacy verification.
Verification date for all "current as of" claims below: **2026-07-26**, unless a fetch/search result carries its own dateline (noted inline).

---

## 0. Sources reached / not reached + WebSearch budget used

**WebSearch calls used: 12** (of the ~15 cap). Remaining budget deliberately left unspent once cluster coverage was adequate.

### Reached (WebFetch, primary sources)
- `https://www.w3.org/TR/WCAG22/` — WCAG 2.2 Recommendation text (conformance requirements, parsing removal)
- `https://www.w3.org/WAI/standards-guidelines/act/rules/` — ACT rules landing page (governance, but not count)
- `https://act-rules.github.io/rules/` — ACT rules list (count)
- `https://webaim.org/projects/million/` — WebAIM Million 2026 report
- `https://www.itic.org/policy/accessibility/vpat` — VPAT/ACR structure
- `https://web.dev/articles/vitals` — Core Web Vitals current thresholds
- `https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/` — new SC list for WCAG 2.2, 4.1.1 Parsing status
- `https://owasp.org/www-project-application-security-verification-standard/` — ASVS landing page (version)
- `https://raw.githubusercontent.com/OWASP/ASVS/v5.0.0/5.0/en/0x03-What-is-the-ASVS.md` — ASVS 5.0 level definitions (verbatim quotes)
- `https://github.com/OWASP/ASVS/tree/v5.0.0/5.0/en` — ASVS 5.0 chapter/file structure (V1–V17)
- `https://owasp.org/www-project-web-security-testing-guide/` — WSTG version (4.2)
- `https://owasp.org/www-project-web-security-testing-guide/stable/` — WSTG category list
- `https://owasp.org/www-project-top-ten/` — OWASP Top 10 pointer to 2025 edition
- `https://owasp.org/Top10/2025/` — OWASP Top 10:2025 list
- `https://genai.owasp.org/llm-top-10/` — OWASP LLM Top 10:2025 list
- `https://www.nist.gov/itl/ai-risk-management-framework` — NIST AI RMF landing, Generative AI Profile date
- `https://airc.nist.gov/airmf-resources/airmf/3-sec-characteristics/` — seven trustworthy-AI characteristics (verbatim-ish, paraphrase-quoted, see caveat in §5)
- `https://groups.google.com/g/mechanical-sympathy/c/icNZJejUHfE/m/BfDekfBEs_sJ` — Gil Tene coordinated-omission thread
- `https://www.scylladb.com/2021/04/22/on-coordinated-omission/` — coordinated-omission secondary source with Tene quote + worked example
- `https://www.ufried.com/blog/tail_at_scale/` — quoted excerpt of Dean & Barroso "The Tail at Scale"
- `https://developers.google.com/tag-platform/security/guides/consent` — Google Consent Mode v2 parameters

### Not reached / failed (named explicitly, per instructions)
- `https://cacm.acm.org/research/the-tail-at-scale/` — 403 Forbidden (could not get primary CACM text directly; used secondary blog quote instead)
- `https://www.barroso.org/publications/TheTailAtScale.pdf` — fetched but returned undecodable binary/PDF stream, no usable text extracted
- `https://www.andrew.cmu.edu/course/14-740-s18/applications/ln/14740-l26.pdf` — same PDF-decoding failure
- `https://www.usenix.org/legacy/event/nsdi06/tech/full_papers/schroeder/schroeder.pdf` — 403 Forbidden
- `https://www.usenix.org/conference/nsdi-06/open-versus-closed-cautionary-tale` — 403 Forbidden
- `https://kilthub.cmu.edu/articles/journal_contribution/Open_Versus_Closed_A_Cautionary_Tale/6608078/1` — 403 Forbidden
- `https://www.researchgate.net/publication/220832019_Open_Versus_Closed_A_Cautionary_Tale` — 403 Forbidden
- `https://www.semanticscholar.org/paper/...Open-Versus-Closed...` — returned empty content
- `glossary.istqb.org` (load-testing, stress-testing terms) — 403 Forbidden on both; used WebSearch-surfaced quotations instead (see §3, flagged as secondary)
- `https://raw.githubusercontent.com/OWASP/ASVS/master/5.0/en/0x03-Using-ASVS.md` — 404 (wrong path/branch; corrected path found and fetched successfully, see Reached list)
- `https://owasp.org/www-project-devsecops-guideline/latest/02b-Static-Application-Security-Testing` — 404
- **Net effect:** the "Open Versus Closed: A Cautionary Tale" (NSDI 2006) abstract/conclusion could NOT be independently verified in verbatim form — every direct source 403'd or returned empty. Only a WebSearch-engine paraphrase was obtainable. This is flagged in §3 and §9 — do not treat the "conclusion quote" for that paper as verified verbatim.
- The Dean & Barroso "Tail at Scale" quote in §3 is verbatim but sourced through a secondary blog (`ufried.com`) that itself quotes the paper — the primary CACM/ACM DL page and the PDF mirrors were all unreachable in this session.
- EN 301 549 V4.1.0/V4.1.1 (2026, WCAG 2.2-aligned update) and ISO/IEC 42001, ISO/IEC 23894, EU AI Act conformity-assessment status were verified via WebSearch (secondary/tertiary sources: standards.iteh.ai, reedsmith.com, dwt.com, cloudsecurityalliance.org, eccouncil.org) rather than the primary ETSI/ISO/EUR-Lex documents directly, because those primary documents are paywalled or not indexable by WebFetch. Treat version/date claims for EN 301 549 V4.x and the prEN 18286 timeline as **best-available-secondary**, not primary-verified.

---

## 1. Accessibility

### 1.1 WCAG 2.2 — status and conformance model

**Status verified 2026-07-26:** WCAG 2.2 is a **"W3C Recommendation 12 December 2024"** — current and normative. (Source: https://www.w3.org/TR/WCAG22/)

**The five Conformance Requirements** (WCAG 2.2, §5 Conformance, as fetched from the TR):

1. **Conformance Level** — "Three levels of conformance are defined: A (lowest), AA, and AAA (highest)." For a page to conform, it must satisfy all Success Criteria at the chosen level (and below).
2. **Full Pages** — "Conformance is defined for full pages" — a page cannot claim conformance by only fixing part of the page; the whole page (including content generated by the server or client) must meet the criteria, unless the exception for auxiliary content applies.
3. **Complete Processes** — "When a process involves multiple web pages, all pages in the process conform at the specified level" — you cannot claim conformance for a checkout flow if only some steps of the flow conform; a "process" is a series of steps needed to complete an activity.
4. **Accessibility Support** ("Accessibility Supported Ways of Using Technologies") — "Web pages shall not use technologies in ways that are not accessibility supported," where "accessibility supported" is defined as **"supported by users' assistive technologies as well as the accessibility features in browsers and other user agents."** This is the mechanism that ties conformance to real assistive-tech compatibility, not just markup validity.
5. **Non-Interference** — content and technologies that are not accessibility-supported may still be used **as long as they do not interfere** with accessibility of the rest of the page — "all content on the web page... must meet this success criterion" (i.e., non-conforming/non-supported technology must not block access to the rest, must not disable AT, and content must remain operable if such technology is turned off/unsupported).

There is also a stated allowance for **Conforming Alternate Versions** — a page can point to an alternate version that does conform, under specific conditions (this is the standard WCAG mechanism, present in 2.0/2.1/2.2 alike) — noted here because it is one of the "evidence, not scan" levers: a site can conform via an accessible alternate path, not only by fixing the primary page.

> **Framing answer — evidence of conformance vs. a passing scan (WCAG):** A passing automated scan only checks for the presence/absence of a bounded set of machine-detectable failure patterns on a single page state. Actual WCAG **conformance** requires: (a) full-page coverage including all states/interactions, not spot checks; (b) every step of a complete process, not just the landing page; (c) demonstrated assistive-technology compatibility ("accessibility supported"), which a DOM/contrast scanner cannot assess by itself; (d) a non-interference check across all embedded/third-party content; and (e) an explicit conformance-level claim (A/AA/AAA) tied to which Success Criteria were actually verified — most of which (per §1.2 below) require human judgment. A scan is at best partial evidence toward requirement 4, and says nothing about requirements 2, 3, or 5.

### 1.2 WCAG 2.2 vs 2.1 — what changed

**New Success Criteria added in WCAG 2.2** (verified via https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/ — 9 new SC):

1. **2.4.11 Focus Not Obscured (Minimum)** — AA
2. **2.4.12 Focus Not Obscured (Enhanced)** — AAA
3. **2.4.13 Focus Appearance** — AAA
4. **2.5.7 Dragging Movements** — AA
5. **2.5.8 Target Size (Minimum)** — AA
6. **3.2.6 Consistent Help** — A
7. **3.3.7 Redundant Entry** — A
8. **3.3.8 Accessible Authentication (Minimum)** — AA
9. **3.3.9 Accessible Authentication (Enhanced)** — AAA

**4.1.1 Parsing:** confirmed **removed/obsolete** in WCAG 2.2. Verbatim from the W3C "What's New in WCAG 2.2" page: **"4.1.1 Parsing is obsolete and removed from WCAG 2.2."** The page points to the WCAG 2 FAQ for rationale (not itself fetched in this session — the FAQ page content was not retrieved, so the *reason* is not independently verified here, only the fact of removal).

Note: an earlier WebFetch of the WCAG 2.2 quickref (before I found the dedicated "new-in-22" page) mis-surfaced WCAG 2.1-era SC as if their vintage were ambiguous, and one intermediate fetch returned 4.1.1 as still "present and active" from a *different, cached/partial* quickref render — that result is **superseded** by the authoritative "new-in-22" page and the WCAG 2.2 TR text itself, both of which agree 4.1.1 is removed. Trust the removal.

### 1.3 ACT Rules (Accessibility Conformance Testing)

- **ACT Rules Format** and governance: "ACT Rules are developed by the ACT Rules Community Group and the Accessibility Conformance Testing (ACT) Task Force of the Accessibility Guidelines Working Group (AG WG)." "ACT Rules are formally approved by the relevant Working Group. Proposed rules have been agreed by the ACT Task Force participants but have not yet been approved." (Source: https://www.w3.org/WAI/standards-guidelines/act/rules/)
- **Rule count, verified 2026-07-26:** the ACT rules listing at https://act-rules.github.io/rules/ shows **145 ACT rules listed**. [Note: this count was read by an AI-summarized fetch of a dynamically-rendered listing page, not a manual count of a static table — treat as **[UNVERIFIED — approximate]**. It is directionally correct (ACT rules are commonly cited in the 90–170 range depending on snapshot) but the exact figure should be re-confirmed by loading the page and counting rows if precision matters.]
- **Automated vs. human-judgment SC:** I could **not** locate a citable, quantified W3C/Deque/WebAIM statement of "what % of WCAG issues automation can detect" in this session's fetches. The ACT rules page itself offers filter categories ("Manual," "Semi-Automatic," "Automated," "Linter") implying a taxonomy exists, but no aggregate percentage was surfaced. **Do not report a "30%" or any other automation-coverage figure — it is [UNVERIFIED] in this research pass.** (This directly matches the task's warning: a remembered "only 30%" figure must not be asserted without a source, and none was found here.)

> **Framing answer (ACT):** ACT gives a shared, peer-reviewed *test methodology* per rule (so two different tools/testers reach the same pass/fail for that atomic check) — but a rule passing is evidence only for the specific SC-technique pairing it covers, and the ACT ecosystem itself acknowledges a Manual/Semi-Automatic/Automated split, meaning conformance requires combining automated ACT-rule results with manual ACT-rule execution, not running automation alone.

### 1.4 WebAIM Million

**Edition verified:** WebAIM Million **2026** report, published **March 30, 2026** (per https://webaim.org/projects/million/, as retrieved this session — this is the most recent edition reachable).

Verbatim/near-verbatim headline findings as extracted:
- **"95.9% of home pages had detected WCAG 2 failures"**
- **"56.1 errors per page"** average, across the analyzed home pages
- Top failure types with percentages:
  1. Low contrast text — **83.9%**
  2. Missing alternative text for images — **53.1%**
  3. Missing form input labels — **51%**
  4. Empty links — **46.3%**
  5. Empty buttons — **30.6%**
  6. Missing document language — **13.5%**
- These six issue types "account for **96%** of all errors detected."

[Caveat: these figures were extracted via an AI-summarizing WebFetch of the live webaim.org page rather than a direct render/table read by me — the report's own PDF/full report was not independently opened to cross-check every digit. Treat the specific decimal points (e.g., "83.9%" vs "83.6%") as **fetch-summarized, high-confidence but not hand-verified**; the year (2026) and overall shape of findings are solid.]

### 1.5 VPAT / ACR

Source: https://www.itic.org/policy/accessibility/vpat

- **VPAT = "Voluntary Product Accessibility Template."**
- **Four editions:**
  1. **VPAT 2.5 508** — "Revised Section 508 standards – the U.S. Federal accessibility standard"
  2. **VPAT 2.5 EU** — "EN 301 549 – the European Union's 'Accessibility requirements suitable for public procurement of ICT products and services in Europe'"
  3. **VPAT 2.5 WCAG** — covers "WCAG 2.0 or ISO/IEC 40500 (equivalent to WCAG 2.0), WCAG 2.1, and WCAG 2.2"
  4. **VPAT 2.5 INT** — "Incorporates all three of the above standards"
- **VPAT vs. ACR:** "A version of the VPAT which has been completed for a specific product is an ACR" — i.e., VPAT is the blank template; **ACR (Accessibility Conformance Report)** is the filled-in, product-specific document. This is itself the "evidence vs. scan" distinction institutionalized: the template is not evidence, the completed, criterion-by-criterion ACR is.
- **Conformance-level vocabulary, as fetched:** the source states manufacturers declare conformance using **"supports; partially supports; does not support; or not applicable."** [The task brief expects a fifth term, "Not Evaluated" — this session's fetch of itic.org did **not** surface that fifth term explicitly. The 508 VPAT template historically includes "Not Evaluated" as a category for less-common ICT criteria not assessed. **Mark "Not Evaluated" as [UNVERIFIED in this pass]** — it is very likely correct from general VPAT knowledge but was not confirmed verbatim on the fetched page, so it should be re-checked against the actual VPAT 2.5 template document before being asserted as quoted text.]

> **Framing answer (VPAT/ACR):** A VPAT alone is not evidence of anything — it's a blank form. The ACR is evidence only to the extent each row was actually assessed (vs. marked "Not Evaluated") and only as self-reported by the vendor — VPATs are not independently audited by default, so an ACR is evidence of a *vendor's claim*, not a third-party verification, unless accompanied by an independent audit statement.

### 1.6 EN 301 549

- **Current stable version referenced by VPAT EU edition and most 2025-era compliance guidance: V3.2.1 (published March 2021)**, which incorporates **WCAG 2.1 Level AA**. [Verified via WebSearch secondary sources, not the primary ETSI document — see §0.]
- **Upcoma­nt version:** secondary sources (standards.iteh.ai listing "kSIST FprEN 301 549 V4.1.0:2026") indicate a **V4.1.0/V4.1.1, expected in 2026**, intended to incorporate **WCAG 2.2** and align with European Accessibility Act obligations. **[UNVERIFIED — secondary-sourced only; primary ETSI publication not fetched.]**
- **Relationship to WCAG:** EN 301 549 is broader than WCAG — it covers not just web content but ICT products/services generally: "websites, mobile applications, non-web software, operating systems, electronic documents, mobile devices, and telecommunications services" — with its web-content chapter incorporating WCAG success criteria by reference at a given level.
- **Standards body:** jointly produced by **CEN, CENELEC, and ETSI**.

### 1.7 European Accessibility Act (EAA)

Per WebSearch (secondary legal-commentary sources — reedsmith.com, dwt.com, twobirds.com, pivotalaccessibility.com):
- **Enforcement began 28 June 2025** — "in-scope products and services released thereafter must comply with local requirements."
- **Full compliance deadline: 28 June 2030** — "all in-scope products and services must be compliant, regardless of when they were released."
- **Scope:** applies to manufacturers, service providers, importers, and distributors offering certain digital products/services in the EU market (any home country); named in-scope sectors include **e-commerce, telecoms, banking and payment services, passenger transport, and media**; named in-scope products include **smartphones, computers, e-readers, self-service terminals (ATMs, ticketing, check-in machines)**.
- **[UNVERIFIED — secondary legal-commentary sourced, not the EAA Directive text or an EU official gazette page directly fetched.]**

---

## 2. Performance

### 2.1 Core Web Vitals — current metric set and thresholds (verified 2026-07-26 at web.dev/articles/vitals)

Current stable Core Web Vitals: **LCP, INP, CLS.**

- **LCP (Largest Contentful Paint):** good threshold — **"should occur within 2.5 seconds of when the page first starts loading."**
- **INP (Interaction to Next Paint):** good threshold — **"pages should have an INP of 200 milliseconds or less."**
- **CLS (Cumulative Layout Shift):** good threshold — **"pages should maintain a CLS of 0.1 or less."**

[Note: the fetch returned only the "good" boundary numbers explicitly quoted; the "needs improvement" and "poor" upper bounds (commonly 2.5–4.0s / >4.0s for LCP; 200–500ms / >500ms for INP; 0.1–0.25 / >0.25 for CLS in prior web.dev revisions) were **not** re-quoted verbatim from this fetch. **[UNVERIFIED — do not assert the "needs improvement"/"poor" numeric boundaries as re-confirmed this session; only the "good" thresholds above are freshly verified.]**]

- **INP replaced FID:** confirmed. Verbatim: **"INP was promoted in 2023 from experimental to pending status with the intent to eventually retire FID"**, and **"INP became a stable Core Web Vital metric in 2024."** No further metric-set change (e.g., a fourth vital) was surfaced as announced beyond this — treat the LCP/INP/CLS triad as still current as of 2026-07-26 per this fetch.
- **Measurement convention, verbatim:** **"a good threshold to measure is the 75th percentile of page loads, segmented across mobile and desktop devices."** (28-day rolling window is the standard CrUX convention referenced across Google's documentation generally, but the specific "28 days" phrase was not independently re-quoted from this exact fetch — treat the 75th-percentile framing as verified, the "28 days" duration as consistent with well-known CrUX methodology but not freshly re-quoted here.)

### 2.2 Field vs. lab methodology

- **Field data authority, verbatim:** **"While lab measurement is an essential part of delivering great experiences, it is not a substitute for field measurement... Only field measurement can accurately capture the complete picture."**
- **CrUX vs. Lighthouse:** CrUX (Chrome User Experience Report) is the field-data source; Lighthouse is the lab tool. The framing above establishes that lab tools (Lighthouse) are diagnostic/predictive, while only real-user field data (CrUX-backed) is authoritative for actual user-experience assessment — this is also the basis for Google's statement (well-established, consistent with this fetch) that **field data, not lab scores, is what is used for real-world/ranking-relevant assessment.**
- **Lighthouse score: measurement or estimate?** Lighthouse performance scores are **estimates/simulations** of a single run under controlled/simulated network and CPU conditions, not measurements of real-user experience — this is consistent with Google's own "lab data ... is not a substitute for field measurement" framing quoted above, though the exact Lighthouse-variance caveat sentence was not independently re-quoted verbatim in this session's fetch. **[Partially verified — the field-vs-lab primacy statement is verbatim-quoted; the specific "Lighthouse scores can vary run-to-run due to network/machine variability" caveat sentence is not freshly re-quoted here and should be treated as consistent-with-known-Google-guidance rather than session-verified verbatim.]**

> **Framing answer (Performance):** A "green Lighthouse score" is a single-run lab estimate under synthetic conditions — it is not evidence of real-world performance. Evidence of conformance to Core Web Vitals means: real Chrome-user field data (CrUX or equivalent RUM), aggregated at the **75th percentile**, across **both mobile and desktop**, over a **rolling real-usage window**, showing LCP ≤2.5s / INP ≤200ms / CLS ≤0.1 for that percentile. A passing Lighthouse run is a useful diagnostic/regression check but explicitly not a substitute per Google's own documentation.

---

## 3. Load & capacity testing methodology

### 3.1 Open vs. closed workload models

Primary source: Schroeder, Wierman, Harchol-Balter, **"Open Versus Closed: A Cautionary Tale,"** NSDI 2006 (USENIX).

**Verification status: could not obtain a verbatim abstract/conclusion in this session** — every direct source attempted (USENIX legacy PDF, USENIX conference page, kilthub.cmu.edu, ResearchGate, Semantic Scholar) returned 403 Forbidden or empty content (see §0). What follows is well-established domain knowledge about the paper's argument, **not a session-verified verbatim quote**, and should be flagged as such:

- **Open workload model:** new requests arrive from an external population independent of how quickly the system under test is completing prior requests (arrival process is exogenous — e.g., a fixed arrival rate). This models many real internet-facing systems where users/clients don't wait for each other.
- **Closed workload model:** a fixed number of simulated clients/users, each of which waits for its previous request to complete before issuing the next (think-time-gated). Arrival rate is endogenous — it depends on system response time.
- **Why it matters (paraphrase of the paper's well-known finding, [UNVERIFIED verbatim] this session):** the paper shows that the choice of workload model can produce qualitatively different, even contradictory, conclusions about system behavior (e.g., about the impact of a scheduling policy) — a closed-model test can show a system "stabilizing" under overload in a way an open-model test of the same system would not, because in the closed model demand throttles itself as latency rises, masking true overload behavior that would manifest with an open, uncoordinated arrival process. **This is presented here as standard secondary characterization of the paper's thesis, not a verified quote — flagged in §9.**

### 3.2 Coordinated omission (Gil Tene)

Sources: Gil Tene's mechanical-sympathy mailing-list thread (fetched) and ScyllaDB's secondary explainer (fetched, itself quoting Tene).

- **Verbatim, from the mailing-list thread as extracted:** **"Omission on its own is not a big problem, as long as the omission is random... However, when omission is coordinated with observed events, it can dramatically skew the statistical analysis of the remaining results."** And: in load-testing scenarios this occurs when **"we are only omitting the 'very bad results'"** — i.e., the longest-latency samples are systematically the ones missing from the dataset.
- **Verbatim, via ScyllaDB's citation of Tene's coined term:** coordinated omission is where **"the measuring system inadvertently coordinates with the system being measured in a way that avoids measuring outliers... and misses sending requests."**
- **Mechanism:** a closed-style load generator/benchmark that waits for a response before issuing (or scheduling) the next request will, during a stall/pause in the system under test, simply send fewer requests during the bad period rather than recording many samples of high latency — so the one giant pause becomes a single outlier sample rather than being correctly attributed to every request that *should* have been in flight during that window (per fixed inter-arrival intent). This systematically deflates all percentile statistics.
- **Illustrative real-world magnitude (from ScyllaDB's worked example, session-verified via fetch):** an uncorrected benchmark showed P99 = **249 microseconds**; the same test, after coordinated-omission correction with an open-model throughput target, showed the true P99 was **665 milliseconds** — "over 2,600 times higher."
- **Talk reference:** "How NOT to Measure Latency" (Gil Tene, Strange Loop) — the coordinated-omission segment is commonly cited as starting around the 33:50 mark (per secondary source, not independently timestamp-verified here).

> **Framing answer (Load — coordinated omission):** A load-test report showing "great" p99 numbers is not evidence of real tail latency unless the harness corrects for coordinated omission (e.g., HdrHistogram-based correction, or a truly open-model generator that keeps issuing requests on schedule regardless of response completion). Evidence of conformance to a latency SLO requires disclosing the load-generation model (open vs. closed) and whether coordinated-omission correction was applied — a "passing p99" from a closed-model, uncorrected tool can misrepresent true tail latency by orders of magnitude, per the ScyllaDB worked example above.

### 3.3 Percentiles and tail-at-scale

Primary source: Dean & Barroso, **"The Tail at Scale,"** Communications of the ACM, 2013.

- **Verbatim quote (obtained via secondary source ufried.com, which itself quotes the paper directly — primary CACM/PDF sources 403'd or failed to decode, see §0):**
  **"It is challenging for service providers to keep the tail of latency distribution short for interactive services as the size and complexity of the system scales up or as overall use increases. Temporary high-latency episodes (unimportant in moderate-size systems) may come to dominate overall service performance at large scale."**
- Also quoted (attributed to the paper via the same secondary source): **"Systems that respond to user actions quickly (within 100ms) feel more fluid and natural to users than those that take longer."**
- **Why averages/single-node percentiles don't compose:** the well-established mechanism (consistent with, but not independently re-quoted verbatim from, the primary paper in this session) is that when a single user-facing request fans out to many backend servers, the overall request latency is bounded by the *slowest* of those parallel sub-requests — so if each individual server has only a small probability of a slow response (e.g., 1% chance of being slow), a request touching 100 servers has a much higher probability that *at least one* of them is slow, meaning rare per-server tail events become common per-request events. This is why p99-of-p99 does not compose linearly and why tail latency, not average, dominates perceived performance at scale. **[The general mechanism is standard/well-known; the verbatim text above is session-verified via secondary quote, but the "fan-out multiplies tail probability" explanatory sentence itself was not found as a literal quote in this session's fetches — treat the mechanism explanation as accurate paraphrase, not verbatim.]**

### 3.4 Load test type vocabulary

No single fully-authoritative canonical body (ISO, IEEE) definition set was reachable this session (ISTQB's own glossary site returned 403 Forbidden on direct fetch — see §0). The following are **ISTQB Glossary definitions as surfaced via WebSearch** (secondary retrieval of ISTQB-sourced text, not a direct fetch of glossary.istqb.org):

- **Load testing:** "A type of performance testing conducted to evaluate the behavior of a component or system with increasing load, e.g., numbers of parallel users and/or numbers of transactions, to determine what load can be handled by the component or system."
- **Stress testing:** "A type of performance testing conducted to evaluate a system or component at or beyond the limits of its anticipated or specified workloads, or with reduced availability of resources such as access to memory or servers."
- **Soak testing:** "Soak testing is a type of system testing with a typical production load, over a continuous availability period, to validate system behavior under production use."
- **Spike testing:** "A spike test verifies whether the system survives and performs under sudden and massive rushes of utilization."
- **Capacity testing:** "Testing to evaluate the capacity of a system." [This last definition is circular/thin as surfaced — flagged as weak.]

**[UNVERIFIED — these are WebSearch-surfaced paraphrases of ISTQB glossary entries, not a direct fetch of the authoritative glossary.istqb.org pages, which 403'd. Treat as high-confidence but re-verify against glossary.istqb.org directly if exact wording matters for the skill.]**

> **Framing answer (Load & capacity):** Evidence of "load tested" is not a single green run at target RPS. It requires: (a) disclosing the workload model (open/closed) and whether it matches production arrival behavior; (b) coordinated-omission-corrected latency percentiles, not raw client-side deltas; (c) results across the specific test *type* relevant to the risk (soak for memory/resource leaks over time, spike for sudden burst survival, stress for behavior beyond capacity, not just "load" at expected volume); (d) tail percentiles (p99, p99.9) reported alongside — not instead of — averages/medians, because per Dean & Barroso the tail is what dominates user-perceived performance at scale.

---

## 4. Security verification

### 4.1 OWASP WSTG (Web Security Testing Guide)

- **Current stable version, verified 2026-07-26 at owasp.org: Version 4.2, released December 3, 2020.** The project page indicates a v5.0 is in development but not yet the stable release.
- **Top-level test category list with IDs** (verified via the stable WSTG table of contents):
  1. **WSTG-INFO** — Information Gathering
  2. **WSTG-CONF** — Configuration and Deployment Management Testing
  3. **WSTG-IDNT** — Identity Management Testing
  4. **WSTG-ATHN** — Authentication Testing
  5. **WSTG-ATHZ** — Authorization Testing
  6. **WSTG-SESS** — Session Management Testing
  7. **WSTG-INPV** — Input Validation Testing
  8. **WSTG-ERRH** — Testing for Error Handling
  9. **WSTG-CRYP** — Testing for Weak Cryptography
  10. **WSTG-BUSL** — Business Logic Testing
  11. **WSTG-CLNT** — Client-side Testing
  12. **WSTG-APIT** — API Testing
- **ID format, verbatim:** **"Each scenario has an identifier in the format `WSTG-<category>-<number>`, where: 'category' is a 4 character upper case string that identifies the type of test or weakness, and 'number' is a zero-padded numeric value from 01 to 99."**
- **Scan vs. verification statement:** I was **not able to locate a specific verbatim OWASP statement** in this session distinguishing "a passing SAST/DAST scan" from "a WSTG-complete manual verification" (the DevSecOps guideline URL attempted 404'd). The WSTG's own structure — 12 categories each containing dozens of individually-numbered manual test *procedures*, several requiring business-logic/human judgment (e.g., all of WSTG-BUSL, and large parts of WSTG-ATHZ/WSTG-SESS) — is itself the implicit argument that a scan is a small subset of the guide, but **no explicit OWASP quote asserting this ratio was found.** Flagged as **[UNVERIFIED — no direct quote found]**.

### 4.2 OWASP ASVS (Application Security Verification Standard)

- **Current version, verified: ASVS 5.0.0**, released/announced **May 30, 2025** at Global AppSec EU Barcelona 2025. (Source: https://owasp.org/www-project-application-security-verification-standard/) This supersedes ASVS 4.0.3 — **do not report 4.0.3 as current.**
- **Verification Levels, verbatim (from ASVS 5.0.0, `0x03-What-is-the-ASVS.md`, fetched via GitHub raw at tag v5.0.0):**
  - **Level 1:** **"This level contains the minimum requirements to consider when securing an application and represents a critical starting point."**
  - **Level 2:** **"Most applications should be striving to achieve this level of security. Around 50% of the requirements in the ASVS are L2."**
  - **Level 3:** **"This level should be the goal for applications looking to demonstrate the highest levels of security and provides the final ~30% of requirements to comply with."**
  - [Interpretive note carried over from ASVS 4.x, consistent with 5.0's framing per the same fetch: L1 addresses common/first-layer attacks and is described elsewhere in ASVS documentation as the only level that is "completely penetration testable" by an external tester without source/design access, while L2 and L3 require access to documentation, architecture, source code, and the people involved — i.e., **cannot be achieved by black-box scanning alone.** This distinction is the clearest existing "scan vs. verification" statement found in this cluster.]
- **Chapter structure (ASVS 5.0.0, V1–V17), verified from GitHub file listing at tag v5.0.0:**
  V1 Encoding and Sanitization; V2 Validation and Business Logic; V3 Web Frontend Security; V4 API and Web Service; V5 File Handling; V6 Authentication; V7 Session Management; V8 Authorization; V9 Self-contained Tokens; V10 OAuth and OIDC; V11 Cryptography; V12 Secure Communication; V13 Configuration; V14 Data Protection; V15 Secure Coding and Architecture; V16 Security Logging and Error Handling; V17 WebRTC. [This is a **restructure vs. ASVS 4.x's V1–V14 chapter set** — do not reuse the old 4.x chapter list (which had different numbering/names, e.g., old V2 "Authentication," old V4 "Access Control") as if it were current.]

> **Framing answer (ASVS):** ASVS is explicitly the canonical model for "how much verification is warranted" — its three-level structure *is* the answer: L1 is scan-achievable (external, black-box, no special access), L2/3 require documentation, source, architecture, and personnel access, i.e., genuine verification effort, not tooling alone. A vendor claiming "ASVS compliant" without specifying a level, or claiming L2/L3 based only on a DAST scan, is not making a verifiable claim under ASVS's own model.

### 4.3 OWASP Top 10

- **Current edition, verified 2026-07-26: OWASP Top 10 2025** — the project's main landing page explicitly states "The most current released version is the OWASP Top Ten 2025." **Supersedes Top 10:2021 — do not report 2021 as current.**
- **Full list (verified via https://owasp.org/Top10/2025/):**
  1. A01:2025 – Broken Access Control
  2. A02:2025 – Security Misconfiguration
  3. A03:2025 – Software Supply Chain Failures
  4. A04:2025 – Cryptographic Failures
  5. A05:2025 – Injection
  6. A06:2025 – Insecure Design
  7. A07:2025 – Authentication Failures
  8. A08:2025 – Software or Data Integrity Failures
  9. A09:2025 – Security Logging and Alerting Failures
  10. A10:2025 – Mishandling of Exceptional Conditions
- **[Note: precise publication date within 2025 was not surfaced by the fetch — only "2025" as the edition year is confirmed, not a specific month/day.]**

### 4.4 OWASP Top 10 for LLM Applications

- **Current version, verified via https://genai.owasp.org/llm-top-10/: 2025 edition** (superseding the 2023/2024 version — do not report the older LLM01–LLM10:2023/24 list, e.g. "Insecure Output Handling"/"Model Denial of Service" naming, as current).
- **Full list, verbatim IDs and names:**
  1. LLM01:2025 – Prompt Injection
  2. LLM02:2025 – Sensitive Information Disclosure
  3. LLM03:2025 – Supply Chain
  4. LLM04:2025 – Data and Model Poisoning
  5. LLM05:2025 – Improper Output Handling
  6. LLM06:2025 – Excessive Agency
  7. LLM07:2025 – System Prompt Leakage
  8. LLM08:2025 – Vector and Embedding Weaknesses
  9. LLM09:2025 – Misinformation
  10. LLM10:2025 – Unbounded Consumption

> **Framing answer (Top 10 / LLM Top 10):** The Top 10 lists (web and LLM) are *awareness* documents, explicitly not verification checklists — OWASP itself pairs them with ASVS (web) for actual verifiable requirements. "We checked for the OWASP Top 10" is not a verification claim; "we verified against ASVS Level N, chapters mapped to A01–A10:2025" is. The same logic should be applied to LLM Top 10 — treat it as a risk taxonomy to scope a verification effort (e.g., red-teaming for LLM01 Prompt Injection, output-handling review for LLM05), not as a pass/fail scan target.

---

## 5. AI / model verification

### 5.1 NIST AI RMF (AI 100-1)

- **Four core functions**, confirmed present as GOVERN, MAP, MEASURE, MANAGE (verified via nist.gov landing page, which frames the Core as "operationalized through four functions: Govern, Map, Measure, and Manage"). **[Caveat: the exact one-line NIST definitions for each of the four functions individually — e.g., NIST's own single-sentence description of what GOVERN vs. MAP vs. MEASURE vs. MANAGE each mean — were NOT successfully extracted verbatim in this session; direct fetches of AIRC sub-pages either 404'd or didn't return the specific text. Treat the four function NAMES as verified; their individual one-line definitions are [UNVERIFIED verbatim] here and should be pulled directly from the NIST AI 100-1 PDF (not fetchable as clean text via WebFetch in this session — it returns undecoded binary) before quoting them as exact NIST language.]**
- **Seven characteristics of trustworthy AI**, extracted from https://airc.nist.gov/airmf-resources/airmf/3-sec-characteristics/ (fetched; quotes are close paraphrase/partial-verbatim per the fetch tool's summarization, not a raw HTML diff — flagged accordingly):
  1. **Valid and Reliable** — "confirmation, through the provision of objective evidence, that the requirements for a specific intended use or application have been fulfilled" and the "ability of an item to perform as required, without failure, for a given time interval, under given conditions."
  2. **Safe** — AI systems should "not, under defined conditions, lead to a state in which human life, health, property, or the environment is endangered."
  3. **Secure and Resilient** — systems that "maintain confidentiality, integrity, and availability through protection mechanisms" and can "withstand unexpected adverse events or unexpected changes."
  4. **Accountable and Transparent** — "Transparency reflects the extent to which information about an AI system and its outputs is available to individuals interacting with such a system."
  5. **Explainable and Interpretable** — "Explainability refers to a representation of the mechanisms underlying AI systems' operation, whereas interpretability refers to the meaning of AI systems' output."
  6. **Privacy-Enhanced** — privacy "safeguard[s] human autonomy, identity, and dignity" through norms addressing "freedom from intrusion, limiting observation, or individuals' agency to consent."
  7. **Fair – with Harmful Bias Managed** — "Fairness in AI includes concerns for equality and equity by addressing issues such as harmful bias and discrimination."
  **[These seven are consistent with well-known NIST AI RMF 1.0 content, and the extraction came from NIST's own AIRC resource site, but should be treated as [near-verbatim, fetch-tool-summarized] rather than a hand-checked character-for-character quote from the AI 100-1 PDF itself.]**
- **Generative AI Profile:** confirmed. Verbatim from nist.gov: **"On July 26, 2024, NIST released NIST-AI-600-1, Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile."** Purpose stated as helping "organizations identify unique risks posed by generative AI and proposes actions for generative AI risk management that best aligns with their goals and priorities."

> **Framing answer (NIST AI RMF):** The AI RMF is explicitly a *risk-management process framework*, not a pass/fail certification — there is no "AI RMF conformance scan." Evidence of engagement means demonstrable artifacts per function: GOVERN (documented policies/accountability structures), MAP (documented context/risk identification for the specific AI use case), MEASURE (actual metrics/testing — e.g., red-teaming, bias testing, robustness testing — tied to the seven trustworthiness characteristics above), and MANAGE (documented risk-response and monitoring plans). A vendor citing "NIST AI RMF aligned" without artifacts against all four functions is asserting awareness, not verification.

### 5.2 ISO/IEC 42001, ISO/IEC 23894, EU AI Act (verified via WebSearch, secondary sources only — see §0)

- **ISO/IEC 42001** — AI management system standard (analogous to ISO 27001 for security); secondary sources describe it as certifiable and mapping to seven EU AI Act articles (risk management Art. 9, data governance Art. 10, technical documentation Art. 11, record-keeping Art. 12, transparency Art. 13, human oversight Art. 14, quality management Art. 17). Explicitly **not a substitute** for EU AI Act conformity assessment per se — one secondary source's own framing: "ISO 42001 certification demonstrates the management system is in place, but it is not a substitute for the EU AI Act's specific conformity assessment procedures." **[UNVERIFIED — secondary/tertiary compliance-vendor sources, not ISO or EU primary text.]**
- **ISO/IEC 23894** — described as AI risk-management *process* guidance (identification, analysis, evaluation, treatment), positioned as a technical companion to ISO 42001. **[UNVERIFIED — secondary source only.]**
- **EU AI Act conformity-assessment timeline** — secondary sources indicate **2 August 2026** as the date "full obligations for high-risk AI systems, including conformity assessments and registration in the EU database" take effect. A harmonized standard, **prEN 18286**, is in development specifically for EU AI Act conformity assessment of high-risk systems; its "enquiry phase closed in January 2026," with formal vote and Official Journal citation still pending as of the sources checked. **[UNVERIFIED — secondary legal/compliance-vendor sources; the EU AI Act text itself and EUR-Lex were not fetched directly this session.]**

---

## 6. Privacy verification

*(Framed explicitly as engineering verification practice, not legal advice — see note at end of section.)*

- **Global Privacy Control (GPC) — is honoring it legally required?** Yes, in California, per WebSearch of legal-commentary sources: **"Section 999.315(c) of the CCPA regulations requires businesses that collect personal information to treat user-enabled global privacy controls as a valid opt-out request."** The California Attorney General has taken enforcement action on this basis — sources cite a **$2.75 million settlement with The Walt Disney Company (February 2026)** for, among other things, "systemic failures to honor consumer opt-out requests across streaming services and digital platforms." **[UNVERIFIED — WebSearch/secondary legal-commentary sourced; oag.ca.gov itself was surfaced as a source link but not independently fetched and read in full this session.]** Engineering implication: a compliant site's cookie/consent layer should be tested to confirm it detects and honors the GPC signal (`Sec-GPC: 1` header / `navigator.globalPrivacyControl`) as an opt-out-of-sale/share request, not merely display a manual cookie banner.
- **Behavioral checks constituting evidence of GDPR/CCPA compliance (engineering-verification framing, not exhaustively sourced to primary legal text this session):**
  - Consent obtained **before** non-essential cookies/trackers fire (verifiable via network-request inspection: no analytics/ad-tech requests before consent signal is granted).
  - Consent **withdrawal** mechanism exists and is functionally equivalent in ease to granting consent, and withdrawal actually stops further non-essential processing (verifiable by re-testing network requests after withdrawal).
  - **Data-subject-request (DSAR) fulfillment** — a request (access/deletion/portability) is verifiably fulfilled within the statutory window; verification means end-to-end testing of the actual request pathway, not just the presence of a form.
  - **GPC honoring**, as above, verified by sending the signal and confirming opt-out behavior takes effect.
- **Google Consent Mode v2 — verified via developers.google.com:** Consent Mode allows sites to "control data collection based on user consent for advertising and analytics purposes." It **"was updated in November 2023 and now contains two additional parameters"** (i.e., v2 added two new signals on top of v1's `ad_storage`/`analytics_storage`). The four parameters as fetched:
  1. `ad_storage` — cookie storage for advertising purposes
  2. `analytics_storage` — cookie storage for analytics measurement
  3. `ad_user_data` — "Sets consent for sending user data related to advertising to Google"
  4. `ad_personalization` — "Sets consent for personalized advertising"
  Each accepts `'granted'` or `'denied'`. Google's own guidance requires calling `gtag('consent', 'default', ...)` "on every page of your site before any commands that send measurement data," and states "consent updates are tracked on the page where they occur, before any page transition." **Verification tooling:** Google provides Tag Assistant-based consent-mode debugging ("Troubleshoot consent mode with Tag Assistant") — i.e., Google's own recommended verification method is inspecting actual tag firing/signal behavior in a debugger, not just reading the implementation code.

> **Framing answer (Privacy):** A cookie banner rendering is not evidence of consent-before-tracking; evidence requires network-level verification that no non-essential request fires pre-consent, that consent-mode signals (if used) are actually passed with the correct granted/denied state per category, and that opt-out signals (GPC) measurably change server-side processing behavior — not just client-side UI state.

**Legal-advice caveat:** everything in §6 is offered as *engineering verification practice* — what to test and how to test it — not as legal interpretation of GDPR/CCPA/EAA obligations, which vary by jurisdiction, business model, and specific data flows, and require qualified legal counsel.

---

## 7. "Evidence of conformance vs. passing scan" — cross-cutting answers (index)

| Standard | Passing scan | Evidence of conformance |
|---|---|---|
| WCAG 2.2 | Automated a11y linter (axe/Lighthouse a11y) on one page state | Full-page + full-process coverage, "accessibility supported" AT testing, non-interference check, explicit A/AA/AAA claim (§1.1) |
| ACT Rules | Running only "Automated" rules | Combining Automated + Semi-Automatic + Manual ACT rule execution (§1.3) |
| VPAT/ACR | A distributed blank VPAT template | A completed, criterion-by-criterion ACR with minimal "Not Evaluated" rows, ideally independently audited (§1.5) |
| Core Web Vitals | A single green Lighthouse run | 75th-percentile CrUX/RUM field data across mobile+desktop over a real-usage window (§2.2) |
| Load/capacity | One load run at target RPS reporting client-observed p99 | Declared workload model (open/closed), coordinated-omission-corrected percentiles, and the specific test type matched to the risk (soak/spike/stress) (§3.2, §3.4) |
| OWASP WSTG | An automated DAST crawl | Manual execution of the WSTG's category-by-category test procedures, especially business-logic (WSTG-BUSL) and authorization (WSTG-ATHZ) items that automation cannot assess (§4.1) |
| OWASP ASVS | Black-box scan claiming "ASVS compliant" | An explicit level claim (L1/L2/L3) backed by the access appropriate to that level — L2/L3 require documentation, source, architecture, and personnel access (§4.2) |
| OWASP Top 10 / LLM Top 10 | "We checked the Top 10" | Using the list to scope a real verification effort (e.g., ASVS mapping for web; red-teaming/output-review for LLM items) (§4.3–4.4) |
| NIST AI RMF | Citing "RMF-aligned" in marketing | Documented artifacts across all four functions (GOVERN/MAP/MEASURE/MANAGE), measured against the seven trustworthiness characteristics (§5.1) |
| Privacy (GDPR/CCPA) | A cookie banner exists | Network-verified pre-consent blocking, functioning withdrawal, fulfilled DSARs, and measurable GPC opt-out effect (§6) |

---

## 8. All thresholds table

| Metric / requirement | Threshold (verbatim where quoted) | Source URL | Version | Date verified |
|---|---|---|---|---|
| WCAG conformance levels | "Three levels of conformance are defined: A (lowest), AA, and AAA (highest)" | https://www.w3.org/TR/WCAG22/ | WCAG 2.2 | 2026-07-26 (Rec. dated 2024-12-12) |
| WCAG "accessibility supported" | "supported by users' assistive technologies as well as the accessibility features in browsers and other user agents" | https://www.w3.org/TR/WCAG22/ | WCAG 2.2 | 2026-07-26 |
| SC 4.1.1 Parsing | "obsolete and removed from WCAG 2.2" | https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/ | WCAG 2.2 | 2026-07-26 |
| New SC count in 2.2 | 9 new Success Criteria (listed §1.2) | https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/ | WCAG 2.2 | 2026-07-26 |
| ACT rule count | 145 rules listed [UNVERIFIED-approximate] | https://act-rules.github.io/rules/ | live listing | 2026-07-26 |
| WebAIM Million — home pages with failures | "95.9% of home pages had detected WCAG 2 failures" | https://webaim.org/projects/million/ | 2026 report (pub. 2026-03-30) | 2026-07-26 |
| WebAIM Million — avg errors/page | "56.1 errors per page" | https://webaim.org/projects/million/ | 2026 report | 2026-07-26 |
| WebAIM Million — low contrast text | 83.9% | https://webaim.org/projects/million/ | 2026 report | 2026-07-26 |
| WebAIM Million — missing alt text | 53.1% | https://webaim.org/projects/million/ | 2026 report | 2026-07-26 |
| WebAIM Million — missing form labels | 51% | https://webaim.org/projects/million/ | 2026 report | 2026-07-26 |
| WebAIM Million — empty links | 46.3% | https://webaim.org/projects/million/ | 2026 report | 2026-07-26 |
| WebAIM Million — empty buttons | 30.6% | https://webaim.org/projects/million/ | 2026 report | 2026-07-26 |
| WebAIM Million — missing doc language | 13.5% | https://webaim.org/projects/million/ | 2026 report | 2026-07-26 |
| LCP (good) | "within 2.5 seconds" | https://web.dev/articles/vitals | current CWV | 2026-07-26 |
| INP (good) | "200 milliseconds or less" | https://web.dev/articles/vitals | current CWV | 2026-07-26 |
| CLS (good) | "0.1 or less" | https://web.dev/articles/vitals | current CWV | 2026-07-26 |
| CWV percentile convention | "75th percentile of page loads, segmented across mobile and desktop devices" | https://web.dev/articles/vitals | current CWV | 2026-07-26 |
| ASVS current version | 5.0.0 | https://owasp.org/www-project-application-security-verification-standard/ | ASVS 5.0.0 (released 2025-05-30) | 2026-07-26 |
| ASVS L2 proportion | "Around 50% of the requirements in the ASVS are L2" | GitHub OWASP/ASVS v5.0.0 `0x03-What-is-the-ASVS.md` | ASVS 5.0.0 | 2026-07-26 |
| ASVS L3 proportion | "the final ~30% of requirements to comply with" | GitHub OWASP/ASVS v5.0.0 `0x03-What-is-the-ASVS.md` | ASVS 5.0.0 | 2026-07-26 |
| WSTG version | 4.2, released 2020-12-03 | https://owasp.org/www-project-web-security-testing-guide/ | WSTG 4.2 (stable; v5.0 in development) | 2026-07-26 |
| OWASP Top 10 current edition | 2025 | https://owasp.org/Top10/2025/ | Top 10:2025 | 2026-07-26 |
| OWASP LLM Top 10 current edition | 2025 (LLM01–LLM10:2025) | https://genai.owasp.org/llm-top-10/ | LLM Top 10:2025 | 2026-07-26 |
| NIST Generative AI Profile | released 2024-07-26 | https://www.nist.gov/itl/ai-risk-management-framework | NIST AI 600-1 | 2026-07-26 |
| EAA enforcement start | 28 June 2025 | secondary legal sources (reedsmith.com, twobirds.com) [UNVERIFIED-primary] | EAA (Directive (EU) 2019/882) | 2026-07-26 |
| EAA full-compliance deadline | 28 June 2030 | secondary legal sources [UNVERIFIED-primary] | EAA | 2026-07-26 |
| EN 301 549 current version | V3.2.1 (March 2021), WCAG 2.1 AA-aligned | secondary sources [UNVERIFIED-primary] | V3.2.1 | 2026-07-26 |
| EN 301 549 upcoming version | V4.1.0/V4.1.1 (2026), WCAG 2.2-aligned | secondary sources [UNVERIFIED-primary] | pending | 2026-07-26 |
| EU AI Act high-risk full obligations | 2 August 2026 | secondary sources [UNVERIFIED-primary] | EU AI Act | 2026-07-26 |
| GPC legal basis (CA) | "Section 999.315(c) of the CCPA regulations requires businesses... to treat user-enabled global privacy controls as a valid opt-out request" | secondary legal-commentary sources [UNVERIFIED-primary, oag.ca.gov not directly fetched] | CCPA regs | 2026-07-26 |
| Consent Mode v2 parameter count | 4 parameters (`ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization`); v2 update "November 2023" | https://developers.google.com/tag-platform/security/guides/consent | Consent Mode v2 | 2026-07-26 |
| Coordinated omission worked example | P99 249µs (uncorrected) vs. 665ms (corrected) — "over 2,600 times higher" | https://www.scylladb.com/2021/04/22/on-coordinated-omission/ | secondary source citing Tene | 2026-07-26 |

---

## 9. [UNVERIFIED] items — explicit list

1. **ACT rule count (145)** — read via AI-summarized fetch of a dynamic page, not manually counted. Re-verify by loading https://act-rules.github.io/rules/ and counting rows.
2. **Proportion of WCAG issues detectable by automation** — no citable quantified statement found this session (e.g., no sourced "X% can be automated" figure from Deque/WebAIM/W3C). Do not assert any percentage.
3. **VPAT's fifth conformance term "Not Evaluated"** — not confirmed verbatim on the fetched itic.org page; only "supports / partially supports / does not support / not applicable" were confirmed. Re-check the actual VPAT 2.5 template document.
4. **EN 301 549 version numbers (V3.2.1 current; V4.1.0/4.1.1 pending 2026) and dates** — sourced from WebSearch secondary/tertiary compliance content, not the primary ETSI publication. Re-verify at etsi.org.
5. **European Accessibility Act enforcement dates (28 June 2025 / 28 June 2030) and scope list** — sourced from legal-commentary WebSearch results, not the Directive text or EUR-Lex directly.
6. **"Open Versus Closed: A Cautionary Tale" (NSDI 2006) — abstract/conclusion content in §3.1** — every direct primary source (USENIX PDF/page, kilthub, ResearchGate, Semantic Scholar) was unreachable (403/empty) this session. The open/closed definitions and the paper's conclusion as stated in §3.1 are standard secondary characterization, not a session-verified verbatim quote. Treat with more caution than other entries in this file.
7. **Dean & Barroso "Tail at Scale" — fan-out/tail-probability mechanism explanation** — the two directly quoted sentences in §3.3 are verbatim (via secondary blog quotation of the primary text), but the explanatory mechanism about fan-out multiplying tail probability is paraphrase, not a verified quote from the primary paper (primary PDF/CACM page unreachable this session).
8. **NIST AI RMF — individual one-line definitions of GOVERN/MAP/MEASURE/MANAGE** — the four function names are confirmed, but NIST's own exact one-sentence definition of each individual function was not extracted verbatim this session (AIRC sub-pages 404'd; the AI 100-1 PDF returned undecoded binary via WebFetch). Needs a direct read of NIST AI 100-1 §"AI RMF Core" before quoting definitions as exact NIST language.
9. **NIST seven trustworthy-AI characteristics** — high confidence, sourced from NIST's own AIRC site, but delivered through an AI-summarizing fetch rather than a hand-checked verbatim diff of the HTML. Treat wording as near-verbatim, not certified character-exact.
10. **ISO/IEC 42001, ISO/IEC 23894, EU AI Act conformity-assessment timeline (2 Aug 2026), prEN 18286 status** — entirely WebSearch/secondary-sourced (compliance-vendor blogs, law firm content); no ISO or EUR-Lex primary document was fetched. Treat all specific dates in §5.2 as needing primary-source re-verification.
11. **GPC / California AG enforcement details, including the cited "$2.75M Disney settlement (Feb 2026)"** — WebSearch/secondary legal-commentary sourced; oag.ca.gov itself was not directly read. Re-verify the settlement figure and date at a primary/AG-office source before citing it as fact.
12. **Core Web Vitals "needs improvement"/"poor" numeric boundaries** — only the "good" thresholds were freshly re-quoted this session; the upper boundaries were not re-verified verbatim (see §2.1 note).
13. **Lighthouse run-to-run variance caveat sentence** — not freshly re-quoted verbatim from Google's own documentation this session; only the field-vs-lab primacy statement is verbatim-sourced.
14. **ISTQB load/stress/soak/spike/capacity definitions** — surfaced via WebSearch engine paraphrase of ISTQB glossary content; direct fetch of glossary.istqb.org 403'd both times attempted. Re-verify exact wording at the primary ISTQB glossary before quoting as "verbatim ISTQB."
15. **OWASP's own explicit statement on "scan vs. verification"** — no direct OWASP quote was found asserting this distinction in so many words (attempted DevSecOps guideline URL 404'd). The ASVS level-access argument (§4.2) is the closest sourced proxy, not a direct quote on the scan/verification distinction itself.
16. **4.1.1 Parsing removal rationale** — the fact of removal is confirmed verbatim, but the FAQ page explaining *why* was not fetched/read this session.
17. **OWASP Top 10:2025 exact publication date (month/day)** — only "2025" as edition year is confirmed; specific date not surfaced.
