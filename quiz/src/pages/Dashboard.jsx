import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Dashboard = ({ onStartQuiz, onViewHistory }) => {
  const [username, setUsername] = useState("");
  const [materi, setMateri] = useState("");
  const [waktu, setWaktu] = useState("");
  const [level, setLevel] = useState("");
  const [jumlahSoal, setJumlahSoal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStartQuiz = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, materi, waktu, level, jumlahSoal }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();

      if (data.questions) {
        onStartQuiz(
          { username, materi, waktu, level, jumlahSoal },
          data.questions
        );
      } else {
        setError("Gagal mendapatkan soal dari server.");
      }
    } catch (err) {
      console.error("❌ Error:", err);
      setError("Terjadi kesalahan saat memulai quiz. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !username || !materi || !waktu || !level || !jumlahSoal;

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white p-6 gap-6 relative">
      {/* Tombol History */}
      <button
        onClick={onViewHistory}
        className="absolute top-4 right-4 bg-gray-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-700 transition-colors z-10"
      >
        History
      </button>

      {/* Judul */}
      <h1 className="text-4xl font-bold tracking-wide">Cakrawala</h1>

      {/* Input Username */}
      <div className="grid w-full max-w-sm gap-2">
        <Label htmlFor="username" className="text-sm">
          Username
        </Label>
        <Input
          type="text"
          id="username"
          placeholder="Type here..."
          className="bg-gray-900 border border-gray-700 text-white placeholder-gray-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
        {/* Materi */}
        <div className="space-y-2">
          <Label className="text-sm">Materi</Label>
          <Select value={materi} onValueChange={setMateri}>
            <SelectTrigger className="bg-gray-900 border border-gray-700 text-white">
              <SelectValue placeholder="Pilih materi" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white border border-gray-700">
              <SelectItem value="matematika">Matematika</SelectItem>
              <SelectItem value="fisika">Fisika</SelectItem>
              <SelectItem value="kimia">Kimia</SelectItem>
              <SelectItem value="biologi">Biologi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Waktu */}
        <div className="space-y-2">
          <Label className="text-sm">Waktu</Label>
          <Select value={waktu} onValueChange={setWaktu}>
            <SelectTrigger className="bg-gray-900 border border-gray-700 text-white">
              <SelectValue placeholder="Pilih waktu" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white border border-gray-700">
              <SelectItem value="30">30 Menit</SelectItem>
              <SelectItem value="45">45 Menit</SelectItem>
              <SelectItem value="60">60 Menit</SelectItem>
              <SelectItem value="90">90 Menit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Level */}
        <div className="space-y-2">
          <Label className="text-sm">Level</Label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="bg-gray-900 border border-gray-700 text-white">
              <SelectValue placeholder="Pilih level" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white border border-gray-700">
              <SelectItem value="mudah">Mudah</SelectItem>
              <SelectItem value="sedang">Sedang</SelectItem>
              <SelectItem value="sulit">Sulit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Jumlah Soal */}
        <div className="space-y-2">
          <Label className="text-sm">Jumlah Soal</Label>
          <Select value={jumlahSoal} onValueChange={setJumlahSoal}>
            <SelectTrigger className="bg-gray-900 border border-gray-700 text-white">
              <SelectValue placeholder="Pilih jumlah" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white border border-gray-700">
              <SelectItem value="10">10 Soal</SelectItem>
              <SelectItem value="20">20 Soal</SelectItem>
              <SelectItem value="30">30 Soal</SelectItem>
              <SelectItem value="50">50 Soal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-400 text-sm text-center mt-2">{error}</p>
      )}

      {/* Tombol Start Quiz */}
      <Button
        onClick={handleStartQuiz}
        disabled={isDisabled || loading}
        className={`w-full max-w-sm h-12 text-base mt-8 
          ${
            isDisabled || loading
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-200"
          }
        `}
      >
        {loading ? "Loading..." : "Start Quiz"}
      </Button>
    </div>
  );
};

Dashboard.propTypes = {
  onStartQuiz: PropTypes.func.isRequired,
  onViewHistory: PropTypes.func.isRequired,
};

export default Dashboard;
