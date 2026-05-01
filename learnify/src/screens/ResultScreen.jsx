import { useState } from "react";
import { P } from "../constants";
import { FontLink, GlobalStyles } from "../GlobalStyles";
import QuestionSubmitModal from "../components/QuestionSubmitModal";

export default function ResultScreen({ visible, subject, score, total, onPlayAgain, onBackToMenu }) {
  const [showSubmit, setShowSubmit] = useState(false);

  const fadeStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.98)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
    pointerEvents: visible ? "auto" : "none",
    width: "100%", minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
  };

  const pct   = score / total;
  const stars = pct === 1 ? 3 : pct >= 0.67 ? 2 : pct > 0 ? 1 : 0;
  const msg   = pct === 1 ? "Perfect Score!" : pct >= 0.67 ? "Great Job!" : pct > 0 ? "Keep Practicing!" : "Don't Give Up!";

  return (
    <div style={{
      ...fadeStyle,
      background: P.navy,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <FontLink />
      <GlobalStyles />

      <div style={{
        background: P.salmon, borderRadius: 28, padding: "40px 36px",
        textAlign: "center",
        boxShadow: `0 16px 56px rgba(17,29,74,0.45), 0 0 0 2px rgba(192,88,64,0.4)`,
        maxWidth: 360, width: "100%", animation: "popIn 0.45s ease both",
      }}>
        {/* Subject badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: P.navy, borderRadius: 100, padding: "6px 18px",
          fontSize: 13, fontWeight: 700, color: P.salmon, marginBottom: 28,
        }}>
          {subject.icon} {subject.label}
        </div>

        {/* Stars */}
        <div style={{ fontSize: 36, marginBottom: 16, letterSpacing: 4 }}>
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} style={{ opacity: i < stars ? 1 : 0.18, color: P.navy }}>★</span>
          ))}
        </div>

        {/* Score */}
        <div style={{ fontSize: 68, fontWeight: 900, color: P.navy, lineHeight: 1, marginBottom: 6,
          fontFamily: "'Poppins', sans-serif" }}>
          {score}
          <span style={{ fontSize: 28, color: P.navyDark, fontWeight: 600, opacity: 0.65 }}>/{total}</span>
        </div>

        <p style={{ fontSize: 20, fontWeight: 800, color: P.navy, margin: "0 0 32px",
          fontFamily: "'Poppins', sans-serif" }}>
          {msg}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button
            onClick={onPlayAgain}
            style={{
              background: P.navy, color: P.white, border: "none", borderRadius: 100,
              padding: "15px 0", fontSize: 16, fontWeight: 700,
              fontFamily: "inherit", cursor: "pointer", width: "100%",
              boxShadow: `0 6px 22px rgba(30,45,114,0.35)`,
              transition: "transform 0.14s, background 0.14s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = P.navyLight; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.background = P.navy; }}
          >
            Play Again
          </button>

          <button
            onClick={onBackToMenu}
            style={{
              background: P.salmonDark, color: P.navy, border: "none", borderRadius: 100,
              padding: "15px 0", fontSize: 16, fontWeight: 700,
              fontFamily: "inherit", cursor: "pointer", width: "100%",
              transition: "transform 0.14s, background 0.14s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = P.paper; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.background = P.salmonDark; }}
          >
            Back to Menu
          </button>

          {/* Only shown on perfect score */}
          {pct === 1 && (
            <button
              onClick={() => setShowSubmit(true)}
              style={{
                background: "transparent", color: P.navy,
                border: `2px solid ${P.navy}`, borderRadius: 100,
                padding: "13px 0", fontSize: 15, fontWeight: 700,
                fontFamily: "inherit", cursor: "pointer", width: "100%",
                transition: "transform 0.14s, background 0.14s, color 0.14s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.background = P.navy;
                e.currentTarget.style.color = P.salmon;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = P.navy;
              }}
            >
              🌟 Submit a Question
            </button>
          )}
        </div>
      </div>

      {showSubmit && (
        <QuestionSubmitModal onClose={() => setShowSubmit(false)} />
      )}
    </div>
  );
}