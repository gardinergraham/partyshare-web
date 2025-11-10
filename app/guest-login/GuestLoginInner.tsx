
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
  const [appDetected, setAppDetected] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Deep link scheme for your app (replace with your actual app scheme)
  const APP_SCHEME = "https://party-share.uk";
  const APP_STORE_URL = "https://apps.apple.com/yourapp"; // Replace with your App Store URL
  const PLAY_STORE_URL = "https://play.google.com/yourapp"; // Replace with your Play Store URL

  useEffect(() => {
    const spaceId = searchParams.get("space_id");
    const eventName = searchParams.get("name");
    const pin = searchParams.get("pin");
    const redirectUrl = searchParams.get("redirect");

    // Check if device likely has the app installed
    const detectApp = () => {
      // Method 1: Check if we came from a deep link (iOS)
      if (document.referrer.includes(APP_SCHEME)) {
        return true;
      }
      
      // Method 2: Try to trigger app and see if we get redirected back (Android/iOS)
      setTimeout(() => {
        window.location.href = APP_SCHEME + "guest-login";
        setTimeout(() => {
          // If we're still here after 1 second, app probably not installed
          setAppDetected(false);
        }, 1000);
      }, 100);
      
      return false;
    };

    // Attempt app open if we detect it or have redirect URL
    if (redirectUrl || detectApp()) {
      setAppDetected(true);
      setTimeout(() => {
        const deepLinkUrl = `${APP_SCHEME}guest-login?name=${encodeURIComponent(eventName || '')}&pin=${encodeURIComponent(pin || '')}`;
        window.location.href = deepLinkUrl;
        
        // Fallback to app stores if app not installed
        setTimeout(() => {
          // If we're still here, redirect to app store
          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
          const isAndroid = /Android/.test(navigator.userAgent);
          
          if (isIOS) {
            window.location.href = APP_STORE_URL;
          } else if (isAndroid) {
            window.location.href = PLAY_STORE_URL;
          }
        }, 1500);
      }, 800);
    }

    // Autofill
    if (eventName) setPartyName(decodeURIComponent(eventName));
    if (pin) setPinCode(pin);

    // If both present → try lookup
    if (eventName && pin) {
      fetch(`${API_BASE_URL}/api/spaces/lookup?name=${encodeURIComponent(eventName)}&pin_code=${encodeURIComponent(pin)}`)
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

  // Open in app function
  const openInApp = () => {
    const deepLinkUrl = `${APP_SCHEME}guest-login?name=${encodeURIComponent(partyName)}&pin=${encodeURIComponent(pinCode)}`;
    window.location.href = deepLinkUrl;
    
    // Fallback to app stores
    setTimeout(() => {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isAndroid = /Android/.test(navigator.userAgent);
      
      if (isIOS) {
        window.location.href = APP_STORE_URL;
      } else if (isAndroid) {
        window.location.href = PLAY_STORE_URL;
      } else {
        setStatus("📱 App not detected - using web version");
      }
    }, 1500);
  };

  // ✅ Join event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If app is detected and we have both fields, suggest using app
    if (appDetected && partyName && pinCode) {
      setStatus("📱 Opening in PartyShare app...");
      openInApp();
      return;
    }
    
    setLoading(true);
    setStatus(null);

    try {
      const resLookup = await fetch(
        `${API_BASE_URL}/api/spaces/lookup?name=${encodeURIComponent(partyName)}&pin_code=${encodeURIComponent(pinCode)}`
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

      // ... rest of your join logic
      
    } catch (error) {
      setStatus("❌ Network error — please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f23] text-white flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-[#1b263b] p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/10">
        <h1 className="text-3xl font-bold text-center text-[#e94560] mb-3">
          Join Your Event
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Enter the event name, PIN, and your name to join.
        </p>

        {appDetected && (
          <div className="mb-6 p-4 bg-blue-500/20 border border-blue-500 rounded-xl text-center">
            <p className="text-blue-300">📱 PartyShare app detected!</p>
            <button
              onClick={openInApp}
              className="mt-2 bg-[#e94560] hover:bg-[#ff5b74] px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Open in App
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Your existing form fields */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl">
              <Calendar className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Event Name"
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                required
              />
            </div>

            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl">
              <Lock className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="PIN Code"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                required
              />
            </div>

            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl">
              <User className="text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Your Name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          {status && (
            <p className="text-center text-sm p-3 rounded-xl bg-white/5">
              {status}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e94560] hover:bg-[#ff5b74] py-4 rounded-xl font-semibold transition-colors disabled:opacity-50"
          >
            {loading ? "Joining..." : "Join Event"}
          </button>
        </form>

        {partyName && pinCode && !appDetected && (
          <div className="mt-6 text-center">
            <button
              onClick={openInApp}
              className="text-blue-400 hover:text-blue-300 underline text-sm"
            >
              📱 Open in PartyShare App
            </button>
          </div>
        )}
      </div>
    </div>
  );
}