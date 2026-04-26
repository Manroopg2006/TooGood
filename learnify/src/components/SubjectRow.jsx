import { P } from "../constants";

export default function SubjectRow({ subj, onClick, onMouseEnter, onMouseLeave, hovered, index }) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        display: "flex", alignItems: "center", gap: 18,
        padding: "16px 22px", borderRadius: 14, cursor: "pointer",
        borderLeft: `5px solid ${hovered ? P.gold : "transparent"}`,
        background: "transparent",
        transform: hovered ? "scale(1.02) translateX(4px)" : "scale(1) translateX(0)",
        transition: "all 0.35s ease",
        userSelect: "none",
        animation: `rowSlideIn 0.4s ease ${index * 70}ms both`,
      }}
    >
      <span style={{ fontSize: 34, lineHeight: 1, flexShrink: 0 }}>{subj.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 17, fontWeight: 700,
          fontFamily: "'Playfair Display', Georgia, serif",
          color: hovered ? P.parchmentLight : P.brown,
          transition: "color 0.35s ease",
        }}>
          {subj.label}
        </div>
        <div style={{
          fontSize: 12, fontWeight: 500, marginTop: 2,
          color: hovered ? "rgba(251,243,224,0.55)" : P.brownMuted,
          transition: "color 0.35s ease",
        }}>
          {subj.id === "geography" ? "Globe quiz · 10 questions" : "3 questions"}
        </div>
      </div>
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{
        opacity: hovered ? 0.9 : 0.3, flexShrink: 0,
        transform: hovered ? "translateX(3px)" : "translateX(0)",
        transition: "all 0.1s ease",
      }}>
        <path d="M7 5L13 10L7 15" stroke={hovered ? P.gold : P.brown}
          strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}
