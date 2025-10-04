import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ onStartQuiz, onViewHistory }) => {
  const [username, setUsername] = useState("");
  const [materi, setMateri] = useState("");
  const [waktu, setWaktu] = useState("");
  const [level, setLevel] = useState("");
  const [jumlahSoal, setJumlahSoal] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleStartQuiz = async () => {
    // Validasi input
    if (!username || !materi || !waktu || !level || !jumlahSoal) {
      alert("⚠️ Semua field wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          materi,
          level,
          jumlahSoal: Number(jumlahSoal),
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Gagal menghasilkan soal dari server.");
      }

      const data = await response.json();

      // Validasi response
      if (
        !data.questions ||
        !Array.isArray(data.questions) ||
        data.questions.length === 0
      ) {
        throw new Error("Server tidak mengirimkan data soal yang valid.");
      }

      // Kirim data ke parent component
      onStartQuiz({
        username,
        materi,
        waktu,
        level,
        jumlahSoal,
        questions: data.questions,
      });

      // Navigate ke halaman quiz
      navigate("/quiz");
    } catch (error) {
      console.error("❌ Gagal generate soal:", error);
      alert(
        error.message ||
          "Terjadi kesalahan saat menghasilkan soal. Pastikan server backend sudah berjalan."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex flex-col items-center justify-center text-gray-800 p-6 gap-6 relative">
      <Button
        onClick={onViewHistory}
        variant="outline"
        size="sm"
        className="absolute top-4 right-4"
      >
        📜 History
      </Button>

      <div className="text-center mb-4">
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">
          🌟 Cakrawala
        </h1>
        <p className="text-gray-600">Platform Quiz Bahasa Indonesia</p>
      </div>

      {/* Username */}
      <div className="grid w-full max-w-sm gap-2">
        <Label htmlFor="username" className="font-semibold">
          Username
        </Label>
        <Input
          type="text"
          id="username"
          placeholder="Ketik nama kamu..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-gray-300 focus:border-indigo-500"
        />
      </div>

      {/* Pilihan Materi, Waktu, Level, Jumlah Soal */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        <div className="space-y-2">
          <Label className="font-semibold">Materi</Label>
          <Select value={materi} onValueChange={setMateri}>
            <SelectTrigger className="border-2 border-gray-300">
              <SelectValue placeholder="Pilih materi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ejaan">📝 Ejaan</SelectItem>
              <SelectItem value="tata bahasa">📚 Tata Bahasa</SelectItem>
              <SelectItem value="kosakata">💬 Kosakata</SelectItem>
              <SelectItem value="pemahaman teks">📖 Pemahaman Teks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="font-semibold">Waktu</Label>
          <Select value={waktu} onValueChange={setWaktu}>
            <SelectTrigger className="border-2 border-gray-300">
              <SelectValue placeholder="Pilih waktu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">⏱️ 30 Menit</SelectItem>
              <SelectItem value="45">⏱️ 45 Menit</SelectItem>
              <SelectItem value="60">⏱️ 60 Menit</SelectItem>
              <SelectItem value="90">⏱️ 90 Menit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="font-semibold">Level</Label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="border-2 border-gray-300">
              <SelectValue placeholder="Pilih level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mudah">😊 Mudah</SelectItem>
              <SelectItem value="sedang">😐 Sedang</SelectItem>
              <SelectItem value="sulit">😤 Sulit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="font-semibold">Jumlah Soal</Label>
          <Select value={jumlahSoal} onValueChange={setJumlahSoal}>
            <SelectTrigger className="border-2 border-gray-300">
              <SelectValue placeholder="Pilih jumlah" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 Soal</SelectItem>
              <SelectItem value="10">10 Soal</SelectItem>
              <SelectItem value="20">20 Soal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tombol Mulai */}
      <Button
        onClick={handleStartQuiz}
        className="w-full max-w-sm bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6 text-lg"
        disabled={loading}
      >
        {loading ? "⏳ Menghasilkan Soal..." : "🚀 Mulai Quiz"}
      </Button>

      {loading && (
        <div className="text-sm text-gray-600 animate-pulse">
          Sedang berkomunikasi dengan AI...
        </div>
      )}
    </div>
  );
};

export default Dashboard;
