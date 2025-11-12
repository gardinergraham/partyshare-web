// web/app/link/page.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function LinkPage() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const deepLink = searchParams.get('d');  // partyshare://partner?partner_pin=...
    const fallback = searchParams.get('f');  // /download?partner_pin=...
    
    console.log('🔗 Universal Link Handler:');
    console.log('Deep Link:', deepLink);
    console.log('Fallback:', fallback);

    // Try to open the app first
    if (deepLink) {
      window.location.href = decodeURIComponent(deepLink);
    }

    // If app not installed, fallback after delay
    setTimeout(() => {
      if (fallback) {
        window.location.href = decodeURIComponent(fallback);
      } else {
        window.location.href = '/';
      }
    }, 1000);
  }, [searchParams]);

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h1>Opening PartyShare...</h1>
      <p>Redirecting to app...</p>
    </div>
  );
}