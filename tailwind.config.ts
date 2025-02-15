import type { Config } from "tailwindcss";

module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#22C55E", // Green accent for finance
        dark: "#1E293B",
        light: "#F3F4F6",
      },
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      primary: '#22C55E',
      secondary: '#F3F4F6',
      dark: '#1E293B',
      light: '#F7FAFC',
    }),
    textColor: (theme) => ({
      ...theme('colors'),
      primary: '#22C55E',
      secondary: '#bbbbbb',
      dark: '#1E293B',
      light: '#F7FAFC',
    }),
  },
  plugins: [],
} satisfies Config;