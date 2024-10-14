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
        primary: "#dc0a2d",
        grayscale: {
          background: "#efefef",
          light: "#e0e0e0",
          medium: "#666666",
          dark: "#212121",
          white: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
export default config;
