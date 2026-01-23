"use client";
import React from "react";

export default function TikTokStore() {
  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white flex flex-col justify-center px-6 py-16">
      <div className="max-w-md mx-auto bg-[#1b263b] p-8 rounded-2xl border border-white/10 shadow-lg text-center">

        {/* Logo / Brand */}
        <h1 className="text-3xl font-bold text-[#e94560] mb-2">
          PartyShare
        </h1>
        <p className="text-gray-300 mb-6">
          Share photos & videos from your events in one place.
        </p>

        {/* Hero */}
        <div className="bg-[#0f0f23] rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Download the app 🎉
          </h2>
          <p className="text-gray-400 text-sm">
            Perfect for parties, weddings, birthdays & group events.
          </p>
        </div>

        {/* Store Buttons */}
        <div className="flex flex-col gap-4 items-center">
          <a
            href="https://apps.apple.com/gb/app/partyshare-events/id6755305083"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="h-12 w-[200px] object-contain hover:scale-105 transition"
            />
          </a>

          <a
            href="https://play.google.com/store/apps/details?id=com.grahamgardiner.partyshare"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-12 w-[210px] object-contain hover:scale-105 transition"
            />
          </a>
        </div>

        {/* Trust / Social proof */}
        <p className="text-gray-400 text-sm mt-8">
          Used for weddings, parties & events worldwide 🌍
        </p>

      </div>

      <footer className="text-center text-xs text-gray-500 mt-8">
        © {new Date().getFullYear()} PartyShare
      </footer>
    </div>
  );
}
