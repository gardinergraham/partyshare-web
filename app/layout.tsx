import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "PartyShare Guest Portal",
  description: "Access events and guestbooks easily with PartyShare",
  icons: {
    icon: "/public/favicon.ico", 
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-psDark text-white min-h-screen">
        {/* Page content should NOT control portal positioning */}
       <div id="app-root" className="min-h-screen w-full">
        {children}
        </div>

        {/* ✅ Portal must be OUTSIDE any flex, grid, or overflow container */}
        <div id="portal-root" className="fixed inset-0 pointer-events-none z-[999999]"></div>

        <footer className="w-full bg-[#0d1b2a] border-t border-white/10 mt-16 py-6 text-center text-gray-400 text-sm">
        <div className="flex justify-center space-x-6">
            <a href="/support" className="hover:text-[#e94560] transition">Support</a>
            <a href="/terms" className="hover:text-[#e94560] transition">Terms</a>
            <a href="/privacy" className="hover:text-[#e94560] transition">Privacy</a>
        </div>
        <p className="mt-4 text-gray-500">© {new Date().getFullYear()} PartyShare</p>
        </footer>

      </body>
    </html>
  );
}