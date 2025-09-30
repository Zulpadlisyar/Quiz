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

app.post("/api/generate-questions", async (req, res) => {
  try {
    const { materi, level, jumlahSoal } = req.body;

    const prompt = `
    Buat ${jumlahSoal} soal pilihan ganda tentang ${materi}, level ${level}.
    Format JSON:
    [
      {
        "id": 1,
        "title": "Pertanyaan...",
        "options": ["A", "B", "C", "D"],
        "answer": "A"
      }
    ]
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const raw = completion.choices[0].message.content;

    let questions;
    try {
      questions = JSON.parse(raw);
    } catch (err) {
      return res
        .status(500)
        .json({ error: "Failed to parse AI response", raw });
    }

    res.json({ questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
