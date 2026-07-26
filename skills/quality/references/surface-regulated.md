# Surface: Regulated (Additive Overlay)

Purpose: Decide what a conformance obligation adds on top of a base surface — this file is never
read alone, because it names no base risks of its own.

Read when: a conformance claim carries legal or contractual weight, an audit trail must survive
scrutiny, evidence must be retained, or the verifier's independence is itself a requirement.

Inputs: whichever base surface applies (always read one); the applicable regime; the claim being
contemplated and its intended audience.

Produces: a scoped conformance claim, a requirement-to-evidence traceability matrix, an evidence
retention plan, and a verifier-independence statement.

**This is an additive overlay, not a base surface.** Read it together with whichever base surface
applies (`surface-web-app-and-site.md`, `surface-service-api.md`, `surface-mobile.md`,
`surface-data-pipeline.md`, or `surface-ai-system.md`); this file adds conformance-specific obligations
on top, it does not replace the base surface's job order, oracles, or risks.

## Skip when:

- No conformance obligation exists (no legal, contractual, or public-statement requirement to meet a
  named standard) → use the base surface alone.
- You need the accessibility conformance mechanics themselves (SC-level scoring, the machine-testable
  boundary) → `accessibility-conformance.md`; this file only adds what a *regulated* claim requires on
  top of that mechanics.
- You need the ship/claim decision procedure itself → `release-gate-and-claims.md`; this file adds the
  additional evidence a regulated claim demands before that procedure can run.

## Contents

- [What triggers this overlay](#what-triggers-this-overlay)
- [Conformance claims and their scope](#conformance-claims-and-their-scope)
- [VPAT / ACR](#vpat--acr)
- [EN 301 549](#en-301-549)
- [Traceability from requirement to evidence](#traceability-from-requirement-to-evidence)
- [Retention of evidence artifacts](#retention-of-evidence-artifacts)
- [Independence-of-verifier requirements](#independence-of-verifier-requirements)

## What triggers this overlay

A named standard obligation: public-sector procurement (Section 508, EN 301 549), a signed contract
requiring a stated conformance level, or a public accessibility/compliance statement the organization
intends to publish. Absent one of these, treat conformance work as ordinary risk-ranked verification
under the base surface — do not invoke VPAT/ACR machinery for a product with no such obligation; it is
overhead the base surface's `verification-strategy-and-risk.md` would rank as unwarranted.

## Conformance claims and their scope

A regulated claim is a claim about a **named scope** — specific pages, flows, platforms, and a stated
conformance target (e.g., WCAG 2.2 AA) — never "the product is accessible" unqualified. Follow the
release/claim independence invariant at full force here: a product may ship with recorded exceptions
without earning the unqualified claim, and the claim's scope must exactly match what was actually
evaluated, per the anti-inference rule in `oracles-and-evidence.md` — an evaluated flow does not extend
the claim to a neighboring, unevaluated one. Draft the scope statement before verification starts, not
after, so evaluation targets the claim rather than the claim being fitted to whatever got tested.

## VPAT / ACR

A Voluntary Product Accessibility Template, completed as an Accessibility Conformance Report, is the
standard artifact for communicating conformance scope and status per criterion to a procuring
organization. Populate it from the requirement-to-evidence matrix (below), not from memory or marketing
copy — every row needs a stated support level (Supports / Partially Supports / Does Not Support / Not
Applicable) and, for anything short of full support, the specific limitation. An ACR with no
"Partially Supports" rows on a nontrivial product is a signal to re-examine the evaluation, not a sign
of a clean product — the base rate of genuinely full conformance across an entire product surface is
low.

## EN 301 549

The EU's accessibility standard used in public-procurement contexts; it incorporates WCAG success
criteria (largely aligned with WCAG 2.1 AA, with version-specific deltas) and extends scope beyond web
content to non-web documents, software, and hardware/ICT where applicable. Treat WCAG conformance work
done under the base surface's `accessibility-conformance.md` as necessary but not sufficient for an
EN 301 549 claim — confirm which non-web-content clauses apply to the actual product before declaring
full-standard conformance, and date-stamp the standard version checked; harmonization deltas between
WCAG versions and EN 301 549 revisions change over time.

## Traceability from requirement to evidence

Every clause claimed as conformant needs a recorded link: requirement → verification method used →
evidence artifact produced → evidence state (`observed`/`inferred`/`not_tested`/`blocked`, per
`oracles-and-evidence.md`) → date. A claim with no traceable evidence behind it is not a stronger claim
for being asserted more confidently — under audit it is indistinguishable from an unverified one. Build
this matrix once per release, not once per audit request; it is the artifact `release-gate-and-claims.md`
consumes to produce the residual-risk record for anything not fully conformant.

## Retention of evidence artifacts

Regulated claims typically carry a retention obligation on the evidence itself (audit trail, contract
term, or statutory record-keeping period) — decide and record the retention period explicitly rather
than defaulting to CI's normal log-rotation window, which will silently delete conformance evidence
before an obligation expires. **Check the license terms on any tool whose report you intend to
retain as evidence** — a report-generation module's license can constrain what may be done with its
generated output (a confirmed case exists in mainstream load-testing tooling), so a retained artifact
can carry restrictions distinct from the tool's own execution license. Reconcile every license-like
file at a dependency's root before treating its report format as freely retainable — one LICENSE file
is a sample of the terms, not the whole of them.

## Independence-of-verifier requirements

The person or team that built the feature being claimed conformant should not be the sole verifier
signing that claim — regulated conformance work generally expects an independent check. This is the
**shared-source-of-truth failure**, owned by `oracles-and-evidence.md` §5: *an author's verification
shares the author's blind spot.* (Distinct from the compositional fallacy, which is about scope
rather than independence.) Where a fully independent external audit is
not in scope, at minimum route sign-off through someone who did not implement the feature, and record
who verified each row of the traceability matrix — an ACR with no recorded verifier identity is not
independently checkable later.
