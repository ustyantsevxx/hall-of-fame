<template>
  <div class="h-full">
    <ApexChart
      ref="chartComponent"
      :options="chartOptions"
      :series="series"
      type="line"
      height="90%"
    />

    <div class="mt-16 flex flex-col justify-center pl-64 pr-10">
      <ChartScrollBar
        v-if="timestamps.length > 0"
        v-model="xBoundaries"
        :first-timestamp="firstTimestamp"
        :last-timestamp="lastTimestamp"
        :marks="scrollbarMarks"
        @input="zoomScroll"
      />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { merge, throttle } from 'lodash-es'
import ApexChart from 'vue-apexcharts'

import ChartScrollBar from '~/components/ChartScrollBar.vue'
import { twTheme } from '~/logic/constants/theme'
import { opacify } from '~/logic/utils'

export default {
  components: {
    ChartScrollBar,
    ApexChart
  },

  props: {
    charts: { type: Array, default: () => [] },
    zoom: { type: Number, default: 0 },
    optionsFn: { type: Function, default: undefined },
    offsets: { type: Array, default: () => [] }
  },

  data() {
    return {
      xBoundaries: []
    }
  },

  computed: {
    chart() {
      return this.$refs.chartComponent
    },

    mappedCharts() {
      const regularCharts = this.charts.filter(chart => !chart.hasObjectValues)
      const chartsWithObjectValues = []

      for (const chart of this.charts.filter(chart => chart.hasObjectValues)) {
        if (Object.keys(chart.data[0].y).includes('max')) {
          chartsWithObjectValues.push({
            ...chart,
            id: `${chart.id}.max`,
            objectValueType: 'max',
            maxTimestamp: chart.originalData.find(
              ({ y }) => y.max === chart.max
            )?.x,
            data: chart.data.map(({ x, y }) => ({ x, y: y.max })),
            originalData: chart.originalData.map(({ x, y }) => ({
              x,
              y: y.max
            }))
          })
        }

        if (Object.keys(chart.data[0].y).includes('avg')) {
          chartsWithObjectValues.push({
            ...chart,
            id: `${chart.id}.avg`,
            objectValueType: 'avg',
            data: chart.data.map(({ x, y }) => ({ x, y: y.avg })),
            originalData: chart.originalData.map(({ x, y }) => ({
              x,
              y: y.avg
            }))
          })
        }

        if (Object.keys(chart.data[0].y).includes('min')) {
          chartsWithObjectValues.push({
            ...chart,
            id: `${chart.id}.min`,
            objectValueType: 'min',
            minTimestamp: chart.originalData.find(
              ({ y }) => y.min === chart.min
            )?.x,
            data: chart.data.map(({ x, y }) => ({ x, y: y.min })),
            originalData: chart.originalData.map(({ x, y }) => ({
              x,
              y: y.min
            }))
          })
        }
      }

      return [...regularCharts, ...chartsWithObjectValues].filter(
        c => c.enabled
      )
    },

    chartsWithFakeFirst() {
      const fakeNullSeries = this.timestamps.map(t => ({ x: t, y: null }))

      return [
        {
          id: '__fake0to100percentAxisSeries',
          color: '#fff',
          data: fakeNullSeries,
          originalData: fakeNullSeries,
          enabled: true
        },

        ...this.mappedCharts
      ]
    },

    colors() {
      return this.chartsWithFakeFirst.map(chart => chart.color)
    },

    timestamps() {
      return this.mappedCharts[0]
        ? this.mappedCharts[0].data.map(point => dayjs(point.x).valueOf())
        : []
    },

    firstTimestamp() {
      return this.timestamps[0]
    },

    lastTimestamp() {
      return this.timestamps[this.timestamps.length - 1]
    },

    every10PercentTimestamp() {
      const result = []
      for (let i = 1; i < 10; i++) {
        const index = Math.floor(this.timestamps.length * i * 0.1)
        result.push(this.timestamps[index])
      }
      return new Set(result)
    },

    emptyIntervals() {
      if (!this.charts[0]) {
        return []
      }

      const emptyIntervals = []
      let emptyIntervalStartPoint
      let latestNotEmptyPoint

      for (const point of this.charts[0].data) {
        if (point.y !== null) {
          latestNotEmptyPoint = point

          if (emptyIntervalStartPoint) {
            emptyIntervals.push({
              start: dayjs(emptyIntervalStartPoint.x).unix(),
              end: dayjs(point.x).unix()
            })
            emptyIntervalStartPoint = null
          }
        } else if (!emptyIntervalStartPoint) {
          emptyIntervalStartPoint = latestNotEmptyPoint
        }
      }

      return emptyIntervals
    },

    scrollbarMarks() {
      const marks = Object.fromEntries([
        [this.firstTimestamp, this.msTimestampToHHmmss(this.firstTimestamp)],

        ...this.every10PercentTimestamp.map(timestamp => [
          timestamp,
          this.msTimestampToHHmmss(timestamp)
        ]),

        [this.lastTimestamp, this.msTimestampToHHmmss(this.lastTimestamp)]
      ])

      return this.mappedCharts.length > 0 ? marks : {}
    },

    xAxisSettings() {
      return {
        type: 'datetime',

        labels: {
          show: true,
          rotate: 0,
          datetimeUTC: false,
          style: {
            colors: '#fff',
            cssClass: 'font-sans text-main'
          }
        },

        axisBorder: {
          color: '#fff'
        },

        tickPlacement: 'on',

        crosshairs: {
          show: true,
          width: 5,
          position: 'back',
          opacity: 0.1,

          stroke: {
            color: '#fff',
            width: 0,
            dashArray: 0
          },

          fill: {
            type: 'solid',
            color: '#fff'
          }
        },

        tooltip: {
          enabled: false
        }
      }
    },

    yAxisSettings() {
      return [
        {
          seriesName: '__fake0to100percentAxisSeries',
          min: 0,
          max: 100,
          tickAmount: 5,

          axisBorder: {
            show: true,
            color: '#fff'
          },

          labels: {
            minWidth: 40,
            style: {
              colors: '#fff',
              cssClass: 'font-sans text-main'
            },

            formatter: v => v + '%'
          }
        },

        ...this.chartYAxes
      ]
    },

    chartYAxes() {
      return this.mappedCharts.map(chart => ({
        seriesName: chart.id,
        min: chart.min * 0.99,
        max: chart.max / 0.99,
        show: false
      }))
    },

    chartCoreSettings() {
      return {
        events: {
          scrolled: (_, { xaxis }) => {
            this.xBoundaries = [xaxis.min, xaxis.max]
          },

          zoomed: (_, { xaxis }) => {
            this.xBoundaries = [xaxis.min, xaxis.max]
          }
        },

        type: 'line',
        height: '90%',

        toolbar: {
          show: false,
          autoSelected: 'pan'
        },

        animations: {
          enabled: false
        },

        zoom: {
          zoomedArea: {
            fill: {
              color: '#fff',
              opacity: 0.1
            },

            stroke: {
              width: 0
            }
          }
        }
      }
    },

    gridSettings() {
      return {
        position: 'front',
        borderColor: '#ffffff10',
        xaxis: {
          lines: {
            show: true
          }
        },

        yaxis: {
          lines: {
            show: true
          }
        }
      }
    },

    series() {
      return this.chartsWithFakeFirst.map(chart => {
        return {
          name: chart.id,
          data: chart.data,
          type: chart.hasObjectValues ? 'area' : 'line'
        }
      })
    },

    markersSettings() {
      return {
        // TODO fix strokeColors
        // strokeColors: this.colors,
        fillOpacity: 0,
        colors: [twTheme.colors.light.DEFAULT],
        strokeWidth: 2,
        hover: { sizeOffset: 4 },
        showNullDataPoints: false
      }
    },

    tooltipSettings() {
      return {
        x: {
          formatter: x => dayjs(x).format('YYYY-MM-DD HH:mm:ss')
        },

        y: {
          formatter: (_, { seriesIndex, dataPointIndex }) => {
            const chart = this.chartsWithFakeFirst[seriesIndex]
            const notOffsettedY = chart?.originalData[dataPointIndex].y ?? null

            if (notOffsettedY === null) {
              return '—'
            }

            if (chart.hasOnlyBooleanValues) {
              return notOffsettedY === 100
                ? this.$t('normal')
                : this.$t('fault')
            }

            const objectValueType = chart.hasObjectValues
              ? `(${this.getTooltipValueTypeOfObjectChart(chart) ?? ''})`
              : ''

            const maxTimestamp = chart.maxTimestamp
              ? `— ${dayjs(chart.maxTimestamp).format('HH:mm:ss')}`
              : ''
            const minTimestamp = chart.minTimestamp
              ? `— ${dayjs(chart.minTimestamp).format('HH:mm:ss')}`
              : ''

            return notOffsettedY !== null
              ? `${notOffsettedY} ${chart.unit} ${objectValueType} ${maxTimestamp} ${minTimestamp}`
              : undefined
          },

          title: {
            formatter: () => ''
          }
        },

        enabledOnSeries: Array.from(
          { length: this.mappedCharts.length },
          (_, i) => i + 1
        ),

        fixed: {
          enabled: true,
          position: 'bottomLeft',
          offsetX: 82,
          offsetY: -18
        },

        theme: 'dark'
      }
    },

    fillOptions() {
      return {
        type: 'solid',
        opacity: this.chartsWithFakeFirst.map(chart => {
          if (chart.objectValueType === 'max') {
            return 0.2
          } else if (chart.objectValueType === 'avg') {
            return 0
          } else {
            return 1
          }
        }),

        colors: this.chartsWithFakeFirst.map(chart => {
          return chart.objectValueType === 'min' ? '#1c2141' : chart.color
        })
      }
    },

    strokeOptions() {
      return {
        width: 2,
        dashArray: this.chartsWithFakeFirst.map(chart =>
          chart.objectValueType === 'avg' ? 5 : 0
        )
      }
    },

    annotationsByOffsets() {
      return this.offsets.flatMap(offset => {
        const styles = {
          strokeDashArray: 6,
          opacity: 0.1,
          borderColor: opacify(offset.color, 0.6)
        }

        return [
          { id: `top-${offset.id}`, y: offset.top, ...styles },
          { id: `bottom-${offset.id}`, y: offset.bottom, ...styles }
        ]
      })
    },

    annotationsByEmptyIntervals() {
      const startAndEndBorderStyles = {
        strokeDashArray: 6,
        opacity: 1,
        borderColor: '#fff'
      }

      return this.emptyIntervals
        .map(interval => {
          return [
            { x: interval.start * 1000, ...startAndEndBorderStyles },
            {
              x: interval.start * 1000,
              x2: interval.end * 1000,
              opacity: 0.3,
              fillColor: '#060A24',
              borderColor: '#060A24'
            },
            { x: interval.end * 1000, ...startAndEndBorderStyles }
          ]
        })
        .flat()
    },

    annotationsSettings() {
      return {
        yaxis: this.annotationsByOffsets
        // TODO: empty interval annotations are temporary disabled
        // xaxis: this.annotationsByEmptyIntervals
      }
    },

    chartOptions() {
      const defaultOptions = {
        annotations: this.annotationsSettings,
        chart: this.chartCoreSettings,
        colors: this.colors,
        grid: this.gridSettings,
        series: this.series,
        fill: this.fillOptions,
        xaxis: this.xAxisSettings,
        yaxis: this.yAxisSettings,
        markers: this.markersSettings,
        tooltip: this.tooltipSettings,
        stroke: this.strokeOptions,
        legend: { show: false }
      }

      if (typeof this.optionsFn === 'function') {
        const optionsFnContext = {
          timestamps: this.timestamps
        }
        const additionalOptions = this.optionsFn(optionsFnContext)
        return merge(defaultOptions, additionalOptions)
      } else {
        return defaultOptions
      }
    }
  },

  watch: {
    firstTimestamp: 'syncXBoundaries',
    lastTimestamp: 'syncXBoundaries',
    zoom: 'throttleZoom',
    charts: {
      deep: true,
      async handler() {
        await this.$nextTick()
        this.zoomX()
      }
    }
  },

  mounted() {
    this.syncXBoundaries()
  },

  methods: {
    throttleZoom: throttle(function () {
      this.zoomX()
      // throttle to 30 fps => 1000ms / 30fps ~> 33ms
    }, 33),

    zoomX() {
      if (!this.mappedCharts[0] || this.mappedCharts[0].data.length === 0) {
        return
      }

      const offset = Math.floor(
        (this.mappedCharts[0].data.length * this.zoom) / 2
      )
      const top = this.mappedCharts[0].data[offset]
      const bottom = this.mappedCharts[0].data[
        this.mappedCharts[0].data.length - offset - 1
      ]

      this.chart.zoomX(dayjs(top.x).valueOf(), dayjs(bottom.x).valueOf())
    },

    getTooltipValueTypeOfObjectChart(chart) {
      const map = {
        min: 'Min',
        avg: 'Ave',
        max: 'Max'
      }

      return map[chart.objectValueType]
    },

    syncXBoundaries() {
      this.xBoundaries = [this.firstTimestamp, this.lastTimestamp]
    },

    zoomScroll() {
      this.chart.zoomX(this.xBoundaries[0], this.xBoundaries[1])
    },

    msTimestampToHHmmss(msTimestamp) {
      return dayjs(msTimestamp).format('HH:mm:ss')
    }
  }
}
</script>

<style>
.apexcharts-tooltip {
  @apply flex  justify-between rounded-6 bg-light-30  bg-opacity-90 px-16 pt-20 pb-22  !important;
  box-shadow: none !important;
  min-width: 130px;
}

.apexcharts-tooltip-marker {
  min-width: 12px;
}

.apexcharts-tooltip-series-group {
  @apply p-0 !important;
}

.apexcharts-tooltip-text {
  @apply font-sans font-normal text-main !important;
}

.apexcharts-tooltip-title {
  @apply mb-8 border-0 bg-transparent p-0 font-sans text-white/60 text-main !important;
}
</style>
