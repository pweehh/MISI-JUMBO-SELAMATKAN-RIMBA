const questions = [
  { prompt: "Ayat tunggal menceritakan …", options: ["Satu cerita lengkap", "Dua cerita", "Banyak cerita"], answer: 0, explain: "Ayat tunggal memberitahu siapa dan apa yang berlaku dalam satu cerita." },
  { prompt: "Ayat manakah ada dua cerita lengkap?", options: ["Jumbo makan rumput.", "Jumbo makan rumput dan ibunya minum air.", "Jumbo makan rumput dan daun."], answer: 1, explain: "“Jumbo makan rumput” dan “ibunya minum air” ialah dua cerita lengkap. Kita tahu siapa buat apa dalam setiap cerita." },
  { prompt: "“Jumbo makan rumput dan daun.” Ayat ini ialah …", options: ["Ayat tunggal", "Ayat majmuk kerana ada “dan”", "Bukan ayat"], answer: 0, explain: "Ayat ini menceritakan Jumbo makan. “Dan” menyambungkan dua benda yang dimakan, bukan dua cerita." },
  { prompt: "Pilih ayat majmuk yang betul.", options: ["Air sungai itu bersih.", "Ali menyiram pokok dan Abu membaja tanah.", "Burung itu terbang tinggi."], answer: 1, explain: "Ada dua cerita lengkap: Ali menyiram pokok, dan Abu membaja tanah." },
  { prompt: "Yang manakah contoh ayat tunggal?", options: ["Monyet itu memanjat pokok.", "Monyet itu memanjat pokok dan adiknya makan pisang.", "Ibu menyiram pokok manakala ayah mengutip sampah."], answer: 0, explain: "Ayat ini menceritakan satu perkara: monyet itu memanjat pokok." },
  { prompt: "Pilih ayat yang ada dua cerita lengkap.", options: ["Daun itu berwarna hijau.", "Ibu menyiram pokok manakala ayah membersihkan sungai.", "Jumbo suka buah dan sayur."], answer: 1, explain: "Ada dua cerita: ibu menyiram pokok dan ayah membersihkan sungai." },
  { prompt: "Berapa cerita dalam ayat “Jumbo tidur di bawah pokok”?", options: ["Satu cerita", "Dua cerita", "Tiga cerita"], answer: 0, explain: "Satu cerita sahaja: Jumbo tidur di bawah pokok." },
  { prompt: "Lengkapkan ayat majmuk: “Siti mengutip sampah dan …”", options: ["botol plastik", "Amir menanam pokok.", "di tepi sungai"], answer: 1, explain: "“Amir menanam pokok” ialah cerita kedua yang lengkap." },
  { prompt: "Dalam ayat “Aina mengutip sampah dan Amir menanam bunga”, siapakah yang menanam bunga?", options: ["Aina", "sampah", "Amir"], answer: 2, explain: "Dalam cerita kedua, Amir menanam bunga." },
  { prompt: "Pilih tindakan yang membantu menjaga alam sekitar.", options: ["Membuang sampah ke sungai", "Mengasingkan sampah untuk dikitar semula", "Memetik semua bunga di taman"], answer: 1, explain: "Mengasingkan sampah memudahkan bahan dikitar semula dan mengurangkan pencemaran." },
  { prompt: "Apakah yang boleh dilakukan oleh perkataan “dan” dalam ayat majmuk?", options: ["Menyambungkan dua cerita", "Menggantikan nama orang", "Menjadikan semua ayat ayat majmuk"], answer: 0, explain: "“Dan” boleh menyambungkan dua cerita, tetapi perkataan “dan” sahaja belum cukup." },
  { prompt: "“Saya suka buah dan sayur.” Ayat ini menceritakan …", options: ["Satu cerita", "Dua cerita kerana ada “dan”", "Tiada cerita"], answer: 0, explain: "Ayat ini menceritakan Saya suka dua jenis makanan. Ada satu cerita sahaja." }
];

const byId = (id) => document.getElementById(id);
const quizCount = byId("quiz-count");
const quizScore = byId("quiz-score");
const progress = byId("quiz-progress");
const progressBar = document.querySelector(".progress");
const questionHeading = byId("quiz-question");
const optionsContainer = byId("quiz-options");
const feedback = byId("quiz-feedback");
const nextButton = byId("quiz-next");
const restartButton = byId("quiz-restart");
const result = byId("quiz-result");

