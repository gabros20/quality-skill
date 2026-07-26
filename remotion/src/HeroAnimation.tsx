import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { themes, MONO, SANS, type ThemeName, type Theme } from "./theme";

// Hero: the strongest single idea in `quality` — a verification result cannot be binary, because
// the thing producing it cannot decide every case. A naive claim ("all tests passed, ready to
// ship") gets interrogated; four independent bodies of work (testing theory, W3C's ACT rules,
// axe-core's own incomplete rate, ISO/IEC 15026-2) converge, reached from four separate
// directions, on one vocabulary; the green tick resolves into the four honest evidence states —
// observed / inferred / not_tested / blocked — the flagship image. The faceted router then shows
// how one job composes with at most one base surface plus the additive regulated overlay; a full
// pass produces the evidence dossier together with its adversarial read and the release/claim
// decisions made independently; and the handoff routes triaged defects back to the four
// construction-side owners while quality itself fixes nothing.
// ~57s, loops (opens/closes empty).
//
// Pacing model (reader-first): every scene animates its content IN, then HOLDS fully still for a
// reading beat (~2.3-3.6s) before the container fades OUT. The fade-out begins at dur - hold, so each
// scene's dur = content-in-end + reading-hold + fade. Never let the next scene start before this one
// has been readable at rest.
//
// Scene map (30fps):
//   S1 claim      0-210       the naive claim arrives, then gets interrogated
//   S2 converge   210-500     four directions, reached separately, land on one vocabulary
//   S3 flagship   500-840     THE centerpiece: the tick resolves into the four evidence states
//   S4 route      840-1180    the faceted router: one job x one surface + additive regulated
//   S5 gate       1180-1470   the dossier + its adversarial read; ship and claim, decided apart
//   S6 handoff    1470-1710   quality routes, never fixes; handoff.yaml carries volatile_facts

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

function envelope(frame: number, dur: number, hold = 26) {
  const opIn = interpolate(frame, [0, hold], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const opOut = interpolate(frame, [dur - hold, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const y = interpolate(frame, [0, hold], [14, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  return { opacity: Math.min(opIn, opOut), y };
}

const step = (frame: number, a: number, b: number, ease = false) =>
  interpolate(frame, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease ? EASE : undefined });

const SceneTitle: React.FC<{ t: Theme; kicker: string; title: string; accent?: string }> = ({ t, kicker, title, accent }) => (
  <div style={{ textAlign: "center", marginBottom: 30 }}>
    <div style={{ fontFamily: SANS, textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 600, fontSize: 17, color: accent ?? t.accent, marginBottom: 12 }}>
      {kicker}
    </div>
    <div style={{ fontFamily: MONO, fontSize: 40, color: t.ink, letterSpacing: "-0.02em" }}>{title}</div>
  </div>
);

// -- S1 . the naive claim arrives, then gets interrogated -----------------------
const ClaimLine: React.FC<{ t: Theme; text: string; frame: number; from: number; color?: string }> = ({ t, text, frame, from, color }) => {
  const chars = Math.floor(interpolate(frame, [from, from + 46], [0, text.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));
  const typed = text.slice(0, chars);
  const caretOn = Math.floor(frame / 8) % 2 === 0 && chars < text.length && frame > from;
  const op = step(frame, from - 4, from + 6);
  return (
    <div style={{ opacity: op, color: color ?? t.ink }}>
      {typed}
      <span style={{ opacity: caretOn ? 1 : 0, color: t.accent }}>▋</span>
    </div>
  );
};

const SceneClaim: React.FC<{ t: Theme; dur: number }> = ({ t, dur }) => {
  const frame = useCurrentFrame();
  const { opacity, y } = envelope(frame, dur, 22);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ translate: `0 ${y}px`, width: 1040 }}>
        <div style={{ fontFamily: SANS, textTransform: "uppercase", letterSpacing: "0.18em", fontWeight: 600, fontSize: 16, color: t.muted, marginBottom: 20, textAlign: "center" }}>
          independent verification - evidence, not assertion, before you ship
        </div>
        <div style={{ background: t.codeBg, border: `1px solid ${t.line}`, borderRadius: 12, padding: "26px 32px", fontFamily: MONO, fontSize: 20, lineHeight: 2, color: t.ink }}>
          <ClaimLine t={t} text="✓ 214/214 tests passed. Ready to ship." frame={frame} from={8} color={t.good} />
          <ClaimLine t={t} text="says who? tested how? decided by what?" frame={frame} from={64} />
        </div>
        <div style={{ marginTop: 18, textAlign: "center", fontFamily: SANS, fontSize: 15.5, color: t.muted, opacity: step(frame, 104, 126) }}>
          strategy/risk · oracles/evidence · functional · a11y · perf/load · security/privacy · compat matrix · ai behavior · suite health · defect lifecycle · release gate
        </div>
      </div>
    </AbsoluteFill>
  );
};

// -- S2 . four directions, reached separately, land on one vocabulary ----------
const GateCol: React.FC<{ t: Theme; label: string; rows: string[]; appear: number; ok?: boolean }> = ({ t, label, rows, appear, ok }) => (
  <div style={{ opacity: appear, width: 460, background: t.panel, border: `1px solid ${ok ? t.accent : t.line}`, borderRadius: 12, padding: "16px 20px" }}>
    <div style={{ fontFamily: SANS, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, fontSize: 12.5, color: ok ? t.accent : t.muted, marginBottom: 12 }}>{label}</div>
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      {rows.map((r) => (
        <div key={r} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: MONO, fontSize: 13.5, color: ok ? t.ink : t.muted, textDecoration: ok ? "none" : "line-through", textDecorationColor: t.bad }}>
          <span style={{ color: ok ? t.accent : t.bad, flex: "none", fontSize: 15 }}>{ok ? "✓" : "✗"}</span>
          {r}
        </div>
      ))}
    </div>
  </div>
);

