import { P, SUBJECTS, BOOK_ROTS } from "../constants";

export default function BookPile({ completed }) {
  const books = SUBJECTS.filter(s => completed.includes(s.id));
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <p style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        color: P.brownMuted, fontSize: 13,
        letterSpacing: "0.1em", textTransform: "uppercase",
        margin: "0 0 28px", fontWeight: 400, fontStyle: "italic",
        textAlign: "center",
      }}>
        {books.length === 0 ? "Completed Quizzes" : `${books.length} of ${SUBJECTS.length} Complete`}
      </p>

      <div style={{
        position: "relative", width: 200,
        height: Math.max(110, books.length * 30 + 80),
        minHeight: 110,
      }}>
        {/* Shelf board */}
        <div style={{
          position: "absolute", bottom: 0, left: "50%",
          transform: "translateX(-50%)",
          width: 236, height: 10,
          background: `linear-gradient(180deg, ${P.parchmentDark} 0%, ${P.brownMuted}55 100%)`,
          borderRadius: "0 0 5px 5px",
          boxShadow: "0 6px 18px rgba(92,61,17,0.35)",
        }} />

        {books.length === 0 ? (
          <div style={{
            position: "absolute", bottom: 20, left: 0, right: 0,
            textAlign: "center", color: P.brownMuted,
            fontSize: 12, opacity: 0.42, fontStyle: "italic", lineHeight: 1.6,
          }}>
            Your shelf is empty.<br />Complete quizzes to<br />earn your books!
          </div>
        ) : (
          books.map((subj, i) => (
            <div key={subj.id} style={{
              position: "absolute", bottom: 10 + i * 28, left: "50%",
              transform: `translateX(-50%) rotate(${BOOK_ROTS[i % BOOK_ROTS.length]}deg)`,
            }}>
              <div style={{
                width: 176, height: 36,
                background: subj.bookColor,
                borderRadius: "4px 6px 6px 4px",
                boxShadow: "3px 5px 16px rgba(58,34,8,0.45), inset 0 1px 0 rgba(255,255,255,0.07)",
                display: "flex", alignItems: "center",
                position: "relative", overflow: "hidden",
                animation: `bookLand 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s both`,
              }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 10, background: "rgba(0,0,0,0.28)", borderRadius: "4px 0 0 4px" }} />
                <div style={{ position: "absolute", right: 3, top: 0, bottom: 0, width: 5, background: "rgba(245,230,200,0.18)" }} />
                <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 3, background: "rgba(255,255,255,0.06)", borderRadius: "0 6px 6px 0" }} />
                <span style={{
                  paddingLeft: 18, paddingRight: 8, flex: 1, textAlign: "center",
                  color: subj.bookTextColor || P.parchment,
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  fontFamily: "'Outfit', sans-serif",
                }}>
                  {subj.label}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
