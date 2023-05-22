<template>
  <button
    class="relative ml-12 h-16 w-16 rounded-4 bg-light-20 transition hover:bg-light-30"
    :title="
      item.expanded
        ? `Collapse &quot;${formattedCustomerName}&quot;`
        : `Expand &quot;${formattedCustomerName}&quot;`
    "
    @click.stop="$emit('toggle-expand')"
  >
    <SVGSmallArrowDown
      class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition"
      :class="{ '-rotate-180': item.expanded }"
    />
  </button>
</template>

<script>
export default {
  props: {
    item: { type: Object, required: true },
    formattedCustomerName: { type: String, required: true }
  }
}
</script>
