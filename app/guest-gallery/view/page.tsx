"use client";

import { Suspense } from "react";
import ViewMediaPage from "./ViewMediaPage";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 grid place-items-center bg-black text-white">
          Loading…
        </div>
      }
    >
      <ViewMediaPage />
    </Suspense>
  );
}
