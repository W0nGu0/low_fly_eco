/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7ff',
          100: '#bae7ff',
          200: '#91d5ff',
          300: '#69c0ff',
          400: '#40a9ff',
          500: '#1890ff',
          600: '#096dd9',
          700: '#0050b3',
          800: '#003a8c',
          900: '#002766',
        },
        secondary: {
          50: '#f0f9eb',
          100: '#d9f0c7',
          200: '#b8e69e',
          300: '#95dc76',
          400: '#78d24e',
          500: '#5bc726',
          600: '#4db11f',
          700: '#3d9619',
          800: '#2e7b13',
          900: '#1f600c',
        },
        accent: {
          50: '#fff1f0',
          100: '#ffccc7',
          200: '#ffa39e',
          300: '#ff7875',
          400: '#ff4d4f',
          500: '#f5222d',
          600: '#cf1322',
          700: '#a8071a',
          800: '#820014',
          900: '#5c0011',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e8e8e8',
          300: '#d9d9d9',
          400: '#bfbfbf',
          500: '#8c8c8c',
          600: '#595959',
          700: '#434343',
          800: '#262626',
          900: '#141414',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.neutral.700'),
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: theme('colors.primary.600'),
              },
            },
            h1: {
              color: theme('colors.neutral.800'),
            },
            h2: {
              color: theme('colors.neutral.800'),
            },
            h3: {
              color: theme('colors.neutral.800'),
            },
            h4: {
              color: theme('colors.neutral.800'),
            },
            h5: {
              color: theme('colors.neutral.800'),
            },
            h6: {
              color: theme('colors.neutral.800'),
            },
            strong: {
              color: theme('colors.neutral.800'),
            },
            code: {
              color: theme('colors.accent.500'),
            },
            blockquote: {
              color: theme('colors.neutral.600'),
              borderLeftColor: theme('colors.neutral.300'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
