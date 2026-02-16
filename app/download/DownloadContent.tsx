// web/app/download/DownloadContent.tsx
'use client';

import { useSearchParams } from 'next/navigation';

export default function DownloadContent() {
  const searchParams = useSearchParams();
  const partnerPin = searchParams.get('partner_pin');

  return (
  <div className="max-w-xl mx-auto p-6 text-center">
    <h1 className="text-2xl font-bold mb-6">Download Party Share</h1>

    {partnerPin && (
      <div className="bg-[#e94560] p-4 rounded-lg mb-6">
        <p className="text-xl font-semibold text-black">
          Partner PIN: {partnerPin}
        </p>

        <p className="text-sm text-white mt-2">
          Keep this PIN — you’ll need it when you open the app,
          or scan the QR code again after installing.
        </p>
      </div>
    )}

    {/* --- App Promo --- */}
    <section className="mt-6 bg-[#0f0f23] rounded-2xl p-6 text-center">
      <h3 className="text-lg font-bold mb-2 text-white">
        Love Party Share?
      </h3>

      <p className="text-gray-300 mb-4">
        Get the full experience on our mobile app.
      </p>

      <div className="flex items-center justify-center gap-4 flex-wrap">
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
    </section>

    <p className="text-gray-500 mt-6 text-sm">
      After installing the app, it will automatically detect your partner PIN
      and guide you through setup.
    </p>
  </div>
);
