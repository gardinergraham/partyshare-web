"use client";

import Image from "next/image";
import Link from "next/link";

const eventPhotos = [
  "/images/IMG_3269.webp",
  "/images/IMG_3354.webp",
  "/images/IMG_3355.webp",
  "/images/IMG_3356.webp",
];

const hostTools = [
  {
    title: "Creative AI event reels",
    text: "Turn the best gallery moments into a tasteful highlight reel with music, styled to suit the mood of the event.",
  },
  {
    title: "Guest photo uploads",
    text: "Guests scan your QR code and add photos or videos straight into the shared gallery.",
  },
  {
    title: "Private event gallery",
    text: "Everything stays organised by event, ready for viewing, sharing, and downloading.",
  },
  {
    title: "Designed event stationery",
    text: "Create coordinated invitations, name cards, QR table talkers, event posters, and print-ready layouts.",
  },
  {
    title: "Event planning workspace",
    text: "Manage guest lists, seating plans, table layouts, checklists, timings, dress code, and event details.",
  },
  {
    title: "Digital guestbook",
    text: "Collect messages from guests and keep them alongside the photos, videos, stationery, and finished event memories.",
  },
];

const steps = [
  "Create your event and choose the right plan.",
  "Share the QR code, PIN, or guest link.",
  "Guests upload memories while the event is happening.",
  "Download the gallery, guestbook, stationery, or reel afterwards.",
];

