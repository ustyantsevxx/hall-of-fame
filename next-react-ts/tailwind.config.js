// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

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

const typography = {
  '.text-medium-30': {
    fontSize: '30px',
    lineHeight: '42px',
    fontWeight: 500
  },
  '.text-regular-28': {
    fontSize: '28px',
    lineHeight: '34px',
    fontWeight: 400
  },
  '.text-regular-26': {
    fontSize: '26px',
    lineHeight: '36px',
    fontWeight: 400
  },
  '.text-medium-22': {
    fontSize: '22px',
    lineHeight: '32px',
    fontWeight: 500
  },
  '.text-regular-22': {
    fontSize: '22px',
    lineHeight: '32px',
    fontWeight: 400
  },
  '.text-medium-20': {
    fontSize: '20px',
    lineHeight: '32px',
    fontWeight: 500
  },
  '.text-regular-20': {
    fontSize: '20px',
    lineHeight: '32px',
    fontWeight: 400
  },
  '.text-medium-17': {
    fontSize: '17px',
    lineHeight: '22px',
    fontWeight: 500
  },
  '.text-regular-17': {
    fontSize: '17px',
    lineHeight: '22px',
    fontWeight: 400
  },
  '.text-medium-15': {
    fontSize: '15px',
    lineHeight: '20px',
    fontWeight: 500
  },
  '.text-regular-15': {
    fontSize: '15px',
    lineHeight: '20px',
    fontWeight: 400
  },
  '.text-regular-13': {
    fontSize: '13px',
    lineHeight: '18px',
    fontWeight: 400
  }
}

module.exports = {
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),

    plugin(({ addUtilities }) => {
      addUtilities(typography)
    })
  ],

  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  corePlugins: {
    aspectRatio: false
  },

  theme: {
    extend: {
      borderColor: {
        DEFAULT: 'transparent'
      },

      scale: {
        101: '1.01'
      }
    },

    screens: {
      xs: '0px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },

    fontSize: false,

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#FFFFFF',
      green: {
        DEFAULT: '#003C3C',
        'button-hover': '#336363'
      },
      pink: {
        DEFAULT: '#FFBEC9',
        hover: '#FFCBD4'
      },
      gray: '#F8F8F8',
      danger: '#DA1C1C',
      red: '#FF3B30'
    },

    spacing: object0to100px,

    borderWidth: {
      DEFAULT: '1px',
      ...object0to100px
    },

    borderRadius: {
      ...object0to100px,
      full: '9999px'
    },

    fontFamily: {
      sans: ['Value Sans Pro', ...fallbackSansSerifFonts]
    }
  }
}
