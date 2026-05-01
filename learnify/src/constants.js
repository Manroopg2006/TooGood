// ── Brand Palette ─────────────────────────────────────────────────────────────
export const P = {
  // Primary brand colors
  salmon:      "#E8845C",                  // primary background / accent
  salmonLight: "#F09878",                  // lighter salmon (hover, tints)
  salmonDark:  "#C05840",                  // deeper salmon (borders, depth)
  navy:        "#1E2D72",                  // primary UI / text / components
  navyLight:   "#2A3D8A",                  // lighter navy (hover states)
  navyDark:    "#111D4A",                  // darkest navy (headings, depth)
  white:       "#FFFFFF",                  // legibility only

  // Legacy keys mapped to brand — keeps all existing code working
  parchment:      "#E8845C",               // salmon background
  parchmentLight: "#E8845C",               // salmon background
  parchmentDark:  "#C05840",               // dark salmon (borders, progress track)
  gold:           "#1E2D72",               // navy (was gold accent)
  goldLight:      "#2A3D8A",               // navy lighter
  goldMuted:      "#2A3D8A",               // navy (was muted gold)
  brown:          "#1E2D72",               // navy (was brown text)
  brownDark:      "#111D4A",               // dark navy (headings)
  brownMuted:     "rgba(30,45,114,0.65)",  // muted navy (secondary text)
  cream:          "#1E2D72",               // navy (card / panel fills on salmon bg)
  paper:          "#E07050",               // deep salmon
};

// ── Quiz subjects ─────────────────────────────────────────────────────────────
export const SUBJECTS = [
  { id: "geography", icon: "🌍", label: "Geography",
    bg: "rgba(30,45,114,0.12)", accent: "#1E2D72",
    panelBg: "#1E2D72", panelText: "#E8845C", borderAccent: "#E8845C",
    bookColor: "#1E2D72",  bookTextColor: "#E8845C" },
  { id: "math",      icon: "🔢", label: "Math",
    bg: "rgba(30,45,114,0.12)", accent: "#111D4A",
    panelBg: "#111D4A", panelText: "#E8845C", borderAccent: "#E8845C",
    bookColor: "#C05840",  bookTextColor: "#1E2D72" },
  { id: "logic",     icon: "🧩", label: "Logic",
    bg: "rgba(30,45,114,0.12)", accent: "#1E2D72",
    panelBg: "#1E2D72", panelText: "#E8845C", borderAccent: "#E8845C",
    bookColor: "#2A3D8A",  bookTextColor: "#E8845C" },
  { id: "science",   icon: "🔬", label: "Science",
    bg: "rgba(30,45,114,0.12)", accent: "#111D4A",
    panelBg: "#111D4A", panelText: "#E8845C", borderAccent: "#E8845C",
    bookColor: "#1E2D72",  bookTextColor: "#F09878" },
  { id: "history",   icon: "📚", label: "History",
    bg: "rgba(30,45,114,0.12)", accent: "#1E2D72",
    panelBg: "#1E2D72", panelText: "#E8845C", borderAccent: "#E8845C",
    bookColor: "#C05840",  bookTextColor: "#1E2D72" },
  { id: "language",  icon: "💬", label: "Language",
    bg: "rgba(30,45,114,0.12)", accent: "#111D4A",
    panelBg: "#111D4A", panelText: "#E8845C", borderAccent: "#E8845C",
    bookColor: "#2A3D8A",  bookTextColor: "#E8845C" },
];