let questionIndex = 0;
let score = 0;
let answered = false;

function renderQuestion() {
  const question = questions[questionIndex];
  answered = false;
  quizCount.textContent = `Soalan ${questionIndex + 1} daripada ${questions.length}`;
  quizScore.textContent = `Mata: ${score}`;
  questionHeading.textContent = question.prompt;
  optionsContainer.replaceChildren();
  feedback.textContent = "";
  feedback.className = "feedback";
  nextButton.disabled = true;
  nextButton.hidden = false;
  restartButton.hidden = true;
  result.hidden = true;
  question.options.forEach((text, index) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "option";
    option.textContent = text;
    option.addEventListener("click", () => selectAnswer(index, option));
    optionsContainer.append(option);
  });
  progress.style.width = `${(questionIndex / questions.length) * 100}%`;
  progressBar.setAttribute("aria-valuenow", String(questionIndex));
}

function selectAnswer(selected, selectedButton) {
  if (answered) return;
  answered = true;
  const question = questions[questionIndex];
  const correct = selected === question.answer;
  if (correct) score += 1;
  optionsContainer.querySelectorAll("button").forEach((button, index) => {
    button.disabled = true;
    if (index === question.answer) button.classList.add("correct");
  });
  if (!correct) selectedButton.classList.add("incorrect");
  feedback.textContent = correct ? `Bagus! ${question.explain}` : `Tidak mengapa. Baca penerangan ini, kemudian cuba soalan seterusnya. ${question.explain}`;
  feedback.classList.add(correct ? "good" : "try");
  quizScore.textContent = `Mata: ${score}`;
  nextButton.disabled = false;
  nextButton.textContent = questionIndex === questions.length - 1 ? "Lihat keputusan" : "Soalan seterusnya";
  progress.style.width = `${((questionIndex + 1) / questions.length) * 100}%`;
  progressBar.setAttribute("aria-valuenow", String(questionIndex + 1));
}

function showResult() {
  const percent = Math.round(score / questions.length * 100);
  const message = percent >= 85
    ? "Hebat! Kamu sudah bersedia membantu Jumbo."
    : percent >= 60
      ? "Bagus! Baca semula nota tentang dua cerita lengkap untuk lebih yakin."
      : "Terus berlatih. Baca semula nota dan cuba lagi; kamu pasti boleh.";
  questionHeading.textContent = "Kuiz selesai!";
  optionsContainer.replaceChildren();
  feedback.textContent = "";
  quizCount.textContent = "Keputusan";
  quizScore.textContent = `Mata: ${score} / ${questions.length}`;
  progress.style.width = "100%";
  progressBar.setAttribute("aria-valuenow", String(questions.length));
  result.textContent = `${score} daripada ${questions.length} jawapan betul (${percent}%). ${message}`;
  result.hidden = false;
  result.focus();
  nextButton.hidden = true;
  restartButton.hidden = false;
}

nextButton.addEventListener("click", () => {
  if (!answered) return;
  if (questionIndex === questions.length - 1) {
    showResult();
  } else {
    questionIndex += 1;
    renderQuestion();
  }
});

restartButton.addEventListener("click", () => {
  questionIndex = 0;
  score = 0;
  renderQuestion();
  questionHeading.focus();
});

document.querySelectorAll("[data-micro]").forEach((button) => {
  button.addEventListener("click", () => {
    const correct = button.dataset.micro === "right";
    const microFeedback = byId("micro-feedback");
    microFeedback.textContent = correct
      ? "Betul! “Jumbo makan rumput” dan “ibunya minum air” ialah dua cerita lengkap."
      : "Cuba lagi. Cari dua cerita lengkap. Dalam setiap cerita, mesti jelas siapa buat apa.";
    microFeedback.className = `feedback ${correct ? "good" : "try"}`;
  });
});

byId("reflection-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const reflectionFeedback = byId("reflection-feedback");
  const confidence = document.querySelector('input[name="confidence"]:checked');
  if (!confidence) {
    reflectionFeedback.textContent = "Pilih satu respons tentang kefahaman kamu. Jawapan lain tidak wajib.";
    reflectionFeedback.className = "feedback try";
    document.querySelector('input[name="confidence"]').focus();
    return;
  }
  reflectionFeedback.textContent = "Terima kasih kerana membuat refleksi. Jawapan kamu tidak dihantar atau disimpan.";
  reflectionFeedback.className = "feedback good";
});

renderQuestion();
