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

        {/* Main app container */}
        <div id="app-root" className="min-h-screen w-full flex flex-col justify-start">
          {children}
        </div>

        {/* Portal root — stays here */}
        <div id="portal-root" className="fixed inset-0 pointer-events-none z-[999999]"></div>

      </body>
    </html>
  );
}
