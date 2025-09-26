import React from "react";
import { Button } from "@/components/ui/button";

const History = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold text-center">History</h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-600">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-600 p-2 text-left">No</th>
                <th className="border border-gray-600 p-2 text-left">
                  Username
                </th>
                <th className="border border-gray-600 p-2 text-left">Materi</th>
                <th className="border border-gray-600 p-2 text-left">Level</th>
                <th className="border border-gray-600 p-2 text-left">Waktu</th>
                <th className="border border-gray-600 p-2 text-left">
                  Jawaban
                </th>
                <th className="border border-gray-600 p-2 text-left">Soal</th>
                <th className="border border-gray-600 p-2 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {/* Empty for now */}
              <tr>
                <td
                  colSpan="8"
                  className="border border-gray-600 p-4 text-center text-gray-400"
                >
                  No history data available
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <Button
          onClick={onBack}
          className="bg-white text-black rounded-full px-8 py-3 font-semibold hover:bg-gray-100 self-center"
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default History;
