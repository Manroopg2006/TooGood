import { P, SUBJECTS } from "../constants";
import EarthImage from "../assets/EarthImage.jpg";
import { FontLink, GlobalStyles } from "../GlobalStyles";
import BackBtn from "../components/BackBtn";
import Logo from "../components/Logo";
import SubjectRow from "../components/SubjectRow";
import BookPile from "../components/BookPile";
import MenuFloatingBg from "../components/MenuFloatingBg";


export default function MenuScreen({
  visible, goLanding, hoveredSubjectId, setHoveredSubjectId, startQuiz, completed,
}) {
  const fadeStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.98)",
    transition: "opacity 0.32s ease, transform 0.32s ease",
    width: "100%", minHeight: "100vh",
    fontFamily: "'Outfit', 'Inter', sans-serif",
  };

  const hovered = SUBJECTS.find(s => s.id === hoveredSubjectId);
  const isGeography = hoveredSubjectId === "geography";
  const leftBg  = isGeography
    ? `url(${EarthImage}) center/cover no-repeat`
    : hovered ? hovered.panelBg : P.parchment;
  const headCol = hovered ? hovered.panelText : P.brown;
  const subCol  = hovered ? "rgba(59, 55, 46, 0.5)" : P.brownMuted;

  return (
    <div style={{
      ...fadeStyle,
      background: leftBg,
      transition: "opacity 0.32s ease, transform 0.32s ease, background 0.4s ease",
      position: "relative", overflow: "hidden",
    }}>
      <FontLink />
      <GlobalStyles />
      <MenuFloatingBg />

      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 36px 0", position: "relative", zIndex: 10,
      }}>
        <BackBtn onClick={goLanding} light={!!hoveredSubjectId} />
        <Logo size={22} light={!!hoveredSubjectId} />
        <div style={{ width: 56 }} />
      </div>

      {/* Two-column layout */}
      <div className="menu-layout" style={{
        display: "flex", minHeight: "calc(100vh - 80px)",
        position: "relative", zIndex: 5,
      }}>

        {/* LEFT — 60% — options */}
        <div className="menu-col-left" style={{
          flex: "0 0 60%", width: "60%",
          padding: "44px 52px",
          display: "flex", flexDirection: "column", justifyContent: "center",
        }}>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(26px,3vw,40px)", fontWeight: 900,
            color: headCol, margin: "0 0 6px",
            transition: "color 0.4s ease",
          }}>
            Choose a Subject
          </h1>
          <p style={{
            color: subCol, fontSize: 14, margin: "0 0 36px",
            transition: "color 0.4s ease",
          }}>
            Pick a topic and begin your journey
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {SUBJECTS.map((subj, i) => (
              <SubjectRow
                key={subj.id}
                subj={subj}
                index={i}
                hovered={hoveredSubjectId === subj.id}
                onMouseEnter={() => setHoveredSubjectId(subj.id)}
                onMouseLeave={() => setHoveredSubjectId(null)}
                onClick={() => startQuiz(subj)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — 40% — book pile */}
        <div className="menu-col-right" style={{
          flex: "0 0 40%", width: "40%",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "44px 36px", position: "relative",
        }}>
          <BookPile completed={completed} />
        </div>
      </div>
    </div>
  );
}
