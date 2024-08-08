<template>
  <DoughnutChart :chart-data="chartData" :width="170" :options="chartOptions" />
</template>

<script setup lang="ts">
import {
  ArcElement,
  Chart,
  ChartData,
  ChartOptions,
  DoughnutController,
  Tooltip
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { sum } from 'lodash-es'
import tinycolor from 'tinycolor2'
import { computed, PropType } from 'vue'
import { DoughnutChart } from 'vue-chart-3'

Chart.register(DoughnutController, ArcElement, Tooltip, ChartDataLabels)

const props = defineProps({
  chartData: { type: Array as PropType<any[]>, default: () => [] }
})

const entriesTimeSum = computed(() => {
  return sum(props.chartData.map(x => x.time))
})

const getPercentageOfSum = (value: number) => {
  return value !== entriesTimeSum.value ? value / entriesTimeSum.value : 1
}

const humanizePercentage = (value: number) => {
  return `${Math.round(value * 100)}%`
}

const chartOptions = computed<ChartOptions<'doughnut'>>(() => ({
  borderWidth: 0,
  cutout: 44,
  layout: {
    padding: 20
  },
  plugins: {
    tooltip: {
      filter(tooltipItem) {
        const notFakeShadowDataset = tooltipItem.datasetIndex === 0
        const dataExist = props.chartData.length > 0
        return notFakeShadowDataset && dataExist
      },
      callbacks: {
        label({ label, dataset, dataIndex }) {
          const value = dataset?.data?.[dataIndex] as number
          return `${label}, ${humanizePercentage(getPercentageOfSum(value))}`
        }
      },
      boxPadding: 5,
      backgroundColor: '#fff',
      bodyColor: '#000',
      bodyFont: {
        family: 'Rubik'
      },
      borderColor: 'rgba(0, 0, 0, 0.05)',
      borderWidth: 1,
      mode: 'point',
      caretSize: 0
    },

    datalabels: {
      display: ({ dataIndex, datasetIndex, dataset }) => {
        const value = dataset?.data?.[dataIndex] as number
        return datasetIndex === 0 && !!value && getPercentageOfSum(value) > 0.05
      },
      formatter: (value, context) => {
        return (context.dataset as any).id !== null
          ? humanizePercentage(getPercentageOfSum(value))
          : 'xx xx'
      },
      color(context) {
        return context.dataset.backgroundColor as string
      },
      anchor: 'end',
      align: 'end',
      offset: 0,
      font: {
        size: 15,
        family: 'Rubik'
      }
    }
  }
}))

const getEmptyChartData = () => {
  const emptyChartDataBase = { id: null, borderWidth: 0, data: [100] }
  const emptyChartData = {
    datasets: [
      { ...emptyChartDataBase, weight: 2, backgroundColor: '#eee' },
      { ...emptyChartDataBase, weight: 1, backgroundColor: '#ddd' }
    ]
  }
  return emptyChartData
}

const chartData = computed<ChartData<'doughnut'>>(() => {
  // first dataset is main and has index of 0 to enable some other features for it only
  // second dataset is for fake inner-shadow effect

  if (props.chartData.length === 0) {
    return getEmptyChartData()
  }

  const [labels, values, colors]: [string[], number[], string[]] = [[], [], []]
  for (const item of props.chartData) {
    labels.push(item.name)
    values.push(item.time)
    colors.push(item.color)
  }

  const darkenColors = colors.map(color =>
    tinycolor(color).darken(20).toHex8String()
  )

  return {
    labels,
    datasets: [
      {
        weight: 2,
        data: values,
        backgroundColor: colors
      },
      {
        weight: 1,
        data: values,
        hoverBackgroundColor: darkenColors,
        backgroundColor: darkenColors
      }
    ]
  }
})
</script>
