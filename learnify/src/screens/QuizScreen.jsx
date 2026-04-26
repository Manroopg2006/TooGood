import { P, QUESTIONS, OPTION_LABELS } from "../constants";
import { FontLink, GlobalStyles } from "../GlobalStyles";
import BackBtn from "../components/BackBtn";

export default function QuizScreen({ visible, subject, qIndex, selected, score, handleAnswer, goMenu }) {
  const fadeStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.98)",
    transition: "opacity 0.32s ease, transform 0.32s ease",
    width: "100%", minHeight: "100vh",
    fontFamily: "'Outfit', 'Inter', sans-serif",
  };

  const questions = QUESTIONS[subject.id];
  const current   = questions[qIndex];
  const total     = questions.length;

  return (
    <div style={{ ...fadeStyle, background: P.parchmentLight, display: "flex", flexDirection: "column" }}>
      <FontLink />
      <GlobalStyles />

      {/* Top bar */}
      <div style={{ padding: "22px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <BackBtn onClick={goMenu} label="Exit" />
        <div style={{
          background: subject.bg, borderRadius: 100, padding: "6px 16px",
          display: "flex", alignItems: "center", gap: 6,
          fontSize: 13, fontWeight: 700, color: subject.accent,
        }}>
          <span>{subject.icon}</span><span>{subject.label}</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: P.brownMuted }}>
          {qIndex + 1} / {total}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ padding: "14px 24px 0" }}>
        <div style={{ height: 6, background: P.parchmentDark, borderRadius: 100, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${((qIndex + 1) / total) * 100}%`,
            background: subject.accent, borderRadius: 100,
            transition: "width 0.45s ease",
          }} />
        </div>
      </div>

      {/* Question */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "24px 24px 28px" }}>
        <div style={{
          background: subject.bg, borderRadius: 20, padding: "26px 22px", marginBottom: 22,
          boxShadow: `0 4px 16px rgba(92,61,17,0.1)`,
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: subject.accent,
            textTransform: "uppercase", letterSpacing: "0.09em", margin: "0 0 10px" }}>
            Question {qIndex + 1}
          </p>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: P.brown, margin: 0, lineHeight: 1.4,
            fontFamily: "'Playfair Display', Georgia, serif" }}>
            {current.q}
          </h2>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {current.opts.map((opt, i) => {
            const isCorrect  = i === current.ans;
            const isSelected = i === selected;
            const revealed   = selected !== null;
            let bg     = P.cream;
            let color  = P.brown;
            let border = `2px solid ${P.parchmentDark}`;
            let badgeBg = subject.bg, badgeC = subject.accent, badgeTx = OPTION_LABELS[i];

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
                  boxShadow: `0 2px 8px rgba(92,61,17,0.07)`,
                  transition: "transform 0.12s, box-shadow 0.12s, background 0.22s, border 0.22s",
                }}
                onMouseEnter={e => { if (!revealed) { e.currentTarget.style.transform = "translateX(5px)"; e.currentTarget.style.boxShadow = `0 4px 18px rgba(92,61,17,0.13)`; }}}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 2px 8px rgba(92,61,17,0.07)`; }}
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
