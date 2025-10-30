"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { apiPost, API_BASE_URL } from "@/lib/api";

export default function GuestLoginPage() {
  const [partyName, setPartyName] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [guestName, setGuestName] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 🧩 Lookup event by name + pin
    const fetchEventByNameAndPin = async () => {
        try {
        const res = await fetch(
    `${API_BASE_URL}/api/spaces/lookup?name=${encodeURIComponent(
        partyName
    )}&pin_code=${encodeURIComponent(pinCode)}`
    );

  const event = await res.json();

    // Just check if it matches (since it’s a single object)
    if (
    event &&
    event.name?.trim().toLowerCase() === partyName.trim().toLowerCase() &&
    event.pin_code?.trim() === pinCode.trim()
    ) {
    return event;
    }

    return null;

    } catch (err) {
      console.error("Event lookup failed:", err);
      return null;
    }
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
        // 1️⃣ Lookup the event first (GET still valid)
        const resLookup = await fetch(
        `${API_BASE_URL}/api/spaces/lookup?name=${encodeURIComponent(
            partyName
        )}&pin_code=${encodeURIComponent(pinCode)}`
        );

        if (!resLookup.ok) {
        setStatus("❌ Event not found — please check name and PIN.");
        setLoading(false);
        return;
        }

        const event = await resLookup.json();

        // 2️⃣ Create FormData for join-by-pin
        const formData = new FormData();
        formData.append("pin", pinCode);
        formData.append("party_name", partyName);
        formData.append("guest_name", guestName);

        // 3️⃣ POST to correct endpoint
        const resJoin = await fetch(`${API_BASE_URL}/api/spaces/join-by-pin`, {
        method: "POST",
        body: formData,
        });

        if (!resJoin.ok) {
        const errText = await resJoin.text();
        console.error("Join error:", errText);
        setStatus("❌ Could not join. Check details and try again.");
        setLoading(false);
        return;
        }

        const data = await resJoin.json();
        const spaceId = data.space?.id;
        const guest = guestName;

        // 4️⃣ Redirect
        setStatus("✅ You’ve joined the event! Redirecting...");
        setTimeout(() => {
        router.push(
            `/guest-gallery?space_id=${spaceId}&guest_name=${encodeURIComponent(guest)}&pin=${encodeURIComponent(pinCode)}&party_name=${encodeURIComponent(partyName)}`
        );
        }, 1200);

    } catch (err) {
        console.error("Join error:", err);
        setStatus("❌ Something went wrong — please try again.");
    } finally {
        setLoading(false);
    }
    };


  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white flex flex-col items-center justify-center px-6 py-10">
      <div className="max-w-md w-full bg-[#1b263b] rounded-2xl p-6 shadow-lg border border-white/10">
        <h1 className="text-2xl font-bold text-center mb-4 text-[#e94560]">
          Join Your Event
        </h1>
        <p className="text-center text-gray-300 mb-6">
          Enter the event name, PIN, and your name to join.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Event name"
            value={partyName}
            onChange={(e) => setPartyName(e.target.value)}
            required
            className="rounded-lg p-3 bg-[#0f172a] border border-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="PIN (e.g. 613399)"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            required
            className="rounded-lg p-3 bg-[#0f172a] border border-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Your name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
            className="rounded-lg p-3 bg-[#0f172a] border border-gray-700 text-white placeholder-gray-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#e94560] hover:bg-[#ff5b74] transition rounded-lg py-3 font-semibold mt-2"
          >
            {loading ? "Joining..." : "Join Event"}
          </button>
        </form>

        {status && (
          <p className="text-center text-sm mt-4 text-gray-300">{status}</p>
        )}

        {/* App promo */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-[#0f0f23] p-6 text-center">
          <h3 className="text-xl font-bold mb-2">Love PartyShare?</h3>
          <p className="text-gray-300 mb-4">
            Get the full experience on our mobile app.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://apps.apple.com"
              target="_blank"
              className="rounded-lg border border-white/10 px-4 py-2 hover:bg-white/5"
            >
              App Store
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              className="rounded-lg border border-white/10 px-4 py-2 hover:bg-white/5"
            >
              Google Play
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
