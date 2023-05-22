<script lang="ts">
import { Component, mixins, Prop, Watch } from 'nuxt-property-decorator'
import { Doughnut, mixins as chartjsMixins } from 'vue-chartjs'
const { reactiveProp } = chartjsMixins

@Component
export default class ChartDoughnut extends mixins(Doughnut, reactiveProp) {
  @Prop(Object) options!: object

  @Watch('options.tooltips.enabled')
  onTooltipsEnabledChanged(value, oldValue) {
    if (value !== oldValue) {
      this.renderChart(this.chartData, this.options)
    }
  }

  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
