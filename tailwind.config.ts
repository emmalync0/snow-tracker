import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palisades Tahoe brand palette
        tahoe: {
          950: "#0f0a24",
          900: "#201547",
          800: "#2e1f5e",
          700: "#3d2b78",
          600: "#4c3892",
          500: "#6250a7",
          400: "#8070bb",
          300: "#a99dd0",
          200: "#cfc8e4",
          100: "#eae7f3",
          50: "#f5f4f9",
        },
        sky: {
          600: "#2563eb",
          500: "#3182CE",
          400: "#5a9edb",
          300: "#93c5fd",
          200: "#bfdbfe",
          100: "#dbeafe",
          50: "#eff6ff",
        },
      },
    },
  },
  plugins: [],
};

export default config;
