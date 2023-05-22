// eslint-disable-next-line import/no-named-as-default
import VTooltip from 'v-tooltip'
import Vue from 'vue'

Vue.use(VTooltip, {
  defaultHtml: false,
  defaultDelay: { show: 300, hide: 150 },
  defaultBoundariesElement: 'body',
  defaultClass:
    'py-12 px-20 popover !block text-main x-popover rounded-8 absolute z-50 my-12 bg-light-30'
})
