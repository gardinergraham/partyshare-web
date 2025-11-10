

import React, { Suspense } from "react";
import GuestGalleryInner from "./GuestGalleryInner";

// prevent prerendering / static export for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function GuestGalleryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0f0f23] text-white px-4 pt-[170px] pb-10 overflow-y-auto">
          Loading gallery…
        </div>
      }
    >
      <GuestGalleryInner />
    </Suspense>
  );
}
