<template>
  <button class="flex items-center space-x-8" @click="$emit('sort', sortKey)">
    <Component
      :is="icon"
      class="w-16 transition"
      :class="[
        sortedBy === sortKey ? 'opacity-100' : 'opacity-40',
        { 'text-cyan': sortedBy === sortKey && sortedAsc }
      ]"
    />
    <p>{{ text }}</p>
  </button>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    sortKey: { type: String, required: true },
    sortedBy: { type: String, required: true },
    sortedAsc: { type: Boolean, required: true },
    text: { type: String, required: true }
  }
}
</script>
