<template>
  <div :id="containerId" class="w-full progress"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import ProgressBar from 'progressbar.js'

import ChartDoughnut from '~/components/ChartDoughnut.vue'
import { getUid } from '~/logic/utils'

@Component({
  components: {
    ChartDoughnut
  }
})
export default class Progress extends Vue {
  @Prop({ type: Number, required: true }) progress!: number
  @Prop({ type: Number, default: 300 }) duration!: number
  @Prop({ type: Number, default: 4 }) strokeWidth!: number
  @Prop({ type: Number, default: 8 }) trailWidth!: number
  @Prop({ type: String, default: '#FFFFFF' }) strokeColor!: string
  @Prop({ type: String, default: 'rgba(0, 0, 0, 0.4)' }) trailColor!: string
  @Prop({ type: String, default: 'easeInOut' }) easing!: string

  progressbar: any
  uid = getUid()

  @Watch('progress')
  onProgressChanged(value) {
    this.progressbar.animate(value / 100)
  }

  @Watch('progressbarOptions')
  onProgressbarOptionsChanged() {
    this.progressbar.animate(this.progress / 100, this.progressbarOptions)
  }

  get containerId() {
    return `progress_${this.uid}`
  }

  get progressbarOptions() {
    return {
      strokeWidth: this.strokeWidth,
      color: this.strokeColor,
      duration: this.duration,
      easing: this.easing,
      trailColor: this.trailColor,
      trailWidth: this.trailWidth
    }
  }

  mounted() {
    this.progressbar = new ProgressBar.Circle(
      `#${this.containerId}`,
      this.progressbarOptions
    )
    this.progressbar.animate(this.progress / 100)
  }
}
</script>

<style scoped>
.progress > svg {
  height: 100%;
  display: block;
}
</style>
