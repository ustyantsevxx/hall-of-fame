<template>
  <div class="relative x-input" :class="[size]">
    <label :for="uid" class="flex flex-col" :class="labelClasses">
      <span v-if="!hideLabel" class="mb-3 text-gray label">
        {{ label }}
      </span>

      <input
        :id="uid"
        v-mask="mask"
        :value="value"
        :placeholder="placeholder"
        :type="type"
        :maxlength="maxLength"
        :step="step"
        :min="min"
        :max="max"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :name="name"
        :aria-label="label"
        class="placeholder-gray-300 transition-colors duration-150 ease-in-out outline-none input"
        :class="[
          rounded ? 'border' : 'border-b',
          {
            rounded,
            'rounded-8': rounded,
            'border-gray-100 focus:border-blue': !invalid,
            'border-red': invalid,
            'label-hidden': labelHidden
          },
          inputClasses
        ]"
        @input="emitInput"
        @change="emitChange"
        @blur="emitBlur"
      />
    </label>

    <div
      v-if="$slots.icon"
      class="flex absolute top-1/2 right-0 justify-center items-center transform -translate-y-1/2"
    >
      <slot name="icon"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator'

import InputBaseValidatable from '~/components/InputBaseValidatable.vue'

export type InputSizeType = 'lg' | 'md' | 'sm'

@Component
export default class InputDefault extends InputBaseValidatable {
  @Prop({ type: String, default: 'lg' }) size!: InputSizeType
  @Prop({ type: String, default: undefined }) mask!: string | undefined
  @Prop({ type: Object, default: () => {} }) inputClasses!: Object
  @Prop({ type: Object, default: () => {} }) labelClasses!: Object
  @Prop({ type: Boolean, default: false }) rounded!: boolean

  get labelHidden() {
    return this.hideLabel || this.rounded
  }
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}

.x-input {
  &.lg {
    .label {
      @apply text-description;
    }

    .input {
      @apply pb-21 text-subtitle;

      &.label-hidden {
        @apply pt-23;
      }
    }
  }

  &.md {
    .label {
      @apply text-description;
    }

    .input {
      @apply pb-7 text-description;

      &.label-hidden {
        @apply pt-7;
      }
    }
  }

  &.sm {
    .label {
      @apply text-description;
    }

    .input {
      @apply pb-4 pr-5 text-description;

      &.label-hidden {
        @apply pt-4;
      }

      &.rounded {
        @apply pl-5;
      }
    }
  }
}
</style>
