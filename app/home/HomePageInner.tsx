"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Camera,
  Users,
  LayoutGrid,
  Printer,
  Heart,
  Sparkles,
} from "lucide-react";

export default function HomePageInner() {
  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#4a3f35]">

      {/* -------------------------------------------------- */}
      {/* HERO */}
      {/* -------------------------------------------------- */}
      <section className="relative overflow-hidden px-6 pt-28 pb-32 bg-gradient-to-b from-[#fffdfb] to-[#f8f3ea]">

        {/* Soft floral corners */}
        <Image
          src="/floral-top-left.png"
          alt=""
          width={350}
          height={350}
          className="absolute top-0 left-0 opacity-40 pointer-events-none"
        />
        <Image
          src="/floral-bottom-right.png"
          alt=""
          width={350}
          height={350}
          className="absolute bottom-0 right-0 opacity-40 pointer-events-none"
        />

        <div className="max-w-5xl mx-auto text-center relative">

          {/* Animated Heading */}
          <h1 className="text-6xl font-serif font-bold tracking-wide text-[#3d2f27] animate-fade-in">
            Capture the Moments,<br />
            <span className="italic text-[#b08b5b]">Cherish Them Forever</span>
          </h1>

          <p className="mt-8 text-xl text-[#6b5c4f] max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
            Party Share brings your family and friends together — creating a living album
            filled with photos, messages, and memories from your celebration.
          </p>

          <div className="mt-12 flex justify-center gap-5">

            <Link
              href="/guest-login"
              className="bg-[#b08b5b] text-white px-10 py-4 rounded-full
                         text-lg font-semibold flex items-center gap-2 shadow-xl
                         hover:bg-[#c69c6d] transition-all animate-fade-in-delay"
            >
              Join an Event <ArrowRight size={20} />
            </Link>

            <Link
              href="#features"
              className="border border-[#b08b5b] px-10 py-4 rounded-full text-lg
                        text-[#b08b5b] hover:bg-white hover:shadow-lg transition animate-fade-in-delay"
            >
              Explore Features
            </Link>
          </div>

        </div>
      </section>


      {/* -------------------------------------- */}
      {/* CURVED DIVIDER */}
      {/* -------------------------------------- */}
      <div className="w-full overflow-hidden -mt-12 mb-20">
        <svg
          viewBox="0 0 1440 320"
          className="block mx-auto fill-[#faf7f2]"
          preserveAspectRatio="none"
        >
          <path d="M0,256L1440,96L1440,0L0,0Z"></path>
        </svg>
      </div>


      {/* -------------------------------------------------- */}
      {/* FEATURES GRID */}
      {/* -------------------------------------------------- */}
      <section id="features" className="px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif font-semibold text-center mb-16 text-[#3d2f27]">
            A Seamless Experience for Your Wedding Day
          </h2>

          <div className="grid md:grid-cols-2 gap-12">

            <Feature
              title="Instant Media Sharing"
              text="Guests scan a QR code and upload photos instantly — no app required."
              Icon={Camera}
            />

            <Feature
              title="Heartfelt Guestbook"
              text="Friends and family leave messages alongside their photos."
              Icon={Heart}
            />

            <Feature
              title="Table Planner"
              text="Design your seating plan visually and assign guests easily."
              Icon={LayoutGrid}
            />

            <Feature
              title="Print-Ready Stationery"
              text="Create elegant table plans, menus, name cards, and signage."
              Icon={Printer}
            />

          </div>
        </div>
      </section>


      {/* -------------------------------------- */}
      {/* PHONE MOCKUP SECTION */}
      {/* -------------------------------------- */}
      <section className="px-6 mt-32">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">

          {/* Mockup images */}
          <div className="flex-1 flex justify-center gap-6">
            <div className="w-44 h-92 bg-[#e9ded0] rounded-3xl shadow-2xl"></div>
            <div className="w-44 h-92 bg-[#e5d3c0] rounded-3xl shadow-2xl scale-110"></div>
            <div className="w-44 h-92 bg-[#e9ded0] rounded-3xl shadow-2xl"></div>
          </div>

          {/* Text */}
          <div className="flex-1">
            <h2 className="text-4xl font-serif font-semibold text-[#3d2f27] mb-4">
              A Shared Gallery for All Your Guests
            </h2>
            <p className="text-[#6b5c4f] text-lg leading-relaxed mb-6">
              Guests can upload their photos instantly — everything is saved
              in a beautiful gallery you can download, print, or relive forever.
            </p>

            <ul className="ml-4 text-[#6b5c4f] space-y-2">
              <li className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#b08b5b]" /> Uploads from any device
              </li>
              <li className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#b08b5b]" /> No app download required
              </li>
              <li className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#b08b5b]" /> Perfect for weddings & receptions
              </li>
            </ul>
          </div>

        </div>
      </section>


      {/* -------------------------------------- */}
      {/* TESTIMONIALS */}
      {/* -------------------------------------- */}
      <section className="px-6 mt-32 mb-28">
        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-4xl font-serif font-semibold text-[#3d2f27] mb-10">
            Loved by Couples & Guests
          </h2>

          <div className="space-y-10">

            <Testimonial
              quote="Party Share made our wedding unforgettable. We had over 500 photos from guests we would've never captured!"
              name="Emma & Daniel"
            />

            <Testimonial
              quote="The table planner and printable stationery saved us hours. Everything looked beautiful."
              name="Sophie & Michael"
            />
          </div>

        </div>
      </section>


      {/* -------------------------------------- */}
      {/* FOOTER */}
      {/* -------------------------------------- */}
      <footer className="py-10 text-center text-[#7d6c5d] text-sm">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d8c4a6] to-transparent mb-6" />

        <p>© {new Date().getFullYear()} Party Share — Made with Love</p>

        <div className="flex justify-center gap-6 mt-4">
          <Link href="/home" className="hover:text-[#b08b5b]">Home</Link>
          <Link href="/guest-login" className="hover:text-[#b08b5b]">Guest Login</Link>
          <Link href="/support" className="hover:text-[#b08b5b]">Support</Link>
        </div>
      </footer>
    </div>
  );
}

/* -------------------------------------------------- */
/* Feature Card Component */
/* -------------------------------------------------- */
function Feature({ Icon, title, text }: any) {
  return (
    <div className="bg-white p-10 rounded-2xl shadow-xl border border-[#e8dfd4]
                    hover:shadow-2xl hover:scale-[1.02] transition duration-300">
      <Icon size={42} className="text-[#b08b5b] mb-4" />
      <h3 className="text-2xl font-serif mb-3 text-[#3d2f27]">{title}</h3>
      <p className="text-[#6b5c4f]">{text}</p>
    </div>
  );
}

/* -------------------------------------------------- */
/* Testimonial Component */
/* -------------------------------------------------- */
function Testimonial({ quote, name }: any) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md border border-[#eadfcd] max-w-3xl mx-auto">
      <p className="italic text-lg text-[#6b5c4f]">“{quote}”</p>
      <p className="mt-3 font-semibold text-[#3d2f27]">{name}</p>
    </div>
  );
}
