<template>
  <div class="relative z-0 flex h-screen overflow-y-hidden bg-white">
    <DefaultLayoutNavbar class="w-[200px] xl:w-[228px]" />

    <main
      class="relative flex w-[100px] grow flex-col overflow-x-hidden transition-all"
      :class="[{ 'xl:pr-[415px]': appStore.drawerOpened }]"
    >
      <div
        class="flex max-h-full grow flex-col overflow-x-hidden overflow-y-scroll pl-30 pr-20 pt-50 pb-30 xl:pl-25 xl:pr-15 xl:pt-27 xl:pb-25 2xl:pl-35 2xl:pr-25 2xl:pb-35"
        :class="contentClass"
      >
        <slot></slot>
      </div>
    </main>

    <Transition name="timer-slide-down">
      <TimerActive
        v-if="appStore.activeTimer"
        :timer="appStore.activeTimer"
        class="fixed left-20 bottom-26 z-50 w-[332px]"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import TimerActive from '@/components/TimerActive.vue'
import DefaultLayoutNavbar from '@/layouts/DefaultLayoutNavbar.vue'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

defineProps({
  contentClass: { type: String, default: '' }
})
</script>

<style>
.timer-slide-down-enter-active,
.timer-slide-down-leave-active {
  @apply transition;
  transition-duration: 0.6s;
}

.timer-slide-down-enter-from,
.timer-slide-down-leave-to {
  @apply translate-y-20 opacity-0;
}
</style>
