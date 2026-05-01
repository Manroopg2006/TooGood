import { useState, useEffect } from "react";

// ── Internal subject data (source of truth for the progress bar) ─────────────
const QUIZ_SUBJECTS = [
  { id: "geography", label: "Geo",   icon: "🌍" },
  { id: "math",      label: "Math",  icon: "🔢" },
  { id: "logic",     label: "Logic", icon: "🧩" },
  { id: "science",   label: "Sci",   icon: "🔬" },
  { id: "history",   label: "Hist",  icon: "📚" },
  { id: "language",  label: "Lang",  icon: "💬" },
];

const LS_KEY = "learnify_completed";

// ── Exported utility — call this from any component after a perfect score ────
// Example usage:
//   import { markComplete } from "../components/PixelProgressBar";
//   markComplete("geography"); // after scoring 10/10
export function markComplete(subjectId) {
  try {
    const prev = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    if (!prev.includes(subjectId)) {
      localStorage.setItem(LS_KEY, JSON.stringify([...prev, subjectId]));
      window.dispatchEvent(new CustomEvent("learnify_progress_update"));
    }
  } catch {}
}

// ── Palette ──────────────────────────────────────────────────────────────────
const NAVY   = "#1E2D72";
const NAVY_D = "#111D4A";
const SALMON = "#C05840";
const SAL_L  = "#E8845C";
const WHITE  = "#FFFFFF";

// ── Pixel unit size ───────────────────────────────────────────────────────────
const S = 3; // px per pixel "cell"

// ── Character box-shadow builder ──────────────────────────────────────────────
// 5 cols × 6 rows → 15 × 18 px at S=3
// Two walk frames toggled by legsApart
function buildCharShadow(legsApart) {
  const px = [
    // Head — navy
    [1,0,NAVY],[2,0,NAVY],[3,0,NAVY],
    [0,1,NAVY],[1,1,NAVY],[2,1,NAVY],[3,1,NAVY],[4,1,NAVY],
    // Scarf — salmon accent
    [1,2,SALMON],[2,2,SALMON],[3,2,SALMON],
    // Lower body — navy
    [1,3,NAVY],[2,3,NAVY],[3,3,NAVY],
    // Legs — alternate frames
    ...(legsApart
      ? [[0,4,NAVY],[4,4,NAVY],[0,5,NAVY],[4,5,NAVY]]  // legs wide
      : [[1,4,NAVY],[3,4,NAVY],[1,5,NAVY],[3,5,NAVY]]  // legs together
    ),
  ];
  return px.map(([c, r, col]) => `${c * S}px ${r * S}px 0 0 ${col}`).join(", ");
}

