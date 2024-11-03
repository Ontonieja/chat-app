/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#0372c1",
        "primary-hover": "#048BEB",
        "secondary-blue": "#0681f3",
        "background-gray": "#f3f8fb",
        "slate-gray": "#b3b2ba",
        "text-gray": "#2d2d2d",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        "xs": "370px",
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1536px",
      },
    },
    fontSize: {
      "xs": ["12px", "16px"],
      "sm": ["14px", "20px"],
      "base": ["16px", "19.5px"],
      "lg": ["18px", "21.94px"],
      "xl": ["20px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["30px", "50px"],
      "4xl": ["36px", "65px"],
      "5xl": ["48px", "58px"],
      "6xl": ["60px", "70px"],
      "7xl": ["72px", "80px"],
      "8xl": ["96px", "106px"],
    },
  },
  plugins: [],
};
