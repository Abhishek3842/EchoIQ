/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./apps/web/**/*.{ts,tsx}",
    "./packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    { pattern: /w-\(\-\-sidebar-width\)/ },
    { pattern: /w-\(\-\-sidebar-width-icon\)/ },
  ],
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};
