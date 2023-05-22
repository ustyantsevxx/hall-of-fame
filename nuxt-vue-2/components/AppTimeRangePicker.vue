<template>
  <div v-on-clickaway="close" class="relative">
    <VPopover
      popover-class="x-time-range-picker-body z-50"
      trigger="manual"
      :open="opened"
      offset="4"
      :auto-hide="false"
      :container="false"
      popover-arrow-class="!hidden"
      placement="bottom-end"
    >
      <div
        class="flex select-none items-center justify-between rounded-6 border transition-colors"
        :class="{
          'border-cyan': opened,
          'border-white': !opened && !disabled,
          'cursor-not-allowed border-white/40': !opened && disabled
        }"
        @click="toggle"
      >
        <label :for="$uid" class="flex-1">
          <input
            :id="$uid"
            :placeholder="placeholder"
            readonly
            :disabled="disabled"
            :value="formattedValue"
            :class="{
              'cursor-pointer placeholder-white/60': !opened && !disabled,
              'cursor-not-allowed placeholder-white/40': !opened && disabled
            }"
            class="w-full truncate bg-transparent p-12 ring-0 text-main"
          />
        </label>

        <SVGIcon24Time
          v-if="!value"
          class="mr-8"
          :class="{ 'text-white/40': disabled }"
        />
        <button v-else class="mr-8" @click="emitEmptyInput">
          <SVGIcon24Close />
        </button>
      </div>

      <template #popover>
        <div class="rounded-6 bg-light-30 px-14 py-4">
          <div class="flex items-center justify-center">
            <AppTimeInput v-model="from" @input="emitInput" />
            <span class="mx-4 w-16 text-center text-main">—</span>
            <AppTimeInput v-model="to" @input="emitInput" />
          </div>
        </div>
      </template>
    </VPopover>
  </div>
</template>

<script>
import { VPopover } from 'v-tooltip'
import { directive as onClickaway } from 'vue-clickaway'

import AppTimeInput from '~/components/AppTimeInput.vue'

export default {
  components: {
    VPopover,
    AppTimeInput
  },

  directives: {
    onClickaway
  },

  props: {
    value: { type: Object, default: undefined },
    disabled: { type: Boolean, default: false },
    placeholder: { type: String, default: '' }
  },

  data() {
    return {
      opened: false,
      from: null,
      to: null
    }
  },

  computed: {
    formattedValue() {
      return this.value
        ? `${this.formatTime(this.from)} — ${this.formatTime(this.to)}`
        : null
    }
  },

  methods: {
    emitInput() {
      this.$emit('input', {
        from: this.from ?? {
          hours: 0,
          minutes: 0,
          seconds: 0
        },
        to: this.to ?? {
          hours: 0,
          minutes: 0,
          seconds: 0
        }
      })
    },

    formatTime(obj) {
      const hours = this.always2digits(obj?.hours ?? 0)
      const minutes = this.always2digits(obj?.minutes ?? 0)
      const seconds = this.always2digits(obj?.seconds ?? 0)
      return `${hours}:${minutes}:${seconds}`
    },

    open() {
      this.opened = true
    },

    close() {
      this.opened = false
    },

    toggle() {
      if (this.disabled) {
        return
      }

      this.opened ? this.close() : this.open()
    },

    always2digits(value) {
      return value.toLocaleString('en-US', { minimumIntegerDigits: 2 })
    },

    async emitEmptyInput() {
      this.from = {
        hours: 0,
        minutes: 0,
        seconds: 0
      }
      this.to = {
        hours: 0,
        minutes: 0,
        seconds: 0
      }
      await this.$nextTick()
      this.$emit('input', null)
    }
  }
}
</script>

<style>
.x-time-range-picker-body {
  width: 300px;
}

.x-time-range-picker-body {
  @apply ring-0;
}

.x-time-range-picker-body[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.x-time-range-picker-body[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
</style>
