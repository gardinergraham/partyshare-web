"use client";

import Image from "next/image";
import Link from "next/link";

export default function PartnerSchemePage() {
  return (
    <div className="min-h-screen bg-[#0f0f23] text-white relative overflow-visible">
      {/* ============== HEADER / LOGO ============== */}
      <section className="relative py-10 px-6 sm:px-10 lg:px-16">
        <div className="relative w-20 h-20">
          <img
            src="/images/iconweb.webp"
            alt="Party Share Logo"
            className="w-full rounded-2xl shadow-2xl rotate-[-2deg]"
          />
        </div>
      </section>

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

      <main className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 pb-16">
        {/* ================= HERO ================= */}
        <section className="relative mb-16 overflow-hidden rounded-3xl">
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
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f23] via-[#0f0f23]/75 to-transparent backdrop-blur-[1px]" />

          <div className="relative grid lg:grid-cols-[1.2fr,0.8fr] gap-10 items-center px-6 sm:px-10 lg:px-14 py-12 sm:py-16">
            {/* Left: text */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#ffd6e8] mb-4">
                <span>Partner Programme</span>
                <span>•</span>
                <span>Earn with Every Event</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Become a Party Share Partner
              </h1>

              <p className="mt-4 text-sm sm:text-base text-gray-200 max-w-xl">
                Share Party Share with your clients, couples or event hosts and
                earn on every paid event they create. You get{" "}
                <span className="font-semibold">5% commission</span> on each
                event package plus extra bonuses as your referrals grow.
              </p>

              <p className="mt-3 text-sm text-gray-300">
                Perfect for photographers, DJs, venues, planners and anyone who
                works with events.
              </p>

              <div className="mt-7 flex flex-wrap gap-4">
                <Link
                  href="/partner/login"
                  className="px-7 py-3 rounded-2xl bg-[#e94560] hover:bg-[#ff5b74] font-semibold text-sm sm:text-base shadow-lg shadow-[#e94560]/40 transition"
                >
                  Partner Login
                </Link>
                <Link
                  href="/partner/register"
                  className="px-7 py-3 rounded-2xl border border-white/30 text-sm sm:text-base font-medium hover:bg-white/10 transition"
                >
                  Apply to Become a Partner
                </Link>
              </div>

              <p className="mt-3 text-xs text-gray-400">
                You&apos;ll receive a unique PIN and QR code to share with your
                clients.
              </p>
            </div>

            {/* Right: small card explaining PIN + QR */}
            <div className="relative">
              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-7 backdrop-blur-md shadow-2xl">
                <p className="text-xs uppercase tracking-[0.25em] text-[#ffd6e8] mb-3">
                  How you get paid
                </p>
                <h2 className="text-xl sm:text-2xl font-semibold mb-3">
                  Share your PIN. Earn on every event.
                </h2>
                <p className="text-sm text-gray-200 mb-4">
                  When someone creates an event using your{" "}
                  <span className="font-semibold">partner PIN</span>, the event
                  is tracked to you. You receive:
                </p>
                <ul className="space-y-2 text-sm text-gray-200">
                  <li>• 5% commission on the event package price</li>
                  <li>• Automatic tracking in your partner dashboard</li>
                  <li>• Extra bonuses as you hit milestones</li>
                </ul>

                <div className="mt-6 flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl bg-white p-1 border border-gray-200/60">
                    <Image
                      src="/images/IMG_3585.webp"
                      alt="Partner QR example"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <div className="text-xs text-gray-300">
                    <p className="font-semibold text-white">
                      Your unique QR & PIN
                    </p>
                    <p>
                      Add it to your website, booking emails or on-table cards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="mb-20 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#ffd6e8] mb-3">
            Simple & transparent
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8">
            How the Partner Programme Works
          </h2>

          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <PartnerStep
              number="1"
              title="Apply & get your PIN"
              text="Sign up as a partner and receive your unique PIN and QR code, linked to your account."
            />
            <PartnerStep
              number="2"
              title="Share with your clients"
              text="Add your QR / PIN to email templates, booking flows, flyers, or on-table signage."
            />
            <PartnerStep
              number="3"
              title="Earn on every event"
              text="Every time a host creates a paid event with your PIN, you earn commission and milestone bonuses."
            />
          </div>
        </section>

        {/* ================= COMMISSION STRUCTURE ================= */}
        <section className="mb-20 lg:grid lg:grid-cols-[1.15fr,0.85fr] gap-12 items-start">
          {/* Left: breakdown */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#ffd6e8] mb-3">
              Commission Structure
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              Earn 5% per event — plus recurring bonuses.
            </h2>
            <p className="text-sm sm:text-base text-gray-200 mb-4">
              For every event created using your partner PIN, you earn a{" "}
              <span className="font-semibold">5% commission</span> on the event
              package price (Basic, Premium, Deluxe or Prime).
            </p>

            <p className="text-sm text-gray-200 mb-4">
              On top of that, you collect recurring cash bonuses as you hit
              milestones:
            </p>

            <ul className="space-y-3 text-sm sm:text-base text-gray-100">
              <li>
                <span className="font-semibold">Every 10 events:</span>{" "}
                £10 bonus (10, 20, 30, ... up to 90)
              </li>
              <li>
                <span className="font-semibold">At 100 events:</span> normal
                5% commission + £100 extra bonus
              </li>
              <li>
                <span className="font-semibold">At 1000 events:</span> normal
                5% commission + £1000 mega bonus
              </li>
            </ul>

            <p className="mt-4 text-xs text-gray-400">
              All commissions and bonuses are tracked for you automatically in
              your partner dashboard.
            </p>
          </div>

          {/* Right: small "table" card */}
          <div className="mt-8 lg:mt-0">
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-7 backdrop-blur-md shadow-xl">
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                Example Earnings Snapshot
              </h3>
              <p className="text-xs text-gray-300 mb-4">
                For illustration only. Actual earnings depend on the mix of
                packages your referrals choose.
              </p>

              <div className="overflow-hidden rounded-2xl border border-white/10 text-sm">
                <div className="grid grid-cols-3 bg-white/10 px-4 py-2 font-semibold text-xs sm:text-sm">
                  <div className="text-left">Events Referred</div>
                  <div className="text-left">5% Commission*</div>
                  <div className="text-left">Bonuses</div>
                </div>

                <div className="grid grid-cols-3 px-4 py-2 bg-black/20 border-t border-white/5">
                  <div>10</div>
                  <div>On each paid event</div>
                  <div>£10</div>
                </div>
                <div className="grid grid-cols-3 px-4 py-2 bg-black/30 border-t border-white/5">
                  <div>20</div>
                  <div>On each paid event</div>
                  <div>£20 total</div>
                </div>
                <div className="grid grid-cols-3 px-4 py-2 bg-black/20 border-t border-white/5">
                  <div>50</div>
                  <div>On each paid event</div>
                  <div>£50 total</div>
                </div>
                <div className="grid grid-cols-3 px-4 py-2 bg-black/30 border-t border-white/5">
                  <div>100</div>
                  <div>On each paid event</div>
                  <div>£100 (10× £10) + £100 milestone</div>
                </div>
              </div>

              <p className="mt-4 text-[11px] text-gray-400">
                *5% is applied to the event package price (e.g. Basic, Premium,
                Deluxe, Prime) before fees. Exact payouts are shown inside your
                dashboard.
              </p>
            </div>
          </div>
        </section>

        {/* ================= WHY BECOME A PARTNER ================= */}
        <section className="mb-20">
          <div className="rounded-3xl bg-gradient-to-r from-[#2a1730] via-[#17162c] to-[#12202f] border border-white/10 px-6 sm:px-10 py-10 relative overflow-hidden">
            <div className="absolute -top-32 -right-10 w-64 h-64 bg-[#ff8bb7]/20 blur-3xl" />
            <div className="absolute -bottom-24 left-4 w-40 h-40 bg-[#ffd56f]/20 blur-3xl" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#ffd6e8] mb-3">
                  Designed for event professionals
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
                  Add value for your clients — and earn on every booking.
                </h2>
                <p className="text-sm sm:text-base text-gray-200 mb-4">
                  Party Share partners use the app as a value-add in their
                  packages. You help your clients collect every photo, message
                  and memory — and we reward you for every event you bring in.
                </p>
              </div>

              <div>
                <ul className="space-y-3 text-sm sm:text-base text-gray-100">
                  <li>• No minimum commitment or subscription</li>
                  <li>• Transparent tracking of events and payouts</li>
                  <li>• Works great for weddings, birthdays and corporate events</li>
                  <li>• Use your QR on your website, socials and print materials</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA: APP PROMO (KEEPED) ================= */}
        <section className="mt-10 bg-[#0f0f23] rounded-2xl p-6 text-center border border-white/10">
          <h3 className="text-lg font-bold mb-2">Show clients the full Party Share experience</h3>
          <p className="text-gray-300 mb-4">
            Download the app to see exactly what your couples and hosts will use
            on the day.
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

function PartnerStep({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm shadow-xl text-left">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#e94560] text-xs font-bold mb-3">
        {number}
      </div>
      <h3 className="text-base sm:text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-300">{text}</p>
    </div>
  );
}
