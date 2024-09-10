/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "nav-bar-color": "#673030",
        "nav-bar-font-color": "#DEDEDE",
        "background-color-main": "#A8B77F",
        "form-color": "#D9D9D9",
        "Input-green": "76B742",
      },
      borderRadius: {
        "form-radius": "20px",
      },
    },
  },
  plugins: [],
};
