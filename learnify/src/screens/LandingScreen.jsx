import { P, SUBJECTS } from "../constants";
import { FontLink, GlobalStyles } from "../GlobalStyles";

const FEATURES = [
  {
    icon: "🌍",
    title: "Interactive Globe",
    desc: "Spin a live 3D Earth, click countries, and test your geography knowledge in real time.",
  },
  {
    icon: "🧠",
    title: "Six Subjects",
    desc: "Geography, Math, Logic, Science, History, and Language — a different challenge every time.",
  },
  {
    icon: "📚",
    title: "Your Bookshelf",
    desc: "Every subject you complete adds a book to your shelf. Fill it up, one quiz at a time.",
  },
  {
    icon: "⚡",
    title: "Instant Feedback",
    desc: "See exactly which answers were right or wrong the moment you choose, then jump straight back in.",
  },
];

function scrollToIntro() {
  document.getElementById("lamaify-intro")?.scrollIntoView({ behavior: "smooth" });
}

export default function LandingScreen({ visible, goMenu }) {
  const fadeStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.98)",
    transition: "opacity 0.32s ease, transform 0.32s ease",
    width: "100%",
    fontFamily: "'Outfit', 'Inter', sans-serif",
  };

  return (
    <div style={{ ...fadeStyle, background: P.parchment }}>
      <FontLink />
      <GlobalStyles />

      {/* ── HERO (full viewport) ──────────────────────────────────────────────── */}
      <div style={{
        minHeight: "100vh", position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>

        {/* Background float layer */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden", zIndex:0 }}>
          <div style={{ position:"absolute", top:"5%", left:"3%", width:210, height:210, borderRadius:"50%",
            background:"radial-gradient(circle at 40% 38%, #E8C060 0%, #C9A84C 52%, #8B6820 100%)",
            opacity:0.2, willChange:"transform",
            animation:"bgFloat1 13s ease-in-out infinite alternate", animationDelay:"0.5s" }} />
          <div style={{ position:"absolute", top:"20%", left:"5%", width:175, height:62, borderRadius:"100px",
            background:"linear-gradient(120deg, #DAA520 0%, #F0C840 58%, #C9A84C 100%)",
            opacity:0.2, willChange:"transform",
            animation:"bgFloat2 9s ease-in-out infinite alternate", animationDelay:"2.2s" }} />
          <div style={{ position:"absolute", top:"10%", left:"44%", width:78, height:78, borderRadius:"50%",
            background:"radial-gradient(circle at 38% 35%, #FBF3E0 0%, #E8C860 50%, #C9A84C 100%)",
            opacity:0.28, willChange:"transform",
            animation:"bgFloat3 7s ease-in-out infinite alternate", animationDelay:"1s" }} />
          <div style={{ position:"absolute", top:"38%", left:"34%", width:265, height:240,
            borderRadius:"55% 45% 62% 38% / 46% 57% 43% 54%",
            background:"radial-gradient(circle at 42% 40%, #8B6020 0%, #5C3D11 48%, #3A2208 100%)",
            opacity:0.1, willChange:"transform",
            animation:"bgFloat4 17s ease-in-out infinite alternate", animationDelay:"0s" }} />
          <div style={{ position:"absolute", bottom:"16%", left:"11%", width:148, height:53, borderRadius:"100px",
            background:"linear-gradient(110deg, #DAA520 0%, #C9A84C 54%, #A88030 100%)",
            opacity:0.22, willChange:"transform",
            animation:"bgFloat5 11s ease-in-out infinite alternate", animationDelay:"3.5s" }} />
          <div style={{ position:"absolute", top:"62%", left:"58%", width:68, height:68, borderRadius:"50%",
            background:"radial-gradient(circle at 36% 34%, #F0DBA8 0%, #E0C070 53%, #C9A84C 100%)",
            opacity:0.3, willChange:"transform",
            animation:"bgFloat6 19s ease-in-out infinite alternate", animationDelay:"4.5s" }} />
          <div style={{ position:"absolute", top:"22%", left:"55%", width:150, height:138,
            borderRadius:"63% 37% 54% 46% / 55% 48% 52% 45%",
            background:"linear-gradient(135deg, #C9A84C 0%, #8B6020 44%, #DAA520 100%)",
            opacity:0.16, willChange:"transform",
            animation:"bgFloat7 23s ease-in-out infinite alternate", animationDelay:"1.8s" }} />
        </div>

        {/* Navigation */}
        <nav style={{
          position:"absolute", top:0, left:0, right:0,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"28px 40px", zIndex:10, pointerEvents:"none",
        }}>
          <div style={{
            width:48, height:48, borderRadius:"50%",
            background:"linear-gradient(135deg, #DAA520, #8B5A00)",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 4px 18px rgba(218,165,32,0.45)",
            pointerEvents:"auto", cursor:"pointer", flexShrink:0,
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <polygon points="5,2 15,9 5,16" fill="#FBF3E0" />
            </svg>
          </div>
          <span style={{
            color: P.brown, fontWeight:700, fontSize:12,
            letterSpacing:"0.13em", textTransform:"uppercase",
            fontFamily:"'Outfit', sans-serif", pointerEvents:"auto", cursor:"pointer",
          }}>
            Get In Touch
          </span>
        </nav>

        {/* Large matte gold sphere — top-right */}
        <div style={{
          position:"absolute", top:"-10%", right:"-8%",
          width:"min(440px, 56vw)", height:"min(440px, 56vw)", borderRadius:"50%",
          background:"radial-gradient(circle at 36% 33%, #F0D060 0%, #C9A84C 42%, #8B6820 78%)",
          boxShadow:"inset -35px -35px 90px rgba(58,34,8,0.42), inset 12px 12px 35px rgba(255,240,180,0.12)",
          zIndex:1, willChange:"transform",
          animation:"floatLargeSphere 10s ease-in-out infinite alternate",
        }} />

        {/* Goldenrod pill — left */}
        <div style={{
          position:"absolute", top:"30%", left:"-90px", width:250, height:95, borderRadius:"100px",
          background:"radial-gradient(circle at 38% 36%, #F5E8A0 0%, #DAA520 52%, #C9A84C 100%)",
          boxShadow:"inset -10px -10px 32px rgba(58,34,8,0.22), inset 5px 5px 16px rgba(255,240,160,0.25), 10px 10px 34px rgba(58,34,8,0.18)",
          zIndex:2, willChange:"transform",
          animation:"floatPill 8s ease-in-out infinite alternate", animationDelay:"1s",
        }} />

        {/* Warm ribbon — mid-right */}
        <div style={{
          position:"absolute", top:"43%", right:"-20px",
          width:"min(360px,46vw)", height:115,
          borderRadius:"80px 18px 65px 35px / 42px 18px 65px 35px",
          background:"linear-gradient(120deg, #DAA520 0%, #C9A84C 26%, #F5E6C8 50%, #E8B840 74%, #DAA520 100%)",
          backgroundSize:"300% 300%", opacity:0.75,
          zIndex:2, willChange:"transform",
          animation:"floatRibbon 12s ease-in-out infinite alternate, shimmer 6s linear infinite",
          animationDelay:"2s, 0s",
        }} />

        {/* Warm holographic sphere — center-bottom */}
        <div style={{ position:"absolute", bottom:"1%", left:"50%", transform:"translateX(-50%)", zIndex:2 }}>
          <div style={{
            width:"min(210px,29vw)", height:"min(210px,29vw)", borderRadius:"50%",
            background:"radial-gradient(circle at 30% 28%, #FFFFFF 0%, #F5E8A0 20%, #DAA520 44%, #C9A84C 68%, #8B6820 100%)",
            backgroundSize:"220% 220%",
            boxShadow:"inset -14px -14px 40px rgba(58,34,8,0.26), inset 6px 6px 20px rgba(255,240,180,0.3), 0 0 55px rgba(218,165,32,0.38)",
            willChange:"transform",
            animation:"floatIridescent 9s ease-in-out infinite alternate, shimmer 4s linear infinite",
            animationDelay:"0.5s, 0s",
          }} />
        </div>

        {/* Pale parchment sphere — bottom-right */}
        <div style={{
          position:"absolute", bottom:"9%", right:"9%",
          width:"min(115px,15vw)", height:"min(115px,15vw)", borderRadius:"50%",
          background:"radial-gradient(circle at 35% 32%, #FBF3E0 0%, #E8D5A8 48%, #C9A84C 84%)",
          boxShadow:"inset -9px -9px 26px rgba(58,34,8,0.18), inset 4px 4px 13px rgba(255,240,180,0.2), 7px 7px 22px rgba(58,34,8,0.14)",
          zIndex:2, willChange:"transform",
          animation:"floatSmallSphere 6s ease-in-out infinite alternate", animationDelay:"3s",
        }} />

        {/* Hero content */}
        <div style={{ position:"relative", zIndex:5, textAlign:"center",
          display:"flex", flexDirection:"column", alignItems:"center", padding:"0 20px" }}>
          <h1 style={{ margin:0, lineHeight:0.9, userSelect:"none" }}>
            <span style={{
              fontSize:"clamp(80px,12vw,160px)", fontWeight:900,
              color: P.brownDark, fontStyle:"normal",
              fontFamily:"'Playfair Display', Georgia, serif",
              display:"inline", letterSpacing:"-0.03em",
            }}>Lama</span><span style={{
              fontSize:"clamp(80px,12vw,160px)", fontWeight:700,
              color: P.gold, fontStyle:"italic",
              fontFamily:"'Playfair Display', Georgia, serif",
              display:"inline", letterSpacing:"-0.03em",
            }}>ify</span>
          </h1>

          <p style={{
            marginTop:16, color: P.brownMuted, fontSize:15, fontWeight:500,
            letterSpacing:"0.08em", fontStyle:"italic",
            fontFamily:"'Playfair Display', Georgia, serif",
          }}>
            Learn · Play · Level Up
          </p>

          {/* Wax-seal CTA — now scrolls to intro */}
          <button
            onClick={scrollToIntro}
            style={{
              marginTop:44, background:"transparent",
              color: P.brown, border:`2px solid ${P.gold}`,
              borderRadius:100, padding:"15px 58px", fontSize:15,
              fontWeight:700, fontFamily:"'Outfit', sans-serif",
              cursor:"pointer", letterSpacing:"0.07em",
              animation:"waxPulse 3s ease-in-out infinite",
              transition:"background 0.22s, color 0.22s, transform 0.18s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = P.gold;
              e.currentTarget.style.color = P.cream;
              e.currentTarget.style.animation = "none";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = P.brown;
              e.currentTarget.style.animation = "waxPulse 3s ease-in-out infinite";
              e.currentTarget.style.transform = "";
            }}
          >
            Lets learn
          </button>

          {/* Scroll hint chevron */}
          <div style={{
            marginTop:36, color: P.goldMuted, opacity:0.6,
            animation:"scrollBounce 2s ease-in-out infinite",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ── INTRO SECTION ─────────────────────────────────────────────────────── */}
      <div id="lamaify-intro" style={{
        background: `linear-gradient(180deg, ${P.parchment} 0%, ${P.parchmentLight} 100%)`,
        padding: "100px 24px 120px",
        position: "relative", overflow: "hidden",
      }}>

        {/* Subtle background texture blobs */}
        <div style={{
          position:"absolute", top:"-60px", right:"-80px",
          width:340, height:340, borderRadius:"50%",
          background:`radial-gradient(circle, ${P.parchmentDark} 0%, transparent 70%)`,
          opacity:0.35, pointerEvents:"none",
        }} />
        <div style={{
          position:"absolute", bottom:"-40px", left:"-60px",
          width:260, height:260, borderRadius:"50%",
          background:`radial-gradient(circle, ${P.paper} 0%, transparent 70%)`,
          opacity:0.5, pointerEvents:"none",
        }} />

        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Section heading */}
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            {/* Decorative rule */}
            <div style={{ display:"flex", alignItems:"center", gap:16, justifyContent:"center", marginBottom:32 }}>
              <div style={{ flex:1, maxWidth:80, height:1, background:`linear-gradient(to right, transparent, ${P.gold})` }} />
              <span style={{ color: P.gold, fontSize:20 }}>✦</span>
              <div style={{ flex:1, maxWidth:80, height:1, background:`linear-gradient(to left, transparent, ${P.gold})` }} />
            </div>

            <h2 style={{
              fontFamily:"'Playfair Display', Georgia, serif",
              fontSize:"clamp(32px, 5vw, 54px)", fontWeight:900,
              color: P.brownDark, margin:"0 0 20px", lineHeight:1.1,
            }}>
              Learning, reimagined.
            </h2>
            <p style={{
              fontSize:17, color: P.brownMuted, lineHeight:1.75,
              maxWidth:560, margin:"0 auto", fontWeight:400,
            }}>
              Lamaify turns revision into something you actually want to do.
              Six subjects. Real questions. A shelf that fills up as you grow.
              No sign-ups. No timers. Just you and what you know.
            </p>
          </div>

          {/* Feature cards */}
          <div style={{
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",
            gap:20, marginBottom:72,
          }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{
                background: P.cream,
                borderRadius:20,
                padding:"28px 24px",
                boxShadow:`0 4px 24px rgba(92,61,17,0.08), 0 0 0 1px rgba(201,168,76,0.18)`,
                animation:`popIn 0.5s ease ${i * 80}ms both`,
              }}>
                <div style={{
                  width:48, height:48, borderRadius:14,
                  background:`linear-gradient(135deg, ${P.gold}22, ${P.gold}44)`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:24, marginBottom:16,
                  border:`1px solid ${P.gold}33`,
                }}>
                  {f.icon}
                </div>
                <h3 style={{
                  fontFamily:"'Playfair Display', Georgia, serif",
                  fontSize:18, fontWeight:700, color: P.brown,
                  margin:"0 0 8px",
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontSize:14, color: P.brownMuted, lineHeight:1.65,
                  margin:0, fontWeight:400,
                }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Subject pill strip */}
          <div style={{ textAlign:"center", marginBottom:64 }}>
            <p style={{
              fontSize:11, fontWeight:700, letterSpacing:"0.14em",
              textTransform:"uppercase", color: P.goldMuted, marginBottom:16,
            }}>
              Subjects available
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center" }}>
              {SUBJECTS.map(s => (
                <span key={s.id} style={{
                  background: s.bg, color: s.accent,
                  borderRadius:100, padding:"7px 18px",
                  fontSize:13, fontWeight:700,
                  border:`1px solid ${s.accent}33`,
                  display:"flex", alignItems:"center", gap:6,
                }}>
                  {s.icon} {s.label}
                </span>
              ))}
            </div>
          </div>

          {/* Divider + CTA */}
          <div style={{ textAlign:"center" }}>
            <div style={{
              width:60, height:3, borderRadius:100,
              background:`linear-gradient(to right, ${P.gold}, ${P.goldLight})`,
              margin:"0 auto 40px",
            }} />
            <p style={{
              fontFamily:"'Playfair Display', Georgia, serif",
              fontSize:22, fontStyle:"italic", color: P.brownMuted,
              margin:"0 0 32px",
            }}>
              Ready to see what you know?
            </p>
            <button
              onClick={goMenu}
              style={{
                background: P.gold,
                color: P.brownDark, border:"none",
                borderRadius:100, padding:"18px 72px",
                fontSize:16, fontWeight:800,
                fontFamily:"'Outfit', sans-serif",
                cursor:"pointer", letterSpacing:"0.05em",
                boxShadow:`0 8px 32px rgba(218,165,32,0.4)`,
                transition:"transform 0.18s, box-shadow 0.18s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = `0 14px 40px rgba(218,165,32,0.55)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = `0 8px 32px rgba(218,165,32,0.4)`;
              }}
            >
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
