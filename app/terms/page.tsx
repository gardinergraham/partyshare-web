"use client";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0f0f23] text-white px-6 py-10 flex justify-center">
      <div className="max-w-3xl">
        {/* Back Button */}
        <a
          href="/guest-login"
          className="inline-block mb-6 text-gray-300 hover:text-[#e94560] transition text-sm"
        >
          ← Back to Login
        </a>

        <h1 className="text-3xl font-bold text-[#e94560] mb-6 text-center">
          Terms & Conditions
        </h1>

        <p className="text-gray-300 mb-4">
          Welcome to <strong>PartyShare</strong>. By accessing or using this
          platform, you agree to comply with and be bound by the following terms
          and conditions.
        </p>

        <h2 className="text-xl font-semibold text-[#e94560] mt-6 mb-2">
          1. Event Access
        </h2>
        <p className="text-gray-300 mb-4">
          Guests may only access an event using the official event name and
          access PIN provided by the host. Unauthorized access is prohibited.
        </p>

        <h2 className="text-xl font-semibold text-[#e94560] mt-6 mb-2">
          2. Uploads and Content
        </h2>
        <p className="text-gray-300 mb-4">
          By uploading media, you confirm that you have rights to share it and
          that it contains no inappropriate or unlawful content. PartyShare and
          event hosts reserve the right to remove any media at their discretion.
        </p>

        <h2 className="text-xl font-semibold text-[#e94560] mt-6 mb-2">
          3. Privacy
        </h2>
        <p className="text-gray-300 mb-4">
          Uploaded media and guest messages are visible only to event hosts and
          participants. PartyShare does not sell or share personal data with
          third parties.
        </p>

        <h2 className="text-xl font-semibold text-[#e94560] mt-6 mb-2">
          4. Liability
        </h2>
        <p className="text-gray-300 mb-4">
          PartyShare is not responsible for user-generated content or technical
          interruptions. Use this service at your own discretion.
        </p>

        <p className="text-gray-400 mt-10 text-sm text-center">
          Last updated: November 2025
        </p>
      </div>
    </div>
  );
}
