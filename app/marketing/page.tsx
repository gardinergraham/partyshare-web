// app/marketing/page.tsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  Camera, 
  QrCode, 
  Users, 
  Printer, 
  Star,
  ChevronDown,
  Sparkles,
  CheckCircle,
  Heart,
  Download,
  Smartphone,
  Play
} from "lucide-react";

const APP_STORE_LINK =
  "https://apps.apple.com/gb/app/partyshare-events/id6755305083";

const PLAY_STORE_LINK =
  "https://play.google.com/store/apps/details?id=com.grahamgardiner.partyshare";

export default function MarketingPage() {
 

  return (
    <div className="min-h-screen bg-[#0f0f23] text-white overflow-hidden">
      {/* ================= HERO ================= */}
        <section className="relative min-h-[100vh] flex items-center justify-center px-6 py-20">

          {/* Background */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/rosesWhite.webp"
              alt="Background"
              fill
              priority
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f23]/50 via-[#0f0f23]/80 to-[#0f0f23]" />
          </div>

          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#e94560]/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#ffd700]/10 rounded-full blur-[120px]" />

          {/* Content */}
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">

            {/* Logo */}
            <div className="w-1/4 max-w-[220px] mb-8">
              <img
                src="/images/iconweb.webp"
                alt="App Icon"
                className="w-full h-auto rounded-2xl shadow-2xl mx-auto"
              />
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-5 py-2 text-sm text-[#ffd6e8] mb-8 border border-white/20">
              <Star className="w-4 h-4 fill-[#ffd700] text-[#ffd700]" />
              <span>The #1 Event Photo Sharing App</span>
              <Star className="w-4 h-4 fill-[#ffd700] text-[#ffd700]" />
            </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="inline-block bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
                  Every Photo.
                </span>
                <br />
                <span className="inline-block bg-gradient-to-r from-[#e94560] via-[#ff6b8a] to-[#ffd700] bg-clip-text text-transparent">
                  Every Memory.
                </span>
                <br />
                <span className="inline-block bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
                  One Place.
                </span>
              </h1>

          <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
            Your guests scan a QR code. Their photos appear instantly in your private gallery. 
            It's that simple.
          </p>

          {/* App Store Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href={APP_STORE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-105 transition-transform"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className="h-14 w-auto"
              />
            </a>
            <a
              href={PLAY_STORE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-105 transition-transform"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-14 w-auto"
              />
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
              <span>No account needed for guests</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
              <span>Works on any device</span>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/50" />
          </div>
        </div>
      </section>

      {/* ================= SOCIAL PROOF BAR ================= */}
      <section className="bg-gradient-to-r from-[#1a1a2e] to-[#0f0f23] py-8 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-[#ffd700]">10,000+</p>
              <p className="text-sm text-gray-400">Photos Shared</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-[#e94560]">500+</p>
              <p className="text-sm text-gray-400">Events Created</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-3xl sm:text-4xl font-bold text-white">
                4.9 <Star className="w-6 h-6 fill-[#ffd700] text-[#ffd700]" />
              </div>
              <p className="text-sm text-gray-400">App Store Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-[#4CAF50]">100%</p>
              <p className="text-sm text-gray-400">Free to Try</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#e94560] to-[#ff6b8a] p-12 sm:p-16 text-center overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <Sparkles className="w-12 h-12 mx-auto mb-6 text-white/80" />
              
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Ready to Capture
                <br />
                Every Memory?
              </h2>
              
              <p className="text-xl text-white/90 max-w-xl mx-auto mb-10">
                Join thousands of hosts who trust Party Share for their special events. 
                Download now and create your first event in minutes.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={APP_STORE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black rounded-xl p-1 hover:scale-105 transition-transform"
                >
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    className="h-14 w-auto"
                  />
                </a>
                <a
                  href={PLAY_STORE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black rounded-xl p-1 hover:scale-105 transition-transform"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-14 w-auto"
                  />
                </a>
              </div>

              <p className="mt-8 text-sm text-white/70">
                Free to download • No credit card required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
          
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Party Share. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="/home" className="text-sm text-gray-400 hover:text-white transition">
              Home
            </a>
            <a href="/privacy" className="text-sm text-gray-400 hover:text-white transition">
              Privacy
            </a>
            <a href="/terms" className="text-sm text-gray-400 hover:text-white transition">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function DownloadButtons() {
  return (
    <div className="flex flex-wrap gap-4">
      <a
        href={APP_STORE_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="transform hover:scale-105 transition-transform"
      >
        <img
          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
          alt="Download on the App Store"
          className="h-12 w-auto"
        />
      </a>
      <a
        href={PLAY_STORE_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="transform hover:scale-105 transition-transform"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
          alt="Get it on Google Play"
          className="h-12 w-auto"
        />
      </a>
    </div>
  );
}
