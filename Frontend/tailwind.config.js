/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'yellow':'#b0b435',
        'black':'#000000',
        'white':'#ffffff',
        'lightGrey':'#f4f4f4',
        'textgrey':'#999999'
      },
      screens:{
        'ml':'993px'
      },
      animation: {
        'move-down': 'move-down 0.5s forwards',
        'move-up': 'move-up 0.5s forwards',
        'move-left':'move-left 0.5s forwards',
        'move-right':'move-right 0.5s forwards',
        'fade-out': 'fade-out 0.3s forwards',
        'fade-in': 'fade-in 0.3s forwards',
        'scale-out':'scale-out 0.3s forwards',
        'scale-in':'scale-in 0.3s forwards',
      },
      keyframes: {
        'move-down': {
          '0%': { transform: 'translateY(-100%)'},
          '100%': { transform: 'translateY(0)' },
        },

        'move-up': {
          '0%': { transform: 'translateY(0)' },
          
          '100%': { transform: 'translateY(-101%)' },
        },

        'move-left': {
          '0%': { transform: 'translateX(100%)'},
          '100%': { transform: 'translateX(0)' },
        },

        'move-right': {
          '0%': { transform: 'translateX(0)'},
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%':{ opacity: '0'}
        },
        // , transform: 'scale(1)'
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-out': {
          '0%': { transform: 'scale(1)' },
          '100%':{ transform: 'scale(0)' }
        },
        'scale-in': {
          '0%': {transform: 'scale(0)' },
          '100%': {transform: 'scale(1)' },
        },
      }
    },
  },
  plugins: []
}


  
