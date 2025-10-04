import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// ------------------ AI ROUTE ------------------
app.post("/generate-quiz", async (req, res) => {
  const { materi, level, jumlahSoal } = req.body;

  // Validasi input dari frontend
  if (!materi || !level || !jumlahSoal) {
    return res.status(400).json({ error: "Semua field wajib diisi." });
  }

  try {
    const prompt = `
      Buat ${jumlahSoal} soal pilihan ganda untuk mata pelajaran ${materi}, tingkat kesulitan ${level}.
      Jawab HANYA dengan format JSON murni TANPA teks tambahan:
      [
        {
          "question": "Pertanyaannya...",
          "options": ["A", "B", "C", "D"],
          "answer": "A"
        }
      ]
    `;

    // 🔥 Panggil OpenAI
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const rawText = completion.choices[0]?.message?.content?.trim();
    if (!rawText) {
      throw new Error("AI tidak memberikan jawaban yang valid.");
    }

    // 🧹 Bersihkan output jika ada teks tambahan
    const jsonStart = rawText.indexOf("[");
    const jsonEnd = rawText.lastIndexOf("]");
    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("AI tidak mengirim format JSON yang diharapkan.");
    }

    const jsonText = rawText.slice(jsonStart, jsonEnd + 1);

    // 🚦 Coba parse JSON
    let questions;
    try {
      questions = JSON.parse(jsonText);
    } catch (parseError) {
      console.error("❌ JSON Parse Error:", parseError);
      throw new Error("Gagal mengurai hasil dari AI. Format tidak valid.");
    }

    // ✅ Kirim hasil ke frontend
    res.json({ questions });
  } catch (error) {
    console.error("❌ SERVER ERROR:", error.message);
    res.status(500).json({
      error: "Gagal membuat soal dari AI.",
      details: error.message,
    });
  }
});
