/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        '2xl': '1536px',
      },
      fontFamily: {
        'display': ['Outfit', 'sans-serif'],
        'sans': ['Outfit', 'sans-serif'],
      },
      colors: {
        // Light mode
        'primary-light-from': '#9D5CFF', // Purple
        'primary-light-to': '#4FE8FF', // Cyan
        'secondary-light-from': '#8A4FFF',
        'secondary-light-to': '#52C5FF',
        'accent-light-teal': '#4FE8FF',
        'accent-light-lavender': '#9D5CFF',
        'accent-light-peach': '#EA580C',
        'text-light-primary': '#0F172A',
        'text-light-secondary': '#1E293B',
        'text-light-tertiary': '#475569',
        'bg-light-card': '#F8FAFC',
        
        // Dark mode
        'primary-dark-from': '#9D5CFF', // Purple
        'primary-dark-to': '#4FE8FF', // Cyan
        'secondary-dark-from': '#8A4FFF',
        'secondary-dark-to': '#52C5FF',
        'accent-dark-teal': '#4FE8FF',
        'accent-dark-lavender': '#9D5CFF',
        'accent-dark-peach': '#FB923C',
        'text-dark-primary': '#F9FAFB',
        'text-dark-secondary': '#E5E7EB',
        'text-dark-tertiary': '#D1D5DB',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(157, 92, 255, 0.5)',
        'glow-lg': '0 0 60px -15px rgba(157, 92, 255, 0.6)',
      },
    },
  },
  plugins: [],
};