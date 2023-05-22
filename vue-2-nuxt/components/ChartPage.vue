<template>
  <div class="flex grow flex-col">
    <template v-if="!fullscreen">
      <LinkBack class="ml-10" :to="`/logs/${itemType}`">
        {{ backLinkText }}
      </LinkBack>

      <LayoutSection class="my-12 py-16 pl-28 pr-24">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <BatteryViewPageLink :msm="msm" />
            <slot name="after-serial"></slot>
          </div>

          <div class="flex items-center">
            <div v-if="filterOptionsExist" class="flex">
              <slot name="toolbar"></slot>
            </div>

            <AppButton class="ml-24" :to="filterPageLink">
              {{ $t('filter-log') }}
              <template v-if="filterOptionsExist">
                ({{ filterOptions.length }})
              </template>
            </AppButton>
          </div>
        </div>
      </LayoutSection>
    </template>

    <VueFullscreen
      v-model="fullscreen"
      class="flex grow flex-col bg-light-full"
      :class="{ 'p-12': fullscreen }"
    >
      <LayoutSection v-if="filterOptionsExist" class="mb-12">
        <AppTransition
          group
          tag="div"
          class="flex h-80 items-center space-x-24 overflow-x-auto overscroll-contain px-28"
        >
          <template v-if="ready">
            <AppCheckbox
              v-for="chart in charts"
              :key="chart.id"
              v-model="chart.enabled"
              :bg-color="chart.color"
              class="text-input"
            >
              <p>{{ chart.name }}</p>
              <p class="mt-3 whitespace-nowrap text-white/60">
                {{ chart.description }}
              </p>
            </AppCheckbox>
          </template>
        </AppTransition>
      </LayoutSection>

      <LayoutSection class="flex flex-1 grow flex-col pt-24 pb-24 pr-24">
        <AppTransition>
          <div
            v-if="filterOptionsExist"
            class="ml-50 flex select-none items-center justify-end"
          >
            <SliderZoom v-model="zoom" />

            <ButtonIcon
              :title="$t('change-offsets')"
              class="ml-24 border p-5"
              @click="openDrawerOffsets"
            >
              <SVGIcon24Offset />
            </ButtonIcon>

            <ButtonFullscreenToggle v-model="fullscreen" class="ml-4" />
          </div>
        </AppTransition>

        <AppTransition>
          <AppLineChart
            v-if="ready"
            ref="chart"
            class="x-chart-container flex grow flex-col"
            :charts="offsettedCharts"
            :options-fn="chartOptionsFn"
            :zoom="zoom"
            :offsets="finalOffsets"
          />
        </AppTransition>
      </LayoutSection>

      <DrawerOffsets
        ref="DrawerOffsets"
        v-model="offsets"
        :charts="enabledCharts"
      />
    </VueFullscreen>
  </div>
</template>

<script>
import { component as VueFullscreen } from 'vue-fullscreen'

import AppButton from '~/components/AppButton.vue'
import AppCheckbox from '~/components/AppCheckbox.vue'
import AppLineChart from '~/components/AppLineChart.vue'
import AppTransition from '~/components/AppTransition.vue'
import BatteryViewPageLink from '~/components/BatteryViewPageLink.vue'
import ButtonFullscreenToggle from '~/components/ButtonFullscreenToggle.vue'
import ButtonIcon from '~/components/ButtonIcon.vue'
import DrawerOffsets from '~/components/DrawerOffsets.vue'
import LayoutSection from '~/components/LayoutSection.vue'
import LinkBack from '~/components/LinkBack.vue'
import SliderZoom from '~/components/SliderZoom.vue'
import { getChartRequestBody, getCharts } from '~/logic/utils/charts'
import { stringifyArrayIfNotEmpty, tryParseJson } from '~/logic/utils/strings'

