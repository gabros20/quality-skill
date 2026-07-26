# Surface: Mobile (iOS and Android)

Purpose: Decide which jobs matter most, in what order, and what is structurally different about
evidence, gates, and flake when the thing under verification is a native iOS or Android app.

Read when: verifying a native or cross-platform mobile application, planning a device matrix, or
reasoning about store review as a gate outside your control.

Inputs: the app build; the device and OS matrix under consideration; store submission constraints;
NFR budgets from `architecture` if they exist.

Produces: a surface-specific job order, a device-matrix decision with its budget rationale, the
evidence gap between a cloud device and the shipping device, and mobile-specific flake causes.

## Skip when:

- The thing under verification is a web page rendered in a mobile browser, not a native app
  → `surface-web-app-and-site.md` (its compatibility job already covers mobile viewports).
- The backend the app talks to is what you are verifying → `surface-service-api.md`.
- You need the mechanics of a device-farm run or an accessibility-tree inspection, not what this
  surface prioritizes → the named job file.

## Contents

- [Job order](#job-order)
- [Device-matrix economics](#device-matrix-economics)
- [Store review as an external gate](#store-review-as-an-external-gate)
- [Platform-specific accessibility APIs](#platform-specific-accessibility-apis)
- [A cloud device is not the shipping device](#a-cloud-device-is-not-the-shipping-device)
- [Sync-and-flake models differ from web](#sync-and-flake-models-differ-from-web)

## Job order

| Order | Job | Why it goes here on this surface |
|---|---|---|
| 1 | `verification-strategy-and-risk.md` | Device/OS-version budget is finite and must be ranked before a matrix is chosen |
| 2 | `oracles-and-evidence.md` | Name the oracle per platform — a passing cloud-farm run and a passing physical-device run are different evidence classes here, more than on any other surface |
| 3 | `compatibility-and-support-matrix.md` | The device/OS matrix decision comes earlier here than on other surfaces because it gates almost everything downstream |
| 4 | `functional-verification.md` | Journeys, including offline and background-resume states specific to mobile |
| 5 | `accessibility-conformance.md` | Platform accessibility APIs, not web ARIA — see below |
| 6 | `performance-and-load-verification.md` | Startup time, memory, battery, thermal — device-bound, not server-bound |
| 7 | `security-and-privacy-verification.md` | Local storage, keychain/keystore, permission scopes, platform-store privacy manifests |
| 8 | `suite-and-signal-health.md` | Mobile flake sources differ — see below |
| 9 | `defect-lifecycle.md` | Triage to the owning mobile build skill |
| 10 | `release-gate-and-claims.md` | Ship/claim split — but store review is a second, external gate; see below |

## Device-matrix economics

The device × OS-version space is combinatorially larger than a browser matrix and cannot be exhausted;
treat the matrix decision as a budget-allocation problem governed by
`verification-strategy-and-risk.md`, not a completeness goal. Rank by installed-base share, by
known OS-version behavioral divergence (a new major OS release is higher-risk than a point release),
and by device classes with known constrained resources (low-RAM Android tiers, older iOS hardware
still receiving OS updates). Build the matrix's actual numbers from store analytics or app-install
telemetry where available; the licensing and sourcing discipline for that data is owned by
`compatibility-and-support-matrix.md`.

## Store review as an external gate

App Store and Play Store review are a gate this skill does not control and cannot shortcut — they run
on the platform owner's criteria and timeline, sit *after* the internal release gate
(`release-gate-and-claims.md`), and can reject on grounds (metadata, privacy-label accuracy, policy
change) orthogonal to any internal verification result. Treat store approval as a second, external
`may we ship` decision with its own oracle (the reviewer, or the automated pre-check tooling the
platform provides) — record it as a distinct entry in the release record, not folded into the internal
gate's verdict.

## Platform-specific accessibility APIs

iOS exposes `UIAccessibility` and Android exposes the `AccessibilityNodeInfo` tree — neither is the web
accessibility tree, and web-oriented tooling does not transfer. Verify against the platform's own
inspector (Accessibility Inspector on iOS, `AccessibilityScanner`/`AccessibilityNodeInfo` dumps on
Android) and the platform's own screen readers (VoiceOver, TalkBack) as the oracle, not a WCAG
automated-scan tool built for DOM. The machine-testable/manual boundary discipline in
`accessibility-conformance.md` still applies — automated platform linters cover a documented minority
of cases; name which class of evidence a platform accessibility check produced.

## A cloud device is not the shipping device

A device-farm run (cloud-hosted physical or virtual devices) establishes that the app functions on
that specific hardware/OS/network combination, in a data-center network, without the user's actual
carrier conditions, actual battery/thermal state, or actual installed-app contention for memory. It is
strong evidence for functional and rendering correctness; it is weak or no evidence for
performance-under-real-conditions, background-kill behavior, or battery-drain complaints. Report a
device-farm pass as `observed` for the propositions it covers and explicitly `not_tested` for real-device
field behavior — never let one stand in for the other. Where the risk ranks high enough
(`verification-strategy-and-risk.md`), budget for verification on physical devices the team actually
holds, not only the farm.

## Sync-and-flake models differ from web

Mobile flake concentrates in causes that have no web analogue: network-condition transitions
(Wi-Fi↔cellular handoff mid-request), OS-initiated background termination and resume, permission
dialogs appearing non-deterministically on first run, and offline-first local-store/server
reconciliation producing different merge outcomes depending on operation ordering. Apply the same
non-negotiable rule from `suite-and-signal-health.md` — a flaky mobile test is an evidence-validity
problem, never retried to green — but expect the root-cause taxonomy to differ, and route
reconciliation/merge-conflict flake to a sync-logic defect rather than treating it as test hygiene.
