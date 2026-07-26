# Agent guide — `quality` (Quality Engineering)

This repository is the released `quality-skill`: an installable agent skill for independently
verifying an assembled product and deciding whether it may ship. The runtime skill lives under
`skills/quality/`; the repository and Codex plugin use the `-skill` suffix. Read this before editing.

## Ownership boundary (non-negotiable)

`quality` provides **independent evidence** that an assembled product meets its functional and
non-functional expectations, and converts that evidence into **two separate decisions: may we ship,
and what may we claim.** It owns verification strategy and risk allocation, oracles and evidence
classing, functional/accessibility/performance/security/compatibility/AI-behavior verification, suite
and signal health, defect classification, and the release gate with its evidence dossier. It does
**not** own:

- writing unit, component, service, pipeline, or eval tests → **frontend** · **backend** · **data** ·
  **ai** (this skill writes no tests, period)
- TDD, red-green-refactor → the building skill
- lint, complexity, or diff review → the skill that owns the code
- setting NFR budgets, threat modeling, system decomposition → **architecture**
- authoring acceptance criteria, deciding what "good" means for users → **product**
- CI/CD, deploy, monitoring, incidents, SLOs → **operate**
- designing or reading out an experiment → **growth**
- fixing what verification found → the owning skill, unless remediation is explicitly in scope
- design intent, usability critique against that intent → **design**

`quality` *references* those substrates; it does not re-teach or override them. It works standalone
and never silently invokes a sibling skill.

## Non-negotiable invariants

1. **Name the oracle — the flagship.** Every verdict rests on one. A passing check certifies only the
   propositions someone encoded; never report "all checks passed" as "the software is fine."
2. **State the evidence class.** Every finding and every gap carries `observed` / `inferred` /
   `not_tested` / `blocked`, and a weaker class may never be reported in the vocabulary of a stronger
   one. Evidence may not be extended past the conditions it covers.
3. **Omission is permitted; silent omission is not.** The "what we deliberately did not verify"
   section is required output, never a courtesy, and never empty by default.
4. **Residual risk gets an owner and an expiry.** Whatever is unrefuted is residual risk, surfaced to
   the decision-maker, not buried in a passing pipeline.
5. **Decide release and claim independently.** A product may ship with a recorded exception without
   earning an unqualified conformance claim.
6. **The dossier never ships without its adversarial read.** One feature, never two — this is the
   exact failure mode the assurance-case literature has spent twenty years documenting.
7. **Verification is refutation.** Attempt to show harm is possible; grade the refutation method,
   because method strength *is* assurance level. No test counts as evidence until it has been observed
   failing, and the verifier must not share a source of truth with the thing it verifies.
8. **Runner output is untrusted.** Take verdicts from typed channels — exit codes, JUnit XML, JSON
   reporters — never scraped prose; strip ANSI before parsing or logging.
9. **A flaky suite is an evidence-validity problem, not hygiene.** Never retry-to-green; never delete
   a flake without triage. Coverage finds untested code; it does not measure test quality.
10. **Subtract the folk number.** Cite provenance or do not cite — this domain is full of Schelling
    points (the 80% coverage threshold, pyramid/trophy ratios, a11y automation percentages) presented
    as derived facts. Ship no unverified number of your own.
11. **Do not disparage `petrkindlmann/qa-skills`.** It is a genuinely good, neutral pack; our
    boundary (no test authoring) is structural to being part of a family, not a claim that its design
    is worse.

## Required behavior

1. Run `scripts/check-sync` (and `scripts/lint-skill`) before any release; never replace the generic
   gate with domain-only checks.
2. Keep runtime frontmatter to `name` and `description`. Versions/metadata live in
   `.codex-plugin/plugin.json`, `CHANGELOG.md`, tags, and releases — never in `SKILL.md`.
3. Keep `SKILL.md` the direct router: one primary job × ≤1 base surface (+ additive regulated
   overlay), plus the "Not this skill →" decline table. References are flat, directly linked,
   self-describing, loaded only when their conditions apply.
4. Every reference begins with `Purpose / Read when / Skip when / Inputs / Produces`; add a
   `## Contents` when it exceeds ~100 lines.
5. Every volatile fact (tool version, threshold, licence, standard revision) carries a verification
   date and a re-verify pointer. This domain churns; an unstamped fact is a liability.
6. Keep repository docs, eval fixtures, research, and site assets outside `skills/quality/`.
7. Release through matching plugin version, changelog entry, tag, and GitHub Release; set the GitHub
   About area (family-style description, canonical site alias as homepage, base + domain topics).

Do not mark the repository complete because structural lint passes. Activation, traversal, and output
evaluations must show the skill changes agent behavior usefully.
