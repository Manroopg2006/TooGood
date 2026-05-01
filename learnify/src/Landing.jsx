import { useState, useCallback } from "react";
import { getQuizQuestions } from "./constants.js";

function pickQuestions(subjectId) {
  return getQuizQuestions(subjectId);
}
import GlobeQuiz from "./GlobeQuiz.jsx";
import LandingScreen from "./screens/LandingScreen.jsx";
import QuizScreen from "./screens/QuizScreen.jsx";
import ResultScreen from "./screens/ResultScreen.jsx";

export default function LearnifyApp() {
  const [screen,       setScreen]       = useState("landing");
  const [subject,      setSubject]      = useState(null);
  const [qIndex,       setQIndex]       = useState(0);
  const [selected,     setSelected]     = useState(null);
  const [score,        setScore]        = useState(0);
  const [visible,      setVisible]      = useState(true);
  const [quizQuestions,setQuizQuestions]= useState([]);

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
    setTimeout(() => { setup?.(); setScreen(nextScreen); setVisible(true); }, 300);
  }, []);

  // Go back to landing and scroll to the quiz menu section
  const goMenu = useCallback(() => {
    if (screen === "landing") {
      document.getElementById("quiz-menu")?.scrollIntoView({ behavior: "smooth" });
    } else {
      go("landing", () => {
        setTimeout(() => {
          document.getElementById("quiz-menu")?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      });
    }
  }, [go, screen]);

  const goLanding = useCallback(() => go("landing"), [go]);

  const startQuiz = useCallback((subj) => {
    if (subj.id === "geography") {
      setVisible(false);
      setTimeout(() => { setScreen("globequiz"); setVisible(true); }, 300);
      return;
    }
    const questions = pickQuestions(subj.id);
    go("quiz", () => { setSubject(subj); setQIndex(0); setSelected(null); setScore(0); setQuizQuestions(questions); });
  }, [go]);

  const handleAnswer = useCallback((idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const newScore = quizQuestions[qIndex].ans === idx ? score + 1 : score;
    setTimeout(() => {
      if (qIndex + 1 < quizQuestions.length) {
        setQIndex(q => q + 1); setSelected(null); setScore(newScore);
      } else {
        if (newScore === quizQuestions.length) markCompleted(subject.id);
        go("result", () => setScore(newScore));
      }
    }, 900);
  }, [selected, quizQuestions, qIndex, score, go, markCompleted, subject]);

  if (screen === "globequiz") return (
    <GlobeQuiz
      onExit={goMenu}
      onComplete={(finalScore) => { if (finalScore === 10) markCompleted("geography"); }}
    />
  );

  if (screen === "landing") return (
    <LandingScreen
      visible={visible}
      goMenu={goMenu}
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
      questions={quizQuestions}
      handleAnswer={handleAnswer}
      goMenu={goMenu}
    />
  );

  if (screen === "result") return (
    <ResultScreen
      visible={visible}
      subject={subject}
      score={score}
      total={quizQuestions.length}
      onPlayAgain={() => {
        const questions = pickQuestions(subject.id);
        go("quiz", () => { setSubject(subject); setQIndex(0); setSelected(null); setScore(0); setQuizQuestions(questions); });
      }}
      onBackToMenu={goMenu}
    />
  );
}
