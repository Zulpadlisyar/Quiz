import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useNavigate } from "react-router-dom";

const History = ({ history }) => {
  const navigate = useNavigate();

  if (!history || history.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="text-6xl mb-4">📝</div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            History Quiz
          </h1>
          <p className="text-gray-600 mb-6">
            Belum ada riwayat quiz. Mulai quiz pertama kamu!
          </p>
          <Button
            onClick={() => navigate("/")}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            🚀 Mulai Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">📜 History Quiz</h1>
          <Button onClick={() => navigate("/")} variant="outline">
            🏠 Dashboard
          </Button>
        </div>

        <div className="space-y-4">
          {history.map((item, index) => {
            const percentage = (
              (item.score / item.totalQuestions) *
              100
            ).toFixed(1);
            return (
              <Card
                key={index}
                className="shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">
                          {percentage >= 80
                            ? "🎉"
                            : percentage >= 60
                            ? "👍"
                            : "💪"}
                        </span>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {item.username}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.timestamp}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-semibold">Materi:</span>{" "}
                          {item.materi}
                        </div>
                        <div>
                          <span className="font-semibold">Level:</span>{" "}
                          {item.level}
                        </div>
                        <div>
                          <span className="font-semibold">Jumlah Soal:</span>{" "}
                          {item.jumlahSoal}
                        </div>
                        <div>
                          <span className="font-semibold">Skor:</span>{" "}
                          <span className="text-indigo-600 font-bold">
                            {item.score}/{item.totalQuestions} ({percentage}%)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold text-indigo-600">
                        {item.score}
                      </div>
                      <div className="text-sm text-gray-600">
                        / {item.totalQuestions}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default History;
