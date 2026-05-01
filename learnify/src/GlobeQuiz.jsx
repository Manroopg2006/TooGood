import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import QuestionSubmitModal from './components/QuestionSubmitModal';


// ── Country dataset ───────────────────────────────────────────────────────────
const COUNTRIES = [
  { name: "France",       capital: "Paris",          lat:  46.2, lon:   2.2, continent: "Europe",        funFact: "France is the most visited country in the world, welcoming ~90 million tourists a year." },
  { name: "Japan",        capital: "Tokyo",           lat:  36.2, lon: 138.3, continent: "Asia",          funFact: "Japan has the world's oldest company, Kongō Gumi, founded in 578 AD." },
  { name: "Brazil",       capital: "Brasília",        lat: -14.2, lon: -51.9, continent: "South America", funFact: "Brazil is home to roughly 60% of the Amazon rainforest." },
  { name: "Australia",    capital: "Canberra",        lat: -25.3, lon: 133.8, continent: "Oceania",       funFact: "Australia is the only continent that is also a country." },
  { name: "Egypt",        capital: "Cairo",           lat:  26.8, lon:  30.8, continent: "Africa",        funFact: "The Great Pyramid was the world's tallest structure for 3,800 years." },
  { name: "Canada",       capital: "Ottawa",          lat:  56.1, lon: -106.3, continent: "North America", funFact: "Canada has the longest coastline of any country in the world." },
  { name: "India",        capital: "New Delhi",       lat:  20.6, lon:  78.9, continent: "Asia",          funFact: "India invented the numeral zero and the decimal system." },
  { name: "Russia",       capital: "Moscow",          lat:  61.5, lon: 105.3, continent: "Europe",        funFact: "Russia spans 11 time zones — the most of any country." },
  { name: "Mexico",       capital: "Mexico City",     lat:  23.6, lon: -102.5, continent: "North America", funFact: "Mexico City is built on a dried lakebed and sinks ~10 cm every year." },
  { name: "South Africa", capital: "Pretoria",        lat: -30.6, lon:  22.9, continent: "Africa",        funFact: "South Africa is the only country in the world to have three capital cities." },
  { name: "Argentina",    capital: "Buenos Aires",    lat: -38.4, lon: -63.6, continent: "South America", funFact: "Argentina is the 8th largest country by area on Earth." },
  { name: "China",        capital: "Beijing",         lat:  35.9, lon: 104.2, continent: "Asia",          funFact: "China has the world's largest standing army with over 2 million active personnel." },
  { name: "Norway",       capital: "Oslo",            lat:  60.5, lon:   8.5, continent: "Europe",        funFact: "Norway has the world's longest road tunnel at 24.5 km." },
  { name: "Kenya",        capital: "Nairobi",         lat:  -0.0, lon:  37.9, continent: "Africa",        funFact: "The Kenyan Great Rift Valley is one of the few geological features visible from space." },
  { name: "Indonesia",    capital: "Jakarta",         lat:  -0.8, lon: 113.9, continent: "Asia",          funFact: "Indonesia is the world's largest archipelago with over 17,000 islands." },
  { name: "Germany",      capital: "Berlin",          lat:  51.2, lon:  10.5, continent: "Europe",        funFact: "Germany invented the printing press, the car, and aspirin." },
  { name: "Peru",         capital: "Lima",            lat:  -9.2, lon: -75.0, continent: "South America", funFact: "Machu Picchu sits 2,430 metres above sea level in the Andes." },
  { name: "New Zealand",  capital: "Wellington",      lat: -40.9, lon: 174.9, continent: "Oceania",       funFact: "New Zealand was the first country to grant women the right to vote, in 1893." },
  { name: "Saudi Arabia", capital: "Riyadh",          lat:  23.9, lon:  45.1, continent: "Asia",          funFact: "Saudi Arabia's Empty Quarter is the world's largest continuous sand desert." },
  { name: "USA",          capital: "Washington D.C.", lat:  37.1, lon: -95.7, continent: "North America", funFact: "The US Constitution is the world's oldest written national constitution still in use." },
];