const SceneConverge: React.FC<{ t: Theme; dur: number }> = ({ t, dur }) => {
  const frame = useCurrentFrame();
  const { opacity, y } = envelope(frame, dur);
  const colL = step(frame, 16, 42, true);
  const colR = step(frame, 30, 56, true);
  const warn = step(frame, 96, 122, true);
  const cap = step(frame, 132, 156);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ translate: `0 ${y}px`, display: "flex", flexDirection: "column", alignItems: "center", width: 1080 }}>
        <SceneTitle t={t} kicker="four directions . one vocabulary" title="a verdict cannot be binary" />
        <div style={{ display: "flex", gap: 24 }}>
          <GateCol t={t} label="a single tool's verdict" appear={colL} rows={["a scanner says \"clean\"", "a suite exits 0", "a score reads 91/100"]} />
          <GateCol t={t} label="four independent directions" appear={colR} ok rows={["Kaner: helps you decide, not tells you", "W3C ACT: automatic / manual / semiAuto", "axe-core: 55% of rules return \"incomplete\""]} />
        </div>
        <div style={{ opacity: warn, marginTop: 22, display: "flex", alignItems: "center", gap: 12, background: t.amberBg, border: `1px solid ${t.amber}`, borderRadius: 10, padding: "12px 20px", maxWidth: 900 }}>
          <span style={{ color: t.amber, fontSize: 20, flex: "none" }}>⚠</span>
          <div style={{ fontFamily: MONO, fontSize: 15, color: t.ink, lineHeight: 1.5 }}>
            <span style={{ color: t.amber, fontWeight: 700 }}>ISO/IEC 15026-2:</span> every claim's uncertainty and conditions of applicability <span style={{ color: t.amber }}>shall</span> be stated — omission is permitted, silence is not
          </div>
        </div>
        <div style={{ marginTop: 20, fontFamily: MONO, fontSize: 16.5, color: t.muted, opacity: cap, textAlign: "center" }}>
          reached from four separate directions — <span style={{ color: t.accent }}>not a coincidence</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// -- S3 . THE FLAGSHIP: the tick resolves into the four evidence states --------
