import React from "react";
import { Button } from "@/components/ui/button";

const Score = ({ score, onBack, onViewHistory }) => {
  const handleBackToHome = () => {
    onBack();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold flex items-center space-x-2">
          <span>✨</span>
          <span>Score</span>
          <span>✨</span>
        </h1>
        <div className="text-6xl font-bold flex items-center justify-center space-x-4">
          <span>🎉</span>
          <span>{score}</span>
          <span>🎉</span>
        </div>
        <p className="text-xl italic">“Good job”</p>
        <Button
          onClick={handleBackToHome}
          className="bg-white text-black rounded-full px-8 py-3 font-semibold hover:bg-gray-100"
        >
          Back to Home
        </Button>
        <Button
          onClick={onViewHistory}
          className="bg-white text-black rounded-full px-8 py-3 font-semibold hover:bg-gray-100"
        >
          View History
        </Button>
      </div>
    </div>
  );
};

export default Score;
