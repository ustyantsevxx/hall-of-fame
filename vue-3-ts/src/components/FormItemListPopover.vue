<template>
  <Popover v-slot="{ open }" class="relative">
    <PopoverButton
      class="flex h-40 w-40 items-center justify-center rounded-10 border transition-colors"
      :class="open ? 'bg-main-primary/10' : 'border-main-primary/20'"
    >
      <SvgEllipsis />
    </PopoverButton>

    <Transition name="fade-slide-down">
      <PopoverPanel
        class="ellipsis-popover-panel absolute right-0 z-10 mt-24 rounded-10 border border-main-primary/10 bg-white"
        style="width: 355px"
        :class="panelClass"
      >
        <slot></slot>
      </PopoverPanel>
    </Transition>
  </Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

defineProps({
  panelClass: { type: String, default: undefined }
})
</script>

<style>
.ellipsis-popover-panel {
  box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.04);
}
</style>
