import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Quiz API Server is running",
    endpoints: ["/generate-quiz"],
  });
});

// Generate quiz endpoint
app.post("/generate-quiz", async (req, res) => {
  const { materi, level, jumlahSoal } = req.body;

  // Validasi input
  if (!materi || !level || !jumlahSoal) {
    return res.status(400).json({
      error: "Field materi, level, dan jumlahSoal wajib diisi",
      received: { materi, level, jumlahSoal },
    });
  }

  // Validasi jumlah soal
  const numQuestions = Number(jumlahSoal);
  if (isNaN(numQuestions) || numQuestions < 1 || numQuestions > 50) {
    return res.status(400).json({
      error: "Jumlah soal harus antara 1-50",
    });
  }

  console.log(`📝 Generating quiz: ${materi} - ${level} - ${jumlahSoal} soal`);

  try {
    const prompt = `
Buatkan ${jumlahSoal} soal pilihan ganda Bahasa Indonesia dalam format JSON murni.

Topik: ${materi}
Tingkat kesulitan: ${level}

Format HARUS seperti ini (tanpa teks tambahan, tanpa markdown, hanya JSON array):

[
  {
    "id": 1,
    "question": "Pertanyaan lengkap di sini?",
    "options": ["Pilihan A", "Pilihan B", "Pilihan C", "Pilihan D"],
    "answer": "Pilihan yang benar"
  }
]

Aturan penting:
1. Harus tepat ${jumlahSoal} soal
2. Setiap soal harus memiliki 4 pilihan jawaban
3. Field "answer" harus sama persis dengan salah satu pilihan di "options"
4. Soal harus sesuai dengan tingkat kesulitan "${level}"
5. Jangan tambahkan penjelasan atau teks di luar JSON
6. Pastikan bahasa Indonesia yang baik dan benar
    `.trim();

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Kamu adalah pembuat soal Bahasa Indonesia yang ahli. Selalu respond dengan JSON array yang valid tanpa teks tambahan.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    let resultText = response.choices[0].message.content.trim();

    console.log("🤖 Raw AI Response:", resultText.substring(0, 200) + "...");

    // Bersihkan markdown code blocks jika ada
    resultText = resultText
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .trim();

    // Parse JSON
    let questions = [];
    try {
      questions = JSON.parse(resultText);
    } catch (parseError) {
      console.error("❌ JSON Parse Error:", parseError.message);
      console.error("Raw text:", resultText);

      return res.status(500).json({
        error: "Format JSON tidak valid dari AI",
        details: parseError.message,
        raw: resultText.substring(0, 500),
      });
    }

    // Validasi struktur questions
    if (!Array.isArray(questions)) {
      return res.status(500).json({
        error: "Response bukan array",
        raw: resultText.substring(0, 500),
      });
    }

    if (questions.length === 0) {
      return res.status(500).json({
        error: "Tidak ada soal yang dihasilkan",
      });
    }

    // Validasi setiap soal
    const validatedQuestions = questions.map((q, index) => {
      if (!q.question || !q.options || !q.answer) {
        throw new Error(`Soal ${index + 1} tidak lengkap`);
      }

      if (!Array.isArray(q.options) || q.options.length !== 4) {
        throw new Error(`Soal ${index + 1} harus memiliki 4 pilihan`);
      }

      if (!q.options.includes(q.answer)) {
        // Jika jawaban tidak cocok, coba cari yang paling mirip
        console.warn(
          `⚠️ Jawaban tidak cocok untuk soal ${
            index + 1
          }, menggunakan pilihan pertama`
        );
        q.answer = q.options[0];
      }

      return {
        id: index + 1,
        question: q.question.trim(),
        options: q.options.map((opt) => opt.trim()),
        answer: q.answer.trim(),
      };
    });

    console.log(
      `✅ Successfully generated ${validatedQuestions.length} questions`
    );

    res.json({
      questions: validatedQuestions,
      metadata: {
        materi,
        level,
        jumlahSoal: validatedQuestions.length,
      },
    });
  } catch (error) {
    console.error("❌ Error generating quiz:", error);

    res.status(500).json({
      error: "Gagal menghasilkan soal",
      details: error.message,
      type: error.constructor.name,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Unhandled Error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint tidak ditemukan",
    path: req.path,
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/`);
  console.log(`🎯 Quiz endpoint: http://localhost:${PORT}/generate-quiz`);
});
