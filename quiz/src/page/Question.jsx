import { useState } from "react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

const questions = [
  {
    id: 1,
    title: "SOAL 1",
    options: ["Qwerty", "Qwerty", "Qwerty", "Qwerty"],
  },
  {
    id: 2,
    title: "SOAL 2",
    options: ["Qwerty", "Qwerty", "Qwerty", "Qwerty"],
  },
  {
    id: 3,
    title: "SOAL 3",
    options: ["Qwerty", "Qwerty", "Qwerty", "Qwerty"],
  },
  {
    id: 4,
    title: "SOAL 4",
    options: ["Qwerty", "Qwerty", "Qwerty", "Qwerty"],
  },
  {
    id: 5,
    title: "SOAL 5",
    options: ["Qwerty", "Qwerty", "Qwerty", "Qwerty"],
  },
  {
    id: 6,
    title: "SOAL 6",
    options: ["Qwerty", "Qwerty", "Qwerty", "Qwerty"],
  },
  {
    id: 7,
    title: "SOAL 7",
    options: ["Qwerty", "Qwerty", "Qwerty", "Qwerty"],
  },
  {
    id: 8,
    title: "SOAL 8",
    options: ["Qwerty", "Qwerty", "Qwerty", "Qwerty"],
  },
  {
    id: 9,
    title: "SOAL 9",
    options: ["Qwerty", "Qwerty", "Qwerty", "Qwerty"],
  },
  {
    id: 10,
    title: "SOAL 10",
    options: ["Qwerty", "Qwerty", "Qwerty", "Qwerty"],
  },
];

function Question({ quizSettings, onSubmit }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const numQuestions = parseInt(quizSettings?.jumlahSoal) || 10;
  const displayedQuestions = questions.slice(0, numQuestions);
  const totalQuestions = displayedQuestions.length;

  // Initialize userAnswers for displayed questions
  if (userAnswers.length !== totalQuestions) {
    setUserAnswers(new Array(totalQuestions).fill(""));
  }

  const currentQuestion = displayedQuestions[currentQuestionIndex];

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedAnswer("");
    }
  };

  const handleNext = () => {
    let updatedAnswers = [...userAnswers];
    if (selectedAnswer) {
      updatedAnswers[currentQuestionIndex] = selectedAnswer;
    }
    setUserAnswers(updatedAnswers);
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer("");
    }
  };

  const handleSubmit = () => {
    let updatedAnswers = [...userAnswers];
    if (selectedAnswer) {
      updatedAnswers[currentQuestionIndex] = selectedAnswer;
    }
    setUserAnswers(updatedAnswers);
    const score = 123; // Demo score
    onSubmit(score);
  };

  const progress = `${currentQuestionIndex + 1}/${totalQuestions}`;

  const tabs = [
    { key: "Username", value: quizSettings?.username || "" },
    { key: "Materi", value: quizSettings?.materi || "" },
    { key: "Level", value: quizSettings?.level || "" },
    { key: "Waktu", value: `${quizSettings?.waktu || ""} Menit` },
    { key: "SOAL", value: "" },
  ];
  const activeTab = tabs.findIndex((tab) => tab.key === "SOAL");

  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col">
      {/* Top Navigation and Progress */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          {tabs.map((tab, index) => (
            <button
              key={tab.key}
              className={`px-4 py-2 rounded-md text-sm ${
                index === activeTab
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
              onClick={() => {}} // Placeholder; could switch to settings view if needed
            >
              {tab.key}: {tab.value}
            </button>
          ))}
        </div>
        <div className="text-sm text-gray-400">{progress}</div>
      </div>

      {/* Question Section */}
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-8 text-center">
          {currentQuestion?.title}
        </h1>
        <div className="w-full max-w-md space-y-4">
          {currentQuestion?.options.map((option, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-gray-900 rounded-md"
            >
              <input
                type="radio"
                id={`option-${index}`}
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <Label
                htmlFor={`option-${index}`}
                className="text-white cursor-pointer"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="bg-gray-800 text-white border-gray-600 hover:bg-gray-700 disabled:opacity-50"
        >
          Previous
        </Button>
        <Button
          onClick={isLastQuestion ? handleSubmit : handleNext}
          className="bg-blue-600 text-white hover:bg-blue-700"
          disabled={isLastQuestion && !selectedAnswer}
        >
          {isLastQuestion ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
}

export default Question;
