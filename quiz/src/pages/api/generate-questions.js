// src/pages/api/generate-questions.js

export async function generateQuestions(topic, number) {
  try {
    const res = await fetch("/api/generate-questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, number }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    return { error: "Failed to generate questions" };
  }
}
