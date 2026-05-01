import { P } from "../constants";

export default function BackBtn({ onClick, label = "Back", light = false }) {
  const base = light ? P.salmon : P.navy;
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 6,
        color: base, fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 14,
        padding: "8px 0", transition: "color 0.2s ease", opacity: 0.75,
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = "1"; }}
      onMouseLeave={e => { e.currentTarget.style.opacity = "0.75"; }}
    >
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {label}
    </button>
  );
}
