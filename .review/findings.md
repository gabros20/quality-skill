# Independent review — quality skill v0.1.0 (2026-07-26)

Reviewer: independent Opus agent (did not author the pack). Ground truth: `research/` corpora,
treated as authoritative over the pack.

## Verdict: fix-then-ship → all findings resolved same-day. BLOCKER 0 · S-major 8 · N-minor 9.

The `ai`-skill BLOCKER class (invented tool/version facts shipped as "verified") **did not recur**.
~90 numeric claims, versions, licences, quotations and attributions were spot-verified against the
corpora; the overwhelming majority trace to a corpus line with the same value. What blocked a clean
ship was a cluster of **provenance and traceability defects**, all surgical.

| ID | Sev | Finding | Resolution |
|---|---|---|---|
| Q1 | S-major | Suite-health metric table credited to `petrkindlmann/qa-skills`; the corpus attributes that exact table to `proffesor-for-testing/agentic-qe`. Two adjacent attributions got crossed | FIXED: re-credited to agentic-qe; the adjacent quarantine-hygiene numbers *are* qa-skills and were correct |
| Q2 | S-major | The risk→effort allocation table shipped with **no source at all**, in the one skill whose own invariant is "cite provenance or do not cite" | FIXED: attributed to agentic-qe (MIT) inline in both the reference and the asset, marked adopted-convention-not-derived-result, and added to SOURCES.md |
| Q3 | S-major | Google flake figures: used 1.5% (corpus-marked `[UNVERIFIED]`) with the word "steady-state" while omitting the **verified 0.15%**; and presented "~16% of tests flaky" as a Google figure, which the corpus explicitly forbids ("traces only to a comment on a blog post") | FIXED: leads with verified 0.15% + the 1% value-loss threshold; both folklore figures now named as unusable |
| Q4 | S-major | A low-confidence figure (~1 in 6 flaky-to-fixed → real bug) lost its qualifier when it moved from a reference into a **fillable asset a user would cite from** | FIXED: marker carried into the asset; the verified Luo et al. figures separated out |
| Q5 | S-major | SOURCES.md said testing-vs-checking was "refined 2025". No 2025 revision exists; the corpus says the later timestamp is a **page re-save**. The clearest instance of the hunted class in the pack — and it was the controller's own text | FIXED |
| Q6 | S-major | **Invariant numbering did not resolve.** Router shipped invariants unnumbered while 6 references cited `I1`–`I14` against two incompatible schemes; an extra router bullet at position 9 shifted everything after it, so `I9` (runner output untrusted) landed on a different rule | FIXED: router invariants explicitly numbered I1–I14; all 8 distinct citations in the pack verified to resolve |
| Q7 | S-major | The flagged seam was genuinely unresolved and **two surfaces disagreed** — `surface-ai-system` conflated the compositional fallacy with the shared-source-of-truth failure; three files stated the idea with no owner | FIXED: canonical statement placed in `oracles-and-evidence.md` §5 with an explicit contrast against the compositional fallacy; all three surfaces now point at it |
| Q8 | S-major | The curl datum shipped **without the counterweight the corpus says is mandatory** (AI tooling also found 12 CVEs in one release + 15 upstream), and stated 5% against the wrong denominator | FIXED: counterweight added, denominator corrected, Stenberg's actual position (anti-unreviewed-output, not anti-AI) stated |
| Q9 | N-minor | Two files over the 3,600 authoring ceiling | FIXED: `ai-behavior-verification` 4,117→3,737; `release-gate-and-claims` 3,983→3,600. Cut only the reviewer-identified padding |
| Q10 | N-minor | Filename split across a line break inside a code span, resolving to a non-existent file | FIXED |
| Q11 | N-minor | Flagship cited a source using a platform **"verified" badge** as a credibility signal — in a skill whose thesis is *check who produced the number*, and the corpus warns the badge is a purchased subscription | FIXED: cites handle + date, with the reasoning stated inline |
| Q12 | N-minor | "this file" inverted the ownership the sentence was establishing | FIXED |
| Q13 | N-minor | Cohn's no-numeric-ratio claim asserted flatly; the corpus marks that half `[UNVERIFIED — primary book not read]` | FIXED: marker restored, Dodds half noted as verified |
| Q14 | N-minor | The 300,000-issue sample attached to different studies in two files | FIXED: attached to the 2021 study, with the cross-corpus conflict stated rather than hidden |
| Q15 | N-minor | Five references never routed to by any traversal case, including job #1 | FIXED: 10→12 cases; two bare cases given falsifiable assertions. `handoff.md` remains unrouted — it is emitted, not routed to; accepted |
| Q16 | N-minor | Two quarantine rules merged into one; Baseline licence left as "see project repo" | FIXED: rules separated; licence filled in as Apache-2.0 (`web-platform-dx/web-features` v3.34.2) |
| Q17 | N-minor | Description 799 chars against a 600 target | FIXED: trimmed |

## Verified clean (spot-audited against corpora)

- **All ten binding rulings obeyed**, with Q7 the only partial failure (now fixed). Grepped and
  confirmed absent: the struck system-prompt-leak claim, the struck "hawk" quotation, the dropped
  Awwwards weights.
- **The a11y split range is honored in all five places it appears**, with 57.38%/80.39% marked
  `[UNVERIFIED]` and never asserted; an eval assertion fails any response citing 80.39%.
- **No near-verbatim text from the unlicensed source survives** — all 11 affected items traced;
  the headline "green build proves the code compiles" line appears nowhere in the pack.
- **`pbakaus/impeccable` (Apache-2.0) attributed at all five sites** the obligation attaches.
- **Dossier never appears without its adversarial read** — enforced in the reference, the flagship,
  the asset (with a separate-signer requirement), and an eval assertion.
- **Verdict class ⊥ evidence sufficiency** — called the cleanest execution of any ruling in the pack.
- **Router integrity**: all 18 reference links resolve; 18 on disk, 18 indexed; 8 assets listed and
  present; no orphans.
- **Decline table**: no drift into test-authoring, TDD, CI/CD construction, budget-setting or
  acceptance criteria. `performance-and-load-verification.md` singled out as notably disciplined
  ("this file reports the breach; it does not have the authority to lower the number").
- **Single-homing**: surfaces point rather than re-teach; the evidence-state vocabulary single-homes
  cleanly across all 12 references to it.
- **~90 verified numeric anchors**, including the Lighthouse weight table and control points, every
  ISO/IEC 15026-2 subclause letter, ASVS 5.0.0 and WSTG 4.2 structures, the coordinated-omission
  worked case, Inozemtseva & Holmes, Luo et al., Bettenburg, Petrović & Ivanković, van Deursen,
  Machalica, the caniuse/BCD/browserslist/web-features licences and versions, BrowserStack tiers,
  garak/PyRIT/promptfoo/Langfuse figures, the jqwik injection string and licence, the ~12%
  NOASSERTION sample, the Artillery MPL-vs-BSL split, and the Rauch attribution correction.

## Post-review residual

Three files still carry no date stamp while citing volatile versions
(`suite-and-signal-health.md`, `oracles-and-evidence.md`, `verification-strategy-and-risk.md`).
Reviewer judged this not ship-blocking; noted for the next pass.
