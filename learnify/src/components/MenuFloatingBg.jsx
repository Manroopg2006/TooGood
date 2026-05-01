import { P } from "../constants";

export default function MenuFloatingBg() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      <div style={{ position:"absolute", top:"8%", left:"6%", width:118, height:118, borderRadius:"50%",
        background: P.navyDark,
        opacity:0.12, willChange:"transform",
        animation:"mFloat1 11s ease-in-out infinite alternate", animationDelay:"0.3s" }} />
      <div style={{ position:"absolute", top:"14%", right:"12%", width:86, height:32, borderRadius:"100px",
        background: P.navy,
        opacity:0.14, willChange:"transform",
        animation:"mFloat2 13s ease-in-out infinite alternate", animationDelay:"1.5s" }} />
      <div style={{ position:"absolute", top:"44%", left:"46%", width:150, height:135,
        borderRadius:"55% 45% 62% 38% / 46% 57% 43% 54%",
        background: P.navyLight,
        opacity:0.10, willChange:"transform",
        animation:"mFloat3 17s ease-in-out infinite alternate", animationDelay:"0s" }} />
      <div style={{ position:"absolute", bottom:"18%", left:"4%", width:80, height:80, borderRadius:"50%",
        background: P.navy,
        opacity:0.15, willChange:"transform",
        animation:"mFloat4 7s ease-in-out infinite alternate", animationDelay:"2.8s" }} />
      <div style={{ position:"absolute", bottom:"10%", right:"6%", width:104, height:38, borderRadius:"100px",
        background: P.navyDark,
        opacity:0.12, willChange:"transform",
        animation:"mFloat5 19s ease-in-out infinite alternate", animationDelay:"4s" }} />
    </div>
  );
}
