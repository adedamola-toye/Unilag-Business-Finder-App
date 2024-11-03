/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      "main": "#800000", //marron
      "complementary": "#a84425", //brownish gold
      "accent": "#f2e9e9",
      "navy": "white"
    },
    extend: {
      screens:{
        'max-sm' : {'max': '639px'},
        'lg-max': {'max': '1280px'},
        "md-lg": "1024px",
        "lg": "1025px"  //this was the solution to that overlapping header!! 
      },
      fontFamily: {
        customFont: ['inter', 'serif'],
      },
    },
  },
  plugins: [],
}

