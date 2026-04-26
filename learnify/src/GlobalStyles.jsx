export function FontLink() {
  return (
    <link
      href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap"
      rel="stylesheet"
    />
  );
}

export function GlobalStyles() {
  return (
    <style>{`
      * { box-sizing: border-box; }
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #E8D5A8; }
      ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: #DAA520; }

      @keyframes popIn {
        0%   { opacity: 0; transform: scale(0.88) translateY(10px); }
        100% { opacity: 1; transform: scale(1)    translateY(0); }
      }
      @keyframes floatLargeSphere {
        from { transform: translateY(0px); }
        to   { transform: translateY(-20px); }
      }
      @keyframes floatPill {
        from { transform: rotate(25deg) translateY(0px); }
        to   { transform: rotate(35deg) translateY(-15px); }
      }
      @keyframes floatRibbon {
        from { transform: rotate(-15deg) translateX(0px)  scale(1); }
        to   { transform: rotate(-15deg) translateX(18px) scale(1.04); }
      }
      @keyframes floatIridescent {
        from { transform: translateY(0px)  rotate(-3deg); }
        to   { transform: translateY(-14px) rotate(5deg); }
      }
      @keyframes floatSmallSphere {
        from { transform: translateY(0px); }
        to   { transform: translateY(-10px); }
      }
      @keyframes shimmer {
        from { background-position: 0%   50%; }
        to   { background-position: 200% 50%; }
      }
      /* landing background floats */
      @keyframes bgFloat1 {
        from { transform: translate(0px,   0px)  rotate(-2deg); }
        to   { transform: translate(18px, -22px) rotate(3deg); }
      }
      @keyframes bgFloat2 {
        from { transform: translate(0px,   0px)  rotate(6deg); }
        to   { transform: translate(26px, -14px) rotate(1deg); }
      }
      @keyframes bgFloat3 {
        from { transform: translate(0px,   0px)  rotate(0deg) scale(1);    }
        to   { transform: translate(-24px, 40px) rotate(4deg) scale(1.05); }
      }
      @keyframes bgFloat4 {
        from { transform: translate(0px,   0px)  rotate(3deg);  }
        to   { transform: translate(-20px, 22px) rotate(-3deg); }
      }
      @keyframes bgFloat5 {
        from { transform: translate(0px,   0px)  rotate(-5deg); }
        to   { transform: translate(34px, -18px) rotate(1deg);  }
      }
      @keyframes bgFloat6 {
        from { transform: translate(0px,    0px)  rotate(2deg);  }
        to   { transform: translate(-40px, -34px) rotate(-5deg); }
      }
      @keyframes bgFloat7 {
        from { transform: translate(0px,   0px)  rotate(-3deg) scale(1);    }
        to   { transform: translate(16px, -22px) rotate(4deg)  scale(1.04); }
      }
      /* menu background floats — distinct names */
      @keyframes mFloat1 {
        from { transform: translate(0px,   0px)  rotate(-4deg); }
        to   { transform: translate(22px, -18px) rotate(3deg);  }
      }
      @keyframes mFloat2 {
        from { transform: translate(0px,   0px)  rotate(5deg)  scale(1);    }
        to   { transform: translate(-16px, 28px) rotate(-2deg) scale(1.04); }
      }
      @keyframes mFloat3 {
        from { transform: translate(0px,   0px)  rotate(2deg);  }
        to   { transform: translate(30px, -24px) rotate(-4deg); }
      }
      @keyframes mFloat4 {
        from { transform: translate(0px,   0px)  rotate(-6deg); }
        to   { transform: translate(-22px, 16px) rotate(3deg);  }
      }
      @keyframes mFloat5 {
        from { transform: translate(0px,  0px)  rotate(1deg);  }
        to   { transform: translate(18px, 32px) rotate(-5deg); }
      }
      /* book slide-in + bounce */
      @keyframes bookLand {
        0%   { transform: translateX(140px); opacity: 0; }
        58%  { transform: translateX(0px);   opacity: 1; }
        72%  { transform: translateX(0px) translateY(-7px); }
        84%  { transform: translateX(0px) translateY(0px);  }
        92%  { transform: translateX(0px) translateY(-3px); }
        100% { transform: translateX(0px) translateY(0px);  }
      }
      /* wax-seal CTA glow */
      @keyframes waxPulse {
        0%, 100% { box-shadow: 0 0 0   0   rgba(218,165,32,0); }
        50%      { box-shadow: 0 0 22px 8px rgba(218,165,32,0.4); }
      }
      /* subject row slide-in */
      @keyframes rowSlideIn {
        from { opacity: 0; transform: translateX(-18px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      /* scroll hint bounce */
      @keyframes scrollBounce {
        0%, 100% { transform: translateY(0);   opacity: 0.6; }
        50%      { transform: translateY(7px);  opacity: 1;   }
      }
      /* responsive menu columns */
      @media (max-width: 768px) {
        .menu-layout   { flex-direction: column !important; }
        .menu-col-left { flex: 0 0 100% !important; width: 100% !important; max-width: 100% !important; }
        .menu-col-right{ flex: 0 0 100% !important; width: 100% !important; max-width: 100% !important; padding: 32px 24px !important; }
      }
    `}</style>
  );
}
