import React from "react";
import { Button } from "@/components/ui/button";

const Score = ({
  score,
  correctCount,
  totalQuestions,
  onBack,
  onViewHistory,
}) => {
  const handleBackToHome = () => {
    onBack();
  };

  // Pesan motivasi berdasarkan score
  const getMessage = () => {
    if (score === 100) return "Perfect! 🌟";
    if (score >= 80) return "Great job! 🚀";
    if (score >= 60) return "Good effort! 💪";
    return "Keep practicing! 🔥";
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-10 max-w-lg w-full">
        {/* Title */}
        <h1 className="text-4xl font-bold flex items-center justify-center space-x-3">
          <span>✨</span>
          <span>Your Result</span>
          <span>✨</span>
        </h1>

        {/* Score Display */}
        <div className="text-7xl font-extrabold flex items-center justify-center space-x-4">
          <span>🎉</span>
          <span>{score}</span>
          <span>🎉</span>
        </div>

        {/* Detail Benar/Salah */}
        <div className="text-xl font-medium space-y-2">
          <p>
            ✅ Correct: <span className="font-bold">{correctCount}</span>
          </p>
          <p>
            ❌ Wrong:{" "}
            <span className="font-bold">{totalQuestions - correctCount}</span>
          </p>
          <p className="italic text-gray-300">{getMessage()}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button
            onClick={handleBackToHome}
            className="bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-200 w-full sm:w-auto"
          >
            Back to Home
          </Button>
          <Button
            onClick={onViewHistory}
            className="bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-gray-200 w-full sm:w-auto"
          >
            View History
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Score;
