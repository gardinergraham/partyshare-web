// web/app/download/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';

export default function DownloadPage() {
  const searchParams = useSearchParams();
  const partnerPin = searchParams.get('partner_pin');

  return (
    <div style={{ padding: 20, textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
      <h1>Download PartyShare</h1>
      
      {partnerPin && (
        <div style={{ background: '#f0f8ff', padding: 15, borderRadius: 8, margin: '20px 0' }}>
          <p><strong>Partner PIN:</strong> {partnerPin}</p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Keep this PIN - you'll need it when you open the app
          </p>
        </div>
      )}

      <div style={{ margin: '30px 0' }}>
        <h2>Get the App</h2>
        
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            href="https://apps.apple.com/app/partyshare/idYOUR_APP_STORE_ID"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#000',
              color: '#fff',
              borderRadius: 8,
              textDecoration: 'none'
            }}
          >
            📱 App Store
          </a>
          
          <a 
            href="https://play.google.com/store/apps/details?id=com.grahamgardiner.partyshare"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              background: '#000',
              color: '#fff',
              borderRadius: 8,
              textDecoration: 'none'
            }}
          >
            🤖 Google Play
          </a>
        </div>
      </div>

      <p style={{ color: '#666', marginTop: 30 }}>
        After installing the app, it will automatically detect your partner PIN and guide you through setup.
      </p>
    </div>
  );
}