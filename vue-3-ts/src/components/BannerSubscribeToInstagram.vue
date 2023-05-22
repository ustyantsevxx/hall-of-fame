<template>
  <div
    class="bg-instagram flex flex-col items-center justify-between rounded-10 py-15 px-20 text-white"
  >
    <SvgInstagram class="h-36 w-36" />

    <p class="mt-5 text-center text-17">
      Подписывайтесь и&nbsp;следите за&nbsp;новостями
    </p>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.bg-instagram {
  background: radial-gradient(
      104.2% 725.13% at 0% 100%,
      #fecc6a 0%,
      #f17b34 27.64%,
      #b8338f 69.07%,
      #9f37b8 100%
    ),
    #ffffff;
}
</style>
