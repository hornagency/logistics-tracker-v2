import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#0284c7", dark: "#0369a1" },
        dark: { DEFAULT: "#0f172a", light: "#1e293b" },
      },
    },
  },
  plugins: [],
};
export default config;
