import { P, SUBJECTS } from "../constants";
import { FontLink, GlobalStyles } from "../GlobalStyles";
import Logo from "../components/Logo";

// ── Per-subject card metadata ─────────────────────────────────────────────────
const CARD_META = {
  geography: {
    title:      "World Geography",
    desc:       "Capitals, continents, and landmarks — test your global knowledge.",
    difficulty: "Bet You Can't",
  },
  math: {
    title:      "Number Cruncher",
    desc:       "Arithmetic, algebra, and mental math — crunch the numbers.",
    difficulty: "Too Hard For You",
  },
  logic: {
    title:      "Brain Teasers",
    desc:       "Sequences, deductions, and patterns — sharpen your reasoning.",
    difficulty: "Think You Can?",
  },
  science: {
    title:      "Science Facts",
    desc:       "Chemistry, physics, and biology — how well do you know science?",
    difficulty: "Prove It Then",
  },
  history: {
    title:      "Through the Ages",
    desc:       "Wars, empires, and milestones — journey through human history.",
    difficulty: "Dare You Try",
  },
  language: {
    title:      "Word Mastery",
    desc:       "Grammar, vocabulary, and spelling — are you a word wizard?",
    difficulty: "Easy Win... Right?",
    isNew:      true,
  },
};

function getDiffStyle(difficulty) {
  const d = difficulty.toLowerCase();
  if (d.includes("easy") || d.includes("prove") || d.includes("win"))
    return { bg: P.salmon, color: P.navy };
  if (d.includes("hard") || d.includes("dare") || d.includes("too"))
    return { bg: "#111D4A", color: P.salmon };
  return { bg: "rgba(232,132,92,0.18)", color: P.salmon };
}

