"use client";

import React, { Suspense } from "react";
import GuestGalleryInner from "./GuestGalleryInner";

// prevent prerendering / static export for this page
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function GuestGalleryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center bg-[#0f0f23] text-white">
          Loading gallery…
        </div>
      }
    >
      <GuestGalleryInner />
    </Suspense>
  );
}
