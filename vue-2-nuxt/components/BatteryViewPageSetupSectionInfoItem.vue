<template>
  <div
    class="rounded-6 bg-light-20 p-16 sm:p-24"
    :class="lg ? 'h-[162px] w-[162px]' : 'py-16'"
  >
    <dl
      class="flex h-full"
      :class="lg ? 'flex-col' : 'items-center justify-between'"
    >
      <div
        class="flex"
        :class="
          lg ? 'grow flex-col justify-between' : 'items-center  space-x-10'
        "
      >
        <slot name="icon">
          <Component :is="icon" v-if="icon" />
        </slot>
        <dt class="text-white/60 text-main">
          <slot name="name">{{ name }}</slot>
        </dt>
      </div>

      <dd class="text-button" :class="{ 'mt-6': lg }">
        <slot name="value">{{ safeValue }}</slot>
      </dd>
    </dl>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    value: { type: [String, Number], default: null },
    icon: { type: String, default: undefined },
    lg: { type: Boolean, default: false }
  },

  computed: {
    safeValue() {
      return this.value ?? '—'
    }
  }
}
</script>
