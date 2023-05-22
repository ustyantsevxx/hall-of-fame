<template>
  <Popover v-slot="{ open, close }" class="relative">
    <PopoverButton @click="toggleOpened">
      <slot name="button" :open="open" :close="close"></slot>
    </PopoverButton>

    <Transition name="fade-slide-down">
      <PopoverPanel class="absolute left-0 z-10">
        <slot :open="open" :close="close"></slot>
      </PopoverPanel>
    </Transition>
  </Popover>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'opened')
  (e: 'closed')
}>()

const opened = ref(false)

const toggleOpened = () => {
  opened.value = !opened.value

  if (opened.value) {
    emit('opened')
  } else {
    emit('closed')
  }
}
</script>
