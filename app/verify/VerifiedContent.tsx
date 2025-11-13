"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

export default function VerifiedContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error" | "expired">("loading");
  const [email, setEmail] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyPartner = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Missing verification token.");
        return;
      }

      try {
        // ✅ Call backend verification endpoint
      const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/partners/verify/${token}`
        );


        if (!res.ok) {
          const errText = await res.text();
          console.error("❌ Verification failed:", errText);

          if (res.status === 400 && errText.includes("expired")) {
            setStatus("expired");
            setMessage("Your verification link has expired.");
          } else {
            setStatus("error");
            setMessage("Invalid or expired verification link.");
          }
          console.log("🔗 Verifying via:", `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/partners/verify/${token}`);

          return;
        }

        const data = await res.json();
        console.log("✅ Partner verified successfully:", data);

        setStatus("success");
        setEmail(data.email || "your account");
        setMessage("Your Partner account has been verified and activated! 🎉");
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("error");
        setMessage("Something went wrong verifying your account.");
      }
    };

    verifyPartner();
  }, [token]);

  // ✅ Render status-based content
  return (
    <div className="min-h-screen bg-[#0f0f23] text-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#1b263b] p-8 rounded-2xl shadow-2xl border border-white/10 text-center animate-fadeIn">
        {status === "loading" && (
          <>
            <p className="text-gray-300 mb-4 text-lg">Verifying your account...</p>
            <p className="text-sm text-gray-500">Please wait</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle size={72} className="mx-auto text-[#4CAF50] mb-4" />
            <h1 className="text-3xl font-bold text-[#e94560] mb-4">
              Partner Verification
            </h1>
            <p className="text-gray-300 text-lg mb-6">{message}</p>
            <p className="text-gray-400 text-sm mb-8">
              Verified email: <span className="text-white font-semibold">{email}</span>
            </p>
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
        )}

        {status === "error" && (
          <>
            <XCircle size={72} className="mx-auto text-[#e94560] mb-4" />
            <h1 className="text-3xl font-bold text-[#e94560] mb-4">
              Verification Failed
            </h1>
            <p className="text-gray-300 text-lg mb-6">{message}</p>
            <a
              href="/partner-register"
              className="block bg-[#e94560] hover:bg-[#ff5b74] transition text-white font-semibold py-4 rounded-xl"
            >
              Register Again
            </a>
          </>
        )}

        {status === "expired" && (
          <>
            <XCircle size={72} className="mx-auto text-[#e94560] mb-4" />
            <h1 className="text-3xl font-bold text-[#e94560] mb-4">
              Link Expired
            </h1>
            <p className="text-gray-300 text-lg mb-6">{message}</p>
            <a
              href="/partner-register"
              className="block bg-[#e94560] hover:bg-[#ff5b74] transition text-white font-semibold py-4 rounded-xl"
            >
              Register Again
            </a>
          </>
        )}
      </div>
    </div>
  );
}
//lets redeploy now