const EvidenceChip: React.FC<{ t: Theme; glyph: string; label: string; meaning: string; color: string; appear: number }> = ({ t, glyph, label, meaning, color, appear }) => (
  <div
    style={{
      opacity: appear,
      translate: `0 ${interpolate(appear, [0, 1], [22, 0])}px`,
      scale: String(interpolate(appear, [0, 1], [0.86, 1])),
      width: 250,
      background: t.panel,
      border: `1px solid ${color}`,
      borderRadius: 12,
      padding: "16px 18px",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
      <span style={{ fontFamily: MONO, fontSize: 20, fontWeight: 700, color }}>{glyph}</span>
      <span style={{ fontFamily: MONO, fontSize: 16, fontWeight: 700, color: t.ink }}>{label}</span>
    </div>
    <div style={{ fontFamily: SANS, fontSize: 12, color: t.muted, lineHeight: 1.45 }}>{meaning}</div>
  </div>
);

const SceneFlagship: React.FC<{ t: Theme; dur: number }> = ({ t, dur }) => {
  const frame = useCurrentFrame();
  const { opacity, y } = envelope(frame, dur);
  const checkIn = step(frame, 0, 26, true);
  const checkFade = interpolate(frame, [86, 132], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const checkOpacity = Math.min(checkIn, checkFade);
  const checkScale = interpolate(frame, [86, 132], [1, 0.7], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE });
  const kanerCap = step(frame, 70, 96);
  const c1 = step(frame, 112, 138, true);
  const c2 = step(frame, 126, 152, true);
  const c3 = step(frame, 140, 166, true);
  const c4 = step(frame, 154, 180, true);
  const ruleCap = step(frame, 200, 228);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ translate: `0 ${y}px`, display: "flex", flexDirection: "column", alignItems: "center", width: 1140 }}>
        <SceneTitle t={t} kicker="the flagship . oracles &amp; evidence" title="the tick resolves into four honest states" />

        <div style={{ position: "relative", height: 118, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <div style={{ position: "absolute", opacity: checkOpacity, scale: String(checkScale), display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: t.good, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, color: t.accentInk, fontWeight: 700 }}>✓</div>
            <div style={{ fontFamily: MONO, fontSize: 15, color: t.ink, fontWeight: 700, marginTop: 4 }}>ALL TESTS PASSED</div>
            <div style={{ fontFamily: SANS, fontSize: 12.5, color: t.muted }}>ready to ship?</div>
          </div>
          <div style={{ opacity: kanerCap, fontFamily: MONO, fontSize: 18, color: t.ink, textAlign: "center", maxWidth: 760 }}>
            an oracle <span style={{ color: t.accent }}>"helps you decide"</span> — it does not <span style={{ color: t.bad }}>"tell you"</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 14, marginTop: 24 }}>
          <EvidenceChip t={t} appear={c1} color={t.good} glyph="✓" label="observed" meaning="directly witnessed under stated conditions — a human check, or a typed tool channel exercising the real system" />
          <EvidenceChip t={t} appear={c2} color={t.amber} glyph="≈" label="inferred" meaning="not directly checked — derived from an observed result plus a stated similarity assumption" />
          <EvidenceChip t={t} appear={c3} color={t.glyph} glyph="–" label="not_tested" meaning="no evidence exists — must be labelled deliberate or accidental, never silent" />
          <EvidenceChip t={t} appear={c4} color={t.bad} glyph="⊘" label="blocked" meaning="attempted, could not complete — distinct from not_tested: this one was tried" />
        </div>

        <div style={{ marginTop: 26, fontFamily: MONO, fontSize: 16.5, color: t.muted, opacity: ruleCap, textAlign: "center" }}>
          never report a weaker class <span style={{ color: t.accent }}>in the vocabulary of</span> a stronger one
        </div>
      </div>
    </AbsoluteFill>
  );
};

// -- S4 . the faceted router (centerpiece) --------------------------------------
const Lane: React.FC<{ t: Theme; label: string; chips: string[]; onIndex: number; appear: number; lit: number; litColor: string; star?: boolean }> = ({ t, label, chips, onIndex, appear, lit, litColor, star }) => (
  <div style={{ opacity: appear, display: "grid", gridTemplateColumns: "210px 1fr", gap: 16, alignItems: "center" }}>
    <div style={{ fontFamily: SANS, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, fontSize: 13, color: t.muted, textAlign: "right" }}>{label}</div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {chips.map((c, i) => {
        const on = i === onIndex;
        return (
          <div key={c} style={{ fontFamily: MONO, fontSize: 12.5, padding: "6px 11px", borderRadius: 8, whiteSpace: "nowrap", color: on ? t.accentInk : t.muted, background: on ? `color-mix(in srgb, ${litColor} ${30 + lit * 70}%, ${t.panel})` : t.bg, border: `1px solid ${on ? litColor : t.line}`, scale: String(on ? interpolate(lit, [0, 1], [1, 1.06]) : 1) }}>
            {c}{on && star ? <span style={{ color: t.amber, marginLeft: 5 }}>⭐</span> : null}
          </div>
        );
      })}
    </div>
  </div>
);

