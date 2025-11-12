// web/app/link/page.tsx
import { Suspense } from 'react';
import LinkContent from './LinkContent';

export default function LinkPage() {
  return (
    <Suspense fallback={<div>Redirecting...</div>}>
      <LinkContent />
    </Suspense>
  );
}