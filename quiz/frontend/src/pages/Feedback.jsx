import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const Feedback = ({ onBack }) => {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [status, setStatus] = useState({
    loading: false,
    success: null,
    error: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });

    try {
      // Simulasi API call (ganti dengan endpoint real)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Feedback submitted:", formData);

      setStatus({
        loading: false,
        success: "Feedback submitted successfully!",
        error: null,
      });
      setFormData({ email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus({
        loading: false,
        success: null,
        error: "Failed to submit feedback.",
      });
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white p-6 relative">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-700 transition-colors z-10"
        aria-label="Go back"
      >
        Back
      </button>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">Feedback</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus-visible:ring-2 focus-visible:ring-blue-500"
            required
          />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            placeholder="Type your message here..."
            value={formData.message}
            onChange={handleChange}
            className="w-full h-32 p-3 border border-gray-700 rounded-md bg-gray-900 text-white placeholder-gray-400 resize-none focus-visible:ring-2 focus-visible:ring-blue-500"
            required
          />
        </div>

        {/* Status Feedback */}
        <div
          className="text-center text-sm h-5"
          aria-live="polite"
          role="status"
        >
          {status.loading && (
            <span className="text-gray-400">Submitting...</span>
          )}
          {status.success && (
            <span className="text-green-400">{status.success}</span>
          )}
          {status.error && <span className="text-red-400">{status.error}</span>}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full mt-2"
          disabled={
            !formData.email || !formData.message.trim() || status.loading
          }
        >
          {status.loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default Feedback;
