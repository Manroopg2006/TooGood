import { useState } from "react";
import { P } from "../constants";


const FORMSPREE_ID = "xbdwjzqb";

export default function QuestionSubmitModal({ onClose }) {
  const [question, setQuestion]   = useState("");
  const [optA, setOptA]           = useState("");
  const [optB, setOptB]           = useState("");
  const [optC, setOptC]           = useState("");
  const [optD, setOptD]           = useState("");
  const [answer, setAnswer]       = useState("");
  const [email, setEmail]         = useState("");
  const [status, setStatus]       = useState("idle"); // idle | sending | success | error

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const allFilled = question && optA && optB && optC && optD && answer && email && emailValid;

  async function handleSubmit() {
    if (!allFilled) return;
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: "🌟 New Quiz Question Submission",
          email,
          question,
          option_a: optA,
          option_b: optB,
          option_c: optC,
          option_d: optD,
          correct_answer: answer,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  // Shared input style
  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    background: "rgba(255,255,255,0.15)",
    border: `1.5px solid rgba(255,255,255,0.25)`,
    borderRadius: 12, padding: "11px 14px",
    fontSize: 14, fontWeight: 500,
    color: P.white, fontFamily: "'Poppins', sans-serif",
    outline: "none",
    transition: "border 0.15s, background 0.15s",
  };

  const labelStyle = {
    fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
    textTransform: "uppercase", color: "rgba(255,255,255,0.6)",
    marginBottom: 6, display: "block",
  };

  return (
    // Backdrop
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(10,20,60,0.72)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20, animation: "fadeIn 0.2s ease",
      }}
    >
      {/* Card — stop click propagation so clicking inside doesn't close */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: P.navy,
          borderRadius: 24, padding: "32px 28px",
          width: "100%", maxWidth: 420,
          maxHeight: "90vh", overflowY: "auto",
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
          animation: "popIn 0.3s ease both",
          scrollbarWidth: "none",
        }}
      >
        {status === "success" ? (
          // ── Success state ──
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: P.white, margin: "0 0 10px", fontFamily: "'Poppins', sans-serif" }}>
              Question Submitted!
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: "0 0 28px" }}>
              Thanks for contributing. We'll review it and may add it to the quiz!
            </p>
            <button
              onClick={onClose}
              style={{
                background: P.salmon, color: P.navy, border: "none",
                borderRadius: 100, padding: "13px 36px",
                fontSize: 15, fontWeight: 700, fontFamily: "inherit", cursor: "pointer",
              }}
            >
              Awesome, close!
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 22, marginBottom: 4 }}>🌟</div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: P.white, margin: 0, fontFamily: "'Poppins', sans-serif" }}>
                  Submit a Question
                </h2>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", margin: "4px 0 0" }}>
                  Perfect score — you earned this!
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.1)", border: "none",
                  borderRadius: "50%", width: 34, height: 34,
                  color: "rgba(255,255,255,0.6)", fontSize: 18,
                  cursor: "pointer", fontFamily: "inherit",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>

            {/* Form fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Question */}
              <div>
                <label style={labelStyle}>Your Question</label>
                <textarea
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  placeholder="e.g. What is the capital of Japan?"
                  rows={3}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={e => { e.target.style.border = `1.5px solid ${P.salmon}`; e.target.style.background = "rgba(255,255,255,0.2)"; }}
                  onBlur={e => { e.target.style.border = "1.5px solid rgba(255,255,255,0.25)"; e.target.style.background = "rgba(255,255,255,0.15)"; }}
                />
              </div>

              {/* Options */}
              <div>
                <label style={labelStyle}>Answer Options</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    ["A", optA, setOptA],
                    ["B", optB, setOptB],
                    ["C", optC, setOptC],
                    ["D", optD, setOptD],
                  ].map(([lbl, val, setter]) => (
                    <div key={lbl} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{
                        minWidth: 28, height: 28, borderRadius: "50%",
                        background: "rgba(255,255,255,0.15)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 12, fontWeight: 800, color: "rgba(255,255,255,0.7)",
                        flexShrink: 0,
                      }}>{lbl}</span>
                      <input
                        value={val}
                        onChange={e => setter(e.target.value)}
                        placeholder={`Option ${lbl}`}
                        style={inputStyle}
                        onFocus={e => { e.target.style.border = `1.5px solid ${P.salmon}`; e.target.style.background = "rgba(255,255,255,0.2)"; }}
                        onBlur={e => { e.target.style.border = "1.5px solid rgba(255,255,255,0.25)"; e.target.style.background = "rgba(255,255,255,0.15)"; }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Correct answer */}
              <div>
                <label style={labelStyle}>Correct Answer</label>
                <select
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                  onFocus={e => { e.target.style.border = `1.5px solid ${P.salmon}`; }}
                  onBlur={e => { e.target.style.border = "1.5px solid rgba(255,255,255,0.25)"; }}
                >
                  <option value="" disabled style={{ background: P.navy }}>Select correct option…</option>
                  <option value="A" style={{ background: P.navy }}>A — {optA || "Option A"}</option>
                  <option value="B" style={{ background: P.navy }}>B — {optB || "Option B"}</option>
                  <option value="C" style={{ background: P.navy }}>C — {optC || "Option C"}</option>
                  <option value="D" style={{ background: P.navy }}>D — {optD || "Option D"}</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>Your Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={inputStyle}
                  onFocus={e => { e.target.style.border = `1.5px solid ${P.salmon}`; e.target.style.background = "rgba(255,255,255,0.2)"; }}
                  onBlur={e => { e.target.style.border = "1.5px solid rgba(255,255,255,0.25)"; e.target.style.background = "rgba(255,255,255,0.15)"; }}
                />
                {email && !emailValid && (
                  <p style={{ fontSize: 11, color: "#ff7f7f", margin: "6px 0 0" }}>
                    Please enter a valid email address.
                  </p>
                )}
                {(!email || emailValid) && (
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: "6px 0 0" }}>
                    We'll credit you if we use your question.
                  </p>
                )}
              </div>

              {/* Error */}
              {status === "error" && (
                <p style={{ fontSize: 13, color: "#ff7f7f", margin: 0, textAlign: "center" }}>
                  Something went wrong. Please try again.
                </p>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!allFilled || status === "sending"}
                style={{
                  background: allFilled ? P.salmon : "rgba(255,255,255,0.1)",
                  color: allFilled ? P.navy : "rgba(255,255,255,0.3)",
                  border: "none", borderRadius: 100,
                  padding: "15px 0", fontSize: 16, fontWeight: 700,
                  fontFamily: "inherit", cursor: allFilled ? "pointer" : "not-allowed",
                  width: "100%", transition: "transform 0.14s, background 0.2s",
                  marginTop: 4,
                }}
                onMouseEnter={e => { if (allFilled) e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
              >
                {status === "sending" ? "Submitting…" : "Submit Question"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}