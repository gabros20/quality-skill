# Claude Code repository guide

This is the released `quality-skill` (runtime skill `quality`, under `skills/quality/`). Read
[AGENTS.md](AGENTS.md) for the ownership boundary and non-negotiable invariants — especially:
**name the oracle, state the evidence class, and never ship the evidence dossier without its
adversarial read.** This skill writes no tests; construction-side testing stays with `frontend`,
`backend`, `data`, and `ai`.

Run `scripts/check-sync` before any release. Keep `SKILL.md` the router; keep versions out of it.