export default function HomePage() {
  return (
    <div className="ps-home">
      <section className="ps-hero">
        <div className="ps-hero-bg">
          <Image
            src="/images/IMG_3354.webp"
            alt="Wedding guests celebrating outdoors"
            fill
            priority
            className="ps-hero-image"
          />
          <div className="ps-hero-overlay" />
        </div>

        <div className="ps-hero-nav">
          <Image
            src="/images/iconweb.webp"
            alt="PartyShare"
            width={72}
            height={72}
            className="ps-hero-logo"
          />
          <div className="ps-hero-links">
            <Link href="/guest-login">Join Event</Link>
            <Link href="/partner">Partners</Link>
            <Link href="/download">Download</Link>
          </div>
        </div>

        <div className="ps-hero-content">
          <p className="ps-eyebrow">Weddings, parties, stag weekends and hen celebrations</p>
          <h1>PartyShare</h1>
          <p className="ps-hero-copy">
            A private event gallery where guests upload photos and videos with a
            QR code, while hosts manage the memories, guestbook, stationery,
            seating, and planning tools in one polished app.
          </p>

          <div className="ps-hero-actions">
            <Link href="/download" className="ps-button ps-button-primary">
              Get the App
            </Link>
            <Link href="/guest-login" className="ps-button ps-button-secondary">
              Join an Event
            </Link>
          </div>
        </div>
      </section>

      <main className="ps-main">
        <section className="ps-photo-strip" aria-label="Event photo examples">
          {eventPhotos.map((src, index) => (
            <div className="ps-photo-tile" key={src}>
              <Image
                src={src}
                alt={`PartyShare event moment ${index + 1}`}
                fill
                sizes="(max-width: 700px) 46vw, 240px"
                className="ps-photo-tile-image"
              />
            </div>
          ))}
        </section>

        <section className="ps-section ps-split">
          <div>
            <p className="ps-kicker">For event hosts</p>
            <h2>Collect every candid without chasing guests afterwards.</h2>
            <p className="ps-section-copy">
              PartyShare gives every event its own upload space. Guests do not
              need accounts, and hosts keep control of access, downloads, and
              the finished gallery.
            </p>
          </div>

          <div className="ps-phone-stage" aria-label="PartyShare app screenshots">
            <PhoneMockup
              src="/images/IMG_3586.webp"
              alt="PartyShare sign in screen"
              className="ps-phone-left"
            />
            <PhoneMockup
              src="/images/IMG_3591.webp"
              alt="PartyShare gallery screen"
              className="ps-phone-centre"
            />
            <PhoneMockup
              src="/images/IMG_3588.webp"
              alt="PartyShare dashboard screen"
              className="ps-phone-right"
            />
          </div>
        </section>

        <section className="ps-section">
          <div className="ps-section-heading">
            <p className="ps-kicker">What it includes</p>
            <h2>More than a photo gallery.</h2>
            <p className="ps-section-copy">
              PartyShare brings the practical parts of hosting together with
              the memories guests create, from AI reels and private galleries to
              planning tools and beautifully matched stationery.
            </p>
          </div>

          <div className="ps-tool-grid">
            {hostTools.map((tool) => (
              <article className="ps-tool-card" key={tool.title}>
                <h3>{tool.title}</h3>
                <p>{tool.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ps-section ps-stag-hen" id="stag-hen">
          <div className="ps-stag-hen-media">
            <Image
              src="/images/stag-and-hen-download-poster-preview.png"
              alt="The Stag and Hen app download poster"
              fill
              sizes="(max-width: 900px) 100vw, 520px"
              className="ps-stag-hen-image"
            />
          </div>

          <div className="ps-stag-hen-copy">
            <Image
              src="/images/stag-and-hen-logo.png"
              alt="The Stag and Hen"
              width={112}
              height={112}
              className="ps-stag-hen-logo"
            />
            <p className="ps-kicker">The Ultimate Stag & Hen Party App</p>
            <h2>Everything your crew needs in one place.</h2>
            <p>
              From collecting money and organising the weekend to sharing photos
              and playing hilarious party games, The Stag & Hen app takes the
              stress out of planning and puts the fun back into partying.
            </p>
            <ul className="ps-stag-hen-list">
              <li>🎯 QR Code Crew Invites</li>
              <li>📸 Private Shared Gallery</li>
              <li>💰 Group Kitty & Spending Tracker</li>
              <li>🎲 Dares, Missions & Party Games</li>
              <li>🛍️ Curated Party Shop</li>
            </ul>
            <p>
              Create memories you&apos;ll be talking about long after the
              wedding day.
            </p>
            <div className="ps-stag-hen-qr-row" aria-label="Stag and Hen app download QR codes">
              <div className="ps-stag-hen-qr-card">
                <Image
                  src="/images/stag-and-hen-ios-app-store-qr.png"
                  alt="The Stag and Hen iPhone and iPad App Store QR code"
                  width={120}
                  height={120}
                />
                <span>iPhone & iPad</span>
              </div>
              <div className="ps-stag-hen-qr-card">
                <Image
                  src="/images/stag-and-hen-google-play-qr.png"
                  alt="The Stag and Hen Android Google Play QR code"
                  width={120}
                  height={120}
                />
                <span>Android</span>
              </div>
            </div>
            <div className="ps-inline-actions">
              <a href="https://stag-and-hen.com" className="ps-button ps-button-primary">
                Download Now
              </a>
            </div>
          </div>
        </section>

        <section className="ps-section ps-process">
          <div className="ps-section-heading">
            <p className="ps-kicker">Simple flow</p>
            <h2>From invite to finished gallery.</h2>
          </div>

          <ol className="ps-step-list">
            {steps.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="ps-section ps-stationery">
          <div className="ps-stationery-copy">
            <p className="ps-kicker">Printed details</p>
            <h2>Stationery that looks part of the event.</h2>
            <p>
              Name cards, QR table talkers, invitations, and posters can be
              generated from the event style, giving hosts something useful to
              place on tables and share with guests.
            </p>
          </div>

          <div className="ps-stationery-images">
            <Image
              src="/images/IMG_3604.webp"
              alt="PartyShare place card example"
              width={420}
              height={520}
              className="ps-stationery-main"
            />
            <Image
              src="/images/IMG_3605.webp"
              alt="PartyShare table talker example"
              width={320}
              height={420}
              className="ps-stationery-small"
            />
          </div>
        </section>

        <section className="ps-download" id="app-download">
          <div>
            <p className="ps-kicker">Available on mobile</p>
            <h2>Start collecting memories with PartyShare.</h2>
            <p>
              Download the app, create your event, and invite guests with a QR
              code or link.
            </p>
          </div>

          <div className="ps-store-buttons">
            <a
              href="https://apps.apple.com/gb/app/partyshare-events/id6755305083"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
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
              />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

function PhoneMockup({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`ps-phone ${className}`}>
      <div className="ps-phone-speaker" />
      <Image src={src} alt={alt} fill sizes="180px" className="ps-phone-image" />
    </div>
  );
}
