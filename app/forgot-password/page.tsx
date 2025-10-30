"use client";

import React, { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending password reset link...");

    // Simulate request (replace with backend call later)
    setTimeout(() => {
      setLoading(false);
      setStatus("✅ If your email exists, you’ll receive a reset link shortly.");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white flex flex-col items-center justify-center px-6 py-10">
      <div className="max-w-md w-full bg-[#1b263b] rounded-2xl p-8 shadow-lg border border-white/10">
        {/* Back Button */}
        <a
          href="/guest-login"
          className="inline-block mb-4 text-gray-300 hover:text-[#e94560] transition text-sm"
        >
          ← Back to Login
        </a>

        <h1 className="text-2xl font-bold text-center text-[#e94560] mb-4">
          Forgot Password
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Enter your account email and we’ll send a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex items-center bg-[#1a1a2e] border border-[#666] rounded-2xl px-4 py-5 focus-within:ring-2 focus-within:ring-[#e94560]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 01-8 0m8 0a4 4 0 01-8 0m8 0v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6m12 0a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2"
              />
            </svg>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-transparent text-white placeholder-gray-400 text-lg pl-3 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#e94560] hover:bg-[#ff5b74] transition rounded-2xl py-4 font-semibold shadow-md"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {status && (
          <p className="text-center text-sm mt-6 text-gray-300">{status}</p>
        )}
      </div>
    </div>
  );
}
