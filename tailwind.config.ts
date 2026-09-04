import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#06396E",
        "navy-deep": "#042A54",
        red: "#BE1716",
        gold: "#FFCC00",
        skyblue: "#4CAAE0",
        paper: "#FFFFFF",
        offwhite: "#F7F6F3",
        charcoal: "#1E1E1E",
      },
      fontFamily: {
        display: ["var(--font-body)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
export default config;
