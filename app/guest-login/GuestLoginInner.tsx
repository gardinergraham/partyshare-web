"use client";


import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import { User, Lock, Calendar } from "lucide-react";

export default function GuestLoginPage() {
  const [partyName, setPartyName] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [guestName, setGuestName] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

 useEffect(() => {
  const spaceId = searchParams.get("space_id");
  const eventName = searchParams.get("name");
  const pin = searchParams.get("pin");
  const redirectUrl = searchParams.get("redirect");

  // Attempt app open if redirect present
  if (redirectUrl) {
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 800);
  }

  // Autofill
  if (eventName) setPartyName(decodeURIComponent(eventName));
  if (pin) setPinCode(pin);

  // If both present → try lookup
  if (eventName && pin) {
    fetch(`${API_BASE_URL}/api/spaces/lookup?name=${encodeURIComponent(
  partyName
  )}&pin_code=${encodeURIComponent(pinCode)}`
  )
      .then((res) => res.json().catch(() => null))
      .then((data) => {
        if (data && data.name) {
          setPartyName(data.name);
          setStatus("🎉 Event found — enter your name to join!");
        } else {
          setStatus("⚠️ Event not found — please check details.");
        }
      })
      .catch(() => {
        setStatus("❌ Error connecting to server.");
      });
  }
}, [searchParams]);


  // ✅ Join event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
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

      const formData = new FormData();
      formData.append("pin", pinCode);
      formData.append("party_name", partyName);
      formData.append("guest_name", guestName);

      const resJoin = await fetch(`${API_BASE_URL}/api/spaces/join-by-pin`, {
        method: "POST",
        body: formData,
      });

      if (!resJoin.ok) {
        const txt = await resJoin.text().catch(() => "");
        console.error("Join POST failed:", resJoin.status, txt);
        setStatus("❌ Could not join. Please try again.");
        setLoading(false);
        return;
      }

      const data = await resJoin.json();
      const spaceId = data.space?.id;

      setStatus("✅ You’ve joined the event! Redirecting...");
      setTimeout(() => {
        router.push(
          `/guest-gallery?space_id=${spaceId}&guest_name=${encodeURIComponent(
            guestName
          )}&pin=${encodeURIComponent(pinCode)}&party_name=${encodeURIComponent(
            partyName
          )}`
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
    <div className="min-h-screen bg-[#0f0f23] text-white flex flex-col items-center justify-center px-2 py-10">
      <div className="w-full bg-[#1b263b] p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/10">
        <h1 className="text-3xl font-bold text-center text-[#e94560] mb-3">
          Join Your Event
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Enter the event name, PIN, and your name to join.
        </p>

        {/* --- Form --- */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Event name */}
          <div className="flex items-center bg-[#1a1a2e]/90 border border-[#555] rounded-3xl px-8 py-9 shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-[#e94560] focus-within:shadow-[#e94560]/40">
            <Calendar size={22} className="text-gray-400" />
            <input
              type="text"
              placeholder="Event name"
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
              required
             readOnly={false}
              className="flex-1 bg-transparent text-white placeholder-gray-400 text-lg pl-2 focus:outline-none"
            />
          </div>

          {/* PIN */}
          <div className="flex items-center bg-[#1a1a2e]/90 border border-[#555] rounded-3xl px-8 py-9 shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-[#e94560] focus-within:shadow-[#e94560]/40">
            <Lock size={26} className="text-gray-300" />
            <input
              type="text"
              placeholder="Enter PIN (e.g. 613399)"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              required
             readOnly={false}
              className="flex-1 bg-transparent text-white placeholder-gray-400 text-xl pl-4 focus:outline-none tracking-widest"
            />
          </div>

          {/* Guest name */}
          <div className="flex items-center bg-[#1a1a2e]/90 border border-[#555] rounded-3xl px-8 py-9 shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-[#e94560] focus-within:shadow-[#e94560]/40">
            <User size={22} className="text-gray-400" />
            <input
              type="text"
              placeholder="Your name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              required
              className="flex-1 bg-transparent text-white placeholder-gray-400 text-lg pl-3 focus:outline-none"
            />
          </div>

          {/* Join Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`w-3/4 rounded-2xl py-5 text-lg font-semibold transition ${
                loading
                  ? "bg-[#e94560]/60 cursor-not-allowed"
                  : "bg-[#e94560] hover:bg-[#ff5b74]"
              }`}
            >
              {loading ? "Joining..." : "Join Event"}
            </button>
          </div>
        </form>

        {status && (
          <p className="text-center text-sm mt-4 text-gray-300">{status}</p>
        )}

        {/* --- App Promo --- */}
        <section className="mt-10 bg-[#0f0f23] rounded-2xl p-6 text-center">
          <h3 className="text-lg font-bold mb-2">Love Party Share?</h3>
          <p className="text-gray-300 mb-4">
            Get the full experience on our mobile app.
          </p>

          <div className="flex items-center justify-center gap-4">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className="h-12 w-[165px] object-contain"
              />
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-12 w-[180px] object-contain"
              />
            </a>
          </div>
        </section>
      </div>

      {/* --- Footer --- */}
      <footer className="mt-8 text-sm text-white text-center flex flex-wrap justify-center gap-6">
        <a href="/terms" className="text-white hover:text-[#e94560]">
          Terms & Conditions
        </a>
        <a href="/forgot-password" className="text-white hover:text-[#e94560]">
          Forgot Password?
        </a>
      </footer>
    </div>
  );
}

