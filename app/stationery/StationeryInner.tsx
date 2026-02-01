"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  FileText, 
  Users, 
  QrCode, 
  Printer, 
  Gift, 
  Sparkles,
  CheckCircle,
  ArrowLeft,
  Download,
  Palette,
  Table,
  Mail,
  ClipboardList,
  Smartphone,
  Layout,
  UserCheck
} from "lucide-react";

type StationeryItem = {
  title: string;
  description: string;
  features: string[];
  image: string;
  icon: React.ReactNode;
};

const stationeryItems: StationeryItem[] = [
  {
    title: "Invitations",
    description: "Stunning digital and printable invitations with all your event details and a QR code for instant access.",
    features: [
      "Event date, time & venue",
      "QR code for instant joining",
      "Custom messages supported",
      "1 or 2 per page layouts"
    ],
    image: "/images/invitation.webp",
    icon: <Mail className="w-6 h-6" />,
  },
   {
    title: "Table Talkers",
    description: "Elegant tent cards with QR codes that sit on each table, inviting guests to scan and share their photos.",
    features: [
      "Foldable tent card design",
      "Large scannable QR code",
      "Your event branding",
      "Custom welcome message"
    ],
    image: "/images/tabletalkers.webp",
    icon: <QrCode className="w-6 h-6" />,
  },
  {
    title: "Place Cards",
    description: "Personalised name cards for each guest seat, featuring elegant designs with QR codes.",
    features: [
      "Guest name in elegant fonts",
      "Table number included",
      "Event media sharing QR code",
      "Multiple design themes"
    ],
    image: "/images/tablenamecard.webp",
    icon: <UserCheck className="w-6 h-6" />,
  },
  {
    title: "Event Posters",
    description: "Eye-catching A4 posters perfect for display at your venue entrance.",
    features: [
      "Bold event title display",
      "Large QR code for scanning",
      "Event details at a glance",
      "Themed backgrounds"
    ],
    image: "/images/poster.webp",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: "Table Plans",
    description: "Printed table manager, Easy to read simple and without any confusion.",
    features: [
      "Drag-and-drop table arrangement",
      "Round & rectangular table support", 
      "Guest names auto-populated",
      "Multiple layout options"
    ],
    image: "/images/tabledata.webp",
    icon: <Table className="w-6 h-6" />,
  },
  {
    title: "Guest Checklist",
    description: "Track arrivals, RSVPs, and dietary requirements all in one elegant printable document.",
    features: [
      "RSVP status tracking",
      "Dietary requirements column",
      "Check-in boxes for arrival",
      "Table assignments included"
    ],
    image: "/images/guestchecklist.webp",
    icon: <ClipboardList className="w-6 h-6" />,
  },
  
  
];

// App screenshots for the "See It In Action" section
const appScreenshots = [
  {
    title: "Dashboard",
    description: "Dashboard with event progress and reminders",
    image: "/images/progressbardash.webp",
  },
  {
    title: "Print Stationery",
    description: "Choose your theme and select which items to print",
    image: "/images/stationerylist.webp",
  },
  {
    title: "Table Layout Editor",
    description: "Design your seating arrangement with drag-and-drop",
    image: "/images/table_layout.webp",
  },
  {
    title: "Guest list manager",
    description: "Guest list easy to read simple to understand",
    image: "/images/guests.webp",
  },
  {
    title: "Event Checklist",
    description: "Track all your event tasks in one place",
    image: "/images/todolist.webp",
  },
  {
    title: "Guest Management",
    description: "Manage RSVPs and table assignments",
    image: "/images/guestmanage.webp",
  },
  {
    title: "Place settings",
    description: "Create a theme and use it throughout your event",
    image: "/images/IMG_3604.webp",
  },
];

const themes = [
  { name: "Roses White", color: "#fff5f5", accent: "#e94560", image: "/images/rosesWhite.webp" },
  { name: "Roses Cream", color: "#fef9e7", accent: "#d4a574", image: "/images/rosesCream.webp" },
  { name: "Gold Floral", color: "#ffd700", accent: "#1a1a2e", image: "/images/goldfloralblue.webp" },
  { name: "Flowers Centre", color: "#f5f5f5", accent: "#333", image: "/images/flowerscentreopen.webp" },
];

