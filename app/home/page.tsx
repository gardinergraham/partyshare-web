import React, { Suspense } from "react";
import HomePageInner from "./HomePageInner";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#faf7f2] text-[#4a3f35]">
          Loading…
        </div>
      }
    >
      <HomePageInner />
    </Suspense>
  );
}
