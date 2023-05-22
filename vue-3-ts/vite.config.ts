import vue from '@vitejs/plugin-vue'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [
    ...(process.env.ROLLUP_BUNDLE_VISUALIZE
      ? [visualizer({ filename: 'ROLLUP_BUNDLE_VISUALIZER_STATS.html' })]
      : []),
    vue(),
    svgLoader(),

    // svg files from `assets/svg/components/Svg` are globally registered as Vue-components under prefix `Svg`
    // example: `Logo.svg` -> <SvgLogo />
    // example: `TabBarIcons/Daylog.svg` -> <SvgTabBarIconsDaylog />
    Components({
      dirs: ['src/assets/svg/components'],
      extensions: ['svg'],
      deep: true,
      dts: false,
      directoryAsNamespace: true
    })
  ],

  server: {
    port: 10_004
  },

  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  }
})
