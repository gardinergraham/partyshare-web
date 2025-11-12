// web/app/link/LinkContent.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function LinkContent() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const deepLink = searchParams.get('d');
    const fallback = searchParams.get('f');
    
    console.log('🔗 Universal Link Handler:');
    console.log('Deep Link:', deepLink);
    console.log('Fallback:', fallback);

    if (deepLink) {
      window.location.href = decodeURIComponent(deepLink);
    }

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