// ── Quiz card ─────────────────────────────────────────────────────────────────
function QuizCard({ subj, onClick, completed }) {
  const meta = CARD_META[subj.id];
  const diff = getDiffStyle(meta.difficulty);
  const isDone = completed.includes(subj.id);

  return (
    <div
      data-course={subj.id}
      onClick={onClick}
      style={{
        borderRadius: 18,
        overflow: "hidden",
        background: "#1a2454",
        boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.22s ease, box-shadow 0.22s ease",
        position: "relative",
        border: isDone ? `2px solid ${P.salmon}` : "2px solid transparent",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = `0 14px 40px rgba(0,0,0,0.5), 0 0 0 2px ${P.salmon}55`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.35)";
      }}
    >
      {/* NEW! badge */}
      {meta.isNew && (
        <div style={{
          position: "absolute", top: 14, right: 14, zIndex: 10,
          background: P.salmon, color: P.navy,
          fontSize: 11, fontWeight: 800, fontFamily: "'Poppins', sans-serif",
          letterSpacing: "0.08em", textTransform: "uppercase",
          padding: "4px 10px", borderRadius: 100,
          boxShadow: `0 2px 10px rgba(232,132,92,0.5)`,
        }}>
          NEW!
        </div>
      )}

      {/* Completed badge */}
      {isDone && (
        <div style={{
          position: "absolute", top: 14, left: 14, zIndex: 10,
          background: "#22c55e", color: "#fff",
          fontSize: 11, fontWeight: 800, fontFamily: "'Poppins', sans-serif",
          letterSpacing: "0.06em",
          padding: "4px 10px", borderRadius: 100,
        }}>
          ✓ 100%
        </div>
      )}

      {/* Image placeholder area */}
      <div style={{
        height: 148,
        background: `linear-gradient(160deg, #111D4A 0%, #1E2D72 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        {/* Subtle background circle for depth */}
        <div style={{
          position: "absolute",
          width: 110, height: 110, borderRadius: "50%",
          background: `rgba(232,132,92,0.08)`,
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
        }} />
        <span style={{ fontSize: 52, position: "relative", zIndex: 1, userSelect: "none" }}>
          {subj.icon}
        </span>
      </div>

      {/* Card body */}
      <div style={{
        padding: "18px 20px 20px",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}>
        {/* Quiz label */}
        <p style={{
          margin: "0 0 6px",
          fontSize: 10, fontWeight: 700,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: P.salmon, opacity: 0.8,
          fontFamily: "'Poppins', sans-serif",
        }}>
          QUIZ · {subj.label.toUpperCase()}
        </p>

        {/* Title */}
        <h3 style={{
          margin: "0 0 8px",
          fontSize: 17, fontWeight: 700,
          color: "#ffffff",
          fontFamily: "'Poppins', sans-serif",
          lineHeight: 1.3,
        }}>
          {meta.title}
        </h3>

        {/* Description */}
        <p style={{
          margin: "0 0 16px",
          fontSize: 13, lineHeight: 1.6,
          color: "rgba(255,255,255,0.5)",
          fontFamily: "'Poppins', sans-serif",
          flex: 1,
        }}>
          {meta.desc}
        </p>

        {/* Footer row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}>
          {/* Difficulty pill */}
          <span style={{
            background: diff.bg,
            color: diff.color,
            fontSize: 11, fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "0.05em",
            padding: "4px 12px",
            borderRadius: 100,
          }}>
            {meta.difficulty}
          </span>

          {/* Question count */}
          <span style={{
            fontSize: 11, fontWeight: 600,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'Poppins', sans-serif",
          }}>
            10 questions
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Page 2 — Quiz Menu ────────────────────────────────────────────────────────
export default function MenuScreen({ visible, goLanding, startQuiz, completed }) {
  const fadeStyle = {
    opacity:        visible ? 1 : 0,
    transform:      visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.98)",
    transition:     "opacity 0.3s ease, transform 0.3s ease",
    pointerEvents:  visible ? "auto" : "none",
    width: "100%",
    minHeight: "100vh",
    fontFamily: "'Poppins', sans-serif",
  };

  return (
    <div style={{ ...fadeStyle, background: "#131d4f" }}>
      <FontLink />
      <GlobalStyles />

      {/* ── Navbar ── */}
      <nav style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 clamp(20px,4vw,48px)",
        height: 68,
        borderBottom: "1px solid rgba(232,132,92,0.12)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(19,29,79,0.92)",
        backdropFilter: "blur(12px)",
      }}>
        {/* Back button */}
        <button
          onClick={goLanding}
          style={{
            display: "flex", alignItems: "center", gap: 7,
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(232,132,92,0.75)",
            fontSize: 14, fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
            padding: "6px 0",
            transition: "color 0.18s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = P.salmon; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(232,132,92,0.75)"; }}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="2.4"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>

        {/* Logo */}
        <Logo size={20} light />

        {/* Right spacer (matches back button width visually) */}
        <div style={{ width: 56 }} />
      </nav>

      {/* ── Page body ── */}
      <div style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding: "52px clamp(20px,4vw,48px) 80px",
      }}>
        {/* Heading */}
        <div style={{ marginBottom: 48 }}>
          <h1 style={{
            margin: "0 0 10px",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(28px,4vw,46px)",
            color: "#ffffff",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}>
            Choose Your Quiz
          </h1>
          <p style={{
            margin: 0,
            fontSize: "clamp(13px,1.2vw,15px)",
            color: "rgba(255,255,255,0.45)",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
          }}>
            Pick a subject and prove you&apos;re TooGood — score 100% to earn its book.
          </p>
        </div>

        {/* Card grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {SUBJECTS.map(subj => (
            <QuizCard
              key={subj.id}
              subj={subj}
              onClick={() => startQuiz(subj)}
              completed={completed}
            />
          ))}
        </div>

        {/* Bookshelf teaser */}
        {completed.length > 0 && (
          <div style={{
            marginTop: 56,
            padding: "22px 28px",
            borderRadius: 16,
            background: "rgba(232,132,92,0.08)",
            border: `1px solid rgba(232,132,92,0.2)`,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}>
            <span style={{ fontSize: 28 }}>📚</span>
            <div>
              <p style={{
                margin: 0, fontWeight: 700, fontSize: 14,
                color: P.salmon, fontFamily: "'Poppins', sans-serif",
              }}>
                {completed.length} of {SUBJECTS.length} books earned
              </p>
              <p style={{
                margin: "2px 0 0", fontSize: 12,
                color: "rgba(232,132,92,0.55)", fontFamily: "'Poppins', sans-serif",
              }}>
                Score 100% on every quiz to fill your shelf.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
