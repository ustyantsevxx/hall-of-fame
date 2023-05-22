const plugin = require('tailwindcss/plugin')

const toPX = values => Object.fromEntries(values.map(v => [+v, `${v}px`]))

const spacing0to100px = toPX(Array.from({ length: 101 }).map((_, i) => +i))

const fallbackSansSerifFonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Helvetica',
  'Arial',
  'sans-serif'
]

const typography = {
  '.text-medium-23': {
    fontSize: '23px',
    lineHeight: '30px',
    fontWeight: 500
  },

  '.text-19': {
    fontSize: '19px',
    lineHeight: '30px'
  },

  '.text-medium-20': {
    fontSize: '20px',
    lineHeight: '25px',
    fontWeight: 500
  },

  '.text-20': {
    fontSize: '20px',
    lineHeight: '25px'
  },

  '.text-medium-17': {
    fontSize: '17px',
    lineHeight: '25px',
    fontWeight: 500
  },

  '.text-17': {
    fontSize: '17px',
    lineHeight: '25px'
  },

  '.text-medium-16': {
    fontSize: '16px',
    lineHeight: '30px',
    fontWeight: 500
  },

  '.text-16': {
    fontSize: '16px',
    lineHeight: '25px'
  },

  '.text-medium-15': {
    fontSize: '15px',
    lineHeight: '20px',
    fontWeight: 500
  },

  '.text-15': {
    fontSize: '15px',
    lineHeight: '20px'
  },

  '.text-14': {
    fontSize: '14px',
    lineHeight: '20px'
  },

  '.text-medium-14': {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 500
  },

  '.text-semibold-13': {
    fontSize: '13px',
    lineHeight: '18px',
    fontWeight: 600
  },

  '.text-13': {
    fontSize: '13px',
    lineHeight: '18px'
  },

  '.text-12': {
    fontSize: '12px',
    lineHeight: '18px'
  },

  '.text-11': {
    fontSize: '11px',
    lineHeight: '15px'
  }
}

const shift = {
  '.shift-center': {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  '.shift-center-x': {
    left: '50%',
    transform: 'translateX(-50%)'
  },
  '.shift-center-y': {
    top: '50%',
    transform: 'translateY(-50%)'
  }
}

module.exports = {
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(({ addUtilities }) => {
      addUtilities(shift)
      addUtilities(typography)
    })
  ],

  content: ['./index.html', './src/**/*.{vue,ts,css}'],

  theme: {
    extend: {
      borderColor: {
        DEFAULT: 'transparent'
      },
      transitionProperty: {
        width: 'width',
        height: 'height'
      }
    },

    // overrides:

    screens: {
      md: '769px',
      lg: '1025px',
      laptop: { min: '1201px', max: '1440px' },
      xl: '1201px',
      '2xl': '1441px'
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      black: '#000000',
      white: '#FFFFFF',

      main: {
        primary: '#4293F2',
        'light-gray': '#FBFBFB',
        placeholder: '#D1D1D1',
        'deep-main': '#2E67AA',
        'light-blue': '#8EBEF7'
      },

      subcolor: {
        rose: '#FF82A7',
        'orange-cancel': '#FF8181',
        'green-done': '#3BE88A',
        'palet-blue': '#9DADFF'
      }
    },

    borderRadius: {
      ...toPX([0, 5, 6, 8, 10, 12, 13, 14, 16, 15, 18]),
      full: '9999px'
    },

    fontSize: false,

    spacing: spacing0to100px,

    fontFamily: {
      sans: ['Rubik', ...fallbackSansSerifFonts]
    }
  }
}
