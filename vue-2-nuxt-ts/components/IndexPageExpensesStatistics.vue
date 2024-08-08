<template>
  <section class="p-30 rounded-20 border border-gray-100">
    <div class="flex">
      <figure class="chart-container">
        <ChartDoughnut :options="chartOptions" :chart-data="chartData" />
      </figure>

      <div class="mt-12 ml-30">
        <p class="text-gray">xx xx xx</p>
        <p class="mt-10 font-bold">{{ totalFormatted }} ₽</p>
      </div>
    </div>

    <Link
      button
      to="/history"
      class="flex justify-center items-center mt-28 mb-10 space-x-11 w-full"
    >
      <span>xx xx xx</span>
      <SlimArrowRightSVG />
    </Link>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import SlimArrowRightSVG from '~/assets/svg/index/slim-arrow-right.svg'
import ChartDoughnut from '~/components/ChartDoughnut.vue'
import Link from '~/components/Link.vue'
import { TransactionStatisticsItem } from '~/logic/modules/transactions'
import { separateThousands } from '~/logic/utils/numbers'

@Component({
  components: {
    Link,
    SlimArrowRightSVG,
    ChartDoughnut
  }
})
export default class IndexPageExpensesStatistics extends Vue {
  @Prop({ type: Object, required: true })
  expensesStatistics!: TransactionStatisticsItem

  get totalFormatted() {
    return this.expensesStatistics.total
      ? separateThousands(this.expensesStatistics.total)
      : 0
  }

  get chartOptions() {
    return {
      cutoutPercentage: 64,
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      animation: {
        duration: 0
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

    return this.expensesStatistics.data?.length
      ? {
          labels: this.expensesStatistics.data.map(entry => entry.name),
          datasets: [
            {
              backgroundColor: this.expensesStatistics.data.map(
                entry => entry.color
              ),
              data: this.expensesStatistics.data.map(entry => entry.value)
            }
          ]
        }
      : emptyPlaceholder
  }
}
</script>

<style scoped>
.chart-container {
  min-width: 110px;
  max-width: 110px;
  min-height: 110px;
  max-height: 110px;
}
</style>
