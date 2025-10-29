import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        psPink: "#e94560",
        psDark: "#0d1b2a",
        psMid: "#1a1a2e",
      },
    },
  },
  plugins: [],
} satisfies Config;
