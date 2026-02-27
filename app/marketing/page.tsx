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

const APP_STORE_LINK = "https://apps.apple.com/gb/app/partyshare-events/id6755305083";
const PLAY_STORE_LINK = "https://play.google.com/store/apps/details?id=com.grahamgardiner.partyshare";

export default function MarketingPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  // Auto-rotate features
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f23] text-white overflow-hidden">
      
      {/* ================= HERO ================= */}
        <div className="min-h-screen bg-[#0f0f23] text-white relative overflow-visible">
          <section className="relative py-18 px-6 sm:px-10 lg:px-16 flex justify-center items-center">

            <div className="w-1/4 max-w-[220px]">
              <img
                src="/images/iconweb.webp"
                alt="App Icon"
                className="w-full h-auto rounded-2xl shadow-2xl mx-auto"
              />
            </div>

          </section>
        </div>

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

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-5 py-2 text-sm text-[#ffd6e8] mb-8 border border-white/20">
            <Star className="w-4 h-4 fill-[#ffd700] text-[#ffd700]" />
            <span>The #1 Event Photo Sharing App</span>
            <Star className="w-4 h-4 fill-[#ffd700] text-[#ffd700]" />
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
              Every Photo.
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#e94560] via-[#ff6b8a] to-[#ffd700] bg-clip-text text-transparent">
              Every Memory.
            </span>
            <br />
            <span className="bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
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

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[#ffd6e8] mb-4">
              Simple as 1-2-3
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              How Party Share Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: <Smartphone className="w-8 h-8" />,
                title: "Create Your Event",
                description: "Open the app and create your event in seconds. Get your unique QR code instantly.",
                color: "#e94560"
              },
              {
                step: "2",
                icon: <QrCode className="w-8 h-8" />,
                title: "Guests Scan & Share",
                description: "Guests scan the QR code — no app download or account needed. They just start uploading!",
                color: "#ffd700"
              },
              {
                step: "3",
                icon: <Heart className="w-8 h-8" />,
                title: "Enjoy Your Memories",
                description: "Watch photos appear in real-time. Download everything as a zip when you're ready.",
                color: "#4CAF50"
              }
            ].map((item, index) => (
              <div
                key={index}
                className="relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group"
              >
                <div
                  className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                  style={{ backgroundColor: item.color }}
                >
                  {item.step}
                </div>
                <div className="mb-6 text-gray-300 group-hover:text-white transition">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PHONE SHOWCASE ================= */}
      <section id="photos" className="py-24 px-6 bg-gradient-to-b from-transparent via-[#1a1a2e]/50 to-transparent scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Phone mockups */}
            <div className="relative h-[500px] sm:h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#e94560]/30 via-transparent to-[#ffd700]/20 blur-3xl" />
              
              <PhoneMockup
                className="absolute left-0 top-20 rotate-[-12deg] z-10"
                src="/images/IMG_3586.webp"
                alt="Party Share event screen"
              />
              <PhoneMockup
                className="absolute left-1/2 -translate-x-1/2 top-0 rotate-[2deg] z-20 scale-110"
                src="/images/IMG_3591.webp"
                alt="Party Share gallery"
                highlight
              />
              <PhoneMockup
                className="absolute right-0 top-24 rotate-[10deg] z-10"
                src="/images/IMG_3588.webp"
                alt="Party Share dashboard"
              />
            </div>

            {/* Right: Features */}
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#e94560] mb-4">
                Photo Sharing
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Capture Every Moment Together
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                No more chasing guests for photos after the event. With Party Share, 
                every photo lands in one beautiful gallery — automatically.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Instant QR code scanning — no app needed for guests",
                  "Real-time photo gallery updates",
                  "Download all photos as a ZIP file",
                  "Digital guestbook with heartfelt messages",
                  "Works with any smartphone"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#4CAF50] shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <DownloadButtons />
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATIONERY SHOWCASE ================= */}
      <section id="stationery" className="py-24 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Features */}
            <div className="order-2 lg:order-1">
              <p className="text-sm uppercase tracking-[0.3em] text-[#ffd700] mb-4">
                Print-Ready Stationery
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Beautiful Stationery, Auto-Generated
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Create stunning table plans, name cards, and QR posters that match 
                your event theme — all in just a few taps.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <Users className="w-5 h-5" />, label: "Table Plans" },
                  { icon: <QrCode className="w-5 h-5" />, label: "QR Posters" },
                  { icon: <Printer className="w-5 h-5" />, label: "Name Cards" },
                  { icon: <Camera className="w-5 h-5" />, label: "Invitations" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4"
                  >
                    <div className="text-[#ffd700]">{item.icon}</div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>

              <DownloadButtons />
            </div>

            {/* Right: Stationery images */}
            <div className="relative order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/images/IMG_3604.webp"
                  alt="Place cards"
                  className="w-full rounded-2xl shadow-2xl rotate-[-3deg] hover:rotate-0 transition-transform"
                />
                <img
                  src="/images/IMG_3605.webp"
                  alt="Table talkers"
                  className="w-full rounded-2xl shadow-2xl rotate-[3deg] hover:rotate-0 transition-transform mt-8"
                />
                <img
                  src="/images/poster.webp"
                  alt="Event poster"
                  className="w-full rounded-2xl shadow-2xl rotate-[2deg] hover:rotate-0 transition-transform"
                />
                <img
                  src="/images/invitation.webp"
                  alt="Invitation"
                  className="w-full rounded-2xl shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent via-[#2a1730]/30 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-[#ffd6e8] mb-4">
              Loved by Hosts
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              What Our Users Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "Our guests loved how easy it was to share photos. We had hundreds of memories in one place before the night even ended.",
                name: "Hannah & James",
                event: "Wedding in the Cotswolds",
                rating: 5
              },
              {
                quote: "No more chasing people for photos after the party. The QR on the tables just worked. Brilliant!",
                name: "Tom & Priya",
                event: "Joint 30th Birthday",
                rating: 5
              },
              {
                quote: "The table plans and printable name cards saved us hours. Everything felt connected and on-brand.",
                name: "Sarah M.",
                event: "Corporate Summer Party",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#ffd700] text-[#ffd700]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.event}</p>
                </div>
              </div>
            ))}
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
          <div className="flex items-center gap-3">
            <img
              src="/images/iconweb.webp"
              alt="Party Share"
              className="w-10 h-10 rounded-xl"
            />
            <span className="font-semibold">Party Share</span>
          </div>
          
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Party Share. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
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

/* ============ COMPONENTS ============ */

function PhoneMockup({
  src,
  alt,
  className = "",
  highlight,
}: {
  src: string;
  alt: string;
  className?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`w-[160px] sm:w-[180px] h-[320px] sm:h-[360px] rounded-[32px] bg-black border-2 ${
        highlight ? "border-[#e94560]" : "border-white/20"
      } overflow-hidden shadow-2xl ${className}`}
    >
      <div className="h-6 flex items-center justify-center bg-black">
        <div className="w-16 h-1.5 bg-gray-700 rounded-full" />
      </div>
      <div className="relative flex-1 h-[calc(100%-24px)]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
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

const features = [
  { title: "Photo Sharing", description: "Guests scan & share instantly" },
  { title: "Table Plans", description: "Drag-and-drop seating" },
  { title: "Stationery", description: "Print-ready designs" },
  { title: "Guestbook", description: "Collect messages & memories" },
];