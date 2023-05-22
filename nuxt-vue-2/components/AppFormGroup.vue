<template>
  <div>
    <div v-if="!noLabel" class="flex items-center justify-between">
      <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
      <label
        :for="$uid"
        :class="labelClass"
        class="block w-full select-none transition-colors text-main"
      >
        <slot name="label">
          {{ label }}
        </slot>
      </label>

      <div class="flex">
        <slot name="after-label"></slot>
      </div>
    </div>

    <div :class="[inputWrapperClass, { 'mt-8': !noLabel }]">
      <slot :id="$uid"></slot>
    </div>

    <div v-if="!noBottomMessage" class="mt-4 flex min-h-[12px] justify-end">
      <AppTransition>
        <p
          v-if="bottomMessage"
          class="text-right text-white/60 transition-colors text-main"
          :class="{ 'text-red': errorMessage }"
        >
          {{ bottomMessage }}
        </p>
      </AppTransition>
    </div>
  </div>
</template>

<script>
import AppTransition from '~/components/AppTransition.vue'

export default {
  components: {
    AppTransition
  },

  props: {
    labelFor: { type: String, default: '' },
    label: { type: String, default: '' },
    labelClass: { type: [String, Array, Object], default: undefined },
    inputWrapperClass: { type: [String, Array, Object], default: undefined },
    noLabel: { type: Boolean, default: false },
    noBottomMessage: { type: Boolean, default: false },
    errorMessage: { type: [String, Boolean], default: '' },
    description: { type: String, default: '' }
  },

  computed: {
    bottomMessage() {
      return this.errorMessage || this.description
    }
  }
}
</script>
