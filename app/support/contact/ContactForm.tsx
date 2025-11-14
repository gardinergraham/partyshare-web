"use client";

import React, { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white flex justify-center px-6 py-16">
      <div className="max-w-xl w-full bg-[#1b263b] p-8 rounded-2xl border border-white/10 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[#e94560] mb-6">
          Contact Support
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-xl bg-[#1a1a2e] border border-gray-700 text-white"
          />

          <input
            type="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-[#1a1a2e] border border-gray-700 text-white"
          />

          <textarea
            placeholder="How can we help?"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-4 rounded-xl bg-[#1a1a2e] h-40 border border-gray-700 text-white"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e94560] py-4 rounded-xl font-semibold hover:bg-[#ff5b74] transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-green-400 text-center">
              Message sent! We'll get back to you shortly.
            </p>
          )}

          {status === "error" && (
            <p className="text-red-400 text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
