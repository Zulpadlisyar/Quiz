import React, { useState } from "react";
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

  const handleStartQuiz = () => {
    onStartQuiz({
      username,
      materi,
      waktu,
      level,
      jumlahSoal,
    });
  };

  return (
    <div className="bg-[var(--background)] min-h-screen flex flex-col items-center justify-center text-[var(--text-primary)] p-6 gap-6 relative">
      {/* History Button - Top Right */}
      <button
        onClick={onViewHistory}
        className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800 transition-colors z-10"
      >
        History
      </button>

      {/* Title */}
      <h1 className="text-3xl font-bold font-heading">Cakrawala</h1>

      {/* Username Input */}
      <div className="grid w-full max-w-sm gap-2">
        <Label htmlFor="username" className="font-button">
          Username
        </Label>
        <Input
          type="text"
          id="username"
          placeholder="Type here..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Materi */}
        <div className="space-y-2">
          <Label className="text-foreground text-sm">Materi</Label>
          <Select value={materi} onValueChange={setMateri}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih materi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="matematika">Matematika</SelectItem>
              <SelectItem value="fisika">Fisika</SelectItem>
              <SelectItem value="kimia">Kimia</SelectItem>
              <SelectItem value="biologi">Biologi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Waktu */}
        <div className="space-y-2">
          <Label className="text-foreground text-sm">Waktu</Label>
          <Select value={waktu} onValueChange={setWaktu}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih waktu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 Menit</SelectItem>
              <SelectItem value="45">45 Menit</SelectItem>
              <SelectItem value="60">60 Menit</SelectItem>
              <SelectItem value="90">90 Menit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Level */}
        <div className="space-y-2">
          <Label className="text-foreground text-sm">Level</Label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mudah">Mudah</SelectItem>
              <SelectItem value="sedang">Sedang</SelectItem>
              <SelectItem value="sulit">Sulit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Jumlah Soal */}
        <div className="space-y-2">
          <Label className="text-foreground text-sm">Jumlah Soal</Label>
          <Select value={jumlahSoal} onValueChange={setJumlahSoal}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih jumlah" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 Soal</SelectItem>
              <SelectItem value="20">20 Soal</SelectItem>
              <SelectItem value="30">30 Soal</SelectItem>
              <SelectItem value="50">50 Soal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Start Quiz Button */}
      <Button
        onClick={handleStartQuiz}
        variant="quiz"
        size="lg"
        className="w-full h-12 text-base mt-8"
        disabled={!username || !materi || !waktu || !level || !jumlahSoal}
      >
        Start Quiz
      </Button>
    </div>
  );
};

export default Dashboard;
