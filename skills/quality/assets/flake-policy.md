# Flake Quarantine Policy (fillable)

A flaky suite is an evidence-validity problem, not hygiene — once failures start being ignored, the
healthy tests stop being believed too. Fill this once per repo/suite; revisit it when the quarantine
count creeps up. Source: `references/suite-and-signal-health.md`.

## 1. Detection definition (fill in — no shared vocabulary exists across runners)

State exactly what counts as flaky *in this suite*, because runners disagree: Playwright names a
third verdict `flaky` (still green in exit-code terms); Cypress forces a policy choice
(`detect-flake-and-pass-on-threshold` vs `detect-flake-but-always-fail`); **Jest has no flaky
concept and silently reports `passed`**; pytest/JUnit5 add their own rerun semantics. Do not assume
your runner's "green" means what another team's runner's "green" means.

- Runner(s) in use: [ ]
- Operational definition adopted: *"Test outcome (pass/fail) changes across repeated runs of the
  same code revision, same input, same configuration"* — [ confirm / adapt: __________ ]
- Detection mechanism: [ ] rerun-on-failure with N=___ reruns [ ] scheduled repeat-run job
  [ ] CI-native flaky flag [ ] other: __________

## 2. Quarantine — time-bounded, with a forcing function

A quarantine with no limit is where tests go to be forgotten. Pick **one** forcing function and
record it:

- [ ] Numeric cap: max **___** tests in quarantine at once (suggested default: 8)
- [ ] Time cap: no longer than **___** in quarantine (suggested default: 1 week; **maximum
  quarantine age: 14 days**, after which the test is fixed or deleted with triage recorded)
- [ ] Suite-share cap: **>5% of the suite quarantined = systemic-problem signal**, triggers a
  dedicated investigation, not more quarantine slots

These are two separate rules: 14 days bounds how long *one* test may sit quarantined; >5% of the
suite is the signal that the *suite* has a systemic problem. Neither substitutes for the other.

Every quarantined test needs: a ticket/issue link, an owner, and an entry date. No exceptions —
an un-ticketed quarantine entry is indistinguishable from a deleted test.

| Test | Quarantined on | Ticket | Owner | Forcing-function deadline |
|---|---|---|---|---|
| | | | | |

## 3. Never retry-to-green

Retrying until a test passes discards the exact signal quarantine exists to protect: **24% of
flaky-test fixes changed the code under test, not the test** (Luo et al., FSE 2014 — verified), and
roughly 1 in 6 flaky-to-fixed transitions has been reported to trace to a real production bug
(Listfield 2017 — **low-confidence extraction, from an author reply rather than the article body**). A green build that retried to get there is not evidence the code is
correct — it's evidence the test ran enough times to get lucky once.

- [ ] CI config confirmed: no blanket retry-until-pass step exists in this suite's pipeline
- [ ] If a scoped retry exists (e.g. `pytest-rerunfailures` with an exception-type filter), it's
  narrow and logged, not a blanket policy: [ describe scope ]

## 4. A flake may be a real bug — never delete without triage

Deletion is destructive and effectively irreversible in practice ("it's in git history" is not a
recovery plan). Every quarantined test gets a triage verdict before it leaves quarantine:

| Test | Triage verdict | Evidence |
|---|---|---|
| | [ ] real bug in code — routed as a defect (see `assets/severity-map.md`) [ ] real bug in test — fixed, re-verify [ ] genuinely non-deterministic environment — fixed or documented [ ] deleted with sign-off | |

Deletion requires: a stated reason, a named sign-off, and the ticket link — never a silent removal.

## 5. Suite-runtime budget

Runtime is a scarce, finite resource this policy is also protecting — a suite that's slow enough
gets skipped, which produces the same evidence-validity problem as flakiness by a different route.

- Current suite runtime: [ ]
- Budget ceiling: [ ]
- Action when budget is exceeded: [ ] split/parallelize [ ] move slow tests to a nightly tier
  [ ] other: __________

## 6. Self-audit

- [ ] Detection definition stated for this runner specifically
- [ ] Exactly one forcing function chosen and enforced (not "we'll keep an eye on it")
- [ ] No blanket retry-to-green step in CI
- [ ] Zero quarantined tests without a ticket + owner + entry date
- [ ] Suite-runtime budget line filled in, not left blank
