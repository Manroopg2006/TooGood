import { P, SUBJECTS } from "../constants";
import { FontLink, GlobalStyles } from "../GlobalStyles";
import geographyImg from "../assets/geography.png";
import numbersImg from "../assets/numbers.png";
import logicImg from "../assets/logic.png";
import readingImg from "../assets/reading.png";
import historyImg from "../assets/history.png";
import scienceImg from "../assets/science.png";

const CARD_IMAGES = {
  geography: geographyImg,
  math:      numbersImg,
  logic:     logicImg,
  language:  readingImg,
  history:   historyImg,
  science:   scienceImg,
};

// ── Per-subject card metadata ─────────────────────────────────────────────────
const CARD_META = {
  geography: { title: "World Geography", desc: "Capitals, continents, and landmarks — test your global knowledge.", difficulty: "Bet You Can't" },
  math:      { title: "Number Cruncher",  desc: "Arithmetic, algebra, and mental math — crunch the numbers.",         difficulty: "Too Hard For You" },
  logic:     { title: "Brain Teasers",    desc: "Sequences, deductions, and patterns — sharpen your reasoning.",      difficulty: "Think You Can?" },
  science:   { title: "Science Facts",    desc: "Chemistry, physics, and biology — how well do you know science?",    difficulty: "Prove It Then" },
  history:   { title: "Through the Ages", desc: "Wars, empires, and milestones — journey through human history.",     difficulty: "Dare You Try" },
  language:  { title: "Word Mastery",     desc: "Grammar, vocabulary, and spelling — are you a word wizard?",         difficulty: "Easy Win... Right?", isNew: true },
};

function getDiffStyle(difficulty) {
  const d = difficulty.toLowerCase();
  if (d.includes("easy") || d.includes("prove") || d.includes("win"))
    return { bg: P.salmon, color: P.navy };
  if (d.includes("hard") || d.includes("dare") || d.includes("too"))
    return { bg: "#111D4A", color: P.salmon };
  return { bg: "rgba(232,132,92,0.18)", color: P.salmon };
}

