<template>
  <div :title="title" class="w-max rounded-4 bg-light-20 p-6 text-main">
    {{ formattedAlarmPath }}
  </div>
</template>

<script>
import { notUndefinedOrNull } from '~/logic/utils'

export default {
  props: {
    alarmPath: { type: Object, default: null }
  },

  computed: {
    formattedAlarmPath() {
      if (!this.alarmPath) {
        return '—'
      }

      let path = `SSC${this.alarmPath.ssc_slot + 1}`

      if (notUndefinedOrNull(this.alarmPath.module_slot)) {
        path += ` ▸ ${this.$t('module')}${this.alarmPath.module_slot + 1}`
      } else {
        return path
      }

      if (notUndefinedOrNull(this.alarmPath.e_slot)) {
        path += ` ▸ E${this.alarmPath.e_slot + 1}`
      } else if (notUndefinedOrNull(this.alarmPath.t_slot)) {
        path += ` ▸ T${this.alarmPath.t_slot + 1}`
      }

      return path
    },

    title() {
      return this.alarmPath
        ? this.$t('alarm-path-path', [this.formattedAlarmPath])
        : this.$t('no-alarm-path')
    }
  }
}
</script>