// ── Pixel cloud ───────────────────────────────────────────────────────────────
// Shape (5×4 grid):   .###. / ##### / ##### / .###.
function PixelCloud({ left, top, cs = 4 }) {
  const pixels = [
    [1,0],[2,0],[3,0],
    [0,1],[1,1],[2,1],[3,1],[4,1],
    [0,2],[1,2],[2,2],[3,2],[4,2],
    [1,3],[2,3],[3,3],
  ];
  const shadow = pixels
    .map(([c, r]) => `${c * cs}px ${r * cs}px 0 0 rgba(255,255,255,0.93)`)
    .join(", ");
  return (
    <div style={{
      position: "absolute", left, top,
      width: cs, height: cs,
      background: "rgba(255,255,255,0.93)",
      boxShadow: shadow,
      imageRendering: "pixelated",
      pointerEvents: "none",
    }} />
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function PixelProgressBar({ completed = [] }) {
  const [legsApart, setLegsApart] = useState(false);

  // Walk cycle
  useEffect(() => {
    const id = setInterval(() => setLegsApart(v => !v), 320);
    return () => clearInterval(id);
  }, []);

  const total    = QUIZ_SUBJECTS.length;
  const count    = QUIZ_SUBJECTS.filter(s => completed.includes(s.id)).length;
  const progress = count / total; // 0 → 1

  // Layout
  const BANNER_H = 120;
  const SKY_H    = 74;
  const CHAR_W   = S * 5; // 15px
  const CHAR_H   = S * 6; // 18px
  const CHAR_TOP = SKY_H - CHAR_H + 3; // sits on ground line

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        @keyframes ppbBob {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-3px); }
        }
      `}</style>

      <div
        role="progressbar"
        aria-valuenow={count}
        aria-valuemax={total}
        aria-label={`${count} of ${total} quizzes completed`}
        style={{
          position: "fixed",
          bottom: 0, left: 0, right: 0,
          height: BANNER_H,
          zIndex: 50,
          overflow: "hidden",
          imageRendering: "pixelated",
          borderTop: `3px solid ${NAVY_D}`,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >

        {/* Sky */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: SKY_H,
          background: `linear-gradient(180deg, ${SAL_L} 0%, #D46B44 100%)`,
        }} />

        {/* Clouds */}
        <PixelCloud left="4%"  top={7}  cs={4} />
        <PixelCloud left="23%" top={3}  cs={3} />
        <PixelCloud left="47%" top={10} cs={4} />
        <PixelCloud left="68%" top={5}  cs={3} />
        <PixelCloud left="86%" top={8}  cs={4} />

        {/* Ground */}
        <div style={{
          position: "absolute",
          top: SKY_H, left: 0, right: 0,
          height: BANNER_H - SKY_H,
          background: NAVY_D,
        }} />

        {/* Ground top edge — chunky 2-row pixel border */}
        <div style={{
          position: "absolute",
          top: SKY_H, left: 0, right: 0,
          height: 4,
          background: NAVY,
        }} />

        {/* Pixel ground bumps along the edge */}
        {[6, 16, 27, 38, 50, 61, 72, 83, 92].map(pct => (
          <div key={pct} style={{
            position: "absolute",
            left: `${pct}%`,
            top: SKY_H - S,
            width: S, height: S,
            background: NAVY,
            boxShadow: `${S}px -${S}px 0 0 ${NAVY}`,
            imageRendering: "pixelated",
            pointerEvents: "none",
          }} />
        ))}

        {/* Path / road dashes on ground */}
        <div style={{
          position: "absolute",
          top: SKY_H + 10,
          left: 0, right: 0,
          height: 8,
          background: `repeating-linear-gradient(
            90deg,
            ${NAVY} 0px, ${NAVY} 12px,
            rgba(255,255,255,0.07) 12px, rgba(255,255,255,0.07) 24px
          )`,
        }} />

        {/* Checkpoints */}
        {QUIZ_SUBJECTS.map((subj, i) => {
          const xPct   = ((i + 1) / (total + 1)) * 100;
          const isDone = completed.includes(subj.id);
          const POLE_TOP = 32;
          const POLE_H   = SKY_H - POLE_TOP - 5;

          return (
            <div key={subj.id} style={{
              position: "absolute",
              left: `${xPct}%`,
              top: 0, height: BANNER_H,
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              pointerEvents: "none",
            }}>
              {/* Subject icon */}
              <span style={{
                position: "absolute", top: 4,
                fontSize: 12, lineHeight: 1,
                filter: isDone ? "none" : "grayscale(1) opacity(0.3)",
                transition: "filter 0.5s ease",
              }}>
                {subj.icon}
              </span>

              {/* Subject label — pixel font */}
              <span style={{
                position: "absolute", top: 20,
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 4,
                lineHeight: 1,
                color: isDone ? WHITE : "rgba(255,255,255,0.28)",
                whiteSpace: "nowrap",
                imageRendering: "pixelated",
                letterSpacing: "0.04em",
                textShadow: isDone ? `1px 1px 0 ${NAVY_D}` : "none",
                transition: "color 0.5s ease",
              }}>
                {subj.label}
              </span>

              {/* Flag pole */}
              <div style={{
                position: "absolute",
                top: POLE_TOP,
                width: 2, height: POLE_H,
                background: isDone ? SALMON : "rgba(255,255,255,0.2)",
                transition: "background 0.5s ease",
              }} />

              {/* Ground pip */}
              <div style={{
                position: "absolute",
                top: SKY_H - 7,
                width: 8, height: 8,
                background: isDone ? SALMON : "rgba(255,255,255,0.12)",
                outline: `2px solid ${isDone ? WHITE : "rgba(255,255,255,0.18)"}`,
                imageRendering: "pixelated",
                transition: "background 0.5s ease, outline 0.5s ease",
              }} />
            </div>
          );
        })}

        {/* Pixel character */}
        <div style={{
          position: "absolute",
          top: CHAR_TOP,
          left: `calc(${4 + progress * 88}% - ${CHAR_W / 2}px)`,
          width: CHAR_W,
          height: CHAR_H,
          transition: "left 1s cubic-bezier(0.4, 0, 0.2, 1)",
          imageRendering: "pixelated",
          pointerEvents: "none",
          animation: "ppbBob 0.48s ease-in-out infinite",
        }}>
          {/* Base 1-cell div — full character drawn via box-shadow */}
          <div style={{
            width: S, height: S,
            background: "transparent",
            boxShadow: buildCharShadow(legsApart),
            imageRendering: "pixelated",
          }} />
        </div>

      </div>
    </>
  );
}
