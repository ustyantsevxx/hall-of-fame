<template>
  <button
    class="group flex cursor-pointer select-none items-center space-x-6 rounded-17 bg-light-20 px-8 pt-5 pb-4 ring-offset-1 ring-offset-light transition hover:bg-light-30"
    @click="() => $emit('click')"
  >
    <span class="text-main">
      <slot></slot>
    </span>
    <SVGTagX class="text-white/60 transition-colors group-hover:text-white" />
  </button>
</template>

<script>
export default {}
</script>
