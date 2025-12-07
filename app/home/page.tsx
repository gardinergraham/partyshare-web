import React, { Suspense } from "react";
import HomePageInner from "./HomePageInner";

export default function HomePage() {
  return (
    <Suspense fallback={<div className="text-center text-white mt-10">Loading...</div>}>
      <HomePageInner />
    </Suspense>
  );
}
