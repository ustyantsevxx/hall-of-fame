<template>
  <AppDrawer :opened.sync="opened">
    <aside v-if="opened" class="flex h-full flex-col justify-between">
      <div>
        <div
          class="mt-80 flex items-center justify-between border-b border-white/10 pb-30 pl-40 pr-48"
        >
          <h1 class="text-h1">{{ $t('offset-settings') }}</h1>

          <AppButton
            size="sm"
            :disabled="charts.length <= 1"
            @click="autoArrange"
          >
            {{ $t('arrange') }}
          </AppButton>
        </div>

        <ul class="mt-48 space-y-56 pl-40 pr-48">
          <li
            v-for="chart in charts"
            :key="chart.id"
            class="flex items-end justify-between"
          >
            <div class="-ml-16 flex space-x-8">
              <figure
                class="mt-2 h-8 w-8 self-start rounded-full"
                :style="{ backgroundColor: chart.color }"
              ></figure>

              <div style="width: 160px">
                <p class="text-main">{{ chart.name }}</p>
                <p
                  class="my-6 mb-2 truncate text-white/60 text-main"
                  :title="chart.description"
                >
                  {{ chart.description }}
                </p>
              </div>
            </div>

            <SliderOffset v-model="localOffsets[chart.id]" />
          </li>
        </ul>
      </div>

      <div class="flex space-x-12 pb-80 pt-56 pl-40">
        <AppButton variant="secondary" @click="resetOffsets">
          {{ $t('reset') }}
        </AppButton>
        <AppButton @click="submit">{{ $t('apply') }}</AppButton>
      </div>
    </aside>
  </AppDrawer>
</template>

<script>
import AppButton from '~/components/AppButton.vue'
import AppDrawer from '~/components/AppDrawer.vue'
import SliderOffset from '~/components/SliderOffset.vue'

const getDefaultOffset = () => ({ min: 0, max: 100 })

export default {
  components: {
    AppButton,
    AppDrawer,
    SliderOffset
  },

  model: {
    prop: 'offsets'
  },

  props: {
    charts: { type: Array, default: () => [] },
    offsets: { type: Object, default: () => ({}) }
  },

  data() {
    return {
      localOffsets: {},
      opened: false
    }
  },

  methods: {
    resetOffsets() {
      for (const key in this.localOffsets) {
        this.localOffsets[key] = getDefaultOffset()
      }
    },

    saveCurrentOffsetsToLocalState() {
      for (const chart of this.charts) {
        this.$set(
          this.localOffsets,
          chart.id,
          this.offsets?.[chart.id] ?? getDefaultOffset()
        )
      }
    },

    open() {
      this.saveCurrentOffsetsToLocalState()
      this.opened = true
    },

    close() {
      this.opened = false
    },

    emitInput() {
      const notDefaultOffsets = Object.fromEntries(
        Object.entries(this.localOffsets).filter(
          ([, offsets]) => offsets.min !== 0 || offsets.max !== 100
        )
      )

      this.$emit('input', notDefaultOffsets)
    },

    autoArrange() {
      const step = 100 / this.charts.length

      for (const [i, chart] of [...this.charts].reverse().entries()) {
        const min = Math.floor(step * i) + (i === 0 ? 1 : 0)
        const max = Math.floor(step * i + step - 1)
        this.localOffsets[chart.id] = { min, max }
      }
    },

    submit() {
      this.emitInput()
      this.close()
    }
  }
}
</script>
