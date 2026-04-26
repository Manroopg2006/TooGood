import { P } from "../constants";

export default function Logo({ size = 22, light = false }) {
  return (
    <div style={{ fontSize: size, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1,
      fontFamily: "'Playfair Display', Georgia, serif" }}>
      <span style={{ color: P.gold }}>Learn</span>
      <span style={{ color: light ? "rgba(251,243,224,0.75)" : P.brown }}>ify</span>
    </div>
  );
}
