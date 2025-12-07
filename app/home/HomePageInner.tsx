"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type Testimonial = {
  quote: string;
  name: string;
  subtitle: string;
};

function useRandomPositions(count: number, width = 500, height = 350) {
  const [positions, setPositions] = useState<{ top: number; left: number }[]>([]);

  useEffect(() => {
    const newPositions = Array.from({ length: count }).map(() => ({
      top: Math.random() * height + 20,
      left: Math.random() * width + 20,
    }));
    setPositions(newPositions);
  }, [count, width, height]);

  return positions;
}


const testimonials: Testimonial[] = [
  {
    quote:
      "Our guests loved how easy it was to share photos. We had hundreds of memories in one place before the night even ended.",
    name: "Hannah & James",
    subtitle: "Wedding in the Cotswolds",
  },
  {
    quote:
      "No more chasing people for photos after the party. The QR on the tables just worked.",
    name: "Tom & Priya",
    subtitle: "Joint 30th Birthday",
  },
  {
    quote:
      "The table plans and printable name cards saved us hours. Everything felt connected and on-brand.",
    name: "Sarah M.",
    subtitle: "Corporate Summer Party",
  },
];

export default function HomePage() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const current = testimonials[testimonialIndex];

  const nextTestimonial = () =>
    setTestimonialIndex((i) => (i + 1) % testimonials.length);

  const prevTestimonial = () =>
    setTestimonialIndex((i) =>
      i === 0 ? testimonials.length - 1 : i - 1
    );

  return (
    <div className="min-h-screen bg-[#0f0f23] text-white relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/rosesWhite.webp"
          alt="Soft floral background"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[#0f0f23]/70" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
     {/* ================= HERO ================= */}
       <section className="relative mb-20 overflow-visible rounded-3xl">
        {/* Soft floral background */}
        <div
            className="absolute inset-0 opacity-[0.22] sm:opacity-[0.28]"
            style={{
            backgroundImage: "url('/images/rosesWhite.webp')",
            backgroundSize: "cover",
            backgroundPosition: "top right",
            }}
        ></div>

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#0f0f23]/70 to-transparent backdrop-blur-[1px]"></div>
        

        {/* Main hero content */}
        <div className="relative grid lg:grid-cols-[1.15fr,0.85fr] gap-10 items-center px-6 sm:px-10 lg:px-14 py-16">
            {/* Left: text */}
            <div>

                {/* Top-center Logo */}
            <div className="w-full flex justify-center mb-6">
            <div className="relative w-20 h-20">
                <Image
               src="/images/iconweb.webp"
                alt="Party Share logo"
                fill
                className="object-contain drop-shadow-xl"
                />
            </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-[#ffd6e8] mb-5">
                <span>Weddings</span>
                <span>•</span>
                <span>Parties</span>
                <span>•</span>
                <span>Events</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Capture the
                <span className="block text-[#ff8bb7]">Moments That Matter</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-gray-200 max-w-xl">
                Your guests upload photos instantly — all in one beautiful event
                gallery. Party Share brings together media, guest messages, table
                plans, and printable stationery in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
                <Link
                href="/guest-login"
                className="px-7 py-3 rounded-2xl bg-[#e94560] hover:bg-[#ff5b74] font-semibold text-base shadow-lg shadow-[#e94560]/40 transition"
                >
                Join an Event
                </Link>

                <Link
                href="#features"
                className="px-7 py-3 rounded-2xl border border-white/30 text-sm sm:text-base font-medium hover:bg-white/10 transition"
                >
                Explore Host Tools
                </Link>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-gray-300">
                Guests don&apos;t need an account — they just scan your QR code and
                start sharing.
            </p>
            </div>

            {/* Right: stacked phone mockups */}
            <div className="relative h-[360px] sm:h-[440px]">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff8bb7]/30 via-transparent to-[#ffd56f]/20 blur-3xl"></div>

            {/* Left phone */}
            <PhoneMockup
                className="absolute left-0 top-10 rotate-[-12deg] sm:scale-[0.95] shadow-2xl"
                src="/images/IMG_3586.webp"
                alt="PartyShare login screen"
                label="Create or join your event"
            />
            <PhoneMockup
                className="absolute left-1/2 top-0 -translate-x-1/2 rotate-[2deg] sm:scale-[1.05] shadow-2xl z-20"
                src="/images/IMG_3591.webp"
                alt="PartyShare shared gallery"
                label="Guests upload photos & videos"
                highlight
            />
            <PhoneMockup
                className="absolute left-3/4 top-0 -translate-x-3/4 rotate-[4deg] sm:scale-[1.05] shadow-2xl z-20"
                src="/images/IMG_3588.webp"
                alt="PartyShare host dashboard"
                label="Hosts stay in control"
            />
            </div>
        </div>
        </section>


                {/* ================= FLOATING EVENT PHOTOS ================= */}
            <section className="relative py-20 overflow-hidden mt-32 sm:mt-40">
            <h2 className="text-center text-3xl sm:text-4xl font-bold text-white mb-12">
                Your Event, Captured Beautifully
            </h2>

            <div className="relative max-w-2xl mx-auto h-[360px] sm:h-[320px] overflow-hidden">

                {/* Top-left */}
                <img
                src="/images/IMG_3269.webp"
                alt="event"
                className="absolute top-8 left-4 w-12 sm:w-20 rounded-xl shadow-2xl animate-glide-slow"
                />

                {/* Top-right */}
                <img
                src="/images/IMG_3354.webp"
                alt="event"
                className="absolute top-4 right-6 w-14 sm:w-22 rounded-xl shadow-2xl animate-glide-medium"
                />

                {/* Middle-left */}
                <img
                src="/images/IMG_3355.webp"
                alt="event"
                className="absolute top-1/3 left-10 w-12 sm:w-20 rounded-xl shadow-2xl animate-glide-fast"
                />

                {/* Middle-right */}
                <img
                src="/images/IMG_3356.webp"
                alt="event"
                className="absolute top-1/3 right-20 w-14 sm:w-22 rounded-xl shadow-2xl animate-glide-medium"
                />

                {/* Bottom-left */}
                <img
                src="/images/IMG_3350.webp"
                alt="event"
                className="absolute bottom-6 left-10 w-14 sm:w-22 rounded-xl shadow-2xl animate-glide-slow"
                />

                {/* Bottom-right */}
                <img
                src="/images/IMG_3268.webp"
                alt="event"
                className="absolute bottom-6 right-16 w-12 sm:w-20 rounded-xl shadow-2xl animate-glide-fast"
                />

            </div>
            </section>



                {/* ================= HOW IT WORKS ================= */}


        <section className="mb-24 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-[#ffd6e8] mb-3">
            Simple & Effortless
        </p>
        <h2 className="text-3xl sm:text-4xl font-semibold mb-10">
            How Party Share Works
        </h2>

        <div className="grid sm:grid-cols-3 gap-10 max-w-4xl mx-auto">

            {/* Step 1 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm shadow-xl">
            <div className="text-4xl mb-3">📸</div>
            <h3 className="text-lg font-semibold mb-2">1. Create Your Event</h3>
            <p className="text-gray-300 text-sm">
                Name your event and instantly get a PIN + QR code for your guests.
            </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm shadow-xl">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-lg font-semibold mb-2">2. Guests Scan & Upload</h3>
            <p className="text-gray-300 text-sm">
                No account needed. Guests scan the QR and start uploading memories.
            </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm shadow-xl">
            <div className="text-4xl mb-3">💾</div>
            <h3 className="text-lg font-semibold mb-2">3. Enjoy the Gallery</h3>
            <p className="text-gray-300 text-sm">
                Watch moments appear live, then download everything as a zip or PDF.
            </p>
            </div>

        </div>
        </section>

        {/* ================================================== */}
        {/* ================= FEATURES ======================= */}
        <section id="features"
        className="lg:grid lg:grid-cols-2 gap-12 items-start mb-20">

          {/* Left: feature list */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
              More than a shared gallery.
            </h2>
            <p className="text-gray-200 mb-6">
              Party Share gives you everything you need to organise your
              event and capture every memory:
            </p>
            <ul className="space-y-4 text-sm sm:text-base">
              <FeatureItem title="Instant guest uploads">
                Guests scan your QR and add photos or videos directly to the
                shared gallery.
              </FeatureItem>
              <FeatureItem title="Digital guestbook">
                Collect heartfelt messages and export them as a printable PDF
                keepsake.
              </FeatureItem>
              <FeatureItem title="Table planning & guest management">
                Assign guests to tables, track RSVPs and dietary preferences,
                and keep your plan in one place.
              </FeatureItem>
              <FeatureItem title="Print-ready stationery suite">
                Generate matching table plans, name cards, table talkers and
                event posters in just a few taps.
              </FeatureItem>
            </ul>
          </div>

          {/* Right: On-the-table mockup */}
      <div className="relative">
        <div className="rounded-3xl bg-white/5 border border-white/10 p-5 sm:p-6 backdrop-blur-md shadow-xl text-center">

            <p className="text-xs uppercase tracking-[0.25em] text-[#ffd6e8] mb-3">
            On the table
            </p>

            <h3 className="text-2xl font-semibold mb-2">
            Elegant name cards & QR table talkers
            </h3>

            <p className="text-gray-200 text-sm mb-8 max-w-lg mx-auto">
            Design once in Party Share, then print matching stationery for every place
            setting — complete with your event branding and QR code for instant sharing.
            </p>

            {/* Centered content wrapper */}
           <div className="flex flex-col sm:flex-row sm:items-start justify-center gap-10">


            {/* QR Card */}
     <div className="relative min-h-48 w-56 rounded-3xl overflow-visible shadow-xl bg-[#111322]/80 backdrop-blur-md p-6 flex flex-col items-center text-center border border-white/10">


            <div className="relative w-16 h-16 mb-2 rounded-md bg-white p-1">
                <Image
                src="/images/IMG_3585.webp"
                alt="QR code for Party Share"
                fill
                unoptimized
                className="object-contain rounded"
                />
            </div>

            <p className="text-xs text-gray-200 font-medium">Scan to Share Memories</p>
            <p className="text-[11px] text-[#7FFF7F] mt-1">PIN: YXNHSA</p>

            <div className="flex items-center gap-1 mt-2">
                <div className="relative w-4 h-4">
                <Image
                    src="/images/iconweb.webp"
                    alt="Party Share logo"
                    fill
                    className="object-contain"
                />
                </div>
                <span className="text-[11px] text-gray-300">Powered by Party Share</span>
            </div>

            </div>


            {/* Table Name Card */}
            <div className="relative h-40 sm:h-44 w-56 rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-[#2a2421]">
                <Image
                src="/images/tablenamecard.webp"
                alt="Name card on table"
                fill
                className="object-cover"
                />
            </div>

            </div>
        </div>
        </div>

          
        </section>


        {/* ================= TABLE STATIONERY SHOWCASE ================= */}
        <section className="relative py-24 px-6 sm:px-10 lg:px-16">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-white mb-4">
            Beautiful Table Stationery — Auto-Generated
        </h2>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-14">
            Create printable name cards, table talkers with QR codes, and full table layouts — all matched to your chosen theme.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto items-center">
            
            {/* Left: mockups */}
            <div className="relative">
            {/* Place card */}
            <img
                src="/images/IMG_3604.webp"
                alt="Place Card Mockup"
                className="w-full rounded-2xl shadow-2xl rotate-[-2deg] mb-8"
            />

            {/* Table Talker */}
            <img
                src="/images/IMG_3605.webp"
                alt="Table Talker"
                className="w-4/5 rounded-2xl shadow-2xl rotate-[3deg] mx-auto"
            />

            </div>

            {/* Right: description */}
            <div className="text-gray-200 space-y-6">
            <h3 className="text-2xl font-semibold text-white">Stationery Your Guests Will Love</h3>

            <p>
                Party Share automatically generates elegant table stationery that matches your event theme. 
                Simply choose a style — or upload your own custom theme — and we handle the rest.
            </p>

            <ul className="space-y-3">
                <li className="flex items-start gap-3">
                <span className="text-[#ff8bb7] text-xl">•</span>
                Printable name cards for every guest
                </li>
                <li className="flex items-start gap-3">
                <span className="text-[#ff8bb7] text-xl">•</span>
                Table talkers with your QR code
                </li>
                <li className="flex items-start gap-3">
                <span className="text-[#ff8bb7] text-xl">•</span>
                Visual seating layout diagrams
                </li>
                <li className="flex items-start gap-3">
                <span className="text-[#ff8bb7] text-xl">•</span>
                Fully themed PDFs ready for printing
                </li>
            </ul>

            <a
                href="#features"
                className="inline-block mt-6 px-6 py-3 rounded-xl bg-[#e94560] hover:bg-[#ff5b74] text-white font-semibold transition shadow-lg shadow-[#e94560]/40"
            >
                Explore Stationery Tools
            </a>
            </div>
        </div>
        </section>


        {/* ================= TESTIMONIALS ================= */}
        <section className="mb-20">
          <div className="rounded-3xl bg-gradient-to-r from-[#2a1730] via-[#17162c] to-[#12202f] border border-white/10 px-6 sm:px-10 py-10 relative overflow-hidden">
            <div className="absolute -top-32 -right-10 w-64 h-64 bg-[#ff8bb7]/20 blur-3xl" />
            <div className="absolute -bottom-24 left-4 w-40 h-40 bg-[#ffd56f]/20 blur-3xl" />

            <div className="relative z-10 grid lg:grid-cols-[1.1fr,0.9fr] gap-10 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#ffd6e8] mb-3">
                  Loved by couples & hosts
                </p>
                <h2 className="text-3xl sm:text-4xl font-semibold mb-3">
                  “It felt like having our own private social feed.”
                </h2>
                <p className="text-gray-200 text-sm sm:text-base mb-4">
                  Couples, party planners and event hosts use Party Share to
                  make sure every candid, every speech and every dance move
                  gets captured.
                </p>
                <p className="text-sm text-[#ffd6e8]">
                  ★★★★★&nbsp; Average rating from early hosts
                </p>
              </div>

              <div className="relative">
                <div className="rounded-2xl bg-black/30 border border-white/10 p-6 sm:p-7 shadow-xl">
                  <p className="text-sm sm:text-base text-gray-100 italic mb-4">
                    “{current.quote}”
                  </p>
                  <p className="font-semibold text-sm sm:text-base">
                    {current.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {current.subtitle}
                  </p>

                  <div className="flex items-center justify-between mt-5">
                    <button
                      onClick={prevTestimonial}
                      className="text-xs px-3 py-1 rounded-full border border-white/30 hover:bg-white/10 transition"
                    >
                      ← Previous
                    </button>
                    <div className="flex gap-1">
                      {testimonials.map((_, i) => (
                        <span
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i === testimonialIndex
                              ? "bg-[#ffd6e8]"
                              : "bg-white/30"
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={nextTestimonial}
                      className="text-xs px-3 py-1 rounded-full border border-white/30 hover:bg-white/10 transition"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
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

        <footer className="py-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Party Share. All rights reserved.
        </footer>
      </main>
    </div>
  );
}

/* ============ SMALL COMPONENTS ============ */

function PhoneMockup({
  src,
  alt,
  label,
  className = "",
  highlight,
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`w-[150px] sm:w-[170px] h-[300px] sm:h-[340px] rounded-[32px] bg-black border border-white/20 overflow-hidden flex flex-col shadow-2xl ${className}`}
    >
      <div className="h-5 flex items-center justify-center">
        <div className="w-10 h-1.5 bg-gray-600 rounded-full" />
      </div>
      <div className="relative flex-1">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-2 text-center text-[10px] bg-black/80 text-gray-200">
        {label}
        {highlight && (
          <span className="ml-1 text-[9px] text-[#ffd6e8]">
            • Guest favourite
          </span>
        )}
      </div>
    </div>
  );
}

 

function FeatureItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="mt-1 block w-2 h-2 rounded-full bg-[#ff8bb7]" />
      <div>
        <p className="font-semibold mb-0.5">{title}</p>
        <p className="text-gray-300 text-sm">{children}</p>
      </div>
    </li>
  );
}
   