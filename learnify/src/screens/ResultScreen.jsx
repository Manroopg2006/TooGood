import { P, QUESTIONS } from "../constants";
import { FontLink, GlobalStyles } from "../GlobalStyles";

export default function ResultScreen({ visible, subject, score, onPlayAgain, onBackToMenu }) {
  const fadeStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.98)",
    transition: "opacity 0.32s ease, transform 0.32s ease",
    width: "100%", minHeight: "100vh",
    fontFamily: "'Outfit', 'Inter', sans-serif",
  };

  const total = QUESTIONS[subject.id].length;
  const pct   = score / total;
  const stars = pct === 1 ? 3 : pct >= 0.67 ? 2 : pct > 0 ? 1 : 0;
  const msg   = pct === 1 ? "Perfect Score!" : pct >= 0.67 ? "Great Job!" : pct > 0 ? "Keep Practicing!" : "Don't Give Up!";

  return (
    <div style={{
      ...fadeStyle,
      background: `radial-gradient(ellipse at 50% 30%, ${subject.bg} 0%, ${P.parchment} 65%)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <FontLink />
      <GlobalStyles />

      <div style={{
        background: P.cream, borderRadius: 28, padding: "40px 36px",
        textAlign: "center",
        boxShadow: `0 16px 56px rgba(92,61,17,0.14), 0 0 0 1px rgba(201,168,76,0.3)`,
        maxWidth: 360, width: "100%", animation: "popIn 0.45s ease both",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: subject.bg, borderRadius: 100, padding: "6px 18px",
          fontSize: 13, fontWeight: 700, color: subject.accent, marginBottom: 28,
        }}>
          {subject.icon} {subject.label}
        </div>

        <div style={{ fontSize: 36, marginBottom: 16, letterSpacing: 4 }}>
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} style={{ opacity: i < stars ? 1 : 0.18, color: P.gold }}>★</span>
          ))}
        </div>

        <div style={{ fontSize: 68, fontWeight: 900, color: subject.accent, lineHeight: 1, marginBottom: 6,
          fontFamily: "'Playfair Display', Georgia, serif" }}>
          {score}
          <span style={{ fontSize: 28, color: P.brownMuted, fontWeight: 600 }}>/{total}</span>
        </div>

        <p style={{ fontSize: 20, fontWeight: 700, color: P.brown, margin: "0 0 32px",
          fontFamily: "'Playfair Display', Georgia, serif" }}>
          {msg}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button
            onClick={onPlayAgain}
            style={{
              background: subject.accent, color: P.white, border: "none", borderRadius: 100,
              padding: "15px 0", fontSize: 16, fontWeight: 700,
              fontFamily: "inherit", cursor: "pointer", width: "100%",
              boxShadow: `0 6px 22px ${subject.accent}55`,
              transition: "transform 0.14s, box-shadow 0.14s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
          >
            Play Again
          </button>
          <button
            onClick={onBackToMenu}
            style={{
              background: P.parchmentDark, color: P.brown, border: "none", borderRadius: 100,
              padding: "15px 0", fontSize: 16, fontWeight: 700,
              fontFamily: "inherit", cursor: "pointer", width: "100%",
              transition: "transform 0.14s, background 0.14s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = P.paper; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.background = P.parchmentDark; }}
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
}
