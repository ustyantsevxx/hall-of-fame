<template>
  <Vue2Datepicker
    :value="value ? value.toDate() : null"
    :placeholder="placeholder"
    :lang="$options.datepickerLocale"
    range-separator="—"
    :input-attr="{ id: $attrs.id }"
    :input-class="[
      'mx-input',
      inputClass,
      {
        'border-cyan': opened && !invalid,
        'border-red': invalid
      }
    ]"
    :open.sync="opened"
    :disabled-date="disabledDateCallback"
    @change="emitInputAsDayjs"
  >
    <template #input="{ props, events }">
      <input
        v-mask="!disableMask ? '####-##-##' : undefined"
        v-bind="props"
        v-on="events"
      />
    </template>

    <template #icon-calendar>
      <SVGIcon24Calendar />
    </template>
  </Vue2Datepicker>
</template>

<script>
import 'vue2-datepicker/index.css'

import dayjs, { Dayjs } from 'dayjs'
import Vue2Datepicker from 'vue2-datepicker'

const months = dayjs.months()
const weekDaysFirstLetters = dayjs.weekdaysMin().map(x => x.toUpperCase())

export default {
  components: {
    Vue2Datepicker
  },

  inheritAttrs: false,

  props: {
    value: { type: Dayjs, default: null },
    placeholder: { type: String, default: '' },
    invalid: { type: Boolean, default: false },
    disableMask: { type: Boolean, default: false },
    inputClass: { type: String, default: undefined },
    disabledDatesFn: { type: Function, default: undefined },
    disableFutureDates: { type: Boolean, default: false }
  },

  data() {
    return {
      opened: false
    }
  },

  methods: {
    emitInputAsDayjs(value) {
      this.$emit('input', dayjs(value))
    },

    disabledDateCallback(date) {
      if (this.disableFutureDates) {
        return dayjs(date).isAfter(dayjs(), 'day')
      }

      return this.disabledDatesFn?.(date) ?? undefined
    }
  },

  datepickerLocale: {
    formatLocale: {
      months,
      monthsShort: months,
      weekdaysShort: weekDaysFirstLetters,
      weekdaysMin: weekDaysFirstLetters
    }
  }
}
</script>

<style>
.mx-input {
  @apply h-auto rounded-6 border-white bg-transparent px-12 py-11 text-white transition-colors text-input hover:border-white focus:border-cyan;
}

.mx-datepicker {
  width: auto;
}

.mx-calendar {
  @apply relative p-18;
  width: 260px !important;
}

/* weekends background element */
.mx-calendar.mx-calendar-panel-date::before {
  @apply absolute right-18 top-51 rounded-6 bg-light-40 bg-opacity-30;
  content: '';
  height: 225px;
  width: 64px;
}

.mx-icon-clear,
.mx-icon-calendar {
  @apply right-14;
}

.mx-btn-icon-left,
.mx-btn-icon-right {
  @apply transition-colors hover:text-white;
}

.mx-btn-icon-left.focus-visible,
.mx-btn-icon-right.focus-visible {
  @apply text-white ring-0;
}

.mx-icon-clear {
  @apply text-white hover:text-white;
}

.mx-btn-icon-double-right,
.mx-btn-icon-double-left {
  @apply hidden;
}

.mx-datepicker-main {
  @apply left-auto my-4 rounded-6 border-none bg-light-30 font-sans;
}

.mx-zoom-in-down-enter-active,
.mx-zoom-in-down-leave-active {
  @apply transform-none opacity-100 transition;
}

.mx-zoom-in-down-enter,
.mx-zoom-in-down-enter-from,
.mx-zoom-in-down-leave-to {
  @apply transform-none opacity-0;
}

.mx-calendar-header {
  @apply px-20;
}

.mx-calendar-header-label,
.mx-calendar-header-label .mx-btn-text {
  @apply font-normal text-white text-navigation;
}

.mx-calendar-content .cell.not-current-month {
  @apply !text-white/40;
}

.mx-calendar-content .cell {
  @apply h-28 w-28 cursor-pointer rounded-4  text-white transition-colors duration-200 text-main hover:bg-light-40 hover:text-white;
}

.mx-calendar-content .cell.active {
  @apply rounded-4 !bg-cyan text-black;
}

.mx-calendar-content .cell.today {
  @apply rounded-4 bg-light-40;
}

.mx-calendar-content .cell.disabled {
  @apply bg-transparent !text-white/10;
}
</style>
