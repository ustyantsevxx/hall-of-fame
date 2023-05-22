<template>
  <button
    class="block relative select-none x-button"
    :class="[
      `x-button--${size}`,
      {
        'x-button--disabled': disabled,
        'x-button--outline': outline,
        'x-button--blue': blue,
        'x-button--link': link,
        'x-button--gradient': gradient || smallGradient,
        'cursor-not-allowed': disabled,
        'pointer-events-none': loading
      }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span
      v-if="loading"
      class="flex absolute inset-0 justify-center items-center"
    >
      <LoaderSVG class="animate-spin" />
    </span>

    <span :class="{ invisible: loading }">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import LoaderSVG from '~/assets/svg/loader.svg'

type ButtonSizeType = 'lg' | 'md' | 'sm'

@Component({
  components: {
    LoaderSVG
  }
})
export default class Button extends Vue {
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Boolean, default: false }) gradient!: boolean
  @Prop({ type: Boolean, default: false }) smallGradient!: boolean
  @Prop({ type: Boolean, default: false }) link!: boolean
  @Prop({ type: Boolean, default: false }) outline!: boolean
  @Prop({ type: Boolean, default: false }) blue!: boolean
  @Prop({ type: Boolean, default: false }) loading!: boolean
  @Prop({ type: String, default: 'md' }) size!: ButtonSizeType
}
</script>

<style scoped>
/* gradient */

.x-button--gradient {
  @apply rounded-10 font-bold text-white text-button pt-18 pb-22 px-40 bg-gradient transition hover:brightness-95 active:brightness-90;
}

.x-button--gradient.x-button--disabled {
  @apply text-opacity-40 hover:brightness-100 active:brightness-100;
}

.x-button--gradient.x-button--sm {
  @apply text-description px-20 py-10;
}

/* link */

.x-button--link {
  transition: color 150ms ease-in-out !important;
  @apply text-blue hover:text-red active:text-red/80;
}

.x-button--link.x-button--disabled {
  @apply text-gray hover:text-gray;
}

/* outline */

.x-button--outline {
  @apply border border-blue text-blue rounded-10 pt-12 pb-13 px-20 hover:border-red hover:text-red transition-colors duration-150 ease-in-out active:text-red/80 active:border-red/80;
}

.x-button--outline.x-button--disabled {
  @apply border-gray-300 text-gray-300;
}

/* blue */

.x-button--blue {
  @apply bg-blue-100 text-blue rounded-10 py-10 px-10 hover:text-red transition-colors;
}

.x-button--blue.x-button--disabled {
  @apply text-gray hover:text-gray;
}
</style>
