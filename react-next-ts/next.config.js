/* eslint-disable @typescript-eslint/no-var-requires, no-console */

const address = require('address')
const { withoutProtocol } = require('ufo')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

if (process.env.NODE_ENV === 'development') {
  console.log('network ip:', `http://${address.ip()}:10005`)
}

const nextImagesDomain = withoutProtocol(process.env.NEXT_PUBLIC_API_HOST)

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    })

    return config
  },

  images: {
    domains: [nextImagesDomain]
  }
})
