import { Suspense } from "react";
import VerifiedContent from "./VerifiedContent";

export default function VerifiedPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading verification...</div>}>
      <VerifiedContent />
    </Suspense>
  );
}
