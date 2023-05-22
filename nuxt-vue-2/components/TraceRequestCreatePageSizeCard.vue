<template>
  <div
    v-if="complexityLevelData"
    class="mt-16 flex items-center justify-between rounded-6 border bg-light-20 px-24 py-16 transition-colors"
    :class="complexityLevelData.class"
  >
    <div class="flex items-center">
      <div class="relative h-24 w-24">
        <AppTransition>
          <Component
            :is="complexityLevelData.svgComponent"
            class="absolute inset-0"
          />
        </AppTransition>
      </div>

      <p class="ml-10 mr-8 text-white/60 text-main">{{ $t('request-size') }}</p>

      <!-- TODO: add tooltip text and uncomment popover wrapper -->

      <!-- <AppPopover popover-class="p-12" class="w-16 h-16">
        <template #toggle> -->

      <!-- <button
        class="relative block h-16 w-16 pl-8"
        :class="complexityLevelData.infoButtonClass"
      >
        <span class="sr-only">{{ $t('request-size-info') }}</span>
        <AppTransition>
          <Component
            :is="complexityLevelData.infoSvgComponent"
            class="absolute inset-0 z-0"
          />
        </AppTransition>
      </button> -->

      <!-- </template>

        <template #body>[[[ TOOLTIP TEXT ]]]</template>
      </AppPopover> -->
    </div>

    <p
      :class="{ 'opacity-50': !requestSizeReady }"
      class="block transition-opacity text-button"
    >
      <FormatterTweenedNumber
        :value="requestSize"
        :formatter="formatThousandsToK"
      />
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import AppPopover from '~/components/AppPopover.vue'
import AppTransition from '~/components/AppTransition.vue'
import FormatterTweenedNumber from '~/components/FormatterTweenedNumber.vue'
import { TRACE_REQUEST_COMPLEXITY_LEVELS } from '~/logic/modules/trace-requests/trace-requests.constants'
import { formatThousandsToK } from '~/logic/utils'

const observedRequestStoreKeys = [
  'msmId',
  'selectedModules',
  'selectedSscIndexes',
  'selectedValues',
  'duration'
]

export default {
  components: {
    AppPopover,
    FormatterTweenedNumber,
    AppTransition
  },

  data() {
    return {
      calculating: false
    }
  },

  computed: {
    ...mapState(
      'newTraceRequest',
      Object.fromEntries(
        observedRequestStoreKeys.map(key => [key, state => state.data[key]])
      )
    ),

    complexityLevelToDataMap() {
      return {
        [TRACE_REQUEST_COMPLEXITY_LEVELS.LOW]: {
          svgComponent: 'SVGIcon24Status1',
          infoSvgComponent: 'SVGIcon16Information',
          infoButtonClass: 'rounded-full'
        },

        [TRACE_REQUEST_COMPLEXITY_LEVELS.MIDDLE]: {
          svgComponent: 'SVGIcon24Status3',
          infoSvgComponent: 'SVGIcon16Information',
          infoButtonClass: 'rounded-full'
        },

        [TRACE_REQUEST_COMPLEXITY_LEVELS.HIGH]: {
          svgComponent: 'SVGIcon24Status3',
          class: 'border-red',
          infoSvgComponent: 'SVGIcon16Alarm'
        }
      }
    },

    complexityLevelData() {
      return this.complexityLevelToDataMap?.[this.complexityLevel]
    },

    complexityLevel() {
      return this.$store.state.newTraceRequest.complexityLevel
    },

    requestSize() {
      return this.$store.state.newTraceRequest.size
    },

    requestSizeReady() {
      return !this.calculating
    }
  },

  watch: {
    ...Object.fromEntries(
      observedRequestStoreKeys.map(key => [key, 'calculateRequestComplexity'])
    )
  },

  mounted() {
    this.calculateRequestComplexity()
  },

  methods: {
    formatThousandsToK(value) {
      return formatThousandsToK(value)
    },

    async calculateRequestComplexity() {
      this.calculating = true
      await this.$store.dispatch('newTraceRequest/calculateComplexity')
      this.calculating = false
    }
  }
}
</script>
