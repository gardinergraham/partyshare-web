"use client";
import { Suspense } from "react";
import ChangePasswordContent from "./ChangePasswordContent";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white text-center p-8">Loading...</div>}>
      <ChangePasswordContent />
    </Suspense>
  );
}