export default {
  components: {
    LinkBack,
    AppButton,
    ButtonIcon,
    AppCheckbox,
    ButtonFullscreenToggle,
    SliderZoom,
    BatteryViewPageLink,
    LayoutSection,
    AppLineChart,
    DrawerOffsets,
    AppTransition,
    VueFullscreen
  },

  props: {
    msm: { type: Object, required: true },
    backLinkText: { type: String, required: true },
    itemType: { type: String, required: true },
    itemId: { type: Number, required: true },
    params: { type: Object, default: undefined },
    /** chartOptions will be merged with default options */
    chartOptionsFn: { type: Function, default: undefined },
    /** (params) => [chartData] */
    chartDataFetchFn: { type: Function, required: true },
    extremesFetchFn: { type: Function, default: undefined }
  },

  data() {
    return {
      zoom: 0,
      fullscreen: false,
      filterOptions: [],
      offsets: {},
      charts: [],
      extremes: [],
      ready: false
    }
  },

  async fetch() {
    this.filterOptions = tryParseJson(this.$route.query.options) ?? []

    if (!this.filterOptions || this.filterOptions.length === 0) {
      this.ready = true
      return
    }

    await this.fetchCharts()
    this.ready = true
  },

  computed: {
    enabledCharts() {
      return this.charts.filter(c => c.enabled)
    },

    filterPageLink() {
      return {
        path: `/logs/${this.itemType}/${this.itemId}/filter`,
        query: {
          options: stringifyArrayIfNotEmpty(this.filterOptions)
        }
      }
    },

    offsettedCharts() {
      return this.charts.map(chart => {
        const offsetForChart = this.offsets[chart.id]
        const { min, max, data, hasObjectValues } = chart

        const dataToMap =
          min === max ? data.map(({ x }) => ({ x, y: 50 })) : data

        if (offsetForChart) {
          const range = min === max ? 100 : max - min

          const bottomDelta = range * (offsetForChart.min / 100)
          const topDelta = range * (offsetForChart.max / 100)

          return {
            ...chart,
            data: dataToMap.map(point => {
              if (hasObjectValues) {
                const { min: minY, avg: avgY, max: maxY } = point.y
                const rangeMin = minY - min
                const pMin = rangeMin / range
                const rangeAvg = avgY - min
                const pAvg = rangeAvg / range
                const rangeMax = maxY - min
                const pMax = rangeMax / range
                return {
                  x: point.x,
                  y: {
                    min: min + bottomDelta + (topDelta - bottomDelta) * pMin,
                    avg: min + bottomDelta + (topDelta - bottomDelta) * pAvg,
                    max: min + bottomDelta + (topDelta - bottomDelta) * pMax
                  }
                }
              }
              const range2 = point.y - min
              const p = range2 / range

              return {
                x: point.x,
                y: min + bottomDelta + (topDelta - bottomDelta) * p
              }
            }),
            originalData: data
          }
        } else {
          return {
            ...chart,
            data: dataToMap,
            originalData: data
          }
        }
      })
    },

    filterOptionsExist() {
      return this.filterOptions.length > 0
    },

    finalOffsets() {
      const result = this.charts
        .filter(chart => chart.enabled)
        .map(chart => {
          const offsetForChart = this.offsets[chart.id]
          return offsetForChart
            ? {
                id: chart.id,
                bottom: offsetForChart.min,
                top: offsetForChart.max,
                color: chart.color
              }
            : undefined
        })
        .filter(k => k)
      return result
    }
  },

  watch: {
    params: {
      deep: true,
      async handler() {
        await this.fetchCharts()
      }
    }
  },

  methods: {
    async fetchCharts() {
      if (this.$nuxt.isOffline) {
        return
      }

      const chartData = await this.chartDataFetchFn({
        itemId: this.itemId,
        variables: getChartRequestBody(this.filterOptions),
        params: this.params
      })
      if (this.extremesFetchFn) {
        await this.fetchExtremes()
      }
      this.charts = getCharts(this.filterOptions, {
        chartData,
        chartType: this.itemType
      })
    },

    async fetchExtremes() {
      this.extremes = await this.extremesFetchFn({
        itemId: this.itemId,
        variables: getChartRequestBody(this.filterOptions),
        params: this.params
      })
    },

    openDrawerOffsets() {
      this.$refs.DrawerOffsets.open()
    }
  }
}
</script>
