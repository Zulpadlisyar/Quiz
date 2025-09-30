import React from "react";
import { Button } from "@/components/ui/button";

const History = ({ onBack, data = [] }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl space-y-8">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center tracking-wide">
          History
        </h1>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-lg">
          <table className="w-full border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="border border-gray-700 px-4 py-2 text-left">
                  No
                </th>
                <th className="border border-gray-700 px-4 py-2 text-left">
                  Username
                </th>
                <th className="border border-gray-700 px-4 py-2 text-left">
                  Materi
                </th>
                <th className="border border-gray-700 px-4 py-2 text-left">
                  Level
                </th>
                <th className="border border-gray-700 px-4 py-2 text-left">
                  Waktu
                </th>
                <th className="border border-gray-700 px-4 py-2 text-left">
                  Jawaban
                </th>
                <th className="border border-gray-700 px-4 py-2 text-left">
                  Soal
                </th>
                <th className="border border-gray-700 px-4 py-2 text-left">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-6 text-center text-gray-400 italic"
                  >
                    No history data available
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-black" : "bg-gray-900"}
                  >
                    <td className="border border-gray-700 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {item.username}
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {item.materi}
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {item.level}
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {item.waktu} menit
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {item.jawaban}
                    </td>
                    <td className="border border-gray-700 px-4 py-2">
                      {item.soal}
                    </td>
                    <td className="border border-gray-700 px-4 py-2 font-semibold">
                      {item.score}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Back Button */}
        <div className="flex justify-center">
          <Button
            onClick={onBack}
            className="bg-white text-black rounded-full px-8 py-3 font-semibold transition-colors hover:bg-gray-200"
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default History;