const giftBoxSteps = [
  {
    step: 1,
    title: "Print Your Gift Box Template",
    description: "Download and print the PDF on A4 card stock (250gsm recommended for best results). Make sure to print at 100% scale.",
    tip: "Use a colour printer for the best results with themed designs.",
  },
  {
    step: 2,
    title: "Cut Along the Outer Lines",
    description: "Carefully cut around the outer edge of the template using scissors or a craft knife and ruler for cleaner edges.",
    tip: "A cutting mat helps protect your table and gives cleaner cuts.",
  },
  {
    step: 3,
    title: "Score the Fold Lines",
    description: "Use a bone folder or the back of a butter knife to score along all the dotted fold lines. This makes folding much easier.",
    tip: "Score on the printed side for inward folds.",
  },
  {
    step: 4,
    title: "Fold All Panels Inward",
    description: "Fold each panel along the scored lines, creasing firmly. The printed design should be on the outside of the box.",
    tip: "Add a little glue along the seam.",
  },
  {
    step: 5,
    title: "Assemble the Base",
    description: "The base simply interlocks to form a neat closing.",
    tip: "Work on one side at a time for better control.",
  },
  {
    step: 6,
    title: "Add Your Gift & Close",
    description: "Take the two halves of the butterfly and interlock them to form a whole butterfly and now it is ready to delight your guests!",
    tip: "Place a chocolate or a trinket inside your gift box.",
  },
];

