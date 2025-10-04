import "./App.css";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Question from "./pages/Question";
import Score from "./pages/Score";
import History from "./pages/History";
import Feedback from "./pages/Feedback";

function App() {
  const [currentView, setCurrentView] = useState("dashboard"); // tampilan aktif
  const [score, setScore] = useState(0); // skor akhir quiz
  const [quizSettings, setQuizSettings] = useState({}); // konfigurasi quiz
  const [quizResult, setQuizResult] = useState({}); // detail hasil (benar/salah)

  // 🚀 Mulai quiz
  const handleStartQuiz = (settings) => {
    setQuizSettings(settings);
    setCurrentView("question");
  };

  // 🚀 Submit jawaban & hitung skor
  const handleQuizSubmit = (result) => {
    // result bisa bentuk { score, correctCount, totalQuestions }
    setScore(result.score);
    setQuizResult(result);
    setCurrentView("score");
  };

  // 🚀 Kembali ke Dashboard
  const handleBackToHome = () => {
    setCurrentView("dashboard");
    setScore(0);
    setQuizSettings({});
    setQuizResult({});
  };

  // 🚀 Navigasi lain
  const handleViewHistory = () => setCurrentView("history");
  const handleViewFeedback = () => setCurrentView("feedback");

  return (
    <>
      {currentView === "dashboard" && (
        <Dashboard
          onStartQuiz={handleStartQuiz}
          onViewHistory={handleViewHistory}
          onViewFeedback={handleViewFeedback}
        />
      )}

      {currentView === "question" && (
        <Question
          quizSettings={quizSettings}
          onSubmit={handleQuizSubmit}
          onCancel={handleBackToHome}
        />
      )}

      {currentView === "score" && (
        <Score
          score={score}
          correctCount={quizResult.correctCount || 0}
          totalQuestions={quizResult.totalQuestions || 0}
          onBack={handleBackToHome}
          onViewHistory={handleViewHistory}
        />
      )}

      {currentView === "history" && <History onBack={handleBackToHome} />}

      {currentView === "feedback" && <Feedback onBack={handleBackToHome} />}
    </>
  );
}

export default App;
