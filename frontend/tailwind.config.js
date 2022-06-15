/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: [
          "Pretendard Variable",
          "Apple SD Gothic Neo",
          "sans-serif",
        ],
      },
      colors: {
        'like-black': "#121212"
      }
    },
  },
  plugins: [],
}
