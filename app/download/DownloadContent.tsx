// web/app/download/DownloadContent.tsx
'use client';

import { useSearchParams } from 'next/navigation';

export default function DownloadContent() {
  const searchParams = useSearchParams();
  const partnerPin = searchParams.get('partner_pin');

  return (
    <div style={{ padding: 20, textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
      <h1>Download PartyShare</h1>
      
      {partnerPin && (
        <div style={{ background: '#f0f8ff', padding: 15, borderRadius: 8, margin: '20px 0' }}>
          <p><strong>Partner PIN:</strong> {partnerPin}</p>
          <p style={{ fontSize: '14px', color: '#f64600ff' }}>
            Keep this PIN - you'll need it when you open the app
          </p>
        </div>
      )}

      <div style={{ margin: '30px 0' }}>
        <h2>Get the App</h2>
        
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
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
      </div>

      <p style={{ color: '#666', marginTop: 30 }}>
        After installing the app, it will automatically detect your partner PIN and guide you through setup.
      </p>
    </div>
  );
}