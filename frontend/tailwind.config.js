/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#F5F3ED',
          50: '#FAF8F5',
          100: '#F5F3ED',
          200: '#EDE9DF',
          300: '#E2DDD2',
          400: '#D5CEC0',
          paper: '#FAF9F5',
          surface: '#FFFFFF',
          border: '#D8DCD5',
          muted: '#737975',
        },
        charcoal: {
          DEFAULT: '#252B2D',
          900: '#141819',
          800: '#1C2224',
          700: '#252B2D',
          600: '#3A4245',
          500: '#525B5E',
          muted: '#737975',
        },
        monsoon: {
          DEFAULT: '#526B59',
          light: '#6B8773',
          dark: '#3D5243',
          soft: '#EAF0EB',
        },
        terracotta: {
          DEFAULT: '#B9684D',
          light: '#D08269',
          dark: '#934E37',
          soft: '#F9EFEB',
        },
        crimson: {
          DEFAULT: '#8E3935',
          light: '#AB4844',
          dark: '#6E2522',
          soft: '#F8EAE9',
        },
        ochre: {
          DEFAULT: '#A67C38',
          light: '#C49851',
          dark: '#855E24',
          soft: '#F7F2E7',
        },
        softborder: '#D8DCD5',
        // Harmonious aliases for existing components
        slate: {
          900: '#252B2D',
          DEFAULT: '#FAF9F5',
          800: '#FFFFFF',
          700: '#EDE9DF',
          600: '#737975',
          500: '#8A928E',
        },
        sage: {
          DEFAULT: '#526B59',
          light: '#6B8773',
          dark: '#3D5243',
        },
        amber: {
          DEFAULT: '#A67C38',
          light: '#C49851',
          dark: '#855E24',
        },
        coral: {
          DEFAULT: '#B9684D',
          light: '#D08269',
          dark: '#934E37',
        },
        risk: {
          low: '#526B59',
          moderate: '#A67C38',
          high: '#B9684D',
          severe: '#8E3935',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(37, 43, 45, 0.05)',
        'paper': '0 1px 3px rgba(37, 43, 45, 0.04), 0 4px 12px rgba(37, 43, 45, 0.03)',
        'elevated': '0 4px 20px -2px rgba(37, 43, 45, 0.08)',
      }
    },
  },
  plugins: [],
}
