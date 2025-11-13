import { Suspense } from "react";
import ChangePasswordContent from "./ChangePasswordContent";

export default function ChangePasswordPage() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <ChangePasswordContent />
    </Suspense>
  );
}