const SceneRoute: React.FC<{ t: Theme; dur: number }> = ({ t, dur }) => {
  const frame = useCurrentFrame();
  const { opacity, y } = envelope(frame, dur);
  const lane1 = step(frame, 14, 40, true);
  const lane2 = step(frame, 26, 52, true);
  const lane3 = step(frame, 38, 64, true);
  const lit1 = step(frame, 54, 76, true);
  const lit2 = step(frame, 68, 90, true);
  const lit3 = step(frame, 82, 104, true);
  const arrow = step(frame, 116, 134, true);
  const readSet: [string, boolean][] = [["oracles-and-evidence.md", false], ["surface-web-app-and-site.md", false], ["surface-regulated.md", true]];
  const counter = step(frame, 200, 224);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ translate: `0 ${y}px`, display: "flex", flexDirection: "column", alignItems: "center", width: 1140 }}>
        <SceneTitle t={t} kicker="route . smallest sufficient set" title="the faceted router" />
        <div style={{ display: "flex", flexDirection: "column", gap: 15, width: "100%", maxWidth: 1020 }}>
          <Lane t={t} label="one primary job (of 11)" chips={["strategy/risk", "oracles/evidence", "functional", "a11y", "perf/load", "security", "compat", "ai behavior", "suite health", "defects", "release gate"]} onIndex={1} appear={lane1} lit={lit1} litColor={t.accent} star />
          <Lane t={t} label="≤ one base surface (of 5)" chips={["web-app & site", "service/API", "mobile", "data pipeline", "AI system"]} onIndex={0} appear={lane2} lit={lit2} litColor={t.accent} />
          <Lane t={t} label="+ regulated (additive)" chips={["surface-regulated"]} onIndex={0} appear={lane3} lit={lit3} litColor={t.reg} />
        </div>
        <div style={{ fontFamily: MONO, fontSize: 26, color: t.accent, margin: "15px 0 12px", opacity: arrow }}>↓</div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 9, maxWidth: 1000 }}>
          {readSet.map(([r, isReg], i) => {
            const ap = step(frame, 136 + i * 8, 154 + i * 8, true);
            const col = isReg ? t.reg : t.accent;
            return (
              <div key={r} style={{ opacity: ap, translate: `0 ${interpolate(ap, [0, 1], [8, 0])}px`, fontFamily: MONO, fontSize: 14.5, padding: "7px 13px", borderRadius: 8, color: col, background: t.codeBg, border: `1px solid ${col}` }}>
                {r}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 18, fontFamily: MONO, fontSize: 16.5, color: t.muted, opacity: counter }}>
          <span style={{ color: t.ink, fontWeight: 600 }}>one job . one surface . + regulated</span> — read fully, <span style={{ color: t.accent }}>never all 18</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// -- S5 . the dossier + adversarial read; ship and claim, decided apart -------
const GateArtifact: React.FC<{ t: Theme; label: string; note: string; appear: number }> = ({ t, label, note, appear }) => (
  <div style={{ opacity: appear, translate: `0 ${interpolate(appear, [0, 1], [12, 0])}px`, width: 250, background: t.panel, border: `1px solid ${t.line}`, borderTop: `3px solid ${t.accent}`, borderRadius: 10, padding: "14px 18px" }}>
    <div style={{ fontFamily: MONO, fontSize: 14.5, color: t.ink, fontWeight: 600 }}>{label}</div>
    <div style={{ fontFamily: SANS, fontSize: 12, color: t.muted, marginTop: 5, lineHeight: 1.4 }}>{note}</div>
  </div>
);

const SplitBox: React.FC<{ t: Theme; label: string; note: string; appear: number }> = ({ t, label, note, appear }) => (
  <div style={{ opacity: appear, translate: `0 ${interpolate(appear, [0, 1], [10, 0])}px`, width: 420, background: t.codeBg, border: `1px solid ${t.line}`, borderRadius: 10, padding: "14px 20px" }}>
    <div style={{ fontFamily: MONO, fontSize: 15, color: t.accent, fontWeight: 700 }}>{label}</div>
    <div style={{ fontFamily: SANS, fontSize: 13, color: t.ink, marginTop: 5, lineHeight: 1.4 }}>{note}</div>
  </div>
);

const SceneGate: React.FC<{ t: Theme; dur: number }> = ({ t, dur }) => {
  const frame = useCurrentFrame();
  const { opacity, y } = envelope(frame, dur);
  const arts: [string, string][] = [
    ["evidence dossier", "authority ledger + requirement-to-evidence matrix"],
    ["the adversarial read", "independent challengers · kill round · asymmetric overturn"],
    ["residual risk", "whatever is unrefuted — owner + expiry, always"],
    ["release ≠ claim", "two decisions, decided independently"],
  ];
  const splitLabel = step(frame, 96, 118);
  const shipAp = step(frame, 104, 128, true);
  const claimAp = step(frame, 116, 140, true);
  const cap = step(frame, 150, 176);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ translate: `0 ${y}px`, display: "flex", flexDirection: "column", alignItems: "center", width: 1080 }}>
        <SceneTitle t={t} kicker="produces . grade it, then argue with it" title="the dossier and its adversarial read" />
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 13, maxWidth: 1080 }}>
          {arts.map(([f, l], i) => {
            const ap = step(frame, 16 + i * 16, 36 + i * 16, true);
            return <GateArtifact key={f} t={t} label={f} note={l} appear={ap} />;
          })}
        </div>
        <div style={{ opacity: splitLabel, marginTop: 24, fontFamily: SANS, textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 600, fontSize: 12.5, color: t.muted }}>
          two independent decisions
        </div>
        <div style={{ display: "flex", gap: 18, marginTop: 12 }}>
          <SplitBox t={t} appear={shipAp} label="ship" note="ship | ship-with-exception | block" />
          <SplitBox t={t} appear={claimAp} label="claim" note="the exact scope of what may be claimed — or none" />
        </div>
        <div style={{ marginTop: 22, fontFamily: MONO, fontSize: 16.5, color: t.muted, opacity: cap, textAlign: "center" }}>
          a product may ship with a recorded exception <span style={{ color: t.accent }}>without earning an unqualified claim</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// -- S6 . quality routes, never fixes; handoff.yaml carries volatile_facts ----
