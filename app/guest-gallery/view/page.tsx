import React, { Suspense } from "react";
import ViewMediaPageInner from "./ViewMediaPageInner";

export const dynamic = "force-dynamic";

export default function ViewMediaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          Loading media…
        </div>
      }
    >
      <ViewMediaPageInner />
    </Suspense>
  );
}
