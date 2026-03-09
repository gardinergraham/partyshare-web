"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const s = getStrings();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact/`, {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen flex flex-col items-center px-4 py-12 bg-[var(--ps-bg)]">
  <div className="max-w-xl w-full p-6 rounded-2xl bg-[#13263a] border border-[#1f3a52] shadow-lg">

    <h1 className="text-3xl font-semibold text-center text-[var(--ps-text)] mb-3">
      {s.contactTitle}
    </h1>
        <p className="text-center text-[var(--color-text-muted)] mb-6">
          {s.contactIntro}
        </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name */}
            <input
              type="text"
              placeholder={s.contactNamePlaceholder}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Email */}
            <input
              type="email"
              placeholder={s.contactEmailPlaceholder}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* How can we help */}
            <textarea
              placeholder={s.contactMessagePlaceholder}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="h-40"
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2"
            >
              {loading ? s.contactSending : s.contactSend}
            </button>

            {status === "success" && (
              <p className="text-center text-[var(--color-success)]">
                {s.contactSuccess}
              </p>
            )}

            {status === "error" && (
              <p className="text-center text-[var(--color-error)]">
                {s.contactError}
              </p>
            )}

          </form>

        <div className="text-center text-sm text-[var(--color-text-muted)] mt-6">
          {s.contactOrEmail}{" "}
          <span className="font-medium">support@party-share.com</span>
        </div>
      </div>

      {/* --- Footer --- */}
          <footer className="mt-8 text-sm text-white text-center flex flex-wrap justify-center gap-6">
            <a href="/home" className="text-white hover:text-[#e94560]">
            About Party Share
          </a>
            <a href="/partner" className="text-white hover:text-[#e94560]">
            Become a Partner
          </a>

            <a href="/terms" className="text-white hover:text-[#e94560]">
              Terms & Conditions
            </a>

            <a href="/support" className="text-white hover:text-[#e94560]">
              Support
            </a>

            <a href="/support/contact" className="text-white hover:text-[#e94560]">
              Contact Us
            </a>
          {/* added privacy*/}
            <a href="/privacy" className="text-white hover:text-[#e94560]">
              Privacy Policy
            </a>
          </footer>
    </div>
  );
}