const ALL_CONTINENTS = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania"];
const TOTAL_QUESTIONS = 10;
const CAM_DIST = 2.6;

// ── Maths helpers ─────────────────────────────────────────────────────────────
function latLonToVec3(lat, lon, r = 1) {
  const phi = lat * (Math.PI / 180);
  const lam = lon * (Math.PI / 180);
  return new THREE.Vector3(
    r * Math.cos(phi) * Math.cos(lam),
    r * Math.sin(phi),
    -r * Math.cos(phi) * Math.sin(lam),
  );
}

function vec3ToLatLon(v) {
  const n = v.clone().normalize();
  const lat = Math.asin(Math.max(-1, Math.min(1, n.y))) * (180 / Math.PI);
  const lon = -Math.atan2(n.z, n.x) * (180 / Math.PI);
  return { lat, lon };
}

function haversineKm(la1, lo1, la2, lo2) {
  const R = 6371, d2r = Math.PI / 180;
  const dLa = (la2 - la1) * d2r, dLo = (lo2 - lo1) * d2r;
  const a = Math.sin(dLa / 2) ** 2 + Math.cos(la1 * d2r) * Math.cos(la2 * d2r) * Math.sin(dLo / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickWrong(correct, pool, n) {
  return shuffle(pool.filter((x) => x !== correct)).slice(0, n);
}

// ── Main component ────────────────────────────────────────────────────────────
export default function GlobeQuiz({ onExit, onComplete }) {
  const mountRef   = useRef(null);
  const threeRef   = useRef({}); // renderer, scene, camera, controls, marker, raf
  const clickMode  = useRef(false);
  const activeCtry = useRef(null);

  const [phase,    setPhase]    = useState("intro");  // intro|question|feedback|end
  const [qData,    setQData]    = useState(null);     // { country, type, choices }
  const [qNum,     setQNum]     = useState(0);
  const scoreRef   = useRef(0);
  const [score,    setScore]    = useState(0);
  const [streak,   setStreak]   = useState(0);
  const [feedback, setFeedback] = useState(null);     // { correct, dist, funFact }
  const [queue,    setQueue]    = useState([]);

  // ── Build question queue once ─────────────────────────────────────────────
  useEffect(() => {
    setQueue(shuffle(COUNTRIES).slice(0, TOTAL_QUESTIONS));
  }, []);

  // ── Three.js scene ────────────────────────────────────────────────────────
  useEffect(() => {
    const mount = mountRef.current;
    const W = mount.clientWidth, H = mount.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x111D4A);
    mount.appendChild(renderer.domElement);

    // Scene & camera
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 200);
    camera.position.set(0, 0, CAM_DIST);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping   = true;
    controls.dampingFactor   = 0.05;
    controls.enablePan       = false;
    controls.minDistance     = 1.6;
    controls.maxDistance     = 5;
    controls.autoRotate      = true;
    controls.autoRotateSpeed = 0.4;

    // Lights
    scene.add(new THREE.AmbientLight(0x1E2D72, 1.4));
    const sun = new THREE.DirectionalLight(0xfff5e0, 2.2);
    sun.position.set(5, 3, 5);
    scene.add(sun);

    // Starfield
    const starPositions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 80 + Math.random() * 30;
      starPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.cos(phi);
      starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xE8845C, size: 0.16, sizeAttenuation: true, transparent: true, opacity: 0.75 })));

    // Globe
    const globeGeo = new THREE.SphereGeometry(1, 64, 64);
    const loader   = new THREE.TextureLoader();
    const globeMat = new THREE.MeshPhongMaterial({ specular: 0x222244, shininess: 12 });
    loader.load("https://unpkg.com/three-globe/example/img/earth-day.jpg",   (t) => { globeMat.map     = t; globeMat.needsUpdate = true; });
    loader.load("https://unpkg.com/three-globe/example/img/earth-topology.png", (t) => { globeMat.bumpMap   = t; globeMat.bumpScale  = 0.04; globeMat.needsUpdate = true; });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);

    // Atmosphere glow
    const atmoGeo = new THREE.SphereGeometry(1.02, 64, 64);
    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal     = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float i = pow(0.55 - dot(vNormal, vec3(0,0,1.0)), 5.0);
          gl_FragColor = vec4(0.91, 0.52, 0.36, 1.0) * clamp(i, 0.0, 1.0);
        }
      `,
      blending:     THREE.AdditiveBlending,
      side:         THREE.FrontSide,
      transparent:  true,
      depthWrite:   false,
    });
    scene.add(new THREE.Mesh(atmoGeo, atmoMat));

    // Country marker (single reusable)
    const markerGroup = new THREE.Group();
    markerGroup.visible = false;

    const dotGeo  = new THREE.SphereGeometry(0.018, 16, 16);
    const dotMat  = new THREE.MeshBasicMaterial({ color: 0xE8845C });
    const dot     = new THREE.Mesh(dotGeo, dotMat);

    const ringGeo = new THREE.RingGeometry(0.028, 0.038, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xE8845C, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
    const ring    = new THREE.Mesh(ringGeo, ringMat);

    const outerGeo = new THREE.RingGeometry(0.048, 0.056, 32);
    const outerMat = new THREE.MeshBasicMaterial({ color: 0xE8845C, side: THREE.DoubleSide, transparent: true, opacity: 0.3 });
    const outer    = new THREE.Mesh(outerGeo, outerMat);

    markerGroup.add(dot, ring, outer);
    scene.add(markerGroup);

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse     = new THREE.Vector2();

    function onCanvasClick(e) {
      if (!clickMode.current) return;
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      mouse.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObject(globe);
      if (!hits.length) return;
      const p   = hits[0].point;
      const { lat, lon } = vec3ToLatLon(p);
      const c   = activeCtry.current;
      if (!c) return;
      const km  = haversineKm(lat, lon, c.lat, c.lon);
      clickMode.current = false;
      handleAnswerRef.current(km <= 800, km);
    }
    renderer.domElement.addEventListener("click", onCanvasClick);

    // Resize handler
    function onResize() {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    // Animation loop
    let raf;
    let t = 0;
    function animate() {
      raf = requestAnimationFrame(animate);
      t  += 0.012;
      if (markerGroup.visible) {
        const pulse = 1 + Math.sin(t * 4) * 0.25;
        ring.scale.setScalar(pulse);
        outer.scale.setScalar(1 + Math.sin(t * 4 + 1) * 0.4);
        outer.material.opacity = 0.3 + Math.sin(t * 4) * 0.15;
      }
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    threeRef.current = { renderer, scene, camera, controls, globe, markerGroup, markerGroup };

    return () => {
      cancelAnimationFrame(raf);
      renderer.domElement.removeEventListener("click", onCanvasClick);
      window.removeEventListener("resize", onResize);
      controls.dispose();
      [globeGeo, globeMat, atmoGeo, atmoMat, starGeo,
       dotGeo, dotMat, ringGeo, ringMat, outerGeo, outerMat].forEach((o) => o.dispose?.());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  // ── Camera fly-to ─────────────────────────────────────────────────────────
  const flyTo = useCallback((lat, lon, onComplete) => {
    const { camera, controls, markerGroup } = threeRef.current;
    const target = latLonToVec3(lat, lon, CAM_DIST);

    // Face-forward: tilt slightly above the country
    const elevated = target.clone().normalize().multiplyScalar(CAM_DIST);
    elevated.y += 0.18;

    controls.autoRotate = false;

    // Place marker
    const pos = latLonToVec3(lat, lon, 1.012);
    markerGroup.position.copy(pos);
    markerGroup.lookAt(pos.clone().multiplyScalar(2));
    markerGroup.visible = true;

    gsap.to(camera.position, {
      x: elevated.x,
      y: elevated.y,
      z: elevated.z,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => camera.lookAt(0, 0, 0),
      onComplete: () => {
        // Slight zoom-in settle
        gsap.to(camera.position, {
          x: elevated.x * 0.92,
          y: elevated.y * 0.92,
          z: elevated.z * 0.92,
          duration: 0.5,
          ease: "power1.out",
          onUpdate: () => camera.lookAt(0, 0, 0),
          onComplete,
        });
      },
    });
  }, []);

  // ── Present a question ────────────────────────────────────────────────────
  const handleAnswerRef = useRef(null);

  const askQuestion = useCallback((country, index) => {
    activeCtry.current = country;

    const type = Math.floor(Math.random() * 3); // 0=click, 1=capital, 2=continent

    let choices = [];
    if (type === 1) {
      const wrong = pickWrong(country.capital, COUNTRIES.map((c) => c.capital), 3);
      choices = shuffle([country.capital, ...wrong]);
    } else if (type === 2) {
      const cont = country.continent.split("/")[0]; // normalise "Europe/Asia"
      const wrong = pickWrong(cont, ALL_CONTINENTS, 3);
      choices = shuffle([cont, ...wrong]);
    }

    setQData({ country, type, choices });
    setQNum(index + 1);
    setPhase("question");

    flyTo(country.lat, country.lon, () => {
      if (type === 0) clickMode.current = true;
    });
  }, [flyTo]);

  // ── Handle an answer ──────────────────────────────────────────────────────
  const handleAnswer = useCallback((correct, distKm = null) => {
    const { markerGroup, controls } = threeRef.current;
    clickMode.current = false;
    markerGroup.visible = false;
    controls.autoRotate = false;

    const newScore = scoreRef.current + (correct ? 1 : 0);
    scoreRef.current = newScore;
    setScore(newScore);
    setStreak((k) => correct ? k + 1 : 0);

    const country = activeCtry.current;
    const finalScore = newScore;
    setFeedback({ correct, distKm, funFact: country.funFact, name: country.name });
    setPhase("feedback");

    // Auto-advance after 2.5 s
    setTimeout(() => {
      setQueue((prev) => {
        const next = prev.slice(1);
        if (next.length === 0) {
          setPhase("end");
          onComplete?.(finalScore);
        } else {
          askQuestion(next[0], TOTAL_QUESTIONS - next.length);
        }
        return next;
      });
    }, 2500);
  }, [askQuestion]);

  // Keep handleAnswer in ref so the canvas click handler can call it
  useEffect(() => { handleAnswerRef.current = handleAnswer; }, [handleAnswer]);

  // ── Start quiz ────────────────────────────────────────────────────────────
  const startQuiz = useCallback(() => {
    setScore(0);
    setStreak(0);
    setPhase("loading");
    const freshQueue = shuffle(COUNTRIES).slice(0, TOTAL_QUESTIONS);
    setQueue(freshQueue);
    setTimeout(() => askQuestion(freshQueue[0], 0), 300);
  }, [askQuestion]);

  // ── Restart ───────────────────────────────────────────────────────────────
  const restartQuiz = useCallback(() => {
    const { controls } = threeRef.current;
    controls.autoRotate = true;
    scoreRef.current = 0;
    setScore(0);
    setStreak(0);
    setFeedback(null);
    setQData(null);
    setPhase("intro");
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", background: "#111D4A", fontFamily: "'Poppins','sans-serif'" }}>
      {/* Three.js canvas */}
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

      {/* Back button */}
      <button
        onClick={onExit}
        style={{
          position: "absolute", top: 18, left: 18,
          background: "rgba(30,45,114,0.75)", border: "1px solid rgba(232,132,92,0.35)",
          borderRadius: 100, color: "#E8845C", fontFamily: "inherit",
          fontWeight: 700, fontSize: 13, padding: "8px 18px",
          cursor: "pointer", backdropFilter: "blur(8px)",
          display: "flex", alignItems: "center", gap: 6,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
          <path d="M12 5L7 10L12 15" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Back
      </button>

      {/* Top HUD */}
      {(phase === "question" || phase === "feedback") && (
        <div style={{
          position: "absolute", top: 18, right: 18,
          display: "flex", gap: 10,
        }}>
          {[
            { label: "SCORE",  value: score },
            { label: "STREAK", value: `🔥 ${streak}` },
            { label: "Q",      value: `${qNum}/${TOTAL_QUESTIONS}` },
          ].map(({ label, value }) => (
            <div key={label} style={{
              background: "rgba(30,45,114,0.75)", border: "1px solid rgba(232,132,92,0.3)",
              borderRadius: 12, padding: "8px 16px", textAlign: "center",
              backdropFilter: "blur(10px)",
            }}>
              <div style={{ fontSize: 10, color: "rgba(232,132,92,0.65)", letterSpacing: "0.1em", fontWeight: 700 }}>{label}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#E8845C", lineHeight: 1.2 }}>{value}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── INTRO panel ── */}
      {phase === "intro" && (
        <Panel center>
          <div style={{ fontSize: 42, marginBottom: 8 }}>🌍</div>
          <h2 style={{ margin: "0 0 8px", fontSize: 26, fontWeight: 800, color: "#E8845C", fontFamily: "'Poppins',sans-serif" }}>Geography Globe</h2>
          <p style={{ margin: "0 0 28px", color: "rgba(232,132,92,0.7)", fontSize: 14, lineHeight: 1.6, fontFamily: "'Poppins',sans-serif" }}>
            Answer questions about countries by clicking on the globe or choosing from options.<br />
            <strong style={{ color: "#E8845C" }}>10 questions · 3 question types</strong>
          </p>
          <PillBtn onClick={startQuiz}>Start Quiz</PillBtn>
        </Panel>
      )}

      {/* ── QUESTION panel ── */}
      {phase === "question" && qData && (
        <BottomPanel>
          {qData.type === 0 && (
            <>
              <QuestionLabel>Click on the globe to locate:</QuestionLabel>
              <h3 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 800, color: "#E8845C", fontFamily: "'Poppins',sans-serif" }}>
                {qData.country.name}
              </h3>
              <p style={{ margin: 0, color: "rgba(232,132,92,0.6)", fontSize: 13, fontFamily: "'Poppins',sans-serif" }}>
                Tap anywhere on the globe surface — within 800 km scores a point
              </p>
            </>
          )}
          {qData.type === 1 && (
            <>
              <QuestionLabel>What is the capital of {qData.country.name}?</QuestionLabel>
              <ChoiceGrid choices={qData.choices} correct={qData.country.capital} onAnswer={handleAnswer} />
            </>
          )}
          {qData.type === 2 && (
            <>
              <QuestionLabel>Which continent is {qData.country.name} in?</QuestionLabel>
              <ChoiceGrid
                choices={qData.choices}
                correct={qData.country.continent.split("/")[0]}
                onAnswer={handleAnswer}
              />
            </>
          )}
        </BottomPanel>
      )}

      {/* ── FEEDBACK panel ── */}
      {phase === "feedback" && feedback && (
        <BottomPanel accent={feedback.correct ? "#22c55e" : "#ef4444"}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 24 }}>{feedback.correct ? "✅" : "❌"}</span>
            <span style={{ fontWeight: 800, fontSize: 18, color: feedback.correct ? "#4ade80" : "#f87171", fontFamily: "'Poppins',sans-serif" }}>
              {feedback.correct
                ? (feedback.distKm !== null ? `Spot on! ${Math.round(feedback.distKm)} km away` : "Correct!")
                : (feedback.distKm !== null ? `Miss — ${Math.round(feedback.distKm)} km away` : "Not quite!")}
            </span>
          </div>
          <p style={{ margin: 0, color: "rgba(232,132,92,0.75)", fontSize: 13, lineHeight: 1.6, fontFamily: "'Poppins',sans-serif" }}>
            <strong style={{ color: "#E8845C" }}>Fun fact: </strong>{feedback.funFact}
          </p>
        </BottomPanel>
      )}

      {/* ── END panel ── */}
      {phase === "end" && (
        <Panel center>
          <div style={{ fontSize: 48, marginBottom: 8 }}>
            {score >= 8 ? "🏆" : score >= 5 ? "🌟" : "🌱"}
          </div>
          <h2 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 900, color: "#E8845C", fontFamily: "'Poppins',sans-serif" }}>
            {score}/{TOTAL_QUESTIONS}
          </h2>
          <p style={{ margin: "0 0 6px", fontSize: 16, color: score >= 8 ? "#4ade80" : score >= 5 ? "#E8845C" : "rgba(232,132,92,0.7)", fontWeight: 700, fontFamily: "'Poppins',sans-serif" }}>
            {score >= 8 ? "Geography Master!" : score >= 5 ? "Great Explorer!" : "Keep Adventuring!"}
          </p>
          <p style={{ margin: "0 0 24px", fontSize: 13, color: "rgba(232,132,92,0.55)", fontFamily: "'Poppins',sans-serif" }}>
            Best streak: 🔥 {streak}
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <PillBtn onClick={restartQuiz}>Play Again</PillBtn>
            <PillBtn onClick={onExit} secondary>Exit</PillBtn>
          </div>
        </Panel>
      )}
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function Panel({ children, center }) {
  return (
    <div style={{
      position: "absolute", inset: 0,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: center ? "center" : "flex-end",
      padding: 24,
      pointerEvents: "none",
    }}>
      <div style={{
        background: "rgba(30,45,114,0.88)", backdropFilter: "blur(16px)",
        border: "1px solid rgba(232,132,92,0.3)", borderRadius: 20,
        padding: "32px 36px", textAlign: "center", maxWidth: 400, width: "100%",
        pointerEvents: "auto",
      }}>
        {children}
      </div>
    </div>
  );
}

function BottomPanel({ children, accent }) {
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      padding: "0 20px 24px",
    }}>
      <div style={{
        background: "rgba(30,45,114,0.88)", backdropFilter: "blur(16px)",
        border: `1px solid ${accent || "rgba(232,132,92,0.25)"}`,
        borderRadius: 18, padding: "20px 24px", maxWidth: 600, margin: "0 auto",
      }}>
        {children}
      </div>
    </div>
  );
}

function QuestionLabel({ children }) {
  return (
    <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 700, color: "#E8845C", letterSpacing: "0.08em", textTransform: "uppercase" }}>
      {children}
    </p>
  );
}

function ChoiceGrid({ choices, correct, onAnswer }) {
  const [picked, setPicked] = useState(null);

  function choose(c) {
    if (picked) return;
    setPicked(c);
    setTimeout(() => onAnswer(c === correct), 700);
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 12 }}>
      {choices.map((c) => {
        const isCorrect  = c === correct;
        const isSelected = c === picked;
        const revealed   = !!picked;
        let bg    = "rgba(232,132,92,0.12)";
        let border = "1px solid rgba(232,132,92,0.3)";
        let color  = "#E8845C";
        if (revealed && isCorrect)  { bg = "rgba(34,197,94,0.25)"; border = "1px solid #22c55e"; color = "#4ade80"; }
        if (revealed && isSelected && !isCorrect) { bg = "rgba(239,68,68,0.25)"; border = "1px solid #ef4444"; color = "#f87171"; }

        return (
          <button
            key={c}
            onClick={() => choose(c)}
            disabled={!!picked}
            style={{
              background: bg, border, borderRadius: 12, color,
              fontFamily: "inherit", fontWeight: 600, fontSize: 14,
              padding: "12px 14px", cursor: picked ? "default" : "pointer",
              textAlign: "center", transition: "background 0.2s, border 0.2s",
            }}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}

function PillBtn({ children, onClick, secondary }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: secondary ? "rgba(232,132,92,0.12)" : "#E8845C",
        color: secondary ? "#E8845C" : "#1E2D72", border: secondary ? "1px solid rgba(232,132,92,0.35)" : "none",
        borderRadius: 100, fontFamily: "inherit", fontWeight: 700,
        fontSize: 15, padding: "12px 32px", cursor: "pointer",
        transition: "opacity 0.2s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
    >
      {children}
    </button>
  );
}
