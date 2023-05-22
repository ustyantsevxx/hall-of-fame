<template>
  <Component
    :is="component.is"
    v-bind="component.props"
    class="relative flex select-none items-center justify-center rounded-6 text-center transition text-button disabled:cursor-not-allowed disabled:opacity-40"
    :disabled="disabled"
    :class="[variantClasses, { 'pointer-events-none': loading }]"
    @click="e => $emit('click', e)"
  >
    <span
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <SVGIcon24Spinner class="animate-spin" />
    </span>

    <span :class="{ invisible: loading }">
      <slot></slot>
    </span>
  </Component>
</template>

<script>
const VARIANTS = new Set([
  'primary',
  'secondary',
  'danger',
  'dark',
  'dark-invert',
  'transparent'
])

export default {
  props: {
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    to: { type: [String, Object], default: undefined },
    type: { type: String, default: 'button' },

    variant: {
      type: String,
      default: 'primary',
      validator(variant) {
        return VARIANTS.has(variant)
      }
    },

    size: {
      type: String,
      default: 'default',
      validator(size) {
        return ['default', 'sm'].includes(size)
      }
    }
  },

  computed: {
    component() {
      return {
        is: this.to ? 'NuxtLink' : 'button',
        props: {
          to: this.to,
          type: !this.to ? this.type : undefined
        }
      }
    },

    variantClasses() {
      return {
        [this.variant]: this.v(this.variant),
        [`${this.variant}-default`]: this.sz('default') && this.v(this.variant),
        [`${this.variant}-sm`]: this.sz('sm') && this.v(this.variant),
        [`${this.variant}-not-disabled`]: this.v(this.variant) && !this.disabled
      }
    }
  },

  methods: {
    v(variant) {
      return this.variant === variant
    },

    sz(size) {
      return this.size === size
    }
  }
}
</script>

<style scoped>
button.focus-visible {
  @apply outline-none ring ring-yellow ring-opacity-80 ring-offset-2 ring-offset-light;
}

/* primary  */

.primary {
  @apply bg-cyan text-light-full;
}

.primary-default {
  @apply py-13 px-28;
}

.primary-sm {
  @apply py-7 px-20;
}
.primary-not-disabled {
  @apply hover:bg-cyan-lighten active:bg-cyan-darken;
}

/* secondary  */

.secondary {
  @apply border border-white/30 text-white;
}

.secondary-default {
  @apply py-12 px-28;
}

.secondary-sm {
  @apply py-6 px-20;
}
.secondary-not-disabled {
  @apply hover:border-white active:border-white/70;
}

/* dark  */

.dark {
  @apply bg-light-20 text-white;
}

.dark-default {
  @apply py-13 px-28;
}

.dark-sm {
  @apply py-10 px-16 text-main;
}

.dark-not-disabled {
  @apply hover:bg-light-30 active:bg-light-10;
}

/* dark-invert  */

.dark-invert {
  @apply bg-transparent text-white/60;
}

.dark-invert-default {
  @apply py-13 px-28;
}

.dark-invert-sm {
  @apply py-10 px-16 text-main;
}

.dark-invert-not-disabled {
  @apply hover:bg-light-20 hover:text-white active:bg-light-10;
}

/* transparent  */

.transparent {
  @apply text-white;
}

.transparent-default {
  @apply py-13 px-28;
}

.transparent-sm {
  @apply py-7 px-20;
}

.transparent-not-disabled {
  @apply hover:bg-light-20;
}

.danger {
  @apply border border-red text-red;
}

.danger-default {
  @apply py-13 px-28;
}

.danger-sm {
  @apply py-10 px-16 text-main;
}
</style>
