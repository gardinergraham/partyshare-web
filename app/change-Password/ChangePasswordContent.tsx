"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ChangePasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const type = searchParams.get("type") || "user"; // 👈 detect partner/user type
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setStatus("❌ Passwords do not match");
      return;
    }
    if (!token) {
      setStatus("⚠️ Invalid or missing reset token");
      return;
    }

    try {
      setLoading(true);
      setStatus(null);

      // 🔹 Decide correct endpoint based on type
      const endpoint =
        type === "partner"
          ? "/api/partners/reset-password"
          : "/api/auth/reset-password";

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, new_password: password }),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.detail || "Password reset failed");
      }

      setStatus("✅ Your password has been updated successfully!");
    } catch (err: any) {
      console.error(err);
      setStatus(err.message || "❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white flex flex-col items-center justify-center px-6 py-10">
      <div className="max-w-md w-full bg-[#1b263b] rounded-2xl p-6 shadow-lg border border-white/10 relative">
        <h1 className="text-2xl font-bold text-center mb-4 text-[#e94560]">
          Change Password
        </h1>
        <p className="text-center text-gray-300 mb-6">
          {type === "partner"
            ? "Set a new password for your Partner account."
            : "Enter your new password below to reset your account access."}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-xl p-4 bg-[#1a1a2e] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="rounded-xl p-4 bg-[#1a1a2e] border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
          />

          <button
            type="submit"
            disabled={loading}
            className={`bg-[#e94560] hover:bg-[#ff5b74] transition rounded-xl py-3 font-semibold mt-2 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        {status && (
          <p
            className={`text-center mt-4 ${
              status.startsWith("✅") ? "text-green-400" : "text-red-400"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
