<template>
  <div
    class="promotion flex items-center rounded-15 bg-gradient-to-r from-[#4293F2] to-[#CE43FF]"
  >
    <div class="px-35 py-22 text-white text-medium-17">
      xx xx xx xx {{ price }} xx xx
    </div>

    <SvgSubscriptionInfinityProductivity class="ml-auto" />
  </div>
</template>

<script setup lang="ts">
const price = '169 ₽' // TODO xx xx xx xx xx xx xx
</script>
