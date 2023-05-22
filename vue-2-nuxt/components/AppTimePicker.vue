<template>
  <AppDropdown
    ref="dropdown"
    :toggle-id="id"
    :toggle-class="{
      'timepicker-toggle ring-0 rounded-6 py-11 flex items-center justify-between w-full px-12 transition-colors border': true,
      'border-white/40 text-white/40': disabled
    }"
    toggle-opened-class="border-cyan"
    toggle-closed-class="border-white"
    offset="4"
    :disabled="disabled"
  >
    <template #toggle="{ opened }">
      <span class="text-input">{{ formattedValue }}</span>

      <SVGIcon16ArrowDown1
        class="cursor-pointer transition-transform"
        :class="{ 'rotate-180': opened }"
      />
    </template>

    <template #body>
      <div
        class="grid grid-cols-2 overflow-hidden rounded-6 bg-light-30 p-12"
        style="height: 138px"
      >
        <div class="overflow-y-auto">
          <ul>
            <li v-for="minutes in minutesList" :key="minutes">
              <button
                class="timepicker-item-button flex w-full select-none items-center space-x-6 rounded-8 py-6 pl-6 text-left ring-0 transition text-input hover:bg-light-40"
                @click="() => emitInput({ minutes })"
              >
                <SVGSmallBlueCircle
                  class="transition-opacity"
                  :class="{ 'opacity-0': value.minutes !== minutes }"
                />
                <span>{{ $t('minutes-min', { minutes }) }}</span>
              </button>
            </li>
          </ul>
        </div>

        <div class="overflow-y-auto">
          <ul>
            <li v-for="seconds in secondsList" :key="seconds">
              <button
                class="timepicker-item-button flex w-full select-none items-center space-x-6 rounded-8 py-6 pl-6 text-left ring-0 transition text-input hover:bg-light-40 disabled:cursor-not-allowed disabled:opacity-30"
                :disabled="minutesMaxAndNotInclusive && +seconds !== 0"
                @click="() => emitInput({ seconds: +seconds })"
              >
                <SVGSmallBlueCircle
                  class="transition-opacity"
                  :class="{ 'opacity-0': +value.seconds !== +seconds }"
                />
                <span>{{ $t('seconds-sec', { seconds }) }}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </AppDropdown>
</template>

<script>
import { range } from 'lodash-es'

import AppDropdown from '~/components/AppDropdown.vue'

export default {
  components: {
    AppDropdown
  },

  props: {
    id: {
      type: String,
      default() {
        return this.$uid
      }
    },

    value: { type: Object, required: true },
    minutesMin: { type: Number, default: 1 },
    minutesMax: { type: Number, default: 10 },
    minutesStep: { type: Number, default: 1 },
    secondsStep: { type: Number, default: 10 },
    maxInclusive: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },

  computed: {
    dropdownRef() {
      return this.$refs.dropdown
    },

    minutesList() {
      return range(
        this.minutesMin,
        this.minutesMax + 1,
        this.minutesStep
      ).reverse()
    },

    secondsList() {
      return range(0, 51, this.secondsStep).map(seconds =>
        this.secondsAs2DigitsAlways(seconds)
      )
    },

    formattedValue() {
      return this.$t('minutes-min-seconds-sec', {
        minutes: this.value?.minutes,
        seconds: this.secondsAs2DigitsAlways(this.value?.seconds)
      })
    },

    minutesMaxAndNotInclusive() {
      return this.value.minutes === this.minutesMax && !this.maxInclusive
    }
  },

  methods: {
    emitInput({ minutes, seconds }) {
      if (minutes === this.minutesMax && !this.maxInclusive) {
        seconds = 0
      }
      this.$emit('input', {
        minutes: minutes ?? this.value.minutes,
        seconds: seconds ?? this.value.seconds
      })
    },

    secondsAs2DigitsAlways(seconds) {
      return seconds.toLocaleString('en-US', { minimumIntegerDigits: 2 })
    }
  }
}
</script>

<style>
.timepicker-toggle.focus-visible {
  @apply border-cyan !important;
}

.timepicker-item-button.focus-visible {
  @apply bg-light-40;
}

.timepicker-item-button:disabled:hover {
  @apply bg-light-30 !important;
}
</style>
