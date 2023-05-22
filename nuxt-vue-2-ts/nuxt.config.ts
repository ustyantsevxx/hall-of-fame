import { NuxtConfig } from '@nuxt/types'

import { NuxtAuthConfig } from './plugins/nuxt-auth'
const AnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

require('dotenv').config()

const inProduction = process.env.NODE_ENV === 'production'

const config: NuxtConfig = {
  auth: NuxtAuthConfig,

  axios: {
    baseURL: '/',
    progress: false
  },

  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ]
    },

    plugins: [
      ...(process.env.WEBPACK_BUNDLE_ANALYZE
        ? [
            new AnalyzerPlugin({
              analyzerMode: 'static',
              reportFilename: 'WEBPACK_BUNDLE_ANALYZER.html'
            })
          ]
        : [])
    ],

    postcss: {
      plugins: {
        'tailwindcss/nesting': {},
        tailwindcss: {},
        autoprefixer: {}
      }
    }
  },

  buildModules: ['@nuxt/postcss8', '@nuxt/typescript-build', 'nuxt-typed-vuex'],

  components: false,

  css: [
    '~/assets/css/app',
    '~/assets/css/fonts',
    '~/assets/css/vue-transitions'
  ],

  // @ts-ignore
  env: process.env,

  head: {
    titleTemplate: pageTitle =>
      pageTitle
        ? `${pageTitle} — XXX Личный кабинет`
        : 'XXX Личный кабинет',

    htmlAttrs: {
      lang: 'ru'
    },

    meta: [
      {
        charset: 'utf-8'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'XXX Личный кабинет'
      },
      {
        name: 'apple-mobile-web-app-title',
        content: 'XXX Личный кабинет'
      },
      {
        name: 'application-name',
        content: 'XXX Личный кабинет'
      },
      {
        name: 'msapplication-TileColor',
        content: '#5390be'
      },
      {
        name: 'msapplication-TileImage',
        content: '/mstile-150x150.png'
      },
      {
        name: 'msapplication-config',
        content: '/browserconfig.xml'
      },
      {
        name: 'theme-color',
        content: '#ffffff'
      }
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: '#5390be'
      }
    ]
  },

  loading: {
    color: '#5390be',
    height: '3px',
    continuous: true,
    throttle: 300
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-svg-loader',
    [
      '@nuxtjs/router',
      {
        path: 'router',
        fileName: 'index.ts',
        keepDefaultRouter: true
      }
    ]
  ],

  plugins: [
    // container always goes first because of async operations in other plugins
    { src: '~/plugins/nuxt-plugins-container' },

    { src: '~/plugins/vue-js-modal' },
    { src: '~/plugins/v-mask' },
    { src: '~/plugins/vuelidate' },
    { src: '~/plugins/vue-toasted' },
    { src: '~/plugins/focus-visible-polyfill' },
    { src: '~/plugins/axios-loading' }
  ],

  router: {
    middleware: ['auth']
  },

  server: {
    host: '0.0.0.0',
    port: !inProduction ? 10002 : undefined
  },

  ssr: false,

  vue: {
    config: {
      productionTip: false
    }
  }
}

export default config
