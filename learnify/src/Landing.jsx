import { useState, useCallback } from "react";
import { QUESTIONS } from "./constants.js";
import GlobeQuiz from "./GlobeQuiz.jsx";
import LandingScreen from "./screens/LandingScreen.jsx";
import MenuScreen from "./screens/MenuScreen.jsx";
import QuizScreen from "./screens/QuizScreen.jsx";
import ResultScreen from "./screens/ResultScreen.jsx";

export default function LearnifyApp() {
  const [screen,           setScreen]           = useState("landing");
  const [subject,          setSubject]          = useState(null);
  const [qIndex,           setQIndex]           = useState(0);
  const [selected,         setSelected]         = useState(null);
  const [score,            setScore]            = useState(0);
  const [visible,          setVisible]          = useState(true);
  const [hoveredSubjectId, setHoveredSubjectId] = useState(null);
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(localStorage.getItem("learnify_completed") || "[]"); }
    catch { return []; }
  });

  const markCompleted = useCallback((id) => {
    setCompleted(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try { localStorage.setItem("learnify_completed", JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const go = useCallback((nextScreen, setup) => {
    setVisible(false);
    setTimeout(() => { setup?.(); setScreen(nextScreen); setVisible(true); }, 320);
  }, []);

  const goMenu    = useCallback(() => go("menu"),    [go]);
  const goLanding = useCallback(() => go("landing"), [go]);

  const startQuiz = useCallback((subj) => {
    if (subj.id === "geography") {
      setVisible(false);
      setTimeout(() => { setScreen("globequiz"); setVisible(true); }, 320);
      return;
    }
    go("quiz", () => { setSubject(subj); setQIndex(0); setSelected(null); setScore(0); });
  }, [go]);

  const handleAnswer = useCallback((idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const questions = QUESTIONS[subject.id];
    const newScore  = questions[qIndex].ans === idx ? score + 1 : score;
    setTimeout(() => {
      if (qIndex + 1 < questions.length) {
        setQIndex(q => q + 1); setSelected(null); setScore(newScore);
      } else {
        markCompleted(subject.id);
        go("result", () => setScore(newScore));
      }
    }, 900);
  }, [selected, subject, qIndex, score, go, markCompleted]);

  if (screen === "globequiz") return (
    <GlobeQuiz
      onExit={() => go("menu")}
      onComplete={() => markCompleted("geography")}
    />
  );

  if (screen === "landing") return (
    <LandingScreen visible={visible} goMenu={goMenu} />
  );

  if (screen === "menu") return (
    <MenuScreen
      visible={visible}
      goLanding={goLanding}
      hoveredSubjectId={hoveredSubjectId}
      setHoveredSubjectId={setHoveredSubjectId}
      startQuiz={startQuiz}
      completed={completed}
    />
  );

  if (screen === "quiz") return (
    <QuizScreen
      visible={visible}
      subject={subject}
      qIndex={qIndex}
      selected={selected}
      score={score}
      handleAnswer={handleAnswer}
      goMenu={goMenu}
    />
  );

  if (screen === "result") return (
    <ResultScreen
      visible={visible}
      subject={subject}
      score={score}
      onPlayAgain={() => go("quiz", () => { setSubject(subject); setQIndex(0); setSelected(null); setScore(0); })}
      onBackToMenu={goMenu}
    />
  );
}
