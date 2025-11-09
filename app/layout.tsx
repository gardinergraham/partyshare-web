import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "PartyShare Guest Portal",
  description: "Access events and guestbooks easily with PartyShare",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-psDark text-white min-h-screen">
        {/* Page content should NOT control portal positioning */}
        <div id="app-root" className="min-h-screen w-full flex flex-col items-center justify-center">
          {children}
        </div>

        {/* ✅ Portal must be OUTSIDE any flex, grid, or overflow container */}
        <div id="portal-root" className="fixed inset-0 pointer-events-none z-[999999]"></div>
      </body>
    </html>
  );
}
