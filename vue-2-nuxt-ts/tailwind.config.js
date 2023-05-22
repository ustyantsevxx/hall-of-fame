const lineClampPlugin = require('@tailwindcss/line-clamp')

const spacing0to100px = Object.fromEntries(
  Array.from({ length: 101 }).map((_, index) => [index, `${index}px`])
)

module.exports = {
  plugins: [lineClampPlugin],

  important: true,

  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],

  theme: {
    extend: {
      brightness: {
        97: 0.97
      },

      backgroundImage: () => ({
        gradient:
          'linear-gradient(to left, #453193 0%, #1173bb 50%, #5fbbea 100%)'
      })
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      black: '#000000',
      green: '#54a746',
      red: '#be5353',
      purple: '#4f4382',
      blue: {
        DEFAULT: '#5390be',
        100: 'rgba(83, 144, 190, 0.1)'
      },

      'light-blue': {
        200: '#EBF5FA',
        DEFAULT: '#9ACFE6'
      },

      gray: {
        10: 'rgba(0,0,0,0.01)',
        20: 'rgba(0,0,0,0.025)',
        100: '#0000001a',
        300: '#0000004d',
        500: 'rgba(0,0,0,0.5)',
        DEFAULT: '#00000080'
      }
    },

    borderRadius: {
      0: '0',
      5: '5px',
      8: '8px',
      10: '10px',
      18: '18px',
      20: '20px',
      25: '25px',
      full: '9999px'
    },

    spacing: {
      ...spacing0to100px
    },

    container: {
      center: true
    },

    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif']
    },

    fontSize: {
      h1: ['50px', '60px'],
      h2: ['30px', '40px'],
      subtitle: ['20px', '30px'],
      description: ['14px', '20px'],
      paragraph: ['16px', '25px'],
      button: ['20px', '30px'],
      date: [
        '12px',
        {
          lineHeight: '20px',
          letterSpacing: '0.05rem'
        }
      ]
    }
  }
}