// ── Quiz card (inline) ────────────────────────────────────────────────────────
function QuizCard({ subj, onClick, completed }) {
  const meta  = CARD_META[subj.id];
  const diff  = getDiffStyle(meta.difficulty);
  const isDone = completed.includes(subj.id);

  return (
    <div
      data-course={subj.id}
      onClick={onClick}
      style={{
        borderRadius: 18, overflow: "hidden",
        background: "#1a2454",
        boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
        cursor: "pointer",
        display: "flex", flexDirection: "column",
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
      {meta.isNew && (
        <div style={{
          position: "absolute", top: 14, right: 14, zIndex: 10,
          background: P.salmon, color: P.navy,
          fontSize: 11, fontWeight: 800, fontFamily: "'Poppins', sans-serif",
          letterSpacing: "0.08em", textTransform: "uppercase",
          padding: "4px 10px", borderRadius: 100,
          boxShadow: `0 2px 10px rgba(232,132,92,0.5)`,
        }}>NEW!</div>
      )}
      {isDone && (
        <div style={{
          position: "absolute", top: 14, left: 14, zIndex: 10,
          background: "#22c55e", color: "#fff",
          fontSize: 11, fontWeight: 800, fontFamily: "'Poppins', sans-serif",
          letterSpacing: "0.06em", padding: "4px 10px", borderRadius: 100,
        }}>✓ 100%</div>
      )}

      <div style={{
        height: 148,
        background: `linear-gradient(160deg, #111D4A 0%, #1E2D72 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden", flexShrink: 0,
      }}>
        {CARD_IMAGES[subj.id] ? (
          <img
            src={CARD_IMAGES[subj.id]}
            alt={subj.label}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <>
            <div style={{
              position: "absolute", width: 110, height: 110, borderRadius: "50%",
              background: `rgba(232,132,92,0.08)`, top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
            }} />
            <span style={{ fontSize: 52, position: "relative", zIndex: 1, userSelect: "none" }}>
              {subj.icon}
            </span>
          </>
        )}
      </div>

      <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
        <p style={{
          margin: "0 0 6px", fontSize: 10, fontWeight: 700,
          letterSpacing: "0.14em", textTransform: "uppercase",
          color: P.salmon, opacity: 0.8, fontFamily: "'Poppins', sans-serif",
        }}>QUIZ · {subj.label.toUpperCase()}</p>
        <h3 style={{
          margin: "0 0 8px", fontSize: 17, fontWeight: 700,
          color: "#ffffff", fontFamily: "'Poppins', sans-serif", lineHeight: 1.3,
        }}>{meta.title}</h3>
        <p style={{
          margin: "0 0 16px", fontSize: 13, lineHeight: 1.6,
          color: "rgba(255,255,255,0.5)", fontFamily: "'Poppins', sans-serif", flex: 1,
        }}>{meta.desc}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <span style={{
            background: diff.bg, color: diff.color,
            fontSize: 11, fontWeight: 700, fontFamily: "'Poppins', sans-serif",
            letterSpacing: "0.05em", padding: "4px 12px", borderRadius: 100,
          }}>{meta.difficulty}</span>
          <span style={{
            fontSize: 11, fontWeight: 600,
            color: "rgba(255,255,255,0.4)", fontFamily: "'Poppins', sans-serif",
          }}>10 questions</span>
        </div>
      </div>
    </div>
  );
}

// ── Mascot SVG ────────────────────────────────────────────────────────────────
function TooGoodMascot() {
  return (
    <svg
      viewBox="0 0 300 300"
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden="true"
    >
      <defs>
        <clipPath id="tg-left-lens">
          <circle cx="92" cy="126" r="51" />
        </clipPath>
        <clipPath id="tg-right-lens">
          <circle cx="208" cy="126" r="51" />
        </clipPath>
      </defs>

      {/* Face */}
      <circle cx="150" cy="150" r="145" fill={P.navy} />

      {/* Left lens frame */}
      <circle cx="92" cy="126" r="53" fill={P.navy} stroke={P.salmon} strokeWidth="5" />

      {/* Left lens diagonal stripes (~40°) */}
      <g clipPath="url(#tg-left-lens)">
        {[-3,-2,-1,0,1,2,3,4,5].map(i => (
          <line
            key={i}
            x1={26 + i * 20} y1="72"
            x2={26 + i * 20 + 90} y2="180"
            stroke={P.salmon} strokeWidth="7.5" strokeLinecap="round"
          />
        ))}
      </g>

      {/* Right lens frame */}
      <circle cx="208" cy="126" r="53" fill={P.navy} stroke={P.salmon} strokeWidth="5" />

      {/* Right lens diagonal stripes (~40°) */}
      <g clipPath="url(#tg-right-lens)">
        {[-3,-2,-1,0,1,2,3,4,5].map(i => (
          <line
            key={i}
            x1={142 + i * 20} y1="72"
            x2={142 + i * 20 + 90} y2="180"
            stroke={P.salmon} strokeWidth="7.5" strokeLinecap="round"
          />
        ))}
      </g>

      {/* Bridge */}
      <line x1="145" y1="116" x2="155" y2="116" stroke={P.salmon} strokeWidth="5.5" strokeLinecap="round" />

      {/* Left temple arm */}
      <line x1="39" y1="117" x2="15" y2="112" stroke={P.salmon} strokeWidth="5" strokeLinecap="round" />

      {/* Right temple arm */}
      <line x1="261" y1="117" x2="285" y2="112" stroke={P.salmon} strokeWidth="5" strokeLinecap="round" />

      {/* Smirk */}
      <path
        d="M 108 198 Q 152 218 192 196"
        stroke={P.salmon} strokeWidth="6" fill="none" strokeLinecap="round"
      />
    </svg>
  );
}

// ── Combined Landing + Menu Page ──────────────────────────────────────────────
export default function LandingScreen({ visible, goMenu, startQuiz, completed = [] }) {
  const fadeStyle = {
    opacity:       visible ? 1 : 0,
    transform:     visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.98)",
    transition:    "opacity 0.3s ease, transform 0.3s ease",
    pointerEvents: visible ? "auto" : "none",
    width: "100%",
    fontFamily: "'Poppins', sans-serif",
  };

  const scrollToMenu = () => {
    document.getElementById("quiz-menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ ...fadeStyle }}>
      <FontLink />
      <GlobalStyles />

      {/* ── Hero section ── */}
      <div style={{ background: P.salmon, position: "relative", overflow: "hidden", minHeight: "100vh" }}>

        {/* Floating background shapes */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
          <div style={{
            position: "absolute", top: "-8%", right: "-6%",
            width: "min(400px,52vw)", height: "min(400px,52vw)", borderRadius: "50%",
            background: P.navyDark, opacity: 0.20,
            animation: "bgFloat1 13s ease-in-out infinite alternate",
          }} />
          <div style={{
            position: "absolute", top: "18%", left: "-70px", width: 230, height: 88, borderRadius: "100px",
            background: P.navy, opacity: 0.18,
            animation: "bgFloat2 9s ease-in-out infinite alternate", animationDelay: "2.2s",
          }} />
          <div style={{
            position: "absolute", top: "9%", left: "42%", width: 72, height: 72, borderRadius: "50%",
            background: P.navyLight, opacity: 0.22,
            animation: "bgFloat3 7s ease-in-out infinite alternate", animationDelay: "1s",
          }} />
          <div style={{
            position: "absolute", bottom: "12%", left: "8%", width: 148, height: 50, borderRadius: "100px",
            background: P.navy, opacity: 0.17,
            animation: "bgFloat5 11s ease-in-out infinite alternate", animationDelay: "3.5s",
          }} />
          <div style={{
            position: "absolute", top: "55%", left: "55%", width: 64, height: 64, borderRadius: "50%",
            background: P.navyLight, opacity: 0.24,
            animation: "bgFloat6 19s ease-in-out infinite alternate", animationDelay: "4.5s",
          }} />
          <div style={{
            position: "absolute", top: "20%", left: "52%", width: 140, height: 130,
            borderRadius: "63% 37% 54% 46% / 55% 48% 52% 45%",
            background: P.navy, opacity: 0.15,
            animation: "bgFloat7 23s ease-in-out infinite alternate", animationDelay: "1.8s",
          }} />
          <div style={{
            position: "absolute", bottom: "8%", right: "8%",
            width: "min(100px,13vw)", height: "min(100px,13vw)", borderRadius: "50%",
            background: P.navyLight, opacity: 0.18,
            animation: "floatSmallSphere 6s ease-in-out infinite alternate", animationDelay: "3s",
          }} />
        </div>

        {/* Hero content */}
        <div style={{
          position: "relative", zIndex: 1,
          minHeight: "100vh",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "40px 6vw",
        }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "clamp(32px, 5vw, 72px)", flexWrap: "wrap",
            maxWidth: 1100, width: "100%",
          }}>
            {/* Mascot */}
            <div style={{
              width: "clamp(200px, 30vw, 340px)",
              height: "clamp(200px, 30vw, 340px)",
              flexShrink: 0,
            }}>
              <TooGoodMascot />
            </div>

            {/* Text + CTA */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <h1 style={{
                margin: 0,
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 900,
                fontSize: "clamp(56px, 9vw, 112px)",
                color: P.navy, lineHeight: 1, letterSpacing: "-0.03em", userSelect: "none",
              }}>TooGood?</h1>

              <p style={{
                margin: "10px 0 0",
                fontFamily: "'Poppins', sans-serif",
                fontStyle: "italic", fontWeight: 500,
                fontSize: "clamp(18px, 2.6vw, 32px)",
                color: P.navy, opacity: 0.75, letterSpacing: "0.01em",
              }}>Prove It!</p>

              <button
                onClick={scrollToMenu}
                style={{
                  marginTop: "clamp(28px, 4vw, 48px)",
                  background: P.navy, color: P.white,
                  border: "none", borderRadius: 100,
                  padding: "16px 52px",
                  fontSize: "clamp(14px, 1.4vw, 17px)",
                  fontWeight: 700, fontFamily: "'Poppins', sans-serif",
                  cursor: "pointer", letterSpacing: "0.05em",
                  boxShadow: `0 8px 28px rgba(30,45,114,0.35)`,
                  transition: "background 0.22s, transform 0.18s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = P.salmonDark;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = P.navy;
                  e.currentTarget.style.transform = "";
                }}
              >Get Started</button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quiz Menu section ── */}
      <div id="quiz-menu" style={{ background: "#131d4f", minHeight: "100vh" }}>
        {/* Navbar */}
        <nav style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 clamp(20px,4vw,48px)", height: 68,
          borderBottom: "1px solid rgba(232,132,92,0.12)",
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(19,29,79,0.92)", backdropFilter: "blur(12px)",
        }}>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              background: "none", border: "none", cursor: "pointer",
              color: "rgba(232,132,92,0.75)",
              fontSize: 14, fontWeight: 700, fontFamily: "'Poppins', sans-serif",
              padding: "6px 0", transition: "color 0.18s",
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

          <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1,
            fontFamily: "'Poppins', sans-serif" }}>
            <span style={{ color: P.salmon }}>Too</span>
            <span style={{ color: P.salmonDark }}>Good?</span>
          </div>

          <div style={{ width: 56 }} />
        </nav>

        {/* Body */}
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "52px clamp(20px,4vw,48px) 80px" }}>
          <div style={{ marginBottom: 48 }}>
            <h1 style={{
              margin: "0 0 10px",
              fontFamily: "'Poppins', sans-serif", fontWeight: 900,
              fontSize: "clamp(28px,4vw,46px)", color: "#ffffff",
              letterSpacing: "-0.02em", lineHeight: 1.1,
            }}>Choose Your Quiz</h1>
            <p style={{
              margin: 0, fontSize: "clamp(13px,1.2vw,15px)",
              color: "rgba(255,255,255,0.45)", fontFamily: "'Poppins', sans-serif", fontWeight: 400,
            }}>Pick a subject and prove you&apos;re TooGood — score 100% to earn its book.</p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 24,
          }}>
            {SUBJECTS.map(subj => (
              <QuizCard
                key={subj.id}
                subj={subj}
                onClick={() => startQuiz?.(subj)}
                completed={completed}
              />
            ))}
          </div>

          {completed.length > 0 && (
            <div style={{
              marginTop: 56, padding: "22px 28px", borderRadius: 16,
              background: "rgba(232,132,92,0.08)", border: `1px solid rgba(232,132,92,0.2)`,
              display: "flex", alignItems: "center", gap: 16,
            }}>
              <span style={{ fontSize: 28 }}>📚</span>
              <div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: P.salmon, fontFamily: "'Poppins', sans-serif" }}>
                  {completed.length} of {SUBJECTS.length} books earned
                </p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "rgba(232,132,92,0.55)", fontFamily: "'Poppins', sans-serif" }}>
                  Score 100% on every quiz to fill your shelf.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
