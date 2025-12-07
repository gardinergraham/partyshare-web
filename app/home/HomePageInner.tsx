"use client";

import Link from "next/link";
import { ArrowRight, Camera, Users, LayoutGrid, Printer, Heart } from "lucide-react";

export default function HomePageInner() {
  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#4a3f35]">
      {/* HERO */}
      <section className="px-6 py-24 text-center bg-gradient-to-b from-[#fffdfb] to-[#f8f3ea]">
        <h1 className="text-6xl font-serif font-bold tracking-wide text-[#3d2f27]">
          Capture the Moments,  
          <br />
          <span className="italic text-[#b08b5b]">Share the Love</span>
        </h1>

        <p className="mt-6 text-lg text-[#6b5c4f] max-w-2xl mx-auto leading-relaxed">
          Party Share brings your guests together — allowing them to upload photos,
          sign a guestbook, and interact with beautifully crafted wedding stationery tools.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          {/* Primary CTA */}
          <Link
            href="/guest-login"
            className="bg-[#b08b5b] text-white px-10 py-4 rounded-full 
                      text-lg font-semibold flex items-center gap-2 shadow-lg
                      hover:bg-[#c69c6d] transition-all"
          >
            Join an Event <ArrowRight size={20} />
          </Link>

          {/* Secondary CTA */}
          <Link
            href="#features"
            className="border border-[#b08b5b] px-10 py-4 rounded-full 
                       text-lg font-medium text-[#b08b5b]
                       hover:bg-white hover:shadow-lg transition"
          >
            Explore Features
          </Link>
        </div>
      </section>

      {/* DIVIDER LINE */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d8c4a6] to-transparent my-16" />

      {/* FEATURES */}
      <section id="features" className="px-6 py-10">
        <h2 className="text-4xl font-serif font-semibold text-center mb-14 text-[#3d2f27]">
          Designed for Weddings & Celebrations
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <Feature
            title="Instant Media Sharing"
            text="Guests scan a QR code and upload photos & videos instantly — no app required."
            Icon={Camera}
          />

          <Feature
            title="Guestbook Messages"
            text="Loved ones share memories and handwritten-style notes alongside photos."
            Icon={Heart}
          />

          <Feature
            title="Table Planner"
            text="Visually design your seating plan and assign guests with ease."
            Icon={LayoutGrid}
          />

          <Feature
            title="Printable Wedding Stationery"
            text="Create elegant table plans, tent cards, posters & name cards — perfectly themed."
            Icon={Printer}
          />
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="px-6 py-20 bg-gradient-to-b from-[#f8f3ea] to-[#fffdfb] mt-10">
        <h2 className="text-4xl font-serif text-center font-semibold text-[#3d2f27] mb-6">
          A Shared Wedding Album
        </h2>

        <p className="text-center text-[#6b5c4f] max-w-xl mx-auto mb-10">
          Every guest becomes a photographer.  
          All photos combined into one beautiful gallery — yours to download, share, and treasure.
        </p>

        <div className="flex justify-center gap-6">
          <div className="w-40 h-56 bg-[#e8dfd4] rounded-xl shadow-lg" />
          <div className="w-40 h-56 bg-[#e5d8c7] rounded-xl shadow-lg scale-110" />
          <div className="w-40 h-56 bg-[#e8dfd4] rounded-xl shadow-lg" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-[#7d6c5d] text-sm">
        <p>© {new Date().getFullYear()} Party Share — Made with Love</p>

        <div className="flex justify-center gap-6 mt-4">
          <Link href="/privacy" className="hover:text-[#b08b5b]">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#b08b5b]">Terms</Link>
          <Link href="/support" className="hover:text-[#b08b5b]">Support</Link>
        </div>
      </footer>
    </div>
  );
}

function Feature({ Icon, title, text }: any) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#e8dfd4] hover:shadow-2xl transition">
      <Icon size={40} className="text-[#b08b5b] mb-4" />
      <h3 className="text-2xl font-serif mb-2 text-[#3d2f27]">{title}</h3>
      <p className="text-[#6b5c4f]">{text}</p>
    </div>
  );
}
