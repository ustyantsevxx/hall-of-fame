<template>
  <div class="flex w-max space-x-2">
    <AppPopover
      v-for="(ssc, i) in battery.sscs"
      :key="i"
      :vendor-props="{
        trigger: 'hover',
        delay: { show: 300, hide: 150 },
        placement: 'top'
      }"
    >
      <template #toggle>
        <span
          class="flex h-24 w-24 cursor-default select-none items-center justify-center rounded-4 transition text-h3"
          :class="getSscStateData(ssc.alarm_status).classList"
        >
          {{ ssc.ssc_soc !== null ? ssc.ssc_soc : '—' }}
        </span>
      </template>

      <template #body>
        <div class="py-12 px-20 text-center text-main">
          <p>SSC{{ i + 1 }}</p>
          <p class="mt-4 text-white/60">
            {{ $t('alarm-status') }}:
            {{ getSscStateData(ssc.alarm_status).display || '—' }}
          </p>
        </div>
      </template>
    </AppPopover>

    <p v-if="battery.sscs.length === 0" class="w-24 text-center">—</p>
  </div>
</template>

<script>
import AppPopover from '~/components/AppPopover.vue'
import { STATUSES, STATUSES_META } from '~/logic/constants'

export default {
  components: {
    AppPopover
  },

  props: {
    battery: { type: Object, required: true }
  },

  methods: {
    getSscStateData(state) {
      const dataMap = {
        [STATUSES.OK]: {
          display: STATUSES_META[STATUSES.OK]?.display,
          classList: 'bg-light-20 hover:bg-light-30'
        },

        [STATUSES.WARNING]: {
          display: STATUSES_META[STATUSES.WARNING]?.display,
          classList: 'bg-yellow hover:brightness-110 text-light'
        },

        [STATUSES.ERROR]: {
          display: STATUSES_META[STATUSES.ERROR]?.display,
          classList: 'bg-orange hover:brightness-110 text-light'
        },

        [STATUSES.FAULT]: {
          display: STATUSES_META[STATUSES.FAULT]?.display,
          classList: 'bg-red hover:brightness-110 text-light'
        }
      }

      return dataMap[state] ?? {}
    }
  }
}
</script>
