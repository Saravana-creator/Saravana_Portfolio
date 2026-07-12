/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:   "#4F46E5",
        secondary: "#06B6D4",
        accent:    "#14B8A6",
        dark:      "#0F172A",
        brutal:    "#000000",
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body:    ["'Space Grotesk'", "sans-serif"],
        mono:    ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        brutal:    "4px 4px 0px #000",
        "brutal-lg": "8px 8px 0px #000",
        "brutal-xl": "12px 12px 0px #000",
        glass:     "0 8px 32px rgba(0,0,0,0.12)",
      },
      backdropBlur: {
        xs: "4px",
      },
      animation: {
        float:  "float 6s ease-in-out infinite",
        shimmer:"shimmer 2.5s linear infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-16px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
