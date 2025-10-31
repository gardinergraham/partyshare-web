import React, { Suspense } from "react";
import GuestLoginInner from "./GuestLoginInner";

export default function GuestLoginPage() {
  return (
    <Suspense fallback={<div className="text-center text-white mt-10">Loading...</div>}>
      <GuestLoginInner />
    </Suspense>
  );
}
