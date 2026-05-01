import { P } from "../constants";

export default function Logo({ size = 22, light = false }) {
  return (
    <div style={{ fontSize: size, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1,
      fontFamily: "'Poppins', sans-serif" }}>
      <span style={{ color: light ? P.salmon : P.navy }}>Too</span>
      <span style={{ color: light ? P.salmonDark : P.navyDark }}>Good?</span>
    </div>
  );
}
