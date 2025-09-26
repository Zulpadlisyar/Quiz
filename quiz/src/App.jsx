import "./App.css";
import { useState } from "react";
import Dashboard from "./page/Dashboard";
import Question from "./page/Question.jsx";
import Score from "./page/Score";
import History from "./page/History";
import Feedback from "./page/Feedback";

function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [score, setScore] = useState(123);
  const [quizSettings, setQuizSettings] = useState({});

  const handleStartQuiz = (settings) => {
    setQuizSettings(settings);
    setCurrentView("question");
  };

  const handleQuizSubmit = (calculatedScore) => {
    setScore(calculatedScore);
    setCurrentView("score");
  };

  const handleBackToHome = () => {
    setCurrentView("dashboard");
    setScore(0);
    setQuizSettings({});
  };

  const handleViewHistory = () => {
    setCurrentView("history");
  };

  const handleViewFeedback = () => {
    setCurrentView("feedback");
  };

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