// ── Quiz question banks (20 per subject) ─────────────────────────────────────
export const QUESTIONS = {
  geography: [
    { q: "What is the capital of France?",                         opts: ["Paris","London","Berlin","Madrid"],                                      ans: 0 },
    { q: "Which country has the largest population?",              opts: ["India","USA","China","Brazil"],                                          ans: 0 },
    { q: "What is the longest river in the world?",                opts: ["Amazon","Nile","Mississippi","Yangtze"],                                 ans: 1 },
    { q: "What is the capital of Australia?",                      opts: ["Sydney","Melbourne","Canberra","Brisbane"],                              ans: 2 },
    { q: "Which is the largest ocean?",                            opts: ["Atlantic","Pacific","Indian","Arctic"],                                  ans: 1 },
    { q: "What is the capital of Japan?",                          opts: ["Osaka","Kyoto","Hiroshima","Tokyo"],                                     ans: 3 },
    { q: "Which country is the largest by land area?",             opts: ["USA","Canada","Russia","China"],                                         ans: 2 },
    { q: "What is the capital of Brazil?",                         opts: ["Sao Paulo","Rio de Janeiro","Brasilia","Salvador"],                      ans: 2 },
    { q: "Which is the largest continent?",                        opts: ["Asia","Africa","Europe","North America"],                                ans: 0 },
    { q: "What is the capital of Canada?",                         opts: ["Vancouver","Toronto","Montreal","Ottawa"],                               ans: 3 },
    { q: "The Amazon River is primarily located in which country?",opts: ["Peru","Colombia","Brazil","Venezuela"],                                  ans: 2 },
    { q: "What is the smallest country in the world?",             opts: ["Monaco","Vatican City","San Marino","Liechtenstein"],                    ans: 1 },
    { q: "Which mountain is the tallest in the world?",            opts: ["K2","Kangchenjunga","Mount Everest","Lhotse"],                           ans: 2 },
    { q: "What is the capital of Germany?",                        opts: ["Munich","Hamburg","Berlin","Frankfurt"],                                 ans: 2 },
    { q: "Which country has the most natural lakes?",              opts: ["Russia","USA","Canada","Brazil"],                                        ans: 2 },
    { q: "Which sea has the highest salt concentration?",          opts: ["Red Sea","Dead Sea","Mediterranean","Caspian"],                          ans: 1 },
    { q: "What is the capital of India?",                          opts: ["Kolkata","Mumbai","Chennai","New Delhi"],                                ans: 3 },
    { q: "How many continents are there on Earth?",                opts: ["5","6","7","8"],                                                         ans: 2 },
    { q: "Which is the longest mountain range in the world?",      opts: ["Himalayas","Andes","Rockies","Alps"],                                    ans: 1 },
    { q: "What is the capital of Egypt?",                          opts: ["Alexandria","Cairo","Giza","Luxor"],                                     ans: 1 },
  ],
  math: [
    { q: "What is 17 × 8?",                                        opts: ["126","136","146","156"],                                                 ans: 1 },
    { q: "What is the square root of 144?",                        opts: ["10","11","12","13"],                                                     ans: 2 },
    { q: "What is 15% of 200?",                                    opts: ["20","25","30","35"],                                                     ans: 2 },
    { q: "2 × 5(2+5) + 4 = ?",                                    opts: ["38","40","74","32"],                                                     ans: 2 },
    { q: "What is 2 to the power of 10?",                          opts: ["512","1024","256","2048"],                                               ans: 1 },
    { q: "Area of a circle with radius 5? (use π ≈ 3.14)",         opts: ["78.5","75.4","31.4","15.7"],                                            ans: 0 },
    { q: "What is 48 ÷ 6?",                                        opts: ["6","7","8","9"],                                                         ans: 2 },
    { q: "What is 7² + 5²?",                                       opts: ["74","49","25","100"],                                                    ans: 0 },
    { q: "Sum of interior angles of a triangle?",                  opts: ["90°","180°","270°","360°"],                                              ans: 1 },
    { q: "Which of these is a prime number?",                      opts: ["21","15","13","9"],                                                      ans: 2 },
    { q: "What is 0.25 × 40?",                                     opts: ["8","10","12","16"],                                                      ans: 1 },
    { q: "What is 1000 − 487?",                                    opts: ["513","523","493","503"],                                                  ans: 0 },
    { q: "What is the LCM of 4 and 6?",                            opts: ["12","24","8","16"],                                                      ans: 0 },
    { q: "What is 5! (5 factorial)?",                              opts: ["25","60","120","720"],                                                   ans: 2 },
    { q: "Solve: 3x = 21. What is x?",                             opts: ["6","7","8","9"],                                                         ans: 1 },
    { q: "What is 12.5% of 80?",                                   opts: ["8","10","12","15"],                                                      ans: 1 },
    { q: "Perimeter of a square with side length 7?",              opts: ["28","49","14","21"],                                                     ans: 0 },
    { q: "What is (−3) × (−4)?",                                   opts: ["−12","7","12","−7"],                                                     ans: 2 },
    { q: "Round 4.567 to 1 decimal place.",                        opts: ["4.5","4.6","4.57","5"],                                                  ans: 1 },
    { q: "What is 2/5 of 50?",                                     opts: ["20","25","10","15"],                                                     ans: 0 },
  ],
  logic: [
    { q: "What comes next: 2, 4, 8, 16, …?",                                           opts: ["24","28","32","36"],                                ans: 2 },
    { q: "A is taller than B; B is taller than C. Who is tallest?",                     opts: ["A","B","C","Cannot tell"],                         ans: 0 },
    { q: "All dogs are animals. Buddy is a dog. Therefore Buddy is…?",                  opts: ["A plant","An animal","A mineral","Unknown"],        ans: 1 },
    { q: "If today is Monday, what day is it in 10 days?",                              opts: ["Thursday","Wednesday","Sunday","Monday"],           ans: 0 },
    { q: "Which is NOT a perfect square?",                                              opts: ["4","9","14","25"],                                  ans: 2 },
    { q: "Complete the sequence: 1, 4, 9, 16, 25, ___?",                               opts: ["36","30","49","64"],                                ans: 0 },
    { q: "All cats are mammals; all mammals are animals. Are cats animals?",            opts: ["Yes","No","Maybe","Cannot tell"],                   ans: 0 },
    { q: "Next letter: O, T, T, F, F, S, S, ___?",                                     opts: ["N","E","O","T"],                                    ans: 1 },
    { q: "A farmer has 17 sheep; all but 9 die. How many remain?",                      opts: ["17","8","9","0"],                                   ans: 2 },
    { q: "1 kg of gold vs 1 kg of feathers — which is heavier?",                       opts: ["Gold","Feathers","They weigh the same","Depends"],  ans: 2 },
    { q: "Mary is twice as old as Bob. Bob is 12. How old is Mary?",                    opts: ["6","24","12","18"],                                 ans: 1 },
    { q: "Complete the Fibonacci sequence: 1, 1, 2, 3, 5, 8, ___?",                    opts: ["11","12","13","14"],                                ans: 2 },
    { q: "If A=1, B=2, C=3… what is H + E?",                                           opts: ["13","12","11","14"],                                ans: 0 },
    { q: "You have 3 apples and take away 2. How many apples do you have?",             opts: ["1","2","3","0"],                                    ans: 1 },
    { q: "Complete the pattern: 3, 6, 12, 24, ___?",                                   opts: ["36","42","48","30"],                                ans: 2 },
    { q: "Some A are B and all B are C. Can we conclude some A are C?",                 opts: ["Yes","No","Maybe","Impossible"],                    ans: 0 },
    { q: "What number stays the same when doubled?",                                    opts: ["0","1","2","Any number"],                           ans: 0 },
    { q: "Which shape has the most sides?",                                             opts: ["Triangle","Pentagon","Hexagon","Octagon"],          ans: 3 },
    { q: "X is greater than Y; Y equals Z. Which is greatest?",                        opts: ["X","Y","Z","All equal"],                            ans: 0 },
    { q: "Complete: 100, 50, 25, 12.5, ___?",                                          opts: ["5","6","6.25","7"],                                 ans: 2 },
  ],
  science: [
    { q: "What is the chemical symbol for Gold?",                  opts: ["Go","Gd","Au","Ag"],                                                     ans: 2 },
    { q: "How many planets are in our solar system?",              opts: ["7","8","9","10"],                                                        ans: 1 },
    { q: "Approximate speed of light (km/s)?",                     opts: ["200,000","300,000","400,000","500,000"],                                 ans: 1 },
    { q: "What gas do plants absorb during photosynthesis?",        opts: ["Oxygen","Nitrogen","Carbon Dioxide","Hydrogen"],                         ans: 2 },
    { q: "What is the nearest star to Earth?",                     opts: ["Betelgeuse","Sirius","The Sun","Proxima Centauri"],                       ans: 2 },
    { q: "Most abundant gas in Earth's atmosphere?",               opts: ["Oxygen","Nitrogen","Carbon Dioxide","Argon"],                            ans: 1 },
    { q: "What is the powerhouse of the cell?",                    opts: ["Nucleus","Mitochondria","Ribosome","Cell wall"],                         ans: 1 },
    { q: "What is the atomic number of Carbon?",                   opts: ["6","8","12","14"],                                                       ans: 0 },
    { q: "Which state of matter has no fixed shape or volume?",    opts: ["Solid","Liquid","Gas","Plasma"],                                         ans: 2 },
    { q: "Newton's 2nd law of motion is expressed as…?",           opts: ["F=ma","E=mc²","PV=nRT","F=mg"],                                          ans: 0 },
    { q: "How many chromosomes do humans normally have?",          opts: ["23","46","48","44"],                                                     ans: 1 },
    { q: "What is the chemical formula for water?",                opts: ["H2O","CO2","NaCl","O2"],                                                 ans: 0 },
    { q: "Which planet is closest to the Sun?",                    opts: ["Earth","Venus","Mercury","Mars"],                                        ans: 2 },
    { q: "What type of energy is stored in food?",                 opts: ["Kinetic","Thermal","Chemical","Nuclear"],                                ans: 2 },
    { q: "What is the pH of pure water?",                          opts: ["5","6","7","8"],                                                         ans: 2 },
    { q: "What is the hardest natural substance on Earth?",        opts: ["Diamond","Quartz","Iron","Platinum"],                                    ans: 0 },
    { q: "Which force keeps planets in orbit around the Sun?",     opts: ["Gravity","Electromagnetism","Nuclear","Friction"],                       ans: 0 },
    { q: "Which organ pumps blood around the body?",               opts: ["Lungs","Liver","Heart","Kidney"],                                        ans: 2 },
    { q: "What is the chemical symbol for Sodium?",                opts: ["So","Na","Sa","No"],                                                     ans: 1 },
    { q: "Approximately how old is the Earth?",                    opts: ["4.5 million years","4.5 billion years","1 billion years","10 billion years"], ans: 1 },
  ],
  history: [
    { q: "In what year did World War II end?",                                           opts: ["1943","1944","1945","1946"],                                          ans: 2 },
    { q: "Who was the first President of the United States?",                            opts: ["Abraham Lincoln","Thomas Jefferson","George Washington","John Adams"], ans: 2 },
    { q: "The Great Wall was mainly built during which dynasty?",                        opts: ["Han","Tang","Ming","Qing"],                                           ans: 2 },
    { q: "In what year did the French Revolution begin?",                                opts: ["1789","1776","1799","1815"],                                          ans: 0 },
    { q: "Who delivered the 'I Have a Dream' speech?",                                  opts: ["Malcolm X","Martin Luther King Jr.","Rosa Parks","John F. Kennedy"],  ans: 1 },
    { q: "Which empire was the largest in history by land area?",                        opts: ["Roman","British","Mongol","Ottoman"],                                 ans: 2 },
    { q: "In what year did World War I begin?",                                          opts: ["1912","1913","1914","1915"],                                          ans: 2 },
    { q: "Who was the first person to walk on the Moon?",                                opts: ["Buzz Aldrin","Yuri Gagarin","Neil Armstrong","John Glenn"],            ans: 2 },
    { q: "Which ancient wonder was located in Alexandria, Egypt?",                       opts: ["Colossus","Lighthouse","Hanging Gardens","Sphinx"],                   ans: 1 },
    { q: "In what year did the Berlin Wall fall?",                                       opts: ["1987","1988","1989","1990"],                                          ans: 2 },
    { q: "Who is credited with discovering the Americas in 1492?",                       opts: ["Vasco da Gama","Christopher Columbus","Ferdinand Magellan","John Cabot"], ans: 1 },
    { q: "Which country was the first to grant women the right to vote?",                opts: ["USA","UK","New Zealand","France"],                                    ans: 2 },
    { q: "What was the name of the ocean liner that sank in 1912?",                     opts: ["Lusitania","Titanic","Britannic","Olympic"],                          ans: 1 },
    { q: "Napoleon Bonaparte was a general from which country?",                         opts: ["France","Britain","Russia","Italy"],                                  ans: 0 },
    { q: "In what year did India gain independence from Britain?",                       opts: ["1945","1947","1948","1950"],                                          ans: 1 },
    { q: "Who was the leader of Nazi Germany?",                                          opts: ["Mussolini","Hirohito","Stalin","Hitler"],                             ans: 3 },
    { q: "Which ancient civilization built the pyramids at Giza?",                      opts: ["Roman","Greek","Egyptian","Mesopotamian"],                            ans: 2 },
    { q: "In what year did the Soviet Union collapse?",                                  opts: ["1989","1990","1991","1992"],                                          ans: 2 },
    { q: "Who was the first female Prime Minister of the United Kingdom?",               opts: ["Elizabeth II","Margaret Thatcher","Theresa May","Angela Merkel"],    ans: 1 },
    { q: "What war was fought between the northern and southern United States?",         opts: ["Revolutionary War","Civil War","Indian War","Spanish War"],           ans: 1 },
  ],
  language: [
    { q: "A synonym for 'Happy' is?",                              opts: ["Sad","Joyful","Angry","Tired"],                                          ans: 1 },
    { q: "Which word is spelled correctly?",                       opts: ["Accomodate","Accommodate","Acommodate","Acomodate"],                     ans: 1 },
    { q: "An antonym of 'Ancient' is?",                            opts: ["Old","Historic","Modern","Classic"],                                     ans: 2 },
    { q: "Which sentence is grammatically correct?",               opts: ["He don't know","She doesn't knows","They doesn't go","We don't know"],   ans: 3 },
    { q: "A noun is…?",                                            opts: ["An action word","A describing word","A person, place, or thing","A connecting word"], ans: 2 },
    { q: "Which word means 'extremely happy'?",                    opts: ["Elated","Dejected","Perturbed","Somber"],                                ans: 0 },
    { q: "What is the correct plural of 'child'?",                 opts: ["Childs","Childes","Children","Childrens"],                               ans: 2 },
    { q: "What does 'verbose' mean?",                              opts: ["Brief","Talkative","Silent","Confused"],                                 ans: 1 },
    { q: "Which word is an adverb?",                               opts: ["Happy","Quickly","Blue","Run"],                                          ans: 1 },
    { q: "What is the opposite of 'benevolent'?",                  opts: ["Kind","Generous","Malevolent","Neutral"],                                ans: 2 },
    { q: "Which word is spelled correctly?",                       opts: ["Recieve","Believe","Percieve","Acheive"],                                ans: 1 },
    { q: "What is the past tense of 'run'?",                       opts: ["Runned","Ran","Runed","Running"],                                       ans: 1 },
    { q: "Which sentence uses the correct verb form?",             opts: ["I seen it","I have saw it","I have seen it","I seed it"],                ans: 2 },
    { q: "What does 'ambiguous' mean?",                            opts: ["Clear","Certain","Having more than one meaning","Obvious"],              ans: 2 },
    { q: "Which word is a conjunction?",                           opts: ["Table","Quickly","Although","Happy"],                                    ans: 2 },
    { q: "A metaphor is…?",                                        opts: ["A comparison using 'like' or 'as'","A direct comparison without 'like'","A type of rhyme","A repeated sound"], ans: 1 },
    { q: "Which is the correct spelling?",                         opts: ["Occurence","Occurrence","Occurance","Occurrance"],                      ans: 1 },
    { q: "What does 'loquacious' mean?",                           opts: ["Quiet","Loud","Very talkative","Clever"],                               ans: 2 },
    { q: "Which word means 'to make worse'?",                      opts: ["Ameliorate","Exacerbate","Alleviate","Mitigate"],                       ans: 1 },
    { q: "Which sentence is in the passive voice?",                opts: ["The dog bit the man","The man was bitten by the dog","The man bit the dog","Dogs bite men"], ans: 1 },
  ],
};

// ── Pick 10 random questions from a subject's pool ───────────────────────────
export function getQuizQuestions(subjectId) {
  const pool = [...QUESTIONS[subjectId]];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, 10);
}

export const OPTION_LABELS = ["A", "B", "C", "D"];

export const BOOK_ROTS = [-4, 3, -2, 5, -3, 2];
