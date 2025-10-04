import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { useNavigate } from "react-router-dom";

const Quiz = ({ quizData, onFinish }) => {
  const navigate = useNavigate();

  // Destructure quizData dengan default values
  const {
    username = "Guest",
    materi = "",
    waktu = "30",
    level = "",
    jumlahSoal = "5",
    questions = [],
  } = quizData || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(parseInt(waktu) * 60);
  const [finished, setFinished] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (finished) return;

    if (timeLeft <= 0) {
      handleFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, finished]);

  // Handle jawaban user
  const handleAnswer = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: option,
    }));
  };

  // Navigasi soal
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Finish quiz dan hitung skor
  const handleFinish = () => {
    const score = questions.reduce((acc, q, i) => {
      return acc + (answers[i] === q.answer ? 1 : 0);
    }, 0);

    setFinished(true);

    // Kirim hasil ke parent
    if (onFinish) {
      onFinish({
        username,
        materi,
        level,
        jumlahSoal,
        score,
        totalQuestions: questions.length,
      });
    }
  };

  // Loading atau error state
  if (!quizData || questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <div className="text-red-500 text-xl mb-4">
          ⚠️ Data quiz tidak ditemukan
        </div>
        <p className="text-gray-600 mb-4">
          Silakan kembali ke dashboard dan mulai quiz baru.
        </p>
        <Button onClick={() => navigate("/")}>Kembali ke Dashboard</Button>
      </div>
    );
  }

  // Tampilan hasil akhir
  if (finished) {
    const score = Object.entries(answers).reduce((acc, [i, ans]) => {
      if (questions[i]?.answer === ans) acc += 1;
      return acc;
    }, 0);

    const percentage = ((score / questions.length) * 100).toFixed(1);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-green-50 to-blue-50">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">
              {percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "💪"}
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">
              Quiz Selesai!
            </h1>
            <div className="space-y-2 text-left bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-lg">
                <span className="font-semibold">Nama:</span> {username}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Materi:</span> {materi}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Level:</span> {level}
              </p>
            </div>
            <div className="text-center mb-6">
              <p className="text-4xl font-bold text-indigo-600 mb-2">
                {score}/{questions.length}
              </p>
              <p className="text-xl text-gray-600">
                Skor Akhir ({percentage}%)
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => navigate("/")}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                🏠 Kembali ke Dashboard
              </Button>
              <Button
                onClick={() => navigate("/history")}
                variant="outline"
                className="w-full"
              >
                📜 Lihat History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Tampilan quiz
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="font-bold text-lg text-indigo-600">
                Soal {currentIndex + 1} / {questions.length}
              </span>
              <p className="text-sm text-gray-600">
                {username} • {materi}
              </p>
            </div>
            <span
              className={`font-bold text-lg ${
                timeLeft < 60 ? "text-red-500 animate-pulse" : "text-gray-700"
              }`}
            >
              ⏰ {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>

          {/* Progress Bar */}
          <Progress value={progress} className="mb-6 h-2" />

          {/* Pertanyaan */}
          <div className="bg-indigo-50 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Pilihan Jawaban */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, idx) => (
              <Button
                key={idx}
                variant={
                  answers[currentIndex] === option ? "default" : "outline"
                }
                className={`w-full justify-start text-left h-auto py-4 px-4 ${
                  answers[currentIndex] === option
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleAnswer(option)}
              >
                <span className="font-semibold mr-2">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {option}
              </Button>
            ))}
          </div>

          {/* Navigasi */}
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex-1"
            >
              ⬅️ Sebelumnya
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700"
            >
              {currentIndex === questions.length - 1
                ? "✅ Selesai"
                : "Berikutnya ➡️"}
            </Button>
          </div>

          {/* Indikator jawaban */}
          <div className="mt-4 flex justify-center gap-2 flex-wrap">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                  idx === currentIndex
                    ? "bg-indigo-600 text-white"
                    : answers[idx]
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {idx + 1}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;
