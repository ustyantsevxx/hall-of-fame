<template>
  <span
    :style="{
      backgroundColor: statusData.color
    }"
    class="block w-64 rounded-4 pt-5 pb-4 text-center text-light transition text-h3"
  >
    {{ statusData.display }}
  </span>
</template>

<script>
import { STATUSES_META } from '~/logic/constants'
import { twTheme } from '~/logic/constants/theme'

export default {
  props: {
    // ok, warning, error, fault
    status: { type: String, required: true }
  },

  computed: {
    statusData() {
      return (
        STATUSES_META[this.status] ?? {
          color: twTheme.colors.light[30],
          display: '—'
        }
      )
    }
  }
}
</script>
