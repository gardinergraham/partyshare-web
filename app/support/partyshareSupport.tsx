"use client";

import React from "react";

export default function PartyShareSupport() {
  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white flex flex-col justify-center px-6 py-16">
      <div className="max-w-2xl mx-auto bg-[#1b263b] p-8 rounded-2xl border border-white/10 shadow-lg">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-[#e94560] mb-3">
          PartyShare Support
        </h1>
        <p className="text-center text-gray-300 mb-8">
          We're here to help you get the most out of your events.
        </p>

        {/* Contact Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-[#e94560] mb-2">
            Contact Us
          </h2>
          <p className="text-gray-300 mb-3">
            If you need help or are experiencing issues, contact us at:
          </p>
          <p className="text-gray-200 font-medium">📧 support@party-share.com</p>
          <p className="text-gray-400 text-sm">We aim to reply within 24 hours.</p>
        </section>

        {/* Quick Help */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-[#e94560] mb-3">
            Quick Help
          </h2>

          <ul className="space-y-3 text-gray-300">
            <li>
              🔑 <strong>Password Reset:</strong>  
              Requested a reset? Check your email for the link to  
              <code className="text-[#e94560] ml-1">/change-Password</code>.
            </li>

            <li>
              🎉 <strong>Join an Event as a Guest:</strong>
              <ul className="ml-4 list-disc text-gray-400 text-sm mt-1">
                <li>Open PartyShare App</li>
                <li>Tap <strong>Join as Guest</strong></li>
                <li>Enter the Event Name & PIN</li>
              </ul>
            </li>

            <li>
              📸 <strong>Upload Photos/Videos:</strong>  
              Ensure camera + photo permissions are enabled.
            </li>
          </ul>
        </section>

        {/* Event Owners */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-[#e94560] mb-3">
            For Event Owners
          </h2>
          <p className="text-gray-300">
            As an event owner, you can:
          </p>
          <ul className="ml-4 list-disc text-gray-300 mt-2 space-y-1">
            <li>Create and manage events</li>
            <li>Share QR codes or PINs with guests</li>
            <li>Set upload windows</li>
            <li>Delete media</li>
            <li>Download guestbooks or entire galleries</li>
          </ul>
        </section>

        {/* Partners */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-[#e94560] mb-3">
            Partners
          </h2>
          <p className="text-gray-300 mb-2">
            If you're part of the PartyShare Partner Program:
          </p>

          <ul className="ml-4 list-disc text-gray-300 space-y-1">
            <li>Login via the Partner Login in the app</li>
            <li>Track referrals & commissions</li>
            <li>Access your Partner QR + PIN</li>
            <li>Start Stripe onboarding to receive payouts</li>
          </ul>

          <p className="text-gray-200 font-medium mt-3">
            📧 partners@party-share.uk
          </p>
        </section>

        {/* Troubleshooting */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-[#e94560] mb-3">
            Troubleshooting
          </h2>

          <ul className="space-y-3 text-gray-300">
            <li>
              ❗ <strong>Can’t log in?</strong>  
              Ensure you're using the correct login type (User or Partner).
            </li>

            <li>
              ⏱️ <strong>Upload window closed?</strong>  
              The event owner can extend upload time from their dashboard.
            </li>

            <li>
              🧑‍🤝‍🧑 <strong>Guests can't join?</strong>  
              Double-check the event name + PIN.
            </li>
          </ul>
        </section>

       {/* --- Footer --- */}
      <footer className="mt-8 text-sm text-white text-center flex flex-wrap justify-center gap-6">
        <a href="/home" className="text-white hover:text-[#e94560]">
        About Party Share
      </a>
        <a href="/partner" className="text-white hover:text-[#e94560]">
        Become a Partner
      </a>

        <a href="/terms" className="text-white hover:text-[#e94560]">
          Terms & Conditions
        </a>

        <a href="/support" className="text-white hover:text-[#e94560]">
          Support
        </a>

        <a href="/support/contact" className="text-white hover:text-[#e94560]">
          Contact Us
        </a>
      {/* added privacy*/}
        <a href="/privacy" className="text-white hover:text-[#e94560]">
          Privacy Policy
        </a>
      </footer>
      </div>
    </div>
  );
}
