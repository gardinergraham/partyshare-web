"use client";

import React from "react";

export default function DeleteAccount() {
  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white flex flex-col justify-center px-6 py-16">
      <div className="max-w-2xl mx-auto bg-[#1b263b] p-8 rounded-2xl border border-white/10 shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-[#e94560] mb-3">
          Delete Your PartyShare Account
        </h1>
        <p className="text-center text-gray-300 mb-8">
          We respect your privacy and your right to control your data.
        </p>

        {/* What gets deleted */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#e94560] mb-2">
            What will be deleted?
          </h2>
          <p className="text-gray-300 mb-2">
            When your PartyShare account is deleted, we remove:
          </p>
          <ul className="ml-4 list-disc text-gray-300 space-y-1">
            <li>Your account profile</li>
            <li>Your hosted events</li>
            <li>All guest uploads (photos & videos)</li>
            <li>Guestbook messages</li>
            <li>Any associated personal data</li>
          </ul>
        </section>

        {/* How to request */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#e94560] mb-2">
            How to request deletion
          </h2>
          <p className="text-gray-300 mb-3">
            To delete your PartyShare account and all associated data, please email us from the
            address used to create your account:
          </p>

          <div className="bg-[#0d1b2a] border border-white/10 rounded-lg p-4 text-center">
            <p className="text-lg font-semibold text-[#e94560]">
              📧 support@party-share.uk
            </p>
          </div>

          <p className="text-gray-400 text-sm mt-3">
            For security, we can only process deletion requests sent from the email
            address associated with your PartyShare account.
          </p>
        </section>

        {/* Guests */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-[#e94560] mb-2">
            What about guests?
          </h2>
          <p className="text-gray-300">
            Guests do not have permanent accounts. Any photos, videos, or messages uploaded
            by guests are automatically deleted when the event owner deletes their event or
            their account.
          </p>
        </section>

        {/* Processing time */}
        <section>
          <h2 className="text-xl font-semibold text-[#e94560] mb-2">
            How long does it take?
          </h2>
          <p className="text-gray-300">
            We process all deletion requests within <strong>30 days</strong>, in line with data
            protection regulations.
          </p>
        </section>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-10">
          If you have questions, contact{" "}
          <span className="text-[#e94560]">support@party-share.uk</span>
        </div>
      </div>
    </div>
  );
}
