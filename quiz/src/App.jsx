import "./App.css";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Question from "./pages/Question";
import Score from "./pages/Score";
import History from "./pages/History";
import Feedback from "./pages/Feedback";

function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [score, setScore] = useState(0);
  const [quizSettings, setQuizSettings] = useState({});

  // Mulai Quiz
  const handleStartQuiz = (settings) => {
    setQuizSettings(settings);
    setCurrentView("question");
  };

  // Submit jawaban dan hitung skor
  const handleQuizSubmit = (calculatedScore) => {
    setScore(calculatedScore);
    setCurrentView("score");
  };

  // Kembali ke Dashboard
  const handleBackToHome = () => {
    setCurrentView("dashboard");
    setScore(0);
    setQuizSettings({});
  };

  // Navigasi lain
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
        <Question quizSettings={quizSettings} onSubmit={handleQuizSubmit} />
      )}

      {currentView === "score" && (
        <Score
          score={score}
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
