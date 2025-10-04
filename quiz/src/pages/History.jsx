import React from "react";
import { Button } from "@/components/ui/button";

const History = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl space-y-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center flex items-center justify-center space-x-3">
          <span>📜</span>
          <span>History</span>
          <span>📜</span>
        </h1>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg border border-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-black text-white text-lg">
                <th className="border border-white p-3 text-center">No</th>
                <th className="border border-white p-3 text-left">Username</th>
                <th className="border border-white p-3 text-left">Materi</th>
                <th className="border border-white p-3 text-left">Level</th>
                <th className="border border-white p-3 text-left">Waktu</th>
                <th className="border border-white p-3 text-left">Jawaban</th>
                <th className="border border-white p-3 text-left">Soal</th>
                <th className="border border-white p-3 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty state */}
              <tr>
                <td
                  colSpan="8"
                  className="p-6 text-center text-gray-400 italic bg-gray-900 border border-white"
                >
                  No history data available
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Back Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={onBack}
            className="bg-white text-black font-bold px-8 py-3 rounded-md hover:bg-gray-200 transition-all"
          >
            ⬅️ Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default History;
