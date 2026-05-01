import { P, OPTION_LABELS } from "../constants";
import { FontLink, GlobalStyles } from "../GlobalStyles";
import BackBtn from "../components/BackBtn";

export default function QuizScreen({ visible, subject, qIndex, selected, score, questions, handleAnswer, goMenu }) {
  const fadeStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.98)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
    pointerEvents: visible ? "auto" : "none",
    width: "100%", minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
  };

  const current = questions[qIndex];
  const total   = questions.length;

  return (
    <div style={{ ...fadeStyle, background: P.salmon, display: "flex", flexDirection: "column" }}>
      <FontLink />
      <GlobalStyles />

      {/* Top bar */}
      <div style={{ padding: "22px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <BackBtn onClick={goMenu} label="Exit" />
        <div style={{
          background: P.navy, borderRadius: 100, padding: "6px 16px",
          display: "flex", alignItems: "center", gap: 6,
          fontSize: 13, fontWeight: 700, color: P.salmon,
        }}>
          <span>{subject.icon}</span><span>{subject.label}</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: P.navy, opacity: 0.65 }}>
          {qIndex + 1} / {total}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ padding: "14px 24px 0" }}>
        <div style={{ height: 6, background: P.salmonDark, borderRadius: 100, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${((qIndex + 1) / total) * 100}%`,
            background: P.navy, borderRadius: 100,
            transition: "width 0.45s ease",
          }} />
        </div>
      </div>

      {/* Question */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "24px 24px 28px" }}>
        <div style={{
          background: P.navy, borderRadius: 20, padding: "26px 22px", marginBottom: 22,
          boxShadow: `0 4px 20px rgba(30,45,114,0.25)`,
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: P.salmon,
            textTransform: "uppercase", letterSpacing: "0.09em", margin: "0 0 10px", opacity: 0.85 }}>
            Question {qIndex + 1}
          </p>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: P.white, margin: 0, lineHeight: 1.4,
            fontFamily: "'Poppins', sans-serif" }}>
            {current.q}
          </h2>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {current.opts.map((opt, i) => {
            const isCorrect  = i === current.ans;
            const isSelected = i === selected;
            const revealed   = selected !== null;
            let bg     = P.white;
            let color  = P.navy;
            let border = `2px solid ${P.salmonDark}`;
            let badgeBg = P.salmon, badgeC = P.navy, badgeTx = OPTION_LABELS[i];

            if (revealed) {
              if (isCorrect)       { bg = "#E8F5E0"; color = "#2A6A18"; border = "2px solid #5A9A30"; badgeBg = "#5A9A30"; badgeC = P.white; badgeTx = "✓"; }
              else if (isSelected) { bg = "#F5E0E0"; color = "#8B1A1A"; border = "2px solid #B04040"; badgeBg = "#B04040"; badgeC = P.white; badgeTx = "✗"; }
            }

            return (
              <button key={i} onClick={() => handleAnswer(i)} disabled={revealed}
                style={{
                  background: bg, color, border, borderRadius: 16,
                  padding: "15px 18px", display: "flex", alignItems: "center", gap: 14,
                  cursor: revealed ? "default" : "pointer",
                  fontFamily: "inherit", fontWeight: 600, fontSize: 16, textAlign: "left",
                  boxShadow: `0 2px 8px rgba(30,45,114,0.10)`,
                  transition: "transform 0.12s, box-shadow 0.12s",
                }}
                onMouseEnter={e => { if (!revealed) { e.currentTarget.style.transform = "translateX(5px)"; e.currentTarget.style.boxShadow = `0 4px 18px rgba(30,45,114,0.18)`; }}}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 2px 8px rgba(30,45,114,0.10)`; }}
              >
                <span style={{
                  minWidth: 32, height: 32, borderRadius: "50%",
                  background: badgeBg, color: badgeC,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 13, flexShrink: 0,
                  transition: "background 0.22s, color 0.22s",
                }}>{badgeTx}</span>
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
