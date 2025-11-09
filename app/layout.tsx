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
        {children}
        {/* ✅ Portal target for fullscreen viewer */}
        <div id="portal-root"></div>
      </body>
    </html>
  );
}
