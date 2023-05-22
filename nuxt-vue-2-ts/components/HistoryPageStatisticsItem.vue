<template>
  <section class="p-30 rounded-20 border border-gray-100">
    <div class="pt-18 pb-48 mx-auto" style="width: 200px">
      <ChartDoughnut :chart-data="chartData" :options="chartOptions" />
    </div>

    <p class="text-subtitle">{{ title }}</p>

    <ul v-if="item.data" class="mt-12">
      <li
        v-for="(entry, i) in item.data"
        :key="i"
        class="py-12 border-b border-gray-100"
      >
        <div class="flex justify-between items-center">
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="5" cy="5" r="5" :fill="entry.color" />
          </svg>

          <span class="flex-grow ml-10">
            {{ entry.name }}
          </span>
          <span v-if="entry.value">{{ separateThousands(entry.value) }}</span>
        </div>
      </li>
    </ul>

    <div class="flex justify-between py-12">
      <p class="text-gray">{{ totalLabel }}</p>
      <p v-if="item.total !== undefined" class="font-bold">
        {{ separateThousands(item.total) }} {{ totalUnit }}
      </p>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import ChartDoughnut from '~/components/ChartDoughnut.vue'
import { TransactionStatisticsItem } from '~/logic/modules/transactions'
import { separateThousands } from '~/logic/utils/numbers'

@Component({
  components: {
    ChartDoughnut
  }
})
export default class HistoryPageStatisticsItem extends Vue {
  @Prop({ type: String, default: '' }) title!: string
  @Prop({ type: String, default: '' }) totalLabel!: string
  @Prop({ type: String, default: '' }) totalUnit!: string
  @Prop({ type: Object, required: true }) item!: TransactionStatisticsItem

  get chartOptions() {
    return {
      cutoutPercentage: 60,
      legend: {
        display: false
      },
      tooltips: {
        enabled: this.item.data?.length !== 0
      }
    }
  }

  get chartData() {
    const emptyPlaceholder = {
      datasets: [
        {
          borderWidth: 0,
          backgroundColor: '#ccc',
          data: [100]
        }
      ]
    }

    return this.item.data?.length
      ? {
          labels: this.item.data.map(entry => entry.name),
          datasets: [
            {
              backgroundColor: this.item.data.map(entry => entry.color),
              data: this.item.data.map(entry => entry.value)
            }
          ]
        }
      : emptyPlaceholder
  }

  separateThousands = separateThousands
}
</script>
