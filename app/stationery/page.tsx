import React, { Suspense } from "react";
import StationeryInner from "./StationeryInner";

export default function StationeryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0f0f23] text-white">
          Loading…
        </div>
      }
    >
      <StationeryInner />
    </Suspense>
  );
}