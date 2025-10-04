import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";

// Tambahkan kunci jawaban
const questions = [
  {
    id: 1,
    title: "SOAL 1",
    options: ["Jakarta", "Surabaya", "Bandung", "Medan"],
    answer: "Jakarta",
  },
  {
    id: 2,
    title: "SOAL 2",
    options: ["Merkurius", "Venus", "Bumi", "Mars"],
    answer: "Bumi",
  },
  {
    id: 3,
    title: "SOAL 3",
    options: ["Soekarno", "Hatta", "Sudirman", "Diponegoro"],
    answer: "Soekarno",
  },
  {
    id: 4,
    title: "SOAL 4",
    options: ["H2O", "O2", "CO2", "NaCl"],
    answer: "H2O",
  },
  {
    id: 5,
    title: "SOAL 5",
    options: ["Segitiga", "Persegi", "Lingkaran", "Trapesium"],
    answer: "Segitiga",
  },
  {
    id: 6,
    title: "SOAL 6",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: "Python",
  },
  {
    id: 7,
    title: "SOAL 7",
    options: ["Gitar", "Piano", "Drum", "Biola"],
    answer: "Gitar",
  },
  {
    id: 8,
    title: "SOAL 8",
    options: ["Merah", "Hijau", "Biru", "Kuning"],
    answer: "Merah",
  },
  {
    id: 9,
    title: "SOAL 9",
    options: ["Singa", "Harimau", "Gajah", "Kuda"],
    answer: "Singa",
  },
  {
    id: 10,
    title: "SOAL 10",
    options: ["Facebook", "Twitter", "Instagram", "TikTok"],
    answer: "Facebook",
  },
];

function Question({ quizSettings, onSubmit }) {
  const numQuestions = parseInt(quizSettings?.jumlahSoal) || 10;
  const displayedQuestions = questions.slice(0, numQuestions);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    new Array(displayedQuestions.length).fill("")
  );

  const currentQuestion = displayedQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === displayedQuestions.length - 1;
  const progress = `${currentQuestionIndex + 1}/${displayedQuestions.length}`;

  // Timer
  const [timeLeft, setTimeLeft] = useState(
    quizSettings?.waktu ? quizSettings.waktu * 60 : 0
  );

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(); // Auto-submit kalau waktu habis
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Jawaban
  const handleSelectAnswer = (answer) => {
    const updated = [...userAnswers];
    updated[currentQuestionIndex] = answer;
    setUserAnswers(updated);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < displayedQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Hitung score
  const handleSubmit = () => {
    let correctCount = 0;
    displayedQuestions.forEach((q, i) => {
      if (userAnswers[i] === q.answer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / displayedQuestions.length) * 100);
    onSubmit(score, userAnswers);
  };

  const tabs = [
    { key: "Username", value: quizSettings?.username || "" },
    { key: "Materi", value: quizSettings?.materi || "" },
    { key: "Level", value: quizSettings?.level || "" },
    { key: "Waktu", value: timeLeft > 0 ? formatTime(timeLeft) : "00:00" },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col">
      {/* Top Navigation and Progress */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <span
              key={tab.key}
              className="px-4 py-2 rounded-md text-sm font-medium border bg-black text-white border-white"
            >
              {tab.key}: {tab.value}
            </span>
          ))}
        </div>
        <div className="text-xl font-bold text-white">{progress}</div>
      </div>

      {/* Question Section */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-8 text-center text-white">
          {currentQuestion?.title}
        </h1>
        <div className="w-full max-w-md space-y-4">
          {currentQuestion?.options.map((option, index) => {
            const isSelected = userAnswers[currentQuestionIndex] === option;
            return (
              <label
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-md border cursor-pointer transition-all duration-200
                ${
                  isSelected
                    ? "bg-white text-black border-white scale-[1.02]"
                    : "bg-black text-white border-white hover:bg-gray-900"
                }`}
                onClick={() => handleSelectAnswer(option)}
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={isSelected}
                  readOnly
                  className="hidden"
                />
                <span className="text-base">{option}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between mt-10 w-full max-w-md mx-auto mb-5">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="px-6 py-3 text-lg bg-black text-white border border-white hover:bg-gray-900 disabled:opacity-50"
        >
          Previous
        </Button>
        <Button
          onClick={isLastQuestion ? handleSubmit : handleNext}
          className="px-6 py-3 text-lg font-semibold bg-white text-black border border-white hover:bg-gray-200 disabled:opacity-50"
          disabled={!userAnswers[currentQuestionIndex]}
        >
          {isLastQuestion ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
}

export default Question;
