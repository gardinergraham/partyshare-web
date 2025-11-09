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
        {/* ✅ Page content now centered INSIDE main, not on body */}
        <main className="flex flex-col items-center justify-center w-full min-h-screen">
          {children}
        </main>

        {/* ✅ Portal target stays outside layout flow */}
        <div id="portal-root"></div>
      </body>
    </html>
  );
}
