// web/app/download/page.tsx
import { Suspense } from 'react';
import DownloadContent from './DownloadContent';

export default function DownloadPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DownloadContent />
    </Suspense>
  );
}