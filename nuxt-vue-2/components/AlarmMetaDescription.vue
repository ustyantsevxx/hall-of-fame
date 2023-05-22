<template>
  <div class="flex items-center">
    <figure
      class="h-9 w-9 rounded-2"
      :style="{ backgroundColor: alarmMetaInfo.color }"
    ></figure>
    <p class="ml-8 text-main">{{ alarmMetaInfo.message }}</p>
  </div>
</template>

<script>
import { ALARM_TYPES } from '~/logic/modules/alarms/alarms.constants'

export default {
  props: {
    alarm: { type: Object, required: true }
  },

  computed: {
    alarmType() {
      return ALARM_TYPES[this.alarm.alarm.type]
    },

    alarmMetaInfo() {
      const { category, message } = this.alarm.alarm
      return {
        color: this.alarmType?.color,
        message: `${this.alarmType?.display}/C${category}: ${message}`
      }
    }
  }
}
</script>
