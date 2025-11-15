// PrivacyPolicy.tsx
"use client";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white flex flex-col justify-center px-6 py-16">
      <div className="max-w-3xl mx-auto bg-[#1b263b] p-8 rounded-2xl border border-white/10 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[#e94560] mb-3">
          Privacy Policy
        </h1>
        <p className="text-center text-gray-300 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-6 text-gray-300">
          <p>
            PartyShare ("we", "us", "our") provides a platform for event owners and guests to upload,
            view, and share media at events such as parties, weddings, and gatherings. This Privacy Policy
            explains how we collect, use, and protect your information when you use our mobile app and website.
          </p>
          <p>If you do not agree with this policy, please do not use PartyShare.</p>

          <h2 className="text-[#e94560] text-xl font-semibold">1. Information We Collect</h2>
          <p>We collect only the information necessary for the app to function.</p>

          <h3 className="text-lg font-semibold text-[#e94560] mt-4">1.1 Owner Account Information</h3>
          <ul className="list-disc ml-6">
            <li>Email address</li>
            <li>Password (encrypted)</li>
            <li>User ID (automatically generated)</li>
          </ul>

          <h3 className="text-lg font-semibold text-[#e94560] mt-4">1.2 Guest Information</h3>
          <p>Guests do not create accounts. When joining an event, a guest may provide:</p>
          <ul className="list-disc ml-6">
            <li>A display name</li>
            <li>Media uploaded (photos/videos)</li>
            <li>Guestbook messages</li>
          </ul>

          <h3 className="text-lg font-semibold text-[#e94560] mt-4">1.3 User-Generated Content</h3>
          <ul className="list-disc ml-6">
            <li>Photos and videos uploaded to an event</li>
            <li>Guestbook messages</li>
            <li>Event details and settings</li>
            <li>QR code access data</li>
          </ul>

          <h3 className="text-lg font-semibold text-[#e94560] mt-4">1.4 Payment Information</h3>
          <p>
            Payments are handled securely by Stripe. We do not collect or store credit card numbers,
            billing addresses, or bank account information. This information is entered directly with Stripe.
          </p>

          <h3 className="text-lg font-semibold text-[#e94560] mt-4">1.5 Technical Data</h3>
          <ul className="list-disc ml-6">
            <li>Device type</li>
            <li>Operating system version</li>
            <li>Server logs</li>
            <li>IP address</li>
          </ul>

          <h2 className="text-[#e94560] text-xl font-semibold mt-6">2. How We Use Your Information</h2>
          <ul className="list-disc ml-6">
            <li>To create and manage event owner accounts</li>
            <li>To allow guests to join events via QR code</li>
            <li>To upload and view media</li>
            <li>To generate downloadable galleries</li>
            <li>To manage purchases and packages</li>
            <li>To maintain security</li>
            <li>To provide customer support</li>
          </ul>
          <p>We do not sell data, share with advertisers, or track users.</p>

          <h2 className="text-[#e94560] text-xl font-semibold mt-6">3. Legal Basis</h2>
          <ul className="list-disc ml-6">
            <li>Contractual necessity</li>
            <li>Consent</li>
            <li>Legitimate interest</li>
          </ul>

          <h2 className="text-[#e94560] text-xl font-semibold mt-6">4. Storage & Protection</h2>
          <p>We use MongoDB, AWS S3, HTTPS encryption, and encrypted passwords.</p>

          <h2 className="text-[#e94560] text-xl font-semibold mt-6">5. Sharing Your Information</h2>
          <p>We only share data with required service providers: Railway, AWS, Stripe.</p>

          <h2 className="text-[#e94560] text-xl font-semibold mt-6">6. Data Retention</h2>
          <p>Data is retained only as long as necessary for the event and service.</p>

          <h2 className="text-[#e94560] text-xl font-semibold mt-6">7. Children’s Privacy</h2>
          <p>Not intended for children under 13.</p>

          <h2 className="text-[#e94560] text-xl font-semibold mt-6">8. Your Rights</h2>
          <p>You may request access, deletion, correction, or data copies.</p>

          <h2 className="text-[#e94560] text-xl font-semibold mt-6">9. Contact Us</h2>
          <p>Email: support@party-share.uk</p>

          <h2 className="text-[#e94560] text-xl font-semibold mt-6">10. Changes</h2>
          <p>We may update this policy with a new "Last Updated" date.</p>
        </div>
      </div>
    </div>
  );
}
