"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  subtitle: string;
};

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
          src="/images/blush_original.webp"
          alt="Soft floral background"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[#0f0f23]/70" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
     {/* ================= HERO ================= */}
        <section className="relative mb-20 overflow-hidden rounded-3xl">
        {/* Soft floral background */}
        <div
            className="absolute inset-0 opacity-[0.22] sm:opacity-[0.28]"
            style={{
            backgroundImage: "url('/images/blush_original.webp')",
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
            <div className="relative h-[340px] sm:h-[420px]">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#ff8bb7]/30 via-transparent to-[#ffd56f]/20 blur-3xl"></div>

            <PhoneMockup
                className="absolute left-2 top-6 rotate-[-10deg] shadow-2xl"
                src="/images/app-login.webp"
                alt="PartyShare login screen"
                label="Create or join your event"
            />
            <PhoneMockup
                className="absolute right-3 top-0 rotate-[8deg] shadow-2xl"
                src="/images/app-gallery.webp"
                alt="PartyShare shared gallery"
                label="Guests upload photos & videos"
                highlight
            />
            <PhoneMockup
                className="absolute left-10 bottom-0 rotate-[3deg] shadow-2xl hidden sm:block"
                src="/images/app-dashboard.webp"
                alt="PartyShare host dashboard"
                label="Hosts stay in control"
            />
            </div>
        </div>
        </section>



        {/* ================= FLOATING EVENT PHOTOS ================= */}
        <section className="relative h-[320px] sm:h-[380px] mb-24">
        {/* Glow background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f0f23] pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Middle photo (hero) */}
            <div className="relative w-40 sm:w-56 h-40 sm:h-56 rotate-[-2deg] shadow-2xl rounded-xl overflow-hidden border border-white/10 z-30">
            <Image
                src="/images/event1.webp"
                alt="Event photo 1"
                fill
                className="object-cover"
            />
            </div>

            {/* Left photo */}
            <div className="absolute left-[10%] top-[15%] w-32 sm:w-40 h-32 sm:h-40 rotate-[8deg] shadow-xl rounded-xl overflow-hidden border border-white/10 z-20 opacity-90">
            <Image
                src="/images/event2.webp"
                alt="Event photo 2"
                fill
                className="object-cover"
            />
            </div>

            {/* Right photo */}
            <div className="absolute right-[10%] top-[20%] w-32 sm:w-40 h-32 sm:h-40 rotate-[-10deg] shadow-xl rounded-xl overflow-hidden border border-white/10 z-20 opacity-90">
            <Image
                src="/images/event3.webp"
                alt="Event photo 3"
                fill
                className="object-cover"
            />
            </div>

            {/* Bottom left */}
            <div className="absolute left-[18%] bottom-[12%] w-28 sm:w-36 h-28 sm:h-36 rotate-[14deg] shadow-xl rounded-xl overflow-hidden border border-white/10 z-10 opacity-80">
            <Image
                src="/images/event4.webp"
                alt="Event photo 4"
                fill
                className="object-cover"
            />
            </div>

            {/* Bottom right */}
            <div className="absolute right-[18%] bottom-[8%] w-28 sm:w-36 h-28 sm:h-36 rotate-[-6deg] shadow-xl rounded-xl overflow-hidden border border-white/10 z-10 opacity-80">
            <Image
                src="/images/event5.webp"
                alt="Event photo 5"
                fill
                className="object-cover"
            />
            </div>
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
        <section
          id="features"
          className="grid lg:grid-cols-2 gap-12 items-start mb-20"
        >
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
            <div className="rounded-3xl bg-white/5 border border-white/10 p-5 sm:p-6 backdrop-blur-md shadow-xl">
              <p className="text-xs uppercase tracking-[0.25em] text-[#ffd6e8] mb-3">
                On the table
              </p>
              <h3 className="text-2xl font-semibold mb-2">
                Elegant name cards & QR table talkers
              </h3>
              <p className="text-gray-200 text-sm mb-5">
                Design once in Party Share, then print matching stationery
                for every place setting &mdash; complete with your event
                branding and QR code for instant sharing.
              </p>

              <div className="grid sm:grid-cols-[1.1fr,0.9fr] gap-4 items-center">
                <div className="relative h-40 sm:h-44 rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-[#2a2421]">
                  <Image
                    src="/images/table-name-card.webp"
                    alt="Name card on table"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-40 sm:h-44">
                  <div className="absolute inset-0 rounded-2xl bg-[#111322] border border-white/15 shadow-2xl flex flex-col items-center justify-center px-4 text-center">
                    <div className="relative w-20 h-20 mb-2 rounded-md bg-white p-1">
                      <Image
                        src="/images/qr-pin-yxnhsa.webp"
                        alt="QR code for Party Share"
                        fill
                        className="object-contain rounded"
                      />
                    </div>
                    <p className="text-xs text-gray-200 font-medium">
                      Scan to Share Memories
                    </p>
                    <p className="text-[11px] text-[#7FFF7F] mt-1">
                      PIN: YXNHSA
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <div className="relative w-5 h-5">
                        <Image
                          src="/images/iconweb.png"
                          alt="Party Share logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[11px] text-gray-300">
                        Powered by Party Share
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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
        <section className="mb-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-3">
            Ready to use Party Share at your event?
          </h2>
          <p className="text-sm sm:text-base text-gray-200 max-w-xl mx-auto mb-6">
            Set up an event space, share your QR code, and watch the memories
            roll in &mdash; from the welcome drinks to the last dance.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <Link
              href="/guest-login"
              className="px-7 py-3 rounded-2xl bg-[#e94560] hover:bg-[#ff5b74] font-semibold text-base shadow-lg shadow-[#e94560]/40 transition"
            >
              Go to Guest Login
            </Link>
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-2xl bg-white text-[#0f0f23] hover:bg-gray-100 font-semibold text-base transition"
            >
              Download on the App Store
            </a>
          </div>

          <p className="text-xs text-gray-500">
            Also available on Google Play. Guests can join via web &mdash; no
            download required.
          </p>
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
