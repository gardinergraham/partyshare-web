"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Reset link sent to: ${email}`);
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white flex flex-col items-center justify-center px-6 py-10">
      <div className="max-w-md w-full bg-[#1b263b] rounded-2xl p-6 shadow-lg border border-white/10 relative">
        {/* Back Link */}
        <Link
          href="/guest-login"
          className="absolute top-4 left-4 text-white hover:text-[#e94560] transition text-sm"
        >
          ← Back to Login
        </Link>

        <h1 className="text-2xl font-bold text-center mb-4 text-[#e94560]">
          Forgot Password
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Enter your account email and we’ll send a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-xl p-4 bg-[#1a1a2e] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
          />
          <button
            type="submit"
            className="bg-[#e94560] hover:bg-[#ff5b74] transition rounded-xl py-3 font-semibold mt-2"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
