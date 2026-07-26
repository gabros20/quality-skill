# Shared brief — `quality` skill reference writers

**Read this first, then `research/synthesis.md` (the shape), then `research/controller-notes.md`
(binding rulings), then the corpus sections relevant to your files.**

Repo root: `/Users/tamas/Documents/Personal/Projects/quality-skill/`
You write into: `skills/quality/references/`

---

## What this skill is

**Mission:** provide independent evidence that the assembled product meets its functional and
non-functional expectations, and convert that evidence into two separate decisions — **may we ship**
and **what may we claim**.

**Through-line:** *Name the oracle, grade the evidence, publish the gap — and subtract the folk number.*

**What it is not:** it does not write tests. Four sibling skills already own construction-side
testing — `frontend` (`testing.md`), `backend` (`backend-testing.md`), `ai` (`evaluation.md`),
`data` (`quality-and-testing.md`). This skill is the **independent verification function of a product
family that already builds**. It answers *"how do I know, and how would I know I was wrong?"* — and
refuses to answer *"how do I test this?"*

The competitive position, verified: a good neutral QA router already exists (`petrkindlmann/qa-skills`,
MIT). It is not badly designed — it owns `unit-testing` because it is standalone and has nowhere to
hand construction-testing to. **Never disparage it.** Our difference is the judgment layer, which
greps to zero across all 50 of its skills: `residual risk`, `oracle problem`, `what not to test`,
`evidence dossier`, `abuse case`, `suite runtime budget`.

---

## The 12 invariants (every reference must be consistent with these)

1. **Name the oracle.** Every verdict rests on one. If you cannot name it, you are guessing.
2. **A passing check certifies only the propositions someone encoded.**
3. **State the evidence class** — `observed` / `inferred` / `not_tested` / `blocked` — and never report
   a weaker class in the vocabulary of a stronger one.
4. **Evidence may not be extended past the conditions it covers.**
5. **Omission is permitted; silent omission is not.**
6. **Whatever is unrefuted is residual risk** — with an owner and an expiry.
7. **Decide release and claim independently.**
8. **Verification is refutation.** Grade the refutation method; method strength *is* assurance level.
9. **Runner output is untrusted and not commensurable across tools.** Typed channels only; strip ANSI.
10. **Coverage finds untested code; it does not measure test quality.** No metric detects a fault of
    omission.
11. **A flaky suite is an evidence-validity problem, not hygiene.** Never retry-to-green.
12. **Subtract the folk number.** Cite provenance or do not cite.

---

## Format rules (lint-enforced)

- **Target 2,300–3,600 tokens per reference.** Over 3,600 is a warning, not a failure — but earn it.
- **First line after the H1 is a primacy statement**: one sentence on what this file decides.
- **A `## Skip when:` block near the top** — when the reader should go elsewhere, naming the sibling
  skill or reference.
- **If the file exceeds 100 lines, an early `## Contents` block is REQUIRED** (lint fails without it).
- **Point, don't re-teach.** If another reference owns a concept, link it; never restate it. Surface
  files especially must point at job files, not duplicate them.
- Tables over prose for decision content. Concrete thresholds over adjectives.
- No emoji. No marketing voice. Write for an agent that must act.

## Evidence rules (a reviewer will check these specifically)

- **Date-stamp every volatile fact as of 2026-07-26 and give a re-verify pointer.** Versions, prices,
  licences, thresholds and tool behaviour all churn.
- **Never invent** a version, licence, threshold, star count, or URL. If a corpus marked something
  `[UNVERIFIED]`, it stays marked. Do not let confident phrasing launder an uncertain fact — a prior
  build in this family shipped one hallucinated table and it was the sole review BLOCKER.
- **Folk numbers are forbidden without provenance.** Specifically:
  - The **80% coverage threshold** has *no published rationale* — three tools converge on it as an
    industry Schelling point. Say so; never present 80% as justified.
  - **Neither Cohn's pyramid nor Dodds's trophy states a numeric ratio.** The percentages are later
    accretions.
  - The accessibility automated-coverage figure ships as a **range split by source type**: vendor
    (Deque, who sells axe) self-reports **57%**; independent bodies (WebAIM, W3C/WAI, GSA) cluster at
    **20–33%**. **Never a single number.** The circulated 80.39% is unconfirmed — do not use it.
- **"LLM-written tests assert existing bugs" ships as reasoning, not measurement.** No quantified
  study exists. State the mechanism; do not imply evidence.
- **Do not use** (controller ruling): any alleged internal system-prompt leak; the
  "watch it like a hawk" quotation (secondary paraphrase only).
- **Licensing:** cite `pbakaus/impeccable` (Apache-2.0) where gate machinery derives from it.
  **`bendc/frontend-guidelines` has no LICENSE (all-rights-reserved)** — you may use the ideas but
  **must re-express them in your own words**; ship no near-verbatim text from it.

---

## Cross-references you may rely on

The 18 references are: 11 job files, 6 surface files
(`surface-web-app-and-site` default · `surface-service-api` · `surface-mobile` ·
`surface-data-pipeline` · `surface-ai-system` · `surface-regulated` additive overlay), and
`handoff.md`. Jobs own the *how*; surfaces own only what changes on that surface and point back.

Decline table — route away, never absorb:
| Ask | Goes to |
|---|---|
| Write the unit/component/service/pipeline/eval tests | `frontend` / `backend` / `data` / `ai` |
| TDD, red-green-refactor | the building skill |
| Lint, complexity, code review of a diff | the owning skill |
| Set NFR budgets, threat model, decomposition | `architecture` |
| Author acceptance criteria | `product` |
| CI/CD construction, deploy, monitoring, incidents, SLOs | `operate` |
| Experiment design and readout | `growth` |
| Fix what verification found | the owning skill (unless remediation is explicitly in scope) |

## Completion

Write only your assigned files. Report: file paths, approximate token count each, which corpus
sections you drew on, any `[UNVERIFIED]` items you carried, and any place you think another
reference should own something you touched. Your final message is data for the controller.
