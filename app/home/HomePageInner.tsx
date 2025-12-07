"use client";

import Image from "next/image";
import { useState } from "react";

// List your scattered images here (matches filenames in public/images)
const scatteredImages = [
  "/images/IMG_3350.webp",
  "/images/IMG_3351.webp",
  "/images/IMG_3352.webp",
  "/images/IMG_3353.webp",
  "/images/IMG_3354.webp",
  "/images/IMG_3355.webp",
  "/images/IMG_3356.webp",
  "/images/IMG_3268.webp",
  "/images/IMG_3269.webp",
];

// Carousel images (can reuse the same set)
const carouselImages = scatteredImages;

export default function HomePage() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % carouselImages.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + carouselImages.length) % carouselImages.length);

  return (
    <div className="min-h-screen bg-[#0f0f23] text-white relative overflow-hidden">

      {/* 🌸 Background image */}
      <Image
        src="/images/rosesWhite.webp"
        alt="Background"
        fill
        className="object-cover opacity-20"
        priority
      />

      {/* ✨ Soft blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      {/* =======================
          HERO SECTION
      ======================== */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 py-24">

        <h1 className="text-5xl md:text-6xl font-bold text-[#FFD6E8] drop-shadow-lg">
          Capture the Moment.
        </h1>

        <h2 className="mt-3 text-2xl md:text-3xl text-white/90 font-light">
          Share Your Celebration With Everyone.
        </h2>

        <p className="mt-6 text-gray-300 max-w-xl text-lg">
          Party Share brings your guests together — upload photos, sign the
          guestbook, and relive memories instantly.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex gap-4 flex-wrap justify-center">
          <a
            href="/guest-login"
            className="bg-[#e94560] hover:bg-[#ff5b74] px-8 py-4 rounded-2xl font-semibold transition"
          >
            Join an Event
          </a>

          <a
            href="https://apps.apple.com"
            target="_blank"
            className="bg-white text-[#0f0f23] px-8 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition"
          >
            Download App
          </a>
        </div>

        {/* =======================
            FLOATING SCATTERED IMAGES
        ======================== */}
        <div className="relative w-full max-w-5xl mt-20 h-[380px] mx-auto">
          {scatteredImages.map((src, i) => {
            const rotation = [-12, 8, -6, 5, -10, 7, -4, 9, -8][i % 9];
            const top = [5, 35, 15, 55, 25, 45, 10, 50, 20][i % 9];
            const left = [5, 65, 40, 20, 75, 55, 30, 10, 50][i % 9];

            return (
              <Image
                key={i}
                src={src}
                alt="Memory"
                width={180}
                height={180}
                className={`
                  rounded-xl shadow-xl absolute 
                  transition-all duration-[2000ms]
                  hover:scale-105 hover:z-50
                `}
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  rotate: `${rotation}deg`,
                }}
              />
            );
          })}
        </div>
      </section>

      {/* =======================
          CAROUSEL SECTION
      ======================== */}
      <section className="relative z-10 py-28 bg-black/40 backdrop-blur-md mt-10">
        <h3 className="text-center text-3xl font-semibold text-[#FFD6E8] mb-10">
          Real Moments. Shared Instantly.
        </h3>

        <div className="max-w-3xl mx-auto relative">
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-white/20 rounded-full hover:bg-white/40 transition"
          >
            ❮
          </button>

          <Image
            src={carouselImages[current]}
            alt="Event Photo"
            width={900}
            height={600}
            className="rounded-2xl shadow-2xl object-cover mx-auto"
          />

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-white/20 rounded-full hover:bg-white/40 transition"
          >
            ❯
          </button>
        </div>
      </section>

      {/* =======================
          FOOTER
      ======================== */}
      <footer className="py-10 text-center text-white/60 text-sm">
        © {new Date().getFullYear()} Party Share — All Rights Reserved
      </footer>
    </div>
  );
}
