import { useState, useEffect, useCallback } from "react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

const questions = [
  { id: 1, title: "SOAL 1", options: ["A", "B", "C", "D"] },
  { id: 2, title: "SOAL 2", options: ["A", "B", "C", "D"] },
  { id: 3, title: "SOAL 3", options: ["A", "B", "C", "D"] },
  { id: 4, title: "SOAL 4", options: ["A", "B", "C", "D"] },
  { id: 5, title: "SOAL 5", options: ["A", "B", "C", "D"] },
  { id: 6, title: "SOAL 6", options: ["A", "B", "C", "D"] },
  { id: 7, title: "SOAL 7", options: ["A", "B", "C", "D"] },
  { id: 8, title: "SOAL 8", options: ["A", "B", "C", "D"] },
  { id: 9, title: "SOAL 9", options: ["A", "B", "C", "D"] },
  { id: 10, title: "SOAL 10", options: ["A", "B", "C", "D"] },
];

function Question({ quizSettings, onSubmit }) {
  const numQuestions = parseInt(quizSettings?.jumlahSoal) || 10;
  const displayedQuestions = questions.slice(0, numQuestions);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  // Initialize answers once
  useEffect(() => {
    setUserAnswers(new Array(displayedQuestions.length).fill(""));
  }, [displayedQuestions.length]);

  const currentQuestion = displayedQuestions[currentIndex];
  const totalQuestions = displayedQuestions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedAnswer(userAnswers[currentIndex - 1] || "");
    }
  }, [currentIndex, userAnswers]);

  const handleNext = useCallback(() => {
    const updated = [...userAnswers];
    updated[currentIndex] = selectedAnswer;
    setUserAnswers(updated);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(userAnswers[currentIndex + 1] || "");
    }
  }, [currentIndex, selectedAnswer, totalQuestions, userAnswers]);

  const handleSubmit = useCallback(() => {
    const updated = [...userAnswers];
    updated[currentIndex] = selectedAnswer;
    setUserAnswers(updated);

    // demo scoring
    const score = updated.filter((ans) => ans !== "").length;
    onSubmit(score);
  }, [currentIndex, selectedAnswer, userAnswers, onSubmit]);

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm space-x-4 flex">
          <span>👤 {quizSettings?.username}</span>
          <span>📘 {quizSettings?.materi}</span>
          <span>⚡ {quizSettings?.level}</span>
          <span>⏱ {quizSettings?.waktu} menit</span>
        </div>
        <div className="text-sm text-gray-400">
          {currentIndex + 1}/{totalQuestions}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-white transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-8 text-center">
          {currentQuestion?.title}
        </h1>
        <div className="w-full max-w-md space-y-4">
          {currentQuestion?.options.map((option, idx) => (
            <label
              key={idx}
              htmlFor={`option-${idx}`}
              className={`flex items-center p-3 rounded-md cursor-pointer border 
                ${
                  selectedAnswer === option
                    ? "bg-white text-black border-white"
                    : "bg-gray-900 text-white border-gray-700 hover:bg-gray-800"
                }`}
            >
              <input
                type="radio"
                id={`option-${idx}`}
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="hidden"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="bg-gray-800 text-white border border-gray-600 hover:bg-gray-700 disabled:opacity-50"
        >
          Previous
        </Button>
        <Button
          onClick={isLastQuestion ? handleSubmit : handleNext}
          disabled={!selectedAnswer}
          className="bg-white text-black font-semibold hover:bg-gray-200 disabled:opacity-50"
        >
          {isLastQuestion ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
}

export default Question;
