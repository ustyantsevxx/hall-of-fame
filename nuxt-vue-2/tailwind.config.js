const plugin = require('tailwindcss/plugin')
const lineClampPlugin = require('@tailwindcss/line-clamp')

const toPX = values => Object.fromEntries(values.map(v => [+v, `${v}px`]))
const object0to100px = toPX(Array.from({ length: 101 }).map((_, i) => +i))

const fallbackSansSerifFonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Helvetica',
  'Arial',
  'sans-serif'
]

const shift = {
  '.shift-center': {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  '.shift-center-x': { left: '50%', transform: 'translateX(-50%)' },
  '.shift-center-y': { top: '50%', transform: 'translateY(-50%)' }
}

const typography = {
  '.text-h1': {
    fontWeight: 400,
    fontFamily: 'Avenir, Montserrat, serif',
    fontSize: '24px',
    lineHeight: '33px'
  },

  '.text-h1-sm': {
    fontWeight: 400,
    fontFamily: 'Avenir, Montserrat, serif',
    fontSize: '20px',
    lineHeight: '27px'
  },

  '.text-h2': {
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '16px',
    letterSpacing: -0.01
  },

  '.text-h3': {
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '12px',
    letterSpacing: -0.01
  },

  '.text-paragraph': { fontSize: '15px', lineHeight: '16px' },
  '.text-navigation': { fontSize: '16px', lineHeight: '19px' },
  '.text-main': { fontSize: '13px', lineHeight: '12px' },
  '.text-description': { fontSize: '11px', lineHeight: '12px' },
  '.text-button': { fontSize: '18px', lineHeight: '21px' },
  '.text-input': { fontSize: '14px', lineHeight: '16px' }
}

module.exports = {
  plugins: [
    lineClampPlugin,

    plugin(({ addUtilities }) => {
      addUtilities(typography)
      addUtilities(shift)
    })
  ],

  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.js',
    './nuxt.config.js'
  ],

  theme: {
    extend: {
      borderColor: {
        DEFAULT: 'transparent'
      }
    },

    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px'
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#ffffff',
      green: '#6FB23B',
      yellow: '#E9ED0F',
      orange: '#EA7F48',
      red: '#FF4C4A',

      cyan: {
        DEFAULT: '#00BBF1',
        darken: '#0098C3',
        lighten: '#20CDFF'
      },

      gray: {
        border: '#777A8D'
      },

      light: {
        DEFAULT: '#1c2141',
        10: '#21274D',
        20: '#292F59',
        30: '#3E4474',
        40: '#535B92',
        full: '#040339'
      }
    },

    spacing: {
      ...object0to100px
    },

    // replaced by "typography" utilities
    fontSize: false,

    borderWidth: {
      DEFAULT: '1px',
      ...object0to100px
    },

    borderRadius: {
      ...object0to100px,
      full: '9999px'
    },

    container: {
      center: true
    },

    fontFamily: {
      sans: ['Roboto', ...fallbackSansSerifFonts],
      avenir: ['Avenir', ...fallbackSansSerifFonts]
    }
  }
}