const NextSkill: React.FC<{ t: Theme; name: string; note: string; appear: number }> = ({ t, name, note, appear }) => (
  <div style={{ opacity: appear, translate: `0 ${interpolate(appear, [0, 1], [12, 0])}px`, width: 320, background: t.panel, border: `1px solid ${t.line}`, borderRadius: 11, padding: "12px 18px" }}>
    <div style={{ fontFamily: MONO, fontSize: 16, color: t.ink }}><span style={{ color: t.accent, fontWeight: 700 }}>/</span>{name}</div>
    <div style={{ fontFamily: SANS, fontSize: 12, color: t.muted, marginTop: 4, lineHeight: 1.4 }}>{note}</div>
  </div>
);

const NextSkillCol: React.FC<{ t: Theme }> = ({ t }) => {
  const frame = useCurrentFrame();
  const c1 = step(frame, 96, 118, true);
  const c2 = step(frame, 108, 130, true);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <NextSkill t={t} name="frontend · backend · data · ai" note="routed, reproducible defects — quality fixes nothing" appear={c1} />
      <NextSkill t={t} name="operate" note="the gate result + residual risk — inherited, not discovered in prod" appear={c2} />
    </div>
  );
};

const SceneHandoff: React.FC<{ t: Theme; dur: number }> = ({ t, dur }) => {
  const frame = useCurrentFrame();
  const { opacity, y } = envelope(frame, dur, 20);
  const subCap = step(frame, 8, 30);
  const arrow = step(frame, 130, 152, true);
  const yamlLines: [string, string][] = [
    ["skill:", " quality"],
    ["evidence:", " item, oracle, evidence_state"],
    ["residual_risks:", " owner + expiry"],
    ["ship_decision", " · claim_decision: independent"],
    ["volatile_facts:", " fact, value, reverify_at"],
  ];
  const cap = step(frame, 200, 224);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity }}>
      <div style={{ translate: `0 ${y}px`, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <SceneTitle t={t} kicker="the handoff . quality writes no tests" title="report, route, decide — never fix" />
        <div style={{ opacity: subCap, fontFamily: SANS, fontSize: 14, color: t.muted, marginBottom: 20, textAlign: "center", maxWidth: 760 }}>
          a routed, reproducible defect goes back to the skill that owns the fix
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
          <div style={{ width: 440 }}>
            <div style={{ background: t.codeBg, border: `1px solid ${t.line}`, borderRadius: 12, padding: "16px 20px", fontFamily: MONO, fontSize: 13.5, lineHeight: 1.85 }}>
              {yamlLines.map(([k, v], i) => {
                const op = step(frame, 12 + i * 9, 28 + i * 9);
                return (
                  <div key={k} style={{ opacity: op, whiteSpace: "nowrap" }}>
                    <span style={{ color: t.accent }}>{k}</span><span style={{ color: t.ink }}>{v}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 34, color: t.accent, opacity: arrow }}>→</div>
          <NextSkillCol t={t} />
        </div>
        <div style={{ marginTop: 24, fontFamily: MONO, fontSize: 16.5, color: t.muted, opacity: cap, textAlign: "center" }}>
          own the <span style={{ color: t.accent }}>verdict</span> · carry volatile_facts · recommend siblings, never auto-invoke
        </div>
      </div>
    </AbsoluteFill>
  );
};

// -- persistent chrome + master timeline ----------------------------------------
const BOUNDS = [210, 500, 840, 1180, 1470, 1710];
const LABELS = ["claim", "converge", "evidence", "route", "gate", "handoff"];

const PhaseBar: React.FC<{ t: Theme; frame: number }> = ({ t, frame }) => {
  const active = Math.max(0, BOUNDS.findIndex((b) => frame < b));
  return (
    <div style={{ position: "absolute", bottom: 34, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 15 }}>
      {LABELS.map((l, i) => (
        <div key={l} style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: i === active ? t.accent : t.line, scale: String(i === active ? 1.3 : 1) }} />
          <div style={{ fontFamily: SANS, textTransform: "uppercase", letterSpacing: "0.09em", fontSize: 12, fontWeight: 600, color: i === active ? t.ink : t.muted, opacity: i === active ? 1 : 0.55 }}>{l}</div>
        </div>
      ))}
    </div>
  );
};

