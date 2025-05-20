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
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        // Light mode - Enhanced for better contrast and visual appeal
        'primary-light-from': '#6366F1',
        'primary-light-to': '#4F46E5',
        'secondary-light-from': '#EC4899',
        'secondary-light-to': '#F43F5E',
        'accent-light-teal': '#14B8A6',
        'accent-light-lavender': '#8B5CF6',
        'accent-light-peach': '#F97316',
        'text-light-primary': '#111827',
        'text-light-secondary': '#374151',
        'text-light-tertiary': '#6B7280',
        'bg-light-card': '#F9FAFB',
        
        // Dark mode - More vibrant and engaging
        'primary-dark-from': '#818CF8',
        'primary-dark-to': '#6366F1',
        'secondary-dark-from': '#F472B6',
        'secondary-dark-to': '#EC4899',
        'accent-dark-teal': '#2DD4BF',
        'accent-dark-lavender': '#A78BFA',
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
        'glow': '0 0 40px -10px rgba(99, 102, 241, 0.5)',
        'glow-lg': '0 0 60px -15px rgba(99, 102, 241, 0.6)',
      },
    },
  },
  plugins: [],
};