"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

export default function VerifiedContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const status = searchParams.get("status") || "success";
  const [message, setMessage] = useState("");
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    // 🧠 Display status message
    if (status === "success") {
      setMessage("Your Partner account has been verified and activated! 🎉");
    } else if (status === "expired") {
      setMessage("Your verification link has expired. Please register again.");
    } else {
      setMessage("Something went wrong verifying your account.");
    }

    // 📱 Try opening the PartyShare app automatically (if success)
    if (status === "success") {
      const appLink = "partyshare://partner-login";
      const timeout = setTimeout(() => {
        window.location.href = appLink;
      }, 1000);

      // After 2 seconds, show the manual buttons
      const showTimeout = setTimeout(() => setShowButtons(true), 2000);

      return () => {
        clearTimeout(timeout);
        clearTimeout(showTimeout);
      };
    } else {
      setShowButtons(true);
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-[#0f0f23] text-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#1b263b] p-8 rounded-2xl shadow-2xl border border-white/10 text-center animate-fadeIn">
        {status === "success" ? (
          <CheckCircle size={72} className="mx-auto text-[#4CAF50] mb-4" />
        ) : (
          <XCircle size={72} className="mx-auto text-[#e94560] mb-4" />
        )}

        <h1 className="text-3xl font-bold text-[#e94560] mb-4">
          Partner Verification
        </h1>
        <p className="text-gray-300 text-lg mb-6">{message}</p>

        {email && (
          <p className="text-gray-400 text-sm mb-8">
            Verified email:{" "}
            <span className="text-white font-semibold">{email}</span>
          </p>
        )}

        {/* --- Buttons --- */}
        {showButtons ? (
          status === "success" ? (
            <>
              <a
                href="partyshare://partner-login"
                className="block bg-[#e94560] hover:bg-[#ff5b74] transition text-white font-semibold py-4 rounded-xl mb-4"
              >
                Open in PartyShare App
              </a>
              <a
                href="/partner-login"
                className="block bg-[#1a1a2e] hover:bg-[#2c2c4a] border border-[#e94560] text-[#e94560] font-semibold py-4 rounded-xl"
              >
                Go to Partner Login
              </a>
            </>
          ) : (
            <a
              href="/partner-register"
              className="block bg-[#e94560] hover:bg-[#ff5b74] transition text-white font-semibold py-4 rounded-xl"
            >
              Register Again
            </a>
          )
        ) : (
          <p className="text-gray-400 text-sm mt-4 animate-pulse">
            Attempting to open PartyShare app...
          </p>
        )}
      </div>

      {/* --- Footer --- */}
      <footer className="mt-10 text-sm text-white text-center flex flex-wrap justify-center gap-6">
        <a href="/terms" className="text-white hover:text-[#e94560]">
          Terms & Conditions
        </a>
        <a href="/privacy" className="text-white hover:text-[#e94560]">
          Privacy Policy
        </a>
      </footer>
    </div>
  );
}
//changed folder name to verify