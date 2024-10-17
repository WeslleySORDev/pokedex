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
      boxShadow: {
        drop_2dp:
          "0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2)",
        drop_6dp:
          "0px 6px 6px rgba(0, 0, 0, 0.15),0px 8px 12px rgba(0, 0, 0, 0.1),0px 2px 8px rgba(0, 0, 0, 0.2)",
        inner_2dp:
          "inset 0px 2px 2px rgba(0, 0, 0, 0.14), inset 0px 3px 1px rgba(0, 0, 0, 0.12),inset 0px 1px 5px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
