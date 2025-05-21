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
        // Light mode - Refined for better visual hierarchy and contrast
        'primary-light-from': '#4F46E5', // Deeper indigo for stronger presence
        'primary-light-to': '#4338CA', // Rich indigo for depth
        'secondary-light-from': '#E11D48', // Vibrant rose for emphasis
        'secondary-light-to': '#BE123C', // Deep rose for contrast
        'accent-light-teal': '#0D9488', // Refined teal for accents
        'accent-light-lavender': '#7C3AED', // Rich purple for highlights
        'accent-light-peach': '#EA580C', // Warm orange for attention
        'text-light-primary': '#0F172A', // Near-black for primary text
        'text-light-secondary': '#1E293B', // Deep slate for secondary text
        'text-light-tertiary': '#475569', // Medium slate for tertiary text
        'bg-light-card': '#F8FAFC', // Subtle off-white for cards
        
        // Dark mode - Keeping the existing vibrant scheme
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
        'glow': '0 0 40px -10px rgba(79, 70, 229, 0.5)', // Updated to match new primary color
        'glow-lg': '0 0 60px -15px rgba(79, 70, 229, 0.6)', // Updated to match new primary color
      },
    },
  },
  plugins: [],
};