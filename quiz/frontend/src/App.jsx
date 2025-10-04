import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import History from "./pages/History";

function App() {
  const [quizData, setQuizData] = useState(null);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const handleStartQuiz = (data) => {
    setQuizData(data);
  };

  const handleFinishQuiz = (result) => {
    const timestamp = new Date().toLocaleString("id-ID");
    setHistory((prev) => [...prev, { ...result, timestamp }]);
  };

  const handleViewHistory = () => {
    navigate("/history");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Dashboard
            onStartQuiz={handleStartQuiz}
            onViewHistory={handleViewHistory}
          />
        }
      />
      <Route
        path="/quiz"
        element={
          quizData ? (
            <Quiz quizData={quizData} onFinish={handleFinishQuiz} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="/history" element={<History history={history} />} />
    </Routes>
  );
}

export default App;
