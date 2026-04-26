// ── Warm Goldenrod Parchment Palette ─────────────────────────────────────────
export const P = {
  parchment:      "#F5E6C8",
  parchmentLight: "#FBF3E0",
  parchmentDark:  "#E0CC9A",
  gold:           "#DAA520",
  goldLight:      "#E8B840",
  goldMuted:      "#C9A84C",
  brown:          "#5C3D11",
  brownDark:      "#3A2208",
  brownMuted:     "#8B6834",
  cream:          "#FFF8E7",
  paper:          "#EDD898",
  white:          "#FFFFFF",
};

// ── Quiz subjects ─────────────────────────────────────────────────────────────
export const SUBJECTS = [
  { id: "geography", icon: "🌍", label: "Geography",
    bg: "#EAF0D8", accent: "#4A7A18",
    panelBg: "#182A12", panelText: "#B8D890", borderAccent: "#6A9A30",
    bookColor: "#2A5010", bookTextColor: "#C8E0A0" },
  { id: "math",      icon: "🔢", label: "Math",
    bg: "#F5EAD8", accent: "#8B5520",
    panelBg: "#3A1E08", panelText: "#F0D8A0", borderAccent: "#C07830",
    bookColor: "#6A3000", bookTextColor: "#F0D090" },
  { id: "logic",     icon: "🧩", label: "Logic",
    bg: "#F5E0D0", accent: "#9A4020",
    panelBg: "#4A1E08", panelText: "#F0C8A8", borderAccent: "#C05830",
    bookColor: "#7A2808", bookTextColor: "#F0C0A0" },
  { id: "science",   icon: "🔬", label: "Science",
    bg: "#D8F0E8", accent: "#2A6040",
    panelBg: "#082A1E", panelText: "#A0D8B8", borderAccent: "#40906A",
    bookColor: "#084A28", bookTextColor: "#A0D8A8" },
  { id: "history",   icon: "📚", label: "History",
    bg: "#F5D8D8", accent: "#981414",
    panelBg: "#480808", panelText: "#F0C8C8", borderAccent: "#B03030",
    bookColor: "#580808", bookTextColor: "#F0B0B0" },
  { id: "language",  icon: "💬", label: "Language",
    bg: "#F0EAD0", accent: "#5A4A00",
    panelBg: "#2A2008", panelText: "#E8D880", borderAccent: "#908020",
    bookColor: "#3A3008", bookTextColor: "#E0D070" },
];

// ── Quiz questions ────────────────────────────────────────────────────────────
export const QUESTIONS = {
  geography: [
    { q: "What is the capital of France?",             opts: ["Paris","London","Berlin","Madrid"],                        ans: 0 },
    { q: "Which country has the largest population?",  opts: ["India","USA","China","Brazil"],                           ans: 0 },
    { q: "What is the longest river in the world?",    opts: ["Amazon","Nile","Mississippi","Yangtze"],                  ans: 1 },
  ],
  math: [
    { q: "What is 17 × 8?",                            opts: ["126","136","146","156"],                                  ans: 1 },
    { q: "What is √144?",                              opts: ["10","11","12","13"],                                      ans: 2 },
    { q: "What is 15% of 200?",                        opts: ["20","25","30","35"],                                      ans: 2 },
  ],
  logic: [
    { q: "What comes next: 2, 4, 8, 16, …?",          opts: ["24","28","32","36"],                                      ans: 2 },
    { q: "A is taller than B, B is taller than C. Who is tallest?", opts: ["A","B","C","Cannot tell"],                  ans: 0 },
    { q: "All dogs are animals. Buddy is a dog. Buddy is…?", opts: ["A plant","An animal","A mineral","Unknown"],       ans: 1 },
  ],
  science: [
    { q: "What is the chemical symbol for Gold?",      opts: ["Go","Gd","Au","Ag"],                                     ans: 2 },
    { q: "How many planets are in our solar system?",  opts: ["7","8","9","10"],                                        ans: 1 },
    { q: "Approximate speed of light (km/s)?",         opts: ["200,000","300,000","400,000","500,000"],                 ans: 1 },
  ],
  history: [
    { q: "In what year did World War II end?",         opts: ["1943","1944","1945","1946"],                             ans: 2 },
    { q: "Who was the first US President?",            opts: ["Abraham Lincoln","Thomas Jefferson","George Washington","John Adams"], ans: 2 },
    { q: "The Great Wall was mainly built in which dynasty?", opts: ["Han","Tang","Ming","Qing"],                      ans: 2 },
  ],
  language: [
    { q: "A synonym for 'Happy' is?",                  opts: ["Sad","Joyful","Angry","Tired"],                         ans: 1 },
    { q: "Which word is spelled correctly?",           opts: ["Accomodate","Accommodate","Acommodate","Acomodate"],    ans: 1 },
    { q: "An antonym of 'Ancient' is?",                opts: ["Old","Historic","Modern","Classic"],                    ans: 2 },
  ],
};

export const OPTION_LABELS = ["A", "B", "C", "D"];

export const BOOK_ROTS = [-4, 3, -2, 5, -3, 2];