export default function StationeryPage() {
  const [selectedItem, setSelectedItem] = useState<StationeryItem | null>(null);
  const [activeStep, setActiveStep] = useState(1);

  const handleBackToApp = () => {
    window.location.href = "partyshare://stationery";
  };

  return (
    <div className="min-h-screen bg-[#0f0f23] text-white relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/namecard_modern.webp"
          alt="Soft floral background"
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f23] via-[#0f0f23]/80 to-[#0f0f23]" />
      </div>

      {/* Floating Back to App Button */}
      <button
        onClick={handleBackToApp}
        className="fixed top-12 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-[#e94560] hover:bg-[#ff5b74] text-white font-medium shadow-lg shadow-[#e94560]/40 transition-all hover:scale-105"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to App
      </button>

   <main className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16">
  
{/* ================= HERO ================= */}
<section className="text-center mb-20 pt-12">
  <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e94560]/20 to-[#ffd700]/20 px-5 py-2 text-xs uppercase tracking-[0.25em] text-[#ffd6e8] mb-6 border border-white/10">
    <Sparkles className="w-4 h-4" />
    <span>Premium Event Stationery</span>
    <Sparkles className="w-4 h-4" />
  </div>

  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#ffd6e8] to-[#ffd700] bg-clip-text text-transparent">
    Stationery That Makes
    <br />
    Your Event Unforgettable
  </h1>

  <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
    From elegant table plans to QR-powered invitations — Party Share generates 
    beautiful, print-ready stationery that matches your event theme perfectly.
  </p>

  <div className="flex flex-wrap justify-center gap-4 mb-12">
    <a
      href="#stationery-gallery"
      className="px-8 py-3 rounded-2xl bg-[#e94560] hover:bg-[#ff5b74] font-semibold text-base shadow-lg shadow-[#e94560]/40 transition flex items-center gap-2"
    >
      <Printer className="w-5 h-5" />
      Explore Stationery
    </a>
    <a
      href="#gift-box"
      className="px-8 py-3 rounded-2xl border border-white/30 font-medium hover:bg-white/10 transition flex items-center gap-2"
    >
      <Gift className="w-5 h-5" />
      Build a Gift Box
    </a>
  </div>

    {/* Hero Image - using standard img tag */}
  <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
    <img
      src="/images/elegantTable.webp"
      alt="Create the wow factor with Party Share stationery"
      className="w-full h-auto object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f23]/60 via-transparent to-transparent" />
  </div>
  </section>

  {/* ================= STATIONERY GALLERY ================= */}
  <section id="stationery-gallery" className="mb-24 scroll-mt-20">
    <div className="text-center mb-12">
      <p className="text-xs uppercase tracking-[0.25em] text-[#ffd6e8] mb-3">
        Your Complete Toolkit
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">
        Everything You Need to Print
      </h2>
      <p className="text-gray-300 max-w-2xl mx-auto">
        Each stationery item is designed to work together, creating a cohesive 
        look across your entire event.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stationeryItems.map((item, index) => (
        <StationeryCard
          key={index}
          item={item}
          onClick={() => setSelectedItem(item)}
        />
      ))}
    </div>
  </section>

  {/* ================= APP SCREENSHOTS SECTION ================= */}
  <section className="mb-24">
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 rounded-full bg-[#4CAF50]/20 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#4CAF50] mb-4">
        <Smartphone className="w-4 h-4" />
        <span>See It In Action</span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">
        Powerful Features, Simple Interface
      </h2>
      <p className="text-gray-300 max-w-2xl mx-auto">
        Party Share makes it easy to manage your entire event from your phone. 
        Here&apos;s a glimpse of what you can do.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {appScreenshots.map((screenshot, index) => (
        <div
          key={index}
          className="group rounded-2xl bg-[#1a1a2e] border border-white/10 overflow-hidden hover:border-[#4CAF50]/50 transition-all"
        >
          <div className="relative aspect-[9/16] bg-[#12121f]">
            <Image
              src={screenshot.image}
              alt={screenshot.title}
              fill
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4 border-t border-white/5">
            <h3 className="font-semibold mb-1">{screenshot.title}</h3>
            <p className="text-gray-400 text-sm">{screenshot.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* ================= THEME SHOWCASE ================= */}
  <section className="mb-24">
    <div className="rounded-3xl bg-gradient-to-br from-[#1a1a2e] to-[#0f0f23] border border-white/10 p-8 sm:p-12">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-[#ffd6e8] mb-3">
          Customisation
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Choose Your Theme
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Select from our beautiful built-in themes for a truly personal touch.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {themes.map((theme, index) => (
          <div
            key={index}
            className="group cursor-pointer"
          >
            <div className="relative aspect-[3/4] rounded-xl border-2 border-transparent group-hover:border-[#e94560] transition-all shadow-lg group-hover:scale-105 overflow-hidden bg-[#12121f]">
              <Image
                src={theme.image}
                alt={theme.name}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-contain"
              />
            </div>
            <p className="text-xs text-center mt-2 text-gray-400 group-hover:text-white transition">
              {theme.name}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-400">
          Pro tip: Select the same theme for each stationery item to keep stationery unique and elegant.
        </p>
      </div>
    </div>
  </section>

  {/* ================= WHY STATIONERY MATTERS ================= */}
  <section className="mb-24">
    <div className="grid lg:grid-cols-3 gap-8">
      <FeatureCard
        icon={<Palette className="w-8 h-8 text-[#e94560]" />}
        title="Perfectly Themed"
        description="Every piece of stationery automatically matches your chosen event theme — from elegant roses to modern minimalist."
      />
      <FeatureCard
        icon={<Download className="w-8 h-8 text-[#ffd700]" />}
        title="Instant PDF Download"
        description="Generate and download print-ready PDFs in seconds. No design skills needed — we handle the formatting."
      />
      <FeatureCard
        icon={<QrCode className="w-8 h-8 text-[#4CAF50]" />}
        title="QR Code Integration"
        description="Every piece includes your unique QR code so guests can instantly join your event and start sharing photos."
      />
    </div>
  </section>

  {/* ================= GIFT BOX TUTORIAL ================= */}
  <section id="gift-box" className="mb-24 scroll-mt-20">
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 rounded-full bg-[#ffd700]/20 px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#ffd700] mb-4">
        <Gift className="w-4 h-4" />
        <span>DIY Tutorial</span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">
        Build Your Own Gift Box
      </h2>
      <p className="text-gray-300 max-w-2xl mx-auto">
        Create stunning gift boxes featuring your event QR code. Perfect as 
        table favours or welcome gifts for your guests.
      </p>
    </div>

    {/* Step-by-step guide */}
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      {/* Left: Visual */}
      <div className="relative">
        <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-[#1a1a2e] to-[#2a1730] border border-white/10 overflow-hidden">
          <Image
            src="/images/giftboxPrint.webp"
            alt={`Gift box step ${activeStep}`}
            fill
            className="object-contain p-6"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl p-4">
            <p className="text-gray-400 text-sm">
              Step {activeStep}
            </p>
            <h3 className="text-lg font-semibold">
              {giftBoxSteps[activeStep - 1].title}
            </h3>
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {giftBoxSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index + 1)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeStep === index + 1
                  ? "bg-[#ffd700] scale-125"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right: Step list */}
      <div className="space-y-4">
        {giftBoxSteps.map((step) => (
          <div
            key={step.step}
            onClick={() => setActiveStep(step.step)}
            className={`p-5 rounded-2xl border cursor-pointer transition-all ${
              activeStep === step.step
                ? "bg-[#ffd700]/10 border-[#ffd700]/50"
                : "bg-white/5 border-white/10 hover:bg-white/10"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${
                  activeStep === step.step
                    ? "bg-[#ffd700] text-black"
                    : "bg-white/10 text-white"
                }`}
              >
                {step.step}
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">{step.title}</h4>
                <p className="text-gray-400 text-sm mb-2">
                  {step.description}
                </p>
                <p className="text-xs text-[#ffd700]">
                  {step.tip}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Materials needed */}
    <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10">
      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
        What You&apos;ll Need
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          "A4 Card Stock (250gsm)",
          "Scissors or Craft Knife",
          "Ruler & Cutting Mat",
          "Glue or Double-sided Tape",
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 text-gray-300"
          >
            <span className="w-2 h-2 rounded-full bg-[#e94560]" />
            {item}
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ================= STATIONERY TIPS ================= */}
  <section className="mb-24">
    <div className="rounded-3xl bg-gradient-to-r from-[#2a1730] via-[#17162c] to-[#12202f] border border-white/10 p-8 sm:p-12">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
        Pro Tips for Perfect Prints
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <TipCard
          number="01"
          title="Use Quality Paper"
          description="For best results, print on 160-250gsm card stock. Standard printer paper works but feels less premium."
        />
        <TipCard
          number="02"
          title="Check Print Settings"
          description="Always select 'Actual Size' or '100%' in your print settings. 'Fit to Page' will shrink your designs."
        />
        <TipCard
          number="03"
          title="Test Print First"
          description="Print one copy on regular paper first to check alignment and colours before using expensive card stock."
        />
        <TipCard
          number="04"
          title="Let Ink Dry"
          description="Give prints 2-3 minutes to dry before handling, especially on glossy paper. This prevents smudging."
        />
      </div>
    </div>
  </section>

  {/* ================= CTA ================= */}
  <section className="text-center mb-16">
    <div className="rounded-3xl bg-gradient-to-br from-[#e94560]/20 to-[#ffd700]/20 border border-white/10 p-10 sm:p-14">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4">
        Ready to Create Magic?
      </h2>
      <p className="text-gray-300 max-w-xl mx-auto mb-8">
        Head back to the Party Share app to generate your personalised 
        stationery in seconds.
      </p>

      <button
        onClick={handleBackToApp}
        className="px-10 py-4 rounded-2xl bg-[#e94560] hover:bg-[#ff5b74] font-bold text-lg shadow-lg shadow-[#e94560]/40 transition-all hover:scale-105 flex items-center gap-3 mx-auto"
      >
        <ArrowLeft className="w-5 h-5" />
        Open Party Share App
      </button>

      <p className="mt-6 text-sm text-gray-400">
        Don&apos;t have the app yet?
      </p>

      <div className="flex items-center justify-center gap-4 mt-4">
        <a
          href="https://apps.apple.com/gb/app/partyshare-events/id6755305083"
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
          href="https://play.google.com/store/apps/details?id=com.grahamgardiner.partyshare"
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
    </div>
  </section>

  <footer className="py-6 text-center text-xs text-gray-500">
    © {new Date().getFullYear()} Party Share. All rights reserved.
  </footer>
</main>

      {/* ================= MODAL ================= */}
      {selectedItem && (
        <StationeryModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}

/* ============ COMPONENTS ============ */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

function StationeryCard({
  item,
  onClick,
}: {
  item: StationeryItem;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl bg-[#1a1a2e] border border-white/10 overflow-hidden hover:border-[#e94560]/50 transition-all hover:scale-[1.02]"
    >
      {/* Image container - same format as appScreenshots */}
      <div className="relative aspect-[9/16] bg-[#12121f]">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      {/* Content below image */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-2 text-[#ffd6e8] mb-2">
          {item.icon}
          <span className="text-xs uppercase tracking-wider">Printable</span>
        </div>
        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
      </div>
    </div>
  );
}

function StationeryModal({
  item,
  onClose,
}: {
  item: StationeryItem;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#1a1a2e] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video bg-[#12121f] rounded-t-3xl">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain p-4 rounded-t-3xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition z-10"
          >
            ✕
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#e94560]/20 flex items-center justify-center text-[#e94560]">
              {item.icon}
            </div>
            <h2 className="text-2xl font-bold">{item.title}</h2>
          </div>

          <p className="text-gray-300 mb-6">{item.description}</p>

          <h3 className="text-sm uppercase tracking-wider text-[#ffd6e8] mb-3">
            Features
          </h3>
          <ul className="space-y-2 mb-6">
            {item.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-300">
                <CheckCircle className="w-5 h-5 text-[#4CAF50] shrink-0" />
                {feature}
              </li>
            ))}
          </ul>

          <button
            onClick={() => {
              window.location.href = "partyshare://stationery";
            }}
            className="w-full py-3 rounded-xl bg-[#e94560] hover:bg-[#ff5b74] font-semibold transition flex items-center justify-center gap-2"
          >
            <Printer className="w-5 h-5" />
            Generate in App
          </button>
        </div>
      </div>
    </div>
  );
}

function TipCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 p-5 rounded-xl bg-black/20">
      <div className="text-3xl font-bold text-[#ffd700]/30">{number}</div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}