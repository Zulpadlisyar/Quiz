import handler from "./src/api/generate-questions.js";

async function testHandler(body, expectedStatus = 200, expectedError = null) {
  const req = {
    method: "POST",
    body: body,
    headers: { "content-type": "application/json" },
  };

  const res = {
    statusCode: null,
    jsonData: null,
    status: function (code) {
      this.statusCode = code;
      return this;
    },
    json: function (data) {
      this.jsonData = data;
      return this;
    },
  };

  // Mock res.end
  const originalEnd = res.end;
  res.end = function () {
    originalEnd.call(this);
  };

  try {
    await handler(req, res);
    console.log(`Status: ${res.statusCode || 500}`);
    console.log("Response:", res.jsonData);
    if (expectedStatus !== res.statusCode) {
      console.error(
        "Expected status:",
        expectedStatus,
        "but got:",
        res.statusCode
      );
    }
    if (expectedError && !res.jsonData?.error?.includes(expectedError)) {
      console.error(
        "Expected error:",
        expectedError,
        "but got:",
        res.jsonData?.error
      );
    }
  } catch (err) {
    console.error("Error in test:", err);
  }
}

// Test 1: Valid input
console.log("Test 1: Valid input");
testHandler({ materi: "huruf", level: "mudah", jumlahSoal: 5 });

// Test 2: Missing fields
console.log("\nTest 2: Missing fields");
testHandler({ materi: "huruf", level: "mudah" }, 400, "Missing fields");

// Test 3: Invalid jumlahSoal
console.log("\nTest 3: Invalid jumlahSoal");
testHandler(
  { materi: "huruf", level: "mudah", jumlahSoal: "abc" },
  400,
  "number"
);

// Test 4: jumlahSoal too large
console.log("\nTest 4: jumlahSoal too large");
testHandler(
  { materi: "huruf", level: "mudah", jumlahSoal: 60 },
  400,
  "between 1 and 50"
);

// Note: OpenAI tests skipped due to API key requirement
console.log(
  "\nNote: OpenAI integration tests skipped as VITE_OPENAI_API_KEY is not accessible."
);
