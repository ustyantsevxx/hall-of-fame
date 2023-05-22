<template>
  <label
    :for="$uid"
    class="x-custom-checkbox-container relative flex cursor-pointer select-none"
    :class="{ checked: computedChecked }"
  >
    <input
      :id="$uid"
      type="checkbox"
      :disabled="disabled"
      class="x-custom-checkbox-input sr-only"
      :checked="computedChecked"
      @change="emitInput"
    />

    <figure
      class="x-custom-checkbox flex h-16 w-16 items-center justify-center rounded-4 border transition"
      :class="{ 'border-white/60': !computedChecked }"
      :style="customFigureStyles"
    >
      <SVGCheckboxCheck
        class="opacity-0 transition-opacity"
        :style="{ color: checkColor }"
        :class="{ 'opacity-100': computedChecked }"
      />
    </figure>

    <span class="w-full pl-12">
      <slot></slot>
    </span>
  </label>
</template>

<script>
import { isEqual } from 'lodash-es'

import { notUndefinedOrNull, opacify } from '~/logic/utils'

export default {
  model: {
    prop: 'checked'
  },

  props: {
    checked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    bgColor: { type: String, default: '#000' },
    checkColor: { type: String, default: '#fff' },

    // array sync mode
    array: { type: Array, default: undefined },
    arrayValue: { type: [String, Number, Object, Array], default: undefined }
  },

  computed: {
    shadowColor() {
      return opacify(this.bgColor, 0.2)
    },

    computedChecked() {
      return (
        this.checked ||
        (this.array &&
          notUndefinedOrNull(this.array.find(x => isEqual(x, this.arrayValue))))
      )
    },

    customFigureStyles() {
      return {
        '--color': this.bgColor,
        'background-color': this.computedChecked ? this.bgColor : '',
        'box-shadow': this.computedChecked
          ? `0 4px 4px -1px ${this.shadowColor}`
          : ''
      }
    }
  },

  methods: {
    emitInput() {
      if (this.array && notUndefinedOrNull(this.arrayValue)) {
        let newArray

        const exists = this.array.some(x =>
          isEqual(x, this.arrayValue, { strict: true })
        )

        if (exists) {
          newArray = this.array.filter(
            x => !isEqual(x, this.arrayValue, { strict: true })
          )
          this.$emit('array-removed', this.arrayValue)
        } else {
          newArray = [...this.array, this.arrayValue]
          this.$emit('array-added', this.arrayValue)
        }

        this.$emit('update:array', newArray)
      }

      this.$emit('input', !this.checked)
    }
  }
}
</script>

<style scoped>
.x-custom-checkbox {
  min-width: 16px;
  min-height: 16px;
}

.x-custom-checkbox-input.focus-visible + .x-custom-checkbox {
  @apply ring ring-yellow ring-opacity-80 ring-offset-2 ring-offset-light-full !important;
}

.x-custom-checkbox-container:hover .x-custom-checkbox {
  border-color: var(--color) !important;
}

.x-custom-checkbox-container.checked:hover .x-custom-checkbox {
  filter: brightness(0.9);
}
</style>
