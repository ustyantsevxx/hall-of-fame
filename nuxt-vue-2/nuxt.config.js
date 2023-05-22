/* eslint-disable no-restricted-imports */

import { PROJECT_NAME } from './logic/constants'
import { twTheme } from './logic/constants/theme'
import { CURRENT_ROLE, ROLES } from './logic/core/runtime'
import { NuxtAuthConfig } from './plugins/nuxt/auth'
import { NuxtAxiosOptions } from './plugins/nuxt/axios'
import { NuxtI18nConfig } from './plugins/nuxt/i18n'

const AnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

require('dotenv').config()

const inProduction = process.env.NODE_ENV === 'production'

export default {
  auth: NuxtAuthConfig,

  axios: NuxtAxiosOptions,

  build: {
    additionalExtensions: ['svg'],

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
        tailwindcss: {},
        autoprefixer: {}
      }
    },

    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  },

  buildModules: ['@nuxt/postcss8'],

  components: [
    {
      path: '~/assets/svg/components',
      prefix: 'SVG'
    }
  ],

  css: [
    '~/assets/css/app',
    '~/assets/css/fonts',
    '~/assets/css/tailwind',
    '~/assets/css/v-tooltip',
    '~/assets/css/custom-scrollbars',
    '~/assets/css/vue-transitions'
  ],

  env: process.env,

  head: {
    titleTemplate: pageTitle =>
      pageTitle !== process.env.npm_package_name ? pageTitle : PROJECT_NAME,

    meta: [
      { charset: 'utf-8' },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'og:description',
        property: 'og:description',
        content: ''
      },
      { name: 'apple-mobile-web-app-title', content: '' },
      { name: 'application-name', content: '' },
      {
        name: 'msapplication-TileColor',
        content: twTheme.colors.light.DEFAULT
      },
      { name: 'msapplication-TileImage', content: '/mstile-150x150.png' },
      { name: 'msapplication-config', content: '/browserconfig.xml' },
      { name: 'theme-color', content: twTheme.colors.light.DEFAULT },
      {
        name: 'viewport',
        content:
          CURRENT_ROLE === ROLES.CUSTOMER
            ? 'width=device-width, initial-scale=1, user-scalable=0'
            : 'width=1440'
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
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: twTheme.colors.cyan.DEFAULT
      }
    ]
  },

  globals: {
    id: () => '__nuxxt'
  },

  i18n: NuxtI18nConfig,

  loading: {
    color: twTheme.colors.cyan.DEFAULT,
    height: '3px',
    continuous: true
  },

  loadingIndicator: {
    color: twTheme.colors.cyan.DEFAULT,
    background: twTheme.colors.light.full
  },

  modules: [
    [
      '@nuxtjs/router',
      {
        path: 'router',
        fileName: 'index.js',
        keepDefaultRouter: true
      }
    ],
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-svg-loader',
    'nuxt-i18n',
    'cookie-universal-nuxt'
  ],

  plugins: [
    // `~/plugins/nuxt-init` file is called in `plugins/nuxt/auth.js`
    '~/plugins/extend-dayjs',
    '~/plugins/axios-loading',
    '~/plugins/vue-js-modal',
    '~/plugins/vue-unique-id',
    '~/plugins/vuelidate',
    '~/plugins/focus-visible-polyfill',
    '~/plugins/focus-on-slash',
    '~/plugins/v-mask',
    '~/plugins/v-tooltip',
    '~/plugins/vue-mq'
  ],

  pwa: {
    manifest: {
      name: PROJECT_NAME,
      short_name: PROJECT_NAME
    }
  },

  router: {
    // in PWA mode we need to display "Connection error" page
    // instead of redirecting to '/login'
    middleware: ['logged-in-or-offline'],
    prefetchLinks: false
  },

  server: {
    host: '0.0.0.0',
    port: !inProduction
      ? // eslint-disable-next-line unicorn/no-nested-ternary
        CURRENT_ROLE === ROLES.ENGINEER
        ? 10003
        : 10013
      : undefined
  },

  ssr: false,

  vue: {
    config: {
      productionTip: false
    }
  }
}
