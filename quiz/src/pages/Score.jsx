import React from "react";
import { Button } from "@/components/ui/button";

const Score = ({ score, onBack, onViewHistory }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-md w-full">
        {/* Title */}
        <h1 className="text-4xl font-extrabold tracking-wide flex items-center justify-center gap-3">
          <span>✨</span>
          <span>Score</span>
          <span>✨</span>
        </h1>

        {/* Score Display */}
        <div className="text-7xl font-bold flex items-center justify-center gap-4">
          <span>🎉</span>
          <span>{score}</span>
          <span>🎉</span>
        </div>

        {/* Subtitle */}
        <p className="text-lg italic opacity-80">“Good job, keep going!”</p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onBack}
            className="bg-white text-black rounded-full px-8 py-3 font-semibold transition-colors hover:bg-gray-200"
          >
            Back to Home
          </Button>
          <Button
            onClick={onViewHistory}
            className="bg-white text-black rounded-full px-8 py-3 font-semibold transition-colors hover:bg-gray-200"
          >
            View History
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Score;
