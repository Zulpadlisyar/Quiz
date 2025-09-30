import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Feedback = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", { email, message });
    // Placeholder for actual submission logic (e.g., API call)
    alert("Feedback submitted successfully!");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white p-6 gap-6 relative">
      {/* Back Button - Top Left */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-700 transition-colors z-10"
      >
        Back
      </button>

      {/* Title */}
      <h1 className="text-3xl font-bold">Feedback</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-900 border-gray-600 text-white placeholder-gray-400"
            required
          />
        </div>

        {/* Message Textarea */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-white">
            Message
          </Label>
          <textarea
            id="message"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-32 p-3 border border-gray-600 rounded-md bg-gray-900 text-white placeholder-gray-400 resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full"
          disabled={!email || !message.trim()}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Feedback;