export const HeroAnimation: React.FC<{ theme: ThemeName }> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = themes[theme];

  const intro = step(frame, 0, 14);
  const outro = interpolate(frame, [durationInFrames - 16, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const master = Math.min(intro, outro);
  const glow = interpolate(Math.sin(frame / 90), [-1, 1], [0.5, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: t.bg, fontFamily: SANS }}>
      <AbsoluteFill style={{ background: `radial-gradient(circle at 82% 16%, color-mix(in srgb, ${t.accent} 13%, transparent), transparent 44%), radial-gradient(circle at 8% 92%, color-mix(in srgb, ${t.reg} 10%, transparent), transparent 48%)`, opacity: glow }} />
      <AbsoluteFill style={{ opacity: master }}>
        <Sequence durationInFrames={210}><SceneClaim t={t} dur={210} /></Sequence>
        <Sequence from={210} durationInFrames={290}><SceneConverge t={t} dur={290} /></Sequence>
        <Sequence from={500} durationInFrames={340}><SceneFlagship t={t} dur={340} /></Sequence>
        <Sequence from={840} durationInFrames={340}><SceneRoute t={t} dur={340} /></Sequence>
        <Sequence from={1180} durationInFrames={290}><SceneGate t={t} dur={290} /></Sequence>
        <Sequence from={1470} durationInFrames={240}><SceneHandoff t={t} dur={240} /></Sequence>
        <PhaseBar t={t} frame={frame} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
